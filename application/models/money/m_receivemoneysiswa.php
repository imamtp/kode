<?php

class m_receivemoneysiswa extends CI_Model {

    function tableName() {
        return 'receivemoney';
    }

    function pkField() {
        return 'idreceivemoney';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idreceivemoney,a.idjournal,a.notrans,a.datetrans,a.total,a.memo,a.userin,a.datein,a.idunit,a.subtotal,b.accname,c.namaunit,totaldenda";
    }

    function fieldCek() {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
            'code' => 'Kode Pajak'
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName() . " a "
                . "join account b ON a.depositaccount = b.idaccount and a.idunit = b.idunit
                    join unit c ON a.idunit = c.idunit 
                    left join(select idreceivemoney,sum(denda) as totaldenda 
                        from receivemoneyitem
                        group by idreceivemoney) d ON a.idreceivemoney = d.idreceivemoney";

        return $query;
    }

    function whereQuery() {
        $add = " idjournal in (select idjournal from siswapembayaran)";
        if($this->session->userdata('group_id')!=99 && $this->session->userdata('group_id')!=1)
        {
            $wer = " a.idunit = ".$this->session->userdata('idunit')." AND".$add."";
        } else {
            $wer =  $add;
        }
        return $wer;
    }

    function orderBy() {
        return "";
    }

    function updateField() {
        $data = array(
            'idtax' => $this->input->post('idtax') == '' ? $this->m_data->getSeqVal('seq_tax') : $this->input->post('idtax'),
            'idtaxtype' => $this->m_data->getID('taxtype', 'nametypetax', 'idtaxtype', $this->input->post('nametypetax')),
            'code' => $this->input->post('code'),
            'nametax' => $this->input->post('nametax'),
            'description' => $this->input->post('description'),
            'rate' => $this->input->post('rate'),
            'acccollectedtax' => $this->input->post('idacccollected'),
            'acctaxpaid' => $this->input->post('idaccpaid')
        );
        return $data;
    }

    function save_pembayaransiswa($idjournal,$tanggalReceive,$dataGrid)
    {
        // 2014-10-25
        $arrtgl = explode("-", $tanggalReceive);
        foreach ($dataGrid as $key => $value) {

            $arr = explode(" ",$value->tglbayar);
            $month = getNoMonth($arr[0]);
            $year = $arr[1];

            $data = array(
                    'idsiswa'=> $value->idsiswa,
                    'idaccountbayar'=> $value->idaccount,
                    'idjournal'=> $idjournal,
                    'tglbayar'=> $tanggalReceive,
                    'bulanpembayaran'=> $month,
                    'tahunpembayaran'=> $year,
                    'bulantahunpembayaran'=> $value->tglbayar,
                    'haribayar'=> $arrtgl[2],
                    'bulanbayar'=> $arrtgl[1],
                    'tahunbayar'=> $arrtgl[0],
                    'jumlah'=> $value->amount,
                    'userin' => $this->session->userdata('username'),
                    'usermod' => $this->session->userdata('username'),
                    'datein' => date('Y-m-d H:m:s'),
                    'datemod' => date('Y-m-d H:m:s')
                );
            $this->db->insert('siswapembayaran',$data);
        }
 
    }

}

?>