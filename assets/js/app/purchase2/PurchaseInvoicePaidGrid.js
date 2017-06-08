Ext.define('PurchaseInvoicePaidGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idpurchase', 'idshipping', 'idpurchasetype', 'idpurchasestatus', 'idtax', 'idpayment', 'date', 'requestdate', 'tax', 'totalamount', 'memo', 'datein', 'idunit', 'idcurrency', 'subtotal', 'nopurchase', 'idsupplier', 'nametax', 'rate', 'namesupplier', 'disc', 'invoice_status', 'balance', 'noinvoice', 'paidtoday', 'idpurchase_req', 'nopurchase_req', 'date_req'
    ],
    idProperty: 'id'
});
var storeGridPurchaseInvoicePaidGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PurchaseInvoicePaidGridModel',
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

storeGridPurchaseInvoicePaidGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.invoice_status:' + 2
    };
});

Ext.define('MY.searchGridPurchaseInvoicePaidGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseInvoicePaidGrid',
    store: storeGridPurchaseInvoicePaidGrid,
    width: 180
});
var smGridPurchaseInvoicePaidGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPurchaseInvoicePaidGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePurchaseInvoicePaidGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePurchaseInvoicePaidGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'purchase2.PurchaseInvoicePaidGrid', {
    title: 'Paid',
    itemId: 'PurchaseInvoicePaidGrid',
    id: 'PurchaseInvoicePaidGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.PurchaseInvoicePaidGrid',
    store: storeGridPurchaseInvoicePaidGrid,
    loadMask: true,
    columns: [{
            header: 'idpurchase',
            dataIndex: 'idpurchase',
            hidden: true
        }, {
            header: 'No Invoice',
            dataIndex: 'noinvoice',
            minWidth: 150
        }, {
            header: 'Status',
            dataIndex: 'invoice_status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(ArrInvoiceStatus, value);
            }
        }, {
            header: 'No Sales',
            dataIndex: 'no_sales_order',
            hidden: true
        }, {
            header: 'No Purchase',
            dataIndex: 'nopurchase',
            minWidth: 150
        }, {
            header: 'Supplier Name',
            flex: 1,
            dataIndex: 'namesupplier',
            minWidth: 150
        }, {
            header: 'Date Purchase',
            dataIndex: 'date',
            minWidth: 150
        },
        {
            header: 'Term Payment',
            dataIndex: 'idpayment',
            minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(paymenttermarr, value);
            }
        },
        {
            header: 'Total Tax',
            dataIndex: 'tax',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Discount',
            dataIndex: 'disc',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Shipping Cost',
            dataIndex: 'freight',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Amount',
            dataIndex: 'totalamount',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Paid',
            dataIndex: 'paidtoday',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Outstanding Payment',
            dataIndex: 'balance',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },

    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                xtype: 'datefield',
                format: 'd/m/Y',
                // value: datenow(),
                fieldLabel: 'Invoice Period',
            },
            ' to ',
            {
                xtype: 'datefield',
                format: 'd/m/Y',
                // value: datenow(),
                hideLabel: true
                    // fieldLabel: 'Date Order',
            }, '-',
            {
                xtype: 'comboxunit',
                valueField: 'idunit',
                id: 'cbPurchaseInvoicePaid',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGridPurchaseInvoicePaidGrid.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbPurchaseInvoicePaid').getValue() + ',' + 'a.idanggotatype:' + Ext.getCmp('cbUnitPelangganType').getValue()

                            }
                        });
                    }
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'createInvoicePaidGrid',
            text: 'Print',
            iconCls: 'print-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('PurchaseInvoicePaidGrid')[0];
                // var grid = Ext.getCmp('GridPurchaseInvoicePaidGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {

                    Ext.create('Ext.window.Window', {
                        title: 'Preview Invoice',
                        modal: true,
                        width: panelW - 100,
                        height: panelH - 200,
                        items: [{
                            xtype: 'component',
                            html: '<iframe src="' + SITE_URL + 'purchase/print_invoice/' + selectedRecord.data.idpurchase + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                        }],
                        buttons: [{
                            text: 'Print',
                            iconCls: 'print-icon',
                            handler: function() {
                                window.open(SITE_URL + 'purchase/print_invoice/' + selectedRecord.data.idpurchase + '/print', '_blank');
                            }
                        }]
                    }).show();
                }
            }
        }, {
            itemId: 'editPurchaseInvoicePaidGrid',
            text: 'Ubah',
            hidden: true,
            iconCls: 'edit-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('GridPurchaseInvoicePaidGridID')[0];
                var grid = Ext.getCmp('GridPurchaseInvoicePaidGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                } else {
                    loadMemberForm(selectedRecord.data.id_member)
                }
            }
        }, {
            id: 'btnDeletePurchaseInvoicePaidGrid',
            text: 'Hapus',
            hidden: true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.getCmp('GridPurchaseInvoicePaidGridID');
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/PurchaseInvoicePaidGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu: 95
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            storeGridPurchaseInvoicePaidGrid.load();
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Search: ', ' ', {
            xtype: 'searchGridPurchaseInvoicePaidGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridPurchaseInvoicePaidGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPurchaseInvoicePaidGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showPurchaseOrderData(record);
            // showDataSales(record.data.idsales)
        }
    }
});


function loadMemberForm(id) {
    // anggotaTypeStore.load();

    // var formPurchaseInvoicePaidGrid = Ext.getCmp('formPurchaseInvoicePaidGrid');
    // wPurchaseInvoicePaidGrid.show();
    // formPurchaseInvoicePaidGrid.getForm().load({
    //     url: SITE_URL + 'backend/loadFormData/PurchaseInvoicePaidGrid/1/member',
    //     params: {
    //         extraparams: 'a.id_member:' + id
    //     },
    //     success: function(form, action) {
    //         var obj = Ext.decode(action.response.responseText); 
    //         // console.log(obj);
    //         Ext.getCmp('comboxStatusMember').setValue(obj.data.status*1);
    //         formPurchaseInvoicePaidGrid.getForm().findField("id_member_type").setValue(obj.data.id_member_type);
    //         formPurchaseInvoicePaidGrid.getForm().findField("marital_status").setValue(obj.data.marital_status*1);
    //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     },
    //     failure: function(form, action) {
    //         Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     }
    // })

    // Ext.getCmp('memberFormDetailID').getForm().load({
    //     url: SITE_URL + 'backend/loadFormData/PurchaseInvoicePaidGrid/1/member',
    //     params: {
    //         extraparams: 'a.id_member:' + id
    //     },
    //     success: function(form, action) {
    //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     },
    //     failure: function(form, action) {
    //         Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     }
    // })

    // Ext.getCmp('statusformPurchaseInvoicePaidGrid').setValue('edit');
    // Ext.getCmp('Tabanggota').setActiveTab(0);
}