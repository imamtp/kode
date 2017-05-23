<?php

class m_inventory_transfer extends CI_Model {

    function tableName() {
        return 'inventory_transfer';
    }

    function pkField() {
        return 'transfer_stock_id';
    }

    function searchField() {
        $field = null;
        return explode(",", $field);
    }

    function selectField() {
        return "a.transfer_stock_id,a.idunit,a.requestedby_d,a.approvedby_id,a.request_date,a.approved_date,a.memo,a.no_transfer,a.datein,b.totalitem,c.totalqty,d.username as requestedby,e.username as approvedby";
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
                    join (select transfer_stock_id,count(*) as totalitem
                        from inventory_transfer_item
                        group by transfer_stock_id) b ON a.transfer_stock_id = b.transfer_stock_id
                    join (select transfer_stock_id,sum(qty_transfer) as totalqty
                        from inventory_transfer_item
                        group by transfer_stock_id) c ON a.transfer_stock_id = c.transfer_stock_id
                    left join sys_user d ON a.requestedby_d = d.user_id
                    left join sys_user e ON a.approvedby_id = e.user_id";

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