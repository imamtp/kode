<?php

class m_purchasereturn extends CI_Model {

    function tableName() {
        return 'purchase_return';
    }

    function pkField() {
        return 'purchase_return_id';
    }

    function searchField() {
        $field = "";
        return explode(",", $field);
    }

    function selectField() {
        return "a.purchase_return_id,b.idsupplier,a.idpurchase,a.idunit,a.noreturn,a.idjournal,a.userin,a.datein,a.return_status,a.date_return,b.idtax,b.nopurchase,b.date as po_date,c.namesupplier,a.return_amount,num_retur_items,c.companyaddress,c.telephone,c.fax,sum_amount_items,a.idaccount_return,f.accname,f.accnumber,num_retur_qty,num_received_qty";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'a.idgoodsreceipt'=>'ID Goods Receipt'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join purchase b ON a.idpurchase = b.idpurchase
                    join supplier c oN b.idsupplier = c.idsupplier
                    join (select purchase_return_id, count(*) as num_retur_items, sum(qty_retur) as num_retur_qty, sum(qty_received) as num_received_qty
                            from purchase_returnitem
                            group by purchase_return_id) d ON a.purchase_return_id = d.purchase_return_id
                    join (select purchase_return_id, sum(total_amount_item) as sum_amount_items
                            from purchase_returnitem
                            group by purchase_return_id) e ON a.purchase_return_id = e.purchase_return_id
                    left join account f ON a.idaccount_return = f.idaccount and a.idunit = f.idunit";

        return $query;
    }

    function whereQuery() {
        $wer = null;
        if($this->input->post('option')=='notyetdelivered'){
            // $wer = " and a.idpurchase not in (select idpurchase from purchase_return where (return_status = 2 OR return_status = 4 OR return_status = 5 OR return_status = 6) )";
             $wer = " and (return_status = 3 OR return_status = 4)";
        }

        return " a.deleted = 0 ".$wer;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idgoodsreceipt' => $this->input->post('idgoodsreceipt') == '' ? $this->m_data->getSeqVal('seq_goodsreceipt') : $this->input->post('idgoodsreceipt'),
            'idpurchase' => $this->input->post('idpurchase'),
            'date' => $this->input->post('date'),
            'remarks' => $this->input->post('remarks'),
            'idunit' => $this->session->userdata('idunit'),
            'userin' => $this->input->post('userin'),
            'datein' => $this->input->post('datein'),
            'usermod' => $this->input->post('usermod'),
            'datemod' => $this->input->post('datemod'),
            'status' => $this->input->post('status'),
            'deleted' => $this->input->post('deleted'),
        );
        return $data;
    }

    function query_itempurchase($purchase_return_id){

    }

    function cetak_return($purchase_return_id){
          //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.purchase_return_id=$purchase_return_id";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $dtcetak['header'] = $r;

            $dtcetak['supplier']['namesupplier'] = $r->namesupplier;
            $dtcetak['supplier']['companyaddress'] = $r->companyaddress;
            $dtcetak['supplier']['telephone'] = $r->telephone;
            $dtcetak['supplier']['fax'] = $r->fax;

            // $dtcetak['detail'] = $this->query_itempurchase($r->purchase_return_id);
            // $dtcetak['detailtotal'] = number_format($r->subtotal);

            $queryitem = $this->db->query("select a.purchase_return_id,a.purchase_batch_id,a.idinventory,a.idpurchaseitem,a.qty_retur,a.notes,a.total_amount_item,a.notes
                                            from purchase_returnitem a
                                            where purchase_return_id = $purchase_return_id");
            $i=0;
            $totalamount=0;
            foreach ($queryitem->result_array() as $value) {
                 

                if($value['purchase_batch_id']!=null){
                    //item batch
                    $querybatch = $this->db->query("select a.purchase_batch_id,a.idpurchaseitem,a.idpurchase,a.qty,a.measurement_id,a.invno,a.sku_no,a.idinventory,a.warehouse_id,a.warehouse_code,a.short_desc,a.nameinventory
                                                    from purchaseitem_batch a
                                                    where a.purchase_batch_id = ".$value['purchase_batch_id']." ");
                    // $dtcetak['detail'][$i] = $querybatch->result_array();
                    foreach ($querybatch->result_array() as $vbatch) {
                         $dtcetak['detail'][$i] = $vbatch;
                         $dtcetak['detail'][$i]['total_amount_item'] = $value['total_amount_item'];
                         $dtcetak['detail'][$i]['notes'] = $value['notes'];
                        // array_push($dtcetak['detail'][$i], $vbatch);
                         $totalamount+= $dtcetak['detail'][$i]['total_amount_item'];
                         $i++;
                    }
                } else {
                    //item biasa
                    $i++;
                }
               
            }

            // $dtcetak['no'] = $r->nopurchase;

            // // //get receivefrom,total,memo,tax
            // $dtcetak['dp'] = $r->paidtoday;
            // $dtcetak['freigthcost'] = $r->freigthcost;
            // // $dtcetak['receivefrom'] = $r->userin;
            // $dtcetak['totaltax'] = $r->tax;
            $dtcetak['return_amount'] = number_format($r->return_amount);
            // $dtcetak['terbilang'] = terbilang($r->totalamount);
            // $dtcetak['totalowed'] = $r->balance;
            // $dtcetak['memo'] = $r->memo;
            // $dtcetak['datetrans'] = $r->date;

            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];
        }
        return $dtcetak;
    }
}

?>