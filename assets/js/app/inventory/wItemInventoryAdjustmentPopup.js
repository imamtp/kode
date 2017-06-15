Ext.define('GridItemInventoryAdjustmentPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'sku_no', 'warehouse_code', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetacAdjustment', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua'],
    idProperty: 'id'
});

var storeGridItemInventoryAdjustmentPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemInventoryAdjustmentPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_bywhs/inventory/',
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

// storeGridItemInventoryAdjustmentPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });

Ext.define('MY.searchGridItemInventoryAdjustmentPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemInventoryAdjustmentPopup',
    store: storeGridItemInventoryAdjustmentPopup,
    width: 180
});

var smGridItemInventoryAdjustmentPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemInventoryAdjustmentPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemInventoryTransferPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemInventoryTransferPopup').enable();
        }
    }
});

Ext.define('GridItemInventoryAdjustmentPopup', {
    itemId: 'GridItemInventoryAdjustmentPopupID',
    id: 'GridItemInventoryAdjustmentPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemInventoryAdjustmentPopup',
    store: storeGridItemInventoryAdjustmentPopup,
    loadMask: true,
    columns: [{
            text: 'Pilih Barang',
            width: 105,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                console.log(selectedRecord);

                var recPO = new GridInventoryAdjustmentPopUpModel({
                    idinventory: selectedRecord.get('idinventory'),
                    invno: selectedRecord.get('invno'),
                    sku_no: selectedRecord.get('sku_no'),
                    nameinventory: selectedRecord.get('nameinventory'),
                    satuan_pertama: selectedRecord.get('satuan_pertama'),
                    warehouse_code: selectedRecord.get('warehouse_code'),
                    qty_stock: selectedRecord.get('totalstock'),
                    qty_adjustment: 0,
                    // variance:selectedRecord.get('totalstock'),
                    sellingprice: selectedRecord.get('sellingprice'),
                    cost: selectedRecord.get('cost'),
                });

                var gridPO = Ext.getCmp('GridInventoryAdjustmentPopUp');
                gridPO.getStore().insert(0, recPO);
                updateGridInventoryAdjustment();

                Ext.getCmp('wItemInventoryAdjustmentPopup').hide();
            }
        },
        { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'assetacAdjustment', dataIndex: 'assetacAdjustment', hidden: true },
        { header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150 },
        { header: 'Kode Barang', dataIndex: 'invno', minWidth: 150 },
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex: 1 },
        { header: 'Gudang', dataIndex: 'warehouse_code', minWidth: 150 },
        {
            header: 'Stock',
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
        // {header: 'Beli', dataIndex: 'cost', minWidth: 130,xtype:'numbercolumn',align:'right'},
        // {header: 'Jual', dataIndex: 'sellingprice', minWidth: 130,xtype:'numbercolumn',align:'right'}
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxWarehouse',
                    displayField: 'warehouse_code',
                    valueField: 'warehouse_id',
                    name: 'warehouse_id',
                    fieldLabel: 'Pilih Gudang',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            console.log(newValue)
                            storeGridItemInventoryAdjustmentPopup.on('beforeload', function(store, operation, eOpts) {
                                operation.params = {
                                    'extraparams': 'f.warehouse_id:' + newValue
                                        // 'warehouse_id': newValue
                                };
                            });
                            storeGridItemInventoryAdjustmentPopup.load();
                        }
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemInventoryAdjustmentPopup',
                    text: 'Left Button'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridItemInventoryAdjustmentPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemInventoryAdjustmentPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            //            var formItemInventoryTransferPopup = Ext.getCmp('formItemInventoryTransferPopup');
            //            wItemInventoryAdjustmentPopup.show();
            //
            //            formItemInventoryTransferPopup.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/ItemInventoryTransferPopup/1/setup',
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
            //            Ext.getCmp('statusformItemInventoryTransferPopup').setValue('edit');
        }
    }
});

Ext.define(dir_sys + 'inventory.wItemInventoryAdjustmentPopup', {
    extend: 'Ext.window.Window',
    id: 'wItemInventoryAdjustmentPopup',
    title: 'Pilih Barang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 1270,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemInventoryAdjustmentPopup'
    }]
});