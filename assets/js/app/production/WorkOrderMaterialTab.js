Ext.define('GridItemMaterialWOModel', {
    extend: 'Ext.data.Model',
    fields: ['prod_material_id', 'job_order_id', 'idinventory', 'bom_id', 'measurement_id', 'qty', 'slice', 'idunit', 'material_type', 'qty_real', 'qty_sisa', 'whs_sisa_id', 'notes', 'nameinventory', 'invno', 'sku_no', 'measurement_name'],
    idProperty: 'id'
});

var storeGridItemMaterialWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemMaterialWOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemMaterialWO/production',
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

//start pop up raw material

Ext.define('GridItemRawMaterialWOModel', {
    extend: 'Ext.data.Model',
    fields: ['sku_no', 'nameinventory', 'invno', 'notes', 'idinventory', 'cost', 'stock_one', 'uom_one', 'stock_two', 'uom_two', 'stock_tre', 'uom_tre', 'warehouse_code', 'no_batch', 'received_date'],
    // fields: ['idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'satuan_pertama', 'stock_kedua', 'satuan_kedua'],
    idProperty: 'id'
});

var storeGridItemRawMaterialWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemRawMaterialWOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'inventory/get_detail_item',
        // url: SITE_URL + 'backend/ext_get_all/InventoryAll/inventory/',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'received_date',
        direction: 'ASC'
    }]
});

storeGridItemRawMaterialWO.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'a.inventory_type:' + 2
        'inventory_type': 2,
        'idunit': idunit,
    };
});

Ext.define('MY.searchGridItemRawMaterialWO', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemRawMaterialWO',
    store: storeGridItemRawMaterialWO,
    width: 180
});

var smGridItemRawMaterialWO = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemRawMaterialWO.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemRawMaterialWO').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemRawMaterialWO').enable();
        }
    }
});

Ext.define('GridItemRawMaterialWO', {
    itemId: 'GridItemRawMaterialWO',
    id: 'GridItemRawMaterialWO',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemRawMaterialWO',
    store: storeGridItemRawMaterialWO,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 65,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                var job_order_id = Ext.getCmp('job_order_id_woform').getValue();

                //start get job_item_id
                var job_item_id = Ext.getCmp('job_item_id_tmpwo').getValue() * 1;
                //end get job_item_id

                Ext.Ajax.request({
                    url: SITE_URL + 'production/save_rm',
                    method: 'POST',
                    params: {
                        job_order_id: job_order_id,
                        job_item_id: job_item_id,
                        token_tmp: Ext.getCmp('token_tmp_woform').getValue(),
                        idinventory: selectedRecord.get('idinventory'),
                        invno: selectedRecord.get('invno'),
                        nameinventory: selectedRecord.get('nameinventory'),
                        price: selectedRecord.get('cost'),
                        idunit: idunit,
                        tipe: 'Raw Material',
                        measurement_name: selectedRecord.get('satuan_pertama'),
                        slice: 1,
                        qty: 1,
                        size: 1
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);

                        storeGridItemMaterialWO.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.job_order_id:' + job_order_id + ',' + 'a.job_item_id:' + job_item_id
                            };
                        });

                        storeGridItemMaterialWO.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });

                Ext.getCmp('wItemRawMaterialWOPopup').hide();
            }
        },
        { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        { header: 'SKU', dataIndex: 'sku_no', minWidth: 150 },
        { header: 'Kode Barang', dataIndex: 'invno', minWidth: 120 },
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 450, flex: 1 },
        {
            header: 'Stock',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'stock_one',
            width: 110,
            align: 'right'
        },
        {
            header: 'Satuan',
            dataIndex: 'uom_one',
            width: 80
        },
        {
            header: 'Stock #2',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'stock_two',
            width: 110,
            align: 'right'
        },
        {
            header: 'Satuan #2',
            dataIndex: 'uom_two',
            width: 90
        },
        {
            header: 'Stock #3',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'stock_tre',
            width: 110,
            align: 'right',
            hidden: true,
        },
        {
            header: 'Satuan #3',
            dataIndex: 'uom_tre',
            width: 90,
            hidden: true,
        },
        {
            header: 'Kode Gudang',
            minWidth: 120,
            dataIndex: 'warehouse_code',
            flex: 1,
        },
        {
            header: 'Tgl Masuk',
            minWidth: 150,
            dataIndex: 'received_date'
        }
    ],
    dockedItems: [
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [                
        //             {
        //                 xtype:'comboxinventorycat'
        //             },
        //             {
        //                 xtype:'comboxunit',
        //                 valueField:'idunit',
        //                 // id:'cbUnitInvAll',
        //                 listeners: {
        //                     'change': function(field, newValue, oldValue) {
        //                         storeGridInventoryAll.load({
        //                             params: {
        //                               'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitInvAll').getValue()
        //                             }
        //                         });
        //                     }
        //                 }
        //             },
        //             {
        //                 xtype:'comboxbrand'
        //             }
        //     ]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    id: 'chooseItemRawMaterialWO',
                    hidden: true,
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemRawMaterialWO')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {

                            var job_order_id = Ext.getCmp('job_order_id_woform').getValue();

                            //start get job_item_id
                            var job_item_id = Ext.getCmp('job_item_id_tmpwo').getValue() * 1;
                            //end get job_item_id

                            Ext.Ajax.request({
                                url: SITE_URL + 'production/save_rm',
                                method: 'POST',
                                params: {
                                    job_order_id: job_order_id,
                                    job_item_id: job_item_id,
                                    token_tmp: Ext.getCmp('token_tmp_woform').getValue(),
                                    idinventory: selectedRecord.get('idinventory'),
                                    invno: selectedRecord.get('invno'),
                                    nameinventory: selectedRecord.get('nameinventory'),
                                    price: selectedRecord.get('cost'),
                                    idunit: idunit,
                                    tipe: 'Raw Material',
                                    measurement_name: selectedRecord.get('satuan_pertama'),
                                    slice: 1,
                                    qty: 1,
                                    size: 1
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);

                                    storeGridItemMaterialWO.on('beforeload', function(store, operation, eOpts) {
                                        operation.params = {
                                            'extraparams': 'a.job_order_id:' + job_order_id + ',' + 'a.job_item_id:' + job_item_id
                                        };
                                    });

                                    storeGridItemMaterialWO.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });

                            //  storeGridItemMaterialWO.add({
                            //     idinventory: selectedRecord.get('idinventory'),
                            //     invno: selectedRecord.get('invno'),
                            //     nameinventory: selectedRecord.get('nameinventory'),
                            //     price: selectedRecord.get('cost'),
                            //     idunit:idunit,
                            //     tipe:'Raw Material',
                            //     measurement_name: selectedRecord.get('satuan_pertama'),
                            //     qty: 1,
                            //     size: 1,
                            //     // total: selectedRecord.get('cost')
                            // });

                            // var gridWO = Ext.getCmp('WorkOrderMaterialTab');
                            // gridWO.getStore().insert(0, recWO);
                            // updateGridMaterialWO();

                            Ext.getCmp('wItemRawMaterialWOPopup').hide();


                        }


                    }
                }, '-',
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemRawMaterialWO',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemRawMaterialWO, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemRawMaterialWO.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});

var wItemRawMaterialWOPopup = Ext.create('widget.window', {
    id: 'wItemRawMaterialWOPopup',
    title: 'Choose Raw Material',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: windowW - 100,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemRawMaterialWO'
    }]
});

//end pop up raw material

///start bom
Ext.define('GridItemBoMMaterialWOModel', {
    extend: 'Ext.data.Model',
    fields: ['bom_id', 'bom_code', 'bom_name', 'bom_desc', 'qty_out', 'measurement_name', 'measurement_id', 'totalitem'],
    idProperty: 'id'
});

var storeGridItemBoMMaterialWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemBoMMaterialWOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/billmaterial/inventory/',
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

storeGridItemBoMMaterialWO.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'a.inventory_type:'+1
    };
});

Ext.define('MY.searchGridItemBoMMaterialWO', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemBoMMaterialWO',
    store: storeGridItemBoMMaterialWO,
    width: 180
});

var smGridItemBoMMaterialWO = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemBoMMaterialWO.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemBoMMaterialWO').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemBoMMaterialWO').enable();
        }
    }
});

Ext.define('GridItemBoMMaterialWO', {
    itemId: 'GridItemBoMMaterialWO',
    id: 'GridItemBoMMaterialWO',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemBoMMaterialWO',
    store: storeGridItemBoMMaterialWO,
    loadMask: true,
    columns: [
        { header: 'bom_id', dataIndex: 'bom_id', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'Kode BoM', dataIndex: 'bom_code', minWidth: 150 },
        { header: 'Nama BoM', dataIndex: 'bom_name', minWidth: 150, flex: 1 },
        { header: 'Deskripsi', dataIndex: 'bom_desc', minWidth: 130 },
        { header: 'Qty', dataIndex: 'qty_out', minWidth: 100, xtype: 'numbercolumn', align: 'right' },
        { header: 'Satuan', dataIndex: 'measurement_name', minWidth: 90 },
        { header: 'Jumlah Komposisi', dataIndex: 'totalitem', minWidth: 150, align: 'right' },
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                itemId: 'chooseItemBoMMaterialWO',
                text: 'Pilih BoM',
                iconCls: 'add-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridItemBoMMaterialWO')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih BoM terlebih dahulu!');
                    } else {
                        //                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
                        //                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
                        //                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));
                        //  var recWO = new GridItemMaterialWOModel({
                        //     bom_id: selectedRecord.get('bom_id'),
                        //     invno: selectedRecord.get('bom_code'),
                        //     nameinventory: selectedRecord.get('bom_name'),
                        //     price: selectedRecord.get('cost'),
                        //     idunit:idunit,
                        //     tipe:'BoM Material',
                        //     qty: selectedRecord.get('qty_out'),
                        //     measurement_name:selectedRecord.get('measurement_name')
                        // });

                        storeGridItemMaterialWO.add({
                            bom_id: selectedRecord.get('bom_id'),
                            invno: selectedRecord.get('bom_code'),
                            nameinventory: selectedRecord.get('bom_name'),
                            price: selectedRecord.get('cost'),
                            idunit: idunit,
                            tipe: 'BoM Material',
                            qty: selectedRecord.get('qty_out'),
                            measurement_name: selectedRecord.get('measurement_name')
                        });
                        // var gridWO = Ext.getCmp('WorkOrderMaterialTab');
                        // gridWO.getStore().insert(0, recWO);
                        // updateGridMaterialWO();

                        Ext.getCmp('wItemBoMMaterialWOPopup').hide();


                    }


                }
            }, '-',
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridItemBoMMaterialWO',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridItemBoMMaterialWO, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemBoMMaterialWO.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});

var wItemBoMMaterialWOPopup = Ext.create('widget.window', {
    id: 'wItemBoMMaterialWOPopup',
    title: 'Choose BoM Material',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 830,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemBoMMaterialWO'
    }]
});

//end pop up BoM material
//end bom

///////////////////////////

Ext.define(dir_sys + 'production.WorkOrderMaterialTab', {
    extend: 'Ext.grid.Panel',
    id: 'WorkOrderMaterialTab',
    alias: 'widget.WorkOrderMaterialTab',
    xtype: 'cell-editing',
    title: 'Raw Material',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: 300,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemMaterialWO,
            viewConfig: {
                markDirty: false
            },
            columns: [{
                    header: 'prod_material_id',
                    hidden: true,
                    dataIndex: 'prod_material_id',
                    //                    id: 'idinventory'
                }, {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
                    //                    id: 'idinventory'
                },
                {
                    header: 'bom_id',
                    hidden: true,
                    dataIndex: 'bom_id',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'Kode Material',
                    dataIndex: 'invno',
                    //                    id: 'invno',
                    width: 120
                },
                {
                    header: 'Nama Material',
                    dataIndex: 'nameinventory',
                    flex: 1,
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    header: 'Deskripsi',
                    hidden: true,
                    dataIndex: 'description',
                    //                    id: 'invno',
                    width: 200
                },
                {
                    header: 'Tipe',
                    dataIndex: 'material_type',
                    width: 110,
                    renderer: function(value) {
                            if (value * 1 === 1) {
                                return 'Raw Material';
                            } else {
                                return 'BoM Material';
                            }
                        }
                        //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Potongan',
                    width: 100,
                    dataIndex: 'slice',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Pakai',
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan Qty',
                    dataIndex: 'measurement_name',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel: true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                // {
                //     xtype: 'numbercolumn',
                //     header: 'Ukuran',
                //     width: 100,
                //     dataIndex: 'size',
                //     align: 'right',
                //     editor: {
                //         xtype: 'numberfield',
                //         allowBlank: false,
                //         minValue: 1
                //     }
                // },
                // {
                //     header: 'Satuan Ukuran',
                //     dataIndex: 'size_measurement',
                //     editor: {
                //         xtype: 'comboxmeasurement',
                //         hideLabel:true,
                //         valueField: 'short_desc',
                //         displayField: 'short_desc',
                //         labelWidth: 100
                //     }
                // },
                // {
                //     xtype: 'numbercolumn',
                //     header: 'Total',
                //     dataIndex: 'total',
                //     width: 150,
                //     align: 'right'
                // },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: BASE_URL + 'assets/icons/fam/cross.gif',
                        tooltip: 'Hapus',
                        scope: this,
                        handler: this.onRemoveClick
                    }]
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntrySalesOrder();
                    }
                }
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                        text: 'Add Raw Material',
                        id: 'addRawMaterialBtnWo',
                        iconCls: 'add-icon',
                        scope: this,
                        handler: this.onAddRawClick
                    },
                    {
                        text: 'Add Bill of Material',
                        hidden: true,
                        id: 'addBOMBtnWo',
                        iconCls: 'add-icon',
                        scope: this,
                        handler: this.onAddBoMClick
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'job_item_id_tmpwo',
                        id: 'job_item_id_tmpwo'
                    }
                ]
            }]
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                updateGridMaterialWO();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesOrder: function(button, event, mode) {
        console.log(Ext.getCmp('idaccountSalesOrder').getValue())
        if (validasiSalesOrder()) {
            // var dp = Ext.getCmp('angkutSalesOrder').getValue();
            // if(dp!='')
            // {
            //     //cek link dp
            //     Ext.Ajax.request({
            //         url: SITE_URL + 'account/cekAccLink',
            //         method: 'POST',
            //         params: {
            //             idacclink: 17,
            //             idunit:Ext.getCmp('cbUnitEntrySalesOrder').getValue()
            //         },
            //         success: function(form, action) {

            //             var d = Ext.decode(form.responseText);
            //             if (!d.success)
            //             {
            //                 Ext.Msg.alert('Peringatan', d.message);
            //             } else {
            //                 // Ext.getCmp('wEntryPayment').hide();
            //                 // PaymentGridStore.load();
            //             }

            //         },
            //         failure: function(form, action) {
            //             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            //         }
            //     });
            // } 

            var json = Ext.encode(Ext.pluck(storeGridItemSalesOrder.data.items, 'data'));
            //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesOrder').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'sales/saveSalesOrder',
                method: 'POST',
                params: {
                    statusform: Ext.getCmp('statusformSalesOrderGrid').getValue(),
                    idsales: Ext.getCmp('idsales_order').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('customerSalesOrder').setValue(null);

                        // storeGridItemSalesOrder.removeAll();
                        // storeGridItemSalesOrder.sync();
                        // updateGridSalesOrder('general');

                        // if(mode=='print')
                        // {
                        //     cetak('FAKTUR Sales Order','SalesOrder',d.id);
                        // }
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiSalesOrder()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {


        //        this.getStore().load({
        //            // store loading is asynchronous, use a load listener or callback to handle results
        //            callback: this.onStoreLoad
        //        });
    },
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddRawClick: function() {
        wItemRawMaterialWOPopup.show();
        storeGridItemRawMaterialWO.load();
    },
    onAddBoMClick: function() {
        wItemBoMMaterialWOPopup.show();
        storeGridItemBoMMaterialWO.load();
    },
    onRemoveClick: function(grid, rowIndex) {
        var grid = this.getStore().getAt(rowIndex);
        console.log(grid)
        var job_order_id = Ext.getCmp('job_order_id_woform').getValue();
        Ext.Ajax.request({
            url: SITE_URL + 'production/delete_rm',
            method: 'POST',
            params: {
                job_item_id: Ext.getCmp('job_item_id_tmpwo').getValue() * 1,
                prod_material_id: grid.data.prod_material_id
            },
            success: function(form, action) {
                // var d = Ext.decode(form.responseText);
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });

        this.getStore().removeAt(rowIndex);

        updateGridMaterialWO()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


function updateGridMaterialWO() {
    Ext.each(storeGridItemMaterialWO.data.items, function(obj, i) {
        var job_order_id = Ext.getCmp('job_order_id_woform').getValue();

        //start get job_item_id
        var job_item_id = Ext.getCmp('job_item_id_tmpwo').getValue() * 1;
        //end get job_item_id

        Ext.Ajax.request({
            url: SITE_URL + 'production/save_rm',
            async: false,
            method: 'POST',
            params: {
                idunit: Ext.getCmp('cbUnitWorkOrderGrid').getValue() * 1,
                job_order_id: job_order_id,
                job_item_id: job_item_id,
                prod_material_id: obj.data.prod_material_id,
                measurement_name: obj.data.measurement_name,
                slice: obj.data.slice,
                qty: obj.data.qty,
                update: 'true'
            },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);

                storeGridItemMaterialWO.on('beforeload', function(store, operation, eOpts) {
                    operation.params = {
                        'extraparams': 'a.job_order_id:' + job_order_id + ',' + 'a.job_item_id:' + job_item_id
                    };
                });

                storeGridItemMaterialWO.load();
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
        // obj.set('total', obj.data.qty*obj.data.size);

    });
}