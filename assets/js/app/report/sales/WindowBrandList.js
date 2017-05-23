Ext.define('GridBrandListModel', {
    extend: 'Ext.data.Model',
    fields: ['brand_id','brand_name','brand_desc'],
    idProperty: 'id'
});
var storeGridBrandList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBrandListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterBrand/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'brand_name',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridBrandList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBrandList',
    store: storeGridBrandList,
    width: 180
});
// var smGridBrandList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridBrandList.getSelection().length;
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

Ext.define('GridBrandList', {
    itemId: 'GridBrandListID',
    id: 'GridBrandListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridBrandList',
    store: storeGridBrandList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterBrandId').getValue()).setValue(selectedRecord.get('brand_id'));
            Ext.getCmp('wGridBrandListPopup').hide();
        }
    }, {
        header: 'brand_id',
        dataIndex: 'brand_id',
        hidden: true
    }, {
        header: 'Brand Name',
        dataIndex: 'brand_name',
    }, {
        header: 'Description',
        dataIndex: 'brand_desc'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridBrandList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridBrandList.load();
            }
        }
    }
});

var wGridBrandListPopup = Ext.create('widget.window', {
    id: 'wGridBrandListPopup',
    title: 'Pilih Produk',
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
        xtype:'GridBrandList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterBrandId',
        id: 'targetIdFilterBrandId'
    }]
});