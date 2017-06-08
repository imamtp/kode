// Ext.require([ 
//     dir_sys+'purchase2.GridItemPurchaseOrderPopup'
// ]);

var WindowGridReceivedByPOPopup = Ext.create(dir_sys + 'purchase2.WindowGridReceivedByPOPopup');
var WindowBatchItemList = Ext.create(dir_sys + 'purchase2.WindowBatchItemList');

Ext.define('GridReceiptItemPurchaseOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchaseitem', 'idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'sku_no', 'size', 'warehouse_code', 'size_measurement'],
    idProperty: 'id'
});

var storeGridItemPurchaseOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReceiptItemPurchaseOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemPurchaseOrder/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});

//end store head

// var GridBatchGoodsReceipt = Ext.getCmp('GridBatchGoodsReceipt').getStore();
var gridinsertReceiveBatchPO = Ext.getCmp('GridBatchGoodsReceipt');
var gridinsertReceiveBatchPOStore = gridinsertReceiveBatchPO.getStore();

Ext.define(dir_sys + 'purchase2.EntryGoodsReceipt', {
    extend: 'Ext.grid.Panel',
    id: 'EntryGoodsReceipt',
    alias: 'widget.EntryGoodsReceipt',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            // forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemPurchaseOrder,
            columns: [{
                    text: 'Terima',
                    width: 65,
                    // menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: 'Form Terima Barang',
                    align: 'center',
                    icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                        console.log(selectedRecord)
                        WindowBatchItemList.show();

                        var idpurchase = Ext.getCmp('idpurchase_poreceipt').getValue();
                        var idunit = Ext.getCmp('cbUnit_poreceipt').getValue();

                        Ext.getCmp('idpurchase_batchitemporeceipt').setValue(idpurchase);
                        Ext.getCmp('idpurchaseitem_batchitemporeceipt').setValue(selectedRecord.data.idpurchaseitem);
                        Ext.getCmp('idinventory_batchitemporeceipt').setValue(selectedRecord.data.idinventory);
                        Ext.getCmp('idunit_batchitemporeceipt').setValue(idunit);
                        Ext.getCmp('qty_batchitemporeceipt').setValue(selectedRecord.data.qty);
                        Ext.getCmp('short_desc_batchitemporeceipt').setValue(selectedRecord.data.short_desc);
                        Ext.getCmp('warehouse_code_batchitemporeceipt').setValue(selectedRecord.data.warehouse_code);
                        Ext.getCmp('nameinventory_batchitemporeceipt').setValue(selectedRecord.data.nameinventory);

                        //cek udah bikin batch apa belum, kalo udah, tampilkan

                        // gridinsertReceiveBatchPOStore.removeAll();
                        // gridinsertReceiveBatchPOStore.sync();

                        if (Ext.getCmp('statusform_poreceipt').getValue() === 'input') {
                            var is_temp = 1;
                            Ext.getCmp('numbatch_itempo').setReadOnly(false);
                            Ext.getCmp('buatbatchbtn_itempo').show();
                        } else {
                            if (Ext.getCmp('cb_status_poreceipt').getValue() * 1 === 1) {
                                //kalo statusnya masih open. aktifkan tombol buat batch
                                var is_temp = 1;
                                Ext.getCmp('numbatch_itempo').setReadOnly(false);
                                Ext.getCmp('buatbatchbtn_itempo').show();
                            } else {
                                var is_temp = 0;
                                Ext.getCmp('numbatch_itempo').setReadOnly(true);
                                Ext.getCmp('buatbatchbtn_itempo').hide();
                            }

                        }

                        gridinsertReceiveBatchPOStore.load({
                            params: {
                                idpurchase: idpurchase,
                                idpurchaseitem: selectedRecord.data.idpurchaseitem,
                                idinventory: selectedRecord.data.idinventory,
                                idunit: idunit,
                                is_tmp: is_temp
                            }
                        });

                        Ext.Ajax.request({
                            url: SITE_URL + 'purchase/check_batch_item',
                            method: 'GET',
                            params: {
                                idpurchase: idpurchase,
                                idpurchaseitem: selectedRecord.data.idpurchaseitem,
                                idinventory: selectedRecord.data.idinventory,
                                idunit: idunit,
                                is_temp: is_temp
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                // console.log(d);
                                Ext.getCmp('numbatch_itempo').setValue(d.numbatch);
                                Ext.getCmp('qtytotal_batchitemporeceipt').setValue(d.totalqtyterima);

                                if (d.numbatch === 0) {
                                    //kalo masih kosong enable tombol create batch. (edit form)
                                    Ext.getCmp('numbatch_itempo').setReadOnly(false);
                                    Ext.getCmp('buatbatchbtn_itempo').show();
                                }

                                // Ext.each(d.data, function(obj, i) {
                                //      var recDO = new GridBatchItemPOListModel({
                                //             idpurchaseitem: obj.idpurchaseitem,
                                //             idinventory: obj.idinventory,
                                //             sku_no: obj.sku_no,
                                //             invno: obj.invno,
                                //             nameinventory: obj.nameinventory,
                                //             qty: obj.qty,
                                //             price: obj.price,
                                //             disc: obj.disc,
                                //             total: obj.total,
                                //             ratetax: obj.ratetax,
                                //             tax: obj.tax,
                                //             size: obj.size,
                                //             short_desc: obj.short_desc,
                                //             size_measurement: obj.size_measurement,
                                //             warehouse_code: obj.warehouse_code,
                                //             notes: obj.notes
                                //     });
                                //     gridinsertReceiveBatchPO.getStore().insert(0, recDO);
                                // });
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                        // setValueAcc(selectedRecord,'wCoaPurchaseInvoiceBeliPopup','_coa_beli_pi');
                    }
                },
                {
                    header: 'idpurchaseitem',
                    hidden: true,
                    dataIndex: 'idpurchaseitem',
                },
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'assetaccount',
                    hidden: true,
                    dataIndex: 'assetaccount'
                },
                {
                    header: 'SKU No',
                    dataIndex: 'sku_no',
                    //                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Kode Barang',
                    hidden: true,
                    dataIndex: 'invno',
                    //                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Nama Barang',
                    flex: 1,
                    dataIndex: 'nameinventory',
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Harga',
                    hidden: true,
                    dataIndex: 'price',
                    width: 150,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan',
                    dataIndex: 'short_desc',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Ukuran',
                    hidden: true,
                    width: 70,
                    dataIndex: 'size',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan Ukuran',
                    hidden: true,
                    minWidth: 120,
                    dataIndex: 'size_measurement',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Disc (%)',
                    minWidth: 90,
                    hidden: true,
                    dataIndex: 'disc',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 0
                    // }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    dataIndex: 'total',
                    hidden: true,
                    width: 150,
                    align: 'right'
                },
                {
                    header: 'Pajak',
                    hidden: true,
                    //                    width:50,
                    dataIndex: 'ratetax',
                    // editor: {
                    //     xtype: 'comboxtax',
                    //     hideLabel:true,
                    //     valueField: 'rate',
                    //     labelWidth: 40
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    hidden: true,
                    header: 'Total Qty Terima',
                    minWidth: 120,
                    dataIndex: 'qty_terima',
                    // hidden:true,
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Warehouse',
                    minWidth: 150,
                    hidden: true,
                    dataIndex: 'warehouse_code',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel: true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                },
                {
                    header: 'Catatan',
                    hidden: true,
                    minWidth: 150,
                    dataIndex: 'notes',
                    editor: {
                        xtype: 'textfield',
                        hideLabel: true,
                        labelWidth: 100
                    }
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                    xtype: 'hiddenfield',
                    id: 'idpurchase_poreceipt',
                    name: 'idpurchase'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'statusform_poreceipt',
                    name: 'statusFormPurchaseOrder'
                },

                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'nojurnal_poreceipt',
                            fieldLabel: 'NO PO #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoRef(4, Ext.getCmp('cbUnitEntryGoodsReceipt').getValue(), 'nojurnalPurchaseOrder', 'PO');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            labelWidth: 120,
                            name: 'po_date',
                            id: 'po_date_poreceipt',
                            format: 'd/m/Y',
                            fieldLabel: 'PO Date'
                        },
                        {
                            xtype: 'comboxunit',
                            readOnly: true,
                            valueField: 'idunit',
                            labelWidth: 100,
                            valueField: 'idunit',
                            id: 'cbUnit_poreceipt'
                                //                            ,multiSelect:true
                        },
                        {
                            xtype: 'comboxtaxtype',
                            readOnly: true,
                            labelWidth: 100,
                            name: 'idtax',
                            valueField: 'idtax',
                            id: 'cb_tax_id_poreceipt',
                            listeners: {
                                select: function(combo, record, index) {
                                    // alert(combo.getValue()); // Return Unitad States and no USA
                                    // updateGridPurchaseOrder();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Recom. Supplier',
                            readOnly: true,
                            id: 'suppliername_poreceipt',
                            labelWidth: 120
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'supplier_poreceipt',
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            fieldLabel: 'Received By',
                            name: 'received_name',
                            id: 'received_poreceipt',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        WindowGridReceivedByPOPopup.show();

                                        var GridReceivedByPOPopupID = Ext.getCmp('GridReceivedByPOPopupID').getStore();

                                        GridReceivedByPOPopupID.on('beforeload', function(store, operation, eOpts) {
                                            operation.params = {
                                                'extraparams': 'a.status:' + 1
                                            };
                                        });
                                        GridReceivedByPOPopupID.load();

                                    });
                                }
                            }
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'receivedid',
                            id: 'receivedid_poreceipt',
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 100,
                            name: 'received_date',
                            id: 'received_date_poreceipt',
                            format: 'd/m/Y',
                            fieldLabel: 'Received Date'
                        },
                        {
                            xtype: 'comboxpurchasestatus',
                            hidden: true,
                            // readOnly:true,
                            labelWidth: 100,
                            id: 'cb_status_poreceipt'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Batch Item',
                        hidden: true,
                        // iconCls: 'grid-icon',
                        handler: function() {
                            // var grid = Ext.getCmp('EntryGoodsReceipt');
                            // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            // var data = grid.getSelectionModel().getSelection();
                            // if (data.length == 0) {
                            //     Ext.Msg.alert('Failure', 'Pilih barang terlebih dahulu!');
                            // } else {
                            //     // console.log(selectedRecord.data)
                            //     WindowBatchItemList.show();

                            //     var idpurchase = Ext.getCmp('idpurchase_poreceipt').getValue();
                            //     var idunit = Ext.getCmp('cbUnit_poreceipt').getValue();

                            //     Ext.getCmp('idpurchase_batchitemporeceipt').setValue(idpurchase);
                            //     Ext.getCmp('idpurchaseitem_batchitemporeceipt').setValue(selectedRecord.data.idpurchaseitem);
                            //     Ext.getCmp('idinventory_batchitemporeceipt').setValue(selectedRecord.data.idinventory);
                            //     Ext.getCmp('idunit_batchitemporeceipt').setValue(idunit);                                    
                            //     Ext.getCmp('qty_batchitemporeceipt').setValue(selectedRecord.data.qty);   
                            //     Ext.getCmp('short_desc_batchitemporeceipt').setValue(selectedRecord.data.short_desc);
                            //     Ext.getCmp('warehouse_code_batchitemporeceipt').setValue(selectedRecord.data.warehouse_code);
                            //     Ext.getCmp('nameinventory_batchitemporeceipt').setValue(selectedRecord.data.nameinventory);

                            //     //cek udah bikin batch apa belum, kalo udah, tampilkan

                            //     gridinsertReceiveBatchPOStore.removeAll();
                            //     gridinsertReceiveBatchPOStore.sync();

                            //     Ext.Ajax.request({
                            //     url: SITE_URL + 'purchase/check_batch_item',
                            //         method: 'GET',
                            //         params: {
                            //             idpurchase: idpurchase,
                            //             idpurchaseitem: selectedRecord.data.idpurchaseitem,
                            //             idinventory: selectedRecord.data.idinventory,
                            //             idunit: idunit,
                            //             is_temp:1
                            //         },
                            //         success: function(form, action) {
                            //             var d = Ext.decode(form.responseText);
                            //             // console.log(d);
                            //             Ext.getCmp('numbatch_itempo').setValue(d.numbatch);

                            //                 Ext.each(d.data, function(obj, i) {
                            //                      var recDO = new GridBatchItemPOListModel({
                            //                             idpurchaseitem: obj.idpurchaseitem,
                            //                             idinventory: obj.idinventory,
                            //                             sku_no: obj.sku_no,
                            //                             invno: obj.invno,
                            //                             nameinventory: obj.nameinventory,
                            //                             qty: obj.qty,
                            //                             price: obj.price,
                            //                             disc: obj.disc,
                            //                             total: obj.total,
                            //                             ratetax: obj.ratetax,
                            //                             tax: obj.tax,
                            //                             size: obj.size,
                            //                             short_desc: obj.short_desc,
                            //                             size_measurement: obj.size_measurement,
                            //                             warehouse_code: obj.warehouse_code
                            //                     });
                            //                     gridinsertReceiveBatchPOStore.insert(0, recDO);
                            //                 });
                            //         },
                            //         failure: function(form, action) {
                            //             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            //         }
                            //     });
                            // }
                        }
                    }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            id: 'shipaddress_poreceipt',
                            hidden: true,
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {}
                            }
                        }, ,
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'total_poreceipt',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }

                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 100,
                            id: 'notes_poreceipt',
                            fieldLabel: 'Catatan'
                        },
                        // {
                        //     xtype: 'comboxshipping',
                        //     hidden:true,
                        //     labelWidth: 120,
                        //     id: 'shipping_poreceipt'
                        // }, 
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            name: 'totalPajak',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajak_poreceipt',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                        //                         {
                        //                             xtype: 'textfield',
                        //                             id: 'angkutPurchaseOrder',
                        //                             align: 'right',
                        // //                            readOnly: true,
                        //                             labelWidth: 120,
                        //                             fieldLabel: 'Biaya Angkut',
                        //                             fieldStyle: 'text-align: right;',
                        //                             listeners: {
                        //                                 'render': function(c) {
                        //                                     c.getEl().on('keyup', function() {
                        //                                         updateGridPurchaseOrder('general');
                        //                                     }, c);
                        //                                 }
                        //                             }
                        //                         }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            width: 620,
                            // readOnly:true,
                            labelWidth: 100,
                            id: 'memo_poreceipt',
                            fieldLabel: 'Memo'
                        },
                        {
                            xtype: 'comboxcurrency',
                            hidden: true,
                            id: 'comboxcurrency_poreceipt',
                            labelWidth: 120
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotal_poreceipt',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                        {
                            xtype: 'textfield',
                            id: 'pembayaran_poreceipt',
                            align: 'right',
                            hidden: true,
                            //                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPurchaseOrder('general');
                                    }, c);
                                }
                            }
                        }


                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntryGoodsReceipt();
                    }
                }
            }
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                // updateGridPurchaseOrder('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPurchaseOrder: function(button, event, mode) {

    },
    saveRecurr: function() {
        if (validasiPurchaseOrder()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {


        //        this.getStore().load({
        //            // store loading is asynchronous, use a load listener or callback to handle results
        //            callback: this.onStoreLoad
        //        });
    },
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddClick: function() {
        //        console.log(Ext.getCmp('supplierPurchaseOrder').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        // wItemPurchaseOrderPopup.show();
        // storeGridItemSalesPopupOrder.load();

        //        var rec = new JournalStore({
        //            idaccount: null,
        //            accname: null,
        //            accnumber: null,
        //            debit: null,
        //            credit: null
        //        });
        //
        //        this.getStore().insert(0, rec);
        //        this.cellEditing.startEditByPosition({
        //            row: 0,
        //            column: 0
        //        });
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        // updateGridPurchaseOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridPurchaseOrder(tipe) {
    console.log('update run');
    var addprefix = '_poreceipt';

    var subtotalPurchaseOrder = 0 * 1;
    var totalPurchaseOrder = 0 * 1;
    var totalPajak = 0 * 1;
    // var angkutPurchaseOrder = Ext.getCmp('angkutPurchaseOrder').getValue();
    var angkutPurchaseOrder = 0;
    var pembayaranPurchaseOrder = Ext.getCmp('pembayaranPurchaseOrder').getValue();
    var sisaBayarPurchaseOrder = 0 * 1;
    var taxrate = Ext.getCmp('cb_tax_id_po').getValue();

    Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price * obj.data.size);
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        console.log(total + ' - ' + diskon);

        subtotalPurchaseOrder += net;
        totalPajak += (net / 100) * (taxrate * 1);
        obj.set('ratetax', taxrate);
        obj.set('total', net);
    });

    //     console.log(subtotalPurchaseOrder);
    totalPurchaseOrder = subtotalPurchaseOrder + angkutPurchaseOrder * 1;
    //     console.log(totalPurchaseOrder+' '+totalPajak);
    totalPurchaseOrder = totalPurchaseOrder + totalPajak;
    //     console.log(totalPurchaseOrder);
    sisaBayarPurchaseOrder = totalPurchaseOrder - pembayaranPurchaseOrder;
    // alert(totalPajak);
    Ext.getCmp('subtotal' + addprefix).setValue(subtotalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('total' + addprefix).setValue(totalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', { minimumFractionDigits: 2 }));
    // Ext.getCmp('angkutPurchaseOrder').setValue(angkutPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaran').setValue(pembayaranPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarPurchaseOrder').setValue(sisaBayarPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiPurchaseOrder() {
    //    alert(Ext.getCmp('comboxcurrencyPurchaseOrder').getValue());   

    if (Ext.getCmp('receivedid_poreceipt').getValue() == '') {
        Ext.Msg.alert('Failed', 'Personil penerima belum ditentukan');

    } else if (Ext.getCmp('received_date_poreceipt').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan tanggal penerimaan barang');
    } else {
        return true;
    }
}