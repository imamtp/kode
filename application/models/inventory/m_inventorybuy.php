<?php

class m_inventoryBuy extends CI_Model {

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
        return "a.idinventory,invno,a.description,nameinventory,images,qtystock,a.cosaccount,a.cost,a.unitmeasure,a.idinventorycat,a.numperunit,a.idsupplier,b.namesupplier,yearbuy,monthbuy,datebuy,c.namecat,d.nametax as nametaxbuy,d.rate as ratetax,f.accname,f.accnumber, g.assetaccount";
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
                . "left join tax d ON a.idbuytax = d.idtax "
                . "left join account f ON f.idaccount = a.cosaccount "
                . "left join inventoryunit g on g.idinventory = a.idinventory";

        return $query;
    }

    function whereQuery() {
        return " isbuy=true";
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