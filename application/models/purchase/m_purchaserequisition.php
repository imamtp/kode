<?php

class m_purchaserequisition extends CI_Model {

    function tableName() {
        return 'purchase';
    }

    function pkField() {
        return 'idpurchase';
    }

    function searchField() {
        $field = "a.nopurchase";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpurchase,a.idshipping,a.idpurchasetype,a.idpurchasestatus,a.idtax,a.idpayment,a.date,a.requestdate,a.tax,a.totalamount,a.memo,a.datein,a.idunit,a.idcurrency,a.subtotal,a.nopurchase,a.idsupplier,b.name as status,c.nametax,c.rate,e.namesupplier,e.companyaddress,e.telephone,e.fax,a.discount as disc,f.username,g.idpurchase_req
                ,a.requestbyid,concat(h.firstname,' ',h.lastname) as requestby_name";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'invno'=>'Kode Inventory'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join purchasestatus b ON a.idpurchasestatus = b.idpurchasestatus
					left join tax c ON a.idtax = c.idtax
					left join payment d ON a.idpayment = d.idpayment
					join supplier e ON a.idsupplier = e.idsupplier
                    left join sys_user f ON a.userin = f.user_id
                    left join (select idpurchase_req
                                from purchase
                                where idpurchasetype = 2) g ON a.idpurchase = g.idpurchase_req
                    left join employee h ON a.requestbyid = h.idemployee";
        return $query;
    }

    function whereQuery() {
        $wer = null;
        if($this->input->post('option')=='not_yet_po'){
            //pr belum menjadi po
            $wer = " AND a.idpurchase not in (select idpurchase_req from purchase where idpurchasetype = 2 and deleted = 0)";
        }
    	return " idpurchasetype = 1 and a.status = 1 $wer";
    }

    function orderBy() {
        return " a.datein desc";
    }

    function updateField() { 
        $data = array(
            'idpurchaseitem' => $this->input->post('idpurchaseitem') == '' ? $this->m_data->getSeqVal('seq_purchaseitem') : $this->input->post('idpurchaseitem'),
            'idpurchase' => $this->input->post('idpurchase'),
            'idinventory' => $this->input->post('idinventory'),
            'idtax' => $this->input->post('idtax'),
            'itemdesc' => $this->input->post('itemdesc'),
            'qty' => $this->input->post('qty'),
            'received' => $this->input->post('received'),
            'price' => $this->input->post('price'),
            'disc' => $this->input->post('disc'),
            'total' => $this->input->post('total'),
            'ratetax' => $this->input->post('ratetax'),
            'tax' => $this->input->post('tax'),
            'beforetax' => $this->input->post('beforetax'),
            'remarks' => $this->input->post('remarks'),
            'cost' => $this->input->post('cost'),
            'status' => $this->input->post('status'),
            'deleted' => $this->input->post('deleted'),
            'idunit'=>$this->session->userdata('idunit'),
        );
        return $data;
    }

    // function query_itempurchase($idpurchase){
    //      $q = $this->db->query("select a.idpurchaseitem,a.idpurchase,a.idinventory,a.qty,a.price,a.disc,a.total,a.ratetax,a.tax,a.measurement_id,a.measurement_id_size,
    //             a.size,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,b.sku_no
    //             from purchaseitem a
    //             join inventory b ON a.idinventory = b.idinventory
    //             join productmeasurement c ON c.measurement_id = a.measurement_id
    //             left join warehouse d ON d.warehouse_id = a.warehouse_id
    //             join productmeasurement e ON e.measurement_id = a.measurement_id_size
    //             where idpurchase = $idpurchase");

    //     // $r = $q->result_array();
    //     $data = array();
    //     $i=0;
    //     foreach ($q->result_array() as $r) {
    //         $data[$i] = $r;

    //         //cek apakah idinventory punya batch item
    //         $qcek = $this->db->query("select idinventory_batch from inventory where idinventory_batch = ".$r['idinventory']."");
    //         if($qcek->num_rows()>0)
    //         {
    //             $data[$i]['batch'] = true;
    //         } else {
    //             $data[$i]['batch'] = false;
    //         }
            
    //         $i++;
    //     }

    //     return $data;
    // }

    function cetak_requisition($idpurchase){
          //generate data buat keperluan cetak

        $this->load->model('purchase/m_purchase');

        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.idpurchase=$idpurchase";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            //detail pembayaran
            $i=0;
            $total=0;

            //build item sales data
            // foreach ($this->query_itempurchase($r->idpurchase) as $ritem) {
            //     $detail[$i] = $ritem;
            //     $i++;
            // }
            $dtcetak['supplier']['namesupplier'] = $r->namesupplier;
            $dtcetak['supplier']['companyaddress'] = $r->companyaddress;
            $dtcetak['supplier']['telephone'] = $r->telephone;
            $dtcetak['supplier']['fax'] = $r->fax;

            $dtcetak['detail'] = $this->m_purchase->query_itempurchase($r->idpurchase);
            $dtcetak['detailtotal'] = number_format($r->subtotal);

            $dtcetak['no'] = $r->nopurchase;

            $dtcetak['requestby'] = $r->username;

            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = null;
            $dtcetak['freigthcost'] = null;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = null;
            $dtcetak['terbilang'] = null;
            $dtcetak['totalowed'] = null;
            $dtcetak['memo'] = $r->memo;
            $dtcetak['datetrans'] = $r->date;

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $qunit = $this->db->get_where('unit',array('idunit'=>$r->idunit));
            if($qunit->num_rows()>0)
            {
                $runit = $qunit->row();
                $dtcetak['logo'] = $runit->logo==null ? 'logo_aktiva2.png' : $runit->logo;
                $dtcetak['namaunit'] = $runit->namaunit;
                $dtcetak['alamat'] = $runit->alamat;
                $dtcetak['telp'] = $runit->telp;
                $dtcetak['fax'] = $runit->fax;
            } else {
                echo $this->db->last_query().'<hr>';
                exit;
            }
        }
        return $dtcetak;
    }

}

?>
