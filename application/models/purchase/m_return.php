<?php

class m_return extends CI_Model {

    function tableName() {
        return 'return';
    }

    function pkField() {
        return 'idreturn';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idreturn,a.idunit,a.idsupplier,b.namesupplier,a.tglkirim,d.namaunit,c.accname,a.noreturn,a.date,a.memo,a.subtotal,a.taxreturn,a.freight,a.totalreturn,a.userin,a.datein,a.nopo";
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
                . "join supplier b ON a.idsupplier = b.idsupplier
                    join account c ON a.idaccount = c.idaccount AND a.idunit = c.idunit
                    join unit d ON a.idunit = d.idunit";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=99 && $this->session->userdata('group_id')!=1)
        {
            $wer = " a.idunit = ".$this->session->userdata('idunit')." ";
        } else {
            $wer =  null;
        }
        return $wer;
    }

    function orderBy() {
        return " a.date desc";
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

     function cetak($idreturn)
    {        
        //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.idreturn=$idreturn";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            //detail pembayaran
            $i=0;
            $total=0;

            $sql = "select a.idreturn,a.qtyretur,a.price,a.total,a.idinventory,a.invno,a.cost,a.ratetax,a.returnamount,b.nameinventory
                    from returnitem a
                    join inventory b ON a.idinventory = b.idinventory
                    where a.idreturn=$idreturn";
            $qitem = $this->db->query($sql);
            // echo $this->db->last_query();
            foreach ($qitem->result() as $ritem) {
                // $qaccbayar = $this->db->get_where('inventory',array('idinventory'=>$ritem->idinventory))->row();
                $detail[$i]['invno']=$ritem->invno;
                $detail[$i]['nameinventory']=$ritem->nameinventory;
                $detail[$i]['nameinventory']=$ritem->nameinventory;
                $detail[$i]['qtyretur']=$ritem->qtyretur;
                $detail[$i]['returnamount']=$ritem->returnamount;
                // $detail[$i]['price']=number_format($ritem->price);
                // $detail[$i]['jumlah']=number_format($ritem->total);

                // if(isset($ritem->denda))
                // {
                //     if($ritem->denda!=0)
                //     {
                //         $detail[$i]['denda']['accname']='Denda '.$qaccbayar->accname;
                //         $detail[$i]['denda']['jumlah']=number_format($ritem->denda);
                //     } else {
                //          $detail[$i]['denda']=null;
                //     }
                // }

                // if(isset($ritem->qty))
                // {
                //     $detail[$i]['qty']=$ritem->qty;
                // }
               
                $total+=$ritem->returnamount;
                $i++;
            }

            $dtcetak['detail'] = $detail;
            $dtcetak['detailtotal'] = number_format($total);
            $dtcetak['terbilang'] = terbilang($total);
             //get no/reff
            $dtcetak['no'] = $r->noreturn;

            //SUPPLIER
            $qsupplier = $this->db->get_where('supplier',array('idsupplier'=>$r->idsupplier))->row();
            $dtcetak['namesupplier'] = $qsupplier->namesupplier;
            $dtcetak['companyaddress'] = $qsupplier->companyaddress;
            $dtcetak['telephone'] = $qsupplier->telephone;
            $dtcetak['fax'] = $qsupplier->fax;

            $dtcetak['receivedby']=$r->userin;
            $dtcetak['datetrans']=$r->date;
            $dtcetak['memo']=$r->memo;
            
             //get logo,address,namaunit
            $qunit = $this->db->get_where('unit',array('idunit'=>$r->idunit));
            if($qunit->num_rows()>0)
            {
                $runit = $qunit->row();
                $dtcetak['logo'] = $runit->logo==null ? 'logo_aktiva2.png' : $runit->logo;
                $dtcetak['namaunit'] = $runit->namaunit;
                $dtcetak['alamat'] = $runit->alamat;
                $dtcetak['telp'] = $runit->telp;
                $dtcetak['fax'] = $runit->fax;
            } else {
                echo $this->db->last_query().'<hr>';
                exit;
            }
        }

        return $dtcetak;
    }

}

?>