<?php

class m_journal extends CI_Model {

    function saveDisbursmentPurchase($idunit,$datejournal) {
        $tgl = explode("-", $datejournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 4,
            'nojournal' => $this->input->post('nojurnalPurchase'),
//                    name character varying(225),
            'datejournal' => $datejournal,
            'memo' => $this->input->post('memoPurchase'),
            'totaldebit' => $this->input->post('pembayaranPurchase'),
            'totalcredit' => $this->input->post('pembayaranPurchase'),
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
            'idcurrency' => $this->input->post('idcurrency')
        );

        $this->db->insert('journal', $d);

        //journal kas (debit) & uang muka pembelian
        //kas
        $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
        $curBalance = $this->m_account->getCurrBalance($idaccountkas, $idunit);
        $newBalance = $curBalance - $this->input->post('pembayaranPurchase');

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountkas,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $this->input->post('pembayaranPurchase'),
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountkas, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccountkas,$this->input->post('pembayaranPurchase'),0,$datejournal,$qseq->id);

        //uang muka pembelian
        $idaccountdp = $this->m_data->getIdAccount(18,$idunit);
        $curBalance2 = $this->m_account->getCurrBalance($idaccountdp, $idunit);
        $newBalance2 = $curBalance2 + $this->input->post('pembayaranPurchase');

        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountdp,
//            'idtax' integer,
            'debit' => $this->input->post('pembayaranPurchase'),
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        $this->m_account->saveNewBalance($idaccountdp, $newBalance2, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccountdp,0,$this->input->post('pembayaranPurchase'),$datejournal,$qseq->id);

        return $qseq->id;
    }

    function savePurchaseWithDP($idunit,$tgljournal,$dp,$totalAmount,$idaccountInv,$biayaangkut=0,$datagrid)
    {
        //pembelian barang dengan DP
        // echo $totalAmount;
        $tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 4,
            'nojournal' => $this->input->post('nojurnalPurchase'),
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $this->input->post('memoPurchase'),
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
            'idcurrency' => $this->input->post('idcurrency')
        );

        $this->db->insert('journal', $d);

        //akun persediaan (debit)
        //Persediaan barang dagang/persediaan
        $this->insertJurnalPersediaan($datagrid,$qseq->id,$idunit,$tgljournal);
//         $curBalance = $this->m_account->getCurrBalance($idaccountInv, $idunit);
//         $newBalance = $curBalance + $totalAmount-$biayaangkut;

//         $ditem = array(
//             'idjournal' => $qseq->id,
//             'idaccount' => $idaccountInv,
// //            'idtax' integer,
//             'debit' => $totalAmount-$biayaangkut,
//             'credit' => 0,
// //            'memo' character varying(225),
//             'lastbalance' => $curBalance,
//             'currbalance' => $newBalance
//         );
//         $this->db->insert('journalitem', $ditem);
//         $this->m_account->saveNewBalance($idaccountInv, $newBalance, $idunit);
//         // echo '$idaccountInv:'.$idaccountInv;
//         $this->m_account->saveAccountLog($idunit,$idaccountInv,0,$totalAmount-$biayaangkut,$tgljournal,$qseq->id);


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

        //journal kas (debit) & uang muka pembelian
        //kas (kredit)
        $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
        $curBalance = $this->m_account->getCurrBalance($idaccountkas, $idunit);
        $newBalance = $curBalance - $dp;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountkas,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $dp,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountkas, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccountkas,$dp,0,$tgljournal,$qseq->id);

        //hutang pembelian (kredit)
        $idaccHutang = $this->m_data->getIdAccount(14,$idunit); //hutang usaha
        $curBalance2 = $this->m_account->getCurrBalance($idaccHutang, $idunit);
        $kredit = $totalAmount-$dp;
        $newBalance2 = $curBalance2 + $kredit;

        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccHutang,
//            'idtax' integer,
            'debit' => 0,
            'credit' =>  $kredit,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        $this->m_account->saveNewBalance($idaccHutang, $newBalance2, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccHutang,$kredit,0,$tgljournal,$qseq->id);

        /////////BIKIN JURNAL KAS KELUAR UNTUK UANG MUKA/////////////////////

//         $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

//         $d = array(
//             'idjournal' => $qseq->id,
//             'idjournaltype' => 7, //kas keluar
//             'nojournal' => 'DP'.$this->input->post('nojurnalPurchase'),
// //                    name character varying(225),
//             'datejournal' => $tgljournal,
//             'memo' => 'Uang Muka '.$this->input->post('memoPurchase'),
//             'totaldebit' => $dp,
//             'totalcredit' => $dp,
// //                    'totaltax' double precision,
// //                    isrecuring boolean,
//             'year' => $tgl[0],
//             'month' => $tgl[1],
// //                    display integer,
//             'userin' => $this->session->userdata('username'),
//             'usermod' => $this->session->userdata('username'),
//             'datein' => date('Y-m-d H:m:s'),
//             'datemod' => date('Y-m-d H:m:s'),
//             'idunit' => $idunit,
//             'idcurrency' => $this->input->post('idcurrency')
//         );

//         $this->db->insert('journal', $d);

//         //kas (kredit)
//         $ditem = array(
//             'idjournal' => $qseq->id,
//             'idaccount' => $idaccountkas,
// //            'idtax' integer,
//             'debit' => 0,
//             'credit' => $dp
//         );
//         $this->db->insert('journalitem', $ditem);

//         $idaccdp = $this->m_data->getIdAccount(18,$idunit); //UANG MUKA
//         $ditem2 = array(
//             'idjournal' => $qseq->id,
//             'idaccount' => $idaccdp,
// //            'idtax' integer,
//             'debit' => $dp,
//             'credit' =>  0
//         );
//         $this->db->insert('journalitem', $ditem2);

        return $qseq->id;
    }

    function saveReceiveMoneyPengurangPiutang($idunit,$idaccountpiutang,$arrPembayaran,$tgljournal,$memoReceive,$idaccountReceive)
    {
        $tgl = explode("-", $tgljournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 8, //pendapatan
            'nojournal' => 'REF'.$tgl[0].$tgl[1].$tgl[2].'08',
//                    name character varying(225),
            'datejournal' => $tgljournal,
            'memo' => $memoReceive,
            'totaldebit' => 0,
            'totalcredit' => 0,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit
            // 'idcurrency' => $this->input->post('idcurrency')
        );

        $this->db->insert('journal', $d);

        


        //piutang(kredit)
        $totalPembayaran=0;
        foreach ($arrPembayaran as $key => $value) {
            //cek udah ada apa belum, kalo sudah ada diupdate
            $q = $this->db->get_where('journalitem',array('idjournal'=>$qseq->id,'idaccount'=>$idaccountpiutang));
            if($q->num_rows()>0)
            {
                $r = $q->row();

                $curBalance = $this->m_account->getCurrBalance($idaccountpiutang, $idunit);
                $newBalance = $curBalance - $value['amount'];

                $ditem = array(
                    'idjournal' => $qseq->id,
                    'idaccount' => $idaccountpiutang,
        //            'idtax' integer,
                    'debit' => 0,
                    'credit' => $newBalance,
        //            'memo' character varying(225),
                    'lastbalance' => $curBalance,
                    'currbalance' => $newBalance
                );
                $this->db->where(array('idjournal'=>$qseq->id,'idaccount'=>$idaccountpiutang));
                $this->db->update('journalitem', $ditem);

                 $this->m_account->saveNewBalance($idaccountpiutang, $newBalance, $idunit);

                $this->m_account->saveAccountLog($idunit,$idaccountpiutang,$value['amount']+$r->credit,0,$tgljournal,$qseq->id);
            } else {
                $curBalance = $this->m_account->getCurrBalance($idaccountpiutang, $idunit);
                // echo $curBalance." - ".$value['amount'];
                $newBalance = $curBalance - $value['amount'];

                $ditem = array(
                    'idjournal' => $qseq->id,
                    'idaccount' => $idaccountpiutang,
        //            'idtax' integer,
                    'debit' => 0,
                    'credit' => $value['amount'],
        //            'memo' character varying(225),
                    'lastbalance' => $curBalance,
                    'currbalance' => $newBalance
                );
                // print_r($ditem);
                $this->db->insert('journalitem', $ditem);

                $this->m_account->saveNewBalance($idaccountpiutang, $newBalance, $idunit);

                $this->m_account->saveAccountLog($idunit,$idaccountpiutang,$value['amount'],0,$tgljournal,$qseq->id);
            }
            
            $totalPembayaran+=$value['amount'];
        }


        //kas (debet)
        $curBalance = $this->m_account->getCurrBalance($idaccountReceive, $idunit);
        $newBalance = $curBalance + $totalPembayaran;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountReceive,
//            'idtax' integer,
            'debit' => $totalPembayaran,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountReceive, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idaccountReceive,0,$totalPembayaran,$tgljournal,$qseq->id);
        // echo $this->db->last_query();

        //update jumlah credit/debit di jurnal
        $this->db->where(array('idjournal'=>$qseq->id));
        $this->db->update('journal', array(
             'totaldebit' => $totalPembayaran,
             'totalcredit' => $totalPembayaran
            ));   

        return $qseq->id;
    }

    function insertJurnalPersediaan($datagrid,$idjournal,$idunit,$datejournal)
    {
        //Persediaan barang dagang/persediaan
        //kumpulin data per akun aset dan simpan ke tabel temporary
        foreach ($datagrid as $key => $value) {
             $qtax = $this->db->get_where('tax',array('rate'=>$value->ratetax))->row();
            $idtax = $qtax->idtax;
            $tax = $value->total*($value->ratetax/100);

            $qacc = $this->db->get_where('inventoryunit',array('idinventory'=>$value->idinventory,'idunit'=>$idunit))->row();
            //cek dulu udah ada apa belom di tmp
            $qtmp = $this->db->get_where('tmppurchase',array('idjournal'=>$idjournal,'assetaccount'=>$qacc->assetaccount,'userin'=>$this->session->userdata('username'),'idunit'=>$idunit));
            // echo $this->db->last_query();
            if($qtmp->num_rows()>0)
            {
                $rtmp = $qtmp->row();
                $dtmp = array(
                        "idjournal"=>$idjournal,
                        "idinventory" => $value->idinventory,
                        "total" => $rtmp->total+$value->total,
                        "idunit" =>$idunit,
                        "datein" => date('Y-m-d H:m:s'),
                        "idtax" => $idtax,
                        "tax" => $tax,
                        "assetaccount" => $qacc->assetaccount,
                        "userin" => $this->session->userdata('username')
                );
               $this->db->where(array('assetaccount'=>$qacc->assetaccount,'userin'=>$this->session->userdata('username'),'idunit'=>$idunit));
               $this->db->update('tmppurchase',$dtmp);
            } else {
                $dtmp = array(
                        "idjournal"=>$idjournal,
                        "idinventory" => $value->idinventory,
                        "total" => $value->total,
                        "idunit" =>$idunit,
                        "datein" => date('Y-m-d H:m:s'),
                        "idtax" => $idtax,
                        "tax" => $tax,
                        "assetaccount" => $qacc->assetaccount,
                        "userin" => $this->session->userdata('username')
                );
                $this->db->insert('tmppurchase',$dtmp);
            }


                    //tmp pajak
                    if($value->ratetax!=0)
                    {
                        $qtax = $this->db->get_where('tax',array('rate'=>$value->ratetax))->row();
                        $idtax = $qtax->idtax;
                        $tax = $value->total*($value->ratetax/100);

                        $qtmp = $this->db->get_where('tmptax',array('idjournal'=>$idjournal,'idtax'=>$idtax,'idunit'=>$idunit));
                        // echo $this->db->last_query();
                        if($qtmp->num_rows()>0)
                        {
                            $rtmp = $qtmp->row();
                            $dtmp = array(
                                    "idjournal"=>$idjournal,
                                    "idtax" => $idtax,
                                    "tax" => $tax,
                                    "idunit"=>$idunit
                            );
                           $this->db->where(array('idtax'=>$idtax,'idunit'=>$idunit,'idjournal'=>$idjournal));
                           $this->db->update('tmptax',$dtmp);
                        } else {
                            $dtmp = array(
                                    "idjournal"=>$idjournal,
                                    "idtax" => $idtax,
                                    "tax" => $tax,
                                    "idunit"=>$idunit
                            );
                            $this->db->insert('tmptax',$dtmp);
                        }
                    } else {
                        $idtax = null;
                        $tax = null;
                    }

                    
                    //end tmppajak
        }
        /*
         * insert jurnal
         */
//         $qacc = $this->db->get_where('inventory',array('idinventory'=>))
        $qtmpinsert = $this->db->get_where('tmppurchase',array('idjournal'=>$idjournal));
        foreach ($qtmpinsert->result() as $r) {
             //cari balance
            $idaccount = $r->assetaccount;
            $curBalance2 = $this->m_account->getCurrBalance($idaccount, $idunit);
            //itung saldo baru
            $newBalance2 = $curBalance2 + $r->total;
            //insert
            $ditem2 = array(
                'idjournal' => $idjournal,
                'idaccount' => $idaccount,
    //            'idtax' integer,
                'debit' => $r->total,
                'credit' => 0,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance2,
                'currbalance' => $newBalance2
            );
            $this->db->insert('journalitem', $ditem2);
            //update saldo baru
            $this->m_account->saveNewBalance($idaccount, $newBalance2, $idunit);

            $this->m_account->saveAccountLog($idunit,$idaccount,0,$r->total,$datejournal,$idjournal);


            //pajak
            //tambah pajak masukan
            // $taxlink = $this->db->get_where('taxlinkunit',array('idunit'=>$idunit,'idtax'=>$r->idtax));
            // if($taxlink->num_rows()>0)
            // {
            //     $rtax = $taxlink->row();
            //     $idtaxmasukan = $rtax->acctaxpaid;
            //     if($idtaxmasukan==null)
            //     {

            //     } else {
            //         //ambil balance sekarang
            //         $curBalance2 = $this->m_account->getCurrBalance($idtaxmasukan, $idunit);
            //         //itung saldo baru
            //         $newBalance2 = $curBalance2 + $r->tax;
            //         //insert
            //         $ditem2 = array(
            //             'idjournal' => $idjournal,
            //             'idaccount' => $idtaxmasukan,
            // //            'idtax' integer,
            //             'debit' => $r->tax,
            //             'credit' => 0,
            // //            'memo' character varying(225),
            //             'lastbalance' => $curBalance2,
            //             'currbalance' => $newBalance2
            //         );
            //         $this->db->insert('journalitem', $ditem2);
            //         //update saldo baru
            //         $this->m_account->saveNewBalance($idtaxmasukan, $newBalance2, $idunit);

            //         $this->m_account->saveAccountLog($idunit,$idtaxmasukan,0,$r->tax,$datejournal,$idjournal);
            //     }
            // } else {

            // }           
            //end pajak

        }

        $qtmpinserttax = $this->db->get_where('tmptax',array('idjournal'=>$idjournal));
        foreach ($qtmpinserttax->result() as $r) {
            // tambah pajak masukan
            $taxlink = $this->db->get_where('taxlinkunit',array('idunit'=>$idunit,'idtax'=>$r->idtax));
            if($taxlink->num_rows()>0)
            {
                $rtax = $taxlink->row();
                $idtaxmasukan = $rtax->acctaxpaid;
                if($idtaxmasukan==null)
                {

                } else {
                    //ambil balance sekarang
                    $curBalance2 = $this->m_account->getCurrBalance($idtaxmasukan, $idunit);
                    //itung saldo baru
                    $newBalance2 = $curBalance2 + $r->tax;
                    //insert
                    $ditem2 = array(
                        'idjournal' => $idjournal,
                        'idaccount' => $idtaxmasukan,
            //            'idtax' integer,
                        'debit' => $r->tax,
                        'credit' => 0,
            //            'memo' character varying(225),
                        'lastbalance' => $curBalance2,
                        'currbalance' => $newBalance2
                    );
                    $this->db->insert('journalitem', $ditem2);
                    //update saldo baru
                    $this->m_account->saveNewBalance($idtaxmasukan, $newBalance2, $idunit);

                    $this->m_account->saveAccountLog($idunit,$idtaxmasukan,0,$r->tax,$datejournal,$idjournal);
                }
            } else {

            }  
        }
    }

    function saveCashPurchase($idunit,$datejournal,$biayaangkut=0,$datagrid) {
        /* pembelian dengan tunai
         * (D)     Persediaan barang dagang     50.000
            (d) biaya angkut
          (K)         Bank/Kas        50.000
         */

        $tgl = explode("-", $datejournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 4,
            'nojournal' => $this->input->post('nojurnalPurchase'),
//                    name character varying(225),
            'datejournal' => $datejournal,
            'memo' => $this->input->post('memoPurchase'),
            'totaldebit' => $this->input->post('pembayaranPurchase'),
            'totalcredit' => $this->input->post('pembayaranPurchase'),
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
            'idcurrency' => $this->input->post('idcurrency')
        );

        $this->db->insert('journal', $d);

        //journal kas (debit) & uang muka pembelian

        //kas
        $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
        $curBalance = $this->m_account->getCurrBalance($idaccountkas, $idunit);
        $newBalance = $curBalance - $this->input->post('pembayaranPurchase');

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountkas,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $this->input->post('pembayaranPurchase'),
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountkas, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccountkas,$this->input->post('pembayaranPurchase'),0,$datejournal,$qseq->id);

        //Persediaan barang dagang/persediaan
        $this->insertJurnalPersediaan($datagrid,$qseq->id,$idunit,$datejournal);
       

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

            $this->m_account->saveAccountLog($idunit,$idaccountangkut,0,$biayaangkut,$datejournal,$qseq->id);
        }



        $this->db->where('idjournal',$qseq->id);
        $this->db->delete('tmppurchase');
        return $qseq->id;
    }

    function saveDebtPurchase($idunit,$datejournal,$biayaangkut=0,$datagrid) {
        /*
         * [Debit]. Persediaan
         ongkos (d)
          [Kredit]. Utang Dagang
         */

        $tgl = explode("-", $datejournal);

        $totalPurchase = clearnumberic($this->input->post('totalPurchase'));

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 4,
            'nojournal' => $this->input->post('nojurnalPurchase'),
//                    name character varying(225),
            'datejournal' => $datejournal,
            'memo' => $this->input->post('memoPurchase'),
            'totaldebit' => $totalPurchase,
            'totalcredit' => $totalPurchase,
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
            'idcurrency' => $this->input->post('idcurrency')
        );

        $this->db->insert('journal', $d);

        //Persediaan barang dagang/persediaan
        $this->insertJurnalPersediaan($datagrid,$qseq->id,$idunit,$datejournal);
        //cari balance
        
//         $idaccount = $this->input->post('idaccountPurchase');
//         $curBalance = $this->m_account->getCurrBalance($idaccount, $idunit);
//         //itung saldo baru
//         $newBalance = $curBalance + $totalPurchase-$biayaangkut;
//         //insert
//         $ditem2 = array(
//             'idjournal' => $qseq->id,
//             'idaccount' => $idaccount,
// //            'idtax' integer,
//             'debit' => $totalPurchase-$biayaangkut,
//             'credit' => 0,
// //            'memo' character varying(225),
//             'lastbalance' => $curBalance,
//             'currbalance' => $newBalance
//         );
//         $this->db->insert('journalitem', $ditem2);
//         //update saldo baru
//         $this->m_account->saveNewBalance($idaccount, $newBalance, $idunit);

//         $this->m_account->saveAccountLog($idunit,$idaccount,0,$totalPurchase-$biayaangkut,$datejournal,$qseq->id);

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

            $this->m_account->saveAccountLog($idunit,$idaccountangkut,0,$biayaangkut,$datejournal,$qseq->id);
        }

        //hutang
        $idaccountDebt = $this->m_data->getIdAccount(14, $idunit);
        $curBalanceDebt = $this->m_account->getCurrBalance($idaccountDebt, $idunit);
        $newBalanceDebt = $curBalanceDebt + $totalPurchase;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountDebt,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $totalPurchase,
//            'memo' character varying(225),
            'lastbalance' => $curBalanceDebt,
            'currbalance' => $newBalanceDebt
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountDebt, $newBalanceDebt, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccountDebt,$totalPurchase,0,$datejournal,$qseq->id);

        return $qseq->id;
    }

    function saveReceiveMoney($idunit, $accdebet, $dataGrid, $memo, $noref, $date, $amount,$taxReceive=0) {
        $amount = intval($amount);
        $tgl = explode("-", $date);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 6,
            'nojournal' => $noref,
//                    name character varying(225),
            'datejournal' => $date,
            'memo' => $memo,
            'totaldebit' => $amount,
            'totalcredit' => $amount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit
        );
        $this->db->insert('journal', $d);

        //debit
        $curBalanceD = $this->m_account->getCurrBalance($accdebet, $idunit);
//        echo $accdebet."+".$curBalanceD." + ".$amount;
        $newBalanceD = $curBalanceD + $amount;
        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $accdebet,
            'debit' => $amount,
            'credit' => 0,
            'lastbalance' => $curBalanceD,
            'currbalance' => $newBalanceD
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($accdebet, $newBalanceD, $idunit);

        $this->m_account->saveAccountLog($idunit,$accdebet,0,$amount,$date,$qseq->id);

        //credit   
        foreach ($dataGrid as $key => $value) {

            $curBalanceK = $this->m_account->getCurrBalance($value->idaccount, $idunit);
            $amount = isset($value->denda) ? $value->denda+$value->amount : $value->amount;

            $newBalanceK = $curBalanceK + $amount;
            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $value->idaccount,
                'debit' => 0,
                'credit' => $amount,
                'lastbalance' => $curBalanceK,
                'currbalance' => $newBalanceK
            );
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($value->idaccount, $newBalanceK, $idunit);

            $this->m_account->saveAccountLog($idunit,$value->idaccount,$amount,0,$date,$qseq->id);
        
//            $curBalanceD = $this->m_account->getCurrBalance($value->idaccount, $idunit);
//            $newBalanceD = $curBalanceD + $value->amount;
//
//            $ditem = array(
//                'idjournal' => $qseq->id,
//                'idaccount' => $value->idaccount,
//                'debit' => $value->amount,
//                'credit' => 0,
//                'lastbalance' => $curBalanceD,
//                'currbalance' => $newBalanceD
//            );
//
//            $this->db->insert('journalitem', $ditem);
//            $this->m_account->saveNewBalance($value->idaccount, $newBalanceD, $idunit);
        }

        if($taxReceive!=0){
            //pajak
            $idaccount = $this->m_data->getIdAccount(34, $idunit);
            $curBalanceK = $this->m_account->getCurrBalance($idaccount, $idunit);
            $newBalanceK = $curBalanceK + $taxReceive;
            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccount,
                'debit' => 0,
                'credit' => $taxReceive,
                'lastbalance' => $curBalanceK,
                'currbalance' => $newBalanceK
            );
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($idaccount, $newBalanceK, $idunit);
            $this->m_account->saveAccountLog($idunit,$idaccount,$taxReceive,0,$date,$qseq->id);
        }
      

        return $qseq->id;
    }

    function saveReceiveMoneySiswa($idunit, $accdebet, $dataGrid, $memo, $noref, $date, $amount) {
        $amount = intval($amount);
        $tgl = explode("-", $date);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 6,
            'nojournal' => $noref,
//                    name character varying(225),
            'datejournal' => $date,
            'memo' => $memo,
            'totaldebit' => $amount,
            'totalcredit' => $amount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit
        );
        $this->db->insert('journal', $d);

        //debit
        $curBalanceD = $this->m_account->getCurrBalance($accdebet, $idunit);
//        echo $accdebet."+".$curBalanceD." + ".$amount;
        $newBalanceD = $curBalanceD + $amount;
        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $accdebet,
            'debit' => $amount,
            'credit' => 0,
            'lastbalance' => $curBalanceD,
            'currbalance' => $newBalanceD
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($accdebet, $newBalanceD, $idunit);

        $this->m_account->saveAccountLog($idunit,$accdebet,0,$amount,$date,$qseq->id);

        //credit   
        foreach ($dataGrid as $key => $value) {

            $curBalanceK = $this->m_account->getCurrBalance($value->idaccount, $idunit);
            $newBalanceK = $curBalanceK + $value->amount;
            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $value->idaccount,
                'debit' => 0,
                'credit' => $value->amount,
                'lastbalance' => $curBalanceK,
                'currbalance' => $newBalanceK
            );
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($value->idaccount, $newBalanceK, $idunit);

            $this->m_account->saveAccountLog($idunit,$value->idaccount,$value->amount,0,$date,$qseq->id);
        }
      

        return $qseq->id;
    }

    function saveSpendMoney($idunit, $idaccountSpend, $dataGrid, $memo, $noref, $date, $subtotalSpend,$taxSpend=0) {
        $amount = intval($subtotalSpend);
        $tgl = explode("-", $date);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 7,
            'nojournal' => $noref,
//                    name character varying(225),
            'datejournal' => $date,
            'memo' => $memo,
            'totaldebit' => $amount,
            'totalcredit' => $amount,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit
        );
        $this->db->insert('journal', $d);

        //credit  / kas keluar 
        $curBalanceK = $this->m_account->getCurrBalance($idaccountSpend, $idunit);
        $newBalanceK = $curBalanceK - $amount;
        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountSpend,
            'debit' => 0,
            'credit' => $amount,
            'lastbalance' => $curBalanceK,
            'currbalance' => $newBalanceK
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountSpend, $newBalanceK, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccountSpend,$amount,0,$date,$qseq->id);

        //debit  
        foreach ($dataGrid as $key => $value) {

            $curBalanceD = $this->m_account->getCurrBalance($value->idaccount, $idunit);
            $newBalanceD = $curBalanceD + $value->amount;

            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $value->idaccount,
                'debit' => $value->amount,
                'credit' => 0,
                'lastbalance' => $curBalanceD,
                'currbalance' => $newBalanceD
            );

            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($value->idaccount, $newBalanceD, $idunit);

            $this->m_account->saveAccountLog($idunit,$value->idaccount,0,$value->amount,$date,$qseq->id);
        }

        if($taxSpend!=0){
            //pajak
            $idaccount = $this->m_data->getIdAccount(35, $idunit);
            $curBalanceK = $this->m_account->getCurrBalance($idaccount, $idunit);
            $newBalanceK = $curBalanceK + $taxSpend;
            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccount,
                'debit' => $taxSpend,
                'credit' => 0,
                'lastbalance' => $curBalanceK,
                'currbalance' => $newBalanceK
            );
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($idaccount, $newBalanceK, $idunit);
            $this->m_account->saveAccountLog($idunit,$idaccount,0,$taxSpend,$date,$qseq->id);
        }
      

        return $qseq->id;
    }
    
    function saveJournalReconcile($idunitReconcile,$idaccountReconcile,$dataGrid,$idreconcile,$datestatementReconcile){
        
         /*
         * terjadi pembuatan dua transaksi jurnal
         * 1. Journal biaya administrasi bank
         *      adm (debit)
         *         bank  (kredit)
         * 2. jurnal pendapatan bunga bank
         *      bunga (debit)
         *          bank (kredit)
         */
        $tgl = explode("-", $datestatementReconcile);
        
        foreach ($dataGrid as $key => $value) {
            if($value->expenseaccount!='')
            {
               // Journal biaya administrasi bank/beban
                $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

                $d = array(
                    'idjournal' => $qseq->id,
                    'idjournaltype' => 2,
                    'nojournal' => $value->noref,
                    'datejournal' => backdate2($value->date),
                    'memo' => $value->memo,
                    'totaldebit' => $value->withdraw,
                    'totalcredit' => $value->withdraw,
                    'year' => $tgl[0],
                    'month' => $tgl[1],
        //                    display integer,
                    'userin' => $this->session->userdata('username'),
                    'usermod' => $this->session->userdata('username'),
                    'datein' => date('Y-m-d H:m:s'),
                    'datemod' => date('Y-m-d H:m:s'),
                    'idunit' => $idunitReconcile,
                    'idreconcile'=>$idreconcile
                );
                $this->db->insert('journal', $d);

                //debit biaya administrasi bank
                $curBalanceD = $this->m_account->getCurrBalance($value->expenseaccount, $idunitReconcile);
                $newBalanceD = $curBalanceD + $value->withdraw;
                $ditem = array(
                    'idjournal' => $qseq->id,
                    'idaccount' => $value->expenseaccount,
                    'debit' => $value->withdraw,
                    'credit' => 0,
                    'lastbalance' => $curBalanceD,
                    'currbalance' => $newBalanceD
                );
                $this->db->insert('journalitem', $ditem);
                $this->m_account->saveNewBalance($value->expenseaccount, $newBalanceD, $idunitReconcile);

                $this->m_account->saveAccountLog($idunitReconcile,$value->expenseaccount,0,$value->withdraw,backdate2($value->date),$qseq->id);

                //credit  akun bank      
                $curBalanceK = $this->m_account->getCurrBalance($idaccountReconcile, $idunitReconcile);
                $newBalanceK = $curBalanceK - $value->withdraw;
                $ditem = array(
                    'idjournal' => $qseq->id,
                    'idaccount' => $idaccountReconcile,
                    'debit' => 0,
                    'credit' => $value->withdraw,
                    'lastbalance' => $curBalanceK,
                    'currbalance' => $newBalanceK
                );
                $this->db->insert('journalitem', $ditem);
                $this->m_account->saveNewBalance($idaccountReconcile, $newBalanceK, $idunitReconcile);

                $this->m_account->saveAccountLog($idunitReconcile,$idaccountReconcile,$value->withdraw,0,backdate2($value->date),$qseq->id);
                
                //end jurnal adminsitrasi bank
            } else if($value->incomeaccount!='')
                {
                        //income
                        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

                        $d = array(
                            'idjournal' => $qseq->id,
                            'idjournaltype' => 8, //pendapatan
                            'nojournal' => $value->noref,
                            'datejournal' => backdate2($value->date),
                            'memo' => $value->memo,
                            'totaldebit' => $value->deposit,
                            'totalcredit' => $value->deposit,
                            'year' => $tgl[0],
                            'month' => $tgl[1],
                //                    display integer,
                            'userin' => $this->session->userdata('username'),
                            'usermod' => $this->session->userdata('username'),
                            'datein' => date('Y-m-d H:m:s'),
                            'datemod' => date('Y-m-d H:m:s'),
                            'idunit' => $idunitReconcile,
                            'idreconcile'=>$idreconcile
                        );
                        $this->db->insert('journal', $d);

                        //debit akun bank
                        $curBalanceD = $this->m_account->getCurrBalance($idaccountReconcile, $idunitReconcile);
                        $newBalanceD = $curBalanceD + $value->deposit;
                        $ditem = array(
                            'idjournal' => $qseq->id,
                            'idaccount' => $idaccountReconcile,
                            'debit' => $value->deposit,
                            'credit' => 0,
                            'lastbalance' => $curBalanceD,
                            'currbalance' => $newBalanceD
                        );
                        $this->db->insert('journalitem', $ditem);
                        $this->m_account->saveNewBalance($idaccountReconcile, $newBalanceD, $idunitReconcile);

                        $this->m_account->saveAccountLog($idunitReconcile,$idaccountReconcile,0,$value->deposit,backdate2($value->date),$qseq->id);

                        //credit  akun bunga      
                        $curBalanceK = $this->m_account->getCurrBalance($value->incomeaccount, $idunitReconcile);
                        $newBalanceK = $curBalanceK + $value->deposit;
                        $ditem = array(
                            'idjournal' => $qseq->id,
                            'idaccount' => $value->incomeaccount,
                            'debit' => 0,
                            'credit' => $value->deposit,
                            'lastbalance' => $curBalanceK,
                            'currbalance' => $newBalanceK
                        );
                        $this->db->insert('journalitem', $ditem);
                        $this->m_account->saveNewBalance($value->incomeaccount, $newBalanceK, $idunitReconcile);

                        $this->m_account->saveAccountLog($idunitReconcile,$value->incomeaccount,$value->deposit,0,backdate2($value->date),$qseq->id);

                } //end jurnal bunga bank
        }
    }

    function saveRegistrasiPiutang($idunit,$idaccpiutang,$tglJournal,$jumlah,$accname,$idaccountlink)
    {
        //D: piutang
        //K: link piutang

        $tgl = explode("-", $tglJournal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 8,//pendapatan
            'nojournal' => $tglJournal.$qseq->id.'08',
//                    name character varying(225),
            'datejournal' => $tglJournal,
            // 'memo' => 'Registrasi Piutang '.$accname,
            'memo'=>$this->input->post('description')=='' ? $accname : null,
            'totaldebit' => $jumlah,
            'totalcredit' => $jumlah,
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

        //D: piutang
        $curBalance = $this->m_account->getCurrBalance($idaccpiutang, $idunit);
        $newBalance = $curBalance + $jumlah;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccpiutang,
//            'idtax' integer,
            'debit' => $jumlah,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccpiutang, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccpiutang,0,$jumlah,$tglJournal,$qseq->id);

        //K: link piutang
        // $qlink = $this->db->get_where('linkpiutang',array('idaccountpiutang'=>$idaccpiutang))->row();
        // $idaccount = $qlink->idaccount;

        $idaccount = $idaccountlink;
        $curBalance2 = $this->m_account->getCurrBalance($idaccount, $idunit);
        //itung saldo baru
        $newBalance2 = $curBalance2 + $jumlah;
        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccount,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $jumlah,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idaccount, $newBalance2, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccount,$jumlah,0,$tglJournal,$qseq->id);

        return $qseq->id;
    }

     function saveRegistrasiHutang($idunit,$memo,$idacchutang,$idacckenahutang,$mulaihutang,$jumlah)
    {
        //D: kena hutang
        //K: hutang

        $tgl = explode("-",$mulaihutang);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 9,//hutang
            'nojournal' => $tgl[0].$tgl[1].$tgl[2].$qseq->id.'09',
//                    name character varying(225),
            'datejournal' => $mulaihutang,
            'memo' =>  $memo,
            'totaldebit' => $jumlah,
            'totalcredit' => $jumlah,
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

        //D: akun kena hutang
        $curBalance = $this->m_account->getCurrBalance($idacckenahutang, $idunit);
        $newBalance = $curBalance + $jumlah;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacckenahutang,
//            'idtax' integer,
            'debit' => $jumlah,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacckenahutang, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idacckenahutang,0,$jumlah,$mulaihutang,$qseq->id);

        //K: hutang
        $curBalance2 = $this->m_account->getCurrBalance($idacchutang, $idunit);
        //itung saldo baru
        $newBalance2 = $curBalance2 + $jumlah;
        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacchutang,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $jumlah,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacchutang, $newBalance2, $idunit);

        $this->m_account->saveAccountLog($idunit,$idacchutang,$jumlah,0,$mulaihutang,$qseq->id);

        return $qseq->id;
    }

    function savePenutupanPengeluaran($tglclossing,$arrPengeluaran,$idunit,$idclossing)
    {
        // 2. Penutupan saldo beban
                // [D] Ikhtisar Laba/ Rugi
                // [K] Beban

        $tgl = explode("-", $tglclossing);

        // print_r($arrPengeluaran);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1, //umum
            'nojournal' => date('Ymd').'1'.$qseq->id,
//                    name character varying(225),
            'datejournal' => $tglclossing,
            'memo' => 'Penutupan Saldo Pengeluaran '.$tglclossing,
            'totaldebit' => $arrPengeluaran[0]['total']+$arrPengeluaran[1]['total'],
            'totalcredit' => $arrPengeluaran[0]['total']+$arrPengeluaran[1]['total'],
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
            'idclossing'=>$idclossing
        );
        $this->db->insert('journal', $d);

        // [D] Ikhtisar Laba/Rugi       
        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => 9090,
            'debit' => $arrPengeluaran[0]['total']+$arrPengeluaran[1]['total'],
            'credit' => 0,
            'lastbalance' => 0,
            'currbalance' => $arrPengeluaran[0]['total']+$arrPengeluaran[1]['total']
        );
        $this->db->insert('journalitem', $ditem);


        // [K] Pengeluaran
        $this->insertJournalItemPengeluaran($arrPengeluaran[0]['data'],$qseq->id);
        $this->insertJournalItemPengeluaran($arrPengeluaran[1]['data'],$qseq->id);
    }

    function insertJournalItemPengeluaran($data,$id) {
        if(is_array($data))
        {

            foreach ($data as $key => $value) {
               
                if(isset( $value['idaccount']))
                {
                // echo '<pre>';
                // print_r($value);
                // echo '</pre>';

                       

                        if ($value['child'] != 'false') {
                            $this->insertJournalItemRecPengeluaran($value['child'],$id);
                        } else {
                            // echo $value['idaccount'].':false';
                             $ditem = array(
                                'idjournal' => $id,
                                'idaccount' => $value['idaccount'],
                                'debit' => 0,
                                'credit' => $value['balance'],
                                'lastbalance' => 0,
                                'currbalance' => 0
                            );
                             // echo '<pre>';
                             // print_r($value);
                             // echo '</pre>';
                             // echo '<hr>';
                            $this->db->insert('journalitem', $ditem);
                        }
                    }
            }
        }
    }

    function insertJournalItemRecPengeluaran($data,$id)
    {
        $this->insertJournalItemPengeluaran($data,$id);
    }


    function savePenutupanPendapatan($tglclossing,$arrPendapatan,$idunit,$idclossing)
    {
        // Penutupan saldo pendapatan
        //         [D] Pendapatan
        //         [K] Ikhtisar Laba/Rugi

        $tgl = explode("-", $tglclossing);
        // print_r($arrPendapatan);
        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1, //umum
            'nojournal' => date('Ymd').'1'.$qseq->id,
//                    name character varying(225),
            'datejournal' => $tglclossing,
            'memo' => 'Penutupan Saldo Pendapatan '.$tglclossing,
            'totaldebit' => $arrPendapatan[0]['total']+$arrPendapatan[1]['total'],
            'totalcredit' => $arrPendapatan[0]['total']+$arrPendapatan[1]['total'],
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
            'idclossing'=>$idclossing
        );
        $this->db->insert('journal', $d);

        // [K] Ikhtisar Laba/Rugi
       
        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => 9090,
            'debit' => 0,
            'credit' => $arrPendapatan[0]['total']+$arrPendapatan[1]['total'],
            'lastbalance' => 0,
            'currbalance' => $arrPendapatan[0]['total']+$arrPendapatan[1]['total']
        );
        $this->db->insert('journalitem', $ditem);


        // [D] Pendapatan
        $this->insertJournalItem($arrPendapatan[0]['data'],$qseq->id);
        $this->insertJournalItem($arrPendapatan[1]['data'],$qseq->id);
    }

    function insertJournalItem($data,$id) {
        if(is_array($data))
        {

            foreach ($data as $key => $value) {
               
                if(isset( $value['idaccount']))
                {
                // echo '<pre>';
                // print_r($value);
                // echo '</pre>';
                        if ($value['child'] != 'false') {
                            $this->insertJournalItemRec($value['child'],$id);
                        } else {
                             $ditem = array(
                                'idjournal' => $id,
                                'idaccount' => $value['idaccount'],
                                'debit' => $value['balance'],
                                'credit' => 0,
                                'lastbalance' => 0,
                                'currbalance' => 0
                            );
                             // echo '<pre>';
                             // print_r($value);
                             // echo '</pre>';
                             // echo '<hr>';
                            $this->db->insert('journalitem', $ditem);
                            // echo $value['idaccount'].':false';
                        }
                }
            }
        }
    }

    function insertJournalItemRec($data,$id)
    {
        $this->insertJournalItem($data,$id);
    }

    function savePenutupanLabaRugi($tglclossing,$labarugi,$idunit,$tahunbulan,$idclossing)
    {
        // Penutupan ikhtisar laba/ rugi
        //         [D] Ikhtisar Laba/ Rugi
        //         [K] ModalModal ini dapat berupa laba tahun berjalan di mana nilainya berasal dari 
        //             profit/loss yang terbentuk dari laporan laba/rugi.

        $tgl = explode("-", $tglclossing);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();
        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1, //umum
            'nojournal' => date('Ymd').'01'.$qseq->id,
//                    name character varying(225),
            'datejournal' => $tglclossing,
            'memo' => 'Penutupan Ikhtisar Laba/Rugi '.backdate2($tglclossing),
            'totaldebit' => $labarugi,
            'totalcredit' => $labarugi,
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
            'idclossing'=>$idclossing
        );
        $this->db->insert('journal', $d);

         // [D] Ikhtisar Laba/ Rugi
         $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => 9090,
            'debit' => $labarugi,
            'credit' => 0,
            'lastbalance' => 0,
            'currbalance' => 0
        );
        $this->db->insert('journalitem', $ditem);

        $this->m_account->saveAccountLog($idunit,9090,0,$labarugi,$tglclossing,$qseq->id);

        // [K] ModalModal ini dapat berupa laba tahun berjalan di mana nilainya berasal dari 
        //             profit/loss yang terbentuk dari laporan laba/rugi.

         // Kalo clossing bulanan dipindahkan ke akun Laba Tahun Berjalan (Current Year Earnings)  dan 
         // clossing tahunan ke Laba Ditahan (Retained Earnings) pada akhir tahun

         //ambil account -> linkedaccunit
         if($tahunbulan=='tahun')
         {
            $idlinked = 3;
         } else {
            $idlinked = 4;
         }

        //masukin ke laba berjalan dulu
         $qlink = $this->db->get_where('linkedaccunit',array('idlinked'=>4,'idunit'=>$idunit));
         if($qlink->num_rows()>0)
         {
            $rr = $qlink->row();
            $idaccountLabaBerjalan = $rr->idaccount;
            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccountLabaBerjalan,
                'debit' => 0,
                'credit' => $labarugi,
                'lastbalance' => 0,
                'currbalance' => 0
            );
            // print_r($ditem);
            $this->db->insert('journalitem', $ditem);
            // echo 'rr->idaccount:'.$rr->idaccount;
            if($tahunbulan!='tahun')
            {
                $this->m_account->saveAccountLog($idunit,$idaccountLabaBerjalan,$labarugi,0,$tglclossing,$qseq->id);
            }

            //update balance
            $qacc = $this->db->get_where('account',array('idaccount'=>$rr->idaccount,'idunit'=>$idunit));
            if($qacc->num_rows()>0)
            {
                $racc = $qacc->row();
                $lababerjalan = $racc->balance+$labarugi;
                $this->db->where('idaccount',$idaccountLabaBerjalan); //laba berjalan
                $this->db->where('idunit',$idunit);
                $this->db->update('account',array('balance'=>$lababerjalan));

                //kalo tahunan kosongin balance laba berjalan
                if($idlinked==3)
                {
                     // Laba Tahun Berjalan ini harus dibalik ke akun Laba Ditahan
                    $qLinkLabaDitahan = $this->db->get_where('linkedaccunit',array('idlinked'=>3,'idunit'=>$idunit))->row();

                    // $qLinkLabaBerjalan = $this->db->get_where('linkedaccunit',array('idlinked'=>4,'idunit'=>$idunit))->row();
                    // $qLabaBerjalan = $this->db->get_where('account',array('idaccount'=>$idaccountLabaBerjalan,'idunit'=>$idunit))->row();
                    // echo $this->db->last_query().'           ';
                    // $lababerjalan = $qLabaBerjalan->balance;

                    //masukin ke laba ditahan
                    $this->db->where(array('idunit'=>$idunit,'idaccount'=>$qLinkLabaDitahan->idaccount));
                    $this->db->update('account',array('balance'=>$lababerjalan));
                    if($tahunbulan=='tahun')
                    {
                        $this->m_account->saveAccountLog($idunit,$qLinkLabaDitahan->idaccount,$lababerjalan,0,$tglclossing,$qseq->id);
                    }
                    // echo $this->db->last_query();

                    // $this->db->where(array('idaccount'=>$qLinkLabaBerjalan->idaccount,'idunit'=>$idunit));
                    // $this->db->update('account',array('balance'=>0));

                    //kalo tahunan kosongin balance laba berjalan
                    // $qlink = $this->db->get_where('linkedaccunit',array('idlinked'=>4,'idunit'=>$idunit));
                    // if($qlink->num_rows()>0)
                    // {
                    //     $rlink = $qlink->row();
                        $this->db->where('idaccount',$idaccountLabaBerjalan);
                        $this->db->where('idunit',$idunit);
                        $this->db->update('account',array('balance'=>0));
                    // }
                }
                
            }
         } else {

         }

         
    }

    function savePayroll($userid,$idunit,$date,$idaccountPayrollKas,$idaccountPayroll,$idjurnal)
    {
        // [d] beban gaji pegawai 
        // [k] kas 
        // [k] hutang pph21
        // [k] titipan potong premi karyawan - revisi: pindah ke kredit
        // [k] beban premi perusahaan 


        $tgl = explode("-", $date);
        $m = $tgl[1];
        $y = $tgl[0];

        $sql2 = "select sum(totalpembayaran) as totalpembayaran, sum(pphterhutang) as totalpph, 
                sum(totaltunjangan) as totaltunjangan, sum(totalpotongan) as totalpotongan,a.idemployeetype,premiinsurance
                from payrollproceed a
                join employeetype c ON a.idemployeetype = c.idemployeetype
                where a.month='$m' and a.year=$y
                GROUP BY a.idemployeetype,premiinsurance,c.idaccount";
                // echo $sql2.'<hr>';
        $rpaybytype = $this->db->query($sql2);
        $totalpembayaran=0;
        $totalpph=0;
        $totaltunjangan=0;
        $totalpremic=0;
        $totalpotongan=0;
        foreach ($rpaybytype->result() as $r) {
            $totalpembayaran+=$r->totalpembayaran;
            $totalpph+=$r->totalpph;
            $totaltunjangan+=$r->totaltunjangan;
            $totalpotongan+=$r->totalpotongan;
            // $totalpremic+=$r->totalpremic;
        }
// echo 'totalpph:'.$totalpph;
        // $premi = $this->db->query("select sum(amounte) as totalpremie,sum(amountc) as totalpremic,b.idemployeetype
        //                         from asuransipayhistory a
        //                         join employee b ON a.idemployee = b.idemployee
        //                          where a.month='$m' and a.year=$y
        //                         GROUP BY b.idemployeetype");
        // // echo $this->db->last_query().'<hr>';
        // $totalpremie=0;
        // $totalpremic=0;
        // foreach ($premi->result() as $r) {
        //      $totalpremie+=$r->totalpremie;
        //      $totalpremic+=$r->totalpremic;
        // }

        // // $totalbeban = $totalpembayaran + $totalpph + $totaltunjangan + $totalpremic + $totalpremie - $totalpotongan;
        // $totalbeban = $totalpembayaran + $totalpremic + $totalpremie + $totalpph;
        // echo $totalpembayaran." + ".$totalpremic." + ".$totalpremie." + ".$totalpph;
        // echo $totalbeban.'<hr>';
        // exit;


        // [d] beban gaji pegawai 
        foreach ($rpaybytype->result() as $r) {
            
            //get account kas dan beban payroll by idunit di employeetype
            // $qemployeetype = $this->db->get_where('employeetypeakunlink',array('idemployeetype'=>$r->idemployeetype,'idunit'=>$idunit))->row();

            // $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
            

            //start fetch premi
            $premidata = explode(":", $r->premiinsurance);
                    $amounte=0;
                    $amountc=0;
                    foreach ($premidata as $key => $value) {

                        $field = explode(",", $value);
                        // print_r($field);
                        //     exit;
                            if(isset($field[1]))
                            {
                                //     $dpremi = array(
                                //         "percente" => $field[2],
                                //         "percentc" => $field[3],
                                //         "amounte" => $field[4],
                                //         "amountc" => $field[5],
                                //         "userin" => $this->session->userdata('username'),
                                //         "datein" => date('Y-m-d H:m:s'),
                                //         "month" => $m,
                                //         "year" => $y,
                                //         "idasuransi" => $field[0],
                                //         "idemployee" => $r->idemployee
                                // );
                                    $amounte+=$field[4];
                                    $amountc+=$field[5];
                            }
                    }
            //end fetch premi

            // $totalbebanbytype = $r->totalpembayaran + $r->totalpph + $r->totaltunjangan + $amountc + $amounte;

            //PPH21 JADI KE DEBIT (bukan hutang)
            // $totalbebanbytype = $r->totalpembayaran + $r->totaltunjangan + $amountc + $amounte;
            // $totalbebanbytype = $r->totalpembayaran - $totalpph + $amountc + $amounte;
            
            $curBalance = $this->m_account->getCurrBalance($idaccountPayroll, $idunit);

            //cek dulu
            $arrWer = array('idjournal'=>$idjurnal,'idaccount'=>$idaccountPayroll);
            $qcekjurnal = $this->db->get_where('journalitem',$arrWer);
            if($qcekjurnal->num_rows()>0)
            {
                $rcekjurnal = $qcekjurnal->row();
 
                // $totalbebanbytype = $r->totalpembayaran + $totalpremic + $totalpremie;
                $totalbebanbytype = $r->totalpembayaran + $amounte +$amountc + $rcekjurnal->debit + $r->totalpph; //hutang akun titipan premi karyawan di taro di akun pembayaran karyawan

                $newBalance = $curBalance + $totalbebanbytype;             

                $ditem = array(
                    'idjournal' => $idjurnal,
                    'idaccount' => $idaccountPayroll,
        //            'idtax' integer,
                    'debit' => $totalbebanbytype,
                    'credit' => 0,
        //            'memo' character varying(225),
                    'lastbalance' => $curBalance,
                    'currbalance' => $newBalance
                );
                // print_r($ditem);
                $this->db->where($arrWer);
                $this->db->update('journalitem', $ditem);
                // echo $this->db->last_query().'           ';
                $this->m_account->saveNewBalance($idaccountPayroll, $newBalance, $idunit);

                $this->m_account->saveAccountLog($idunit,$idaccountPayroll,0,$totalbebanbytype,$date,$idjurnal);


            } else {
                 // $totalbebanbytype = $r->totalpembayaran + $totalpremic + $totalpremie; //hutang akun titipan premi karyawan di taro di akun pembayaran karyawan
                $totalbebanbytype = $r->totalpembayaran + $amounte+$amountc + $r->totalpph; //hutang akun titipan premi karyawan di taro di akun pembayaran karyawan

                $newBalance = $curBalance + $totalbebanbytype;           

                $ditem = array(
                    'idjournal' => $idjurnal,
                    'idaccount' => $idaccountPayroll,
        //            'idtax' integer,
                    'debit' => $totalbebanbytype,
                    'credit' => 0,
        //            'memo' character varying(225),
                    'lastbalance' => $curBalance,
                    'currbalance' => $newBalance
                );
                // print_r($ditem);

                $this->db->insert('journalitem', $ditem);
                // echo $this->db->last_query().'           ';
                $this->m_account->saveNewBalance($idaccountPayroll, $newBalance, $idunit);

                $this->m_account->saveAccountLog($idunit,$idaccountPayroll,0,$totalbebanbytype,$date,$idjurnal);
            }
           
        }
// exit;
        //[k] pph21
        $idaccountpph = $this->m_data->getIdAccount(22,$idunit); //link pph21
        $curBalance2 = $this->m_account->getCurrBalance($idaccountpph, $idunit);
        $newBalance2 = $curBalance2 + $totalpph;

        $ditem2 = array(
            'idjournal' => $idjurnal,
            'idaccount' => $idaccountpph,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $totalpph,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        // print_r($ditem2);
        // exit;
        $this->db->insert('journalitem', $ditem2);
        $this->m_account->saveNewBalance($idaccountpph, $newBalance2, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccountpph,0,$totalpph,$date,$idjurnal);

        // [k] kas 
        foreach ($rpaybytype->result() as $r) {
             //get account kas dan beban payroll by idunit di employeetype
            // $qemployeetype = $this->db->get_where('employeetypeakunlink',array('idemployeetype'=>$r->idemployeetype,'idunit'=>$idunit))->row();
            // echo $this->db->last_query();

            // $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
            // echo $r->premiinsurance;
            // $asuransi = explode(',', $r->premiinsurance);
            // if($asuransi[0]==0)
            // {
            //     $asuransinum = 0;
            // } else {
            //     $asuransinum = $asuransi[5];
            // }
             //start fetch premi
            $premidata = explode(":", $r->premiinsurance);
                    $amounte=0;
                    $amountc=0;
                    foreach ($premidata as $key => $value) {

                        $field = explode(",", $value);
                        // print_r($field);
                        //     exit;
                            if(isset($field[1]))
                            {
                                //     $dpremi = array(
                                //         "percente" => $field[2],
                                //         "percentc" => $field[3],
                                //         "amounte" => $field[4],
                                //         "amountc" => $field[5],
                                //         "userin" => $this->session->userdata('username'),
                                //         "datein" => date('Y-m-d H:m:s'),
                                //         "month" => $m,
                                //         "year" => $y,
                                //         "idasuransi" => $field[0],
                                //         "idemployee" => $r->idemployee
                                // );
                                    $amounte+=$field[4];
                                    $amountc+=$field[5];
                            }
                    }
            //end fetch premi

            //cek dulu
            $arrWer = array('idjournal'=>$idjurnal,'idaccount'=>$idaccountPayrollKas);
            $qcekjurnal = $this->db->get_where('journalitem',$arrWer);
            if($qcekjurnal->num_rows()>0)
            {
                $rcekjurnal = $qcekjurnal->row();

                $totalpembayaran = $r->totalpembayaran+ $amounte+$amountc + $rcekjurnal->credit;
                // $totalpembayaran = $r->totalpembayaran+$r->totalpph+$asuransinum + $rcekjurnal->credit;

                $curBalance = $this->m_account->getCurrBalance($idaccountPayrollKas, $idunit);
                $newBalance = $curBalance - $totalpembayaran;

                $ditem = array(
                    'idjournal' => $idjurnal,
                    'idaccount' => $idaccountPayrollKas,
        //            'idtax' integer,
                    'debit' => 0,
                    'credit' => $totalpembayaran,
        //            'memo' character varying(225),
                    'lastbalance' => $curBalance,
                    'currbalance' => $newBalance
                );
                // print_r($ditem);
                $this->db->where($arrWer);
                $this->db->update('journalitem', $ditem);
                // echo $this->db->last_query().'           ';
                $this->m_account->saveNewBalance($idaccountPayrollKas, $newBalance, $idunit);

                $this->m_account->saveAccountLog($idunit,$idaccountPayrollKas,$totalpembayaran,0,$date,$idjurnal);
            } else {
                $totalpembayaran = $r->totalpembayaran+$amounte+$amountc;
                // $totalpembayaran = $r->totalpembayaran+$r->totalpph+$asuransinum;

                $curBalance = $this->m_account->getCurrBalance($idaccountPayrollKas, $idunit);
                $newBalance = $curBalance - $totalpembayaran;

                $ditem = array(
                    'idjournal' => $idjurnal,
                    'idaccount' => $idaccountPayrollKas,
        //            'idtax' integer,
                    'debit' => 0,
                    'credit' => $totalpembayaran,
        //            'memo' character varying(225),
                    'lastbalance' => $curBalance,
                    'currbalance' => $newBalance
                );
                // print_r($ditem);
                $this->db->insert('journalitem', $ditem);
                // echo $this->db->last_query().'           ';
                $this->m_account->saveNewBalance($idaccountPayrollKas, $newBalance, $idunit);

                $this->m_account->saveAccountLog($idunit,$idaccountPayrollKas,$totalpembayaran,0,$date,$idjurnal);
            }
            
        }

        $this->db->where('idjournal',$idjurnal);
        $this->db->update('journal',array(
            'totaldebit' => $totalbebanbytype,
            'totalcredit' => $totalpembayaran+$totalpph));

// exit;
        // [k] hutang pph21
//         $idaccountpph = $this->m_data->getIdAccount(22,$idunit); //link pph21
//         $curBalance2 = $this->m_account->getCurrBalance($idaccountpph, $idunit);
//         $newBalance2 = $curBalance2 + $totalpph;

//         $ditem2 = array(
//             'idjournal' => $qseq->id,
//             'idaccount' => $idaccountpph,
// //            'idtax' integer,
//             'debit' => 0,
//             'credit' => $totalpph,
// //            'memo' character varying(225),
//             'lastbalance' => $curBalance2,
//             'currbalance' => $newBalance2
//         );
//         // print_r($ditem2);
//         // exit;
//         $this->db->insert('journalitem', $ditem2);
//         $this->m_account->saveNewBalance($idaccountpph, $newBalance2, $idunit);

//         $this->m_account->saveAccountLog($idunit,$idaccountpph,$totalpph,0,$date,$qseq->id);
        // [k] hutang pph21
       
       

        return $idjurnal;

    }

    function saveTitipanPremiPayroll($idjournal,$idunit,$date)
    {
        $tgl = explode("-", $date);
        $m = $tgl[1];
        $y = $tgl[2];

         // [k] titipan potong premi karyawan
        $QpremiE = $this->db->query("select sum(a.amounte) as amounte,a.month,a.year,b.idaccountemp,b.idasuransi
                                        from asuransipayhistory a
                                        join employee c ON a.idemployee = c.idemployee
                                        join (select distinct idaccountemp,idasuransi,idunit from asuransiunit) b ON a.idasuransi = b.idasuransi and c.idunit = b.idunit
                                        where a.month='$m' and a.year=$y
                                        GROUP BY a.month,a.year,b.idaccountemp,b.idasuransi");
// echo $this->db->last_query().'       ';
        if($QpremiE->num_rows()>0)
        {
            $rpremiE = $QpremiE->row();
             // echo '--'.$QpremiE->num_rows();
            $curBalance2 = $this->m_account->getCurrBalance($rpremiE->idaccountemp, $idunit);
            $newBalance2 = $curBalance2 + $rpremiE->amounte;

            $ditem2 = array(
                'idjournal' => $idjournal,
                'idaccount' => $rpremiE->idaccountemp,
    //            'idtax' integer,
                'debit' => 0,
                'credit' => $rpremiE->amounte,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance2,
                'currbalance' => $newBalance2
            );
        //     print_r($ditem2);
        // exit;
            $this->db->insert('journalitem', $ditem2);
            $this->m_account->saveNewBalance($rpremiE->idaccountemp, $newBalance2, $idunit);
            // echo $this->db->last_query().'                      ';
            $this->m_account->saveAccountLog($idunit,$rpremiE->idaccountemp,$rpremiE->amounte,0,$date,$idjournal);
            // if($rpremiE->idaccountemp!=null || $rpremiE->idaccountemp!='')
            // {
            //     $this->m_account->saveAccountLog($idunit,$rpremiE->idaccountemp,$rpremiE->amounte,0,$date,$idjournal);
            // }

        }
        

    //     // [k] beban premi perusahaan 
    //     $QpremiC = $this->db->query("select sum(a.amountc) as amountc,a.month,a.year,b.idaccountcomp
    //                     from asuransipayhistory a
    //                     join employee c ON a.idemployee = c.idemployee
    //                     join (select distinct idaccountcomp,idasuransi,idunit from asuransiunit) b ON a.idasuransi = b.idasuransi and c.idunit = b.idunit
    //                     where a.month='$m' and a.year=$y
    //                     GROUP BY a.month,a.year,b.idaccountcomp,b.idasuransi");
    //     // echo $this->db->last_query().'       ';
    //     if($QpremiC->num_rows()>0)
    //     {
    //         $rpremiC = $QpremiC->row();

    //         $curBalance2 = $this->m_account->getCurrBalance($rpremiC->idaccountcomp, $idunit);
    //         $newBalance2 = $curBalance2 + $rpremiC->amountc;

    //         $ditem2 = array(
    //             'idjournal' => $idjournal,
    //             'idaccount' => $rpremiC->idaccountcomp,
    // //            'idtax' integer,
    //             'debit' => $rpremiC->amountc,
    //             'credit' => 0,
    // //            'memo' character varying(225),
    //             'lastbalance' => $curBalance2,
    //             'currbalance' => $newBalance2
    //         );
    //         $this->db->insert('journalitem', $ditem2);
    //         $this->m_account->saveNewBalance($rpremiC->idaccountcomp, $newBalance2, $idunit);
    //          $this->m_account->saveAccountLog($idunit,$rpremiC->idaccountcomp,0,$rpremiC->amountc,$date,$idjournal);
    //         // echo $this->db->last_query().'                      ';
    //         // if($rpremiC->idaccountcomp!=null || $rpremiC->idaccountcomp!='')
    //         // {
    //         //     $this->m_account->saveAccountLog($idunit,$rpremiC->idaccountcomp,0,$rpremiC->amountc,$date,$idjournal);
    //         // }
    //     }
    }

    function saveTitipanPremiPayrollPerusahaan($idjournal,$idunit,$date)
    {
        $tgl = explode("-", $date);
        $m = $tgl[1];
        $y = $tgl[2];

       

        // [d] beban premi perusahaan 
        $QpremiC = $this->db->query("select sum(a.amountc) as amountc,a.month,a.year,b.idaccountcomp
                        from asuransipayhistory a
                        join employee c ON a.idemployee = c.idemployee
                        join (select distinct idaccountcomp,idasuransi,idunit from asuransiunit) b ON a.idasuransi = b.idasuransi and c.idunit = b.idunit
                        where a.month='$m' and a.year=$y
                        GROUP BY a.month,a.year,b.idaccountcomp,b.idasuransi");
        // echo $this->db->last_query().'       ';
        if($QpremiC->num_rows()>0)
        {
            $rpremiC = $QpremiC->row();

            $curBalance2 = $this->m_account->getCurrBalance($rpremiC->idaccountcomp, $idunit);
            $newBalance2 = $curBalance2 + $rpremiC->amountc;

            $ditem2 = array(
                'idjournal' => $idjournal,
                'idaccount' => $rpremiC->idaccountcomp,
    //            'idtax' integer,
                'debit' => $rpremiC->amountc,
                'credit' => 0,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance2,
                'currbalance' => $newBalance2
            );
            $this->db->insert('journalitem', $ditem2);
            $this->m_account->saveNewBalance($rpremiC->idaccountcomp, $newBalance2, $idunit);
             $this->m_account->saveAccountLog($idunit,$rpremiC->idaccountcomp,0,$rpremiC->amountc,$date,$idjournal);
            // echo $this->db->last_query().'                      ';
            // if($rpremiC->idaccountcomp!=null || $rpremiC->idaccountcomp!='')
            // {
            //     $this->m_account->saveAccountLog($idunit,$rpremiC->idaccountcomp,0,$rpremiC->amountc,$date,$idjournal);
            // }
        }
    }

     // //masukkan akun pph               
    function savePPH21($userid,$idunit)
    {

    }

    //masukan beban penggajian berdasarkan jenisnya
    function saveBebanGajiByType($userid,$idunit)
    {

    }

    //masukan premi karyawan dan beban premi perusahaan
    function saveBebanPremi($userid,$idunit)
    {

    }

    function saveThr($periode,$totalthr,$userid,$idunit,$idaccountpaythrSetup,$idaccountthrSetup)
    {
        $periodeArr = explode("-", $periode);

        $m = $periodeArr[1];
        $y = $periodeArr[2];
        $d = $periodeArr[0];

        //beban thr (d)
        //kas keluar (k)

        $qbeban = $this->db->query("select sum(totalthr) as totalthr
                    from thrlist a
                    join employee b ON a.idemployee = b.idemployee
                    join employeetype c ON b.idemployeetype = c.idemployeetype
                    where a.month='$m' and a.year=$y and a.userid=$userid");
        // echo $this->db->last_query();
        $rbeban = $qbeban->row();
        $totalbeban=$rbeban->totalthr;

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 7, //kaskeluar
            'nojournal' => date('Ymd').'07'.$qseq->id,
//                    name character varying(225),
            'datejournal' => $periode,
            'memo' => 'Pembayaran THR '.$periode,
            'totaldebit' => $totalbeban,
            'totalcredit' => $totalbeban,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $y,
            'month' => $m,
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunit
        );

        $this->db->insert('journal', $d);

        //beban
        $sql = "select sum(totalthr) as totalthr
                from thrlist a
                join employee b ON a.idemployee = b.idemployee
                join employeetype c ON b.idemployeetype = c.idemployeetype
                where a.month='$m' and a.year=$y and a.userid=$userid";
                // echo $sql;
        $q = $this->db->query($sql);
        foreach ($q->result() as $r) {
            // $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
            $curBalance = $this->m_account->getCurrBalance($idaccountthrSetup, $idunit);
            $newBalance = $curBalance + $r->totalthr;

            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccountthrSetup,
    //            'idtax' integer,
                'debit' => $r->totalthr,
                'credit' => 0,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance,
                'currbalance' => $newBalance
            );
            // print_r($ditem);
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($idaccountthrSetup, $newBalance, $idunit);

            $this->m_account->saveAccountLog($idunit,$idaccountthrSetup,0,$r->totalthr,$periode,$qseq->id);
        }

        //kas/bank
        $sql = "select sum(totalthr) as totalthr
                from thrlist a
                join employee b ON a.idemployee = b.idemployee
                join employeetype c ON b.idemployeetype = c.idemployeetype
                where a.month='$m' and a.year=$y and a.userid=$userid";
        $q = $this->db->query($sql);
        foreach ($q->result() as $r) {
            // $idaccountkas = $this->m_data->getIdAccount(15, $idunit);
            $curBalance = $this->m_account->getCurrBalance($idaccountpaythrSetup, $idunit);
            $newBalance = $curBalance - $r->totalthr;

            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $idaccountpaythrSetup,
    //            'idtax' integer,
                'debit' => 0,
                'credit' => $r->totalthr,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance,
                'currbalance' => $newBalance
            );
            // print_r($ditem);
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($idaccountpaythrSetup, $newBalance, $idunit);

            $this->m_account->saveAccountLog($idunit,$idaccountpaythrSetup,$r->totalthr,0,$periode,$qseq->id);
        }

        return $qseq->id;
    }

    function savePenerimaanPiutang($idunit,$tglpenerimaan,$jumlah,$memo,$idaccpiutang,$idacckas)
    {
        // jurnal penerimaan piutang
        //kas (d) piutang (k)
        $tgl = explode("-",$tglpenerimaan);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 10,//piutang
            'nojournal' => $tglpenerimaan.$qseq->id.'10',
//                    name character varying(225),
            'datejournal' => $tglpenerimaan,
            'memo' =>  $memo,
            'totaldebit' => $jumlah,
            'totalcredit' => $jumlah,
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

        //D: kas
        $curBalance = $this->m_account->getCurrBalance($idacckas, $idunit);
        $newBalance = $curBalance + $jumlah;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacckas,
//            'idtax' integer,
            'debit' => $jumlah,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacckas, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idacckas,0,$jumlah,$tglpenerimaan,$qseq->id);

        //K: piutang
        $curBalance2 = $this->m_account->getCurrBalance($idaccpiutang, $idunit);
        // echo "idaccpiutang:".$idaccpiutang;
        // echo "curBalance2:".$curBalance2.' ';
        // echo "jumlah:".$jumlah.' ';
        //itung saldo baru
        $newBalance2 = $curBalance2 - $jumlah;
        // echo "newBalance2:".$newBalance2.' ';
        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccpiutang,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $jumlah,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idaccpiutang, $newBalance2, $idunit);

        $this->m_account->saveAccountLog($idunit,$idaccpiutang,$jumlah,0,$tglpenerimaan,$qseq->id);

        return $qseq->id;
    }

    function saveReturBeli($idunitReturn,$idaccountReturn,$notransReturn,$tanggalReturn,$totalReturn,$memoReturn,$idinventory)
    {
        //Hutang Dagang           
            //Persediaan Barang 

        $tgl = explode("-",$tanggalReturn);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1,//umum
            'nojournal' => $notransReturn,
//                    name character varying(225),
            'datejournal' => $tanggalReturn,
            'memo' =>  $memoReturn,
            'totaldebit' => $totalReturn,
            'totalcredit' => $totalReturn,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunitReturn,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d);

        //D: Hutang Dagang  
        $curBalance = $this->m_account->getCurrBalance($idaccountReturn, $idunitReturn);
        $newBalance = $curBalance - $totalReturn;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountReturn,
//            'idtax' integer,
            'debit' => $totalReturn,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountReturn, $newBalance, $idunitReturn);

        $this->m_account->saveAccountLog($idunitReturn,$idaccountReturn,0,$totalReturn,$tanggalReturn,$qseq->id);

        //K: Persediaan Barang 
        $curBalance2 = $this->m_account->getCurrBalance($idinventory, $idunitReturn);
        $newBalance2 = $curBalance2 - $totalReturn;

        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idinventory,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $totalReturn,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idinventory, $newBalance2, $idunitReturn);

        $this->m_account->saveAccountLog($idunitReturn,$idinventory,$totalReturn,0,$tanggalReturn,$qseq->id);

        return $qseq->id;
    }

    function saveReturBeliLunas($idunitReturn,$idaccountReturn,$notransReturn,$tanggalReturn,$totalReturn,$memoReturn,$idinventory)
    {
        //KAS          
            //Persediaan Barang 

        $tgl = explode("-",$tanggalReturn);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1,//umum
            'nojournal' => $notransReturn,
//                    name character varying(225),
            'datejournal' => $tanggalReturn,
            'memo' =>  $memoReturn,
            'totaldebit' => $totalReturn,
            'totalcredit' => $totalReturn,
//                    'totaltax' double precision,
//                    isrecuring boolean,
            'year' => $tgl[0],
            'month' => $tgl[1],
//                    display integer,
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $idunitReturn,
            'idcurrency' => null
        );

        $this->db->insert('journal', $d);

        //D: KAS
        $idaccountKas = $this->m_data->getIdAccount(15, $idunitReturn);
        $curBalance = $this->m_account->getCurrBalance($idaccountKas, $idunitReturn);
        $newBalance = $curBalance + $totalReturn;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountKas,
//            'idtax' integer,
            'debit' => $totalReturn,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountKas, $newBalance, $idunitReturn);

        $this->m_account->saveAccountLog($idunitReturn,$idaccountKas,0,$totalReturn,$tanggalReturn,$qseq->id);

        //K: Persediaan Barang 
        $curBalance2 = $this->m_account->getCurrBalance($idinventory, $idunitReturn);
        $newBalance2 = $curBalance2 - $totalReturn;

        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idinventory,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $totalReturn,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idinventory, $newBalance2, $idunitReturn);

        $this->m_account->saveAccountLog($idunitReturn,$idinventory,$totalReturn,0,$tanggalReturn,$qseq->id);

        return $qseq->id;
    }

    function savePembayaranHutang($date,$amount,$idunit,$memo,$idacckas,$idacchutang)
    {
        //kas (k)
        //beban (d)
        $tgl = explode("-",$date);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 2,//pembayaran
            'nojournal' => $date.$qseq->id.'2',
//                    name character varying(225),
            'datejournal' => $date,
            'memo' =>  $memo,
            'totaldebit' => $amount,
            'totalcredit' => $amount,
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

        //K: kas
        $curBalance = $this->m_account->getCurrBalance($idacckas, $idunit);
        $newBalance = $curBalance - $amount;

        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacckas,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $amount,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idacckas, $newBalance, $idunit);

        $this->m_account->saveAccountLog($idunit,$idacckas,$amount,0,$date,$qseq->id);

        //d: beban hutang
        $curBalance2 = $this->m_account->getCurrBalance($idacchutang, $idunit);
        //itung saldo baru
        $newBalance2 = $curBalance2 - $amount;
        //insert
        $ditem2 = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idacchutang,
//            'idtax' integer,
            'debit' => $amount,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance2,
            'currbalance' => $newBalance2
        );
        $this->db->insert('journalitem', $ditem2);
        //update saldo baru
        $this->m_account->saveNewBalance($idacchutang, $newBalance2, $idunit);

        $this->m_account->saveAccountLog($idunit,$idacchutang,0,$amount,$date,$qseq->id);

        return $qseq->id;
    }

    function saveTransferKas($idunit,$idaccountsumber,$idaccounttujuan,$nominal,$tanggal)
    {
         //sumber (k)
        //tujuan (d)
        $tgl = explode("-",$tanggal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1,//umum
            'nojournal' => 'TRANS'.$qseq->id.'01',
//                    name character varying(225),
            'datejournal' => $tanggal,
            'memo' =>  'Transfer Antar Kas',
            'totaldebit' => $nominal,
            'totalcredit' => $nominal,
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

        //K: kas sumber
        $curBalance = $this->m_account->getCurrBalance($idaccountsumber, $idunit);
        $newBalance = $curBalance - $nominal;
        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccountsumber,
//            'idtax' integer,
            'debit' => 0,
            'credit' => $nominal,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccountsumber, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idaccountsumber,$nominal,0,$tanggal,$qseq->id);

        //d: kas tujuan
        $curBalance = $this->m_account->getCurrBalance($idaccounttujuan, $idunit);
        $newBalance = $curBalance + $nominal;
        $ditem = array(
            'idjournal' => $qseq->id,
            'idaccount' => $idaccounttujuan,
//            'idtax' integer,
            'debit' => $nominal,
            'credit' => 0,
//            'memo' character varying(225),
            'lastbalance' => $curBalance,
            'currbalance' => $newBalance
        );
        $this->db->insert('journalitem', $ditem);
        $this->m_account->saveNewBalance($idaccounttujuan, $newBalance, $idunit);
        $this->m_account->saveAccountLog($idunit,$idaccounttujuan,0,$nominal,$tanggal,$qseq->id);

        return $qseq->id;
    }

    function savePenyusutan($idunit,$iddepreciation,$tanggal,$idclossing)
    {
        $tgl = explode("-",$tanggal);

        $qseq = $this->db->query("select nextval('seq_journal') as id")->row();

        $d = array(
            'idjournal' => $qseq->id,
            'idjournaltype' => 1,//umum
            'nojournal' => 'DEP'.$qseq->id.'01',
//                    name character varying(225),
            'datejournal' => $tanggal,
            'memo' =>  'Penyusutan '.$tanggal,
            // 'totaldebit' => $nominal,
            // 'totalcredit' => $nominal,
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
            'idcurrency' => null,
            'idclossing'=>$idclossing
        );

        $this->db->insert('journal', $d);

        //D: akumulasi
        $totalakumulasi=0;
        $q = $this->db->query("select akumpenyusutaccount,sum(bebanperbulan) as beban
                                from tmpdepresiasi
                                where iddepreciation=$iddepreciation
                                GROUP BY akumpenyusutaccount");
        foreach ($q->result() as $r) {
            $curBalance = $this->m_account->getCurrBalance($r->akumpenyusutaccount, $idunit);
            $newBalance = $curBalance + $r->beban;
            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $r->akumpenyusutaccount,
    //            'idtax' integer,
                'debit' => 0,
                'credit' => $r->beban,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance,
                'currbalance' => $newBalance
            );
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($r->akumpenyusutaccount, $newBalance, $idunit);
            // echo " D: akumulasi ".$idunit.",".$r->akumpenyusutaccount;
            $this->m_account->saveAccountLog($idunit,$r->akumpenyusutaccount,$r->beban,0,$tanggal,$qseq->id);
            
            $totalakumulasi+= $r->beban;
        }
       

        //K: beban penyusutan
        $totalbeban=0;
        $q = $this->db->query("select depresiasi,sum(bebanperbulan) as beban
                            from tmpdepresiasi
                            where iddepreciation=$iddepreciation
                            GROUP BY depresiasi");
        foreach ($q->result() as $r) {
            $curBalance = $this->m_account->getCurrBalance($r->depresiasi, $idunit);
            $newBalance = $curBalance + $r->beban;
            $ditem = array(
                'idjournal' => $qseq->id,
                'idaccount' => $r->depresiasi,
    //            'idtax' integer,
                'debit' => $r->beban,
                'credit' => 0,
    //            'memo' character varying(225),
                'lastbalance' => $curBalance,
                'currbalance' => $newBalance
            );
            $this->db->insert('journalitem', $ditem);
            $this->m_account->saveNewBalance($r->depresiasi, $newBalance, $idunit);
            // echo " K: beban penyusutan ".$idunit.",".$r->depresiasi;
            $this->m_account->saveAccountLog($idunit,$r->depresiasi,0,$r->beban,$tanggal,$qseq->id);

            $totalbeban+= $r->beban;
        }

        $this->db->where('idjournal',$qseq->id);
        $this->db->update('journal',array('totaldebit'=>$totalakumulasi,'totalcredit'=>$totalbeban));
        return $qseq->id;
    }

    function create_invoice_purchase($date_po,$memo,$totalAmount,$idunit,$idaccount_coa_hutang,$idaccount_coa_pajakmasuk,$total_pajak){
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

}
