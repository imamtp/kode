Ext.define('GridItemPurchaseModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount'],
    idProperty: 'id'
});

var storeGridItemPurchase = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemPurchase',
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

storeGridItemPurchase.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
                  };
              });
              
Ext.define('MY.searchGridItemPurchase', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemPurchase',
    store: storeGridItemPurchase,
    width: 180
});

var smGridItemPurchase = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPurchase.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemPurchase').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemPurchase').enable();
        }
    }
});

Ext.define('GridItemPurchase', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridItemPurchase,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemPurchaseID',
    id: 'GridItemPurchaseID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemPurchase',
    store: storeGridItemPurchase,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'assetaccount', dataIndex: 'assetaccount', hidden: true},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150},
        {header: 'Beli', dataIndex: 'cost', minWidth: 130,xtype:'numbercolumn',align:'right'},
        {header: 'Jual', dataIndex: 'sellingprice', minWidth: 130,xtype:'numbercolumn',align:'right'},
        {header: 'Stok Sekarang', dataIndex: 'qtystock', minWidth: 50,align:'right'},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemPurchase',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemPurchase')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
//                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
//                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));

                            //cek dulu apakah assetaccount sudah terdefisinis di inventoryunit
                            var idunit = Ext.getCmp('cbUnitEntryPurchase').getValue();
                             Ext.Ajax.request({
                                url: SITE_URL + 'purchase/cekAssetAccount',
                                method: 'POST',
                                params: {
                                    idinventory: selectedRecord.get('idinventory'),
                                    idunit: idunit
                                },
                                success: function(form, action) {

                                    var d = Ext.decode(form.responseText);
                                    if (!d.success)
                                    {
                                        wFormSelectAssetPurchase.show();
                                        Ext.getCmp('wFormSelectAssetPurchase').setTitle('Pilih Akun Asset (harta) Untuk Barang '+selectedRecord.get('nameinventory'));
                                    } else {
                                       var recPO = new mPurchaseGridStore({
                                            idinventory: selectedRecord.get('idinventory'),
                                            invno: selectedRecord.get('invno'),
                                            nameinventory: selectedRecord.get('nameinventory'),
                                            price: selectedRecord.get('cost'),
                                            idunit:idunit,
                                            assetaccount:selectedRecord.get('assetaccount'),
                                            qty: 1,
                                            disc: 0,
                                            total: selectedRecord.get('cost'),
                                            ratetax: 0
                    //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                                        });

                                        var gridPO = Ext.getCmp('EntryPurchase');
                                        gridPO.getStore().insert(0, recPO);
                                        updateGridPurchase('general');
                                
                                       Ext.getCmp('wItemPurchasePopup').hide();
                                    }

                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });

                            
                        }


                    }
                },'-',
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
                    xtype: 'searchGridItemPurchase',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemPurchase, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemPurchase.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemPurchase = Ext.getCmp('formItemPurchase');
//            wItemPurchase.show();
//
//            formItemPurchase.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemPurchase/1/setup',
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
//            Ext.getCmp('statusformItemPurchase').setValue('edit');
        }
    }
});

var wItemPurchasePopup = Ext.create('widget.window', {
    id: 'wItemPurchasePopup',
    title: 'Pilih Barang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 730,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemPurchase'
    }]
});