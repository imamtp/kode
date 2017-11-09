

Ext.define('GridItemDOPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'idsalesitem','sku_no', 'invno', 'nameinventory', 'hpp', 'stock_one', 'uom_one', 'stock_two', 'uom_two', 'stock_tre', 'uom_tre', 'minstock','price','qty','short_desc','size','size_measurement','disc','total','qty_terkirim','qty_sisakirim'],
    //fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua'],
    idProperty: 'id'
});

var storeGridItemDOPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemDOPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        // method: 'POST',
        url: SITE_URL + 'sales/get_item_for_do',
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

storeGridItemDOPopup.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'a.idsales:'+Ext.getCmp('id_sales_order_do').getValue()
        'idsales': Ext.getCmp('id_sales_order_do').getValue(),
        'id_tmp': Ext.getCmp('id_tmp_do').getValue()
    };
});

Ext.define('MY.searchGridItemDOPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemDOPopup',
    store: storeGridItemDOPopup,
    width: 180
});

var smGridItemDOPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemDOPopup.getSelection().length;
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

Ext.define(dir_sys + 'sales.GridItemDOPopup', {
    itemId: 'GridItemDOPopupID',
    id: 'GridItemDOPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemDOPopup',
    store: storeGridItemDOPopup,
    loadMask: true,
    columns: [{
            text: 'Pilih',
            minWidth: 15,
            xtype: 'actioncolumn',
            tooltip: 'Pilih ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                Ext.Ajax.request({
                    url: SITE_URL + 'sales/save_do_item',
                    method: 'POST',
                    params: {
                        idsalesitem: selectedRecord.get('idsalesitem'),
                        qty_kirim:1,
                        qty_order:selectedRecord.get('qty'),
                        id_tmp: Ext.getCmp('id_tmp_do').getValue()
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                    }
                });

                Ext.getCmp('wItemDOPopup').hide();

            }
        },
        { header: 'idsalesitem', dataIndex: 'idsalesitem', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        // { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        { header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150},
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 400, flex:1 },
        {
            xtype: 'numbercolumn',
            header: 'Harga',
            dataIndex: 'price',
            minWidth: 150,
            align: 'right'
        },
        {
            xtype: 'numbercolumn',
            header: 'Qty Order',
            minWidth: 100,
            dataIndex: 'qty',
            align: 'right'
        },
        {
            xtype: 'numbercolumn',
            header: 'Qty Terkirim',
            minWidth: 120,
            dataIndex: 'qty_terkirim',
            align: 'right'
        },
        {
            xtype: 'numbercolumn',
            header: 'Qty Sisa Kirim',
            minWidth: 125,
            dataIndex: 'qty_sisakirim',
            align: 'right'
        },
        {
            header: 'Satuan',
            dataIndex: 'short_desc'
        },
        {
            xtype: 'numbercolumn',
            header: 'Ukuran',
            minWidth: 100,
            dataIndex: 'size',
            align: 'right'
        },
        {
            header: 'Satuan Ukuran',
            minWidth: 100,
            dataIndex: 'size_measurement'
        },
        {
            xtype: 'numbercolumn',
            header: 'Disc (%)',
            minWidth: 100,
            dataIndex: 'disc',
            align: 'right'
        }, {
            xtype: 'numbercolumn',
            header: 'Total',
            dataIndex: 'total',
            minWidth: 150,
            align: 'right'
        }
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
                        var grid = Ext.ComponentQuery.query('GridItemDOPopup')[0];
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

                            Ext.getCmp('wItemDOPopup').hide();
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

                            //                    Ext.getCmp('wItemDOPopup').hide();
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
                    xtype: 'searchGridItemDOPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemDOPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        refresh : function (dataview) {
            // console.log(dataview);
            // Ext.each(dataview.panel.columns, function (column) {
            //  if (column.autoSizeColumn === true)
            //   column.autoSize();
            //   console.log(column);
            // });
        },
        render: {
            scope: this,
            fn: function(grid) {
                // var grd = Ext.getCmp('GridItemDOPopupID');
                // grd.getView().autoSizeColumn(grd.columns[0]);
                // grid.columns[0].autoSize();
                // grid.autoSizeColumn(grid.columns[1]);
                // grid.getView().autoSizeColumn(2);
                // console.log(grid);
                // Ext.each(grid.columns, function (column) {
                // //     // console.log(column);
                //     if (column.autoSizeColumn === true)
                //     //  column.autoSize();
                //     dataview.panel.columns[0].autoSize();
                //      console.log(column);
                //    });
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

Ext.define(dir_sys + 'sales.wItemDOPopup',{
    extend: 'Ext.window.Window',
    alias: 'widget.wItemDOPopup',
// var wItemDOPopup = Ext.create('widget.window', {
    id: 'wItemDOPopup',
    title: 'Pilih Barang',
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
        xtype: 'GridItemDOPopup'
    }]
});