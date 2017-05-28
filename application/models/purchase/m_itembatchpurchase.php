<?php

class m_itembatchpurchase extends CI_Model {

    function tableName() {
        return 'purchaseitem_batch';
    }

    function pkField() {
        return 'purchase_batch_id';
    }

    function searchField() {
        $field = "d.nameinventory";
        return explode(",", $field);
    }

    function selectField() {
        return "a.purchase_batch_id,a.idpurchaseitem,a.qty,a.measurement_id,a.idunit,a.idinventory,a.no,a.warehouse_id,c.warehouse_code,b.short_desc,d.nameinventory,d.sku_no,d.invno";
    }

    function fieldCek() {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
            'code' => 'Kode Pajak'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName() . " a "
                . "left join productmeasurement b ON a.measurement_id = b.measurement_id   
                    left join warehouse c ON a.warehouse_id = c.warehouse_id 
                    join inventory d ON a.idinventory = d.idinventory";

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