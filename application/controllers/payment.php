<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class payment extends MY_Controller {

    public function index() {
        
    }

	function finish_payment(){
		//xendit payment
		// $this->db->insert('payment_log_xd',array('id'=>111));
		 if ($_SERVER["REQUEST_METHOD"] === "POST") {
	        $data = json_decode(file_get_contents("php://input"));



	        // print_r("\n\$data contains the updated invoice data \n\n");
	        // print_r($data);
	        // print_r("\n\nUpdate your database with the invoice status \n\n");

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
						$new_balance = $current_balance+$data->{'amount'};

						//update saldo
						$this->db->where('id_member_saving',intval($data->{'external_id'}));
						$this->db->update('member_saving',array('balance'=>$new_balance);

						//insert history
						$this->insert_saving_history(1,$data->{'amount'},$r->id_saving_type,$r->id_member,$r->no_account);
					}
					
				}
			}
			
        	

	    } else {
	        print_r("Cannot ".$_SERVER["REQUEST_METHOD"]." ".$_SERVER["SCRIPT_NAME"]);
	    }
	}

	function insert_saving_history($trx_type,$amount,$id_saving_type,$id_member,$no_account){
		$data = array(
            'id_saving_history' =>  $this->m_data->getSeqVal('seq_saving_history'),
            "idunit" => $idunit,
            "id_saving_type" => $id_saving_type,
            "id_member" => $id_member,
            // "idjournal" => $this->input->post('idjournal') == '' ? null : $this->input->post('idjournal'),
            // "tellerid" => $this->input->post('tellerid'),
            // "approvedby" => $this->input->post('approvedby'),
            "amount"  => $amount,
            // "fee_adm" => cleardot2($this->input->post('fee_adm')),
            "trx_type"  => $trx_type,
            // "id_saving_type_dest" => $this->input->post('id_saving_type_dest'),
            // "id_member_dest" => $this->input->post('id_member_dest'),
            "remarks" => 'Top Up. No Account: '.$no_account,
            // "trx_time_type" => $this->input->post('trx_time_type'),
            "trx_date" => date('Y-m-d H:m:s'),
            "status" => 2
            // "display" => ,
        );
		$this->db->insert('member_saving_history',$data);
	}

}
?>
	