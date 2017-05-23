Ext.define('GridSalesInvoiceListModel', {
    extend: 'Ext.data.Model',
    fields: ['no_pesanan','customer','item_name','qty_dipesan','tanggal'],
    idProperty: 'id'
});
var storeGridSalesInvoiceList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesInvoiceListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/sales',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'tanggal',
        direction: 'DESC'
    }]
});

Ext.define('MY.searchGridSalesInvoiceList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesInvoiceList',
    store: storeGridSalesInvoiceList,
    width: 180
});
// var smGridSalesInvoiceList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesInvoiceList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterSalesInvoiceData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSalesInvoiceData').enable();
//         }
//     }
// });

Ext.define('GridSalesInvoiceList', {
    itemId: 'GridSalesInvoiceListID',
    id: 'GridSalesInvoiceListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesInvoiceList',
    store: storeGridSalesInvoiceList,    
    loadMask: true,
    columns:[/*{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterSalesInvoiceCode').getValue()).setValue(selectedRecord.get('no_pesanan'));
            Ext.getCmp('wGridSalesInvoiceListPopup').hide();
        }
    }, {
        header: 'no_pesanan',
        dataIndex: 'no_pesanan',
        hidden: true
    }, {
        header: 'Customer',
        dataIndex: 'customer',
    }, {
        header: 'Item Name',
        dataIndex: 'item_name'
    }, {
        header: 'Qty Dipesan',
        dataIndex: 'qty_dipesan'
    }, {
        header: 'Tanggal',
        dataIndex: 'tanggal'
    }*/],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridSalesInvoiceList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridSalesInvoiceList.load();
            }
        }
    }
});

var wGridSalesInvoiceListPopup = Ext.create('widget.window', {
    id: 'wGridSalesInvoiceListPopup',
    title: 'Pilih SalesInvoice',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    width: 450,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        // xtype:'GridSalesInvoiceList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterSalesInvoiceCode',
        id: 'targetIdFilterSalesInvoiceCode'
    }]
});