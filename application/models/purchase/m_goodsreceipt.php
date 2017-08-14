<?php

class m_goodsreceipt extends CI_Model {

    function tableName() {
        return 'goods_receipt';
    }

    function pkField() {
        return 'goods_receipt_id';
    }

    function searchField() {
        $field = "";
        return explode(",", $field);
    }

    function selectField() {
        return "a.goods_receipt_id,
                a.no_goods_receipt,
                a.received_date,
                a.received_by,
                a.no_invoice,
                a.invoice_date,
                a.subtotal,
                a.tax,
                a.discount,
                a.dpp,
                a.totalamount,
                a.notes,
                a.supplier_direct_no,
                a.status_gr,
                a.idaccount_coa_persediaan,
                a.idpurchase,
                a.idunit,
                a.status,
                a.deleted,
                a.userin,
                a.datein,
                a.usermod,
                a.datemod,
                b.date as po_date,
                b.nopurchase as no_po,
                d.name as idpurchasestatusname,
                a.received_by,
                b.idtax,
                b.include_tax,
                (c.firstname || ' ' || c.lastname) as name_received_by,
                a.status as status_gr,
                b.idsupplier,
                case
                    when a.status = 1 then 'Open'
                    when a.status = 2 then 'Canceled'
                    when a.status = 3 then 'Confirmed'
                    when a.status = 4 then 'Invoiced'
                end as status_gr_name,
                e.namesupplier,
                f.accnumber as accnumber_coa_persediaan,
                f.accname as accname_coa_persediaan";
    }
    
    function fieldCek()
    {
        //field yang perlu dicek didatabase apakah sudah ada apa belum
        $f = array(
          'a.idgoodsreceipt'=>'ID Goods Receipt'  
        );
        return $f;
    }

    function query() {
        $query = "select " . $this->selectField() . "
                    from " . $this->tableName()." a
                    join purchase b on b.idpurchase = a.idpurchase
                    join employee c on c.idemployee = a.received_by
                    left join purchasestatus d on d.idpurchasestatus = b.idpurchasestatus
                    left join supplier e on e.idsupplier = b.idsupplier
                    left join account f on f.idaccount = a.idaccount_coa_persediaan";
        return $query;
    }

    function whereQuery() {
    }

    function orderBy() {
        return "";
    }
}

?>