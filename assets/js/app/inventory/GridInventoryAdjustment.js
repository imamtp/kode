var wItemInventoryAdjustmentPopup = Ext.create(dir_sys + 'inventory.wItemInventoryAdjustmentPopup');
var wCoaInventoryAdjustment = Ext.create(dir_sys + 'inventory.wCoaInventoryAdjustment');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('GridInventoryAdjustmentPopUpModel', {
    extend: 'Ext.data.Model',
    fields: ['inventory_adjust_item_id', 'idinventory', 'sku_no', 'invno', 'nameinventory', 'warehouse_code', 'qty_stock', 'satuan_pertama', 'qty_adjustment', 'variance', 'item_value', 'total_value', 'cost', 'sellingprice'],
    idProperty: 'id'
});



var storeGridInventoryAdjustmentPopUp = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryAdjustmentPopUpModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_adjust_items/inventory/',
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



Ext.define('GridInventoryAdjustmentPopUp', {
    extend: 'Ext.grid.Panel',
    id: 'GridInventoryAdjustmentPopUp',
    alias: 'widget.GridInventoryAdjustmentPopUp',
    xtype: 'cell-editing',
    // title: 'Input Pembelian',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            // width: panelW - 200,
            height: sizeH - 170,
            forceFit: false,
            autoScroll: true,
            plugins: [this.cellEditing],
            store: storeGridInventoryAdjustmentPopUp,
            columns: [{
                    header: 'inventory_adjust_item_id',
                    hidden: true,
                    dataIndex: 'inventory_adjust_item_id'
                },
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
                    //                    id: 'idinventory'
                },
                {
                    header: 'No. SKU',
                    dataIndex: 'sku_no',
                    //                    id: 'invno',
                    minWidth: 200
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
                    //                    id: 'invno',
                    minWidth: 200
                },
                {
                    header: 'Nama Barang',
                    flex: 1,
                    dataIndex: 'nameinventory',
                    minWidth: 250,
                    //                    id: 'nameinventory'
                },
                {
                    header: 'Gudang',
                    dataIndex: 'warehouse_code',
                    minWidth: 150,
                    //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Sekarang',
                    minWidth: 120,
                    dataIndex: 'qty_stock',
                    align: 'right'
                },
                {
                    header: 'Satuan',
                    dataIndex: 'satuan_pertama',
                    minWidth: 100,
                    //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Penyesuaian',
                    minWidth: 120,
                    dataIndex: 'qty_adjustment',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        // allowBlank: false,
                        minValue: 0
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Selisih',
                    minWidth: 100,
                    dataIndex: 'variance',
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Nilai Perolehan @',
                    minWidth: 150,
                    dataIndex: 'item_value',
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Total Nilai',
                    minWidth: 150,
                    dataIndex: 'total_value',
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
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Tambah Barang',
                    iconCls: 'add-icon',
                    id: 'btnAddItemInventoryAdjustment',
                    scope: this,
                    handler: function() {
                        wItemInventoryAdjustmentPopup.show();
                    }
                }]
            }],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridInventoryAdjustmentPopUp();
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
                updateGridInventoryAdjustment()
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordAdjustmentStock: function(button, event, mode) {
        /*
            param mode : request or apply
        */
        var json = Ext.encode(Ext.pluck(storeGridInventoryAdjustmentPopUp.data.items, 'data'));
        //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitGridInventoryAdjustmentPopUp').getValue());

        Ext.Ajax.request({
            url: SITE_URL + 'inventory/save_transfer_stock',
            method: 'POST',
            params: {
                statusform: Ext.getCmp('statusform_transferstock').getValue(),
                no_trans: Ext.getCmp('no_trans_transfer_inv').getValue(),
                transfer_stock_id: Ext.getCmp('transfer_stock_id').getValue(),
                date_transfer: Ext.getCmp('dateTransferStock').getSubmitValue(),
                memo: Ext.getCmp('memoTransferStock').getValue(),
                idunit: Ext.getCmp('cbunit_transfer_stock').getValue(),
                mode: mode,
                datagrid: json
            },
            success: function(form, action) {

                var d = Ext.decode(form.responseText);
                if (!d.success) {
                    Ext.Msg.alert('Peringatan', d.message);
                } else {
                    Ext.Msg.alert('Success', d.message);

                    // Ext.getCmp('supplierPurchase').setValue(null);

                    storeGridInventoryAdjustmentPopUp.removeAll();
                    storeGridInventoryAdjustmentPopUp.sync();
                    // updateGridPurchase('general');

                    Ext.getCmp('windowPopupInventoryAdjustment').hide();

                    Ext.getCmp('GridInventoryAdjustmentID').getStore().load();
                }

            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });


    },
    saveRecurr: function() {
        if (validasiPurchase()) {
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
        // wItemInventoryAdjustmentPopup.show();
        // Ext.getCmp('GridItemInventoryAdjustmentPopupID').getStore().load();
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        // updateGridPurchase('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});
// //////////////////////////////////////////////////////////MAIN MENU///////////////////////////////////////////////////////////////////////


Ext.define('GridInventoryAdjustmentModel', {
    extend: 'Ext.data.Model',
    fields: ['inventory_adjust_id', 'idunit', 'status', 'idaccount_adjs', 'notes', 'date_adjustment', 'userin', 'datein', 'totalitems', 'totalvariances', 'total_value', 'username', 'accnumber', 'accname'],
    idProperty: 'id'
});
var storeGridInventoryAdjustment = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryAdjustmentModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_adjust/inventory',
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

// ////////
var formFormInventoryAdjustment = Ext.create('Ext.form.Panel', {
    id: 'formFormInventoryAdjustment',
    width: panelW - 100,
    height: sizeH,
    url: SITE_URL + 'inventory/save_adjustment',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [{
            layout: {
                type: 'vbox',
            },
            defaults: {
                padding: '5 0 0 0'
            },
            items: [{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        padding: '0 0 0 5',
                        flex: 1
                    },
                    items: [{
                        xtype: 'datefield',
                        allowBlank: false,
                        // id: 'date_adjustment_invrc',
                        format: 'd/m/Y',
                        fieldLabel: 'Tgl Penyesuaian',
                        name: 'date_adjustment',
                    }, {
                        xtype: 'comboInventoryAdjustmentStatus',
                        name: 'status'
                    }]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        padding: '0 0 0 5',
                        flex: 1
                    },
                    items: [{
                            fieldLabel: 'Catatan',
                            name: 'notes',
                            xtype: 'textfield'
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Persediaan',
                            combineErrors: true,
                            labelWidth: 130,
                            width: 600,
                            msgTarget: 'side',
                            layout: 'hbox',
                            // labelWidth: 150,
                            defaults: {
                                flex: 1,

                                hideLabel: true
                            },
                            items: [{
                                xtype: 'textfield',

                                allowBlank: false,
                                name: 'accname_coa_inv_adjs',
                                id: 'accname_coa_inv_adjs',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnitInvAdjustment').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wCoaInventoryAdjustment.show();
                                                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                                    operation.params = {
                                                        'idunit': Ext.getCmp('cbUnitInvAdjustment').getValue(),
                                                        'idaccounttype': '20'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                name: 'accnumber_coa_inv_adjs',
                                id: 'accnumber_coa_inv_adjs',
                            }, {
                                xtype: 'hiddenfield',
                                name: 'idaccount_adjs',
                                id: 'idaccount_coa_inv_adjs',
                            }]
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'inventory_adjust_id',
                            id: 'inventory_adjust_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'statusform_InventoryAdjustment',
                            id: 'statusform_InventoryAdjustment'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            padding: '10 0 0 0',
            plain: true,
            activeTab: 0, // index or id
            items: [{
                xtype: 'GridInventoryAdjustmentPopUp',
                title: 'Daftar Barang'
            }, {
                title: 'Petugas',
                hidden: true,
                html: 'This is tab 2 content.'
            }]
        }

    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupInventoryAdjustment');
            Ext.getCmp('formFormInventoryAdjustment').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnFormInventoryAdjustmentSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {

                var GridInventoryAdjustmentPopUpStore = Ext.getCmp('GridInventoryAdjustmentPopUp').getStore();
                var ItemGrid = Ext.encode(Ext.pluck(GridInventoryAdjustmentPopUpStore.data.items, 'data'));

                form.submit({
                    params: {
                        ItemGrid: ItemGrid
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formFormInventoryAdjustment').getForm().reset();
                        Ext.getCmp('windowPopupInventoryAdjustment').hide();
                        storeGridInventoryAdjustment.load();

                        var GridInventoryAdjustmentPopUp = Ext.getCmp('GridInventoryAdjustmentPopUp').getStore();
                        GridInventoryAdjustmentPopUp.removeAll();
                        GridInventoryAdjustmentPopUp.sync();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridInventoryAdjustment.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
////////
var wInventoryAdjustment = Ext.create('widget.window', {
    id: 'windowPopupInventoryAdjustment',
    title: 'Inventory Adjustment',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    modal: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
        formFormInventoryAdjustment
        // {
        //     xtype:'GridInventoryAdjustmentPopUp'
        // }
    ],
    modal: true,
    listeners: {
        'show': function() {
            storeGridInventoryAdjustment.load();
        }
    }
});




Ext.define('MY.searchGridInventoryAdjustment', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryAdjustment',
    store: storeGridInventoryAdjustment,
    width: 180
});
var smGridInventoryAdjustment = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryAdjustment.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryAdjustment').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryAdjustment').enable();
        }
    }
});

Ext.define(dir_sys + 'inventory.GridInventoryAdjustment', {
    title: 'Penyesuaian Stok',
    itemId: 'GridInventoryAdjustmentID',
    id: 'GridInventoryAdjustmentID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryAdjustment',
    store: storeGridInventoryAdjustment,
    loadMask: true,
    columns: [{
            header: 'ID',
            dataIndex: 'inventory_adjust_id'
        }, {
            header: 'Date ',
            dataIndex: 'date_adjustment',
            minWidth: 150
        },
        // {
        //     header: 'Type',
        //     dataIndex: 'type_id',
        //     minWidth: 150,
        //     xtype: 'numbercolumn',
        //     align: 'right',
        //     renderer: function(value) {
        //         return customColumnStatus(arrInventoryRealAdjustmentType, value);
        //     }
        // }, 
        {
            header: 'Notes',
            flex: 1,
            dataIndex: 'notes',
            minWidth: 150
        }, {
            header: 'Total Items',
            dataIndex: 'totalitems',
            xtype: 'numbercolumn',
            align: 'right',
            minWidth: 150
        }, {
            header: 'Total Variances',
            dataIndex: 'totalvariances',
            xtype: 'numbercolumn',
            align: 'right',
            minWidth: 150
        }, {
            header: 'Total Value',
            dataIndex: 'total_value',
            xtype: 'numbercolumn',
            align: 'right',
            minWidth: 150
        }, {
            header: 'Input By',
            dataIndex: 'username',
            minWidth: 150
        }, {
            header: 'Date and Time',
            dataIndex: 'datein',
            minWidth: 150
        }, {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(Adjustmentarr, value);
            }
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Period',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                        // fieldLabel: 'Date Order',
                }, {
                    xtype: 'comboxunit',
                    id: 'cbUnitInvAdjustment',
                    valueField: 'idunit'
                },
                {
                    text: 'Search',
                    handler: function() {}
                },
                {
                    text: 'Clear Filter',
                    handler: function() {}
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addInventoryAdjustment',
                text: 'Add New',
                iconCls: 'add-icon',
                handler: function() {
                    wInventoryAdjustment.show();
                    var formFormInventoryAdjustment = Ext.getCmp('formFormInventoryAdjustment').getForm();
                    formFormInventoryAdjustment.reset();

                    var GridInventoryAdjustmentPopUp = Ext.getCmp('GridInventoryAdjustmentPopUp').getStore();
                    GridInventoryAdjustmentPopUp.removeAll();
                    GridInventoryAdjustmentPopUp.sync();

                    // storeGridInventoryAdjustmentPopUp.load();
                    Ext.getCmp('statusform_InventoryAdjustment').setValue('input');

                    // Ext.getCmp('btnSaveRequestTS').enable();
                    // Ext.getCmp('btnSaveApplyTS').disable();

                    // Ext.getCmp('no_trans_transfer_inv').setReadOnly(false);



                    // formFormInventoryAdjustment.findField('type_id').setValue(1);
                    formFormInventoryAdjustment.findField('status').setValue(1);
                    formFormInventoryAdjustment.findField('status').setReadOnly(true);

                    Ext.getCmp('BtnFormInventoryAdjustmentSimpan').enable();

                }
            }, {
                itemId: 'editInventoryAdjustment',
                text: 'Update',
                hidden: true,
                iconCls: 'edit-icon',
                handler: function() {
                    supplierTypeStore.load();

                    var grid = Ext.ComponentQuery.query('GridInventoryAdjustment')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                    } else {
                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                        var formInventoryAdjustment = Ext.getCmp('formInventoryAdjustment');
                        formInventoryAdjustment.getForm().load({
                            url: SITE_URL + 'backend/loadFormData/InventoryAdjustment/1',
                            params: {
                                extraparams: 'a.idsupplier:' + selectedRecord.data.idsupplier
                            },
                            success: function(form, action) {
                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                            }
                        })
                        wInventoryAdjustment.show();
                        Ext.getCmp('statusformInventoryAdjustment').setValue('edit');
                        Ext.getCmp('TabSupplier').setActiveTab(0);
                    }
                }
            }, {
                id: 'btnDeleteInventoryAdjustment',
                text: 'Delete',
                hidden: true,
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridInventoryAdjustment')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/InventoryAdjustment',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected),
                                        idmenu: 24
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            storeGridInventoryAdjustment.load();
                                        }
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });

                            }
                        }
                    });
                },
                //                    disabled: true
            }, '->', 'Pencarian: ', ' ', {
                xtype: 'searchGridInventoryAdjustment',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryAdjustment, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryAdjustment.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            wInventoryAdjustment.show();

            storeGridInventoryAdjustmentPopUp.removeAll();
            storeGridInventoryAdjustmentPopUp.sync();

            Ext.getCmp('statusform_InventoryAdjustment').setValue('edit');

            var formFormInventoryAdjustment = Ext.getCmp('formFormInventoryAdjustment').getForm();

            formFormInventoryAdjustment.findField('status').setValue(record.data.status * 1);
            formFormInventoryAdjustment.findField('status').setReadOnly(false);

            if (record.data.status * 1 == 2) {
                Ext.getCmp('BtnFormInventoryAdjustmentSimpan').disable();
            } else {
                Ext.getCmp('BtnFormInventoryAdjustmentSimpan').enable();
            }


            formFormInventoryAdjustment.findField('statusform_InventoryAdjustment').setValue('edit');

            formFormInventoryAdjustment.findField('date_adjustment').setValue(record.data.date_adjustment);
            // formFormInventoryAdjustment.findField('type_id').setValue(record.data.type_id * 1);
            formFormInventoryAdjustment.findField('notes').setValue(record.data.notes);
            formFormInventoryAdjustment.findField('inventory_adjust_id').setValue(record.data.inventory_adjust_id);

            formFormInventoryAdjustment.findField('accname_coa_inv_adjs').setValue(record.data.accname);
            formFormInventoryAdjustment.findField('accnumber_coa_inv_adjs').setValue(record.data.accnumber);
            formFormInventoryAdjustment.findField('idaccount_adjs').setValue(record.data.idaccount_adjs * 1);

            storeGridInventoryAdjustmentPopUp.on('beforeload', function(store, operation, eOpts) {
                operation.params = {
                    'extraparams': 'a.inventory_adjust_id:' + record.data.inventory_adjust_id
                };
            });
            storeGridInventoryAdjustmentPopUp.load();
        }
    }
});

function updateGridInventoryAdjustment() {
    console.log('updateGridInventoryAdjustment')

    Ext.each(storeGridInventoryAdjustmentPopUp.data.items, function(obj, i) {

        var variance = obj.data.qty_stock - obj.data.qty_adjustment;

        obj.set('item_value', obj.data.cost);
        var total = obj.data.cost * variance;
        obj.set('variance', variance);
        obj.set('total_value', total);
    });
}