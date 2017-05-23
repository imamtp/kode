
Ext.define('ImportSpendGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['no', 'idaccount', 'namaunit', 'accname', 'accnumber', 'tglpenerimaan','bulan', 'tahun', 'amount', 'status', 'message'],
    idProperty: 'id'
});

var ImportSpendGridStore = Ext.create('Ext.data.Store', {
    model: 'ImportSpendGridStoreModel'
});


Ext.define('EntryImportSpendMoney', {
    extend: 'Ext.grid.Panel',
    id: 'EntryImportSpendMoney',
    alias: 'widget.EntryImportSpendMoney',
    xtype: 'cell-editing',
    title: 'Import Pengeluaran (xlsx)',
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
            store: ImportSpendGridStore,
            columns: [
                {
                    dataindex: 'idaccount',
                    hidden: true
                },
                {
                    header: 'No',
                    dataIndex: 'no'
                },
                {
                    header: 'Unit',
                    dataIndex: 'namaunit',
                    width: 100
                },
                {
                    header: 'No Akun',
                    dataIndex: 'accnumber',
                    width: 150
                },
                {
                    header: 'Pengeluaran',
                    dataIndex: 'accname',
                    width: 150
                },
                {
                    header: 'Tanggal',
                    dataIndex: 'tglpenerimaan',
                    width: 100
                },{
                    xtype: 'numbercolumn',
                    align: 'right',
                    header: 'Jumlah',
                    dataIndex: 'amount',
                    width: 150
                }
                , {
                    header: 'Keterangan',
                    dataIndex: 'message',
                    flex: 1,
                    minWidth: 250
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
                            xtype: 'form',
                            id: 'formImportSpend',
                            url: SITE_URL + 'money/fetchXlsxReceive',
                            width: '100%',
                            defaults: {
                                border: false,
                                xtype: 'panel',
                                flex: 2,
                                layout: 'anchor'
                            },
                            layout: 'hbox',
                            items: [{
                                    items: [
                                        {
                                            xtype: 'hiddenfield',
                                            name: 'filename',
                                            id: 'filenameImportSpend'
                                        },
                                        {
                                            xtype: 'comboxunit',
                                            id: 'idunitImportSpend',
                                            valueField: 'idunit',
                                            labelWidth: 140,
                                            name: 'idunit',
                                            anchor: '80%'
                                        }, {
                                            xtype: 'textfield',
                                            anchor: '80%',
                                            labelWidth: 140,
                                            fieldLabel: 'Akun Kas',
                                            name: 'accname',
                                            allowBlank: false,
                                            id: 'accnameImportSpendAdd',
                                            listeners: {
                                                render: function(component) {
                                                    component.getEl().on('click', function(event, el) {
                                                        if (Ext.getCmp('idunitImportSpend').getValue() == null)
                                                        {
                                                            Ext.Msg.alert('Peringatan', 'Unit belum dipilih');
                                                        } else {
                                                            wAccImportSpendPopup.show();
                                                            // storeAccountAktive.load({
                                                            //     params: {
                                                            //         'idunit': Ext.getCmp('idunitImportSpend').getValue(),
                                                            //          'idaccounttype':'17,19,1'
                                                            //     }
                                                            // });
                                                            storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                                operation.params={
                                                                            'idunit': Ext.getCmp('idunitImportSpend').getValue(),
                                                                            'idaccounttype':'17,19,1'
                                                                };
                                                            });
                                                            storeGridAccount.load();
                                                        }

                                                    });
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Memo',
                                            id: 'memoImportSpend',
                                            labelWidth: 140,
                                            name: 'memo',
                                            anchor: '80%'
                                        },
//                                         {
//                                             xtype: 'displayfield',
//                                             labelWidth: 140,
//                                             padding: '0 0 0 150',
// //                                            fieldLabel: ' ',
//                                             id: 'accnumberImportSpendAdd',
//                                             name: 'accnumber',
//                                             readOnly: true
//                                         },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'idaccountImportSpendAdd',
                                            name: 'idaccount',
                                            readOnly: true
                                        },
                                     
                                        {
                                            xtype: 'filefield',
                                            fieldLabel: 'File xlsx',
//                                            labelWidth: 120,
                                            name: 'filexlsx',
                                            id: 'filespendImportXlsx',
                                            // padding: '0 0 0 90',
                                            labelWidth: 140,
                                            anchor: '80%',
                                            listeners: {
                                                'change': function() {
                                                    fetchXlsxSpend();
                                                }
                                            }
                                        }
                                    ]
                                }, {
                                    items: [{
                                            xtype: 'textfield',
                                            padding: '0 0 0 90',
                                            fieldLabel: 'No Ref',
                                            name: 'notrans',
                                            id: 'notransImportSpend',
                                            anchor: '100%',
                                            listeners: {
                                                render: function(component) {
                                                    component.getEl().on('click', function(event, el) {
                                                        insertNoRef(7, Ext.getCmp('idunitImportSpend').getValue(), 'notransImportSpend','ISPE');
                                                    });
                                                }
                                            }
                                        }, {
                                            xtype: 'datefield',
                                            name: 'tanggal',
                                            id: 'tanggalImportSpend',
                                            format: 'd/m/Y',
                                            fieldLabel: 'Tanggal',
                                            padding: '0 0 0 90',
                                            anchor: '100%'
                                        }]
                                }]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Rekam Pengeluaran Kas',
                            iconCls: 'disk',
                            handler: this.recordImportSpend
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'displayfield'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Download file template xlsx',
                            iconCls: 'page_excel',
                            handler: this.downloadTemplate
                        },
                        {
                            text: 'Clear',
                            iconCls: 'refresh',
                            handler: this.clear
                        }, '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalImportSpend',
                            fieldLabel: 'Total Pengeluaran',
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
//                        disableEntryImportSpendMoney();
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
                updateGridImportSpend();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordImportSpend: function()
    {

        if (validasiImportSpend())
        {
            var json = Ext.encode(Ext.pluck(ImportSpendGridStore.data.items, 'data'));

            Ext.Ajax.request({
                url: SITE_URL + 'money/recordImportSpend',
                method: 'POST',
                params: {
                    idunit: Ext.getCmp('idunitImportSpend').getValue(),
                    notrans: Ext.getCmp('notransImportSpend').getValue(),
                    tanggal: Ext.getCmp('tanggalImportSpend').getValue(),
                    filename: Ext.getCmp('filenameImportSpend').getValue(),
                    idaccount: Ext.getCmp('idaccountImportSpendAdd').getValue(),
                    totalamount: Ext.getCmp('totalImportSpend').getValue(),
                    memo: Ext.getCmp('memoImportSpend').getValue(),
                    dataGrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('notransImportSpend').setValue(null);
                        Ext.getCmp('tanggalImportSpend').setValue(null);
                        Ext.getCmp('notransImportSpend').setValue(null);
                        Ext.getCmp('memoImportSpend').setValue(null);
                        
                        ImportSpendGridStore.removeAll();
                        ImportSpendGridStore.sync();
                        Ext.getCmp('totalImportSpend').setValue(null);
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
    clear: function()
    {
        ImportSpendGridStore.removeAll();
        ImportSpendGridStore.sync();
        Ext.getCmp('totalImportSpend').setValue(null);
    },
    downloadTemplate: function()
    {
        window.location = BASE_URL+"assets/xlsx/template_import_pengeluaran.xlsx";
    },
    onAddClick: function() {

        if (Ext.getCmp('idunitImportSpend').getValue() == null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            Ext.getCmp('formAddRowImportSpend').getForm().reset();

            wAddRowImportSpend.show();

//            var rec = new ImportSpendGridStoreModel({
//                idaccount: null,
//                accname: null,
//                accnumber: null,
//                amount: null,
//                ratetax: null
//            });
//
//            this.getStore().insert(0, rec);
//            this.cellEditing.startEditByPosition({
//                row: 0,
//                column: 0
//            });
        }

    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridImportSpend();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridImportSpend()
{
    var subtotalImportSpend = 0 * 1;
    var totalPajak = 0 * 1;
    var totalImportSpend = 0 * 1;

    Ext.each(ImportSpendGridStore.data.items, function(obj, i) {
        var pajak = (obj.data.amount * 1 / 100) * obj.data.ratetax;
        totalPajak += pajak;
        subtotalImportSpend += obj.data.amount * 1;
    });

    totalImportSpend = subtotalImportSpend * 1 - totalPajak * 1;

    Ext.getCmp('subtotalImportSpend').setValue(subtotalImportSpend.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('taxImportSpend').setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalImportSpend').setValue(totalImportSpend.toLocaleString('null', {minimumFractionDigits: 2}));

}

function fetchXlsxSpend()
{
    var msg = Ext.MessageBox.wait('Sedang mengupload file...');

    var form = Ext.getCmp('formImportSpend').getForm();
    if (form.isValid()) {
        form.submit({
            success: function(form, action) {

                Ext.getCmp('filenameImportSpend').setValue(action.result.filename);

                Ext.each(action.result.data, function(obj, i) {

                    var recImport = new ImportSpendGridStoreModel({
                        no: obj.no,
                        namaunit: obj.namaunit,
                        accname: obj.accname,
                        accnumber: obj.accnumber,
                        bulan: obj.bulan,
                        tahun: obj.tahun,
                        amount: obj.amount,
                        message: obj.message,
                        tglpenerimaan:obj.tglpenerimaan,
                        idaccount: obj.idaccount
                    });

                    var gridImport = Ext.getCmp('EntryImportSpendMoney');
                    gridImport.getStore().insert(i, recImport);
                });

                Ext.getCmp('totalImportSpend').setValue(action.result.total);

//                Ext.Msg.alert('Success', action.result.message);
//
//                Ext.getCmp('formSetupTax').getForm().reset();
//                Ext.getCmp('windowPopupSetupTax').hide();
//
//                storeGridSetupTax.load();
                msg.hide();
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                msg.hide();
//                            storeGridSetupTax.load();
            }

        });
    } else {
        Ext.Msg.alert("Error!", "Your form is invalid!");
    }
}

function validasiImportSpend()
{
//    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('notransImportSpend').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'No Transaksi belum diinput');

    } else if (Ext.getCmp('tanggalImportSpend').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Tanggal belum diinput');
    } else if (Ext.getCmp('totalImportSpend').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'File xlsx belum diupload');
    } else {
        return true;
    }
}

var wEntryImportSpendMoney = Ext.create('widget.window', {
    id: 'wEntryImportSpendMoney',
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
            xtype: 'EntryImportSpendMoney'
        }]
});



Ext.define('EntryImportSpendMoney2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryImportSpendMoney2',
    width: '100%',
    bodyPadding: 10,
    title: 'My Form',
    layout: 'hbox',
    items: [
        {
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'First Name',
                    anchor: '-5',
                    name: 'first'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Company',
                    anchor: '-5',
                    name: 'company'
                }]
        }, {
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Last Name',
                    anchor: '100%',
                    name: 'last'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    anchor: '100%',
                    name: 'email',
                    vtype: 'email'
                }]
        }
    ]

});