<?php

class m_bill extends CI_Model {

    function save($idpurchase,$idaccount,$idjournal,$datepay,$nocheque,$memo,$totalowed,$totalpaid,$balance) {
        $qsec = $this->db->query("select nextval('seq_disbursment') as id")->row();
        $q = array(
            'iddisbursment' => $qsec->id,
            'idpurchase' => $idpurchase,
            'idaccount' => $idaccount,
            'idjournal' => $idjournal,
            'datepay' => $datepay,
            'nocheque' => $nocheque,
            'memo' => $memo,
            'totalowed' => $totalowed,
            'totalpaid' => $totalpaid,
            'balance' => $balance,
//            'payee' => payee,
//            'display' => display,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
        );
        $this->db->insert('disbursment',$q);
        return $qsec->id;
    }

}

?>