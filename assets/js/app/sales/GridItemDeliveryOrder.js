var wItemDOPopup = Ext.create(dir_sys + 'sales.wItemDOPopup');

Ext.define('GridItemDeliveryOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['do_item_id','idsalesitem','idinventory','invno','sku_no','qty_order','total_amount','measurement_id','ratetax','size','measurement_id','measurement_id_size','deleted','invno','nameinventory','short_desc','warehouse_code','size_measurement','qty_kirim','qty_terima','qty_retur','qty_sisa'],
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
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH-300,
            // forceFit: true,
            plugins: [this.cellEditing],
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
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        decimalPrecision: 0,
                        minValue: 0
                    },
                    renderer: function(value) {
                        return '<div style="background-color:yellow; font-color:black">&nbsp;' + value + '</div>';
                    }

                },

                {
                    header: 'Warehouse',
                    minWidth: 150,
                    dataIndex: 'warehouse_code',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel: true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                }, 
                {
                    xtype: 'numbercolumn',
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
            selModel: {
                selType: 'cellmodel'
            },
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
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.addItemDo, this)
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

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                updateGridSalesOrder('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    addItemDo:function(data,event){
        wItemDOPopup.show();
        Ext.getCmp('GridItemDOPopupID').getStore().load();
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