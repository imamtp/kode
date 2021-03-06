var WindowReceiptWOList = Ext.create(dir_sys + 'production.WindowReceiptWOList');
// var WindowEntryReceiptWO = Ext.create(dir_sys + 'production.WindowEntryReceiptWO');


Ext.define('ReceiptWOGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'job_order_id', 'idsales', 'idunit', 'startdate_job', 'enddate_job', 'job_no', 'req_ship_date', 'finished_date', 'status', 'pic_id', 'approvedby_id', 'no_sales_order', 'date_sales', 'pic_name', 'approveby_name', 'totaljob', 'totalcostitem', 'totalmaterialitem', 'receiptdate', 'namecustomer'
    ],
    idProperty: 'id'
});
var storeGridReceiptWOGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ReceiptWOGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/receiptwo/production',
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

// storeGridReceiptWOGrid.on('beforeload',function(store, operation,eOpts){
//        operation.params={
//                    'extraparams': 'a.status:'+5
//                    // 'option':'finished'
//                  };
//              });

Ext.define('MY.searchGridReceiptWOGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReceiptWOGrid',
    store: storeGridReceiptWOGrid,
    width: 180
});
var smGridReceiptWOGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridReceiptWOGrid.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('btnSetToReadyForDeliver').disable();
            }
        },
        select: function(model, record, index) {
            // var selectedLen = smGridReceiptWOGrid.getSelection().length;
            if (record.data.status * 1 == 5) {
                Ext.getCmp('btnSetToReadyForDeliver').disable();
            } else {
                Ext.getCmp('btnSetToReadyForDeliver').enable();
            }
        }
    }
});
Ext.define(dir_sys + 'production.ReceiptWOGrid', {
    title: 'Receipt Production',
    itemId: 'ReceiptWOGrid',
    id: 'ReceiptWOGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.ReceiptWOGrid',
    store: storeGridReceiptWOGrid,
    selModel: smGridReceiptWOGrid,
    loadMask: true,
    columns: [

        {
            header: 'job_order_id',
            dataIndex: 'job_order_id',
            hidden: true
        },
        {
            header: 'idsales',
            dataIndex: 'idsales',
            hidden: true
        }, {
            header: 'WO Number',
            dataIndex: 'job_no',
            minWidth: 150
        },
        {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(arrWorkOrderStatus, value);
            }
        }, {
            header: 'SO Number',
            dataIndex: 'no_sales_order',
            minWidth: 150
        },
        {
            header: 'Pic Name',
            dataIndex: 'pic_name',
            minWidth: 150
        },
        {
            header: 'Cutomer',
            dataIndex: 'namecustomer',
            minWidth: 150
        },
        {
            header: 'Approved By',
            dataIndex: 'approveby_name',
            minWidth: 150
        },
        {
            header: 'Start Date',
            dataIndex: 'startdate_job',
            minWidth: 150,
            renderer: function(value, metaData, record, row, col, store, gridView) {
                if (record.data.startdate_job === null) {
                    return 'Not Started';
                } else {
                    return record.data.startdate_job;
                }
            }
        },
        {
            header: 'End Date',
            dataIndex: 'enddate_job',
            minWidth: 150,
            renderer: function(value, metaData, record, row, col, store, gridView) {
                if (record.data.enddate_job === null) {
                    return 'Not Started';
                } else {
                    return record.data.enddate_job;
                }
            }
        },
        {
            header: 'Finished Date',
            dataIndex: 'finished_date',
            minWidth: 150
        },
        {
            header: 'Receipt Date',
            dataIndex: 'receipt',
            minWidth: 150
        },
        {
            header: 'Total Job',
            dataIndex: 'totaljob',
            minWidth: 150
        },
        {
            header: 'Total Material',
            dataIndex: 'totalmaterialitem',
            minWidth: 150
        },
        {
            header: 'Total Cost Item',
            dataIndex: 'totalcostitem',
            minWidth: 150
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    labelWidth: 160,
                    // value: datenow(),
                    fieldLabel: 'Work Order Period',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                        // fieldLabel: 'Date Order',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    labelWidth: 160,
                    valueField: 'idunit',
                    id: 'cbUnitReceiptWOGrid',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridReceiptWOGrid.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitReceiptWOGrid').getValue() + ',' + 'a.idanggotatype:' + Ext.getCmp('cbUnitPelangganType').getValue()

                                }
                            });
                        }
                    }
                },
                // {
                //     xtype:'comboxReceiptWOStatus'
                // },
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
                    itemId: 'addReceiptWOGrid',
                    text: 'Create New Receipt',
                    iconCls: 'add-icon',
                    handler: function() {
                        WindowReceiptWOList.show();
                        Ext.getCmp('btnRecordReceiptWo').enable();
                    }
                }, {
                    text: 'Print',
                    iconCls: 'print-icon',
                    handler: function() {

                        var grid = Ext.getCmp('ReceiptWOGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {

                            Ext.create('Ext.window.Window', {
                                title: 'Preview Receipt Work Order',
                                modal: true,
                                width: panelW - 100,
                                height: panelH - 200,
                                items: [{
                                    xtype: 'component',
                                    html: '<iframe src="' + SITE_URL + 'production/print_receipt_wo/' + selectedRecord.data.job_order_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                    text: 'Print',
                                    iconCls: 'print-icon',
                                    handler: function() {
                                        window.open(SITE_URL + 'production/print_receipt_wo/' + selectedRecord.data.job_order_id + '/print', '_blank');
                                    }
                                }]
                            }).show();
                        }


                    }
                },
                {
                    id: 'btnSetToReadyForDeliver',
                    disabled: true,
                    hidden: true,
                    text: 'Set To Ready For Deliver',
                    iconCls: 'tick-icon',
                    handler: function() {
                        var grid = Ext.getCmp('ReceiptWOGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            Ext.MessageBox.show({
                                title: 'Set To Ready For Deliver',
                                msg: 'Apakah anda yakin untuk memproses work order terpilih untuk dapat dibuatkan Surat Pengiriman Barang?',
                                buttons: Ext.MessageBox.YESNOCANCEL,
                                icon: Ext.MessageBox.WARNING,
                                fn: function(btn) {
                                    if (btn == 'yes') {
                                        // alert(selectedRecord.data.job_order_id)
                                        Ext.Ajax.request({
                                            url: SITE_URL + 'production/set_deliver_ready',
                                            method: 'POST',
                                            params: {
                                                job_order_id: selectedRecord.data.job_order_id
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                Ext.getCmp('ReceiptWOGrid').getStore().load();
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                            }
                                        });
                                    } else {
                                        return;
                                    }
                                }
                            });
                        }
                    }
                },
                {
                    itemId: 'editReceiptWOGrid',
                    text: 'Ubah',
                    hidden: true,
                    iconCls: 'edit-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GridReceiptWOGridID')[0];
                        var grid = Ext.getCmp('GridReceiptWOGridID');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                        } else {
                            loadMemberForm(selectedRecord.data.id_member)
                        }
                    }
                },
                {
                    id: 'btnDeleteReceiptWOGrid',
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
                                    var grid = Ext.getCmp('GridReceiptWOGridID');
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/ReceiptWOGrid',
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
                                    storeGridReceiptWOGrid.load();
                                }
                            }
                        });
                    },
                    //                    disabled: true
                },
                '->',
                'Searching: ',
                ' ',
                {
                    xtype: 'searchGridReceiptWOGrid',
                    text: 'Left Button'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridReceiptWOGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReceiptWOGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            loadWoReceiptData(record.data)

            Ext.getCmp('comboxWorkOrderStatus_receiptwoform').setReadOnly(false);
        }
    }
});