<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class inventory extends MY_Controller {

    public function index() {

    }

    function SaveInventoryV2($input = null)
    {
        $statusformInventory2 = $this->input->post('statusformInventory2');
        
        $opsion = $statusformInventory2 == 'input' ? 'add' : 'edit';
        $retAkses = $this->cekAksesUser(19,$opsion);
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

        $config['upload_path'] = './upload/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '10000';
        $config['max_width'] = '1024';
        $config['max_height'] = '768';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('images')) {
            $error = $this->upload->display_errors();
            // echo $error;
            if ($error != '<p>You did not select a file to upload.</p>') {
                echo "{success:false, message:'" . $error . "'}";
            } else {
                // echo "{success:false, message:'simpan prosess'}";
                $this->prosesSaveProfileV2(null, $input);
            }
        } else {
            // $data = $this->upload->data());
            // print_r($this->upload->data());
            // echo "{success:true, message:'".print_r($this->upload->data())."'}";
            $this->prosesSaveProfileV2($this->upload->data()['orig_name'], $input);
            // $this->load->view('upload_success', $data);
        }
    }

    function idinventory($post_id_data){
         if($post_id_data==null)
        {
            //input baru
             $q = $this->db->query("select max(idinventory) as id from inventory");
            if($q->num_rows()>0)
            {
                $r = $q->row();
                return $r->id+1;
            } else {
                return 1;
            }
        } else {
            //edit
            return $post_id_data;
        }
    }

    function prosesSaveProfileV2($images, $input = null)
    {
        $this->db->trans_begin();
        $idinventory = $this->idinventory($this->input->post('idinventory'));
        // $namaunit2 = $this->input->post('namaunit2');
        $idsupplier = $this->input->post('idsupplier');
        
        $isinventory = $this->input->post('cbpersediaan') == 'on' ? 'TRUE' : 'FALSE';
        $issell = $this->input->post('cbdijual') == 'on' ? 'TRUE' : 'FALSE';
        $isbuy = $this->input->post('cbdibeli') == 'on' ? 'TRUE' : 'FALSE';

        $idunit = $this->input->post('idunit');//$this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit2')[0]);
        $invno = $this->input->post('invno');

        $d = array(
            'nameinventory' => $this->input->post('nameinventory'),
            'inventory_type' => $this->input->post('inventory_type'),
            'description' => $this->input->post('description'),
            'isinventory' => $isinventory,
            'issell' => $issell,
            'isbuy' => $isbuy,
//            'images'=>$images,
//            'userin'=>$this->session->userdata('userid'),
            // 'usermod' => $this->session->userdata('userid'),
//            'datein'=>date('Y-m-d H:m:s'),
            // 'datemod' => date('Y-m-d H:m:s'),
            // 'idinventorycat' => $this->m_data->getID('inventorycat', 'namecat', 'idinventorycat', $this->input->post('namecat')),
            'idinventorycat'=>$this->input->post('idinventorycat'),
            // 'idsupplier' => $this->input->post('idsupplier'),
            'measurement_id_one' => $this->input->post('measurement_id_one')?: null,
            'measurement_id_two' => $this->input->post('measurement_id_two')?: null,
            'measurement_id_tre' => $this->input->post('measurement_id_tre')?: null,
            'ratio_two' => $this->input->post('ratio_two')?: null,
            'ratio_tre' => $this->input->post('ratio_tre')?: null,
            'minstock'=> $this->input->post('qtystockmin')?: 0,

            'brand_id' => $this->input->post('brand_id') !=null ? $this->input->post('brand_id') : null,
            'sku_no' => $this->input->post('sku_no'),
            'bahan_coil_id' => $this->input->post('bahan_coil_id'),
            'diameter' => $this->input->post('diameter'),
            'ketebalan' => $this->input->post('ketebalan'),
            'berat' => $this->input->post('berat'),
            'lebar' => $this->input->post('lebar'),
            'tinggi' => $this->input->post('tinggi'),
            'panjang' => $this->input->post('panjang'),
            'konversi_coil_name' => $this->input->post('konversi_coil_name'),
            'panjang_satuan_id' =>$this->input->post('panjang_satuan_id') !=null ? $this->input->post('panjang_satuan_id') : null,
            'tinggi_satuan_id' =>$this->input->post('tinggi_satuan_id') !=null ? $this->input->post('tinggi_satuan_id') : null,
            'lebar_satuan_id' =>$this->input->post('lebar_satuan_id') !=null ? $this->input->post('lebar_satuan_id') : null,
            'berat_satuan_id' =>$this->input->post('berat_satuan_id') !=null ? $this->input->post('berat_satuan_id') : null,
            'ketebalan_satuan_id' =>$this->input->post('ketebalan_satuan_id') !=null ? $this->input->post('ketebalan_satuan_id') : null,
            'diameter_satuan_id' =>$this->input->post('diameter_satuan_id') !=null ? $this->input->post('diameter_satuan_id') : null,
            'idunit'=> $idunit,
        );

        // if ($idinventory == null || $idinventory == '') {
        //         foreach ($namaunit2 as $idunit) {
        //            // $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', $u);
        //            $sql = "select b.invno
        //                     from inventoryunit a
        //                     join inventory b ON a.idinventory = b.idinventory
        //                     where a.idunit=$idunit and b.invno='$invno'";
        //             $q = $this->db->query($sql);
        //             // echo $sql.'        ';
        //             if($q->num_rows()>0)
        //             {
        //                 echo "{success:false, message:'Gagal disimpan. No Inventory sudah ada di unit ".$u.".'}";
        //                 exit;
        //             }
        //         }
        // }

        //buy
        if($isbuy!='FALSE')
        {
            $datebuy = $this->input->post('datebuy');
            if($datebuy!='')
            {
                $tgl = explode("/", $datebuy);
                $d['yearbuy'] = $tgl[2];
                $d['monthbuy'] = $tgl[1];
                $d['datebuy'] = backdate($datebuy);
            }

            $d['cosaccount'] = $this->input->post('cosaccount')?: null;
            $d['cost'] = $this->input->post('cost')?: null;
            $d['unitmeasure'] = $this->input->post('unitmeasure')?: null;
            $d['idprimarysupplier'] = $this->m_data->getID('supplier', 'namesupplier', 'idsupplier', $this->input->post('namesupplier'));
            // $d['idbuytax'] = $this->m_data->getID('tax', 'nametax', 'idtax', $this->input->post('nametaxbuy'));
        }
        //end buy

        //sell
        if($issell!='FALSE')
        {
            $d['incomeaccount'] = $this->input->post('incomeaccount')  ?: null;
            $d['unitmeasuresell'] = $this->input->post('unitmeasuresell') ?: null;
            // $d['sellingprice'] = $this->input->post('sellingprice') ?: null;
            // $d['idselingtax'] = $this->m_data->getID('tax', 'nametax', 'idtax', $this->input->post('nametax'));
        }
        //end sell

        //inventory
        if($isinventory!='FALSE')
        {
            $d['qtystock'] = $this->input->post('qtystock');
            $d['umur'] = $this->input->post('umur');
            $d['residu'] = str_replace(",", "", cleardot2($this->input->post('residu')));
            $d['akumulasibeban'] = str_replace(",", "", cleardot2($this->input->post('akumulasibeban')));
            $d['bebanberjalan'] = str_replace(",", "", cleardot2($this->input->post('bebanberjalan')));
            $d['nilaibuku'] = str_replace(",", "", cleardot2($this->input->post('nilaibuku')));
            $d['bebanperbulan'] = str_replace(",", "", cleardot2($this->input->post('bebanperbulan')));
            $d['akumulasiakhir'] = str_replace(",", "", cleardot2($this->input->post('akumulasiakhir')));
        }
        // );
        //end inventory

        if ($images != '' || $images != null) {
            $d['images'] = $images;
        } else {
            $d['images'] = 'inventory.png';
        }

        // echo 'idinventory:'.$idinventory;
        if($this->input->post('statusformInventory2')!='input'){
        // if ($idinventory != null || $idinventory != '') {
            // $this->db->where('idinventory', $idinventory);
            // $this->db->delete('inventoryunit');
            // $qunit = $this->db->get_where('unit',array('idcompany'=>$this->session->userdata('idcompany')));
            // foreach ($qunit->result() as $runit) {
                // $idunitdiremove=null;

                // $qcekremove = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
                // foreach ($qcekremove->result() as $rremove) {
                //     $idunitdiremove[]=$rremove->idunit;
                // }

                // foreach ($namaunit2 as $u) {
                //     $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', $u);
                //     // $idunit = $u;
                //     $qcek = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));
                //     if($qcek->num_rows()>0)
                //     {

                //     } else {
                //         $idunit = $idunit == '' ? $u : $idunit;
                //         $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));
                //     }
                // }
            // }
            $d['usermod'] = $this->session->userdata('userid');
            $d['datemod'] = date('Y-m-d H:i:s');

            $this->db->where('idinventory', $idinventory);
            $this->db->update('inventory', $d);
        } else {
            // $qseq = $this->db->query("select nextval('seq_inventory') as id")->row();
            // $idinventory = $qseq->id;
            $d['idinventory'] = $idinventory;
            $d['userin'] = $this->session->userdata('userid');
            $d['datein'] = date('Y-m-d H:m:s');
            $this->db->insert('inventory', $d);
            // foreach ($namaunit2 as $u) {
                // $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$this->m_data->getID('unit', 'namaunit', 'idunit', $u)));
                //  $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$u));
            // }
        }

        //insert by supplier
        if($idsupplier[0]=='Choose Suppler...'){
            echo "{success:false, message:'Tentukan supplier terlebih dahulu'}";
            return false;
        }

        if($idsupplier[0]!=null){
             $this->db->delete('inventory_supplier',array('idinventory'=>$idinventory));
            foreach ($idsupplier as $u) {
                    // $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$this->m_data->getID('unit', 'namaunit', 'idunit', $u)));
                 $this->db->insert('inventory_supplier',array('idinventory'=>$idinventory,'idsupplier'=>$u));
            }
        }
       

        if($this->input->post('persediaanawal')=='true')
        {
            //diinput dari menu pengaturan persediaan awal
            $werArr = array('idinventory'=>$idinventory,'idunit'=>$this->m_data->getID('unit', 'namaunit', 'idunit', $u));
            $arrayAkun = array(
                  'assetaccount'   => $this->input->post('assetaccount'),
                  'akumpenyusutaccount' => $this->input->post('akumpenyusutaccountOpening'),
                  'depresiasiaccount' => $this->input->post('depresiasiaccountOpening'),
                );
            $this->db->where($werArr);
            $this->db->update('inventoryunit',$arrayAkun);
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success:false, message:'Gagal Menyimpan Inventory'}";
        } else {
            $this->db->trans_commit();
            echo "{success:true, message:'Sukses Menyimpan Inventory'}";
        }
    }

    function getSupplier(){
         $idinventory = $this->input->post('idinventory');
        // $q = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
        $sql = "select idinventory,idsupplier 
                from inventory_supplier a
                where a.idinventory=$idinventory";
        $q = $this->db->query($sql);
        $d = array();
        $num = $q->num_rows();
        $i=1;
        $str = null;
        foreach ($q->result() as $r) {
            $str.=$r->idsupplier;
            if($i!=$num)
            {
                $str.=",";
            }
            $i++;
            // $d[] = $r->namaunit;
        }
        // echo json_encode($d);
        echo $str;
    }

    function saveProfile($input = null) {
        $config['upload_path'] = './upload/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '10000';
        $config['max_width'] = '1024';
        $config['max_height'] = '768';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('images')) {
            $error = $this->upload->display_errors();
            // echo $error;
            if ($error != '<p>You did not select a file to upload.</p>') {
                echo "{success:false, message:'" . $error . "'}";
            } else {
                // echo "{success:false, message:'simpan prosess'}";
                $this->prosesSaveProfile(null, $input);
            }
        } else {
            // $data = $this->upload->data());
            // print_r($this->upload->data());
            // echo "{success:true, message:'".print_r($this->upload->data())."'}";
            $this->prosesSaveProfile($this->upload->data()['orig_name'], $input);
            // $this->load->view('upload_success', $data);
        }
    }

    function deleteinventoryunit($unitpost,$idinventory)
    {
        $idinventory=21;
        $idunitdiremove=null;
        $idunitada=array();

        $qcekremove = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
        foreach ($qcekremove->result() as $rremove) {
            $idunitdiremove[]=$rremove->idunit;
        }
        // print_r($idunitdiremove);

        // $unitpost[]="Unit 1";
        // $unitpost[]="SMIP";

        foreach ($unitpost as $u) {
            $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', $u);
            $qcek = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));
            if($qcek->num_rows()>0)
            {
                // echo 'udah ada ';
            } else {

                // $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));
            }

             // print_r(array('idinventory'=>$idinventory,'idunit'=>$idunit));
                foreach ($idunitdiremove as $key => $value) {
                    // echo $value;
                    if($value==$idunit)
                    {
                        $idunitada[]=$idunit;
                    }
                }
        }

        $aman=null;
        $gakaman=null;
        foreach ($idunitdiremove as $key => $value) {
            foreach ($idunitada as $key2 => $value2) {
                 if($value2==$value)
                {
                    $aman.=$value;
                } else {
                    $gakaman.=$value;
                    $sql = "delete from inventoryunit where idinventory=$idinventory and idunit";
                }
            }
           
        }
        // echo $gakaman;
        // print_r($idunitada);
        // $sql = "delete from inventoryunit where idinventory=$idinventory and idunit"

    }

    function prosesSaveProfile($images, $input = null) {
        $this->db->trans_begin();
        $idinventory = $this->input->post('idinventory');
        $namaunit2 = $this->input->post('namaunit2');
        

        $d = array(
            'invno' => $this->input->post('invno'),
            'nameinventory' => $this->input->post('nameinventory'),
            'description' => $this->input->post('description'),
            'isinventory' => $this->input->post('cbpersediaan') == 'on' ? 'TRUE' : 'FALSE',
            'issell' => $this->input->post('cbdijual') == 'on' ? 'TRUE' : 'FALSE',
            'isbuy' => $this->input->post('cbdibeli') == 'on' ? 'TRUE' : 'FALSE',
//            'images'=>$images,
//            'userin'=>$this->session->userdata('userid'),
            'usermod' => $this->session->userdata('userid'),
//            'datein'=>date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idinventorycat' => $this->m_data->getID('inventorycat', 'namecat', 'idinventorycat', $this->input->post('namecat')),
            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit'))
        );
//        print_r($d);

         if ($images != '' || $images != null) {
            $d['images'] = $images;
        } else {

            $d['images'] = 'inventory.png';
        }

        if ($idinventory != null) {
            // $this->db->where('idinventory', $idinventory);
            // $this->db->delete('inventoryunit');
            // $qunit = $this->db->get_where('unit',array('idcompany'=>$this->session->userdata('idcompany')));
            // foreach ($qunit->result() as $runit) {
                $idunitdiremove=null;

                $qcekremove = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
                foreach ($qcekremove->result() as $rremove) {
                    $idunitdiremove[]=$rremove->idunit;
                }

                foreach ($namaunit2 as $u) {
                    $idunit = $this->m_data->getID('unit', 'namaunit', 'idunit', $u);
                    $qcek = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));
                    if($qcek->num_rows()>0)
                    {

                    } else {
                        $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));
                    }
                }
            // }
            

            $this->db->where('idinventory', $idinventory);
            $this->db->update('inventory', $d);
        } else {
            $qseq = $this->db->query("select nextval('seq_inventory') as id")->row();
            $idinventory = $qseq->id;
            $d['idinventory'] = $idinventory;
            foreach ($namaunit2 as $u) {
                $this->db->insert('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$this->m_data->getID('unit', 'namaunit', 'idunit', $u)));
            }

             $d['userin'] = $this->session->userdata('userid');
            $d['datein'] = date('Y-m-d H:m:s');
            $this->db->insert('inventory', $d);
        }

        

        // if ($images != '' || $images != null) {
        //     $d['images'] = $images;
        // } else {

        //     $d['images'] = 'inventory.png';
        // }

        // if ($idinventory != null) {

        //     $this->db->where('idinventory', $idinventory);
        //     $this->db->update('inventory', $d);
        // } else {
        //     $d['userin'] = $this->session->userdata('userid');
        //     $d['datein'] = date('Y-m-d H:m:s');
        //     $this->db->insert('inventory', $d);
        // }
// echo $this->db->last_query();

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success:false, message:'Gagal menyimpan data'}";
        } else {
            $this->db->trans_commit();
            echo "{success:true, message:'Sukses menyimpan data'}";
        }
    }

    function saveBuy() {
        $datebuy = $this->input->post('datebuy');
        $tgl = explode("/", $datebuy);

        $this->db->trans_begin();

        $d = array(
            'cosaccount' => $this->input->post('cosaccount')?: null,
            'cost' => $this->input->post('cost'),
            'unitmeasure' => $this->input->post('unitmeasure'),
            'usermod' => $this->session->userdata('userid'),
            'idprimarysupplier' => $this->m_data->getID('supplier', 'namesupplier', 'idsupplier', $this->input->post('namesupplier')),
            'datemod' => date('Y-m-d H:m:s'),
            'yearbuy' => $tgl[2],
            'monthbuy' => $tgl[1],
            'datebuy' => backdate($datebuy),
            'idbuytax' => $this->m_data->getID('tax', 'nametax', 'idtax', $this->input->post('nametax'))
        );

        $this->db->where('idinventory', $this->input->post('idinventory'));
        $this->db->update('inventory', $d);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success:false, message:'Gagal menyimpan data'}";
        } else {
            $this->db->trans_commit();
            echo "{success:true, message:'Sukses menyimpan data'}";
        }
    }

    function saveSell() {
        $this->db->trans_begin();

        $d = array(
            'incomeaccount' => $this->input->post('incomeaccount'),
            'sellingprice' => $this->input->post('sellingprice'),
            'unitmeasuresell' => $this->input->post('unitmeasuresell'),
            'usermod' => $this->session->userdata('userid'),
//            'idprimarysupplier'=>$this->m_data->getID('supplier', 'namesupplier', 'idsupplier', $this->input->post('namesupplier')),
            'datemod' => date('Y-m-d H:m:s'),
            'idselingtax' => $this->m_data->getID('tax', 'nametax', 'idtax', $this->input->post('nametax'))
        );

        $this->db->where('idinventory', $this->input->post('idinventory'));
        $this->db->update('inventory', $d);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success:false, message:'Gagal menyimpan data'}";
        } else {
            $this->db->trans_commit();
            echo "{success:true, message:'Sukses menyimpan data'}";
        }
    }

    function saveInventory() {
        $this->db->trans_begin();

// residu:1000000
// umur:8
// akumulasibeban:1,125,000
// bebanberjalan:1,125,000
// nilaibuku:11,875,000
// bebanperbulan:125,000

        $d = array(
            'qtystock' => $this->input->post('qtystock'),
            'umur' => $this->input->post('umur'),
            'residu' => str_replace(",", "", cleardot2($this->input->post('residu'))),
            'akumulasibeban' => str_replace(",", "", cleardot2($this->input->post('akumulasibeban'))),
            'bebanberjalan' => str_replace(",", "", cleardot2($this->input->post('bebanberjalan'))),
            'nilaibuku' => str_replace(",", "", cleardot2($this->input->post('nilaibuku'))),
            'bebanperbulan' => str_replace(",", "", cleardot2($this->input->post('bebanperbulan'))),
            'usermod' => $this->session->userdata('userid'),
            'datemod' => date('Y-m-d H:m:s'),
            'akumulasiakhir'=>str_replace(",", "", cleardot2($this->input->post('akumulasiakhir'))),
        );

        $this->db->where('idinventory', $this->input->post('idinventory'));
        $this->db->update('inventory', $d);

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            echo "{success:false, message:'Gagal menyimpan data'}";
        } else {
            $this->db->trans_commit();
            echo "{success:true, message:'Sukses menyimpan data'}";
        }
    }

    function recordAdjusment() {
//nojurnalAdj:213213
//cbUnitEntryAdj:1
//tanggalAdj:2014-09-20T00:00:00
//memoAdj:dadas
//datagrid:[{"idinventory":"13","idaccount":"19","qty":"3","unitcost":"31111","amount":"93333","memo":"memo","invno":"xxx","nameinventory":"xxx","accnumber":"1-1500"}]

        $tgl = explode("-", date('Y-m-d'));


        $datagrid = json_decode($this->input->post('datagrid'));
        $nojurnalAdj = $this->input->post('nojurnalAdj');
        $cbUnitEntryAdj = $this->input->post('cbUnitEntryAdj');
        $tanggalAdj = backdate2(inputDate($this->input->post('tanggalAdj')));
        $memoAdj = $this->input->post('memoAdj');

        $this->db->trans_begin();

        $seq = $this->db->query("select nextval('seq_inventoryadjusment') as id")->row();

        $d = array(
            'idinvadjusment' => $seq->id,
            'nojournal' => $nojurnalAdj,
            'memo' => $memoAdj,
            'userin' => $this->session->userdata('userid'),
            'usermod' => $this->session->userdata('userid'),
            'datein' => date('Y-m-d H:m:s'),
            'datemod' => date('Y-m-d H:m:s'),
            'idunit' => $cbUnitEntryAdj,
            'dateadj' => $tanggalAdj,
            'month' => $tgl[1],
            'year' => $tgl[0],
        );

        $this->db->insert('inventoryadjusment', $d);

        foreach ($datagrid as $key => $value) {
            $ditem = array(
                'idinvadjusment' => $seq->id,
                'idinventory' => $value->idinventory,
                'idaccount' => $value->idaccount,
                //            onhand integer,
//                'counted' =>$value->qty,
                'diference' => $value->qty,
                //            qty integer,
                //            unitcost double precision,
                //            amount double precision,
                'memo' => $value->memo
            );
            $this->db->insert('inventoryadjitem', $ditem);
            
            //query account persediaan
            $weracc = array('idaccount'=>$value->idaccount,'idunit'=>$cbUnitEntryAdj);
            $qacc = $this->db->get_where('account',$weracc)->row();
            
            //penyesuaian jumlah di inventory
            // $jum = explode("-", $value->qty);
            // $wer = array('idinventory'=>$value->idinventory,'idunit'=>$cbUnitEntryAdj);
            // $qinv = $this->db->get_where('inventory',$wer)->row();
            // if(count($jum)>1)
            // {
            //     //pengurangan                
            //     $qty = $qinv->qtystock-$jum[1];    
                
            //     $amount = $qinv->cost*$jum[1];
            //     $newAmount = $qacc->balance-$amount;
            // } else {
            //     //penambahan
            //     $qty = $qinv->qtystock+$value->qty;    
            //     $amount = $qinv->cost*$value->qty; 
            //     $newAmount = $qacc->balance+$amount;
            // }
            
            // $this->db->where($wer);
            // $this->db->update('inventory',array('qtystock'=>$qty));
            
            //penyesuaian jumlah di account            
            // $this->db->where($weracc);
            // $this->db->update('account',array('balance'=>$newAmount));
        }

        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Penyesuaian Persediaan gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Penyesuaian Persediaan berhasil');
        }

        echo json_encode($json);
    }

    function getUnit()
    {
        $idinventory = $this->input->post('idinventory');
        // $q = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
        $sql = "select namaunit 
                from inventoryunit a
                join unit b ON a.idunit = b.idunit
                where idinventory=$idinventory";
        $q = $this->db->query($sql);
        $d = array();
        $num = $q->num_rows();
        $i=1;
        $str = null;
        foreach ($q->result() as $r) {
            $str.=$r->namaunit;
            if($i!=$num)
            {
                $str.=",";
            }
            $i++;
            // $d[] = $r->namaunit;
        }
        // echo json_encode($d);
        echo $str;
    }

    function itungPenyusutan($hargabeli,$residu,$tahun,$tgl,$ambilTahun=null)
    {
        $akumulasiPenyusutanAkhir= number_format($this->akumulasiTerakhir($hargabeli,$residu,$tahun,$tgl));

        if($tahun==0)
        {
            $tahun=1;
        }

        //tanggal ambil bulan
        $explode = explode("-", $tgl);
        $bulan = intval($explode[1]);
        // $tahun = intval($explode[0]);
        //umur ekonomis dikalikan bulan 
        $umur = $tahun*12;
        $tahunAkhir = intval($explode[0])+$tahun;

        //penyusutan tiap tahun
        $penyusutanTahun = ($hargabeli-$residu)/$tahun;
        $penyusutanBulan = ($hargabeli-$residu)/$umur;
        // echo $penyusutanBulan;

        //penyusutan akhir tahun berjalan
        // echo (13-$bulan);
        $penyusutanBerjalan = (13-$bulan)/12*$penyusutanTahun;

        //penyusutan tahun akhir
        // echo $penyusutanTahun;
        $penyusutanAkhir = (12-(13-$bulan))/12*$penyusutanTahun;
        // echo $penyusutanAkhir;
        
        $akumulasiPenyusutan=0;
        
        for ($i=$explode[0]; $i <$tahunAkhir+1 ; $i++) { 
            $bebanBerjalan = 0;
            if($i==$explode[0])
            {
                //beban penyusutan tahun berjalan awal
                $akumulasiPenyusutan+=$penyusutanBerjalan;
                $bebanBerjalan = $penyusutanBerjalan;
            } else if($i==$tahunAkhir)
            {
                //selesai
                $akumulasiPenyusutan+=$penyusutanAkhir;
                $bebanBerjalan = $penyusutanAkhir;
            } else {
                $akumulasiPenyusutan+=$penyusutanTahun;
                $bebanBerjalan=$penyusutanTahun;
            }

            $hargabeli-=$bebanBerjalan;

            // echo $i.' '.$ambilTahun.'<br>';

            $d = array(
                'tahun'=>$i,
                'penyusutanBulan'=>number_format($penyusutanBulan),
                'bebanBerjalan'=>number_format($bebanBerjalan),
                'akumulasiPenyusutan'=>number_format($akumulasiPenyusutan),
                'nilaiBuku'=>number_format($hargabeli),
                'akumulasiPenyusutanAkhir'=>$akumulasiPenyusutanAkhir
            );


           
            if($ambilTahun!=null)
            {
                if($i==$ambilTahun)
                {
                    // print_r($d);
                    // echo '<hr>';
                    echo json_encode($d);
                    break;
                }
            } else if($hargabeli==0)
                {
                    break;
                } else {
                     // print_r($d);
                     // echo '<hr>';
                    echo json_encode($d);
                }
        }
    }

    function akumulasiTerakhir($hargabeli,$residu,$tahun,$tgl)
    {
        if($tahun==0)
        {
            $tahun=1;
        }

        //tanggal ambil bulan
        $explode = explode("-", $tgl);
        $bulan = intval($explode[1]);
        // $tahun = intval($explode[0]);
        //umur ekonomis dikalikan bulan 
        $umur = $tahun*12;
        $tahunAkhir = intval($explode[0])+$tahun;

        //penyusutan tiap tahun
        $penyusutanTahun = ($hargabeli-$residu)/$tahun;
        $penyusutanBulan = ($hargabeli-$residu)/$umur;
        // echo $penyusutanBulan;

        //penyusutan akhir tahun berjalan
        // echo (13-$bulan);
        $penyusutanBerjalan = (13-$bulan)/12*$penyusutanTahun;

        //penyusutan tahun akhir
        // echo $penyusutanTahun;
        $penyusutanAkhir = (12-(13-$bulan))/12*$penyusutanTahun;
        // echo $penyusutanAkhir;
//        echo $explode[0].'+'.$tahun;
        $ambilTahun = $explode[0]+$tahun;
// echo $ambilTahun;
        $akumulasiPenyusutan=0;
        $akumulasiPenyusutanAkhir=0;
        for ($i=$explode[0]; $i <$tahunAkhir+1 ; $i++) { 
            $bebanBerjalan = 0;
            if($i==$explode[0])
            {
                //beban penyusutan tahun berjalan awal
                $akumulasiPenyusutan+=$penyusutanBerjalan;
                $bebanBerjalan = $penyusutanBerjalan;
            } else if($i==$tahunAkhir)
            {
                //selesai
                $akumulasiPenyusutan+=$penyusutanAkhir;
                $bebanBerjalan = $penyusutanAkhir;
            } else {
                $akumulasiPenyusutan+=$penyusutanTahun;
                $bebanBerjalan=$penyusutanTahun;
            }

            $hargabeli-=$bebanBerjalan;
            $akumulasiPenyusutanAkhir+=$akumulasiPenyusutan;
            // echo $akumulasiPenyusutan.'<br>';

           
            if($ambilTahun!=null)
            {
                if($i==$ambilTahun)
                {
                    // print_r($d);
                    // echo '<hr>';
                    // echo json_encode($d);
                    return $akumulasiPenyusutan;
                    break;
                }
            } else if($hargabeli==0)
                {
                    break;
                } else {
                     // print_r($d);
                     // echo '<hr>';
                    return $akumulasiPenyusutan;
                }
        }
    }

    function saveAccInventory()
    {
        $idinventory = $this->input->post('idinventory');
        $idunit = $this->input->post('idunit');

        $qcek = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory,'idunit'=>$idunit));
        if($qcek->num_rows()>0)
        {
            $this->db->where(array('idinventory'=>$idinventory,'idunit'=>$idunit));
            $this->db->update('inventoryunit',array(
                    'idinventory'=>$idinventory,
                    'idunit'=>$idunit,
                    'assetaccount'=>$this->input->post('assetaccount'),
                    'akumpenyusutaccount'=>$this->input->post('akumpenyusutaccount') ?: null,
                    'depresiasiaccount'=>$this->input->post('depresiasiaccount') ?: null,
                ));
        } else {
            $this->db->insert('inventoryunit',array(
                    'idinventory'=>$idinventory,
                    'idunit'=>$idunit,
                    'assetaccount'=>$this->input->post('assetaccount'),
                    'akumpenyusutaccount'=>$this->input->post('akumpenyusutaccount') ?: null,
                    'depresiasiaccount'=>$this->input->post('depresiasiaccount') ?: null,
                ));
        }

        if($this->db->affected_rows()>0)
        {
            $json = array('success' => true, 'message' => 'Berhasil');
        } else {
            $json = array('success' => false, 'message' => 'Gagal menyimpan data');
        }
            echo json_encode($json);
    }

    function save_transfer_stock(){
        $this->load->model('inventory/m_stock');

        $this->db->trans_begin();

        $statusform = $this->input->post('statusform');
        $mode = $this->input->post('mode');
        $idunit = $this->input->post('idunit');
        $transfer_stock_id = $this->m_data->getPrimaryID($this->input->post('transfer_stock_id'),'inventory_transfer', 'transfer_stock_id', $idunit);

        $data = array(
                'transfer_stock_id' => $transfer_stock_id,
                'idunit' =>$idunit,        
                'no_transfer' => $this->input->post('no_trans'),
                'memo' =>$this->input->post('memo'),
                'userin' =>$this->session->userdata('userid'),
                'datein' => date('Y-m-d H:m:s')
        );

        if($mode=='request'){
            $data['request_date'] = backdate($this->input->post('date_transfer'));
            $data['requestedby_d'] = $this->session->userdata('userid');
        } else {
            $data['approved_date'] = date('Y-m-d');
            $data['approvedby_id'] = $this->session->userdata('userid');
        }

        if($statusform=='input'){
            $this->db->insert('inventory_transfer',$data);
        } else {
            $this->db->where('transfer_stock_id',$transfer_stock_id);
            $this->db->update('inventory_transfer',$data);
        }

        $items = json_decode($this->input->post('datagrid'));

        $totalprice_retur = 0;
        foreach ($items as $value) {
            $warehouse_id_source = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);
            $warehouse_id_dest = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code_dest,'warehouse_id','warehouse',$idunit);
            // $inventory_transfer_item_id = inventory_transfer_item_id;
            // echo $warehouse_id;
            $ditem = array(
                    // 'inventory_transfer_item_id'=>$inventory_transfer_item_id,
                    'transfer_stock_id'=> $transfer_stock_id,
                    'idunit'=> $idunit,
                    'idinventory'=> $value->idinventory,
                    'warehouse_source_id'=> $warehouse_id_source,
                    'warehouse_dest_id'=> $warehouse_id_dest,
                    'qty_transfer'=>$value->qty_transfer,
                    'note'=> $value->note,
                    'datein'=> date('Y-m-d H:m:s')
            );

             if($statusform == 'input'){
                $q_seq = $this->db->query("select nextval('seq_inventory')");
                $ditem['inventory_transfer_item_id'] = $q_seq->result_array()[0]['nextval'];
                $this->db->insert('inventory_transfer_item', $ditem);
            }
            else if($statusform == 'edit'){
                $ditem['inventory_transfer_item_id'] = $value->inventory_transfer_item_id;
                $this->db->where('inventory_transfer_item_id', $ditem['inventory_transfer_item_id']);
                $this->db->update('inventory_transfer_item', $ditem);
            }

            if($mode=='apply'){
                 //update history stock - warehouse source - pengurangan
                $this->m_stock->update_history(11,$value->qty_transfer,$value->idinventory,$idunit,$warehouse_id_source,date('Y-m-d H:m:s'),'Inventory Transfer Out: '.$this->input->post('no_trans'));

                //update history stock - warehouse destination - penambahan
                $this->m_stock->update_history(10,$value->qty_transfer,$value->idinventory,$idunit,$warehouse_id_dest,date('Y-m-d H:m:s'),'Inventory Transfer In: '.$this->input->post('no_trans'));
            }
           
        }
        
        if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);        
    }

    function save_real_count(){
        $this->load->model('inventory/m_stock');

        $this->db->trans_begin();

        $statusform = $this->input->post('statusform_inventorycount');
        $idunit = $this->session->userdata('idunit');
        $status = $this->input->post('status');
        $inventory_count_id = $this->m_data->getPrimaryID($this->input->post('inventory_count_id'),'inventory_count', 'inventory_count_id', $idunit);

        $data = array(
                'inventory_count_id' => $inventory_count_id,
                'idunit' =>$idunit,        
                'status' => $status,
                'type_id' =>$this->input->post('type_id'),
                'notes' =>$this->input->post('notes'),
                'date_count' =>backdate($this->input->post('date_count')),
                'userin' =>$this->session->userdata('userid'),
                'datein' => date('Y-m-d H:m:s')
        );

        if($statusform=='input'){
            $this->db->insert('inventory_count',$data);
        } else {
            $this->db->where('inventory_count_id',$inventory_count_id);
            $this->db->update('inventory_count',$data);
        }

        $items = json_decode($this->input->post('ItemGrid'));

        foreach ($items as $value) {
            $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);

            $ditem = array(
                    // 'inventory_transfer_item_id'=>$inventory_transfer_item_id,
                    'inventory_count_id'=> $inventory_count_id,
                    'idunit'=> $idunit,
                    'idinventory'=> $value->idinventory,
                    'warehouse_id'=> $warehouse_id,
                    'qty_stock'=>$value->qty_stock,
                    'qty_count'=>$value->qty_count,
                    'variance'=>$value->variance,
                    'item_value'=>$value->item_value,
                    'total_value'=>$value->total_value,
                    'cost'=> $value->cost,
                    'sellingprice'=> $value->sellingprice,
                    'datein'=> date('Y-m-d H:m:s')
            );

             if($statusform == 'input'){
                $q_seq = $this->db->query("select nextval('seq_inventory')");
                $ditem['inventory_count_item_id'] = $q_seq->result_array()[0]['nextval'];
                $this->db->insert('inventory_count_items', $ditem);
            }
            else if($statusform == 'edit'){
                $ditem['inventory_count_item_id'] = $value->inventory_count_item_id;
                $this->db->where('inventory_count_item_id', $ditem['inventory_count_item_id']);
                $this->db->update('inventory_count_items', $ditem);
            }

            if($status==2){
                //confirmed
                if($value->qty_stock>$value->qty_count){
                    //pengurangan
                     $this->m_stock->update_history(5,$value->variance,$value->idinventory,$idunit,$warehouse_id,date('Y-m-d H:m:s'),'Inventory Real Count (-): '.$data['date_count']);
                } else {
                    //penambahan
                    $this->m_stock->update_history(4,$value->variance,$value->idinventory,$idunit,$warehouse_id,date('Y-m-d H:m:s'),'Inventory Real Count (+): '.$data['date_count']);
                }
            }
        }

         if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);   
    }

     function save_adjustment(){
        $this->load->model('inventory/m_stock');

        $this->db->trans_begin();

        $statusform = $this->input->post('statusform_InventoryAdjustment');
        $idunit = $this->session->userdata('idunit');
        $status = $this->input->post('status');
        $inventory_adjust_id = $this->m_data->getPrimaryID($this->input->post('inventory_adjust_id'),'inventory_adjust', 'inventory_adjust_id', $idunit);

        $data = array(
                'inventory_adjust_id' => $inventory_adjust_id,
                'idunit' =>$idunit,        
                'status' => $status,
                'idaccount_adjs' =>$this->input->post('idaccount_adjs'),
                'notes' =>$this->input->post('notes'),
                'date_adjustment' =>backdate($this->input->post('date_adjustment')),
                'userin' =>$this->session->userdata('userid'),
                'datein' => date('Y-m-d H:m:s')
        );

        if($statusform=='input'){
            $this->db->insert('inventory_adjust',$data);
        } else {
            $this->db->where('inventory_adjust_id',$inventory_adjust_id);
            $this->db->update('inventory_adjust',$data);
        }

        $items = json_decode($this->input->post('ItemGrid'));

        foreach ($items as $value) {
            $warehouse_id = $this->m_data->getIDmaster('warehouse_code',$value->warehouse_code,'warehouse_id','warehouse',$idunit);

            $ditem = array(
                    // 'inventory_transfer_item_id'=>$inventory_transfer_item_id,
                    'inventory_adjust_id'=> $inventory_adjust_id,
                    'idunit'=> $idunit,
                    'idinventory'=> $value->idinventory,
                    'warehouse_id'=> $warehouse_id,
                    'qty_stock'=>$value->qty_stock,
                    'qty_adjustment'=>$value->qty_adjustment,
                    'variance'=>$value->variance,
                    'item_value'=>$value->item_value,
                    'total_value'=>$value->total_value,
                    'cost'=> $value->cost,
                    'sellingprice'=> $value->sellingprice,
                    'datein'=> date('Y-m-d H:m:s')
            );

             if($statusform == 'input'){
                $q_seq = $this->db->query("select nextval('seq_inventory')");
                $ditem['inventory_adjust_item_id'] = $q_seq->result_array()[0]['nextval'];
                $this->db->insert('inventory_adjust_items', $ditem);
            }
            else if($statusform == 'edit'){
                $ditem['inventory_adjust_item_id'] = $value->inventory_adjust_item_id;
                $this->db->where('inventory_adjust_item_id', $ditem['inventory_adjust_item_id']);
                $this->db->update('inventory_adjust_items', $ditem);
            }

            if($status==2){
                //confirmed - buat jurnal, update stok inventory, hitung ulang hpp dan saldo akun persediaan
                $this->update_stok($idinventory,$idunit,$warehouse_id,$value->qty_adjustment);
            }
        }

         if($this->db->trans_status() === false){
            $this->db->trans_rollback();
            $json = array('success'=>false,'message'=>'An unknown error was occured');
        }else{
            $this->db->trans_commit();
            $json = array('success'=>true,'message'=>'The form has been submitted succsessfully');
        }
        echo json_encode($json);   
    }

    function update_stok($idinventory,$idunit,$warehouse_id,$stock){
        $tis->db->where(array(
            'idinventory'=>$idinventory,
            'warehouse_id'=>$warehouse_id,
            'idunit'=>$idunit
        ));
        $this->db->update('warehouse_stock',array('stock'=>$stock));
    }

    function get_by_sku2(){
        $idunit = $this->session->userdata('idunit');
        $inventory_type = $this->input->post('inventory_type');

        $wer_type = null;
        if($inventory_type !== false)
            $wer_type = "and inventory_type = $inventory_type";

        $sql = "select 
                    a.idinventory,
                    a.sku_no,
                    a.invno,
                    a.nameinventory,
                    a.minstock,
                    a.inventory_type,
                    a.measurement_id_one,
                    a.measurement_id_two,
                    a.measurement_id_tre,
                    a.unitmeasure as measurement_id_buy,
                    a.unitmeasuresell as measurement_id_sell,
                    a.ratio_two,
                    a.ratio_tre,
                    a.cost,
                    coalesce(a.hpp_per_unit,0) as hpp,
                    coalesce(f.stock,0) as stock_one,
                    b.short_desc as uom_one,
                    case
                        when b.short_desc is null then null
                        else coalesce(f.stock_two,0)
                    end as stock_two,
                    c.short_desc as uom_two,
                    case
                        when d.short_desc is null then null
                        else ceil(coalesce(f.stock_tre,0))
                    end as stock_tre,
                    d.short_desc as uom_tre,
                    g.brand_name
                from inventory a
                left join productmeasurement b on b.measurement_id = a.measurement_id_one
                left join productmeasurement c on c.measurement_id = a.measurement_id_two
                left join productmeasurement d on d.measurement_id = a.measurement_id_tre
                left join (
                    select sum(stock) as stock, sum(stock / b.ratio_two) as stock_two, sum(stock / b.ratio_tre) as stock_tre, idinventory_parent from warehouse_stock a
                    join inventory b on b.idinventory = a.idinventory
                    group by idinventory_parent
                ) f on f.idinventory_parent = a.idinventory
                left join brand g on g.brand_id = a.brand_id
                where true
                and a.deleted = 0
                and a.status = 1
                and a.idunit = $idunit
                and a.idinventory_parent is null
                $wer_type
                order by idinventory
                ";
        $q = $this->db->query($sql);
        echo '{success:true,numrow:' .$q->num_rows() . ',rows:' . json_encode($q->result_array()) . ' }';
    }

    function get_detail_item(){
        $idunit = $this->input->post('idunit');
        $idinventory_parent = $this->input->post('idinventory_parent');

        $wer_parent = null;
        if($idinventory_parent !== false)
            $wer_parent = "and a.idinventory_parent = $idinventory_parent";

        $sql = "select 
                    b.sku_no,
                    b.nameinventory,
                    a.invno,
                    a.notes,
                    a.idinventory,
                    a.cost,
                    a.no_batch,
                    coalesce(c.stock,0) as stock_one,
                    d.short_desc as uom_one,
                    case 
                        when b.measurement_id_two is null then null
                        else round(cast(coalesce(c.stock,0) / a.ratio_two as numeric),2) 
                    end as stock_two,
                    e.short_desc as uom_two,
                    case
                        when b.measurement_id_tre is null then null
                        else ceil(coalesce(c.stock,0) / a.ratio_tre) 
                    end as stock_tre,
                    f.short_desc as uom_tre,
                    g.warehouse_code,
                    h.received_date
                from inventory a
                join inventory b on a.idinventory_parent = b.idinventory
                join warehouse_stock c on c.idinventory = a.idinventory
                left join productmeasurement d on d.measurement_id = b.measurement_id_one
                left join productmeasurement e on e.measurement_id = b.measurement_id_two
                left join productmeasurement f on f.measurement_id = b.measurement_id_tre
                left join warehouse g on g.warehouse_id = c.warehouse_id
                left join goods_receipt h on h.no_goods_receipt = a.no_transaction
                where true
                and a.deleted = 0
                and a.status = 1
                and a.idunit = $idunit
                $wer_parent
                order by a.idinventory_parent, a.idinventory";
        
        $q = $this->db->query($sql);
        echo '{success:true,numrow:' .$q->num_rows() . ',rows:' . json_encode($q->result_array()) . ' }';
        
    }
    function get_by_sku(){
        $wer = null;

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');

        $limitoffset = null;
        if($start!='' && $limit!=''){
            $limitoffset = " limit 100 offset $start";
        }

        $extraparams = $this->input->post('extraparams');
        if($extraparams !== FALSE){
            foreach(explode(",", $extraparams) as $param){
                $tmp = explode(":", $param);
                if($tmp[1] != 'null')
                    $wer .= ' and a.'.$tmp[0].' = '.$tmp[1];
            }
        }
        
        $query = $this->input->post('query');
        if($query!=''){
            $wer = " and (a.sku_no like '%".strtoupper($query)."%' OR a.sku_no like '%".strtolower($query)."%')"; //by sku
            $wer .= " OR (a.nameinventory like '%".strtoupper($query)."%' OR a.nameinventory like '%".strtolower($query)."%')"; //by inventory name
            $wer .= " OR (a.invno like '%".strtoupper($query)."%')"; //by kode barang
        }

        $sql = "select a.idinventory,sku_no,a.idinventory_parent,nameinventory,a.cost,a.hpp_per_unit,a.unitmeasure, e.short_desc as satuan_beli, a.measurement_id_one, a.measurement_id_two,a.measurement_id_tre,b.short_desc AS satuan_pertama, 
                        c.short_desc AS satuan_kedua, a.panjang_satuan_id, a.tinggi_satuan_id, a.lebar_satuan_id, a.berat_satuan_id, a.ketebalan_satuan_id, a.diameter_satuan_id,totalitem,a.bahan_coil_id,a.hpp_per_unit
                    from inventory a
                    LEFT JOIN productmeasurement b 
                                            ON a.measurement_id_one = b.measurement_id 
                    LEFT JOIN productmeasurement c 
                                ON a.measurement_id_two = c.measurement_id 
                    left join (select idinventory_parent,count(*) as totalitem
                                            from inventory
                                            GROUP BY idinventory_parent
                                        ) d ON a.idinventory = d.idinventory_parent
                    LEFT JOIN productmeasurement e 
                                            ON a.unitmeasure = e.measurement_id 
                    where a.display is null and a.idinventory_parent is null $wer
                    GROUP BY a.idinventory,sku_no,d.totalitem,a.idinventory_parent,a.nameinventory,a.cost,a.hpp_per_unit,a.measurement_id_one,a.measurement_id_two,a.measurement_id_tre,b.short_desc,c.short_desc, a.panjang_satuan_id, a.tinggi_satuan_id, a.lebar_satuan_id, a.berat_satuan_id, a.ketebalan_satuan_id, a.diameter_satuan_id, e.short_desc,a.unitmeasure,a.bahan_coil_id";
        $q = $this->db->query($sql);
        $qtotalrows = $this->db->query($sql);
        $dataArr = $q->result_array();
        // print_r($dataArr);
        $i=0;
        foreach ($dataArr as $key => $value) {

            $qcek = $this->db->query("select idinventory from inventory 
	                where idinventory_parent = ".$value['idinventory']." ");
                  

            if($qcek->num_rows()<=0){
                 $qstok = $this->db->query("select sum(totalstock) as totalstock from (select a.idinventory,idinventory_parent,sum(a.stock) as totalstock 
                                            from warehouse_stock a join inventory b ON a.idinventory = b.idinventory 
                                            where a.idinventory = ".$value['idinventory']." group by a.idinventory,idinventory_parent) a");
                   // echo $this->db->last_query();

                if($qstok->num_rows()>0){
                    $rstok = $qstok->row();
                        $dataArr[$i]['totalstock'] = $rstok->totalstock;
                        if($dataArr[$i]['totalstock'] == 0)
                            $dataArr[$i]['totalitem'] = 0;
                        else
                            $dataArr[$i]['totalitem'] = 1;
                    
                } else {
                    $dataArr[$i]['totalstock'] = 0;
                }    
                    
            } else {
                 //menghitung total stok dari seluruh gudang
                    $qstok = $this->db->query("select sum(totalstock) as totalstock
                                        from (select a.idinventory,idinventory_parent,sum(a.stock) as totalstock 
                                                    from warehouse_stock a
                                                    join inventory b ON a.idinventory = b.idinventory
                                                    where a.idinventory IN (select idinventory from inventory where idinventory_parent = ".$value['idinventory'].")				
                                                    group by a.idinventory,idinventory_parent) a");
                                                    // echo $this->db->last_query();
                if($qstok->num_rows()>0){
                    $rstok = $qstok->row();
                        $dataArr[$i]['totalstock'] = $rstok->totalstock;
                        // if($dataArr[$i]['totalstock'] == 0)
                        //     $dataArr[$i]['totalitem'] = 0;
                        // else
                        //     $dataArr[$i]['totalitem'] = 1;
                    
                } else {
                    $dataArr[$i]['totalstock'] = 0;
                }    
            }

           
            if($qstok->num_rows()>0){
                $rstok = $qstok->row();
                $dataArr[$i]['totalstock'] = $rstok->totalstock;
                // if($dataArr[$i]['totalstock'] == 0)
                //     $dataArr[$i]['totalitem'] = 0;
                // else
                //     $dataArr[$i]['totalitem'] = 1;
                
            } else {
                $dataArr[$i]['totalstock'] = 0;
            }    

             //start konversi stok #2
            //  echo $value['bahan_coil_id'].' ';
            if(intval($value['bahan_coil_id'])!=0){
                //ambil ke tabel konversi
                $qcn = $this->db->query("select berat from bahan_coil where bahan_coil_id = ".$value['bahan_coil_id']."");
                if($qcn->num_rows()>0){
                    $rqcn = $qcn->row();
                    if($dataArr[$i]['totalstock']!=0){
                        $dataArr[$i]['stock_kedua'] = $dataArr[$i]['totalstock'] / $rqcn->berat;
                    } else {
                       $dataArr[$i]['stock_kedua'] = 0;
                    }
                    
                } else {
                    $dataArr[$i]['stock_kedua'] = 0;
                }
                
            } else {
                $dataArr[$i]['stock_kedua'] = 0;
            }
            //end konversi stok #2

            $i++;                                             
        }

        echo '{success:true,numrow:' .$qtotalrows->num_rows() . ',results:' . $qtotalrows->num_rows() .',rows:' . json_encode($dataArr) . ' }';
    }

    function update_hpp($idunit,$tipe,$idpurchase=null){
        /*
            hitung hpp per unit inventory

            tipe:
            1. LIFO
            2. FIFO
            3. Average
        */

        // update inisial nominal persediaan
        // $qinv = $this->db->query('select a.idinventory,cost,totalstock,a.hpp_per_unit
        //                             from inventory a
        //                             left join inventoryunit b ON a.idinventory = b.idinventory
        //                             left join (select idinventory,sum(stock) as totalstock
        //                                 from warehouse_stock
        //                                 group by idinventory) c ON a.idinventory = c.idinventory');
        // foreach($qinv->result() as $r){
        //     if($r->cost == null){
        //         if($r->hpp_per_unit == null){
        //             $cost = 0;
        //         } else {
        //             $cost = $r->hpp_per_unit;
        //         }
        //     } else {
        //         $cost = $r->cost;
        //     }

        //     $this->db->where('idinventory',$r->idinventory);
        //     $this->db->update('inventory',array(
        //         'nominal_persediaan'=>$cost*$r->totalstock
        //     ));
        // }
        // end update inisial nominal persediaan

        $this->load->model('inventory/m_stock');
        $q = $this->db->get('purchase');
        foreach($q->result() as $r){
            print_r($this->m_stock->update_hpp($idunit,$tipe,$r->idpurchase));
        }
    }

    function reset_stok($idunit){
        //reset stok inventory ke stok awal pada tabel history_stock
        $w = $this->db->get('warehouse');
        foreach($w->result() as $r){

            $qinv = $this->db->get_where('inventory',array('display'=>null));
            foreach($qinv->result() as $rinv){
                $qstok = $this->db->query("select old_qty,no_transaction
                    from stock_history
                    where idunit = $idunit and idinventory = ".$rinv->idinventory." and warehouse_id = ".$r->warehouse_id."
                    order by datein asc
                    limit 1");
                if($qstok->num_rows()>0){
                    $rstok = $qstok->row();
                    $qty = $rstok->old_qty == null ? 0 : $rstok->old_qty;

                    //update stok paling awal
                    $this->db->where(array(
                        'idinventory'=>$rinv->idinventory,
                        'warehouse_id'=>$r->warehouse_id
                    ));
                    $this->db->update('warehouse_stock',array(
                        'stock'=>$qty
                    ));

                    //hapus history stok kecuali yg paling awal
                    $this->db->query("delete 
                                from stock_history
                                where idunit = $idunit and idinventory = ".$rinv->idinventory." 
                                and warehouse_id = ".$r->warehouse_id."");
                }
            }
            
            
        }
    }

    // function hapusInventory()
    // {
    //     //delete:inventorydeprec,inventorydeprecitem 
    //     //hidden:inventory by unit
    //     //decrese amount: inventoryunit(assetaccount,akumpenyusutaccount,depresiasiaccount) by unit

    //     $records = json_decode($this->input->post('postdata'));
    //     foreach ($records as $id) {
    //         $arrWer = array('idinventory'=>$id);
    //         $this->db->where($arrWer);
    //         $this->db->delete('inventorydeprecitem');
    //         $this->db->where($arrWer);
    //         $this->db->delete('inventorydeprec');

    //         $qstok = $this->db->get_where('inventory',array('idinventory'=>$id))->row();
    //         $amount = $qstok->cost*$qtystock->qtystock;

    //         //decrese amount: inventoryunit(assetaccount,akumpenyusutaccount,depresiasiaccount) by unit
    //         $this->db->select('idunit');
    //         $q = $this->db->get_where('inventoryunit',$arrWer);
    //         foreach ($q->result() as $r) {
    //             # code...
    //         }
    //     }
    // }

    // function hapusInventory()
    // {
    //     $records = json_decode($this->input->post('postdata'));
    //     foreach ($records as $id) {
    //         $q = $this->db->get_where('purchaseitem',array('idinventory'=>$id));
    //         foreach ($q->result() as $r) {
    //             $qpurchase = $this->db->get_where('purchase',array('idpurchase'=>$r->idpurchase))->row();
    //             $idjournal = $qpurchase->idjournal;

    //             //ambil akun inventory
    //             $qacc = $this->db->get_where('inventoryunit',array('idinventory'=>$id,'idunit'=>$qpurchase->idunit))->row();

    //             //kurangin di debit
    //             $qlog = $this->db->get_where('accountlog',array('idaccount'=>$id,'idunit'=>$qpurchase->idunit))->row();
    //             $this->db->
    //         }
    //     }
    // }

}



?>