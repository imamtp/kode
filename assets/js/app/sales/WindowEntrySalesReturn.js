var WindowSelectorSalesReturn = Ext.create(dir_sys+'sales.WindowSelectorSalesReturn');
var wAccReturnSalesCOAPopup = Ext.create(dir_sys+'sales.wAccReturnSalesCOAPopup');

//acc list
Ext.define('GridAccReturnAmount', {
    itemId: 'GridAccReturnAmount',
    id: 'GridAccReturnAmount',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccReturnAmount',
    store: storeGridAccount,
    loadMask: true,
    columns: [
    {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
               setValueAcc(selectedRecord,'wAccReturnAmountPopup','_sales_return');
            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAcc',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridAccount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wAccReturnAmountPopup = Ext.create('widget.window', {
    id: 'wAccReturnAmountPopup',
    title: 'Pilih Akun',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 660,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridAccReturnAmount'
    }]
});
//END LIST ACC TUJUAN

//end acc list

Ext.define('ItemSalesReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['sales_return_id','idsalesitem','idinventory','qty_return','resend','notes','warehouse_id','qty','price','disc','total','ratetax','size','measurement_id_size','qty_kirim','invno','nameinventory','sku_no','measurement_id_one','short_desc','size_measurement','warehouse_code'],
    idProperty: 'id'
});

var storeGridItemSalesReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ItemSalesReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesitemreturn/sales',
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

Ext.define(dir_sys + 'sales.EntrySalesReturn', {
    extend: 'Ext.grid.Panel',
    id: 'EntrySalesReturn',
    alias: 'widget.EntrySalesReturn',
    xtype: 'cell-editing',
    // title: 'Input Sales Return ',
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
            store: storeGridItemSalesReturn,
            columns: [
                {
                    header: 'idsalesitem',
                    hidden: true,
                    dataIndex: 'idsalesitem',
//                    id: 'idinventory'
                },{
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
//                    id: 'idinventory'
                },
                {
                    header: 'No SKU',
                    dataIndex: 'sku_no',
//                    id: 'invno',
                    minWidth: 130
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
//                    id: 'invno',
                    minWidth: 120
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    flex:1,
                    minWidth: 200,
//                    id: 'nameinventory'
                },  
                {
                    xtype: 'numbercolumn',
                    header: 'Harga',
                    dataIndex: 'price',
                    minWidth: 130,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Order',
                    minWidth: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan Order',
                    hidden:true,
                    dataIndex: 'short_desc'
                },

                {
                    xtype: 'numbercolumn',
                    header: 'Ukuran',
                    minWidth: 70,
                    dataIndex: 'size',
                    align: 'right'
                },
                {
                    header: 'Satuan Ukuran',
                    hidden:true,
                    dataIndex: 'size_measurement'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Disc (%)',
                    minWidth: 70,
                    dataIndex: 'disc',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 0
                    // }
                }, {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    dataIndex: 'total',
                    width: 130,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Retur',
                    minWidth: 70,
                    dataIndex: 'qty_return',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Warehouse',
                    minWidth: 120,
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
                    // xtype: 'numbercolumn',
                    header: 'Catatan',
                    minWidth: 150,
                    dataIndex: 'notes',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
//                 {
//                     header: 'Pajak',
//                     hidden:true,
// //                    width:50,
//                     dataIndex: 'ratetax',
//                     editor: {
//                         xtype: 'comboxtax',
//                         valueField: 'rate',
//                         labelWidth: 40
//                     }
//                 },
                {
                    xtype: 'actioncolumn',
                    minWidth: 30,
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
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalSalesReturn_sr',
                            fieldLabel: 'No Doc #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoRef(4, Ext.getCmp('cbUnitEntrySalesReturn').getValue(), 'nojurnalSalesReturn_sr','SR');
                                    });
                                }
                            }
                        }, 
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'tanggalSalesReturn_sr',
                            format: 'd/m/Y',
                            fieldLabel: 'Return Date'
                        }, 
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 100,
                            value:idunit,
                            valueField: 'idunit',
                            id: 'cbUnitEntrySalesReturn'
//                            ,multiSelect:true
                        },               
                        {
                            xtype:'comboxReturnSalesStatus',
                            name:'status',
                            id:'status_sr'
                        }         
                        // {
                        //     xtype:'comboxtaxtype',
                        //     labelWidth: 100,
                        //     valueField:'rate',
                        //     id:'cb_tax_id_sr',                            
                        //       listeners: {
                        //         select: function(combo, record, index) {
                        //           // alert(combo.getValue()); // Return Unitad States and no USA
                        //           updateGridSalesReturn();
                        //         }
                        //     }
                        // }
                    ]
                } ,
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                         {
                            itemId: 'recordPayment',
                            id:'btnRecordSalesReturn',
                            text: 'Record Sales Return ',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordSalesReturn, this, 'noprint', true)
                        }
                        // ,{
                        //     text: 'Print and Record Sales Return ',
                        //     hidden:true,
                        //     iconCls: 'drive_disk-icon',
                        //     handler: Ext.bind(this.recordSalesReturn, this, 'print', true)
                        // },
                        //  '->',
                        //  {
                        //     xtype: 'textfield',
                        //     id: 'sisaBayarSalesReturn_sr',
                        //     align: 'right',
                        //     readOnly: true,
                        //     labelWidth: 120,
                        //     hidden:true,
                        //     fieldLabel: 'Saldo Terhutang ',
                        //     fieldStyle: 'text-align: right;'
                        // }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        
                        {
                            xtype: 'comboxCustomer',
                            id: 'customerSalesReturn_sr',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 120,
                            value:'Sales Return ',
                            id: 'memoSalesReturn_sr',
                            fieldLabel: 'Memo'
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
                            scope: this,
                            handler: this.onAddClick
                        },
                        {
                            xtype:'hiddenfield',
                            id:'sales_return_id_sr',
                            name:'sales_return_id'
                        },
                       
                        {
                            xtype:'hiddenfield',
                            id:'statusformSalesReturnGrid_sr',
                            name:'statusFormSalesReturn'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'tokenSalesReturnGrid_sr',
                            name:'token'
                        }
                    ]
                },

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                            
                         '->',
                          {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalSalesReturn_sr',
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
                            xtype: 'textfield',
                            labelWidth:150,
                            name:'notes',
                            id:'notes_sr',
                            width: 500,
                            fieldLabel: 'Catatan'
                        },
                         '->',
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajakSalesReturn_sr',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Retur Penjualan',
                            combineErrors: true,
                            msgTarget: 'side',
                            layout: 'hbox',
                            labelWidth: 150,
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            items: [{
                                xtype: 'textfield',
                                allowBlank: false,                                
                                name: 'accnametujuan',
                                id: 'accname_coa_sales_return',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnitEntrySalesReturn').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wAccReturnSalesCOAPopup.show();
                                                storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                    operation.params={
                                                                'idunit': Ext.getCmp('cbUnitEntrySalesReturn').getValue(),
                                                                'idaccounttype': '12,16'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_coa_sales_return',
                            }, {
                                xtype: 'hiddenfield',
                                name:'idaccount',
                                id: 'idaccount_coa_sales_return',
                            }]
                        }, 
                      
                         '->',
                          {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalDiskonSalesReturn_sr',
                            fieldLabel: 'Diskon',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth:150,
                            allowBlank: false,
                            name:'nominal',
                            id:'nominal_sales_return',
                            fieldLabel: 'Nominal Dana Retur',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        this.setRawValue(renderNomor(this.getValue()));
                                        // updateSelisih();
                                    }, c);
                                }
                            }
                        },{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Kas/Bank',
                            combineErrors: true,
                            msgTarget: 'side',
                            layout: 'hbox',
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            items: [{
                                xtype: 'textfield',
                                allowBlank: false,
                                fieldLabel: 'Akun Kas/Bank Tujuan',
                                // labelWidth: 150,
                                name: 'accnametujuan',
                                id: 'accname_sales_return',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnitEntrySalesReturn').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wAccReturnAmountPopup.show();
                                                storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                    operation.params={
                                                                'idunit': Ext.getCmp('cbUnitEntrySalesReturn').getValue(),
                                                                'idaccounttype': '19,17,1'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_sales_return',
                            }, {
                                xtype: 'hiddenfield',
                                name:'idaccount',
                                id: 'idaccount_sales_return',
                            }]
                        }, 
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalSalesReturn_sr',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
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
                        // disableEntrySalesReturn();
                    }
                },
                itemdblclick: function(dv, record, item, index, e) {
                    // loadReturnSOData(record);
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
                // updateGridSalesReturn('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesReturn: function(button, event, mode)
    {
        // console.log(Ext.getCmp('idaccountSalesReturn').getValue())
        // if (validasiSalesReturn())
        // {
            // var dp = Ext.getCmp('angkutSalesReturn').getValue();
            // if(dp!='')
            // {
            //     //cek link dp
            //     Ext.Ajax.request({
            //         url: SITE_URL + 'account/cekAccLink',
            //         method: 'POST',
            //         params: {
            //             idacclink: 17,
            //             idunit:Ext.getCmp('cbUnitEntrySalesReturn').getValue()
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
            
            var json = Ext.encode(Ext.pluck(storeGridItemSalesReturn.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesReturn').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'sales/saveSalesReturn',
                method: 'POST',
                params: {
                    statusform: Ext.getCmp('statusformSalesReturnGrid_sr').getValue(),
                    sales_return_id: Ext.getCmp('sales_return_id_sr').getValue(),
                    noreturn: Ext.getCmp('nojurnalSalesReturn_sr').getValue(),
                    tanggal: Ext.getCmp('tanggalSalesReturn_sr').getSubmitValue(),
                    idunit: Ext.getCmp('cbUnitEntrySalesReturn').getValue(),
                    idcustomer: Ext.getCmp('customerSalesReturn_sr').getValue(),
                    memo: Ext.getCmp('memoSalesReturn_sr').getValue(),
                    notes: Ext.getCmp('notes_sr').getValue(),
                    // idsales: Ext.getCmp('idsales_order_sr').getValue(),
                    token: Ext.getCmp('tokenSalesReturnGrid_sr').getValue(),
                    nominal: Ext.getCmp('nominal_sales_return').getValue(),
                    idaccount_bank: Ext.getCmp('idaccount_sales_return').getValue(),
                    subtotal: Ext.getCmp('subtotalSalesReturn_sr').getValue(),
                    totaltax: Ext.getCmp('totalPajakSalesReturn_sr').getValue(),
                    totaldisc: Ext.getCmp('totalDiskonSalesReturn_sr').getValue(),
                    aftertax: Ext.getCmp('totalSalesReturn_sr').getValue(),
                    idaccount_return: Ext.getCmp('idaccount_coa_sales_return').getValue(),
                    status: Ext.getCmp('status_sr').getValue(),                    
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        // Ext.getCmp('customerSalesReturn').setValue(null);
                        // Ext.getCmp('tanggalSalesReturn').setValue(null);
                        // Ext.getCmp('shipaddressSalesReturn').setValue(null);
                        // Ext.getCmp('nojurnalSalesReturn').setValue(null);
                        // Ext.getCmp('memoSalesReturn').setValue(null);
                        // Ext.getCmp('subtotalSalesReturn').setValue(null);
                        // Ext.getCmp('totalSalesReturn').setValue(null);
                        // Ext.getCmp('totalPajak').setValue(null);
                        // Ext.getCmp('shippingSalesReturn').setValue(null);
                        // Ext.getCmp('angkutSalesReturn').setValue(null);
                        // Ext.getCmp('pembayaranSalesReturn').setValue(null);
                        // Ext.getCmp('sisaBayarSalesReturn').setValue(null);
                        // Ext.getCmp('paymentSalesReturn').setValue(null);
                        // Ext.getCmp('tglPelunasanSalesReturn').setValue(null);
                        // Ext.getCmp('comboxcurrencySalesReturn').setValue(null);

                        // storeGridItemSalesReturn.removeAll();
                        // storeGridItemSalesReturn.sync();
                        // updateGridSalesReturn('general');

                        // if(mode=='print')
                        // {
                        //     cetak('FAKTUR Sales Return ','SalesReturn',d.id);
                        // }

                        Ext.getCmp('WindowEntrySalesReturn').hide();
                        Ext.getCmp('WindowSaleOrderList').hide();

                        Ext.getCmp('SalesReturnGrid').getStore.load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        // }


    },
    saveRecurr: function() {
        if (validasiSalesReturn())
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
//        console.log(Ext.getCmp('customerSalesReturn').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
            WindowSelectorSalesReturn.show();

            var store = Ext.getCmp('GridSOSelectorSalesReturn').getStore();

            store.on('beforeload',function(store, operation,eOpts){
                operation.params={
                   'extraparams': 'a.invoice_status:'+2
                   // 'item_selector_sr': true
                 };
             });

            store.load();



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
        console.log(this.getStore().getAt(rowIndex));
        var obj = this.getStore().getAt(rowIndex);
        this.getStore().removeAt(rowIndex);
        

        Ext.Ajax.request({
                    url: SITE_URL + 'sales/del_return_item',
                    method: 'POST',
                    params: {
                        idsalesitem:obj.data.idsalesitem,
                        token:Ext.getCmp('tokenSalesReturnGrid_sr').getValue()
                    },
                    success: function(form, action) {

                        // var d = Ext.decode(form.responseText);
                        // if (!d.success)
                        // {
                        //     Ext.Msg.alert('Peringatan', d.message);
                        // } else {
                        //     // Ext.getCmp('wEntryPayment').hide();
                        //     // PaymentGridStore.load();
                        // }
                        updateGridSalesReturn()
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
        });
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


Ext.define(dir_sys+'sales.WindowEntrySalesReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntrySalesReturn',
    id:'WindowEntrySalesReturn',
    title: 'Entry Sales Return ',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    modal:true,
    closeAction: 'hide',
//    autoWidth: true,
    width: panelW,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'EntrySalesReturn'
    }]
});

function updateGridSalesReturn(tipe)
{
    console.log('update run');

    var addprefix = 'SalesReturn_sr';


    var subtotalSalesReturn = 0 * 1;
    var totalSalesReturn = 0 * 1;
    var totalPajak = 0 * 1;
    // var angkutSalesReturn = Ext.getCmp('angkutSalesReturn').getValue();
    var angkutSalesReturn = 0;
    // var pembayaranSalesReturn = Ext.getCmp('pembayaranSalesReturn').getValue();
    var pembayaranSalesReturn = 0;
    var sisaBayarSalesReturn = 0 * 1;

    Ext.each(storeGridItemSalesReturn.data.items, function(obj, i) {
        var total = (obj.data.qty * obj.data.price) * obj.data.size;
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        subtotalSalesReturn += net;
        totalPajak += (net / 100) * obj.data.ratetax * 1;
        obj.set('total', net);
    });

    console.log(totalPajak);
    totalSalesReturn = subtotalSalesReturn + angkutSalesReturn * 1;
//     console.log(totalSalesReturn+' '+totalPajak);
    totalSalesReturn = totalSalesReturn + totalPajak;
//     console.log(totalSalesReturn);
    sisaBayarSalesReturn = totalSalesReturn - pembayaranSalesReturn;

    // totalDiskonSalesReturn_sr
    // Ext.getCmp('subtotal' + addprefix).setValue(subtotalSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('total' + addprefix).setValue(totalSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));

    Ext.getCmp('subtotal' + addprefix).setValue(renderNomor(subtotalSalesReturn));
    Ext.getCmp('total' + addprefix).setValue(renderNomor(totalSalesReturn));
    Ext.getCmp('totalPajak' + addprefix).setValue(renderNomor(totalPajak));

    // Ext.getCmp('angkut' + addprefix).setValue(angkutSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaran' + addprefix).setValue(pembayaranSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayar' + addprefix).setValue(sisaBayarSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiSalesReturn()
{
//    alert(Ext.getCmp('comboxcurrencySalesReturn').getValue());   

    if (Ext.getCmp('customerSalesReturn').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Supplier belum dipilih');

    } else if (Ext.getCmp('tanggalSalesReturn').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal Sales Return ');
    } else if (Ext.getCmp('shipaddressSalesReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan alamat pengiriman');
    } else if (Ext.getCmp('nojurnalSalesReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan NO SO');
    } else if (Ext.getCmp('memoSalesReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan Memo Sales Return ');
    } else if (Ext.getCmp('totalSalesReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan barang');
    } else if (Ext.getCmp('paymentSalesReturn').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Tentukan pembayaran');
    } else if (Ext.getCmp('paymentSalesReturn').getValue() == 3 && Ext.getCmp('tglPelunasanSalesReturn').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal pelunasan');
    } else if(Ext.getCmp('paymentSalesReturn').getValue()==1 && Ext.getCmp('pembayaranSalesReturn').getValue()==0)
    {
         Ext.Msg.alert('Failed', 'Jumlah Pembayaran Tunai Belum Diinput');
    }
    // else if (Ext.getCmp('paymentSalesReturn').getValue() == 1 && Ext.getCmp('idaccountSalesReturn').getValue() == '')
    // {
    //     //kalo tunai harus menggunakan akun persediaan / barang datang
    //     Ext.Msg.alert('Failed', 'Tentukan akun persediaan/barang dagang');
    // } 
    else {
        return true;
    }
}