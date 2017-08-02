<?php

class m_jpurchase extends CI_Model {

    function purchase_ap($date_po,$memo,$totalAmount,$idunit,$idaccount_coa_hutang,$idaccount_coa_beli,$idaccount_coa_pajakmasuk,$total_pajak){
         //D: kena hutang
        //K: hutang

        $tgl = explode("-",$date_po);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 9,//hutang
            'nojournal' => $tgl[0].$tgl[1].$tgl[2].$qseq->id.'09',
//                    name character varying(225),
            'datejournal' => $date_po,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d);

        //D: pembelian
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(24, $idunit);
        $idacc = $idaccount_coa_beli; //pembelian
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$date_po,$qseq->id);

          //D: Pajak masukkan
        $amount = $total_pajak;
        $idacc = $idaccount_coa_pajakmasuk;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $total_pajak,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$date_po,$qseq->id);

        //K: hutang
        $amount = $totalAmount+$total_pajak;
        // $idacc = $this->m_data->getIdAccount(24, $idunit);
        $idacc = $idaccount_coa_hutang;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$date_po,$qseq->id);

        return $qseq->id;
    }

    function purchase_ap2($date_po,$memo,$totalAmount,$idunit,$idaccount_coa_hutang,$idaccount_coa_pajakmasuk,$total_pajak){
         //D: Hutang Usaha Belum Ditagih
            //K: Hutang Usaha
            //K: PPn Masukan

        $tgl = explode("-",$date_po);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 9,//hutang
            'nojournal' => $tgl[0].$tgl[1].$tgl[2].$qseq->id.'09',
//                    name character varying(225),
            'datejournal' => $date_po,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d);

        //D: Hutang Usaha Belum Ditagih
        $amount = $totalAmount;
        $idacc = $this->m_data->getIdAccount(27, $idunit);
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$date_po,$qseq->id);

          //K: Pajak masukkan
        $amount = $total_pajak;
        $idacc = $idaccount_coa_pajakmasuk;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $total_pajak,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$date_po,$qseq->id);

        //K: Hutang Usaha
        $amount = $totalAmount-$total_pajak;
        // $idacc = $this->m_data->getIdAccount(24, $idunit);
        $idacc = $idaccount_coa_hutang;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$date_po,$qseq->id);

        return $qseq->id;
    }


    function purchase_pelunasan($date_po,$totalAmount,$memo,$idunit,$idaccountkas,$idaccount_coa_hutang){
        /*
            HUTANG (D)
            KAS (K)
        */

        $tgl = explode("-",$date_po);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 9,//hutang
            'nojournal' => $tgl[0].$tgl[1].$tgl[2].$qseq->id.'09',
//                    name character varying(225),
            'datejournal' => $date_po,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d);

        //HUTANG (D)
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(15, $idunit);
        $idacc = $idaccount_coa_hutang;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$date_po,$qseq->id);


        //K: KAS
        $amount = $totalAmount;
        $idacc = $idaccountkas;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$date_po,$qseq->id);
        // echo 'adsad'.$qseq->id;
        return $qseq->id;
    }

    function purchase_pelunasan_sebagian(){

    }

    function purchase_return2($idpurchase,$total_value,$idunit){

        /*
            Jurnal yg dibentuk
            Debit : Hutang Dagang Yang Belum Difakturkan/Ditagih
            Kredit : Persediaan
        */

        $qpurchase = $this->db->query("select idaccount_coa_gr,nopurchase from purchase where idpurchase = $idpurchase")->row();
        $tanggal = date('Y-m-d');
        $tgl = explode("-",$tanggal);
        $memo = 'Retur Barang No Purchase: '.$qpurchase->nopurchase;
        // echo $memo; die;
        // $idunit = $this->session->userdata('idunit');
        $totalAmount = $total_value;

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 4,//pembelian
            'nojournal' => 'RPO'.$tgl[0].$tgl[1].$tgl[2].$qseq->id,
//                    name character varying(225),
            'datejournal' => $tanggal,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('userid'),
            'usermod' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d); 

        //D: Hutang Dagang Yang Belum Difakturkan/Ditagih
        $amount = $totalAmount;
        $idacc = $this->m_data->getIdAccount(27, $idunit);
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tanggal,$qseq->id);

         //Persediaan (K)
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(15, $idunit);
        $idacc = $qpurchase->idaccount_coa_gr;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tanggal,$qseq->id);   

      
        // echo 'adsad'.$qseq->id;
        return $qseq->id;  
    }

    function purchase_return_receive2($idpurchase,$purchase_return_id,$noreturn,$idunit){

        /*
            Jurnal yg dibentuk
            Debit : Persediaan
            Kredit : Hutang Dagang Yang Belum Difakturkan/Ditagih
        */

        $qpurchase = $this->db->query("select idaccount_coa_gr from purchase where idpurchase = $idpurchase")->row();
        $tanggal = date('Y-m-d');
        $tgl = explode("-",$tanggal);
        $memo = 'Penerimaan Retur Barang - No Retur: '.$noreturn;

        $qamount = $this->db->query("select sum(total_amount_item) as total_amount
                                    from purchase_returnitem
                                    where purchase_return_id = $purchase_return_id")->row();
        $totalAmount = $qamount->total_amount == null ? 0 : $qamount->total_amount;

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 4,//pembelian
            'nojournal' => 'RRT'.$tgl[0].$tgl[1].$tgl[2].$qseq->id,
//                    name character varying(225),
            'datejournal' => $tanggal,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('userid'),
            'usermod' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d); 

         //Persediaan (D)
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(15, $idunit);
        $idacc = $qpurchase->idaccount_coa_gr;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tanggal,$qseq->id);   

        //K: Hutang Dagang Yang Belum Difakturkan/Ditagih
        $amount = $totalAmount;
        $idacc = $this->m_data->getIdAccount(27, $idunit);
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tanggal,$qseq->id);

        // echo 'adsad'.$qseq->id;
        return $qseq->id;  
    }

    function purchase_return($tanggal,$totalAmount,$idpurchase,$idcoaretur,$memo,$idunit){
        /*
            retur pembelian. retur dilakukan sebelum invoice

            hutang dagang (D)
                retur pembelian (K)
        */

        $qpurchase = $this->db->query("select idunit, balance, idaccount_coa_hutang from purchase where idpurchase = $idpurchase")->row();
        $tgl = explode("-",$tanggal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 9,//hutang
            'nojournal' => 'RETP'.$tgl[0].$tgl[1].$tgl[2].$qseq->id,
//                    name character varying(225),
            'datejournal' => $tanggal,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d); 

         //HUTANG (D)
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(15, $idunit);
        $idacc = $qpurchase->idaccount_coa_hutang == null ? $this->m_data->getIdAccount(14, $idunit) : $qpurchase->idaccount_coa_hutang;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tanggal,$qseq->id);   

        //K: retur
        $amount = $totalAmount;
        $idacc = $idcoaretur;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tanggal,$qseq->id);
        // echo 'adsad'.$qseq->id;
        return $qseq->id;  
    }

    function purchase_return_receive($tanggal,$totalAmount,$idpurchase,$idcoaretur,$memo,$idunit){
        //jurnal retur penerimaan barang dari pembelian
          /* buat jurnal
                retur -> debit
                hutang -> kredit
            */
        $qpurchase = $this->db->query("select idunit, balance, idaccount_coa_hutang from purchase where idpurchase = $idpurchase")->row();
        $tgl = explode("-",$tanggal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 9,//hutang
            'nojournal' => 'RETP'.$tgl[0].$tgl[1].$tgl[2].$qseq->id,
//                    name character varying(225),
            'datejournal' => $tanggal,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d); 

         //HUTANG (K)
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(15, $idunit);
        $idacc = $qpurchase->idaccount_coa_hutang == null ? $this->m_data->getIdAccount(14, $idunit) : $qpurchase->idaccount_coa_hutang;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tanggal,$qseq->id);   

        //D: retur
        $amount = $totalAmount;
        $idacc = $idcoaretur;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tanggal,$qseq->id);
        // echo 'adsad'.$qseq->id;
        return $qseq->id;  
    }

    function penerimaan_barang($idpurchase,$nopo,$idaccount_coa_gr,$total_value,$date=null){

        // $q = $this->db->query("select idpurchaseitem,qty,qty_received,price,total
        //                         from purchaseitem
        //                         where idpurchase = $idpurchase");

        // $total_value = 0;
        // foreach($q->result() as $r){
        //     //cek ada batch item apa tidak
        //     $qbatch = $this->db->query("select qty
        //                                 from purchaseitem_batch
        //                                 where idpurchaseitem = ".$r->idpurchaseitem."
        //                                 and is_tmp = 0");
        //     if($qbatch->num_rows()>0){
        //         $rbatch = $qbatch->row();
        //         $item_value = $rbatch->qty*$r->price;
        //         $total_value+=$item_value;
        //     } else {
        //         $total_value+= $r->qty_received*$r->price;
        //     }
        // }

        /*
            Jurnal yg dibentuk
            Debit : Persediaan
            Kredit : Hutang Dagang Yang Belum Difakturkan/Ditagih
        */

        $qpurchase = $this->db->query("select idunit, balance, idaccount_coa_hutang from purchase where idpurchase = $idpurchase")->row();
        
        if($date==null){
            $tanggal = date('Y-m-d');
        } else {
            $tanggal = $date;
        }
        

        $tgl = explode("-",$tanggal);
        $memo = 'Penerimaan Barang No Purchase: '.$nopo;
        $idunit = $this->session->userdata('idunit');
        $totalAmount = $total_value;

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 4,//pembelian
            'nojournal' => 'GR'.$tgl[0].$tgl[1].$tgl[2].$qseq->id,
//                    name character varying(225),
            'datejournal' => $tanggal,
            'memo' =>  $memo,
            'totaldebit' => $totalAmount,
            'totalcredit' => $totalAmount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('userid'),
            'usermod' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d); 

         //Persediaan (D)
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(15, $idunit);
        $idacc = $idaccount_coa_gr;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tanggal,$qseq->id);   

        //K: Hutang Dagang Yang Belum Difakturkan/Ditagih
        $amount = $totalAmount;
        $idacc = $this->m_data->getIdAccount(27, $idunit);
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance + $amount;  //itung saldo baru

        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tanggal,$qseq->id);
        // echo 'adsad'.$qseq->id;
        return $qseq->id;  
    }
}
?>