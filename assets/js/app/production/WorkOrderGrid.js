// var WindowEntryWorkOrder = Ext.create(dir_sys + 'production.WindowEntryWorkOrder');


Ext.define('WorkOrderGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'job_order_id', 'idsales', 'idunit', 'startdate_job', 'enddate_job', 'job_no', 'req_ship_date', 'status', 'remarks', 'datesales', 'no_sales_order', 'date_sales', 'totaljob', 'totalraw', 'totalbom', 'namecustomer', 'no_sales_order'
    ],
    idProperty: 'id'
});
var storeGridWorkOrderGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'WorkOrderGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/WorkOrder/production',
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

//storeGridInventoryAll.on('beforeload',function(store, operation,eOpts){
//        operation.params={
//                    'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWorkOrderGrid').getValue()
//                  };
//              });

Ext.define('MY.searchGridWorkOrderGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridWorkOrderGrid',
    store: storeGridWorkOrderGrid,
    width: 180
});
var smGridWorkOrderGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridWorkOrderGrid.getSelection().length;
            if (selectedLen == 0) {

                Ext.getCmp('btnPrintWorkOrderGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnPrintWorkOrderGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'production.WorkOrderGrid', {
    title: 'Work Order',
    itemId: 'WorkOrderGrid',
    id: 'WorkOrderGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.WorkOrderGrid',
    store: storeGridWorkOrderGrid,
    // selModel: smGridWorkOrderGrid,
    loadMask: true,
    columns: [{
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
        },
        {
            header: 'Customer',
            dataIndex: 'namecustomer',
            minWidth: 150,
        },
        {
            header: 'No SO',
            dataIndex: 'no_sales_order',
            minWidth: 150,
        },
        {
            header: 'Req. Ship Date',
            dataIndex: 'req_ship_date',
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
            header: 'Total Job',
            dataIndex: 'totaljob',
            minWidth: 150
        },
        {
            header: 'Total Raw Material',
            dataIndex: 'totalraw',
            minWidth: 150
        },
        {
            header: 'Total BoM Usage',
            dataIndex: 'totalbom',
            minWidth: 150
        },
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
                    id: 'cbUnitWorkOrderGrid',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridWorkOrderGrid.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitWorkOrderGrid').getValue() + ',' + 'a.idanggotatype:' + Ext.getCmp('cbUnitPelangganType').getValue()

                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'comboxWorkOrderStatus'
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
                    itemId: 'addWorkOrderGrid',
                    text: 'Create New Work Order',
                    iconCls: 'add-icon',
                    handler: function() {
                        if (!Ext.isDefined(Ext.getCmp('WindowEntryWorkOrder'))) {
                            Ext.create(dir_sys + 'production.WindowEntryWorkOrder')
                        } else {

                        }
                        Ext.getCmp('WindowEntryWorkOrder').show()

                        Ext.getCmp('addItemJobWoBtn').setDisabled(false);

                        //hapus form
                        // var WorkOrderMaterialTab = Ext.getCmp('WorkOrderMaterialTab').getStore();
                        // WorkOrderMaterialTab.removeAll();
                        // WorkOrderMaterialTab.sync();

                        //  var WorkOrderJobTab = Ext.getCmp('WorkOrderJobTab').getStore();
                        // WorkOrderJobTab.removeAll();
                        // WorkOrderJobTab.sync();

                        Ext.getCmp('workOrderHeaderForm').getForm().reset();
                        //end hapus form

                        // Ext.getCmp('containerScheduleWo').hide();

                        storeUnit.load();
                        Ext.getCmp('cbUnitWOForm').setValue(idunit);
                        var comboxWorkOrderStatus_woform = Ext.getCmp('comboxWorkOrderStatus_woform');
                        comboxWorkOrderStatus_woform.setValue(1);
                        comboxWorkOrderStatus_woform.setReadOnly(true);

                        Ext.getCmp('statusform_woform').setValue('input');

                        Ext.getCmp('WorkOrderMaterialTab').setTitle('Pilih Raw Material');
                        Ext.getCmp('addRawMaterialBtnWo').disable();

                        // job_order_id_woform
                        var token_tmp = randomString(12);
                        Ext.getCmp('token_tmp_woform').setValue(token_tmp); //buat token temporary untuk input

                        //bikin header
                        Ext.Ajax.request({
                            url: SITE_URL + 'production/create_id_wo',
                            method: 'POST',
                            params: {
                                token_tmp: token_tmp,
                                idunit: Ext.getCmp('cbUnitWorkOrderGrid').getValue() * 1
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                Ext.getCmp('job_order_id_woform').setValue(d.id);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });

                        Ext.getCmp('btnSaveWo').enable();

                        // var children = Ext.get('containerScheduleWo');
                        // // hide them all
                        // Ext.each(children, function(child) { child.hide(); });

                        Ext.get('start_date_schedulewoform').hide();
                        Ext.get('end_date_schedulewoform').hide();
                        Ext.get('pic_name_schedulewoform').hide();

                        Ext.getCmp('WindowEntryWorkOrder').setTitle('Entry Work Order');



                    }
                }, {
                    itemId: 'editWorkOrderGrid',
                    text: 'Ubah',
                    hidden: true,
                    iconCls: 'edit-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GridWorkOrderGridID')[0];
                        var grid = Ext.getCmp('GridWorkOrderGridID');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                        } else {
                            loadMemberForm(selectedRecord.data.id_member)
                        }
                    }
                }, {
                    id: 'btnDeleteWorkOrderGrid',
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
                                    var grid = Ext.getCmp('GridWorkOrderGridID');
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/WorkOrderGrid',
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
                                    storeGridWorkOrderGrid.load();
                                }
                            }
                        });
                    },
                    //                    disabled: true
                },
                {
                    text: 'Print',
                    iconCls: 'print-icon',
                    id: 'btnPrintWorkOrderGrid',
                    handler: function() {
                        var grid = Ext.getCmp('WorkOrderGrid');
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
                                    html: '<iframe src="' + SITE_URL + 'production/print_wo/' + selectedRecord.data.job_order_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                    text: 'Print',
                                    iconCls: 'print-icon',
                                    handler: function() {
                                        window.open(SITE_URL + 'production/print_wo/' + selectedRecord.data.job_order_id + '/print', '_blank');
                                    }
                                }]
                            }).show();
                        }
                    }
                }, '->',
                'Searching: ', ' ', {
                    xtype: 'searchGridWorkOrderGrid',
                    text: 'Left Button'
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridWorkOrderGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridWorkOrderGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            loadWoData(record.data.job_order_id)
            console.log(record.data.job_order_id);
            // var children = Ext.get('containerScheduleWo');
            // // hide them all
            // Ext.each(children, function(child) { child.hide(); });

            Ext.get('start_date_schedulewoform').hide();
            Ext.get('end_date_schedulewoform').hide();
            Ext.get('pic_name_schedulewoform').hide();

            Ext.getCmp('addItemJobWoBtn').setDisabled(false);
        }
    }
});

function customRenderer(value, metaData, record, rowIndex, colIndex, store) {
    // var opValue = value;
    if (value === "1") {
        var status = 'Open';
    } else if (value === "1") {
        var status = 'On Progress';
    } else if (value === "3") {
        var status = 'Pending';
    } else if (value === "4") {
        var status = 'Finished';
    } else if (value === "5") {
        var status = 'Canceled';
    }
    return status;
}