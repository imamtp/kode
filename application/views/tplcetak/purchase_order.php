<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>/assets/css/bootstrap.min.css">
    <link href="<?=base_url()?>/assets/css/print.css" rel="stylesheet">

    <style>
   
    </style>
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
          <h2><?=$title?></h2>
          <h3><small>Tanggal Order: <?=$data['datetrans']?> <br>NO: #<?=$data['no']?><br/></small></h3>
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
              <tr>
                <th width="30">No</th>  
                <th>NO SKU</th>                       
                <th>NAMA BRG</th>                                               
                <th>QTY</th>
                <th>SATUAN</th>
                <th>HARGA</th>
                <th>TOTAL</th>
              </tr>
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
            </table>
        <?php endif; ?>

          <table class="table borderless" style="width:99%; margin-top:-20px; margin-left:1px; margin-right:2px;">
            <tr>
              <td></td>
              <td> </td>
              <td align="right"><b>Subtotal</b></td>
              <td align="right" width="200"><?=$data['dpp']?></td>
            </tr>
            <tr>
              <td></td>
                <td> </td>
              <td align="right"><b>Pajak (+)</b></td>
              <td align="right"><?=number_format($data['tax'])?></td>
            </tr>
            <tr>
              <td></td>
                <td> </td>
              <td align="right"><b>Total Setelah Pajak</b></td>
              <td align="right" width="200"><?=number_format($data['totalamount'])?></td>
            </tr>
            <?php if($data['balance']!=0): ?>
            <tr>
              <td></td>
                <td> </td>
              <td align="right"><b>Saldo Terhutang</b></td>
              <td align="right"><?=number_format($data['balance'])?></td>
            </tr>
            <?php endif; ?>
          </table>
        </table>
      </div> <!-- row -->
      
      <div class="row">
        <div class="col-xs-6">
          <b>Total terbilang : </b><?=$data['terbilang']?>
        </div>
        <div class="col-xs-6 text-right">
          <!-- <b>Operator<br><?=$data['receivedby']?></b> -->
        </div>
      </div> <!-- row -->

      <div class="row">
        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Created By</h4>
            </div>
            <div class="panel-body">
             <p>
                By: <?= $data['author']?><br>
                At: <?= $data['created_date']?><br>
              </p>
            </div>
          </div>
        </div>

        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Confirmed By</h4>
            </div>
            <div class="panel-body">
              <p>
                By: <?= $data['confirmed_by']?><br>
                At: <?= $data['confirmed_date']?><br>
              </p>
            </div>
          </div>
        </div>

        <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Notes</h4>
            </div>
            <div class="panel-body">
             <p>
                <?=$data['memo']?>
              </p>
            </div>
          </div>
        </div>
      </div><!-- row -->
  </body>
</html>
