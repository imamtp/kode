<?php

class m_inventory_count_items extends CI_Model {

    function tableName() {
        return 'inventory_count_items';
    }

    function pkField() {
        return 'inventory_count_id';
    }

    function searchField() {
        $field = null;
        return explode(",", $field);
    }

    function selectField() {
        return "a.inventory_count_item_id,a.inventory_count_id,a.idunit,a.idinventory,a.warehouse_id,a.qty_count,a.variance,a.item_value,a.total_value,a.cost,a.sellingprice,a.datein,a.qty_stock,b.invno,b.sku_no,b.measurement_id_one,b.nameinventory,c.short_desc as satuan_pertama,d.warehouse_code";
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
                    join inventory b ON a.idinventory = b.idinventory
                    left join productmeasurement c ON b.measurement_id_one = c.measurement_id
                    join warehouse d ON a.warehouse_id = d.warehouse_id";

        return $query;
    }

    function whereQuery() {
        return null;
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