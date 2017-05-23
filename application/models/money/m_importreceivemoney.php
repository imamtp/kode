<?php

class m_importreceivemoney extends CI_Model {

    function tableName() {
        return 'receivemoneyimport';
    }

    function pkField() {
        return 'idreceivemoneyimport';
    }

    function searchField() {
        $field = "filename";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idreceivemoneyimport,a.filename,a.userin,a.datein";
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
                    from " . $this->tableName() . " a ";

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