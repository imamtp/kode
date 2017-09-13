<?php
// print_r($data);
?>
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
          <h4>NO: #<?=$data['header']['job_no']?><br>Harus Selesai Tanggal: <?=backdate2($data['header']['req_ship_date'])?><br></h4>
        </div>
      </div>
      
      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
          <tr>
            <td colspan="2"><b>Rincian Barang:</b></td>
          </tr>
          <?php if(count($data['fg_list'])>0) : ?>
            <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
              <thead>
                <tr>
                  <th width="30">NO</th>  
                  <th>BARANG JADI</th>    
                  <th>QTY</th>                 
                  <th>SAT.</th>
                  <th>UKRN</th>
                  <th>SAT.</th>
                  <th>KODE BRG</th>
                  <th>BHN BAKU</th>
                  <th>QTY</th>
                  <th>SAT.</th>
                  <th width="150">KET</th>
                </tr>
              </thead>
              <tbody>
              <?php foreach ($data['fg_list'] as $key => $value): ?>
                  <tr style="font-size: 13pt">
                    <td width="30"><?=$key+1?></td>
                    <td><?=$value['nameinventory']?></td> 
                    <td><?=number_format($value['qty'])?></td>   
                    <td><?=$value['short_desc']?></td>  
                    <td><?=$value['size']?></td>  
                    <td><?=$value['size_measurement']?></td>  
                    <td><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['invno']; ?></td>  
                    <td><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['nameinventory'];?></td>
                    <td><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['qty'];?></td>  
                    <td><?php if($value['rm_list'][0]['invno']) echo $value['rm_list'][0]['measurement_name'];?></td>
                    <td>&nbsp;</td>
                  </tr>
              <?php endforeach; ?>
              </tbody>
            </table>
          <?php endif; ?>
        </table>
      </div>

      <div class="row">
        <div class="col-xs-5">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>SKP (SO)</h4>
            </div>
            <div class="panel-body">
              <table border="0" style="width:99%;">
                <tr><td width="100" >NO SKP (SO):</td><td style="text-align:right; font-size:13pt"><?=$data['header']['no_sales_order']?></td></tr>
                <tr><td>Customer:</td><td style="text-align:right; font-size:13pt"><?=$data['header']['namecustomer']?></td></tr>
                <tr><td>Alamat:</td><td style="text-align:right; font-size:13pt"><?=$data['header']['address_customer']?></td></tr>
              </table>
            </div>
          </div>
        </div>
        <div class="col-xs-5 col-xs-offset-2 text-left">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Keterangan</h4>
            </div>
            <div class="panel-body">
             <p>
              Tanggal Cetak: <?=date('d-m-Y')?> <br>
              Dicetak Oleh: <?=$this->session->userdata('realname')?> <br>
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
