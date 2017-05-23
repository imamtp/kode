Ext.define('GridSalesOrderListModel', {
    extend: 'Ext.data.Model',
    fields: ['no_pesanan','customer','item_name','qty_dipesan','tanggal'],
    idProperty: 'id'
});
var storeGridSalesOrderList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesOrderListModel',
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
//                 Ext.getCmp('btnDeleteMasterSalesOrderData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSalesOrderData').enable();
//         }
//     }
// });

Ext.define('GridSalesOrderList', {
    itemId: 'GridSalesOrderListID',
    id: 'GridSalesOrderListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesOrderList',
    store: storeGridSalesOrderList,    
    loadMask: true,
    columns:[/*{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterSalesOrderCode').getValue()).setValue(selectedRecord.get('no_pesanan'));
            Ext.getCmp('wGridSalesOrderListPopup').hide();
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
                xtype: 'searchGridSalesOrderList',
                text: 'Left Button'
            }
        ]
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

var wGridSalesOrderListPopup = Ext.create('widget.window', {
    id: 'wGridSalesOrderListPopup',
    title: 'Pilih SalesOrder',
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
        // xtype:'GridSalesOrderList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterSalesOrderCode',
        id: 'targetIdFilterSalesOrderCode'
    }]
});