// var WindowSaleOrderList = Ext.create(dir_sys + 'sales.WindowSaleOrderList');
// var WindowEntrySalesInvoice = Ext.create(dir_sys + 'sales.WindowEntrySalesInvoice');

// var WindowEntrydeliveryOrderReturn = Ext.create(dir_sys + 'sales.WindowEntrydeliveryOrderReturn');

Ext.define('GriddeliveryOrderReturnGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'sales_return_id', 'idunit', 'return_date', 'noreturn', 'idcustomer', 'memo', 'return_amount', 'idaccount_return', 'userin', 'datein', 'namecustomer', 'accname', 'accnumber', 'notes', 'totaldisc', 'aftertax', 'totaltax', 'subtotal', 'notes', 'accnamebank', 'accnumberbank', 'idaccount_bank', 'status', 'totalitem', 'totalqtyreturn', 'totalqtysent'
    ],
    idProperty: 'id'
});
var storeGriddeliveryOrderReturnGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GriddeliveryOrderReturnGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesreturn/sales',
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

storeGriddeliveryOrderReturnGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitDoSalesReturn').getValue(),
        'option': 'delivery_order'
    };
});

Ext.define('MY.searchGriddeliveryOrderReturnGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGriddeliveryOrderReturnGrid',
    store: storeGriddeliveryOrderReturnGrid,
    width: 180
});
var smGriddeliveryOrderReturnGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGriddeliveryOrderReturnGrid.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('createDOReturnformGrid').disable();
            }
        },
        select: function(model, record, index) {
            if (record.data.status * 1 == 4) {
                //pickup up
                Ext.getCmp('createDOReturnformGrid').enable();
            } else {
                Ext.getCmp('createDOReturnformGrid').disable();
            }
        }
    }
});
Ext.define(dir_sys + 'sales.deliveryOrderReturnGrid', {
    title: 'Sales Return',
    itemId: 'deliveryOrderReturnGrid',
    id: 'deliveryOrderReturnGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.deliveryOrderReturnGrid',
    store: storeGriddeliveryOrderReturnGrid,
    selModel: smGriddeliveryOrderReturnGrid,
    loadMask: true,
    columns: [{
            header: 'sales_return_id',
            dataIndex: 'sales_return_id',
            hidden: true
        }, {
            header: 'No Return',
            dataIndex: 'noreturn',
            minWidth: 150
        },
        {
            header: 'Sales Return Date',
            dataIndex: 'return_date',
            minWidth: 150
        },
        {
            header: 'Customer Name',
            flex: 1,
            dataIndex: 'namecustomer',
            minWidth: 200
        },

        {
            header: 'Return Amount',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'return_amount',
            minWidth: 150
        },
        {
            header: 'Return CoA',
            dataIndex: 'accname',
            minWidth: 150
        },
        {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(ArrReturnSalesStatus, value);
            }
        },
        {
            header: 'Total Returned Qty',
            dataIndex: 'totalqtyreturn',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },

        {
            header: 'Total Shipped Qty',
            dataIndex: 'totalqtysent',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return value === null ? 0 : value;
            }
        },
        {
            header: 'Total Rest Qty',
            hidden: true,
            dataIndex: 'sisakirim',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Date',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                        // fieldLabel: 'Date Order',
                }, '-',
                {
                    xtype: 'comboxunit',
                    valueField: 'idunit',
                    id: 'cbUnitDoSalesReturn',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGriddeliveryOrderReturnGrid.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitDoSalesReturn').getValue()

                                }
                            });
                        }
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxReturnSalesStatus'
                },
                {
                    text: 'Search',
                    handler: function() {}
                },
                {
                    text: 'Clear Filter',
                    handler: function() {}
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    text: 'Print Picking Note',
                    iconCls: 'print-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('PurchaseRequisitionGridID')[0];
                        var grid = Ext.getCmp('deliveryOrderReturnGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {

                            Ext.create('Ext.window.Window', {
                                title: 'Preview Picking Note',
                                modal: true,
                                width: panelW - 100,
                                height: panelH - 200,
                                items: [{
                                    xtype: 'component',
                                    html: '<iframe src="' + SITE_URL + 'sales/print_picking_note_return/' + selectedRecord.data.sales_return_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                        text: 'Print Picking Note',
                                        iconCls: 'print-icon',
                                        handler: function() {
                                            window.open(SITE_URL + 'sales/print_picking_note_return/' + selectedRecord.data.sales_return_id + '/print', '_blank');
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: 'Print Picking Note and Set Picking Status',
                                        iconCls: 'print-icon',
                                        handler: function() {
                                            window.open(SITE_URL + 'sales/print_picking_note_return/' + selectedRecord.data.sales_return_id + '/print', '_blank');

                                            Ext.Ajax.request({
                                                url: SITE_URL + 'sales/set_picking_return',
                                                method: 'POST',
                                                params: {
                                                    sales_return_id: selectedRecord.data.sales_return_id
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    storeGriddeliveryOrderReturnGrid.load();

                                                    this.hide();
                                                    // if (!d.success) {
                                                    //     Ext.Msg.alert('Informasi', d.message);
                                                    // }
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                }
                                            });
                                        }
                                    }
                                ]
                            }).show();
                        }
                    }
                }, {
                    hidden: true,
                    text: 'Create New Delivery Order',
                    iconCls: 'add-icon',
                    handler: function() {

                        var grid = Ext.getCmp('deliveryOrderReturnGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        console.log(selectedRecord);
                        // var data = grid.getSelectionModel().getSelection();

                        // loadReturnSOData(record);

                        // WindowSaleOrderList.show();
                        // Ext.getCmp('GridSalesOrderList').getStore().load();

                        // storeCustomer.load();
                        // storeUnit.load();
                        // productMeasurementStore.load();
                        // StorePayment.load();
                        // // storeGridSalesOrderList.load();

                        // //apus dulu data di grid entry delivery order
                        // Ext.getCmp('EntrydeliveryOrderReturn').getStore().removeAll();
                        // Ext.getCmp('EntrydeliveryOrderReturn').getStore().sync();
                    }
                }, {
                    id: 'createDOReturnformGrid',
                    disabled: true,
                    text: 'Set Delivery Order',
                    iconCls: 'edit-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('deliveryOrderReturnGrid')[0];
                        var grid = Ext.getCmp('deliveryOrderReturnGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        loadReturnSOData(selectedRecord);

                        Ext.getCmp('EntrySalesReturn').columns[12].setVisible(false);
                        Ext.getCmp('EntrySalesReturn').columns[13].setVisible(false);

                        Ext.getCmp('EntrySalesReturn').columns[14].setVisible(true);
                        Ext.getCmp('EntrySalesReturn').columns[15].setVisible(true);
                        Ext.getCmp('EntrySalesReturn').columns[16].setVisible(true);
                        Ext.getCmp('EntrySalesReturn').columns[17].setVisible(true);
                        Ext.getCmp('EntrySalesReturn').columns[19].setVisible(false); //hide delete row button

                        Ext.getCmp('btnRecordSalesReturn').hide();
                        Ext.getCmp('btnRecordDeliverySalesReturn').show();

                        Ext.getCmp('status_sr').setReadOnly(true);
                        // updateGridSalesReturn();
                    }
                },
                {
                    // itemId: 'editdeliveryOrderReturnGrid',
                    text: 'Ubah',
                    hidden: true,
                    iconCls: 'edit-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GriddeliveryOrderReturnGridID')[0];
                        var grid = Ext.getCmp('GriddeliveryOrderReturnGridID');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                        } else {
                            loadMemberForm(selectedRecord.data.id_member)
                        }
                    }
                }, {
                    // id: 'btnDeletedeliveryOrderReturnGrid',
                    text: 'Hapus',
                    hidden: true,
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.getCmp('GriddeliveryOrderReturnGridID');
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/deliveryOrderReturnGrid',
                                        method: 'POST',
                                        params: {
                                            postdata: Ext.encode(selected),
                                            idmenu: 95
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if (!d.success) {
                                                Ext.Msg.alert('Informasi', d.message);
                                            }
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                    storeGriddeliveryOrderReturnGrid.load();
                                }
                            }
                        });
                    },
                    //                    disabled: true
                }, '->', 'Pencarian: ', ' ', {
                    xtype: 'searchGriddeliveryOrderReturnGrid',
                    text: 'Left Button'
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGriddeliveryOrderReturnGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGriddeliveryOrderReturnGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadMemberForm(record.data.id_member)
        }
    }
});