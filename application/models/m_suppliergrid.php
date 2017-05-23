<?php

class m_SupplierGrid extends CI_Model {

    function tableName() {
        return 'supplier';
    }

    function pkField() {
        return 'idsupplier';
    }

    function searchField() {
        $field = "namesupplier,code";
        return explode(",", $field);
    }

    function selectField() {
        return "idsupplier,code,namesupplier,companyaddress,companyaddress2,companyaddress3,shipaddress,billaddress,telephone,handphone,fax,email,website,city,state,postcode,country,highestpo,avgdaypay,lastpayment,lastpurchase,expenseaccount,notes,status";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'code'=>'Kode Supplier'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a ";

        return $query;
    }

    function whereQuery() {
        return "display is null";
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idsupplier' => $this->input->post('idsupplier') == '' ? $this->m_data->getSeqVal('seq_supplier') : $this->input->post('idsupplier'),
//            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'code' => $this->input->post('code'),
            'namesupplier' => $this->input->post('namesupplier'),
            'companyaddress' => $this->input->post('companyaddress'),
            'companyaddress2' => $this->input->post('companyaddress2'),
            'companyaddress3' => $this->input->post('companyaddress3'),
            'shipaddress' => $this->input->post('shipaddress'),
            'billaddress' => $this->input->post('billaddress'),
            'telephone' => $this->input->post('telephone'),
            'handphone' => $this->input->post('handphone'),
            'fax' => $this->input->post('fax'),
            'email' => $this->input->post('email'),
            'website' => $this->input->post('website'),
            'city' => $this->input->post('city'),
            'state' => $this->input->post('state'),
            'postcode' => $this->input->post('postcode'),
            'country' => $this->input->post('country'),
            'notes' => $this->input->post('notes'),
            'supplier_type_id' => $this->input->post('supplier_type_id'),
            'status'=>$this->input->post('status')
        );
        return $data;
    }

}

?>