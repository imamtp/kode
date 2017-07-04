// storeGridItemPurchaseRequisition.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
Ext.define('GridItemGridDetailInventoryModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'totalitem', 'sku_no', 'satuan_pertama', 'invno', 'nameinventory', 'description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy', 'namaunit', 'brand_name', 'brand_id', 'sku', 'totalstock', 'stock_kedua', 'satuan_kedua'
    ],
    idProperty: 'id'
});

var storeGridItemGridDetailInventory = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemGridDetailInventoryModel',
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

// storeGridItemGridDetailInventory.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });

Ext.define('MY.searchGridItemGridDetailInventory', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemGridDetailInventory',
    store: storeGridItemGridDetailInventory,
    width: 180
});

var smGridItemGridDetailInventory = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemGridDetailInventory.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemGridDetailInventory').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemGridDetailInventory').enable();
        }
    }
});

Ext.define('GridItemGridDetailInventory', {
    itemId: 'GridItemGridDetailInventory',
    id: 'GridItemGridDetailInventory',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemGridDetailInventory',
    store: storeGridItemGridDetailInventory,
    loadMask: true,
    columns: [{
            header: 'idinventory',
            dataIndex: 'idinventory',
            hidden: true
        },
        {
            header: 'No SKU',
            dataIndex: 'sku_no',
            minWidth: 220
        },
        {
            header: 'No Barang',
            dataIndex: 'invno',
            minWidth: 120
        },
        // {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
        {
            header: 'Inventory Name',
            dataIndex: 'nameinventory',
            minWidth: 300,
            flex: 1
        },
        {
            header: 'Brand',
            hidden: true,
            dataIndex: 'brand_name',
            minWidth: 200
        },
        {
            header: 'Total Stok',
            dataIndex: 'totalstock',
            minWidth: 120,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                if (value === null) {
                    return 0;
                } else {
                    return value; //renderNomor(value);
                }
            }
        },
        {
            header: 'Satuan',
            dataIndex: 'satuan_pertama',
            // hidden: true,
            minWidth: 100
        }, {
            header: 'Stock #2',
            dataIndex: 'stock_kedua',
            // hidden: true,
            minWidth: 70,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Satuan #2',
            dataIndex: 'satuan_kedua',
            minWidth: 100
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                text: 'Detail',
                iconCls: 'edit-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridItemGridDetailInventory')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {
                        inventoryCategoryStore.load();
                        brandStore.load();
                        productMeasurementStore.load();

                        showEditInv(selectedRecord.data.idinventory);
                        Ext.getCmp('datebuy').show();
                        if (selectedRecord.data.qtystock == null) {
                            // Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').hide();
                            // Ext.getCmp('fieldsetInvPersediaan').hide();
                            Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(false);
                            Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(false);
                        } else {
                            Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').show();
                            // Ext.getCmp('fieldsetInvPersediaan').show();
                            Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(false);
                            Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(false);
                        }
                        Ext.getCmp('TabItemInventory').setActiveTab(0);
                    }
                    Ext.getCmp('statusformInventory2').setValue('edit');
                    Ext.getCmp('TabItemInventory').items.getAt(3).setDisabled(false);
                    Ext.getCmp('TabItemInventory').items.getAt(4).setDisabled(false);

                    brandStore.load();

                    //start tab stok
                    var GridStockInventoryTab = Ext.getCmp('GridStockInventoryTab').getStore();
                    GridStockInventoryTab.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            'extraparams': 'a.idinventory:' + selectedRecord.data.idinventory
                        };
                    });
                    GridStockInventoryTab.load();
                    //end tab stok

                    // Ext.getCmp("fotokaryawanthumb").el.dom.src = 'http://192.168.56.101/aktivaabg/assets/libs/php-barcode-master/barcode.php?code=123456789123';
                }
            },
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridItemGridDetailInventory',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridItemGridDetailInventory, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemGridDetailInventory.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            //            var formItemGridDetailInventory = Ext.getCmp('formItemGridDetailInventory');
            //            wItemGridDetailInventory.show();
            //
            //            formItemGridDetailInventory.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/ItemGridDetailInventory/1/setup',
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
            //            Ext.getCmp('statusformItemGridDetailInventory').setValue('edit');
        }
    }
});

Ext.define(dir_sys + 'inventory.windowGridDetailInventory', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowGridDetailInventory',
    id: 'windowGridDetailInventory',
    title: 'Inventory Detail',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    closeAction: 'hide',
    modal: true,
    width: panelW - 100,
    height: sizeH - 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemGridDetailInventory'
    }],
    listeners: {
        'close': function(win) {
            // load_tmp_sales_return()
        },
        'hide': function(win) {
            // load_tmp_sales_return()
        }
    }
});