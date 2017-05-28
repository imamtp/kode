<?php

class m_itemreturnpo extends CI_Model {

    function tableName() {
        return 'purchase_returnitem';
    }

    function pkField() {
        return 'purchase_returnitem';
    }

    function searchField() {
        $field = "nametax";
        return explode(",", $field);
    }

    function selectField() {
        return "a.purchase_batch_id,a.idinventory,a.idpurchaseitem,a.qty_retur,a.qty_received,a.is_received,b.nameinventory,b.sku_no,b.invno,b.measurement_id_one,c.short_desc,a.warehouse_id,e.warehouse_code,a.notes";
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
                . "join inventory b ON a.idinventory = b.idinventory
                    left join productmeasurement c ON c.measurement_id = b.measurement_id_one   
                    left join purchaseitem d ON a.idpurchaseitem = d.idpurchaseitem      
                    left join warehouse e ON a.warehouse_id = e.warehouse_id ";

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