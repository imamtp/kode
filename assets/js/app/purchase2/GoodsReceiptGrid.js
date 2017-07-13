// Ext.require([ 
//     dir_sys+'purchase2.EntryGoodsReceipt',
// ]);

var WindowReceiptPOList = Ext.create(dir_sys + 'purchase2.WindowReceiptPOList');
var WindowEntryPurchaseInvoice = Ext.create(dir_sys + 'purchase2.WindowEntryPurchaseInvoice');

Ext.define('GoodsReceiptGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idpurchase', 'idshipping', 'idpurchasetype', 'idpurchasestatus', 'idtax', 'idpayment', 'date', 'requestdate', 'tax', 'totalamount', 'memo', 'datein', 'idunit', 'idcurrency', 'subtotal', 'nopurchase', 'idsupplier', 'nametax', 'rate', 'namesupplier', 'disc', 'notes_receipt', 'receivedby_id', 'delivereddate', 'firstname', 'lastname', 'noinvoice', 'totalorder', 'totalreceived', 'sisa', 'idpurchasestatusname', 'no_rujukan_sup'
    ],
    idProperty: 'id'
});
var storeGoodsReceiptGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GoodsReceiptGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseOrder/purchase',
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

storeGoodsReceiptGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.idunit:' + Ext.getCmp('idunit_grdgr').getValue() + ', ' +
            'a.idpurchasestatus:' + Ext.getCmp('idpurchasestatus_grdgr').getValue(),
        'option': 'delivered_po',
        // 'wherenotinschedule':'true'
        'startdate': Ext.getCmp('startdate_grdgr').getValue(),
        'enddate': Ext.getCmp('enddate_grdgr').getValue(),
    };
});

// var wGoodsReceiptGrid = Ext.create('widget.window', {
//     id: 'windowPopupGoodsReceiptGrid',
//     title: 'Goods Receipt Form',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     autoHeight: true,
//     layout: 'fit',
//     border: false,
//     items: [
//         EntryGoodsReceipt
//         // {
//         //     xtype:'EntryGoodsReceipt'
//         // }
//     ],
//     modal: true,
//     listeners: {
//         'show': function(){
//             // storeGoodsReceiptGrid.load();
//         }
//     }
// });


Ext.define('MY.searchGoodsReceiptGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGoodsReceiptGrid',
    store: storeGoodsReceiptGrid,
    width: 180
});
var smGoodsReceiptGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGoodsReceiptGrid.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('createInvoicePOGrid').disable();
            }
        },
        select: function(model, record, index) {
            if (record.data.noinvoice === null) {
                Ext.getCmp('createInvoicePOGrid').enable();
            } else {
                Ext.getCmp('createInvoicePOGrid').disable();
            }
            //
        }
    }
});

Ext.define(dir_sys + 'purchase2.GoodsReceiptGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GoodsReceiptGrid',
    // Ext.define('GoodsReceiptGrid', {
    title: 'Purchase Order',
    selModel: smGoodsReceiptGrid,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GoodsReceiptGridID',
    id: 'GoodsReceiptGridID',
    store: storeGoodsReceiptGrid,
    loadMask: true,
    columns: [{
        dataIndex: 'idpurchase',
        hidden: true,
        header: 'idpurchase'
    }, {
        dataIndex: 'idunit',
        hidden: true,
        header: 'idunit'
    }, {
        dataIndex: 'comments',
        hidden: true,
        header: 'comments'
    }, {
        header: 'No Purchase',
        dataIndex: 'nopurchase',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'idpurchasestatusname',
        minWidth: 150,
        // renderer: function(value) {
        //     return customColumnStatus(ArrSalesStatus,value);
        // }
    }, {
        header: 'No Invoice',
        dataIndex: 'noinvoice',
        minWidth: 150
    }, {
        header: 'No Rujukan Sup',
        dataIndex: 'no_rujukan_sup',
        minWidth: 150
    }, {
        header: 'Supplier Name',
        flex: 1,
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Date Requisition',
        dataIndex: 'date',
        minWidth: 150
    }, {
        header: 'Received Date',
        dataIndex: 'delivereddate',
        minWidth: 150
    }, {
        header: 'Received By',
        dataIndex: 'firstname',
        minWidth: 150
    }, {
        header: 'Total Item',
        hidden: true,
        dataIndex: 'totalitem',
        minWidth: 80,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Subtotal',
        dataIndex: 'subtotal',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Shipping Cost',
        dataIndex: 'freight',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Tax',
        dataIndex: 'tax',
        minWidth: 150,
        hidden: true,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Discount',
        dataIndex: 'disc',
        minWidth: 150,
        hidden: true,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Amount',
        dataIndex: 'totalamount',
        hidden: true,
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Qty Order',
        dataIndex: 'totalorder',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Qty Received',
        dataIndex: 'totalreceived',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Qty Difference',
        dataIndex: 'sisa',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    id: 'startdate_grdgr',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Date Order',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdgr',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                        // fieldLabel: 'Date Order',
                },
                {
                    xtype: 'comboxpurchasestatus',
                    id: 'idpurchasestatus_grdgr',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    id: 'idunit_grdgr',
                },
                // {
                //     xtype:'comboxCustomer'
                // },
                // {
                //     xtype:'comboxpayment'
                // },
                {
                    text: 'Search',
                    handler: function() {
                        storeGoodsReceiptGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdgr').setValue();
                        Ext.getCmp('enddate_grdgr').setValue();
                        Ext.getCmp('idunit_grdgr').setValue();
                        Ext.getCmp('idpurchasestatus_grdgr').setValue();
                        storeGoodsReceiptGrid.load();
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addGoodsReceiptGrid',
                text: 'Create New Goods Receipt',
                iconCls: 'add-icon',
                handler: function() {
                    // WindowReceiptPOList.show();
                    if (!Ext.isDefined(Ext.getCmp('WindowReceiptPOList'))) {
                        Ext.create(dir_sys + 'purchase2.WindowReceiptPOList');
                    }
                    Ext.getCmp('WindowReceiptPOList').show();

                    Ext.getCmp('GridPurchaseOrderList').getStore().load();
                    Ext.getCmp('WindowEntryGoodsReceipt').setTitle('Entry Goods Receipt');

                    var TabGoodsReceipt = Ext.getCmp('TabPurchaseReturn');
                    TabGoodsReceipt.items.getAt(0).setDisabled(false); //tab purchase order
                    TabGoodsReceipt.items.getAt(1).setDisabled(true); //tab return purcahse
                    TabGoodsReceipt.setActiveTab(0);

                }
            }, {
                text: 'Print',
                iconCls: 'print-icon',
                handler: function() {
                    // var grid = Ext.ComponentQuery.query('PurchaseRequisitionGridID')[0];
                    var grid = Ext.getCmp('GoodsReceiptGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {

                        Ext.create('Ext.window.Window', {
                            title: 'Preview Goods Receipt',
                            modal: true,
                            width: panelW - 100,
                            height: panelH - 200,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'purchase/print_gr/' + selectedRecord.data.idpurchase + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'purchase/print_gr/' + selectedRecord.data.idpurchase + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            }, {
                id: 'createInvoicePOGrid',
                disabled: true,
                text: 'Create Invoice',
                iconCls: 'edit-icon',
                handler: function() {
                    // var grid = Ext.ComponentQuery.query('GoodsReceiptGridID')[0];
                    var grid = Ext.getCmp('GoodsReceiptGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {

                        if (selectedRecord.data.noinvoice !== null) {
                            Ext.Msg.alert('Failure', 'Invoice untuk data Delivery Order terpilih sudah terbentuk. Silahkan pilih data Delivery Order yang lain');
                        } else {
                            WindowEntryPurchaseInvoice.show();

                            var EntryPurchaseInvoice = Ext.getCmp('EntryPurchaseInvoice').getStore();
                            EntryPurchaseInvoice.removeAll();
                            EntryPurchaseInvoice.sync();

                            Ext.getCmp('angkut_poinvoice').setValue(0);
                            Ext.getCmp('pembayaran_poinvoice').setValue(0);


                            loadDataFormPurchaseInvoice(selectedRecord);





                            // Ext.getCmp('btnRecordSalesOrderInvoice').show();

                            // Ext.getCmp('WindowEntryPurchaseInvoice').setTitle('Create Purchase Invoice');
                        }
                    }
                }
            }, {
                itemId: 'editGoodsReceiptGrid',
                hidden: true,
                text: 'Edit',
                iconCls: 'edit-icon',
                handler: function() {
                    supplierTypeStore.load();

                    var grid = Ext.ComponentQuery.query('GoodsReceiptGrid')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                    } else {
                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                        var formGoodsReceiptGrid = Ext.getCmp('formGoodsReceiptGrid');
                        formGoodsReceiptGrid.getForm().load({
                            url: SITE_URL + 'backend/loadFormData/GoodsReceiptGrid/1',
                            params: {
                                extraparams: 'a.idsupplier:' + selectedRecord.data.idsupplier
                            },
                            success: function(form, action) {
                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                            }
                        })
                        wGoodsReceiptGrid.show();
                        Ext.getCmp('statusformGoodsReceiptGrid').setValue('edit');
                        Ext.getCmp('TabSupplier').setActiveTab(0);
                    }
                }
            }, {
                id: 'btnDeleteGoodsReceiptGrid',
                text: 'Delete',
                hidden: true,
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GoodsReceiptGrid')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/GoodsReceiptGrid',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected),
                                        idmenu: 24
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            storeGoodsReceiptGrid.load();
                                        }
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });

                            }
                        }
                    });
                },
                //                    disabled: true
            }, '->', 'Searching: ', ' ', {
                xtype: 'searchGoodsReceiptGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGoodsReceiptGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGoodsReceiptGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showGoodsReceiptData(record);
            // var formAgama = Ext.create('formAgama');
            // var formGoodsReceiptGrid = Ext.getCmp('formGoodsReceiptGrid');
            // wGoodsReceiptGrid.show();
            // formGoodsReceiptGrid.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/GoodsReceiptGrid/1',
            //     params: {
            //         extraparams: 'a.idsupplier:' + record.data.idsupplier
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })
            // //            
            // //            Ext.getCmp('kddaerahS').setReadOnly(true);
            // Ext.getCmp('statusformGoodsReceiptGrid').setValue('edit');

            // Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});