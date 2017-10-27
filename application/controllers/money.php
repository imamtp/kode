<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class money extends MY_Controller {

    public function index() {
        
    }

    function recordReceiveSiswa() {
        $this->db->trans_begin();

        $idaccountReceive = $this->input->post('idaccount');
        $notransReceive = $this->input->post('notrans');
        $receiveFrom = $this->input->post('receiveFrom');
        $tanggalReceive = str_replace("T00:00:00", "", $this->input->post('tanggal'));
        $memoReceive = $this->input->post('memo');
        $totalReceive = clearnumberic($this->input->post('total'));
        $taxReceive = 0;
        $subtotalReceive = clearnumberic($this->input->post('total'));
        $idunitReceive = $this->input->post('idunit');
        $dataGrid = json_decode($this->input->post('dataGrid'));

        /*
         * buat jurnal 
         * akun penerimaan kas (debet)   
         */
        $idjournal = $this->m_journal->saveReceiveMoneySiswa($idunitReceive, $idaccountReceive, $dataGrid, $memoReceive, $notransReceive, $tanggalReceive, $totalReceive);



        $seq = $this->db->query("select nextval('seq_receivemoney') as id")->row();

        $data = array(
            'idreceivemoney' => $seq->id,
            'idjournal' => $idjournal,
            'tax' => $taxReceive,
            'depositaccount' => $idaccountReceive,
            //            payorid bigint,
            'notrans' => $notransReceive,
            'datetrans' => $tanggalReceive,
            'total' => $totalReceive,
            //            'balance' double precision,
            'memo' => $memoReceive,
            //            display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'receivefrom' => $receiveFrom,
            'idunit' => $idunitReceive,
            'subtotal' => $subtotalReceive
        );
        $this->db->insert('receivemoney', $data);

        $tanggalReceiveArr = explode('-', $tanggalReceive);

        foreach ($dataGrid as $key => $value) {
            $dataitem = array(
                'idaccount' => $value->idaccount,
                'idreceivemoney' => $seq->id,
                'amount' => $value->amount,
                'ratetax' => null,
            );
            $this->db->insert('receivemoneyitem', $dataitem);

            //cek link piutang. kalo ada kurangi piutang sesuai dengan akun pembayaran/penerimaan
            $qlp = $this->db->get_where('linkpiutang',array('idaccount'=>$value->idaccount,'idunit'=>$idunitReceive));
            if($qlp->num_rows()>0)
            {
                $r = $qlp->row();
                $idaccountpiutang = $r->idaccountpiutang;

                $qrp = $this->db->get_where('registrasipiutang',array('idaccount'=>$idaccountpiutang,'idunit'=>$idunitReceive,'tahun'=>$tanggalReceiveArr[0],'autodecrease'=>1));
                if($qrp->num_rows()>0)
                {
                    $rp = $qrp->row();
                    $sisapiutang = $rp->sisapiutang;
                    $sisapiutangBaru = $sisapiutang-$value->amount;

                    $this->db->where(array('idaccount'=>$idaccountpiutang,'idunit'=>$idunitReceive,'tahun'=>$tanggalReceiveArr[0]));
                    $this->db->update('registrasipiutang',array('sisapiutang'=>$sisapiutangBaru));
                }
            }
        }



        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Input penerimaan siswa gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Input penerimaan siswa berhasil');
        }

        echo json_encode($json);
    }

    function recordReceive($tipe=null) {

        if($tipe=='siswa')
        {
            $retAkses = $this->cekAksesUser(71,'add');
        } else {
            $retAkses = $this->cekAksesUser(58,'add');
        }
        
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        $status = $this->input->post('status');

        $this->db->trans_begin();

        $idaccountReceive = $this->input->post('idaccountReceive');
        $notransReceive = $this->input->post('notransReceive');
        $receiveFrom = $this->input->post('receiveFrom');
        $tanggalReceive = str_replace("T00:00:00", "", $this->input->post('tanggalReceive'));
        $tglArr = explode("-", $tanggalReceive);
        $memoReceive = $this->input->post('memoReceive');
        $totalReceive = clearnumberic($this->input->post('totalReceive'));
        $taxReceive = $this->input->post('taxReceive')=='' ? 0 : clearnumberic($this->input->post('taxReceive'));
        $subtotalReceive = $this->input->post('subtotalReceive')=='' ? $totalReceive : clearnumberic($this->input->post('subtotalReceive'));
        $idunitReceive = $this->input->post('idunitReceive');
        $dataGrid = json_decode($this->input->post('dataGrid'));

        if($taxReceive!=0 && $taxReceive!='' && $taxReceive!='0.00'){
            $this->m_data->getIdAccount(34, $idunitReceive);
        }
        

        $seq = $this->db->query("select nextval('seq_receivemoney') as id")->row();

         $data = array(
            'idreceivemoney' => $seq->id,
            // 'idjournal' => $idjournal,
            'tax' => $taxReceive,
            'depositaccount' => $idaccountReceive,
            //            payorid bigint,
            'notrans' => $notransReceive,
            'datetrans' => $tanggalReceive,
            'total' => $totalReceive,
            //            'balance' double precision,
            'memo' => $memoReceive,
            //            display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'receivefrom' => $receiveFrom,
            'idunit' => $idunitReceive,
            'subtotal' => $subtotalReceive,
            'user_id'=>$this->session->userdata('userid'),
            'status'=>$status
        );
        $this->db->insert('receivemoney', $data);

        //cek dan kalkulasi piutang jika ada
        $tanggalReceiveArr = explode('-', $tanggalReceive);

        $i = 0;

        $arrPembayaran = array();
        $jumlahPenguranganPiutang=0;
        foreach ($dataGrid as $key => $value) {
            $dataitem = array(
                'idaccount' => $value->idaccount,
                'idreceivemoney' => $seq->id,
                'amount' => isset($value->denda) ? $value->amount+$value->denda : $value->amount,
                'denda' => isset($value->denda) ? $value->denda : 0,
                'ratetax' => isset($value->ratetax) ? $value->ratetax : 0,
            );
            $this->db->insert('receivemoneyitem', $dataitem);

            //cek link piutang. kalo ada kurangi piutang sesuai dengan akun pembayaran/pendapatan
            // $sql = "SELECT a.idregistrasipiutang,a.idaccount,a.bulan,a.tahun,a.idunit,a.sisapiutang,a.jumlah,a.idaccountlink
            //         from registrasipiutang a
            //         where a.idunit=$idunitReceive and a.idaccountlink=$value->idaccount and tglpiutang<='$tanggalReceive' and autodecrease=1";
            //         // echo $sql;
            // $qlp = $this->db->query($sql);
            
            // if($qlp->num_rows()>0)
            // {
            //     $r = $qlp->row();

            //     if($r->sisapiutang>0)
            //     {
            //         $idaccountpiutang = $r->idaccount;

            //         $sisapiutang = $r->sisapiutang;
            //         $sisapiutangBaru = $sisapiutang-$value->amount;
            //         $this->db->where('idregistrasipiutang',$r->idregistrasipiutang);
            //         $this->db->update('registrasipiutang',array('sisapiutang'=>$sisapiutangBaru));

            //         $dpiutanghistory = array(
            //                 "idregistrasipiutang" => $r->idregistrasipiutang,
            //                 "month" => $tglArr[1],
            //                 "year" => $tglArr[0],
            //                 "tanggal" => $tanggalReceive,
            //                 "diterima" => $value->amount,
            //                 "sisa" =>$sisapiutangBaru,
            //                 "idreceivemoney"=>$seq->id,
            //                 // "idjournal" => $idjournal,
            //                 // "source" =>,
            //                 "userin" => $this->session->userdata('username'),
            //                 "datein" => date('Y-m-d H:m:s')
            //         );
            //         $this->db->insert('piutanghistory',$dpiutanghistory);

            //        $jumlahPenguranganPiutang+=$value->amount;
            //        $arrPembayaran[$i] = array(
            //             'idaccount'=>$value->idaccount,
            //             'amount'=>$value->amount
            //         );
            //        $i++;
            //    }
            // }
        }

        // if($jumlahPenguranganPiutang!=0)
        // {
            // echo 'jumlahPenguranganPiutang:';
            //buat jurnal pengurangan piutang
            // $idjournal = $this->m_journal->saveReceiveMoneyPengurangPiutang($idunitReceive,$idaccountpiutang,$arrPembayaran,$tanggalReceive,$memoReceive,$idaccountReceive);
        // } else {
            //tidak ada piutang
        /*
         * buat jurnal 
         * akun penerimaan kas (debet)   
         */
        // echo 'saveReceiveMoney:';

        if($status==2){
            //confirmed
             $idjournal = $this->m_journal->saveReceiveMoney($idunitReceive, $idaccountReceive, $dataGrid, $memoReceive, $notransReceive, $tanggalReceive, $totalReceive,$taxReceive);

             if($tipe=='siswa')
            {
                //simpan data pembayaran dari siswa
                $this->load->model('money/m_receivemoney');
                $this->m_receivemoney->save_pembayaransiswa($idjournal,$tanggalReceive,$dataGrid);
            }

            //update idjournal
            $this->db->where('idreceivemoney',$seq->id);
            $this->db->update('receivemoney',array('idjournal'=>$idjournal));
        }
               
        // }

        

        // echo 'aaaaaaaaaaa';
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Input penerimaan gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Input penerimaan berhasil','id'=>$seq->id);
        }

        echo json_encode($json);
    }

    function confirmSpend(){
         $this->db->trans_begin();
         $status = 2;

         if($status==2){

            $records = json_decode($this->input->post('postdata'));
            foreach ($records as $idspendmoney) {

                $q = $this->db->get_where('spendmoney',array('idspendmoney'=>$idspendmoney))->row();



                $qitem = $this->db->query("select idaccount,amount,ratetax
                                            from spendmoneyitem
                                            where idspendmoney = ".$idspendmoney." ")->result();

                 //confirmed
                $idjournal = $this->m_journal->saveSpendMoney($q->idunit, $q->idaccount, $qitem, $q->memo, $q->notrans, $q->datetrans, $q->totalpaid,$q->tax);
                // $idjournal = $this->m_journal->saveReceiveMoney($q->idunit, $q->depositaccount, $qitem, $q->memo, $q->notrans, $q->datetrans, $q->total,$q->tax);

                //update idjournal
                $this->db->where('idspendmoney',$idspendmoney);
                $this->db->update('spendmoney',array('idjournal'=>$idjournal,'status'=>2));
            }
            
        }

          if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'konfirmasi data gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'konfirmasi data berhasil');
        }

        echo json_encode($json);
    }

    function confirmReceive(){
         $this->db->trans_begin();
         $status = 2;

         if($status==2){

            $records = json_decode($this->input->post('postdata'));
            foreach ($records as $idreceivemoney) {

                $q = $this->db->get_where('receivemoney',array('idreceivemoney'=>$idreceivemoney))->row();



                $qitem = $this->db->query("select idaccount,amount,denda
                                            from receivemoneyitem
                                            where idreceivemoney = ".$idreceivemoney." ")->result();

                 //confirmed
                $idjournal = $this->m_journal->saveReceiveMoney($q->idunit, $q->depositaccount, $qitem, $q->memo, $q->notrans, $q->datetrans, $q->total,$q->tax);

                //  if($tipe=='siswa')
                // {
                //     //simpan data pembayaran dari siswa
                //     $this->load->model('money/m_receivemoney');
                //     $this->m_receivemoney->save_pembayaransiswa($idjournal,$q->datetrans,$qitem);
                // }


                //update idjournal
                $this->db->where('idreceivemoney',$idreceivemoney);
                $this->db->update('receivemoney',array('idjournal'=>$idjournal,'status'=>2));
            }
            
        }

          if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'konfirmasi data gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'konfirmasi data berhasil');
        }

        echo json_encode($json);
    }

    function recordSpend() {

        $retAkses = $this->cekAksesUser(59,'add');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        $tgl = explode("-", date('Y-m-d'));

        $this->db->trans_begin();

        $idaccountSpend = $this->input->post('idaccountSpend');
        $notransSpend = $this->input->post('notransSpend');
        $SpendFrom = $this->input->post('SpendFromSpend');
        $tanggalSpend = str_replace("T00:00:00", "", $this->input->post('tanggalSpend'));
        $memoSpend = $this->input->post('memoSpend');        
        $taxSpend = clearnumberic($this->input->post('taxSpend'));
        $totalSpend = clearnumberic($this->input->post('totalSpend'));
        $subtotalSpend = clearnumberic($this->input->post('subtotalSpend'));
        $idunitSpend = $this->input->post('idunitSpend');
        $dataGrid = json_decode($this->input->post('dataGrid'));
        $status = $this->input->post('status');

        if($taxSpend!=0 && $taxSpend!='' && $taxSpend!='0.00'){
            $this->m_data->getIdAccount(35, $idunitSpend);
        }

        $seq = $this->db->query("select nextval('seq_spendmoney') as id")->row();

         if($status==2){
            //confirmed
            $idjournal = $this->m_journal->saveSpendMoney($idunitSpend, $idaccountSpend, $dataGrid, $memoSpend, $notransSpend, $tanggalSpend, $totalSpend,$taxSpend);
        } else {
            $idjournal = null;
        }

        $data = array(
            'idspendmoney' => $seq->id,
            'idjournal' => $idjournal,
            'tax' => $taxSpend,
            'idaccount' => $idaccountSpend,
            //            payorid bigint,
            'notrans' => $notransSpend,
            'datetrans' => $tanggalSpend,
            'totalpaid' => $totalSpend,
            //            'balance' double precision,
            'memo' => $memoSpend,
            //            display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'spendfrom' => $SpendFrom,
            'idunit' => $idunitSpend,
            'subtotal' => $subtotalSpend,
            'month' => $tgl[1],
            'year' => $tgl[0]
        );
        $this->db->insert('spendmoney', $data);


        foreach ($dataGrid as $key => $value) {
            $dataitem = array(
                'idaccount' => $value->idaccount,
                'idspendmoney' => $seq->id,
                'amount' => $value->amount,
                'ratetax' => $value->ratetax,
            );
            $this->db->insert('spendmoneyitem', $dataitem);
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Input pengeluaran kas gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Input pengeluaran kas berhasil');
        }

        echo json_encode($json);
    }
    
    function recordImportSpend()
    {
        $retAkses = $this->cekAksesUser(62,'add');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        $this->db->trans_begin();

        $tgl = explode("-", date('Y-m-d'));

        $idunit = $this->input->post('idunit');
        $notrans = $this->input->post('notrans');
        $tanggal = str_replace("T00:00:00", "", $this->input->post('tanggal'));
        $filename = $this->input->post('filename');
        $idaccountDeposit = $this->input->post('idaccount');
        $totalamount = clearnumberic($this->input->post('totalamount'));
        $memo = $this->input->post('memo');
        $dataGrid = json_decode($this->input->post('dataGrid'));

        $qseq = $this->db->query("select nextval('seq_receivemoneyimport') as id")->row();
        $id = $qseq->id;
        $d = array(
            'idreceivemoneyimport' => $id,
            'filename' => $this->input->post('filename'),
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'tipe'=>'Spend'
        );
        $this->db->insert('receivemoneyimport', $d);

        $idjournal = $this->m_journal->saveSpendMoney($idunit, $idaccountDeposit, $dataGrid, $memo, $notrans, $tanggal, $totalamount);

        $seq = $this->db->query("select nextval('seq_spendmoney') as id")->row();
        $idspendmoney = $seq->id;

        $data = array(
            'idimport' => $id,
            'idspendmoney' => $idspendmoney,
            'idjournal' => $idjournal,
//            'tax' => $taxReceive,
            'depositaccount' => $idaccountDeposit,
            //            payorid bigint,
            'notrans' => $notrans,
            'datetrans' => $tanggal,
            'total' => $totalamount,
            //            'balance' double precision,
            'memo' => $memo,
            //            display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
//            'receivefrom' => $receivefrom,
            'idunit' => $idunit,
            'subtotal' => $totalamount
        );
        $this->db->insert('spendmoney', $data);

        foreach ($dataGrid as $key => $value) {
            $dataitem = array(
                'idaccount' => $value->idaccount,
                'idspendmoney' => $idspendmoney,
                'amount' => $value->amount,
                'tglpenerimaan' => $value->tglpenerimaan,
                'ratetax' => 0,
            );
            $this->db->insert('spendmoneyitem', $dataitem);
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Import Pengeluaran Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Import Pengeluaran Berhasil');
        }

        echo json_encode($json);
    }

    function recordImportReceive() {
        $retAkses = $this->cekAksesUser(61,'add');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        /*
         * 1. Mencatat transaksi jurnal
         * 2. update balance akun
         */

        $this->db->trans_begin();

        $tgl = explode("-", date('Y-m-d'));

        $idunit = $this->input->post('idunit');
        $notrans = $this->input->post('notrans');
        $tanggal = str_replace("T00:00:00", "", $this->input->post('tanggal'));
//filename: Ext.getCmp('filenameImport').getValue(),
        $idaccountDeposit = $this->input->post('idaccount');
        $totalamount = clearnumberic($this->input->post('totalamount'));
        $receivefrom = $this->input->post('receivefrom');
        $memo = $this->input->post('memo');
        $dataGrid = json_decode($this->input->post('dataGrid'));

        $qseq = $this->db->query("select nextval('seq_receivemoneyimport') as id")->row();
        $idreceivemoneyimport = $qseq->id;
        $d = array(
            'idreceivemoneyimport' => $idreceivemoneyimport,
            'filename' => $this->input->post('filename'),
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'tipe'=>'Receive'
        );
        $this->db->insert('receivemoneyimport', $d);

        // $idjournal = $this->m_journal->saveReceiveMoney($idunit, $idaccountDeposit, $dataGrid, $memo, $notrans, $tanggal, $totalamount);


        $seq = $this->db->query("select nextval('seq_receivemoney') as id")->row();
        $idreceivemoney = $seq->id;

        $data = array(
            'idreceivemoneyimport' => $idreceivemoneyimport,
            'idreceivemoney' => $idreceivemoney,
            // 'idjournal' => $idjournal,
//            'tax' => $taxReceive,
            'depositaccount' => $idaccountDeposit,
            //            payorid bigint,
            'notrans' => $notrans,
            'datetrans' => $tanggal,
            'total' => $totalamount,
            //            'balance' double precision,
            'memo' => $memo,
            //            display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'receivefrom' => $receivefrom,
            'idunit' => $idunit,
            'subtotal' => $totalamount
        );
        $this->db->insert('receivemoney', $data);

        //cek dan kalkulasi piutang jika ada
        $tanggalReceiveArr = explode('-', $tanggal);

        $i = 0;

        $arrPembayaran = array();
        $jumlahPenguranganPiutang=0;
        foreach ($dataGrid as $key => $value) {
            $tglterima = explode(".", $value->tglpenerimaan);
            $dataitem = array(
                'idaccount' => $value->idaccount,
                'idreceivemoney' => $seq->id,
                'amount' => isset($value->denda) ? $value->amount+$value->denda : $value->amount,
                'denda' => isset($value->denda) ? $value->denda : 0,
                'ratetax' => isset($value->ratetax) ? $value->ratetax : 0,
                'datereceive'=>$tglterima[2].'-'.$tglterima[1].'-'.$tglterima[0]
            );
            $this->db->insert('receivemoneyitem', $dataitem);

            //cek link piutang. kalo ada kurangi piutang sesuai dengan akun pembayaran/pendapatan
            $sql = "SELECT a.idregistrasipiutang,a.idaccount,a.bulan,a.tahun,a.idunit,a.sisapiutang,a.jumlah,a.idaccountlink
                    from registrasipiutang a
                    where a.idunit=$idunit and a.idaccountlink=$value->idaccount and tglpiutang<='$tanggal' and autodecrease=1";
                    // echo $sql;
            $qlp = $this->db->query($sql);
            // $qlp = $this->db->get_where('registrasipiutang',array('idaccountlink'=>$value->idaccount,'idunit'=>$idunitReceive,'tahun'=>$tanggalReceiveArr[0]));
            if($qlp->num_rows()>0)
            {
                // echo '<br>1:'.$this->db->last_query();
                $r = $qlp->row();

                if($r->sisapiutang>0)
                {
                     
                    $idaccountpiutang = $r->idaccount;

                    $sisapiutang = $r->sisapiutang;
                    $sisapiutangBaru = $sisapiutang-$value->amount;

                    // $this->db->where(array('idaccount'=>$idaccountpiutang,'idunit'=>$idunit));
                    $this->db->where('idregistrasipiutang',$r->idregistrasipiutang);
                    $this->db->update('registrasipiutang',array('sisapiutang'=>$sisapiutangBaru));

                   $this->load->model('account/m_regpiutang');
                   $this->m_regpiutang->saveHistory($r->idregistrasipiutang,$tanggal,$value->amount,$sisapiutangBaru,null);

                   $jumlahPenguranganPiutang+=$value->amount;
                   $arrPembayaran[$i] = array(
                        'idaccount'=>$value->idaccount,
                        'amount'=>$value->amount
                    );
                   $i++;
               }
            }
        }

        if($jumlahPenguranganPiutang!=0)
        {
            // echo 'jumlahPenguranganPiutang:';
            //buat jurnal pengurangan piutang
            $idjournal = $this->m_journal->saveReceiveMoneyPengurangPiutang($idunit,$idaccountpiutang,$arrPembayaran,$tanggal,$memo,$idaccountDeposit);

           
        } else {
            //tidak ada piutang
        /*
         * buat jurnal 
         * akun penerimaan kas (debet)   
         */
        // echo 'saveReceiveMoney:';
                $idjournal = $this->m_journal->saveReceiveMoney($idunit, $idaccountDeposit, $dataGrid, $memo, $notrans, $tanggal, $totalamount);
        }

        //update idjournal
        $this->db->where('idreceivemoney',$seq->id);
        $this->db->update('receivemoney',array('idjournal'=>$idjournal));

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Import penerimaan gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Import penerimaan berhasil');
        }
        // print_r($json);
        echo json_encode($json);
    }

    function ongoingBalance() {
        $this->load->model('money/m_ongoingtrans');
        $query = "select sum(a.debit) as ongoing
                    from " . $this->m_ongoingtrans->tableName() . " a "
                . "join journal b ON a.idjournal = b.idjournal
                    join account c ON a.idaccount = c.idaccount ";

        $datestate = backdate2($this->input->post('datestate'));
        $idunit = $this->input->post('idunit');
        $idaccount = $this->input->post('idaccount');
        $stardate = date('Y-m-') . '01';
        $wer = " WHERE a.idaccount=$idaccount AND
                b.idunit = $idunit AND
                datejournal between '$stardate' and '$datestate'";
        $query.= $wer;

        $q = $this->db->query($query);
        if ($q->num_rows() > 0) {
            $r = $q->row();
            $json = array('ongoing' => $r->ongoing);
        } else {
            $json = array('ongoing' => 0);
        }
        echo json_encode($json);
    }

    function recordReconcile() {

        $retAkses = $this->cekAksesUser(60,'add');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

//idunitReconcile:2
//idaccountReconcile:674
//datestatementReconcile:2014-09-11T00:00:00
//newbalanceReconcile:200000
//accbalanceReconcile:230000
//outbalanceReconcile:0
//totalDReconcile:5,000.00
//totalCReconcile:35,000.00

        $idunitReconcile = $this->input->post('idunitReconcile');
        $idaccountReconcile = $this->input->post('idaccountReconcile'); //akun bank
        $datestatementReconcile = str_replace("T00:00:00", "", $this->input->post('datestatementReconcile'));
        $newbalanceReconcile = cleardot($this->input->post('newbalanceReconcile'));
        $accbalanceReconcile = cleardot($this->input->post('accbalanceReconcile'));
        $outbalanceReconcile = cleardot($this->input->post('outbalanceReconcile'));
        $totalDReconcile = clearnumberic($this->input->post('totalDReconcil'));
        $totalCReconcile = clearnumberic($this->input->post('totalCReconcile'));
        $dataGrid = json_decode($this->input->post('dataGrid'));

        $this->load->model('money/m_journal');

        $qseq = $this->db->query("select nextval('seq_reconcile') as id")->row();

        $drec = array(
            'idreconcile' => $qseq->id,
            'idaccount' => $idaccountReconcile,
//            idjournal bigint,
            'datestatement' => $datestatementReconcile,
            'newbalance' => $newbalanceReconcile,
//            calcbalance double precision,
            'outbalance' => $outbalanceReconcile,
            'lastdate' => date('Y-m-d'),
//            'servamount' double precision,
//            'servno' character varying(20),
//            'servdate' date,
//            'servtax' double precision,
//            'expenseaccount' bigint,
//            'servmemo' character varying(225),
//            'intamount' double precision,
//            'intno' character varying(20),
//            'intdate' date,
//            'inttax' double precision,
//            'incomeaccount' bigint,
//            'intmemo' character varying(225),
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunitReconcile,
            'accbalance' => $accbalanceReconcile
        );

        $this->db->insert('reconcile', $drec);

        $this->m_journal->saveJournalReconcile($idunitReconcile, $idaccountReconcile, $dataGrid, $qseq->id,$datestatementReconcile);
        // echo $this->db->last_query();
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Rekonsiliasi gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Rekonsiliasi berhasil');
        }

        echo json_encode($json);
    }

    function fetchXlsxReceiveSiswa() {
        $config['upload_path'] = './upload/xlsx';
        $config['allowed_types'] = 'xlsx';
        $config['max_size'] = '10000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('filexlsx')) {
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";
        } else {
            $file = $this->upload->data()['full_path'];
            $orig_name = $this->upload->data()['orig_name'];

//            $this->load->library('simplexlsx');
            require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $val = $xlsx->rows(1);

            $start = 1;

            $total = 0;
            while (isset($val[$start])) {

                $status = 1;

                $siswa = $this->db->get_where('siswa', array('noinduk' => strval($val[$start][0])));
                // echo $this->db->last_query();
                if ($siswa->num_rows() > 0) {
                    $r = $siswa->row();
                    $namasiswa = $r->namasiswa;
                    $idsiswa = $r->idsiswa;
                    $msg = 'Oke';
                } else {
                    $namasiswa = 'No Induk Siswa Salah';
                    $idsiswa = null;

                    $status = 0;
                }

                $qakun = $this->db->get_where('account', array('accnumber' => strval($val[$start][1]), 'idunit' => $this->input->post('idunit')));
                if ($qakun->num_rows() > 0) {
                    $r = $qakun->row();
                    $accname = $r->accname;
                    $idaccount = $r->idaccount;
                    $msg = 'Oke';
                } else {
                    $accname = 'No akun salah';
                    $idaccount = 0;
                    $status = 0;
                    $msg = $accname;
                }

                if(!isset($val[$start][5]) || $val[$start][5]=='')
                {
                    $denda=0;
                } else {
                    $denda=$val[$start][5];
                }

                $d[] = array(
                    'idaccount' => $idaccount,
                    'accname' => $accname,
                    'accnumber' => $val[$start][1],
                    'tglbayar' => getMonth($val[$start][3]).' '.$val[$start][4],
                    'amount' => $val[$start][2],
                    'idsiswa' => $idsiswa,
                    'namasiswa' => $namasiswa,
                    'noinduk' => $val[$start][0],
                    'denda' => $denda,
                    'status'=> $status
                );

                $total+=$val[$start][2]+$denda;

                $qakun->free_result();
                $siswa->free_result();


                $start++;
            }

            echo json_encode(array('success' => true, 'filename' => $orig_name, 'total' => number_format($total), 'data' => $d));
        }
    }

    function fetchXlsxReceive() {
        $config['upload_path'] = './upload/xlsx';
        $config['allowed_types'] = 'xlsx';
        $config['max_size'] = '10000';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('filexlsx')) {
            $error = $this->upload->display_errors();
            echo "{success:false, message:'" . $error . "'}";
        } else {
            $file = $this->upload->data()['full_path'];
            $orig_name = $this->upload->data()['orig_name'];

//            $this->load->library('simplexlsx');
            require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $val = $xlsx->rows(1);

//            echo json_encode($val);

            $start = 1;

//            print_r($val);
            $total = 0;
            while (isset($val[$start])) {

                $status = true;

                $qakun = $this->db->get_where('account', array('accnumber' => $val[$start][2], 'idunit' => $val[$start][1]));
                if ($qakun->num_rows() > 0) {
                    $r = $qakun->row();
                    $accname = $r->accname;
                    $idaccount = $r->idaccount;
                    $msg = 'Oke';
                } else {
                    $accname = 'No akun salah';
                    $idaccount = 0;
                    $status = false;
                    $msg = $accname;
                }

                $qunit = $this->db->get_where('unit', array('idunit' => $val[$start][1]));
                if ($qunit->num_rows() > 0) {
                    $r = $qunit->row();
                    $namaunit = $r->namaunit;
                    $msg = 'Oke';
                } else {
                    $namaunit = 'No unit salah';

                    if (!$status) {
                        $msg = $namaunit . ' dan ' . $accname;
                    } else {
                        $msg = $namaunit;
                    }
                    $status = false;
                }

                $d[] = array(
                    'no' => $val[$start][0],
                    'nounit' => $val[$start][1],
                    'namaunit' => $namaunit,
                    'accname' => $accname,
                    'accnumber' => $val[$start][2],
                    'amount' => $val[$start][3],
                    'tglpenerimaan'=>$val[$start][4],
                    // 'bulan' => $val[$start][4],
                    // 'tahun' => $val[$start][5],
                    'status' => $status,
                    'message' => $msg,
                    'idaccount' => $idaccount
                );

                $total+=$val[$start][3];

                $qakun->free_result();
                $qunit->free_result();


                $start++;
            }

            echo json_encode(array('success' => true, 'filename' => $orig_name, 'total' => number_format($total), 'data' => $d));
        }
    }

    function cekLinkAccReceiveSiswa()
    {
        $idunit = $this->input->get('idunit');
        $idaccount = $this->input->get('idaccount');
        $accname = $this->input->get('accname');
        $q = $this->db->get_where('linkpiutang',array('idunit'=>$idunit,'idaccount'=>$idaccount));
        if($q->num_rows()>0)
        {
            $r = $q->row();
            $qacc = $this->db->get_where('account',array('idaccount'=>$r->idaccountpiutang))->row();
            $json = array('success' => true, 'message' => 'Akun '.$accname.' terhubung dengan akun '.$qacc->accname.', maka akan secara otomatis mengurangi beban piutang yang ada.');
        } else {
            $json = array('success' => false, 'message' => null);
        }

        echo json_encode($json);
    }

    function identifyPiutangAccount($idaccount,$idunit)
    {
        $ret = false;
        $acc = $this->db->get_where('account',array('idunit'=>$idunit,'idaccounttype'=>2,'idaccount'=>$idaccount));
        if($acc->num_rows()>0)
        {
            $ret = true;
        }
        return $ret;
    }

    function cancelReceivePiutang(){
        $records = json_decode($this->input->post('postdata'));

        $this->db->trans_begin();

        $totalpiutang = 0;
        foreach ($records as $idpiutanghistory) {

            $q = $this->db->query("select idjournal,diterima,idregistrasipiutang
                    from piutanghistory
                    where idpiutanghistory = $idpiutanghistory");
            if($q->num_rows()>0){
                $r = $q->row();
                // --update saldo sisa registrasipiutang

                // select *
                // from journal
                // where idjournal = 1978

                 // --credir dan debit saldo dikurang
                $qjitem = $this->db->get_where('journalitem',array('idjournal'=>$r->idjournal));
                foreach ($qjitem->result() as $r_j_item) {
                    $accWer = array('idaccount'=>$r_j_item->idaccount,'idunit'=>$this->session->userdata('idunit'));
                    $qacc = $this->db->get_where('account',$accWer)->row();
                    $current_balance = $qacc->balance;

                    if($r_j_item->debit!=0){
                        $new_balance = $current_balance-$r_j_item->debit;
                    } else if($r_j_item->credit!=0){
                        $new_balance = $current_balance-$r_j_item->credit;
                    }

                    //update saldo baru
                    $this->db->where($accWer);
                    $this->db->update('account',array('balance'=>$new_balance));
                }

                 // --hapus journal & journalitem
                $this->db->where('idjournal',$r->idjournal);
                $this->db->delete('journalitem');     

                $this->db->where('idjournal',$r->idjournal);
                $this->db->delete('journal');  

                //tambah saldo piutang
                $accWer = array('idregistrasipiutang'=>$r->idregistrasipiutang);
                $qacc = $this->db->get_where('registrasipiutang',$accWer)->row();
                $current_balance = $qacc->sisapiutang;
                $new_balance = $qacc->sisapiutang+$r->diterima;
                // echo $qacc->sisapiutang.'+'.$r->diterima;

                $this->db->where($accWer);
                $this->db->update('registrasipiutang',array('sisapiutang'=>$new_balance));
                // echo $this->db->last_query();

                // --hapus piutanghistory
                $this->db->where('idpiutanghistory',$idpiutanghistory);
                $this->db->delete('piutanghistory');  
            }
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal menghapus data');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil menghapus data');
        }

        echo json_encode($json);
    }

    function cancelReceive($tipe=null)
    {
        if($tipe=='siswa')
        {
            $retAkses = $this->cekAksesUser(71,'delete');
        } else {
            $retAkses = $this->cekAksesUser(58,'delete');
        }
        
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

         $this->db->trans_begin();

        $records = json_decode($this->input->post('postdata'));
        $totalpiutang = 0;
        foreach ($records as $idreceivemoney) {
            $q = $this->db->get_where('receivemoney',array('idreceivemoney'=>$idreceivemoney))->row();
            $idjournal = $q->idjournal;
            $idunit = $q->idunit;

            $qacclog = $this->db->get_where('accountlog',array('idjournal'=>$idjournal));
            foreach ($qacclog->result() as $r) {
                $accWer = array('idaccount'=>$r->idaccount,'idunit'=>$idunit);
                $qacc = $this->db->get_where('account',$accWer)->row();
                $balance = $qacc->balance;

                if($qacc->idaccounttype==1 || $qacc->idaccounttype==19)
                {
                        //kurangi kas/bank
                        $this->db->where($accWer);
                        $this->db->update('account',array('balance'=>$balance-$r->debit));
                } else {
                       

                        if($this->identifyPiutangAccount($r->idaccount,$idunit))
                        {
                            $totalpiutang+=$r->credit;

                            $this->db->where($accWer);
                            $this->db->update('account',array('balance'=>$balance+$r->credit));
                        } else {
                            $this->db->where($accWer);
                            $this->db->update('account',array('balance'=>$balance-$r->credit)); 
                        }
                }
            }

            // $q = $this->db->get_where('piutanghistory',array('idreceivemoney'=>$idreceivemoney));
            // foreach ($q->result() as $r) {
            //     $qj = $this->db->get_where('journalitem',array('idjournal'=>$idjournal));
            //     foreach ($qj->result() as $rr) {
            //         if($this->identifyPiutangAccount($rr->idaccount,$idunit))
            //         {
            //             //tambah akun piutang
            //             $curBalance = $this->m_account->getCurrBalance($rr->idaccount, $idunit);
            //             echo $curBalance." + ".$rr->credit;
            //             $newBalance = $curBalance + $rr->credit;
            //             $this->m_account->saveNewBalance($rr->idaccount, $newBalance, $idunit);
            //         }
            //     }
            // }

            if($totalpiutang>0)
            {
                $qhistory  = $this->db->get_where('piutanghistory',array('idreceivemoney'=>$idreceivemoney));
                foreach ($qhistory->result() as $r) {
                    $qpiutang = $this->db->get_where('registrasipiutang',array('idregistrasipiutang'=>$r->idregistrasipiutang));
                    if($qpiutang->num_rows()>0)
                    {
                        //rollback piutang
                        $rpiutang = $qpiutang->row();
                        $this->db->where(array('idregistrasipiutang'=>$r->idregistrasipiutang));
                        $this->db->update('registrasipiutang',array('sisapiutang'=>$rpiutang->sisapiutang+$totalpiutang));
                    }
                }
            }

            if($tipe=='siswa')
            {
                $this->db->where(array('idjournal'=>$idjournal));
                $this->db->delete('siswapembayaran');
            }

            $this->db->where('idjournal',$idjournal);
            $this->db->delete('accountlog');            

             $this->db->where(array('idreceivemoney'=>$idreceivemoney));
            $this->db->delete('piutanghistory');

            $this->db->where(array('idreceivemoney'=>$idreceivemoney));
            $this->db->delete('receivemoneyitem');

            $this->db->where(array('idreceivemoney'=>$idreceivemoney));
            $this->db->delete('receivemoney');

            $this->db->where('idjournal',$idjournal);
            $this->db->delete('journalitem');

            $this->db->where('idjournal',$idjournal);
            $this->db->delete('journal');
        }

         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        }

         echo json_encode($json);
    }

    function cancelSpend()
    {
        $retAkses = $this->cekAksesUser(59,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        // spendmoneyitem
        // spendmoney

        // accountlog

        // journalitem

        // journal
        $this->db->trans_begin();

        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $idspendmoney) {
            $q = $this->db->get_where('spendmoney',array('idspendmoney'=>$idspendmoney));
            if($q->num_rows()>0)
            {
                $r = $q->row();
                $idunit = $r->idunit;
                $idjournal = $r->idjournal;

                $this->db->where('idspendmoney',$idspendmoney);
                $this->db->delete('spendmoneyitem');

                $this->db->where('idspendmoney',$idspendmoney);
                $this->db->delete('spendmoney');

                $qacclog = $this->db->get_where('accountlog',array('idjournal'=>$idjournal));
                foreach ($qacclog->result() as $rqacclog) {
                    $accWer = array('idaccount'=>$rqacclog->idaccount,'idunit'=>$idunit);
                    $qacc = $this->db->get_where('account',$accWer)->row();
                    $balance = $qacc->balance;

                    if($qacc->idaccounttype==1 || $qacc->idaccounttype==19)
                    {
                            //tambah kas/bank
                            $this->db->where($accWer);
                            $this->db->update('account',array('balance'=>$balance+$rqacclog->credit));
                    } else {
                           //pengeluaran
                            $this->db->where($accWer);
                            $this->db->update('account',array('balance'=>$balance-$rqacclog->debit)); 
                    }
                }

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('accountlog');

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('journalitem');

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('journal');
            }            
        }

         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        }

         echo json_encode($json);
    }

    function cancelTransfer()
    {
        $retAkses = $this->cekAksesUser(90,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        /*
        transferkas
        accountlog
        journalitem
        journal
        */
        $this->db->trans_begin();

        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $idtransferkas) {
            $q = $this->db->get_where('transferkas',array('idtransferkas'=>$idtransferkas));
            if($q->num_rows()>0)
            {
                $r = $q->row();
                $idunit = $r->idunit;
                $idjournal = $r->idjournal;

                $this->db->where('idtransferkas',$idtransferkas);
                $this->db->delete('transferkas');

                $qacclog = $this->db->get_where('accountlog',array('idjournal'=>$idjournal));
                foreach ($qacclog->result() as $rqacclog) {
                    $accWer = array('idaccount'=>$rqacclog->idaccount,'idunit'=>$idunit);
                    $qacc = $this->db->get_where('account',$accWer)->row();
                    $balance = $qacc->balance;

                    if($rqacclog->debit==0)
                    {
                        //tambah akun sumber
                            $this->db->where($accWer);
                            $this->db->update('account',array('balance'=>$balance+$rqacclog->credit));
                    } else {
                        //kurangi akun tujuan
                            $this->db->where($accWer);
                            $this->db->update('account',array('balance'=>$balance-$rqacclog->debit)); 
                    }
                }

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('accountlog');

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('journalitem');

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('journal');
            }
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        }

         echo json_encode($json);
    }

    function cancelReconcile()
    {
        $retAkses = $this->cekAksesUser(60,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

         $this->db->trans_begin();

        $records = json_decode($this->input->post('postdata'));
        foreach ($records as $idreconcile) {
             $q = $this->db->get_where('reconcile',array('idreconcile'=>$idreconcile));
            if($q->num_rows()>0)
            {
                $r = $q->row();
                $idunit = $r->idunit;
                // $idjournal = $r->idjournal;

                $journal = $this->db->get_where('journal',array('idreconcile'=>$idreconcile,'idunit'=>$idunit));
                foreach ($journal->result() as $r) {
                    $idjournaltype = $r->idjournaltype;
                    $qjitem = $this->db->get_where('journalitem',array('idjournal'=>$r->idjournal));
                    foreach ($qjitem->result() as $rr) {

                        $accWer = array('idaccount'=>$rr->idaccount,'idunit'=>$idunit);
                        $qacc = $this->db->get_where('account',$accWer)->row();
                        $balance = $qacc->balance;

                        if($idjournaltype==8)
                        {
                            //pendapatan (debit & credit dikurang)
                            if($rr->credit==0)
                            {
                                $this->db->where($accWer);
                                $this->db->update('account',array('balance'=>$balance-$rr->debit)); 
                            } else {
                                $this->db->where($accWer);
                                $this->db->update('account',array('balance'=>$balance-$rr->credit)); 
                            }                            
                        } else if($idjournaltype==2){
                            //beban (debit dikurang & credit ditambah)
                            if($rr->credit==0)
                            {
                                $this->db->where($accWer);
                                $this->db->update('account',array('balance'=>$balance-$rr->debit)); 
                            } else {
                                $this->db->where($accWer);
                                $this->db->update('account',array('balance'=>$balance+$rr->credit)); 
                            }   
                        }
                    }

                    $this->db->where('idjournal',$r->idjournal);
                    $this->db->delete('journalitem');

                    $this->db->where('idjournal',$r->idjournal);
                    $this->db->delete('accountlog');
                }
                
                $this->db->where(array('idreconcile'=>$idreconcile,'idunit'=>$idunit));
                $this->db->delete('journal');

                $this->db->where(array('idreconcile'=>$idreconcile,'idunit'=>$idunit));
                $this->db->delete('reconcile');
            }
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        }

         echo json_encode($json);
    }


       function array_sort_by_column(&$arr, $col, $dir = SORT_ASC) {
        $sort_col = array();
        foreach ($arr as $key=> $row) {
            $sort_col[$key] = $row[$col];
        }

        array_multisort($sort_col, $dir, $arr);
    }

    function cetak()
    {
        $d['title'] = 'tes cetak';
        $this->load->view('tplcetak/tpl',$d);
    }

    // function tes() {
    //    $arr[0] = array(
    //         'id' => 111,
    //         'val' =>1
    //     );
    //    $arr[1] = array(
    //         'id' => 222,
    //         'val' => 2
    //     );
    //    $arr[2] = array(
    //         'id' => 111,
    //         'val' => 3
    //     );
    //    $arr[3] = array(
    //         'id' => 222,
    //         'val' => 4
    //     );


    //   $this->array_sort_by_column($arr, 'id');

    //   $v=null;
    //   $v2=null;
    //   $arrins=array();
    //   foreach ($arr as $key => $value) {
    //       if($v==null)
    //       {
    //             $v=$key
    //       }

    //       if($v=$key)
    //       {
    //         $arrins[$key]+=
    //       }

    //       $v2=$key
    //   }

    //    print_r($arr);
    // }

    function generate_cashout_history($idunit){
        $q = $this->db->query("select a.*,b.memo
                                from spendmoney a
                                join journal b ON a.idjournal = b.idjournal");
        foreach($q->result() as $r){
            $curBalance = $this->m_account->getCurrBalance($r->idaccount, $idunit);
            $newBalance = $curBalance - $r->totalpaid;

            $this->m_account->saveNewBalance($r->idaccount, $newBalance, $idunit);
            $this->m_account->saveAccountLog($idunit,$r->idaccount,$r->totalpaid,0,$r->datetrans,$r->idjournal);

            //akun keluaran
            $qj = $this->db->query("select datejournal
                                    from journal
                                    where idjournal = ".$r->idjournal."");
            if($qj->num_rows()>0){
                $rqj = $qj->row();

                $qjitem = $this->db->query("select idaccount,debit from
                                            journalitem
                                            where idjournal = ".$r->idjournal." and credit = 0");
                if($qjitem->num_rows()>0){
                    $rqjitem = $qjitem->row();

                    $curBalance = $this->m_account->getCurrBalance($rqjitem->idaccount, $idunit);
                    $newBalance = $curBalance + $rqjitem->debit;

                    $this->m_account->saveNewBalance($rqjitem->idaccount, $newBalance, $idunit);
                    $this->m_account->saveAccountLog($idunit,$rqjitem->idaccount,0,$rqjitem->debit,$rqj->datejournal,$r->idjournal);
                }
            }
        }
        
    }

    // function generate_cashout_history_spend_account($idunit){
    //     $q = $this->db->query("select a.*,b.memo
    //                             from spendmoney a
    //                             join journal b ON a.idjournal = b.idjournal");
    //     foreach($q->result() as $r){

    //         $qj = $this->db->query("select datejournal
    //                                 from journal
    //                                 where idjournal = ".$r->idjournal."");
    //         if($qj->num_rows()>0){
    //             $rqj = $qj->row();

    //             $qjitem = $this->db->query("select idaccount,debit from
    //                                         journalitem
    //                                         where idjournal = ".$r->idjournal." and credit = 0");
    //             if($qjitem->num_rows()>0){
    //                 $rqjitem = $qjitem->row();

    //                 $curBalance = $this->m_account->getCurrBalance($rqjitem->idaccount, $idunit);
    //                 $newBalance = $curBalance + $rqjitem->debit;

    //                 $this->m_account->saveNewBalance($rqjitem->idaccount, $newBalance, $idunit);
    //                 $this->m_account->saveAccountLog($idunit,$rqjitem->idaccount,0,$rqjitem->debit,$rqj->datejournal,$r->idjournal);
    //             }
    //         }

           
    //     }
        
    // }

    function generate_cash_trans_history($idunit){
        $q = $this->db->query("select idaccountsumber,idaccounttujuan,tanggal,nominal,b.idjournal,a.memo
                            from transferkas a
                            join journal b ON a.idjournal = b.idjournal
                            where a.idunit = $idunit");
        foreach($q->result() as $r){
            //sumber
            $curBalance = $this->m_account->getCurrBalance($r->idaccountsumber, $idunit);
            $newBalance = $curBalance - $r->nominal;

            $this->m_account->saveNewBalance($r->idaccountsumber, $newBalance, $idunit);
            $this->m_account->saveAccountLog($idunit,$r->idaccountsumber,$r->nominal,0,$r->tanggal,$r->idjournal);

            //tujuan
            $curBalance = $this->m_account->getCurrBalance($r->idaccounttujuan, $idunit);
            $newBalance = $curBalance + $r->nominal;

            $this->m_account->saveNewBalance($r->idaccounttujuan, $newBalance, $idunit);
            $this->m_account->saveAccountLog($idunit,$r->idaccounttujuan,0,$r->nominal,$r->tanggal,$r->idjournal);
        }
    }
}
