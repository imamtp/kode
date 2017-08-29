<?php

class m_salesman extends CI_Model {

    function tableName() {
        return 'employee';
    }

    function pkField() {
        return 'idemployee';
    }

    function searchField() {
        $field = "firstname,lastname,a.code";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idemployee,a.code,a.firstname,a.lastname,a.user_id,b.group_id";
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
                    join sys_user b ON a.user_id = b.user_id";

        return $query;
    }

    function whereQuery() {
        return "  a.deleted = 0";
    }

    function orderBy() {
        return " a.datein desc";
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