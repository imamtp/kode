<?php

class m_goodsreceived extends CI_Model {

    function tableName() {
        return 'goodsreceived';
    }

    function pkField() {
        return 'idgoodsreceived';
    }

    function searchField() {
        $field = "";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idgoodsreceived,a.idgoodsreceipt,a.idinventory,a.qty,a.batchcode,a.label,a.remarks,a.idunit,a.userin,a.datein,a.usermod,a.datemod,a.status,a.deleted,b.invno";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'a.nogoodsreceived'=>'No Purchase'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join inventory b on b.idinventory = a.idinventory";

        return $query;
    }

    function whereQuery() {
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idgoodsreceived' => $this->input->post('idgoodsreceived') == '' ? $this->m_data->getSeqVal('seq_goodsreceived') : $this->input->post('idgoodsreceived'),
            'idgoodsreceipt' => $this->input->post('idgoodsreceipt'),
            'idinventory' => $this->input->post('idinventory'),
            'qty' => $this->input->post('qty'),
            'batchcode' => $this->input->post('batchcode'),
            'label' => $this->input->post('label'),
            'remarks' => $this->input->post('remarks'),
            'idunit' => $this->session->userdata('idunit'),
            'userin' => $this->input->post('userin'),
            'datein' => $this->input->post('datein'),
            'usermod' => $this->input->post('usermod'),
            'datemod' => $this->input->post('datemod'),
            'status' => $this->input->post('status'),
            'deleted' => $this->input->post('deleted'),
        );
        return $data;
    }
}

?>