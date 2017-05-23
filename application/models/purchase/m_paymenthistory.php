<?php

class m_paymenthistory extends CI_Model {

    function tableName() {
        return 'disbursment';
    }

    function pkField() {
        return 'iddisbursment';
    }

    function searchField() {
        $field = "a.memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.iddisbursment,a.datepay,nocheque,a.memo,a.totalowed,a.totalpaid,b.nopurchase,a.userin,a.datein,b.shipaddress,b.date,b.totalamount,b.memo as purchasememo,b.year,b.month,b.duedate,b.idunit";
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
                . "join purchase b ON a.idpurchase = b.idpurchase ";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=99 && $this->session->userdata('group_id')!=1)
        {
            $wer = " b.idunit = ".$this->session->userdata('idunit')."";
        } else {
            $wer =  null;
        }
//        $wer.= "totalowed!=0";
        return $wer;
    }

    function orderBy() {
        return "";
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