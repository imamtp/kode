var WindowInventory = Ext.create('WindowInventory');
var FormProfile = Ext.create('FormProfile');
var FormProfileID = Ext.ComponentQuery.query('FormProfile')[0];
var FormBuy = Ext.ComponentQuery.query('FormBuy')[0];
var FormSell = Ext.ComponentQuery.query('FormSell')[0];
var FormInventoried = Ext.ComponentQuery.query('FormInventoried')[0];
var tabInventory = Ext.getCmp('TabItemInventory');

var windowGridDetailInventory = Ext.create(dir_sys + 'inventory.windowGridDetailInventory');


var formInventoryAllBySku = Ext.create('Ext.form.Panel', {
    id: 'formInventoryAllBySku',
    width: 450,
    height: 380,
    url: SITE_URL + 'backend/saveform/InventoryAllBySku/setup',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformInventory',
            id: 'statusformInventory'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idtax',
            name: 'idtax'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Pajak',
            allowBlank: false,
            name: 'code'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nama Pajak',
            allowBlank: false,
            name: 'nametax'
        }, {
            xtype: 'comboxtaxtype',
            allowBlank: false,
            name: 'nametypetax'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Deskripsi',
            name: 'description'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Rate (%)',
            allowBlank: false,
            name: 'rate'
        }, {
            xtype: 'hiddenfield',
            name: 'idacccollected',
            id: 'idacccollected',
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Pajak Keluaran',
            allowBlank: false,
            name: 'acccollected',
            id: 'acccollected',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        winAccCollected.show();
                    });
                }
            }
        }, {
            xtype: 'hiddenfield',
            name: 'idaccpaid',
            id: 'idaccpaid',
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Pajak Masukan',
            allowBlank: false,
            name: 'accpaid',
            id: 'accpaid',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        winAccPaid.show();
                    });
                }
            }
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupInventoryAllBySku');
            Ext.getCmp('formInventoryAllBySku').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnInventoryAllBySkuSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {

                        Ext.Msg.alert('Success', action.result.message);

                        Ext.getCmp('formInventoryAllBySku').getForm().reset();
                        Ext.getCmp('windowPopupInventoryAllBySku').hide();

                        storeGridInventoryAllBySku.load();
                        storeGridInventoryInvGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridInventoryAllBySku.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wInventoryAllBySku = Ext.create('widget.window', {
    id: 'windowPopupInventoryAllBySku',
    title: 'Input Inventory',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    //    autoHeight: true,
    layout: 'fit',
    border: false,
    //    items: [formInventoryAllBySku]
    items: [{
        xtype: 'TabKepegawaian'
    }]
});

Ext.define('GridInventoryAllBySkuModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'totalitem', 'sku_no', 'satuan_pertama', 'invno', 'nameinventory', 'description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy', 'namaunit', 'brand_name', 'brand_id', 'sku', 'totalstock', 'stock_kedua', 'satuan_kedua'
    ],
    idProperty: 'id'
});

var storeGridInventoryAllBySku = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryAllBySkuModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'inventory/get_by_sku',
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

storeGridInventoryAllBySku.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'inventorytype:' + Ext.getCmp('inventorytypeDaftarPersediaan').getValue() + ',' +
            'idinventorycat:' + Ext.getCmp('inventorycatDaftarPersediaan').getValue() + ',' +
            'idunit:' + Ext.getCmp('idunitDaftarPersediaan').getValue() + ',' +
            'brand_id:' + Ext.getCmp('brandDaftarPersediaan').getValue(),
    };
});

Ext.define('MY.searchGridInventoryAllBySku', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryAllBySku',
    store: storeGridInventoryAllBySku,
    width: 180
});

var smGridInventoryAllBySku = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryAllBySku.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryAllBySku').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryAllBySku').enable();
        }
    }
});

Ext.define(dir_sys + 'inventory.GridInventoryAllBySku', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryAllBySku',
    title: 'Daftar Persediaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventoryAllBySkuID',
    id: 'GridInventoryAllBySkuID',
    store: storeGridInventoryAllBySku,
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
            hidden: true,
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
            header: 'Total Item',
            dataIndex: 'totalitem',
            minWidth: 120,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                if (value === null) {
                    return 0;
                } else {
                    return value;
                }
            }
        },
        {
            header: 'Stock',
            dataIndex: 'totalstock',
            minWidth: 120,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                if (value === null) {
                    return 0;
                } else {
                    return value;
                }
            }
        },
        {
            header: 'Satuan',
            dataIndex: 'satuan_pertama',
            minWidth: 100
        }, {
            header: 'Stock #2',
            dataIndex: 'stock_kedua',
            minWidth: 70,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Satuan #2',
            dataIndex: 'satuan_kedua',
            minWidth: 100
        },
        {
            header: 'Buying Cost',
            dataIndex: 'cost',
            minWidth: 120,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Selling Price',
            dataIndex: 'sellingprice',
            minWidth: 120,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Minimum Stok',
            dataIndex: 'minstock',
            minWidth: 110
        },
        // {header: 'Tahun Pembelian', dataIndex: 'yearbuy', minWidth: 130}
        //        {header: 'invno', dataIndex: 'invno', minWidth: 100}
    ],
    // plugins: [{
    //     ptype: 'rowexpander',
    //     id: 'atata',
    //     //            expand: true,
    //     rowBodyTpl: new Ext.XTemplate(
    //         '<p><b>Supplier:</b> {namesupplier}</p>',
    //         '<p><b>Deskripsi:</b> {description}</p>',
    //         '<p><b>Foto:</b><br/> <img src=' + BASE_URL + 'upload/{images} width=120/></p><br>'
    //     )
    // }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxInventoryType',
                    id: 'inventorytypeDaftarPersediaan'
                },
                {
                    xtype: 'comboxinventorycat',
                    valueField: 'idinventorycat',
                    id: 'inventorycatDaftarPersediaan'
                },
                {
                    xtype: 'comboxunit',
                    valueField: 'idunit',
                    labelWidth: 50,
                    id: 'idunitDaftarPersediaan',
                    // id: 'cbUnitInvAll',
                    // listeners: {
                    //     'change': function(field, newValue, oldValue) {
                    //         storeGridInventoryAllBySku.load({
                    //             params: {
                    //                 'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitInvAll').getValue()
                    //             }
                    //         });
                    //     }
                    // }
                },
                {
                    xtype: 'comboxbrand',
                    id: 'brandDaftarPersediaan',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    itemId: 'addInventoryAllBySku',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        showInputInv();

                        Ext.getCmp('formInventoryV2').getForm().reset();

                        Ext.getCmp('fieldsetInvBuy').setDisabled(true);
                        Ext.getCmp('fieldsetInvSell').setDisabled(true);

                        setPenyusutan(true); //set disable field2 yang berkaitan dengan penyusutan
                        // Ext.getCmp('fieldsetInvPersediaan').setDisabled(true);
                        storeGridAccInv.removeAll();
                        storeGridAccInv.sync();

                        Ext.getCmp('cbpersediaan').setDisabled(true);
                        // Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').hide();
                        // Ext.getCmp('fieldsetInvPersediaan').hide();
                        // Ext.getCmp('datebuy').hide();                        
                        Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(true);
                        Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(true);
                        Ext.getCmp('TabItemInventory').items.getAt(3).setDisabled(true);
                        Ext.getCmp('TabItemInventory').items.getAt(4).setDisabled(true);
                        Ext.getCmp('statusformInventory2').setValue('input');

                        brandStore.load();


                    }
                },
                {
                    itemId: 'editInventoryAllBySku',
                    text: 'Detail',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridInventoryAllBySku')[0];
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



                            // Ext.getCmp('statusformInventory').setValue('edit');
                            // storeGridAccInv.load({
                            //     params: {
                            //       'extraparams': 'idinventory:'+selectedRecord.data.idinventory
                            //     }
                            // });

                            Ext.getCmp('TabItemInventory').setActiveTab(0);
                        }
                        Ext.getCmp('statusformInventory2').setValue('edit');
                        Ext.getCmp('TabItemInventory').items.getAt(3).setDisabled(false);

                        // Ext.getCmp('TabItemInventory').items.getAt(4).setDisabled(true); //disable tab stok. karena stok diperlihakan pada tab subitem
                        // Ext.getCmp('TabItemInventory').items.getAt(4).setDisabled(false);

                        brandStore.load();
                        // Ext.getCmp("fotokaryawanthumb").el.dom.src = 'http://192.168.56.101/aktivaabg/assets/libs/php-barcode-master/barcode.php?code=123456789123';
                    }
                }, {
                    id: 'btnDeleteInventoryAllBySku',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                            Ext.Msg.show({
                                title: 'Confirm',
                                msg: 'Delete Selected ?',
                                buttons: Ext.Msg.YESNO,
                                fn: function(btn) {
                                    if (btn == 'yes') {
                                        var grid = Ext.ComponentQuery.query('GridInventoryAllBySku')[0];
                                        var sm = grid.getSelectionModel();
                                        selected = [];
                                        Ext.each(sm.getSelection(), function(item) {
                                            selected.push(item.data[Object.keys(item.data)[0]]);
                                        });
                                        Ext.Ajax.request({
                                            url: SITE_URL + 'backend/ext_delete/InventoryAllBySku/inventory',
                                            method: 'POST',
                                            params: {
                                                postdata: Ext.encode(selected),
                                                idmenu: 19
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                if (!d.success) {
                                                    Ext.Msg.alert('Informasi', d.message);
                                                } else {
                                                    storeGridInventoryAllBySku.load();
                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                            }
                                        });
                                        // Ext.Ajax.request({
                                        //     url: SITE_URL + 'inventory/hapusInventory',
                                        //     method: 'POST',
                                        //     params: {postdata: Ext.encode(selected)}
                                        // });
                                        // storeGridInventoryAllBySku.remove(sm.getSelection());
                                        // sm.select(0);


                                        // storeGridInventoryInvGrid.load();
                                        // storeGridInventoryBuyGrid.load();
                                        // storeGridInventorySellGrid.load();
                                    }
                                }
                            });
                        }
                        //                    disabled: true
                }, {
                    text: 'Search',
                    handler: function() {
                        storeGridInventoryAllBySku.load();
                    }
                }, {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('inventorytypeDaftarPersediaan').setValue();
                        Ext.getCmp('inventorycatDaftarPersediaan').setValue();
                        Ext.getCmp('idunitDaftarPersediaan').setValue();
                        Ext.getCmp('brandDaftarPersediaan').setValue();
                        storeGridInventoryAllBySku.load();
                    }
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventoryAllBySku',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryAllBySku, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryAllBySku.load();
                //                var myButton = Ext.getCmp('rowExpandInv');
                //                myButton.handler.call(myButton.scope, myButton, Ext.EventObject)
                //var grid = Ext.ComponentQuery.query('GridInventoryAllBySku')[0];
                //                var grid = Ext.ComponentQuery.query('GridInventoryAllBySku')[0],
                //                    store = grid.getStore(),
                //                    rowExpander = grid.plugins[0],
                //                    nodes = rowExpander.view.getNodes();
                //
                //                for (var i = 0; i < nodes.length; i++) {
                //                    var node = Ext.fly(nodes[i]);
                //
                //                    if (node.hasCls(rowExpander.rowCollapsedCls) === expand) {
                //                        rowExpander.toggleRow(i, store.getAt(i));
                //                    }
                //                }
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            windowGridDetailInventory.show();

            var GridItemGridDetailInventoryID = Ext.getCmp('GridItemGridDetailInventory').getStore();

            GridItemGridDetailInventoryID.on('beforeload', function(store, operation, eOpts) {
                operation.params = {
                    'extraparams': 'a.idinventory_batch:' + record.data.idinventory
                };
            });

            GridItemGridDetailInventoryID.load();



            // var formAgama = Ext.create('formAgama');
            //            var formInventoryAllBySku = Ext.getCmp('formInventoryAllBySku');
            //            wInventoryAllBySku.show();
            //
            //            formInventoryAllBySku.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/InventoryAllBySku/1/inventory',
            //                params: {
            //                    extraparams: 'a.idinventory:' + record.data.idinventory
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
            //            Ext.getCmp('statusformInventoryAllBySku').setValue('edit');
        }
    }
});

function expand() {
    console.log('expand');

    //    var grid = Ext.ComponentQuery.query('GridInventoryAllBySku')[0];
    //
    ////        var grid = button.up('panel');
    //    var store = grid.getStore();
    //    var expander = grid.plugins[0];
    //    for (var i = 0; i < store.getCount(); i++) {
    //        var record = store.getAt(i);
    //        if (!expander.recordsExpanded[record.internalId]) {
    //            expander.toggleRow(i);
    //        }
    //    }

    //    var expander = grid.plugins[0];
    //    var store = grid.getStore();
    //
    //    for ( i=0; i < store.getCount(); i++ ) {
    //        if (expander.isCollapsed(i)) {
    //            expander.toggleRow(i, store.getAt(i));
    //        }
    //    }
}