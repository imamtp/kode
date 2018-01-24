<?php

class m_AnggotaGrid extends CI_Model {

    function tableName() {
        return 'member';
    }

    function pkField() {
        return 'id_member';
    }

    function searchField() {
        $field = "no_member,no_id,member_name";
        return explode(",", $field);
    }


    function selectField() {
        return "id_member,a.id_member_type,a.idunit,no_member,b.namaunit,id_type,no_id,member_name,a.address,a.telephone,a.handphone,a.email,a.website,a.postcode,birth_location,birth_date,pin,photo_image,sign_image,notes,marital_status,nama_ibu_kandung,nama_ahli_waris,no_id_ahli_waris,lahir_ahli_waris,hubungan_ahli_waris,notlp_ahli_waris,no_rekening,nama_rekening,nama_bank,approved_by,activated_date,a.status,is_staff,a.datein";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'member_name'=>'member_name',
          'no_member'=>'no_member',
          'no_id'=>'no_id'    
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                 . "left join unit b ON a.idunit = b.idunit";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
    }

    function orderBy() {
        return "a.datein asc";
    }

    function updateField() {

        $photo_image = null;
        $sign_image = null;

        $data = array(
            'id_member' => $this->m_data->getPrimaryID($this->input->post('id_member'),'member','id_member',$this->input->post('idunit')) ,
            'idunit' =>$this->input->post('idunit'),
            'id_member_type' => $this->input->post('id_member_type'),
            'no_member' => $this->input->post('no_member'),
            'no_id' => $this->input->post('no_id'),
            'member_name' => $this->input->post('member_name'),
            'address' => $this->input->post('address'),
            'telephone' => $this->input->post('telephone'),
            'handphone' => $this->input->post('handphone'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'postcode' => $this->input->post('postcode'),
            'birth_location' => $this->input->post('birth_location'),
            'birth_date' => $this->input->post('birth_date')!='' ? backdate2($this->input->post('birth_date')) : null,
            'pin' => $this->input->post('pin'),
            'notes' => $this->input->post('notes'),
            'marital_status' => $this->input->post('marital_status'),
            'photo_image' => $photo_image,
            'sign_image' => $sign_image,
            'nama_ibu_kandung' => $this->input->post('nama_ibu_kandung'),
            'nama_ahli_waris' => $this->input->post('nama_ahli_waris'),
            'no_id_ahli_waris' => $this->input->post('no_id_ahli_waris'),
            'lahir_ahli_waris' => $this->input->post('lahir_ahli_waris')!='' ? backdate2($this->input->post('lahir_ahli_waris')) : null,
            'hubungan_ahli_waris' => $this->input->post('hubungan_ahli_waris'),
            'notlp_ahli_waris' => $this->input->post('notlp_ahli_waris'),
            'no_rekening' => $this->input->post('no_rekening'),
            'nama_rekening' => $this->input->post('nama_rekening'),
            'activated_date' => $this->input->post('activated_date')!='' ? backdate2($this->input->post('activated_date')) : null,
            'is_staff' => $this->input->post('is_staff'),
            'status' => $this->input->post('status')        
        );
        return $data;
    }

}

?>
