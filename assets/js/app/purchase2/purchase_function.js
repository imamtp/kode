function showPurchaseRequestData(record){

    wPurchaseRequisitionGrid.show();

    clearFormPR();

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

    var supplierPurchaseOrder = Ext.getCmp('supplierPurchaseRequisition');
    supplierPurchaseOrder.setValue(record.data.idsupplier);
    supplierPurchaseOrder.setReadOnly(true);

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
                        nameinventory: obj.nameinventory,
                        price: obj.cost,
                        idunit:obj.idunit,
                        qty: obj.qty,
                        disc: obj.disc,
                        total: obj.total,
                        short_desc: obj.short_desc
                    });
                    
                    gridSQ.getStore().insert(0, recSQ);

                    totalitem++;
                    totalqty+=obj.qty;

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

    if(record.data.idpurchase_req===null){
        Ext.getCmp('recordPurchaseRequisitionBtnSave').enable();    
        Ext.getCmp('cbPurchaseRequisition').setValue(record.data.idpurchasestatus);  
        cbPurchaseRequisition.setReadOnly(false);
                  
    } else {
        Ext.getCmp('cbPurchaseRequisition').setValue('3');
        Ext.getCmp('recordPurchaseRequisitionBtnSave').disable();
        cbPurchaseRequisition.setReadOnly(true);
    }
    
    cbPurchaseRequisition.show();
}

function showPurchaseOrderData(record){
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


    var cb_purchase_order_status = Ext.getCmp('cb_purchase_order_status');
    cb_purchase_order_status.getStore().load();
    cb_purchase_order_status.setValue(record.data.idpurchasestatus);
    if(record.data.idpurchasestatus*1!==1){
        //selain dari open disable tombol record
        cb_purchase_order_status.setReadOnly(true);
        Ext.getCmp('btnRecordPurchaseOrder').disable();
    } else {
        cb_purchase_order_status.setReadOnly(false);
        Ext.getCmp('btnRecordPurchaseOrder').enable();
    }
    

    Ext.getCmp('nojurnalPurchaseOrder').setValue(record.data.nopurchase);
    Ext.getCmp('supplierPurchaseOrder').setValue(record.data.idsupplier);
    Ext.getCmp('po_date_PurchaseOrder').setValue(record.data.date);
    Ext.getCmp('cb_tax_id_po').setValue(record.data.rate);
    Ext.getCmp('memoPurchaseOrder').setValue(record.data.memo);
    Ext.getCmp('subtotalPurchaseOrder').setValue(renderNomor(record.data.subtotal));
    Ext.getCmp('totalPajakPurchaseOrder').setValue(renderNomor(record.data.tax));
    Ext.getCmp('totalPurchaseOrder').setValue(renderNomor(record.data.totalamount));

    if(record.data.idpurchase_req!==null){
        Ext.getCmp('rg_is_from_pr_poform').setValue({is_from_pr:1});
        Ext.getCmp('no_purchase_req').setValue(record.data.nopurchase_req);
        Ext.getCmp('purchase_req_date').setValue(record.data.date_req);
    } else {
        Ext.getCmp('rg_is_from_pr_poform').setValue({is_from_pr:2});
    }

    var EntryGoodsReceiptRM = Ext.getCmp('EntryPurchaseOrder').getStore();
    EntryGoodsReceiptRM.removeAll();
    EntryGoodsReceiptRM.sync();

     //insert item to grid
      Ext.Ajax.request({
            url: SITE_URL + 'purchase/get_po_items',
            method: 'GET',
            params: {
                idpurchase: record.data.idpurchase
            },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                
                var gridInsertBaruGRPO = Ext.getCmp('EntryPurchaseOrder');

                Ext.each(d.data, function(obj, i) {
                    // console.log(obj);

                     var recDO = new GridItemPurchaseOrderModel({
                            idpurchaseitem: obj.idpurchaseitem,
                            idinventory: obj.idinventory,
                            sku_no: obj.sku_no,
                            invno: obj.invno,
                            nameinventory: obj.nameinventory,
                            qty: obj.qty,
                            price: obj.price,
                            disc: obj.disc,
                            total: obj.total,
                            ratetax: obj.ratetax,
                            tax: obj.tax,
                            size: obj.size,
                            short_desc: obj.short_desc,
                            size_measurement: obj.size_measurement,
                            warehouse_code: obj.warehouse_code
                    });

                    
                    gridInsertBaruGRPO.getStore().insert(0, recDO);
                });



            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    
    // 'idpurchase_req','nopurchase_req','date_req'
}

function showGoodsReceiptData(record){
    var wWindowEntryGoodsReceipt = Ext.getCmp('WindowEntryGoodsReceipt');
    wWindowEntryGoodsReceipt.show();
    wWindowEntryGoodsReceipt.setTitle('View Goods Receipt');

    Ext.getCmp('statusform_poreceipt').setValue('edit');

    var cb_status_poreceipt = Ext.getCmp('cb_status_poreceipt');
    cb_status_poreceipt.getStore().load();

    Ext.getCmp('supplier_poreceipt').getStore().load();
    Ext.getCmp('cb_tax_id_poreceipt').getStore().load();
    Ext.getCmp('idpurchase_poreceipt').setValue(record.data.idpurchase);
    Ext.getCmp('nojurnal_poreceipt').setValue(record.data.nopurchase);
    Ext.getCmp('po_date_poreceipt').setValue(record.data.date);
    Ext.getCmp('cbUnit_poreceipt').setValue(record.data.idunit);
    Ext.getCmp('cb_tax_id_poreceipt').setValue(record.data.idtax);
    Ext.getCmp('supplier_poreceipt').setValue(record.data.idsupplier);
    Ext.getCmp('received_poreceipt').setValue(record.data.lastname);
    Ext.getCmp('receivedid_poreceipt').setValue(record.data.receivedby_id);
    Ext.getCmp('memo_poreceipt').setValue(record.data.memo);
    Ext.getCmp('notes_poreceipt').setValue(record.data.notes_receipt);
    
    var received_date_poreceipt = Ext.getCmp('received_date_poreceipt');
    received_date_poreceipt.setValue(record.data.delivereddate);

    cb_status_poreceipt.show();
    cb_status_poreceipt.setValue(record.data.idpurchasestatus);

    // console.log(record.data.idpurchasestatus);
    if(record.data.idpurchasestatus*1===1){
        Ext.getCmp('btnRecordGR').enable();
        received_date_poreceipt.setReadOnly(false);

        cb_status_poreceipt.setReadOnly(false);
    } else {
        Ext.getCmp('btnRecordGR').disable();
        received_date_poreceipt.setReadOnly(true);

        cb_status_poreceipt.setReadOnly(true);
    }
    // Ext.getCmp('cb_status_poreceipt').setValue(record.data.idpurchasestatus);

    Ext.getCmp('subtotal_poreceipt').setValue(renderNomor(record.data.subtotal));
    Ext.getCmp('totalPajak_poreceipt').setValue(renderNomor(record.data.tax));
    Ext.getCmp('total_poreceipt').setValue(renderNomor(record.data.totalamount));

    var gridInsertBaruGRPO = Ext.getCmp('EntryGoodsReceipt');
    var EntryGoodsReceiptRM = Ext.getCmp('EntryGoodsReceipt').getStore();

    EntryGoodsReceiptRM.removeAll();
    EntryGoodsReceiptRM.sync();

     //insert item to grid
      Ext.Ajax.request({
            url: SITE_URL + 'purchase/get_po_items',
            method: 'GET',
            params: {
                idpurchase: record.data.idpurchase
            },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                
                

                Ext.each(d.data, function(obj, i) {
                    // console.log(obj);

                     var recDO = new GridReceiptItemPurchaseOrderModel({
                            idpurchaseitem: obj.idpurchaseitem,
                            idinventory: obj.idinventory,
                            sku_no: obj.sku_no,
                            invno: obj.invno,
                            nameinventory: obj.nameinventory,
                            qty: obj.qty,
                            price: obj.price,
                            disc: obj.disc,
                            total: obj.total,
                            ratetax: obj.ratetax,
                            tax: obj.tax,
                            size: obj.size,
                            short_desc: obj.short_desc,
                            size_measurement: obj.size_measurement,
                            warehouse_code: obj.warehouse_code
                    });

                    
                    gridInsertBaruGRPO.getStore().insert(0, recDO);
                });



            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });

}

function loadDataFormPurchaseInvoice(selectedRecord){
            Ext.getCmp('supplier_poinvoice').getStore().load();
            Ext.getCmp('cb_tax_id_poinvoice').getStore().load();


            Ext.getCmp('idpurchase_poinvoice').setValue(selectedRecord.get('idpurchase'));
            Ext.getCmp('nopo_poinvoice').setValue(selectedRecord.get('nopurchase'));
            Ext.getCmp('po_date_poinvoice').setValue(selectedRecord.get('date'));
            Ext.getCmp('cbUnit_poinvoice').setValue(selectedRecord.get('idunit'));
            Ext.getCmp('cb_tax_id_poinvoice').setValue(selectedRecord.get('nametax'));
            Ext.getCmp('supplier_poinvoice').setValue(selectedRecord.get('idsupplier'));
            Ext.getCmp('memo_poinvoice').setValue(selectedRecord.get('memo'));
            // Ext.getCmp('cb_status_poinvoice').setValue(5);

            Ext.getCmp('totalPajak_poinvoice').setValue(renderNomor(selectedRecord.get('tax')));
            Ext.getCmp('total_poinvoice').setValue(renderNomor(selectedRecord.get('totalamount')));
            Ext.getCmp('subtotal_poinvoice').setValue(renderNomor(selectedRecord.get('subtotal')));

             Ext.getCmp('sisaBayar_poinvoice').setValue(renderNomor(selectedRecord.get('totalamount')));

            var EntryPurchaseInvoice = Ext.getCmp('EntryPurchaseInvoice').getStore();
            EntryPurchaseInvoice.removeAll();
            EntryPurchaseInvoice.sync();

             //insert item to grid
              Ext.Ajax.request({
                    url: SITE_URL + 'purchase/get_po_items',
                    method: 'GET',
                    params: {
                        idpurchase: selectedRecord.get('idpurchase')
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        
                        var grid = Ext.getCmp('EntryPurchaseInvoice');

                        Ext.each(d.data, function(obj, i) {
                            // console.log(obj);

                             var recDO = new GridItemPurchaseInvoiceModel({
                                    idpurchaseitem: obj.idpurchaseitem,
                                    idinventory: obj.idinventory,
                                    invno: obj.invno,
                                    nameinventory: obj.nameinventory,
                                    qty: obj.qty,
                                    price: obj.price,
                                    disc: obj.disc,
                                    total: obj.total,
                                    ratetax: obj.ratetax,
                                    tax: obj.tax,
                                    size: obj.size,
                                    short_desc: obj.short_desc,
                                    size_measurement: obj.size_measurement,
                                    warehouse_code: obj.warehouse_code
                            });

                            
                            grid.getStore().insert(0, recDO);
                        });


                        // updateSelisih();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
}

var wCoaPurchasePaymentPopup = Ext.create(dir_sys+'purchase2.wCoaPurchasePaymentPopup');
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
            url: SITE_URL+'purchase/save_payment',
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
                },{
                    xtype: 'hiddenfield',
                    name: 'idpurchase',
                    id: 'idpurchase_paymentPurchase'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'noinvoice_paymentPurchase',
                    fieldLabel: 'No Invoice'
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
                                if (Ext.getCmp('cbUnitEntrySalesReturn').getValue() == null) {
                                    Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                } else {
                                    wCoaPurchasePaymentPopup.show();
                                    storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                        operation.params={
                                                    'idunit': Ext.getCmp('cbUnitEntrySalesReturn').getValue(),
                                                    'idaccounttype': '1,19'
                                        };
                                    });
                                    storeGridAccount.load();
                                }
                            });
                        }
                    }
                }, {
                    xtype: 'hiddenfield',
                    name:'idaccount',
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

                            storeGridPurchaseInvoicePaidGrid.load();
                            storeGridPurchaseInvoiceOverdueGrid.load();
                            storeGridPurchaseInvoiceUnpaidGrid.load();

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

    Ext.getCmp('idpurchase_paymentPurchase').setValue(data.idpurchase);
    Ext.getCmp('noinvoice_paymentPurchase').setValue(data.noinvoice);
    Ext.getCmp('no_purchase_order_paymentPurchase').setValue(data.nopurchase);
    Ext.getCmp('namesupplier_paymentPurchase').setValue(data.namesupplier);
    Ext.getCmp('date_purchase_paymentPurchase').setValue(data.date);
    Ext.getCmp('paidtoday_paymentPurchase').setValue(renderNomor(data.paidtoday));
    Ext.getCmp('balance_Purchase_paymentPurchase').setValue(renderNomor(data.balance));
}

function updateSelisihPurchasePayment(){
     var selisih = str_replace('.', '', Ext.getCmp('balance_Purchase_paymentPurchase').getValue()) * 1 - str_replace('.', '', Ext.getCmp('amount_PurchasePayment').getValue()) * 1
    Ext.getCmp('balance_paymentPurchase').setValue(renderNomor(selisih));
}

function setHeaderPurchaseInvoice(){
    Ext.Ajax.request({
        url: SITE_URL + 'purchase/get_sum_invoice',
        method: 'GET',
        // params: {
        //     idsales: data.idsales
        // },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('sumPurchaseInvUnpaid').update('<center><h2><span style=color:#FF6D00>'+d.totalUnpaid+'</span></h2>');
            Ext.getCmp('sumPurchaseInvPaid').update('<center><h2><span style=color:#64DD17>'+d.totalPaid+'</span></h2>');
            Ext.getCmp('sumPurchaseInvDue').update('<center><h2><span style=color:#d50000>'+d.totalDue+'</span></h2>');
            // storeGridWindowSalesPayment.load();
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function clearFormPO(){
    Ext.getCmp('idpurchase_order').setValue(null);
    Ext.getCmp('idpurchase_req_PurchaseOrder').setValue(null);

    var cb_purchase_order_status = Ext.getCmp('cb_purchase_order_status');
    cb_purchase_order_status.setValue(null);    

    Ext.getCmp('nojurnalPurchaseOrder').setValue(null);
    Ext.getCmp('supplierPurchaseOrder').setValue(null);
    Ext.getCmp('po_date_PurchaseOrder').setValue(null);
    Ext.getCmp('cb_tax_id_po').setValue(null);
    Ext.getCmp('memoPurchaseOrder').setValue(null);
    Ext.getCmp('subtotalPurchaseOrder').setValue(null);
    Ext.getCmp('totalPajakPurchaseOrder').setValue(null);
    Ext.getCmp('totalPurchaseOrder').setValue(null);

    Ext.getCmp('rg_is_from_pr_poform').setValue({is_from_pr:2});

    var EntryGoodsReceiptRM = Ext.getCmp('EntryPurchaseOrder').getStore();
    EntryGoodsReceiptRM.removeAll();
    EntryGoodsReceiptRM.sync();
}

function clearFormPR(){
     var EntryPurchaseRequisition = Ext.getCmp('EntryPurchaseRequisition').getStore();
    EntryPurchaseRequisition.removeAll();
    EntryPurchaseRequisition.sync();

    Ext.getCmp('idpurchase_pr').setValue(null);
    Ext.getCmp('nojurnalPurchaseRequisition').setValue(null);
    Ext.getCmp('tanggalPurchaseRequisition').setValue(null);
    Ext.getCmp('cb_tax_id_pr').setValue(null);
    Ext.getCmp('tglPelunasanPurchaseRequisition').setValue(null);
    Ext.getCmp('cbPurchaseRequisition').setValue(null);
    Ext.getCmp('supplierPurchaseRequisition').setValue(null);
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

function loadReturnPoData(record){
    Ext.getCmp('WindowViewReturnPO').show();

    Ext.getCmp('supplier_viewporeturn').getStore().load();
    Ext.getCmp('cb_tax_id_viewporeturn').getStore().load();

    Ext.getCmp('WindowPOReturnList').hide();
    
    Ext.getCmp('purchase_return_id_viewporeturn').setValue(record.data.purchase_return_id);
    Ext.getCmp('noreturn_viewporeturn').setValue(record.data.noreturn);
    Ext.getCmp('return_date_viewporeturn').setValue(record.data.date_return);
    
    Ext.getCmp('nopo_viewporeturn').setValue(record.data.nopurchase);
    Ext.getCmp('po_date_viewporeturn').setValue(record.data.po_date);
    Ext.getCmp('cbUnit_viewporeturn').setValue(record.data.idunit);
    Ext.getCmp('cb_tax_id_viewporeturn').setValue(record.data.idtax);
    Ext.getCmp('supplier_viewporeturn').setValue(record.data.idsupplier);
    Ext.getCmp('cb_status_viewporeturn').setValue(record.data.return_status*1);

    Ext.getCmp('idaccount_coa_viewretur_po').setValue(record.data.idaccount_return);
    Ext.getCmp('accname_coa_viewretur_po').setValue(record.data.accname);
    Ext.getCmp('accnumber_coa_viewretur_po').setValue(record.data.accnumber);

    Ext.getCmp('totalPajak_viewporeturn').setValue(renderNomor(record.data.tax));
    Ext.getCmp('total_viewporeturn').setValue(renderNomor(record.data.totalamount));
    Ext.getCmp('subtotal_viewporeturn').setValue(renderNomor(record.data.subtotal));

    var ViewReturnPO = Ext.getCmp('ViewReturnPO');
    var ViewReturnPOStore = ViewReturnPO.getStore().load();

    ViewReturnPOStore.on('beforeload',function(store, operation,eOpts){
        operation.params={
               'extraparams': 'a.purchase_return_id:'+record.data.purchase_return_id
            //    'option':'delivered_po'
               // 'wherenotinschedule':'true'
             };
         });
    ViewReturnPOStore.load();
}
