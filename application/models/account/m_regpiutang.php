<?php

class m_regpiutang extends CI_Model {

    function tableName() {
        return 'registrasipiutang';
    }

    function pkField() {
        return 'idregistrasipiutang';
    }

    function searchField() {
        $field = "c.accname,namecustomer";
        return explode(",", $field);
    }

    function selectField() {
        return "idregistrasipiutang,autodecrease,f.idcustomer,f.nocustomer,f.namecustomer,a.idunit,a.idaccount,a.idaccountlink,a.tglpiutang,c.accname as accnamepiutang,namaunit,bulan,tahun,a.description,jumlah,sisapiutang,d.accnumber as accnumberlink,d.accname,namecustomer,nocustomer";
    }
     function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'idregistrasipiutang'=>'idregistrasipiutang'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    join unit b ON a.idunit = b.idunit
                    join account c ON a.idaccount = c.idaccount and a.idunit = c.idunit
                    left join customer f ON a.idcustomer = f.idcustomer
                join account d ON a.idaccountlink = d.idaccount  and a.idunit = d.idunit";

        return $query;
    }

    function whereQuery() {
        return "a.sisapiutang!=0";
    }

    function orderBy() {
        return "idregistrasipiutang";
    }

    function updateField() {
        $data = array(
            'idregistrasipiutang' => $this->input->post('idregistrasipiutang') == '' ? $this->m_data->getSeqVal('seq_registrasipiutang') : $this->input->post('idregistrasipiutang'),
            'idaccount' => $this->input->post('idaccount'),
            // 'bulan' => ambilNoBulan($this->input->post('namabulan')),
            // 'tahun' => $this->input->post('tahun'),
            'idcustomer' => $this->input->post('idcustomer'),
             'idaccountlink' => $this->input->post('idaccountlink'),
            // 'idpelanggan' => $this->m_data->getID('pelanggan', 'nama', 'idpelanggan', $this->input->post('nama')),
            'tglpiutang' => $this->input->post('tglpiutang'),
            'autodecrease' => $this->input->post('autodecrease'),
            'description' => $this->input->post('description'),
            'jumlah' => str_replace(".", "", $this->input->post('jumlah')),
            'idunit' => $this->input->post('idunit')
        );
        return $data;
    }

    function saveHistory($idregistrasipiutang,$tanggal,$bayar,$sisa,$idjournal)
    {
        $tgl = explode("-", $tanggal);
        $d = array(
                "idregistrasipiutang" => $idregistrasipiutang,
                "month" => $tgl[1],
                "year" => $tgl[0],
                "tanggal" => $tanggal,
                "diterima" => $bayar,
                "sisa" =>$sisa,
                "idjournal" => $idjournal,
                // "source" =>,
                "userin" => $this->session->userdata('username'),
                "datein" => date('Y-m-d H:m:s')
        );
        $this->db->insert('piutanghistory',$d);
    }

}

?>