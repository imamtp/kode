var formEditItemDO = Ext.create('Ext.form.Panel', {
    id: 'formEditItemDO',
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
    items: [{
        xtype: 'hiddenfield',
        id:'idsalesitem_formEditItemDO',
        name: 'idsalesitem'
    }, {
        xtype: 'hiddenfield',
        name: 'id_tmp',
        id: 'id_tmp_formEditItemDO'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Qty Order',
        name: 'qty_order',
        id: 'qty_order_formEditItemDO',
        readOnly: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Qty Terkirim',
        name: 'total_terkirim',
        id: 'total_terkirim_formEditItemDO',
        readOnly: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Qty Sisa Kirim',
        name: 'qty_sisa_kirim',
        id: 'qty_sisa_kirim_formEditItemDO',
        readOnly: true
    }, {
        xtype: 'textfield',
        allowBlank:false,
        minValue:1,
        fieldLabel: 'Ubah Qty Kirim',
        name: 'qty_kirim',
        id: 'qty_kirim_formEditItemDO'
    },
    {
        xtype: 'comboxWarehouse',
        id: 'warehouse_code_formEditItemDO',
        valueField: 'warehouse_id',
        displayField: 'warehouse_code',
        allowBlank:false
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            this.up('form').getForm().reset();
            Ext.getCmp('windowFormEditItemDO').hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {


                var qty_sisa_kirim = Ext.getCmp('qty_sisa_kirim_formEditItemDO').getValue()*1;
                        var qty_kirim = Ext.getCmp('qty_kirim_formEditItemDO').getValue()*1;

                if(qty_kirim>qty_sisa_kirim){
                    Ext.Msg.alert('Failed', 'Jumlah kuantitas yang akan dikirim melebihi sisa kirim');
                    return false;
                } 

                if(qty_kirim<0){
                    Ext.Msg.alert('Failed', 'Jumlah kuantitas yang akan dikirim tidak boleh kurang dari 1');
                    return false;
                } 


                Ext.Ajax.request({
                    url: SITE_URL + 'sales/check_stock_kirim',
                    async: false,
                    method: 'GET',
                    params: {
                        idunit: idunit,
                        idsalesitem: Ext.getCmp('idsalesitem_formEditItemDO').getValue(),
                        qty_kirim: qty_kirim,
                        warehouse_id: Ext.getCmp('warehouse_code_formEditItemDO').getValue()
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            var form = Ext.getCmp('formEditItemDO').getForm();
                           form.submit({
                                success: function(form, action) {

                                    Ext.getCmp('GridItemDeliveryOrder').getStore().load({
                                        params: {
                                            'extraparams':'a.id_tmp:' + Ext.getCmp('id_tmp_formEditItemDO').getValue()
                                        }
                                    });

                                    Ext.getCmp('windowFormEditItemDO').hide();
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

var windowFormEditItemDO = Ext.create('widget.window', {
    id: 'windowFormEditItemDO',
    title: 'Edit Barang Pengiriman',
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
    items: [formEditItemDO]
});

/////////////////////////// ----- 

var wItemDOPopup = Ext.create(dir_sys + 'sales.wItemDOPopup');

Ext.define('GridItemDeliveryOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['do_item_id','idsalesitem','id_tmp','idinventory','invno','sku_no','qty_order','total_amount','measurement_id','ratetax','size','measurement_id','measurement_id_size','deleted','invno','nameinventory','short_desc','warehouse_code','size_measurement','qty_kirim','qty_terima','qty_retur','qty_sisa'],
    idProperty: 'id'
});

var storeGridItemDeliveryOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemDeliveryOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/grid_item_do/sales',
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

Ext.define(dir_sys + 'sales.GridItemDeliveryOrder', {
    extend: 'Ext.grid.Panel',
    id: 'GridItemDeliveryOrder',
    alias: 'widget.GridItemDeliveryOrder',
    // xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        // this.cellEditing = new Ext.grid.plugin.CellEditing({
        //     clicksToEdit: 1
        // });

        Ext.apply(this, {
            width: panelW,
            height: sizeH-300,
            // forceFit: true,
            // plugins: [this.cellEditing],
            store: storeGridItemDeliveryOrder,
            columns: [{
                    header: 'do_item_id',
                    hidden: true,
                    dataIndex: 'do_item_id'
                },{
                    header: 'idsalesitem',
                    hidden: true,
                    dataIndex: 'idsalesitem'
                }, 
                {
                    header: 'id_tmp',
                    hidden: true,
                    dataIndex: 'id_tmp'
                }, 
                {
                    header: 'No SKU',
                    dataIndex: 'sku_no',
                    minWidth: 120
                },                 
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
                    minWidth: 120
                },
                {
                    header: 'Nama Barang',
                    flex: 1,
                    dataIndex: 'nameinventory',
                    minWidth: 250,
                    //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Order',
                    minWidth: 70,
                    dataIndex: 'qty_order',
                    decimalPrecision: 0,
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan',
                    dataIndex: 'short_desc',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    hidden: true,
                    header: 'Disc (%)',
                    minWidth: 70,
                    dataIndex: 'disc',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 0
                    // }
                }, {
                    xtype: 'numbercolumn',
                    hidden: true,
                    header: 'Total',
                    dataIndex: 'total',
                    minWidth: 150,
                    align: 'right'
                },               
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Kirim',
                    minWidth: 90,
                    decimalPrecision: 0,
                    dataIndex: 'qty_kirim',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     decimalPrecision: 0,
                    //     minValue: 0
                    // },
                    // renderer: function(value) {
                    //     return '<div style="background-color:yellow; font-color:black">&nbsp;' + value + '</div>';
                    // }

                },

                {
                    header: 'Warehouse',
                    minWidth: 150,
                    dataIndex: 'warehouse_code',
                    // editor: {
                    //     xtype: 'comboxWarehouse',
                    //     hideLabel: true,
                    //     valueField: 'warehouse_code',
                    //     displayField: 'warehouse_code',
                    //     labelWidth: 100
                    // }
                }, 
                {
                    xtype: 'numbercolumn',
                    hidden:true,
                    header: 'Qty Sisa Kirim',
                    dataIndex: 'qty_sisa',
                    minWidth: 130,
                    align: 'right'
                }
                // {
                //     xtype: 'actioncolumn',
                //     width: 30,
                //     align: 'center',
                //     sortable: false,
                //     menuDisabled: true,
                //     items: [{
                //             icon: BASE_URL + 'assets/icons/fam/cross.gif',
                //             tooltip: 'Hapus',
                //             scope: this,
                //             handler: this.onRemoveClick
                //         }]
                // }
            ],
            // selModel: {
            //     selType: 'cellmodel'
            // },
            dockedItems: [
                // {
                //     xtype: 'toolbar',
                //     dock: 'top',
                //     items: [{
                //             xtype: 'hiddenfield',
                //             id: 'id_sales_order_do',
                //             name: 'idsales_order'
                //         },
                //         {
                //             xtype: 'hiddenfield',
                //             id: 'delivery_order_id',
                //             name: 'delivery_order_id'
                //         },
                //         {
                //             xtype: 'hiddenfield',
                //             id: 'statusformSalesOrderGrid_do',
                //             name: 'statusFormSalesOrder'
                //         }
                //     ]
                // },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Tambah Barang',
                            id:'addItemFormDO',
                            // iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.addItemDo, this)
                        },
                        {
                            text: 'Ubah',
                            id:'editItemFormDO',
                            // iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.editItemDo, this)
                        },
                        {
                            text: 'Hapus',
                            id:'delItemFormDO',
                            // iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.delItemDo, this)
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: storeGridItemDeliveryOrder, // same store GridPanel is using
                    dock: 'bottom',
                    displayInfo: true
                        // pageSize:20
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridItemDeliveryOrder();
                    }
                }
            }
        });

        this.callParent();

        // this.on('afterlayout', this.loadStore, this, {
        //     delay: 1,
        //     single: true
        // });

        // this.on('afteredit', this.onAfterEdit, this);

        // this.on({
        //     scope: this,
        //     edit: function() {
        //         updateGridSalesOrder('general');
        //     }
        // });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    addItemDo:function(data,event){
        if(Ext.getCmp('no_sales_order_do').getValue()==''){
            Ext.Msg.alert('Failure', 'Pilih no SO terlebih dahulu');
        } else {
            wItemDOPopup.show();
            Ext.getCmp('GridItemDOPopupID').getStore().load();
        }
        
        // alert(Ext.getCmp('delivery_order_id_do').getValue());
       
    },
    editItemDo:function(data,event){
        var grid = Ext.getCmp('GridItemDeliveryOrder');
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();
        if (data.length == 0) {
            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        } else {
            // alert(selectedRecord.data.do_item_id)
            Ext.getCmp('warehouse_code_formEditItemDO').getStore().load();

            Ext.Ajax.request({
                    url:  SITE_URL + 'sales/get_info_do_item',
                    method: 'GET',
                    params: {
                        idsalesitem: selectedRecord.data.idsalesitem
                        // id_tmp: Ext.getCmp('id_tmp_do').getValue()
                    },
                    success: function(form, action) {
                        var obj = Ext.decode(form.responseText);

                        windowFormEditItemDO.show();

                        Ext.getCmp('idsalesitem_formEditItemDO').setValue(selectedRecord.data.idsalesitem);
                        Ext.getCmp('id_tmp_formEditItemDO').setValue(obj.id_tmp);
                        Ext.getCmp('qty_order_formEditItemDO').setValue(obj.total_qty_order)
                        Ext.getCmp('total_terkirim_formEditItemDO').setValue(obj.total_terkirim);
                        Ext.getCmp('qty_kirim_formEditItemDO').setValue(obj.total_qty_sedang_kirim)
                        Ext.getCmp('warehouse_code_formEditItemDO').setValue(obj.warehouse_id)

                        // var sisa = selectedRecord.get('qty')*1 - obj.total_terkirim*1 - obj.total_dikirim*1;
                        Ext.getCmp('qty_sisa_kirim_formEditItemDO').setValue(obj.qty_sisa_kirim);
                        // Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                    }
            });

             // Ext.Ajax.request({
             //        url:  SITE_URL + 'sales/get_do_item',
             //        method: 'GET',
             //        params: {
             //            do_item_id: selectedRecord.data.do_item_id
             //        },
             //        success: function(form, action) {
             //            var obj = Ext.decode(form.responseText);

             //            wItemDOPopup.show();

             //            // windowFormEntryItemDO.show();

             //            // Ext.getCmp('idsalesitem_formEntryItemDO').setValue(selectedRecord.get('idsalesitem'));
             //            // Ext.getCmp('id_tmp_formEntryItemDO').setValue(Ext.getCmp('id_tmp_do').getValue());
             //            // Ext.getCmp('qty_order_formEntryItemDO').setValue(selectedRecord.get('qty'))
             //            // Ext.getCmp('total_terkirim_formEntryItemDO').setValue(obj.total_terkirim);

             //        },
             //        failure: function(form, action) {
             //            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
             //            Ext.getCmp('GridItemDeliveryOrder').getStore().load();
             //        }
                // });
        }
    },
    delItemDo:function(data,event){
        var grid = Ext.getCmp('GridItemDeliveryOrder');
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();
        if (data.length == 0) {
            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        } else {
            // alert(selectedRecord.data.do_item_id)
            Ext.Ajax.request({
                    url:  SITE_URL + 'sales/delete_do_item',
                    method: 'POST',
                    params: {
                        do_item_id: selectedRecord.data.do_item_id
                    },
                    success: function(form, action) {
                        var obj = Ext.decode(form.responseText);

                        // Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                        var GridItemDeliveryOrderStore = Ext.getCmp('GridItemDeliveryOrder').getStore();

                        GridItemDeliveryOrderStore.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams':'a.id_tmp:' + Ext.getCmp('id_tmp_formEntryItemDO').getValue()
                            };
                        });

                        GridItemDeliveryOrderStore.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        Ext.getCmp('GridItemDeliveryOrder').getStore().load();
                    }
                });
        }
    },
    recordDeliveryOrder: function(button, event, mode) {
        // if (validasiQtyKirim()) {

        //     if (validasiStockKirim()) {

        //         if (validasiFormDO()) {
                    var json = Ext.encode(Ext.pluck(storeGridItemDeliveryOrder.data.items, 'data'));

                    Ext.Ajax.request({
                        url: SITE_URL + 'sales/saveDeliveryOrder2',
                        method: 'POST',
                        params: {
                            no_do: Ext.getCmp('nojurnalDO_do').getValue(),
                            datagrid: json
                        },
                        success: function(form, action) {

                            var d = Ext.decode(form.responseText);
                            if (!d.success) {
                                Ext.Msg.alert('Peringatan', d.message);
                            } else {
                                Ext.Msg.alert('Success', d.message);
                                Ext.getCmp('WindowGridItemDeliveryOrder').hide();
                            }

                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
        //         }
        //     }
        // }
    },
    saveRecurr: function() {
        if (validasiSalesOrder()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {

    },
    onStoreLoad: function() {

    },
    onAddClick: function() {
        //        console.log(Ext.getCmp('customerSalesOrder').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        wItemSalesPopupOrderPopup.show();
        storeGridItemSalesPopupOrder.load();

        //        var rec = new JournalStore({
        //            idaccount: null,
        //            accname: null,
        //            accnumber: null,
        //            debit: null,
        //            credit: null
        //        });
        //
        //        this.getStore().insert(0, rec);
        //        this.cellEditing.startEditByPosition({
        //            row: 0,
        //            column: 0
        //        });
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});