<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class production extends MY_Controller {

    public function index() {
        
    }

    function savewo(){
    	
    	$this->db->trans_begin();

        $gridjob = json_decode($this->input->post('gridjob'));
        $gridmaterial = json_decode($this->input->post('gridmaterial'));
        $gridcost = json_decode($this->input->post('gridcost'));

        $idunit = intval($this->input->post('idunit'));

        $job_order_id = intval($this->m_data->getPrimaryID($this->input->post('job_order_id'),'job_order', 'job_order_id', $idunit));

        $statusform = $this->input->post('statusform');

        $header = array(
        	'job_order_id' => $job_order_id,
            'idsales' => $this->input->post('idsales') == '' ? null : $this->input->post('idsales'),
            'idunit' => $idunit,
            'deleted' => 0,
			// 'startdate_job' date,
			// 'enddate_job' date,
			'job_no' => $this->input->post('job_no'),
			'req_ship_date' => $this->input->post('req_ship_date')=='' ? null : backdate($this->input->post('req_ship_date')),
            // 'start_date' => $this->input->post('start_date')=='' ? null : backdate($this->input->post('start_date')),
            // 'end_date' =>  $this->input->post('end_date')=='' ? null : backdate($this->input->post('end_date')),
            // 'pic_id' => $this->input->post('pic_id')=='' ? null : $this->input->post('pic_id'),
			'status' => $this->input->post('status'),
			'remarks' => $this->input->post('remarks'),
			'userin' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s')
        );

      
        if($statusform == 'input'){
            if($this->input->post('token_tmp')!=''){
                $this->db->where('job_order_id', $job_order_id);
                $this->db->update('job_order', $header);
            } else {
                $this->db->insert('job_order', $header);
            }
            
        }
        else if($statusform == 'edit'){
            $this->db->where('job_order_id', $job_order_id);
            $this->db->update('job_order', $header);
        }

     //    foreach ($gridjob as $value) {

     //    	$job_item_id = $this->m_data->getPrimaryID($value->job_item_id,'job_item', 'job_item_id', $idunit);

     //    	$data_job_item = array(
     //    			'job_item_id'=> $job_item_id,
					// 'job_order_id' => $job_order_id,
					// 'idinventory' => intval($value->idinventory),
					// 'measurement_id' => $this->getMeasurement($value->short_desc,$idunit),
					// 'cost' => $value->cost=='' ? null : $value->cost,
					// 'qty' => $value->qty,
					// 'size'=> $value->size,
					// 'measurement_id_size' => $this->getMeasurement($value->size_measurement,$idunit),
					// 'subtotal' => $value->total,
					// // 'remarks' => $value->cost
					// 'userin' => $this->session->userdata('userid'),
     //        		'datein' => date('Y-m-d H:m:s'),
					// 'deleted' => 0,
					// 'idunit' => $idunit,
     //    		);

     //        $qcek = $this->db->get_where('job_item',array(
     //                'job_item_id'=> $job_item_id,
     //                'job_order_id' => $job_order_id
     //        ));

     //        if($qcek->num_rows()>0){
     //            $this->db->where(array(
     //                'job_item_id'=> $job_item_id,
     //                'job_order_id' => $job_order_id
     //            ));
     //            $this->db->update('job_item', $data_job_item);
     //        } else {
     //            $this->db->insert('job_item', $data_job_item);
     //        }
        	
     //    }

     //    foreach ($gridmaterial as $value) {

     //    		$prod_material_id = $this->m_data->getPrimaryID($value->prod_material_id,'prod_material', 'prod_material_id', $idunit);

     //    		$material_type = $value->idinventory == '' ? 2 : 1; //'1:Raw material 2:BoM';

     //    		$data_material = array(
					// 'prod_material_id' => $prod_material_id,
					// 'job_order_id' => $job_order_id,
					// 'idinventory' => $value->idinventory == '' ? null : $value->idinventory,
					// 'bom_id' => $value->bom_id == '' ? null : $value->bom_id,
					// 'measurement_id' => $this->getMeasurement($value->measurement_name,$idunit),
					// 'qty' =>$value->qty,
     //                'slice' =>$value->slice,
					// 'deleted' => 0,
					// // 'is_addition' =>,
					// 'idunit' => $idunit,
					// 'material_type' => $material_type
     //    		);

     //        $qcek = $this->db->get_where('job_item',array(
     //                'job_item_id'=> $job_item_id,
     //                'job_order_id' => $job_order_id
     //        ));

     //        if($qcek->num_rows()>0){
     //            $this->db->where(array(
     //                'prod_material_id' => $prod_material_id,
     //                'job_order_id' => $job_order_id,
     //            ));
     //            $this->db->update('prod_material', $data_material);
     //        } else {
     //            $this->db->insert('prod_material', $data_material);
     //        }
        	
     //    }


          if($this->input->post('start_date')!=''){
            //entry schedule wo
             //01/04/2017 00:04:00
             $startdate = explode(' ', $this->input->post('start_date'));
             $end_date = explode(' ', $this->input->post('end_date'));

             $data = array(
                    'startdate_job'=> backdate($startdate[0]).' '.$startdate[1],  
                    'enddate_job'=> backdate($end_date[0]).' '.$end_date[1],
                    'schedule_userin'=>$this->session->userdata('userid'),
                    'schedule_datein'=>date('Y-m-d H:m:s'),
                    'pic_id'=>$this->input->post('pic_id'), //idemployee
                    'status'=>3 //on progress
                );
            $this->db->where('job_order_id',$job_order_id);
            $this->db->update('job_order',$data);
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

    function getMeasurement($short_desc,$idunit){

        if($short_desc==null){
            return null;
        }


    	$qmeasurement = $this->db->query("select measurement_id from productmeasurement where short_desc = '".$short_desc."' and idunit = ".$idunit." ");
            if($qmeasurement->num_rows()>0)
            {
                $rMeasurement = $qmeasurement->row();
                $measure = $rMeasurement->measurement_id;
            } else {
                $measure = null;
            }

            return intval($measure);
    }

     function CompositionBom(){
        //insert BOM composition

        $bom_id = $this->input->post('bom_id');
        $idinventory = $this->input->post('idinventory');
        $idunit = $this->session->userdata('idunit');

        $this->db->trans_begin();

  
        $data = array(
                'bom_id'=>$bom_id,
                'idinventory'=>$idinventory,
                'measurement_id'=>$this->input->post('measurement_id'),
                'qty_out'=>$this->input->post('qty_out'),
                'idunit'=>$idunit,
                'userin' => $this->session->userdata('userid'),
                'datein' => date('Y-m-d H:m:s')
            );

        $wer = array('bom_id'=>$bom_id,'idinventory'=>$idinventory,'idunit'=>$idunit);
        $qcek = $this->db->get_where('bom_detail',$wer);
        if($qcek->num_rows()>0)
        {
            $this->db->where($wer);
            $this->db->update('bom_detail',$data);
        } else {
            $this->db->insert('bom_detail',$data);
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

    function savewoschedule(){
        $this->db->trans_begin();

         $job_order_id = $this->input->post('job_order_id');

         //01/04/2017 00:04:00
         $startdate = explode(' ', $this->input->post('start_date'));
         $end_date = explode(' ', $this->input->post('end_date'));

         $data = array(
                'startdate_job'=> backdate($startdate[0]).' '.$startdate[1],  
                'enddate_job'=> backdate($end_date[0]).' '.$end_date[1],
                'schedule_userin'=>$this->session->userdata('userid'),
                'schedule_datein'=>date('Y-m-d H:m:s'),
                'pic_id'=>$this->input->post('pic_id'), //idemployee
                'status'=>2
            );
         $this->db->where('job_order_id',$job_order_id);
         $this->db->update('job_order',$data);

           if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function get_production_detail(){
        $job_order_id = $this->input->get('job_order_id');

        //job item
        $qjob = $this->db->query("select a.job_item_id,a.idinventory,a.idunit,a.measurement_id,a.measurement_id_size,a.qty,a.size,a.subtotal,b.short_desc as satuan_qty,
                c.short_desc as satuan_ukuran,d.invno,d.sku_no,d.nameinventory
                from job_item a
                join productmeasurement b ON b.measurement_id = a.measurement_id
                join productmeasurement c ON c.measurement_id = a.measurement_id_size
                join inventory d ON a.idinventory = d.idinventory
                where a.job_order_id = $job_order_id");


        //material
        $qraw = $this->db->query("select a.prod_material_id,a.job_order_id,a.idinventory,a.measurement_id,a.qty,a.idunit,
                d.nameinventory,d.invno,d.description,b.short_desc as measurement_name
                from prod_material a
                left join productmeasurement b ON b.measurement_id = a.measurement_id
                join inventory d ON a.idinventory = d.idinventory
                where a.job_order_id = $job_order_id  and material_type = 1");

        $qbom = $this->db->query("select a.prod_material_id,a.job_order_id,a.bom_id as idinventory,a.measurement_id,
                a.qty,a.idunit,d.bom_name as nameinventory,d.bom_code as invno,d.bom_desc as description,
                b.short_desc as measurement_name
                from prod_material a
                join bom d ON a.bom_id = d.bom_id
                left join productmeasurement b ON d.measurement_id = b.measurement_id
                where a.job_order_id = $job_order_id  and material_type = 2");

        $arrMaterial = array();
        $i=0;

        $raw = $qraw->result_array();
        foreach ($raw as $key => $value) {
            $arrMaterial[$i]['prod_material_id'] = $value['prod_material_id'];
            $arrMaterial[$i]['job_order_id'] = $value['job_order_id'];
            $arrMaterial[$i]['bom_id'] = null;
            $arrMaterial[$i]['idinventory'] = $value['idinventory'];
            $arrMaterial[$i]['qty'] = $value['qty'];
            $arrMaterial[$i]['nameinventory'] = $value['nameinventory'];
            $arrMaterial[$i]['invno'] = $value['invno'];
            $arrMaterial[$i]['measurement_name'] = $value['measurement_name'];
            $arrMaterial[$i]['description'] = $value['description'];
            $arrMaterial[$i]['tipe'] = 'Raw Material';
            $i++;
        }

        $bom = $qbom->result_array();
        foreach ($bom as $key => $value) {
            $arrMaterial[$i]['prod_material_id'] = $value['prod_material_id'];
            $arrMaterial[$i]['job_order_id'] = $value['job_order_id'];
            $arrMaterial[$i]['idinventory'] = $value['idinventory'];
            $arrMaterial[$i]['bom_id'] = $value['idinventory'];
            $arrMaterial[$i]['qty'] = $value['qty'];
            $arrMaterial[$i]['nameinventory'] = $value['nameinventory'];
            $arrMaterial[$i]['invno'] = $value['invno'];
            $arrMaterial[$i]['measurement_name'] = $value['measurement_name'];
            $arrMaterial[$i]['description'] = $value['description'];
            $arrMaterial[$i]['tipe'] = 'BoM Material';
            $i++;
        }

        //production cost
        $qcost = $this->db->query("select a.job_order_cost_id,a.job_order_id,a.prod_cost_id,a.idunit,b.cost_code,b.cost_name,b.standard_hour,b.standard_cost
                from job_order_cost a
                join prod_cost b ON b.prod_cost_id = b.prod_cost_id and a.idunit = b.idunit
                where a.job_order_id = $job_order_id");

        $data = array(
            'job'=>$qjob->result_array(),
            'material'=>$arrMaterial,
            'cost'=>$qcost->result_array()
        );

        echo json_encode($data);
    }

    function saveworeceipt(){

        $this->db->trans_begin();

        $gridjob = json_decode($this->input->post('gridjob'));
        $gridmaterial = json_decode($this->input->post('gridmaterial'));
        $gridcost = json_decode($this->input->post('gridcost'));
        // $finished_date = explode(' ', $this->input->post('finished_date'));
        $job_order_id = $this->input->post('job_order_id');
        $idunit = $this->input->post('idunit');
        $status = $this->input->post('status');

        $header = array(
            'job_order_id' => $job_order_id,
            'finished_date' => backdate($this->input->post('finished_date')),
            'status' => $status,
            'approvedby_id' => $this->input->post('approvedby_id'),
            'usermod' => $this->session->userdata('userid'),
            'datemod' => date('Y-m-d H:m:s')
        );

        $this->db->where('job_order_id', $job_order_id);
        $this->db->update('job_order', $header);

        //grid job
        foreach ($gridjob as $value) {
            $notes = isset($value->catatan) ? $value->catatan : null;
            $data_job_item = array(
                    'qty_accept' => $value->qty_accept,
                    'whs_accept_id' => $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code_accept,'warehouse_id','warehouse',$idunit),
                    'qty_reject' => $value->qty_reject,
                    'whs_reject_id' => $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code_reject,'warehouse_id','warehouse',$idunit),
                    'qty_sisa' => $value->qty_sisa,
                    'whs_sisa_id' => $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code_sisa,'warehouse_id','warehouse',$idunit),
                    'notes' => $notes
                );

            $this->db->where(
                array(
                        'job_item_id'=>$value->job_item_id,
                        'idunit'=>$idunit
                    )
                );
            $this->db->update('job_item', $data_job_item);
        }
        //end grib job

        //start grid material
         foreach ($gridmaterial as $value) {

                $data_material = array(
                    'qty' => $value->qty,
                    'qty_real' => $value->qty_real,
                    'qty_sisa' => $value->qty_sisa
                    // 'whs_sisa_id' =>  $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code_sisa,'warehouse_id','warehouse',$idunit),
                    // 'notes' => $value->catatan
                );

            $this->db->where(
                array(
                        'prod_material_id'=>$value->prod_material_id,
                        'job_order_id'=>$job_order_id,
                        'idunit'=>$idunit
                    )
            );
            $this->db->update('prod_material', $data_material);

            if($status==5){
                //jika status sudah finished. updete barang penerimaan batch raw material
                 $qmaterial = $this->db->query("select a.prod_material_id,a.idinventory,a.sku_no,a.invno,a.nameinventory,a.warehouse_id,a.qty,a.measurement_id,a.notes,inventory_type,idinventorycat
                                from prod_material_receipt a
                                where a.prod_material_id = ".$value->prod_material_id."");
                 foreach ($qmaterial->result() as $rmat) {
                     if($rmat->idinventory==null){
                        //buat inventory                        
                        $this->create_new_inventory($rmat,$idunit,$job_order_id);
                     } else {
                        //update qty ke data inventory yang sudah ada
                         $this->update_qty_inventory($rmat,$idunit,$job_order_id);
                     }

                     //set is_tmp ke 0
                      $this->db->where(
                            array(
                                    'prod_material_id'=>$value->prod_material_id
                                )
                        );
                        $this->db->update('prod_material_receipt', array('is_tmp'=>0));
                 }
            }
            
        }
        //end grid material

         //start grid cost
        //  foreach ($gridcost as $value) {

        //         $datacost = array(
        //             'used_hour' => $value->used_hour,
        //             'total_cost' => $value->total
        //         );

        //     $this->db->where(
        //         array(
        //                 'prod_cost_id'=>$value->prod_cost_id,
        //                 'job_order_id'=>$job_order_id,
        //                 'idunit'=>$idunit
        //             )
        //     );
        //     $this->db->update('job_order_cost', $datacost);
        // }
        //end grid cost


       if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function create_new_inventory($raw_material,$idunit,$job_order_id){
        $this->db->trans_begin();

        $qwo = $this->db->query("select job_no from job_order where job_order_id = $job_order_id")->row();

        $qidinventory = $this->db->query("select max(idinventory) as idinventory from inventory")->row();
        $idinventory = $qidinventory->idinventory+1;

         $d = array(
            'idinventory'=>$idinventory,
            'invno' => $raw_material->invno,
            'nameinventory' => $raw_material->nameinventory,
            'inventory_type' => $raw_material->inventory_type,
            'usermod' => $this->session->userdata('userid'),
            'datemod' => date('Y-m-d H:m:s'),
            'idinventorycat'=>$raw_material->idinventorycat,
            'measurement_id_one' => $raw_material->measurement_id,
            'sku_no' => $raw_material->sku_no
        );
        $this->db->insert('inventory',$d);

        $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));

        //update stock
        $this->load->model('inventory/m_stock');
        $this->m_stock->update_history(12,$raw_material->qty,$idinventory,$idunit,$raw_material->warehouse_id,date('Y-m-d'),'Update stock from Work Order: '.$qwo->job_no);

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        return $json;
    }

    function update_qty_inventory($raw_material,$idunit,$job_order_id){
        $this->db->trans_begin();

        $qwo = $this->db->query("select job_no from job_order where job_order_id = $job_order_id")->row();

         $this->load->model('inventory/m_stock');
         $this->m_stock->update_history(12,$raw_material->qty,$raw_material->idinventory,$idunit,$raw_material->warehouse_id,date('Y-m-d'),'Update stock from Work Order: '.$qwo->job_no);

        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        return $json;
    }

    function create_id_wo(){
        $idunit = $this->input->post('idunit');
        $job_order_id = $this->m_data->getPrimaryID($this->input->post('job_order_id'),'job_order', 'job_order_id', $idunit);
        $header = array(
                'token_tmp'=>$this->input->post('token_tmp'),
                'idunit'=>$idunit,
                'is_tmp'=>1,
                'job_order_id'=>$job_order_id
            );
        $this->db->insert('job_order', $header);
        echo json_encode(array('id'=>$job_order_id));
    }

    function get_id_jobitem($job_item_id,$idunit,$job_order_id){
        if($job_item_id=='' || $job_item_id==null){
            $q = $this->db->query("SELECT max(job_item_id) as id
                                    from job_item
                                    where idunit = $idunit and job_order_id = $job_order_id");
            if($q->num_rows()>0){
                $r = $q->row();
                return $r->id+=1;
            } else {
                return 1;
            }
        } else {
            return $job_item_id;
        }
    }

    function save_fg(){
        // saving finished goods
        $this->db->trans_begin();

        $update = $this->input->post('update');
        $job_order_id = $this->input->post('job_order_id');
        $idunit = $this->input->post('idunit');
        $job_item_id = $this->get_id_jobitem($this->input->post('job_item_id'),$idunit,$job_order_id);

        $data_job_item = array(
                'job_item_id'=> $job_item_id,
                'job_order_id' => $job_order_id,              
                'qty' => $this->input->post('qty'),
                'size'=> $this->input->post('size'),               
                'subtotal' => $this->input->post('total')=='' ? null : $this->input->post('total')
            );

        $data_job_item['measurement_id_size'] = $this->getMeasurement($this->input->post('size_measurement'),$idunit);
        $data_job_item['measurement_id'] = $this->getMeasurement($this->input->post('short_desc'),$idunit);

        if($update=='true'){
            $this->db->where(array(
                'job_item_id'=> $job_item_id,
                'job_order_id' => $job_order_id    
            ));
            $this->db->update('job_item', $data_job_item);

           
            $qcekmaterial = $this->db->get_where('prod_material',array('job_item_id'=>$job_item_id,'job_order_id'=>$job_order_id));
            if($qcekmaterial->num_rows()>0){
                 /*
                    hitung qty untuk potongan.
                    - ambil size dari job order/finished goods
                    - rumus : qty finished goods / potongan * ukuran
                */
                $row_qcekmaterial = $qcekmaterial->row();
                    
                    $qsize = $this->db->get_where('job_item',array('job_item_id'=>$job_item_id,'job_order_id'=>$job_order_id))->row();
                    $data_material['qty'] = $qsize->qty / $row_qcekmaterial->slice * $qsize->size;

                    $this->db->where(array(
                        'prod_material_id' => $row_qcekmaterial->prod_material_id,
                        'job_item_id'=>$job_item_id,
                        'job_order_id' => $job_order_id
                    ));
                    $this->db->update('prod_material', $data_material);
            }
         
        } else {
            $data_job_item['userin'] = $this->session->userdata('userid');
            $data_job_item['datein'] = date('Y-m-d H:m:s');
            $data_job_item['deleted'] = 0;
            $data_job_item['idunit'] = $this->input->post('idunit');           
            $data_job_item['idinventory'] = intval($this->input->post('idinventory'));            
            $data_job_item['cost'] = $this->input->post('cost')=='' ? null : $this->input->post('cost');

            $this->db->insert('job_item', $data_job_item);
        }
        

        // $q = $this->db->get_where('job_item',array('job_order_id'=>$job_order_id));
        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function delete_fg(){
        $this->db->where(array(
                'job_item_id'=> $this->input->post('job_item_id'),
                'job_order_id' => $this->input->post('job_order_id')
            ));
        $this->db->delete('job_item');
    }

    function save_rm(){
        $this->db->trans_begin();

        $update = $this->input->post('update');
        $job_order_id = $this->input->post('job_order_id');
        $idunit = $this->input->post('idunit');
        // $job_item_id = $this->m_data->getPrimaryID($this->input->post('job_item_id'),'job_item', 'job_item_id', $idunit);

        $prod_material_id = $this->m_data->getPrimaryID($this->input->post('prod_material_id'),'prod_material', 'prod_material_id', $idunit);

        $material_type = $this->input->post('idinventory') == '' ? 2 : 1; //'1:Raw material 2:BoM';

        $data_material = array(
            'prod_material_id' => $prod_material_id,
            'job_item_id'=>$this->input->post('job_item_id'),
            'job_order_id' => $job_order_id,           
            'measurement_id' => $this->getMeasurement($this->input->post('measurement_name'),$idunit),
            'slice'=>$this->input->post('slice')
        );

        if($update=='true'){
            /*
                hitung qty untuk potongan.
                - ambil size dari job order/finished goods
                - rumus : qty finished goods / potongan * ukuran
            */
            $qsize = $this->db->get_where('job_item',array('job_item_id'=>$this->input->post('job_item_id'),'job_order_id'=>$job_order_id))->row();
            // echo $this->db->last_query();
            $data_material['qty'] = $qsize->qty / $this->input->post('slice') * $qsize->size;

            $this->db->where(array(
                'prod_material_id' => $prod_material_id,
                'job_item_id'=>$this->input->post('job_item_id'),
                'job_order_id' => $job_order_id
            ));
            $this->db->update('prod_material', $data_material);
        } else {
            $data_material['deleted'] = 0;
            $data_material['token_tmp'] = $this->input->post('token_tmp');
            $data_material['idunit'] = $idunit;
            $data_material['material_type'] = $material_type;
            $data_material['idinventory'] = $this->input->post('idinventory') == '' ? null : $this->input->post('idinventory');
            $data_material['bom_id'] = $this->input->post('bom_id') == '' ? null : $this->input->post('bom_id');
            $data_material['qty'] = $this->input->post('qty');

            $this->db->insert('prod_material', $data_material);
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

    function delete_rm(){
         $this->db->where(array(
                'job_item_id'=> $this->input->post('job_item_id'),
                'prod_material_id' => $this->input->post('prod_material_id')
            ));
        $this->db->delete('prod_material');
    }

    function save_wo_materialusage(){
        $this->db->trans_begin();

        $gridmaterial = json_decode($this->input->post('gridmaterial'));

        foreach ($gridmaterial as $value) {

            $data_material = array(
                    'qty_real' =>$value->qty_real,
                    'qty_sisa' =>$value->qty_sisa
                );

            $this->db->where(array(
                    'prod_material_id' => $value->prod_material_id,
                    'job_order_id' => $value->job_order_id,
                ));
            $this->db->update('prod_material', $data_material);
            
        }

        $dataheader = array(
                'material_usage_entryby_id'=>$this->session->userdata('userid'),
                'material_datein'=>date('Y-m-d')
            );
        $this->db->where('job_order_id',$this->input->post('job_order_id'));
        $this->db->update('job_order', $dataheader);


        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);
    }

    function save_material_batch(){
        $this->db->trans_begin();

        $data = array(
                    "prod_material_id" => $this->input->post('prod_material_id'),
                    "idinventory" => $this->input->post('idinventory') == '' ? null :  $this->input->post('idinventory'),
                    "sku_no"  => $this->input->post('sku_no'),
                    "invno" => $this->input->post('invno') == '' ? $this->input->post('invno_input') : $this->input->post('invno'),
                    "nameinventory" => $this->input->post('nameinventory'),
                    "warehouse_id"  => $this->input->post('warehouse_id'),
                    "qty"  => $this->input->post('qty'),
                    "measurement_id"  => $this->input->post('measurement_id'),
                    "inventory_type"=> $this->input->post('inventory_type'),
                    "idinventorycat"=> $this->input->post('idinventorycat'),
                    "notes"  => $this->input->post('notes'),
                    "is_tmp"  => $this->input->post('is_temp')
        );
         
        
        $wer = array(
                'prod_material_id'=>$data['prod_material_id'],
                'idinventory'=>$data['idinventory'],
                'invno'=>$data['invno']
        );

        $qcek = $this->db->get_where('prod_material_receipt',$wer);
        if($qcek->num_rows()>0){
            $this->db->where($wer);
            $this->db->update('prod_material_receipt',$data);
        } else {
            $this->db->insert('prod_material_receipt',$data);
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

    function get_material_batch(){

        $q = $this->db->query("select a.prod_material_id,a.idinventory,a.sku_no,a.invno,a.nameinventory,a.warehouse_id,a.qty,a.measurement_id,a.notes,a.is_tmp,warehouse_code,c.short_desc,idinventorycat,inventory_type
                                from prod_material_receipt a
                                join warehouse b ON a.warehouse_id = b.warehouse_id
                                left join productmeasurement c ON a.measurement_id = c.measurement_id
                                where a.prod_material_id = ".$this->input->post('prod_material_id')."");

        echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . '}';
    }

    function print_receipt_wo($job_order_id,$print=null){
        $this->load->model('production/m_receiptwo','model');
        $d['data'] = $this->model->cetak_receipt_wo($job_order_id);
        $d['title'] = 'Receipt Work Order';
        $d['print'] = $print;
        $this->load->view('tplcetak/production_receipt_wo',$d);
    }
}
?>