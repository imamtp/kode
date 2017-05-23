<?php

class m_inventory_count extends CI_Model {

    function tableName() {
        return 'inventory_count';
    }

    function pkField() {
        return 'inventory_count_id';
    }

    function searchField() {
        $field = null;
        return explode(",", $field);
    }

    function selectField() {
        return "a.inventory_count_id,a.idunit,a.status,a.type_id,a.notes,a.date_count,a.userin,a.datein,totalitems,totalvariances,total_value,e.username";
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
                    join (select count(*) as totalitems,inventory_count_id
                        from inventory_count_items
                        GROUP BY inventory_count_id) b ON a.inventory_count_id = b.inventory_count_id
                    join (select sum(variance) as totalvariances,inventory_count_id
                        from inventory_count_items
                        GROUP BY inventory_count_id) c ON a.inventory_count_id = c.inventory_count_id
                    join (select sum(total_value) as total_value,inventory_count_id
                        from inventory_count_items
                        GROUP BY inventory_count_id) d ON a.inventory_count_id = d.inventory_count_id
                    left join sys_user e ON a.userin = e.user_id";

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