<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class saving extends MY_Controller {

    public function index() {
        
    }

    function post_member_saving(){

    	$statusform = $this->input->post('statusformsavingopen');
    	$status = $this->input->post('status');
    	$no_account = $this->input->post('no_account');
    	$approval = $this->input->post('approval');
        
        $this->db->trans_begin();

        $data = array(
        	'id_member_saving' => $this->input->post('id_member_saving') == '' ? $this->m_data->getSeqVal('seq_member_saving') : $this->input->post('id_member_saving'),
            'id_saving_type' => $this->input->post('id_saving_type'),
            'id_member' => $this->input->post('id_member'),
            'date_registered' => date('Y-m-d H:m:s'),
            'opening_notes' => $this->input->post('opening_notes'),
            'reg_admin_fee' => $this->input->post('reg_admin_fee'),
            'no_account' => $no_account,
            'period' => $this->input->post('period'),            
            'startdate' => $this->input->post('startdate')!='' ? backdate2($this->input->post('startdate')) : null, 
            'enddate' => $this->input->post('enddate')!='' ? backdate2($this->input->post('enddate')) : null,
            'amount' => $this->input->post('amount')!='' ? cleardot2($this->input->post('amount')) : null,
            // 'saving_limit'=> $this->input->post('saving_limit')!='' ? cleardot2($this->input->post('saving_limit')) : null,
            'status' => $status
        );

        if(intval($status)==1){
        	$data['approvedby_id'] = $this->session->userdata('userid');
        	$data['date_activated'] = date('Y-m-d H:m:s');

        	//buat no va
        	$va = $this->create_fixed_va(array(
        			'id_member_saving'=>$data['id_member_saving']
				));

			$data['bank_code'] = $va['bank_code'];
			$data['description'] = $va['name'];
			$data['expiration_date'] = $va['expiration_date'];
			$data['id_va'] = $va['id'];
			$data['no_account'] = $va['account_number'];
        }

        if($statusform=='input'){
            //insert
            $data['userin'] = $this->session->userdata('userid');
            $data['datein'] = date('Y-m-d H:m:s');
          
            $cek = $this->db->get_where('member_saving',array(
                'id_saving_type' => $this->input->post('id_saving_type'),
                'id_member' => $this->input->post('id_member')
            ));

            if($cek->num_rows()>0){
                $json = array('success' => false, 'message' => 'Data sudah ada');
            } else {
                $this->db->insert('member_saving',$data);
            }
        } else {
            //update

            $data['usermod'] = $this->session->userdata('userid');
            $data['datemod'] = date('Y-m-d H:m:s');
            
            $this->db->where(array(
                'id_saving_type' => $this->input->post('id_saving_type'),
                'id_member' => $this->input->post('id_member')
            ));
            $this->db->update('member_saving',$data);
        }
       	
       	// $no_saving_topup = $data['id_saving_type'].'.'.$data['id_member'].'.'.$no_account;

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal menyimpan data');
        } else {
            $this->db->trans_commit();

            if($status==1){
            	//buat virtual account / payment
            }
            $json = array('success' => true, 'message' => 'Sukses menyimpan data');
        }

        echo json_encode($json);
    }

    function tes_va(){
    	// $data
	}
	
    function create_fixed_va($data=null){
        require DOCUMENTROOT.'/vendor/autoload.php'; 
        
         $id_invoice =  $this->m_data->getSeqVal('seq_invoice');

         $options['secret_api_key'] = SECRET_API_KEY; 

         $xenditPHPClient = new XenditClient\XenditPHPClient($options); 

         $external_id = $data['id_member_saving'];
         $bank_code = 'BRI';
         $name = 'Simpanan Wajib Budi Susanto';
        //  $virtual_account_number = 1689085719191442;

         $response = $xenditPHPClient->createCallbackVirtualAccount($external_id, $bank_code, $name, $virtual_account_number = null);
		/*
			Array ( 
				[owner_id] => 59ed590fbb5fc1374146d534 
				[external_id] => 160989 [
				bank_code] => BRI 
				[merchant_code] => 26215 
				[name] => Simpanan Wajib Budi Susanto
				[account_number] => 262159999550086 
				[is_single_use] => 
				[status] => ACTIVE
				[expiration_date] => 2049-01-31T17:00:00.000Z 
				[is_closed] =>
				[id] => 5a72cb90ff2b85a2210083ea )
		*/
         return $response;
    }

    function create_va($data=null){
    	require DOCUMENTROOT.'/vendor/autoload.php'; 
    	
    	 $id_invoice =  $this->m_data->getSeqVal('seq_invoice');

		 $options['secret_api_key'] = SECRET_API_KEY; 

		 $xenditPHPClient = new XenditClient\XenditPHPClient($options); 

		 $id_member_saving = $data['id_member_saving']; //id_member_saving
		 $external_id = $id_member_saving;
		 $payer_email = 'senusaid@gmail.com';
		 $description = 'Top Up ';
		 $amount = 26000;
		 $options['should_send_email'] = 'false';

		 $response = $xenditPHPClient->createInvoice((string) $external_id, $amount, $payer_email, $description, $options);
		 // print_r($response); 

		 $sni_fee_amount = 1000;
		 $xnd_fee_amount = 5900;

			// $xendit_fee_amount = isset($response['xendit_fee_amount']) ? $response['xendit_fee_amount'] : null;
			// $received_amount = isset($response['received_amount']) ? $response['received_amount'] : null;

		  $inv = array(
		  		'id_invoice' => $id_invoice,
				'id_member_saving' =>  $id_member_saving,
				'id_xd' => $response['id'],
				'user_id' => $response['user_id'],
				'xendit_fee_amount' => $xnd_fee_amount,
				'sni_fee_amount' => $sni_fee_amount,
				// 'received_amount' => isset($response['received_amount']) ? $response['received_amount'] : null,
				'status' => $response['status'],
				'merchant_name' => $response['merchant_name'],
				'merchant_profile_picture_url' => $response['merchant_profile_picture_url'],
				'amount' => $response['amount'],
				'payer_email' => $response['payer_email'],
				'description' => $response['description'],
				'expiry_date' => $response['expiry_date'],
				'invoice_url' => $response['invoice_url'],
				'should_exclude_credit_card' => $response['should_exclude_credit_card'],
				'should_send_email' => $response['should_send_email']
		 	);
		 $this->db->insert('invoice',$inv);

		 // $invoice_id = $this->db->insert_id();
		 $norek = null;
		 if(count($response['available_banks'])>0){
		 	foreach ($response['available_banks'] as $key => $value) {
			 	$bank = array(
						// 'invoice_bank_id' => $,
						'id_invoice' => $id_invoice,
						'bank_code' => $value['bank_code'],
						'collection_type' => $value['collection_type'],
						'bank_account_number' => $value['bank_account_number'],
						'transfer_amount' => $value['transfer_amount'],
						'bank_branch' => $value['bank_branch'],
						'account_holder_name' => $value['account_holder_name'],
						'identity_amount' => $value['identity_amount']
			 		);
			 	$this->db->insert('invoice_bank',$bank);

			 	if($value['bank_code']=='BRI'){
			 		$norek = $value['bank_account_number'];
			 	}
			 }
		 }

		 return $norek;
	}
	
	function get_total_saving_member(){
		$q = $this->db->query("select sum(balance) as total_balance
								from member_saving
								where id_member = ".$this->input->get('id_member')." ")->row();
		if($q->total_balance==null){
			$total = 0;
		} else {
			$total = $q->total_balance;
		}
		$json = array('success' => true, 'total' => number_format($total));
		echo json_encode($json);
	}

}