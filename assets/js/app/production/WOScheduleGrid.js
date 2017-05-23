
var WindowWOList = Ext.create(dir_sys + 'production.WindowWOList');
// var WindowEntryWOSchedule = Ext.create(dir_sys + 'production.WindowEntryWOSchedule');


Ext.define('WOScheduleGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'job_order_id','idsales','idunit','startdate_job','enddate_job','job_no','req_ship_date','status','remarks','datesales','no_sales_order','date_sales','totaljob','totalraw','totalbom','firstname'
    ],
    idProperty: 'id'
});
var storeGridWOScheduleGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'WOScheduleGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/workorder/production',
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

storeGridWOScheduleGrid.on('beforeload',function(store, operation,eOpts){
       operation.params={
                   'extraparams': 'a.status:'+3,
                   'option':'scheduled'
                 };
             });

Ext.define('MY.searchGridWOScheduleGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridWOScheduleGrid',
    store: storeGridWOScheduleGrid,
    width: 180
});
var smGridWOScheduleGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridWOScheduleGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteWOScheduleGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteWOScheduleGrid').enable();
        }
    }
});
Ext.define(dir_sys+'production.WOScheduleGrid', {
    title: 'Production Scheduling',
    itemId: 'WOScheduleGrid',
    id: 'WOScheduleGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.WOScheduleGrid',
    store: storeGridWOScheduleGrid,
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
    },{
        header: 'WO Number',
        dataIndex: 'job_no',
        minWidth: 150
    },
    {
        header: 'Req. Ship Date',
        dataIndex: 'req_ship_date',
        minWidth: 150
    },
    {
        header:'Pic Name',
        dataIndex:'firstname',
        minWidth:150
    },
    {
        header: 'Start Date',
        dataIndex: 'startdate_job',
        minWidth: 150,
        renderer: function(value, metaData, record, row, col, store, gridView){
            if(record.data.startdate_job===null) {
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
        renderer: function(value, metaData, record, row, col, store, gridView){
            if(record.data.enddate_job===null) {
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
    {
        header: 'Status',
        dataIndex: 'status',
        minWidth: 150,
        renderer: function(value) {
            return customColumnStatus(arrWorkOrderStatus,value);
        }
    }
    ],
    dockedItems: [
     {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    labelWidth:160,
                    // value: datenow(),
                    fieldLabel: 'Work Order Period',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel:true
                    // fieldLabel: 'Date Order',
                }
            ]
        },
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'comboxunit',
                    labelWidth:160,
                    valueField:'idunit',
                    id:'cbUnitWOScheduleGrid',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridWOScheduleGrid.load({
                                params: {
                                  'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()+','+'a.idanggotatype:'+Ext.getCmp('cbUnitPelangganType').getValue()

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
        },{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addWOScheduleGrid',
            text: 'Create New Schedule',
            iconCls: 'add-icon',
            handler: function() {
                WindowWOList.show();

                var GridWorkOrderListStore = Ext.getCmp('GridWorkOrderList').getStore();
                GridWorkOrderListStore.on('beforeload',function(store, operation,eOpts){
                   operation.params={
                               'extraparams': 'a.status:'+2, // confirmed
                               'option':'notinschedule'
                               // 'wherenotinschedule':'true'
                             };
                         });
                GridWorkOrderListStore.load();


                // storeGridInventoryAll.on('beforeload',function(store, operation,eOpts){
                //    operation.params={
                //                'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
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
            itemId: 'editWOScheduleGrid',
            text: 'Ubah',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('GridWOScheduleGridID')[0];
                 var grid = Ext.getCmp('GridWOScheduleGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                } else {
                    loadMemberForm(selectedRecord.data.id_member)
                }
            }
        }, {
            id: 'btnDeleteWOScheduleGrid',
            text: 'Hapus',
            hidden:true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.getCmp('GridWOScheduleGridID');
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/WOScheduleGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:95
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
                            storeGridWOScheduleGrid.load();
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Searching: ', ' ', {
            xtype: 'searchGridWOScheduleGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridWOScheduleGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridWOScheduleGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadMemberForm(record.data.id_member)
        }
    }
});


function loadMemberForm(id)
{
    // anggotaTypeStore.load();

        // var formWOScheduleGrid = Ext.getCmp('formWOScheduleGrid');
        // wWOScheduleGrid.show();
        // formWOScheduleGrid.getForm().load({
        //     url: SITE_URL + 'backend/loadFormData/WOScheduleGrid/1/member',
        //     params: {
        //         extraparams: 'a.id_member:' + id
        //     },
        //     success: function(form, action) {
        //         var obj = Ext.decode(action.response.responseText); 
        //         // console.log(obj);
        //         Ext.getCmp('comboxStatusMember').setValue(obj.data.status*1);
        //         formWOScheduleGrid.getForm().findField("id_member_type").setValue(obj.data.id_member_type);
        //         formWOScheduleGrid.getForm().findField("marital_status").setValue(obj.data.marital_status*1);
        //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     }
        // })

        // Ext.getCmp('memberFormDetailID').getForm().load({
        //     url: SITE_URL + 'backend/loadFormData/WOScheduleGrid/1/member',
        //     params: {
        //         extraparams: 'a.id_member:' + id
        //     },
        //     success: function(form, action) {
        //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     }
        // })

        // Ext.getCmp('statusformWOScheduleGrid').setValue('edit');
        // Ext.getCmp('Tabanggota').setActiveTab(0);
}


function customRenderer(value, metaData, record, rowIndex, colIndex, store) {
    // var opValue = value;
    if (value === "1") {
        var status = 'Open';
    } else if (value === "1") {
        var status = 'On Progress';
    } else if (value === "3") {
        var status  = 'Pending';
    } else if (value === "4") {
       var status  = 'Finished';
    } else if (value === "5") {
       var status  = 'Canceled';
    }
    return status;
}