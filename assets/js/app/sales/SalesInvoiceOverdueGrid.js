Ext.define('SalesInvoiceOverdueGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'idsales','idjournal', 'no_sales_order', 'subtotal', 'freight', 'date_sales', 'tax', 'disc', 'totalamount', 'Overduetoday', 'balance', 'comments', 'noinvoice', 'ddays', 'eomddays', 'percentagedisc', 'daydisc', 'notes_si', 'nocustomer', 'namecustomer', 'idpayment', 'invoice_status', 'invoice_date', 'term', 'duedate', 'no_faktur','no_do'
    ],
    idProperty: 'id'
});
var storeGridSalesInvoiceOverdueGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'SalesInvoiceOverdueGridModel',
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

storeGridSalesInvoiceOverdueGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.idunit:' + Ext.getCmp('idunit_grdsi_od').getValue(),
        'option': 'overdue',
        'startdate': Ext.getCmp('startdate_grdsi_od').getValue(),
        'enddate': Ext.getCmp('enddate_grdsi_od').getValue(),
    };
});

Ext.define('MY.searchGridSalesInvoiceOverdueGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesInvoiceOverdueGrid',
    store: storeGridSalesInvoiceOverdueGrid,
    width: 180
});
var smGridSalesInvoiceOverdueGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSalesInvoiceOverdueGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSalesInvoiceOverdueGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSalesInvoiceOverdueGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'sales.SalesInvoiceOverdueGrid', {
    title: 'Overdue',
    itemId: 'SalesInvoiceOverdueGrid',
    id: 'SalesInvoiceOverdueGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.SalesInvoiceOverdueGrid',
    store: storeGridSalesInvoiceOverdueGrid,
    loadMask: true,
    columns: [{
            header: 'idsales',
            dataIndex: 'idsales',
            hidden: true
        },{
            header: 'idjournal',
            dataIndex: 'idjournal',
            hidden: true
        }, {
            header: 'No Invoice',
            dataIndex: 'noinvoice',
            // hidden: true
        }, {
            header: 'No Delivery',
            dataIndex: 'no_do',
            // hidden: true
        },   {
            header: 'No Sales',
            dataIndex: 'no_sales_order',
            // hidden: true
        },  {
            header: 'No Faktur',
            dataIndex: 'no_faktur',
            minWidth: 130,
            // hidden: true
        }, {
            header: 'Customer',
            dataIndex: 'namecustomer',
            minWidth: 200
        },
        {
            header: 'Invoice Date',
            dataIndex: 'invoice_date',
            minWidth: 150,
            xtype: 'datecolumn',
            format: 'd-m-Y'
        },
        {
            header: 'Sales Date',
            dataIndex: 'date_sales',
            minWidth: 150,
            xtype: 'datecolumn',
            format: 'd-m-Y'
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
            header: 'Term',
            dataIndex: 'term',
            minWidth: 150,
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
            header: 'Total Overdue',
            dataIndex: 'Overduetoday',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Overdue',
            dataIndex: 'balance',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Due Date',
            xtype: 'datecolumn',
            format: 'd-m-Y',
            dataIndex: 'duedate',
            minWidth: 150,
        },
        {
            header: 'Status',
            dataIndex: 'invoice_status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(ArrInvoiceStatus, value);
            }
        },
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                xtype: 'datefield',
                id: 'startdate_grdsi_od',
                format: 'd/m/Y',
                // value: datenow(),
                fieldLabel: 'Invoice Period',
            },
            ' to ',
            {
                xtype: 'datefield',
                id: 'enddate_grdsi_od',
                format: 'd/m/Y',
                // value: datenow(),
                hideLabel: true
                // fieldLabel: 'Date Order',
            }, '-',
            {
                xtype: 'comboxunit',
                valueField: 'idunit',
                id: 'idunit_grdsi_od',
            },
            {
                text: 'Search',
                handler: function() {
                    storeGridSalesInvoiceOverdueGrid.load();
                }
            }, {
                text: 'Clear Filter',
                handler: function() {
                    Ext.getCmp('startdate_grdsi_od').setValue();
                    Ext.getCmp('enddate_grdsi_od').setValue();
                    storeGridSalesInvoiceOverdueGrid.load();
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                itemId: 'paymentInvoiceOverdueGrid',
                text: 'Receive Payment',
                iconCls: 'add-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('SalesInvoiceOverdueGrid')[0];
                    // var grid = Ext.getCmp('GridSalesInvoiceUnpaidGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {
                        windowSalesPayment(selectedRecord.data);
                    }
                }
            }, 
            // {
            //     itemId: 'createInvoiceOverdueGrid',
            //     text: 'Print',
            //     iconCls: 'print-icon',
            //     handler: function() {
            //         var grid = Ext.ComponentQuery.query('SalesInvoiceOverdueGrid')[0];
            //         // var grid = Ext.getCmp('GridSalesInvoiceOverdueGridID');
            //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
            //         var data = grid.getSelectionModel().getSelection();
            //         if (data.length == 0) {
            //             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            //         } else {

            //             if (selectedRecord.data.noInvoiceOverdue !== null) {
            //                 Ext.Msg.alert('Failure', 'InvoiceOverdue untuk data Invoice Period terpilih sudah terbentuk. Silahkan pilih data Invoice Period yang lain');
            //             } else {
            //                 WindowEntrySalesInvoiceOverdue.show();

            //                 var EntrySalesInvoiceOverdue = Ext.getCmp('EntrySalesInvoiceOverdue').getStore();
            //                 EntrySalesInvoiceOverdue.removeAll();
            //                 EntrySalesInvoiceOverdue.sync();

            //                 loadDataFormInvoiceOverdue(selectedRecord.data.idsales);
            //             }
            //         }
            //     }
            // },
            {
                itemId: 'editSalesInvoiceOverdueGrid',
                text: 'Ubah',
                hidden: true,
                iconCls: 'edit-icon',
                handler: function() {
                    // var grid = Ext.ComponentQuery.query('GridSalesInvoiceOverdueGridID')[0];
                    var grid = Ext.getCmp('GridSalesInvoiceOverdueGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                    } else {
                        loadMemberForm(selectedRecord.data.id_member)
                    }
                }
            }, {
                id: 'btnDeleteSalesInvoiceOverdueGrid',
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
                                var grid = Ext.getCmp('GridSalesInvoiceOverdueGridID');
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/SalesInvoiceOverdueGrid',
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
                                storeGridSalesInvoiceOverdueGrid.load();
                            }
                        }
                    });
                },
                //                    disabled: true
            },
            {
                text: 'Batalkan Faktur',
                iconCls: 'edit-icon',
                menu: [
                        {
                            text: 'Batalkan Faktur dan Hapus Jurnal',
                            disabled:btnDisableCancelSalesInvoice,
                            iconCls: 'delete-icon',
                            handler: function() {
                                var grid = Ext.getCmp('SalesInvoiceOverdueGrid');
                                // var grid = Ext.ComponentQuery.query('GridSpendMoney')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0) {
                                    Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                                } else {
                                       if(selectedRecord.data.invoice_status*1==5){
                                            Ext.Msg.alert('Failure', 'Data terpilih sudah dibatalkan.');
                                       } else {
                                            Ext.Msg.show({
                                                  title: 'Confirm',
                                                  msg: 'Delete Selected ?',
                                                  buttons: Ext.Msg.YESNO,
                                                  fn: function(btn) {
                                                      if (btn == 'yes') {
                                                         Ext.Ajax.request({
                                                              url: SITE_URL + 'sales/cancel_invoice',
                                                              method: 'POST',
                                                              params: {
                                                                  idsales: selectedRecord.data.idsales,
                                                                  idjournal: selectedRecord.data.idjournal,
                                                                  idmenu: 95
                                                              },
                                                              success: function(form, action) {
                                                                  var d = Ext.decode(form.responseText);
                                                                  // if (!d.success) {
                                                                      Ext.Msg.alert('Informasi', d.message);
                                                                  // }
                                                                  storeGridSalesInvoiceUnpaidGrid.load();
                                                                  setHeaderInvoice();
                                                              },
                                                              failure: function(form, action) {
                                                                  Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                              }
                                                          });
                                                          
                                                      }
                                                  }
                                              });
                                       }
                                        
                                       
                                }
                            }
                        },
                        {
                            text: 'Batalkan Faktur',
                            disabled:btnDisableCancelSalesInvoice,
                            iconCls: 'delete-icon',
                            handler: function() {
                                var grid = Ext.getCmp('SalesInvoiceOverdueGrid');
                                // var grid = Ext.ComponentQuery.query('GridSpendMoney')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0) {
                                    Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                                } else {

                                    if(selectedRecord.data.invoice_status*1==5){
                                            Ext.Msg.alert('Failure', 'Data terpilih sudah dibatalkan.');
                                    } else {
                                        Ext.Msg.show({
                                              title: 'Confirm',
                                              msg: 'Delete Selected ?',
                                              buttons: Ext.Msg.YESNO,
                                              fn: function(btn) {
                                                  if (btn == 'yes') {
                                                     Ext.Ajax.request({
                                                          url: SITE_URL + 'sales/cancel_invoice2',
                                                          method: 'POST',
                                                          params: {
                                                              idsales: selectedRecord.data.idsales,
                                                              idjournal: selectedRecord.data.idjournal,
                                                              idmenu: 95
                                                          },
                                                          success: function(form, action) {
                                                              var d = Ext.decode(form.responseText);
                                                              // if (!d.success) {
                                                                  Ext.Msg.alert('Informasi', d.message);
                                                              // }
                                                              storeGridSalesInvoiceUnpaidGrid.load();
                                                              setHeaderInvoice();
                                                          },
                                                          failure: function(form, action) {
                                                              Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                          }
                                                      });
                                                      
                                                  }
                                              }
                                          });
                                    }
                                        
                                       
                                }
                            }
                        }
                ]
            }, '->', 'Search: ', ' ', {
                xtype: 'searchGridSalesInvoiceOverdueGrid',
                text: 'Left Button'
            }
        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSalesInvoiceOverdueGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSalesInvoiceOverdueGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // showDataSales(record.data.idsales)
        }
    }
});


function loadMemberForm(id) {
    // anggotaTypeStore.load();

    // var formSalesInvoiceOverdueGrid = Ext.getCmp('formSalesInvoiceOverdueGrid');
    // wSalesInvoiceOverdueGrid.show();
    // formSalesInvoiceOverdueGrid.getForm().load({
    //     url: SITE_URL + 'backend/loadFormData/SalesInvoiceOverdueGrid/1/member',
    //     params: {
    //         extraparams: 'a.id_member:' + id
    //     },
    //     success: function(form, action) {
    //         var obj = Ext.decode(action.response.responseText); 
    //         // console.log(obj);
    //         Ext.getCmp('comboxStatusMember').setValue(obj.data.status*1);
    //         formSalesInvoiceOverdueGrid.getForm().findField("id_member_type").setValue(obj.data.id_member_type);
    //         formSalesInvoiceOverdueGrid.getForm().findField("marital_status").setValue(obj.data.marital_status*1);
    //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     },
    //     failure: function(form, action) {
    //         Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     }
    // })

    // Ext.getCmp('memberFormDetailID').getForm().load({
    //     url: SITE_URL + 'backend/loadFormData/SalesInvoiceOverdueGrid/1/member',
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

    // Ext.getCmp('statusformSalesInvoiceOverdueGrid').setValue('edit');
    // Ext.getCmp('Tabanggota').setActiveTab(0);
}