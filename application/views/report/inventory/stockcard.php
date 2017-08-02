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
     <td><strong>Kode Barang</strong></td>
     <td><strong>No SKU</strong></td>
     <td><strong>Nama Barang</strong></td>
     <td><strong>Satuan</strong></td>
     <td><strong>Stock Awal</strong></td>
     <td><strong>In</strong></td>
     <td><strong>Out</strong></td>
     <td><strong>Stock Akhir</strong></td>
     <td><strong>Tanggal Transaksi</strong></td>
     <td><strong>Tipe Adjusment</strong></td>
     <td><strong>Notes</strong></td>
</tr>
<?php $no = 1; ?>
<?php foreach($rows as $r): ?>
    <tr>
        <td><?=$no++?></td>
        <td><?=$r['invno']?></td>
        <td><?=$r['sku_no']?></td>
        <td><?=$r['nameinventory']?></td>
        <td><?=$r['satuan']?></td>
        <td class="number"><?=number_format($r['old_qty'],2)?></td>
        <td class="number"><?=$r['in'] != null ? number_format($r['in'],2) : '-'?></td>
        <td class="number"><?=$r['out'] != null ? number_format($r['out'],2) : '-'?></td>
        <td class="number"><?=number_format($r['balance'],2)?></td>
        <td><?=$r['datein']?></td>
        <td><?=$r['type_adjustment']?></td>
        <td><?=$r['notes']?></td>
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