var WindowEntryMaterialWorkOrder = Ext.create(dir_sys + 'production.WindowEntryMaterialWorkOrder');
var WindowMaterialUsageWOList = Ext.create(dir_sys + 'production.WindowMaterialUsageWOList');
// var WindowEntryWOSchedule = Ext.create(dir_sys + 'production.WindowEntryWOSchedule');


Ext.define('WOMaterialUsageGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'job_order_id', 'idsales', 'idunit', 'startdate_job', 'material_datein', 'enddate_job', 'job_no', 'req_ship_date', 'status', 'remarks', 'datesales', 'no_sales_order', 'date_sales', 'totaljob', 'totalraw', 'totalbom', 'firstname', 'namecustomer'
    ],
    idProperty: 'id'
});
var storeGridWOMaterialUsageGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'WOMaterialUsageGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/materialworkorder/production',
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

storeGridWOMaterialUsageGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.status:' + 3,
        'option': 'scheduled'
    };
});

Ext.define('MY.searchGridWOMaterialUsageGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridWOMaterialUsageGrid',
    store: storeGridWOMaterialUsageGrid,
    width: 180
});
var smGridWOMaterialUsageGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridWOMaterialUsageGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteWOMaterialUsageGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteWOMaterialUsageGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'production.WOMaterialUsageGrid', {
    title: 'Material Usage Entries',
    itemId: 'WOMaterialUsageGrid',
    id: 'WOMaterialUsageGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.WOMaterialUsageGrid',
    store: storeGridWOMaterialUsageGrid,
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
            header: 'Material Usage Input',
            dataIndex: 'material_datein',
            minWidth: 150
        },
        {
            header: 'Req. Ship Date',
            dataIndex: 'req_ship_date',
            minWidth: 150
        },
        {
            header: 'Pic Name',
            dataIndex: 'firstname',
            minWidth: 150
        },
        {
            header: 'Customer',
            dataIndex: 'namecustomer',
            minWidth: 150
        },
        {
            header: 'Start Date WO',
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
            header: 'End Date WO',
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
                    id: 'cbUnitWOMaterialUsageGrid',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridWOMaterialUsageGrid.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitWOMaterialUsageGrid').getValue() + ',' + 'a.idanggotatype:' + Ext.getCmp('cbUnitPelangganType').getValue()

                                }
                            });
                        }
                    }
                },
                // {
                //     xtype:'comboxWOScheduleStatus'
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
                itemId: 'addWOMaterialUsageGrid',
                text: 'Input Material Usage',
                iconCls: 'add-icon',
                handler: function() {
                    WindowMaterialUsageWOList.show();

                    var GridMaterialUsageWOList = Ext.getCmp('GridMaterialUsageWOList').getStore();
                    GridMaterialUsageWOList.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            'extraparams': 'a.status:' + 3, // onprogress
                            'option': 'scheduled'
                                // 'wherenotinschedule':'true'
                        };
                    });
                    GridMaterialUsageWOList.load();


                    // storeGridInventoryAll.on('beforeload',function(store, operation,eOpts){
                    //    operation.params={
                    //                'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOMaterialUsageGrid').getValue()
                    //              };
                    //          });

                    // Ext.getCmp('WOScheduleHeaderForm').getForm.reset();

                    // var WOScheduleJobTabStore = Ext.getCmp('WOScheduleJobTab').getStore();
                    // WOScheduleJobTabStore.removeAll();
                    // WOScheduleJobTabStore.sync();

                    // var WOScheduleMaterialTabStore = Ext.getCmp('WOScheduleMaterialTab').getStore();
                    // WOScheduleMaterialTabStore.removeAll();
                    // WOScheduleMaterialTabStore.sync();
                    // Ext.getCmp('GridSalesOrderList').getStore().load();

                    // storeUnit.load();
                    // Ext.getCmp('cbUnitWOForm').setValue(idunit);
                    // var comboxWOScheduleStatus_woform = Ext.getCmp('comboxWOScheduleStatus_woform');
                    // comboxWOScheduleStatus_woform.setValue(1);
                    // comboxWOScheduleStatus_woform.setReadOnly(true);

                    // Ext.getCmp('statusform_woform').setValue('input');
                }
            }, {
                itemId: 'editWOMaterialUsageGrid',
                hidden: true,
                text: 'Input Material Usage',
                iconCls: 'edit-icon',
                handler: function() {
                    // var grid = Ext.ComponentQuery.query('GridWOMaterialUsageGridID')[0];
                    // var grid = Ext.getCmp('GridWOMaterialUsageGridID');
                    // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    // var data = grid.getSelectionModel().getSelection();
                    // if (data.length == 0) {
                    //     Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                    // } else {
                    // loadMemberForm(selectedRecord.data.id_member)
                    loadWoData(selectedRecord.data.job_order_id)

                    // Ext.getCmp('containerScheduleWo').show();

                    // Ext.getCmp('comboxWorkOrderStatus_woform').setValue(3); //set on progress
                    // Ext.getCmp('comboxWorkOrderStatus_woform').setReadOnly(true);

                    // Ext.getCmp('btnSaveWo').hide();

                }

            }, {
                id: 'btnDeleteWOMaterialUsageGrid',
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
                                var grid = Ext.getCmp('GridWOMaterialUsageGridID');
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/WOMaterialUsageGrid',
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
                                storeGridWOMaterialUsageGrid.load();
                            }
                        }
                    });
                },
                //                    disabled: true
            }, '->', 'Searching: ', ' ', {
                xtype: 'searchGridWOMaterialUsageGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridWOMaterialUsageGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridWOMaterialUsageGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            WindowEntryMaterialWorkOrder.show();

            var MaterialWorkOrderHeaderForm = Ext.getCmp('MaterialWorkOrderHeaderForm').getForm();
            MaterialWorkOrderHeaderForm.load({
                url: SITE_URL + 'backend/loadFormData/WorkOrder/1/production',
                params: {
                    extraparams: 'a.job_order_id:' + record.data.job_order_id
                },
                success: function(form, action) {
                    var obj = Ext.decode(action.response.responseText);

                    var storeGridItemMaterialJobWO = Ext.getCmp('MaterialWorkOrderJobTab').getStore();
                    storeGridItemMaterialJobWO.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            'extraparams': 'a.job_order_id:' + record.data.job_order_id
                        };
                    });

                    storeGridItemMaterialJobWO.load();

                    // Ext.getCmp('start_date_materialwoform').setValue(selectedRecord.get('startdate_job'));
                    // Ext.getCmp('end_date_materialwoform').setValue(selectedRecord.get('enddate_job'));

                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
        }
    }
});