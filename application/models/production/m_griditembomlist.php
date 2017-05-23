<?php

class m_griditembomlist extends CI_Model {

   function tableName() {
        return 'v_inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "nameinventory,a.description";
        return explode(",", $field);
    }

    function selectField() {
        return "c.bom_id,c.bom_detail_id,a.idunit,a.idinventorycat,a.idinventory,a.invno,a.nameinventory,a.description,a.qtystock,a.cost,
            a.minstock, a.namesupplier,a.namecat,a.short_desc,a.brand_id,qty_out,c.measurement_id,b.brand_name,d.short_desc as measurement_name";
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
                    left join brand b ON a.brand_id = b.brand_id
                    join bom_detail c ON a.idinventory = c.idinventory and a.idunit = c.idunit
                    join productmeasurement d ON d.measurement_id = c.measurement_id";

        return $query;
    }

    function whereQuery() {
        return "a.display is null and a.inventory_type = 2";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        // print_r( $this->session->userdata('user_id')); die;
        $data = array(
            'bom_id' => $this->m_data->getPrimaryID($this->input->post('bom_id'),'bom', 'bom_id', $this->session->userdata('idunit')),
            'idunit' =>  $this->session->userdata('idunit'),
            'qty_out' => $this->input->post('qty_out'),
            'price' => str_replace('.', '', $this->input->post('price')),
            'measurement_id' => $this->input->post('measurement_id'),
            'bom_name' => $this->input->post('bom_name'),
            'bom_desc' => $this->input->post('bom_desc'),
            'bom_code' => $this->input->post('bom_code')
        );
        return $data;
    }

}

?>