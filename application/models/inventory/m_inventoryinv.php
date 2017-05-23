<?php

class m_inventoryinv extends CI_Model {

    function tableName() {
        return 'inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "nameinventory,a.description";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idinventory,nameinventory,datebuy,images,akumulasiakhir,invno,a.cosaccount,a.cost,a.minstock,a.qtystock,f.accname,f.accnumber,assetaccount,residu,umur,akumulasibeban,bebanberjalan,nilaibuku,bebanperbulan,a.inventory_type";
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
                    from " . $this->tableName()." a "
                . "left join account f ON f.idaccount = a.assetaccount";

        return $query;
    }

    function whereQuery() {
        return " isinventory=true";
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