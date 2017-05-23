<?php

class m_historypembayaransiswa extends CI_Model {

    function tableName() {
        return 'siswapembayaran';
    }

    function pkField() {
        return 'idsiswapembayaran';
    }

    function searchField() {
        $field = "accname";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idsiswapembayaran,a.idaccountbayar,a.idjournal,a.idsiswa,a.tglbayar,a.bulanpembayaran,a.tahunpembayaran,a.bulantahunpembayaran,a.bulanbayar,a.tahunbayar,a.jumlah,a.userin,a.denda,a.datein,
b.accname,b.accnumber";
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
                . "join siswa c ON a.idsiswa = c.idsiswa
                   join account b ON a.idaccountbayar = b.idaccount and b.idunit = c.idunit";

        return $query;
    }

    function whereQuery() {
        // $wer = " debit=0";
        $wer=null;
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
                    'datemod' => date('Y-m-d H:m:s')
                );
            $this->db->insert('siswapembayaran',$data);
        }
 
    }

    function cetak($idsiswapembayaran)
    {        
        //generate data buat keperluan cetak
        $dtcetak = array();

        $sql = $this->query();
        $sql.= " WHERE idsiswapembayaran=$idsiswapembayaran";
        // echo $sql;
        $q = $this->db->query($sql);
        if($q->num_rows()>0)
        {
            $r = $q->row();

            if($r->denda!=null)
            {
                //buat detail
                $qaccbayar = $this->db->get_where('account',array('idaccount'=>$r->idaccountbayar))->row();
                $detail[0]['accname']=$qaccbayar->accname;
                $detail[0]['jumlah']=number_format($r->jumlah);
                $detail[1]['accname']='Denda';
                $detail[1]['jumlah']=number_format($r->denda);
                $total=number_format($r->denda+$r->jumlah);
            } else {
                $detail = null;
                $total=null;
            }

            $dtcetak['detail'] = $detail;
            $dtcetak['detailtotal'] = $total;
// print_r($dtcetak['detail']);
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

            //get receivefrom,total,memo
            $qrecmoney = $this->db->get_where('receivemoney',array('idjournal'=>$r->idjournal));
            if($qrecmoney->num_rows()>0)
            {
                $rrecmoney = $qrecmoney->row();

                $dtcetak['receivefrom'] = $rrecmoney->receivefrom;
                $dtcetak['total'] = number_format($r->denda+$r->jumlah);
                $dtcetak['terbilang'] = terbilang($r->denda+$r->jumlah);
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

            $qsiswa = $this->db->get_where('siswa',array('idsiswa'=>$r->idsiswa));
            if($qsiswa->num_rows()>0)
            {
                $rsiswa = $qsiswa->row();

                //get logo,address,namaunit
                $qunit = $this->db->get_where('unit',array('idunit'=>$rsiswa->idunit));
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


            } else {
                echo $this->db->last_query().'<hr>';
                exit;
            }
        } else {
            echo $this->db->last_query().'<hr>';
            exit;
        }

        // print_r($dtcetak);
        return $dtcetak;
    }

}

?>