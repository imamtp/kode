<?php

class m_receiptwo extends CI_Model {

    function tableName() {
        return 'job_order';
    }

    function pkField() {
        return 'job_order_id';
    }

    function searchField() {
        $field = "job_no,no_sales_order";
        return explode(",", $field);
    }

    function selectField() {
        return "a.job_order_id,a.idsales,a.idunit,a.startdate_job,a.enddate_job,a.job_no,a.finished_date,a.status,a.pic_id,a.approvedby_id,b.no_sales_order,b.date_sales,c.firstname as pic_name,d.firstname as approveby_name,totaljob,totalcostitem,totalmaterialitem,a.req_ship_date";
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
                    left join employee c ON a.pic_id = c.idemployee
                    left join employee d ON a.pic_id = d.idemployee
                    join (select job_order_id,count(*) as totaljob
                        from job_item
                        group by job_order_id) e ON a.job_order_id = e.job_order_id
                    left join (select job_order_id,count(*) as totalcostitem
                        from job_order_cost
                        group by job_order_id) f ON a.job_order_id = f.job_order_id
                    join (select job_order_id,count(*) as totalmaterialitem
                        from prod_material
                        group by job_order_id) g ON a.job_order_id = g.job_order_id";

        return $query;
    }

    function whereQuery() {

        return " a.deleted = 0 and (a.status BETWEEN 2 and 5)";
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