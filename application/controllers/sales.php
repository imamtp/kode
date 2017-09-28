<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class sales extends MY_Controller {

    public function index() {
        
    }
    
    public function saveQuotation(){
        $params = array(
            'idunit' => $this->input->post('unit'),
            'prefix' => 'SQ',
            'table' => 'sales',
            'fieldpk' => 'idsales',
            'fieldname' => 'no_sales_quote',
            'extraparams'=> null,
        );
        $this->load->library('../controllers/setup');
        $noarticle = $this->setup->getNextNoArticle2($params);

        $this->db->trans_begin();
        $noquotation = $this->input->post('nojurnalSalesQuotation') != null ? $this->input->post('nojurnalSalesQuotation') : $noarticle;
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
            'no_sales_quote' => $noquotation,
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
                'idsalesitem' => $value->idsalesitem,
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
                'deleted' => $value->deleted == null ? 0 : $value->deleted,
                'ratetax' => $ratetax

            );

            // if($statusform == 'input'){
            if($item['idsalesitem'] == null){
                if($item['deleted'] != 1){
                    $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                    $item['idsalesitem'] = $q_seq->result_array()[0]['nextval'];
                    $this->db->insert('salesitem', $item);
                }
            }else{
                $this->db->where('idsalesitem', $item['idsalesitem']);
                if($item['deleted'] != 1){
                    $item['usermod'] = $this->session->userdata('userid');
                    $item['datemod'] = date('Y-m-d H:i:s');
                    $this->db->update('salesitem', $item);
                } else {
                    $this->db->delete('salesitem');
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
        $statusform = $this->input->post('statusform');
        $params = array(
            'idunit' => $this->input->post('unit'),
            'prefix' => 'SO',
            'table' => 'sales',
            'fieldpk' => 'idsales',
            'fieldname' => 'no_sales_order',
            'extraparams'=> null,
        );
        $this->load->library('../controllers/setup');
        $noarticle = $this->setup->getNextNoArticle2($params);
        
        $this->db->trans_begin();
        // $items = json_decode($this->input->post('items'), true)[0];
        $items = json_decode($this->input->post('datagrid'));

        $idsales = $this->m_data->getPrimaryID($this->input->post('idsales'),'sales', 'idsales', $this->input->post('unit'));

        $ratetax = $this->input->post('ratetax');
        $idtax = $this->m_data->getIdTax($ratetax);

        $header = array(
            'idsales' => $idsales,
            'idsales_quote'=> $this->input->post('idsales_quote') == '' ? null : $this->input->post('idsales_quote'),
            'idcustomer' => $this->input->post('customerSalesOrder'),
            // 'date_quote' => inputDate($this->input->post('tanggalSalesQuotation')),
            'delivery_date' => inputDate($this->input->post('delivery_date')),
           
            'idtax' => $idtax,
            'shipaddress'=> $this->input->post('shipaddress'),
            'subtotal' => clearnumberic($this->input->post('subtotalSalesOrder')),
            'disc' => clearnumberic($this->input->post('discSalesOrder')),
            'total_dpp' => clearnumberic($this->input->post('dppSalesOrder')),
            'freight'=> clearnumberic($this->input->post('freight')),
            'totalamount' => clearnumberic($this->input->post('totalSalesOrder')),
            'tax' => clearnumberic($this->input->post('totalPajak')),
            'include_tax'=> $this->input->post('include_tax') == 'true' ? 1 : 0,
            'comments' => $this->input->post('memoSalesOrder')?:null,
            'idshipping' => $this->input->post('shippingSalesOrder') == '' ? null : $this->input->post('shippingSalesOrder'),
            'paidtoday'=> 0,
            'balance'=> clearnumberic($this->input->post('totalSalesOrder')),

            'idpayment'=> $this->input->post('idpayment'),
            'ddays'=> $this->input->post('ddays')?:null,
            'eomddays'=> $this->input->post('eomddays')?:null,
            'percentagedisc'=> $this->input->post('percentagedisc')?:null,
            'daydisc'=> $this->input->post('daydisc')?:null,
            'dmax'=> $this->input->post('dmax')?:null,
            // 'isrecuring' => $this->input->post('paymentSalesQuotation'),
            // 'startdate' date,
            // 'recuntildate' date,
            // 'recnumtimes' int4,
            // 'alertto' int4,
            // 'notifto' int4,
            // 'display' int4,
             'type'=>2,
             
             'status'  => $this->input->post('sales_order_status'),
            //  'idcurrency'  => $this->session->userdata('userid'),
            'idemployee'=> $this->input->post('salesman_id') == '' ? null : $this->input->post('salesman_id'),
             'idunit'  => $this->input->post('unit')
        );
        
        if($statusform == 'input'){
            $header['no_sales_order'] = $noarticle;
            $header['userin'] = $this->session->userdata('userid');
            $header['datein'] = date('Y-m-d H:m:s');
            $header['date_sales'] = date('Y-m-d');
            $this->db->insert('sales', $header);
        }
        else if($statusform == 'edit'){
            $header['usermod'] = $this->session->userdata('userid');
            $header['datemod'] = date('Y-m-d H:m:s');
            $this->db->where('idsales', $header['idsales']);
            $this->db->update('sales', $header);
        }

        foreach ($items as $value) {
            $item = array(
                'idsalesitem' => $value->idsalesitem,
                'idsales' => $header['idsales'],
                'idinventory' => $value->idinventory,
                'measurement_id' => $this->m_data->getMeasurement($value->short_desc,$this->input->post('unit')),
                'warehouse_id' => $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$this->input->post('unit')),
                // 'invno' => $value->invno,
                'qty' => $value->qty,
                'size' => $value->size,
                'measurement_id_size' => $this->m_data->getMeasurement($value->size_measurement,$this->input->post('unit')),
                // 'sku_no'=> $value->sku_no,
                'disc' => $value->disc,
                'price' => $value->price,
                'total' => $value->total,
                // 'remarks' => $value->remarks,
                'ratetax' => $value->ratetax,
                'deleted' => $value->deleted == null ? 0 : $value->deleted,
            );

            if($item['idsalesitem'] == null){
                if($item['deleted'] != 1){
                    $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                    $item['idsalesitem'] = $q_seq->result_array()[0]['nextval'];
                    $item['userin'] = $this->session->userdata('userid');
                    $item['datein'] = date('Y-m-d H:i:s');
                    $this->db->insert('salesitem', $item);
                }
            }else{
                $this->db->where('idsalesitem', $item['idsalesitem']);
                if($item['deleted'] != "1"){
                    $item['usermod'] = $this->session->userdata('userid');
                    $item['datemod'] = date('Y-m-d H:i:s');
                    $this->db->update('salesitem', $item);
                }
                else
                    $this->db->delete('salesitem');
            }
        }

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
        $idsales_quote = $this->input->post('idsales_quote');

        if($status==3){
            //confirm
            $this->db->where('idsales', $idsales);
            $this->db->update('sales', array(
                'status'=>$status
            ));

            if($idsales_quote!='' || $idsales_quote!=null){
                $this->db->where('idsales', $idsales_quote);
                $this->db->update('sales', array(
                    'status'=>3 //kalo so dari sales quotation set ke 3 (ordered)
                ));
            }
        } else if($status==4){
             //closed

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

        
           
            $this->db->where('idsales', $idsales);
            $this->db->update('sales', array(
                'status'=>$status
            ));
           
            $total_hpp = $this->m_stock->update_hpp_old($idunit,3,null,$idsales)['total_hpp'];

            //create journal
            $journal = $this->m_jsales->sales_do(date('Y-m-d'),$total_hpp,$idunit,$qsales->idaccount_hppenjualan,$qsales->idaccount_persediaan,'Sales Delivery - NO SO : '.$qsales->no_sales_order);
            $this->db->where('idsales',$idsales);
            $this->db->where('idunit',$idunit);
            $this->db->update('sales',array(
                    'idjournal_do'=>$journal['idjournal']
                ));
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

        $params = array(
            'idunit' => $this->input->post('unit'),
            'prefix' => 'DO',
            'table' => 'delivery_order',
            'fieldpk' => 'delivery_order_id',
            'fieldname' => 'no_do',
            'extraparams'=> null,
        );
        $this->load->library('../controllers/setup');
        $noarticle = $this->setup->getNextNoArticle2($params);
        $this->db->trans_begin();
        // $items = json_decode($this->input->post('items'), true)[0];

        $no_faktur = $this->input->post('no_faktur');
        $statusform = $this->input->post('statusform');
        $idsales = $this->input->post('idsales');        
        $idunit = $this->input->post('unit');
        $no_do = $this->input->post('no_do');
        $idaccount_hppenjualan = $this->input->post('idaccount_hppenjualan');
        $idaccount_persediaan = $this->input->post('idaccount_persediaan');
        $biaya_angkut = $this->input->post('biaya_angkut') =='' ? 0 : str_replace('.','',$this->input->post('biaya_angkut'));
        $subtotal = str_replace('.','',$this->input->post('subtotal'));
        $amount = $subtotal + $biaya_angkut;

        //cek nomor faktur
        if($this->input->post('delivery_order_id')===''){
            //insert
            $qfak = $this->db->query("select no_faktur from sales where no_faktur = '".$no_faktur."' and idunit = ".$idunit." ");
        } else {
            //edit
            $qfak = $this->db->query("select no_faktur from sales where no_faktur = '".$no_faktur."' and idunit = ".$idunit." and idsales != ".$idsales."");
        }
        if($qfak->num_rows()>0){
            $json = array('success'=>false,'message'=>'No Faktur sudah ada di dalam database');
            echo json_encode($json);
            return false;
        } 
        //end cek nomor faktur

        $delivery_order_id = $this->m_data->getPrimaryID($this->input->post('delivery_order_id'),'delivery_order', 'delivery_order_id', $this->input->post('unit'));

        $header = array(
            'no_do'=>$no_do?: $noarticle,
            'delivery_order_id' => $delivery_order_id,
            'idunit' => $idunit,
            // 'idtax'=> $this->m_data->getIdTax($this->input->post('ratetax')),
            'date_created'=> date('Y-m-d'),
            'delivery_date'=> backdate($this->input->post('tanggal')),
            'idsales'=> $idsales,
            'remarks' => $this->input->post('memo'),
            
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
            $header['usermod']= $this->session->userdata('userid');
            $header['datemod']= date('Y-m-d H:i:s');
            $this->db->where('delivery_order_id', $delivery_order_id);
            $this->db->update('delivery_order', $header);
        } else {
            $header['userin']= $this->session->userdata('userid');
            $header['datein']= date('Y-m-d H:i:s');
            $this->db->insert('delivery_order', $header);
        }

        // if($statusform == 'input'){
        //         $this->db->insert('delivery_order', $header);
        // } else if($statusform == 'edit'){
        //     $this->db->where('delivery_order_id', $delivery_order_id);
        //     $this->db->update('delivery_order', $header);
        // }

        $this->db->where('idsales',$idsales);
        $this->db->update('sales',array(
            'freight'=>str_replace('.', '', $this->input->post('biaya_angkut')?:0),
            'no_faktur'=>$no_faktur?:null,
            ));

        //update qty kirim
        $totalkirim = 0;
        $total_amount_kirim = 0;
        $items = json_decode($this->input->post('datagrid'));
        foreach ($items as $value) {
            //ambil inventory_parent, hanya utk sementara ambil dr db. biar cepet ngodingnya, nantinya harus ada di $items
            $sql = "select b.idinventory_parent, b.invno, c.nameinventory, a.idinventory, stock, d.size, b.ratio_two, c.hpp_per_unit as hpp from warehouse_stock a
                    join inventory b on b.idinventory = a.idinventory --child
                    join inventory c on c.idinventory = b.idinventory_parent --parent
                    join salesitem d on d.idinventory = b.idinventory_parent and d.size = b.ratio_two
                    where b.idinventory_parent = $value->idinventory 
                    and idsalesitem = $value->idsalesitem
                    and stock > 0";
            $qinv = $this->db->query($sql);
            $inv = $qinv->row();
            
            $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);
            $sisakirim = $value->qtysisakirim==null ? 0 : $value->qtysisakirim;
            $arrWer = array(
                'idsalesitem'=>$value->idsalesitem,
                'idsales'=>$idsales
            );

            $qkirim = $this->db->get_where('salesitem',$arrWer)->row();
            $current_qty = $qkirim->qty_kirim == null ? 0 : $qkirim->qty_kirim; 
            // $this->db->where('idsalesitem',$value->idsalesitem);
            // $this->db->where('idsales',$idsales);
            $this->db->where($arrWer);
            $this->db->update('salesitem',array('qty_kirim'=>$current_qty+$value->qty_kirim,'warehouse_id'=>$warehouse_id));

            $qty_item = $value->qty_kirim * $inv->ratio_two; //konversi qty_kirim(lbr/btg) jadi satuan terkecil (m)
            $balance_item = $qty_item * $inv->hpp; // menghitung new balance dalam satuan m
            
            // //log hpp history
            // if(!$this->m_stock->update_hpp($inv->idinventory_parent,$idunit, 3, 'out',$balance_item,$qty_item, 'null', $idsales, 'null')){
            //     $this->db->trans_rollback();
            //     $json = array('success'=>false,'message'=>'Terajadi kesalahan saat hitung hpp');
            //     echo json_encode($json);
            //     exit();
            // }
            
            //update stock history
            $this->m_stock->update_history(8,$qty_item,$inv->idinventory,$inv->idinventory_parent,$idunit,$warehouse_id,date('Y-m-d'),'Delivery Order: '.$no_do, null, $no_do);
            $totalkirim+=$value->qty_kirim;

            $total_amount_kirim+=$value->qty_kirim*$qkirim->price;
        }
        // echo 'totalkirim:'.$totalkirim;

        /*
            Buat jurnal
        */
        // $idjournal = $this->m_jsales->sales_delivery_order($idsales,$total_amount_kirim,$idaccount_hppenjualan,$idaccount_persediaan,$no_do);

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
                // 'idjournal_do'=>$idjournal
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

        $qHeader = $this->db->query("select a.no_faktur,a.idsales,a.idpayment,a.idemployee,a.idjournal,a.idcustomer,a.date_quote,a.no_sales_quote,a.subtotal,a.freight,a.tax,a.disc,
                    a.total_dpp,a.totalamount,a.paidtoday,a.balance,a.comments,a.userin,a.datein,a.status,a.idcurrency,a.idunit,a.type,a.idsales_quote,a.date_sales,a.no_sales_order,
                    b.namepayment,c.firstname as fn_sales,c.lastname as ln_sales,d.nocustomer,d.namecustomer,e.namecurr,e.symbol as symbol_currency,
                    f.namaunit,g.delivery_order_id,g.no_do,g.remarks,g.delivery_date,g.vehicle_number,g.driver_name,g.idshipping,g.ship_address,g.notes as note_shipping,h.nameshipping,i.nametax,a.ddays,a.eomddays,a.percentagedisc,a.daydisc,a.dmax
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
        $this->load->model('journal/m_jsales','jmodel');
        
        $statusform = $this->input->post('statusform');
        $params = array(
            'idunit' => $this->input->post('unit'),
            'prefix' => 'SI',
            'table' => 'sales',
            'fieldpk' => 'id_inv',
            'fieldname' => 'noinvoice',
            'extraparams'=> null,
        );
        $this->load->library('../controllers/setup');
        $noarticle = $this->setup->getNextNoArticle2($params);
        
        $id_inv = $this->m_data->getPrimaryID(null,'sales', 'id_inv', $this->input->post('idunit'));
        
        $this->db->trans_begin();

        $saldo = post_number($this->input->post('sisa_bayar'));
        $paidtoday = str_replace('.', '', $this->input->post('pembayaran'));
        $diskon = post_number($this->input->post('diskon'));
        $freight = post_number($this->input->post('biayaangkut'));
        $pajak = post_number($this->input->post('total_pajak'));

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
                'id_inv'=> $id_inv,
                'paidtoday'=> 0, //masih jadi piutang
                'balance'=>$saldo, //piutang masih full
                'idpayment' => $idpayment,
                'ddays' => $this->input->post('ddays')=='' ? null : $this->input->post('ddays'),
                'eomddays' => $this->input->post('eomddays')=='' ? null : $this->input->post('eomddays'),
                'percentagedisc' => $this->input->post('percentagedisc')=='' ? null : $this->input->post('percentagedisc'),
                'daydisc' => $this->input->post('daydisc')=='' ? null : $this->input->post('daydisc'),
                'notes_si' => $this->input->post('notes_si'),
                'invoice_status'=>$invoice_status,
                'disc'=>$diskon,
                'freight'=>$freight,
                'noinvoice'=> $this->input->post('noinvoice')?: $noarticle,
                'invoice_date' => backdate($this->input->post('invoice_date')),
                'status'=> 8 //invoiced
            );

        $duedate = null;
        switch($data['idpayment']){
            case 3:  //net d days
                $duedate = date("Y-m-d", strtotime("+$data[ddays] day", strtotime($data['invoice_date'])));
                break;
            case 4: //emoddays
                $eom = date('Y-m-t', strtotime($data['invoice_date']));
                $duedate = date("Y-m-d", strtotime("+$data[eomddays] day", strtotime($eom)));
                break;
            case 5: //discount dmax
                $duedate = date("Y-m-d", strtotime("+$data[ddmax] day", strtotime($data['invoice_date'])));
                break;
        }
        $data['duedate'] = $duedate;

        $this->db->where('idsales',$this->input->post('idsales'));
        $this->db->update('sales',$data);

        //buat jurnal piutang
        $this->jmodel->sales_kredit(date('Y-m-d'),$saldo,null,$this->input->post('idunit'),$freight,'Piutang Penjualan: '.$this->input->post('memo'),$diskon,$pajak);

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

    function print_so($idsales,$print=null){
        $this->load->model('sales/m_salesorder','model');
        $d['data'] = $this->model->cetak_so($idsales);
        // print_r($d); die;
        $d['title'] = 'Sales Order';
        $d['print'] = $print;
        $d['isInvoice'] = false;
        $d['invoice_date'] = null;
        if($print == null)
            $this->load->view('tplcetak/sales_print',$d);
        else{    
            $filename = $d['title']."-".$d['data']['no'];
            $filename = str_replace(" ", "-", $filename);
            // $pdfFilePath = '/var/www/html/'.DIR_APP."/download/reports/$filename.pdf";
            $pdfFilePath = DIR_DOWNLOAD."/reports/$filename.pdf";

            ini_set('memory_limit','32M'); // boost the memory limit if it's low ;)
            $html = $this->load->view('tplcetak/sales_print',$d, true);
            // // $html = $this->load->view('pdf_report', $data, true); // render the view into HTML
            $this->load->library('pdf');
            $pdf = $this->pdf->load();
            $pdf->WriteHTML($html); // write the HTML into the PDF
            $pdf->Output($pdfFilePath, 'F'); // save to file because we can

            redirect("download/reports/$filename.pdf");
            unlink("download/reports/$filename.pdf");
        }
    }

    function print_invoice($id=null,$print=false){
        $this->load->model('sales/m_salesinvoice','model');
        $d['data'] = $this->model->cetak($id);
        // print_r($d);die;
        $d['title'] = 'Sales Invoice';
        $d['print'] = $print;
        $d['isInvoice'] = true;
        
        if($print == null)
            $this->load->view('tplcetak/sales_invoice',$d);
        else{    
            $filename = $d['title']."-".$d['data']['no_si'];
            $filename = str_replace(" ", "-", $filename);
            // $pdfFilePath = '/var/www/html/'.DIR_APP."/download/reports/$filename.pdf";
            $pdfFilePath = DIR_DOWNLOAD."/reports/$filename.pdf";

            ini_set('memory_limit','32M'); // boost the memory limit if it's low ;)
            $html = $this->load->view('tplcetak/sales_invoice',$d, true);
            // // $html = $this->load->view('pdf_report', $data, true); // render the view into HTML
            $this->load->library('pdf');
            $pdf = $this->pdf->load();
            $pdf->WriteHTML($html); // write the HTML into the PDF
            $pdf->Output($pdfFilePath, 'F'); // save to file because we can

            redirect("download/reports/$filename.pdf");
            unlink("download/reports/$filename.pdf");
        }
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

        if($status==6){
            ///jika barang sudah dikirim semua buat jurnal
             $this->m_jsales->sales_delivery_retur_perpetual(date('Y-m-d'),'Delivery Return Penjualan: '.$noreturn,$idunit,$sales_return_id);
        }

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

        //create journal Retur Penjualan
        if($status==3){
            $journal = $this->m_jsales->sales_retur_perpetual(date('Y-m-d'),$totalprice_retur,'Return Penjualan: '.$noreturn,$this->input->post('idunit'),$this->input->post('idaccount_return'));
            
            $this->db->where('sales_return_id',$sales_return_id);
            $this->db->update('sales_return',array('idjournal'=>$journal['idjournal']));
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
        if($print == null)
            $this->load->view('tplcetak/sales_picking_note',$d);
        else{    
            $filename = $d['title']."-".$d['data']['no'];
            $filename = str_replace(" ", "-", $filename);
            // $pdfFilePath = '/var/www/html/'.DIR_APP."/download/reports/$filename.pdf";
            $pdfFilePath = DIR_DOWNLOAD."/reports/$filename.pdf";

            ini_set('memory_limit','32M'); // boost the memory limit if it's low ;)
            $html = $this->load->view('tplcetak/sales_picking_note',$d, true);
            // // $html = $this->load->view('pdf_report', $data, true); // render the view into HTML
            $this->load->library('pdf');
            $pdf = $this->pdf->load();
            $pdf->WriteHTML($html); // write the HTML into the PDF
            $pdf->Output($pdfFilePath, 'F'); // save to file because we can

            redirect("download/reports/$filename.pdf");
            unlink("download/reports/$filename.pdf");
        }
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
        // print_r($d['data']);
        $d['title'] = 'Delivery Order';
        $d['print'] = $print;
        if($print == null)
            $this->load->view('tplcetak/delivery_order',$d);
        else{    
            $filename = $d['title']."-".$d['data']['no'];
            $filename = str_replace(" ", "-", $filename);
            // $pdfFilePath = '/var/www/html/'.DIR_APP."/download/reports/$filename.pdf";
            $pdfFilePath = DIR_DOWNLOAD."/reports/$filename.pdf";

            ini_set('memory_limit','32M'); // boost the memory limit if it's low ;)
            $html = $this->load->view('tplcetak/delivery_order',$d, true);
            // // $html = $this->load->view('pdf_report', $data, true); // render the view into HTML
            $this->load->library('pdf');
            $pdf = $this->pdf->load();
            $pdf->WriteHTML($html); // write the HTML into the PDF
            $pdf->Output($pdfFilePath, 'F'); // save to file because we can

            redirect("download/reports/$filename.pdf");
            unlink("download/reports/$filename.pdf");
        }        
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
        $idsalesitem = $this->input->get('idsalesitem');
        
        $sql = "select c.sku_no, c.nameinventory, sum(stock) as stock, d.size, b.ratio_two from warehouse_stock a
                join inventory b on b.idinventory = a.idinventory --child
                join inventory c on c.idinventory = b.idinventory_parent --parent
                join salesitem d on d.idinventory = b.idinventory_parent and d.size = b.ratio_two
                where b.idinventory_parent = $idinventory 
                and idsalesitem = $idsalesitem
                and stock > 0
                group by c.sku_no, c.nameinventory, d.size, b.ratio_two";
        $qcek = $this->db->query($sql);

        // $qcek = $this->db->get_where('warehouse_stock',array(
        //         'idinventory'=> $idinventory,
        //         'warehouse_id'=>$this->m_data->getIDmaster('warehouse_code',$this->input->get('warehouse_code'),'warehouse_id','warehouse',$idunit),
        //         'idunit'=>$idunit
        //     ));

        $success = true;
        $msg = null;

        if($qcek->num_rows()>0){
            $r = $qcek->row();
            $stock = $r->stock / $r->ratio_two; //stock dalam satuan ke dua
            if($qty_kirim>$stock){
                $success = false;
                $msg = "Kuantitas kirim untuk barang: <b>".$this->input->get('invno')." ".$this->input->get('nameinventory'). "</b> melebihi stok yang tersedia di gudang <b>".$this->input->get('warehouse_code')."</b>";
            }

            if($stock<=0 || $stock==null){
                $success = false;
                $msg = "Kuantitas kirim untuk barang: <b>".$this->input->get('invno')." ".$this->input->get('nameinventory'). "</b> melebihi stok yang tersedia di gudang <b>".$this->input->get('warehouse_code')."</b>";
            }
        } else {
            $success = false;
            $msg = "Stok untuk barang: <b>".$this->input->get('nameinventory'). "</b> tidak tersedia di gudang <b>".$this->input->get('warehouse_code')."</b>";
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

    function check_stock_kirim2(){
        //cek stok di gudang sebelum dikirim
        $items = json_decode($this->input->get('grid_kirim'));
        $idunit = $this->input->get('idunit');
        // var_dump($items); die;

        $data = array();
        $i=0;
        $data[$i]['idinventory'] = null;
        $data[$i]['nameinventory'] = null;
        $data[$i]['qty_kirim'] = 0;
        foreach ($items as $value) {
            if($i==0){
                $data[$i]['idinventory'] = $value->idinventory;
                $data[$i]['nameinventory'] = $value->nameinventory;
                $data[$i]['qty_kirim'] = $value->qty_kirim;
            } else if(array_search($value->idinventory, array_column($data, 'idinventory')) !== false){
                $data[array_search($value->idinventory, array_column($data, 'idinventory'))]['qty_kirim'] += $value->qty_kirim;
            } else {
                $data[$i]['idinventory'] = $value->idinventory;
                $data[$i]['nameinventory'] = $value->nameinventory;
                $data[$i]['qty_kirim'] = $value->qty_kirim;
            }           
            $i++;
        }
        // print_r($data);
        // echo array_search($value->idinventory, array_column($data, 'idinventory')).' ';
        //bandingin dengan stok yang tersedia
        $success = true;
        $message = '';
        foreach($data as $v){
            $msg = null;
            $q = $this->db->query("select sum(stock) as totalstock
                                    from warehouse_stock
                                    where idinventory = ".$v['idinventory']." ");

            if($q->num_rows()>0){
                $r = $q->row();
                if($r->totalstock==0 || $r->totalstock==null){
                    $totalstock = 0;
                } else {
                    $totalstock = $r->totalstock;
                }
            } else {
                $totalstock = 0;
            }

            if($v['qty_kirim']>$totalstock){
                 $success = false;
                 $msg = "Kuantitas kirim untuk barang: <b>".$v['nameinventory']. "</b> melebihi stok yang tersedia ";
            }
            
             //cek status
            $qstatus = $this->db->query("select a.idinventory,a.warehouse_id,COALESCE( NULLIF(a.stock,null) , 0 ) as stock,a.idunit,c.warehouse_code
                                        from warehouse_stock a
                                        left join inventory b ON a.idinventory = b.idinventory
                                        join warehouse c ON a.warehouse_id = c.warehouse_id
                                        where a.idinventory = ".$v['idinventory']." and a.idunit = $idunit");
            $txt = "<br><br><b>Status Stok</b>:<br>";
            foreach ($qstatus->result() as $r) {
                $txt.= 'Warehouse '. $r->warehouse_code.' : '.$r->stock.'<br>';
            }

            $message.= $msg.$txt.'--------------------------------------<br>';
        }

        $json = array('success'=>$success,'message'=>$message);
        echo json_encode($json);
    }

    function tes_array(){
        $data[0]['idinventory'] = 123;
        $data[1]['idinventory'] = 456;

        $found_key = array_search(4562, array_column($data, 'idinventory'));
        echo $found_key;
    }

     function generate_jurnal_sales_do(){
        $idunit = 12;
        $this->load->model('journal/m_jsales','jmodel');
        $this->load->model('inventory/m_stock');

        $q = $this->db->query("select *
                                from sales
                                where noinvoice is not null
                                order by invoice_status");
        foreach($q->result() as $r){

            // $this->db->where('idsales', $idsales);
            // $this->db->update('sales', array(
            //     'status'=>$status
            // ));
            $qsales = $this->db->query("select no_sales_order,idaccount_hppenjualan,idaccount_persediaan from sales
                                        where idsales = $r->idsales and idunit = $idunit")->row();
           
            $total_hpp = $this->m_stock->update_hpp($idunit,3,null,$r->idsales)['total_hpp'];

            //create journal
            $journal = $this->jmodel->sales_do($r->delivery_date,$total_hpp,$idunit,$qsales->idaccount_hppenjualan,$qsales->idaccount_persediaan,'Sales Delivery - NO SO : '.$qsales->no_sales_order);
            $this->db->where('idsales',$r->idsales);
            $this->db->where('idunit',$idunit);
            $this->db->update('sales',array(
                    'idjournal_do'=>$journal['idjournal']
                ));

            //add history stok

            //update warehouse_stock
        }        
    }

    function generate_jurnal_sales(){
        $this->load->model('journal/m_jsales','jmodel');

        $q = $this->db->query("select *
                                from sales
                                where noinvoice is not null
                                order by invoice_status");
        foreach($q->result() as $r){
            $j = $this->jmodel->sales_kredit($r->date_sales,$r->balance,null,12,$r->freight,'Piutang Penjualan - No SO: '.$r->no_sales_order,$r->disc,$r->tax);

            $this->db->where('idsales',$r->idsales);
            $this->db->update('sales',array('idjournal_invoice'=>$j['idjournal']));
        }        
    }

    function generate_jurnal_sales_pelunasan(){
        $idunit = 12;
        $this->load->model('journal/m_jsales','jmodel');

        $q = $this->db->query("select a.*,b.idaccount_coa_kas,b.date_payment,b.sales_payment_id
                                from sales a
                                join sales_payment b ON a.idsales = b.idsales
                                where a.noinvoice is not null and a.invoice_status = 2
                                order by a.invoice_status");
        foreach($q->result() as $r){
            $invoice_status = 2; //paid
            $journal = $this->jmodel->sales_pelunasan_full($r->date_payment,'Pelunasan Piutang - No Invoice: '.$r->noinvoice,$r->paidtoday,$idunit,null,$r->idaccount_coa_kas);

            $this->db->where('idsales',$r->idsales);
            $this->db->update('sales',array('invoice_status'=>$invoice_status));

            $this->db->where('idsales',$r->idsales);
            $this->db->update('sales_payment',array('idjournal'=>$journal['idjournal']));
        }        
    }

   
}
?>