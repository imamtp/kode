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
          <h4><small>NO: #<?=$data['header']['job_no']?><br>Harus Selesai Tanggal: <?=backdate2($data['header']['req_ship_date'])?><br></small></h4>
        </div>
      </div>
      
      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
          <tr>
            <td colspan="2"><b>Finished Goods List:</b></td>
          </tr>
          <?php if(count($data['fg_list'])>0) : ?>
            <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
              <tr>
                <th width="30">NO</th>  
                <th>NO SKU</th>                       
                <th>NM BRG</th>    
                <th>QTY</th>                 
                <th>SATUAN</th>
                <th>UKURAN</th>
                <th>SATUAN/th>
                <th>BHN BAKU</th>
                <th>KD BRG</th>
                <th>QTY</th>
                <th>SATUAN</th>
                <th>MATERIAL</th>
                <th>KET</th>
              </tr>
          <?php foreach ($data['fg_list'] as $key => $value): ?>
              <tr>
              <td width="30"><?=$key+1?></td>
              <td><?=$value['sku_no']?></td>
              <td><?=$value['nameinventory']?></td> 
              <td><?=$value['qty']?></td>   
              <td><?=$value['short_desc']?></td>  
              <td><?=$value['size']?></td>  
              <td><?=$value['size_measurement']?></td>  
              <td><?=$value['rm_list'][0]['invno']?></td>  
              <td><?=$value['rm_list'][0]['nameinventory']?></td>
              <td><?=$value['rm_list'][0]['qty']?></td>  
              <td><?=$value['rm_list'][0]['measurement_name']?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          <?php endforeach; ?>
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
              <p>
              <div style="float:left;">NO SKP (SO):</div> <div style="float:right;"><?=$data['header']['no_sales_order']?></div> <br>
              <div style="float:left;">Customer: </div> <div style="float:right;"><?=$data['header']['namecustomer']?> </div><br>
              <div style="float:left;">Alamat: </div> <div style="float:right;"><?=$data['header']['address_customer']?> </div><br>
              </p>
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
