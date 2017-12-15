Ext.create(dir_sys + 'sales.EntrySalesOrder');

Ext.define('GridSalesOrderGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idsales', 'idpayment', 'idemployee', 'idjournal', 'idcustomer', 'date_sales', 'no_sales_order', 'shipto', 'subtotal', 'freight', 'tax', 'disc', 'totalamount', 'comments', 'userin', 'datein', 'status', 'idcurrency', 'namecurr', 'namepayment', 'firstname', 'lastname', 'totalitem', 'namecustomer', 'idunit', 'delivery_date_sales', 'invoice_status', 'no_sales_order_quote', 'idsales_quote', 'date_sales_quote', 'firstname', 'lastname', 'salesman_id', 'idtax', 'rate', 'no_sales_order_quote', 'date_sales_quote', 'include_tax', 'idpayment', 'ddays', 'eomddays', 'percentagedisc', 'daydisc', 'dmax', 'shipaddress', 'total_dpp',
    ],
    idProperty: 'id'
});
var storeGridSalesOrderGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesOrderGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesorder/sales',
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

storeGridSalesOrderGrid.on('beforeload', function(store, operation) {
    operation.params = {
        'extraparams': 'a.idunit:' + Ext.getCmp('idunit_grdso').getValue() + ', ' +
            'a.status:' + Ext.getCmp('status_grdso').getValue() + ', ' +
            'a.idcustomer:' + Ext.getCmp('idcustomer_grdso').getValue() + ', ' +
            'b.namepayment:' + Ext.getCmp('namepayment_grdso').getValue(),
        'startdate': Ext.getCmp('startdate_grdso').getValue(),
        'enddate': Ext.getCmp('enddate_grdso').getValue(),
    }
})
var formSalesOrderGrid = Ext.create('Ext.form.Panel', {
    id: 'formSalesOrderGrid',
    width: 740,
    // autoWidth:true,
    height: 370,
    url: SITE_URL + 'backend/saveform/SalesOrderGrid',
    baseParams: {
        idmenu: 24
    },
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
        anchor: '100%'
        // width: 380
    },
    items: [{
        items: [{
            xtype: 'hiddenfield',
            name: 'idsupplier',
            id: 'idsupplier'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformSalesOrderGrid',
            id: 'statusformSalesOrderGrid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Supplier',
            allowBlank: false,
            name: 'code'
        }, {
            xtype: 'comboxsupplier_type'
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
        }, {
            xtype: 'textfield',
            fieldLabel: 'No Telepon',
            allowBlank: false,
            name: 'telephone'
        }, {
            xtype: 'textfield',
            fieldLabel: 'No Handphone',
            name: 'handphone'
        }]
    }, {
        items: [{
            xtype: 'textfield',
            fieldLabel: 'No Fax',
            name: 'fax'
        }, {
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
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupSalesOrderGrid');
            Ext.getCmp('formSalesOrderGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnSalesOrderGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formSalesOrderGrid').getForm().reset();
                        Ext.getCmp('windowPopupSalesOrderGrid').hide();
                        storeGridSalesOrderGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridSalesOrderGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wSalesOrderGrid = Ext.create('widget.window', {
    id: 'windowPopupSalesOrderGrid',
    title: 'Sales Order Form',
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
    items: [{
        xtype: 'EntrySalesOrder'
    }],
    modal: true,
    listeners: {
        'show': function() {
            storeGridSalesOrderGrid.load();
        }
    }
});


Ext.define('MY.searchGridSalesOrderGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesOrderGrid',
    store: storeGridSalesOrderGrid,
    width: 180
});
var smGridSalesOrderGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSalesOrderGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesOrderGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesOrderGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'sales.GridSalesOrderGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridSalesOrderGrid,
    title: 'Sales Order',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSalesOrderGridID',
    id: 'GridSalesOrderGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesOrderGrid',
    store: storeGridSalesOrderGrid,
    loadMask: true,
    columns: [{
            dataIndex: 'idsales',
            hidden: true,
            header: 'idsales'
        }, {
            dataIndex: 'idunit',
            hidden: true,
            header: 'idunit'
        }, {
            dataIndex: 'comments',
            hidden: true,
            header: 'comments'
        }, {
            header: 'No Sales',
            dataIndex: 'no_sales_order',
            minWidth: 150
        }, {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'center',
            renderer: function(value) {
                return customColumnStatus(ArrSalesStatus, value);
            }
        }, {
            header: 'Customer Name',
            flex: 1,
            dataIndex: 'namecustomer',
            minWidth: 150
        }, {
            xtype: 'datecolumn',
            format: 'd-m-Y',
            align: 'center',
            header: 'Date Sales',
            dataIndex: 'date_sales',
            minWidth: 150
        }, {
            xtype: 'datecolumn',
            format: 'd-m-Y',
            align: 'center',
            header: 'Req Delivery Date',
            dataIndex: 'delivery_date_sales',
            minWidth: 150,
        }, {
            header: 'Total Item',
            dataIndex: 'totalitem',
            minWidth: 80,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Shipping Cost',
            dataIndex: 'freight',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Total Tax',
            dataIndex: 'tax',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Total Discount',
            dataIndex: 'disc',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Total Amount',
            dataIndex: 'totalamount',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        // {
        //     header: 'Invoice Status',
        //     dataIndex: 'invoice_status',
        //     minWidth: 150,
        //     xtype: 'numbercolumn',
        //     align: 'right',
        //     renderer: function(value) {
        //         return customColumnStatus(ArrInvoiceStatus, value);
        //     }
        // }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    id: 'startdate_grdso',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Date Order',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grdso',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                    // fieldLabel: 'Date Order',
                },
                {
                    xtype: 'comboxSalesStatus',
                    id: 'status_grdso',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    id: 'idunit_grdso',
                },
                {
                    xtype: 'comboxCustomer',
                    id: 'idcustomer_grdso',
                },
                {
                    xtype: 'comboxpayment',
                    id: 'namepayment_grdso',
                },
                {
                    text: 'Search',
                    handler: function() {
                        storeGridSalesOrderGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grdso').setValue();
                        Ext.getCmp('enddate_grdso').setValue();
                        Ext.getCmp('idunit_grdso').setValue();
                        Ext.getCmp('idcustomer_grdso').setValue();
                        Ext.getCmp('namepayment_grdso').setValue();
                        Ext.getCmp('status_grdso').setValue();
                        storeGridSalesOrderGrid.load();
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addSalesOrderGrid',
                text: 'Add New Order',
                iconCls: 'add-icon',
                handler: function() {
                    wSalesOrderGrid.show();
                    storeCustomer.load();
                    storeUnit.load();
                    productMeasurementStore.load();
                    StorePayment.load();
                    comboxWarehouseStore.load();

                    clearFormSO();

                    Ext.getCmp('cbUnitEntrySalesOrder').setValue(idunit);
                    Ext.getCmp('statusformSalesOrderGrid').setValue('input');
                    Ext.getCmp('dppSalesOrder').setValue(0);
                    Ext.getCmp('include_tax_so').setValue(1);
                    var cb_sales_order_status = Ext.getCmp('cb_sales_order_status');
                    cb_sales_order_status.setValue(1);
                    cb_sales_order_status.setReadOnly(true);

                    Ext.getCmp('btnRecordSalesOrder').enable();
                }
            }, {
                text: 'Print',
                iconCls: 'print-icon',
                handler: function() {
                    var grid = Ext.getCmp('GridSalesOrderGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {

                        Ext.create('Ext.window.Window', {
                            title: 'Preview Sales Order',
                            modal: true,
                            width: panelW - 100,
                            height: panelH - 200,
                            items: [{
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'sales/print_so/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }],
                            buttons: [{
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function() {
                                    window.open(SITE_URL + 'sales/print_so/' + selectedRecord.data.idsales + '/print', '_blank');
                                }
                            }]
                        }).show();
                    }
                }
            }, {
                text: 'Set Status',
                iconCls: 'edit-icon',
                menu: [{
                        text: 'Confirm',
                        handler: function() {
                            // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
                            var grid = Ext.getCmp('GridSalesOrderGridID');
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0) {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                if (selectedRecord.data.status * 1 == 3) {
                                    Ext.Msg.alert('Failure', 'Sales data already confirm');
                                } else {
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'sales/set_status',
                                        method: 'POST',
                                        params: {
                                            status: 3,
                                            idunit: idunit,
                                            idsales: selectedRecord.data.idsales,
                                            idsales_quote: selectedRecord.data.idsales_quote
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            Ext.Msg.alert('Informasi', d.message);
                                            storeGridSalesOrderGrid.load();
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                }

                            }
                        }
                    },
                    {
                        text: 'Open',
                        disabled: btnDisableOpenSO,
                        handler: function() {
                            // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
                            var grid = Ext.getCmp('GridSalesOrderGridID');
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0) {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                if (selectedRecord.data.status * 1 == 3) {
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'sales/set_status',
                                        method: 'POST',
                                        params: {
                                            status: 1,
                                            idunit: idunit,
                                            idsales: selectedRecord.data.idsales,
                                            idsales_quote: selectedRecord.data.idsales_quote
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            Ext.Msg.alert('Informasi', d.message);
                                            storeGridSalesOrderGrid.load();
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert('Failure', 'Data yang bisa diubah ke status Open hanya data yang dengan status Confirmed');
                                }

                            }
                        }
                    }
                ],


            }, {
                itemId: 'editSalesOrderGrid',
                hidden: true,
                text: 'Edit',
                iconCls: 'edit-icon',
                handler: function() {
                    supplierTypeStore.load();

                    var grid = Ext.ComponentQuery.query('GridSalesOrderGrid')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                    } else {
                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                        var formSalesOrderGrid = Ext.getCmp('formSalesOrderGrid');
                        formSalesOrderGrid.getForm().load({
                            url: SITE_URL + 'backend/loadFormData/SalesOrderGrid/1',
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
                        wSalesOrderGrid.show();
                        Ext.getCmp('statusformSalesOrderGrid').setValue('edit');
                        Ext.getCmp('TabSupplier').setActiveTab(0);
                    }
                }
            }, {
                id: 'btnDeleteSalesOrderGrid',
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
                                var grid = Ext.ComponentQuery.query('GridSalesOrderGrid')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/SalesOrderGrid',
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
                                            storeGridSalesOrderGrid.load();
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
                xtype: 'searchGridSalesOrderGrid',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSalesOrderGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesOrderGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showSalesOrderData(record);
        }
    }
});