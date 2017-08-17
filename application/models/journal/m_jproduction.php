<?php

class m_jproduction extends CI_Model {

    function material_entry($totalAmount,$wo_number){
    //    D - Barang dalam proses- biaya bahan baku 
    //    K - Persediaan bahan baku     
        $tanggal = date('Y-m-d');
        $tgl = explode("-",$tanggal);
        $memo = 'Biaya Bahan Baku - WO: '.$wo_number;
        $idunit = $this->session->userdata('idunit');
        
        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 11,//Produksi
            'nojournal' => $tgl[0].$tgl[1].$tgl[2].$qseq->id.'11',
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
        
        // D - Barang dalam proses- biaya bahan baku 
        $amount = $totalAmount;
        $idacc = $this->m_data->getIdAccount(31, $idunit);
        // $idacc = $idaccount_coa_beli; //pembelian
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
        $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tanggal,$qseq->id);
        
        //  K - Persediaan bahan baku     
        $amount = $totalAmount;
        $idacc = $this->m_data->getIdAccount(32, $idunit);
        // $idacc = $idaccount_coa_hutang;
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

        return $qseq->id;
    }

    function receive_wo($job_order_id,$job_no){
        /*
            Penerimaan work order - production

              //    D - Persediaan bahan jadi    
              //    K - Barang dalam proses- biaya bahan baku            
        */

        $qjournal = $this->db->query("select idjournal_material_confirm,b.idaccount as idaccount_debit,c.idaccount as idaccount_credit,d.totaldebit,d.totalcredit
                                    from job_order a
                                    join journalitem b ON a.idjournal_material_confirm = b.idjournal and b.credit = 0
                                    join journalitem c ON a.idjournal_material_confirm = c.idjournal and c.debit = 0
                                    join journal d ON a.idjournal_material_confirm = d.idjournal
                                    where job_order_id = $job_order_id")->row();

        $tanggal = date('Y-m-d');
        $tgl = explode("-",$tanggal);
        $memo = 'Penerimaan Barang Jadi Produksi - WO: '.$job_no;
        $idunit = $this->session->userdata('idunit');
        $totalAmount = $qjournal->totaldebit;
        
        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 11,//Produksi
            'nojournal' => $tgl[0].$tgl[1].$tgl[2].$qseq->id.'11',
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
        
        //  D - Persediaan bahan jadi     
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(33, $idunit);
        $idacc = $qjournal->idaccount_credit;
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
          
          // K - Barang dalam proses- biaya bahan baku 
        $amount = $totalAmount;
        // $idacc = $this->m_data->getIdAccount(31, $idunit);
        $idacc = $qjournal->idaccount_debit;
        $curBalance = $this->m_account->getCurrBalance($idacc, $idunit);       
        $newBalance = $curBalance - $amount;  //itung saldo baru

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacc,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacc, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tanggal,$qseq->id);
        
      

        return $qseq->id;
    }
}

?>
