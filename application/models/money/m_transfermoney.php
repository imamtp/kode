<?php

class m_transfermoney extends CI_Model {

    function tableName() {
        return 'transferkas';
    }

    function pkField() {
        return 'idtransferkas';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "idtransferkas,a.idunit,a.memo,a.tanggal,a.nominal,a.datein,b.accname as accsumber,c.accname as acctujuan";
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
                . "join account b ON a.idaccountsumber = b.idaccount and a.idunit = b.idunit
join account c ON a.idaccounttujuan = c.idaccount and a.idunit = c.idunit ";

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

    function save_pembayaransiswa($idjournal,$tanggalReceive,$dataGrid)
    {
        // 2014-10-25
        $arrtgl = explode("-", $tanggalReceive);
        foreach ($dataGrid as $key => $value) {

            $arr = explode(" ",$value->tglbayar);
            $month = getNoMonth($arr[0]);
            $year = $arr[1];

            $data = array(
                    'idsiswa'=> $value->idsiswa,
                    'idaccountbayar'=> $value->idaccount,
                    'idjournal'=> $idjournal,
                    'tglbayar'=> $tanggalReceive,
                    'bulanpembayaran'=> $month,
                    'tahunpembayaran'=> $year,
                    'bulantahunpembayaran'=> $value->tglbayar,
                    'haribayar'=> $arrtgl[2],
                    'bulanbayar'=> $arrtgl[1],
                    'tahunbayar'=> $arrtgl[0],
                    'jumlah'=> $value->amount,
                    'userin' => $this->session->userdata('username'),
                    'usermod' => $this->session->userdata('username'),
                    'datein' => date('Y-m-d H:m:s'),
                    'datemod' => date('Y-m-d H:m:s'),
                    'denda'=> $value->denda,
                    // 'receivefrom'=>,
                    'iduser'=>$this->session->userdata('userid')
                );
            $this->db->insert('siswapembayaran',$data);
        }
 
    }

    function cetak($idreceivemoney)
    {        
        //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE idreceivemoney=$idreceivemoney";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();
            //detail pembayaran
            $i=0;
            $total=0;

            $qitem = $this->db->get_where('receivemoneyitem',array('idreceivemoney'=>$r->idreceivemoney));
            // echo $this->db->last_query();
            foreach ($qitem->result() as $ritem) {
                $qaccbayar = $this->db->get_where('account',array('idaccount'=>$ritem->idaccount))->row();
                $detail[$i]['accname']=$qaccbayar->accname;
                $detail[$i]['tax']=$ritem->ratetax;
                $detail[$i]['jumlah']=number_format($ritem->amount-$ritem->denda);
                if($ritem->denda!=0)
                {
                    $detail[$i]['denda']['accname']='Denda '.$qaccbayar->accname;
                    $detail[$i]['denda']['jumlah']=number_format($ritem->denda);
                } else {
                     $detail[$i]['denda']=null;
                }
               
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
                echo $this->db->last_query().'<hr>';
                exit;
            }

            //get receivefrom,total,memo,tax
            $qrecmoney = $this->db->get_where('receivemoney',array('idjournal'=>$r->idjournal));
            if($qrecmoney->num_rows()>0)
            {
                $rrecmoney = $qrecmoney->row();

                $dtcetak['receivefrom'] = $rrecmoney->receivefrom;
                $dtcetak['totaltax'] = $rrecmoney->tax;
                $dtcetak['total'] = number_format($rrecmoney->total);
                $dtcetak['terbilang'] = terbilang($rrecmoney->total);
                $dtcetak['memo'] = $rrecmoney->memo;
                $dtcetak['datetrans'] = backdate2($rrecmoney->datetrans);

                $qreceive = $this->db->get_where('sys_user',array('user_id'=>$rrecmoney->user_id));
                if($qreceive->num_rows()>0)
                {
                    $rreceive = $qreceive->row();
                    $dtcetak['receivedby'] = $rreceive->realname == null ? $rreceive->username : $rreceive->realname;
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