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
          <h3><small>Return Date: <?=backdate2($data['header']->date_return)?> <br>No Return: #<?=$data['header']->noreturn?></small></h3>
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
              <h4>Supplier: <?//=$data['namesupplier']?></h4>
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
      </div>

      <div class="row" style="margin-left:1px;">
        <table class="table borderless" >
        
         <tr>
           <td width="22%"><b>Item List:</b></td>
           <td width="50%"></td>
         </tr>
         <?php
         // echo $data['totaltax'];

              if($data['detail']!=null)
              {
              ?>
                      <table class="table table-bordered" style="width:99%; margin-left:1px; margin-right:2px;">
                        <tr>
                          <th width="30">No</th>  
                          <th>SKU Num</th>        
                          <th>Item Code</th>                       
                          <th>Item Name</th>                     
                          <!-- <th>Price</th> -->
                          <th>Qty</th>
                          <th>Measurement</th>
                          <!-- <th>Size/Length</th> -->
                          <!-- <th>Measurement</th> -->
                          <!-- <th>Discount(%)</th> -->
                          <!-- <th>Tax %</th> -->
                           <th>Total</th>
                           <th>Notes</th>
                        </tr>
                        <?php
                        // print_r($data['detail']);
                        $i=1;
                        foreach ($data['detail'] as $key => $value) {
                           ?>
                             <tr>
                              <td width="30"><?=$i?></td>
                              <td><?=$value['sku_no']?></td>
                              <td><?=$value['invno']?></td>
                              <td><?=$value['nameinventory']?></td>  
                              <!-- <td align="right"><?=number_format($value['price'])?></td> -->
                              <td align="right"><?=$value['qty']?></td>
                              <td><?=$value['short_desc']?></td>
                              <!-- <td align="right"><?=$value['size']?></td> -->
                              <!-- <td><?=$value['size_measurement']?></td> -->
                              <!-- <td align="right"><?=number_format($value['disc'])?></td> -->
                              <?php //if($data['totaltax']!=0) { echo "<td>".$value['ratetax']."</td>"; } ?>
                              <td align="right"><?=number_format($value['total_amount_item'])?></td>
                              <td><?=$value['notes']?></td>
                            </tr>
                           <?php
                         
                           $i++;
                          }
                        ?>
                       
                      </table>
              <?php
              }
              ?>

              <table class="table borderless" style="width:99%; margin-top:-20px; margin-left:1px; margin-right:2px;">
                  <tr>
                      <td></td>
                       <td> </td>
                      <td align="right"><b>Total Amount</b></td>
                      <td align="right" width="200"><?=$data['return_amount']?></td>
                    </tr>
                   <!--   <tr>
                        <td></td>
                         <td> </td>
                        <td align="right"><b>Biaya Angkut (+)</b></td>
                        <td align="right"><?=number_format($data['freigthcost'])?></td>
                      </tr>
                       <tr>
                        <td></td>
                         <td> </td>
                        <td align="right"><b>Pajak (+)</b></td>
                        <td align="right"><?=number_format($data['totaltax'])?></td>
                      </tr>
                
                     <tr>
                      <td></td>
                       <td> </td>
                      <td align="right"><b>Total Setelah Pajak</b></td>
                      <td align="right" width="200"><?=number_format($data['total'])?></td>
                    </tr> -->

                
              </table>
               <!-- <div style="float:right;"><b>Amount in Words: </b><?=$data['terbilang']?></div> -->
        </table>
      </div>

      <p>&nbsp;</p>
       <div class="row">
      <!--   <div class="col-xs-4">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Delivery Info</h4>
            </div>
            <div class="panel-body">
              <p>
              Address:<?=$data['header']->shipaddress?><br>             
              Shipping Method:<?=$data['header']->nameshipping?><br>
              </p>
            </div>
          </div>
        </div> -->
       <!--  <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Received By</h4>
            </div>
            <div class="panel-body">
             <p>
                By: <?=$data['header']->receivedby?><br>
                Delivered Date: <?=backdate2($data['header']->delivereddate)?><br>
              </p>
            </div>
          </div>
        </div> -->
       <!--  <div class="col-xs-4 ">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4>Notes</h4>
            </div>
            <div class="panel-body">
             <p>
              <?=$data['header']->notes_receipt?>
              </p>
            </div>
          </div>
        </div> -->
      </div>

     




          </div>
  </div> <!-- panel -->
  

    </div><!-- container -->


      
  </body>
</html>
