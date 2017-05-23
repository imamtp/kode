<?php

class m_gridrecurringdetail extends CI_Model {

    function tableName() {
        return 'journalrec';
    }

    function pkField() {
        return 'idjournalrec';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "idjournalrec,b.namefreq,c.idscheduletype,c.schname,d.idalerttype,d.alertname,a.idjournaltype,nojournal,datejournal,memo,totaldebit,totalcredit,totaltax,balance,isrecuring,startdate,recuntildate,recnumtimes,f.realname as alertto,g.realname as notifto,alertmindays,alertondate";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'noinduk'=>'Nomor Induk'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a "
                . "left join frequency b ON a.idfrequency = b.idfrequency
                    left join scheduletype c ON a.idscheduletype = c.idscheduletype
                    left join alerttype d ON a.idalerttype = d.idalerttype
                    left join journaltype e ON a.idjournaltype = e.idjournaltype
                    left join sys_user f ON a.alertto = f.user_id
                    left join sys_user g ON a.notifto = g.user_id";

        return $query;
    }

    function whereQuery() {
        return null;
    }

    function orderBy() {
        return "";
    }

    function updateField() { 
        $data = array(
            'idsiswa' => $this->input->post('idsiswa') == '' ? $this->m_data->getSeqVal('seq_siswa') : $this->input->post('idsiswa'),
            'idunit' => $this->m_data->getID('unit', 'namaunit', 'idunit', $this->input->post('namaunit')),
            'namasiswa' => $this->input->post('namasiswa'),
            'namaibu' => $this->input->post('namaibu'),
            'namaayah' => $this->input->post('namaayah'),
            'alamat' => $this->input->post('alamat'),
            'kota' => $this->input->post('kota'),
            'phone' => $this->input->post('phone'),
            'tglmasuk' => backdate($this->input->post('tglmasuk')),
            'tahunajaranmasuk' => $this->input->post('tahunajaranmasuk'),
            'foto' => $this->input->post('foto'),
            'noinduk' => $this->input->post('noinduk')
//            'tglkeluar' => $this->input->post('tglkeluar')
        );
        return $data;
    }

}

?>