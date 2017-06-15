<?php

class m_inventory_adjust extends CI_Model {

    function tableName() {
        return 'inventory_adjust';
    }

    function pkField() {
        return 'inventory_adjust_id';
    }

    function searchField() {
        $field = null;
        return explode(",", $field);
    }

    function selectField() {
        return "a.inventory_adjust_id,a.idunit,a.status,a.idaccount_adjs,a.notes,a.date_adjustment,a.userin,a.datein,totalitems,totalvariances,total_value,e.username,f.accnumber,f.accname";
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
                    join (select count(*) as totalitems,inventory_adjust_id
                        from inventory_adjust_items
                        GROUP BY inventory_adjust_id) b ON a.inventory_adjust_id = b.inventory_adjust_id
                    join (select sum(variance) as totalvariances,inventory_adjust_id
                        from inventory_adjust_items
                        GROUP BY inventory_adjust_id) c ON a.inventory_adjust_id = c.inventory_adjust_id
                    join (select sum(total_value) as total_value,inventory_adjust_id
                        from inventory_adjust_items
                        GROUP BY inventory_adjust_id) d ON a.inventory_adjust_id = d.inventory_adjust_id
                    left join sys_user e ON a.userin = e.user_id
                    left join account f ON a.idaccount_adjs = f.idaccount and a.idunit = f.idunit";

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