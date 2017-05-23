<?php

class m_inventorypo extends CI_Model {

    function tableName() {
        return 'purchaseitem';
    }

    function pkField() {
        return 'idpurchase';
    }

    function searchField() {
        $field = "nametax";
        return explode(",", $field);
    }

    function selectField() {
        return "z.qty,a.subtotal,h.jumlahbeli,g.namesupplier,a.idsupplier,a.idpurchase,a.idjournal,a.nopurchase,a.shipaddress,a.date,a.freigthcost,a.tax,
a.totalamount,a.paidtoday,a.totalowed,a.memo,a.year,a.month,a.userin,a.datein,a.notes,a.paiddate,a.noinvoice,b.nameshipping,c.status,
d.namepayment,e.namaunit,f.namecurr,a.duedate,a.idunit";
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
                    from " . $this->tableName() . " z "
                . "join purchase a ON z.idpurchase = a.idpurchase
                    join shipping b ON a.idshipping = b.idshipping
                    join purchasestatus c ON a.idpurchasestatus = c.idpurchasestatus
                    join payment d ON a.idpayment = d.idpayment
                    join unit e ON a.idunit = e.idunit
                    join currency f ON a.idcurrency = f.idcurrency 
                    join supplier g ON a.idsupplier = g.idsupplier
                    join (select sum(qty) as jumlahbeli,idpurchase
                    from purchaseitem 
                    GROUP BY idpurchase) h ON a.idpurchase = h.idpurchase";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=99)
        {
            return " a.idunit = ".$this->session->userdata('idunit')."";
        } else {
            return null;
        }
        
    }

    function orderBy() {
        return " a.date";
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

    function cetak($idpurchase)
    {        
        //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE a.idpurchase=$idpurchase";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            //detail pembayaran
            $i=0;
            $total=0;

            $qitem = $this->db->get_where('purchaseitem',array('idpurchase'=>$r->idpurchase));
            // echo $this->db->last_query();
            foreach ($qitem->result() as $ritem) {
                $qaccbayar = $this->db->get_where('inventory',array('idinventory'=>$ritem->idinventory))->row();
                $detail[$i]['accname']=$qaccbayar->nameinventory;
                $detail[$i]['tax']=$ritem->ratetax;
                $detail[$i]['price']=number_format($ritem->price);
                $detail[$i]['jumlah']=number_format($ritem->total);

                if(isset($ritem->denda))
                {
                    if($ritem->denda!=0)
                    {
                        $detail[$i]['denda']['accname']='Denda '.$qaccbayar->accname;
                        $detail[$i]['denda']['jumlah']=number_format($ritem->denda);
                    } else {
                         $detail[$i]['denda']=null;
                    }
                }

                if(isset($ritem->qty))
                {
                    $detail[$i]['qty']=$ritem->qty;
                }
               
                $total+=$ritem->price;
                $i++;
            }

            $dtcetak['detail'] = $detail;
            $dtcetak['detailtotal'] = number_format($total);

             //get no/reff
            $qjurnal = $this->db->get_where('journal',array('idjournal'=>$r->idjournal));
            if($qjurnal->num_rows()>0)
            {
                $rjurnal = $qjurnal->row();
                $dtcetak['no'] = $rjurnal->nojournal;

            } else {
                echo $this->db->last_query().'<hr>';
                exit;
            }

            //SUPPLIER
            $qsupplier = $this->db->get_where('supplier',array('idsupplier'=>$r->idsupplier))->row();
            $dtcetak['namesupplier'] = $qsupplier->namesupplier;
            $dtcetak['companyaddress'] = $qsupplier->companyaddress;
            $dtcetak['telephone'] = $qsupplier->telephone;
            $dtcetak['fax'] = $qsupplier->fax;


            //get receivefrom,total,memo,tax
            $dtcetak['dp'] = $r->paidtoday;
            $dtcetak['freigthcost'] = $r->freigthcost;
            $dtcetak['receivefrom'] = $r->userin;
            $dtcetak['totaltax'] = $r->tax;
            $dtcetak['total'] = number_format($r->totalamount);
            $dtcetak['terbilang'] = terbilang($r->totalamount);
            $dtcetak['totalowed'] = $r->totalowed;
            $dtcetak['memo'] = $r->memo;
            $dtcetak['datetrans'] = $r->date;
            // $qrecmoney = $this->db->get_where('receivemoney',array('idjournal'=>$r->idjournal));
            // if($qrecmoney->num_rows()>0)
            // {
            //     $rrecmoney = $qrecmoney->row();

            //     $dtcetak['receivefrom'] = $rrecmoney->receivefrom;
            //     $dtcetak['totaltax'] = $rrecmoney->tax;
            //     $dtcetak['total'] = number_format($rrecmoney->total);
            //     $dtcetak['terbilang'] = terbilang($rrecmoney->total);
            //     $dtcetak['memo'] = $rrecmoney->memo;
            //     $dtcetak['datetrans'] = backdate2($rrecmoney->datetrans);

            $dtcetak['receivedby'] = $r->userin;
                // $qreceive = $this->db->get_where('sys_user',array('user_id'=>$rrecmoney->user_id));
                // if($qreceive->num_rows()>0)
                // {
                //     $rreceive = $qreceive->row();
                //     $dtcetak['receivedby'] = $rreceive->realname == null ? $rreceive->username : $rreceive->realname;
                // } else {
                //     echo $this->db->last_query().'<hr>';
                //     exit;
                // }

            // } else {
            //     echo $this->db->last_query().'<hr>';
            //     exit;
            // }

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