<?php

class m_inventory_bywhs extends CI_Model {

    function tableName() {
        return 'v_inventory';
    }

    function pkField() {
        return 'idinventory';
    }

    function searchField() {
        $field = "nameinventory,a.sku_no,a.invno";
        return explode(",", $field);
    }

    function selectField() {
        return "a.idunit,a.idinventorycat,a.idinventory,a.invno,a.nameinventory,a.description,a.isinventory,a.issell,a.sku_no,
            a.isbuy,a.cosaccount,a.incomeaccount,a.assetaccount,a.qtystock,a.images,a.cost,
            a.unitmeasure,a.numperunit,a.minstock,a.idprimarysupplier,a.sellingprice,a.idselingtax,
            a.unitmeasuresell,a.numperunitsell,a.notes,a.display,a.namesupplier,yearbuy,monthbuy,datebuy,a.namecat,saldopersediaan,
            a.measurement_id_one,
            a.measurement_id_two,
            a.measurement_id_tre,
            a.bahan_coil_id,
            a.diameter,
            a.ketebalan,
            a.berat,
            a.lebar,
            a.tinggi,
            a.panjang,
            a.konversi_coil_name,
            a.panjang_satuan_id,
            a.tinggi_satuan_id,
            a.lebar_satuan_id,
            a.berat_satuan_id,
            a.ketebalan_satuan_id,
            a.diameter_satuan_id,
            a.short_desc,
            a.brand_id,
            b.brand_name,
            c.short_desc as satuan_pertama,
            g.warehouse_code, f.stock  as totalstock,
            e.short_desc as satuan_kedua,f.warehouse_id";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'invno'=>'Kode Inventory'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a 
                    left join brand b ON a.brand_id = b.brand_id
                    left join productmeasurement c ON a.measurement_id_one = c.measurement_id                   
                    left join productmeasurement e ON a.measurement_id_two = e.measurement_id
                    left join warehouse_stock f ON a.idinventory = f.idinventory
                    left join warehouse g ON f.warehouse_id = g.warehouse_id";

        return $query;
    }

    function whereQuery() {
        return "a.display is null";
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

}

?>