<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class siswa extends MY_Controller {

    public function index() {
        
    }

    function import()
    {
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

            require_once DOCUMENTROOT . "/application/libraries/simplexlsx.class.php";
            $xlsx = new SimpleXLSX($file);
            $getWorksheetName = $xlsx->getWorksheetName();

            $val = $xlsx->rows(1);

            $start = 1;
            while (isset($val[$start])) {
            	$d = $val[$start];
            	if($d['0']!='')
                {
                    $valid = $this->validasi($d);
                    if ($valid['status']) {
                        $oke = true;
                    } else {
                        $oke = false;
                        break;
                    }
                    $start++;
                }
            }

            // $start-=1;
	        if ($oke) {
	        	$this->db->trans_begin();

	        	$start = 1;

	            $total = 0;
	            while (isset($val[$start])) {
	            	$d = $val[$start];
	            	if($d['0']!='')
	                {
						$data = array(
							"idunit"=> $d[2],
							"namasiswa"=> $d[3],
							"namaibu"=> $d[4],
							"namaayah"=> $d[5],
							"alamat"=> $d[6],
							"kota"=> $d[7],
							"phone"=> $d[8],
							"tglmasuk"=> $d[10]=='' ? null : $this->convertdateimport($d[10]),
							"tglkeluar"=> null,
							"tahunajaranmasuk"=> $d[11],
							// "foto" varchar(100),
							// "display" int2,
							"userin" => $this->session->userdata('username'),
							"usermod" => $this->session->userdata('username'),
							"datein"=>date('Y-m-d H:m:s'),
							"datemod"=>date('Y-m-d H:m:s'),
							"noinduk"=> $d[1],
							"kelas"=> $d[8]
						);
						$this->db->insert('siswa',$data);
	                    $start++;
	                }
	            }

	          $start-=1;
	         if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                echo json_encode(array('success' => false, 'message' => $start . ' Data Siswa Gagal Diimport.'));
            } else {
                $this->db->trans_commit();
//                     $this->db->trans_rollback();
                echo json_encode(array('success' => true, 'message' => $start . ' Data Siswa Berhasil Diimport.'));
            }
	        } else {
	            echo json_encode($valid);
	        }
        }
    }

    function convertdateimport($date)
    {
    	$date = explode(".", $date);
    	return $date[2].'-'.$date[1].'-'.$date[0];
    }

    function validasi($d,$update=false)
    {
    	 $status = true;
      
        $message = 'valid';
        
        if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': No Induk Siswa tidak boleh kosong';
        } else {
            $q = $this->db->get_where('siswa', array('noinduk' => "".$d['1']."",'display'=>null));
            if ($q->num_rows() > 0) {
                 $status = false;
                $message = 'Error data NO ' . $d['0'] . ': No Induk Siswa: '.$d['1'].' sudah ada di database';
            } else {
               
            }
        }

        if($d['2']=='')
        {
        	$status = false;
        	$message = 'Error data NO ' . $d['0'] . ': Kode Unit: '.$d['2'].' tidak boleh kosong';
        } else {
        	 $q = $this->db->get_where('unit', array('idunit' => $d['2'],'display'=>null));
	        if ($q->num_rows() > 0) {
	        } else {
	            $status = false;
	            $message = 'Error data NO ' . $d['0'] . ': Kode Unit: '.$d['2'].' tidak ada di database';
	        }
        }

        if($d['10']!='' || $d['10']!=null)
        {
            $valid = $this->validasitgl($d['0'],'Tanggal Lahir',$d['10']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message']." ".$d['10'];
            }
         }
       
        return array('status' => $status, 'message' => $message);
    }

    function validasitgl($no,$jenis,$date)
    {
        $tgl = explode(".", $date);

        // $bulan = intval($tgl[1]);

        $message = 'Error data NO ' . $no .' : Format '.str_replace("%20", " ", $jenis).' Salah. <br><br> Format Tanggal: dd.mm.yyyy';
        if(isset($tgl[1]))
        {
        	$bulan = intval($tgl[1]);
        	 // $status = false;   
        	if(count($tgl)<3)
	        {
	            $status = false;            
	        } else if($tgl[0]>33) {
	            $status = false;
	        } else if($bulan>12) {
	            $status = false;
	        }  else {
	            $status = true;
	            $message = null;
	        }
        } else {
        	$status = false;   
        }
        return array('message'=>$message,'status'=>$status);
    }
}
?>