<?php

class m_transferkas extends CI_Model {

    function tableName() {
        return 'transferkas';
    }

    function pkField() {
        return 'idreconcile';
    }

    function searchField() {
        $field = "memo";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idtransferkas,a.idaccountsumber,b.accnamesumber,a.idaccounttujuan,c.accnametujuan,a.idunit,d.namaunit,a.memo,a.tanggal,a.nominal,a.datein";
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
                 . "join account b ON a.idaccountsumber = b.idaccount
                    join account c ON a.idaccounttujuan = c.idaccount
                    join unit d ON a.idunit = c.idunit ";

        return $query;
    }

    function whereQuery() {
        if($this->session->userdata('group_id')!=99)
        {
            $wer = " a.idunit = ".$this->session->userdata('idunit')." ";
        } else {
            $wer =  null;
        }
        return $wer;
    }

    function orderBy() {
        return "";
    }

    function updateField() {
        // idtransferkas integer NOT NULL DEFAULT nextval('seq_transferkas'::regclass),
//   idaccountsumber integer,
//   idaccounttujuan integer,
//   idunit integer,
//   memo character varying(225),
//   tanggal date,
  // nominal double precision,
//   userin character varying(20),
//   datein timestamp without time zone,
        $idunit = $this->input->post('namaunit');
        $nominal = str_replace(".", "", $this->input->post('nominal'));
        $idaccountsumber = $this->input->post('idaccountsumber');
        $idaccounttujuan = $this->input->post('idaccounttujuan');
        $tanggal = explode("-", $this->input->post('tanggal'));
        $tgltransfer = $tanggal[2].'-'.$tanggal[1].'-'.$tanggal[0];


        // $idtransferkas = $this->input->post('idtransferkas') == '' ? $this->m_data->getSeqVal('seq_transferkas') : $this->input->post('idtransferkas');

       /*dipindah ke model saveTransferKas*/

        // $curBalance = $this->m_account->getCurrBalance($idaccounttujuan, $idunit);
        // $newBalance = $curBalance + $nominal;
        // $this->m_account->saveNewBalance($idaccounttujuan, $newBalance, $idunit);

        $data = array(            
            'idunit' => $idunit,
            'idaccountsumber' => $idaccountsumber,
            'idaccounttujuan' => $idaccounttujuan,
            'memo' => $this->input->post('memo'),
            'tanggal' => $tgltransfer,
            'nominal' => $nominal,
            'datein' => date('Y-m-d H:m:s'),
            'userin' => $this->session->userdata('username')
        );

        if($this->input->post('idtransferkas') == '')
        {
            $idtransferkas = $this->m_data->getSeqVal('seq_transferkas');

            $data['idjournal'] = $this->m_journal->saveTransferKas($idunit,$idaccountsumber,$idaccounttujuan,$nominal,$tgltransfer);
            $data['idtransferkas'] = $idtransferkas;
        } else {
            $data['idtransferkas'] = $this->input->post('idtransferkas');
        }

        return $data;
    }

}

?>