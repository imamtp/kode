<?php

class m_spendmoney extends CI_Model {

    function tableName() {
        return 'spendmoney';
    }

    function pkField() {
        return 'idspendmoney';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idspendmoney,d.filename,d.totalamount,a.idaccount,a.idjournal,a.totalpaid,a.userin,b.datein,a.subtotal,a.notrans,a.memo,a.datetrans,a.spendfrom,a.month,a.year,b.accnumber,b.accname,c.namaunit,a.idunit";
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
                . "join account b ON a.idaccount = b.idaccount and a.idunit = b.idunit
                    join unit c ON a.idunit = c.idunit
                    left join receivemoneyimport d ON a.notrans = d.notrans ";

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

    function cetak($idspendmoney){
         //generate data buat keperluan cetak
         $dtcetak = array();
         
                 $sql = $this->query();
                 $sql.= " WHERE idspendmoney=$idspendmoney";
                 // echo $sql;
                 $q = $this->db->query($sql);
                 if($q->num_rows()>0)
                 {
                     $r = $q->row();
                     //detail pembayaran
                     $i=0;
                     $total=0;
         
                     $qitem = $this->db->get_where('spendmoneyitem',array('idspendmoney'=>$r->idspendmoney));
                     // echo $this->db->last_query();
                     foreach ($qitem->result() as $ritem) {
                         $qaccbayar = $this->db->get_where('account',array('idaccount'=>$ritem->idaccount,'idunit'=>$r->idunit))->row();
                         $detail[$i]['accname']=$qaccbayar->accname;
                         $detail[$i]['accnumber']=$qaccbayar->accnumber;
                         $detail[$i]['tax']=$ritem->ratetax;
                         $detail[$i]['jumlah']=number_format($ritem->amount);
                        //  if($ritem->denda!=0)
                        //  {
                        //      $detail[$i]['denda']['accname']='Denda '.$qaccbayar->accname;
                        //      $detail[$i]['denda']['jumlah']=number_format($ritem->denda);
                        //  } else {
                              $detail[$i]['denda']=null;
                        //  }
                        
                         $total+=$ritem->amount;
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
                        //  echo $this->db->last_query().'<hr>';
                        //  exit;
                        $dtcetak['no'] = null;
                     }
         
                     //get receivefrom,total,memo,tax
                     $qrecmoney = $this->db->get_where('spendmoney',array('idjournal'=>$r->idjournal));
                     if($qrecmoney->num_rows()>0)
                     {
                         $rrecmoney = $qrecmoney->row();
                         
                         $qaccbayar = $this->db->get_where('account',array('idaccount'=>$rrecmoney->idaccount,'idunit'=>$rrecmoney->idunit))->row();
                         $dtcetak['accname']=$qaccbayar->accname;
                         $dtcetak['accnumber']=$qaccbayar->accnumber;

                         $dtcetak['receivefrom'] = $rrecmoney->spendfrom;
                         $dtcetak['totaltax'] = $rrecmoney->tax;
                         $dtcetak['total'] = number_format($rrecmoney->total);
                         $dtcetak['terbilang'] = terbilang(str_replace(',','',$dtcetak['detailtotal']));
                         $dtcetak['memo'] = $rrecmoney->memo;
                         $dtcetak['datetrans'] = backdate2($rrecmoney->datetrans);
        //  print_r($dtcetak); die;
                         $qreceive = $this->db->get_where('sys_user',array('username'=>$rrecmoney->userin));
                         if($qreceive->num_rows()>0)
                         {
                             $rreceive = $qreceive->row();
                             $dtcetak['receivedby'] = $rreceive->username == '' ? $rreceive->username : $rreceive->username;
                         } else {
                             echo $this->db->last_query().'<hr>';
                             exit;
                         }
         
                     } else {
                         echo $this->db->last_query().'<hr>';
                         exit;
                     }
         
                     //get logo,address,namaunit
                     $qunit = $this->db->get_where('unit',array('idunit'=>$r->idunit));
                     if($qunit->num_rows()>0)
                     {
                         $runit = $qunit->row();
                         $dtcetak['logo'] = $runit->logo==null ? 'logo_aktiva2.png' : $runit->logo;
                         $dtcetak['namaunit'] = $runit->namaunit;
                         $dtcetak['alamat'] = $runit->alamat;
                     } else {
                         echo $this->db->last_query().'<hr>';
                         exit;
                     }
                 }
                 return $dtcetak;
    }


}

?>