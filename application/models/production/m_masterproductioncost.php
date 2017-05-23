<?php

class m_masterproductioncost extends CI_Model {

    function tableName() {
        return 'prod_cost';
    }

    function pkField() {
        return 'prod_cost_id';
    }

    function searchField() {
        $field = "cost_code,cost_name";
        return explode(",", $field);
    }

    function selectField() {
        return "prod_cost_id,cost_code,cost_name,standard_hour,standard_cost,cost_desc";
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
                    from " . $this->tableName()." a";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0 ";
    }

    function orderBy() {
        return " a.datein desc";
    }

    function updateField() { 
        $data = array(
            // 'idtax' => $this->input->post('idtax') == '' ? $this->m_data->getSeqVal('seq_tax') : $this->input->post('idtax'),
            // 'idtaxtype' => $this->m_data->getID('taxtype', 'nametypetax', 'idtaxtype', $this->input->post('nametypetax')),
            'prod_cost_id' => $this->m_data->getPrimaryID($this->input->post('prod_cost_id'),'prod_cost', 'prod_cost_id', $this->session->userdata('idunit')),
            'idunit' => $this->session->userdata('idunit'),
            'cost_code' => $this->input->post('cost_code'),
            'cost_name' => $this->input->post('cost_name'),
            'cost_desc' => $this->input->post('cost_desc'),
            'standard_hour' => $this->input->post('standard_hour'),
            'standard_cost' => $this->input->post('standard_cost')
        );
        return $data;
    }

}

?>