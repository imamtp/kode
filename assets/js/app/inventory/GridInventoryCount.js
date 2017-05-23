var wItemInventoryCountPopup = Ext.create(dir_sys+'inventory.wItemInventoryCountPopup');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('GridInventoryCountPopUpModel', {
    extend: 'Ext.data.Model',
    fields: ['inventory_count_item_id', 'idinventory', 'sku_no', 'invno', 'nameinventory', 'warehouse_code', 'qty_stock', 'satuan_pertama', 'qty_count','variance','item_value','total_value','cost','sellingprice'],
    idProperty: 'id'
});



var storeGridInventoryCountPopUp = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryCountPopUpModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_count_items/inventory/',
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



Ext.define('GridInventoryCountPopUp', {
    extend: 'Ext.grid.Panel',
    id: 'GridInventoryCountPopUp',
    alias: 'widget.GridInventoryCountPopUp',
    xtype: 'cell-editing',
    // title: 'Input Pembelian',
    //    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW - 200,
            height: sizeH-300,
            // forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridInventoryCountPopUp,
            columns: [{
                    header: 'inventory_count_item_id',
                    hidden: true,
                    dataIndex: 'inventory_count_item_id'
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
                    minWidth: 100
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
                    //                    id: 'invno',
                    minWidth: 100
                },
                {
                    header: 'Nama Barang',
                    flex:1,
                    dataIndex: 'nameinventory',
                    minWidth: 150,
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
                    minWidth: 100,
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
                    header: 'Qty Hitung',
                    minWidth: 100,
                    dataIndex: 'qty_count',
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
                    header: 'Nilai Barang @',
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
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Tambah Barang',
                        iconCls: 'add-icon',
                        id: 'btnAddItemInventoryCount',
                        scope: this,
                        handler: function (){
                            wItemInventoryCountPopup.show();
                        }
                    }]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridInventoryCountPopUp();
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
                updateGridInventoryCount()
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordTransferStock: function(button, event, mode) {
        /*
            param mode : request or apply
        */
        var json = Ext.encode(Ext.pluck(storeGridInventoryCountPopUp.data.items, 'data'));
        //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitGridInventoryCountPopUp').getValue());

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

                    storeGridInventoryCountPopUp.removeAll();
                    storeGridInventoryCountPopUp.sync();
                    // updateGridPurchase('general');

                    Ext.getCmp('windowPopupInventoryCount').hide();

                    Ext.getCmp('GridInventoryCountID').getStore().load();
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
        // wItemInventoryCountPopup.show();
        // Ext.getCmp('GridItemInventoryCountPopupID').getStore().load();
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        // updateGridPurchase('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});
//////////////////////////////////////////////////////////MAIN MENU///////////////////////////////////////////////////////////////////////


Ext.define('GridInventoryCountModel', {
    extend: 'Ext.data.Model',
    fields: ['inventory_count_id','idunit','status','type_id','notes','date_count','userin','datein','totalitems','totalvariances','total_value','username'],
    idProperty: 'id'
});
var storeGridInventoryCount = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryCountModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_count/inventory',
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

////////
var formFormInventoryCount = Ext.create('Ext.form.Panel', {
    id: 'formFormInventoryCount',
    width: panelW - 100,
    height: sizeH,
    url: SITE_URL + 'inventory/save_real_count',
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
                defaults:{
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
                                allowBlank:false,
                                // id: 'date_count_invrc',
                                format: 'd/m/Y',
                                fieldLabel: 'Date Counted',
                                name: 'date_count',
                            },{
                                xtype:'comboInventoryRealCountStatus',
                                name: 'status'
                            },{
                                xtype:'comboInventoryRealCountType',
                                name: 'type_id',
                                listeners: {
                                    'change': function(field, newValue, oldValue) {
                                       updateGridInventoryCount()
                                    }
                                }
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
                                fieldLabel: 'Notes',
                                name: 'notes',
                                xtype: 'textfield'
                            },
                            {
                                xtype:'hiddenfield',
                                name:'inventory_count_id',
                                id:'inventory_count_id'
                            },
                            {
                                xtype:'hiddenfield',
                                name:'statusform_inventorycount',
                                id:'statusform_inventorycount'
                            }]
                        }
                ]
        },
        {
            xtype: 'tabpanel',
            padding: '10 0 0 0',
            plain:true,
            activeTab: 0, // index or id
            items:[{
                xtype: 'GridInventoryCountPopUp',
                title:'Daftar Barang'
            },{
                title: 'Petugas',
                hidden:true,
                html: 'This is tab 2 content.'
            }]
        }
        
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupFormInventoryCount');
            Ext.getCmp('formFormInventoryCount').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnFormInventoryCountSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {

                var GridInventoryCountPopUpStore = Ext.getCmp('GridInventoryCountPopUp').getStore();
                var ItemGrid= Ext.encode(Ext.pluck(GridInventoryCountPopUpStore.data.items, 'data'));

                form.submit({
                    params:{
                        ItemGrid:ItemGrid
                    },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formFormInventoryCount').getForm().reset();
                        Ext.getCmp('windowPopupInventoryCount').hide();
                        storeGridInventoryCount.load();

                        var GridInventoryCountPopUp = Ext.getCmp('GridInventoryCountPopUp').getStore();
                        GridInventoryCountPopUp.removeAll();
                        GridInventoryCountPopUp.sync();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridInventoryCount.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
////////
var wInventoryCount = Ext.create('widget.window', {
    id: 'windowPopupInventoryCount',
    title: 'Inventory Count',
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
        formFormInventoryCount
        // {
        //     xtype:'GridInventoryCountPopUp'
        // }
    ],
    modal: true,
    listeners: {
        'show': function() {
            storeGridInventoryCount.load();
        }
    }
});




Ext.define('MY.searchGridInventoryCount', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryCount',
    store: storeGridInventoryCount,
    width: 180
});
var smGridInventoryCount = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryCount.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryCount').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryCount').enable();
        }
    }
});

Ext.define(dir_sys + 'inventory.GridInventoryCount', {
    title: 'Real Count',
    itemId: 'GridInventoryCountID',
    id: 'GridInventoryCountID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryCount',
    store: storeGridInventoryCount,
    loadMask: true,
    columns: [{
        header: 'ID',
        dataIndex: 'inventory_count_id'
    }, {
        header: 'Date ',
        dataIndex: 'date_count',
        minWidth: 150
    },{
        header: 'Type',
        dataIndex: 'type_id',
        minWidth: 150,xtype:'numbercolumn',align:'right',
        renderer: function(value) {
            return customColumnStatus(arrInventoryRealCountType,value);
        }
    },{
        header: 'Notes',
        flex:1,
        dataIndex: 'notes',
        minWidth: 150
    },  {
        header: 'Total Items',
        dataIndex: 'totalitems',
        minWidth: 150
    }, {
        header: 'Total Variances',
        dataIndex: 'totalvariances',
        minWidth: 150
    }, {
        header: 'Total Value',
        dataIndex: 'total_value',
        minWidth: 150
    }, {
        header: 'Input By',
        dataIndex: 'username',
        minWidth: 150
    },   {
        header: 'Date and Time',
        dataIndex: 'datein',
        minWidth: 150
    },{
        header: 'Status',
        dataIndex: 'status',
        minWidth: 150,xtype:'numbercolumn',align:'right',
        renderer: function(value) {
            return customColumnStatus(arrInventoryRealCount,value);
        }
    }],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
             {
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
                hideLabel:true
                // fieldLabel: 'Date Order',
            },{
                xtype: 'comboxunit',
                valueField: 'idunit'
            },
            {
                text: 'Search',
                handler: function() {}
            },
            {
                text: 'Clear Filter',
                handler: function() {}
            }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addInventoryCount',
                text: 'Add New',
                iconCls: 'add-icon',
                handler: function() {
                    wInventoryCount.show();
                    var formFormInventoryCount = Ext.getCmp('formFormInventoryCount').getForm();
                    formFormInventoryCount.reset();

                    var GridInventoryCountPopUp = Ext.getCmp('GridInventoryCountPopUp').getStore();
                    GridInventoryCountPopUp.removeAll();
                    GridInventoryCountPopUp.sync();

                    // storeGridInventoryCountPopUp.load();
                    Ext.getCmp('statusform_inventorycount').setValue('input');

                    // Ext.getCmp('btnSaveRequestTS').enable();
                    // Ext.getCmp('btnSaveApplyTS').disable();

                    // Ext.getCmp('no_trans_transfer_inv').setReadOnly(false);

                    

                    formFormInventoryCount.findField('type_id').setValue(1);
                    formFormInventoryCount.findField('status').setValue(1);
                    formFormInventoryCount.findField('status').setReadOnly(true);

                    Ext.getCmp('BtnFormInventoryCountSimpan').enable();

                }
            }, {
                itemId: 'editInventoryCount',
                text: 'Update',
                hidden: true,
                iconCls: 'edit-icon',
                handler: function() {
                    supplierTypeStore.load();

                    var grid = Ext.ComponentQuery.query('GridInventoryCount')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                    } else {
                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                        var formInventoryCount = Ext.getCmp('formInventoryCount');
                        formInventoryCount.getForm().load({
                            url: SITE_URL + 'backend/loadFormData/InventoryCount/1',
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
                        wInventoryCount.show();
                        Ext.getCmp('statusformInventoryCount').setValue('edit');
                        Ext.getCmp('TabSupplier').setActiveTab(0);
                    }
                }
            }, {
                id: 'btnDeleteInventoryCount',
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
                                var grid = Ext.ComponentQuery.query('GridInventoryCount')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/InventoryCount',
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
                                            storeGridInventoryCount.load();
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
                xtype: 'searchGridInventoryCount',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryCount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryCount.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            wInventoryCount.show();

            storeGridInventoryCountPopUp.removeAll();
            storeGridInventoryCountPopUp.sync();

            Ext.getCmp('statusform_inventorycount').setValue('edit');

            var formFormInventoryCount = Ext.getCmp('formFormInventoryCount').getForm();

            formFormInventoryCount.findField('status').setValue(record.data.status*1);
            formFormInventoryCount.findField('status').setReadOnly(false);

            if(record.data.status*1==2){
                Ext.getCmp('BtnFormInventoryCountSimpan').disable();
            } else {
                Ext.getCmp('BtnFormInventoryCountSimpan').enable();
            }
            

            formFormInventoryCount.findField('statusform_inventorycount').setValue('edit');

            formFormInventoryCount.findField('date_count').setValue(record.data.date_count);
            formFormInventoryCount.findField('type_id').setValue(record.data.type_id*1);
            formFormInventoryCount.findField('notes').setValue(record.data.notes);
            formFormInventoryCount.findField('inventory_count_id').setValue(record.data.inventory_count_id);

            storeGridInventoryCountPopUp.on('beforeload',function(store, operation,eOpts){
                   operation.params={
                               'extraparams': 'a.inventory_count_id:'+record.data.inventory_count_id
                             };
                         });
             storeGridInventoryCountPopUp.load();


           

        }
    }
});

function updateGridInventoryCount(){
    console.log('updateGridInventoryCount')
    var type_id = Ext.getCmp('formFormInventoryCount').getForm().findField('type_id').getValue()*1;

    Ext.each(storeGridInventoryCountPopUp.data.items, function(obj, i) {

        var variance = obj.data.qty_stock - obj.data.qty_count;
        if(type_id===1){
            //expense
            var total = obj.data.cost * variance;
            obj.set('item_value', obj.data.cost);
        } else {
            //sales
            var total = obj.data.sellingprice * variance;
            obj.set('item_value', obj.data.sellingprice);
        }
        
        obj.set('variance', variance);
        obj.set('total_value', total);
    });
}