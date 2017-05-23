Ext.define('GridInventoryIsBuyListModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount'],
    idProperty: 'id'
});

var storeGridInventoryIsBuyList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryIsBuyListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryAll/inventory/',
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

storeGridInventoryIsBuyList.on('beforeload',function(store, operation,eOpts){
    operation.params={
           'extraparams': 'a.idunit:'+idunit +',a.isbuy:1' 
    }
});
              
Ext.define('MY.searchGridInventoryIsBuyList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryIsBuyList',
    store: storeGridInventoryIsBuyList,
    width: 180
});

var smGridInventoryIsBuyList = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryIsBuyList.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryIsBuyList').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryIsBuyList').enable();
        }
    }
});

Ext.define('GridInventoryIsBuyList', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridInventoryIsBuyList,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventoryIsBuyListID',
    id: 'GridInventoryIsBuyListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryIsBuyList',
    store: storeGridInventoryIsBuyList,
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
                var recPR = new mPurchaseGridStore({
                    idinventory: selectedRecord.get('idinventory'),
                    invno: selectedRecord.get('invno'),
                    nameinventory: selectedRecord.get('nameinventory'),
                    price: selectedRecord.get('cost'),
                    idunit:idunit,
                    qty: 1,
                    disc: 0,
                    total: selectedRecord.get('cost'),
                    ratetax: 0
//                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });
                var gridPR = Ext.getCmp('EntryPurchaseRequisition');
                gridPR.getStore().insert(0, recPR);
                updateGridRequisition();
            }
        },
        {header:'idinventory', dataIndex:'idinventory',hidden:true},
        {header:'No SKU', dataIndex:'sku'},
        {header:'Product Code', dataIndex:'invno', minWidth:200},
        {header:'Product Name', dataIndex:'nameinventory', minWidth:300},
        {header:'Price', dataIndex:'cost', minWidth:200}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                
                {
                    text: 'Tambah Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        showInputInv();     
                        Ext.getCmp('fieldsetInvBuy').setDisabled(true);
                        Ext.getCmp('fieldsetInvSell').setDisabled(true);                   
                        Ext.getCmp('fieldsetInvPersediaan').setDisabled(true);
                        storeGridAccInv.removeAll();
                        storeGridAccInv.sync();

                        Ext.getCmp('cbpersediaan').setDisabled(true);
                        Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').hide();
                        Ext.getCmp('fieldsetInvPersediaan').hide();
                        Ext.getCmp('datebuy').hide();                        
                        Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(true);
                        Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(true);

                        Ext.getCmp('inputdaripurchase').setValue('true');
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventoryIsBuyList',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryIsBuyList, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridInventoryIsBuyList.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formInventoryIsBuyList = Ext.getCmp('formInventoryIsBuyList');
//            wInventoryIsBuyList.show();
//
//            formInventoryIsBuyList.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/InventoryIsBuyList/1/setup',
//                params: {
//                    extraparams: 'a.idtax:' + record.data.idtax
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })
//
////            
////            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformInventoryIsBuyList').setValue('edit');
        }
    }
});

var wInventoryIsBuyListPopup = Ext.create('widget.window', {
    id: 'wInventoryIsBuyListPopup',
    title: 'Pilih Barang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    modal:true,
    width: 730,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridInventoryIsBuyList'
    }]
});