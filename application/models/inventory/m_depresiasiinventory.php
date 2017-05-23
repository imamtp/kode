<?php

class m_depresiasiinventory extends CI_Model {

    function tableName() {
        return 'inventorydeprecitem';
    }

    function pkField() {
        return 'idinventory,month,year';
    }

    function searchField() {
        $field = "month";
        return explode(",", $field);
    }

    function selectField() {
        return "idinventory,month,year,penyusutan,idunit";
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
        return "month,year";
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