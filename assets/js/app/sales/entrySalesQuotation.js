Ext.define('KitchenSink.view.grid.EntrySalesQuotation', {
    extend: 'Ext.grid.Panel',
    id: 'EntrySalesQuotation',
    alias: 'widget.EntrySalesQuotation',
    xtype: 'cell-editing',
    // title: 'Input Sales Quotation',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            forceFit: true,
            autoScroll:true,
            plugins: [this.cellEditing],
            store: storeGridItemSalesQuotation,
            columns: [
                {
                    header:'idsalesitem',
                    hidden:true,
                    dataIndex:'idsalesitem'
                },
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
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Measurement',
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
                    width: 100,
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
                            scope: this,
                            handler: this.onAddClick
                        }, '->', {
                            xtype: 'textfield',
                            hidden:true,
                            fieldLabel: 'No Invoice',
                            name: 'noinvoice',
                            id: 'noinvoiceSalesQuotation'
                        },
                        {
                            xtype:'hiddenfield',
                            name:'statusform',
                            id:'statusformSalesQuotationGrid'
                        },
                        {
                            xtype:'hiddenfield',
                            name:'idsales',
                            id:'idsales_quotation'
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
                            id: 'nojurnalSalesQuotation',
                            fieldLabel: 'NO SQ #',
                            readOnly: true,
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoID(4, Ext.getCmp('cbUnitEntrySalesQuotation').getValue(),'idsales','sales','nojurnalSalesQuotation','SQ');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'tanggalSalesQuotation',
                            format: 'd/m/Y',
                            fieldLabel: 'Quotation Date'
                        }, 
                        {
                            xtype:'comboxtaxtype',
                            labelWidth: 120,
                            displayField: 'nametax',
                            valueField: 'rate',
                            name: 'idtax',
                            id:'cb_tax_id_sq',                            
                              listeners: {
                                select: function(combo, record, index) {
                                  // alert(combo.getValue()); // Return Unitad States and no USA
                                  updateGridSalesQuotation();
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            hidden:true,
                            id: 'tglPelunasanSalesQuotation',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        },
                        {
                            xtype:'comboxSalesStatus',
                            name:'sales_quotation_status',
                            id:'cbSalesQuotation'
                        }
                    ]
                }, 
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 120,
                            valueField: 'idunit',
                            id: 'cbUnitEntrySalesQuotation'
//                            ,multiSelect:true
                        },
                        {
                            xtype: 'comboxCustomer',
                            id: 'customerSalesQuotation',
                            labelWidth: 120
                        },
                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Customer',
                        //     name: 'namecustomer',
                        //     id: 'customerSalesQuotation',
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
                            id: 'paymentSalesQuotation',
                            valueField: 'idpayment',
                            listeners: {
                                select: {
                                    fn: function(combo, value) {
                                        if (combo.getValue() == 3)
                                        {
                                            //kredit
                                            Ext.getCmp('tglPelunasanSalesQuotation').setDisabled(false);
                                            Ext.getCmp('pembayaranSalesQuotation').setValue(0);
//                                                Ext.getCmp('pembayaranSalesQuotation').setReadOnly(true);
                                        } else if (combo.getValue() == 4)
                                        {
                                            //cod
                                            Ext.getCmp('tglPelunasanSalesQuotation').setDisabled(true);
                                            Ext.getCmp('tglPelunasanSalesQuotation').setValue(null);
                                            Ext.getCmp('pembayaranSalesQuotation').setValue(0);
                                            Ext.getCmp('pembayaranSalesQuotation').setReadOnly(false);
                                        } else if (combo.getValue() == 1)
                                        {
                                            //tunai
                                            Ext.getCmp('tglPelunasanSalesQuotation').setDisabled(true);
                                            Ext.getCmp('tglPelunasanSalesQuotation').setValue(null);
                                            Ext.getCmp('pembayaranSalesQuotation').setValue(0);
                                            Ext.getCmp('pembayaranSalesQuotation').setReadOnly(false);
                                        }
                                    }
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
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 120,
                            value:'Sales Quotation',
                            id: 'memoSalesQuotation',
                            fieldLabel: 'Memo'
                        }, '->'
                    ]
                },
              
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                         {
                            itemId: 'recordPayment',
                            id:'btnRecordSalesQuote',
                            text: 'Record Sales Quotation',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordSalesQuotation, this, 'noprint', true)
                        },{
                            text: 'Print and Record Sales Quotation',
                            iconCls: 'drive_disk-icon',
                            hidden:true,
                            handler: Ext.bind(this.recordSalesQuotation, this, 'print', true)
                        },
                         
                         
                        {
                            xtype: 'textfield',
                            id: 'sisaBayarSalesQuotation',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            hidden:true,
                            fieldLabel: 'Saldo Terhutang ',
                            fieldStyle: 'text-align: right;'
                        }
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'hiddenfield',
                            id: 'idaccountSalesQuotation',
                            name: 'idaccount',
                            readOnly: true
                        }
                        // , {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Akun Persediaan',
                        //     labelWidth: 120,
                        //     name: 'accname',
                        //     id: 'accnameSalesQuotation',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                 if (Ext.getCmp('cbUnitEntrySalesQuotation').getValue() == null)
                        //                 {
                        //                     Ext.Msg.alert('Akun Persediaan', 'Harap pilih unit terlebih dahulu');
                        //                 } else {
                        //                     windowPopupAccListSalesQuotation.show();
                        //                     storeAccountAktive.load({
                        //                         params: {
                        //                             'idunit': Ext.getCmp('cbUnitEntrySalesQuotation').getValue()
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
                            id: 'accnumberSalesQuotation',
                            readOnly: true
                        }, '->',
                        {
                            xtype: 'textfield',
                            hidden:true,
                            id: 'angkutSalesQuotation',
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridSalesQuotation('general');
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
                            xtype: 'textfield',
                            hidden:true,
                            id: 'shipaddressSalesQuotation',
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
                                            var extraparams = 'a.idunit:'+Ext.getCmp('cbUnitEntrySalesQuotation').getValue();
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
                                        wAddSalesQuotationPopup.show();

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
                            id: 'totalSalesQuotation',
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
                            labelWidth: 120,
                            hidden:true,
                            id: 'shippingSalesQuotation'
                        }, '->',
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajakSalesQuotation',
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
                            xtype: 'comboxcurrency',
                            hidden:true,
                            id: 'comboxcurrencySalesQuotation',
                            labelWidth: 120
                        },
                         '->',
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalSalesQuotation',
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
//                            itemId: 'useRecuringSalesQuotation',
//                            text: 'Gunakan Sales Quotation Tersimpan',
//                            iconCls: 'add-icon',
//                            handler: function() {
//                                wGridRecurringPopup.show();
//                                storeGridRecurringPopup.load();
//                            }
//                        }, {
//                            itemId: 'recordandsaveSalesQuotation',
//                            text: 'Simpan Sebagai Sales Quotation Berulang',
//                            iconCls: 'add-icon',
//                            handler: this.saveRecurr
//                        },
                       
                        // {
                        //     itemId: 'recordSalesQuotation',
                        //     text: 'Rekam Sales Quotation',
                        //     iconCls: 'disk',
                        //     handler: this.recordSalesQuotation
                        // }
                        , '->',
                         {
                            xtype: 'textfield',
                            id: 'pembayaranSalesQuotation',
                            align: 'right',
//                            readOnly: true,
                            hidden:true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridSalesQuotation('general');
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
                        // disableEntrySalesQuotation();
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
                updateGridSalesQuotation('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesQuotation: function(button, event, mode)
    {
        console.log(Ext.getCmp('idaccountSalesQuotation').getValue())
        if (validasiSalesQuotation())
        {
            
            var json = Ext.encode(Ext.pluck(storeGridItemSalesQuotation.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesQuotation').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'sales/saveQuotation',
                method: 'POST',
                params: {
                    idsales: Ext.getCmp('idsales_quotation').getValue(),
                    customerSalesQuotation: Ext.getCmp('customerSalesQuotation').getValue(),
                    tanggalSalesQuotation: Ext.getCmp('tanggalSalesQuotation').getValue(),
                    shipaddressSalesQuotation: Ext.getCmp('shipaddressSalesQuotation').getValue(),
                    nojurnalSalesQuotation: Ext.getCmp('nojurnalSalesQuotation').getValue(),
                    memoSalesQuotation: Ext.getCmp('memoSalesQuotation').getValue(),
                    subtotalSalesQuotation: Ext.getCmp('subtotalSalesQuotation').getValue(),
                    totalSalesQuotation: Ext.getCmp('totalSalesQuotation').getValue(),
                    totalPajak: Ext.getCmp('totalPajakSalesQuotation').getValue(),
                    shippingSalesQuotation: Ext.getCmp('shippingSalesQuotation').getValue(),
                    angkutSalesQuotation: Ext.getCmp('angkutSalesQuotation').getValue(),
                    pembayaranSalesQuotation: Ext.getCmp('pembayaranSalesQuotation').getValue(),
                    sisaBayarSalesQuotation: Ext.getCmp('sisaBayarSalesQuotation').getValue(),
                    paymentSalesQuotation: Ext.getCmp('paymentSalesQuotation').getValue(),
                    tglPelunasanSalesQuotation: Ext.getCmp('tglPelunasanSalesQuotation').getValue(),
                    idcurrency: Ext.getCmp('comboxcurrencySalesQuotation').getValue(),
                    idaccountSalesQuotation: Ext.getCmp('idaccountSalesQuotation').getValue(),
                    noinvoice: Ext.getCmp('noinvoiceSalesQuotation').getValue(),
                    unit: Ext.getCmp('cbUnitEntrySalesQuotation').getValue(),
                    customerSalesQuotation : Ext.getCmp('customerSalesQuotation').getValue(),
                    statusform : Ext.getCmp('statusformSalesQuotationGrid').getValue(),
                    ratetax: Ext.getCmp('cb_tax_id_sq').getValue(),
                    sales_quotation_status : Ext.getCmp('cbSalesQuotation').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('customerSalesQuotation').setValue(null);
                        Ext.getCmp('tanggalSalesQuotation').setValue(null);
                        Ext.getCmp('shipaddressSalesQuotation').setValue(null);
                        Ext.getCmp('nojurnalSalesQuotation').setValue(null);
                        Ext.getCmp('memoSalesQuotation').setValue(null);
                        Ext.getCmp('subtotalSalesQuotation').setValue(null);
                        Ext.getCmp('totalSalesQuotation').setValue(null);
                        // Ext.getCmp('totalPajak').setValue(null);
                        // Ext.getCmp('shippingSalesQuotation').setValue(null);
                        // Ext.getCmp('angkutSalesQuotation').setValue(null);
                        // Ext.getCmp('pembayaranSalesQuotation').setValue(null);
                        // Ext.getCmp('sisaBayarSalesQuotation').setValue(null);
                        // Ext.getCmp('paymentSalesQuotation').setValue(null);
                        // Ext.getCmp('tglPelunasanSalesQuotation').setValue(null);
                        // Ext.getCmp('comboxcurrencySalesQuotation').setValue(null);

                        storeGridItemSalesQuotation.removeAll();
                        storeGridItemSalesQuotation.sync();
                        updateGridSalesQuotation('general');

                        Ext.getCmp('windowPopupSalesQuotationGrid').hide();

                        Ext.getCmp('GridSalesQuotationGridID').getStore().load();

                        // if(mode=='print')
                        // {
                        //     cetak('FAKTUR Sales Quotation','SalesQuotation',d.id);
                        // }
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiSalesQuotation())
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
//        console.log(Ext.getCmp('customerSalesQuotation').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
        // if (Ext.getCmp('customerSalesQuotation').getValue() == null)
        // {
        //     Ext.Msg.alert('Peringatan', 'Supplier belum dipilih!');
        // } else {
            wItemSelectSalesQuotationPopup.show();
            storeGridItemSelectSalesQuotation.load();
        // }

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
        updateGridSalesQuotation()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridSalesQuotation()
{
    console.log('update run');
   var addprefix = 'SalesQuotation';

    var subtotalSalesQuotation = 0 * 1;
    var totalSalesQuotation = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutSalesQuotation = Ext.getCmp('angkutSalesQuotation').getValue();
    var pembayaranSalesQuotation = Ext.getCmp('pembayaranSalesQuotation').getValue();
    var sisaBayarSalesQuotation = 0 * 1;
    var rateTax = Ext.getCmp('cb_tax_id_sq').getValue();
    console.log(rateTax);

    Ext.each(storeGridItemSalesQuotation.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price * obj.data.size);
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        subtotalSalesQuotation += net;
        totalPajak += (net / 100) * rateTax * 1;
        obj.set('total', net);
    });

//     console.log(subtotalSalesQuotation);
    totalSalesQuotation = subtotalSalesQuotation + angkutSalesQuotation * 1;
//     console.log(totalSalesQuotation+' '+totalPajak);
    totalSalesQuotation = totalSalesQuotation + totalPajak;
//     console.log(totalSalesQuotation);
    sisaBayarSalesQuotation = totalSalesQuotation - pembayaranSalesQuotation;

    Ext.getCmp('subtotal' + addprefix).setValue(subtotalSalesQuotation.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('total' + addprefix).setValue(totalSalesQuotation.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('angkut' + addprefix).setValue(angkutSalesQuotation.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaranSalesQuotation').setValue(pembayaranSalesQuotation.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarSalesQuotation').setValue(sisaBayarSalesQuotation.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiSalesQuotation()
{
//    alert(Ext.getCmp('comboxcurrencySalesQuotation').getValue());   

    if (Ext.getCmp('customerSalesQuotation').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Customer belum dipilih');

    } else if (Ext.getCmp('tanggalSalesQuotation').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal Sales Quotation');
    } 
    // else if (Ext.getCmp('shipaddressSalesQuotation').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan alamat pengiriman');
    // }
     else if (Ext.getCmp('nojurnalSalesQuotation').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan NO SQ');
    } else if (Ext.getCmp('memoSalesQuotation').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan Memo SQ');
    } else if (Ext.getCmp('totalSalesQuotation').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan barang');
    }
    // else if (Ext.getCmp('paymentSalesQuotation').getValue() == 3 && Ext.getCmp('tglPelunasanSalesQuotation').getValue() == null)
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan tanggal pelunasan');
    // } else if(Ext.getCmp('paymentSalesQuotation').getValue()==1 && Ext.getCmp('pembayaranSalesQuotation').getValue()==0)
    // {
    //      Ext.Msg.alert('Failed', 'Jumlah Pembayaran Tunai Belum Diinput');
    // }
    // else if (Ext.getCmp('paymentSalesQuotation').getValue() == 1 && Ext.getCmp('idaccountSalesQuotation').getValue() == '')
    // {
    //     //kalo tunai harus menggunakan akun persediaan / barang datang
    //     Ext.Msg.alert('Failed', 'Tentukan akun persediaan/barang dagang');
    // } 
    else {
        return true;
    }
}