var WindowEntryReceiptWO = Ext.create(dir_sys + 'production.WindowEntryReceiptWO');

Ext.define('GridReceiptWorkOrderListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'job_order_id', 'idsales', 'idunit', 'startdate_job', 'enddate_job', 'job_no', 'req_ship_date', 'status', 'remarks', 'datesales', 'no_sales_order', 'date_sales', 'totaljob', 'totalraw', 'totalbom', 'firstname', 'namecustomer'
    ],
    idProperty: 'id'
});

var storeGridReceiptWorkOrderList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReceiptWorkOrderListModel',
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

storeGridReceiptWorkOrderList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
        'option': 'not_yet_received'
            // 'wherenotinschedule':'true'
    };
});

// storeGridReceiptWorkOrderList.on('beforeload',function(store, operation,eOpts){
//    operation.params={
//                // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
//                'option':'notinschedule'
//                // 'wherenotinschedule':'true'
//              };
//          });

Ext.define('MY.searchGridReceiptWorkOrderList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReceiptWorkOrderList',
    store: storeGridReceiptWorkOrderList,
    width: 180
});
// var smGridReceiptWorkOrderList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridReceiptWorkOrderList.getSelection().length;
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

Ext.define('GridReceiptWorkOrderList', {
    itemId: 'GridReceiptWorkOrderList',
    id: 'GridReceiptWorkOrderList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReceiptWorkOrderList',
    store: storeGridReceiptWorkOrderList,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 45,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                WindowEntryReceiptWO.show();

                Ext.getCmp('ReceiptWorkOrderMaterialTab').setTitle('Pilih finished goods');

                //apus dulu data gridnya
                // var GridReceiptWorkOrderJobTab = Ext.getCmp('ReceiptWorkOrderJobTab').getStore();
                //     GridReceiptWorkOrderJobTab.removeAll();
                //     GridReceiptWorkOrderJobTab.sync();

                // var GridReceiptWorkOrderMaterialTab = Ext.getCmp('ReceiptWorkOrderMaterialTab').getStore();
                //     GridReceiptWorkOrderMaterialTab.removeAll();
                //     GridReceiptWorkOrderMaterialTab.sync();

                // var GridReceiptWorkOrderCostTab = Ext.getCmp('ReceiptWorkOrderCostTab').getStore();
                //     GridReceiptWorkOrderCostTab.removeAll();
                //     GridReceiptWorkOrderCostTab.sync();


                Ext.getCmp('idsales_receiptwoform').setValue(selectedRecord.get('idsales'));
                Ext.getCmp('job_order_id_receiptwoform').setValue(selectedRecord.get('job_order_id'));
                console.log('no sales order: ' + selectedRecord.get('no_sales_order'));
                if (selectedRecord.get('no_sales_order') === null) {
                    Ext.getCmp('no_sales_order_receiptwoform').hide();
                    Ext.getCmp('customer_receiptwoform').hide();
                } else {
                    Ext.getCmp('no_sales_order_receiptwoform').show();
                    Ext.getCmp('customer_receiptwoform').show();
                    Ext.getCmp('no_sales_order_receiptwoform').setValue(selectedRecord.get('no_sales_order'));
                    Ext.getCmp('customer_receiptwoform').setValue(selectedRecord.get('namecustomer'));
                }

                Ext.getCmp('job_no_receiptwoform').setValue(selectedRecord.get('job_no'));
                Ext.getCmp('cbUnit_receiptwoform').setValue(selectedRecord.get('idunit'));
                Ext.getCmp('req_ship_date_receiptwoform').setValue(selectedRecord.get('req_ship_date'));
                Ext.getCmp('start_date_receiptwoform').setValue(selectedRecord.get('startdate_job'));
                Ext.getCmp('end_date_receiptwoform').setValue(selectedRecord.get('enddate_job'));

                var comboxWorkOrderStatus = Ext.getCmp('comboxWorkOrderStatus_receiptwoform');
                comboxWorkOrderStatus.setValue(4);
                comboxWorkOrderStatus.setReadOnly(true);

                Ext.getCmp('remarks_receiptwoform').setValue(selectedRecord.get('remarks'));
                Ext.getCmp('pic_name_receiptwoform').setValue(selectedRecord.get('firstname'));

                //load finished goods
                var ReceiptWorkOrderJobTabStore = Ext.getCmp('ReceiptWorkOrderJobTab').getStore();
                ReceiptWorkOrderJobTabStore.on('beforeload', function(store, operation, eOpts) {
                    operation.params = {
                        'extraparams': 'a.job_order_id:' + selectedRecord.get('job_order_id')
                    };
                });

                ReceiptWorkOrderJobTabStore.load();

                // Ext.Ajax.request({
                //        url: SITE_URL + 'production/get_production_detail',
                //        method: 'GET',
                //        params: {
                //            job_order_id: selectedRecord.get('job_order_id')
                //        },
                //        success: function(form, action) {
                //            var d = Ext.decode(form.responseText);

                // var grid = Ext.getCmp('ReceiptWorkOrderJobTab');
                // Ext.each(d.job, function(obj, i) {
                //      var rec = new GridItemJobReceiptWOModel({
                //             job_item_id: obj.job_item_id,
                //             invno: obj.invno,
                //             qty: obj.qty,
                //             size: obj.size,
                //             subtotal:obj.subtotal,
                //             satuan_qty: obj.satuan_qty,
                //             satuan_ukuran:obj.satuan_ukuran,
                //             sku_no:obj.sku_no,
                //             nameinventory: obj.nameinventory,
                //             qty_accept: 1,
                //             qty_reject: 1,
                //             qty_sisa:0
                //     });

                //     grid.getStore().insert(0, rec);
                // });

                // var grid = Ext.getCmp('ReceiptWorkOrderMaterialTab');
                // Ext.each(d.material, function(obj, i) {
                //      var rec = new GridItemMaterialReceiptWOModel({
                //             prod_material_id: obj.prod_material_id,
                //             idinventory: obj.idinventory,
                //             invno: obj.invno,
                //             bom_id: obj.bom_id,
                //             idunit: obj.idunit,
                //             qty: obj.qty,
                //             tipe: obj.tipe,
                //             // subtotal:obj.subtotal,
                //             description: obj.description,
                //             tipe:obj.tipe,
                //             sku_no:obj.sku_no,
                //             nameinventory: obj.nameinventory,
                //             measurement_name:obj.measurement_name,
                //             // qty_tambahan: 0,
                //             qty_real:0,
                //             qty_sisa:0
                //     });


                //     grid.getStore().insert(0, rec);
                // });

                // var grid = Ext.getCmp('ReceiptWorkOrderCostTab');
                // Ext.each(d.cost, function(obj, i) {
                //      var rec = new ReceiptWorkOrderCostTabModel({
                //             job_order_cost_id: obj.job_order_cost_id,
                //             prod_cost_id: obj.prod_cost_id,
                //             cost_code: obj.cost_code,
                //             cost_name: obj.cost_name,
                //             standard_cost: obj.standard_cost,
                //             standard_hour: obj.standard_hour,
                //             used_hour: obj.standard_hour,
                //             total: obj.standard_cost*obj.standard_hour
                //     });


                //     grid.getStore().insert(0, rec);
                // });


                //         },
                //         failure: function(form, action) {
                //             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                //         }
                // });

                Ext.getCmp('WindowReceiptWOList').hide();

                // Ext.getCmp('qty_accept_recwojob').getColumns()[1].hide();
                // Ext.getCmp('ReceiptWorkOrderJobTab').columns[9].setVisible(false);
                // Ext.getCmp('ReceiptWorkOrderJobTab').columns[10].setVisible(false);
                // Ext.getCmp('ReceiptWorkOrderJobTab').columns[11].setVisible(false);
                // Ext.getCmp('ReceiptWorkOrderJobTab').columns[12].setVisible(false);
                // Ext.getCmp('ReceiptWorkOrderJobTab').columns[13].setVisible(false);
                // Ext.getCmp('ReceiptWorkOrderJobTab').columns[14].setVisible(false);
                // Ext.getCmp('ReceiptWorkOrderJobTab').columns[15].setVisible(false);

                // Ext.getCmp('addRawMaterialBtnWo').hide();
                // Ext.getCmp('addBOMBtnWo').hide();
                // Ext.getCmp('addItemJobWoBtn').hide();
                // Ext.getCmp('addItemProdCostWo').hide();

            }
        },
        {
            header: 'job_order_id',
            dataIndex: 'job_order_id',
            hidden: true
        },
        {
            header: 'idsales',
            dataIndex: 'idsales',
            hidden: true
        },
        {
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
                    xtype: 'searchGridReceiptWorkOrderList',
                    text: 'Left Button',
                    placeHolder: 'Customer Name...'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridReceiptWorkOrderList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReceiptWorkOrderList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'production.WindowReceiptWOList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowReceiptWOList',
    id: 'WindowReceiptWOList',
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
        xtype: 'GridReceiptWorkOrderList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});