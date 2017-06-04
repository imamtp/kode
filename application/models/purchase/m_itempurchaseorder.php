<?php

class m_itempurchaseorder extends CI_Model {

    function tableName() {
        return 'purchaseitem';
    }

    function pkField() {
        return 'idpurchaseitem';
    }

    function searchField() {
        $field = "nametax";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idpurchaseitem,a.idpurchase,a.idinventory,a.idtax,a.qty,a.backorder,a.price,a.disc,a.total,a.invno,a.ratetax,b.nametax,c.nameinventory";
    }

    function fieldCek() {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
            'code' => 'Kode Pajak'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName() . " a "
                . "left join tax b ON a.idtax = b.idtax
                    join inventory c ON a.idinventory = c.idinventory ";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
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