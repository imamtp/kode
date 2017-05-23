<?php

class m_acclinkinventory extends CI_Model {

    function tableName() {
        return 'v_acclinkinventory3';
    }

    function pkField() {
        return 'idinventory,idunit';
    }

    function searchField() {
        $field = "accasset,akumpenyusut,depresiasi,namaunit";
        return explode(",", $field);
    }

    function selectField() {
        return "idinventory,idunit,accasset,akumpenyusut,depresiasi,namaunit,assetaccount,akumpenyusutaccount,depresiasiaccount";
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
                    from " . $this->tableName()."";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
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