Ext.define('GridItemPurchaseOrderPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'sku_no', 'invno', 'nameinventory', 'hpp', 'stock_one', 'uom_one', 'stock_two', 'uom_two', 'stock_tre', 'uom_tre', 'minstock', 'cost', 'ratio_two', 'ratio_tre', 'measurement_id_one', 'measurement_id_two', 'measurement_id_tre', 'measurement_id_buy'],
    // fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua', 'lebar', 'ketebalan', 'ratio_two', 'ratio_tre'],
    idProperty: 'id'
});

var storeGridItemPurchaseOrderPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseOrderPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'inventory/get_by_sku2',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'sku_no',
        direction: 'ASC'
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
                    short_desc: selectedRecord.get('uom_one'),
                    size_measurement: selectedRecord.get('uom_two'),
                    price: selectedRecord.get('cost'),
                    ratio_two: selectedRecord.get('ratio_two'),
                    ratio_tre: selectedRecord.get('ratio_tre'),
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

                updateGridPurchaseOrder();

                Ext.getCmp('wItemPurchaseOrderPopup').hide();

            }
        },
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
        { header: 'HPP', dataIndex: 'hpp', width: 100, xtype: 'numbercolumn', align: 'right' }
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
    width: panelW,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemPurchaseOrderPopup'
    }]
});

function updateGridPurchaseOrder(tipe) {
    var addprefix = 'PurchaseOrder';

    var subtotalPurchaseOrder = 0 * 1;
    var totalPurchaseOrder = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutPurchaseOrder = 0;
    var pembayaranPurchaseOrder = Ext.getCmp('pembayaranPurchaseOrder').getValue();
    var sisaBayarPurchaseOrder = 0 * 1;
    var taxrate = Ext.getCmp('cb_tax_id_po').getValue();
    var include_tax = Ext.getCmp('include_tax_po').getValue();

    var storeGridItemPurchaseOrder = Ext.getCmp('EntryPurchaseOrder').getStore();

    Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price * obj.data.size);
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        console.log(total + ' - ' + diskon);

        subtotalPurchaseOrder += net;
        totalPajak += (net / 100) * (taxrate * 1);
        obj.set('ratetax', taxrate);
        obj.set('total', net);
    });

    totalPurchaseOrder = subtotalPurchaseOrder + angkutPurchaseOrder * 1;
    if (include_tax * 1 == 1) {
        //include tax
        totalPurchaseOrder = totalPurchaseOrder;
    } else {
        totalPurchaseOrder = totalPurchaseOrder + totalPajak;
    }
    sisaBayarPurchaseOrder = totalPurchaseOrder - pembayaranPurchaseOrder;
    Ext.getCmp('subtotal' + addprefix).setValue(subtotalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('total' + addprefix).setValue(totalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', { minimumFractionDigits: 2 }));

}