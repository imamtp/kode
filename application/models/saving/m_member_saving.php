<?php

class m_member_saving extends CI_Model {

    function tableName() {
        return 'member_saving';
    }

    function pkField() {
        $field = 'id_saving_type,id_member';
        return explode(",", $field);
    }

    function searchField() {
        $field = "member_name,no_member,no_account";
        return explode(",", $field);
    }

    function selectField() {
        return "a.id_saving_type,a.id_member,a.date_registered,a.date_activated,a.status,a.approvedby_id,a.amount,a.interest,a.reg_admin_fee,a.startdate,a.enddate,a.opening_notes,a.no_account,a.period,
        b.saving_name,b.saving_type,b.saving_category,c.no_member,c.member_name,d.username as userin,e.username as user_approved";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'saving_name'=>'saving_name',
          'saving_code'=>'saving_code'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                 . "join saving_type b ON a.id_saving_type = b.id_saving_type
                    join member c ON a.id_member = c.id_member
                    join sys_user d ON a.userin = d.user_id
                    left join sys_user e ON a.approvedby_id = e.user_id ";

        return $query;
    }

    function whereQuery() {
        return "a.deleted = 0";
    }

    function orderBy() {
        return "a.datein asc";
    }

    function updateField() {
        $data = array(
            'id_saving_type' => $this->input->post('id_saving_type'),
            'id_member' => $this->input->post('id_member'),
            'date_registered' => date('Y-m-d H:m:s'),
            'opening_notes' => $this->input->post('opening_notes'),
            'reg_admin_fee' => $this->input->post('reg_admin_fee'),
            'no_account' => $this->input->post('no_account'),
            'period' => $this->input->post('period'),            
            'amount' => $this->input->post('amount')!='' ? cleardot2($this->input->post('amount')) : null,
            'status' => $this->input->post('status')
        );
        return $data;
    }

}

?>
