<?php

class m_debt extends CI_Model {

    function tableName() {
        return 'purchase';
    }

    function pkField() {
        return 'idpurchase';
    }

    function searchField() {
        $field = "nametax";
        return explode(",", $field);
    }

    function selectField() {
        return "g.namesupplier,a.duedate,a.idpurchase,g.namesupplier,a.idjournal,a.nopurchase,a.shipaddress,a.date,a.freigthcost,a.tax,a.totalamount,a.paidtoday,a.totalowed,a.memo,a.year,a.month,a.userin,a.datein,a.notes,a.paiddate,a.noinvoice,b.nameshipping, c.status, d.namepayment,e.namaunit,f.namecurr";
    }

    function fieldCek() {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
            'code' => 'Kode Pajak'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName() . " a "
                . "join shipping b ON a.idshipping = b.idshipping
                    join purchasestatus c ON a.idpurchasestatus = c.idpurchasestatus
                    join payment d ON a.idpayment = d.idpayment
                    join unit e ON a.idunit = e.idunit
                    join currency f ON a.idcurrency = f.idcurrency  
                    join supplier g ON a.idsupplier = g.idsupplier";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=99 && $this->session->userdata('group_id')!=1)
        {
            $wer = " a.idunit = ".$this->session->userdata('idunit')." AND ";
        } else {
            $wer =  null;
        }
        $wer.= "totalowed!=0";
        return $wer;
    }

    function orderBy() {
        return " a.date";
    }

    function updateField() {
        $data = array(
            'idtax' => $this->input->post('idtax') == '' ? $this->m_data->getSeqVal('seq_tax') : $this->input->post('idtax'),
            'idtaxtype' => $this->m_data->getID('taxtype', 'nametypetax', 'idtaxtype', $this->input->post('nametypetax')),
            'code' => $this->input->post('code'),
            'nametax' => $this->input->post('nametax'),
            'description' => $this->input->post('description'),
            'rate' => $this->input->post('rate'),
            'acccollectedtax' => $this->input->post('idacccollected'),
            'acctaxpaid' => $this->input->post('idaccpaid')
        );
        return $data;
    }

}

?>