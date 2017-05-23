<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class pegawai extends MY_Controller {

    public function index() {

    }

    function importPegawai()
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

             // echo count($val[0]);
            if(count($val[0])!=8)
            {
                $status = false;
                $message = 'Format template file import pegawai tidak sesuai/salah';
                $valid = array('status' => $status, 'message' => $message);
                echo json_encode($valid);
                exit;
            }

            $start = 1;
            while (isset($val[$start])) {
                $d = $val[$start];
                if($d['0']!='')
                {
                    $valid = $this->validasiPegawai($d);
                    if ($valid['status']) {
                        $oke = true;
                        $qseq = $this->db->query("select nextval('seq_upload') as idupload")->row();
                        $idupload = $qseq->idupload;
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
                        $pegawaitglmasuk = explode(".", $d['7']);
                        $data = array(
									"code" => $d['1'],
									"lastname" => $d['3'],
									"telephone" => $d['5'],
									"userin" => $this->session->userdata('username'),
									"usermod" => $this->session->userdata('username'),
									"datein"=>date('Y-m-d H:m:s'),
									"datemod"=>date('Y-m-d H:m:s'),
									"idemployeetype" => $d['4'],
									"idunit" => $d['2'],
									"pegawaitglmasuk" => $pegawaitglmasuk[2].'-'.$pegawaitglmasuk[1].'-'.$pegawaitglmasuk[0],
									"keaktifan"=>'Aktif',
									"tglresign" =>null,
									"idjenisptkp"  => $d['6'],
									"idupload" => $idupload
                        	);
							$this->db->insert('employee',$data);
                        $start++;
                    }
                }

                $dup = array(
                    "idupload" => $idupload,
                    "orig_name" => $orig_name,
                    "userin" => $this->session->userdata('username'),
                    "datein"=>date('Y-m-d H:m:s'),
                    "type" =>'potongan'
                );
                $this->db->insert('upload',$dup);

                $start-=1;
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('success' => false, 'message' => $start . ' Data Pegawai Gagal Diimport.'));
                } else {
                    $this->db->trans_commit();
    //                     $this->db->trans_rollback();
                    echo json_encode(array('success' => true, 'message' => $start . ' Data Pegawai Berhasil Diimport.'));
                }
            } else {
                echo json_encode($valid);
            }
        }
    }

    function validasiPegawai($d,$update=false)
    {
         $status = true;
      
        $message = 'valid';

        if($d['1']=='')
        {
            $status = false;
            $message = 'Error data NO ' . $d['0'] . ': Nomor Induk Pegawai tidak boleh kosong';
        }  else {
        	$code = $d['1'];
	        $qemp = $this->db->get_where('employee', array('code' => "".$code."",'display'=>null));
	        if($qemp->num_rows()>0)
	        {
	            $status = false;
	            $message = 'Error data NO ' . $d['0'] . ': No Induk Pegawai sudah ada di dalam database';
	        } 
        }
        ///////////////////////////////////////
        if($d['2']=='')
        {
        	$status = false;
        	$message = 'Error data NO ' . $d['0'] . ': Kode Unit tidak boleh kosong';
        } else {
        	 $q = $this->db->get_where('unit', array('idunit' => $d['2'],'display'=>null));
	        if ($q->num_rows() > 0) {
	        } else {
	            $status = false;
	            $message = 'Error data NO ' . $d['0'] . ': Kode Unit: '.$d['2'].' tidak ada di database';
	        }
        }
        /////////////////////////////////////////

        if($d['3']=='')
        {
        	$status = false;
        	$message = 'Error data NO ' . $d['0'] . ': Nama Lengkap tidak boleh kosong';
        }
        /////////////////////////////////////////

        if(!isset($d['4']) || $d['4']=='')
        {
        	$status = false;
        	$message = 'Error data NO ' . $d['0'] . ': Kode Jabatan tidak boleh kosong';
        } else {
        	 $q = $this->db->get_where('employeetype', array('idemployeetype' => $d['4'],'display'=>null));
	        if ($q->num_rows() > 0) {
	        } else {
	            $status = false;
	            $message = 'Error data NO ' . $d['0'] . ': Kode Jabatan: '.$d['4'].' tidak ada di database';
	        }
        }
        ////////////////////////////////////////////

        if($d['6']=='')
        {
        	$status = false;
        	$message = 'Error data NO ' . $d['0'] . ': Kode PTKP tidak boleh kosong';
        } else {
        	 $q = $this->db->get_where('jenisptkp', array('idjenisptkp' => $d['6'],'display'=>null));
	        if ($q->num_rows() > 0) {
	        } else {
	            $status = false;
	            $message = 'Error data NO ' . $d['0'] . ': Kode PTKP: '.$d['6'].' tidak ada di database';
	        }
        }
        //////////////////////////////////////////////
        if(!isset($d['7']) || $d['7']=='')
        {
        	$status = false;
            $message = 'Error data NO ' . $d['0'] . ': Tanggal Masuk tidak boleh kosong';
           
        } else {
            $valid = validasitgl($d['0'],'Tanggal Masuk',$d['7']);
            if (!$valid['status']) {
                $status = false;
                $message = $valid['message'];
            }
        }
       
        return array('status' => $status, 'message' => $message);
    }

    function update_user_login(){

        $this->db->trans_begin();

        if($this->input->post('user_id')=='' || $this->input->post('user_id')==null)
        {
            $qid = $this->db->query("select nextval('seq_user_id') as id ")->row();
            $user_id = $qid->id;
        } else {
            $user_id = $this->input->post('user_id');
        }
        

        $data = array(
                'user_id' => $user_id,
                'username' => $this->input->post('username'),
                'password' => $this->input->post('password'),
                // 'email' varchar(20) COLLATE 'default',
                // 'laslogin' timestamp(6) NULL,
                
                
                'group_id' => $this->input->post('group_id'),
                // 'realname' varchar(30) COLLATE 'default',
                // 'idunitbak' int4,
                // 'iduserparent' int4,
                // 'display' int4,
                // 'clientid' int4,
                
                'idcompany'  => $this->session->userdata('idcompany')
        );

        if($this->input->post('user_id')=='')
        {
            $data['userin'] = $this->session->userdata('userid');
            $data['datein'] = date('Y-m-d H:m:s');
            $this->db->insert('sys_user',$data);

           

        } else {
            $data['usermod'] = $this->session->userdata('userid');
            $data['datemod'] = date('Y-m-d H:m:s');
            $this->db->where('user_id',$user_id);
            $this->db->update('sys_user',$data);
        }

        $qcek = $this->db->get_where('userunit',array('user_id'=>$user_id));
        if($qcek->num_rows()>0)
        {
             $this->db->where('user_id',$user_id);
             $this->db->update('userunit',array(
                    'idunit' => $this->input->post('idunit')
                ));
        } else {
             $this->db->insert('userunit',array(
                    'idunit' => $this->input->post('idunit'),
                    'user_id' => $user_id
                ));
        }

        // if($this->db->affected_rows()>0)
        // {
            $this->db->where('idemployee',$this->input->post('idemployee'));
            $this->db->update('employee',array('user_id'=>$user_id,'is_login' => $this->input->post('is_login')));
        // }

         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo json_encode(array('success' => false, 'message' =>'Data Gagal Diperbaharui'));
        } else {
            $this->db->trans_commit();
            echo json_encode(array('success' => true, 'message' => 'Data Berhasil Diperbaharui'));
        }
    }

    function get_user_akses(){
        $idemployee = $this->input->get('idemployee');

        $q = $this->db->query("select a.user_id,a.idemployee,b.username,b.password,b.group_id,is_login
                                from employee a
                                join sys_user b ON a.user_id = b.user_id
                                where a.idemployee = $idemployee");
        // if($q->num_rows()>0)
        // {

        // } else {

        // }
            $r = $q->row();
            $u = array(
                    'user_id' => $r==false ? null : $r->user_id,
                    'group_id' => $r==false ? null : $r->group_id,
                    'idemployee' => $r==false ? null : $r->idemployee,
                    'is_login' => $r==false ? null : $r->is_login,
                    'username' => $r==false ? null : $r->username,
                    'password' => $r==false ? null : $r->password
            );

         echo json_encode($u);
    }
 }
 ?>