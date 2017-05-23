Ext.define('GridItemReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','nameinventory','cost','sellingprice','qtystock','qtyretur','ratetax','returnamount'],
    idProperty: 'id'
});

var storeGridItemReturn = Ext.create('Ext.data.Store', {
    model: 'GridItemReturnModel'
});

////////////////////////////////////////////////////////

Ext.define('GridInvReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','nameinventory','cost','sellingprice','qtystock','qtyretur'],
    idProperty: 'id'
});

var storeGridInvReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInvReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventoryall/inventory',
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

// storeGridInvReturn.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'd.idunit:'+Ext.getCmp('idunitReturn').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridItemReturn', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemReturn',
    store: storeGridInvReturn,
    width: 180
});

var smGridItemReturn = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemReturn.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemReturn').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemReturn').enable();
        }
    }
});

Ext.define('GridItemReturn', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridItemReturn,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemReturnID',
    id: 'GridItemReturnID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemReturn',
    store: storeGridInvReturn,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150},
        {header: 'Beli', dataIndex: 'cost', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Jual', dataIndex: 'sellingprice', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Stok', dataIndex: 'qtystock', minWidth: 50,align:'right'},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemReturn',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemReturn')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
//                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
//                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));

                            var recPO = new GridItemReturnModel({
                                idinventory: selectedRecord.get('idinventory'),
                                invno: selectedRecord.get('invno'),
                                nameinventory: selectedRecord.get('nameinventory'),
                                cost: selectedRecord.get('cost'),
                                qtystock: selectedRecord.get('qtystock'),
                                // disc: 0,
                                returnamount: selectedRecord.get('cost')*1*1,
                                qtyretur:1,
                                ratetax: 0
        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            });

                            var gridPO = Ext.getCmp('EntryReturn');
                            gridPO.getStore().insert(0, recPO);
                            updateGridReturn('general');
                    
                           Ext.getCmp('wItemReturnPopup').hide();
                        }


                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemReturn',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInvReturn, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemReturn.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemReturn = Ext.getCmp('formItemReturn');
//            wItemReturn.show();
//
//            formItemReturn.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemReturn/1/setup',
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
//            Ext.getCmp('statusformItemReturn').setValue('edit');
        }
    }
});

var wItemReturnPopup = Ext.create('widget.window', {
    id: 'wItemReturnPopup',
    title: 'Pilih Barang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 580,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemReturn'
    }]
});

///////////////INVENTORY BY PO ////////////////////////


Ext.define('GridInvPOReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','nopurchase','invno','nameinventory','cost','sellingprice','qtystock','qtyretur'],
    idProperty: 'id'
});

var storeGridInvPOReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInvPOReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryPO/inventory',
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

// storeGridInvPOReturn.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'd.idunit:'+Ext.getCmp('idunitReturn').getValue()
//                   };
//               });
              
Ext.define('MY.searchGridItemPOReturn', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemPOReturn',
    store: storeGridInvPOReturn,
    width: 180
});

var smGridItemPOReturn = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPOReturn.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemPOReturn').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemPOReturn').enable();
        }
    }
});

Ext.define('GridItemPOReturn', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridItemReturn,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemPOReturnID',
    id: 'GridItemPOReturnID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemPOReturn',
    store: storeGridInvPOReturn,
    loadMask: true,
    columns: [
          {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
          {header: 'nopurchase', dataIndex: 'nopurchase', hidden: true},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150},
        {header: 'Beli', dataIndex: 'cost', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Jual', dataIndex: 'sellingprice', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Stok', dataIndex: 'qtystock', minWidth: 50,align:'right'},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemPOReturn',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemPOReturn')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
//                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
//                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));

                            var recPO = new GridItemReturnModel({
                                idinventory: selectedRecord.get('idinventory'),
                                nopurchase: selectedRecord.get('nopurchase'),
                                invno: selectedRecord.get('invno'),
                                nameinventory: selectedRecord.get('nameinventory'),
                                cost: selectedRecord.get('cost'),
                                qtystock: selectedRecord.get('qtystock'),
                                // disc: 0,
                                returnamount: selectedRecord.get('cost')*1*1,
                                qtyretur:1,
                                ratetax: 0
        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            });

                            var gridPO = Ext.getCmp('EntryReturn');
                            gridPO.getStore().insert(0, recPO);
                            updateGridReturn('general');
                    
                           Ext.getCmp('wItemPOReturnPopup').hide();
                        }


                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemPOReturn',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInvPOReturn, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemPOReturn.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemReturn = Ext.getCmp('formItemReturn');
//            wItemReturn.show();
//
//            formItemReturn.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemReturn/1/setup',
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
//            Ext.getCmp('statusformItemReturn').setValue('edit');
        }
    }
});

var wItemPOReturnPopup = Ext.create('widget.window', {
    id: 'wItemPOReturnPopup',
    title: 'Pilih Barang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 580,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemPOReturn'
    }]
});

//////////////END INVENTORY BY PO ////////////////////////////////////