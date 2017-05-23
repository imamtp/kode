<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class sistem extends MY_Controller {

    public function index() {
        
    }
    
    function sysmenudata($parent, $expanded=false)
    {
        // echo 'asds'.$expanded;
         $json = "{
                    \"text\": \".\",
                    \"children\": [
                        " . $this->createMenu($parent, $expanded) . "
                    ]
                }";
       echo $json;
    }
    
    function createMenu($PARENT,$expanded) {
        $sql = "SELECT a.sys_menu_id,a.menu_name,a.menu_link,a.parent,a.sort,a.icon,a.description,b.menu_name as menuinduk,b.sys_menu_id as sys_menu_id_induk,c.view,c.add,c.edit,c.delete
                from sys_menu a
                left join sys_menu b ON a.parent = b.sys_menu_id
                left join hakakses c ON c.group_id = 5 and c.sys_menu_id = a.sys_menu_id";

        if($expanded!=false)
            {
                $sql .=" where a.display is null and a.menu_link!=''";
            } else {
                $sql .=" where a.display is null and a.parent=$PARENT";
            }

            // if($expanded!=false)
            // {
                // $sql.=" ORDER BY a.menu_name asc";
            // } else {
                // $sql.=" ORDER BY a.sort asc";
            // }
        // echo $sql;
        $query = $this->db->query($sql);


        $menu = "";
        foreach ($query->result() as $r) {
            if($expanded!=false)
            {
                $leaf = 'true';
            } else {
                $leaf = $this->cekChildMenu($r->sys_menu_id);
            }
            
            $this->db->select('menu_name');
            $qinduk = $this->db->get_where('sys_menu',array('sys_menu_id'=>$r->parent,'display'=>null));
            if($qinduk->num_rows()>0)
            {
                $rinduk = $qinduk->row();
                $menu_name = $rinduk->menu_name." <img src='./assets/icons/fam/arrow_right.png'> ".$r->menu_name;
            } else {
                $menu_name = $r->menu_name;
            }

            $icon = $r->icon==null ? 'open-folder' : $r->icon;
            $menu .= "{";
            $menu .= "\"id\": \"$r->sys_menu_id\",
                    \"text\": \"$menu_name\",
                    \"menu_link\": \"$r->menu_link\",
                    \"sys_menu_id\": \"$r->sys_menu_id\",
                    \"menuinduk\": \"$r->menuinduk\",
                    \"sys_menu_id_induk\": \"$r->sys_menu_id_induk\",
                    \"parent\": \"$r->parent\",
                    \"sort\": \"$r->sort\",
                    \"iconCls\": \"$icon\",
                    \"icon\": \"$r->icon\",
                    \"view\": \"$r->view\",
                    \"add\": \"$r->add\",
                    \"edit\": \"$r->edit\",
                    \"delete\": \"$r->delete\",
                    \"description\": \"$r->description\",
                    \"leaf\": $leaf";
//            echo $leaf;

            // if($expanded!=false)
            // {
            //     $menu .=",\"expanded\": \"true\"";
            // }

            if ($leaf == 'false') {
                $menu .=",\"children\": [" . $this->makeSubMenu($r->sys_menu_id,$expanded) . "]";
            }

            $menu .="},";
        }
        return $menu;
    }
    
    function cekChildMenu($id) {
        $q = $this->db->get_where('sys_menu', array('parent' => $id));

        if ($q->num_rows() > 0) {
            return 'false';
        } else {
            return 'true';
        }
    }
    
    function makeSubMenu($parent, $expanded) {
        return $this->createMenu($parent, $expanded);
    }
    
    function getaksesmenuunit()
    {
        $idmenu = $this->input->post('idmenu');
        $qunit = $this->db->get_where('unit',array('display'=>null));
       return $this->fetchJsonAksesMenu($qunit,array('idunit','namaunit','checked'),$idmenu);
    }
    
    function getaksesmenu()
    {
        $id = $this->input->post('id');
        $this->db->join('sys_group','sys_group.group_id = sys_group_menu.group_id');
        $q  = $this->db->get_where('sys_group_menu',array('sys_menu_id'=>$id));
        $v = null;
        foreach($q->result() as $r)
        {
            $v.=$r->group_name.',';
        }
        $v = substr($v, 0, -1);;
        echo $v;
    }
    
    function fetchJsonAksesMenu($q, $field,$idmenu) {
        // echo $this->db->last_query();
        $num = $q->num_rows();
        if ($num > 0) {
            $success = 'true';

            //bikin data array
            $i = 0;
            foreach ($q->result_array() as $r) {
                for ($if = 0; $if < count($field); $if++) {
					if($field[$if]=='checked')
					{
                        $qcek = $this->db->get_where('sys_menu_unit',array('idunit'=>$r['idunit'],'sys_menu_id'=>$idmenu));
                        if($qcek->num_rows()>0)
                        {
                            $rcek = $qcek->row();
                            if($rcek->sys_menu_id==null)
                            {
                                $d[$i][$field[$if]] = false;  
                            } else {
                                $d[$i][$field[$if]] = true;  
                            }
                        } else {
                            $d[$i][$field[$if]] = false;    
                        }
						
					} else {
						$d[$i][$field[$if]] = $r[$field[$if]];	
					}
                    
                }
                $i++;
            }
        } else {
            $success = 'false';
        }

        //bikin notasi json dari data array diatas
        $json = "{
                \"success\": $success,
                \"data\": [";
//           $json = "[";
        // $i=0;
        $j = 1;
        for ($i = 0; $i < $num; $i++) {
            $json .= "{";

            for ($if = 0; $if < count($field); $if++) {
                # code...
//                echo $d[$i][$field[$if]].' ';
                $json .="" . $field[$if] . ": '" . $d[$i][$field[$if]] . "'";

                $c = count($field);
                $c--;
//                echo $if." < ".$c." ";
                if ($if != $c) {
                    $json .=",";
                }
            }

            if ($j == $num) {
                $json .= "}";
            } else {
                $json .= "},";
            }
            $j++;
        }

//        $json .="]";
        $json .="]}";
//         $json = str_replace(" ", "", $json);
        echo $json;
    }
    
    function getUnit()
    {
        // $q = $this->db->get_where('inventoryunit',array('idinventory'=>$idinventory));
        $sql = "select idunit,namaunit 
                from unit
                where display is null";
        $q = $this->db->query($sql);
        $d = array();
        $num = $q->num_rows();
        $i=1;
        $str = null;
        foreach ($q->result() as $r) {
//            $str.=$r->namaunit;
            if($i!=$num)
            {
                $str.="[$r->idunit,$r->namaunit],";
            }
            $i++;
            // $d[] = $r->namaunit;
        }
        // echo json_encode($d);
        echo $str;
    }
	
    function hapusmenu()
    {
        $retAkses = $this->cekAksesUser(102,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }

//        $records = json_decode($this->input->post('postdata'));
//        foreach ($records as $id) {
//        }
        $this->db->trans_begin();
        
        $id = $this->input->post('id');
        $q = $this->db->get_where('sys_menu',array('parent'=>$id));
        foreach($q->result() as $r)
        {
            $this->hapussubmenu($r->sys_menu_id);
        }        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_group_menu');
        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_menu');
        
        
        
         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Hapus menu gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Hapus menu berhasil');
        }

        echo json_encode($json);
    }
    
    function hapussubmenu($id)
    {
        $q = $this->db->get_where('sys_menu',array('parent'=>$id));
        foreach($q->result() as $r)
        {
            $this->recHapusMenu($r->sys_menu_id);
            $this->db->where('sys_menu_id',$r->sys_menu_id);
            $this->db->delete('sys_menu');
        }        
        $this->db->where('sys_menu_id',$id);
        $this->db->delete('sys_menu');
    }
    
    function recHapusMenu($id)
    {
        $retAkses = $this->cekAksesUser(102,'delete');
        if(!$retAkses['success'])
        {
            echo json_encode($retAkses);
            exit;
        }
        $this->hapussubmenu($id);
    }
    
    function cekAkses()
    {
        $rule_id = $this->input->post('rule_id');
        $group_id = $this->session->userdata('group_id');
        
        $q = $this->db->get_where('sys_group_rules',array('group_id'=>$group_id,'rule_id'=>$rule_id));
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if($r->grantaccess==null || $r->grantaccess=='TIDAK') 
            {
                echo 'TIDAK';
            } else {
                echo 'YA';
            }
        } else {
            echo 'TIDAK';
        }
    }
    
    function saveRuleChange()
    {
        $this->db->trans_begin();
        
        $group_id = $this->input->post('group_id');
        $rule_id = $this->input->post('rule_id');
        $grantaccess = $this->input->post('grantaccess');
        $this->db->where(array('group_id'=>$group_id,'rule_id'=>$rule_id));
        $this->db->update('sys_group_rules',array('grantaccess'=>$grantaccess));
        
         if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $json = array('success' => false, 'message' => 'Gagal');
        } else {
            $this->db->trans_commit();
            $json = array('success' => true, 'message' => 'Berhasil');
        }

        echo json_encode($json);
    }

    function updateHakAkses()
    {
        $option = $this->input->post('option');
        $checked = $this->input->post('checked');
        $index = $this->input->post('index');
        $id = $this->input->post('id');
        $group_id = $this->input->post('group_id');

        $data = array(
            "sys_menu_id" => $id,
            "group_id" => $group_id,
            // "view" bool,
            // "edit" bool,
            // "delete" bool,
            // "add" bool,
            "usermod" => $this->session->userdata('username'),
            "datemod" => date('Y-m-d'),
        );
        $data[$option] = $checked=='false' ? null : $checked;

        $q = $this->db->get_where('hakakses',array('sys_menu_id'=>$id,'group_id'=>$group_id));
        if($q->num_rows()>0)
        {
            $this->db->where(array('sys_menu_id'=>$id,'group_id'=>$group_id));
            $this->db->update('hakakses',$data);
        } else {
            $this->db->insert('hakakses',$data);
        }

    }

    function cekHakAkses()
    {
        $id = $this->input->post('idmenu');
        $this->db->select('view');
        $q = $this->db->get_where('hakakses',array('sys_menu_id'=>$id,'group_id'=>$this->session->userdata('group_id')));
        if($q->num_rows()>0)
        {
            $r = $q->row();
            if($r->view==null)
            {
                $json = array('success' => false);
            } else {
                $json = array('success' => true);
            }
        } else {
             $json = array('success' => false);
        }
        // echo $this->db->last_query();
        echo json_encode($json);
    }

    function reset_data($idunit)
    {
        $this->db->trans_begin();

        $this->db->where('idunit',$idunit);
        $this->db->delete('accounthistory');

        $this->db->where('idunit',$idunit);
        $this->db->delete('accountlog');

        $this->db->where('idunit',$idunit);
        $this->db->delete('clossing');

        //
        $q = $this->db->get_where('employee',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idemployee',$r->idemployee);
            $this->db->delete('dataanak');

             $this->db->where('idemployee',$r->idemployee);
            $this->db->delete('datasutri');
        }
         $this->db->where('idunit',$idunit);
        $this->db->delete('employee');
        //

        //
        $q = $this->db->get_where('journal',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('disbursment');

            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('journalitem');

            $qj = $this->db->get_where('journalrec',array('nojournal'=>$r->nojournal));
            foreach ($qj->result() as $rqj) {
                $this->db->where('idjournalrec',$rqj->idjournalrec);
                $this->db->delete('journalitemrec');
            }
            $this->db->where('nojournal',$r->nojournal);
            $this->db->delete('journalrec');

            
            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('piutanghistory');

            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('piutangpayhistory');

            //purchase
            $qj = $this->db->get_where('purchase',array('idjournal'=>$r->idjournal));
            foreach ($qj->result() as $rqj) {
                $this->db->where('idpurchase',$rqj->idpurchase);
                $this->db->delete('purchaseitem');
            }
            $this->db->where('idjournal',$r->idjournal);
            $this->db->delete('purchase');
            //end purchase
        }
         $this->db->where('idunit',$idunit);
        $this->db->delete('journal');
        //


         //
        $this->db->where('idunit',$idunit);
        $this->db->delete('inventoryunit');

        $q = $this->db->get_where('inventory',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idinventory',$r->idinventory);
            $this->db->delete('inventorydeprecitem');          
        }

        $this->db->where('idunit',$idunit);
        $this->db->delete('inventorydeprec');

        $this->db->where('idunit',$idunit);
        $this->db->delete('inventory');
        //

         $this->db->where('idunit',$idunit);
        $this->db->delete('linkedaccunit');

         $this->db->where('idunit',$idunit);
        $this->db->delete('linkpiutang');

         $this->db->where('idunit',$idunit);
        $this->db->delete('pelanggan');

        $this->db->where('idunit',$idunit);
        $this->db->delete('journal');
       
        $this->db->where('idunit',$idunit);
        $this->db->update('account',array('balance'=>0));

        $q = $this->db->get_where('spendmoney',array('idunit'=>$idunit));
        foreach ($q->result() as $r) {
            $this->db->where('idspendmoney',$r->idspendmoney);
            $this->db->delete('spendmoneyitem');          
        }
        $this->db->where('idunit',$idunit);
        $this->db->delete('spendmoney');

        if ($this->db->trans_status() === FALSE)
        {
                $this->db->trans_rollback();
        }
        else
        {
                $this->db->trans_commit();
        }
    }

    function testis()
    {
        $qgrup = $this->db->get_where('sys_group',array('display'=>null));
        foreach ($qgrup->result() as $rg) {
            $qmenu = $this->db->get_where('sys_menu',array('display'=>null));
            foreach ($qmenu->result() as $r) {
                    $datam = array(
                        "sys_menu_id" => $r->sys_menu_id,
                        "group_id" => $rg->group_id,
                        "view" => 'TRUE',
                        "edit" => 'TRUE',
                        "delete" => 'TRUE',
                        // "usermod" varchar(20),
                        // "datemod" timestamp(6),
                        "add" => 'TRUE'
                    );
                    $this->db->insert('hakakses',$datam);
            }
        }
        
    }
	
}
?>