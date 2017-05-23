var WindowSelectorSalesReturn = Ext.create(dir_sys+'sales.WindowSelectorSalesReturn');

Ext.define('ItemSalesReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem','idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','price','qty','total','ratetax','disc','short_desc','warehouse_code'],
    idProperty: 'id'
});

var storeGridItemSalesReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ItemSalesReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemSalesReturn/sales',
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
                    align: 'right'
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
//                    width:50,
                    dataIndex: 'ratetax',
                    editor: {
                        xtype: 'comboxtax',
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
                            id:'btnAddItemSalesReturn',
                            scope: this,
                            handler: this.onAddClick
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [  
                        {
                            xtype: 'radiogroup',
                            labelWidth:180,
                            fieldLabel: 'Load from Sales Order?',
                            columns: 2,
                            vertical: true,
                            items: [
                                {boxLabel: 'Yes', name: 'is_from_so', inputValue: 1, width:50},
                                {boxLabel: 'No', name: 'is_from_so', inputValue: 2, checked: true, width:50}
                            ],
                            listeners: {
                              change: function(radiogroup, radio) {
                                if(radio.is_from_so==2)
                                {
                                    Ext.getCmp('no_sales_order_sr').hide();
                                    Ext.getCmp('sales_order_date_sr').hide();
                                    Ext.getCmp('credit_memo_so_sr').show();
                                    
                                } else {
                                    Ext.getCmp('no_sales_order_sr').show();
                                    Ext.getCmp('sales_order_date_sr').show();
                                    Ext.getCmp('credit_memo_so_sr').hide();
                                }
                              }
                            }
                        },
                        {
                            xtype: 'textfield',
                            margin: '0 0 0 185',
                            hidden:true,
                            fieldLabel: 'Sales Order',
                            labelWidth: 120,
                            name: 'no_sales_order',
                            id: 'no_sales_order_sr',
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
                            fieldLabel:'Order Date',
                            id:'sales_order_date_sr'
                        },
                        {
                            xtype: 'textfield',
                            margin: '0 0 0 185',
                            fieldLabel: 'Credit Memo',
                            labelWidth: 120,
                            name: 'credit_memo_so',
                            id: 'credit_memo_so_sr',
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
                            xtype:'hiddenfield',
                            id:'sales_return_id_sr',
                            name:'sales_return_id'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'idsales_order_sr',
                            name:'idsales'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'statusformSalesReturnGrid_sr',
                            name:'statusFormSalesReturn'
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
                            id: 'nojurnalSalesReturn_sr',
                            fieldLabel: 'No Doc #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoID(4, Ext.getCmp('cbUnitEntrySalesReturn').getValue(),'idsales','sales','nojurnalSalesReturn_sr','SR');
                                        // insertNoRef(4, Ext.getCmp('cbUnitEntrySalesReturn').getValue(), 'nojurnalSalesReturn_sr','SR');
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
                            xtype: 'datefield',
                            hidden:true,
                            id: 'tglPelunasanSalesReturn_sr',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        },
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 100,
                            valueField: 'idunit',
                            id: 'cbUnitEntrySalesReturn'
//                            ,multiSelect:true
                        }
                    ]
                } ,
                
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
                            xtype: 'comboxcurrency',
                            id: 'comboxcurrencySalesReturn_sr',
                            labelWidth: 120
                        },
//                         {
//                             xtype: 'comboxpayment',
//                             labelWidth: 120,
//                             id: 'paymentSalesReturn_sr',
//                             valueField: 'idpayment',
//                             listeners: {
//                                 select: {
//                                     fn: function(combo, value) {
//                                         if (combo.getValue() == 3)
//                                         {
//                                             //kredit
//                                             Ext.getCmp('tglPelunasanSalesReturn').setDisabled(false);
//                                             Ext.getCmp('pembayaranSalesReturn').setValue(0);
// //                                                Ext.getCmp('pembayaranSalesReturn').setReadOnly(true);
//                                         } else if (combo.getValue() == 4)
//                                         {
//                                             //cod
//                                             Ext.getCmp('tglPelunasanSalesReturn').setDisabled(true);
//                                             Ext.getCmp('tglPelunasanSalesReturn').setValue(null);
//                                             Ext.getCmp('pembayaranSalesReturn').setValue(0);
//                                             Ext.getCmp('pembayaranSalesReturn').setReadOnly(false);
//                                         } else if (combo.getValue() == 1)
//                                         {
//                                             //tunai
//                                             Ext.getCmp('tglPelunasanSalesReturn').setDisabled(true);
//                                             Ext.getCmp('tglPelunasanSalesReturn').setValue(null);
//                                             Ext.getCmp('pembayaranSalesReturn').setValue(0);
//                                             Ext.getCmp('pembayaranSalesReturn').setReadOnly(false);
//                                         }
//                                     }
//                                 }
//                             }
//                         },
                        {
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 100,
                            value:'Sales Return ',
                            id: 'memoSalesReturn_sr',
                            fieldLabel: 'Memo'
                        }
                    ]
                }

                ,
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                         {
                            itemId: 'recordPayment',
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
                    dock: 'bottom',
                    items: [
                        
                        '->',
                         {
                            xtype: 'textfield',
                            hidden:true,
                            id: 'pembayaranSalesReturn_sr',
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridSalesReturn('general');
                                    }, c);
                                }
                            }
                        }
                          
                       
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'comboxshipping',
                            fieldLabel:'Metode Pengiriman',
                            labelWidth: 120,
                            name:'idshipping',
                            id: 'shippingSalesReturn_sr'
                        }, 
                        {
                            xtype:'textfield',
                            labelWidth: 120,
                            name:'driver_name',
                            id:'driver_name_sr',
                            fieldLabel:'Nama Supier',
                        },{
                            xtype:'textfield',
                            labelWidth: 120,
                            name:'vehicle_number',
                            id:'vehicle_number_sr',
                            fieldLabel:'No Mobil',
                        } ,
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
                            xtype: 'textfield',
                            name:'ship_address',
                            id: 'shipaddressSalesReturn_sr',
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
                                            var extraparams = 'a.idunit:'+Ext.getCmp('cbUnitEntrySalesReturn').getValue();
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
                                        wAddSalesReturnPopup.show();

                                    });
                                }
                            }
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            id: 'angkutSalesReturn_sr',
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridSalesReturn('general');
                                    }, c);
                                }
                            }
                        } 
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'dateShipSalesReturn_sr',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pengiriman'
                        }
                        , 
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
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            name:'notes',
                            id:'notes_sr',
                            width: 500,
                            fieldLabel: 'Catatan'
                        },'->',
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
                updateGridSalesReturn('general');
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
            
            // var json = Ext.encode(Ext.pluck(storeGridItemSalesReturn.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesReturn').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'sales/saveSalesReturn',
                method: 'POST',
                params: {
                    delivery_order_id: Ext.getCmp('delivery_order_id').getValue(),
                    statusform: Ext.getCmp('statusformSalesReturnGrid_sr').getValue(),
                    idsales: Ext.getCmp('id_sales_order_sr').getValue(),
                    // shipaddress: Ext.getCmp('shipaddressSalesReturn_sr').getValue(),
                    idshipping: Ext.getCmp('shippingSalesReturn_sr').getValue(),
                    driver_name: Ext.getCmp('driver_name_sr').getValue(),
                    vehicle_number: Ext.getCmp('vehicle_number_sr').getValue(),
                    ship_address: Ext.getCmp('shipaddressSalesReturn_sr').getValue(),
                    memo: Ext.getCmp('memoSalesReturn_sr').getValue(),
                    notes: Ext.getCmp('notes_sr').getValue(),
                    tanggal: Ext.getCmp('tanggalSalesReturn_sr').getSubmitValue(),
                    unit: Ext.getCmp('cbUnitEntrySalesReturn').getValue(),
                    status: Ext.getCmp('cb_sales_order_status_sr').getValue()
                    // datagrid: json
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
            // storeGridItemSalesPopupOrder.load();

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
        updateGridSalesReturn('general')
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
    if (tipe == 'general')
    {
        //jurnal umu store storeJ        
//        var storeJ = storeJ;    
        var addprefix = '';
    } else if (tipe == 'recurring')
    {
//        storeJ = storeJrec;
        var addprefix = 'RecSalesReturn';
    }

    var subtotalSalesReturn = 0 * 1;
    var totalSalesReturn = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutSalesReturn = Ext.getCmp('angkutSalesReturn').getValue();
    var pembayaranSalesReturn = Ext.getCmp('pembayaranSalesReturn').getValue();
    var sisaBayarSalesReturn = 0 * 1;

    Ext.each(storeGridItemSalesReturn.data.items, function(obj, i) {
        var total = obj.data.qty * obj.data.price;
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        subtotalSalesReturn += net;
        totalPajak += (net / 100) * obj.data.ratetax * 1;
        obj.set('total', net);
    });

//     console.log(subtotalSalesReturn);
    totalSalesReturn = subtotalSalesReturn + angkutSalesReturn * 1;
//     console.log(totalSalesReturn+' '+totalPajak);
    totalSalesReturn = totalSalesReturn + totalPajak;
//     console.log(totalSalesReturn);
    sisaBayarSalesReturn = totalSalesReturn - pembayaranSalesReturn;

    Ext.getCmp('subtotalSalesReturn' + addprefix).setValue(subtotalSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalSalesReturn' + addprefix).setValue(totalSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('angkutSalesReturn').setValue(angkutSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('pembayaranSalesReturn').setValue(pembayaranSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('sisaBayarSalesReturn').setValue(sisaBayarSalesReturn.toLocaleString('null', {minimumFractionDigits: 2}));

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