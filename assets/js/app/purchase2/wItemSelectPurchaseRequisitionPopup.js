// storeGridItemPurchaseRequisition.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
Ext.define('GridItemSelectPurchaseRequisitionModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'short_desc', 'lebar', 'ketebalan'],
    idProperty: 'id'
});

var storeGridItemSelectPurchaseRequisition = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSelectPurchaseRequisitionModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemPurchaseRequisition/sales',
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

// storeGridItemSelectPurchaseRequisition.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });

Ext.define('MY.searchGridItemSelectPurchaseRequisition', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemSelectPurchaseRequisition',
    store: storeGridItemSelectPurchaseRequisition,
    width: 180
});

var smGridItemSelectPurchaseRequisition = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemSelectPurchaseRequisition.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemSelectPurchaseRequisition').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSelectPurchaseRequisition').enable();
        }
    }
});

Ext.define('GridItemSelectPurchaseRequisition', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridItemSelectPurchaseRequisition,
    //    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemSelectPurchaseRequisitionID',
    id: 'GridItemSelectPurchaseRequisitionID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemSelectPurchaseRequisition',
    store: storeGridItemSelectPurchaseRequisition,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 55,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                var recSQ = new GridItemPurchaseRequisitionModel({
                    idinventory: selectedRecord.get('idinventory'),
                    invno: selectedRecord.get('invno'),
                    nameinventory: selectedRecord.get('nameinventory'),
                    price: selectedRecord.get('cost') * 1,
                    idunit: idunit,
                    assetaccount: selectedRecord.get('assetaccount'),
                    sku_no: selectedRecord.get('sku_no'),
                    qty: 1,
                    disc: 0,
                    total: selectedRecord.get('cost') * 1,
                    short_desc: selectedRecord.get('short_desc'),
                    ratetax: Ext.getCmp('cb_tax_id_pr').getValue()
                        // ratetax: Ext.getCmp('cb_tax_id_sq').getValue()
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });
                console.log(recSQ);
                var gridSQ = Ext.getCmp('EntryPurchaseRequisition');
                gridSQ.getStore().insert(0, recSQ);
                updateGridPurchaseRequisition();

                Ext.getCmp('wItemSelectPurchaseRequisitionPopup').hide();

            }
        },
        // { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        // { header: 'idunit', dataIndex: 'idunit', hidden: true },
        // { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        // { header: 'No SKU', dataIndex: 'sku_no', minWidth: 150 },
        // { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex: 1 },
        // { header: 'Merk', dataIndex: 'brand_name', minWidth: 150 },
        // { header: 'Lebar', dataIndex: 'lebar', minWidth: 130, xtype: 'numbercolumn', align: 'right' },
        // { header: 'Tebal', dataIndex: 'ketebalan', minWidth: 130, xtype: 'numbercolumn', align: 'right' },
        // { header: 'Stok Sekarang', dataIndex: 'qtystock', minWidth: 100, align: 'right' },
        { header: 'No. SKU', dataIndex: 'sku_no', width: 150},
        { header: 'Nama Barang', dataIndex: 'nameinventory', width: 400, flex:1 },
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
            align: 'right'
        },
        {
            header: 'Satuan #3',
            dataIndex: 'uom_tre',
            width: 90
        },
        // { header: 'Beli', dataIndex: 'cost', minWidth: 130, xtype: 'numbercolumn', align: 'right' },
        // { header: 'HPP', dataIndex: 'hpp', width: 100, xtype: 'numbercolumn', align: 'right' }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridItemSelectPurchaseRequisition',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridItemSelectPurchaseRequisition, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemSelectPurchaseRequisition.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            //            var formItemSelectPurchaseRequisition = Ext.getCmp('formItemSelectPurchaseRequisition');
            //            wItemSelectPurchaseRequisition.show();
            //
            //            formItemSelectPurchaseRequisition.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/ItemSelectPurchaseRequisition/1/setup',
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
            //            Ext.getCmp('statusformItemSelectPurchaseRequisition').setValue('edit');
        }
    }
});

Ext.define(dir_sys + 'purchase2.wItemSelectPurchaseRequisitionPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wItemSelectPurchaseRequisitionPopup',
    id: 'wItemSelectPurchaseRequisitionPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    closeAction: 'hide',
    modal: true,
    width: panelW,
    height: sizeH - 100,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemSelectPurchaseRequisition'
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

// var wItemSelectPurchaseRequisitionPopup = Ext.create('widget.window', {
//     id: 'wItemSelectPurchaseRequisitionPopup',
//     title: 'Choose Item',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
// //    autoWidth: true,
//     modal:true,
//     width: panelW-100,
//     height: sizeH-100,
//     layout: 'fit',
//     border: false,
//     items: [{
//             xtype:'GridItemSelectPurchaseRequisition'
//     }]
// });