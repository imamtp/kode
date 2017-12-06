function showPurchaseRequestData(record) {

  // wPurchaseRequisitionGrid.show();
  Ext.getCmp('windowPopupPurchaseRequisitionGrid').show();

  supplierStore.load();
  storeUnit.load();
  productMeasurementStore.load();

  Ext.getCmp('cbUnitEntryPurchaseRequisition').setValue(idunit);
  Ext.getCmp('statusformPurchaseRequisitionGrid').setValue('edit');

  Ext.getCmp('nojurnalPurchaseRequisition').setValue(record.data.nopurchase);
  Ext.getCmp('idpurchase_pr').setValue(record.data.idpurchase);
  Ext.getCmp('requestby_pr').setValue(record.data.requestby_name);
  Ext.getCmp('requestbyid_pr').setValue(record.data.requestbyid);

  var purchase_req_date = Ext.getCmp('tanggalPurchaseRequisition');
  purchase_req_date.setValue(record.data.date);

  Ext.getCmp('supplierPurchaseRequisition').setValue(record.data.idsupplier);
  Ext.getCmp('supplierNamePurchaseRequisition').setValue(record.data.namesupplier);
  Ext.getCmp('supplierPurchaseRequisition').setReadOnly(true);

  var memoPurchaseRequisition = Ext.getCmp('memoPurchaseRequisition');
  memoPurchaseRequisition.setValue(record.data.memo);

  //insert item to grid
  Ext.Ajax.request({
    url: SITE_URL + 'purchase/get_item_pr',
    method: 'GET',
    params: {
      idpurchase: record.data.idpurchase
    },
    success: function(form, action) {
      var d = Ext.decode(form.responseText);

      var gridSQ = Ext.getCmp('EntryPurchaseRequisition');

      var totalitem = 0;
      var totalqty = 0;
      Ext.each(d.data, function(obj, i) {

        var recSQ = new GridItemPurchaseRequisitionModel({
          idpurchaseitem: obj.idpurchaseitem,
          idinventory: obj.idinventory,
          invno: obj.invno,
          sku_no: obj.sku_no,
          nameinventory: obj.nameinventory,
          price: obj.cost,
          idunit: obj.idunit,
          qty: obj.qty,
          disc: obj.disc,
          total: obj.total,
          short_desc: obj.short_desc
        });

        gridSQ.getStore().insert(0, recSQ);

        totalitem++;
        totalqty += str_replace(".", "", obj.qty) * 1;

      });

      Ext.getCmp('totalItemPurchaseRequisition').setValue(totalitem);
      Ext.getCmp('totalQtyPurchaseRequisition').setValue(renderNomor(totalqty));

    },
    failure: function(form, action) {
      Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    }
  });

  var cbPurchaseRequisition = Ext.getCmp('cbPurchaseRequisition');
  cbPurchaseRequisition.getStore().load();
  Ext.getCmp('cbPurchaseRequisition').setValue(record.data.status * 1);

  if (record.data.idpurchase_req === null) {
    Ext.getCmp('recordPurchaseRequisitionBtnSave').enable();
    // Ext.getCmp('cbPurchaseRequisition').setValue(record.data.idpurchasestatus * 1);
    cbPurchaseRequisition.setReadOnly(false);

  } else {
    // Ext.getCmp('cbPurchaseRequisition').setValue(record.data.idpurchasestatus * 1);
    Ext.getCmp('recordPurchaseRequisitionBtnSave').disable();
    cbPurchaseRequisition.setReadOnly(true);
  }

  if (record.data.status * 1 == 2) {
    //status sudah confirm, tidak bisa edit lagi
    Ext.getCmp('recordPurchaseRequisitionBtnSave').disable();
  }
  cbPurchaseRequisition.show();
}

function updateGridPurchaseOrder(tipe) {
  console.log('update run');
  var addprefix = 'PurchaseOrder';

  var subtotalPurchaseOrder = 0 * 1;
  var totalPurchaseOrder = 0 * 1;
  var totalPajak = 0 * 1;
  // var angkutPurchaseOrder = Ext.getCmp('angkutPurchaseOrder').getValue();
  var angkutPurchaseOrder = 0;
  var pembayaranPurchaseOrder = Ext.getCmp('pembayaranPurchaseOrder').getValue();
  var sisaBayarPurchaseOrder = 0 * 1;
  var taxrate = Ext.getCmp('cb_tax_id_po').getValue();
  var include_tax = Ext.getCmp('include_tax_po').getValue();
  var totaldiskon = 0;

  console.log(Ext.getCmp('EntryPurchaseOrder').getStore().getRange());
  Ext.each(Ext.getCmp('EntryPurchaseOrder').getStore().getRange(), function(obj, i) {
    // var total = obj.data.qty * (obj.data.price * obj.data.size);
    var total = obj.data.qty * (obj.data.price);
    var diskon = (total / 100) * obj.data.disc;
    totaldiskon += diskon;
    var net = total - diskon;
    console.log(total + ' - ' + diskon);

    subtotalPurchaseOrder += net;
    // totalPajak += (net / 100) * (taxrate * 1);
    obj.set('ratetax', taxrate);
    obj.set('total', net);
  });

  var dppPurchaseOrder = (subtotalPurchaseOrder + totaldiskon) / 1.1;
  totalPajak += dppPurchaseOrder * (taxrate * 1 / 100);
  //     console.log(subtotalPurchaseOrder);
  totalPurchaseOrder = subtotalPurchaseOrder + angkutPurchaseOrder * 1;
  //     console.log(totalPurchaseOrder+' '+totalPajak);
  if (include_tax * 1 == 1) {
    //include tax
    totalPurchaseOrder = dppPurchaseOrder;
  } else {
    totalPurchaseOrder = dppPurchaseOrder + totalPajak;
  }

  //     console.log(totalPurchaseOrder);
  sisaBayarPurchaseOrder = totalPurchaseOrder - pembayaranPurchaseOrder;
  // alert(totalPajak);
  Ext.getCmp('subtotal' + addprefix).setValue(subtotalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
  Ext.getCmp('total' + addprefix).setValue(totalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
  Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', { minimumFractionDigits: 2 }));
  Ext.getCmp('diskonPurchaseOrder').setValue(totaldiskon.toLocaleString('null', { minimumFractionDigits: 2 }));
  Ext.getCmp('dppPurchaseOrder').setValue(dppPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
  // Ext.getCmp('pembayaran').setValue(pembayaranPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
  // Ext.getCmp('sisaBayarPurchaseOrder').setValue(sisaBayarPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));

}
if (!Ext.isDefined(Ext.getCmp('EntryPurchaseOrder'))) {
  Ext.create(dir_sys + 'purchase2.EntryPurchaseOrder');
}

var wPurchaseOrderGrid = Ext.create('widget.window', {
  id: 'windowPopupPurchaseOrderGrid',
  title: 'Purchase Order Form',
  header: {
    titlePosition: 2,
    titleAlign: 'center'
  },
  closable: true,
  closeAction: 'hide',
  autoWidth: true,
  autoHeight: true,
  layout: 'fit',
  border: false,
  items: [{
    xtype: 'EntryPurchaseOrder'
  }],
  modal: true,
  listeners: {
    'show': function() {
      // storePurchaseOrderGrid.load();
      Ext.getCmp('cb_purchase_order_status').getStore().load();
      Ext.getCmp('cb_purchase_order_status').getStore().filter([function(item) { return [1, 2, 5].includes(item.get('id')) }]);
    }
  }
});

function showPurchaseOrderData(record) {
  wPurchaseOrderGrid.show();

  productMeasurementStore.load();
  StorePayment.load();
  comboxWarehouseStore.load();
  supplierStore.load();

  // clearFormSO();

  // Ext.getCmp('cbUnitEntryPurchaseOrder').setValue(idunit);
  Ext.getCmp('statusformPurchaseOrderGrid').setValue('edit');
  Ext.getCmp('idpurchase_order').setValue(record.data.idpurchase);
  Ext.getCmp('idpurchase_req_PurchaseOrder').setValue(record.data.idpurchase_req);

  console.log(record.data)

  var cb_purchase_order_status = Ext.getCmp('cb_purchase_order_status');
  cb_purchase_order_status.getStore().load();
  cb_purchase_order_status.setValue(record.data.idpurchasestatus * 1);
  if (record.data.idpurchasestatus * 1 !== 1) {
    //selain dari open disable tombol record
    cb_purchase_order_status.setReadOnly(true);
    Ext.getCmp('btnRecordPurchaseOrder').disable();
  } else {
    cb_purchase_order_status.setReadOnly(false);
    Ext.getCmp('btnRecordPurchaseOrder').enable();
  }


  Ext.getCmp('nojurnalPurchaseOrder').setValue(record.data.nopurchase);
  Ext.getCmp('supplierNamePurchaseOrder').setValue(record.data.namesupplier);
  Ext.getCmp('supplierPurchaseOrder').setValue(record.data.idsupplier);

  Ext.getCmp('cb_tax_id_po').getStore().load(function() {
    Ext.getCmp('cb_tax_id_po').setValue(record.data.rate);
  });

  var checktax = record.data.include_tax * 1 == 1 ? true : false;
  Ext.getCmp('include_tax_po').setValue(checktax);

  var subtotal = record.data.subtotal * 1;
  var disc = record.data.total_diskon * 1;
  var dpp = record.data.total_dpp * 1;
  var pajak = record.data.tax * 1;
  var totalamount = record.data.totalamount * 1;

  Ext.getCmp('memoPurchaseOrder').setValue(record.data.memo);
  Ext.getCmp('subtotalPurchaseOrder').setValue(subtotal.toLocaleString('null', { maximumFractionDigits: 2 }));
  Ext.getCmp('diskonPurchaseOrder').setValue(disc.toLocaleString('null', { maximumFractionDigits: 2 }));
  Ext.getCmp('dppPurchaseOrder').setValue(dpp.toLocaleString('null', { maximumFractionDigits: 2 }));
  Ext.getCmp('totalPajakPurchaseOrder').setValue(pajak.toLocaleString('null', { maximumFractionDigits: 2 }));
  Ext.getCmp('totalPurchaseOrder').setValue(totalamount.toLocaleString('null', { maximumFractionDigits: 2 }));

  if (record.data.idpurchase_req !== null) {
    Ext.getCmp('rg_is_from_pr_poform').setValue({ is_from_pr: 1 });
    Ext.getCmp('no_purchase_req').setValue(record.data.nopurchase_req);
    Ext.getCmp('purchase_req_date').setValue(record.data.date_req);
  } else {
    Ext.getCmp('rg_is_from_pr_poform').setValue({ is_from_pr: 2 });
  }


  var EntryGoodsReceiptRM = Ext.getCmp('EntryPurchaseOrder').getStore();
  EntryGoodsReceiptRM.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
      'extraparams': 'a.idpurchase:' + record.data.idpurchase
    };
  });

  EntryGoodsReceiptRM.load({
    callback: function() {
      // updateGridPurchaseOrder();
    }
  });
  Ext.getCmp('po_date_PurchaseOrder').setValue(convertDate2(record.data.date));

  Ext.getCmp('shipaddressPurchaseOrder').setValue(record.data.shipaddress);
  Ext.getCmp('po_req_date_PurchaseOrder').setRawValue(record.data.req_delivery_date);
}

function showGoodsReceiptData(selectedRecord) {
  console.log(selectedRecord);
  if (!Ext.isDefined(Ext.getCmp('WindowEntryGoodsReceipt'))) {
    Ext.create(dir_sys + 'purchase2.WindowEntryGoodsReceipt');
  }
  var WindowEntryGoodsReceipt = Ext.getCmp('WindowEntryGoodsReceipt');
  var gridEntryGR = Ext.getCmp('EntryGoodsReceipt');

  WindowEntryGoodsReceipt.itembatch = []; // <= create temporary for json array of itembatch
  //untuk perhitungan totalamount
  WindowEntryGoodsReceipt.perhitungan = {
    include_tax: selectedRecord.get('include_tax'),
    ratetax: selectedRecord.get('rate'),
    subtotal: selectedRecord.get('subtotal'),
    dpp: selectedRecord.get('dpp'),
    tax: selectedRecord.get('tax'),
    totalamount: selectedRecord.get('totalamount'),
  };
  WindowEntryGoodsReceipt.show();

  Ext.getCmp('cb_tax_id_poreceipt').getStore().load();

  Ext.getCmp('id_gr_poreceipt').setValue(selectedRecord.get('goods_receipt_id'));
  Ext.getCmp('nojurnal_poreceipt').setValue(selectedRecord.get('no_goods_receipt'));
  Ext.getCmp('idpurchase_poreceipt').setValue(selectedRecord.get('idpurchase'));
  Ext.getCmp('nopo_poreceipt').setValue(selectedRecord.get('no_po'));
  Ext.getCmp('po_date_poreceipt').setValue(selectedRecord.get('po_date'));
  Ext.getCmp('received_poreceipt').setValue(selectedRecord.get('name_received_by'));
  Ext.getCmp('receivedid_poreceipt').setValue(selectedRecord.get('received_by'))
  Ext.getCmp('received_date_poreceipt').setValue(selectedRecord.get('received_date'));
  Ext.getCmp('cbUnit_poreceipt').setValue(selectedRecord.get('idunit'));
  Ext.getCmp('cb_tax_id_poreceipt').setValue(selectedRecord.get('idtax'));
  Ext.getCmp('suppliername_poreceipt').setValue(selectedRecord.get('namesupplier'));
  Ext.getCmp('supplier_poreceipt').setValue(selectedRecord.get('idsupplier'));
  Ext.getCmp('idaccount_coa_gr').setValue(selectedRecord.get('idaccount_coa_persediaan'));
  Ext.getCmp('accname_coa_gr').setValue(selectedRecord.get('accname_coa_persediaan'));
  Ext.getCmp('accnumber_coa_gr').setValue(selectedRecord.get('accnumber_coa_persediaan'));
  Ext.getCmp('no_rujukan_sup_poreceipt').setValue(selectedRecord.get('supplier_direct_no'));
  Ext.getCmp('notes_poreceipt').setValue(selectedRecord.get('notes'));

  var cb_status_poreceipt = Ext.getCmp('cb_status_poreceipt');
  cb_status_poreceipt.getStore().load(function() {
    cb_status_poreceipt.setValue('3');
  });

  var cb_statusgr_poreceipt = Ext.getCmp('cb_grstatus_poreceipt');
  cb_statusgr_poreceipt.setValue(selectedRecord.get('status_gr') * 1);


  Ext.getCmp('totalPajak_poreceipt').setValue(renderNomor(selectedRecord.get('tax')));
  Ext.getCmp('total_poreceipt').setValue(renderNomor(selectedRecord.get('totalamount')));
  Ext.getCmp('subtotal_poreceipt').setValue(renderNomor(selectedRecord.get('subtotal')));

  Ext.getCmp('memo_poreceipt').setValue('Goods Receipt ' + selectedRecord.get('no_po'));

  gridEntryGR.getStore().load({
    params: {
      'extraparams': 'a.status:' + 99 //asal aja. buat ngapus grid doang. karena kalo pake removeAll() bikin error
    }
  });
  // EntryGoodsReceiptRM.removeAll();
  // EntryGoodsReceiptRM.sync();

  //insert item to grid
  Ext.Ajax.request({
    url: SITE_URL + 'purchase/get_po_items',
    method: 'GET',
    params: {
      // goods_receipt_id: selectedRecord.get('goods_receipt_id'),
      idpurchase: selectedRecord.get('idpurchase'),
    },
    success: function(form, action) {
      var d = Ext.decode(form.responseText);
      Ext.getCmp('totalitem_poreceipt').setValue(d.data.length);
      Ext.each(d.data, function(obj, i) {
        // console.log(obj);
        var qty_receipt = 0;
        //ambil data purchaseitem batch utk tiap-tiap purchase item dan ditaro di WindowEntryGoodsReceipt.itembatch
        Ext.Ajax.request({
          url: SITE_URL + 'purchase/get_batch_items',
          method: 'GET',
          params: {
            idpurchase: selectedRecord.get('idpurchase'),
            idpurchaseitem: obj.idpurchaseitem,
            idunit: obj.idunit,
            goods_receipt_id: selectedRecord.get('goods_receipt_id'),
          },
          success: function(form, action) {
            var d = Ext.decode(form.responseText);
            WindowEntryGoodsReceipt.itembatch[i] = d.data;

            Ext.each(d.data, function(item) {
              qty_receipt += (item.qty * 1);
            });



            var recPO = new GridReceiptItemPurchaseOrderModel({
              idpurchaseitem: obj.idpurchaseitem,
              idinventory: obj.idinventory,
              idunit: obj.idunit,
              sku_no: obj.sku_no,
              invno: obj.invno,
              nameinventory: obj.nameinventory,
              ratio_two: obj.ratio_two,
              ratio_tre: obj.ratio_tre,
              qty: obj.qty,
              qty_received: obj.qty_received || 0,
              qty_receipt: qty_receipt || 0,
              total_receipt: (obj.price * 1) * (qty_receipt),
              price: obj.price,
              disc: obj.disc,
              total: obj.total,
              ratetax: obj.ratetax,
              tax: obj.tax,
              size: obj.size,
              short_desc: obj.short_desc,
              size_measurement: obj.size_measurement,
              warehouse_code: obj.warehouse_code,
              total_qty_batch: obj.total_qty_batch
            });
            gridEntryGR.getStore().insert(i, recPO);
          },
          failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
          }
        });

      }); //end of loop
    },
    failure: function(form, action) {
      Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    }
  });

  Ext.getCmp('statusform_poreceipt').setValue('edit');
  Ext.getCmp('cb_status_poreceipt').hide();

  //if GR status is open
  if (selectedRecord.get('status_gr') == 1) {
    cb_statusgr_poreceipt.getStore().filter([function(item) { return item.get('id') != 4 }]); //tampilkan opsi status hanya open, confirmed, dan canceled aja
    cb_statusgr_poreceipt.setReadOnly(false);
    Ext.getCmp('btnRecordGR').enable();
  } else {
    cb_statusgr_poreceipt.setReadOnly(true);
    cb_statusgr_poreceipt.getStore().clearFilter();
    Ext.getCmp('btnRecordGR').setDisabled(true);
  }
}

function loadDataFormPurchaseInvoice(selectedRecord, option) {
  Ext.getCmp('cb_tax_id_poinvoice').getStore().load();

  Ext.getCmp('idaccount_coa_hutang_pi').setValue();
  Ext.getCmp('idaccount_coa_pajakmasuk_pi').setValue();
  Ext.getCmp('accname_coa_hutang_pi').setValue();
  Ext.getCmp('accname_coa_pajakmasuk_pi').setValue();
  Ext.getCmp('accnumber_coa_hutang_pi').setValue();
  Ext.getCmp('accnumber_coa_pajakmasuk_pi').setValue();
  Ext.getCmp('comboxpaymentterm_pi').setValue();
  Ext.getCmp('ddaysPurchaseInvoice').setValue();
  Ext.getCmp('eomddaysPurchaseInvoice').setValue();
  Ext.getCmp('percentagediscPurchaseInvoice').setValue();
  Ext.getCmp('daysdiscPurchaseInvoice').setValue();
  Ext.getCmp('dmaxPurchaseInvoice').setValue();

  Ext.getCmp('idpurchase_poinvoice').setValue(selectedRecord.get('idpurchase'));
  Ext.getCmp('goods_receipt_id_poinvoice').setValue(selectedRecord.get('goods_receipt_id'));
  Ext.getCmp('nopo_poinvoice').setValue(selectedRecord.get('no_po'));
  Ext.getCmp('nogr_poinvoice').setValue(selectedRecord.get('no_goods_receipt'));
  Ext.getCmp('po_date_poinvoice').setValue(selectedRecord.get('po_date'));
  Ext.getCmp('cbUnit_poinvoice').setValue(selectedRecord.get('idunit'));
  Ext.getCmp('cb_tax_id_poinvoice').setValue(selectedRecord.get('rate_tax'));
  Ext.getCmp('supplier_poinvoice').setValue(selectedRecord.get('idsupplier'));
  Ext.getCmp('nofpsup_poinvoice').setValue(selectedRecord.get('nofpsup'));
  Ext.getCmp('notes_pi').setValue(selectedRecord.get('notes'));
  Ext.getCmp('include_tax_poinvoice').setValue(selectedRecord.get('include_tax'));

  Ext.getCmp('supplier_poinvoice').getStore().load(function(records) {
    var supp = records.filter(function(item) {
      return item.get('idsupplier') == selectedRecord.get('idsupplier')
    });
    Ext.getCmp('memo_poinvoice').setValue(selectedRecord.get('memo') || "Purchase Invoice : " + supp[0].data.namesupplier);
  });

  var subtotal = selectedRecord.get('subtotal') * 1;
  var dpp = selectedRecord.get('dpp') * 1;
  var tax = selectedRecord.get('tax') * 1;
  var totalamount = selectedRecord.get('totalamount') * 1;

  Ext.getCmp('subtotal_poinvoice').setValue(subtotal.toLocaleString('null', { maximumFractionDigits: 2 }));
  Ext.getCmp('dpp_poinvoice').setValue(dpp.toLocaleString('null', { maximumFractionDigits: 2 }));
  Ext.getCmp('totalPajak_poinvoice').setValue(tax.toLocaleString('null', { maximumFractionDigits: 2 }));
  Ext.getCmp('total_poinvoice').setValue(totalamount.toLocaleString('null', { maximumFractionDigits: 2 }));

  Ext.getCmp('sisaBayar_poinvoice').setValue(totalamount.toLocaleString('null', { maximumFractionDigits: 2 }));

  var EntryPurchaseInvoice = Ext.getCmp('EntryPurchaseInvoice').getStore();
  EntryPurchaseInvoice.removeAll();
  EntryPurchaseInvoice.sync();

  //insert item to grid
  Ext.Ajax.request({
    url: SITE_URL + 'purchase/get_gr_items',
    method: 'GET',
    params: {
      idpurchase: selectedRecord.get('idpurchase'),
      idunit: selectedRecord.get('idunit'),
      goods_receipt_id: selectedRecord.get('goods_receipt_id'),
    },
    success: function(form, action) {
      var d = Ext.decode(form.responseText);

      var grid = Ext.getCmp('EntryPurchaseInvoice');

      Ext.each(d.data, function(obj, i) {
        // console.log(obj);
        var recGR = new GridItemPurchaseInvoiceModel({
          purchase_batch_id: obj.purchase_batch_id,
          idpurchaseitem: obj.idpurchaseitem,
          idpurchase: obj.idpurchase,
          sku_no: obj.sku_no,
          invno: obj.invno,
          qty: obj.qty,
          nameinventory: obj.nameinventory,
          short_desc: obj.short_desc,
          price: obj.price,
          total: obj.total,
        });


        grid.getStore().insert(i, recGR);
      });

      // updateSelisih();
    },
    failure: function(form, action) {
      Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    }
  });
}

var wCoaPurchasePaymentPopup = Ext.create(dir_sys + 'purchase2.wCoaPurchasePaymentPopup');
var windowPopupWindowPurchasePayment = Ext.create('widget.window', {
  id: 'windowPopupWindowPurchasePayment',
  title: 'Add Payment',
  header: {
    titlePosition: 2,
    titleAlign: 'center'
  },
  closable: true,
  closeAction: 'hide',
  autoWidth: true,
  autoHeight: true,
  layout: 'fit',
  border: false,
  items: [{
      xtype: 'form',
      id: 'form_PurchasePayment',
      autoWidth: true,
      url: SITE_URL + 'purchase/save_payment',
      autoHeight: true,
      bodyPadding: 5,
      // width:400,
      defaults: {
        anchor: '100%',
        labelWidth: 160
      },
      fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong'
      },
      items: [

        {
          xtype: 'hiddenfield',
          name: 'purchase_payment_id'
        }, {
          xtype: 'hiddenfield',
          name: 'goods_receipt_id',
          id: 'goods_receipt_id_paymentPurchase'
        },
        {
          xtype: 'textfield',
          readOnly: true,
          id: 'noinvoice_paymentPurchase',
          fieldLabel: 'No Invoice'
        },
        {
          xtype: 'textfield',
          name: 'nofpsup',
          readOnly: true,
          id: 'nofpsup_paymentPurchase',
          fieldLabel: 'No FP (Supp)'
        },
        {
          xtype: 'textfield',
          readOnly: true,
          id: 'no_purchase_order_paymentPurchase',
          fieldLabel: 'No Purchase Order'
        },
        {
          xtype: 'textfield',
          readOnly: true,
          id: 'namesupplier_paymentPurchase',
          fieldLabel: 'Supplier Name'
        },
        {
          xtype: 'textfield',
          readOnly: true,
          id: 'date_purchase_paymentPurchase',
          fieldLabel: 'Date Purchase'
        },
        {
          xtype: 'textfield',
          readOnly: true,
          id: 'paidtoday_paymentPurchase',
          fieldLabel: 'Total Paid',
          fieldStyle: 'text-align: right;',
        },
        {
          xtype: 'textfield',
          readOnly: true,
          name: 'balance_Purchase',
          fieldLabel: 'Billed Amount',
          id: 'balance_Purchase_paymentPurchase',
          fieldStyle: 'text-align: right;'
        },
        {
          xtype: 'textfield',
          cls: 'my-mandatory-field',
          allowBlank: false,
          name: 'amount',
          // maxValue:data.balance*1,
          // minValue: 0,
          id: 'amount_PurchasePayment',
          fieldLabel: 'Amount',
          fieldStyle: 'text-align: right;',
          listeners: {
            'render': function(c) {
              c.getEl().on('keyup', function() {
                this.setRawValue(renderNomor(this.getValue()));
                updateSelisihPurchasePayment();
              }, c);
            }
          }
        },
        {
          xtype: 'textfield',
          readOnly: true,
          id: 'balance_paymentPurchase',
          fieldLabel: 'Outstanding Balance',
          fieldStyle: 'text-align: right;',
        }, {
          xtype: 'datefield',
          format: 'd/m/Y',
          allowBlank: false,
          name: 'date_payment',
          fieldLabel: 'Date Payment',
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Akun Kas/Bank',
          allowBlank: false,
          name: 'accnametujuan',
          id: 'accname_coa_purchasepayment',
          listeners: {
            render: function(component) {
              component.getEl().on('click', function(event, el) {
                wCoaPurchasePaymentPopup.show();
                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                  operation.params = {
                    'idunit': idunit,
                    'idaccounttype': '1,19'
                  };
                });
                storeGridAccount.load();
              });
            }
          }
        }, {
          xtype: 'hiddenfield',
          name: 'idaccount',
          id: 'idaccount_coa_purchasepayment',
        }, {
          xtype: 'textarea',
          fieldLabel: 'Notes',
          name: 'notes'
        }
      ]
    }

  ],
  buttons: [{
    text: 'Cancel',
    handler: function() {
      Ext.getCmp('windowPopupWindowPurchasePayment').hide();
    }
  }, {
    text: 'Save',
    handler: function() {
      var selisih = str_replace('.', '', Ext.getCmp('balance_Purchase_paymentPurchase').getValue()) * 1 - str_replace('.', '', Ext.getCmp('amount_PurchasePayment').getValue()) * 1
      if (selisih * 1 < 0) {
        Ext.Msg.alert("Error!", "Payment exceeds the outstanding balance");
      } else {
        var form = Ext.getCmp('form_PurchasePayment').getForm();
        if (form.isValid()) {
          form.submit({
            success: function(form, action) {
              Ext.Msg.alert('Success', action.result.message);
              Ext.getCmp('form_PurchasePayment').getForm().reset();
              Ext.getCmp('windowPopupWindowPurchasePayment').hide();

              setHeaderPurchaseInvoice();

              Ext.getCmp('PurchaseInvoiceUnpaidGrid').getStore().load();
              // storeGridPurchaseInvoicePaidGrid.load();
              // storeGridPurchaseInvoiceOverdueGrid.load();
              // storeGridPurchaseInvoiceUnpaidGrid.load();

              Ext.getCmp('GoodsReceiptGridID').getStore().load();
            },
            failure: function(form, action) {
              Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
              //                                     storeGridPengaturan.load();
            }
          });
        } else {
          Ext.Msg.alert("Error!", "Your form is invalid!");
        }
      }

    }
  }],
  modal: true,
  listeners: {
    'show': function() {


    }
  }
});

function windowPurchasePayment(data) {

  windowPopupWindowPurchasePayment.show();
  Ext.getCmp('goods_receipt_id_paymentPurchase').setValue(data.goods_receipt_id);
  Ext.getCmp('noinvoice_paymentPurchase').setValue(data.no_invoice);
  Ext.getCmp('no_purchase_order_paymentPurchase').setValue(data.no_po);
  Ext.getCmp('namesupplier_paymentPurchase').setValue(data.namesupplier);
  Ext.getCmp('date_purchase_paymentPurchase').setValue(data.po_date);
  Ext.getCmp('paidtoday_paymentPurchase').setValue(renderNomor(data.paidtoday));
  Ext.getCmp('balance_Purchase_paymentPurchase').setValue(renderNomor(data.balance));
  Ext.getCmp('nofpsup_paymentPurchase').setValue(data.nofpsup);
}

function updateSelisihPurchasePayment() {
  var selisih = str_replace('.', '', Ext.getCmp('balance_Purchase_paymentPurchase').getValue()) * 1 - str_replace('.', '', Ext.getCmp('amount_PurchasePayment').getValue()) * 1
  Ext.getCmp('balance_paymentPurchase').setValue(renderNomor(selisih));
}

function setHeaderPurchaseInvoice() {
  Ext.Ajax.request({
    url: SITE_URL + 'purchase/get_sum_invoice',
    method: 'GET',
    // params: {
    //     idsales: data.idsales
    // },
    success: function(form, action) {
      var d = Ext.decode(form.responseText);
      Ext.getCmp('sumPurchaseInvUnpaid').update('<center><h2><span style=color:#FF6D00>' + d.totalUnpaid + '</span></h2>');
      Ext.getCmp('sumPurchaseInvPaid').update('<center><h2><span style=color:#64DD17>' + d.totalPaid + '</span></h2>');
      Ext.getCmp('sumPurchaseInvDue').update('<center><h2><span style=color:#d50000>' + d.totalDue + '</span></h2>');
      // storeGridWindowSalesPayment.load();
    },
    failure: function(form, action) {
      Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    }
  });
}

function clearFormPO() {
  Ext.getCmp('idpurchase_order').setValue(null);
  Ext.getCmp('idpurchase_req_PurchaseOrder').setValue(null);

  // var cb_purchase_order_status = Ext.getCmp('cb_purchase_order_status');
  // cb_purchase_order_status.setValue(null);

  Ext.getCmp('nojurnalPurchaseOrder').setValue(null);
  Ext.getCmp('supplierPurchaseOrder').setValue(null);
  Ext.getCmp('supplierNamePurchaseOrder').setValue(null);
  Ext.getCmp('po_date_PurchaseOrder').setValue(null);
  Ext.getCmp('cb_tax_id_po').setValue(null);
  Ext.getCmp('memoPurchaseOrder').setValue(null);
  Ext.getCmp('subtotalPurchaseOrder').setValue(null);
  Ext.getCmp('totalPajakPurchaseOrder').setValue(null);
  Ext.getCmp('totalPurchaseOrder').setValue(null);
  Ext.getCmp('purchase_req_date').setValue(null);
  Ext.getCmp('no_purchase_req').setValue(null);
  Ext.getCmp('shipaddressPurchaseOrder').setValue(null);
  Ext.getCmp('po_req_date_PurchaseOrder').setValue(null);

  //clear grid
  var EntryGoodsReceiptRM = Ext.getCmp('EntryPurchaseOrder').getStore();
  Ext.each(EntryGoodsReceiptRM.getRange(), function() { EntryGoodsReceiptRM.removeAt(0) });

  // Ext.getCmp('rg_is_from_pr_poform').setValue({ is_from_pr: 2 });

  // var EntryGoodsReceiptRM = Ext.getCmp('EntryPurchaseOrder').getStore();
  // EntryGoodsReceiptRM.removeAll();
  // EntryGoodsReceiptRM.sync();
}

function clearFormPR() {
  // var EntryPurchaseRequisition = Ext.getCmp('EntryPurchaseRequisition').getStore();
  // EntryPurchaseRequisition.removeAll();
  // EntryPurchaseRequisition.sync();
  Ext.getCmp('EntryPurchaseRequisition').getStore().removeAll();
  Ext.getCmp('idpurchase_pr').setValue(null);
  Ext.getCmp('nojurnalPurchaseRequisition').setValue(null);
  Ext.getCmp('tanggalPurchaseRequisition').setValue(null);
  Ext.getCmp('cb_tax_id_pr').setValue(null);
  Ext.getCmp('tglPelunasanPurchaseRequisition').setValue(null);
  Ext.getCmp('cbPurchaseRequisition').setValue(null);
  Ext.getCmp('supplierPurchaseRequisition').setValue(null);
  Ext.getCmp('supplierNamePurchaseRequisition').setValue(null);
  // Ext.getCmp('paymentPurchaseRequisition').setValue(null);
  Ext.getCmp('memoPurchaseRequisition').setValue('Purchase Requisition');
  Ext.getCmp('sisaBayarPurchaseRequisition').setValue(null);
  Ext.getCmp('angkutPurchaseRequisition').setValue(null);
  Ext.getCmp('shipaddressPurchaseRequisition').setValue(null);
  Ext.getCmp('totalPurchaseRequisition').setValue(null);
  // Ext.getCmp('shippingPurchaseRequisition').setValue(null);
  Ext.getCmp('totalPajakPurchaseRequisition').setValue(null);
  Ext.getCmp('subtotalPurchaseRequisition').setValue(null);

}

function loadReturnPoData(record) {
  if (!Ext.isDefined(Ext.getCmp('WindowViewReturnPO'))) {
    Ext.create(dir_sys + 'purchase2.WindowViewReturnPO');
  }
  Ext.getCmp('WindowViewReturnPO').show();

  Ext.getCmp('supplier_viewporeturn').getStore().load();
  Ext.getCmp('cb_tax_id_viewporeturn').getStore().load();

  if (Ext.isDefined(Ext.getCmp('WindowPOReturnList'))) {
    Ext.getCmp('WindowPOReturnList').hide();
  }

  Ext.getCmp('purchase_return_id_viewporeturn').setValue(record.data.purchase_return_id);
  Ext.getCmp('noreturn_viewporeturn').setValue(record.data.noreturn);
  Ext.getCmp('return_date_viewporeturn').setValue(record.data.date_return);

  Ext.getCmp('nopo_viewporeturn').setValue(record.data.nopurchase);
  Ext.getCmp('po_date_viewporeturn').setValue(record.data.po_date);
  Ext.getCmp('cbUnit_viewporeturn').setValue(record.data.idunit);
  Ext.getCmp('cb_tax_id_viewporeturn').setValue(record.data.idtax);
  Ext.getCmp('supplier_viewporeturn').setValue(record.data.idsupplier);
  Ext.getCmp('cb_status_viewporeturn').setValue(record.data.return_status * 1);

  Ext.getCmp('idaccount_coa_viewretur_po').setValue(record.data.idaccount_return);
  Ext.getCmp('accname_coa_viewretur_po').setValue(record.data.accname);
  Ext.getCmp('accnumber_coa_viewretur_po').setValue(record.data.accnumber);

  Ext.getCmp('totalPajak_viewporeturn').setValue(renderNomor(record.data.tax));
  Ext.getCmp('total_viewporeturn').setValue(renderNomor(record.data.totalamount));
  Ext.getCmp('subtotal_viewporeturn').setValue(renderNomor(record.data.subtotal));

  var ViewReturnPO = Ext.getCmp('ViewReturnPO');
  var ViewReturnPOStore = ViewReturnPO.getStore().load();

  ViewReturnPOStore.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
      'extraparams': 'a.purchase_return_id:' + record.data.purchase_return_id
        //    'option':'delivered_po'
        // 'wherenotinschedule':'true'
    };
  });
  ViewReturnPOStore.load();

  Ext.getCmp('btnRecordReceiptReturnPo').hide();
  Ext.getCmp('btnUpdateReturnPo').show();

  Ext.getCmp('ViewReturnPO').columns[12].setVisible(false); //hide qty terima
  Ext.getCmp('ViewReturnPO').columns[13].setVisible(false); //hide warehouse terima
}

function paymentTermPO_invoice(idterm) {
  console.log('idterm:' + idterm);
  var pembayaranSalesInvoice_si = Ext.getCmp('pembayaranSalesInvoice_si');
  var sisaBayarSalesInvoice_si = Ext.getCmp('sisaBayarSalesInvoice_si');

  var aftertax = str_replace('.', '', Ext.getCmp('totalSalesInvoice_si').getValue()) * 1;
  var shipcost = str_replace('.', '', Ext.getCmp('angkutSalesInvoice_si').getValue()) * 1;

  // var paymenttermarr = [['1', 'Cash in Advance'], ['2', 'Cash in Delivery'], ['3','NET d days'], ['4','NET EOM d days'],['5','Discount']];

  if (idterm * 1 === 1) {
    pembayaranSalesInvoice_si.setValue(renderNomor(aftertax + shipcost));
    pembayaranSalesInvoice_si.setReadOnly(true);

    sisaBayarSalesInvoice_si.setValue(0);
  } else if (idterm * 1 === 2) {
    pembayaranSalesInvoice_si.setValue(0);
    pembayaranSalesInvoice_si.setReadOnly(true);

    sisaBayarSalesInvoice_si.setValue(renderNomor(aftertax + shipcost));
  } else {
    pembayaranSalesInvoice_si.setValue(0);
    pembayaranSalesInvoice_si.setReadOnly(false);

    sisaBayarSalesInvoice_si.setValue(renderNomor(aftertax + shipcost));
  }
}