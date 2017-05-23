<?php

class m_inventorystock extends CI_Model {

    function tableName() {
        return 'warehouse_stock';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "warehouse_code";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idinventory,a.warehouse_id,c.bahan_coil_id,a.stock,a.idunit,b.warehouse_code,c.measurement_id_one,c.measurement_id_two,d.short_desc as satuan_pertama,e.short_desc as satuan_kedua,a.datemod";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Pegawai'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join warehouse b ON a.warehouse_id = b.warehouse_id
                    join inventory c ON a.idinventory = c.idinventory
                    left join productmeasurement d ON c.measurement_id_one = d.measurement_id
                    left join productmeasurement e ON c.measurement_id_two = e.measurement_id";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return " a.datemod desc";
    }

    function updateField() { 
        $data = array(
            'datanakid' => $this->input->post('datanakid') == '' ? $this->m_data->getSeqVal('seq_dataanak') : $this->input->post('datanakid'),
            'idemployee' => $this->input->post('idemployee'),
            'namaanak'=>$this->input->post('namaanak')
        );
        return $data;
    }

}

?>