<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
if($option!='print')
{
    $borderstyle = "border-bottom: #E6E8E6; background-color: #EDF4F7;  border-bottom-width: thin; border-bottom-style: dotted; ";
} else {
    $borderstyle = null;
}
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<body>
<center>
    
    <center>
        <br><br> 
                <h1><?=$title?></h1>        
                <h3><?=$unit?></h3><br>
                <h5><?=$periode?></h5>
    </center>
    

<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='<?=$tablewidth?>' border='0' padding="0">

<tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
     <td><strong>No</strong></td>
     <td><strong>Tanggal</strong></td>
     <td><strong>No SO</strong></td>
     <td><strong>NO SKU</strong></td>
     <td><strong>NO Invoice</strong></td>
     <td><strong>Customer</strong></td>
     <td><strong>Status</strong></td>
     <td><strong>Nama Barang</strong></td>
     <td><strong>Satuan</strong></td>
     <td><strong>Qty (dipesan)</strong></td>
     <td><strong>Value (dipesan)</strong></td>
     <td><strong>Qty (dikirim)</strong></td>
     <td><strong>Value (dikirim)</strong></td>
     <td><strong>Qty (sisa)</strong></td>
     <td><strong>Value (sisa)</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['date_sales']?></td>
        <td><?=$r['no_sales_order']?></td>
        <td><?=$r['sku_no']?></td>
        <td><?=$r['noinvoice']?></td>
        <td><?=$r['namecustomer']?></td>
        <td><?=$r['staus']?></td>
        <td><?=$r['nameinventory']?></td>
        <td><?=$r['measurement']?></td>
        <td class="number"><?=number_format($r['qty_order'])?></td>
        <td class="number"><?=number_format($r['value_order'],2)?></td>
        <td class="number"><?=number_format($r['qty_kirim'])?></td>
        <td class="number"><?=number_format($r['value_kirim'],2)?></td>
        <td class="number"><?=number_format($r['qty_sisa'])?></td>
        <td class="number"><?=number_format($r['value_sisa'],2)?></td>
    </tr>
<?php endforeach ?>


</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>