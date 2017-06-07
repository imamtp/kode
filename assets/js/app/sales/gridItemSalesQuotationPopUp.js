Ext.define('GridItemSalesQuotationModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem', 'idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'size', 'size_measurement'],
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
    fields: ['idinventory', 'invno', 'nameinventory', 'totalstock', 'stock_kedua', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'short_desc', 'size_measurement', 'satuan_pertama', 'satuan_kedua'],
    idProperty: 'id'
});

var storeGridItemSelectSalesQuotation = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSelectSalesQuotationModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventoryallbysku/inventory',
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

    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                var recPO = new GridItemSalesQuotationModel({
                    idinventory: selectedRecord.get('idinventory'),
                    invno: selectedRecord.get('invno'),
                    nameinventory: selectedRecord.get('nameinventory'),
                    short_desc: selectedRecord.get('satuan_pertama'),
                    price: selectedRecord.get('sellingprice'),
                    idunit: idunit,
                    assetaccount: selectedRecord.get('assetaccount'),
                    qty: 1,
                    size: 1,
                    sku_no: selectedRecord.get('sku_no'),
                    size_measurement: selectedRecord.get('satuan_kedua'),
                    disc: 0,
                    total: selectedRecord.get('sellingprice'),
                    ratetax: 0
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });

                var gridPO = Ext.getCmp('EntrySalesQuotation');
                gridPO.getStore().insert(0, recPO);
                updateGridSalesOrder('general');

                Ext.getCmp('wItemSelectSalesQuotationPopup').hide();

            }
        },
        { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        { header: 'No SKU', dataIndex: 'sku_no', minWidth: 150 },
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex: 1 },
        // { header: 'Merk', dataIndex: 'brand_name', minWidth: 150 },
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
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
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
    }],
    listeners: {
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
    modal: true,
    width: panelW - 100,
    height: sizeH - 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemSelectSalesQuotation'
    }]
});