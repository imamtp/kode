<?php

class m_purchasetype extends CI_Model {

    function tableName() {
        return 'purchasetype';
    }

    function pkField() {
        return 'idpurchasetype';
    }

    function searchField() {
        $field = "namepurchase";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpurchasetype,a.namepurchase";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode purchasetype'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idpurchasetype' => $this->input->post('idpurchasetype') == '' ? $this->m_data->getSeqVal('seq_purchasetype') : $this->input->post('idpurchasetype'),
            'namepurchase'=>$this->input->post('namepurchase')
            'status'=>$this->input->post('status'),
            'deleted'=>$this->input->post('deleted'),
        );
        return $data;
    }

}

?>