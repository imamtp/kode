<?php

class m_tabelcoil extends CI_Model {

    function tableName() {
        return 'bahan_coil';
    }

    function pkField() {
        return 'bahan_coil_id';
    }

    function searchField() {
        $field = "produk_nama,namecat";
        return explode(",", $field);
    }

    function selectField() {
        return "a.bahan_coil_id,a.idinventorycat,a.az_z,a.lebar,a.tebal,a.berat,a.keterangan,a.produk_nama,a.idunit,b.namecat";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'product_type_name'=>'product_type Name'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join inventorycat b ON a.idinventorycat = b.idinventorycat";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 

        // print_r( $this->session->userdata('user_id')); die;
        $data = array(
            'product_type_id' => $this->m_data->getPrimaryID($this->input->post('product_type_id'),'product_type', 'product_type_id', $this->session->userdata('idunit')),
            'product_type_name' => $this->input->post('product_type_name'),
            'product_type_desc' => $this->input->post('product_type_desc'),
            'status'=>$this->input->post('status'),
            'idunit' => $this->session->userdata('idunit')
        );
        return $data;
    }

}

?>