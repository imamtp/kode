Ext.define('PaymentGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'nameinventory', 'cost', 'price', 'qty', 'sellingprice', 'qtystock', 'disc', 'total', 'ratetax'],
    idProperty: 'id'
});

var PaymentGridStore = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'PaymentGridStoreModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemPurchase/purchase',
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

Ext.define('KitchenSink.view.grid.EntryPayment', {
    extend: 'Ext.grid.Panel',
    id: 'EntryPayment',
    alias: 'widget.EntryPayment',
    xtype: 'cell-editing',
//    title: 'Input Pembayaran',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 840,
            height: 500,
            forceFit: true,
            plugins: [this.cellEditing],
            store: PaymentGridStore,
            columns: [
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory'
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
//                    editor: {
//                        xtype: 'numberfield',
//                        allowBlank: false,
//                        minValue: 1
//                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Disc',
                    width: 100,
                    dataIndex: 'disc',
                    align: 'right',
//                    editor: {
//                        xtype: 'numberfield',
//                        allowBlank: false,
//                        minValue: 0
//                    }
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
//                    editor: {
//                        xtype: 'comboxtax',
//                        valueField: 'rate',
//                        labelWidth: 40
//                    }
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
                            xtype: 'textfield',
                            width: 500,
                            labelWidth: 120,
                            id: 'memoPayment',
                            fieldLabel: 'Memo'
                        }, '->',
                        {
                            xtype: 'datefield',
                            id: 'tanggalPayment',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Bayar'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'comboxsupplier',
                            readOnly: true,
                            id: 'supplierPayment',
                            labelWidth: 120,
                            fieldLabel: 'Supplier'
                        }, '->',
                        {
                            xtype: 'comboxpayment',
                            readOnly: true,
                            id: 'paymentPayment',
                            valueField: 'idpayment',
                            listeners: {
                                select: {
                                    fn: function(combo, value) {
                                        if (combo.getValue() == 3)
                                        {
                                            //kredit
                                            Ext.getCmp('tglPelunasanPayment').setDisabled(false);
                                            Ext.getCmp('pembayaranPayment').setValue(0);
//                                                Ext.getCmp('pembayaranPayment').setReadOnly(true);
                                        } else if (combo.getValue() == 4)
                                        {
                                            //cod
                                            Ext.getCmp('tglPelunasanPayment').setDisabled(true);
                                            Ext.getCmp('tglPelunasanPayment').setValue(null);
                                            Ext.getCmp('pembayaranPayment').setValue(0);
                                            Ext.getCmp('pembayaranPayment').setReadOnly(false);
                                        } else if (combo.getValue() == 1)
                                        {
                                            //tunai
                                            Ext.getCmp('tglPelunasanPayment').setDisabled(true);
                                            Ext.getCmp('tglPelunasanPayment').setValue(null);
                                            Ext.getCmp('pembayaranPayment').setValue(0);
                                            Ext.getCmp('pembayaranPayment').setReadOnly(false);
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
                            xtype: 'hiddenfield',
                            labelWidth: 120,
                            name: 'idpurchase',
                            id: 'idpurchasePayment'
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalPayment',
                            fieldLabel: 'No Faktur #'
                        }, '->',
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            id: 'tglPelunasanPayment',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'shipaddressPayment',
                            readOnly: true,
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        if (group_id == 99)
                                        {
                                            var extraparams = 'a.idcompany:1';
                                        }

                                        var FormChooseAddress = Ext.getCmp('FormChooseAddress');
                                        FormChooseAddress.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/addresscompany/',
                                            params: {
                                                extraparams: extraparams
                                            },
                                            success: function(form, action) {
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        });
                                        wAddPaymentPopup.show();

                                    });
                                }
                            }
                        }, '->', {
                            xtype: 'textfield',
                            fieldLabel: 'No Invoice',
                            name: 'noinvoice',
                            id: 'noinvoicePayment'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            itemId: 'recordPayment',
                            text: 'Rekam Pembayaran',
                            iconCls: 'disk',
                            handler: this.recordPayment
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'pembayaranPayment',
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
//                                        updateGridPayment('general');
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
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPayment',
                            fieldLabel: 'Total Pembelian',
                            fieldStyle: 'text-align: right;'
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
                            id: 'totalPajakPayment',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
//                        {
//                            xtype: 'textfield',
//                            align: 'right',
//                            readOnly: true,
//                            labelWidth: 120,
//                            id: 'totalPaid',
//                            fieldLabel: 'Jumlah yang sudah dibayar',
//                            fieldStyle: 'text-align: right;'
//                        },
                        {
                            xtype: 'textfield',
                            id: 'angkutPayment',
                            readOnly: true,
                            align: 'right',
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPayment('general');
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
                            xtype: 'hiddenfield',
                            id: 'idunitPayment',
                            name: 'idunit',
                            readOnly: true
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idaccountPayment',
                            name: 'idaccount',
                            readOnly: true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Akun Kas/Bank',
                            labelWidth: 120,
                            name: 'accname',
                            id: 'accnamePayment',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        windowPopupAccListPayment.show();
                                        storeAccountAktive.load({
                                            params: {
                                                'idunit': Ext.getCmp('idunitPayment').getValue()
                                            }
                                        });

                                    });
                                }
                            }
                        }, {
                            xtype: 'displayfield',
                            name: 'accnumber',
                            id: 'accnumberPayment',
                            readOnly: true
                        }, '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalPayment',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
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
                            id: 'sisaBayarPayment',
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
//                        disableEntryPayment();
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
                updateGridPayment('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPayment: function()
    {
        console.log(Ext.getCmp('idaccountPayment').getValue())
        if (validasiPayment())
        {
//            var json = Ext.encode(Ext.pluck(PaymentGridStore.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPayment').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/recordPayment',
                method: 'POST',
                params: {
                    idaccountPayment: Ext.getCmp('idaccountPayment').getValue(),
                    idunitPayment: Ext.getCmp('idunitPayment').getValue(),
                    noinvoicePayment: Ext.getCmp('noinvoicePayment').getValue(),
                    nojurnalPayment: Ext.getCmp('nojurnalPayment').getValue(),
                    idpurchasePayment: Ext.getCmp('idpurchasePayment').getValue(),
                    tanggalPayment: Ext.getCmp('tanggalPayment').getValue(),
                    pembayaranPayment: Ext.getCmp('pembayaranPayment').getValue(),
                    sisaBayarPayment: Ext.getCmp('sisaBayarPayment').getValue(),
                    memoPayment: Ext.getCmp('memoPayment').getValue()
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);
                        Ext.getCmp('wEntryPayment').hide();
                        PaymentGridStore.load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiPayment())
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
//        console.log(Ext.getCmp('supplierPayment').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
//        if (Ext.getCmp('supplierPayment').getValue() == null)
//        {
//            Ext.Msg.alert('Peringatan', 'Supplier belum dipilih!');
//        } else {
//            wItemPaymentPopup.show();
//            storeGridItemPayment.load();
//        }

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
//        updateGridPayment('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridPayment(tipe)
{
    console.log('update run');
    if (tipe == 'general')
    {
        var addprefix = '';
    } else if (tipe == 'recurring')
    {
        var addprefix = 'RecPayment';
    }

    var subtotalPayment = 0 * 1;
    var totalPayment = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutPayment = Ext.getCmp('angkutPayment').getValue();
    var pembayaranPayment = Ext.getCmp('pembayaranPayment').getValue();
    var sisaBayarPayment = Ext.getCmp('sisaBayarPayment').getValue();

    Ext.each(PaymentGridStore.data.items, function(obj, i) {
        var total = obj.data.qty * obj.data.price;
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        subtotalPayment += net;
        totalPajak += (net / 100) * obj.data.ratetax * 1;
        obj.set('total', net);
    });

//     console.log(subtotalPayment);
//    totalPayment = subtotalPayment + angkutPayment * 1;
//     console.log(totalPayment+' '+totalPajak);
//    totalPayment = totalPayment + totalPajak;
//     console.log(pembayaranPayment.toLocaleString('null', {minimumFractionDigits: 2}));
    var sisaBayar = sisaBayarPayment - pembayaranPayment;

//    Ext.getCmp('subtotalPayment' + addprefix).setValue(subtotalPayment.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totalPayment' + addprefix).setValue(totalPayment.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totalPajakPayment' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('angkutPayment').setValue(angkutPayment.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('pembayaranPayment').setValue(pembayaranPayment.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('sisaBayarPayment').setValue(sisaBayar.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiPayment()
{
//    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('nojurnalPayment').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'No Faktur belum diisi');

    } else if (Ext.getCmp('tanggalPayment').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal bayar');
    } else if (Ext.getCmp('accnamePayment').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Akun Bank/Kas belum ditentukan');
    } else if (Ext.getCmp('pembayaranPayment').getValue() == '' || Ext.getCmp('pembayaranPayment').getValue() == 0)
    {
        Ext.Msg.alert('Failed', 'Masukkan jumlah pembayaran');
    } else if (Ext.getCmp('memoPayment').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Memo belum diinput');
    }  else if (Ext.getCmp('pembayaranPayment').getValue() > Ext.getCmp('sisaBayarPayment').getValue())
    {
        Ext.Msg.alert('Failed', 'Jumlah Pembayaran tidak boleh melebihi Saldo Terhutang');
    } else {
        return true;
    }
}

var wEntryPayment = Ext.create('widget.window', {
    id: 'wEntryPayment',
    title: 'Input Pembayaran',
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
            xtype: 'EntryPayment'
        }]
});
