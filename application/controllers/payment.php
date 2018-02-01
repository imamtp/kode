<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class payment extends CI_Controller {

    public function index() {
        
	}
	
	function tes_payment(){
		 print_r($_POST);
	}

	function cb_va_saving(){
		//xendit payment
		// $this->db->insert('payment_log_xd',array('id'=>111));
		// echo $this->db->last_query(); 
		 if ($_SERVER["REQUEST_METHOD"] === "POST") {
	        $data = json_decode(file_get_contents("php://input"));
	
	        $d = array(
        		// 'payment_id'=>$data
				'id'=>$data->{'id'},
				'payment_id'=>$data->{'payment_id'},
				'callback_virtual_account_id'=>$data->{'callback_virtual_account_id'},
				'owner_id'=>$data->{'owner_id'},
				'external_id'=>$data->{'external_id'},
				'account_number'=>$data->{'account_number'},
				'bank_code'=>$data->{'bank_code'},
				'amount'=>$data->{'amount'},
				'merchant_code'=>$data->{'merchant_code'},
				'datein'=>date('Y-m-d H:m:s')
        	);
			$this->db->insert('payment_log_xd',$d);
			
			$cek = $this->db->get_where('member_saving',array('id_member_saving'=>intval($data->{'external_id'})));
			if($cek->num_rows()>0){

				$r = $cek->row();

				$current_balance = $r->balance==null ? 0 :  $r->balance;
				$new_balance = $current_balance+intval($data->{'amount'});

				//update saldo
				$this->db->where('id_member_saving',intval($data->{'external_id'}));
				$this->db->update('member_saving',array('balance'=>$new_balance));

				//insert history
				$this->insert_saving_history(1,$data->{'amount'},intval($data->{'external_id'}));
		
				
			}			
        	

	    } else {
	        print_r("Cannot ".$_SERVER["REQUEST_METHOD"]." ".$_SERVER["SCRIPT_NAME"]);
	    }
	}

	function finish_payment(){
		//xendit payment
		// $this->db->insert('payment_log_xd',array('id'=>111));
		 if ($_SERVER["REQUEST_METHOD"] === "POST") {
	        $data = json_decode(file_get_contents("php://input"));


	        $d = array(
        		// 'payment_id'=>$data
        		'id'=>$data->{'id'},
				'user_id'=>$data->{'user_id'},
				'external_id'=>$data->{'external_id'},
				'is_high'=>$data->{'is_high'},
				'status'=>$data->{'status'},
				'merchant_name'=>$data->{'merchant_name'},
				'amount'=>$data->{'amount'},
				'received_amount'=>$data->{'received_amount'},
				'payer_email'=>$data->{'payer_email'},
				'description'=>$data->{'description'},
				'xendit_fee_amount'=>$this->settings['virtual_account_fee_cust'],
				// 'sni_fee_amount'=>$data->{'sni_fee_amount'},
				'expiry_date'=>$data->{'expiry_date'},
				'invoice_url'=>$data->{'invoice_url'},
				'paid_amount'=>$data->{'paid_amount'},
				'payment_method'=>$data->{'payment_method'},
				'adjusted_received_amount'=>$data->{'adjusted_received_amount'},
				'adjusted_xendit_fee_amount'=>$data->{'adjusted_xendit_fee_amount'},
				'datein'=>date('Y-m-d H:m:s')
        	);
			$this->db->insert('payment_log_xd',$d);
			
			 if($data->{'merchant_name'}!='Xendit'){
				$cek = $this->db->get_where('member_saving',array('id_member_saving'=>intval($data->{'external_id'})));
				if($cek->num_rows()>0){
	
					if($data->{'status'}=='COMPLETED'){
						$r = $cek->row();

						$current_balance = $r->balance==null ? 0 :  $r->balance;
						$new_balance = $current_balance+intval($data->{'amount'});

						//update saldo
						$this->db->where('id_member_saving',intval($data->{'external_id'}));
						$this->db->update('member_saving',array('balance'=>$new_balance));

						//insert history
						$this->insert_saving_history(1,$data->{'amount'},$r->id_saving_type,$r->id_member,$r->no_account);
					}
					
				}
			}
			
        	

	    } else {
	        print_r("Cannot ".$_SERVER["REQUEST_METHOD"]." ".$_SERVER["SCRIPT_NAME"]);
	    }
	}

	function insert_saving_history($trx_type,$amount,$id_member_saving,$idunit=12){

		$q = $this->db->get_where('member_saving',array('id_member_saving'=>$id_member_saving));

		if($q->num_rows()>0){
			$r = $q->row();

			// $this->load->model('m_data');
			$data = array(
				"id_saving_history" =>  $this->getSeqVal('seq_saving_history'),
				"idunit" => $idunit,
				"id_member_saving"=>$r->id_member_saving,
				// "id_saving_type" => $id_saving_type,
				// "id_member" => $id_member,
				// "idjournal" => $this->input->post('idjournal') == '' ? null : $this->input->post('idjournal'),
				// "tellerid" => $this->input->post('tellerid'),
				// "approvedby" => $this->input->post('approvedby'),
				"amount"  => $amount,
				// "fee_adm" => cleardot2($this->input->post('fee_adm')),
				"trx_type"  => $trx_type,
				// "id_saving_type_dest" => $this->input->post('id_saving_type_dest'),
				// "id_member_dest" => $this->input->post('id_member_dest'),
				"remarks" => 'Top Up Saving. No Account: '.$r->no_account,
				// "trx_time_type" => $this->input->post('trx_time_type'),
				"trx_date" => date('Y-m-d H:m:s'),
				"status" => 2,
				"datein"=> date('Y-m-d H:m:s')
				// "display" => ,
			);
			$this->db->insert('member_saving_history',$data);
		} 
		
	}

	function getSeqVal($nameSeq)
    {
        $q = $this->db->query("select nextval('".$nameSeq."') as id")->row();
        return $q->id;
        $q->free_result();
    }

}
?>
	