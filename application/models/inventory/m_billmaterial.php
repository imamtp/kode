<?php

class m_billmaterial extends CI_Model {

    function tableName() {
        return 'bom';
    }

    function pkField() {
        return 'bom_id';
    }

    function searchField() {
        $field = "bom_name,bom_code";
        return explode(",", $field);
    }

    function selectField() {
        return "a.bom_id,a.idunit,a.qty_out,a.measurement_id,a.bom_name,a.bom_desc,a.bom_code,a.bom_desc,a.userin,a.datein,b.short_desc as measurement_name,c.totalitem";
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
                    join productmeasurement b ON a.measurement_id = b.measurement_id
                    left join (select idunit,bom_id,count(*) as totalitem
                            from bom_detail
                            group by idunit,bom_id) c ON a.bom_id = c.bom_id and a.idunit = c.idunit";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
    }

    function orderBy() {
        return " a.datein desc";
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