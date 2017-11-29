// var WindowEntryDeliveryOrder = Ext.create(dir_sys + 'sales.WindowEntryDeliveryOrder');

Ext.define('GridSalesOrderWOListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idsales', 'idpayment', 'idemployee', 'idjournal', 'idcustomer', 'date_sales', 'no_sales_order', 'shipto', 'subtotal', 'freight', 'tax', 'disc', 'totalamount', 'comments', 'userin', 'datein', 'status', 'idcurrency', 'namecurr', 'namepayment', 'firstname', 'lastname', 'totalitem', 'namecustomer', 'idunit', 'paidtoday', 'balance'
    ],
    idProperty: 'id'
});
var storeGridSalesOrderWOList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesOrderWOListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesorder/sales',
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

storeGridSalesOrderWOList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'option': 'entry_wo'
    };
});

Ext.define('MY.searchGridSalesOrderWOList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesOrderWOList',
    store: storeGridSalesOrderWOList,
    width: 180
});
// var smGridSalesOrderWOList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesOrderWOList.getSelection().length;
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

Ext.define('GridSalesOrderWOList', {
    itemId: 'GridSalesOrderWOList',
    id: 'GridSalesOrderWOList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesOrderWOList',
    store: storeGridSalesOrderWOList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp('customer_woform').setValue(selectedRecord.get('namecustomer'));
            Ext.getCmp('idsales_woform').setValue(selectedRecord.get('idsales'));
            Ext.getCmp('no_sales_order_woform').setValue(selectedRecord.get('no_sales_order'));

            var job_order_id = Ext.getCmp('job_order_id_woform').getValue();
            var token_tmp = Ext.getCmp('token_tmp_woform').getValue();

            var WorkOrderJobTabStore = Ext.getCmp('WorkOrderJobTab').getStore();
            var idunit = Ext.getCmp('cbUnitWOForm').getValue();

            //insert item to grid job
            Ext.Ajax.request({
                url: SITE_URL + 'sales/get_item_sales',
                method: 'GET',
                params: {
                    idsales: selectedRecord.get('idsales')
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);

                    var gridWO = Ext.getCmp('WorkOrderJobTab');

                    Ext.each(d.data, function(obj, i) {
                        // console.log(obj);

                        //  var recWO = new GridItemJobWOModel({
                        //     idinventory: obj.idinventory,
                        //     invno: obj.invno,
                        //     nameinventory: obj.nameinventory,
                        //     price: obj.price,
                        //     idunit:obj.idunit,
                        //     qty: obj.qty,
                        //     short_desc:obj.short_desc,
                        //     size: obj.size,
                        //     size_measurement: obj.size_measurement,
                        //     total: obj.price*obj.qty
                        // });
                        // gridWO.getStore().insert(0, recWO);
                        // updateGridJobWO();

                        Ext.Ajax.request({
                            url: SITE_URL + 'production/save_fg',
                            method: 'POST',
                            // async: false,
                            params: {
                                job_order_id: job_order_id,
                                token_tmp: token_tmp,
                                idinventory: obj.idinventory,
                                invno: obj.invno,
                                nameinventory: obj.nameinventory,
                                price: obj.price,
                                idunit: idunit,
                                qty: obj.qty,
                                short_desc: obj.short_desc,
                                size: obj.size,
                                size_measurement: obj.size_measurement,
                                total: obj.price * obj.qty
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);

                                WorkOrderJobTabStore.on('beforeload', function(store, operation, eOpts) {
                                    operation.params = {
                                        'extraparams': 'a.job_order_id:' + job_order_id
                                    };
                                });

                                WorkOrderJobTabStore.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    });


                    Ext.getCmp('WindowSaleOrderListIDnya').hide();
                    Ext.Msg.alert('Work Order', 'Data sales order berhasil disisipkan');
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });



        }
    }, {
        dataIndex: 'idsales',
        hidden: true,
        header: 'idsales'
    }, {
        dataIndex: 'idunit',
        hidden: true,
        header: 'idunit'
    }, {
        dataIndex: 'comments',
        hidden: true,
        header: 'comments'
    }, {
        header: 'No Sales',
        dataIndex: 'no_sales_order',
        minWidth: 150
    }, {
        header: 'Customer Name',
        flex: 1,
        dataIndex: 'namecustomer',
        minWidth: 150
    }, {
        header: 'Date Sales',
        dataIndex: 'date_sales',
        minWidth: 150
    }, {
        header: 'Total Item',
        dataIndex: 'totalitem',
        minWidth: 80,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Shipping Cost',
        dataIndex: 'freight',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Tax',
        dataIndex: 'tax',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Discount',
        dataIndex: 'disc',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }, {
        header: 'Total Amount',
        dataIndex: 'totalamount',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridSalesOrderWOList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesOrderWOList.load();
            }
        }
    }
});


Ext.define(dir_sys + 'production.WindowSaleOrderWoList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowSaleOrderList',
    id: 'WindowSaleOrderListIDnya',
    title: 'Choose Sales Order',
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
    height: sizeH - 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridSalesOrderWOList'
    }],
    listeners: {
        show: function() {
            // this.el.setStyle('top', '');
        }
    }
});