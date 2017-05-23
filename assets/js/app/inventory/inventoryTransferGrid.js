
var wItemInventoryTransferPopup = Ext.create(dir_sys+'inventory.wItemInventoryTransferPopup');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Ext.define('GridInventoryTransferPopUpModel', {
    extend: 'Ext.data.Model',
    fields: ['inventory_transfer_item_id','idinventory','sku_no', 'invno', 'nameinventory', 'warehouse_code','warehouse_code_dest','description', 'isinventory', 'qty_transfer','note'],
    idProperty: 'id'
});



var storeGridInventoryTransferPopUp = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryTransferPopUpModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_transfer_items/inventory/',
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



Ext.define('GridInventoryTransferPopUp', {
    extend: 'Ext.grid.Panel',
    id: 'GridInventoryTransferPopUp',
    alias: 'widget.GridInventoryTransferPopUp',
    xtype: 'cell-editing',
    // title: 'Input Pembelian',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
           width: panelW-200,
            height: sizeH,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridInventoryTransferPopUp,
            columns: [
                {
                    header: 'inventory_transfer_item_id',
                    hidden: true,
                    dataIndex: 'inventory_transfer_item_id'
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
                    width: 100
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
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
                    header: 'Gudang Asal',
                    dataIndex: 'warehouse_code',
                    width: 150,
//                    id: 'nameinventory'
                },
                {
                    header: 'Gudang Tujuan',
                    dataIndex: 'warehouse_code_dest',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel:true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                }, 
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Transfer',
                    width: 100,
                    dataIndex: 'qty_transfer',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                }, {
                    header: 'Note',
                    dataIndex: 'note',
                    width: 150,
                    editor: {
                        xtype: 'textfield'
                    }
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
                    items: [
                        {
                            xtype:'textfield',
                            id:'no_trans_transfer_inv',
                            fieldLabel:'No Transaction',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                         insertNoID(4,  Ext.getCmp('cbunit_transfer_stock').getValue(),'transfer_stock_id','inventory_transfer','no_trans_transfer_inv','TRI');
                                        // insertNoRef(4, Ext.getCmp('cbunit_transfer_stock').getValue(), 'nojurnalSalesOrder','SO');
                                    });
                                }
                            }
                        },
                        {
                            xtype:'hiddenfield',
                            name:'transfer_stock_id',
                            id:'transfer_stock_id'
                        }
                        ,{
                            xtype:'comboxunit',
                            valueField: 'idunit',
                            id:'cbunit_transfer_stock',
                            fieldLabel:'Unit'
                        },
                        {
                            xtype:'hiddenfield',
                            name:'statusform',
                            id:'statusform_transferstock'
                        }
                        // {
                        //     xtype:'comboxunit',
                        //     valueField: 'idunit',
                        //     id:'cbDestInventoryStock',
                        //     fieldLabel:'Destination'
                        // },
                    ]
                },
                 {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype:'datefield',
                            id:'dateTransferStock',
                            fieldLabel:'Request Date'
                        },
                        {
                            xtype:'textfield',
                            width:450,
                            id:'memoTransferStock',
                            fieldLabel:'Memo'
                        }
                    ]
                }, 
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Tambah Barang',
                            iconCls: 'add-icon',
                            id:'btnAddItemTransferStock',
                            scope: this,
                            handler: this.onAddClick
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                        {
                            text: 'Request Transfer Stock',
                            id:'btnSaveRequestTS',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordTransferStock, this, 'request', true)
                        },{
                            text: 'Apply Transfer Stock',
                            id:'btnSaveApplyTS',
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordTransferStock, this, 'apply', true)
                        }
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridInventoryTransferPopUp();
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
                // updateGridPurchase('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordTransferStock: function(button, event, mode)
    {
        /*
            param mode : request or apply
        */
       var json = Ext.encode(Ext.pluck(storeGridInventoryTransferPopUp.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitGridInventoryTransferPopUp').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'inventory/save_transfer_stock',
                method: 'POST',
                params: {
                    statusform : Ext.getCmp('statusform_transferstock').getValue(),
                    no_trans: Ext.getCmp('no_trans_transfer_inv').getValue(),
                    transfer_stock_id: Ext.getCmp('transfer_stock_id').getValue(),
                    date_transfer: Ext.getCmp('dateTransferStock').getSubmitValue(),
                    memo : Ext.getCmp('memoTransferStock').getValue(),
                    idunit: Ext.getCmp('cbunit_transfer_stock').getValue(),
                    mode:mode,
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        // Ext.getCmp('supplierPurchase').setValue(null);

                        storeGridInventoryTransferPopUp.removeAll();
                        storeGridInventoryTransferPopUp.sync();
                        // updateGridPurchase('general');

                        Ext.getCmp('windowPopupInventoryTransfer').hide();

                        Ext.getCmp('GridInventoryTransferID').getStore().load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });


    },
    saveRecurr: function() {
        if (validasiPurchase())
        {
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
       wItemInventoryTransferPopup.show();
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


Ext.define('GridInventoryTransferModel', {
    extend: 'Ext.data.Model',
    fields: ['transfer_stock_id','idunit','requestedby_d','approvedby_id','request_date','approved_date','memo','no_transfer','datein','totalitem','totalqty','requestedby','approvedby'],
    idProperty: 'id'
});
var storeGridInventoryTransfer = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryTransferModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventory_transfer/inventory',
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

// var formInventoryTransfer = Ext.create('Ext.form.Panel', {
//     id: 'formInventoryTransfer',
//     width: 740,
//     // autoWidth:true,
//     height: 370,
//     url: SITE_URL + 'backend/saveform/InventoryTransfer',
//     baseParams: {idmenu:24},
//     bodyStyle: 'padding:5px',
//     labelAlign: 'top',
//     autoScroll: true,
//     // layout: 'hbox',
//     defaults: {
//         padding: '5 10 5 5',
//     },
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         labelWidth: 160,
//         anchor:'100%'
//         // width: 380
//     },
//     items: [
//         {
//             xtype:'GridInventoryTransferPopUp'
//         }
//     ],
//     buttons: [{
//         text: 'Batal',
//         handler: function() {
//             var win = Ext.getCmp('windowPopupInventoryTransfer');
//             Ext.getCmp('formInventoryTransfer').getForm().reset();
//             win.hide();
//         }
//     }, {
//         id: 'BtnInventoryTransferSimpan',
//         text: 'Simpan',
//         handler: function() {
//             var form = this.up('form').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         Ext.getCmp('formInventoryTransfer').getForm().reset();
//                         Ext.getCmp('windowPopupInventoryTransfer').hide();
//                         storeGridInventoryTransfer.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         //                            storeGridInventoryTransfer.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });

var wInventoryTransfer = Ext.create('widget.window', {
    id: 'windowPopupInventoryTransfer',
    title: 'Inventory Transfer',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    modal:true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
        {
            xtype:'GridInventoryTransferPopUp'
        }
    ],
    modal: true,
    listeners: {
        'show': function(){
            storeGridInventoryTransfer.load();
        }
    }
});




Ext.define('MY.searchGridInventoryTransfer', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryTransfer',
    store: storeGridInventoryTransfer,
    width: 180
});
var smGridInventoryTransfer = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryTransfer.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryTransfer').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryTransfer').enable();
        }
    }
});
Ext.define('GridInventoryTransfer', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridInventoryTransfer,
    title: 'Transfer Stock',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventoryTransferID',
    id: 'GridInventoryTransferID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryTransfer',
    store: storeGridInventoryTransfer,
    loadMask: true,
    columns: [{
        header: 'transfer_stock_id',
        dataIndex: 'transfer_stock_id',
        hidden: true
    },{
        header: 'No Transfer',
        dataIndex: 'no_transfer',
        minWidth: 150
    }, {
        header: 'Request Date',
        dataIndex: 'request_date',
        minWidth: 150
    },{
        header: 'Approved Date',
        dataIndex: 'approved_date',
        minWidth: 150
    },{
        header: 'Memo',
        dataIndex: 'memo',
        minWidth: 150
    },{
        header: 'Total Item',
        dataIndex: 'totalitem',
        minWidth: 150
    },{
        header: 'Total Qty',
        dataIndex: 'totalqty',
        minWidth: 150
    },{
        header: 'Requested By',
        dataIndex: 'requestedby',
        minWidth: 150
    },{
        header: 'Approved By',
        dataIndex: 'approvedby',
        minWidth: 150
    },{
        header: 'Date and Time',
        dataIndex: 'datein',
        minWidth: 150
    },{
        header: 'Status',
        dataIndex: 'approved_date',
        minWidth: 150,
        renderer: function(value) {
            if(value===null){
                return 'Awaiting Approval';
            } else {
                return 'Approved';
            }
        }
    }
    ],
    dockedItems: [
     {
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
                xtype:'comboxunit',
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
            itemId: 'addInventoryTransfer',
            text: 'Add New',
            iconCls: 'add-icon',
            handler: function() {
                wInventoryTransfer.show();
                // storeGridInventoryTransferPopUp.load();
                Ext.getCmp('statusform_transferstock').setValue('input');

                Ext.getCmp('btnSaveRequestTS').enable();
                Ext.getCmp('btnSaveApplyTS').disable();

                Ext.getCmp('no_trans_transfer_inv').setReadOnly(false);
                
            }
        }, {
            itemId: 'editInventoryTransfer',
            text: 'Update',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
                supplierTypeStore.load();
                
                var grid = Ext.ComponentQuery.query('GridInventoryTransfer')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formInventoryTransfer = Ext.getCmp('formInventoryTransfer');
                    formInventoryTransfer.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/InventoryTransfer/1',
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
                    wInventoryTransfer.show();
                    Ext.getCmp('statusformInventoryTransfer').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteInventoryTransfer',
            text: 'Delete',
            hidden:true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridInventoryTransfer')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/InventoryTransfer',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridInventoryTransfer.load();
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
            xtype: 'searchGridInventoryTransfer',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridInventoryTransfer, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryTransfer.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            console.log(record)
            wInventoryTransfer.show();

            Ext.getCmp('statusform_transferstock').setValue('edit');

            if(record.data.request_date!==null){
                Ext.getCmp('btnSaveRequestTS').disable();
                Ext.getCmp('btnSaveApplyTS').enable();
            } else {
                 Ext.getCmp('btnSaveRequestTS').enable();
                 Ext.getCmp('btnSaveApplyTS').disable();
            }

            if(record.data.approved_date!==null){
                Ext.getCmp('btnSaveRequestTS').disable();
                Ext.getCmp('btnSaveApplyTS').disable();
            }

            var no_trans_transfer_inv = Ext.getCmp('no_trans_transfer_inv');
            no_trans_transfer_inv.setReadOnly(true);
            no_trans_transfer_inv.setValue(record.data.no_transfer);

            Ext.getCmp('cbunit_transfer_stock').setValue(record.data.idunit);
            Ext.getCmp('dateTransferStock').setValue(record.data.request_date);
            Ext.getCmp('memoTransferStock').setValue(record.data.memo);
            Ext.getCmp('transfer_stock_id').setValue(record.data.transfer_stock_id);
            

            storeGridInventoryTransferPopUp.load({
                params:{
                    transfer_stock_id:record.data.transfer_stock_id
                }
            });

        }
    }
});