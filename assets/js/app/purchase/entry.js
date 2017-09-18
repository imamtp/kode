Ext.define('KitchenSink.view.grid.EntryPurchase', {
    extend: 'Ext.grid.Panel',
    id: 'EntryPurchase',
    alias: 'widget.EntryPurchase',
    xtype: 'cell-editing',
    title: 'Input Pembelian',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 280,
            height: 100,
            forceFit: true,
            plugins: [this.cellEditing],
            store: PurchaseGridStore,
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
                    xtype: 'numbercolumn',
                    header: 'Harga',
                    dataIndex: 'price',
                    width: 150,
                    align: 'right'
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
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'comboxunit',
                            labelWidth: 120,
                            valueField: 'idunit',
                            id: 'cbUnitEntryPurchase'
//                            ,multiSelect:true
                        },{
                            xtype: 'comboxsupplier',
                            id: 'supplierPurchase',
                            labelWidth: 120,
                            fieldLabel: 'Supplier'
                        }, '->',
                        {
                            xtype: 'comboxpayment',
                            id: 'paymentPurchase',
                            valueField: 'idpayment',
                            listeners: {
                                select: {
                                    fn: function(combo, value) {
                                        if (combo.getValue() == 3)
                                        {
                                            //kredit
                                            Ext.getCmp('tglPelunasanPurchase').setDisabled(false);
                                            Ext.getCmp('pembayaranPurchase').setValue(0);
//                                                Ext.getCmp('pembayaranPurchase').setReadOnly(true);
                                        } else if (combo.getValue() == 4)
                                        {
                                            //cod
                                            Ext.getCmp('tglPelunasanPurchase').setDisabled(true);
                                            Ext.getCmp('tglPelunasanPurchase').setValue(null);
                                            Ext.getCmp('pembayaranPurchase').setValue(0);
                                            Ext.getCmp('pembayaranPurchase').setReadOnly(false);
                                        } else if (combo.getValue() == 1)
                                        {
                                            //tunai
                                            Ext.getCmp('tglPelunasanPurchase').setDisabled(true);
                                            Ext.getCmp('tglPelunasanPurchase').setValue(null);
                                            Ext.getCmp('pembayaranPurchase').setValue(0);
                                            Ext.getCmp('pembayaranPurchase').setReadOnly(false);
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalPurchase',
                            fieldLabel: 'No PO #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoRef(4, Ext.getCmp('cbUnitEntryPurchase').getValue(), 'nojurnalPurchase','PO');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'tanggalPurchase',
                            format: 'd/m/Y',
                            fieldLabel: 'Tanggal'
                        }, '->',
                        {
                            xtype: 'datefield',
                            id: 'tglPelunasanPurchase',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 120,
                            value:'Pembelian',
                            id: 'memoPurchase',
                            fieldLabel: 'Memo'
                        }, '->'
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
                        }, '->', {
                            xtype: 'textfield',
                            hidden:true,
                            fieldLabel: 'No Invoice',
                            name: 'noinvoice',
                            id: 'noinvoicePurchase'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                       {
                            xtype: 'comboxcurrency',
                            id: 'comboxcurrencyPurchase',
                            labelWidth: 120
                        },
                         '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalPurchase',
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
                            xtype: 'hiddenfield',
                            id: 'idaccountPurchase',
                            name: 'idaccount',
                            readOnly: true
                        }
                        // , {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Akun Persediaan',
                        //     labelWidth: 120,
                        //     name: 'accname',
                        //     id: 'accnamePurchase',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                 if (Ext.getCmp('cbUnitEntryPurchase').getValue() == null)
                        //                 {
                        //                     Ext.Msg.alert('Akun Persediaan', 'Harap pilih unit terlebih dahulu');
                        //                 } else {
                        //                     windowPopupAccListPurchase.show();
                        //                     storeAccountAktive.load({
                        //                         params: {
                        //                             'idunit': Ext.getCmp('cbUnitEntryPurchase').getValue()
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
                            id: 'accnumberPurchase',
                            readOnly: true
                        }, '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPurchase',
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
                            id: 'shipaddressPurchase',
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
                                            var extraparams = 'a.idunit:'+Ext.getCmp('cbUnitEntryPurchase').getValue();
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
                                        wAddPurchasePopup.show();

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
                            id: 'totalPajak',
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
                            xtype: 'comboxshipping',
                            labelWidth: 120,
                            id: 'shippingPurchase'
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'angkutPurchase',
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPurchase('general');
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
                         '->',
                        {
                            xtype: 'textfield',
                            id: 'pembayaranPurchase',
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPurchase('general');
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
//                        {
//                            itemId: 'useRecuringPurchase',
//                            text: 'Gunakan Pembelian Tersimpan',
//                            iconCls: 'add-icon',
//                            handler: function() {
//                                wGridRecurringPopup.show();
//                                storeGridRecurringPopup.load();
//                            }
//                        }, {
//                            itemId: 'recordandsavePurchase',
//                            text: 'Simpan Sebagai Pembelian Berulang',
//                            iconCls: 'add-icon',
//                            handler: this.saveRecurr
//                        },
                        {
                            itemId: 'recordPayment',
                            text: 'Rekam Pembelian Kas',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordPurchase, this, 'noprint', true)
                        },{
                            text: 'Rekam dan Cetak Pembelian',
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordPurchase, this, 'print', true)
                        }
                        // {
                        //     itemId: 'recordPurchase',
                        //     text: 'Rekam Pembelian',
                        //     iconCls: 'disk',
                        //     handler: this.recordPurchase
                        // }
                        , '->',
                        {
                            xtype: 'textfield',
                            id: 'sisaBayarPurchase',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Saldo Terhutang ',
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
                        disableEntryPurchase();
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
                updateGridPurchase('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPurchase: function(button, event, mode)
    {
        console.log(Ext.getCmp('idaccountPurchase').getValue())
        if (validasiPurchase())
        {
            // var dp = Ext.getCmp('angkutPurchase').getValue();
            // if(dp!='')
            // {
            //     //cek link dp
            //     Ext.Ajax.request({
            //         url: SITE_URL + 'account/cekAccLink',
            //         method: 'POST',
            //         params: {
            //             idacclink: 17,
            //             idunit:Ext.getCmp('cbUnitEntryPurchase').getValue()
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
            
            var json = Ext.encode(Ext.pluck(PurchaseGridStore.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPurchase').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/recordPurchase',
                method: 'POST',
                params: {
                    supplierPurchase: Ext.getCmp('supplierPurchase').getValue(),
                    tanggalPurchase: Ext.getCmp('tanggalPurchase').getValue(),
                    shipaddressPurchase: Ext.getCmp('shipaddressPurchase').getValue(),
                    nojurnalPurchase: Ext.getCmp('nojurnalPurchase').getValue(),
                    memoPurchase: Ext.getCmp('memoPurchase').getValue(),
                    subtotalPurchase: Ext.getCmp('subtotalPurchase').getValue(),
                    totalPurchase: Ext.getCmp('totalPurchase').getValue(),
                    totalPajak: Ext.getCmp('totalPajak').getValue(),
                    shippingPurchase: Ext.getCmp('shippingPurchase').getValue(),
                    angkutPurchase: Ext.getCmp('angkutPurchase').getValue(),
                    pembayaranPurchase: Ext.getCmp('pembayaranPurchase').getValue(),
                    sisaBayarPurchase: Ext.getCmp('sisaBayarPurchase').getValue(),
                    paymentPurchase: Ext.getCmp('paymentPurchase').getValue(),
                    tglPelunasanPurchase: Ext.getCmp('tglPelunasanPurchase').getValue(),
                    idcurrency: Ext.getCmp('comboxcurrencyPurchase').getValue(),
                    idaccountPurchase: Ext.getCmp('idaccountPurchase').getValue(),
                    noinvoice: Ext.getCmp('noinvoicePurchase').getValue(),
                    unit: Ext.getCmp('cbUnitEntryPurchase').getValue(),
                    supplierPurchase : Ext.getCmp('supplierPurchase').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('supplierPurchase').setValue(null);
                        Ext.getCmp('tanggalPurchase').setValue(null);
                        Ext.getCmp('shipaddressPurchase').setValue(null);
                        Ext.getCmp('nojurnalPurchase').setValue(null);
                        Ext.getCmp('memoPurchase').setValue(null);
                        Ext.getCmp('subtotalPurchase').setValue(null);
                        Ext.getCmp('totalPurchase').setValue(null);
                        Ext.getCmp('totalPajak').setValue(null);
                        Ext.getCmp('shippingPurchase').setValue(null);
                        Ext.getCmp('angkutPurchase').setValue(null);
                        Ext.getCmp('pembayaranPurchase').setValue(null);
                        Ext.getCmp('sisaBayarPurchase').setValue(null);
                        Ext.getCmp('paymentPurchase').setValue(null);
                        Ext.getCmp('tglPelunasanPurchase').setValue(null);
                        Ext.getCmp('comboxcurrencyPurchase').setValue(null);

                        // PurchaseGridStore.removeAll();
                        // PurchaseGridStore.sync();
                        updateGridPurchase('general');

                        if(mode=='print')
                        {
                            cetak('FAKTUR PEMBELIAN','purchase',d.id);
                        }
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiPurchase())
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
//        console.log(Ext.getCmp('supplierPurchase').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
        if (Ext.getCmp('supplierPurchase').getValue() == null)
        {
            Ext.Msg.alert('Peringatan', 'Supplier belum dipilih!');
        } else {
            wItemPurchasePopup.show();
            storeGridItemPurchase.load();
        }

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
        updateGridPurchase('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridPurchase(tipe)
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
        var addprefix = 'RecPurchase';
    }

    var subtotalPurchase = 0 * 1;
    var totalPurchase = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutPurchase = Ext.getCmp('angkutPurchase').getValue();
    var pembayaranPurchase = Ext.getCmp('pembayaranPurchase').getValue();
    var sisaBayarPurchase = 0 * 1;

    Ext.each(PurchaseGridStore.data.items, function(obj, i) {
        var total = obj.data.qty * obj.data.price;
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        subtotalPurchase += net;
        totalPajak += (net / 100) * obj.data.ratetax * 1;
        obj.set('total', net);
    });

//     console.log(subtotalPurchase);
    totalPurchase = subtotalPurchase + angkutPurchase * 1;
//     console.log(totalPurchase+' '+totalPajak);
    totalPurchase = totalPurchase + totalPajak;
//     console.log(totalPurchase);
    sisaBayarPurchase = totalPurchase - pembayaranPurchase;

    Ext.getCmp('subtotalPurchase' + addprefix).setValue(subtotalPurchase.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalPurchase' + addprefix).setValue(totalPurchase.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('angkutPurchase').setValue(angkutPurchase.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('pembayaranPurchase').setValue(pembayaranPurchase.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('sisaBayarPurchase').setValue(sisaBayarPurchase.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiPurchase()
{
//    alert(Ext.getCmp('comboxcurrencyPurchase').getValue());   

    if (Ext.getCmp('supplierPurchase').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Supplier belum dipilih');

    } else if (Ext.getCmp('tanggalPurchase').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal pembelian');
    } else if (Ext.getCmp('shipaddressPurchase').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan alamat pengiriman');
    } else if (Ext.getCmp('nojurnalPurchase').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan No PO');
    } else if (Ext.getCmp('memoPurchase').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan Memo PO');
    } else if (Ext.getCmp('totalPurchase').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan barang');
    } else if (Ext.getCmp('paymentPurchase').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Tentukan pembayaran');
    } else if (Ext.getCmp('paymentPurchase').getValue() == 3 && Ext.getCmp('tglPelunasanPurchase').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal pelunasan');
    } else if(Ext.getCmp('paymentPurchase').getValue()==1 && Ext.getCmp('pembayaranPurchase').getValue()==0)
    {
         Ext.Msg.alert('Failed', 'Jumlah Pembayaran Tunai Belum Diinput');
    }
    // else if (Ext.getCmp('paymentPurchase').getValue() == 1 && Ext.getCmp('idaccountPurchase').getValue() == '')
    // {
    //     //kalo tunai harus menggunakan akun persediaan / barang datang
    //     Ext.Msg.alert('Failed', 'Tentukan akun persediaan/barang dagang');
    // } 
    else {
        return true;
    }
}