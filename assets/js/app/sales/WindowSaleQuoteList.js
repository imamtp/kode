Ext.define('GridSalesQuoteListModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idsales', 'idpayment', 'idtax', 'idemployee', 'idjournal', 'idcustomer', 'date_quote', 'no_sales_quote', 'shipto', 'subtotal', 'freight', 'tax', 'disc', 'totalamount', 'comments', 'userin', 'datein', 'status', 'idcurrency', 'namecurr', 'namepayment', 'firstname', 'lastname', 'totalitem', 'namecustomer', 'idunit', 'short_desc', 'rate', 'size_measurement'
    ],
    idProperty: 'id'
});
var storeGridSalesQuoteList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesQuoteListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesquotation/sales',
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

storeGridSalesQuoteList.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'option': 'not_in_salesorder'
    };
});

Ext.define('MY.searchGridSalesQuoteList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesQuoteList',
    store: storeGridSalesQuoteList,
    width: 180
});
// var smGridSalesQuoteList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesQuoteList.getSelection().length;
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

Ext.define('GridSalesQuoteList', {
    itemId: 'GridSalesQuoteListID',
    id: 'GridSalesQuoteListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesQuoteList',
    store: storeGridSalesQuoteList,
    loadMask: true,
    columns: [{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row){
            Ext.getCmp('no_sales_quote').setValue(selectedRecord.get('no_sales_quote'));
            Ext.getCmp('id_sales_quote_SalesOrder').setValue(selectedRecord.get('idsales'));

            var sales_quotation_date = Ext.getCmp('sales_quotation_date');
            sales_quotation_date.setValue(selectedRecord.get('date_quote'));

            var cbUnitEntrySalesOrder = Ext.getCmp('cbUnitEntrySalesOrder');
            cbUnitEntrySalesOrder.setValue(selectedRecord.get('idunit'));
            cbUnitEntrySalesOrder.setReadOnly(true);

            var customerSalesOrder = Ext.getCmp('customerSalesOrder');
            customerSalesOrder.setValue(selectedRecord.get('idcustomer'));
            customerSalesOrder.setReadOnly(true);

            var paymentSalesOrder = Ext.getCmp('paymentSalesOrder');
            paymentSalesOrder.setValue(selectedRecord.get('idpayment'));
            paymentSalesOrder.setReadOnly(true);

            var memoSalesOrder = Ext.getCmp('memoSalesOrder');
            memoSalesOrder.setValue('Sales Order');

            Ext.getCmp('cb_tax_id_so').setValue(selectedRecord.get('rate'));

            Ext.getCmp('shipaddressSalesOrder').setValue(selectedRecord.get('shipto'));
            Ext.getCmp('comboxcurrencySalesOrder').setValue(selectedRecord.get('idcurrency'));

            Ext.getCmp('subtotalSalesOrder').setValue(selectedRecord.get('subtotal'));
            // Ext.getCmp('angkutSalesOrder').setValue(selectedRecord.get('freight'));
            Ext.getCmp('totalPajakSalesOrder').setValue(selectedRecord.get('tax'));
            Ext.getCmp('totalSalesOrder').setValue(selectedRecord.get('totalamount'));

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

                         var recSO = new GridItemSalesOrderModel({
                                idsalesitem: obj.idsalesitem,
                                idinventory: obj.idinventory,
                                invno: obj.invno,
                                nameinventory: obj.nameinventory,
                                short_desc: obj.short_desc,
                                price: obj.price*1,
                                // idunit:obj.idsalesitem,
                                // assetaccount:obj.idsalesitem,
                                sku_no: obj.sku_no,
                                qty: obj.qty*1,
                                size:1,
                                size_measurement: obj.short_desc,
                                disc: obj.disc*1,
                                total: obj.total*1,
                                ratetax: obj.ratetax*1
    //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                        });

                        var gridSO = Ext.getCmp('EntrySalesOrder');
                        gridSO.getStore().insert(0, recSO);
                    });
                    
                    var gridSO = Ext.getCmp('EntrySalesOrder');
                    gridSO.getStore().insert(0, recSO);
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
        header: 'No Quotation',
        dataIndex: 'no_sales_quote',
        minWidth: 150
    }, {
        header: 'Customer Name',
        flex: 1,
        dataIndex: 'namecustomer',
        minWidth: 150
    }, {
        header: 'Date Quotation',
        dataIndex: 'date_quote',
        minWidth: 100
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
                xtype: 'searchGridSalesQuoteList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesQuoteList.load();
            }
        }
    }
});

var wGridSalesQuoteListPopup = Ext.create('widget.window', {
    id: 'wGridSalesQuoteListPopup',
    title: 'Choose Sales Quotation',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    width: 750,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype: 'GridSalesQuoteList'
        }, {
            xtype: 'hiddenfield',
            name: 'targetIdFilterSupplierCode',
            id: 'targetIdFilterSupplierCode'
        }, {
            xtype: 'hiddenfield',
            id: 'prefixWinSalesQuoteList',
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