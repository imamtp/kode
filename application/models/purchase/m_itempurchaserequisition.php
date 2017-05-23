<?php

class m_itempurchaserequisition extends CI_Model {

    function tableName() {
        return 'purchaseitem';
    }

    function pkField() {
        return 'idpurchaseitem';
    }

    function searchField() {
        $field = "";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpurchaseitem,a.idpurchase,a.idinventory,a.idtax,a.itemdesc,a.qty,a.received,a.backorder,a.price,a.disc,a.total,a.invno,a.ratetax,a.tax,a.beforetax,a.status,a.deleted,a.remarks,a.cost,b.nameinventory";
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
                    from " . $this->tableName()." a
                    join inventory b on b.idinventory = a.idinventory";

        return $query;
    }

    function whereQuery() {
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idpurchaseitem' => $this->input->post('idpurchaseitem') == '' ? $this->m_data->getSeqVal('seq_purchaseitem') : $this->input->post('idpurchaseitem'),
            'idpurchase' => $this->input->post('idpurchase'),
            'idinventory' => $this->input->post('idinventory'),
            'idtax' => $this->input->post('idtax'),
            'itemdesc' => $this->input->post('itemdesc'),
            'qty' => $this->input->post('qty'),
            'received' => $this->input->post('received'),
            'price' => $this->input->post('price'),
            'disc' => $this->input->post('disc'),
            'total' => $this->input->post('total'),
            'ratetax' => $this->input->post('ratetax'),
            'tax' => $this->input->post('tax'),
            'beforetax' => $this->input->post('beforetax'),
            'remarks' => $this->input->post('remarks'),
            'cost' => $this->input->post('cost'),
            'status' => $this->input->post('status'),
            'deleted' => $this->input->post('deleted'),
            'idunit'=>$this->session->userdata('idunit'),
        );
        return $data;
    }

}

?>