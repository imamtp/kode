Ext.define('GridDeliveryOrderListModel', {
    extend: 'Ext.data.Model',
    fields: ['no_pesanan','customer','item_name','qty_dipesan','tanggal'],
    idProperty: 'id'
});
var storeGridDeliveryOrderList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDeliveryOrderListModel',
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

Ext.define('MY.searchGridDeliveryOrderList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDeliveryOrderList',
    store: storeGridDeliveryOrderList,
    width: 180
});
// var smGridDeliveryOrderList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridDeliveryOrderList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterDeliveryOrderData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterDeliveryOrderData').enable();
//         }
//     }
// });

Ext.define('GridDeliveryOrderList', {
    itemId: 'GridDeliveryOrderListID',
    id: 'GridDeliveryOrderListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDeliveryOrderList',
    store: storeGridDeliveryOrderList,    
    loadMask: true,
    columns:[/*{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterDeliveryOrderCode').getValue()).setValue(selectedRecord.get('no_pesanan'));
            Ext.getCmp('wGridDeliveryOrderListPopup').hide();
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
                xtype: 'searchGridDeliveryOrderList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridDeliveryOrderList.load();
            }
        }
    }
});

var wGridDeliveryOrderListPopup = Ext.create('widget.window', {
    id: 'wGridDeliveryOrderListPopup',
    title: 'Pilih DeliveryOrder',
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
        // xtype:'GridDeliveryOrderList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterDeliveryOrderCode',
        id: 'targetIdFilterDeliveryOrderCode'
    }]
});