<?php

class m_savingtypegrid extends CI_Model {

    function tableName() {
        return 'saving_type';
    }

    function pkField() {
        return 'id_saving_type';
    }

    function searchField() {
        $field = "saving_name,saving_code";
        return explode(",", $field);
    }

    function selectField() {
        return "id_saving_type,idunit,saving_name,saving_desc,saving_type,saving_code,saving_category,setoran_tetap,konversi_persaham,saving_limit,debit_coa,credit_coa,debit_interest_coa,credit_interest_coa,interest_rate,interest_period,period_length,status,datein,userin,datemod,usermod,status";
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
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return " id_saving_type desc";
    }

    function updateField() { 
        $data = array(
            'id_saving_type' => $this->input->post('id_saving_type') == '' ? $this->m_data->getSeqVal('seq_saving_type') : $this->input->post('id_saving_type'),
            "idunit" => $this->session->userdata('idunit'),
            "saving_name" => $this->input->post('saving_name'),
            "saving_desc" => $this->input->post('saving_desc'),
            "saving_type" => $this->input->post('saving_type'),
            "saving_code" => $this->input->post('saving_code'),
            "saving_category" => $this->input->post('saving_category'),
            // "prefix_account" => $this->input->post('idunit'),
            "setoran_tetap" => cleardot2($this->input->post('setoran_tetap')),
            "konversi_persaham"  => cleardot2($this->input->post('konversi_persaham')),
            "saving_limit" => cleardot2($this->input->post('saving_limit')),
            "debit_coa"  => $this->input->post('idaccount_debet'),
            "credit_coa" => $this->input->post('idaccount_kredit'),
            "debit_interest_coa" => $this->input->post('idaccount_interestdebit'),
            "credit_interest_coa" => $this->input->post('idaccount_interestkredit'),
            "interest_rate" => $this->input->post('interest_rate'),
            "interest_period" => $this->input->post('interest_period'),
            "period_length"  => $this->input->post('period_length')=='' ? null : $this->input->post('period_length'),
            // "stock_saving_addition"  => ,
            "status" => $this->input->post('status_name'),
            // "display" => ,
        );
        return $data;
    }

}

?>