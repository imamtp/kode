Ext.define('GridGroupListModel', {
    extend: 'Ext.data.Model',
    fields: ['no_pesanan','customer','item_name','qty_dipesan','tanggal'],
    idProperty: 'id'
});
var storeGridGroupList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridGroupListModel',
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

Ext.define('MY.searchGridGroupList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridGroupList',
    store: storeGridGroupList,
    width: 180
});
// var smGridGroupList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridGroupList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterGroupData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterGroupData').enable();
//         }
//     }
// });

Ext.define('GridGroupList', {
    itemId: 'GridGroupListID',
    id: 'GridGroupListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridGroupList',
    store: storeGridGroupList,    
    loadMask: true,
    columns:[/*{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterGroupCode').getValue()).setValue(selectedRecord.get('no_pesanan'));
            Ext.getCmp('wGridGroupListPopup').hide();
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
                xtype: 'searchGridGroupList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridGroupList.load();
            }
        }
    }
});

var wGridGroupListPopup = Ext.create('widget.window', {
    id: 'wGridGroupListPopup',
    title: 'Pilih Group',
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
        // xtype:'GridGroupList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterGroupCode',
        id: 'targetIdFilterGroupCode'
    }]
});