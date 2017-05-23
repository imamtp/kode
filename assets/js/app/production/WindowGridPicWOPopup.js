Ext.define('GridPicWOPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','code','firstname','lastname','user_id','group_id'],
    idProperty: 'id'
});

var storeGridPicWOPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPicWOPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/wo_person/production/',
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

// storeGridPicWOPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridPicWOPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPicWOPopup',
    store: storeGridPicWOPopup,
    width: 180
});

var smGridPicWOPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPicWOPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePicWOPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePicWOPopup').enable();
        }
    }
});

Ext.define('GridPicWOPopup', {
    itemId: 'GridPicWOPopupID',
    id: 'GridPicWOPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPicWOPopup',
    store: storeGridPicWOPopup,
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
                
                Ext.getCmp('pic_id_schedulewoform').setValue(selectedRecord.get('idemployee'));
                Ext.getCmp('pic_name_schedulewoform').setValue(selectedRecord.get('firstname')+' '+selectedRecord.get('lastname'));
                Ext.getCmp('WindowGridPicWOPopup').hide();
                
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
                    xtype: 'searchGridPicWOPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPicWOPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridPicWOPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

Ext.define(dir_sys + 'production.WindowGridPicWOPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowGridPicWOPopup',
    id: 'WindowGridPicWOPopup',
    title: 'Person in Charge List',
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
            xtype:'GridPicWOPopup'
    }]
});