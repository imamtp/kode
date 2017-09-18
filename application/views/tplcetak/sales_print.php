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
          <h2><?=$title?></h2>
          Tanggal Order: <?=$data['datetrans']?> <br>
              <?php 
                if($isInvoice){
                  echo "Tanggal Invoice: ". $data['invoice_date'] ."<br>";
                }
              ?>
              NO SO: #<?=$data['no']?><br>
              <?php if($isInvoice) echo "Delivery Date: ".$data['delivery_date_sales'];?>
              
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
        <div class="col-xs-5 col-xs-offset-2 text-left">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Billed To</h4>
            </div>
            <div class="panel-body">
             <p>
                <?=$data['customer']['namecustomer'].'<br>'.
                $data['customer']['address']?> <br>
                Phone: <?=$data['customer']['telephone']?> <br>
                Mobile: <?=$data['customer']['handphone']?> <br>
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
              <thead>
                <tr class="columnHeader">
                  <th width="30">NO</th>  
                  <th>SKU</th>                       
                  <th>NAMA BARANG</th>
                  <th>QTY</th>
                  <th>SAT.</th>
                  <th>UKURAN</th>
                  <th>SAT.</th>
                  <th>JML</th>
                  <th>HARGA</th>
                  <!-- <th>DISKON(%)</th> -->
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
              <?php foreach ($data['detail'] as $key => $value) : ?>
                <tr>
                  <td width="30"><?=$key+1?></td>
                  <td><?=$value['sku_no']?></td>
                  <td><?=$value['nameinventory']?></td>  
                  <td align="right"><?=$value['qty']?></td>
                  <td><?=$value['short_desc']?></td>
                  <td align="right"><?=$value['size']?></td>
                  <td><?=$value['size_measurement']?></td>
                  <!-- <td align="right"><?=number_format($value['disc'])?></td> -->
                  <td align="right"><?php echo $value['qty']*$value['size']; ?></td>
                  <td align="right"><?=number_format($value['price'])?></td>
                  <td align="right"><?=number_format($value['total'])?></td>
                </tr>
              <?php endforeach; ?>
              </tbody>
            </table>
          <?php endif; ?>

          <table class="table borderless" style="width:99%; margin-top:-20px; margin-left:1px; margin-right:2px;">
          <tr>
              <td colspan = "3" width="400" ></td>
              <td align="left"><b>Subtotal </b></td>
              <td>:</td>
              <td colspan = "2" align="right" width="250"><?=$data['detailtotal']?></td>
            </tr>
            <tr>
              <td colspan = "3"></td>
              <td align="left"><b>DPP </b></td>
              <td>:</td>
              <td align="right" width="130"><?=number_format($data['total_dpp'],2)?></td>
              <td width="120"></td>
            </tr>
            <tr>
              <td colspan = "3"></td>
              <td align="left"><b>PPN </b></td>
              <td>:</td>
              <td align="right" ><?=number_format($data['totaltax'],2)?></td>
              <td></td>
            </tr>
            <tr>
              <td colspan = "3"></td>
              <td align="left"><b>Biaya Kirim </b></td>
              <td>:</td>
              <td colspan = "2" align="right"><?=number_format($data['freigthcost'],2)?></td>
            </tr>
            <tr>
              <td colspan = "3"></td>
              <td align="left"><b>Grand Total </b></td>
              <td>:</td>
              <td colspan = "2" align="right"><?=number_format($data['total'],2)?></td>
            </tr>
            <?php if($data['totalowed']=='9x0'): ?>
            <tr>
              <td colspan = "3"></td>
              <td align="left"><b>Saldo Terhutang </b></td>
              <td>:</td>
              <td colspan = "2" align="right"><?=number_format($data['totalowed'],2)?></td>
            </tr>
            <?php endif; ?>
            <tr>
              <td colspan = "3"></td>
              <td align="left"><b>Terbilang </b></td>
              <td>:</td>
              <td colspan = "2" align="left"></td>
            </tr>
            <tr>
              <td colspan = "3"></td>
              <td colspan="4" align="left"><b><?=$data['terbilang']?></b></td>
            </tr>
          </table>
         <!-- <tr>
           <td width="22%"><b> Notes:</b></td>
           <td width="50%"><?=$data['memo']?></td>
         </tr> -->
        </table>
      </div>
      
      <!-- <div class="row">
        <div class="col-xs-6">
          <b>Terbilang: </b><?=$data['terbilang']?>
        </div>
        <div class="col-xs-6 text-right">
          <!-- <b>Operator<br><?=$data['receivedby']?></b> -->

          <div class="row">
        <div class="col-xs-5">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Shipping Address</h4>
            </div>
            <div class="panel-body">
              <p>
              <?=$data['shipaddress']?>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xs-5 col-xs-offset-2 text-right">
          <div class="">
            <div class="panel-heading" style=" text-decoration: underline;">
            Payment Term: <?=$data['payment_term']?>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div> 



      <div class="row">
        <div class="col-xs-5">
          <div class="" >
            <div class="panel-body">
              <p>
              Pembayaran  dengan Cek/Giro a/n
              PT Alfa Prima Sentosa <br>
              Mohon ditandatangani dan difax kembali
              </p>
            </div>
          </div>
        </div>
        <div class="col-xs-5 col-xs-offset-2 text-right">
          <div class="">
            <div class="panel-body">
             <p align="right">
             <!-- <center> -->
             <br><br><br>
               Ivan Susanto
               <!-- </center> -->
              </p>
            </div>
          </div>
        </div>
      </div>
          </div>
  </div> <!-- panel -->
  
                
    </div><!-- container -->


      
  </body>
</html>
