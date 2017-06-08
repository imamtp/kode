<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class sales extends MY_Controller {

    public function index() {
        
    }
    
    public function saveQuotation(){
        // print_r($_POST); die;
        // $retAkses = $this->cekAksesUser(16,'add');
        // if(!$retAkses['success'])
        // {
        //     echo json_encode($retAkses);
        //     exit;
        // }

        $this->db->trans_begin();
        // $items = json_decode($this->input->post('items'), true)[0];
        $items = json_decode($this->input->post('datagrid'));

        $statusform = $this->input->post('statusform');

        $ratetax = $this->input->post('ratetax');
        $idtax = $this->m_data->getIdTax($ratetax);

        $idsales = $this->m_data->getPrimaryID($this->input->post('idsales'),'sales', 'idsales', $this->input->post('unit'));

        $header = array(
            'idsales' => $idsales,
            // 'idpayment'=> $this->input->post('paymentSalesQuotation'),
            'idtax'=>$idtax,
            'idcustomer' => $this->input->post('customerSalesQuotation'),
            'date_quote' => inputDate($this->input->post('tanggalSalesQuotation')),
            'expireddate' => inputDate($this->input->post('expiredDate')),
            'no_sales_quote' => $this->input->post('nojurnalSalesQuotation'),
            // 'shipto'=> $this->input->post('shipaddressSalesQuotation'),
            'subtotal' => clearnumberic($this->input->post('subtotalSalesQuotation')),
            'freight' => clearnumberic($this->input->post('angkutSalesQuotation')),
            'tax' => clearnumberic($this->input->post('totalPajak')),
            // 'disc' => $this->input->post('paymentSalesQuotation'),
            'totalamount' => clearnumberic($this->input->post('totalSalesQuotation')),
            'paidtoday' => clearnumberic($this->input->post('pembayaranSalesQuotation')),
            'balance' => clearnumberic($this->input->post('sisaBayarSalesQuotation')),
            'comments' => $this->input->post('memoSalesQuotation'),
            // 'isrecuring' => $this->input->post('paymentSalesQuotation'),
            // 'startdate' date,
            // 'recuntildate' date,
            // 'recnumtimes' int4,
            // 'alertto' int4,
            // 'notifto' int4,
            // 'display' int4,
             'type'=>1, //sales quotation
             'userin' => $this->session->userdata('userid'),
             'datein' => date('Y-m-d H:m:s'),
             'status'  => $this->input->post('sales_quotation_status'),
             'idcurrency'  => $this->session->userdata('userid'),
             'idunit'  => $this->input->post('unit')
        );

        if($statusform == 'input'){
            $this->db->insert('sales', $header);
        }
        else if($statusform == 'edit'){
            $this->db->where('idsales', $idsales);
            $this->db->update('sales', $header);
        }


        foreach ($items as $value) {

            $measure = $this->m_data->getMeasurement($value->short_desc,$this->input->post('unit'));

            $item = array(
                'idsales' => $idsales,
                'idinventory' => $value->idinventory,
                'measurement_id' => $measure,
                // 'invno' => $value->invno,
                'qty' => $value->qty,
                'disc' => $value->disc,
                'price' => $value->price,
                'total' => $value->total,
                'size' => $value->size,
                'measurement_id_size' => $this->m_data->getMeasurement($value->size_measurement,$this->input->post('unit')),
                // 'remarks' => $value->remarks,
                'ratetax' => $ratetax
            );
            if($statusform == 'input'){
                $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                $item['idsalesitem'] = $q_seq->result_array()[0]['nextval'];
                $this->db->insert('salesitem', $item);
            }
            else if($statusform == 'edit'){
                if($value->idsalesitem==null || $value->idsalesitem==''){
                     $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                    $item['idsalesitem'] = $q_seq->result_array()[0]['nextval'];
                     $this->db->insert('salesitem', $item);
                } else {
                    $item['idsalesitem'] = $value->idsalesitem;
                    $this->db->where('idsalesitem', $item['idsalesitem']);
                    $this->db->update('salesitem', $item);
                }
                
              
            }
        }
        // $this->db->trans_rollback();
        // exit();
        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    
    }  

    function saveSalesOrder(){
        $this->db->trans_begin();
        // $items = json_decode($this->input->post('items'), true)[0];
        $items = json_decode($this->input->post('datagrid'));

        $statusform = $this->input->post('statusform');

        $idsales = $this->m_data->getPrimaryID($this->input->post('idsales'),'sales', 'idsales', $this->input->post('unit'));

        $ratetax = $this->input->post('ratetax');
        $idtax = $this->m_data->getIdTax($ratetax);

        $header = array(
            'idsales' => $idsales,
            'idpayment'=> $this->input->post('paymentSalesOrder') == '' ? null : $this->input->post('paymentSalesOrder'),
            'idsales_quote'=> $this->input->post('idsales_quote') == '' ? null : $this->input->post('idsales_quote'),
            'idcustomer' => $this->input->post('customerSalesOrder'),
            // 'date_quote' => inputDate($this->input->post('tanggalSalesQuotation')),
            'delivery_date' => inputDate($this->input->post('delivery_date')),
            'date_sales' => date('Y-m-d'),
            'no_sales_order' => $this->input->post('nojurnalSalesOrder'),
            'idtax' => $idtax,
            // 'shipto'=> $this->input->post('shipaddressSalesOrder'),
            'subtotal' => clearnumberic($this->input->post('subtotalSalesOrder')),
            'freight' => clearnumberic($this->input->post('angkutSalesOrder')),
            'tax' => clearnumberic($this->input->post('totalPajak')),
            // 'disc' => $this->input->post('paymentSalesQuotation'),
            'totalamount' => clearnumberic($this->input->post('totalSalesOrder')),
            'paidtoday' => clearnumberic($this->input->post('pembayaranSalesOrder')),
            'balance' => clearnumberic($this->input->post('sisaBayarSalesOrder')),
            'comments' => $this->input->post('memoSalesOrder'),
            'idshipping' => $this->input->post('shippingSalesOrder') == '' ? null : $this->input->post('shippingSalesOrder'),
            'paidtoday' => clearnumberic($this->input->post('pembayaranSalesOrder')),
            'balance'=> clearnumberic($this->input->post('sisaBayarSalesOrder')),
            // 'isrecuring' => $this->input->post('paymentSalesQuotation'),
            // 'startdate' date,
            // 'recuntildate' date,
            // 'recnumtimes' int4,
            // 'alertto' int4,
            // 'notifto' int4,
            // 'display' int4,
             'type'=>2,
             'userin' => $this->session->userdata('userid'),
             'datein' => date('Y-m-d H:m:s'),
             'status'  => $this->input->post('sales_order_status'),
             'idcurrency'  => $this->session->userdata('userid'),
            'salesman_id'  => $this->input->post('salesman_id') == '' ? null : $this->input->post('salesman_id'),
             'idunit'  => $this->input->post('unit')
        );
        
        if($statusform == 'input'){
            $this->db->insert('sales', $header);
        }
        else if($statusform == 'edit'){
            $this->db->where('idsales', $idsales);
            $this->db->update('sales', $header);
        }


        foreach ($items as $value) {

            $item = array(
                'idsales' => $idsales,
                'idinventory' => $value->idinventory,
                'measurement_id' => $this->m_data->getMeasurement($value->short_desc,$this->input->post('unit')),
                'warehouse_id' => $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$this->input->post('unit')),
                // 'invno' => $value->invno,
                'qty' => $value->qty,
                'size' => $value->size,
                'measurement_id_size' => $this->m_data->getMeasurement($value->size_measurement,$this->input->post('unit')),
                'sku_no'=> $value->sku_no,
                'disc' => $value->disc,
                'price' => $value->price,
                'total' => $value->total,
                // 'remarks' => $value->remarks,
                'ratetax' => $value->ratetax
            );
            if($statusform == 'input'){
                $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                $item['idsalesitem'] = $q_seq->result_array()[0]['nextval'];
                $this->db->insert('salesitem', $item);
            }
            else if($statusform == 'edit'){
                $item['idsalesitem'] = $value->idsalesitem;
                $this->db->where('idsalesitem', $item['idsalesitem']);
                $this->db->update('salesitem', $item);
            }

            //update harga jual di inventory
            // $this->db->where('idinventory',$value->idinventory);
            // $this->db->update('inventory',array('cost'=>$value->price));
        }
        // $this->db->trans_rollback();
        // exit();
        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function get_item_sales(){
        $this->load->model('sales/m_salesorder');

        // $idsales = $this->input->get('idsales');
        
        // if($this->input->get('item_selector_sr')==true){
        //     $token = $this->input->get('token');

        //     $wer = " and a.idsalesitem not in (select idsalesitem from sales_return_tmp where token = '$token')";
        // } else {
        //     $wer = null;
        // }

        // $q = $this->db->query("select a.*,b.invno,b.nameinventory,c.short_desc,d.warehouse_code
        //                         from salesitem a
        //                         join inventory b ON a.idinventory = b.idinventory
        //                         join productmeasurement c ON c.measurement_id = a.measurement_id
        //                         left join warehouse d ON d.warehouse_id = a.warehouse_id
        //                         where idsales = $idsales $wer");
        // $r = $q->result_array();
        $r = $this->m_salesorder->query_itemsales($this->input->get('idsales'),$this->input->get('item_selector_sr'),$this->input->get('token'));
        echo json_encode(array('data'=>$r));
    }

    function set_status(){
        $this->db->trans_begin();

        $this->load->model('inventory/m_stock');
        $this->load->model('journal/m_jsales');

        $idsales = $this->input->post('idsales');
        $status = $this->input->post('status');
        $idunit = $this->input->post('idunit');

        $qsales = $this->db->query("select no_sales_order,idaccount_hppenjualan,idaccount_persediaan from sales
                                    where idsales = $idsales and idunit = $idunit")->row();

        if($qsales->idaccount_hppenjualan==null){
             $json = array('success'=>false,'message'=>'Akun perkiraan HPP belum ditentukan');
             echo json_encode($json);
             return false;
        }

        if($qsales->idaccount_persediaan==null){
             $json = array('success'=>false,'message'=>'Akun perkiraan persediaan belum ditentukan');
             echo json_encode($json);
             return false;
        }

        if($status==4){
            //closed
            $this->db->where('idsales', $idsales);
            $this->db->update('sales', array(
                'status'=>$status
            ));
           
            $total_hpp = $this->m_stock->update_hpp($idunit,3,null,$idsales)['total_hpp'];

            //create journal
            $this->m_jsales->sales_do(date('Y-m-d'),$total_hpp,$idunit,$qsales->idaccount_hppenjualan,$qsales->idaccount_persediaan,'Sales Delivery - HPP : '.$qsales->no_sales_order);
        }

         if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        } else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'Status has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function saveDeliveryOrder(){
        $this->load->model('inventory/m_stock');
        $this->load->model('journal/m_jsales');

        $this->db->trans_begin();
        // $items = json_decode($this->input->post('items'), true)[0];

        $statusform = $this->input->post('statusform');
        $idsales = $this->input->post('idsales');
        $delivery_order_id = $this->m_data->getPrimaryID($this->input->post('delivery_order_id'),'delivery_order', 'delivery_order_id', $this->input->post('unit'));
        $idunit = $this->input->post('unit');
        $no_do = $this->input->post('no_do');
        $idaccount_hppenjualan = $this->input->post('idaccount_hppenjualan');
        $idaccount_persediaan = $this->input->post('idaccount_persediaan');
        $biaya_angkut = $this->input->post('biaya_angkut') =='' ? 0 : str_replace('.','',$this->input->post('biaya_angkut'));
        $subtotal = str_replace('.','',$this->input->post('subtotal'));
        $amount = $subtotal + $biaya_angkut;

        $header = array(
            'no_do'=>$no_do,
            'delivery_order_id' => $delivery_order_id,
            'idunit' => $idunit,
            // 'idtax'=> $this->m_data->getIdTax($this->input->post('ratetax')),
            'date_created'=> date('Y-m-d'),
            'delivery_date'=> backdate($this->input->post('tanggal')),
            'idsales'=> $idsales,
            'remarks' => $this->input->post('memo'),
            'userin' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s'),
            'idshipping'=>$this->input->post('idshipping') == '' ? null : $this->input->post('idshipping'),
            'driver_name'=>$this->input->post('driver_name'),
            'vehicle_number'=>$this->input->post('vehicle_number'),
            'ship_address'=>$this->input->post('ship_address'),
            // 'status'=> $this->input->post('status'),
            'deleted'=>0
        );

        $qdo = $this->db->get_where('delivery_order',array('idsales'=>$idsales,'idunit'=>$idunit));
        if($qdo->num_rows()>0){
            $qdo = $qdo->row();
            $delivery_order_id = $qdo->delivery_order_id;
            $this->db->where('delivery_order_id', $delivery_order_id);
            $this->db->update('delivery_order', $header);
        } else {
             $this->db->insert('delivery_order', $header);
        }

        // if($statusform == 'input'){
        //         $this->db->insert('delivery_order', $header);
        // } else if($statusform == 'edit'){
        //     $this->db->where('delivery_order_id', $delivery_order_id);
        //     $this->db->update('delivery_order', $header);
        // }

        $this->db->where('idsales',$idsales);
        $this->db->update('sales',array('freight'=>str_replace('.', '', $this->input->post('biaya_angkut'))));

        //update qty kirim
        $totalkirim = 0;
        $items = json_decode($this->input->post('datagrid'));
        foreach ($items as $value) {
            $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);

            $sisakirim = $value->qtysisakirim==null ? 0 : $value->qtysisakirim;

            $this->db->where('idsalesitem',$value->idsalesitem);
            $this->db->where('idsales',$idsales);
            $this->db->update('salesitem',array('qty_kirim'=>$sisakirim+$value->qty_kirim,'warehouse_id'=>$warehouse_id));

            //update stock history
            $this->m_stock->update_history(8,$value->qty_kirim,$value->idinventory,$idunit,$warehouse_id,date('Y-m-d'),'Delivery Order: '.$no_do);
            $totalkirim+=$value->qty_kirim;
        }
        // echo 'totalkirim:'.$totalkirim;

        //cek apakah total qty kirim sudah sama dengan qty order. jika belum set dengan status partialy sent (6)
        $qcek = $this->db->query("select sum(qty) as totalorder, COALESCE(sum(qty_kirim), 0 ) as totalkirim 
                                    from 
                                    salesitem
                                    where idsales = $idsales")->row();
        // echo $this->db->last_query();
        if($qcek->totalorder>$qcek->totalkirim) {
            $status_delivery = 6; //Partially Shipped
        } else {
            $status_delivery = 7; //full packed/delivering
        }
        // echo $status_delivery;
        // $this->db->where('delivery_order_id',$delivery_order_id);
        $this->db->where('idsales',$idsales);
        $this->db->where('idunit',$idunit);
        // $this->db->update('delivery_order',array('status'=>$status_delivery));
        $this->db->update('sales',array(
                'status'=>$status_delivery,
                'idaccount_hppenjualan'=>$idaccount_hppenjualan,
                'idaccount_persediaan'=>$idaccount_persediaan
            ));
        //end check

        /*
            notes: 7 may 2017
            status di tabel di delivery_order gak dipake. jadi yang dipakai ada di tabel sales
        */

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        } else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function get_sales_data(){
        $this->load->model('sales/m_salesorder','model');

        $idsales = $this->input->get('idsales');

        $qHeader = $this->db->query("select a.idsales,a.idpayment,a.idemployee,a.idjournal,a.idcustomer,a.date_quote,a.no_sales_quote,a.subtotal,a.freight,a.tax,a.disc,
                    a.totalamount,a.paidtoday,a.balance,a.comments,a.userin,a.datein,a.status,a.idcurrency,a.idunit,a.type,a.idsales_quote,a.date_sales,a.no_sales_order,
                    b.namepayment,c.firstname as fn_sales,c.lastname as ln_sales,d.nocustomer,d.namecustomer,e.namecurr,e.symbol as symbol_currency,
                    f.namaunit,g.delivery_order_id,g.remarks,g.delivery_date,g.vehicle_number,g.driver_name,g.idshipping,g.ship_address,g.notes as note_shipping,h.nameshipping,i.nametax
                    from sales a
                    left join payment b ON a.idpayment = b.idpayment
                    left join employee c ON a.idsales = c.idemployee
                    join customer d ON a.idcustomer = d.idcustomer
                    left join currency e ON a.idcurrency = e.idcurrency
                    join unit f ON a.idunit = f.idunit
                    left join delivery_order g ON a.idsales = g.idsales
                    left join shipping h ON g.idshipping = h.idshipping
                    left join tax i ON a.idtax = i.idtax
                    where a.type = 2 and a.idsales = $idsales");
        if($qHeader->num_rows()>0)
        {
            $r = $qHeader->result_array()[0];
            $data = array('status'=>true,'data'=>$r,'items'=>$this->model->query_itemsales($idsales));

            // $qItem = $this->db->query("select a.idsalesitem,a.idinventory,a.warehouse_id,a.qty,a.measurement_id,a.price,a.disc,a.ratetax,a.size,a.measurement_id_size,a.total,
            //                             b.invno,b.nameinventory,b.sku_no,c.warehouse_desc,c.warehouse_code,d.short_desc,e.short_desc as size_measurement
            //                             from salesitem a
            //                             join inventory b ON a.idinventory = b.idinventory
            //                             join warehouse c ON a.warehouse_id = c.warehouse_id
            //                             join productmeasurement d ON a.measurement_id = d.measurement_id
            //                             left join productmeasurement e ON a.measurement_id_size = e.measurement_id
            //                             where a.idsales = $idsales");

            // if($qItem->num_rows()>0)
            // {
            //     $data = array(
            //             'data'=>$r,
            //             'items'=>$qItem->result_array()
            //         );

            //     $data = array('status'=>true,'data'=>$r,'items'=>$qItem->result_array());
            // } else {
            //     array_push($r, array('items'=>null));
            //     $data = array('status'=>true,'data'=>$r);
            // }
            
        } else {
            $data = array('status'=>false,'message'=>'Sales data not found');
        }

        echo json_encode($data);
    }

    function save_sales_invoice(){
        $this->db->trans_begin();

        $saldo = str_replace('.', '', $this->input->post('sisa_bayar'));
        $paidtoday = str_replace('.', '', $this->input->post('pembayaran'));

        // if(intval($saldo)>0) {
        //     // $invoice_status = 4; //Partially Paid
        // }

        // if(intval($paidtoday)==0) {
        //     $invoice_status = 1; //unpaid
        // }

        $invoice_status = 1; //unpaid

        $idpayment = $this->input->post('idpayment');

        $data = array(
                // 'paidtoday'=> $paidtoday,
                'paidtoday'=> 0, //masih jadi piutang
                'balance'=>$this->input->post('total_amount'), //piutang masih full
                'idpayment' => $idpayment,
                'ddays' => $this->input->post('ddays')=='' ? null : $this->input->post('ddays'),
                'eomddays' => $this->input->post('eomddays')=='' ? null : $this->input->post('eomddays'),
                'percentagedisc' => $this->input->post('percentagedisc')=='' ? null : $this->input->post('percentagedisc'),
                'daydisc' => $this->input->post('daydisc')=='' ? null : $this->input->post('daydisc'),
                'notes_si' => $this->input->post('notes_si'),
                'invoice_status'=>$invoice_status,
                'noinvoice'=> $this->input->post('noinvoice'),
                'invoice_date' => backdate($this->input->post('invoice_date')),
                'status'=> 8 //invoiced
            );
        $this->db->where('idsales',$this->input->post('idsales'));
        $this->db->update('sales',$data);

        //buat jurnal piutang
        $this->load->model('journal/m_jsales','jmodel');
        $this->jmodel->sales_kredit(date('Y-m-d'),$this->input->post('total_amount'),null,$this->input->post('idunit'),$this->input->post('biayaangkut'),'Piutang Penjualan: '.$this->input->post('memo'));

          if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        } else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function get_payment_info(){
         $idsales = $this->input->get('idsales');
         $q = $this->db->query("select a.idsales,a.no_sales_quote,a.subtotal,a.freight,a.tax,a.disc,
                a.totalamount,a.paidtoday,a.balance,a.date_sales,a.no_sales_order,d.nocustomer,d.namecustomer,e.namecurr,e.symbol as symbol_currency,
                a.ddays,a.eomddays,a.percentagedisc,a.daydisc
                from sales a
                join customer d ON a.idcustomer = d.idcustomer
                left join currency e ON a.idcurrency = e.idcurrency
                where a.idsales = $idsales");
         if($q->num_rows()>0)
         {
            $data = array('status'=>true,'data'=>$q->result_array()[0]);
         } else {
            $data = array('status'=>false,'mesaage'=>'Data not found');
         }
         echo json_encode($data);
    }

    function save_payment(){
        $this->load->model('journal/m_jsales','jmodel');

        $this->db->trans_begin();

        $idsales = $this->input->post('idsales');
        $balance_sales = str_replace('.', '', $this->input->post('balance_sales'));
        $amount = str_replace('.', '', $this->input->post('amount'));
        $selisih = intval($balance_sales-$amount);
        $idaccount_coa_kas = $this->input->post('idaccount');

        $idunit = $this->session->userdata('idunit');

        if($selisih==0)
        {
            $invoice_status = 2; //paid
            $journal = $this->jmodel->sales_pelunasan_full(date('Y-m-d'),'Pelunasan Piutang',$amount,$idunit,null,$idaccount_coa_kas);
        } else if($amount<$balance_sales)
        {
            $invoice_status = 4; //Partially Paid
            $journal = $this->jmodel->sales_pelunasan_sebagian(date('Y-m-d'),'Pelunasan Piutang Sebagian',$amount,$idunit,null,$idaccount_coa_kas);
        } else {
            $invoice_status = 1; //Unpaid
            $journal['idjournal'] = null;
        }

        $data = array(
                'sales_payment_id'=> $this->m_data->getPrimaryID($this->input->post('sales_payment_id'),'sales_payment', 'sales_payment_id', $idunit),
                'idsales'=> $this->input->post('idsales'),
                'idjournal'=> $journal['idjournal'],
                'idunit'=> $idunit,
                'amount'=> $amount,
                'date_payment'=>backdate($this->input->post('date_payment')),
                'notes'=> $this->input->post('notes'),
                'userin' => $this->session->userdata('userid'),
                'idaccount_coa_kas'=>$idaccount_coa_kas,
                'datein' => date('Y-m-d H:m:s')
            );
        $this->db->insert('sales_payment',$data);

        $balance = $balance_sales-$amount;

        $salesCurent = $this->db->query("select paidtoday from sales where idsales = $idsales and idunit = $idunit")->row();

        $update = array(
            'paidtoday' => ($salesCurent->paidtoday+$amount),
            'invoice_status' => $invoice_status,
            'balance' => $selisih
        );

        $this->db->where('idsales',$idsales);
        $this->db->update('sales',$update);

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        } else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);

    }

    function get_sum_invoice(){
        //header summary invoice

        $idunit = $this->session->userdata('idunit');

        $q = $this->db->query("select totalPaid,totalUnpaid
                                from (
                                    select sum(paidtoday) as totalPaid
                                    from sales
                                    where type = 2 and (invoice_status = 2) and idunit = $idunit
                                ) a,
                                ( 
                                    select sum(balance) as totalUnpaid
                                    from sales
                                    where type = 2 and idunit = $idunit and (invoice_status = 1 OR invoice_status = 4) ) b");
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $data = array(
                    'totalPaid'=>isset($r->totalpaid) ? number_format($r->totalpaid) : 0,
                    'totalUnpaid'=>isset($r->totalunpaid) ? number_format($r->totalunpaid) : 0,
                    'totalDue'=>0
                );
        } else {
            $data = array(
                    'totalPaid'=>0,
                    'totalUnpaid'=>0,
                    'totalDue'=>0
                );
        }

        echo json_encode($data);
    }

    function print_invoice($id=null,$print=false){
        $this->load->model('sales/m_salesinvoice','model');
        $d['data'] = $this->model->cetak($id);
        // print_r($d);
        $d['title'] = 'Sales Invoice';
        $d['print'] = $print;
        $this->load->view('tplcetak/sales_print',$d);
    }

    function save_item_sales_return_tmp(){
        // print_r($_POST);
        $d = array(
                'idsalesitem'=>$this->input->post('idsalesitem'),
                'qty_return'=>$this->input->post('qty_retur'),
                'idsales'=>$this->input->post('idsales'),
                'token'=>$this->input->post('token'),
                'idunit'=>$this->session->userdata('idunit'),
                'notes' => $this->input->post('notes')
            );
        $this->db->insert('sales_return_tmp',$d);
    }

    function get_item_sales_return_tmp(){
        $sql = "select a.idsalesitem,a.idsales,a.qty_return,a.idunit,a.notes,b.idinventory,b.qty,b.price,b.disc,b.total,b.ratetax,b.size,b.measurement_id_size,
            b.qty_kirim,c.invno,c.nameinventory,c.sku_no,c.measurement_id_one,d.short_desc,e.short_desc as size_measurement
            from sales_return_tmp a
            join salesitem b ON a.idsalesitem = b.idsalesitem
            join inventory c ON b.idinventory = c.idinventory
            left join productmeasurement d ON c.measurement_id_one = d.measurement_id
            left join productmeasurement e ON b.measurement_id_size = e.measurement_id
                where a.token = '".$this->input->get('token')."'";

        $q = $this->db->query($sql);
        $data = $q->result_array();

        $subtotal = 0;
        $disc = 0;
        $tax = 0;
        $price = 0;
        $qty_return = 0;
        foreach ($data as $key => $value) {
            $subtotal +=$value['total'];
            $tax+= ($value['total']*($value['ratetax']/100));
            $disc +=$value['disc'];
            $price +=$value['price'];
            $qty_return +=$value['qty_return'];
        }
        echo json_encode(array(
                'data'=>$data,
                'subtotal'=>$subtotal,
                'tax'=>$tax,
                'disc'=>$disc,
                'price'=>$price,
                'qty_return'=>$qty_return,
                'total'=>($subtotal-$disc)+$tax
            ));
    }

    function saveDeliverySalesReturn(){
        $this->db->trans_begin();

        $this->load->model('inventory/m_stock');
        $this->load->model('journal/m_jsales');

        $sales_return_id = $this->input->post('sales_return_id');
        $idunit = $this->input->post('idunit');
        $noreturn = $this->input->post('noreturn');
        $items = json_decode($this->input->post('datagrid'));

        // $qso = $this->db->query("")

        $qty_retur = 0;
        $qty_kirim = 0;
        foreach ($items as $value) {
            $qty_kirim+=$value->qty_kirim;
            $qty_retur+=$value->qty_return;

            $ditem = array(
                    'qty_sent'=>$value->qty_kirim,
                    'notes'=> $value->notes
            );
            $this->db->where(
                array(
                    'sales_return_id'=>$sales_return_id,
                    'idsalesitem'=> $value->idsalesitem,
                    'idinventory'=> $value->idinventory
                )
            );
            $this->db->update('sales_return_item',$ditem);

            $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);

            //update history stock
            $this->m_stock->update_history(14,$value->qty_kirim,$value->idinventory,$idunit,$warehouse_id,date('Y-m-d H:m:s'),'Delivery Sales Return: '.$noreturn);
        }

        if($qty_retur>=$qty_kirim){
            //full delvering
            $status = 6;
        } else {
            $status = 5; //partial
        }

        $this->db->where(
                array(
                    'sales_return_id'=>$sales_return_id
                )
        );
        $this->db->update('sales_return',array(
            'status'=>$status
        ));

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        } else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function saveSalesReturn(){

        $this->load->model('inventory/m_stock');
        $this->load->model('journal/m_jsales');

        $this->db->trans_begin();

        $sales_return_id = $this->m_data->getPrimaryID($this->input->post('sales_return_id'),'sales_return', 'sales_return_id', $this->input->post('idunit'));
        $statusform = $this->input->post('statusform');
        $noreturn = $this->input->post('noreturn');
        $status = $this->input->post('status');

        $data = array(
                'sales_return_id' => $sales_return_id,
                'status' => $status,
                'idunit' =>$this->input->post('idunit'),
                'return_date' => backdate($this->input->post('tanggal')),
                'noreturn' => $noreturn,
                'idcustomer' =>$this->input->post('idcustomer'),
                'memo' =>$this->input->post('memo'),
                'notes' => $this->input->post('notes'),
                'token' =>$this->input->post('token'),
                'return_amount' => cleardot2($this->input->post('nominal')),
                'subtotal'=> $this->input->post('subtotal')=='' ? null : clearnumberic($this->input->post('subtotal')),
                'totaltax'=> $this->input->post('totaltax')=='' ? null : cleardot2($this->input->post('totaltax')),
                'totaldisc'=> $this->input->post('totaldisc')=='' ? null : cleardot2($this->input->post('totaldisc')),
                'aftertax'=> $this->input->post('aftertax')=='' ? null : clearnumberic($this->input->post('aftertax')),
                'idaccount_bank' =>$this->input->post('idaccount_bank'),
                'idaccount_return' =>$this->input->post('idaccount_return'),
                'userin' =>$this->session->userdata('userid'),
                'datein' => date('Y-m-d H:m:s')
        );

        if($statusform=='edit'){
            $this->db->where('sales_return_id',$sales_return_id);
            $this->db->update('sales_return',$data);
        } else {
            $this->db->insert('sales_return',$data);
        }
        

        $items = json_decode($this->input->post('datagrid'));

        $totalprice_retur = 0;
        foreach ($items as $value) {
            $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$this->input->post('idunit'));
            // echo $warehouse_id;
            $ditem = array(
                    'sales_return_id'=>$sales_return_id,
                    'idsalesitem'=> $value->idsalesitem,
                    'idinventory'=> $value->idinventory,
                    'qty_return'=> $value->qty_return,
                    'warehouse_id'=> $warehouse_id,
                    'notes'=> $value->notes,
                    'resend'=>2
            );

            if($statusform=='edit'){
                $this->db->where(
                    array(
                        'sales_return_id'=>$sales_return_id,
                        'idsalesitem'=> $value->idsalesitem,
                        'idinventory'=> $value->idinventory
                    )
                );
                $this->db->update('sales_return_item',$ditem);
            } else {
                $this->db->insert('sales_return_item',$ditem);
            }
            // $this->db->insert('sales_return_item',$ditem);

            //query nilainya
            $qprice = $this->db->query("select price from salesitem where idsalesitem = ".$value->idsalesitem." ")->row();
            $totalprice_retur += $qprice->price*$value->qty_return;

             //update history stock
            // if($status==3)
            // {
            //     $this->m_stock->update_history(6,$value->qty_return,$value->idinventory,$this->input->post('idunit'),$warehouse_id,date('Y-m-d H:m:s'),'Sales Return: '.$noreturn);
            // }
        }

        //create journal Retur Penjualan Tunai
        if($status==3){
            $this->m_jsales->sales_retur_tunai(date('Y-m-d'),$totalprice_retur,'Return Penjualan: '.$noreturn,$this->input->post('idunit'),$this->input->post('idaccount_return'));
        }

        //hapus data temporary
        $this->db->where(array('token' =>$this->input->post('token')));
        $this->db->delete('sales_return_tmp');

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);        
    }

    function del_return_item(){
        //menghapus item detail temporari di form return penjualan
        $this->db->where(array(
                'idsalesitem'=> $this->input->post('idsalesitem'),
                'token'=> $this->input->post('token')
            ));
        $this->db->delete('sales_return_tmp');
    }

    function print_quotation($idsales,$print=null){
        $this->load->model('sales/m_salesquotation','model');
        $d['data'] = $this->model->cetak_quote($idsales);
        // print_r($d); die;
        $d['title'] = 'Sales Quotation';
        $d['print'] = $print;
        $this->load->view('tplcetak/sales_quotation',$d);
    }

    function print_picking_note($idsales,$print=null){
        $this->load->model('sales/m_salesorder','model');
        $d['data'] = $this->model->cetak_so($idsales);
        $d['title'] = 'Picking Note Delivery Order';
        $d['print'] = $print;
        $this->load->view('tplcetak/sales_picking_note',$d);
    }

    function print_picking_note_return($sales_return_id,$print=null){
        $this->load->model('sales/m_salesreturn','model');
        $d['data'] = $this->model->cetak_so_return($sales_return_id);
        $d['title'] = 'Picking Note Return Order';
        $d['print'] = $print;
        $this->load->view('tplcetak/sales_picking_note_return',$d);
    }

    function print_delivery_order($delivery_order_id,$print=null){
        $this->load->model('sales/m_deliveryordergrid','model');
        $d['data'] = $this->model->cetak_do($delivery_order_id);
        $d['title'] = 'Delivery Order';
        $d['print'] = $print;
        $this->load->view('tplcetak/delivery_order',$d);
    }

    function set_picking_return(){
        $this->db->where('sales_return_id',$this->input->post('sales_return_id'));
        $this->db->update('sales_return',array('status'=>4));
    }

    function set_picking(){
        $this->db->where('idsales',$this->input->post('idsales'));
        $this->db->update('sales',array('status'=>5));
    }

    function check_stock_kirim(){
        //cek stok di gudang sebelum dikirim
        $qty_kirim = $this->input->get('qty_kirim');
        $idunit = $this->input->get('idunit');
        $idinventory = $this->input->get('idinventory');

        $qcek = $this->db->get_where('warehouse_stock',array(
                'idinventory'=> $idinventory,
                'warehouse_id'=>$this->m_data->getIDmaster('warehouse_code',$this->input->get('warehouse_code'),'warehouse_id','warehouse',$idunit),
                'idunit'=>$idunit
            ));

        $success = true;
        $msg = null;

        if($qcek->num_rows()>0){
            $r = $qcek->row();
            if($qty_kirim>$r->stock){
                $success = false;
                $msg = "Kuantitas kirim untuk barang: <b>".$this->input->get('invno')." ".$this->input->get('nameinventory'). "</b> melebihi stok yang tersedia di gudang <b>".$this->input->get('warehouse_code')."</b>";
            }

            if($r->stock<=0 || $r->stock==null){
                $success = false;
                $msg = "Kuantitas kirim untuk barang: <b>".$this->input->get('invno')." ".$this->input->get('nameinventory'). "</b> melebihi stok yang tersedia di gudang <b>".$this->input->get('warehouse_code')."</b>";
            }
        } else {
            $success = false;
            $msg = "Stok untuk barang: <b>".$this->input->get('invno')." ".$this->input->get('nameinventory'). "</b> tidak tersedia di gudang <b>".$this->input->get('warehouse_code')."</b>";
        }

        //cek status
        $qstatus = $this->db->query("select a.idinventory,a.warehouse_id,COALESCE( NULLIF(a.stock,null) , 0 ) as stock,a.idunit,c.warehouse_code
                                    from warehouse_stock a
                                    left join inventory b ON a.idinventory = b.idinventory
                                    join warehouse c ON a.warehouse_id = c.warehouse_id
                                    where a.idinventory = $idinventory and a.idunit = $idunit");
         $txt = "<br><br><b>Status Stok</b>:<br>";
         foreach ($qstatus->result() as $r) {
             $txt.= 'Warehouse '. $r->warehouse_code.' : '.$r->stock.'<br>';
         }

         $json = array('success'=>$success,'message'=>$msg.$txt);
         echo json_encode($json);
    }
}
?>