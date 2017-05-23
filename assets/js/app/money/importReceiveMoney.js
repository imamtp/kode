
Ext.define('ImportReceiveGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['no', 'idaccount', 'namaunit', 'accname', 'accnumber', 'tglpenerimaan','bulan', 'tahun', 'amount', 'status', 'message'],
    idProperty: 'id'
});

var ImportReceiveGridStore = Ext.create('Ext.data.Store', {
    model: 'ImportReceiveGridStoreModel'
});


Ext.define('KitchenSink.view.grid.EntryImportReceiveMoney', {
    extend: 'Ext.grid.Panel',
    id: 'EntryImportReceiveMoney',
    alias: 'widget.EntryImportReceiveMoney',
    xtype: 'cell-editing',
    title: 'Import Penerimaan (xlsx)',
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
            store: ImportReceiveGridStore,
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
                    header: 'Penerimaan',
                    dataIndex: 'accname',
                    width: 150
                },
                {
                    header: 'Tgl Penerimaan',
                    dataIndex: 'tglpenerimaan',
                    width: 120
                },
                // {
                //     header: 'Bulan',
                //     dataIndex: 'bulan',
                //     width: 100
                // }, {
                //     header: 'Tahun',
                //     dataIndex: 'tahun',
                //     width: 100
                // },
                 {
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
                            id: 'formImportReceive',
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
                                            id: 'filenameImport'
                                        },
                                        {
                                            xtype: 'comboxunit',
                                            id: 'idunitImportReceive',
                                            valueField: 'idunit',
                                            labelWidth: 140,
                                            name: 'idunit',
                                            anchor: '80%'
                                        }, {
                                            xtype: 'textfield',
                                            labelWidth: 140,
                                            anchor: '80%',
                                            fieldLabel: 'Pilih Akun Penerimaan',
                                            name: 'accname',
                                            allowBlank: false,
                                            id: 'accnameImportReceiveAdd',
                                            listeners: {
                                                render: function(component) {
                                                    component.getEl().on('click', function(event, el) {
                                                        if (Ext.getCmp('idunitImportReceive').getValue() == null)
                                                        {
                                                            Ext.Msg.alert('Peringatan', 'Unit belum dipilih');
                                                        } else {
                                                            wAccImportReceivePopup.show();
                                                            // storeAccountAktive.load({
                                                            //     params: {
                                                            //         'idunit': Ext.getCmp('idunitImportReceive').getValue()
                                                            //     }
                                                            // });
                                                            storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                                operation.params={
                                                                            'idunit': Ext.getCmp('idunitImportReceive').getValue(),
                                                                            'idaccounttype': '1,19'
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
                                            id: 'memoImportReceive',
                                            labelWidth: 140,
                                            name: 'memo',
                                            anchor: '80%'
                                        },
                                        {
                                            xtype: 'filefield',
                                            labelWidth: 140,
                                            fieldLabel: 'File xlsx',
//                                            labelWidth: 120,
                                            name: 'filexlsx',
                                            id: 'filexlsxImportXlsx',
                                            // padding: '0 0 0 90',
                                            anchor: '80%',
                                            listeners: {
                                                'change': function() {
                                                    // alert('te');
                                                    fetchXlsxReceive();
                                                }
                                            }
                                        },
//                                         {
//                                             xtype: 'displayfield',
//                                             labelWidth: 140,
//                                             padding: '0 0 0 150',
// //                                            fieldLabel: ' ',
//                                             id: 'accnumberImportReceiveAdd',
//                                             name: 'accnumber',
//                                             readOnly: true
//                                         },
                                        {
                                            xtype: 'hiddenfield',
                                            id: 'idaccountImportReceiveAdd',
                                            name: 'idaccount',
                                            readOnly: true
                                        }
                                    ]
                                }, {
                                    items: [{
                                            xtype: 'textfield',
                                            padding: '0 0 0 90',
                                            fieldLabel: 'No Ref',
                                            name: 'notrans',
                                            id: 'notransImportReceive',
                                            anchor: '100%',
                                            listeners: {
                                                render: function(component) {
                                                    component.getEl().on('click', function(event, el) {
                                                        insertNoRef(6, Ext.getCmp('idunitImportReceive').getValue(), 'notransImportReceive','IREC');
                                                    });
                                                }
                                            }
                                        }, {
                                            xtype: 'datefield',
                                            name: 'tanggal',
                                            id: 'tanggalImportReceive',
                                            format: 'd/m/Y',
                                            fieldLabel: 'Tanggal Input',
                                            padding: '0 0 0 90',
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'textfield',
                                            padding: '0 0 0 90',
                                            fieldLabel: 'Diterima dari',
                                            name: 'receivefrom',
                                            id: 'receivefromImportReceive',
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
                            text: 'Rekam Penerimaan Kas',
                            iconCls: 'disk',
                            handler: this.recordImportReceive
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
                            id: 'totalImportReceive',
                            fieldLabel: 'Total Penerimaan',
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
//                        disableEntryImportReceiveMoney();
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
                updateGridImportReceive();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordImportReceive: function()
    {

        if (validasiImportReceive())
        {
            var json = Ext.encode(Ext.pluck(ImportReceiveGridStore.data.items, 'data'));

            Ext.Ajax.request({
                url: SITE_URL + 'money/recordImportReceive',
                method: 'POST',
                params: {
                    idunit: Ext.getCmp('idunitImportReceive').getValue(),
                    notrans: Ext.getCmp('notransImportReceive').getValue(),
                    tanggal: Ext.getCmp('tanggalImportReceive').getValue(),
                    filename: Ext.getCmp('filenameImport').getValue(),
                    idaccount: Ext.getCmp('idaccountImportReceiveAdd').getValue(),
                    totalamount: Ext.getCmp('totalImportReceive').getValue(),
                    receivefrom: Ext.getCmp('receivefromImportReceive').getValue(),
                    memo: Ext.getCmp('memoImportReceive').getValue(),
                    dataGrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('notransImportReceive').setValue(null);
                        Ext.getCmp('tanggalImportReceive').setValue(null);
                        Ext.getCmp('notransImportReceive').setValue(null);
                        Ext.getCmp('receivefromImportReceive').setValue(null);
                        Ext.getCmp('memoImportReceive').setValue(null);
                        
                        ImportReceiveGridStore.removeAll();
                        ImportReceiveGridStore.sync();
                        Ext.getCmp('totalImportReceive').setValue(null);
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
        ImportReceiveGridStore.removeAll();
        ImportReceiveGridStore.sync();
        Ext.getCmp('totalImportReceive').setValue(null);
    },
    downloadTemplate: function()
    {
        window.location = BASE_URL+"assets/xlsx/template_import_penerimaan.xlsx";
    },
    onAddClick: function() {

        if (Ext.getCmp('idunitImportReceive').getValue() == null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            Ext.getCmp('formAddRowImportReceive').getForm().reset();

            wAddRowImportReceive.show();

//            var rec = new ImportReceiveGridStoreModel({
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
        updateGridImportReceive();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridImportReceive()
{
    var subtotalImportReceive = 0 * 1;
    var totalPajak = 0 * 1;
    var totalImportReceive = 0 * 1;

    Ext.each(ImportReceiveGridStore.data.items, function(obj, i) {
        var pajak = (obj.data.amount * 1 / 100) * obj.data.ratetax;
        totalPajak += pajak;
        subtotalImportReceive += obj.data.amount * 1;
    });

    totalImportReceive = subtotalImportReceive * 1 - totalPajak * 1;

    Ext.getCmp('subtotalImportReceive').setValue(subtotalImportReceive.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('taxImportReceive').setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalImportReceive').setValue(totalImportReceive.toLocaleString('null', {minimumFractionDigits: 2}));

}

function fetchXlsxReceive()
{
    var msg = Ext.MessageBox.wait('Sedang mengupload file...');

    var form = Ext.getCmp('formImportReceive').getForm();
    if (form.isValid()) {
        form.submit({
            success: function(form, action) {

                Ext.getCmp('filenameImport').setValue(action.result.filename);

                Ext.each(action.result.data, function(obj, i) {

                    var recImport = new ImportReceiveGridStoreModel({
                        no: obj.no,
                        namaunit: obj.namaunit,
                        accname: obj.accname,
                        accnumber: obj.accnumber,
                        tglpenerimaan: obj.tglpenerimaan,
                        // bulan: obj.bulan,
                        // tahun: obj.tahun,
                        amount: obj.amount,
                        message: obj.message,
                        idaccount: obj.idaccount
                    });

                    var gridImport = Ext.getCmp('EntryImportReceiveMoney');
                    gridImport.getStore().insert(i, recImport);
                });

                Ext.getCmp('totalImportReceive').setValue(action.result.total);

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

function validasiImportReceive()
{
//    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('notransImportReceive').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'No Transaksi belum diinput');

    } else if (Ext.getCmp('tanggalImportReceive').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Tanggal belum diinput');
    } else if (Ext.getCmp('totalImportReceive').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'File xlsx belum diupload');
    } else {
        return true;
    }
}

var wEntryImportReceiveMoney = Ext.create('widget.window', {
    id: 'wEntryImportReceiveMoney',
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
            xtype: 'EntryImportReceiveMoney'
        }]
});



Ext.define('EntryImportReceiveMoney2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EntryImportReceiveMoney2',
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