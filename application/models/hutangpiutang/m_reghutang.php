<?php

class m_reghutang extends CI_Model {

    function tableName() {
        return 'registrasihutang';
    }

    function pkField() {
        return 'idregistrasihutang';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idacchutang,a.idacckenahutang,a.idsupplier,e.namesupplier,a.idregistrasihutang,a.idunit,a.jumlah,a.sisahutang,a.idjournal,a.memo,a.userin,a.datein,a.month,a.year,c.accname as acchutang,d.accname as acckenahutang,b.namaunit,mulaihutang,jatuhtempo";
    }
     function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'idregistrasipiutang'=>'idregistrasipiutang'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join unit b ON a.idunit = b.idunit
                    join account c ON a.idacchutang = c.idaccount and a.idunit = c.idunit
                    left join account d ON a.idacckenahutang = d.idaccount and a.idunit = d.idunit
                    left join supplier e ON a.idsupplier = e.idsupplier";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "idregistrasihutang";
    }

    function updateField() {
        $idregistrasihutang = $this->input->post('idregistrasihutang') == '' ? $this->m_data->getSeqVal('seq_registrasihutang') : $this->input->post('idregistrasihutang');
        $jumlah = str_replace(".", "", $this->input->post('jumlah'));
        $idunit = $this->input->post('idunit');
        if($this->input->post('idregistrasihutang') == '')
        {
            //baru 
            $sisahutang = $jumlah;
        } else {
            //edit
            // $q = $this->db->get_where('registrasihutang',array('idregistrasihutang'=>$this->input->post('idregistrasihutang')))->row();
            // $sisahutang = $q->sisahutang;

                $q = $this->db->get_where('registrasihutang',array('idregistrasihutang'=>$this->input->post('idregistrasihutang')))->row();
                $jumlahSekarang = $q->jumlah;
                $jumlahBaru = str_replace(".", "", $jumlah);
                $idjournal = $q->idjournal;

                // $qjournal = $this->db->get_where('journalitem',array('idjournal'=>$idjournal))->row();
                $acchutang = $this->db->get_where('account',array('idaccount'=>$q->idacchutang,'idunit'=>$idunit))->row();
                // echo $this->db->last_query();
                $acckenahutang = $this->db->get_where('account',array('idaccount'=>$q->idacckenahutang,'idunit'=>$idunit))->row();

                // echo $jumlahBaru."-".$jumlahSekarang;
                $this->load->model('account/m_account');
                if($jumlahSekarang!=$jumlahBaru)
                {
                    if($jumlahSekarang<$jumlahBaru)
                    {
                        //ditambah
                        $selisih = $jumlahBaru-$jumlahSekarang;

                        //ditambah sisah hutangnya
                        $sisahutang = $q->sisahutang+$selisih;

                        $balancehutang = $acchutang->balance+$selisih;
                        $balancekenahutang = $acckenahutang->balance+$selisih;

                        $this->m_account->updatelog($idjournal,$selisih,'plus');
                    } else {
                        //dikurangin
                        $selisih = $jumlahSekarang-$jumlahBaru;

                        //dikurangin sisa hutangnya
                        // echo $q->sisahutang."-".$selisih;
                        $sisahutang = $q->sisahutang-$selisih;
                        // echo 'acchutang:'.$acchutang->balance;
                        // echo 'acckenahutang:'.$acckenahutang->balance;

                        $balancehutang = $acchutang->balance-$selisih;
                        $balancekenahutang = $acckenahutang->balance-$selisih;

                        $this->m_account->updatelog($idjournal,$selisih,'minus');
                    }

                    //kena hutang (debit)
                    $this->db->where(array('idjournal'=>$idjournal,'credit'=>0));
                    $this->db->update('journalitem',array('debit'=>$jumlahBaru));

                    //akun hutang (kredit)
                    $this->db->where(array('idjournal'=>$idjournal,'debit'=>0));
                    $this->db->update('journalitem',array('credit'=>$jumlahBaru));

                    // $this->db->where('idregistrasihutang',$this->input->post('idregistrasihutang'));
                    // $this->db->update('registrasihutang',array('jumlah'=>$jumlahBaru,'sisahutang'=>$sisahutang));
                    //$this->db->query("UPDATE registrasihutang SET jumlah = 3000000, sisahutang = 3000000 WHERE idregistrasihutang =  11");
                    // echo $this->db->last_query();

                    $this->db->where(array('idjournal'=>$idjournal));
                    $this->db->update('journal',array('totaldebit'=>$jumlahBaru,'totalcredit'=>$jumlahBaru));

                    //update saldo akun
                    $this->db->where('idaccount',$q->idacchutang);
                    $this->db->where('idunit',$idunit);
                    $this->db->update('account',array('balance'=>$balancehutang));
                    // echo $this->db->last_query();

                    $this->db->where('idaccount',$q->idacckenahutang);
                    $this->db->where('idunit',$idunit);
                    $this->db->update('account',array('balance'=>$balancekenahutang,'idunit'=>$idunit));
                    // echo $this->db->last_query();

                } else {
                    //kalo jumlahnya sama gak usah diupdate
                    $sisahutang = $q->sisahutang;
                }
        }
        $data = array(
            'idregistrasihutang' => $idregistrasihutang,
            'idacchutang' => $this->input->post('idacchutang'),
            'idacckenahutang' => $this->input->post('idacckenahutang'),
            'jumlah' => $jumlah,
            'sisahutang' => $sisahutang,
            'memo' => $this->input->post('memo'),
            'idsupplier' => $this->input->post('idsupplier'),
            // 'bulan' => ambilNoBulan($this->input->post('namabulan')),
            // 'tahun' => $this->input->post('tahun'),
            // 'description' => $this->input->post('description'),
            'mulaihutang' => backdate2($this->input->post('mulaihutang')),
            'jatuhtempo' => backdate2($this->input->post('jatuhtempo')),
            'idunit' => $this->input->post('idunit')
        );
        return $data;
    }

    function journal()
    {
        return array(
                'debit'=>'idacchutang',
                'credit'=>'idacckenahutang',
                'amount'=>'jumlah'
            );
    }

}

?>