Ext.define('GridReceivedByPOPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee','code','firstname','lastname','user_id','group_id'],
    idProperty: 'id'
});

var storeGridReceivedByPOPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReceivedByPOPopupModel',
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

// storeGridReceivedByPOPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridReceivedByPOPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReceivedByPOPopup',
    store: storeGridReceivedByPOPopup,
    width: 180
});

var smGridReceivedByPOPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridReceivedByPOPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteReceivedByPOPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteReceivedByPOPopup').enable();
        }
    }
});

Ext.define('GridReceivedByPOPopup', {
    itemId: 'GridRequestByPRPopupID',
    id: 'GridRequestByPRPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReceivedByPOPopup',
    store: storeGridReceivedByPOPopup,
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
                
                Ext.getCmp('requestbyid_pr').setValue(selectedRecord.get('idemployee'));
                Ext.getCmp('requestby_pr').setValue(selectedRecord.get('firstname')+' '+selectedRecord.get('lastname'));
                Ext.getCmp('WindowGridRequestByPRPopup').hide();
                
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
                    xtype: 'searchGridReceivedByPOPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridReceivedByPOPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridReceivedByPOPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

Ext.define(dir_sys + 'purchase2.WindowGridRequestByPRPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowGridRequestByPRPopup',
    id: 'WindowGridRequestByPRPopup',
    title: 'Requested By',
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
            xtype:'GridReceivedByPOPopup'
    }]
});