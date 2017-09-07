

Ext.define('GridItemSalesPopupOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'sku_no', 'invno', 'nameinventory', 'hpp', 'stock_one', 'uom_one', 'stock_two', 'uom_two', 'stock_tre', 'uom_tre', 'minstock', ],
    //fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua'],
    idProperty: 'id'
});

var storeGridItemSalesPopupOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSalesPopupOrderModel',
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
        property: 'menu_name',
        direction: 'DESC'
    }]
});

storeGridItemSalesPopupOrder.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
    };
});

Ext.define('MY.searchGridItemSalesPopupOrder', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemSalesPopupOrder',
    store: storeGridItemSalesPopupOrder,
    width: 180
});

var smGridItemSalesPopupOrder = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemSalesPopupOrder.getSelection().length;
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

Ext.define(dir_sys + 'sales.GridItemSalesPopupOrder', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridItemSalesPopupOrder,
    //    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemSalesPopupOrderID',
    id: 'GridItemSalesPopupOrderID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemSalesPopupOrder',
    store: storeGridItemSalesPopupOrder,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            width: 45,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                var recPO = new GridItemSalesOrderModel({
                    idinventory: selectedRecord.get('idinventory'),
                    invno: selectedRecord.get('invno'),
                    nameinventory: selectedRecord.get('nameinventory'),
                    short_desc: selectedRecord.get('uom_two'),
                    price: selectedRecord.get('hpp'),
                    idunit: idunit,
                    sku_no: selectedRecord.get('sku_no'),
                    assetaccount: selectedRecord.get('assetaccount'),

                    qty: 1,
                    size: 1,
                    size_measurement: selectedRecord.get('uom_one'),
                    disc: 0,
                    total: selectedRecord.get('hpp'),
                    ratetax: 0
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });
                console.log(recPO);
                var gridPO = Ext.getCmp('EntrySalesOrder');
                gridPO.getStore().insert(0, recPO);
                updateGridSalesOrder('general');

                Ext.getCmp('wItemSalesPopupOrderPopup').hide();

            }
        },
        { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        // { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        { header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150 },
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex: 1 },
        {
            header: 'Stock',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'stock_one',
            minWidth: 120,
            align: 'right'
        },
        {
            header: 'Satuan',
            dataIndex: 'uom_one',
            minWidth: 100
        },
        {
            header: 'Stock #2',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'stock_two',
            minWidth: 120,
            align: 'right'
        },
        {
            header: 'Satuan #2',
            dataIndex: 'uom_two',
            minWidth: 100
        },
        {
            header: 'Stock #3',
            xtype: 'numbercolumn',
            align: 'right',
            dataIndex: 'stock_tre',
            minWidth: 120,
            align: 'right'
        },
        {
            header: 'Satuan #3',
            dataIndex: 'uom_tre',
            minWidth: 100
        },
        // { header: 'Beli', dataIndex: 'cost', minWidth: 130, xtype: 'numbercolumn', align: 'right' },
        { header: 'HPP', dataIndex: 'hpp', minWidth: 130, xtype: 'numbercolumn', align: 'right' }
    ],
    dockedItems: [
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //             xtype: 'comboxinventorycat'
        //         },
        //         // {
        //         //     xtype:'comboxunit',
        //         //     valueField:'idunit',
        //         //     // id:'cbUnitInvAll',
        //         //     listeners: {
        //         //         'change': function(field, newValue, oldValue) {
        //         //             storeGridInventoryAll.load({
        //         //                 params: {
        //         //                   'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitInvAll').getValue()
        //         //                 }
        //         //             });
        //         //         }
        //         //     }
        //         // },
        //         {
        //             xtype: 'comboxbrand'
        //         }
        //     ]
        // },
        {
            xtype: 'toolbar',
            // hidden: true,
            dock: 'top',
            items: [{
                    itemId: 'chooseItemSalesPopupOrder',
                    hidden: true,
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemSalesPopupOrder')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
                            //                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
                            //                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
                            //                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));
                            var recPO = new GridItemSalesOrderModel({
                                idinventory: selectedRecord.get('idinventory'),
                                invno: selectedRecord.get('invno'),
                                nameinventory: selectedRecord.get('nameinventory'),
                                short_desc: selectedRecord.get('satuan_pertama'),
                                price: selectedRecord.get('sellingprice'),
                                idunit: idunit,
                                assetaccount: selectedRecord.get('assetaccount'),
                                sku_no: selectedRecord.get('sku_no'),
                                qty: 1,
                                size: 1,
                                disc: 0,
                                total: selectedRecord.get('sellingprice'),
                                ratetax: 0
                                    //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            });

                            var gridPO = Ext.getCmp('EntrySalesOrder');
                            gridPO.getStore().insert(0, recPO);
                            updateGridSalesOrder('general');

                            Ext.getCmp('wItemSalesPopupOrderPopup').hide();
                            //cek dulu apakah assetaccount sudah terdefisinis di inventoryunit
                            //         var idunit = Ext.getCmp('cbUnitEntryPurchase').getValue();
                            //          Ext.Ajax.request({
                            //             url: SITE_URL + 'purchase/cekAssetAccount',
                            //             method: 'POST',
                            //             params: {
                            //                 idinventory: selectedRecord.get('idinventory'),
                            //                 idunit: idunit
                            //             },
                            //             success: function(form, action) {

                            //                 var d = Ext.decode(form.responseText);
                            //                 if (!d.success)
                            //                 {
                            //                     wFormSelectAssetPurchase.show();
                            //                     Ext.getCmp('wFormSelectAssetPurchase').setTitle('Pilih Akun Asset (harta) Untuk Barang '+selectedRecord.get('nameinventory'));
                            //                 } else {
                            //                    var recPO = new mPurchaseGridStore({
                            //                         idinventory: selectedRecord.get('idinventory'),
                            //                         invno: selectedRecord.get('invno'),
                            //                         nameinventory: selectedRecord.get('nameinventory'),
                            //                         price: selectedRecord.get('cost'),
                            //                         idunit:idunit,
                            //                         assetaccount:selectedRecord.get('assetaccount'),
                            //                         qty: 1,
                            //                         disc: 0,
                            //                         total: selectedRecord.get('cost'),
                            //                         ratetax: 0
                            // //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            //                     });

                            //                     var gridPO = Ext.getCmp('EntryPurchase');
                            //                     gridPO.getStore().insert(0, recPO);
                            //                     updateGridPurchase('general');

                            //                    Ext.getCmp('wItemSalesPopupOrderPopup').hide();
                            //                 }

                            //             },
                            //             failure: function(form, action) {
                            //                 Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            //             }
                            //         });


                        }


                    }
                }, '-',
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemSalesPopupOrder',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemSalesPopupOrder, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemSalesPopupOrder.load();

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

Ext.define(dir_sys + 'sales.wItemSalesPopupOrderPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.wItemSalesPopupOrderPopup',
// var wItemSalesPopupOrderPopup = Ext.create('widget.window', {
    id: 'wItemSalesPopupOrderPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 870,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemSalesPopupOrder'
    }]
});