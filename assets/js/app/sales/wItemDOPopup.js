var formEntryItemDO = Ext.create('Ext.form.Panel', {
    id: 'formEntryItemDO',
    // width: 350,
    // height: 190,
    autoHeight:true,
    autoWidth:true,
    url: SITE_URL + 'sales/save_do_item',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 300
    },
    items: [
    {
        xtype: 'hiddenfield',
        id:'delivery_order_id_formEntryItemDO',
        name: 'delivery_order_id'
    },{
        xtype: 'hiddenfield',
        id:'idsalesitem_formEntryItemDO',
        name: 'idsalesitem'
    }, {
        xtype: 'hiddenfield',
        name: 'id_tmp',
        id: 'id_tmp_formEntryItemDO'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Qty Order',
        name: 'qty_order',
        id: 'qty_order_formEntryItemDO',
        readOnly: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Qty Terkirim',
        name: 'total_terkirim',
        id: 'total_terkirim_formEntryItemDO',
        readOnly: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Qty Sisa Kirim',
        name: 'qty_sisa_kirim',
        id: 'qty_sisa_kirim_formEntryItemDO',
        readOnly: true
    }, {
        xtype: 'textfield',
        allowBlank:false,
        minValue:1,
        fieldLabel: 'Qty Kirim',
        name: 'qty_kirim',
        id: 'qty_kirim_formEntryItemDO'
    },
    {
        xtype: 'comboxWarehouse',
        id: 'warehouse_code_formEntryItemDO',
        valueField: 'warehouse_id',
        displayField: 'warehouse_code',
        allowBlank:false
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('windowFormEntryItemDO').hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {


                var qty_sisa_kirim = Ext.getCmp('qty_sisa_kirim_formEntryItemDO').getValue()*1;
                        var qty_kirim = Ext.getCmp('qty_kirim_formEntryItemDO').getValue()*1;

                if(qty_kirim>qty_sisa_kirim){
                    Ext.Msg.alert('Failed', 'Jumlah kuantitas yang akan dikirim melebihi sisa kirim');
                    return false;
                } 

                if(qty_kirim<=0){
                    Ext.Msg.alert('Failed', 'Jumlah kuantitas yang akan dikirim tidak boleh kurang dari 1');
                    return false;
                } 


                Ext.Ajax.request({
                    url: SITE_URL + 'sales/check_stock_kirim',
                    async: false,
                    method: 'GET',
                    params: {
                        idunit: idunit,
                        // idinventory: obj.data.idinventory,
                        // invno: obj.data.invno,
                        // nameinventory: obj.data.nameinventory,
                        idsalesitem: Ext.getCmp('idsalesitem_formEntryItemDO').getValue(),
                        qty_kirim: qty_kirim,
                        warehouse_id: Ext.getCmp('warehouse_code_formEntryItemDO').getValue()
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            var form = Ext.getCmp('formEntryItemDO').getForm();
                           form.submit({
                                success: function(form, action) {

                                    
                                    // Ext.Msg.alert('Success', action.result.message);
                                    

                                    var GridItemDeliveryOrderStore = Ext.getCmp('GridItemDeliveryOrder').getStore();

                                    GridItemDeliveryOrderStore.on('beforeload', function(store, operation, eOpts) {
                                        operation.params = {
                                            'extraparams':'a.id_tmp:' + Ext.getCmp('id_tmp_formEntryItemDO').getValue()
                                        };
                                    });

                                    GridItemDeliveryOrderStore.load();

                                    Ext.getCmp('windowFormEntryItemDO').hide();
                                    Ext.getCmp('wItemDOPopup').hide();

                                    // storeGridSetupUnitLink.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    storeGridLinkedAccTax.load();
                                }
                            });
                        }
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });

                


            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var windowFormEntryItemDO = Ext.create('widget.window', {
    id: 'windowFormEntryItemDO',
    title: 'Entry Barang Pengiriman',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    modal:true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formEntryItemDO]
});


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

                Ext.getCmp('formEntryItemDO').getForm().reset();

                Ext.Ajax.request({
                    url:  SITE_URL + 'sales/get_info_do_item',
                    method: 'GET',
                    params: {
                        idsalesitem: selectedRecord.get('idsalesitem'),
                        id_tmp: Ext.getCmp('id_tmp_do').getValue()
                    },
                    success: function(form, action) {
                        var obj = Ext.decode(form.responseText);

                        if(obj.qty_sisa_kirim*1==0){
                            Ext.Msg.alert('Info', 'Barang sudah dikirim');
                        } else{
                            windowFormEntryItemDO.show();

                            Ext.getCmp('idsalesitem_formEntryItemDO').setValue(selectedRecord.get('idsalesitem'));
                            Ext.getCmp('id_tmp_formEntryItemDO').setValue(Ext.getCmp('id_tmp_do').getValue());
                            Ext.getCmp('qty_order_formEntryItemDO').setValue(selectedRecord.get('qty'))
                            Ext.getCmp('total_terkirim_formEntryItemDO').setValue(obj.total_terkirim);

                            // var sisa = selectedRecord.get('qty')*1 - obj.total_terkirim*1 - obj.total_dikirim*1 - obj.total_qty_sedang_kirim*1;
                            Ext.getCmp('qty_sisa_kirim_formEntryItemDO').setValue(obj.qty_sisa_kirim);
                            // Ext.getCmp('GridItemDeliveryOrder').getStore().load();

                             Ext.getCmp('delivery_order_id_formEntryItemDO').setValue(Ext.getCmp('delivery_order_id_do').getValue());
                        }
                        
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                    }
                });

                // Ext.Ajax.request({
                //     url: SITE_URL + 'sales/save_do_item',
                //     method: 'POST',
                //     params: {
                //         idsalesitem: selectedRecord.get('idsalesitem'),
                //         qty_kirim:1,
                //         qty_order:selectedRecord.get('qty'),
                //         id_tmp: Ext.getCmp('id_tmp_do').getValue()
                //     },
                //     success: function(form, action) {
                //         var d = Ext.decode(form.responseText);
                //         Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                //     },
                //     failure: function(form, action) {
                //         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                //         Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                //     }
                // });

                // Ext.getCmp('wItemDOPopup').hide();

            }
        },
        { header: 'idsalesitem', dataIndex: 'idsalesitem', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        // { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        { header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150},
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 400, flex:1 },
        // {
        //     xtype: 'numbercolumn',
        //     header: 'Harga',
        //     dataIndex: 'price',
        //     minWidth: 150,
        //     align: 'right'
        // },
        {
            xtype: 'numbercolumn',
            header: 'Qty Order',
            minWidth: 100,
            dataIndex: 'qty',
            align: 'right'
        },
        // {
        //     xtype: 'numbercolumn',
        //     hidden:true,
        //     header: 'Qty Terkirim',
        //     minWidth: 120,
        //     dataIndex: 'qty_terkirim',
        //     align: 'right'
        // },
        // {
        //     xtype: 'numbercolumn',
        //      hidden:true,
        //     header: 'Qty Sisa Kirim',
        //     minWidth: 125,
        //     dataIndex: 'qty_sisakirim',
        //     align: 'right'
        // },
        {
            header: 'Satuan',
            dataIndex: 'short_desc'
        },
        {
            xtype: 'numbercolumn',
            header: 'Ukuran',
            minWidth: 150,
            dataIndex: 'size',
            align: 'right'
        },
        {
            header: 'Satuan Ukuran',
            minWidth: 150,
            dataIndex: 'size_measurement'
        }
        // {
        //     xtype: 'numbercolumn',
        //     header: 'Disc (%)',
        //     minWidth: 100,
        //     dataIndex: 'disc',
        //     align: 'right'
        // }, {
        //     xtype: 'numbercolumn',
        //     header: 'Total',
        //     dataIndex: 'total',
        //     minWidth: 150,
        //     align: 'right'
        // }
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