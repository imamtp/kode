<?php

class m_spendmoney extends CI_Model {

    function tableName() {
        return 'spendmoney';
    }

    function pkField() {
        return 'idspendmoney';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idspendmoney,d.filename,d.totalamount,a.idaccount,a.idjournal,a.totalpaid,a.userin,b.datein,a.subtotal,a.notrans,a.memo,a.datetrans,a.spendfrom,a.month,a.year,b.accname,c.namaunit";
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
                . "join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                    join unit c ON a.idunit = c.idunit
                    left join receivemoneyimport d ON a.notrans = d.notrans ";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=99 && $this->session->userdata('group_id')!=1)
        {
            $wer = " a.idunit = ".$this->session->userdata('idunit')." ";
        } else {
            $wer =  null;
        }
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