<?php

class m_inventory_transfer_items extends CI_Model {

    function tableName() {
        return 'inventory_transfer_item';
    }

    function pkField() {
        return 'inventory_transfer_item_id';
    }

    function searchField() {
        $field = null;
        return explode(",", $field);
    }

    function selectField() {
        return "a.inventory_transfer_item_id,a.transfer_stock_id,a.idunit,a.idinventory,a.qty_transfer,a.note,a.warehouse_source_id,a.warehouse_dest_id,b.warehouse_code,b.warehouse_code as warehouse_code_dest,d.invno,d.sku_no,d.nameinventory";
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
                    join warehouse b ON a.warehouse_source_id = b.warehouse_id and a.idunit = b.idunit
                    join warehouse c ON a.warehouse_dest_id = c.warehouse_id and a.idunit = c.idunit
                    join inventory d ON a.idinventory = d.idinventory";

        return $query;
    }

    function whereQuery() {
        return " a.transfer_stock_id = ".$this->input->post('transfer_stock_id');
    }

    function orderBy() {
        return " a.datein";
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