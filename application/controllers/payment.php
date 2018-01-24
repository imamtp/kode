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
					}
					
				}
			}
			
        	

	    } else {
	        print_r("Cannot ".$_SERVER["REQUEST_METHOD"]." ".$_SERVER["SCRIPT_NAME"]);
	    }
	}

}
?>
	