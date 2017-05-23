Ext.define('GridSalesOrderGridModel', {
    extend: 'Ext.data.Model',
     fields: [
        'idsales','idpayment','idemployee','idjournal','idcustomer','date_sales','no_sales_order','shipto','subtotal','freight','tax','disc','totalamount','comments','userin','datein','status','idcurrency','namecurr','namepayment','firstname','lastname','totalitem','namecustomer','idunit','delivery_date','invoice_status','no_sales_order_quote','idsales_quote','date_sales_quote','firstname','lastname','salesman_id','idtax','rate','no_sales_order_quote','date_sales_quote','idsales_quote'
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

var formSalesOrderGrid = Ext.create('Ext.form.Panel', {
    id: 'formSalesOrderGrid',
    width: 740,
    // autoWidth:true,
    height: 370,
    url: SITE_URL + 'backend/saveform/SalesOrderGrid',
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
            name: 'statusformSalesOrderGrid',
            id: 'statusformSalesOrderGrid'
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
    items: [
        {
            xtype:'EntrySalesOrder'
        }
    ],
    modal: true,
    listeners: {
        'show': function(){
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
Ext.define('GridSalesOrderGrid', {
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
        header: 'No Sales',
        dataIndex: 'no_sales_order',
        minWidth: 150
    }, {
        header: 'Customer Name',
        flex:1,
        dataIndex: 'namecustomer',
        minWidth: 150
    }, {
        header: 'Date Sales',
        dataIndex: 'date_sales',
        minWidth: 150
    },{
        header: 'Delivery Date',
        dataIndex: 'delivery_date',
        minWidth: 150
    }, {
        header: 'Total Item',
        dataIndex: 'totalitem',
        minWidth: 80,xtype:'numbercolumn',align:'right'
    },{
        header: 'Shipping Cost',
        dataIndex: 'freight',
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
    },
     {
        header: 'Status',
        dataIndex: 'status',
        minWidth: 150,xtype:'numbercolumn',align:'right',
        renderer: function(value) {
            return customColumnStatus(ArrSalesStatus,value);
        }
    },
     {
        header: 'Invoice Status',
        dataIndex: 'invoice_status',
        minWidth: 150,xtype:'numbercolumn',align:'right',
        renderer: function(value) {
            return customColumnStatus(ArrInvoiceStatus,value);
        }
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
                var cb_sales_order_status = Ext.getCmp('cb_sales_order_status');
                cb_sales_order_status.setValue(1);
                cb_sales_order_status.setReadOnly(true);

                Ext.getCmp('btnRecordSalesOrder').enable();
            }
        }, {
            itemId: 'editSalesOrderGrid',
            hidden:true,
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
            hidden:true,
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
                                    idmenu:24
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
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesOrderGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showSalesOrderData(record);
            // showSalesOrderData(record);
            // var formAgama = Ext.create('formAgama');
            // var formSalesOrderGrid = Ext.getCmp('formSalesOrderGrid');
            // wSalesOrderGrid.show();
            // formSalesOrderGrid.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/SalesOrderGrid/1',
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
            // Ext.getCmp('statusformSalesOrderGrid').setValue('edit');

            // Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});