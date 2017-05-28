<?php

class m_purchaseorder extends CI_Model {

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
        return "a.idpurchase,a.idshipping,a.idpurchasetype,a.idpurchasestatus,a.idtax,a.idpayment,a.date,a.requestdate,a.tax,a.totalamount,a.memo,a.datein,a.idunit,a.idcurrency,a.subtotal,a.nopurchase,a.idsupplier,c.nametax,c.rate,e.namesupplier,a.discount as disc,a.notes_receipt,a.receivedby_id,a.delivereddate,f.firstname,f.lastname,a.balance,a.invoice_status,a.noinvoice,a.paidtoday,totalorder,totalreceived,sisa,b.name as idpurchasestatusname,idpurchase_req, h.nopurchase as nopurchase_req, h.date as date_req";
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
                    left join purchasestatus b ON a.idpurchasestatus = b.idpurchasestatus
					left join tax c ON a.idtax = c.idtax
					left join payment d ON a.idpayment = d.idpayment
					left join supplier e ON a.idsupplier = e.idsupplier
                    left join employee f ON a.receivedby_id = f.idemployee
                    join (select idpurchase,sum(qty) as totalorder,sum(qty_received) as totalreceived,
                            (sum(qty_received)-sum(qty)) as sisa
                            from purchaseitem
                            group by idpurchase) g ON a.idpurchase = g.idpurchase
                    left join (select nopurchase,idpurchase,date
                                from purchase ) h ON a.idpurchase_req = h.idpurchase";

        return $query;
    }

    function whereQuery() {
         $wer = null;
        if($this->input->post('option')=='notyetdelivered'){
            $wer = " and a.delivereddate is null";
        } else if($this->input->post('option')=='po_not_in_open_return_status'){
            //po tidak sedang dalam retur
            $wer = " and a.idpurchase not in (select idpurchase from purchase_return where (return_status = 1 OR return_status = 3 OR return_status = 4) )";
        } if($this->input->post('option')=='delivered_po'){
            $wer = " and a.delivereddate is not null";
        } 

    	// return " idpurchasetype = 2 and a.status = 1 and a.deleted = 0 $wer";
        return " idpurchasetype = 2 and a.deleted = 0 $wer";
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

}

?>