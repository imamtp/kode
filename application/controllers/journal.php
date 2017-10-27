<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class journal extends MY_Controller {

    public function index() {
        
    }

    function saveJournalRec()
    {
        $totalcredit = str_replace(",", "", str_replace(".", "", $this->input->post('totalcredit')));
        $totaldebit = str_replace(",", "", str_replace(".", "", $this->input->post('totaldebit')));
//        $totalpajak = str_replace(",", "", str_replace(".", "", $this->input->post('totalpajak')));
        $memojurnal = $this->input->post('memojurnal');
//        $nojurnal = $this->input->post('nojurnal');
//        $tanggaljurnal = str_replace('T00:00:00', '', $this->input->post('tanggaljurnal'));
//        $arrTgl = explode('-', $tanggaljurnal);
        $datagrid = json_decode($this->input->post('datagrid'));
        $idjournalrec = $this->input->post('idjournalrec');
        
        if($this->input->post('penjadwalan')=='true')
        {
            //Terus Menerus
            $startdate = str_replace("T00:00:00", "", $this->input->post('startdate'));
            $recuntildate = str_replace("T00:00:00", "", $this->input->post('recuntildate'));   
            $idfrequency = $this->m_data->getID('frequency', 'namefreq', 'idfrequency', $this->input->post('namefreq'));
            $recnumtimes = null;
            $idscheduletype = 1;
        } else {
            //Jalankan sampai #
            $startdate = null;
            $recuntildate = null;   
            $idfrequency = null;
            $recnumtimes = $this->input->post('recnumtimes');
            $idscheduletype = 2;
        }
        
        if($this->input->post('pemberitahuan')=='true')
        {
            //Ingatkan kepada
            $notifto=$this->m_data->getID('sys_user', 'realname', 'user_id', $this->input->post('notifto'));
            $alertto=null;
            $idalerttype = 1;
        } else {
            //Jalankan transaksi jurnal ini secara otomatis dan beritahukan kepada
            $notifto=null;
            $alertto=$this->m_data->getID('sys_user', 'realname', 'user_id', $this->input->post('alertto'));
            $idalerttype = 2;
        }
        
        $this->db->trans_begin();
        
        if($idjournalrec=='')
        {
            $qseq = $this->db->query("select nextval('seq_journal') as idjournal")->row();
            $id = $qseq->idjournal;
        } else {
            $id = $idjournalrec;
        }
        
        
        $d = array(
            'idjournalrec'=>$id,
            'idfrequency' => $idfrequency,
            'idscheduletype' => $idscheduletype,
            'idalerttype' => $idalerttype,
            'isrecuring'=> 'TRUE',
            'startdate' => $startdate,
            'recuntildate' => $recuntildate,
            'recnumtimes' => $recnumtimes,
            'alertto' => $alertto,
            'notifto' => $notifto,
//            'idjournalrec' => $qseq->idjournal,
//            'nojournal' => $nojurnal,
//            'datejournal' => $tanggaljurnal,
            'memo' => $memojurnal,
            'totaldebit' => $totaldebit,
            'totalcredit' => $totalcredit,
            'idjournaltype'=>$this->input->post('idjournaltype'),
            'balance' => 0,
//            'year' => $arrTgl[0],
//            'month' => $arrTgl[1],
            'userin' => $this->session->userdata('username'),
            'usermod' => $this->session->userdata('username'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s')
        );
//        print_r($d);
        if($idjournalrec=='')
        {
            $update=false;
            $this->db->insert('journalrec',$d);
        } else {
            $update=true;
            $this->db->where('idjournalrec',$id);
            $this->db->update('journalrec',$d);
        }
        
        
        
        foreach ($datagrid as $key => $value) {
            $ditem = array(
                'idjournalrec' =>$id,
                'idaccount' =>$value->idaccount,
                'debit' =>$value->debit==null ? 0 : $value->debit,
                'credit' =>$value->credit==null ? 0 : $value->credit
            );
            
            if(!$update)
            {
                $this->db->insert('journalitemrec',$ditem);
            } else {
                $this->db->where('idjournalrec',$id);
                $this->db->where('idaccount',$value->idaccount);
                $this->db->update('journalitemrec',$ditem);
            }
            
        }
        
        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'Input jurnal berulang gagal');
        }
        else
        {
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'Input jurnal berulang berhasil');
        }
        
        echo json_encode($json);

    }
    
    function getJournalRecItem()
    {
        $idjournalrec = $this->input->post('idjournalrec');
        $q = $this->db->get_where('journalitemrec',array('idjournalrec'=>$idjournalrec));
        $json = "{\"items\":[";
        foreach ($q->result() as $r)
        {
            $qa = $this->db->get_where('account',array('idaccount'=>$r->idaccount))->row();
            $json.="{\"idaccount\":\"$r->idaccount\",\"accnumber\":\"$qa->accnumber\",\"accname\":\"$qa->accname\",\"credit\":\"$r->credit\",\"debit\":\"$r->debit\"},";
        }
        $json .= "]}";
        echo $json;
    }
    
    function recordJournal()
    {        
        $totalcredit = str_replace(",", "",$this->input->post('totalcredit'));
        $totaldebit = str_replace(",", "", $this->input->post('totaldebit'));
        $totalcredit = str_replace(".00", "", $totalcredit);
        $totaldebit = str_replace(".00", "", $totaldebit);
//        $totalpajak = str_replace(",", "", str_replace(".", "", $this->input->post('totalpajak')));
        $memojurnal = $this->input->post('memojurnal');
        $nojurnal = $this->input->post('nojurnal');
        $tanggaljurnal = str_replace('T00:00:00', '', $this->input->post('tanggaljurnal'));
        $arrTgl = explode('-', $tanggaljurnal);
        $datagrid = json_decode($this->input->post('datagrid'));
       
        $this->db->trans_begin();
        
                
        //input ke satu unit atau lebih 2-09-14
//        $unitArr = json_decode($this->input->post('unit'));
        $idunit = $this->input->post('unit');
        
        
//        foreach ($unitArr as $idunit) {
            
            $qseq = $this->db->query("select nextval('seq_journal') as idjournal")->row();
            
                $d = array(
                    'idjournal' => $qseq->idjournal,
                    'nojournal' => $nojurnal,
                    'datejournal' => $tanggaljurnal,
                    'memo' => $memojurnal,
                    'totaldebit' => $totaldebit,
                    'totalcredit' => $totalcredit,
                    'idjournaltype'=>1,
                    'balance' => 0,
                    'year' => $arrTgl[0],
                    'month' => $arrTgl[1],
                    'userin' => $this->session->userdata('username'),
                    'usermod' => $this->session->userdata('username'),
                    'datein' => date('Y-m-d H:m:s'),
                    'datemod' => date('Y-m-d H:m:s'),
                    'idunit'=>$idunit
                );        

                $this->db->insert('journal',$d);

                foreach ($datagrid as $key => $value) {

                    $debit = $value->debit==null ? 0 : $value->debit;
                    $credit = $value->credit==null ? 0 : $value->credit;

                    $qacc = $this->db->get_where('account',array('idaccount'=>$value->idaccount,'idunit'=>$idunit))->row();
                    if($qacc->idaccounttype==17 || $qacc->idaccounttype==11 || $qacc->idaccounttype==19)
                    {
                        $curBalanceD = $this->m_account->getCurrBalance($value->idaccount, $idunit);

                        //kas,bank,hartalancar
                        if($debit==0)
                        {
                            //beban                            
                            $newBalanceD = $curBalanceD - $credit;                           
                        } else {
                            //pendapatan
                            $newBalanceD = $curBalanceD + $debit;
                        }

                         $this->m_account->saveNewBalance($value->idaccount, $newBalanceD, $idunit);
                    } else if($qacc->idaccounttype==12 || $qacc->idaccounttype==16){
                        //pendapatan,pendapatan  lain
                       $curBalanceD = $this->m_account->getCurrBalance($value->idaccount, $idunit);
                       $newBalanceD = $curBalanceD + $credit;
                       $this->m_account->saveNewBalance($value->idaccount, $newBalanceD, $idunit);
                    } else if($qacc->idaccounttype==14 || $qacc->idaccounttype==15){
                        //pengeluaran,pengeluaran  lain
                       $curBalanceD = $this->m_account->getCurrBalance($value->idaccount, $idunit);
                       $newBalanceD = $curBalanceD + $debit;
                       $this->m_account->saveNewBalance($value->idaccount, $newBalanceD, $idunit);
                    } else if($qacc->idaccounttype==9 || $qacc->idaccounttype==18 || $qacc->idaccounttype==2 || $qacc->idaccounttype==11){
                        //hutang lancar, hutang panjang,piutang,ekuitas
                       $curBalanceD = $this->m_account->getCurrBalance($value->idaccount, $idunit);
                       if($debit==0)
                        {
                            //penambahan hutang
                            $newBalanceD = $curBalanceD + $credit;
                        } else {
                            //dikurang
                            $newBalanceD = $curBalanceD - $debit;
                        }
                       
                       $this->m_account->saveNewBalance($value->idaccount, $newBalanceD, $idunit);
                    } else {
                        //piutang
                       $curBalanceD = $this->m_account->getCurrBalance($value->idaccount, $idunit);
                       $newBalanceD = $curBalanceD + $credit + $debit;
                       $this->m_account->saveNewBalance($value->idaccount, $newBalanceD, $idunit);
                    } 

                    $ditem = array(
                        'idjournal' =>$qseq->idjournal,
                        'idaccount' =>$value->idaccount,
                        'debit' =>$debit,
                        'credit' =>$credit
                    );
                    $this->db->insert('journalitem',$ditem);
                    $this->m_account->saveAccountLog($idunit,$value->idaccount,$credit,$debit,$tanggaljurnal,$qseq->idjournal);
                }
//        }
        //end foreach ($unitArr as $idunit) 
        
        
        // echo $this->db->last_query();
        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'Input jurnal gagal');
        }
        else
        {
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'Input jurnal berhasil');
        }
        
        echo json_encode($json);
    }
    
    function getJournal()
    {
        $json = "{
                    \"text\": \".\",
                    \"children\": [
                        ".$this->getData()."
                    ]
                }";
        echo $json;
    }
    
    function getData()
    {
        $sql = "select idjournal,b.namejournal,nojournal,datejournal,memo,totaldebit,totalcredit,year,month
                from journal a
                join journaltype b ON a.idjournaltype = b.idjournaltype";
        
        $accname = $this->input->get('accname');
        $tipeSearchJGeneral = $this->input->get('tipeSearchJGeneral');
        $idunit = $this->input->get('idunit');
         
        if($accname!='')
        {
            //kalo ada pencarian
            
             if($tipeSearchJGeneral==1)
            {
                //noref
                 $sql .=" where idjournal in (select idjournal from 
                                            journalitem a
                                            join account b ON a.idaccount = b.idaccount) AND nojournal like '%$accname%'";
            } else if($tipeSearchJGeneral==2)
                {
                    //memo
                     $sql .=" where idjournal in (select idjournal from 
                                                journalitem a
                                                join account b ON a.idaccount = b.idaccount) AND memo like '%$accname%'";
                } else if($tipeSearchJGeneral==3)
                {
                    //akun
                    $sql .=" where idjournal in (select idjournal from 
                                            journalitem a
                                            join account b ON a.idaccount = b.idaccount
                                            where  b.accname like '%$accname%')";
                }
            
        } else {
            $sql .=" where idjournal in (select idjournal from journalitem)";
        }
        
        if($idunit!='' || $idunit!=null)
        {
            $sql .=" AND idunit=$idunit";
        }
        
        //kalo bukan superuser pake idunit
        if($this->session->userdata('group_id')!=99 && $this->session->userdata('group_id')!=1)
        {
            $sql.=" AND idunit='".$this->session->userdata('idunit')."'";
        } else if($this->session->userdata('group_id')==1) {
             $sql.=" AND idunit!=99";
        }
        
        
        
        if($this->input->get('idjournaltype')!=null)
        {
            $id = $this->input->get('idjournaltype');
            $sql .=" AND a.idjournaltype=$id";
        }
        
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        if($startdate!='' && $enddate!='')
        {
            $sql .=" AND datejournal BETWEEN '$startdate' AND '$enddate'";
        }
            
        $sql .=" order by datejournal desc";
        $query = $this->db->query($sql);           
        
        $menu ="";
        foreach ($query->result() as $r)
        {
//            $leaf = $this->cekChildMenu2($r->idaccount);
            $tgl = backdate2($r->datejournal);
            $menu .= "{";
            $menu .= "\"id\": \"$r->idjournal\",
                    \"text\": \"$r->memo\",
                    \"datejournal\": \"$tgl\",
                    \"nojournal\": \"$r->nojournal\",
                    \"memo\": \"$r->memo\",
                    \"accnumber\": '',
                    \"accname\": '',
                    \"totaldebit\": \"$r->totaldebit\",
                    \"totalcredit\": \"$r->totalcredit\",
                    \"expanded\": false,
                    \"iconCls\": \"folder\",
                    \"leaf\": false";
            
//            if($leaf=='false')
//            {
            
            
                $sqlitem = "select a.idjournalitem,b.accnumber,b.accname,debit,credit
                            from journalitem a
                            join account b ON a.idaccount = b.idaccount
                            where idjournal=$r->idjournal and b.idunit = 12";
                
                $accname = $this->input->get('accname');
                if($accname!='')
                {
                    $sqlitem .=" AND b.accname like '%$accname%'";
                }
//                echo $sqlitem;
                $qitem = $this->db->query($sqlitem.'  order by idjournalitem');
                
               
                
                $menu .=",\"children\": [";
                    foreach ($qitem->result() as $rr)
                    {
                        $menu .= "{";
                        $menu .= "\"id\": \"$rr->idjournalitem\",
                                \"text\": '',
                                \"datejournal\": '',
                                \"nojournal\": \"$rr->accnumber\",
                                \"memo\": \"$rr->accname\",
                                \"accnumber\": \"$rr->accnumber\",
                                \"accname\": \"$rr->accname\",
                                \"totaldebit\": \"$rr->debit\",
                                \"totalcredit\": \"$rr->credit\",
                                \"iconCls\": \"sub-tree-journal\",
                                \"expanded\": true,
                                \"leaf\": true";
                        $menu .="},";
                    }
                $menu .="]";
//            }
            
            $menu .="},";
        }
        return $menu;
//        
//        $js = "{\"id\": \"2\",
//                    \"text\": \"Cheque Account\",
//                    \"accnumber\": \"1-0100\",
//                    \"acctypename\": \"Bank\",
//                    \"description\": \"\",
//                    \"balance\": \"0\",
//                    \"idparent\": \"1\",
//                    \"classname\": \"Liability\",
//                    \"prefixno\": \"2\",
//                    \"display\": \"\",
//                    \"idaccount\": \"2\",
//                    \"idclassificationcf\": \"2\",
//                    \"active\": \"t\",
//                    \"expanded\": true,
//                    \"iconCls\": \"id-folder\",
//                    \"leaf\": true}";
//        return $js;
    }
    
    function getSummary()
    {
        $startdate=$this->input->post('startdate');
        $enddate=$this->input->post('enddate');
        $idunit=$this->input->post('idunit');
        
        $sql = "select sum(totaldebit) as totaldebit, sum(totalcredit) as totalcredit
                from journal";
        $sql .=" where idjournal in (select idjournal from journalitem)";
        
        if($idunit!=null || $idunit!='')
        {
            $sql .=" AND idunit=$idunit";
        }
        
        if($this->input->post('idjournaltype')!=null)
        {
            $idjournaltype = $this->input->post('idjournaltype');
            $sql.=" AND idjournaltype=$idjournaltype";
            if($startdate!=null && $enddate!=null )
            {
                $sql .=" AND datejournal BETWEEN '$startdate' AND '$enddate'";
            }
        } else {
            if($startdate!=null && $enddate!=null )
            {
                $sql .=" AND datejournal BETWEEN '$startdate' AND '$enddate'";
            }
        }
        
        
        
        $q = $this->db->query($sql);
        $r = $q->row();
        $selisih = $r->totaldebit-$r->totalcredit;
        $selisih = str_replace('-', '', $selisih);
        
        echo json_encode(array('success'=>true,'totaldebit'=>number_format($r->totaldebit,2),'totalcredit'=>number_format($r->totalcredit,2),'selisih'=>number_format($selisih,2)));
    }

    function delete_journal(){
       
        $idjournal = $this->input->post('idjournal');

        $qunit = $this->db->query("select idunit from journal where idjournal = $idjournal");
        if($qunit->num_rows()>0){
            $runit = $qunit->row();

                $this->db->trans_begin();

                /*
                accounthistory tidak terlacak
                */

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('accountlog');

                $q = $this->db->get_where('journalitem',array('idjournal'=>$idjournal));
                foreach ($q->result() as $r) {
                    $qacc = $this->db->query("select balance,idaccounttype from account where idaccount = ".$r->idaccount." and idunit = ".$runit->idunit." ")->row();
                    $current_balance = $qacc->balance;
                    $trx_amount = $r->debit == 0 ? $r->credit : $r->debit;

                    if($qacc->idaccounttype==1 || $qacc->idaccounttype==2 || $qacc->idaccounttype==3 || $qacc->idaccounttype==4 || $qacc->idaccounttype==5 || $qacc->idaccounttype==6 || $qacc->idaccounttype==11 || $qacc->idaccounttype==17 || $qacc->idaccounttype==19 || $qacc->idaccounttype==20 || $qacc->idaccounttype==21){
                        $newbalance = $current_balance + $trx_amount;
                    } else {
                        $newbalance = $current_balance - $trx_amount;
                    }

                    $this->db->where(array(
                            'idaccount'=>$r->idaccount,
                            'idunit'=>$runit->idunit
                        ));
                    $this->db->update('account',array(
                            'balance'=>$newbalance
                        ));
                }

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('journalitem');

                $this->db->where('idjournal',$idjournal);
                $this->db->delete('journal');

                if ($this->db->trans_status() === FALSE)
                {
                    $this->db->trans_rollback();
                    $json = array('success'=>false,'message'=>'hapus jurnal gagal');
                }
                else
                {
                    $this->db->trans_commit();
                    $json = array('success'=>true,'message'=>'hapus jurnal berhasil');
                }
                
                echo json_encode($json);
        } else {
            $json = array('success'=>false,'message'=>'id journal tidak ditemukan');
            echo json_encode($json);
            exit();
        }


    }
    
    function tesunit()
    {
//        foreach ($this->input->post('unit') as $value) {
//            echo $value.' ';
//        }
        $unit = json_decode($this->input->post('unit'));
        echo count($unit);
    }
}
?>