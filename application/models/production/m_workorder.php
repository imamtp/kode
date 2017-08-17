<?php

class m_workorder extends CI_Model {

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
        return "a.job_order_id,a.idsales,a.idunit,a.startdate_job,a.enddate_job,a.job_no,a.req_ship_date,a.status,a.remarks,b.date as datesales,b.no_sales_order,b.date_sales,c.totaljob,d.totalraw,e.totalbom,f.firstname,a.pic_id,startdate_job,enddate_job,approvedby_id,g.namecustomer,b.no_sales_order,g.address as address_customer";
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
                    left join (select job_order_id,count(*) as totaljob
                        from job_item
                        group by job_order_id) c ON a.job_order_id = c.job_order_id 
                    left join (select job_order_id,count(*) as totalraw
                        from prod_material
                        where material_type = 1
                        group by job_order_id) d ON a.job_order_id = d.job_order_id
                    left join (select job_order_id,count(*) as totalbom
                        from prod_material
                        where material_type = 2
                        group by job_order_id) e ON a.job_order_id = e.job_order_id
                    left join employee f ON a.pic_id = f.idemployee
                    left join customer g ON g.idcustomer = b.idcustomer";

        return $query;
    }

    function whereQuery() {
        $wer = null;

        if($this->input->post('option')=='scheduled'){
            $wer = " AND a.startdate_job is not null and a.status != 4";
        } else if($this->input->post('option')=='notinschedule'){
             $wer = " AND a.startdate_job is null";
        } else if($this->input->post('option')=='finished'){
             $wer = " AND a.startdate_job is not null";
        } else if($this->input->post('option')=='not_yet_received'){
            //wo yang belum diterima wo-nya
            $wer = " AND (a.status BETWEEN 2 and 3) and a.material_confirm_status = 1";
            //  $wer = " AND a.job_order_id not in (select job_order_id from job_order where (status BETWEEN 2 and 5))";
        }

        return " a.deleted = 0 $wer";
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

    function cetak_wo($job_order_id){

        $sql = $this->query();
        $sql.= " WHERE a.job_order_id=$job_order_id";
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $dtcetak = $q->result_array()[0];
            
            $runit = $this->m_data->dataunit($dtcetak['idunit']);
            $dtcetak['logo'] = $runit['logo'];
            $dtcetak['namaunit'] = $runit['namaunit'];
            $dtcetak['alamat'] = $runit['alamat'];
            $dtcetak['telp'] = $runit['telp'];
            $dtcetak['fax'] = $runit['fax'];

            //header
            $sql = $this->query()." WHERE ".$this->whereQuery()." AND a.job_order_id=$job_order_id ";
            $query = $this->db->query($sql);
            $dtcetak['header'] = $query->result_array()[0];
            
            //detail finished goods
            $this->load->model('production/m_itemjobwo');
            $sql = $this->m_itemjobwo->query()." WHERE ".$this->m_itemjobwo->whereQuery()." AND a.job_order_id=$job_order_id";
            $query = $this->db->query($sql);
            $dtcetak['fg_list'] = $query->result_array();

            //detail rm of fg
            $this->load->model('production/m_itemmaterialwo');
            foreach($dtcetak['fg_list'] as $key=>$fg){
                $sql = $this->m_itemmaterialwo->query()." WHERE ".$this->m_itemmaterialwo->whereQuery()." AND a.job_order_id = $job_order_id AND a.job_item_id = ". $fg['job_item_id'];
                $query = $this->db->query($sql);
                $dtcetak['fg_list'][$key]['rm_list'] = $query->result_array();
            }

            return $dtcetak;
        } else {
            echo 'Data not found';
        }
    }
}

?>