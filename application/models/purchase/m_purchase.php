<?php

class m_purchase extends CI_Model {

    function tableName() {
        return 'purchase';
    }

    function pkField() {
        return 'idpurchase';
    }

    function searchField() {
        $field = "nopurchase";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpurchase,a.idcreditterm,a.idshipping,a.idpurchasetype,a.idpurchasestatus,a.idfrequency,a.idjournal,a.idtax,a.nopurchase,a.name,a.payee,a.shipaddress,a.date,a.includetax,a.requestdate,a.freigthcost,a.tax,a.amountdue,a.totalamount,a.paidtoday,a.totalowed,a.balance,a.memo,a.isrecuring,a.startdate,a.recuntildate,a.recnumtimes,a.alertto,a.notifto,a.display,a.year,a.month,a.userin,a.usermod,a.datein,a.datemod,a.idpayment,a.notes,a.duedate,a.paiddate,a.idunit,a.idcurrency,a.noinvoice,a.idsupplier,a.subtotal,a.totalpaid,a.status,a.deleted,a.netddays,a.neteomddays,a.discount,a.netdmax,a.delivereddate,a.approver,a.idproject,b.nameshipping,c.namepurchase,d.name as purchasestatus,e.nojournal,f.nametax,g.namaunit,h.namecurr,i.namesupplier,i.companyaddress,i.telephone,i.fax,j.username,k.projectname,a.notes_receipt,l.firstname as receivedby,a.nofpsup,m.firstname as fname_author, m.lastname as lname_author";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'a.nopurchase'=>'No Purchase'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join shipping b on b.idshipping = a.idshipping
                    left join purchasetype c on c.idpurchasetype = a.idpurchasetype
                    left join purchasestatus d on d.idpurchasestatus = a.idpurchasestatus
                    left join journal e on e.idjournal = a.idjournal 
                    left join tax f on f.idtax = a.idtax
                    left join unit g on g.idunit = a.idunit
                    left join currency h on h.idcurrency = a.idcurrency
                    left join supplier i on i.idsupplier = a.idsupplier
                    left join sys_user j on j.user_id = a.approver
                    left join project k on k.idproject = a.idproject
                    left join employee l on a.receivedby_id = l.idemployee
                    left join employee m on a.userin = m.user_id";

        return $query;
    }

    function whereQuery() {
        $wer = null;
        if($this->input->post('option')=='notyetdelivered'){
            $wer = " and a.delivereddate is null";
        }

        return " a.deleted = 0 $wer";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idpurchase' => $this->input->post('idpurchase') == '' ? $this->m_data->getSeqVal('seq_purchase') : $this->input->post('idpurchase'),
            // 'idcreditterm'=> $this->input->post('idcreditterm'),
            'idshipping'=> $this->input->post('idshipping'),
            'idpurchasetype'=> $this->input->post('idpurchasetype'),
            'idpurchasestatus'=> $this->input->post('idpurchasestatus'),
            // 'idfrequency'=> $this->input->post('idfrequency'),
            'idjournal'=> $this->input->post('idjournal'),
            'idtax'=> $this->input->post('idtax'),
            'idunit'=> $this->input->post('idunit'),
            'idcurrency'=> $this->input->post('idcurrency'),
            'idsupplier'=> $this->input->post('idsupplier'),
            // 'idpayment'=> $this->input->post('idpayment'),
            'nopurchase'=> $this->input->post('nopurchase'),
            'name'=> $this->input->post('name'),
            'payee'=> $this->input->post('payee'),
            'shipaddress'=> $this->input->post('shipaddress'),
            'date'=> $this->input->post('date'),
            'includetax'=> $this->input->post('includetax'),
            'requestdate'=> $this->input->post('requestdate'),
            'freigthcost'=> $this->input->post('freigthcost'),
            'tax'=> $this->input->post('tax'),
            'amountdue'=> $this->input->post('amountdue'),
            'totalamount'=> $this->input->post('totalamount'),
            'paidtoday'=> $this->input->post('paidtoday'),
            'totalowed'=> $this->input->post('totalowed'),
            'balance'=> $this->input->post('balance'),
            'memo'=> $this->input->post('memo'),
            'isrecuring'=> $this->input->post('isrecuring'),
            'startdate'=> $this->input->post('startdate'),
            'recuntildate'=> $this->input->post('recuntildate'),
            'recnumtimes'=> $this->input->post('recnumtimes'),
            'alertto'=> $this->input->post('alertto'),
            'notifto'=> $this->input->post('notifto'),
            'display'=> $this->input->post('display'),
            'year'=> $this->input->post('year'),
            'month'=> $this->input->post('month'),
            'userin'=> $this->input->post('userin'),
            'usermod'=> $this->input->post('usermod'),
            'datein'=> $this->input->post('datein'),
            'datemod'=> $this->input->post('datemod'),
            'notes'=> $this->input->post('notes'),
            'duedate'=> $this->input->post('duedate'),
            'paiddate'=> $this->input->post('paiddate'),
            'noinvoice'=> $this->input->post('noinvoice'),
            'subtotal'=> $this->input->post('subtotal'),
            'totalpaid'=> $this->input->post('totalpaid'),
            'status'=> $this->input->post('status'),
            'deleted'=> $this->input->post('deleted'),
            'netddays'=> $this->input->post('netddays'),
            'neteomddays'=> $this->input->post('neteomddays'),
            'discount'=> $this->input->post('discount'),
            'netdmax'=> $this->input->post('netdmax'),
            'delivereddate'=> $this->input->post('delivereddate'),
            'approver'=> $this->input->post('approver'),
            'norecord'=> $this->input->post('norecord'),

        );
        return $data;
    }

    function getLastRecord($idunit){
        $q = $this->db->query('select norecord from '.$this->tableName(). ' where idunit = '.$idunit.' and norecord is not null and deleted = 0 order by norecord desc limit 1');
        if($q->num_rows() == 0){
            return 1;
        }else{
            return $q->row()->norecord + 1;
        }
    }

    function query_itempurchase($idpurchase,$option=null){
        // $is_tmp = $this->input->get('is_tmp');
        if(!isset($_GET['is_tmp'])){
            $is_tmp = 0;
        } else {
            $is_tmp = $this->input->get('is_tmp');
        }
        // $is_tmp = $is_tmp == '' ? 0 : 1 ;

         $q = $this->db->query("select a.idpurchaseitem,a.idpurchase,a.idinventory,a.qty,a.qty_received,a.price,a.disc,a.total,a.ratetax,a.tax,a.measurement_id,a.measurement_id_size,
                a.size,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,b.sku_no,COALESCE(total_qty_batch, 0) as total_qty_batch,a.idunit	
                from purchaseitem a
                join inventory b ON a.idinventory = b.idinventory
                left join productmeasurement c ON c.measurement_id = a.measurement_id
                left join warehouse d ON d.warehouse_id = a.warehouse_id
                left join productmeasurement e ON e.measurement_id = a.measurement_id_size
                left join (select idpurchaseitem,COALESCE(sum(qty), 0) as total_qty_batch
                            from purchaseitem_batch
                            where is_tmp = $is_tmp
                            group by idpurchaseitem) f ON a.idpurchaseitem = f.idpurchaseitem
                where idpurchase = $idpurchase");

        // $r = $q->result_array();
        $data = array();
        $i=0;
        foreach ($q->result_array() as $r) {
            $data[$i] = $r;

            if($option=='invoice'){
                //penyesuaian untuk data di form invoice
                $data[$i]['qty'] = $r['qty_received'];
            }

            //cek apakah idinventory punya batch item
            $qcek = $this->db->query("select idinventory_parent from inventory where idinventory_parent = ".$r['idinventory']."");
            if($qcek->num_rows()>0)
            {
                $data[$i]['batch'] = true;

                //hitung qty batch
                // $q = $this->db->get_where('purchaseitem_batch',array(
                //         'idpurchaseitem' => $r['idpurchaseitem'],
                //         'idpurchase' => $r['idpurchase'],
                //         'idunit'=>$idunit
                //     ));

                // $dataArr = $q->result_array();
                // $totalqtyterima = 0;
                // foreach ($dataArr as $key => $value) {
                //     $totalqtyterima+=$value['qty'];
                // }
                $data[$i]['qty_received'] = $r['total_qty_batch'];

                //data barang hasil batch
                $qbatch = $this->db->query("select a.idpurchaseitem,a.qty,a.invno,a.sku_no,a.nameinventory,a.notes,b.short_desc,c.warehouse_code,a.notes
                                                from purchaseitem_batch a
                                                join productmeasurement b ON a.measurement_id = b.measurement_id
                                                join warehouse c ON a.warehouse_id = c.warehouse_id
                                                where idpurchaseitem = ".$r['idpurchaseitem']." ");
                $data[$i]['item_details'] = $qbatch->result_array();

            } else {
                $data[$i]['batch'] = false;
            }
            
            $i++;
        }
        return $data;
    }

    function cetak_invoice($idpurchase){
         //generate data buat keperluan cetak
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

            $dtcetak['detail'] = $this->query_itempurchase($r->idpurchase);
            $dtcetak['detailtotal'] = number_format($r->subtotal);

            $dtcetak['no'] = $r->nopurchase;
            $dtcetak['nofpsup'] = $r->nofpsup;

            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = $r->paidtoday;
            $dtcetak['freigthcost'] = $r->freigthcost;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = $r->totalamount;
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['totalowed'] = $r->balance;
            $dtcetak['memo'] = $r->memo;
            $dtcetak['datetrans'] = $r->date;

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];

            $dtcetak['fname_author'] = $r->fname_author;
            $dtcetak['lname_author'] = $r->lname_author;
        }
        return $dtcetak;
    }

    function cetak_gr($idpurchase){
         //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.idpurchase=$idpurchase";
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

            $dtcetak['detail'] = $this->query_itempurchase($r->idpurchase);
            $dtcetak['detailtotal'] = number_format($r->subtotal);

            $dtcetak['no'] = $r->nopurchase;

            // //get receivefrom,total,memo,tax
            $dtcetak['dp'] = $r->paidtoday;
            $dtcetak['freigthcost'] = $r->freigthcost;
            // $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = $r->totalamount;
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['totalowed'] = $r->balance;
            $dtcetak['memo'] = $r->memo;
            $dtcetak['datetrans'] = $r->date;

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