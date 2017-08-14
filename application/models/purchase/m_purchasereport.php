<?php

class m_purchasereport extends CI_Model {

    function query($sd=null,$nd=null,$idsupplier=null,$idunit=null){
        $wer = '';
        
        if($sd!='' && $nd!=''){
            $wer.=" and (a.date between '".$sd."' and '".$nd."')";
        }

        if($idsupplier!=null){
            $wer.=" and a.idsupplier = $idsupplier";
        }

        if($idunit!=null){
            $wer.=" AND a .idunit = $idunit ";
        }

        $sql = "select
                    a.idsupplier,
                    a .status,
                    a . date,
                    a .requestdate,
                    a .tax,
                    a .totalamount,
                    a .memo,
                    a .datein,
                    a .subtotal,
                    a .nopurchase,
                    b. name as idpurchasestatusname,
                    c .nametax,
                    c .rate,
                    e.namesupplier,
                    a .discount as disc,
                    a .notes_receipt,
                    a .receivedby_id,
                    a .delivereddate,
                    f.firstname,
                    f.lastname,
                    a .balance,
                    a .invoice_status,
                    a .noinvoice,
                    a .paidtoday,
                    totalorder,
                    totalreceived,
                    a .total_dpp,
                    a .total_diskon,
                    total_qty_batch,
                    sisa,
                    sum(totalorder - total_qty_batch) as sisabatch,
                    idpurchase_req,
                    h.nopurchase as nopurchase_req,
                    h. date as date_req,
                    a .include_tax,
                    a .nofpsup,
                    a .no_rujukan_sup,
                    CASE	
                        when a.invoice_status = 1 then 'Unpaid'
                        when a.invoice_status = 2 then 'Paid'
                        when a.invoice_status = 3 then 'Overdue'
                        when a.invoice_status = 4 then 'Partially Paid'
                        when a.invoice_status = 5 then 'Canceled'
                    ELSE 'Belum Ada'
                    end as status_invoice
                from
                    purchase a
                left join purchasestatus b on b.idpurchasestatus = a .idpurchasestatus
                left join tax c ON a .idtax = c .idtax
                left join payment d ON a .idpayment = d.idpayment
                left join supplier e ON a .idsupplier = e.idsupplier
                left join employee f ON a .receivedby_id = f.idemployee
                join(
                    select
                        idpurchase,
                        totalorder,
                        totalreceived,
                        sum(totalorder - totalreceived) as sisa
                    from
                        (
                            select
                                idpurchase,
                                sum(qty) as totalorder,
                                COALESCE(sum(qty_received), 0) as totalreceived
                            from
                                purchaseitem
                            group by
                                idpurchase
                        ) a
                    group by
                        idpurchase,
                        totalorder,
                        totalreceived
                ) g ON a .idpurchase = g .idpurchase
                join(
                    select
                        idpurchase,
                        sum(a .total_qty_batch) as total_qty_batch
                    from
                        (
                            select
                                a .idpurchase,
                                a .idpurchaseitem,
                                COALESCE(total_qty_batch, 0) as total_qty_batch
                            from
                                purchaseitem a
                            left join(
                                select
                                    idpurchaseitem,
                                    COALESCE(sum(qty), 0) as total_qty_batch
                                from
                                    purchaseitem_batch
                                group by
                                    idpurchaseitem
                            ) f ON a .idpurchaseitem = f.idpurchaseitem
                            group by
                                a .idpurchase,
                                a .idpurchaseitem,
                                total_qty_batch
                        ) a
                    group by
                        a .idpurchase
                ) i ON a .idpurchase = i.idpurchase
                left join(
                    select
                        nopurchase,
                        idpurchase,
                        date
                    from
                        purchase
                ) h ON a .idpurchase_req = h.idpurchase
                WHERE
                    TRUE                
                and a .deleted = 0                
                $wer
                group by
                    a.idsupplier,
                    a . date,
                    a .requestdate,
                    a .tax,
                    a .totalamount,
                    a .memo,
                    a .datein,
                    a .subtotal,
                    a .nopurchase,
                    c .nametax,
                    c .rate,
                    e.namesupplier,
                    a .discount,
                    a .notes_receipt,
                    a .receivedby_id,
                    a .delivereddate,
                    f.firstname,
                    f.lastname,
                    a .balance,
                    a .invoice_status,
                    a .noinvoice,
                    a .paidtoday,
                    b. name,
                    totalorder,
                    totalreceived,
                    total_qty_batch,
                    sisa,
                    h.nopurchase,
                    h. date,
                    a .include_tax,
                    a .nofpsup,
                    a .no_rujukan_sup,
                    a .idpurchasestatus,
                    a .status,
                    a .idpurchase_req,
                    a .total_dpp,
                    a .total_diskon,
                    total_qty_batch,
                    sisa,
                    h.nopurchase,
                    h. date,
                    a .include_tax,
                    a .nofpsup,
                    a .no_rujukan_sup
                ORDER BY
                    a .datein desc";
        $q = $this->db->query($sql);
        return $q->result_array();
    }

}

?>