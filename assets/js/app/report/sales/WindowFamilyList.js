Ext.define('GridFamilyListModel', {
    extend: 'Ext.data.Model',
    fields: ['no_pesanan','customer','item_name','qty_dipesan','tanggal'],
    idProperty: 'id'
});
var storeGridFamilyList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridFamilyListModel',
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

Ext.define('MY.searchGridFamilyList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridFamilyList',
    store: storeGridFamilyList,
    width: 180
});
// var smGridFamilyList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridFamilyList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterFamilyData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterFamilyData').enable();
//         }
//     }
// });

Ext.define('GridFamilyList', {
    itemId: 'GridFamilyListID',
    id: 'GridFamilyListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridFamilyList',
    store: storeGridFamilyList,    
    loadMask: true,
    columns:[/*{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterFamilyCode').getValue()).setValue(selectedRecord.get('no_pesanan'));
            Ext.getCmp('wGridFamilyListPopup').hide();
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
                xtype: 'searchGridFamilyList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridFamilyList.load();
            }
        }
    }
});

var wGridFamilyListPopup = Ext.create('widget.window', {
    id: 'wGridFamilyListPopup',
    title: 'Pilih Family',
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
        // xtype:'GridFamilyList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterFamilyCode',
        id: 'targetIdFilterFamilyCode'
    }]
});