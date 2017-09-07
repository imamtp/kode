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

    function import_hutang(){
        $file = '/var/www/html/redsfindev/saldo awal AP Supplier.xlsx';
        // $orig_name = $this->upload->data()['orig_name'];

        require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
        $xlsx = new SimpleXLSX($file);
        $getWorksheetName = $xlsx->getWorksheetName();

        $val = $xlsx->rows(1);

        $oke = true;
        $start = 1;
        // while (isset($val[$start])) {
        //     $d = $val[$start];
        //     if($d['0']!='')
        //     {
        //         $valid = $this->validasi($d);
        //         if ($valid['status']) {
        //             $oke = true;
        //         } else {
        //             $oke = false;
        //             break;
        //         }
        //         $start++;
        //     }
        // }

        // $start-=1;
        if ($oke) {
          

            $start = 1;

            $total = 0;
            while (isset($val[$start])) {
                $d = $val[$start];
                // print_r($d); $start++; continue;
                if($d['0']!='')
                {
                    if($d[6]=='0' || $d[6]==0){
                        $start++;
                        continue;
                    }

                    $idregistrasihutang = $this->input->post('idregistrasihutang') == '' ? $this->m_data->getSeqVal('seq_registrasihutang') : $this->input->post('idregistrasihutang');
                    
                    if(isset($d[16])){
                        $sd = $d[16];
                        $mulaihutang = new DateTime("1899-12-30 + $sd days");
                    }
                   
                    if(isset($d[17])){ 
                        if($d[17]!=''){
                            $nd = $d[17];
                            $jatuhtempo = new DateTime("1899-12-30 + $nd days");
                        } else {
                            $jatuhtempo = null;
                        }
                       
                    }

                    if(!isset($d[2])){
                        //create supplier
                    }

                    $this->db->trans_begin();
                    $memo =  'Hutang Usaha - '.$d[3];

                    $mulaihutang_val = isset($mulaihutang) ? $mulaihutang->format("Y-m-d") : null;
                    $jatuhtempo_val = isset($jatuhtempo) ? $jatuhtempo->format("Y-m-d") : null;
                    $data = array(
                        'idregistrasihutang' => $idregistrasihutang,
                        'idacchutang' => $d[0],
                        'idacckenahutang' => $d[1],
                        'jumlah' => isset($d[5]) ? $d[5] : 0,
                        'sisahutang' => isset($d[6]) ? $d[6] : 0,
                        'memo' => $memo,
                        'idsupplier' => $d[2],
                        // 'bulan' => ambilNoBulan($this->input->post('namabulan')),
                        // 'tahun' => $this->input->post('tahun'),
                        // 'description' => $this->input->post('description'),
                        'mulaihutang' => $mulaihutang_val,
                        'jatuhtempo' => $jatuhtempo_val,
                        'idunit' => $d[4]
                    );
                    $this->db->insert('registrasihutang',$data);
                    // print_r($data);

                    if ($this->db->trans_status() === FALSE) {
                        $this->db->trans_rollback();
                    } else {
                        $this->db->trans_commit();

                           //bikin jurnal
                           $this->load->model('m_journal');
                           $idjournal = $this->m_journal->saveRegistrasiHutang($d[4],$memo,$d[0],$d[1],$mulaihutang_val,$data['sisahutang']);

                           $this->db->where('idregistrasihutang',$idregistrasihutang);
                           $this->db->update('registrasihutang',array('idjournal'=>$idjournal));
                    }

                //     $data = array(
                //         "idunit"=> $d[2],
                //         "namasiswa"=> $d[3],
                //         "namaibu"=> $d[4],
                //         "namaayah"=> $d[5],
                //         "alamat"=> $d[6],
                //         "kota"=> $d[7],
                //         "phone"=> $d[8],
                //         "tglmasuk"=> $d[10]=='' ? null : $this->convertdateimport($d[10]),
                //         "tglkeluar"=> null,
                //         "tahunajaranmasuk"=> $d[11],
                //         // "foto" varchar(100),
                //         // "display" int2,
                //         "userin" => $this->session->userdata('username'),
                //         "usermod" => $this->session->userdata('username'),
                //         "datein"=>date('Y-m-d H:m:s'),
                //         "datemod"=>date('Y-m-d H:m:s'),
                //         "noinduk"=> $d[1],
                //         "kelas"=> $d[8]
                //     );
                //     $this->db->insert('siswa',$data);
                    $start++;
                }
            }

        }

          $start-=1;
//          if ($this->db->trans_status() === FALSE) {
//             $this->db->trans_rollback();
//             echo json_encode(array('success' => false, 'message' => $start . ' Data Gagal Diimport.'));
//         } else {
//             $this->db->trans_commit();
// //                     $this->db->trans_rollback();
//             echo json_encode(array('success' => true, 'message' => $start . ' Data Berhasil Diimport.'));
//         }
    }

    function import_piutang(){
        $file = '/var/www/html/redsfindev/saldo awal AR Customer.xlsx';
        // $orig_name = $this->upload->data()['orig_name'];

        require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
        $xlsx = new SimpleXLSX($file);
        $getWorksheetName = $xlsx->getWorksheetName();

        $val = $xlsx->rows(1);

        $oke = true;
        $start = 1;

        // $start-=1;
        if ($oke) {
          

            $start = 1;

            $total = 0;
            while (isset($val[$start])) {
                $d = $val[$start];
                // print_r($d); $start++; continue;
                if($d['0']!='')
                {
                    if(intval($d[9])==0){
                        $start++;
                        continue;
                    }

                    $idregistrasipiutang =  $this->m_data->getSeqVal('seq_registrasipiutang');
                    
                    if(isset($d[4])){
                        $sd = $d[4];
                        $mulaihutang = new DateTime("1899-12-30 + $sd days");
                    }
                   
                    // if(isset($d[17])){ 
                    //     if($d[17]!=''){
                    //         $nd = $d[17];
                    //         $jatuhtempo = new DateTime("1899-12-30 + $nd days");
                    //     } else {
                    //         $jatuhtempo = null;
                    //     }
                       
                    // }

                    if(isset($d[0])){
                        //customer
                        $qc = $this->db->get_where('customer',array('nocustomer'=>$d[0]));
                        if($qc->num_rows()>0){
                            $r = $qc->row();
                            $idcustomer = $r->idcustomer;
                        } else {
                            $idcustomer = $this->m_data->getSeqVal('seq_customer');
                            //create customer
                            $this->db->insert('customer',array(
                                'idcustomer'=>$idcustomer,
                                'status'=>1,
                                'deleted'=>0,
                                'nocustomer'=>$d[0],
                                'namecustomer'=>$d[1],
                                'idunit'=>12
                            ));
                        }
                    }

                    $this->db->trans_begin();
                    $memo =  'Piutang Usaha - '.$d[1];

                    $mulaihutang_val = isset($mulaihutang) ? $mulaihutang->format("Y-m-d") : null;
                    // $jatuhtempo_val = isset($jatuhtempo) ? $jatuhtempo->format("Y-m-d") : null;
                  
                    $data = array(
                        'idregistrasipiutang' => $idregistrasipiutang,
                        'idcustomer' => $idcustomer,
                        'idaccount' => $d[2],
                        // 'bulan' => ambilNoBulan($this->input->post('namabulan')),
                        // 'tahun' => $this->input->post('tahun'),
                        'idaccountlink' => $d[3],
                        'tglpiutang' => $mulaihutang_val,
                        'description' => $memo,
                        'jumlah' => $d[9],
                        'sisapiutang' => $d[9],
                        'idunit' => 12
                    );

                    $this->db->insert('registrasipiutang',$data);
                    // print_r($data);
                    $start++;
                    if ($this->db->trans_status() === FALSE) {
                        $this->db->trans_rollback();
                    } else {
                        $this->db->trans_commit();

                           //bikin jurnal
                           $this->load->model('m_journal');
                           $idjournal = $this->m_journal->saveRegistrasiPiutang($data['idunit'],$data['idaccount'],$data['tglpiutang'],$data['sisapiutang'],$data['description'],$data['idaccountlink']);
                        //    $d['idjournal'] = $idjournal;

                           $this->db->where('idregistrasipiutang',$idregistrasipiutang);
                           $this->db->update('registrasipiutang',array('idjournal'=>$idjournal));
                    }
                    
                }
            }

            // if($start==81){
            //     break;
            // }
        }

          $start-=1;
    }
}
?>