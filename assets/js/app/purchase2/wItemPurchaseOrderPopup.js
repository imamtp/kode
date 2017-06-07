Ext.define('GridItemPurchaseOrderPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua', 'lebar', 'ketebalan'],
    idProperty: 'id'
});

var storeGridItemPurchaseOrderPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseOrderPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryAllBySku/inventory/',
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

storeGridItemPurchaseOrderPopup.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
    };
});

Ext.define('MY.searchGridItemPurchaseOrderPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemPurchaseOrderPopup',
    store: storeGridItemPurchaseOrderPopup,
    width: 180
});

var smGridItemPurchaseOrderPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemPurchaseOrderPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSalesPopupOrder').enable();
        }
    }
});

Ext.define(dir_sys + 'purchase2.GridItemPurchaseOrderPopup', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridItemPurchaseOrderPopup,
    //    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemPurchaseOrderPopupID',
    id: 'GridItemPurchaseOrderPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemPurchaseOrderPopup',
    store: storeGridItemPurchaseOrderPopup,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                var recPO = new GridItemPurchaseOrderModel({
                    idinventory: selectedRecord.get('idinventory'),
                    invno: selectedRecord.get('invno'),
                    nameinventory: selectedRecord.get('nameinventory'),
                    short_desc: selectedRecord.get('satuan_pertama'),
                    size_measurement: selectedRecord.get('satuan_kedua'),
                    price: selectedRecord.get('cost'),
                    idunit: idunit,
                    assetaccount: selectedRecord.get('assetaccount'),
                    qty: 1,
                    size: 1,
                    disc: 0,
                    sku_no: selectedRecord.get('sku_no'),
                    total: selectedRecord.get('cost'),
                    ratetax: 0
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });

                var gridPO = Ext.getCmp('EntryPurchaseOrder');
                gridPO.getStore().insert(0, recPO);
                // updateGridPurchaseOrder();

                Ext.getCmp('wItemPurchaseOrderPopup').hide();

            }
        },
        { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        { header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150 },
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex: 1 },
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
        // { header: 'Lebar', dataIndex: 'lebar', minWidth: 130, xtype: 'numbercolumn', align: 'right' },
        // { header: 'Tebal', dataIndex: 'ketebalan', minWidth: 130, xtype: 'numbercolumn', align: 'right' }
    ],
    dockedItems: [
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [                
        //             {
        //                 xtype:'comboxinventorycat'
        //             },
        //             // {
        //             //     xtype:'comboxunit',
        //             //     valueField:'idunit',
        //             //     // id:'cbUnitInvAll',
        //             //     listeners: {
        //             //         'change': function(field, newValue, oldValue) {
        //             //             storeGridInventoryAll.load({
        //             //                 params: {
        //             //                   'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitInvAll').getValue()
        //             //                 }
        //             //             });
        //             //         }
        //             //     }
        //             // },
        //             {
        //                 xtype:'comboxbrand'
        //             }
        //     ]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemPurchaseOrderPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemPurchaseOrderPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemPurchaseOrderPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            //            var formItemSalesPopupOrder = Ext.getCmp('formItemSalesPopupOrder');
            //            wItemSalesPopupOrder.show();
            //
            //            formItemSalesPopupOrder.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/ItemSalesPopupOrder/1/setup',
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
            //            Ext.getCmp('statusformItemSalesPopupOrder').setValue('edit');
        }
    }
});

Ext.define(dir_sys + 'purchase2.wItemPurchaseOrderPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wItemPurchaseOrderPopup',
    // var wItemPurchaseOrderPopup = Ext.create('widget.window', {
    id: 'wItemPurchaseOrderPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW - 100,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemPurchaseOrderPopup'
    }]
});