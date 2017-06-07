<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class purchase extends MY_Controller {

    public function index() {
        
    }

    public function savePurchase(){
        $retAkses = $this->cekAksesUser(134,'add');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        $this->db->trans_begin();
        // $items = json_decode($this->input->post('items'), true)[0];
        $items = json_decode($this->input->post('items'));

        $statusform = $this->input->post('statusform');

        $header = array(
            // 'idpurchase' => $this->input->post('idpurchase') == null ? $idpurchase : $this->input->post('idpurchase'),
            'idpurchase' => $this->input->post('idpurchase')?: null,
            'idunit' => $this->input->post('idunit') ?: null,
            'idsupplier' => $this->input->post('idsupplier') ?: null,
            'idproject' => $this->input->post('idproject') ?: null,
            'norecord' => $this->input->post('norecord') ?: null,
            'nopurchase' => $this->input->post('nopurchase') ?: null,
            'requestdate' => $this->input->post('requestdate') ?: null,
            'idpurchasestatus' => $this->input->post('idpurchasestatus') ?: null,
            'idpurchasetype' => $this->input->post('idpurchasetype') ?: null,
            'netddays' => $this->input->post('netddays') ?: null,
            'neteomddays' => $this->input->post('neteomddays') ?: null,
            'discount' => $this->input->post('discount') ?: null,
            'netdmax' => $this->input->post('netdmax') ?: null,
            'idcurrency' => $this->input->post('idcurrency') ?: null,
            'idshipping' => $this->input->post('idshipping') ?: null,
            'shipaddress' => $this->input->post('shipaddress') ?: null,
            'notes' => $this->input->post('notes') ?: null,
            'subtotal' => $this->input->post('subtotal') ?: null,
            'tax' => $this->input->post('tax') ?: null,
            'totalamount' => $this->input->post('totalamount') ?: null,
        );
        // print_r($header);
        // print_r($items);
        // exit();

        // //definisikan asset account di inventory unit sebelum diproses lebih lanjut
        // foreach ($items as $key => $value) {
        //     $arrwer = array('idinventory'=>$value->idinventory,'idunit'=>$header['idunit']);
        //     $insertArr = array('idinventory'=>$value->idinventory,'idunit'=>$header['idunit'],'assetaccount'=>$value->assetaccount);
        //     $qcek = $this->db->get_where('inventoryunit',$arrwer);
        //     if($qcek->num_rows()>0)
        //     {
        //         $r = $qcek->row();
        //         if($r->assetaccount==null)
        //         {
        //             $this->db->where($arrwer);
        //             $this->db->update('inventoryunit',$insertArr);                    
        //         }
        //     } else {
        //         $this->db->insert('inventoryunit',$insertArr);
        //     }
        // }
        // //end define asset account
        
        if($header['idpurchase'] == null){   
            $q_seq = $this->db->query("select nextval('seq_purchase')");
            $header['idpurchase'] = $q_seq->result_array()[0]['nextval'];
            $header['userin'] = $this->session->userdata('userid');
            $header['datein'] = date('Y-m-d H:i:s');
            $this->db->insert('purchase', $header);
        }else{
            $qcek = $this->db->get_where('purchase', array('idpurchase'=>$header['idpurchase']));
            if($qcek->result_array()[0]['idpurchasestatus'] >= 3 && $this->session->userdata('group_id') == 61){
                $json = array('success'=>false,'message'=>'You are not allowed to change this requisition.<br/>Status of this requisition is not open.');
                echo json_encode($json);
                exit();
            }
            $this->db->where('idpurchase', $header['idpurchase']);
            $header['usermod'] = $this->session->userdata('userid');
            $header['datemod'] = date('Y-m-d H:i:s');
            $this->db->update('purchase', $header);
        }

        foreach ($items as $value) {
            $item = array(
                'idpurchase' => $header['idpurchase'],
                'idpurchaseitem' => $value->idpurchaseitem ?: null,
                'idinventory' => $value->idinventory,
                'invno' => $value->invno,
                'qty' => $value->qty,
                'cost' => $value->cost,
                'total' => $value->total,
                'remarks' => $value->remarks,
                'ratetax' => $value->ratetax,
            );
            if($item['idpurchaseitem'] == null){
                $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                $item['idpurchaseitem'] = $q_seq->result_array()[0]['nextval'];
                $item['userin'] = $this->session->userdata('userid');
                $item['datein'] = date('Y-m-d H:i:s');
                $this->db->insert('purchaseitem', $item);
            }else{
                // $item['idpurchaseitem'] = $value->idpurchaseitem;
                $item['usermod'] = $this->session->userdata('userid');
                $item['datemod'] = date('Y-m-d H:i:s');
                $this->db->where('idpurchaseitem', $item['idpurchaseitem']);
                $this->db->update('purchaseitem', $item);
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

    function saveRequisition(){

        $this->db->trans_begin();

        $statusform = $this->input->post('statusform');
        $idpurchase = $this->m_data->getPrimaryID($this->input->post('idpurchase'),'purchase', 'idpurchase', $this->input->post('unit'));
        $ratetax = $this->input->post('ratetax');
        $idtax = $ratetax == '' ? null : $this->m_data->getIdTax($ratetax);
        $items = json_decode($this->input->post('datagrid'));

        $data = array(
            'idpurchase' => $idpurchase,
            // 'idcreditterm' =>,
            // 'idshipping' =>,
            'idpurchasetype' =>1,
            // 'idpurchasestatus' => $this->input->post('pr_status'),
            'idpurchasestatus'=>1,
            // 'idfrequency' =>,
            // 'idjournal' =>,
            'idtax' => $idtax,
            // 'name' =>,
            // 'payee' =>,
            // 'shipaddress' =>,
            'date' => str_replace('T00:00:00', '', $this->input->post('tanggalPurchaseRequisition')),
            // 'includetax' =>,
            // 'requestdate' =>,
            // 'freigthcost' =>,
            'tax' => clearnumberic($this->input->post('totalPajak')),
            // 'amountdue' =>,
            'totalamount' => clearnumberic($this->input->post('totalPurchaseRequisition')),
            // 'paidtoday' =>,
            // 'totalowed' =>,
            // 'balance' =>,
            'memo' => $this->input->post('memoPurchaseRequisition'),
            // 'isrecuring' =>,
            // 'startdate' =>,
            // 'recuntildate' =>,
            // 'recnumtimes' =>,
            // 'alertto' =>,
            // 'notifto' =>,
            // 'display' =>,
            // 'year' =>,
            // 'month' =>,
            'userin' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s'),
            'idpayment' => $this->input->post('paymentPurchaseRequisition'),
            'requestbyid'=> $this->input->post('requestbyid'),
            // 'notes' =>,
            // 'duedate' =>,
            // 'paiddate' =>,
            'idunit' => $this->input->post('unit'),
            // 'idcurrency' =>,
            // 'noinvoice' =>,
            'subtotal' => clearnumberic($this->input->post('subtotalPurchaseRequisition')),
            // 'totalpaid' =>,
            // 'deleted' =>,
            // 'idproject' =>,
            'nopurchase' => $this->input->post('nojurnalPurchaseRequisition'),
            // 'id_payment_term' =>,
            'idsupplier' => $this->input->post('supplierPurchaseRequisition'),
            'status' => 1
            // 'netddays' => ,
            // 'neteomddays' => ,
            // 'discount' =>,
            // 'netdmax' => ,
            // 'delivered=>' =>,
            // 'approver' =>,
            // 'norecord' =>
        );

        if($statusform == 'input'){
            $this->db->insert('purchase', $data);
        }
        else if($statusform == 'edit'){
            $this->db->where('idpurchase', $idpurchase);
            $this->db->update('purchase', $data);
        }


        foreach ($items as $value) {

            $qmeasurement = $this->db->query("select measurement_id from productmeasurement where short_desc = '".$value->short_desc."' and idunit = ".$this->input->post('unit')." ");
            if($qmeasurement->num_rows()>0)
            {
                $rMeasurement = $qmeasurement->row();
                $measure = $rMeasurement->measurement_id;
            } else {
                $measure = null;
            }

            $item = array(
                'idpurchase' => $idpurchase,
                'idinventory' => $value->idinventory,
                'measurement_id' => $measure,
                // 'invno' => $value->invno,
                'qty' => $value->qty,
                'disc' => $value->disc,
                'price' => $value->price,
                'total' => $value->total,
                // 'remarks' => $value->remarks,
                'ratetax' => $ratetax=='' ? null : $ratetax
            );
            if($statusform == 'input'){
                $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                $item['idpurchaseitem'] = $q_seq->result_array()[0]['nextval'];
                $this->db->insert('purchaseitem', $item);
            }
            else if($statusform == 'edit'){
                $item['idpurchaseitem'] = $value->idpurchaseitem;
                $this->db->where('idpurchaseitem', $item['idpurchaseitem']);
                $this->db->update('purchaseitem', $item);
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

    function get_item_pr(){
        //get purchase requisition list
        $idpurchase = $this->input->get('idpurchase');
        
        if($this->input->get('item_selector_pr')==true){
            $token = $this->input->get('token');

            $wer = " and a.purchaseitem not in (select purchaseitem from purchase_return_tmp where token = '$token')";
        } else {
            $wer = null;
        }

        $q = $this->db->query("select a.*,b.invno,b.nameinventory,c.short_desc,d.warehouse_code
                                from purchaseitem a
                                join inventory b ON a.idinventory = b.idinventory
                                join productmeasurement c ON c.measurement_id = a.measurement_id
                                left join warehouse d ON d.warehouse_id = a.warehouse_id
                                where idpurchase = $idpurchase $wer");
        $r = $q->result_array();
        echo json_encode(array('data'=>$r));
    }

    function savePurchaseOrder(){

         $this->db->trans_begin();

        $statusform = $this->input->post('statusform');
        $idpurchase = $this->m_data->getPrimaryID($this->input->post('idpurchase'),'purchase', 'idpurchase', $this->input->post('unit'));
        $ratetax = $this->input->post('ratetax');
        $idtax = $this->m_data->getIdTax($ratetax);
        $items = json_decode($this->input->post('datagrid'));

        $data = array(
            'idpurchase' => $idpurchase,
            'idpurchase_req'=> $this->input->post('idpurchase_req')=='' ? null : $this->input->post('idpurchase_req'),
            // 'idcreditterm' =>,
            // 'idshipping' =>,
            'idpurchasetype' =>2, //PO
            'idpurchasestatus' => $this->input->post('po_status'),
            // 'idfrequency' =>,
            // 'idjournal' =>,
            'idtax' => $idtax,
            // 'name' =>,
            // 'payee' =>,
            // 'shipaddress' =>,
            'date' => str_replace('T00:00:00', '', $this->input->post('po_date')),
            // 'includetax' =>,
            // 'requestdate' =>,
            // 'freigthcost' =>,
            'tax' => clearnumberic($this->input->post('total_tax')),
            // 'amountdue' =>,
            'totalamount' => clearnumberic($this->input->post('total_amount')),
            // 'paidtoday' =>,
            // 'totalowed' =>,
            // 'balance' =>,
            'memo' => $this->input->post('memo'),
            // 'isrecuring' =>,
            // 'startdate' =>,
            // 'recuntildate' =>,
            // 'recnumtimes' =>,
            // 'alertto' =>,
            // 'notifto' =>,
            // 'display' =>,
            // 'year' =>,
            // 'month' =>,
            'userin' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s'),
            // 'idpayment' => $this->input->post('paymentPurchaseRequisition'),
            // 'notes' =>,
            // 'duedate' =>,
            // 'paiddate' =>,
            'idunit' => $this->input->post('unit'),
            // 'idcurrency' =>,
            // 'noinvoice' =>,
            'subtotal' => clearnumberic($this->input->post('subtotal')),
            // 'totalpaid' =>,
            // 'deleted' =>,
            // 'idproject' =>,
            'nopurchase' => $this->input->post('no_po'),
            // 'id_payment_term' =>,
            'idsupplier' => $this->input->post('idsupplier'),
            'status' => 3 //ordered
            // 'netddays' => ,
            // 'neteomddays' => ,
            // 'discount' =>,
            // 'netdmax' => ,
            // 'delivered=>' =>,
            // 'approver' =>,
            // 'norecord' =>
        );

        if($statusform == 'input'){
            $this->db->insert('purchase', $data);
        }
        else if($statusform == 'edit'){
            $this->db->where('idpurchase', $idpurchase);
            $this->db->update('purchase', $data);
        }


        // foreach ($items as $value) {

        //     $qmeasurement = $this->db->query("select measurement_id from productmeasurement where short_desc = '".$value->short_desc."' and idunit = ".$this->input->post('unit')." ");
        //     if($qmeasurement->num_rows()>0)
        //     {
        //         $rMeasurement = $qmeasurement->row();
        //         $measure = $rMeasurement->measurement_id;
        //     } else {
        //         $measure = null;
        //     }

        //     $item = array(
        //         'idpurchase' => $idpurchase,
        //         'idinventory' => $value->idinventory,
        //         'measurement_id' => $measure,
        //         // 'invno' => $value->invno,
        //         'qty' => $value->qty,
        //         'disc' => $value->disc,
        //         'price' => $value->price,
        //         'total' => $value->total,
        //         // 'remarks' => $value->remarks,
        //         'ratetax' => $ratetax
        //     );


        //     if($statusform == 'input'){
        //         $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
        //         $item['idpurchaseitem'] = $q_seq->result_array()[0]['nextval'];
        //         $this->db->insert('purchaseitem', $item);
        //     }
        //     else if($statusform == 'edit'){
        //         $item['idpurchaseitem'] = $value->idpurchaseitem;
        //         $this->db->where('idpurchaseitem', $item['idpurchaseitem']);
        //         $this->db->update('purchaseitem', $item);
        //     }
        // }

         foreach ($items as $value) {

            $item = array(
                'idpurchase' => $idpurchase,
                'idinventory' => $value->idinventory,
                'measurement_id' => $this->m_data->getMeasurement($value->short_desc,$this->input->post('unit')),
                'warehouse_id' => $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$this->input->post('unit')),
                // 'invno' => $value->invno,
                'qty' => $value->qty,
                'size' => $value->size,
                'measurement_id_size' => $this->m_data->getMeasurement($value->size_measurement,$this->input->post('unit')),
                'disc' => $value->disc,
                'price' => $value->price,
                'total' => $value->total,
                // 'remarks' => $value->remarks,
                'ratetax' => $value->ratetax
            );
            if($statusform == 'input'){
                $q_seq = $this->db->query("select nextval('seq_purchaseitem')");
                $item['idpurchaseitem'] = $q_seq->result_array()[0]['nextval'];
                $this->db->insert('purchaseitem', $item);
            }
            else if($statusform == 'edit'){
                $item['idpurchaseitem'] = $value->idpurchaseitem;
                $this->db->where('idpurchaseitem', $item['idpurchaseitem']);
                $this->db->update('purchaseitem', $item);
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

    function get_po_items(){
        $this->load->model('purchase/m_purchase','model');

        $idpurchase = $this->input->get('idpurchase');

        $data = $this->model->query_itempurchase($idpurchase);

        echo json_encode(array('data'=>$data));
    }

    function get_po_retur_items(){
        //menampilkan daftar barang untuk diretur
    }

    function get_po_batchitems(){
        //ambil data inventory yang di-batchkan
        $idpurchaseitem = $this->input->get('idpurchaseitem');
//         SELECT
//     a.*,b.bahan_coil_id,c.short_desc as satuan_kedua
// FROM
//     purchaseitem_batch a
// JOIN inventory b ON b.idinventory = a.idinventory
// join productmeasurement c ON b.measurement_id_two = c.measurement_id
// WHERE
//     is_tmp = 1
// AND a.idpurchaseitem = '49'
// -- AND a.idpurchase = '37'
// -- AND a.idunit = '12'
// ORDER BY
//     a.no desc
        //and a.idpurchaseitem NOT IN (select idpurchaseitem from  where is_tmp = 1)
        $q = $this->db->query("SELECT a.*,b.bahan_coil_id,c.short_desc as satuan_kedua,d.idpurchaseitem as itemretur
                                FROM
                                    purchaseitem_batch a
                                JOIN inventory b ON b.idinventory = a.idinventory
                                join productmeasurement c ON b.measurement_id_two = c.measurement_id
                                left join purchase_returnitem d ON a.purchase_batch_id = d.purchase_batch_id and d.is_tmp = 1
                                WHERE TRUE
                                AND a.idpurchaseitem = '$idpurchaseitem'
                                ORDER BY a.no desc");

        $data = array();
        $i=0;
        foreach ($q->result_array() as $r) {
            $data[$i] = $r;

           $qcn = $this->db->query("select berat from bahan_coil where bahan_coil_id = ".$r['bahan_coil_id']."");
            if($qcn->num_rows()>0){
                $rqcn = $qcn->row();
                $data[$i]['stock_kedua'] = $data[$i]['qty'] / $rqcn->berat;                
            } else {
                $data[$i]['stock_kedua'] = 0;
            }

            if($data[$i]['itemretur']==null){
                $data[$i]['checked'] = false;
            } else {
                $data[$i]['checked'] = true;
            }
            
            $i++;
        }

        echo json_encode(array('data'=>$data,'num_rows'=>$q->num_rows()));
    }

    function save_goodsreceipt(){
        $this->db->trans_begin();
        // print_r($_POST); die;

        $this->load->model('inventory/m_stock');

        $statusform = $this->input->post('statusform');
        $idpurchase = $this->input->post('idpurchase');
        $idunit = $this->input->post('idunit');
        $nopo = $this->input->post('nopo');

        $data = array(
                'delivereddate' => backdate($this->input->post('received_date')),
                'receivedby_id' => $this->input->post('receivedid'),
                'notes_receipt' => $this->input->post('notes')
            );
        
        $wer = array(
            'idpurchase'=>$idpurchase,
            'idunit'=>$idunit
        );

        $this->db->where($wer);
        $this->db->update('purchase',$data);

        $items = json_decode($this->input->post('itemgrid'));

        $total_qty = 0; //total qty received
        foreach ($items as $value) {
            $subtotal_qty = 0;
            
            // $warehouse_received_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);

            //cek apakah item punya batch record
            $qbatch = $this->db->get_where('purchaseitem_batch',array(
                    'idunit'=>$idunit,
                    'idpurchaseitem'=>$value->idpurchaseitem,
                    'is_tmp'=>1
            ));

            if($qbatch->num_rows()>0){

                    //update harga dulu
                    $this->db->where(array('idinventory'=>$value->idinventory));
                    $this->db->update('inventory',array('cost'=>$value->price));

                    $qinventory = $this->db->get_where('inventory',array('idinventory'=>$value->idinventory));
                    $datainventory = $qinventory->result_array()[0];

                    foreach ($qbatch->result() as $rbatch) {
                        // var_dump($rbatch);
                        $idinventory = $this->db->query("select max(idinventory) as id from inventory")->row();
                        
                        $datainventory['idinventory_batch'] = $value->idinventory;
                        $datainventory['idinventory'] = $idinventory->id+1;
                        $datainventory['invno'] = $rbatch->invno;
                        $datainventory['sku_no'] = $rbatch->sku_no;
                        
                        $this->db->insert('inventory',$datainventory);

                        $this->m_stock->update_history(2,$rbatch->qty,$idinventory->id,$idunit,$rbatch->warehouse_id,date('Y-m-d'),'Add stock from PO:'.$nopo);
                        
                        $subtotal_qty += $rbatch->qty;

                        // set tmp ke 0 item batch kata lain udah bukan temporary
                        $this->db->where(array(
                                'idpurchaseitem'=>$value->idpurchaseitem,
                                'invno'=>$rbatch->invno,
                                'sku_no'=>$rbatch->sku_no,
                                'idpurchase'=>$idpurchase                                
                            ));
                        $this->db->update('purchaseitem_batch',array(
                                'is_tmp'=>0
                            ));
                    }
                // } else {
                   
                // }
            } else {
                //gak pake batch
                // $this->m_stock->update_history(2,$value->qty_terima,$value->idinventory,$idunit,$warehouse_received_id,date('Y-m-d'),'Add stock from PO:'.$nopo);
            }

            $dataitem = array(
                'qty_received'=> $subtotal_qty,
                // 'received_notes'=> isset($value->notes) ? $value->notes : null,
                // 'warehouse_received_id'=>$warehouse_received_id,
                'idunit'=>$idunit
            );


            $weritem = array(
                'idpurchaseitem'=>$value->idpurchaseitem,
                'idpurchase'=>$idpurchase
            );
            
            $this->db->where($weritem);
            $this->db->update('purchaseitem',$dataitem);

           
            $total_qty += $subtotal_qty;
        } //end foreach

        //set tmp ke 0 item batch kata lain udah bukan temporary
        // $this->db->where(array(
        //         'idpurchaseitem'=>$value->idpurchaseitem,
        //         'idpurchase'=>$idpurchase,
        //         'is_tmp'=>0
        //     ));
        // $this->db->delete('purchaseitem_batch');

        //cek qty order dan qty terima
        $qQtyOrder = $this->db->query("select sum(qty) as totalqtyorder
                                        from purchaseitem
                                        where idpurchase = $idpurchase and idunit = $idunit")->row();
        if($total_qty==0) {
            $idpurchasestatus = 1; //open
        } else if(($total_qty < $qQtyOrder->totalqtyorder) && ($total_qty!=0)) {
            $idpurchasestatus = 5; //Partial Received
        } else  {
            $idpurchasestatus = 4; //Received
        }

        //start update hpp per unit
        $this->load->model('inventory/m_stock');
        $this->m_stock->update_hpp($idunit,3,$idpurchase);
        //end update hpp per unit

        $this->db->where(array('idunit'=>$idunit,'idpurchase'=>$idpurchase));
        $this->db->update('purchase',array('idpurchasestatus'=>$idpurchasestatus));

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function save_purchase_invoice(){
         $this->db->trans_begin();

        $saldo = str_replace('.', '', $this->input->post('sisa_bayar'));
        $paidtoday = str_replace('.', '', $this->input->post('pembayaran'));
        $total_pajak = $this->input->post('total_pajak') == '' ? 0 : str_replace('.', '', $this->input->post('total_pajak'));
        $nopo = $this->input->post('nopo');
        $total_amount = $this->input->post('total_amount');
        $idaccount_coa_hutang = $this->input->post('idaccount_coa_hutang');
        $idaccount_coa_persediaan = $this->input->post('idaccount_coa_persediaan');
        $idaccount_coa_pajakmasuk = $this->input->post('idaccount_coa_pajakmasuk');
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
                'paidtoday'=> 0, //masih jadi hutang
                'balance'=>$total_amount,
                'idaccount_coa_hutang'=>$idaccount_coa_hutang,
                'idaccount_coa_persediaan'=>$idaccount_coa_persediaan,
                'idaccount_coa_pajakmasuk'=>$idaccount_coa_pajakmasuk,
                'idpayment' => $idpayment,
                // 'tax' => $total_pajak, //ga perlu lagi karena udah diinput saat PO
                'freigthcost'=> str_replace('.', '', $this->input->post('biayaangkut')),
                'ddays' => $this->input->post('ddays')=='' ? null : $this->input->post('ddays'),
                'eomddays' => $this->input->post('eomddays')=='' ? null : $this->input->post('eomddays'),
                'percentagedisc' => $this->input->post('percentagedisc')=='' ? null : $this->input->post('percentagedisc'),
                'daydisc' => $this->input->post('daydisc')=='' ? null : $this->input->post('daydisc'),
                'notes_invoice' => $this->input->post('notes_pi'),
                'invoice_status'=>$invoice_status,
                'noinvoice'=> $this->input->post('noinvoice')
            );
        $this->db->where('idpurchase',$this->input->post('idpurchase'));
        $this->db->update('purchase',$data);

        //buat jurnal hutang
        $this->load->model('journal/m_jpurchase','jmodel');
        $this->jmodel->purchase_ap(date('Y-m-d'),'AP Purchase Order: '.$nopo,$this->input->post('total_amount'),$this->input->post('idunit'),$idaccount_coa_hutang,$idaccount_coa_persediaan,$idaccount_coa_pajakmasuk,$total_pajak);
        // $this->jmodel->purchase_ap(date('Y-m-d'),$this->input->post('total_amount'),null,$this->input->post('idunit'),$this->input->post('biayaangkut'),'Piutang Penjualan: '.$this->input->post('memo'));

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
         $idunit = $this->session->userdata('idunit');

        $q = $this->db->query("select totalPaid,totalUnpaid
                                from (
                                    select sum(paidtoday) as totalPaid
                                    from purchase
                                    where  (invoice_status = 2 OR invoice_status = 4)  and idpurchasetype = 2 and deleted = 0 and idunit = $idunit and idpurchasetype = 2
                                ) a,
                                ( 
                                    select sum(balance) as totalUnpaid
                                    from purchase
                                    where idunit = $idunit  and idpurchasetype = 2 and deleted = 0 and idpurchasetype = 2 and (invoice_status = 1 OR invoice_status = 4) ) b");
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

    function save_payment(){
        $this->load->model('journal/m_jpurchase','jmodel');

        $this->db->trans_begin();

        $idpurchase = $this->input->post('idpurchase');
        $balance_purchase = str_replace('.', '', $this->input->post('balance_Purchase'));
        $amount = str_replace('.', '', $this->input->post('amount'));
        $selisih = intval($balance_purchase-$amount);
        $idaccount = $this->input->post('idaccount'); //coa kas/bank

        $idunit = $this->session->userdata('idunit');

        if($selisih==0)
        {
            $invoice_status = 2; //paid
            // $journal = $this->jmodel->purchase_pelunasan(date('Y-m-d'),$amount,'Pelunasan Hutang PO',$idunit);
            $memo = 'Pelunasan Hutang PO';
        } else if($amount<$balance_purchase)
        {
            $invoice_status = 4; //Partially Paid
            $memo = 'Pelunasan Hutang Sebagian PO';
            // $journal = $this->jmodel->purchase_pelunasan_sebagian(date('Y-m-d'),'Pelunasan Hutang Sebagian PO',$amount,$idunit,null);
        } else {
            $invoice_status = 1; //Unpaid
            $journal['idjournal'] = null;
        }


        //get idaccount hutang
        $qap = $this->db->query("select idaccount_coa_hutang from purchase where idpurchase = $idpurchase and idunit = $idunit")->row();

        if($invoice_status!=1) {
            $journal = $this->jmodel->purchase_pelunasan(date('Y-m-d'),$amount,$memo,$idunit,$idaccount,$qap->idaccount_coa_hutang);
        }

        $data = array(
                'purchase_payment_id'=> $this->m_data->getPrimaryID($this->input->post('purchase_payment_id'),'purchase_payment', 'purchase_payment_id', $idunit),
                'idpurchase'=> $this->input->post('idpurchase'),
                'idjournal'=> $journal,
                'idunit'=> $idunit,
                'amount'=> $amount,
                'date_payment'=>backdate($this->input->post('date_payment')),
                'notes'=> $this->input->post('notes'),
                'userin' => $this->session->userdata('userid'),
                'datein' => date('Y-m-d H:m:s')
            );
        $this->db->insert('purchase_payment',$data);

        $balance = $balance_purchase-$amount;

        $purchaseCurent = $this->db->query("select paidtoday from purchase where idpurchase = $idpurchase and idunit = $idunit")->row();

        $update = array(
            'paidtoday' => ($purchaseCurent->paidtoday+$amount),
            'invoice_status' => $invoice_status,
            'balance' => $selisih
        );

        $this->db->where('idpurchase',$idpurchase);
        $this->db->update('purchase',$update);

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        } else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);

    }

    function create_batch(){
        //membuat batch saat goods receipt
// idpurchase:32
// idpurchaseitem:41
// idinventory:45
// idunit:12
// numbatch:20
// is_temp:1
        $totalqty = $this->input->post('totalqty');
        $idunit = $this->input->post('idunit');
        $numbatch = $this->input->post('numbatch');
        $idinventory = $this->input->post('idinventory');
        $nameinventory = $this->input->post('nameinventory');        
        $measurement_id = $this->m_data->getMeasurement($this->input->post('satuan'),$idunit);
        $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$this->input->post('warehouse_code'),'warehouse_id','warehouse',$idunit);
        
        $is_temp = $this->input->post('is_temp');

        $qtybatch = $totalqty/$numbatch;

        $qprod = $this->db->query("select sku_no,invno from inventory where idinventory = $idinventory")->row();

         $this->db->where(array(
            'idpurchaseitem' => $this->input->post('idpurchaseitem'),
            'idpurchase' => $this->input->post('idpurchase'),
            'is_tmp'=>1,
            'idunit'=>$idunit
        ));
        $this->db->delete('purchaseitem_batch');

        for($i=1;$i<=$numbatch;$i++){            
            $purchase_batch_id = $this->m_data->getPrimaryID($this->input->post('purchase_batch_id'),'purchaseitem_batch', 'purchase_batch_id', $idunit);
            $data = array(
                'purchase_batch_id' => $purchase_batch_id,
                'no' => $i,
                'idpurchaseitem' => $this->input->post('idpurchaseitem'),
                'idpurchase' => $this->input->post('idpurchase'),
                'warehouse_id'=>$warehouse_id,
                'warehouse_code'=>$this->input->post('warehouse_code'),
                'short_desc' => $this->input->post('satuan'),
                'nameinventory'=>$this->input->post('nameinventory'),
                'qty' => $qtybatch,
                'measurement_id' => $measurement_id,
                'invno' => $qprod->invno.''.$i,
                'sku_no' => $qprod->sku_no,
                'idunit' => $idunit,
                'idinventory' => $idinventory,
                'is_tmp' => $is_temp
            );
            $cek = $this->db->get_where('purchaseitem_batch',array(
                'idpurchaseitem' => $this->input->post('idpurchaseitem'),
                // 'purchase_batch_id'=>$purchase_batch_id,
                'is_tmp'=>1,
                'no'=>$i,
                'idunit'=>$idunit
            ));
            if($cek->num_rows()>0){
               
            } else {
                $this->db->insert('purchaseitem_batch',$data);
            }
            
        }

        $q = $this->db->query("SELECT
                                a.*,b.bahan_coil_id,c.short_desc as satuan_kedua
                            FROM
                                purchaseitem_batch a
                            JOIN inventory b ON b.idinventory = a.idinventory
                            join productmeasurement c ON b.measurement_id_two = c.measurement_id
                            WHERE
                                is_tmp = 1
                            AND a.idpurchaseitem = ".$this->input->post('idpurchaseitem')."
                            AND a.idpurchase = ".$this->input->post('idpurchase')."
                            AND a.idunit = ".$idunit."
                            ORDER BY
                                a.no desc");
        // $this->db->order_by('no','desc');
        // $this->db->join('inventory', 'inventory.idinventory = purchaseitem_batch.idinventory');
        // $q = $this->db->get_where('purchaseitem_batch',array(
        //         'is_tmp'=>1,
        //         'idpurchaseitem' => $this->input->post('idpurchaseitem'),
        //         'idpurchase' => $this->input->post('idpurchase'),
        //         'idunit'=>$idunit
        //     ));

        $data = array();
        $i=0;
        foreach ($q->result_array() as $r) {
            $data[$i] = $r;

            if($r['bahan_coil_id']!=null){
                    //ambil ke tabel konversi
                    $qcn = $this->db->query("select berat from bahan_coil where bahan_coil_id = ".$r['bahan_coil_id']."");
                    if($qcn->num_rows()>0){
                        $rqcn = $qcn->row();

                        $data[$i]['stock_kedua'] = $r['qty'] / $rqcn->berat;
                        
                    } else {
                        $data[$i]['stock_kedua'] = 0;
                    }
                    
                } else {
                    $data[$i]['stock_kedua'] = 0;
                }
                $i++;
        }

        echo json_encode(array('data'=>$data));
    }

    function check_batch_item(){
        $postget = $this->input->get('idpurchase')=='' ? 'post' : 'get';

        $idpurchase = $this->input->get('idpurchase')=='' ? $this->input->post('idpurchase') : $this->input->get('idpurchase');
        $idpurchaseitem = $this->input->get('idpurchaseitem')=='' ? $this->input->post('idpurchaseitem') :  $this->input->get('idpurchaseitem');
        $idunit = $this->input->get('idunit')=='' ? $this->input->post('idunit') : $this->input->get('idunit');

        //cek statusnya
        $qstatus = $this->db->query("select idpurchasestatus from purchase where idpurchase = ".$idpurchase)->row();

        if($qstatus->idpurchasestatus==1){
            //pas di form edit statusnya masih open. buka dgn status batch item yang statusnya temporary
            $is_tmp = 1;
        } else {
            $is_tmp = $this->input->get('is_tmp');
        }

        $q = $this->db->get_where('purchaseitem_batch',array(
                'is_tmp'=> $is_tmp,
                'idpurchaseitem' => $idpurchaseitem,
                'idpurchase' => $idpurchase,
                'idunit'=>$idunit
            ));

        if($postget=='post'){
              echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . '}';
        } else {
             echo json_encode(array('data'=>$q->result_array(),'numbatch'=>$q->num_rows()));
        }
       
    }

    function get_poreturn_pk(){
        $q = $this->db->query("select max(purchase_return_id) as idporetur
                                from purchase_return
                                where idunit = ".$this->input->get('idunit')."")->row();
        echo json_encode(array('id'=>$q->idporetur+=1));
    }

    function post_poreturn_item_batch(){
        //insert item retur yang batch
        $items = json_decode($this->input->post('data'));
        $opsi = $this->input->post('opsi');
        $purchase_return_id = $this->input->post('purchase_return_id');
        $idwarehouse = $this->m_data->getIDmaster('warehouse_code',$items->warehouse_code,'warehouse_id','warehouse',$items->idunit);

          $wer = array(
                    'purchase_return_id'=> $purchase_return_id,
                    // 'idinventory'=> $items->idinventory,
                    // 'idpurchaseitem'=> $items->idpurchaseitem,
                    'purchase_batch_id'=> $items->purchase_batch_id
                    // 'is_tmp' => 1
                );
             

        if($opsi=='insert'){

            $d = array(
                    'purchase_batch_id'=> $items->purchase_batch_id,
                    'idinventory'=> $items->idinventory,
                    'idpurchaseitem'=> $items->idpurchaseitem,
                    'notes'=> isset($items->notes) ? $items->notes : null,
                    'qty_retur' => $items->qty,
                    'warehouse_id' => $idwarehouse,
                    // 'is_received' =>,
                    'is_tmp' => 1,
                    // 'notes'=>$items->notes,
                    'datein' => date('Y-m-d H:m:s'),
                    'purchase_return_id'=>$purchase_return_id
                );


             $qcek = $this->db->get_where('purchase_returnitem',$wer);

             if($qcek->num_rows()>0){
                $this->db->where($wer);
                $this->db->update('purchase_returnitem',$d);   
             } else {
                $this->db->insert('purchase_returnitem',$d);   
             }

             
        } else {
            $this->db->where($wer);
            $this->db->delete('purchase_returnitem');   
            echo $this->db->last_query();
        }
    }

    function post_poreturn_item(){
        $this->db->trans_begin();

        //insert item retur yang bukan batch
        $items = json_decode($this->input->post('item'));
        $opsi = $this->input->post('opsi');
        $purchase_return_id = $this->input->post('purchase_return_id');

          $wer = array(
                    'purchase_return_id'=> $purchase_return_id,
                    'idinventory'=> $items->idinventory,
                    'idpurchaseitem'=> $items->idpurchaseitem,
                    'is_tmp' => 1
                );
             

        if($opsi=='insert'){

            $d = array(
                    // 'purchase_batch_id'=> $items->purchase_batch_id,
                    'idinventory'=> $items->idinventory,
                    'idpurchaseitem'=> $items->idpurchaseitem,
                    // 'notes'=>$items->notes,
                    'qty_retur' => $this->input->post('qty_retur'),
                    // 'is_received' =>,
                    'is_tmp' => 1,
                    'datein' => date('Y-m-d H:m:s'),
                    'notes'=>$this->input->post('notes'),
                    'purchase_return_id'=>$purchase_return_id
                );


             $qcek = $this->db->get_where('purchase_returnitem',$wer);

             if($qcek->num_rows()>0){
                $this->db->where($wer);
                $this->db->update('purchase_returnitem',$d);   
             } else {
                $this->db->insert('purchase_returnitem',$d);   
             }

             
        } else {
            $this->db->where($wer);
            $this->db->delete('purchase_returnitem');   
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

    function cek_poreturn_item(){
        //cek qty retur yg udah diinsert dari
         $wer = array(
                    // 'purchase_return_id'=> $this->input->post('purchase_return_id'),
                    // 'idinventory'=> $items->idinventory,
                    'idpurchaseitem'=>$this->input->post('idpurchaseitem'),
                    'is_tmp' => 1
                );
        $q = $this->db->get_where('purchase_returnitem',$wer);
        if($q->num_rows()>0){
            $json = json_encode(array('success'=>true,'data'=>$q->result_array()[0])); 
        } else {
            $json = json_encode(array('success'=>false));
        }
        echo  $json;
    }

    function save_return(){
        $this->load->model('journal/m_jpurchase','jmodel');
        $this->load->model('inventory/m_stock');

        $this->db->trans_begin();

        $itemgrid = json_decode($this->input->post('itemgrid'));
        // $itembatch = json_decode($this->input->post('itembatch')); //item diambil dari query, bukan dari json yg dikirim
        $idpurchase = $this->input->post('idpurchase');
        $purchase_return_id = $this->input->post('purchase_return_id');
        $noreturn  = $this->input->post('noreturn');
        $ret_date = backdate($this->input->post('ret_date'));
        $coaretur = $this->input->post('idaccount_return')=='' ? 763 : $this->input->post('idaccount_return');
        $idunit = $this->input->post('idunit');
        $status = $this->input->post('status');

        $dt_header = array(
                'purchase_return_id'=>$purchase_return_id,
                'idpurchase'=>$idpurchase,
                'noreturn'=>$noreturn,
                'idunit'=>$this->session->userdata('idunit'),
                // 'idjournal'=>$this->session->userdata('idunit'),
                'userin'=>$this->session->userdata('iduser'),
                'datein'=>date('Y-m-d H:m:s'),
                'return_status'=>$status,
                'idaccount_return'=>$coaretur,
                'date_return'=>$ret_date
        );
        $this->db->insert('purchase_return',$dt_header);

        $nilairetur = 0;
        $num_batch_items = 0;
        $num_return_items = 0;

        $itembatch = $this->db->query("select a.purchase_return_id,a.purchase_batch_id,a.idinventory,a.idpurchaseitem,a.qty_retur,a.is_received,a.is_tmp,
                        b.qty,b.invno,b.sku_no,b.warehouse_id
                        from purchase_returnitem a
                        join purchaseitem_batch b ON a.purchase_batch_id = b.purchase_batch_id
                        where purchase_return_id = $purchase_return_id and a.is_tmp = 1")->result_array();

        if(count($itembatch)>0){
            foreach ($itembatch as $key => $value) {
                // var_dump($value);

                $wercek = array('purchase_return_id'=>$purchase_return_id,'purchase_batch_id'=>$value['purchase_batch_id'],'idpurchaseitem'=>$value['idpurchaseitem'],'is_tmp'=>1);
               
                $qcek = $this->db->get_where('purchase_returnitem',$wercek);
                if($qcek->num_rows()>0){

                    //hitung nilainya
                    $qtotalbatch = $this->db->query("select count(*) as totalbatch
                                    from purchaseitem_batch
                                    where idpurchaseitem = ".$value['idpurchaseitem']." ")->row();

                    $qtotalpriceitem = $this->db->query("select total from purchaseitem
                                                        where idpurchaseitem = ".$value['idpurchaseitem']." ")->row();

                    $total_amount_item = $qtotalpriceitem->total / $qtotalbatch->totalbatch;
                    $nilairetur += $total_amount_item;
                    //end hitung nilai

                    $this->db->where($wercek);
                    $this->db->update('purchase_returnitem',array('is_tmp'=>0,'total_amount_item'=>$total_amount_item));

                    $this->db->where($wercek);
                    $this->db->update('purchase_returnitem',array('is_tmp'=>0,'idpurchaseitem'=>$value['idpurchaseitem']));

                    // if(isset($value->warehouse_code)){

                    // }
                    // $idwarehouse = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);
                    $idwarehouse = $value['warehouse_id'];
                    // echo $idwarehouse.' - '. $value->warehouse_code .'<br>';

                    //update stock
                    if($status==3){
                        //confirmed
                         $this->m_stock->update_history(7,$value['qty'],$value['idinventory'],$idunit,$idwarehouse,date('Y-m-d'),'Purchase Return: '.$noreturn,null);
                    }
                   

                    $num_return_items++;
                }

                $num_batch_items++;
            }
        }

        //retur qty satuan/bukan batch
        $qitem = $this->db->query("select a.idinventory,a.idpurchaseitem,a.qty_retur,a.purchase_return_id,a.notes,b.qty as qty_order,b.total,b.warehouse_id
                                    from purchase_returnitem a
                                    join purchaseitem b ON a.idpurchaseitem = b.idpurchaseitem
                                    where a.purchase_return_id = $purchase_return_id and is_tmp = 1");
        // echo $this->db->last_query();
        foreach ($qitem->result() as $r) {
            $wercek = array('purchase_return_id'=>$purchase_return_id,'idpurchaseitem'=>$r->idpurchaseitem,'is_tmp'=>true);

            $total_amount_item = $r->total*$r->qty_retur;
            $nilairetur += $total_amount_item ;

            $this->db->where($wercek);
            $this->db->update('purchase_returnitem',array('is_tmp'=>0,'total_amount_item'=>$total_amount_item));

             //update stock
            if($status==3){
                //confirmed
                $this->m_stock->update_history(7,$r->qty_retur,$r->idinventory,$idunit,$r->warehouse_id,date('Y-m-d'),'Purchase Return: '.$noreturn,null);
            }

            $num_return_items++;
        }
        
         if($status==3){
            //confirmed
            //buat jurnal
            $idjournal = $this->jmodel->purchase_return(date('Y-m-d'),$nilairetur,$idpurchase,$coaretur,'Purchase Return: '.$noreturn,$idunit);

            //update id jurnal ke purchase_return
            $this->db->where(array('purchase_return_id'=>$purchase_return_id));
            $this->db->update('purchase_return',array('idjournal'=>$idjournal));
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

    function update_return(){
        $this->load->model('journal/m_jpurchase','jmodel');
        $this->load->model('inventory/m_stock');

        $this->db->trans_begin();

        $purchase_return_id = $this->input->post('purchase_return_id');
        $ret_date = backdate($this->input->post('ret_date'));
        $coaretur = $this->input->post('idaccount_return')=='' ? 763 : $this->input->post('idaccount_return');
        $status = $this->input->post('status');

        $dt_header = array(
                'purchase_return_id'=>$purchase_return_id,
                'return_status'=>$status,
                'idaccount_return'=>$coaretur,
                'date_return'=>$ret_date
        );
        $this->db->where('purchase_return_id',$purchase_return_id);
        $this->db->update('purchase_return',$dt_header);


        //nilai retur
        $q = $this->db->query("select sum(total_amount_item) as totalamount
                                from purchase_returnitem
                                where purchase_return_id = $purchase_return_id")->row();
        $nilairetur = $q->totalamount;                        
        //end nilai retur

        //q retur
        $qpo = $this->db->query("select idpurchase,idunit,noreturn
                                from purchase_return
                                where purchase_return_id = $purchase_return_id")->row();
        //end query retur

         if($status==3){
            //confirmed
            //buat jurnal
            $idjournal = $this->jmodel->purchase_return(date('Y-m-d'),$nilairetur,$qpo->idpurchase,$coaretur,'Purchase Return: '.$qpo->noreturn,$qpo->idunit);

            //update id jurnal ke purchase_return
            $this->db->where(array('purchase_return_id'=>$purchase_return_id));
            $this->db->update('purchase_return',array('idjournal'=>$idjournal));
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

    function receipt_return(){
        $this->load->model('journal/m_jpurchase','jmodel');
        $this->load->model('inventory/m_stock');

        $this->db->trans_begin();

        $purchase_return_id = $this->input->post('purchase_return_id');
        $ret_date = backdate($this->input->post('ret_date'));
        $coaretur = $this->input->post('idaccount_return')=='' ? 763 : $this->input->post('idaccount_return');
        $status = $this->input->post('status');
        $items = json_decode($this->input->post('itemgrid'));

        $dt_header = array(
                'purchase_return_id'=>$purchase_return_id,
                'return_status'=>$status,
                'idaccount_return'=>$coaretur,
                'date_return'=>$ret_date
        );
        $this->db->where('purchase_return_id',$purchase_return_id);
        $this->db->update('purchase_return',$dt_header);


        //nilai retur
        // $q = $this->db->query("select sum(total_amount_item) as totalamount
        //                         from purchase_returnitem
        //                         where purchase_return_id = $purchase_return_id")->row();
        // $nilairetur = $q->totalamount;                        
        //end nilai retur

        //q retur
        $qpo = $this->db->query("select idpurchase,idunit,noreturn,total_qty_retur
                                    from purchase_return a
                                    join (select sum(qty_retur) as total_qty_retur,purchase_return_id
                                        from purchase_returnitem
                                        group by purchase_return_id) b ON a.purchase_return_id = b.purchase_return_id
                                    where a.purchase_return_id =  $purchase_return_id")->row();
        //end query retur

         if($status==6){
            //status closed
            //buat jurnal
            // $idjournal = $this->jmodel->purchase_return(date('Y-m-d'),$nilairetur,$qpo->idpurchase,$coaretur,'Purchase Return: '.$qpo->noreturn,$qpo->idunit);

            // //update id jurnal ke purchase_return
            // $this->db->where(array('purchase_return_id'=>$purchase_return_id));
            // $this->db->update('purchase_return',array('idjournal'=>$idjournal));
            foreach ($items as $value) {
                $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code_received,'warehouse_id','warehouse',$qpo->idunit);

                //update stock
                $this->m_stock->update_history(13,$value->qty_received,$value->idinventory,$qpo->idunit,$warehouse_id,date('Y-m-d'),'Receipt Return PO: '.$qpo->noreturn,null);
            }
          
            /* buat jurnal
                retur -> debit
                hutang -> kredit
            */
            $qp = $this->db->query("select a.idpurchase,a.noreturn,a.idunit,a.idaccount_return,a.idjournal,b.totaldebit
                                    from purchase_return a
                                    join journal b ON a.idjournal = b.idjournal
                                    where purchase_return_id = $purchase_return_id and a.idunit = ".$qpo->idunit."")->row();
             $idjournal = $this->jmodel->purchase_return_receive(date('Y-m-d'),$qp->totaldebit,$qp->idpurchase,$qp->idaccount_return,'Received Purchase Return: '.$qp->noreturn,$qp->idunit);

            //update id jurnal ke purchase_return
            $this->db->where(array('purchase_return_id'=>$purchase_return_id));
            $this->db->update('purchase_return',array('idjournal_received'=>$idjournal));
         }

        //  $total_received = 0;
         foreach ($items as $value) {

             if($value->purchase_batch_id==null){
                 //bukan item yg di-batch-kan
                 $arrWer = array(
                    'purchase_return_id'=>$purchase_return_id,
                    'idpurchaseitem'=>$value->idpurchaseitem,
                    'idinventory'=>$value->idinventory,
                    //  'purchase_batch_id'=>$value->purchase_batch_id
                );
                 
             } else {
                 $arrWer = array(
                    'purchase_return_id'=>$purchase_return_id,
                    'idpurchaseitem'=>$value->idpurchaseitem,
                     'idinventory'=>$value->idinventory,
                    'purchase_batch_id'=>$value->purchase_batch_id
                );
             }
              //current received qty
            //  $qCurrent = $this->db->get_where('purchase_returnitem',$arrWer);
            //  $current_qty = $qCurrent->qty_received==null ? 0 : $qCurrent->qty_received;
            //  $totalreceived = $current_qty + $value->qty_received;
             
             $this->db->where($arrWer);
             $this->db->update('purchase_returnitem',array('qty_received'=>$value->qty_received));
            //  $total_received+=$value->qty_received;
         }

         //hitung total yang diterima
         $qtotal = $this->db->query("select sum(qty_retur) as totalreturn,sum(qty_received) as totalreceived
                                        from purchase_returnitem a
                                        where a.purchase_return_id = $purchase_return_id")->row();
         //end 

         if(intval($qtotal->totalreceived) >= $qtotal->totalreturn){
             //full received
             $return_status = 5;
         } else {
             //partial
             $return_status = 4;
         }

        $this->db->where(array(
            'purchase_return_id'=>$purchase_return_id
        ));
        $this->db->update('purchase_return',array('return_status'=>$return_status));

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        } else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function update_detail_batch_item_gr(){
        $items = json_decode($this->input->post('datagrid'));
        // print_r($items);
        // print_r($_POST);
        foreach ($items as $value) {
            $idwarehouse = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$this->input->post('idunit'));
            
            $notes = isset($value->notes) ? $value->notes : null;

            $data = array(
                    'warehouse_id'=>$idwarehouse,
                    'warehouse_code'=>$value->warehouse_code,
                    'notes'=> $notes
            );

            $this->db->where(array(
                    'purchase_batch_id'=>$value->purchase_batch_id,
                    'idpurchase'=>$this->input->post('idpurchase'),
                    'invno'=>$value->invno,
                    'sku_no'=>$value->sku_no,
                    'idpurchaseitem'=>$value->idpurchaseitem
            ));
            $this->db->update('purchaseitem_batch',$data);
        }
    }

    function print_invoice($idpurchase,$print=null){
        $this->load->model('purchase/m_purchase','model');
        $d['data'] = $this->model->cetak_invoice($idpurchase);
        // print_r($d);
        $d['title'] = 'Purchase Invoice';
        $d['print'] = $print;
        $this->load->view('tplcetak/purchase_invoice',$d);
    }

    function print_requisition($idpurchase,$print=null){
         $this->load->model('purchase/m_purchaserequisition','model');
        $d['data'] = $this->model->cetak_requisition($idpurchase);
        // print_r($d); die;
        $d['title'] = 'Purchase Requisition';
        $d['print'] = $print;
        $this->load->view('tplcetak/purchase_requisition',$d);
    }

    function print_order($idpurchase,$print=null){
        $this->load->model('purchase/m_purchase','model');
        $d['data'] = $this->model->cetak_invoice($idpurchase);
        // print_r($d); die;
        $d['title'] = 'Purchase Order';
        $d['print'] = $print;
        $this->load->view('tplcetak/purchase_invoice',$d);
    }

    function print_gr($idpurchase,$print=null){
        $this->load->model('purchase/m_purchase','model');
        $d['data'] = $this->model->cetak_gr($idpurchase);
        // print_r($d); die;
        $d['title'] = 'Goods Receipt';
        $d['print'] = $print;
        $this->load->view('tplcetak/purchase_gr',$d);
    }

    function print_return($idpurchase,$print=null){
         $this->load->model('purchase/m_purchasereturn','model');
        $d['data'] = $this->model->cetak_return($idpurchase);
        // print_r($d); die;
        $d['title'] = 'Purchase Return';
        $d['print'] = $print;
        $this->load->view('tplcetak/purchase_return',$d);
    }
}
?>