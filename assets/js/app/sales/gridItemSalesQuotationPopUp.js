Ext.define('GridItemSalesQuotationModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem','idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','price','qty','total','ratetax','disc','short_desc','size','size_measurement'],
    idProperty: 'id'
});

var storeGridItemSalesQuotation = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSalesQuotationModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemSalesQuotation/sales',
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

//end store head

// storeGridItemSalesQuotation.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
    Ext.define('GridItemSelectSalesQuotationModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','short_desc'],
    idProperty: 'id'
});

var storeGridItemSelectSalesQuotation = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSelectSalesQuotationModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemSalesQuotation/sales',
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

// storeGridItemSelectSalesQuotation.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridItemSelectSalesQuotation', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemSelectSalesQuotation',
    store: storeGridItemSelectSalesQuotation,
    width: 180
});

var smGridItemSelectSalesQuotation = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemSelectSalesQuotation.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemSelectSalesQuotation').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSelectSalesQuotation').enable();
        }
    }
});

Ext.define('GridItemSelectSalesQuotation', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridItemSelectSalesQuotation,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemSelectSalesQuotationID',
    id: 'GridItemSelectSalesQuotationID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemSelectSalesQuotation',
    store: storeGridItemSelectSalesQuotation,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'assetaccount', dataIndex: 'assetaccount', hidden: true},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},
        {header: 'No SKU', dataIndex: 'sku_no', minWidth: 150},
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex:1},
        {header: 'Merk', dataIndex: 'brand_name', minWidth: 150},
        {header: 'Beli', dataIndex: 'cost', minWidth: 130,xtype:'numbercolumn',align:'right'},
        {header: 'Jual', dataIndex: 'sellingprice', minWidth: 130,xtype:'numbercolumn',align:'right'},
        {header: 'Stok Sekarang', dataIndex: 'qtystock', minWidth: 100,align:'right'},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemSelectSalesQuotation',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemSelectSalesQuotation')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
//                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
//                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));
// console.log(selectedRecord)
                              var recSQ = new GridItemSalesQuotationModel({
                                    idinventory: selectedRecord.get('idinventory'),
                                    invno: selectedRecord.get('invno'),
                                    nameinventory: selectedRecord.get('nameinventory'),
                                    price: selectedRecord.get('sellingprice')*1,
                                    idunit:idunit,
                                    assetaccount:selectedRecord.get('assetaccount'),
                                    qty: 1,
                                    size: 1,
                                    disc: 0,
                                    total: selectedRecord.get('sellingprice')*1,
                                    short_desc: selectedRecord.get('short_desc')
                                    // ratetax: Ext.getCmp('cb_tax_id_sq').getValue()
            //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                                });

                                var gridSQ = Ext.getCmp('EntrySalesQuotation');
                                gridSQ.getStore().insert(0, recSQ);
                                updateGridSalesQuotation();
                        
                               Ext.getCmp('wItemSelectSalesQuotationPopup').hide();

                            
                        }


                    }
                },'-',
                {
                    text: 'Tambah Barang',
                    hidden:true,
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
                    xtype: 'searchGridItemSelectSalesQuotation',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemSelectSalesQuotation, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemSelectSalesQuotation.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemSelectSalesQuotation = Ext.getCmp('formItemSelectSalesQuotation');
//            wItemSelectSalesQuotation.show();
//
//            formItemSelectSalesQuotation.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemSelectSalesQuotation/1/setup',
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
//            Ext.getCmp('statusformItemSelectSalesQuotation').setValue('edit');
        }
    }
});

var wItemSelectSalesQuotationPopup = Ext.create('widget.window', {
    id: 'wItemSelectSalesQuotationPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    modal:true,
    width: panelW-100,
    height: sizeH-100,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemSelectSalesQuotation'
    }]
});