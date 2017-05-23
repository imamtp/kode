<?php

class m_itemmaterialwo extends CI_Model {

    function tableName() {
        return 'prod_material';
    }

    function pkField() {
        return 'prod_material_id';
    }

    function searchField() {
        $field = "cost_code,cost_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.prod_material_id,a.job_order_id,a.idinventory,a.bom_id,a.measurement_id,a.qty,a.idunit,a.material_type,a.qty_real,a.qty_sisa,a.whs_sisa_id,a.notes,b.nameinventory,b.invno,b.sku_no,c.short_desc as measurement_name,slice";
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
                   join inventory b ON a.idinventory = b.idinventory
                    left join productmeasurement c ON a.measurement_id = c.measurement_id";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
    }

    function orderBy() {
        return " a.prod_material_id desc";
    }

    function updateField() { 
        $data = array(
            // 'idtax' => $this->input->post('idtax') == '' ? $this->m_data->getSeqVal('seq_tax') : $this->input->post('idtax'),
            // 'idtaxtype' => $this->m_data->getID('taxtype', 'nametypetax', 'idtaxtype', $this->input->post('nametypetax')),
            'prod_cost_id' => $this->m_data->getPrimaryID($this->input->post('prod_cost_id'),'prod_cost', 'prod_cost_id', $this->session->userdata('idunit')),
            'idunit' => $this->input->post('idunit'),
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