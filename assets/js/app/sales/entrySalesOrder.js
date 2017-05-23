Ext.require([ 
    dir_sys + 'sales.GridSalesmanSOPopup'
]);

Ext.define('KitchenSink.view.grid.EntrySalesOrder', {
    extend: 'Ext.grid.Panel',
    id: 'EntrySalesOrder',
    alias: 'widget.EntrySalesOrder',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemSalesOrder,
            columns: [
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
//                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'assetaccount',
                    hidden: true,
                    dataIndex: 'assetaccount'
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
                    header: 'Warehouse',
                    hidden:true,
                    dataIndex: 'warehouse_code',
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
                    header: 'Harga',
                    dataIndex: 'price',
                    width: 150,
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan',
                    dataIndex: 'short_desc',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel:true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },                
                {
                    xtype: 'numbercolumn',
                    header: 'Ukuran',
                    width: 70,
                    dataIndex: 'size',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan Ukuran',
                    dataIndex: 'size_measurement',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel:true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Disc (%)',
                    width: 70,
                    dataIndex: 'disc',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    dataIndex: 'total',
                    width: 150,
                    align: 'right'
                },
                {
                    header: 'Pajak',
                    hidden:true,
//                    width:50,
                    dataIndex: 'ratetax',
                    editor: {
                        xtype: 'comboxtax',
                        hideLabel:true,
                        valueField: 'rate',
                        labelWidth: 40
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
                            text: 'Tambah Barang',
                            iconCls: 'add-icon',
                            id:'btnAddItemSalesOrder',
                            scope: this,
                            handler: this.onAddClick
                        }, '->', {
                            xtype: 'textfield',
                            hidden:true,
                            fieldLabel: 'No Invoice',
                            name: 'noinvoice',
                            id: 'noinvoiceSalesOrder'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'radiogroup',
                            id:'is_from_sq_soform',
                            labelWidth:180,
                            fieldLabel: 'Load from Sales Quotation?',
                            columns: 2,
                            vertical: true,
                            items: [
                                {boxLabel: 'Yes', name: 'is_from_sq', inputValue: 1,  width:50},
                                {boxLabel: 'No', name: 'is_from_sq', inputValue: 2, checked: true, width:50}
                            ],
                            listeners: {
                              change: function(radiogroup, radio) {
                                if(radio.is_from_sq==2)
                                {
                                    Ext.getCmp('no_sales_quote').hide();
                                    Ext.getCmp('sales_quotation_date').hide();
                                } else {
                                    Ext.getCmp('no_sales_quote').show();
                                    Ext.getCmp('sales_quotation_date').show();
                                }
                              }
                            }
                        },
                        {
                            xtype: 'textfield',
                            hidden:true,
                            margin: '0 0 0 185',
                            fieldLabel: 'Sales Quotation',
                            labelWidth: 120,
                            name: 'no_sales_quote',
                            id: 'no_sales_quote',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                            wGridSalesQuoteListPopup.show();
                                            
                                            // storeGridSalesQuoteList.on('beforeload',function(store, operation,eOpts){
                                            //     operation.params={
                                            //                 'idunit': Ext.getCmp('idunitRequisition').getValue(),
                                            //                 'status': '1'
                                            //     };
                                            // });
                                            storeGridSalesQuoteList.load();

                                    });
                                }
                            }
                        },
                        {
                            xtype:'displayfield',
                            hidden:true,
                            margin: '0 0 0 7',
                            fieldLabel:'Quotation Date',
                            id:'sales_quotation_date'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'id_sales_quote_SalesOrder',
                            name:'idsales_quote'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'idsales_order',
                            name:'idsales'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'statusformSalesOrderGrid',
                            name:'statusFormSalesOrder'
                        }
                    ]
                },
                 {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalSalesOrder',
                            fieldLabel: 'NO SO #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                         insertNoID(4, Ext.getCmp('cbUnitEntrySalesOrder').getValue(),'idsales','sales','nojurnalSalesOrder','SO');
                                        // insertNoRef(4, Ext.getCmp('cbUnitEntrySalesOrder').getValue(), 'nojurnalSalesOrder','SO');
                                    });
                                }
                            }
                        }, 
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'delivery_date_SalesOrder',
                            format: 'd/m/Y',
                            fieldLabel: 'Delivery Date'
                        }, 
                        {
                            xtype: 'datefield',
                            hidden:true,
                            id: 'tglPelunasanSalesOrder',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        },
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 100,
                            valueField: 'idunit',
                            id: 'cbUnitEntrySalesOrder'
//                            ,multiSelect:true
                        },                        
                        {
                            xtype:'comboxtaxtype',
                            labelWidth: 100,
                            displayField: 'nametax',
                            valueField: 'rate',
                            name: 'idtax',
                            id:'cb_tax_id_so',                            
                              listeners: {
                                select: function(combo, record, index) {
                                  // alert(combo.getValue()); // Return Unitad States and no USA
                                  updateGridSalesOrder();
                                }
                            }
                        }
                    ]
                }, 
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        
                        {
                            xtype: 'comboxCustomer',
                            id: 'customerSalesOrder',
                            labelWidth: 120
                        },
                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Customer',
                        //     name: 'namecustomer',
                        //     id: 'customerSalesOrder',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {

                        //                     wGridSupplierListPopup.show();
                                            
                        //                     storeGridSupplierList.on('beforeload',function(store, operation,eOpts){
                        //                         operation.params={
                        //                                     'idunit': Ext.getCmp('idunitRequisition').getValue(),
                        //                                     'status': '1'
                        //                         };
                        //                     });
                        //                     storeGridSupplierList.load();
                        //             });
                        //         }
                        //     }
                        // },
                        {
                            xtype: 'comboxpayment',
                            hidden:true,
                            labelWidth: 120,
                            id: 'paymentSalesOrder',
                            valueField: 'idpayment',
                            listeners: {
                                select: {
                                    fn: function(combo, value) {
                                        if (combo.getValue() == 3)
                                        {
                                            //kredit
                                            Ext.getCmp('tglPelunasanSalesOrder').setDisabled(false);
                                            Ext.getCmp('pembayaranSalesOrder').setValue(0);
//                                                Ext.getCmp('pembayaranSalesOrder').setReadOnly(true);
                                        } else if (combo.getValue() == 4)
                                        {
                                            //cod
                                            Ext.getCmp('tglPelunasanSalesOrder').setDisabled(true);
                                            Ext.getCmp('tglPelunasanSalesOrder').setValue(null);
                                            Ext.getCmp('pembayaranSalesOrder').setValue(0);
                                            Ext.getCmp('pembayaranSalesOrder').setReadOnly(false);
                                        } else if (combo.getValue() == 1)
                                        {
                                            //tunai
                                            Ext.getCmp('tglPelunasanSalesOrder').setDisabled(true);
                                            Ext.getCmp('tglPelunasanSalesOrder').setValue(null);
                                            Ext.getCmp('pembayaranSalesOrder').setValue(0);
                                            Ext.getCmp('pembayaranSalesOrder').setReadOnly(false);
                                        }
                                    }
                                }
                            }
                        },                        
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Sales Person',
                            labelWidth: 120,
                            name: 'salesman_name',
                            id: 'salesman_name_so',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                            wSalesmanSOPopupPopup.show();
                                            
                                            storeGridSalesmanSOPopup.on('beforeload',function(store, operation,eOpts){
                                                operation.params={
                                                            'extraparams': 'a.status:'+1
                                                };
                                            });
                                            storeGridSalesmanSOPopup.load();

                                    });
                                }
                            }
                        },
                        {
                            xtype:'hiddenfield',
                            name: 'salesman_id',
                            id: 'salesman_id_so',
                        },
                        {
                            xtype:'comboxSalesStatus',
                            id:'cb_sales_order_status'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                         '->', {
                            itemId: 'recordPayment',
                            id:'btnRecordSalesOrder',
                            text: 'Record Sales Order',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordSalesOrder, this, 'noprint', true)
                        },{
                            text: 'Print and Record Sales Order',
                            hidden:true,
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordSalesOrder, this, 'print', true)
                        },
                         // '->',
                        //  {
                        //     xtype: 'textfield',
                        //     hidden:true,
                        //     id: 'sisaBayarSalesOrder',
                        //     align: 'right',
                        //     readOnly: true,
                        //     labelWidth: 120,
                        //     fieldLabel: 'Saldo Terhutang ',
                        //     fieldStyle: 'text-align: right;'
                        // }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            id: 'idaccountSalesOrder',
                            name: 'idaccount',
                            readOnly: true
                        }
                        // , {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Akun Persediaan',
                        //     labelWidth: 120,
                        //     name: 'accname',
                        //     id: 'accnameSalesOrder',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                 if (Ext.getCmp('cbUnitEntrySalesOrder').getValue() == null)
                        //                 {
                        //                     Ext.Msg.alert('Akun Persediaan', 'Harap pilih unit terlebih dahulu');
                        //                 } else {
                        //                     windowPopupAccListSalesOrder.show();
                        //                     storeAccountAktive.load({
                        //                         params: {
                        //                             'idunit': Ext.getCmp('cbUnitEntrySalesOrder').getValue()
                        //                         }
                        //                     });
                        //                 }

                        //             });
                        //         }
                        //     }
                        // }
                        , {
                            xtype: 'displayfield',
                            name: 'accnumber',
                            id: 'accnumberSalesOrder',
                            readOnly: true
                        }, '->'
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                       {
                            xtype: 'textfield',
                            id: 'shipaddressSalesOrder',
                            hidden:true,
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        if (group_id == 99)
                                        {
                                            var extraparams = null;
                                        } else {
                                            var extraparams = 'a.idunit:'+Ext.getCmp('cbUnitEntrySalesOrder').getValue();
                                        }

                                        var FormChooseAddress = Ext.getCmp('FormChooseAddress');
                                        FormChooseAddress.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/unitcompany/1/setup',
                                            params: {
                                                extraparams: extraparams
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                console.log(d.alamat)
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        });
                                        wAddSalesOrderPopup.show();

                                    });
                                }
                            }
                        },
                        ,
                        '->',
                          {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalSalesOrder',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'comboxshipping',
                            hidden:true,
                            labelWidth: 120,
                            id: 'shippingSalesOrder'
                        }, '->',
                      {
                            xtype: 'textfield',
                            align: 'right',
                            name:'totalPajak',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajakSalesOrder',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
//                         {
//                             xtype: 'textfield',
//                             id: 'angkutSalesOrder',
//                             align: 'right',
// //                            readOnly: true,
//                             labelWidth: 120,
//                             fieldLabel: 'Biaya Angkut',
//                             fieldStyle: 'text-align: right;',
//                             listeners: {
//                                 'render': function(c) {
//                                     c.getEl().on('keyup', function() {
//                                         updateGridSalesOrder('general');
//                                     }, c);
//                                 }
//                             }
//                         }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 100,
                            value:'Sales Order',
                            id: 'memoSalesOrder',
                            fieldLabel: 'Memo'
                        },
                        {
                            xtype: 'comboxcurrency',
                            hidden:true,
                            id: 'comboxcurrencySalesOrder',
                            labelWidth: 120
                        },
                         '->',
                       {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalSalesOrder',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
//                        {
//                            itemId: 'useRecuringSalesOrder',
//                            text: 'Gunakan Sales Order Tersimpan',
//                            iconCls: 'add-icon',
//                            handler: function() {
//                                wGridRecurringPopup.show();
//                                storeGridRecurringPopup.load();
//                            }
//                        }, {
//                            itemId: 'recordandsaveSalesOrder',
//                            text: 'Simpan Sebagai Sales Order Berulang',
//                            iconCls: 'add-icon',
//                            handler: this.saveRecurr
//                        },
                       
                        // {
                        //     itemId: 'recordSalesOrder',
                        //     text: 'Rekam Sales Order',
                        //     iconCls: 'disk',
                        //     handler: this.recordSalesOrder
                        // }
                        , '->',
                         {
                            xtype: 'textfield',
                            id: 'pembayaranSalesOrder',
                            align: 'right',
                            hidden:true,
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridSalesOrder('general');
                                    }, c);
                                }
                            }
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
                        // disableEntrySalesOrder();
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
                updateGridSalesOrder('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesOrder: function(button, event, mode)
    {
        console.log(Ext.getCmp('idaccountSalesOrder').getValue())
        if (validasiSalesOrder())
        {
            // var dp = Ext.getCmp('angkutSalesOrder').getValue();
            // if(dp!='')
            // {
            //     //cek link dp
            //     Ext.Ajax.request({
            //         url: SITE_URL + 'account/cekAccLink',
            //         method: 'POST',
            //         params: {
            //             idacclink: 17,
            //             idunit:Ext.getCmp('cbUnitEntrySalesOrder').getValue()
            //         },
            //         success: function(form, action) {

            //             var d = Ext.decode(form.responseText);
            //             if (!d.success)
            //             {
            //                 Ext.Msg.alert('Peringatan', d.message);
            //             } else {
            //                 // Ext.getCmp('wEntryPayment').hide();
            //                 // PaymentGridStore.load();
            //             }

            //         },
            //         failure: function(form, action) {
            //             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            //         }
            //     });
            // } 
            
            var json = Ext.encode(Ext.pluck(storeGridItemSalesOrder.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesOrder').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'sales/saveSalesOrder',
                method: 'POST',
                params: {
                    statusform: Ext.getCmp('statusformSalesOrderGrid').getValue(),
                    idsales: Ext.getCmp('idsales_order').getValue(),
                    idsales_quote: Ext.getCmp('id_sales_quote_SalesOrder').getValue(),
                    salesman_id: Ext.getCmp('salesman_id_so').getValue(),
                    customerSalesOrder: Ext.getCmp('customerSalesOrder').getValue(),
                    delivery_date: Ext.getCmp('delivery_date_SalesOrder').getValue(),
                    shipaddressSalesOrder: Ext.getCmp('shipaddressSalesOrder').getValue(),
                    nojurnalSalesOrder: Ext.getCmp('nojurnalSalesOrder').getValue(),
                    memoSalesOrder: Ext.getCmp('memoSalesOrder').getValue(),
                    subtotalSalesOrder: Ext.getCmp('subtotalSalesOrder').getValue(),
                    totalSalesOrder: Ext.getCmp('totalSalesOrder').getValue(),
                    totalPajak: Ext.getCmp('totalPajakSalesOrder').getValue(),
                    shippingSalesOrder: Ext.getCmp('shippingSalesOrder').getValue(),
                    // angkutSalesOrder: Ext.getCmp('angkutSalesOrder').getValue(),
                    pembayaranSalesOrder: Ext.getCmp('pembayaranSalesOrder').getValue(),
                    // sisaBayarSalesOrder: Ext.getCmp('sisaBayarSalesOrder').getValue(),
                    paymentSalesOrder: Ext.getCmp('paymentSalesOrder').getValue(),
                    tglPelunasanSalesOrder: Ext.getCmp('tglPelunasanSalesOrder').getValue(),
                    idcurrency: Ext.getCmp('comboxcurrencySalesOrder').getValue(),
                    idaccountSalesOrder: Ext.getCmp('idaccountSalesOrder').getValue(),
                    noinvoice: Ext.getCmp('noinvoiceSalesOrder').getValue(),
                    unit: Ext.getCmp('cbUnitEntrySalesOrder').getValue(),
                    customerSalesOrder : Ext.getCmp('customerSalesOrder').getValue(),
                    ratetax : Ext.getCmp('cb_tax_id_so').getValue(),
                    sales_order_status : Ext.getCmp('cb_sales_order_status').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('customerSalesOrder').setValue(null);
                        Ext.getCmp('delivery_date_SalesOrder').setValue(null);
                        Ext.getCmp('shipaddressSalesOrder').setValue(null);
                        Ext.getCmp('nojurnalSalesOrder').setValue(null);
                        Ext.getCmp('memoSalesOrder').setValue(null);
                        Ext.getCmp('subtotalSalesOrder').setValue(null);
                        Ext.getCmp('totalSalesOrder').setValue(null);
                        Ext.getCmp('totalPajakSalesOrder').setValue(null);
                        Ext.getCmp('shippingSalesOrder').setValue(null);
                        Ext.getCmp('cb_tax_id_so').setValue(null);
                        // Ext.getCmp('pembayaranSalesOrder').setValue(null);
                        // Ext.getCmp('sisaBayarSalesOrder').setValue(null);
                        // Ext.getCmp('paymentSalesOrder').setValue(null);
                        // Ext.getCmp('tglPelunasanSalesOrder').setValue(null);
                        Ext.getCmp('comboxcurrencySalesOrder').setValue(null);

                        storeGridItemSalesOrder.removeAll();
                        storeGridItemSalesOrder.sync();
                        updateGridSalesOrder('general');

                        // if(mode=='print')
                        // {
                        //     cetak('FAKTUR Sales Order','SalesOrder',d.id);
                        // }

                        Ext.getCmp('windowPopupSalesOrderGrid').hide();
                        Ext.getCmp('GridSalesOrderGridID').getStore().load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiSalesOrder())
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
//        console.log(Ext.getCmp('customerSalesOrder').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
            wItemSalesPopupOrderPopup.show();
            storeGridItemSalesPopupOrder.load();

//        var rec = new JournalStore({
//            idaccount: null,
//            accname: null,
//            accnumber: null,
//            debit: null,
//            credit: null
//        });
//
//        this.getStore().insert(0, rec);
//        this.cellEditing.startEditByPosition({
//            row: 0,
//            column: 0
//        });
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridSalesOrder(tipe)
{
    console.log('update run');
    var addprefix = 'SalesOrder';

    var subtotalSalesOrder = 0 * 1;
    var totalSalesOrder = 0 * 1;
    var totalPajak = 0 * 1;
    // var angkutSalesOrder = Ext.getCmp('angkutSalesOrder').getValue();
     var angkutSalesOrder = 0;
    var pembayaranSalesOrder = Ext.getCmp('pembayaranSalesOrder').getValue();
    var sisaBayarSalesOrder = 0 * 1;
    var taxrate = Ext.getCmp('cb_tax_id_so').getValue();

    Ext.each(storeGridItemSalesOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price * obj.data.size);
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        console.log(total+' - '+diskon);

        subtotalSalesOrder += net;
        totalPajak += (net / 100) * (taxrate * 1);
        obj.set('ratetax', taxrate);
        obj.set('total', net);
    });

//     console.log(subtotalSalesOrder);
    totalSalesOrder = subtotalSalesOrder + angkutSalesOrder * 1;
//     console.log(totalSalesOrder+' '+totalPajak);
    totalSalesOrder = totalSalesOrder + totalPajak;
//     console.log(totalSalesOrder);
    sisaBayarSalesOrder = totalSalesOrder - pembayaranSalesOrder;
    // alert(totalPajak);
    Ext.getCmp('subtotal' + addprefix).setValue(subtotalSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('total' + addprefix).setValue(totalSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('angkutSalesOrder').setValue(angkutSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaran').setValue(pembayaranSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarSalesOrder').setValue(sisaBayarSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiSalesOrder()
{
//    alert(Ext.getCmp('comboxcurrencySalesOrder').getValue());   

    if (Ext.getCmp('nojurnalSalesOrder').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Tentukan No SO #');

    } else if (Ext.getCmp('delivery_date_SalesOrder').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal Delivery Date');
    }  else if (Ext.getCmp('cb_tax_id_so').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Tentukan Jenis Pajak');
    }  else if (Ext.getCmp('customerSalesOrder').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Tentukan konsumen');
    }  else if (Ext.getCmp('salesman_name_so').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Tentukan Sales Person');
    }  else if (Ext.getCmp('memoSalesOrder').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan memo Sales Order');
    }  else {
        return true;
    }
}