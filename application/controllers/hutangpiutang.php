<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class hutangpiutang extends MY_Controller {

    public function index() {
        
    }

    function deletePiutang()
    {
        $retAkses = $this->cekAksesUser(74,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

    	$records = json_decode($this->input->post('postdata'));
        foreach ($records as $id) {
        	$q = $this->db->get_where('registrasipiutang',array('idregistrasipiutang'=>$id))->row();
        	$sisapiutang = $q->sisapiutang;

        	$qacc = $this->db->get_where('account',array('idaccount'=>$q->idaccountlink))->row();

        	$this->db->where('idaccount',$q->idaccountlink);
        	$this->db->update('account',array('balance'=>$qacc->balance-$sisapiutang));


        	$this->db->where('idregistrasipiutang',$id);
        	$this->db->delete('registrasipiutang');
        }
    }

    function terimapiutang()
    {
//         idunit:2
// idregistrasipiutang:18
// accname:Piutang SPP
// accnamelink:SPP
// tglpiutang:2014-10-02
// description:-
// jumlah:2.000.000
// sisapiutang:1.000.000
// penerimaanpiutang:1.000.000
        $this->db->trans_start();

        $tglpenerimaan = $this->input->post('tglpenerimaan');
        $tglpenerimaanArr = explode("-", $tglpenerimaan);
        $penerimaan = str_replace(".", "", $this->input->post('penerimaanpiutang'));
        $sisapiutang = str_replace(".", "", $this->input->post('sisapiutang'))-$penerimaan;
        $idregistrasipiutang = $this->input->post('idregistrasipiutang');
        $idunit = $this->input->post('idunit');
        $datein = date('Y-m-d H:m:s');
        $jumlah = str_replace(".", "", $this->input->post('jumlah'));
        $idaccountkas= $this->input->post('idaccountkas');

        // $d = array(
        //     "idregistrasipiutang" => $idregistrasipiutang,
        //     "month" => $tglpenerimaanArr[1],
        //     "year" => $tglpenerimaanArr[0],
        //     "penerimaan"  => $penerimaan,
        //     "tglpenerimaan"=>$tglpenerimaan,
        //     "jumlah" => $jumlah,
        //     "sisapiutang"  => $sisapiutang,
        //     "idunit"  => $idunit,
        //     "datein" => $datein,
        //     "userin" => $this->session->userdata('userid')
        // );

        // $this->db->insert('piutangpayhistory',$d);
         // $tgl = explode("-", $tanggal);
       

        $qpiutang = $this->db->get_where('registrasipiutang',array('idregistrasipiutang'=>$idregistrasipiutang))->row();

        //kurangin akun piutang di account
        // $curBalance = $this->m_account->getCurrBalance($qpiutang->idaccount, $idunit);
        // $newBalance = $curBalance - $penerimaan;
        // $this->m_account->saveNewBalance($qpiutang->idaccount, $newBalance, $idunit);

        
        // $this->db->where('idregistrasipiutang',$idregistrasipiutang);
        // $this->db->update('registrasipiutang',array('sisapiutang'=>$sisapiutang));

        $qacc = $this->db->get_where('account',array('idaccount'=>$qpiutang->idaccount,'idunit'=>$idunit))->row();

        $memo = "Penerimaan ".$qacc->accname.' '.$qacc->accnumber;

        //buat jurnal penerimaan piutang
        //kas (d) piutang (k)
        $this->load->model('m_journal');
        $idjournal = $this->m_journal->savePenerimaanPiutang($idunit,$tglpenerimaan,$penerimaan,$memo,$qpiutang->idaccount,$idaccountkas);

         $d = array(
                "idregistrasipiutang" => $idregistrasipiutang,
                "month" => $tglpenerimaanArr[1],
                "year" => $tglpenerimaanArr[0],
                "tanggal" => $tglpenerimaan,
                "diterima" => $penerimaan,
                "sisa" =>$sisapiutang,
                "idjournal" => $idjournal,
                // "source" =>,
                "userin" => $this->session->userdata('username'),
                "datein" => date('Y-m-d H:m:s')
        );
        $this->db->insert('piutanghistory',$d);

        //update data registrasipiutang
        // $this->db->where(array('idregistrasipiutang'=>$idregistrasipiutang,'idunit'=>$idunit));
        // $this->db->update('piutangpayhistory',array('idjournal'=>$idjournal,'sisapiutang'=>$sisapiutang));

        $this->db->where(array('idregistrasipiutang'=>$idregistrasipiutang,'idunit'=>$idunit));
        $this->db->update('registrasipiutang',array('idjournal'=>$idjournal,'sisapiutang'=>$sisapiutang));


        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' => 'Penerimaan Piutang Gagal'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Penerimaan Piutang Berhasil'));
        }
    }

    function deleteRegHutang()
    {
        $retAkses = $this->cekAksesUser(77,'delete');
        // echo $this->db->last_query();
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        $this->db->trans_begin();

        $records = json_decode($this->input->post('postdata'));

        foreach ($records as $id) {
            $qpiutang = $this->db->get_where('registrasihutang',array('idregistrasihutang'=>$id))->row();
// echo $this->db->last_query();
            $qacc = $this->db->get_where('account',array('idaccount'=>$qpiutang->idacchutang))->row();
            $newsaldo = $qacc->balance - $qpiutang->sisahutang;

            $this->db->where('idaccount',$qpiutang->idacchutang);
            $this->db->update('account',array('balance'=>$newsaldo));

            $qacc = $this->db->get_where('account',array('idaccount'=>$qpiutang->idacckenahutang))->row();
            $newsaldo = $qacc->balance - $qpiutang->sisahutang;

            $this->db->where('idaccount',$qpiutang->idacckenahutang);
            $this->db->update('account',array('balance'=>$newsaldo));

            $this->db->where('idregistrasihutang',$id);
            $this->db->delete('registrasihutang');            

            $this->db->where('idjournal',$qpiutang->idjournal);
            $this->db->delete('journalitem');

            $this->db->where('idjournal',$qpiutang->idjournal);
            $this->db->delete('journal');
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Hutang gagal dihapus');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Hutang sukses dihapus');
        }

        echo json_encode($json);        
    }

    function bayarHutang()
    {
        $this->db->trans_begin();

        $idunit = $this->input->post('idunit');
        $idregistrasihutang = $this->input->post('idregistrasihutang');
        // acckenahutang:Pembelian Inventaris & Kendaraan
        // acchutang:Hutang Usaha
        // 'mulaihutang':2015-03-05
        // 'jatuhtempo':2015-04-11
        $memo= 'Pembaran Hutang ';
        $jumlah = str_replace(".", "", $this->input->post('jumlah'));
        $sisahutang = str_replace(".", "", $this->input->post('sisahutang'));
        $pembayaranhutang = str_replace(".", "", $this->input->post('pembayaranhutang'));
        $tglpembayaran = $this->input->post('tglpembayaran');
        // 'accnamekas':Bank BCA
        $idaccountkas = $this->input->post('idaccountkas');

        $sisa = $sisahutang-$pembayaranhutang;
        $this->db->where('idregistrasihutang',$idregistrasihutang);
        $this->db->update('registrasihutang',array('sisahutang'=>$sisa));

        $qhutang = $this->db->get_where('registrasihutang',array('idregistrasihutang'=>$idregistrasihutang))->row();
        $idacchutang = $qhutang->idacchutang;

        //bikin journal
        $idjournal = $this->m_journal->savePembayaranHutang($tglpembayaran,$pembayaranhutang,$idunit,$memo,$idaccountkas,$idacchutang);

        ///disburrsment
        $d = array(
                // "idpurchase" int8,
                "idaccount" =>$idaccountkas,
                "idjournal" => $idjournal,
                "datepay" => $tglpembayaran,
                // "nocheque" varchar(50),
                "memo" => $memo,
                "totalowed" => $jumlah,
                // "totalpaid" float8,
                "balance" => $sisa,
                "payee" => $pembayaranhutang,
                // "display" int4,
                "userin" => $this->session->userdata('username'),
                // "usermod" varchar(20),
                "datein" => date('Y-m-d H:m:s'),
                // "datemod" timestamp(6),
                "idregistrasihutang" => $idregistrasihutang
            );
        $this->db->insert('disbursment',$d);

        //update accountlog: hutang(kredit) dikurangin. kas dikredit
        // $arrWer = array(
        //         'idjournal'=>$qhutang->idjournal,
        //         'idaccount'=>$idacchutang
        //     );
        // $qal = $this->db->get_where('accountlog',$arrWer);

        // $this->db->where($arrWer);
        // $this->db->update('accountlog',array('credit'=>$qal->credit->$pembayaranhutang));

        // $this->m_account->updatelog($qhutang->idjournal,$pembayaranhutang,'minus');

        //update account
            

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Pembayaran Hutang Gagal Diproses');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Pembayaran Hutang Sukses Diproses');
        }

        echo json_encode($json);  
    }


}
?>