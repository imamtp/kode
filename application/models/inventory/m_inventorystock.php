<?php

class m_inventorystock extends CI_Model {

    function tableName() {
        return 'warehouse_stock';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "warehouse_code";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idinventory,a.warehouse_id,c.bahan_coil_id,a.stock,a.idunit,b.warehouse_code,c.measurement_id_one,c.measurement_id_two,d.short_desc as satuan_pertama,e.short_desc as satuan_kedua,a.datemod";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Pegawai'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join warehouse b ON a.warehouse_id = b.warehouse_id
                    join inventory c ON a.idinventory = c.idinventory
                    left join productmeasurement d ON c.measurement_id_one = d.measurement_id
                    left join productmeasurement e ON c.measurement_id_two = e.measurement_id";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return " a.datemod desc";
    }

    function updateField() { 
        $data = array(
            'datanakid' => $this->input->post('datanakid') == '' ? $this->m_data->getSeqVal('seq_dataanak') : $this->input->post('datanakid'),
            'idemployee' => $this->input->post('idemployee'),
            'namaanak'=>$this->input->post('namaanak')
        );
        return $data;
    }

    function stock_card($idinventory,$sd,$nd){
        $sql = "select case
                    when type_adjustment = 1 then 'Order (+)'
                    when type_adjustment = 2 then 'Stock In By PO (+)'
                    when type_adjustment = 3 then 'Stock In By Cash  (+)'
                    when type_adjustment = 4 then 'Stock Opname Plus (+)'
                    when type_adjustment = 5 then 'Stock Opname Minus (-)'
                    when type_adjustment = 6 then 'Sales Return (+)'
                    when type_adjustment = 7 then 'Purchase Return (-)'
                    when type_adjustment = 8 then 'Sales (-)'
                    when type_adjustment = 9 then 'Opening Balance (+)'
                    when type_adjustment = 10 then 'Stock In By Transfer (+)'
                    when type_adjustment = 11 then 'Stock Out By Transfer (-)'
                    when type_adjustment = 12 then 'Stock In By Received Material From Production (+)'
                    when type_adjustment = 13 then 'Stock In By Received Return PO (+)'
                    when type_adjustment = 14 then 'Delivery Sales Return (-)'
                    when type_adjustment = 15 then 'Stock Out From Production (-)'
                end as type_adjustment,
            no_transaction,
            old_qty,qty_transaction,balance,a.notes,
            to_char(a.datein, 'Dy, DD Mon  YY') as tanggal,
            to_char(a.datein, 'HH:mm:ss') as jam,
            b.warehouse_code
            from stock_history a
            join warehouse b ON a.warehouse_id = b.warehouse_id
            where a.idinventory = $idinventory
            and (a.datein between '".$sd." 00:00:00' and '".$nd." 23:08:28')
            order by a.datein";
        $q = $this->db->query($sql);
        return $q->result_array();
    }

}

?>