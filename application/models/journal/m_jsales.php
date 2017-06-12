<?php

class m_jsales extends CI_Model {

	function sales_kredit($tgljournal,$totalAmount,$idcurrency,$idunit,$biayaangkut,$memo){

		$this->db->trans_begin();

		/*
			Piutang Dagang (D)
			Biaya Angkut (D)
			Penjualan (K)
		*/

		$tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 3, //penjualan
            'nojournal' => 'AR'.rand(11111,99999),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memo,
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
            'idcurrency' => $idcurrency
        );

        $this->db->insert('journal', $d);

         //biaya angkut
        if($biayaangkut!=0)
        {
            $idaccountangkut = $this->m_data->getIdAccount(17, $idunit);

            $curBalance2 = $this->m_account->getCurrBalance($idaccountangkut, $idunit);
            //itung saldo baru
            $newBalance2 = $curBalance2 + $biayaangkut;
            //insert
            $ditem2 = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccountangkut,
    //            'idtax' integer,
                'debit' => $biayaangkut,
                'credit' => 0,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance2,
                'currbalance' => $newBalance2
            );
            $this->db->insert('journalitem', $ditem2);
            //update saldo baru
            $this->m_account->saveNewBalance($idaccountangkut, $newBalance2, $idunit);

            $this->m_account->saveAccountLog($idunit,$idaccountangkut,0,$biayaangkut,$tgljournal,$qseq->id);
        }

   		  //piutang
          $amount = $totalAmount-$biayaangkut;
   		  $idacc = $this->m_data->getIdAccount(24, $idunit);

            $curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
            //itung saldo baru
            $newBalance2 = $curBalance2 + $amount;
            //insert
            $ditem2 = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idacc,
    //            'idtax' integer,
                'debit' => $amount,
                'credit' => 0,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance2,
                'currbalance' => $newBalance2
            );
            $this->db->insert('journalitem', $ditem2);
            //update saldo baru
            $this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

            $this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tgljournal,$qseq->id);

          //penjualan
          $amount = $totalAmount;
   		  $idacc = $this->m_data->getIdAccount(6, $idunit);

            $curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
            //itung saldo baru
            $newBalance2 = $curBalance2 + $amount;
            //insert
            $ditem2 = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idacc,
    //            'idtax' integer,
                'debit' => 0,
                'credit' => $amount,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance2,
                'currbalance' => $newBalance2
            );
            $this->db->insert('journalitem', $ditem2);
            //update saldo baru
            $this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

            $this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tgljournal,$qseq->id);

       if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>$this->db->last_query());
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'idjournal'=>$qseq->id);
        }

        return $json;
	}

	function sales_pelunasan_full($tgljournal,$memo,$totalAmount,$idunit,$idcurrency,$idaccount_coa_kas){
		/*
			KAS (D)
			Piutang Usaha (K)
		*/

			$this->db->trans_begin();

		$tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 3, //penjualan
            'nojournal' => 'PAR'.rand(11111,99999),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memo,
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
            'idcurrency' => $idcurrency
        );

        $this->db->insert('journal', $d);	

			//KAS
			$amount = $totalAmount;
			// $idacc = $this->m_data->getIdAccount(15, $idunit);
			$idacc = $idaccount_coa_kas;

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 + $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => $amount,
			    'credit' => 0,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

			$this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tgljournal,$qseq->id);

			//PIUTANG
			$amount = $totalAmount;
			$idacc = $this->m_data->getIdAccount(24, $idunit);

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 - $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => 0,
			    'credit' => $amount,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

			$this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tgljournal,$qseq->id);

		if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>$this->db->last_query());
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'idjournal'=>$qseq->id);
        }

        return $json;
	}

	function sales_pelunasan_sebagian($tgljournal,$memo,$totalAmount,$idunit,$idcurrency,$idaccount_coa_kas){
		/*
			 Kas/Bank (D)
			 Piutang Usaha (K)
		*/

		$this->db->trans_begin();
			
		$tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 3, //penjualan
            'nojournal' => 'PAR'.rand(11111,99999),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memo,
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
            'idcurrency' => $idcurrency
        );

        $this->db->insert('journal', $d);	

        	//KAS
			$amount = $totalAmount;
			// $idacc = $this->m_data->getIdAccount(15, $idunit);
			$idacc = $idaccount_coa_kas;

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 + $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => $amount,
			    'credit' => 0,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

			$this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tgljournal,$qseq->id);

			//PIUTANG
			$amount = $totalAmount;
			$idacc = $this->m_data->getIdAccount(24, $idunit);

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 - $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => 0,
			    'credit' => $amount,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

			$this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tgljournal,$qseq->id);


		if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>$this->db->last_query());
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'idjournal'=>$qseq->id);
        }

        return $json;

	}

	function sales_tunai(){

	}

	function sales_kredit_dp(){
		//penjualan kredit dengan dp
	}

	function sales_delivery_retur_perpetual($tgljournal,$memo,$idunit,$sales_return_id, $idcurrency=null){
		/*
			jurnal pengiriman barang yang diretur

			hpp (d)
			persediaan (k)
		*/

		$qheader = $this->db->query("select a.sales_return_id,a.idjournal,b.totaldebit
									from sales_return a
									join journal b ON a.idjournal = b.idjournal
									where a.sales_return_id = $sales_return_id")->row();
		$totalAmount = $qheader->totaldebit;

		//coa persediaan
		$qc = $this->db->query("select idaccount as coa_inv
								from journalitem 
								where idjournal = ".$qheader->idjournal." and credit = 0")->row();
		$coa_inv = $qc->coa_inv;

		//coa hpp
		$qc = $this->db->query("select idaccount as coa_hpp
								from journalitem 
								where idjournal = ".$qheader->idjournal." and debit = 0")->row();
		$coa_hpp = $qc->coa_hpp;

		$this->db->trans_begin();
			
		$tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 3, //penjualan
            'nojournal' => 'DRETS'.rand(11111,99999),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memo,
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
            'idcurrency' => $idcurrency
        );

        $this->db->insert('journal', $d);	

        	//persediaan
			$amount = $totalAmount;
			// $idacc = $this->m_data->getIdAccount(26, $idunit);
			$idacc = $coa_inv;

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 + $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => 0,
			    'credit' => $amount,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);
			$this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tgljournal,$qseq->id);

			//hpp
			$amount = $totalAmount;
			$idacc = $coa_hpp;
			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 + $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => $amount,
			    'credit' => 0,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);
			$this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tgljournal,$qseq->id);


		if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>$this->db->last_query());
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'idjournal'=>$qseq->id);
        }

        return $json;
	}

	function sales_retur_perpetual($tgljournal,$totalAmount,$memo,$idunit,$idaccount_return,$idcurrency=null){
		/*
			persediaan (d)
			hpp (k)
		*/

		$this->db->trans_begin();
			
		$tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 3, //penjualan
            'nojournal' => 'RETS'.rand(11111,99999),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memo,
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
            'idcurrency' => $idcurrency
        );

        $this->db->insert('journal', $d);	

        	//persediaan
			$amount = $totalAmount;
			$idacc = $this->m_data->getIdAccount(26, $idunit);
			// $idacc = $idaccount_coa_kas;

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 - $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => $amount,
			    'credit' => 0,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);
			$this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tgljournal,$qseq->id);

			//hpp
			$amount = $totalAmount;
			$idacc = $this->m_data->getIdAccount(25, $idunit);
			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 - $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => 0,
			    'credit' => $amount,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);
			$this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tgljournal,$qseq->id);


		if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>$this->db->last_query());
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'idjournal'=>$qseq->id);
        }

        return $json;
	}

	function sales_retur_tunai($tgljournal,$totalAmount,$memo,$idunit,$idaccount_return,$idcurrency=null){
		/*
			Retur Penjualan (D)
			Kas (K)
		*/

		$this->db->trans_begin();
			
		$tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 3, //penjualan
            'nojournal' => 'SR'.rand(11111,99999),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memo,
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
            'idcurrency' => $idcurrency
        );

        $this->db->insert('journal', $d);	

        	//RETUR
			$amount = $totalAmount;
			$idacc = $idaccount_return;

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 + $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => $amount,
			    'credit' => 0,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

			$this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tgljournal,$qseq->id);

			//KAS
			$amount = $totalAmount;
			$idacc = $this->m_data->getIdAccount(15, $idunit);

			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 - $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => 0,
			    'credit' => $amount,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);

			$this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tgljournal,$qseq->id);

		if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>$this->db->last_query());
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'idjournal'=>$qseq->id);
        }

        return $json;
	}

	function sales_do($tgljournal,$totalAmount,$idunit,$idaccount_hppenjualan,$idaccount_persediaan,$memo){
		/*
				HPP			1000000
				Persediaan Barang			1000000
		*/

		$this->db->trans_begin();
			
		$tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 3, //penjualan
            'nojournal' => 'SR'.rand(11111,99999),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memo,
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
            'idunit' => $idunit
            // 'idcurrency' => $idcurrency
        );

        $this->db->insert('journal', $d);	

        	//idaccount_hppenjualan
			$amount = $totalAmount;
			$idacc = $idaccount_hppenjualan;
			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 + $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => $amount,
			    'credit' => 0,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);
			$this->m_account->saveAccountLog($idunit,$idacc,0,$amount,$tgljournal,$qseq->id);

			//idaccount_persediaan
			$amount = $totalAmount;
			$idacc = $idaccount_persediaan;
			$curBalance2 = $this->m_account->getCurrBalance($idacc, $idunit);
			//itung saldo baru
			$newBalance2 = $curBalance2 + $amount;
			//insert
			$ditem2 = array(
			    'idjournal' => $qseq->id,
			    'idaccount' => $idacc,
			//            'idtax' integer,
			    'debit' => 0,
			    'credit' => $amount,
			//            'memo' character varying(225),
			    'lastbalance' => $curBalance2,
			    'currbalance' => $newBalance2
			);
			$this->db->insert('journalitem', $ditem2);
			//update saldo baru
			$this->m_account->saveNewBalance($idacc, $newBalance2, $idunit);
			$this->m_account->saveAccountLog($idunit,$idacc,$amount,0,$tgljournal,$qseq->id);

		if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>$this->db->last_query());
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'idjournal'=>$qseq->id);
        }

        return $json;
	}

	function sales_retur_kredit(){

	}
}
?>