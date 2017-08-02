<?php

class m_stock extends CI_Model {

	function update_history($type,$qty,$idinventory,$idunit,$idwarehouse,$tanggal,$notes,$idjournal=null){
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
		
		$qoldstok = $this->db->get_where('warehouse_stock',array(
				'idinventory' =>$idinventory,
				'warehouse_id' =>$idwarehouse
		));
		// echo $this->db->last_query(); 

		if($qoldstok->num_rows()>0){
			$roldstok = $qoldstok->row();
			$old_qty = $roldstok->stock;
		} else {
			$old_qty = 0;
		}

		if($type==2 || $type==4 || $type==6 || $type==10 || $type==12 || $type==13) {
			$balance = $old_qty+$qty;
		} else if($type==7 || $type==5 || $type==8 || $type==11 || $type==14 || $type==15) {
			$balance = $old_qty-$qty;
		}

		$data = array(
				'idinventory'=>$idinventory,
				'idunit'=>$idunit,
				'type_adjustment'=>$type,
				'no_transaction'=> rand(1111,9999),
				'old_qty'=> $old_qty,
				'qty_transaction'=>$qty,
				'balance'=> $balance,
				'notes'=>$notes,
				'datein'=>date('Y-m-d H:m:s'),
				'warehouse_id'=>$idwarehouse,
				'idjournal'=>$idjournal
			);
		$this->db->insert('stock_history',$data);

		//update current stock
		$cs_data = array(
			'idinventory' =>$idinventory,
			'warehouse_id' =>$idwarehouse,
			'stock' =>$balance,
			// 'afs_stock' =>,
			'usermod' => $this->session->userdata('userid'),
			'datemod' =>date('Y-m-d H:m:s'),
			'idunit' =>$idunit
		);

		$wer = array(
				'idinventory'=>$idinventory,
				'warehouse_id'=>$idwarehouse,
				'idunit'=>$idunit
		);

		$qcurrent = $this->db->get_where('warehouse_stock',$wer);
		if($qcurrent->num_rows()>0)
		{
			$this->db->where($wer);
			$this->db->update('warehouse_stock',$cs_data);
			
		} else {
			$this->db->insert('warehouse_stock',$cs_data);
		}
		

	}

	function update_hpp($idunit,$tipe,$idpurchase=null,$idsales=null){
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

	function update_stock_material($idunit,$idinventory_fg,$job_no){
		// echo 'update_stock_material';
		$q_finished_good = $this->db->query("select idinventory,qty_real
											from prod_material
											where idinventory = $idinventory_fg and idunit = $idunit");
	
		foreach($q_finished_good->result() as $r){
			// var_dump($r);

			$q_stok = $this->db->query("select warehouse_id,idinventory,stock,idunit
										from warehouse_stock
										where idinventory = ".$r->idinventory." and idunit = $idunit ");
			$total_qty_used = $r->qty_real;
			foreach($q_stok->result() as $rstok){
				// var_dump($rstok);
				if($total_qty_used>0){
					//kalo belum kosong masih lanjut cari stok di berbagai warehouse
					if($rstok->stock<=$total_qty_used){
						//kurangin stok
						// echo 'kurangin stok';
						$this->update_history(15,$total_qty_used,$rstok->idinventory,$idunit,$rstok->warehouse_id,date('Y-m-d H:m:s'),'Stock Out From Production. WO:'.$job_no,null);
						$total_qty_used = 0;
					} else {
						$qty_pengurang = $total_qty_used-$rstok->stock;
						//stok seadanya
						// echo 'stok seadanya';
						$this->update_history(15,$qty_pengurang,$rstok->idinventory,$idunit,$rstok->warehouse_id,date('Y-m-d H:m:s'),'Stock Out From Production. WO:'.$job_no,null);
						$total_qty_used = $total_qty_used-$qty_pengurang;
					}
				}
				
			}
		}

	}
}
?>