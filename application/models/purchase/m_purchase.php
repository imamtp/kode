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
        $sql = "select a.idpurchaseitem,a.idpurchase,a.idinventory,a.qty,a.qty_received,a.price,a.disc,a.total,a.ratetax,a.tax,a.measurement_id,a.measurement_id_size,
                a.size,b.invno,b.nameinventory,c.short_desc,d.warehouse_code,e.short_desc as size_measurement,b.sku_no,a.idunit	
                from purchaseitem a
                join inventory b ON a.idinventory = b.idinventory
                left join productmeasurement c ON c.measurement_id = a.measurement_id
                left join warehouse d ON d.warehouse_id = a.warehouse_id
                left join productmeasurement e ON e.measurement_id = a.measurement_id_size
                where idpurchase = $idpurchase
                ";
        $q = $this->db->query($sql);
        $data = $q->result_array();
        return $data;
    }

    function cetak_order($idpurchase){
        $dtcetak = array();
        
        $sql = "select 
                a.nopurchase,
                a.date,
                a.memo,
                b.namesupplier,
                b.companyaddress,
                b.telephone,
                b.fax,
                a.subtotal,
                a.total_dpp,
                a.tax,
                a.totalamount,
                a.balance,
                a.idunit,
                case 
                    when c.firstname is not null then c.firstname || ' ' || c.lastname
                    else d.realname
                end as author,
                a.datein as created_date,
                case 
                    when e.firstname is not null then e.firstname || ' ' || e.lastname
                    else f.realname
                end as confirmed_by,
                a.datemod as confirmed_date
                from purchase a 
                join supplier b on b.idsupplier = a.idsupplier
                left join employee c on c.user_id = a.userin
                left join sys_user d on d.user_id = a.userin
                left join employee e on e.user_id = a.usermod
                left join sys_user f on f.user_id = a.usermod
                where a.idpurchase = $idpurchase";
        
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $i=0;
            $total=0;
            
            $dtcetak['supplier']['namesupplier'] = $r->namesupplier;
            $dtcetak['supplier']['companyaddress'] = $r->companyaddress;
            $dtcetak['supplier']['telephone'] = $r->telephone;
            $dtcetak['supplier']['fax'] = $r->fax;

            $dtcetak['detail'] = $this->query_itempurchase($idpurchase);

            $dtcetak['no'] = $r->nopurchase;
            $dtcetak['subtotal'] = number_format($r->subtotal,2);
            $dtcetak['dpp'] = number_format($r->total_dpp,2);
            $dtcetak['tax'] = number_format($r->tax,2);
            $dtcetak['totalamount'] = number_format($r->totalamount,2);
            $dtcetak['balance'] = number_format($r->balance,2);
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['memo'] = $r->memo;
            $dtcetak['datetrans'] = $r->date;

            // $dtcetak['receivedby'] = $r->userin;
            //get logo,address,namaunit
            $runit = $this->m_data->dataunit($r->idunit);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['alamat3'] = $runit['alamat3'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];

            $dtcetak['author'] = $r->author;
            $dtcetak['created_date'] = $r->created_date;
            $dtcetak['confirmed_by'] = $r->confirmed_by;
            $dtcetak['confirmed_date'] = $r->confirmed_date;
        }
        return $dtcetak;

    }
    function cetak_invoice($goods_receipt_id){
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

    function query_itemgr($goods_receipt_id){
        $sql = "select 
                a.sku_no,
                a.invno,
                a.nameinventory,
                a.no_batch,
                a.notes,
                a.qty,
                a.short_desc,
                a.warehouse_code as whcode,
                b.price,
                (a.qty * b.price) as total
                from purchaseitem_batch a
                join purchaseitem b on b.idpurchaseitem = a.idpurchaseitem and b.idpurchase = a.idpurchase
                where goods_receipt_id=$goods_receipt_id";
        $q = $this->db->query($sql);
        return $q->result_array();
    }
    function cetak_gr($goods_receipt_id){
         //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = "select
                a.no_goods_receipt,
                a.no_invoice,
                a.received_date,
                a.invoice_date,
                a.received_by,
                a.subtotal,
                a.dpp,
                a.tax,
                a.freightcost,
                a.balance,
                a.totalamount,
                a.notes,
                a.supplier_direct_no,
                c.namesupplier,
                c.companyaddress,
                c.telephone,
                c.fax,
                b.idunit,
                d.firstname || ' ' || d.lastname as receiver,
                case 
                    when e.firstname is not null then e.firstname || ' ' || e.lastname
                    else f.realname
                end as confirmed_by,
                a.datemod as confirmed_date,
                case 
                    when g.firstname is not null then g.firstname || ' ' || g.lastname
                    else h.realname
                end as created_by_inv,
                a.datein_inv as created_date_inv
                from goods_receipt a
                left join purchase b on b.idpurchase = a.idpurchase
                left join supplier c on c.idsupplier = b.idsupplier
                left join employee d on d.idemployee = a.received_by
                left join employee e on e.user_id = a.usermod
                left join sys_user f on f.user_id = a.usermod
                left join employee g on g.user_id = a.userin_inv
                left join sys_user h on h.user_id = a.userin_inv
                where a.goods_receipt_id = $goods_receipt_id";

        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $dtcetak['header'] = $r;

            $dtcetak['supplier']['namesupplier'] = $r->namesupplier;
            $dtcetak['supplier']['companyaddress'] = $r->companyaddress;
            $dtcetak['supplier']['telephone'] = $r->telephone;
            $dtcetak['supplier']['fax'] = $r->fax;

            $dtcetak['detail'] = $this->query_itemgr($goods_receipt_id);
            
            $dtcetak['no'] = $r->no_goods_receipt;
            $dtcetak['no_inv'] = $r->no_invoice;
            
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['notes'] = $r->notes;
            $dtcetak['datetrans'] = $r->received_date;
            $dtcetak['datetrans_inv'] = $r->invoice_date;

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