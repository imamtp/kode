// Ext.require([ 
//     dir_sys+'purchase2.EntryGoodsReceipt',
// ]);
var WindowPOReturnList = Ext.create(dir_sys + 'purchase2.WindowPOReturnList');
// var WindowViewReturnPO = Ext.create(dir_sys+'purchase2.WindowViewReturnPO');

Ext.define('PurchaseReturnGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'purchase_return_id', 'noreturn', 'idpurchase', 'idaccount_return', 'accname', 'accnumber', 'idtax', 'idunit', 'idsupplier', 'idjournal', 'userin', 'datein', 'return_status', 'date_return', 'nopurchase', 'po_date', 'namesupplier', 'return_amount', 'num_retur_items', 'sum_amount_items'
    ],
    idProperty: 'id'
});
var storePurchaseReturnGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PurchaseReturnGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseReturn/purchase',
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

storePurchaseReturnGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.idunit:' + Ext.getCmp('idunit_grdrtn').getValue() + ', ' +
            'a.return_status:' + Ext.getCmp('returnstatus_grdrtn').getValue(),
        'option': 'delivered_po',
        // 'wherenotinschedule':'true'
        'startdate': Ext.getCmp('startdate_grdrtn').getValue(),
        'enddate': Ext.getCmp('enddate_grdrtn').getValue(),
    };
});

// var wPurchaseReturnGrid = Ext.create('widget.window', {
//     id: 'windowPopupPurchaseReturnGrid',
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
//             // storePurchaseReturnGrid.load();
//         }
//     }
// });


Ext.define('MY.searchPurchaseReturnGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPurchaseReturnGrid',
    store: storePurchaseReturnGrid,
    width: 180
});
var smPurchaseReturnGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGriddeliveryOrderGrid.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('createInvoicePOGrid').disable();
            }
        },
        select: function(model, record, index) {
            // if(record.data.noinvoice===null) {
            //      Ext.getCmp('createInvoicePOGrid').enable();
            // } else {
            //     Ext.getCmp('createInvoicePOGrid').disable();
            // }
            //
        }
    }
});

Ext.define(dir_sys + 'purchase2.PurchaseReturnGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.PurchaseReturnGrid',
    // Ext.define('PurchaseReturnGrid', {
    title: 'Purchase Return',
    // selModel:smPurchaseReturnGrid,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'PurchaseReturnGridID',
    id: 'PurchaseReturnGridID',
    store: storePurchaseReturnGrid,
    loadMask: true,
    columns: [{
            dataIndex: 'purchase_return_id',
            hidden: true,
            header: 'purchase_return_id'
        }, {
            dataIndex: 'idunit',
            hidden: true,
            header: 'idunit'
        }, {
            dataIndex: 'idjournal',
            hidden: true,
            header: 'idjournal'
        }, {
            header: 'No Return',
            dataIndex: 'noreturn',
            minWidth: 150
        }, {
            header: 'No Purchase',
            dataIndex: 'nopurchase',
            minWidth: 150
        },
        {
            header: 'Supplier Name',
            flex: 1,
            dataIndex: 'namesupplier',
            minWidth: 150
        }, {
            header: 'Date In',
            dataIndex: 'datein',
            minWidth: 150
        }, {
            header: 'Total Item',
            dataIndex: 'num_retur_items',
            minWidth: 80,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Total Amount',
            dataIndex: 'sum_amount_items',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Status',
            dataIndex: 'return_status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(ArrPOReturnStatus, value);
            }
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    id: 'startdate_grdrtn',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Date Return',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdrtn',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                        // fieldLabel: 'Date Order',
                },
                {
                    xtype: 'comboxPOReturnStatus',
                    id: 'returnstatus_grdrtn',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    id: 'idunit_grdrtn',
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
                        storePurchaseReturnGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdrtn').setValue();
                        Ext.getCmp('enddate_grdrtn').setValue();
                        Ext.getCmp('returnstatus_grdrtn').setValue();
                        storePurchaseReturnGrid.load();
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    itemId: 'addPurchaseReturnGrid',
                    text: 'Create New Purchase Return',
                    iconCls: 'add-icon',
                    handler: function() {
                        WindowPOReturnList.show();

                        Ext.getCmp('GridReturnPurchaseOrderList').getStore().load();
                    }
                },
                {
                    text: 'Print',
                    hidden: true,
                    iconCls: 'print-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('PurchaseReturnGrid')[0];
                        // var grid = Ext.getCmp('EntryReturnPO');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {

                            Ext.create('Ext.window.Window', {
                                title: 'Preview Invoice',
                                modal: true,
                                width: panelW - 100,
                                height: panelH - 200,
                                items: [{
                                    xtype: 'component',
                                    html: '<iframe src="' + SITE_URL + 'purchase/print_return/' + selectedRecord.data.purchase_return_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                    text: 'Print',
                                    iconCls: 'print-icon',
                                    handler: function() {
                                        window.open(SITE_URL + 'purchase/print_return/' + selectedRecord.data.purchase_return_id + '/print', '_blank');
                                    }
                                }]
                            }).show();
                        }
                    }
                }, {
                    itemId: 'editPurchaseReturnGrid',
                    hidden: true,
                    text: 'Edit',
                    iconCls: 'edit-icon',
                    handler: function() {
                        supplierTypeStore.load();

                        var grid = Ext.ComponentQuery.query('PurchaseReturnGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formPurchaseReturnGrid = Ext.getCmp('formPurchaseReturnGrid');
                            formPurchaseReturnGrid.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/PurchaseReturnGrid/1',
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
                            wPurchaseReturnGrid.show();
                            Ext.getCmp('statusformPurchaseReturnGrid').setValue('edit');
                            Ext.getCmp('TabSupplier').setActiveTab(0);
                        }
                    }
                }, {
                    id: 'btnDeletePurchaseReturnGrid',
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
                                    var grid = Ext.ComponentQuery.query('PurchaseReturnGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/PurchaseReturnGrid',
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
                                                storePurchaseReturnGrid.load();
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
                    xtype: 'searchPurchaseReturnGrid',
                    text: 'Left Button'
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storePurchaseReturnGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storePurchaseReturnGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            loadReturnPoData(record);
            // var formAgama = Ext.create('formAgama');
            // var formPurchaseReturnGrid = Ext.getCmp('formPurchaseReturnGrid');
            // wPurchaseReturnGrid.show();
            // formPurchaseReturnGrid.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/PurchaseReturnGrid/1',
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
            // Ext.getCmp('statusformPurchaseReturnGrid').setValue('edit');

            // Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});