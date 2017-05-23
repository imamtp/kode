<?php

class m_itempurchase extends CI_Model {

    function tableName() {
        return 'inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "nameinventory";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idinventory,invno,nameinventory,cost,qtystock,sellingprice,namesupplier,c.idunit,c.assetaccount";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'nocustomer'=>'Kode Konsumen'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                . "left join supplier b on a.idprimarysupplier = b.idsupplier
                left join inventoryunit c ON a.idinventory = c.idinventory";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idcustomer' => $this->input->post('idcustomer') == '' ? $this->m_data->getSeqVal('seq_customer') : $this->input->post('idcustomer'),
            'idcustomertype' => $this->m_data->getID('customertype', 'namecustype', 'idcustomertype', $this->input->post('namecustype')),
            'nocustomer' => $this->input->post('nocustomer'),
            'namecustomer' => $this->input->post('namecustomer'),
            'address' => $this->input->post('address'),
            'shipaddress' => $this->input->post('shipaddress'),
            'billaddress' => $this->input->post('billaddress'),
            'telephone' => $this->input->post('telephone'),
            'handphone' => $this->input->post('handphone'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'city' => $this->input->post('city'),
            'state' => $this->input->post('state'),
            'postcode' => $this->input->post('postcode'),
            'country' => $this->input->post('country'),
            'notes' => $this->input->post('notes')
        );
        return $data;
    }

}

?>