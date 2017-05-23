<?php

class m_deliveryordergrid extends CI_Model {

    function tableName() {
        return 'delivery_order';
    }

    function pkField() {
        return 'delivery_order_id';
    }

    function searchField() {
        $field = "no_sales_order";
        return explode(",", $field);
    }

    function selectField() {
        return "a.delivery_order_id,a.idunit,a.date_created,a.idsales,a.remarks,a.userin,a.status,b.totalamount,b.tax,b.disc,b.freight,b.paidtoday,b.balance,b.date_sales,b.no_sales_order,c.namecustomer,b.noinvoice,qtyorder,qtykirim";
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
                    left join sales b ON a.idsales = b.idsales
                    join customer c ON b.idcustomer = c.idcustomer
                    left join (select idsales,sum(qty) as qtyorder,sum(qty_kirim) as qtykirim
                                from salesitem
                                group by idsales) d ON a.idsales = d.idsales";

        return $query;
    }

    function whereQuery() {
        return " a.deleted = 0";
    }

    function orderBy() {
        return " a.datein desc";
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