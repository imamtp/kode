<?php

class m_goodsreceipt extends CI_Model {

    function tableName() {
        return 'goodsreceipt';
    }

    function pkField() {
        return 'idgoodsreceipt';
    }

    function searchField() {
        $field = "";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idgoodsreceipt,a.idpurchase,a.date,a.remarks,a.idunit,a.userin,a.datein,a.usermod,a.datemod,a.status,a.deleted,a.receiver,b.nopurchase,b.requestdate,b.delivereddate,b.subtotal,b.tax,b.discount,b.totalpaid,c.username as receivername";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'a.idgoodsreceipt'=>'ID Goods Receipt'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    left join purchase b on b.idpurchase = a.idpurchase
                    left join sys_user c on c.user_id = a.receiver";

        return $query;
    }

    function whereQuery() {
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idgoodsreceipt' => $this->input->post('idgoodsreceipt') == '' ? $this->m_data->getSeqVal('seq_goodsreceipt') : $this->input->post('idgoodsreceipt'),
            'idpurchase' => $this->input->post('idpurchase'),
            'date' => $this->input->post('date'),
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