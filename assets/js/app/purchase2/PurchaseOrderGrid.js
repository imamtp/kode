// Ext.require([ 
//     dir_sys+'purchase2.EntryPurchaseOrder',
// ]);
var EntryPurchaseOrder = Ext.create(dir_sys+'purchase2.EntryPurchaseOrder');

Ext.define('PurchaseOrderGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idpurchase','idshipping','idpurchasetype','idpurchasestatus','idtax','idpayment','date','requestdate','tax','totalamount','memo','datein','idunit','idcurrency','subtotal','nopurchase','idsupplier','nametax','rate','namesupplier','disc','idpurchase_req','nopurchase_req','date_req'
    ],
    idProperty: 'id'
});
var storePurchaseOrderGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PurchaseOrderGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseOrder/purchase',
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

// storePurchaseOrderGrid.on('beforeload',function(store, operation,eOpts){
//    operation.params={
//                // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
//                'option':'delivered_po'
//                // 'wherenotinschedule':'true'
//              };
//          });

var wPurchaseOrderGrid = Ext.create('widget.window', {
    id: 'windowPopupPurchaseOrderGrid',
    title: 'Purchase Order Form',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
        EntryPurchaseOrder
        // {
        //     xtype:'EntryPurchaseOrder'
        // }
    ],
    modal: true,
    listeners: {
        'show': function(){
            // storePurchaseOrderGrid.load();
        }
    }
});


Ext.define('MY.searchPurchaseOrderGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPurchaseOrderGrid',
    store: storePurchaseOrderGrid,
    width: 180
});
var smPurchaseOrderGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smPurchaseOrderGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePurchaseOrderGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePurchaseOrderGrid').enable();
        }
    }
});

Ext.define(dir_sys+'purchase2.PurchaseOrderGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.PurchaseOrderGrid',
// Ext.define('PurchaseOrderGrid', {
    title: 'Purchase Order',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'PurchaseOrderGridID',
    id: 'PurchaseOrderGridID',
    store: storePurchaseOrderGrid,
    loadMask: true,
    columns: [{
        dataIndex:'idpurchase',
        hidden:true,
        header:'idpurchase'
    },{
        dataIndex:'idunit',
        hidden:true,
        header:'idunit'
    },{
        dataIndex:'comments',
        hidden:true,
        header:'comments'
    }, {
        header: 'No Purchase',
        dataIndex: 'nopurchase',
        minWidth: 150
    }, {
        header: 'Supplier Name',
        flex:1,
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Date Purchase',
        dataIndex: 'date',
        minWidth: 150
    }, {
        header: 'Total Item',
        hidden:true,
        dataIndex: 'totalitem',
        minWidth: 80,xtype:'numbercolumn',align:'right'
    },{
        header: 'Subtotal',
        dataIndex: 'subtotal',hidden:true,
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },{
        header: 'Shipping Cost',
        dataIndex: 'freight',hidden:true,
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },{
        header: 'Total Tax',
        dataIndex: 'tax',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }, {
        header: 'Total Discount',
        dataIndex: 'disc',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }, {
        header: 'Total Amount',
        dataIndex: 'totalamount',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [ {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        // value: datenow(),
                        fieldLabel: 'Date Order',
                    },
                    ' to ',
                    {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        // value: datenow(),
                        hideLabel:true
                        // fieldLabel: 'Date Order',
                    },
                    {
                        xtype:'comboxSalesStatus'
                    }]
        },
    {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype:'comboxunit'
            },
            {
                xtype:'comboxCustomer'
            },
            {
                xtype:'comboxpayment'
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
            itemId: 'addPurchaseOrderGrid',
            text: 'Add New Order',
            iconCls: 'add-icon',
            handler: function() {
                clearFormPO();
                
                wPurchaseOrderGrid.show();
                // storeCustomer.load();
                // storeUnit.load();
                productMeasurementStore.load();
                StorePayment.load();
                comboxWarehouseStore.load();

                // clearFormSO();

                // Ext.getCmp('cbUnitEntryPurchaseOrder').setValue(idunit);
                Ext.getCmp('statusformPurchaseOrderGrid').setValue('input');
                var cb_purchase_order_status = Ext.getCmp('cb_purchase_order_status');
                cb_purchase_order_status.getStore().load();
                cb_purchase_order_status.setValue('1');
                cb_purchase_order_status.setReadOnly(true);

                supplierStore.load();
            }   
        },{
            text: 'Print',
            iconCls: 'print-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('PurchaseRequisitionGridID')[0];
                 var grid = Ext.getCmp('PurchaseOrderGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                      
                    Ext.create('Ext.window.Window', {
                        title: 'Preview Purchase Order',
                        modal:true,
                        width: panelW-100,
                        height: panelH-200,
                        items: [
                            {
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'purchase/print_order/' + selectedRecord.data.idpurchase + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }
                        ],
                        buttons: [
                            {
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function () {
                                    window.open(SITE_URL + 'purchase/print_order/' + selectedRecord.data.idpurchase + '/print', '_blank');
                                }
                            }]
                    }).show();
                }
            }
        }, {
            itemId: 'editPurchaseOrderGrid',
            hidden:true,
            text: 'Edit',
            iconCls: 'edit-icon',
            handler: function() {
                supplierTypeStore.load();
                
                var grid = Ext.ComponentQuery.query('PurchaseOrderGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formPurchaseOrderGrid = Ext.getCmp('formPurchaseOrderGrid');
                    formPurchaseOrderGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/PurchaseOrderGrid/1',
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
                    wPurchaseOrderGrid.show();
                    Ext.getCmp('statusformPurchaseOrderGrid').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeletePurchaseOrderGrid',
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
                            var grid = Ext.ComponentQuery.query('PurchaseOrderGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/PurchaseOrderGrid',
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
                                        storePurchaseOrderGrid.load();
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
        }, '->', 'Searching: ', ' ', {
            xtype: 'searchPurchaseOrderGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storePurchaseOrderGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storePurchaseOrderGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showPurchaseOrderData(record);
            // var formAgama = Ext.create('formAgama');
            // var formPurchaseOrderGrid = Ext.getCmp('formPurchaseOrderGrid');
            // wPurchaseOrderGrid.show();
            // formPurchaseOrderGrid.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/PurchaseOrderGrid/1',
            //     params: {
            //         extraparams: 'a.idsupplier:' + record.data.idsupplier
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })
            // //            
            // //            Ext.getCmp('kddaerahS').setReadOnly(true);
            // Ext.getCmp('statusformPurchaseOrderGrid').setValue('edit');

            // Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});