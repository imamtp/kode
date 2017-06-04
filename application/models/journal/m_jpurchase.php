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
}
?>