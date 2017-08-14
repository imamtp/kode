// var WindowEntryGoodsReceipt = Ext.create(dir_sys + 'purchase2.WindowEntryGoodsReceipt');

Ext.define('GridBatchItemPOListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'purchase_batch_id', 'idpurchaseitem', 'idinventory', 'idunit', 'sku_no', 'invno', 'nameinventory', 'qty', 'price', 'disc', 'total', 'ratetax', 'tax', 'size', 'short_desc', 'size_measurement', 'warehouse_code', 'notes', 'deleted'
    ],
    idProperty: 'id'
});

var storeGridBatchItemPOList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBatchItemPOListModel',
    //remoteSort: true,

    // autoload:true,
    proxy: {
        type: 'ajax',
        // url: SITE_URL + 'purchase/check_batch_item',
        url: SITE_URL + 'purchase/get_batch_items',
        actionMethods: 'GET',
        method: 'GET',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'code',
        direction: 'ASC'
    }]
});


// storeGridBatchItemPOList.on('beforeload',function(store, operation,eOpts){
//    operation.params={
//                // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
//                'option':'notyetdelivered'
//                // 'wherenotinschedule':'true'
//              };
//          });

Ext.define('MY.searchGridBatchItemPOList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBatchItemPOList',
    store: storeGridBatchItemPOList,
    width: 180
});
// var smGridBatchItemPOList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridBatchItemPOList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterSupplierData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSupplierData').enable();
//         }
//     }
// });

Ext.define(dir_sys + 'purchase2.GridBatchGoodsReceipt', {
    extend: 'Ext.grid.Panel',
    id: 'GridBatchGoodsReceipt',
    alias: 'widget.GridBatchGoodsReceipt',
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
            store: storeGridBatchItemPOList,
            columns: [{
                    header: 'purchase_batch_id',
                    hidden: true,
                    dataIndex: 'purchase_batch_id',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idpurchaseitem',
                    hidden: true,
                    dataIndex: 'idpurchaseitem',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: idunit,
                },
                {
                    header: 'idpurchase',
                    hidden: true,
                    dataIndex: 'idpurchase',
                    //                    id: 'idinventory'
                },
                // {
                //     header: 'price',
                //     hidden: true,
                //     dataIndex: 'price',
                // },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'SKU No',
                    dataIndex: 'sku_no',
                    //                    id: 'invno',
                    width: 150
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    },
                    width: 150
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    flex: 1,
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1,
                        listeners: {
                            change: function(dis, newVal, oldVal) {
                                var total = Ext.getCmp('qtytotal_batchitemporeceipt').getValue();
                                Ext.getCmp('qtytotal_batchitemporeceipt').setValue(total - oldVal + newVal);
                            }
                        }
                    }
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
                    hidden: true,
                    header: 'Qty #2',
                    width: 70,
                    dataIndex: 'stock_kedua',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan #2',
                    hidden: true,
                    dataIndex: 'satuan_kedua',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                {
                    header: 'Warehouse',
                    minWidth: 150,
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
                    header: 'Kd brg supplier',
                    minWidth: 150,
                    dataIndex: 'notes',
                    editor: {
                        xtype: 'textfield',
                        hideLabel: true,
                        labelWidth: 100
                    }
                },
                {
                    header: 'deleted',
                    dataIndex: 'deleted',
                    hidden: true,
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                    xtype: 'hiddenfield',
                    id: 'idpurchase_batchitemporeceipt',
                    name: 'idpurchase'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'idpurchaseitem_batchitemporeceipt',
                    name: 'idpurchaseitem'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'idinventory_parentitemporeceipt',
                    name: 'idinventory'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'idunit_batchitemporeceipt',
                    name: 'idunit'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'sku_no_batchitemporeceipt',
                    name: 'sku_no'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'price_no_batchitemporeceipt',
                    name: 'price_no'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'short_desc_batchitemporeceipt'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'warehouse_code_batchitemporeceipt'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'nameinventory_batchitemporeceipt'
                },

                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            readOnly: true,
                            labelWidth: 130,
                            width: 200,
                            fieldLabel: 'Jumlah Qty',
                            id: 'qty_batchitemporeceipt',
                            name: 'qty'
                        }, {
                            xtype: 'textfield',
                            readOnly: true,
                            labelWidth: 130,
                            width: 200,
                            fieldLabel: 'Total Qty Terima',
                            id: 'qtytotal_batchitemporeceipt',
                            name: 'qtytotal'
                        }, '-', {
                            xtype: 'numericfield',
                            width: 190,
                            id: 'numbatch_batchitemporeceipt',
                            fieldLabel: 'Jumlah Batch'
                        },
                        {
                            text: 'Buat Batch',
                            id: 'buatbatchbtn_itempo',
                            handler: function() {
                                //bersihkan batch yg ada dengan cara memberi flag deleted = 1
                                var batchstore = Ext.getCmp('GridBatchGoodsReceipt').getStore();
                                var win = Ext.getCmp('WindowBatchItemList');
                                batchstore.clearFilter();
                                Ext.each(batchstore.data.items, function(obj, i) { obj.data.deleted = 1 });

                                //filter store kembali dg flag deleted != 1 
                                batchstore.filter([function(item) { return item.get('deleted') != "1" }]);

                                //genereate ulang batch
                                numbatch = Ext.getCmp('numbatch_batchitemporeceipt').getValue() * 1;
                                for (i = 0; i < numbatch; i++) {
                                    var recBatch = new GridBatchItemPOListModel({
                                        'purchase_batch_id': null,
                                        'idpurchaseitem': win.selectedItem.data.idpurchaseitem,
                                        'idinventory': win.selectedItem.data.idinventory,
                                        'idunit': win.selectedItem.data.idunit,
                                        'sku_no': win.selectedItem.data.sku_no,
                                        'invno': '-' + (i + 1),
                                        'nameinventory': win.selectedItem.data.nameinventory,
                                        'qty': win.selectedItem.data.qty * 1 / numbatch,
                                        'price': win.selectedItem.data.price, //Ext.getCmp('idpurchaseitem_batchitemporeceipt').getValue(),
                                        'short_desc': win.selectedItem.data.short_desc, //Ext.getCmp('short_desc_batchitemporeceipt').getValue(),
                                        'size': win.selectedItem.data.size, //Ext.getCmp('idpurchaseitem_batchitemporeceipt').getValue(),
                                        'size_measurement': win.selectedItem.data.size_measurement, //Ext.getCmp('idpurchaseitem_batchitemporeceipt').getValue(),
                                        'deleted': 0,
                                    });
                                    batchstore.insert(i, recBatch);
                                }
                                updateGRBatch();

                                // var GridBatchGoodsReceipt = Ext.getCmp('GridBatchGoodsReceipt').getStore();
                                // GridBatchGoodsReceipt.removeAll();
                                // GridBatchGoodsReceipt.sync();

                                // Ext.Ajax.request({
                                //     url: SITE_URL + 'purchase/create_batch',
                                //     method: 'POST',
                                //     params: {
                                //         idpurchase: Ext.getCmp('idpurchase_batchitemporeceipt').getValue(),
                                //         idpurchaseitem: Ext.getCmp('idpurchaseitem_batchitemporeceipt').getValue(),
                                //         idinventory: Ext.getCmp('idinventory_parentitemporeceipt').getValue(),
                                //         idunit: Ext.getCmp('idunit_batchitemporeceipt').getValue(),
                                //         numbatch: Ext.getCmp('numbatch_batchitemporeceipt').getValue(),
                                //         totalqty: Ext.getCmp('qty_batchitemporeceipt').getValue(),
                                //         satuan: Ext.getCmp('short_desc_batchitemporeceipt').getValue(),
                                //         warehouse_code: Ext.getCmp('warehouse_code_batchitemporeceipt').getValue(),
                                //         nameinventory: Ext.getCmp('nameinventory_batchitemporeceipt').getValue(),
                                //         is_temp: 1
                                //     },
                                //     success: function(form, action) {
                                //         var d = Ext.decode(form.responseText);
                                //         console.log(d);

                                //         Ext.getCmp('qtytotal_batchitemporeceipt').setValue(d.qtytotal);
                                //         // storeGridBatchItemPOList.on('beforeload',function(store, operation,eOpts){
                                //         //    operation.params={
                                //         //                 idpurchase: Ext.getCmp('idpurchase_batchitemporeceipt').getValue(),
                                //         //                 idpurchaseitem: Ext.getCmp('idpurchaseitem_batchitemporeceipt').getValue(),
                                //         //                 idinventory: Ext.getCmp('idinventory_parentitemporeceipt').getValue(),
                                //         //                 idunit: Ext.getCmp('idunit_batchitemporeceipt').getValue(),
                                //         //                 is_tmp:1
                                //         //              };
                                //         //          });
                                //         storeGridBatchItemPOList.load({
                                //             params: {
                                //                 idpurchase: Ext.getCmp('idpurchase_batchitemporeceipt').getValue(),
                                //                 idpurchaseitem: Ext.getCmp('idpurchaseitem_batchitemporeceipt').getValue(),
                                //                 idinventory: Ext.getCmp('idinventory_parentitemporeceipt').getValue(),
                                //                 idunit: Ext.getCmp('idunit_batchitemporeceipt').getValue(),
                                //                 is_tmp: 1
                                //             }
                                //         });
                                //     },
                                //     failure: function(form, action) {
                                //         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                //     }
                                // });
                            }
                        },
                        '->',
                        {
                            text: 'Tutup',
                            handler: function() {
                                Ext.getCmp('WindowBatchItemList').hide();
                            }
                        },
                        {
                            text: 'Simpan',
                            id: 'btnSimpanGRBatchWindow',
                            handler: function() {
                                var winEntryGR = Ext.getCmp('WindowEntryGoodsReceipt');
                                var purchaseitemstore = Ext.getCmp('EntryGoodsReceipt').getStore();
                                var winBatch = Ext.getCmp('WindowBatchItemList');
                                var batchstore = Ext.getCmp('GridBatchGoodsReceipt').getStore();
                                //update winEntryGR.itembatch
                                batchstore.clearFilter();
                                Ext.each(batchstore.data.items, function(obj, i) {
                                    winEntryGR.itembatch[winBatch.selectedItemIndex][i] = obj.data;
                                });
                                batchstore.filter([function(item) { return item.get('deleted') != "1" }]);

                                //update qty_receive
                                purchaseitemstore.getRange().find(function(item) {
                                    if (item.data.idpurchaseitem == winBatch.selectedItem.data.idpurchaseitem) {
                                        item.data.qty_receipt = Ext.getCmp('qtytotal_batchitemporeceipt').getValue();
                                        return false;
                                    }
                                });
                                Ext.getCmp('EntryGoodsReceipt').getView().refresh();

                                Ext.getCmp('WindowBatchItemList').hide();
                                // batchstore.clearFilter();

                                // batchstore.filter([function(item) { return item.get('deleted') != "1" }]);

                                // batchstore.removeAll();

                                // var json = Ext.encode(Ext.pluck(storeGridBatchItemPOList.data.items, 'data'));

                                // Ext.Ajax.request({
                                //     // url: SITE_URL + 'purchase/check_batch',
                                //     url: SITE_URL + 'purchase/save_batch',
                                //     method: 'POST',
                                //     params: {
                                //         idpurchase: Ext.getCmp('idpurchase_batchitemporeceipt').getValue(),
                                //         idunit: Ext.getCmp('idunit_batchitemporeceipt').getValue(),
                                //         totalqty: Ext.getCmp('qty_batchitemporeceipt').getValue(),
                                //         datagrid: json
                                //     },
                                //     success: function(form, action) {
                                //         var d = Ext.decode(form.responseText);
                                //         if (d.success) {
                                //             //update qty_received on grid
                                //             Ext.getCmp('EntryGoodsReceipt').getStore().filter(function(item) { return item.get('idpurchaseitem') == Ext.getCmp('idpurchaseitem_batchitemporeceipt').getValue() });
                                //             Ext.getCmp('EntryGoodsReceipt').getStore().getRange()[0].data.qty_received = d.totalqtyterima;
                                //             console.log(Ext.getCmp('EntryGoodsReceipt').getStore().getRange()[0]);
                                //             Ext.getCmp('EntryGoodsReceipt').getStore().clearFilter();
                                //             Ext.getCmp('WindowBatchItemList').hide();
                                //         } else {
                                //             Ext.getCmp('qtytotal_batchitemporeceipt').setValue(d.totalqtyterima);
                                //             Ext.Msg.alert('Failed', d.message);
                                //         }
                                //     },
                                //     failure: function(form, action) {
                                //         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                //     }
                                // });
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
                        // disableGridBatchGoodsReceipt();
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
                if (Ext.getCmp('statusform_poreceipt').getValue() === 'input') {
                    // updateGRBatch()
                }

                if (Ext.getCmp('statusform_poreceipt').getValue() === 'edit') {
                    if (Ext.getCmp('numbatch_batchitemporeceipt').getValue() * 1 === 0) {
                        //kalo batchnya masih kosong boleh edit
                        // updateGRBatch()
                    }

                    if (Ext.getCmp('cb_status_poreceipt').getValue() * 1 === 1) {
                        //kalo statusnya masih open boleh edit
                        // updateGRBatch()
                    }
                }

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
    loadStore: function() {},
    onStoreLoad: function() {},
    onAddClick: function() {},
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        // updateGridPurchaseOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});



Ext.define(dir_sys + 'purchase2.WindowBatchItemList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowBatchItemList',
    id: 'WindowBatchItemList',
    title: 'Penerimaan Barang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: false,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW - 200,
    height: sizeH - 200,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridBatchGoodsReceipt'
    }],
    listeners: {
        show: function(win) {
            //clear grid
            storeGridBatchItemPOList.clearFilter();
            Ext.each(storeGridBatchItemPOList.getRange(), function(obj, i) {
                storeGridBatchItemPOList.removeAt(0);
            });

            Ext.getCmp('qty_batchitemporeceipt').setValue(win.selectedItem.data.qty);
            Ext.each(win.itembatch, function(obj, i) {
                var record = new GridBatchItemPOListModel(obj);
                Ext.getCmp('GridBatchGoodsReceipt').getStore().insert(i, record);
            });
            storeGridBatchItemPOList.filter([function(item) { return item.get('deleted') != "1" }]);
            updateGRBatch();
            // this.el.setStyle('top', '');
        },
        'close': function(win) {
            console.info('bye');
        },
        'hide': function(win) {
            console.info('just hidden');
        }
    }
});

function updateGRBatch() {
    console.log('updateGRBatch');
    var total_qty_rec = 0;
    Ext.each(Ext.getCmp('GridBatchGoodsReceipt').getStore().data.items, function(obj, i) {
        total_qty_rec += (obj.data.qty * 1);
    });
    Ext.getCmp('qtytotal_batchitemporeceipt').setValue(total_qty_rec);
    Ext.getCmp('numbatch_batchitemporeceipt').setValue(storeGridBatchItemPOList.getRange().length);
}