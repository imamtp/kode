<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>/assets/css/bootstrap.min.css">
    <link href="<?=base_url()?>/assets/css/print.css" rel="stylesheet">
</head>

<body>
  <div class="container">
    <div class="panel panel-info">
    <div class="panel-body">
  
    <div class="row">
      <div class="col-xs-5">
        <h1>
          <?=$this->logo?>
        </h1>
      </div>
      <div class="col-xs-5 col-xs-offset-2 text-right">
        <h3><?=$title?></h3>
        <h4><small>Tanggal Order: <?=$data['datetrans']?> <br>
            Tanggal Pengiriman: <?=$data['header']['delivery_date']?><br>
            NO SO: #<?=$data['no']?><br>
            NO Faktur: #<?=$data['header']['no_faktur']?></small><br>
        </h4>
      </div>
    </div>
    
    <div class="row">
      <div class="col-xs-5">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4><?=$data['namaunit']?></h4>
          </div>
          <div class="panel-body">
            <p>
            <?=$data['alamat']?> <br>
              Phone: <?=$data['telp']?> <br>
              Fax: <?=$data['fax']?> <br>
            </p>
          </div>
        </div>
      </div>
      <div class="col-xs-5 col-xs-offset-2 text-right">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>Delivery To</h4>
          </div>
          <div class="panel-body">
            <p>
              <?=$data['header']['namecustomer'].'<br>'.
              $data['header']['address_customer']?> <br>
              Phone: <?=$data['header']['telephone_customer']?> <br>
              Mobile: <?=$data['header']['handphone_customer']?> <br>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-left:1px;">
      <table class="table borderless" >
        <tr>
          <td colspan="2"><b>Item List:</b></td>
        </tr>
        <?php if($data['detail']!=null): ?>
          <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
            <tr>
              <th width="30">No</th>  
              <th>Kode Barang</th>                       
              <th>Nama Barang</th>
              <th>Qty Order</th>
              <th>Satuan</th>
              <th>Ukuran</th>
              <th>Satuan Ukuran</th>
                <th>Qty Kirim</th>
            </tr>
            <?php 
              $totalqty = 0;
              $totalkirim = 0;
            ?>
            <?php foreach ($data['detail'] as $key => $value) : ?>
              <tr>
                <td width="30"><?=$key+1?></td>
                <td><?=$value['invno']?></td>
                <td><?=$value['nameinventory']?></td>  
                <!-- <td><?=$value['warehouse_desc']?></td>                            -->
                <!--<td align="right"><?=number_format($value['price'])?></td>-->
                <td align="right"><?=$value['qty']?></td>
                <td><?=$value['short_desc']?></td>
                <td align="right"><?=$value['size']?></td>
                <td><?=$value['size_measurement']?></td>
                <!--<td align="right"><?=number_format($value['disc'])?></td>-->
                <?php //if($data['totaltax']!=0) { echo "<td>".$value['ratetax']."</td>"; } ?>
                <!--<td align="right"><?=number_format($value['total'])?></td>-->
                <td><?=$value['qty_kirim']?></td>
              </tr>
            <?php endforeach; ?>
            <?php
              $totalqty+=$value['qty'];
              $totalkirim =$value['qty_kirim'];
            ?>
          </table>
        <?php endif; ?>

        <table class="table borderless" style="width:99%; margin-top:-20px; margin-left:1px; margin-right:2px;">
          <tr>
            <td></td>
            <td> </td>
            <td align="right"><b>Total Qty Order</b></td>
            <td align="right" width="200"><?=$totalqty?></td>
          </tr>
          <tr>
            <td></td>
            <td> </td>
            <td align="right"><b>Total Qty Kirim</b></td>
            <td align="right" width="200"><?=$totalkirim?></td>
          </tr>
          <?php if($data['dp']!=0) : ?>
            <tr>
              <td></td>
                <td> </td>
              <td align="right"><b>Uang Muka/Terbayar (-)</b></td>
              <td align="right"><?=number_format($data['dp'])?></td>
            </tr>
          <?php endif; ?>
          <?php if($data['totalowed']!=0): ?>
            <tr>
              <td></td>
                <td> </td>
              <td align="right"><b>Saldo Terhutang</b></td>
              <td align="right"><?=number_format($data['totalowed'])?></td>
            </tr>
          <?php endif;?>
        </table>
        <tr>
          <td width="22%"><b> Notes:</b></td>
          <td width="50%"><?=$data['memo']?></td>
        </tr>
      </table>
    </div>
      
    </div>
    </div> <!-- panel -->
  </div><!-- container -->
</body>
</html>
