Ext.define('GridProductListModel', {
    extend: 'Ext.data.Model',
    fields: ['product_id','product_code','product_name','product_desc', 'basic_uom', 'second_uom', 'supplier_id', 'grade', 'namesupplier'],
    idProperty: 'id'
});
var storeGridProductList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridProductListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MasterProductData/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'product_name',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridProductList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridProductList',
    store: storeGridProductList,
    width: 180
});
// var smGridProductList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridProductList.getSelection().length;
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

Ext.define('GridProductList', {
    itemId: 'GridProductListID',
    id: 'GridProductListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridProductList',
    store: storeGridProductList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterProductCode').getValue()).setValue(selectedRecord.get('product_code'));
            Ext.getCmp('wGridProductListPopup').hide();
        }
    }, {
        header: 'product_code',
        dataIndex: 'product_code',
        hidden: true
    }, {
        header: 'Product Name',
        dataIndex: 'product_name',
    }, {
        header: 'Grade',
        dataIndex: 'grade'
    }, {
        header: 'Supplier',
        dataIndex: 'namesupplier'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridProductList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridProductList.load();
            }
        }
    }
});

var wGridProductListPopup = Ext.create('widget.window', {
    id: 'wGridProductListPopup',
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
        xtype:'GridProductList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterProductCode',
        id: 'targetIdFilterProductCode'
    }]
});