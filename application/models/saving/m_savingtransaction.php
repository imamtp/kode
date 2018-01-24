<?php

class m_savingtransaction extends CI_Model {

    function tableName() {
        return 'member_saving_history';
    }

    function pkField() {
        return 'id_saving_history';
    }

    function searchField() {
        $field = "remarks,member_name,no_member";
        return explode(",", $field);
    }

    function selectField() {
        return "id_saving_history,a.id_saving_type,a.id_member,a.idunit,a.idjournal,a.datein,tellerid,approvedby,amount,fee_adm,a.status,trx_type,id_saving_type_dest,id_member_dest,remarks,trx_time_type,trx_date,b.member_name,no_member,a.userin,c.username,d.saving_name";
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
                    join member b ON a.id_member = b.id_member
                    join sys_user c ON a.userin = c.user_id
                    join saving_type d ON a.id_saving_type = d.id_saving_type";

        return $query;
    }

    function whereQuery() {
        return " trx_type = 1" ;
    }

    function orderBy() {
        return " a.id_saving_history desc";
    }

    function updateField() { 
        $data = array(
            'id_saving_history' => $this->input->post('id_saving_history') == '' ? $this->m_data->getSeqVal('seq_saving_type') : $this->input->post('id_saving_history'),
            "idunit" => $this->session->userdata('idunit'),
            "id_saving_type" => $this->input->post('id_saving_type'),
            "id_member" => $this->input->post('id_member'),
            // "idjournal" => $this->input->post('idjournal') == '' ? null : $this->input->post('idjournal'),
            "tellerid" => $this->input->post('tellerid'),
            "approvedby" => $this->input->post('approvedby'),
            "amount"  => cleardot2($this->input->post('amount')),
            "fee_adm" => cleardot2($this->input->post('fee_adm')),
            "trx_type"  => $this->input->post('trx_type'),
            "id_saving_type_dest" => $this->input->post('id_saving_type_dest'),
            "id_member_dest" => $this->input->post('id_member_dest'),
            "remarks" => $this->input->post('remarks'),
            "trx_time_type" => $this->input->post('trx_time_type'),
            "trx_date" => backdate2_reverse($this->input->post('trx_date')),
            "status" => $this->input->post('status'),
            // "display" => ,
        );

        if($data['trx_type']==1){
            //cash in
        } else if($data['trx_type']==2){
            //cash out
        }
        return $data;
    }

}

?>