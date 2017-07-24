<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class report extends MY_Controller {

    public function index() {
        
    }

    function ar(){
        //account receivable - piutang
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('customer_id');

        /*
            1 : 0 <= 30
            2 : 30 >= 60
            3 : 60 >= 90
            4 : >90
        */
        $aging = $this->input->get('aging');
        $wer_aging = null;
        if($aging==1){
            $wer_aging = "and (current_date::date - invoice_date::date) <= 30";
        } else if($aging==2){
            $wer_aging = "and ((current_date::date - invoice_date::date) between 31 and 60)";
        } else if($aging==3){
            $wer_aging = "and ((current_date::date - invoice_date::date) between 61 and 90)";
        } else if($aging==4){
            $wer_aging = "and (current_date::date - invoice_date::date) > 90";
        }

        $wer_period = null;
        if($startdate!=null && $enddate!=null){
            $wer_period = "and (invoice_date between '".$startdate."' and '".$enddate."')";
        }

        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and a.idcustomer = ".$customer_id."";
        }

        $sql = "select
                a .idsales,
                a .no_sales_order,
                a .idunit,
                a .subtotal,
                a .freight,
                a .date_sales,
                a .tax,
                a .disc,
                a .totalamount,
                a .paidtoday,
                a .balance,
                a .comments,
                a .noinvoice,
                a .ddays,
                a .eomddays,
                a .percentagedisc,
                a .daydisc,
                a .notes_si,
                a.idcustomer,
                b.nocustomer,
                b.namecustomer,
                a .idpayment,
                a .invoice_status,
                a .invoice_date,
                b.address as address_customer,
                b.telephone as telephone_customer,
                b.handphone as handphone_customer,
                (current_date::date - invoice_date::date) as aging	
            from
                sales a
            join customer b ON a .idcustomer = b.idcustomer
            WHERE
                TRUE
            AND a .idunit = ".$idunit."
            AND a .display is null
            and noinvoice is not null
            and(
                a .invoice_status = 1
                OR a .invoice_status = 4
            )
            $wer_aging
            $wer_period
            $wer_customer
            ORDER BY
                a .date_sales desc";

        $q = $this->db->query($sql);
        return $q->result_array();
        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function ar_outstanding(){
        //account receivable - piutang
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('customer_id');

        $wer_period = null;
        if($startdate!=null && $enddate!=null){
            $wer_period = "and (invoice_date between '".$startdate."' and '".$enddate."')";
        }

        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and a.idcustomer = ".$customer_id."";
        }

        $sql = "select
                    a .idsales,
                    a .no_sales_order,
                    a .idunit,
                    a .subtotal,
                    a .freight,
                    a .date_sales,
                    a .tax,
                    a .disc,
                    a .totalamount,
                    a .paidtoday,
                    a .balance,
                    a .comments,
                    a .noinvoice,                    
                    a .eomddays,
                    a .percentagedisc,	
                    a .notes_si,
                    a.idcustomer,
                    b.nocustomer,
                    b.namecustomer,
                    a .idpayment,
                    a .invoice_status,
                    a .invoice_date,
                    b.address as address_customer,
                    b.telephone as telephone_customer,
                    b.handphone as handphone_customer,
                    a .daydisc,
                    a .ddays,
                    (current_date::date - invoice_date::date) as aging	
                from
                    sales a
                join customer b ON a .idcustomer = b.idcustomer
                WHERE
                    TRUE
                AND a .idunit = ".$idunit."
                AND a .display is null
                and noinvoice is not null
                and ddays is not null
                and(
                    a .invoice_status = 1
                    OR a .invoice_status = 4
                )
                and (current_date::date - invoice_date::date) > ddays
                $wer_period
                $wer_customer
                ORDER BY
                    a .date_sales desc";

        $q = $this->db->query($sql);
        return $q->result_array();
        // echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function sales(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('customer_id');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }
        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and a.idcustomer = ".$customer_id."";
        }
        // echo $wer_customer;

        $sql = "select
                    g .no_do,
                    g .delivery_date,
                    a .date_sales,
                    a .no_sales_order,
                    a .subtotal,
                    a .freight,
                    a .tax,
                    a .disc,
                    a .totalamount,
                    a .comments,
                    a .userin,
                    a .datein,
                    a .status,
                    c .namecurr,
                    b.namepayment,
                    d.firstname,
                    d.lastname,
                    e.totalitem,
                    namecustomer,
                    nocustomer,
                    a .noinvoice,
                    a .invoice_status,
                    f.address as address_customer,
                    f.telephone as telephone_customer,
                    f.handphone as handphone_customer,
                    a .paidtoday,
                    a .balance,
                    a .delivery_date,
                    totalitem,
                    COALESCE(totalitemkirim, 0) as totalitemkirim,
                    (
                        (
                            e.totalitem - COALESCE(totalitemkirim, 0)
                        )
                    ) as sisakirim,
                    i.no_sales_quote as no_sales_order_quote,
                    i.date_quote as date_sales_quote,
                    j.rate,
                    k .status as statuswo,
                    j.nametax,
                    case 
                    when a.status = 1 then 'Open'
                    when a.status = 2 then 'Canceled'
                    when a.status = 3 then 'Confirmed'
                    when a.status = 4 then 'Closed'
                    when a.status = 5 then 'Picking Up'
                    when a.status = 6 then 'Partial Delivering'
                    when a.status = 7 then 'Delivering'
                    when a.status = 8 then 'Invoiced'
                    end as statusname,
                    l.namaunit,
                    case
                    when include_tax = 1 then 'Kena Pajak'
                    else 'Tdk Kena Pajak'
                    end as kenapajak
                from
                    sales a
                left join payment b ON a .idpayment = b.idpayment
                left join currency c ON a .idcurrency = c .idcurrency
                left join employee d ON a .idemployee = d.idemployee
                left join(
                    select
                        idsales,
                        count(*) as totalitem
                    from
                        salesitem
                    group by
                        idsales
                ) e ON a .idsales = e.idsales
                left join customer f ON a .idcustomer = f.idcustomer
                left join delivery_order g ON a .idsales = g .idsales
                left join tax j ON a .idtax = j.idtax
                left join(
                    select
                        idsales,
                        sum(qty_kirim) as totalitemkirim
                    from
                        salesitem
                    group by
                        idsales
                ) h ON a .idsales = h.idsales
                left join(
                    select
                        no_sales_quote,
                        idsales,
                        date_quote
                    from
                        sales
                ) i ON a .idsales_quote = i.idsales
                LEFT JOIN job_order k ON k .idsales = a .idsales
                join unit l ON a.idunit = l.idunit  
                    WHERE TRUE AND a.idunit=".$idunit."  
                    $wer_period
                    $wer_customer
                    AND a.type = 2 and a.display is null  and a.status > 2  
                    ORDER BY a.datein desc";

        $q = $this->db->query($sql);
        echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function sales_order_detail(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('idcustomer');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }
        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and b.idcustomer = ".$customer_id."";
        }

        $sql = "select 
                    b.no_sales_order, 
                    b.date_sales, 
                    c.sku_no,
                    c.nameinventory,
                    d.short_desc as measurement,
                    a.qty as qty_order,
                    (a.qty * a.price * (100 - a.disc) / 100) as value_order,
                    a.qty_kirim,
                    (a.qty_kirim * a.price * (100 - a.disc) / 100) as value_kirim,
                    a.qty - a.qty_kirim as qty_sisa,
                    ((qty-qty_kirim) * a.price * (100 - a.disc) / 100) as value_sisa
                from salesitem a
                left join sales b on b.idsales = a.idsales
                left join inventory c on c.idinventory = a.idinventory
                left join productmeasurement d on d.measurement_id = a.measurement_id
                where true 
                and b.idunit = $idunit
                $wer_period
                $wer_customer
                and b.type = 2
                and b.status > 2"; 

                $q = $this->db->query($sql);
                return $q->result_array();
    }

    function sales_by_item(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idcustomer = $this->input->get('idcustomer');
        $sku_no = $this->input->get('skuno');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }
        
        $wer_customer = null;
        if($idcustomer!=null){
            $wer_customer = "and c.idcustomer = ".$idcustomer."";
        }

        $wer_inventory = null;
        if($sku_no!=null){
            $wer_inventory = "and a.sku_no = '".$sku_no."'";
        }
        $sql = "select 
                    a.sku_no,
                    a.nameinventory,
                    sum(b.qty) as qty,
                    b.measurement,
                    sum(b.price * b.qty) as sales
                from inventory a 
                join (
                    select sku_no, a.*, c.short_desc as measurement from salesitem a
                    join inventory b on a.idinventory = b.idinventory
                    join productmeasurement c on c.measurement_id = a.measurement_id
                ) b on a.sku_no = b.sku_no
                join sales c on c.idsales = b.idsales
                where true 
                and c.idunit = $idunit
                and c.type = 2
                and c.status > 2
                $wer_period
                $wer_customer
                $wer_inventory
                group by a.sku_no, a.nameinventory, b.measurement";

        $q = $this->db->query($sql);
        return $q->result_array();
    }

    function sales_by_customer(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select 
                    a.namecustomer,
                    a.nocustomer,
                    sum(b.subtotal) as subtotal,
                    sum(b.tax) as tax,
                    sum(totalamount) as total,
                    sum(b.balance) as balance
                from customer a
                join sales b on b.idcustomer = a.idcustomer
                where true
                $wer_period
                and a.idunit = 12
                and a.deleted = 0
                and b.type = 2
                and b.status > 2
                group by a.namecustomer, a.nocustomer
                order by namecustomer";
        
        $q = $this->db->query($sql);
        return $q->result_array();
    }

    function sales_by_salesman(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select 
                    a.code,
                    a.firstname || ' ' || a.lastname as name,
                    sum(b.subtotal) as subtotal,
                    sum(b.tax) as tax,
                    sum(totalamount) as total,
                    sum(b.balance) as balance
                from employee a
                join sales b on b.salesman_id = a.idemployee
                where true
                $wer_period
                and a.idunit = $idunit
                and a.deleted = 0
                and b.type = 2
                and b.status > 2
                group by b.salesman_id, a.code, a.firstname, a.lastname
                order by a.firstname";
        
        $q = $this->db->query($sql);
        return $q->result_array();
    }

    function sales_book(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');

        $wer_period = null;
        if($startdate!=''){
            $wer_period = "and (date_sales between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select 
                    c.sku_no,
                    c.nameinventory,
                    d.short_desc,
                    a.qty,
                    a.qty_kirim,
                    a.qty_return,
                    a.price
                from salesitem a
                join sales b on b.idsales = a.idsales
                join inventory c on c.idinventory = a.idinventory
                left join productmeasurement d on d.measurement_id = a.measurement_id
                where true
                and b.idunit = $idunit
                $wer_period
                and b.type = 2
                and b.status > 2";
        
        $q = $this->db->query($sql);
        return $q->result_array();
    }
    // function sales_by_item(){
    //     $idunit = $this->input->get('idunit');
    //     $startdate = $this->input->get('startdate');
    //     $enddate = $this->input->get('enddate');
    //     $customer_id = $this->input->get('customer_id');
    //     $sku_no = $this->input->get('sku_no');
    //     $salesman_id = $this->input->get('salesman_id');

    //     $wer_customer = null;
    //     if($customer_id!=null){
    //         $wer_customer = "and b.idcustomer = ".$customer_id."";
    //     }

    //     $wer_inventory = null;
    //     if($sku_no!=null){
    //         $wer_inventory = "and a.sku_no = ".$sku_no."";
    //     }

    //     $wer_salesman = null;
    //     if($salesman_id!=null){
    //         $wer_salesman = "and b.salesman_id = ".$salesman_id."";
    //     }

    //     $qinv = $this->db->query("select a.idinventory,a.invno,a.nameinventory,cost,a.idinventorycat,a.idunit,a.status,a.deleted,a.sku_no,brand_id,a.inventory_type
    //                                 from inventory a
    //                                 where TRUE
    //                                 and idinventory in(select idinventory from inventoryunit
	// 		                        where idunit = $idunit)
    //                                 $wer_inventory");

    //     $data = array();
    //     $i=0;
    //     foreach($qinv->result_array() as $r){
    //         $data[$i] = $r;

    //         $qtrans = $this->db->query("select a.qty,a.price,a.disc,a.total,a.ratetax,a.size,b.noinvoice,b.no_sales_order,c.short_desc as satuan,d.short_desc as satuan_ukuran,b.date_sales
    //                                     from salesitem a
    //                                     join sales b ON a.idsales = b.idsales
    //                                     join productmeasurement c ON a.measurement_id = c.measurement_id
    //                                     join productmeasurement d ON a.measurement_id_size = d.measurement_id
    //                                     where a.idinventory = ".$r['idinventory']." $wer_customer $wer_salesman");
    //         if($qtrans->num_rows()>0){
    //             $data[$i]['trans'] = $qtrans->result_array();
    //         } else {
    //             $data[$i]['trans'] = FALSE;
    //         }
            
    //         $i++;
    //     }
    //      echo '{success:true,totalitem:' .$qinv->num_rows() . ',rows:' . json_encode($data) . ' }';
    // }

    function sales_return(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $customer_id = $this->input->get('customer_id');
        $idinventory = $this->input->get('idinventory');

        $wer_customer = null;
        if($customer_id!=null){
            $wer_customer = "and b.idcustomer = ".$customer_id."";
        }

        $wer_inventory = null;
        if($idinventory!=null){
            $wer_inventory = "and a.idinventory = ".$idinventory."";
        }

        $qinv = $this->db->query("select a.idinventory,a.invno,a.nameinventory,cost,a.idinventorycat,a.idunit,a.status,a.deleted,a.sku_no,brand_id,a.inventory_type,a.measurement_id_one,a.measurement_id_two,a.measurement_id_tre
                                    from inventory a
                                    where a.idinventory in (select idinventory 
                                                    from sales_return_item a
                                                    join sales_return b ON a.sales_return_id = b.sales_return_id
                                                    where b.idunit = $idunit $wer_customer
                                                )");

        $data = array();
        $i=0;
        foreach($qinv->result_array() as $r){
            $data[$i] = $r;

            $qtrans = $this->db->query("select a.qty_return,a.resend,a.notes,a.warehouse_id,a.qty_sent,c.warehouse_code
                                        from sales_return_item a
                                        join sales_return b ON a.sales_return_id = b.sales_return_id
                                        join warehouse c ON a.warehouse_id = c.warehouse_id
                                        where a.idinventory = ".$r['idinventory']."");
            if($qtrans->num_rows()>0){
                $data[$i]['trans'] = $qtrans->result_array();
            } else {
                $data[$i]['trans'] = FALSE;
            }
            
            $i++;
        }
         echo '{success:true,totalitem:' .$qinv->num_rows() . ',rows:' . json_encode($data) . ' }';
    }

    function payable(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idsupplier = $this->input->get('idsupplier');
        $jatuh_tempo = $this->input->get('jatuh_tempo');

        $wer_supplier = null;
        if($idsupplier!=null){
            $wer_supplier = "and a.idsupplier = ".$idsupplier."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (mulaihutang between '".$startdate."' and '".$enddate."')";
        }

        $wer_tempo = null;
        if(strtoupper($jatuh_tempo)=='YA'){
            $wer_tempo = "and (a.jatuhtempo::date<=current_date)";
        }

        $q = $this->db->query("select a.idsupplier,a.jumlah,a.sisahutang,a.memo,a.mulaihutang,a.jatuhtempo,b.namesupplier,c.accname as accnamehutang,c.accnumber as accnumberhutang
                                ,d.accname as accnamekenahutang,d.accnumber as accnumberkenahutang
                                from registrasihutang a
                                join supplier b ON a.idsupplier = b.idsupplier
                                join account c ON a.idacchutang = c.idaccount
                                join account d ON a.idacckenahutang = d.idaccount
                                where a.idunit = $idunit  $wer_period
                               $wer_supplier
                               $wer_tempo");
        echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function payable_purchase(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idsupplier = $this->input->get('idsupplier');
        // $jatuh_tempo = $this->input->get('jatuh_tempo');

        $wer_supplier = null;
        if($idsupplier!=null){
            $wer_supplier = "and a.idsupplier = ".$idsupplier."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (a.date between '".$startdate."' and '".$enddate."')";
        }

        // $wer_tempo = null;
        // if(strtoupper($jatuh_tempo)=='YA'){
        //     $wer_tempo = "and (a.jatuhtempo::date<=current_date)";
        // }

        $sql = "select
                        a . date,
                        a .requestdate,
                        a .tax,
                        a .totalamount,
                        a .memo,
                        a .datein,
                        a .idunit,
                        a .idcurrency,
                        a .subtotal,
                        a .nopurchase,
                        a .idsupplier,
                        c .nametax,
                        c .rate,
                        e.namesupplier,
                        a .discount as disc,
                        a .notes_receipt,
                        a .delivereddate,
                        f.firstname,
                        f.lastname,
                        a .balance,
                        a .noinvoice,
                        a .paidtoday,
                        totalorder,
                        totalreceived,
                        sisa,
                        b. name as idpurchasestatusname,
                        CASE
                            when a.idpayment = 1 then 'Cash in Advance'
                            when a.idpayment = 2 then 'Cash in Delivery'
                            when a.idpayment = 3 then 'NET d days'
                            when a.idpayment = 4 then 'NET EOM d days'
                            when a.idpayment = 5 then 'Discount'
                            ELSE 'Undefined'
                        END as payment_term
                    from
                        purchase a
                    join purchasestatus b ON a .idpurchasestatus = b.idpurchasestatus
                    left join tax c ON a .idtax = c .idtax
                    left join payment d ON a .idpayment = d.idpayment
                    left join supplier e ON a .idsupplier = e.idsupplier
                    left join employee f ON a .receivedby_id = f.idemployee
                    join(
                        select
                            idpurchase,
                            sum(qty) as totalorder,
                            sum(qty_received) as totalreceived,
                            (sum(qty_received) - sum(qty)) as sisa
                        from
                            purchaseitem
                        group by
                            idpurchase
                    ) g ON a .idpurchase = g .idpurchase
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
                    AND idpurchasetype = 2
                    and a .deleted = 0
                    $wer_supplier
                    and a.idunit = $idunit
                    $wer_period
                    and(
                        a .invoice_status = 1
                        OR a .invoice_status = 4
                    )
                    ORDER BY
                        a .datein desc";

        $q = $this->db->query($sql);
        echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function receivable(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idcustomer = $this->input->get('idcustomer');

        $wer_customer = null;
        if($idcustomer!=null){
            $wer_customer = "and a.idcustomer = ".$idcustomer."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (a.tglpiutang between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select a.description,b.accname as accnamepiutang,c.accname as accname_terimapiutang,a.jumlah,a.sisapiutang,a.tglpiutang,d.namecustomer
                from registrasipiutang a
                join account b ON a.idaccount = b.idaccount
                join account c ON a.idaccountlink = c.idaccount
                join customer d ON a.idcustomer = d.idcustomer
                where true and a.display is null and a.idunit = $idunit $wer_customer
                $wer_period";
        
        $q = $this->db->query($sql);
        echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

    function receivable_sales(){
        $idunit = $this->input->get('idunit');
        $startdate = $this->input->get('startdate');
        $enddate = $this->input->get('enddate');
        $idcustomer = $this->input->get('idcustomer');
        $jatuh_tempo = $this->input->get('jatuh_tempo');

        $wer_customer = null;
        if($idcustomer!=null){
            $wer_customer = "and a.idcustomer = ".$idcustomer."";
        }

        $wer_period = null;
        if($startdate!='' && $enddate!=''){
            $wer_period = "and (a.invoice_date between '".$startdate."' and '".$enddate."')";
        }

        $sql = "select
                    a .no_sales_order,
                    a .subtotal,
                    a .freight,
                    a .date_sales,
                    a .tax,
                    a .disc,
                    a .totalamount,
                    a .paidtoday,
                    a .balance,
                    a .comments,
                    a .noinvoice,	
                    a .notes_si,
                    b.nocustomer,
                    b.namecustomer,
                    a .invoice_date,
                    b.address as address_customer,
                    b.telephone as telephone_customer,
                    b.handphone as handphone_customer,
                    a.idpayment,
                    CASE
                        when a.idpayment = 1 then 'Cash in Advance'
                        when a.idpayment = 2 then 'Cash in Delivery'
                        when a.idpayment = 3 then 'NET d days'
                        when a.idpayment = 4 then 'NET EOM d days'
                        when a.idpayment = 5 then 'Discount'
                        ELSE 'Undefined'
                    END as payment_term,
                    a .ddays,
                    a .eomddays,
                    a .percentagedisc,
                    a .daydisc,
                    CASE	
                        when a.invoice_status = 1 then 'Unpaid'
                        when a.invoice_status = 2 then 'Paid'
                        when a.invoice_status = 3 then 'Overdue'
                        when a.invoice_status = 4 then 'Partially Paid'
                        when a.invoice_status = 5 then 'Canceled'
                    ELSE 'Undefined'
                    END as invoice_status
                from
                    sales a
                join customer b ON a .idcustomer = b.idcustomer
                WHERE
                    TRUE
                AND a .idunit = $idunit
                AND a .display is null
                and noinvoice is not null
                and(
                    a .invoice_status = 1
                    OR a .invoice_status = 4
                )
                $wer_period
                $wer_customer
                ORDER BY
                    a .date_sales desc";

        $q = $this->db->query($sql);
        $data = array();
        $i=0;
        foreach($q->result_array() as $r){
            $data[$i] = $r;
            // if($r[''])
            $i++;
        }

        echo '{success:true,numrow:' .$q->num_rows() . ',results:' . $q->num_rows() .',rows:' . json_encode($q->result_array()) . ' }';
    }

}

?>