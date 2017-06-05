Ext.define('GridInventorySellGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'sku_no', 'satuan_pertama', 'invno', 'nameinventory', 'description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy', 'namaunit', 'brand_name', 'brand_id', 'sku', 'totalstock', 'stock_kedua', 'satuan_kedua'
    ],
    idProperty: 'id'
});

var storeGridInventorySellGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventorySellGridModel',
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

storeGridInventorySellGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.issell:' + 't'
    };
});

Ext.define('MY.searchGridInventorySellGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventorySellGrid',
    store: storeGridInventorySellGrid,
    width: 180
});

var smGridInventorySellGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventorySellGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventorySellGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventorySellGrid').enable();
        }
    }
});

Ext.define('GridInventorySellGrid', {
    title: 'Persediaan Dijual',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventorySellGridID',
    id: 'GridInventorySellGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventorySellGrid',
    store: storeGridInventorySellGrid,
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
        }
    ],
    // plugins: [{
    //         ptype: 'rowexpander',
    //         rowBodyTpl : new Ext.XTemplate(
    //             '<p><b>Supplier:</b> {namesupplier}</p>',
    //             '<p><b>Deskripsi:</b> {description}</p>',
    //             '<p><b>Foto:</b><br/> <img src='+BASE_URL+'upload/{images} width=120/></p><br>'
    //         )
    // }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'comboxunit',
                valueField: 'idunit',
                id: 'cbUnitInvSell',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGridInventorySellGrid.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitInvSell').getValue()
                            }
                        });
                    }
                }
            }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    itemId: 'addInventorySellGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        showInputInv();
                    }
                },
                {
                    itemId: 'editInventorySellGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridInventorySellGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);

                            showEditInv(selectedRecord.data.idinventory);

                            Ext.getCmp('statusformInventory').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteInventorySellGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridInventorySellGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/InventorySellGrid/inventory',
                                        method: 'POST',
                                        params: { postdata: Ext.encode(selected) }
                                    });
                                    storeGridInventorySellGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
                    //                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventorySellGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventorySellGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventorySellGrid.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formInventorySellGrid = Ext.getCmp('formInventorySellGrid');
            wInventorySellGrid.show();

            formInventorySellGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/InventorySellGrid/1/inventory',
                params: {
                    extraparams: 'a.idinventory:' + record.data.idinventory
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            //            
            //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformInventorySellGrid').setValue('edit');
        }
    }
});