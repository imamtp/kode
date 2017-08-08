<?php

class m_itemjobwo extends CI_Model {

    function tableName() {
        return 'job_item';
    }

    function pkField() {
        return 'job_item_id';
    }

    function searchField() {
        $field = "cost_code,cost_name";
        return explode(",", $field);
    }

    function selectField() {
        return "a.job_item_id,a.job_order_id,a.idinventory,a.idunit,a.measurement_id,a.cost,a.qty,a.subtotal,a.subtotal as total,a.qty as total_qty,a.remarks,a.userin,a.datein,a.idunit,a.size,
a.measurement_id_size,a.qty_accept,a.whs_accept_id,a.qty_reject,a.whs_reject_id,a.qty_sisa,a.whs_sisa_id,a.notes,a.token_tmp,
b.nameinventory,b.invno,b.sku_no,c.short_desc, d.short_desc  as size_measurement,e.warehouse_code as warehouse_code_accept,
f.warehouse_code as warehouse_code_reject,g.warehouse_code as warehouse_code_sisa, j.namecustomer";
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
                    left join productmeasurement c ON a.measurement_id = c.measurement_id
                    left join productmeasurement d ON a.measurement_id_size = d.measurement_id
                    left join warehouse e ON a.whs_accept_id = e.warehouse_id
                    left join warehouse f ON a.whs_reject_id = f.warehouse_id
                    left join warehouse g ON a.whs_sisa_id = g.warehouse_id
                    left join job_order h on h.job_order_id = a.job_order_id
                    left join sales i on i.idsales = h.idsales
                    left join customer j on j.idcustomer = i.idcustomer";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0
                    and b.idinventory_parent is null";
    }

    function orderBy() {
        return " a.datein desc";
    }

    function updateField() { 
        $data = array(
            // 'idtax' => $this->input->post('idtax') == '' ? $this->m_data->getSeqVal('seq_tax') : $this->input->post('idtax'),
            // 'idtaxtype' => $this->m_data->getID('taxtype', 'nametypetax', 'idtaxtype', $this->input->post('nametypetax')),
            'prod_cost_id' => $this->m_data->getPrimaryID($this->input->post('prod_cost_id'),'prod_cost', 'prod_cost_id', $this->session->userdata('idunit')),
            'idunit' => $this->input->post('idunit'),
            'cost_code' => $this->input->post('cost_code'),
            'cost_name' => $this->input->post('cost_name'),
            'cost_desc' => $this->input->post('cost_desc'),
            'standard_hour' => $this->input->post('standard_hour'),
            'standard_cost' => $this->input->post('standard_cost')
        );
        return $data;
    }

}

?>