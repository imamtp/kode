<?php

class m_salesreturn extends CI_Model {

    function tableName() {
        return 'sales_return';
    }

    function pkField() {
        return 'sales_return_id';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.sales_return_id,a.idunit,a.return_date,a.noreturn,a.idcustomer,a.memo,a.return_amount,a.idaccount_return,a.userin,a.datein,b.namecustomer,c.accname,c.accnumber,a.notes";
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
                    join customer b ON a.idcustomer = b.idcustomer
                    join account c ON a.idaccount_return = c.idaccount and a.idunit = c.idunit";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
    }

    function orderBy() {
        return " a.sales_return_id desc";
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