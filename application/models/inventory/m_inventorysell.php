<?php

class m_inventorySell extends CI_Model {

    function tableName() {
        return 'inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "nameinventory,description";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idinventory,a.invno,a.nameinventory,a.description,a.cosaccount,a.cost,a.unitmeasuresell,a.numperunit,b.namesupplier,yearbuy,monthbuy,datebuy,c.namecat,d.nametax,f.accname,f.accnumber,sellingprice,incomeaccount";
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
                 . "left join supplier b ON a.idprimarysupplier = b.idsupplier "
                . "join inventorycat c ON a.idinventorycat = c.idinventorycat "
                . "left join tax d ON a.idselingtax = d.idtax "
                . "left join account f ON f.idaccount = a.incomeaccount";

        return $query;
    }

    function whereQuery() {
        return " issell=true";
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