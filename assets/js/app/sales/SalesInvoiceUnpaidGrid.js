Ext.define('SalesInvoiceUnpaidGridModel', {
    extend: 'Ext.data.Model',
    fields: [
       'idsales','no_sales_order','subtotal','freight','date_sales','tax','disc','totalamount','paidtoday','balance','comments','noinvoice','ddays','eomddays','percentagedisc','daydisc','notes_si','nocustomer','namecustomer','idpayment','invoice_status','invoice_date'
    ],
    idProperty: 'id'
});
var storeGridSalesInvoiceUnpaidGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'SalesInvoiceUnpaidGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesinvoice/sales',
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

storeGridSalesInvoiceUnpaidGrid.on('beforeload',function(store, operation,eOpts){
       operation.params={
                   // 'extraparams': 'a.invoice_status:'+4
                   'invoice_status':'1,4' //unpaid and partialy paid
                 };
             });

Ext.define('MY.searchGridSalesInvoiceUnpaidGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesInvoiceUnpaidGrid',
    store: storeGridSalesInvoiceUnpaidGrid,
    width: 180
});
var smGridSalesInvoiceUnpaidGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSalesInvoiceUnpaidGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesInvoiceUnpaidGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesInvoiceUnpaidGrid').enable();
        }
    }
});
Ext.define(dir_sys+'sales.SalesInvoiceUnpaidGrid', {
    title: 'Unpaid',
    itemId: 'SalesInvoiceUnpaidGrid',
    id: 'SalesInvoiceUnpaidGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalesInvoiceUnpaidGrid',
    store: storeGridSalesInvoiceUnpaidGrid,
    loadMask: true,
    columns: [{
        header: 'idsales',
        dataIndex: 'idsales',
        hidden: true
    },{
        header: 'No Sales',
        dataIndex: 'no_sales_order',
        hidden: true
    },{
        header: 'No Invoice',
        dataIndex: 'noinvoice',
        hidden: true
    },{
        header: 'Customer',
        dataIndex: 'namecustomer',
        minWidth: 150
    },
    {
        header: 'Invoice Date',
        dataIndex: 'invoice_date',
        minWidth: 150
    },
    {
        header: 'Sales Date',
        dataIndex: 'date_sales',
        minWidth: 150
    },
    {
        header: 'Term Payment',
        dataIndex: 'idpayment',
        minWidth: 150,
        renderer: function(value) {
            return customColumnStatus(paymenttermarr,value);
        }
    },
    {
        header: 'Total Tax',
        dataIndex: 'tax',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },
    {
        header: 'Total Discount',
        dataIndex: 'disc',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },
    {
        header: 'Shipping Cost',
        dataIndex: 'freight',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },
    {
        header: 'Total Amount',
        dataIndex: 'totalamount',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },
    {
        header: 'Total Paid',
        dataIndex: 'paidtoday',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },
    {
        header: 'Total Unpaid',
        dataIndex: 'balance',
        minWidth: 150,xtype:'numbercolumn',align:'right'
    },    
    {
        header: 'Status',
        dataIndex: 'invoice_status',
        minWidth: 150,xtype:'numbercolumn',align:'right',
        renderer: function(value) {
            return customColumnStatus(ArrInvoiceStatus,value);
        }
    },
    ],
    dockedItems: [
         {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
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
                    hideLabel:true
                    // fieldLabel: 'Date Order',
                },'-',
                {
                    xtype:'comboxunit',
                    valueField:'idunit',
                    id:'cbSalesInvoiceUnpaid',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridSalesInvoicePaidGrid.load({
                                params: {
                                  'extraparams': 'a.idunit:'+Ext.getCmp('cbSalesInvoiceUnpaid').getValue()+','+'a.idanggotatype:'+Ext.getCmp('cbUnitPelangganType').getValue()

                                }
                            });
                        }
                    }
                }
            ]
        },{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'paymentInvoiceUnpaidGrid',
            text: 'Receive Payment',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('SalesInvoiceUnpaidGrid')[0];
                 // var grid = Ext.getCmp('GridSalesInvoiceUnpaidGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                   windowSalesPayment(selectedRecord.data);
                }
            }
        },{
            itemId: 'createInvoiceUnpaidGrid',
            text: 'Print',
            iconCls: 'print-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('SalesInvoiceUnpaidGrid')[0];
                 // var grid = Ext.getCmp('GridSalesInvoiceUnpaidGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                     Ext.create('Ext.window.Window', {
                        title: 'Preview Invoice',
                        width: panelW,
                        modal:true,
                        height: panelH,
                        items: [
                            {
                                xtype: 'component',
                                html: '<iframe src="' + SITE_URL + 'sales/print_invoice/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                            }
                        ],
                        buttons: [
                            {
                                text: 'Print',
                                iconCls: 'print-icon',
                                handler: function () {
                                    window.location = SITE_URL + 'sales/print_invoice/' + selectedRecord.data.idsales + '/print';
                                    // storeGridSertifikat.load();
                                }
                            }]
                    }).show();
                }
            }
        }, {
            itemId: 'editSalesInvoiceUnpaidGrid',
            text: 'Ubah',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('GridSalesInvoiceUnpaidGridID')[0];
                 var grid = Ext.getCmp('GridSalesInvoiceUnpaidGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                } else {
                    loadMemberForm(selectedRecord.data.id_member)
                }
            }
        }, {
            id: 'btnDeleteSalesInvoiceUnpaidGrid',
            text: 'Hapus',
            hidden:true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.getCmp('GridSalesInvoiceUnpaidGridID');
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/SalesInvoiceUnpaidGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:95
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
                            storeGridSalesInvoiceUnpaidGrid.load();
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Search: ', ' ', {
            xtype: 'searchGridSalesInvoiceUnpaidGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesInvoiceUnpaidGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesInvoiceUnpaidGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadMemberForm(record.data.id_member)
            // showDataSales(record.data.idsales)
        }
    }
});


function loadMemberForm(id)
{
    // anggotaTypeStore.load();

        // var formSalesInvoiceUnpaidGrid = Ext.getCmp('formSalesInvoiceUnpaidGrid');
        // wSalesInvoiceUnpaidGrid.show();
        // formSalesInvoiceUnpaidGrid.getForm().load({
        //     url: SITE_URL + 'backend/loadFormData/SalesInvoiceUnpaidGrid/1/member',
        //     params: {
        //         extraparams: 'a.id_member:' + id
        //     },
        //     success: function(form, action) {
        //         var obj = Ext.decode(action.response.responseText); 
        //         // console.log(obj);
        //         Ext.getCmp('comboxStatusMember').setValue(obj.data.status*1);
        //         formSalesInvoiceUnpaidGrid.getForm().findField("id_member_type").setValue(obj.data.id_member_type);
        //         formSalesInvoiceUnpaidGrid.getForm().findField("marital_status").setValue(obj.data.marital_status*1);
        //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
        //     }
        // })

        // Ext.getCmp('memberFormDetailID').getForm().load({
        //     url: SITE_URL + 'backend/loadFormData/SalesInvoiceUnpaidGrid/1/member',
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

        // Ext.getCmp('statusformSalesInvoiceUnpaidGrid').setValue('edit');
        // Ext.getCmp('Tabanggota').setActiveTab(0);
}
