var WorkOrderMaterialTab = Ext.create(dir_sys + 'production.WorkOrderMaterialTab');

Ext.define('GridItemJobWOModel', {
    extend: 'Ext.data.Model',
    fields: ['job_item_id', 'job_order_id', 'idinventory', 'idunit', 'measurement_id', 'cost', 'qty', 'subtotal', 'total', 'remarks', 'userin', 'datein', 'idunit', 'size', 'measurement_id_size', 'qty_accept', 'whs_accept_id', 'qty_reject', 'whs_reject_id', 'qty_sisa', 'whs_sisa_id', 'notes', 'token_tmp', 'nameinventory', 'invno', 'sku_no', 'short_desc', 'size_measurement', 'warehouse_code_accept', 'warehouse_code_reject', 'warehouse_code_sisa', 'total_qty'],
    idProperty: 'id'
});

var storeGridItemJobWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemJobWOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemJobWO/production',
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


Ext.define('GridItemJobWOPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'sku_no', 'invno', 'nameinventory', 'hpp', 'stock_one', 'uom_one', 'stock_two', 'uom_two', 'stock_tre', 'uom_tre', 'minstock', 'measurement_id_sell', 'measurement_id_one'],
    // fields: ['idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'totalstock', 'stock_kedua', 'satuan_pertama', 'satuan_kedua', 'inventory_type', 'idinventorycat', 'measurement_id_one'],
    idProperty: 'id'
});

var storeGridItemJobWOPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemJobWOPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        // url: SITE_URL + 'inventory/get_by_sku',
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
        direction: 'DESC'
    }]
});

storeGridItemJobWOPopup.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'extraparams': 'inventory_type:' + 1 + ', idinventory_parent: null'
        'inventory_type': 1, //finished goods
    };
});

Ext.define('MY.searchGridItemJobWOPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemJobWOPopup',
    store: storeGridItemJobWOPopup,
    width: 180
});

var smGridItemJobWOPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemJobWOPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemJobWOPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemJobWOPopup').enable();
        }
    }
});

Ext.define('GridItemJobWOPopup', {
    itemId: 'GridItemJobWOPopup',
    id: 'GridItemJobWOPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemJobWOPopup',
    store: storeGridItemJobWOPopup,
    loadMask: true,
    columns: [
        { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'assetaccount', dataIndex: 'assetaccount', hidden: true },
        { header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150 },
        // {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},        
        { header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex: 1 },
        {
            header: 'Stock',
            xtype: 'numbercolumn',
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
            dataIndex: 'stock_two',
            minWidth: 70,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Satuan #2',
            dataIndex: 'uom_two',
            minWidth: 100
        },
        {
            header: 'Stock #3',
            dataIndex: 'stock_tre',
            minWidth: 70,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Satuan #3',
            dataIndex: 'uom_tre',
            minWidth: 100
        },
    ],
    dockedItems: [
        // {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [                
        //             {
        //                 xtype:'comboxinventorycat'
        //             },
        //             {
        //                 xtype:'comboxunit',
        //                 valueField:'idunit',
        //                 // id:'cbUnitInvAll',
        //                 listeners: {
        //                     'change': function(field, newValue, oldValue) {
        //                         storeGridInventoryAll.load({
        //                             params: {
        //                               'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitInvAll').getValue()
        //                             }
        //                         });
        //                     }
        //                 }
        //             },
        //             {
        //                 xtype:'comboxbrand'
        //             }
        //     ]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    itemId: 'chooseItemJobWOPopup',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GridItemJobWOPopup')[0];
                        var grid = Ext.getCmp('GridItemJobWOPopup');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
                            var job_order_id = Ext.getCmp('job_order_id_woform').getValue();
                            Ext.Ajax.request({
                                url: SITE_URL + 'production/save_fg',
                                method: 'POST',
                                params: {
                                    job_order_id: job_order_id,
                                    token_tmp: Ext.getCmp('token_tmp_woform').getValue(),
                                    idinventory: selectedRecord.get('idinventory'),
                                    invno: selectedRecord.get('invno'),
                                    nameinventory: selectedRecord.get('nameinventory'),
                                    measurement_id: selectedRecord.get('measurement_id_sell'),
                                    measurement_id_size: selectedRecord.get('measurement_id_one'),
                                    price: selectedRecord.get('cost'),
                                    idunit: Ext.getCmp('cbUnitWorkOrderGrid').getValue() * 1,
                                    qty: 1,
                                    size: 1,
                                    total: selectedRecord.get('cost')
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);

                                    storeGridItemJobWO.on('beforeload', function(store, operation, eOpts) {
                                        operation.params = {
                                            'extraparams': 'a.job_order_id:' + job_order_id
                                        };
                                    });

                                    storeGridItemJobWO.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });

                            //  var recWO = new GridItemJobWOModel({
                            //     idinventory: selectedRecord.get('idinventory'),
                            //     invno: selectedRecord.get('invno'),
                            //     nameinventory: selectedRecord.get('nameinventory'),
                            //     price: selectedRecord.get('cost'),
                            //     idunit:idunit,
                            //     qty: 1,
                            //     size: 1,
                            //     total: selectedRecord.get('cost')
                            // });

                            // var gridWO = Ext.getCmp('WorkOrderJobTab');
                            // gridWO.getStore().insert(0, recWO);
                            updateGridJobWO();
                            Ext.getCmp('wItemJobWOPopupPopup').hide();


                        }


                    }
                }, '-',
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemJobWOPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemJobWOPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                storeGridItemJobWOPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            //            var formItemJobWOPopup = Ext.getCmp('formItemJobWOPopup');
            //            wItemJobWOPopup.show();
            //
            //            formItemJobWOPopup.getForm().load({
            //                url: SITE_URL + 'backend/loadFormData/ItemJobWOPopup/1/setup',
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
            //            Ext.getCmp('statusformItemJobWOPopup').setValue('edit');
        }
    }
});

var wItemJobWOPopupPopup = Ext.create('widget.window', {
    id: 'wItemJobWOPopupPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 830,
    modal: true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridItemJobWOPopup'
    }]
});

///////////////////////////
var WorkOrderMaterialTabStore = Ext.getCmp('WorkOrderMaterialTab').getStore();

Ext.define(dir_sys + 'production.WorkOrderJobTab', {
    extend: 'Ext.grid.Panel',
    id: 'WorkOrderJobTab',
    alias: 'widget.WorkOrderJobTab',
    xtype: 'cell-editing',
    // title: 'Finished Goods',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            // height: 300,
            // height:sizeH-300,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemJobWO,
            viewConfig: {
                markDirty: false
            },
            columns: [{
                    header: 'job_item_id',
                    hidden: true,
                    dataIndex: 'job_item_id',
                    //                    id: 'idinventory'
                }, {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'assetaccount',
                    hidden: true,
                    dataIndex: 'assetaccount'
                },
                {
                    header: 'No SKU',
                    dataIndex: 'sku_no',
                    //                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan Qty',
                    dataIndex: 'short_desc',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel: true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Ukuran',
                    width: 100,
                    dataIndex: 'size',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan Ukuran',
                    dataIndex: 'size_measurement',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel: true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    dataIndex: 'total_qty',
                    width: 150,
                    align: 'right'
                },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                        icon: BASE_URL + 'assets/icons/fam/cross.gif',
                        tooltip: 'Hapus',
                        scope: this,
                        handler: this.onRemoveClick
                    }]
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                    console.log(dataRecord.data.job_item_id)
                    var job_item_id = dataRecord.data.job_item_id;
                    Ext.getCmp('job_item_id_tmpwo').setValue(job_item_id); //job_item_id key flag

                    Ext.getCmp('WorkOrderMaterialTab').setTitle('Raw Material :' + dataRecord.data.nameinventory);

                    // WorkOrderMaterialTabStore
                    WorkOrderMaterialTabStore.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            'extraparams': 'a.job_order_id:' + dataRecord.data.job_order_id + ',' + 'a.job_item_id:' + job_item_id
                        };
                    });
                    WorkOrderMaterialTabStore.load();
                    // .load({
                    //     params:{
                    //         'extraparams': 'a.job_order_id:'+dataRecord.data.job_order_id+','+'a.job_item_id:'+job_item_id
                    //     }
                    // });

                    Ext.getCmp('addRawMaterialBtnWo').enable();


                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntrySalesOrder();
                    }
                }
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Add Finished Goods',
                    id: 'addItemJobWoBtn',
                    iconCls: 'add-icon',
                    scope: this,
                    handler: this.onAddClick
                }]
            }]
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
                updateGridJobWO();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesOrder: function(button, event, mode) {},
    saveRecurr: function() {
        if (validasiSalesOrder()) {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {


        //        this.getStore().load({
        //            // store loading is asynchronous, use a load listener or callback to handle results
        //            callback: this.onStoreLoad
        //        });
    },
    onStoreLoad: function() {
        //        Ext.Msg.show({
        //            title: 'Store Load Callback',
        //            msg: 'store was loaded, data available for processing',
        //            icon: Ext.Msg.INFO,
        //            buttons: Ext.Msg.OK
        //        });
    },
    onAddClick: function() {
        //        console.log(Ext.getCmp('customerSalesOrder').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        wItemJobWOPopupPopup.show();
        storeGridItemJobWOPopup.load();

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
        var job_item_id = this.getStore().getAt(rowIndex);
        console.log(rowIndex)
        this.getStore().removeAt(rowIndex);

        var job_order_id = Ext.getCmp('job_order_id_woform').getValue();
        Ext.Ajax.request({
            url: SITE_URL + 'production/delete_fg',
            method: 'POST',
            params: {
                job_order_id: job_order_id,
                job_item_id: job_item_id.data.job_item_id
            },
            success: function(form, action) {
                // var d = Ext.decode(form.responseText);
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });

        // var StoreWorkOrderMaterialTab = Ext.getCmp('WorkOrderMaterialTab').getStore();
        // StoreWorkOrderMaterialTab.on('beforeload',function(store, operation,eOpts){
        //                operation.params={
        //                            'extraparams': 'a.job_order_id:'+job_order_id+','+'a.job_item_id:'+job_item_id.data.job_item_id
        //                          };
        //                      });

        // StoreWorkOrderMaterialTab.load();

        updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


function updateGridJobWO() {
    Ext.each(storeGridItemJobWO.data.items, function(obj, i) {
        var total = obj.data.qty * obj.data.size;
        obj.set('total', total);

        var job_order_id = Ext.getCmp('job_order_id_woform').getValue();
        Ext.Ajax.request({
            url: SITE_URL + 'production/save_fg',
            async: false,
            method: 'POST',
            params: {
                job_order_id: job_order_id,
                job_item_id: obj.data.job_item_id,
                idunit: Ext.getCmp('cbUnitWorkOrderGrid').getValue() * 1,
                short_desc: obj.data.short_desc,
                size_measurement: obj.data.size_measurement,
                qty: obj.data.qty,
                size: obj.data.size,
                total: total,
                update: 'true'
            },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);

                storeGridItemJobWO.on('beforeload', function(store, operation, eOpts) {
                    operation.params = {
                        'extraparams': 'a.job_order_id:' + job_order_id
                    };
                });

                storeGridItemJobWO.load();
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    });
}


Ext.define('containerFinishedGoods', {
    extend: 'Ext.container.Container',
    alias: 'widget.containerFinishedGoods',
    id: 'containerFinishedGoods',
    title: 'Finished Goods',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start',
    },
    items: [
        // {html:'panel 2', height:150},
        {
            xtype: 'WorkOrderJobTab',
            minHeight: 250
        },
        WorkOrderMaterialTab
    ]

    // style: { borderColor: 'Red', borderStyle: 'solid', borderWidth: '1px' },
    // width: '50%',
    // padding: '5 5 5 5',
    // items: [{
    //     xtype:'textfield',
    //     fieldLabel:'hahahaha'
    // }]
});
