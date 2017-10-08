<?php

class M_jurnalitem extends CI_Model {

    function tableName() {
        return 'journalitem';
    }

    function pkField() {
        return 'idjournalitem';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idjournalitem,a.idjournal,a.idaccount,a.debit,a.credit,b.memo,b.datejournal,b.nojournal,c.accname,c.accnumber";
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
                . "join journal b ON a.idjournal = b.idjournal
                    join account c ON a.idaccount = c.idaccount ";

        return $query;
    }

    function whereQuery() {
        // $datestate = backdate2($this->input->post('datestate'));
        // $idunit = $this->input->post('idunit');
        // $idaccount = $this->input->post('idaccount');
        // $stardate = date('Y-m-') . '01';
        // $wer = " a.idaccount=$idaccount AND
        //         b.idunit = $idunit AND
        //         datejournal between '$stardate' and '$datestate'";
        $wer = "";
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