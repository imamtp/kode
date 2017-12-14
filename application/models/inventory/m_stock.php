<?php

class m_stock extends CI_Model {

	/*
			1: Order, (+)
			2: Stock In By PO (+)
			3: Stock In By Cash  (+)
			4: Stock Opname Plus (+)
			5: Stock Opname Minus (-)
			6: Sales Return (+)
			7: Purchase Return (-)
			8: Sales (-)
			9: Opening Balance (+)
			10: Stock In By Transfer (+)
			11: Stock Out By Transfer (-)
			12: Stock In By Received Material From Production (+)
			13: Stock In By Received Return PO (+)
			14: Delivery Sales Return (-)
			15: Stock Out From Production (-)
		*/

	function update_history($type,$qty,$idinventory,$idinventory_parent=null,$idunit,$idwarehouse,$tanggal,$notes,$idjournal=null,$no_transaction=null){
		
		 
		if($idinventory_parent==null){
			$sql = "select sum(stock)as old_qty from warehouse_stock
			where idinventory in (
				select idinventory from inventory 
				where idinventory = $idinventory
				and warehouse_id = $idwarehouse
				and idunit = $idunit
				and deleted = 0
			)";
		} else {
			$sql = "select sum(stock)as old_qty from warehouse_stock
			where idinventory in (
				select idinventory from inventory 
				where idinventory_parent = $idinventory_parent
				and warehouse_id = $idwarehouse
				and idunit = $idunit
				and deleted = 0
			)";
		}
		
		$q = $this->db->query($sql);
		$r = $q->row();

		//stock child utk warehouse_stock
		$q = $this->db->query("select stock as old_qty from warehouse_stock where idinventory = $idinventory");
		$r_inv = $q->row();
		$old_qty_inv = $q->num_rows() > 0 ? $r_inv->old_qty : 0;

		if($type==2 || $type==4 || $type==6 || $type==10 || $type==12 || $type==13) {
			$balance = $r->old_qty + $qty;
			$balance_inv = $old_qty_inv + $qty;
		} else if($type==7 || $type==5 || $type==8 || $type==11 || $type==14 || $type==15) {
			$balance = $r->old_qty - $qty;
			$balance_inv = $old_qty_inv - $qty;
		}

		$stock = array(
		    'idinventory'=> $idinventory,
		    'idunit'=> $idunit,
		    'warehouse_id'=> $idwarehouse,
		    'stock'=> $balance_inv,
		    'usermod'=> $this->session->userdata('userid'),
		    'datemod'=> date('Y-m-d H:i:s'),
		);

		$stock_history = array(
			'idinventory'=>$idinventory_parent == null ? $idinventory : $idinventory_parent,
			'idunit'=>$idunit,
			'type_adjustment'=>$type,
			'no_transaction'=> $no_transaction ?: rand(1111,9999),
			'old_qty'=> $r->old_qty,
			'qty_transaction'=>$qty,
			'balance'=> $balance,
			'notes'=>$notes,
			// 'datein'=>date('Y-m-d H:m:s'),
			'warehouse_id'=>$idwarehouse,
			'idjournal'=>$idjournal
		);
		
		$qcek = $this->db->get_where('warehouse_stock', array(
			'idinventory'=> $idinventory,
		    'idunit'=> $idunit,
		    'warehouse_id'=> $idwarehouse,
		));
		if($qcek->num_rows()==0)
			$this->db->insert('warehouse_stock',$stock);
		else{
			$this->db->where(array(
				'idinventory'=> $idinventory,
				'idunit'=> $idunit,
				'warehouse_id'=> $idwarehouse,
			));
			$this->db->update('warehouse_stock', $stock);
		}
		
		$this->db->insert('stock_history',$stock_history);
	}

	function update_history_v2($type,$qty,$idinventory,$size=null,$idunit,$idwarehouse,$tanggal,$notes,$idjournal=null,$no_transaction=null){
		
		$where_size = null;
		if($size!=null){
			$where_size = " and b.ratio_two = ".$size." ";
		}

		$q = $this->db->query("select a.stock as old_qty
								from warehouse_stock a
								join inventory b ON a.idinventory = b.idinventory
								where a.idinventory = ".$idinventory.$where_size." and grouped is null");

		// $q = $this->db->query("select stock as old_qty from warehouse_stock where idinventory = $idinventory");
		$r_inv = $q->row();
		$old_qty_inv = $q->num_rows() > 0 ? $r_inv->old_qty : 0;

		if($type==2 || $type==4 || $type==6 || $type==10 || $type==12 || $type==13) {
			$balance = $old_qty_inv + $qty;
			$balance_inv = $old_qty_inv + $qty;
		} else if($type==7 || $type==5 || $type==8 || $type==11 || $type==14 || $type==15) {
			$balance = $old_qty_inv- $qty;
			$balance_inv = $old_qty_inv - $qty;
		}

		$stock = array(
		    'idinventory'=> $idinventory,
		    'idunit'=> $idunit,
		    'warehouse_id'=> $idwarehouse,
		    'stock'=> $balance_inv,
		    'usermod'=> $this->session->userdata('userid'),
		    'datemod'=> date('Y-m-d H:i:s'),
		);

		$stock_history = array(
			'idinventory'=>$idinventory,
			'idunit'=>$idunit,
			'type_adjustment'=>$type,
			'no_transaction'=> $no_transaction ?: rand(1111,9999),
			'old_qty'=> $old_qty_inv,
			'qty_transaction'=>$qty,
			'balance'=> $balance,
			'notes'=>$notes,
			// 'datein'=>date('Y-m-d H:m:s'),
			'warehouse_id'=>$idwarehouse,
			'idjournal'=>$idjournal
		);
			
		// print_r($stock_history); 
		$qcek = $this->db->get_where('warehouse_stock', array(
			'idinventory'=> $idinventory,
		    'idunit'=> $idunit,
		    'warehouse_id'=> $idwarehouse,
		));
		if($qcek->num_rows()==0)
			$this->db->insert('warehouse_stock',$stock);
		else{
			$this->db->where(array(
				'idinventory'=> $idinventory,
				'idunit'=> $idunit,
				'warehouse_id'=> $idwarehouse,
			));
			$this->db->update('warehouse_stock', $stock);
		}
		
		$this->db->insert('stock_history',$stock_history);
	}
	
	function update_hpp($idinventory,$idunit,$tipe,$tipe_trx,$balance,$qty_trx,$idpurchase='null',$idsales='null',$idjob='null'){
		/*
            hitung hpp per unit inventory

            tipe:
            1. LIFO
            2. FIFO
            3. Average
		*/
		/*
			tipe_trx:[in | out]
		*/
		$datein = date('Y-m-d H:i:s.u');
		$this->db->trans_begin();
		$sql = "";
		//average
		switch($tipe){
			case 3:
				if($tipe_trx == 'in'){
					//log hpp (in)
					$selector = "select idinventory, idunit, '$datein', coalesce(old_balance,0), coalesce(old_qty,0), $qty_trx, round(cast(( coalesce(old_balance,0 ) + $balance)/( coalesce(old_qty,0) + $qty_trx) as numeric), 2) as hpp_per_unit, ( coalesce(old_balance,0) + $balance ) as ending_balance, ( coalesce(old_qty,0) + $qty_trx ) as ending_qty, $idpurchase, $idsales, $idjob";
				}else{
					//log hpp (out)
					$selector = "select idinventory, idunit, '$datein', coalesce(old_balance,0), coalesce(old_qty,0), $qty_trx, hpp_per_unit, ( coalesce(old_balance,0) - $balance ) as ending_balance, ( coalesce(old_qty,0) - $qty_trx ) as ending_qty, $idpurchase, $idsales, $idjob";
				}

				$sql = "insert into inventory_hpp_history 
						$selector
						from ( 
							select idinventory, idunit, hpp_per_unit from inventory
							where idinventory= $idinventory
							and idinventory_parent is null
							and idunit = $idunit
						) a
						left join (
							select idinventory_parent, sum(cost*stock) as old_balance, sum(stock) as old_qty from inventory a
							join warehouse_stock b on b.idinventory = a.idinventory
							where idinventory_parent is not null
							and a.idinventory_parent = $idinventory
							and a.idunit = $idunit
							group by idinventory_parent, a.idunit
						) b on b.idinventory_parent = a.idinventory";
				break;
		}
		$this->db->query($sql);

		//update hpp di inventory
		$sql = "select hpp_unit from inventory_hpp_history
				where idinventory = $idinventory and idunit = $idunit and datein = '$datein'
				order by datein desc limit 1";
		$r = $this->db->query($sql)->row();

		$this->db->where('idinventory', $idinventory);
		$this->db->update('inventory', array('hpp_per_unit'=> $r->hpp_unit));

		if($this->db->trans_status() === false){
			$this->db->trans_rollback();
			return false;
		}else{
			$this->db->trans_commit();
			return true;
		}
	}

	function update_hpp_old($idunit,$tipe,$idpurchase=null,$idsales=null){
        /*
            hitung hpp per unit inventory

            tipe:
            1. LIFO
            2. FIFO
            3. Average
        */

		$total_hpp = 0;
		$data = array();

        //    echo $idpurchase.' ';
            // foreach($qinv->result() as $r){
                $wer = null;
                if($idpurchase!=null){

					$qcek = $this->db->get_where('inventory_hpp_history',array(
						'idpurchase'=>$idpurchase,
						'idunit'=>$idunit
					));

					if($qcek->num_rows()>0){
						$qhpp = $this->db->query("SELECT sum(hpp_unit) as totalhpp FROM inventory_hpp_history WHERE idpurchase = $idpurchase AND idunit = $idunit")->row();
						$total_hpp = $qhpp->totalhpp == null ? 0 : $qhpp->totalhpp;
					} else {

						$wer = " AND a.idpurchase = $idpurchase ";

						$qpurchase = $this->db->query("select idpurchase
												from purchase a
												where idunit = $idunit $wer");
						foreach($qpurchase->result() as $rpurchase){

							$total_hpp = 0;

							$item = $this->db->query("select idpurchaseitem,qty,price,total,idinventory
														from purchaseitem b
														where b.idpurchase = ".$rpurchase->idpurchase." ");
														// echo $this->db->last_query().'    ';
								foreach($item->result() as $ritem){

									$qinv = $this->db->query("select a.idinventory,coalesce(cost,0),coalesce(totalstock, 0) as totalstock,coalesce(a.nominal_persediaan, 0) as nominal_persediaan
																from inventory a
																left join inventoryunit b ON a.idinventory = b.idinventory
																left join (select idinventory,sum(stock) as totalstock
																	from warehouse_stock
																	group by idinventory) c ON a.idinventory = c.idinventory
																where a.idinventory = ".$ritem->idinventory." ")->row();

																	// echo $this->db->last_query().'    ';

									if($tipe==3){
										/*
											perhitungan AVERAGE 
											HPP per Unit = [Rp Saldo awal + Rp Pembelian] : [Qty saldo awal + Qty pembelian]
											fn : http://nichonotes.blogspot.co.id/2015/02/metode-rata-rata-harga-pokok-penjualan-average-method.html
										*/
										$current_qty_stock = ($qinv->totalstock + $ritem->qty);
										$hpp_unit = round(($qinv->nominal_persediaan + $ritem->total) / $current_qty_stock);
										// echo '('.$qinv->nominal_persediaan.' + '.$ritem->total.') / ('.$qinv->totalstock.' + '.$ritem->qty.') - hpp_unit:'.round($hpp_unit).' <br>';
									}

									$end_balance = $hpp_unit*$current_qty_stock;

									$this->db->where('idinventory',$ritem->idinventory);
									$this->db->update('inventory',array(
										'hpp_per_unit'=>$hpp_unit,
										'cost'=>$hpp_unit,
										'nominal_persediaan'=>$end_balance
									));

									//simpan history perubahan
									

									$data = array(
										"idinventory" => $ritem->idinventory,
										"idunit" => $idunit,
										"datein" => date('Y-m-d H:m:s'),
										"opening_balance" =>$qinv->nominal_persediaan,
										"opening_qty" =>$qinv->totalstock,
										"qty_trx" => $ritem->qty,
										"hpp_unit" => $hpp_unit,
										"ending_balance" => $end_balance,
										"ending_qty" =>$current_qty_stock,
										"idpurchase" => $rpurchase->idpurchase
									);

									$this->db->insert('inventory_hpp_history',$data);

									
									$total_hpp+=$hpp_unit;
								}
						}

					} //end else

                    
                } else { //end if($idpurchase!=null){
					//sales
					$qcek = $this->db->get_where('inventory_hpp_history',array(
						'idsales'=>$idsales,
						'idunit'=>$idunit
					));

					if($qcek->num_rows()>0){
						$qhpp = $this->db->query("SELECT sum(hpp_unit) as totalhpp FROM inventory_hpp_history WHERE idsales = $idsales AND idunit = $idunit")->row();
						$total_hpp = $qhpp->totalhpp == null ? 0 : $qhpp->totalhpp;
					} else {

						$wer = " AND a.idsales = $idsales ";

						$qsales = $this->db->query("select idsales
												from sales a
												where idunit = $idunit $wer");
						foreach($qsales->result() as $rsales){

							$total_hpp = 0;

							$item = $this->db->query("select idsalesitem,qty,price,total,idinventory
														from salesitem b
														where b.idsales = ".$rsales->idsales." ");
								foreach($item->result() as $ritem){

									$qinv = $this->db->query("select a.idinventory,coalesce(cost,0),coalesce(totalstock, 0) as totalstock,coalesce(a.nominal_persediaan, 0) as nominal_persediaan
																from inventory a
																left join inventoryunit b ON a.idinventory = b.idinventory
																left join (select idinventory,sum(stock) as totalstock
																	from warehouse_stock
																	group by idinventory) c ON a.idinventory = c.idinventory
																where a.idinventory = ".$ritem->idinventory." ")->row();

									if($tipe==3){
										/*
											perhitungan AVERAGE 
											HPP per Unit = [Rp Saldo awal + Rp Pembelian] : [Qty saldo awal + Qty pembelian]
											fn : http://nichonotes.blogspot.co.id/2015/02/metode-rata-rata-harga-pokok-penjualan-average-method.html
										*/
										$current_qty_stock = ($qinv->totalstock + $ritem->qty);
										if($current_qty_stock<=0){
											$hpp_unit = round(($qinv->nominal_persediaan + $ritem->total) / $ritem->qty);
										} else {
											$hpp_unit = round(($qinv->nominal_persediaan + $ritem->total) / $current_qty_stock);
										}
										
										// echo '('.$qinv->nominal_persediaan.' + '.$ritem->total.') / ('.$qinv->totalstock.' + '.$ritem->qty.') - hpp_unit:'.round($hpp_unit).' <br>';
									}

									$end_balance = $hpp_unit*$current_qty_stock;

									$this->db->where('idinventory',$ritem->idinventory);
									$this->db->update('inventory',array(
										'hpp_per_unit'=>$hpp_unit,
										'cost'=>$hpp_unit,
										'nominal_persediaan'=>$end_balance
									));

									//simpan history perubahan
									

									$data = array(
										"idinventory" => $ritem->idinventory,
										"idunit" => $idunit,
										"datein" => date('Y-m-d H:m:s'),
										"opening_balance" =>$qinv->nominal_persediaan,
										"opening_qty" =>$qinv->totalstock,
										"qty_trx" => $ritem->qty,
										"hpp_unit" => $hpp_unit,
										"ending_balance" => $end_balance,
										"ending_qty" =>$current_qty_stock,
										"idsales" => $rsales->idsales
									);

									$this->db->insert('inventory_hpp_history',$data);

									$total_hpp+=$hpp_unit;
									
								}
						}

					} //end else
				}

                

          return array('total_hpp'=>$total_hpp);
	}
	
	function hitung_hpp_beli($idinventory,$tipe,$qty_tambah=0,$nominal_tambah=0){
		$hpp_unit = 0;

		$qinv = $this->db->query("select invno,nameinventory,cost,a.idinventory,coalesce(cost,0),coalesce(totalstock, 0) as totalstock,coalesce(a.nominal_persediaan, 0) as nominal_persediaan
		from inventory a
		left join inventoryunit b ON a.idinventory = b.idinventory
		left join (select idinventory,sum(stock) as totalstock
			from warehouse_stock
			group by idinventory) c ON a.idinventory = c.idinventory
		where a.idinventory = ".$idinventory." ")->row();

			// echo $this->db->last_query().'    ';

		if($tipe==3){
			/*
			perhitungan AVERAGE 
			HPP per Unit = [Rp Saldo awal + Rp Pembelian] : [Qty saldo awal + Qty pembelian]
			fn : http://nichonotes.blogspot.co.id/2015/02/metode-rata-rata-harga-pokok-penjualan-average-method.html
			*/
			$current_qty_stock = ($qinv->totalstock + $qty_tambah);

			if($current_qty_stock==null || $current_qty_stock==0){
				$json = array('success'=>false,'message'=>'Tidak bisa melanjutkan konfirmasi penggunaan material <b>'.$qinv->invno. ' '.$qinv->nameinventory.'</b> karena stok kosong');
				// echo $this->db->last_query();
				echo json_encode($json); exit;
			}
			
			
			if($qinv->nominal_persediaan==0){
				//hitung dulu saldo persediaan. dikali dengan harga beli terkini
				$current_balance = $current_qty_stock*$qinv->cost;
				$this->db->where('idinventory',$qinv->idinventory);
				$this->db->update('inventory',array(
					'nominal_persediaan'=>$current_balance
				));
			} else {
				$current_balance = $qinv->nominal_persediaan;
			}
			$hpp_unit = round(($current_balance + $nominal_tambah) / $current_qty_stock);
			// echo '('.$qinv->nominal_persediaan.' + '.$nominal_tambah.') / ('.$qinv->totalstock.' + '.$qty_tambah.') - hpp_unit:'.round($hpp_unit).' <br>';
		}

		return $hpp_unit;
	}

	function update_stock_material($idunit,$idinventory,$qty,$job_no){
		// echo 'update_stock_material';
		// $q_finished_good = $this->db->query("select idinventory,qty_real
		// 									from prod_material
		// 									where idinventory = $idinventory_fg and idunit = $idunit");
	
		// foreach($q_finished_good->result() as $r){
			// var_dump($r);

			$q_stok = $this->db->query("select warehouse_id,idinventory,stock,idunit
										from warehouse_stock
										where idinventory = ".$idinventory." and idunit = $idunit ");
			$total_qty_used = $qty;
			foreach($q_stok->result() as $rstok){
				// var_dump($rstok);
				if($total_qty_used>0){
					// echo $rstok->stock.'<='.$total_qty_used.' ';
					//kalo belum kosong masih lanjut cari stok di berbagai warehouse
					if($rstok->stock>=$total_qty_used){
						//kurangin stok
						// echo 'kurangin stok:'.$total_qty_used.' '; 
						$this->update_history(15,$total_qty_used,$rstok->idinventory,$idunit,$rstok->warehouse_id,date('Y-m-d H:m:s'),'Stock Out From Production. WO:'.$job_no,null);
						$total_qty_used = 0;
					} else {
						$qty_pengurang = $rstok->stock-$total_qty_used;
						if($qty_pengurang<0){
							//kalo minus stok dan pengurang disamain qty
							$qty_pengurang = $rstok->stock;
						}
						//stok seadanya
						// echo 'stok seadanya'.$qty_pengurang.' ';
						$this->update_history(15,$qty_pengurang,$rstok->idinventory,$idunit,$rstok->warehouse_id,date('Y-m-d H:m:s'),'Stock Out From Production. WO:'.$job_no,null);
						$total_qty_used = $total_qty_used-$qty_pengurang;
					}
				}
				
			}
		// }

	}
}
?>