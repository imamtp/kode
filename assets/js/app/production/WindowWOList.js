// var WindowEntryScheduleWO = Ext.create(dir_sys + 'production.WindowEntryScheduleWO');

Ext.define('GridWorkOrderListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'job_order_id', 'idsales', 'idunit', 'startdate_job', 'enddate_job', 'job_no', 'req_ship_date', 'status', 'remarks', 'datesales', 'no_sales_order', 'date_sales', 'totaljob', 'totalraw', 'totalbom', 'namecusomer'
    ],
    idProperty: 'id'
});

var storeGridWorkOrderList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridWorkOrderListModel',
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
        property: 'code',
        direction: 'ASC'
    }]
});


// storeGridWorkOrderList.on('beforeload',function(store, operation,eOpts){
//    operation.params={
//                // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
//                'option':'notinschedule'
//                // 'wherenotinschedule':'true'
//              };
//          });

Ext.define('MY.searchGridWorkOrderList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridWorkOrderList',
    store: storeGridWorkOrderList,
    width: 180
});
// var smGridWorkOrderList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridWorkOrderList.getSelection().length;
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

Ext.define('GridWorkOrderList', {
    itemId: 'GridWorkOrderList',
    id: 'GridWorkOrderList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridWorkOrderList',
    store: storeGridWorkOrderList,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 45,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                // WindowEntryScheduleWO.show();
                loadWoData(selectedRecord.get('job_order_id'))

                // var children = Ext.get('containerScheduleWo');
                // // show them all
                // Ext.each(children,function(child){child.show();});
                Ext.get('start_date_schedulewoform').show();
                Ext.get('end_date_schedulewoform').show();
                Ext.get('pic_name_schedulewoform').show();

                Ext.getCmp('comboxWorkOrderStatus_woform').setValue(3); //set on progress
                Ext.getCmp('comboxWorkOrderStatus_woform').setReadOnly(true);

                Ext.getCmp('WindowWOList').hide();

                Ext.getCmp('WindowEntryWorkOrder').setTitle('Entry Work Order Schedule');

                Ext.getCmp('addItemJobWoBtn').setDisabled(true);

                // Ext.getCmp('idsales_schedulewoform').setValue(selectedRecord.get('idsales'));
                // Ext.getCmp('job_order_id_schedulewoform').setValue(selectedRecord.get('job_order_id'));

                // if(selectedRecord.get('no_sales_order')===null || selectedRecord.get('no_sales_order')===''){
                //      Ext.getCmp('no_sales_order_schedulewoform').hide();
                // } else {
                //    Ext.getCmp('no_sales_order_schedulewoform').setValue(selectedRecord.get('no_sales_order')); 
                // }


                // Ext.getCmp('job_no_schedulewoform').setValue(selectedRecord.get('job_no'));
                // Ext.getCmp('cbUnitWOForm').setValue(selectedRecord.get('idunit'));
                // Ext.getCmp('req_ship_date_schedulewoform').setValue(selectedRecord.get('req_ship_date'));
                // Ext.getCmp('comboxWorkOrderStatus_schedulewoform').setValue(selectedRecord.get('status'));
                // Ext.getCmp('remarks_schedulewoform').setValue(selectedRecord.get('remarks'));

            }
        }, {
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
            header: 'Customer',
            dataIndex: 'namecustomer',
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
        {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(arrWorkOrderStatus, value);
            }
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridWorkOrderList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridWorkOrderList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridWorkOrderList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'production.WindowWOList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowWOList',
    id: 'WindowWOList',
    title: 'Choose Work Order',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW,
    height: sizeH - 200,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridWorkOrderList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});