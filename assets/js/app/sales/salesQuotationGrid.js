Ext.define('GridSalesQuotationGridModel', {
    extend: 'Ext.data.Model',
     fields: [
        'idsales','idpayment','idemployee','idjournal','idcustomer','date_quote','no_sales_quote','shipto','subtotal','freight','tax','disc','totalamount','comments','userin','datein','status','idcurrency','namecurr','namepayment','firstname','lastname','totalitem','namecustomer','idunit','idtax','rate','comments'
    ],
    idProperty: 'id'
});
var storeGridSalesQuotationGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesQuotationGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesquotation/sales',
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

var formSalesQuotationGrid = Ext.create('Ext.form.Panel', {
    id: 'formSalesQuotationGrid',
    width: 740,
    // autoWidth:true,
    height: 370,
    url: SITE_URL + 'backend/saveform/SalesQuotationGrid',
    baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'100%'
        // width: 380
    },
    items: [
    {
        items: [{
            xtype: 'hiddenfield',
            name: 'idsupplier',
            id: 'idsupplier'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformSalesQuotationGrid',
            id: 'statusformSalesQuotationGrid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Supplier',
            allowBlank: false,
            name: 'code'
        }, {
            xtype:'comboxsupplier_type'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Supplier',
            allowBlank: false,
            name: 'namesupplier'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat',
            allowBlank: false,
            name: 'companyaddress'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat Pengiriman',
            name: 'shipaddress'
        },{
            xtype: 'textfield',
            fieldLabel: 'No Telepon',
            allowBlank: false,
            name: 'telephone'
        },{
            xtype: 'textfield',
            fieldLabel: 'No Handphone',
            name: 'handphone'
        }]
    }, {
        items: [{
            xtype: 'textfield',
            fieldLabel: 'No Fax',
            name: 'fax'
        },{
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kota',
            name: 'city'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Provinsi',
            name: 'state'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode POS',
            name: 'postcode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Negara',
            name: 'country'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            name: 'status',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: 'Catatan',
            name: 'notes'
        }]
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupSalesQuotationGrid');
            Ext.getCmp('formSalesQuotationGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnSalesQuotationGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formSalesQuotationGrid').getForm().reset();
                        Ext.getCmp('windowPopupSalesQuotationGrid').hide();
                        storeGridSalesQuotationGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridSalesQuotationGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wSalesQuotationGrid = Ext.create('widget.window', {
    id: 'windowPopupSalesQuotationGrid',
    title: 'Sales Quotation Form',
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
            xtype:'EntrySalesQuotation'
        }
    ],
    modal: true,
    listeners: {
        'show': function(){
            storeGridSalesQuotationGrid.load();
        }
    }
});


// var formSalesQuotationGrid = Ext.create('Ext.form.Panel', {
//     id: 'formSalesQuotationGrid',
//     width: 660,
//     title: 'Profil',
//     height: 390,
//     url: SITE_URL + 'backend/saveform/SalesQuotationGrid',
//     bodyStyle: 'padding:5px',
//     //    autoWidth:true,
//     forceFit: true,
//     autoScroll: true,
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         //        padding: '5 40 5 5',
//         labelWidth: 120,
//         width: 300
//     },
//     layout: 'hbox',
//     defaults: {
//         padding: '5 10 5 5',
//     },
//     items: [{
//         items: [{
//             xtype: 'hiddenfield',
//             name: 'idsupplier',
//             id: 'idsupplier'
//         }, {
//             xtype: 'hiddenfield',
//             name: 'statusformSalesQuotationGrid',
//             id: 'statusformSalesQuotationGrid'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kode Supplier',
//             allowBlank: false,
//             name: 'code'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Nama Supplier',
//             allowBlank: false,
//             name: 'namesupplier'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Alamat',
//             allowBlank: false,
//             name: 'companyaddress'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Alamat Pengiriman',
//             name: 'shipaddress'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'No Telepon',
//             allowBlank: false,
//             name: 'telephone'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'No Handphone',
//             name: 'handphone'
//         }]
//     }, {
//         items: [{
//             xtype: 'textfield',
//             fieldLabel: 'No Fax',
//             name: 'fax'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Email',
//             name: 'email'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Website',
//             name: 'website'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kota',
//             name: 'city'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Provinsi',
//             name: 'state'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kode POS',
//             name: 'postcode'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Negara',
//             name: 'country'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Catatan',
//             name: 'notes'
//         }]
//     }]
// });
// Ext.define('TabSupplier', {
//     extend: 'Ext.tab.Panel',
//     id: 'TabSupplier',
//     alias: 'widget.TabSupplier',
//     activeTab: 0,
//     autoWidth: '100%',
//     autoScroll: true,
//      defaults: {
//         // autoScroll: true,
//         // bodyPadding: '1 0 15 0'
//     },
//     items: [
//         formSalesQuotationGrid
//         // , {
//         //     xtype: 'GridInventorySupplier',
//         //     listeners: {
//         //         activate: function() {
//         //             storeGridInventorySupplier.load();
//         //         }
//         //     }
//         // }
//     ]
// });
// var wSalesQuotationGrid = Ext.create('widget.window', {
//     id: 'windowPopupSalesQuotationGrid',
//     title: 'Data Supplier',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     //    autoWidth: true,
//     width: 670,
//     minHeight:440,
//     // autoHeight: true,
//     layout: 'fit',
//     border: false,
//     items: [{
//         xtype: 'TabSupplier'
//     }],
//     buttons: [{
//         text: 'Batal',
//         handler: function() {
//             var win = Ext.getCmp('windowPopupSalesQuotationGrid');
//             Ext.getCmp('formSalesQuotationGrid').getForm().reset();
//             win.hide();
//         }
//     }, {
//         id: 'BtnSalesQuotationGridSimpan',
//         text: 'Simpan',
//         handler: function() {
//             var form =Ext.getCmp('formSalesQuotationGrid').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         Ext.getCmp('formSalesQuotationGrid').getForm().reset();
//                         Ext.getCmp('windowPopupSalesQuotationGrid').hide();
//                         storeGridSalesQuotationGrid.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         //                            storeGridSalesQuotationGrid.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });


Ext.define('MY.searchGridSalesQuotationGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesQuotationGrid',
    store: storeGridSalesQuotationGrid,
    width: 180
});
var smGridSalesQuotationGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSalesQuotationGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesQuotationGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesQuotationGrid').enable();
        }
    }
});
Ext.define('GridSalesQuotationGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridSalesQuotationGrid,
    title: 'Sales Quotation',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSalesQuotationGridID',
    id: 'GridSalesQuotationGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesQuotationGrid',
    store: storeGridSalesQuotationGrid,
    loadMask: true,
    columns: [{
        dataIndex:'idsales',
        hidden:true,
        header:'idsales'
    },{
        dataIndex:'idunit',
        hidden:true,
        header:'idunit'
    },{
        dataIndex:'comments',
        hidden:true,
        header:'comments'
    }, {
        header: 'No Quotation',
        dataIndex: 'no_sales_quote',
        minWidth: 150
    }, {
        header: 'Customer Name',
        flex:1,
        dataIndex: 'namecustomer',
        minWidth: 150
    }, {
        header: 'Date Quotation',
        dataIndex: 'date_quote',
        minWidth: 150
    }, {
        header: 'Total Item',
        dataIndex: 'totalitem',
        minWidth: 80,xtype:'numbercolumn',align:'right'
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
                        fieldLabel: 'Date Quotation',
                    },
                    ' to ',
                    {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        // value: datenow(),
                        hideLabel:true
                        // fieldLabel: 'Date Quotation',
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
            itemId: 'addSalesQuotationGrid',
            text: 'Add New Quotation',
            iconCls: 'add-icon',
            handler: function() {
                wSalesQuotationGrid.show();
                storeCustomer.load();
                storeUnit.load();
                Ext.getCmp('cbUnitEntrySalesQuotation').setValue(idunit);
                Ext.getCmp('statusformSalesQuotationGrid').setValue('input');

                productMeasurementStore.load();
                Ext.getCmp('cbSalesQuotation').setValue(1);
                Ext.getCmp('cbSalesQuotation').setReadOnly(true);

                // Ext.getCmp('cb_tax_id_sq').setValue('1');
            }
        },{
            text: 'Print',
            iconCls: 'print-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('GridSalesQuotationGridID')[0];
                 var grid = Ext.getCmp('GridSalesQuotationGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                      
                    Ext.create('Ext.window.Window', {
                        title: 'Preview Sales Quotation',
                        modal:true,
                        width: panelW-100,
                        height: panelH-200,
                        items: [
                            {
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'sales/print_quotation/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }
                        ],
                        buttons: [
                            {
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function () {
                                    window.open(SITE_URL + 'sales/print_quotation/' + selectedRecord.data.idsales + '/print', '_blank');
                                }
                            }]
                    }).show();
                }
            }
        }, {
            itemId: 'editSalesQuotationGrid',
            text: 'Edit',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
                supplierTypeStore.load();
                
                var grid = Ext.ComponentQuery.query('GridSalesQuotationGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formSalesQuotationGrid = Ext.getCmp('formSalesQuotationGrid');
                    formSalesQuotationGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/SalesQuotationGrid/1',
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
                    wSalesQuotationGrid.show();
                    Ext.getCmp('statusformSalesQuotationGrid').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteSalesQuotationGrid',
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
                            var grid = Ext.ComponentQuery.query('GridSalesQuotationGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/SalesQuotationGrid',
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
                                        storeGridSalesQuotationGrid.load();
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
            xtype: 'searchGridSalesQuotationGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesQuotationGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesQuotationGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showSalesQuotationData(record)
            // var formAgama = Ext.create('formAgama');
            // var formSalesQuotationGrid = Ext.getCmp('formSalesQuotationGrid');
            // wSalesQuotationGrid.show();
            // formSalesQuotationGrid.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/SalesQuotationGrid/1',
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
            // Ext.getCmp('statusformSalesQuotationGrid').setValue('edit');

            // Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});