<?php

//require_once($_SERVER['DOCUMENT_ROOT'].'/bablast/assets/libs/Smarty.class.php');
require_once(DOCUMENTROOT.'/assets/libs/SmartyBC.class.php');
        
class MY_Controller extends CI_Controller{
    
    public $smarty;
    public $bahasa;
    public $logo;
            
    function __construct() {
        parent::__construct();
        
        $this->smarty = new SmartyBC();
        //$this->load->helper('alert');
        $this->load->model(array('m_user','m_data'));  
        $this->load->model('account/m_account');
        $this->load->model('journal/m_journal');
        $this->load->model('purchase/m_purchase');
        $this->load->helper('common');
        
        $this->smarty->template_dir = DOCUMENTROOT.'/assets/template/templates/';
        $this->smarty->compile_dir = DOCUMENTROOT.'/assets/template/templates_c/';
        $this->smarty->config_dir = DOCUMENTROOT.'/assets/template/configs/';
        $this->smarty->cache_dir = DOCUMENTROOT.'/assets/template/cache/';
        
        $company = $this->db->query("select logo,companyname from company")->row();

        if($company->logo==null)
        { 
            $this->logo = "<font style='font-size:17px;color:#000;'>".$company->companyname."</font>";
        } else {
            $this->logo = "<img src=\"".base_url('/upload/').'/'.$company->logo."\" width=150/>";

        }

        // $this->logo = 'asdsdsadsa';
        // echo $company->logo;
        // $this->companyname = $company->companyname;
// echo 'asdasd';
        $this->smarty->assign('assets_url',$this->assets_url());
        $this->smarty->assign('site_url',  site_url());
        $this->smarty->assign('base_url',  base_url());
        $this->smarty->assign('usergroup',  $this->session->userdata('usergroup'));
        $this->smarty->assign('group_id',  $this->session->userdata('group_id'));
        $this->smarty->assign('userid',  $this->session->userdata('userid'));
        $this->smarty->assign('username',  $this->session->userdata('username'));
        $this->smarty->assign('unit',  $this->session->userdata('unit'));
        $this->smarty->assign('idunit',  $this->session->userdata('idunit'));
        $this->smarty->assign('idcompany',  $this->session->userdata('idcompany'));
        $this->smarty->assign('periode',  $this->session->userdata('periode'));
        $this->smarty->assign('logoheader',  $company->logo);
        $this->smarty->assign('dir_app',DIR_APP);
        
       // $this->smarty->assign('account_type',$this->session->userdata('group_name'));

        if($this->session->userdata('group_id')>1)
        {
            //selain Administrator
            $this->smarty->assign('companyname',  $this->session->userdata('unit'));
        } else {
            $this->smarty->assign('companyname',  $company->companyname);
        }

        $this->smarty->assign('appname','RedsFin - Cloud Enterprise Resource Planning');
        
        if($this->session->userdata('logged')==false && $this->uri->segment(1)!='login')
        {
           redirect('login');
        } else {
             $this->smarty->assign('pegawainid',  $this->session->userdata('userid'));
             $this->smarty->assign('pegawainama',  $this->session->userdata('username'));
        }
//        echo  $this->session->userdata('userid');
        if($this->session->userdata('group_id')) {
          //  $this->smarty->assign('menu',$this->m_sistem->getMenu());
        }
        
                 
      
    }

    function cekAksesUser($id,$option)
    {
        // $id = $this->input->post('idmenu');
        if($option=='view')
        {
            $msg = 'mengakses menu ini';
        } else if($option=='add')
        {
            $msg = 'menambah data';
        } else if($option=='edit')
        {
            $msg = 'mengubah data ini';
        } else if($option=='delete')
        {
            $msg = 'menghapus data ini';
        }

        // echo 'option:'.$option;
        $this->db->select($option);
        $q = $this->db->get_where('hakakses',array('sys_menu_id'=>$id,'group_id'=>$this->session->userdata('group_id')));
        if($q->num_rows()>0)
        {
            // echo $this->db->last_query();
            $r = $q->row();
            if($r->$option==null)
            {
                $json = array('success' => false,"message"=>"Anda tidak berhak untuk $msg");
            } else {
                $json = array('success' => true);
            }
        } else {
             $json = array('success' => false,"message"=>"Anda tidak berhak untuk $msg");
        }
        // echo json_encode($json);
        return $json;
    }
    


    function assets_url()
    {
        return base_url().'/assets/';
    }
    
    function alert_red($msg)
    {
        return "<div class=\"alert alert-danger\"> 
                <button type=\"button\" class=\"close\" data-dismiss=\"alert\">
                <i class=\"icon-remove\"></i>
                </button> 
                <i class=\"icon-ban-circle\"></i>
                <strong>$msg</strong></div>";
    }
}
?>
