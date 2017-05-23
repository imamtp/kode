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
		*/

		//cek qty sebelumnya
		// $sql = $this->db->query("select balance
		// 							from stock_history
		// 							where idinventory = $idinventory and warehouse_id = $idwarehouse and idunit = $idunit
		// 							and (datein <= '".$tanggal."')
		// 							order by datein");
		// if($sql->num_rows()>0)
		// {
		// 	$r = $sql->row();
		// 	$old_qty = $r->balance;
		// } else {
		// 	$old_qty = 0;
		// }
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

		if($type==2 || $type==4 || $type==6 || $type==10 || $type==12) {
			$balance = $old_qty+$qty;
		} else if($type==7 || $type==5 || $type==8 || $type==11) {
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
}
?>