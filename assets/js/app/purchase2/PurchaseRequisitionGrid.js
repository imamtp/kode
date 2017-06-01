var EntryPurchaseRequisition = Ext.create(dir_sys + 'purchase2.EntryPurchaseRequisition');

Ext.define('PurchaseRequisitionGridModel', {
    extend: 'Ext.data.Model',
     fields: [
        'idpurchase','idpurchase_req','idshipping','idpurchasetype','idpurchasestatus','idtax','idpayment','date','requestdate','tax','totalamount','memo','datein','idunit','idcurrency','subtotal','nopurchase','idsupplier','nametax','rate','namesupplier','disc','idpurchase_req','requestby_name','requestbyid','status'
    ],
    idProperty: 'id'
});
var storePurchaseRequisitionGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PurchaseRequisitionGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseRequisition/purchase',
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
var wPurchaseRequisitionGrid = Ext.create('widget.window', {
    id: 'windowPopupPurchaseRequisitionGrid',
    title: 'Purchase Requisition Form',
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
        {
            xtype:'EntryPurchaseRequisition'
        }
    ],
    modal: true,
    listeners: {
        'show': function(){
            storePurchaseRequisitionGrid.load();
        },
        'hide': function(){
            Ext.getCmp('supplierPurchaseRequisition').setValue();
            Ext.getCmp('requestby_pr').setValue();
        }
    }
});



Ext.define('MY.searchPurchaseRequisitionGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPurchaseRequisitionGrid',
    store: storePurchaseRequisitionGrid,
    width: 180
});
var smPurchaseRequisitionGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smPurchaseRequisitionGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePurchaseRequisitionGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePurchaseRequisitionGrid').enable();
        }
    }
});
Ext.define(dir_sys+'purchase2.PurchaseRequisitionGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smPurchaseRequisitionGrid,
    title: 'Purchase Requisition',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'PurchaseRequisitionGridID',
    id: 'PurchaseRequisitionGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.PurchaseRequisitionGrid',
    store: storePurchaseRequisitionGrid,
    loadMask: true,
    // ,idshipping,idpurchasetype,idpurchasestatus,idtax,idpayment,date,requestdate,,
    // ,memo,datein,,idcurrency,,,idsupplier,nametax,rate,
    columns: [{
        dataIndex:'idpurchase',
        hidden:true,
        header:'idpurchase'
    },{
        dataIndex:'idpurchase_req',
        hidden:true,
        header:'idpurchase_req'
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
        header: 'Status',
        dataIndex: 'status',
        minWidth: 100
    }, {
        header: 'Supplier Name',
        flex:1,
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Request BY',
        dataIndex: 'requestby_name',
        minWidth: 150
    }, {
        header: 'Date Requisition',
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
        dataIndex: 'tax',hidden:true,
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }, {
        header: 'Total Discount',
        dataIndex: 'disc',hidden:true,
        minWidth: 150,xtype:'numbercolumn',align:'right'
    }, {
        header: 'Total Amount',
        dataIndex: 'totalamount',hidden:true,
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
                        fieldLabel: 'Date Requisition',
                    },
                    ' to ',
                    {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        // value: datenow(),
                        hideLabel:true
                        // fieldLabel: 'Date Requisition',
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
                xtype:'comboxidsupplier'
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
            itemId: 'addPurchaseRequisitionGrid',
            text: 'Add New Requisition',
            iconCls: 'add-icon',
            handler: function() {
                wPurchaseRequisitionGrid.show();

                supplierStore.load();
                storeUnit.load();
                Ext.getCmp('cbUnitEntryPurchaseRequisition').setValue(idunit);
                Ext.getCmp('statusformPurchaseRequisitionGrid').setValue('input');

                productMeasurementStore.load();

                var cbPurchaseRequisition = Ext.getCmp('cbPurchaseRequisition');
                cbPurchaseRequisition.hide();
                // cbPurchaseRequisition.getStore().load();
                // cbPurchaseRequisition.setValue('1');
                // cbPurchaseRequisition.setReadOnly(true);

                // Ext.getCmp('cb_tax_id_sq').setValue('1');
                clearFormPR();
            }
        },{
            text: 'Print',
            iconCls: 'print-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('PurchaseRequisitionGridID')[0];
                 var grid = Ext.getCmp('PurchaseRequisitionGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                      
                    Ext.create('Ext.window.Window', {
                        title: 'Preview Purchase Requisition',
                        modal:true,
                        width: panelW-100,
                        height: panelH-200,
                        items: [
                            {
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'purchase/print_requisition/' + selectedRecord.data.idpurchase + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }
                        ],
                        buttons: [
                            {
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function () {
                                    window.open(SITE_URL + 'purchase/print_requisition/' + selectedRecord.data.idpurchase + '/print', '_blank');
                                }
                            }]
                    }).show();
                }
            }
        }, {
            itemId: 'editPurchaseRequisitionGrid',
            text: 'Edit',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
                supplierTypeStore.load();
                supplierStore.load();

                var grid = Ext.ComponentQuery.query('PurchaseRequisitionGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formPurchaseRequisitionGrid = Ext.getCmp('formPurchaseRequisitionGrid');
                    formPurchaseRequisitionGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/PurchaseRequisitionGrid/1',
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
                    wPurchaseRequisitionGrid.show();
                    Ext.getCmp('statusformPurchaseRequisitionGrid').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeletePurchaseRequisitionGrid',
            hidden:true,
            text: 'Delete',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('PurchaseRequisitionGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/PurchaseRequisitionGrid',
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
                                        storePurchaseRequisitionGrid.load();
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
            xtype: 'searchPurchaseRequisitionGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storePurchaseRequisitionGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storePurchaseRequisitionGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            showPurchaseRequestData(record);

            // var formAgama = Ext.create('formAgama');
            // var formPurchaseRequisitionGrid = Ext.getCmp('formPurchaseRequisitionGrid');
            // wPurchaseRequisitionGrid.show();
            // formPurchaseRequisitionGrid.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/PurchaseRequisitionGrid/1',
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
            // Ext.getCmp('statusformPurchaseRequisitionGrid').setValue('edit');

            // Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});