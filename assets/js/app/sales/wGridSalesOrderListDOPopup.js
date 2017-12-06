Ext.define('GridSalesOrderListDOModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idsales', 'idpayment', 'idtax', 'idemployee', 'idjournal', 'statuswo','idcustomer', 'date_sales', 'no_sales_order', 'shipto', 'subtotal', 'freight', 'tax', 'disc', 'totalamount', 'comments', 'userin', 'datein', 'status', 'idcurrency', 'namecurr', 'namepayment', 'firstname', 'lastname', 'totalitem', 'namecustomer', 'idunit', 'short_desc', 'rate', 'size_measurement'
    ],
    idProperty: 'id'
});
var storeGridSalesOrderListDO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesOrderListDOModel',
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

storeGridSalesOrderListDO.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'option': 'entry_delivery_order'
    };
});

Ext.define('MY.searchGridSalesOrderListDO', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesOrderListDO',
    store: storeGridSalesOrderListDO,
    width: 180
});
// var smGridSalesOrderListDO = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesOrderListDO.getSelection().length;
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

Ext.define('GridSalesOrderListDO', {
    itemId: 'GridSalesOrderListDOID',
    id: 'GridSalesOrderListDOID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesOrderListDO',
    store: storeGridSalesOrderListDO,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 55,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row){
            Ext.getCmp('no_sales_order_do').setValue(selectedRecord.get('no_sales_order'));
            Ext.getCmp('id_sales_order_do').setValue(selectedRecord.get('idsales'));
            Ext.getCmp('tanggalSalesOrder_do').setValue(selectedRecord.get('date_sales'));
            Ext.getCmp('customerSalesOrder_do').setValue(selectedRecord.get('namecustomer'));
            Ext.getCmp('memoSalesOrder_do').setValue('Delivery Order: '+selectedRecord.get('no_sales_order'));

            // var sales_quotation_date = Ext.getCmp('sales_quotation_date');
            // sales_quotation_date.setValue(selectedRecord.get('date_sales'));

            // var cbUnitEntrySalesOrder = Ext.getCmp('cbUnitEntrySalesOrder');
            // cbUnitEntrySalesOrder.setValue(selectedRecord.get('idunit'));
            // cbUnitEntrySalesOrder.setReadOnly(true);

            // var customerSalesOrder = Ext.getCmp('customerSalesOrder');
            // customerSalesOrder.setValue(selectedRecord.get('idcustomer'));
            // customerSalesOrder.setReadOnly(true);

            // var paymentSalesOrder = Ext.getCmp('paymentSalesOrder');
            // paymentSalesOrder.setValue(selectedRecord.get('idpayment'));
            // paymentSalesOrder.setReadOnly(true);

            // var memoSalesOrder = Ext.getCmp('memoSalesOrder');
            // memoSalesOrder.setValue('Sales Order');

            // Ext.getCmp('cb_tax_id_so').setValue(selectedRecord.get('rate'));

            // // Ext.getCmp('shipaddressSalesOrder').setValue(selectedRecord.get('shipto'));
            // // Ext.getCmp('comboxcurrencySalesOrder').setValue(selectedRecord.get('idcurrency'));

            // Ext.getCmp('subtotalSalesOrder').setValue(selectedRecord.get('subtotal'));
            // // Ext.getCmp('angkutSalesOrder').setValue(selectedRecord.get('freight'));
            // Ext.getCmp('totalPajakSalesOrder').setValue(selectedRecord.get('tax'));
            // Ext.getCmp('totalSalesOrder').setValue(selectedRecord.get('totalamount'));

    //         var storeGridItemSalesOrder = Ext.getCmp('EntrySalesOrder').getStore();
    //         Ext.each(storeGridItemSalesOrder.getRange(), function() { storeGridItemSalesOrder.removeAt(0) });

    //         Ext.Ajax.request({
    //             url: SITE_URL + 'sales/get_item_sales',
    //             method: 'GET',
    //             params: {
    //                 idsales: selectedRecord.get('idsales')
    //             },
    //             success: function(form, action) {
    //                 var d = Ext.decode(form.responseText);

    //                 Ext.each(d.data, function(obj, i) {
    //                     console.log(obj);

    //                      var recSO = new GridItemSalesOrderModel({
    //                             idsalesitem: obj.idsalesitem,
    //                             idinventory: obj.idinventory,
    //                             invno: obj.invno,
    //                             nameinventory: obj.nameinventory,
    //                             short_desc: obj.short_desc,
    //                             price: obj.price*1,
    //                             // idunit:obj.idsalesitem,
    //                             // assetaccount:obj.idsalesitem,
    //                             sku_no: obj.sku_no,
    //                             qty: obj.qty*1,
    //                             size:1,
    //                             size_measurement: obj.short_desc,
    //                             disc: obj.disc*1,
    //                             total: obj.total*1,
    //                             ratetax: obj.ratetax*1
    // //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
    //                     });

    //                     var gridSO = Ext.getCmp('EntrySalesOrder');
    //                     gridSO.getStore().insert(0, recSO);
    //                 });
                    
    //                 // var gridSO = Ext.getCmp('EntrySalesOrder');
    //                 // gridSO.getStore().insert(0, recSO);
    //             }
    //         });

            Ext.getCmp('wGridSalesOrderListDOPopup').hide();
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
        header: 'No Order',
        dataIndex: 'no_sales_order',
        minWidth: 150
    }, {
        header: 'Nama Konsumen',
        flex: 1,
        dataIndex: 'namecustomer',
        minWidth: 150
    }, {
        header: 'Tanggal Order',
        dataIndex: 'date_sales',
        minWidth: 150
    }, {
        header: 'Jumlah Barang',
        dataIndex: 'totalitem',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    },{
        header: 'Sisa Pengiriman',
        dataIndex: 'totalitem',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right'
    },
    {
            header: 'Status Production',
        // hidden:true,
        dataIndex: 'statuswo',
        minWidth: 150,
        xtype: 'numbercolumn',
        align: 'right',
        renderer: function(value) {
            return customColumnStatus(arrWorkOrderStatus, value);
        }
    }
    //  {
    //     header: 'Biaya Kirim',
    //     dataIndex: 'freight',
    //     minWidth: 150,
    //     xtype: 'numbercolumn',
    //     align: 'right'
    // }, {
    //     header: 'Total Pajak',
    //     dataIndex: 'tax',
    //     // hidden:true,
    //     minWidth: 150,
    //     xtype: 'numbercolumn',
    //     align: 'right'
    // }, {
    //     header: 'Total Diskon',
    //     hidden:true,
    //     dataIndex: 'disc',
    //     minWidth: 150,
    //     xtype: 'numbercolumn',
    //     align: 'right'
    // }, {
    //     header: 'Total Pembayaran',
    //     dataIndex: 'totalamount',
    //     minWidth: 150,
    //     xtype: 'numbercolumn',
    //     align: 'right'
    // }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            // '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridSalesOrderListDO',
                text: 'Left Button'
            }
        ]
    },
        {
            xtype: 'pagingtoolbar',
            store: storeGridSalesOrderListDO, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesOrderListDO.load();
            }
        }
    }
});

Ext.define(dir_sys + 'sales.wGridSalesOrderListDOPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.wGridSalesOrderListDOPopup',
// var wGridSalesOrderListDOPopup = Ext.create('widget.window', {
    id: 'wGridSalesOrderListDOPopup',
    title: 'Pilih Data Penjualan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    width: panelW,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [
        {
            xtype: 'GridSalesOrderListDO'
        }, {
            xtype: 'hiddenfield',
            name: 'targetIdFilterSupplierCode',
            id: 'targetIdFilterSupplierCode'
        }, {
            xtype: 'hiddenfield',
            id: 'prefixWinSalesOrderListDO',
        },
        /* {
                xtype: 'hiddenfield',
                id: 'idSupplierFieldId'
            }, {
                xtype: 'hiddenfield',
                id: 'codeSupplierFieldId'
            }, {
                xtype: 'hiddenfield',
                id: 'nameSupplierFieldId'
            }*/
    ]
});