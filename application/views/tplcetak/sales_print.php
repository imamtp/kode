<!doctype html>
<html lang="en">
<head>
		<meta charset="UTF-8">
		<title><?=$title?></title>
		<link href="<?=base_url()?>/assets/css/print2.css" rel="stylesheet">
</head>

<body>
	<table class="table" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td style="width:45%">
				<?=$this->logo?>
			</td>
			<td rowspan="3" style="width:10%">&nbsp;</td>
			<td style="width:45%" align="right">
				<h2><?=$title?></h2>
				Tanggal Order: <?=backdate2($data['datetrans']);?><br> 
				No SO: #<?=$data['no']?><br> 
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<h3><?=$data['namaunit']?></h3>
			</td>
			<td class="cell-bordered">
				<h3>Billed To</h3>
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<p><?=$data['alamat']?><br> 
				Phone: <?=$data['telp']?><br> 
				Fax: <?=$data['fax']?> </p>
			</td>
			<td class="cell-bordered">
				<p><?=$data['customer']['namecustomer']?><br> 
				Alamat: <?=$data['customer']['address']?><br> 
				Phone: <?=$data['customer']['telephone']?><br> 
				Mobile: <?=$data['customer']['handphone']?> </p>
			</td>
		</tr>
		<tr>
				<td colspan="3">&nbsp;</td>
		</tr>
		<tr>
				<td colspan="3">
						<table class="table-child" border="1" cellspacing="0" cellpadding="2">
							<thead>	
								<tr>
									<th width="30">NO</th>  
									<th>SKU</th>                       
									<th>NAMA BARANG</th>
									<th>QTY</th>
									<th>SAT.</th>
									<th>UKURAN</th>
									<th>SAT.</th>
									<th>JML</th>
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
									<td align="right"><?=$value['qty']?></td>
									<td align="center"><?=$value['short_desc']?></td>
									<td align="right"><?=$value['size']?></td>
									<td align="center"><?=$value['size_measurement']?></td>
									<td align="right"><?php echo $value['qty']*$value['size']; ?></td>
									<td align="right"><?=number_format($value['price'])?></td>
									<td align="right"><?=number_format($value['total'])?></td>
								</tr>
							<?php endforeach; ?>
							</tbody>
						</table>
				</td>
		</tr>
		<tr>
			<td colspan="3">
				<table class="table-child" border="0" cellspacing="0">
					<tr>
						<td width="45%">&nbsp;</td>
						<td width="10%"></td>
						<td width="10%"></td>
						<td width="10%"></td>
						<td width="2.5%"></td>
						<td width="11.5%"></td>
						<td width="11%"></td>
					</tr>
					<tr>
						<td colspan="3" ></td>
						<td align="left">Subtotal </td>
						<td>:</td>
						<td colspan="2" align="right">
								<?=$data['detailtotal']?>
						</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td align="left">DPP </td>
						<td>:</td>
						<td align="right">
								<?=number_format($data['total_dpp'],2)?>
						</td>
						<td></td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td align="left">PPN </td>
						<td>:</td>
						<td align="right">
								<?=number_format($data['totaltax'],2)?>
						</td>
						<td></td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td align="left">Biaya Kirim </td>
						<td>:</td>
						<td></td>
						<td align="right">
								<?=number_format($data['freigthcost'],2)?>
						</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td align="left">Grand Total </td>
						<td>:</td>
						<td colspan="2" align="right">
								<?=number_format($data['total'],2)?>
						</td>
					</tr>
					<?php if($data['totalowed']=='9x0'): ?>
					<tr>
						<td colspan="3"></td>
						<td align="left">Saldo Terhutang </td>
						<td>:</td>
						<td colspan="2" align="right">
								<?=number_format($data['totalowed'],2)?>
						</td>
					</tr>
					<?php endif; ?>
					<tr>
						<td colspan="3"></td>
						<td align="left">Terbilang </td>
						<td>:</td>
						<td colspan="2" align="left"></td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td colspan="4" align="left"><?=$data['terbilang']?></td>
					</tr>
					
					<tr>
						<td class="cell-bordered"><h3>Ship Address</h3></td>
						<td rowspan="4" width="10%"></td>
						<td colspan="5" style="text-decoration:underline;" align="right">Payment Term: <?=$data['payment_term']?></td>
					</tr>
					<tr>
						<td class="cell-bordered"><?=$data['shipaddress']?></td>
						<td colspan="5">&nbsp;</td>
					</tr>
					<tr><td colspan="7">&nbsp;</td></tr>
					<tr>
						<!-- notes -->
						<td>
							Notes:<br><br>
							<?php 
							foreach($data['notes'] as $note){
								if($note != null)
									echo $note."<br><br>";
							}
							?>
						</td>
						<!-- end of notes -->

						<!-- ttd 1 -->
						<td colspan="3" align="center">
							Disetujui oleh:<br><br><br><br><br><br><br>(<?=$data['customer']['namecustomer']?>)</td>
						<!-- end of ttd1 -->

						<!-- ttd 2 -->
						<td colspan="2" align="center">
							<br><br><br><br><br><br><br>(Ivan Susanto)
						</td>
						<!-- end of ttd 2 -->
					</tr>
				</table>
			</td>
		</tr>
	</table>    
</body>
</html>
