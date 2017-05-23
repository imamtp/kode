Ext.define('GridWarehouseListModel', {
    extend: 'Ext.data.Model',
    fields: ['warehouse_id','warehouse_code','warehouse_address','warehouse_cogs_standard','warehouse_type','warehouse_desc'],
    idProperty: 'id'
});
var storeGridWarehouseList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridWarehouseListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterWarehouse/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'warehouse_code',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridWarehouseList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridWarehouseList',
    store: storeGridWarehouseList,
    width: 180
});
// var smGridWarehouseList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridWarehouseList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterProductData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterProductData').enable();
//         }
//     }
// });

Ext.define('GridWarehouseList', {
    itemId: 'GridWarehouseListID',
    id: 'GridWarehouseListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridWarehouseList',
    store: storeGridWarehouseList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterWarehouseCode').getValue()).setValue(selectedRecord.get('warehouse_code'));
            Ext.getCmp('wGridWarehouseListPopup').hide();
        }
    }, {
        header: 'warehouse_code',
        dataIndex: 'warehouse_code',
    }, {
        header: 'Address',
        dataIndex: 'warehouse_address',
    }, {
        header: 'COGS Standard',
        dataIndex: 'warehouse_cogs_standard'
    }, {
        header: 'Description',
        dataIndex: 'warehouse_desc'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridWarehouseList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridWarehouseList.load();
            }
        }
    }
});

var wGridWarehouseListPopup = Ext.create('widget.window', {
    id: 'wGridWarehouseListPopup',
    title: 'Pilih Warehouse',
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
        xtype:'GridWarehouseList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterWarehouseCode',
        id: 'targetIdFilterWarehouseCode'
    }]
});