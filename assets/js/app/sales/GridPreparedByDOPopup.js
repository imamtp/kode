Ext.define('GridPreparedByDOPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','code','firstname','lastname','user_id','group_id'],
    idProperty: 'id'
});

var storeGridPreparedByDOPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPreparedByDOPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesman/sales/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

// storeGridPreparedByDOPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridPreparedByDOPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPreparedByDOPopup',
    store: storeGridPreparedByDOPopup,
    width: 180
});

var smGridPreparedByDOPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPreparedByDOPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePreparedByDOPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePreparedByDOPopup').enable();
        }
    }
});

Ext.define(dir_sys + 'sales.GridPreparedByDOPopup', {
    itemId: 'GridPreparedByDOPopupID',
    id: 'GridPreparedByDOPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPreparedByDOPopup',
    store: storeGridPreparedByDOPopup,
    loadMask: true,
    columns: [
        {
            text: 'Pilih',
            width: 45,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                
                Ext.getCmp('salesman_id_so').setValue(selectedRecord.get('idemployee'));
                Ext.getCmp('salesman_name_so').setValue(selectedRecord.get('firstname')+' '+selectedRecord.get('lastname'));
                Ext.getCmp('wPreparedByDOPopupPopup').hide();
                
            }
        },
        {header: 'idemployee', dataIndex: 'idemployee',hidden:true},
        {header: 'user_id', dataIndex: 'user_id',hidden:true},
        {header: 'Personil Code', dataIndex: 'code',minWidth:130},
        {header: 'First Name', dataIndex: 'firstname',minWidth:250},
        {header: 'Last Name', dataIndex: 'lastname',minWidth:250,flex:1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPreparedByDOPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPreparedByDOPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridPreparedByDOPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

// Ext.define(dir_sys + 'sales.GridPreparedByDOPopup', {
//      extend: 'widget.window',
// });
var wPreparedByDOPopupPopup = Ext.create('widget.window', {
    id: 'wPreparedByDOPopupPopup',
    title: 'Prepared By',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 870,
    modal:true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridPreparedByDOPopup'
    }]
});