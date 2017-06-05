Ext.define('GridInventoryBuyGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'sku_no', 'satuan_pertama', 'invno', 'nameinventory', 'description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy', 'namaunit', 'brand_name', 'brand_id', 'sku', 'totalstock', 'stock_kedua', 'satuan_kedua'
    ],
    idProperty: 'id'
});

var storeGridInventoryBuyGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryBuyGridModel',
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

storeGridInventoryBuyGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.isbuy:' + 't'
    };
});


Ext.define('MY.searchGridInventoryBuyGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryBuyGrid',
    store: storeGridInventoryBuyGrid,
    width: 180
});

var smGridInventoryBuyGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryBuyGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryBuyGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryBuyGrid').enable();
        }
    }
});

Ext.define('GridInventoryBuyGrid', {
    title: 'Persediaan Dibeli',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventoryBuyGridID',
    id: 'GridInventoryBuyGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryBuyGrid',
    store: storeGridInventoryBuyGrid,
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
                id: 'cbUnitInvBuy',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGridInventoryBuyGrid.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitInvBuy').getValue()
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
                    itemId: 'addInventoryBuyGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        showInputInv();
                    }
                },
                {
                    itemId: 'editInventoryBuyGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridInventoryBuyGrid')[0];
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
                    id: 'btnDeleteInventoryBuyGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridInventoryBuyGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/InventoryBuyGrid/inventory',
                                        method: 'POST',
                                        params: { postdata: Ext.encode(selected) }
                                    });
                                    storeGridInventoryBuyGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
                    //                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventoryBuyGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryBuyGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryBuyGrid.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formInventoryBuyGrid = Ext.getCmp('formInventoryBuyGrid');
            wInventoryBuyGrid.show();

            formInventoryBuyGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/InventoryBuyGrid/1/inventory',
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
            Ext.getCmp('statusformInventoryBuyGrid').setValue('edit');
        }
    }
});