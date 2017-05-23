var WindowEntryDeliveryOrder = Ext.create(dir_sys + 'sales.WindowEntryDeliveryOrder');

Ext.define('GridSalesOrderListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idsales','idpayment','idemployee','idjournal','idcustomer','date_sales','no_sales_order','shipto','subtotal','freight','tax','disc','totalamount','comments','userin','datein','status','idcurrency','namecurr','namepayment','firstname','lastname','totalitem','namecustomer','idunit','paidtoday','balance','rate','nametax','idtax'
    ],
    idProperty: 'id'
});
var storeGridSalesOrderList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesOrderListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/so_deliveryorder/sales',
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

Ext.define('MY.searchGridSalesOrderList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesOrderList',
    store: storeGridSalesOrderList,
    width: 180
});
// var smGridSalesOrderList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesOrderList.getSelection().length;
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

Ext.define('GridSalesOrderList', {
    itemId: 'GridSalesOrderList',
    id: 'GridSalesOrderList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesOrderList',
    store: storeGridSalesOrderList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            
            WindowEntryDeliveryOrder.show();

            var EntryDeliveryOrderStore = Ext.getCmp('EntryDeliveryOrder').getStore();
            EntryDeliveryOrderStore.removeAll();
            EntryDeliveryOrderStore.sync();

            Ext.getCmp('statusformSalesOrderGrid_do').setValue('input');

            Ext.getCmp('nojurnalSalesOrder_do').setValue(selectedRecord.get('no_sales_order'));
            Ext.getCmp('id_sales_order_do').setValue(selectedRecord.get('idsales'));

            var tanggalSalesOrder_do = Ext.getCmp('tanggalSalesOrder_do');
            tanggalSalesOrder_do.setValue(selectedRecord.get('date_sales'));
            tanggalSalesOrder_do.setReadOnly(true);
            
            var cbUnitEntryDeliveryOrder = Ext.getCmp('cbUnitEntryDeliveryOrder');
            cbUnitEntryDeliveryOrder.setValue(selectedRecord.get('idunit'));
            cbUnitEntryDeliveryOrder.setReadOnly(true);

            var customerSalesOrder_do = Ext.getCmp('customerSalesOrder_do');
            customerSalesOrder_do.setValue(selectedRecord.get('idcustomer'));
            customerSalesOrder_do.setReadOnly(true);

            var paymentSalesOrder_do = Ext.getCmp('paymentSalesOrder_do');
            paymentSalesOrder_do.setValue(selectedRecord.get('idpayment'));
            paymentSalesOrder_do.setReadOnly(true);

            var memoSalesOrder_do = Ext.getCmp('memoSalesOrder_do');
            memoSalesOrder_do.setValue('Delivery Order: '+selectedRecord.get('no_sales_order'));

            Ext.getCmp('shipaddressSalesOrder_do').setValue(selectedRecord.get('shipto'));
            Ext.getCmp('comboxcurrencySalesOrder_do').setValue(selectedRecord.get('idcurrency'));

            var cb_tax_id_do = Ext.getCmp('cb_tax_id_do');
            cb_tax_id_do.getStore().load(function() {
                console.log('rate:'+selectedRecord.get('idtax'));
               cb_tax_id_do.setValue(selectedRecord.get('idtax'));
            });
            
            // cb_tax_id_do.setValue('12313');

             Ext.getCmp('subtotalSalesOrder_do').setValue(renderNomor(selectedRecord.get('subtotal')));
             Ext.getCmp('angkutSalesOrder_do').setValue(renderNomor(selectedRecord.get('freight')));
             Ext.getCmp('totalPajakSalesOrder_do').setValue(renderNomor(selectedRecord.get('tax')));
             Ext.getCmp('totalSalesOrder_do').setValue(renderNomor(selectedRecord.get('totalamount')));
             Ext.getCmp('pembayaranSalesOrder_do').setValue(renderNomor(selectedRecord.get('paidtoday')));
             Ext.getCmp('sisaBayarSalesOrder_do').setValue(renderNomor(selectedRecord.get('balance')));

             var cb_sales_order_status_do = Ext.getCmp('cb_sales_order_status_do');
             cb_sales_order_status_do.setValue(1);
             cb_sales_order_status_do.setReadOnly(true);

             //insert item to grid
              Ext.Ajax.request({
                    url: SITE_URL + 'sales/get_item_sales',
                    method: 'GET',
                    params: {
                        idsales: selectedRecord.get('idsales')
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);

                        Ext.each(d.data, function(obj, i) {
                            console.log(obj);

                             var recDO = new GridItemDeliveryOrderModel({
                                    idsalesitem: obj.idsalesitem,
                                    idinventory: obj.idinventory,
                                    invno: obj.invno,
                                    nameinventory: obj.nameinventory,
                                    warehouse_code:obj.warehouse_code,
                                    price: obj.price*1,
                                    short_desc:obj.short_desc,
                                    // assetaccount:obj.idsalesitem,
                                    qty: obj.qty*1,
                                    disc: obj.disc*1,
                                    total: obj.total*1,
                                    ratetax: obj.ratetax*1,
                                    qty_kirim:1
        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            });

                            var gridDO = Ext.getCmp('EntryDeliveryOrder');
                            gridDO.getStore().insert(0, recDO);
                        });



                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            
            // Ext.getCmp('wGridSalesOrderListPopup').hide();
            
        }
    },{
        dataIndex:'idsales',
        hidden:true,
        header:'idsales'
    },{
        dataIndex:'idunit',
        hidden:true,
        header:'idunit'
    },{
        dataIndex:'idtax',
        hidden:true,
        header:'idtax'
    },{
        dataIndex:'comments',
        hidden:true,
        header:'comments'
    }, {
        header: 'No Sales',
        dataIndex: 'no_sales_order',
        minWidth: 150
    }, {
        header: 'Customer Name',
        flex:1,
        dataIndex: 'namecustomer',
        minWidth: 150
    }, {
        header: 'Date Sales',
        dataIndex: 'date_sales',
        minWidth: 150
    }, {
        header: 'Total Item',
        dataIndex: 'totalitem',
        minWidth: 80,xtype:'numbercolumn',align:'right'
    },{
        header: 'Shipping Cost',
        dataIndex: 'freight',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },{
        header: 'Total Tax',
        dataIndex: 'tax',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }, {
        header: 'Total Discount',
        dataIndex: 'disc',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }, {
        header: 'Total Amount',
        dataIndex: 'totalamount',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Searching: ', ' ',
            {
                xtype: 'searchGridSalesOrderList',
                text: 'Left Button',
                placeHolder:'Customer Name...'
            }
        ]
    },
    {
        xtype: 'pagingtoolbar',
        store: storeGridSalesOrderList, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridSalesOrderList.load();
            }
        }
    }
});


Ext.define(dir_sys+'sales.WindowSaleOrderList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowSaleOrderList',
    id:'WindowSaleOrderList',
    title: 'Choose Sales Order',
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
            xtype:'GridSalesOrderList'
    }],
    listeners: {
            show: function() {
                // this.el.setStyle('top', '');
            }
        }
});