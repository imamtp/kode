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
                a.freightcost,
                a.paidtoday,
                a.balance,
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
                case a.idpaymentterm
                    when 1 then 'Cash in Advance'
                    when 2 then 'Cash in Delivery'
                    when 3 then 'NET d days'
                    when 4 then 'NET EOM d days'
                    when 5 then 'Discount'
                end as paymentterm,
                case a.idpaymentterm
                    when 1 then '-'
                    when 2 then '-'
                    when 3 then a.ddays::text
                    when 4 then a.eomddays::text
                    when 5 then a.percentagedisc::text || '/' || a.daydisc::text || 'NET ' || a.dmax::text
                end as term,
                a.duedate,
                b.date as po_date,
                b.nopurchase as no_po,
                d.name as idpurchasestatusname,
                a.received_by,
                b.idtax,
                b.include_tax,
                g.rate as rate_tax,
                (c.firstname || ' ' || c.lastname) as name_received_by,
                a.status_gr,
                b.idsupplier,
                case
                    when a.status_gr = 1 then 'Open'
                    when a.status_gr = 2 then 'Canceled'
                    when a.status_gr = 3 then 'Confirmed'
                    when a.status_gr = 4 then 'Invoiced'
                end as status_gr_name,
                e.namesupplier,
                f.accnumber as accnumber_coa_persediaan,
                f.accname as accname_coa_persediaan,
                g.rate,
                status_inv,
                case 
                    when status_inv = 1 then 'Unpaid'
                    when status_inv = 2 then 'Paid'
                    when status_inv = 3 then 'Overdue'
                    when status_inv = 4 then 'Partially aid'
                    when status_inv = 5 then 'Canceled'
                end status_inv_name,
                a.nofpsup";
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
                    left join account f on f.idaccount = a.idaccount_coa_persediaan
                    left join tax g on g.idtax = b.idtax";
        return $query;
    }

    function whereQuery() {
        $wer = null;
        switch ($this->input->post('option')){
            case 'unpaid':
                $wer .= " status_gr = 4 and a.paidtoday < a.totalamount  and (a.duedate >= now() or a.duedate is null)";
                break;
            case 'paid':
                $wer .= " status_gr = 4 and a.paidtoday > 0  and (a.duedate >= now() or a.duedate is null)";
                break;
            case 'overdue':
                $wer .= " status_gr = 4 and a.paidtoday < a.totalamount and a.duedate < now()";
                break;
        }
        return $wer;
    }

    function orderBy() {
        return "";
    }
}

?>