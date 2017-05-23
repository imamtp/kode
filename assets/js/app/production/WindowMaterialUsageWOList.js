

Ext.define('GridMaterialUsageWOListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'job_order_id','idsales','idunit','startdate_job','enddate_job','job_no','req_ship_date','status','remarks','datesales','no_sales_order','date_sales','totaljob','totalraw','totalbom'
    ],
    idProperty: 'id'
});

var storeGridMaterialUsageWOList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMaterialUsageWOListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
         url: SITE_URL + 'backend/ext_get_all/materialworkorder_input/production',
        actionMethods: 'POST',
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


// storeGridMaterialUsageWOList.on('beforeload',function(store, operation,eOpts){
//    operation.params={
//                // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
//                'option':'notinschedule'
//                // 'wherenotinschedule':'true'
//              };
//          });

Ext.define('MY.searchGridMaterialUsageWOList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMaterialUsageWOList',
    store: storeGridMaterialUsageWOList,
    width: 180
});
// var smGridMaterialUsageWOList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridMaterialUsageWOList.getSelection().length;
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

Ext.define('GridMaterialUsageWOList', {
    itemId: 'GridMaterialUsageWOList',
    id: 'GridMaterialUsageWOList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMaterialUsageWOList',
    store: storeGridMaterialUsageWOList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            
            WindowEntryMaterialWorkOrder.show();

            var MaterialWorkOrderHeaderForm = Ext.getCmp('MaterialWorkOrderHeaderForm').getForm();
            MaterialWorkOrderHeaderForm.load({
                url: SITE_URL + 'backend/loadFormData/WorkOrder/1/production',
                params: {
                    extraparams: 'a.job_order_id:' + selectedRecord.get('job_order_id')
                },
                success: function(form, action) {
                    var obj = Ext.decode(action.response.responseText); 
                    // workOrderHeaderForm.findField("status").setValue(obj.data.status*1);
                    // workOrderHeaderForm.findField("status").setReadOnly(false);

                    var storeGridItemMaterialJobWO = Ext.getCmp('MaterialWorkOrderJobTab').getStore();
                    storeGridItemMaterialJobWO.on('beforeload',function(store, operation,eOpts){
                           operation.params={
                                       'extraparams': 'a.job_order_id:'+selectedRecord.get('job_order_id')
                                     };
                                 });

                    storeGridItemMaterialJobWO.load();

                   Ext.getCmp('start_date_materialwoform').setValue(selectedRecord.get('startdate_job'));
                   Ext.getCmp('end_date_materialwoform').setValue(selectedRecord.get('enddate_job'));
                    
                   if(selectedRecord.get('idsales')!==null){
                    Ext.getCmp('RGWoMaterialEntry').setValue({is_from_so: 1});
                   } else {
                        Ext.getCmp('RGWoMaterialEntry').setValue({is_from_so: 2});
                   }
                   
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            
        }
    },{
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
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Searching: ', ' ',
            {
                xtype: 'searchGridMaterialUsageWOList',
                text: 'Left Button',
                placeHolder:'Customer Name...'
            }
        ]
    },
    {
        xtype: 'pagingtoolbar',
        store: storeGridMaterialUsageWOList, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridMaterialUsageWOList.load();
            }
        }
    }
});


Ext.define(dir_sys+'production.WindowMaterialUsageWOList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowMaterialUsageWOList',
    id:'WindowMaterialUsageWOList',
    title: 'Choose Scheduled Work Order',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    modal:true,
    closeAction: 'hide',
//    autoWidth: true,
    width: panelW,
    height: sizeH-200,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridMaterialUsageWOList'
    }],
    listeners: {
            show: function() {
                // this.el.setStyle('top', '');
            }
        }
});