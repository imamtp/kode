var WindowInventory = Ext.create('WindowInventory');
var FormProfile = Ext.create('FormProfile');
var FormProfileID = Ext.ComponentQuery.query('FormProfile')[0];
var FormBuy = Ext.ComponentQuery.query('FormBuy')[0];
var FormSell = Ext.ComponentQuery.query('FormSell')[0];
var FormInventoried = Ext.ComponentQuery.query('FormInventoried')[0];
var tabInventory = Ext.getCmp('TabItemInventory');

var formInventoryAll = Ext.create('Ext.form.Panel', {
    id: 'formInventoryAll',
    width: 450,
    height: 380,
    url: SITE_URL + 'backend/saveform/InventoryAll/setup',
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
            var win = Ext.getCmp('windowPopupInventoryAll');
            Ext.getCmp('formInventoryAll').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnInventoryAllSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {

                        Ext.Msg.alert('Success', action.result.message);

                        Ext.getCmp('formInventoryAll').getForm().reset();
                        Ext.getCmp('windowPopupInventoryAll').hide();

                        storeGridInventoryAll.load();
                        storeGridInventoryInvGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridInventoryAll.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wInventoryAll = Ext.create('widget.window', {
    id: 'windowPopupInventoryAll',
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
    //    items: [formInventoryAll]
    items: [{
        xtype: 'TabKepegawaian'
    }]
});

Ext.define('GridInventoryAllModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'sku_no', 'satuan_pertama', 'invno', 'nameinventory', 'description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy', 'namaunit', 'brand_name', 'brand_id', 'sku', 'totalstock', 'stock_kedua', 'satuan_kedua'
    ],
    idProperty: 'id'
});

var storeGridInventoryAll = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryAllModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryAll/inventory/' + idunit,
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

//storeGridInventoryAll.on('beforeload',function(store, operation,eOpts){
//        operation.params={
//                    'extraparams': 'a.idunit:'+idunit
//                  };
//              });

Ext.define('MY.searchGridInventoryAll', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryAll',
    store: storeGridInventoryAll,
    width: 180
});

var smGridInventoryAll = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryAll.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryAll').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryAll').enable();
        }
    }
});

Ext.define('GridInventoryAll', {
    title: 'Semua Daftar Persediaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventoryAllID',
    id: 'GridInventoryAllID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryAll',
    store: storeGridInventoryAll,
    loadMask: true,
    columns: [{
            header: 'idinventory',
            dataIndex: 'idinventory',
            hidden: true
        },
        {
            header: 'No SKU',
            dataIndex: 'sku_no',
            minWidth: 120
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
            header: 'Total Stock',
            dataIndex: 'totalstock',
            minWidth: 120,
            align: 'right'
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
            minWidth: 100,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Selling Price',
            dataIndex: 'sellingprice',
            minWidth: 100,
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
                    xtype: 'comboxInventoryType'
                },
                {
                    xtype: 'comboxinventorycat'
                },
                {
                    xtype: 'comboxunit',
                    valueField: 'idunit',
                    id: 'cbUnitInvAll',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridInventoryAll.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitInvAll').getValue()
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'comboxbrand'
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    itemId: 'addInventoryAll',
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
                    itemId: 'editInventoryAll',
                    text: 'Detail',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridInventoryAll')[0];
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
                        Ext.getCmp('TabItemInventory').items.getAt(4).setDisabled(false);

                        brandStore.load();
                        // Ext.getCmp("fotokaryawanthumb").el.dom.src = 'http://192.168.56.101/aktivaabg/assets/libs/php-barcode-master/barcode.php?code=123456789123';
                    }
                }, {
                    id: 'btnDeleteInventoryAll',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                            Ext.Msg.show({
                                title: 'Confirm',
                                msg: 'Delete Selected ?',
                                buttons: Ext.Msg.YESNO,
                                fn: function(btn) {
                                    if (btn == 'yes') {
                                        var grid = Ext.ComponentQuery.query('GridInventoryAll')[0];
                                        var sm = grid.getSelectionModel();
                                        selected = [];
                                        Ext.each(sm.getSelection(), function(item) {
                                            selected.push(item.data[Object.keys(item.data)[0]]);
                                        });
                                        Ext.Ajax.request({
                                            url: SITE_URL + 'backend/ext_delete/InventoryAll/inventory',
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
                                                    storeGridInventoryAll.load();
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
                                        // storeGridInventoryAll.remove(sm.getSelection());
                                        // sm.select(0);


                                        // storeGridInventoryInvGrid.load();
                                        // storeGridInventoryBuyGrid.load();
                                        // storeGridInventorySellGrid.load();
                                    }
                                }
                            });
                        }
                        //                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventoryAll',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryAll, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryAll.load();
                //                var myButton = Ext.getCmp('rowExpandInv');
                //                myButton.handler.call(myButton.scope, myButton, Ext.EventObject)
                //var grid = Ext.ComponentQuery.query('GridInventoryAll')[0];
                //                var grid = Ext.ComponentQuery.query('GridInventoryAll')[0],
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

            // var formAgama = Ext.create('formAgama');
            //            var formInventoryAll = Ext.getCmp('formInventoryAll');
            //            wInventoryAll.show();
            //
            //            formInventoryAll.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/InventoryAll/1/inventory',
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
            //            Ext.getCmp('statusformInventoryAll').setValue('edit');
        }
    }
});

function expand() {
    console.log('expand');

    //    var grid = Ext.ComponentQuery.query('GridInventoryAll')[0];
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