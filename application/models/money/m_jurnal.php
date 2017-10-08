<?php

class m_jurnal extends CI_Model {

    function tableName() {
        return 'journal';
    }

    function pkField() {
        return 'idjournal';
    }

    function searchField() {
        $field = "b.namejournal,nojournal,memo";
        return explode(",", $field);
    }

    function selectField() {
        return "idjournal,b.namejournal,nojournal,datejournal,memo,totaldebit,totalcredit,year,month";
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
                . "join journaltype b ON a.idjournaltype = b.idjournaltype ";

        return $query;
    }

    function whereQuery() {
        if($this->input->post('enddate')==''){
            // $datestate = date('Y-m-d');
             $wer = null;
        } else {
            $enddate = backdate2($this->input->post('enddate'));
            $stardate = backdate2($this->input->post('stardate'));
            $wer = " (datejournal between '$stardate' and '$enddate')";
        }
        

        // $idunit = $this->input->post('idunit');
        // $idaccount = $this->input->post('idaccount');
        // $stardate = date('Y-m-') . '01';
        
        return $wer;
    }

    function orderBy() {
        return " a.idjournal desc";
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