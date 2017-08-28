<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>/assets/css/bootstrap.min.css">
    <link href="<?=base_url()?>/assets/css/print.css" rel="stylesheet">
</head>

<?php
//if($print) { echo "<body onload=\"window.print()\">"; } else { echo "<body>"; }
?>
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
          <h4>Tanggal Order: <?=$data['datetrans']?> <br>NO: #<?=$data['no']?><br/></h4>
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
              <h4>Supplier: </h4>
            </div>
            <div class="panel-body">
             <p>
                <?=$data['supplier']['namesupplier'].'<br>'.
                $data['supplier']['companyaddress']?> <br>
                Phone: <?=$data['supplier']['telephone']?> <br>
                Fax: <?=$data['supplier']['fax']?> <br>
              </p>
            </div>
          </div>
        </div>
      </div> <!-- row -->

      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
          <tr>
            <td colspan="2"><b>Item List:</b></td>
          </tr>
          <?php if($data['detail']!=null): ?>
            <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
              <thead>
                <tr>
                  <th width="30">No</th>  
                  <th>NO SKU</th>                       
                  <th>NAMA BRG</th>                                               
                  <th>QTY</th>
                  <th>SATUAN</th>
                  <th>HARGA</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
              <?php foreach ($data['detail'] as $key => $value) : ?>
                <tr>
                  <td width="30"><?=$key+1?></td>
                  <td><?=$value['sku_no']?></td>
                  <td><?=$value['nameinventory']?></td>  
                  <td align="right"><?=number_format($value['qty'],2)?></td>
                  <td><?=$value['short_desc']?></td>
                  <td align="right"><?=number_format($value['price'],2)?></td>
                  <td align="right"><?=number_format($value['total'],2)?></td>
                </tr>
              <?php endforeach; ?>
              </tbody>
            </table>
          <?php endif; ?>

          <table class="table borderless" style="width:99%; margin-top:-20px; margin-left:1px; margin-right:2px;">
            <tr>
              <td colspan = "3" align="right"><b>Subtotal :</b></td>
              <td colspan = "2" align="right" width="250"><?=$data['subtotal']?></td>
            </tr>
            <tr>
              <td colspan = "3" align="right"><b>DPP :</b></td>
              <td align="right" width="130"><?=$data['dpp']?></td>
              <td width="120"></td>
            </tr>
            <tr>
              <td colspan = "3" align="right"><b>PPN :</b></td>
              <td align="right" ><?=$data['tax']?></td>
              <td></td>
            </tr>
            <tr>
              <td colspan = "3" align="right"><b>Total Setelah Pajak :</b></td>
              <td colspan = "2" align="right"><?=$data['totalamount']?></td>
            </tr>
            <?php if($data['balance']!=0): ?>
            <tr>
              <td colspan = "3" align="right"><b>Saldo Terhutang :</b></td>
              <td colspan = "2" align="right"><?=$data['balance']?></td>
            </tr>
            <?php endif; ?>
            <tr>
              <td colspan = "3" align="right"><b>Terbilang :</b></td>
              <td colspan = "2" align="left"><?=$data['terbilang']?></td>
            </tr>
          </table>
        </table>
      </div> <!-- row -->
      
      <div class="page-break"></div>
      <div class="row">

        <div class="col-xs-6 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <p>Catatan</p>
            </div>
            <div class="panel-body">
                <p>Harga di atas sudah termasuk PPN 10%.</p> 
                <p>Waktu pengiriman segera.</p>
                <p>Alamat pengiriman: <?= $data['alamat3']?></p>
                <p>Harap cantumkan NO PO pada setiap surat jalan.</p>
            </div>
          </div>
        </div>

        <div class="col-xs-4 col-xs-offset-2">
          <div class="panel panel-default">
            <div class="panel-heading">
              <p style="text-align: center;">Dipesan Oleh</p>
            </div>
            <div class="panel-body">
              <br><br><br><br>
              <p style="text-align: center;">IVAN SUSANTO</p>
            </div>
          </div>
        </div> 

      </div><!-- row -->
  </body>
</html>
