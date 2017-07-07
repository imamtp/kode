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

    <style>
   
    </style>
</head>

<?php
if($print) { echo "<body onload=\"window.print()\">"; } else { echo "<body>"; }
?>

    <div class="container">

      <div class="panel panel-info">
      <div class="panel-body">
      

    
      <div class="row">
        <div class="col-xs-6">
          <h1>
            <!-- <img src="<?=base_url()?>/assets/images/<?=$data['logo']?>" width="200"/> -->
            <?=$this->logo?>
          </h1>
        </div>
        <div class="col-xs-6 text-right">
          <h2><?=$title?></h2>
          <h3><small>NO: #<?=$data['header']['job_no']?><br>Harus Selesai Tanggal: <?=backdate2($data['header']['req_ship_date'])?><br></small></h3>
        </div>
      </div>
      
      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
        
         <tr>
           <td width="22%"><b>Finished Goods List:</b></td>
           <td width="50%"></td>
         </tr>
         <?php
         // echo $data['totaltax'];

              if(count($data['fg_list'])>0)
              {
              ?>
                      <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
                        <tr>
                          <th width="30">No</th>  
                          <th>No SKU</th>                       
                          <th>Nama Barang</th>    
                          <th>Qty</th>                 
                          <th>Satuan Qty</th>
                          <th>Ukuran</th>
                          <th>Satuan Ukuran</th>
                          <th>Raw Material</th>
                          <th>Kode  Barang</th>
                          <th>Qty</th>
                          <th>Satuan Qty</th>
                          <th>Material Terpakai</th>
                          <th>Keterangan</th>
                        </tr>
                        <?php
                        // print_r($data['detail']);
                        $i=1;
                        foreach ($data['fg_list'] as $key => $value) {
                           ?>
                             <tr>
                              <td width="30"><?=$i?></td>
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
                           <?php
                         
                           $i++;
                          }
                        ?>
                       
                      </table>
              <?php
              }
              ?>


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