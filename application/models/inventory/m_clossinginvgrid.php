<?php

class m_clossinginvgrid extends CI_Model {

    function tableName() {
        return 'inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "namaanak";
        return explode(",", $field);
    }

    function selectField() {
        return "a.nameinventory,b.assetaccount,b.akumpenyusutaccount,b.depresiasiaccount,a.invno,a.idinventory,a.cost,a.residu,a.umur,a.bebanperbulan";
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
                    left join inventoryunit b ON a.idinventory = b.idinventory";

        return $query;
    }

    function whereQuery() {
        return " b.clossed is null and qtystock >=1";
    }

    function orderBy() {
        return "";
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