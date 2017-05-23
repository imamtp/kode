var formImportRowReceiveSiswa = Ext.create('Ext.form.Panel', {
                id: 'formImportRowReceiveSiswa',
                width: 450,
                height: 120,
                url: SITE_URL + 'money/fetchXlsxReceiveSiswa',
                bodyStyle: 'padding:5px',
                labelAlign: 'top',
                autoScroll: true,
                fieldDefaults: {
                    msgTarget: 'side',
                    blankText: 'Tidak Boleh Kosong',
                    labelWidth: 150,
                    width: 400
                },
                items: [
                {
                    xtype: 'filefield',
                    fieldLabel: 'File xlsx',
                    name: 'filexlsx',
                    // id: 'filexlsxImportSiswaXlsx',
                    anchor: '100%'
                }],
                buttons: [
                {
                    text: 'Download file template xlsx',
                    handler: function() {
                       window.location = BASE_URL+"assets/xlsx/template_import_penerimaan_siswa.xlsx";
                    }
                },'->',
                {
                    text: 'Batal',
                    handler: function() {
                        var win = Ext.getCmp('windowPopupImportRowReceiveSiswa');
                        Ext.getCmp('formImportRowReceiveSiswa').getForm().reset();
                        win.hide();
                    }
                }, {
                    text: 'Import',
                    handler: function() {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                                form.submit({
                                    params: {idunit:Ext.getCmp('idunitReceiveSiswa').getValue()},
                                    success: function(form, action) {

                                        Ext.each(action.result.data, function(obj, i) {

                                            var recImport = new ReceiveSiswaGridStoreModel({
                                                idaccount: obj.idaccount,
                                                accname: obj.accname,
                                                accnumber: obj.accnumber,
                                                tglbayar: obj.tglbayar,
                                                amount: obj.amount,
                                                idsiswa: obj.idsiswa,
                                                namasiswa: obj.namasiswa,
                                                denda: obj.denda,
                                                memo: obj.memo,
                                                noinduk: obj.noinduk,
                                                status: obj.status
                                            });

                                            var gridImport = Ext.getCmp('EntryReceiveSiswaMoneySiswa');
                                            gridImport.getStore().insert(i, recImport);
                                        });

                                        Ext.getCmp('totalReceiveSiswa').setValue(action.result.total);

                                        var win = Ext.getCmp('windowPopupImportRowReceiveSiswa');
                                        Ext.getCmp('formImportRowReceiveSiswa').getForm().reset();
                                        win.hide();
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
                }]
            });

var winImportRecSiswa = Ext.create('widget.window', {
    id: 'windowPopupImportRowReceiveSiswa',
    title: 'Import Item Pembayaran Siswa',
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
    items: [formImportRowReceiveSiswa]
})

Ext.define('EntryReceiveSiswaMoneySiswa', {
    extend: 'Ext.grid.Panel',
    id: 'EntryReceiveSiswaMoneySiswa',
    alias: 'widget.EntryReceiveSiswaMoneySiswa',
    xtype: 'cell-editing',
    title: 'Input Penerimaan Siswa',
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
            store: ReceiveSiswaGridStore,
            columns: [{
                header: 'idaccount',
                hidden: true,
                dataIndex: 'idaccount'
            }, {
                header: 'idsiswa',
                hidden: true,
                dataIndex: 'idsiswa'
            }, {
                header: 'No induk',
                dataIndex: 'noinduk',
                width: 100
            }, {
                header: 'Nama siswa',
                dataIndex: 'namasiswa',
                width: 100
            }, {
                header: 'Pembayaran',
                dataIndex: 'accname',
                width: 150
            }, {
                header: 'No Akun Pembayaran',
                dataIndex: 'accnumber',
                width: 100
            }, {
                xtype: 'numbercolumn',
                header: 'Jumlah',
                width: 100,
                dataIndex: 'amount',
                align: 'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0
                }
            }, {
                xtype: 'numbercolumn',
                header: 'Denda',
                width: 100,
                dataIndex: 'denda',
                align: 'right',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0
                }
            },{
                header: 'Bulan Pembayaran',
                dataIndex: 'tglbayar',
                width: 100
            }, {
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
            },
            {
                header: 'status',
                dataIndex: 'status',
                hidden:true,
                width: 100
            }],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'comboxunit',
                    id: 'idunitReceiveSiswa',
                    labelWidth: 150,
                    name: 'idunit',
                    valueField: 'idunit'
                }, {
                    xtype: 'hiddenfield',
                    id: 'idaccountReceiveFormSiswa',
                    name: 'idaccount',
                    readOnly: true
                }, '->', {
                    xtype: 'textfield',
                    fieldLabel: 'No Ref',
                    name: 'notrans',
                    id: 'notransReceiveSiswa',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                insertNoRef(6, Ext.getCmp('idunitReceiveSiswa').getValue(), 'notransReceiveSiswa','RECS');
                            });
                        }
                    }
                }]
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Akun Penerimaan Kas',
                    labelWidth: 150,
                    name: 'accname',
                    id: 'accnameReceiveFormSiswa',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                if (Ext.getCmp('idunitReceiveSiswa').getValue() == null) {
                                    Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                } else {
                                    // windowPopupAccListReceiveSiswa.show();
                                    // storeAccountAktive.load({
                                    //     params: {
                                    //         'idunit': Ext.getCmp('idunitReceiveSiswa').getValue(),
                                    //         'idaccounttype': '19,17,1'
                                    //     }
                                    // });

                                    wAccReceiveSiswaPopup.show();
                                    storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                        operation.params={
                                                    'idunit': Ext.getCmp('idunitReceiveSiswa').getValue(),
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
                    name: 'accnumber',
                    id: 'accnumberReceiveFormSiswa',
                    readOnly: true
                }, '->', {
                    xtype: 'datefield',
                    id: 'tanggalReceiveSiswa',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Tanggal'
                }]
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'textfield',
                    width: 500,
                    labelWidth: 150,
                    id: 'memoReceiveSiswa',
                    value: 'Penerimaan Siswa ',
                    fieldLabel: 'Memo'
                }, '->', {
                    xtype: 'textfield',
                    id: 'receiveFromSiswa',
                    fieldLabel: 'Diterima Dari'
                }]
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Tambah Item',
                    iconCls: 'add-icon',
                    scope: this,
                    handler: this.onAddClick
                }, {
                    text: 'Import Item',
                    iconCls: 'excel-icon',
                    scope: this,
                    handler: this.onImportClick
                }]
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->', {
                    itemId: 'recordPayment',
                    text: 'Simpan Penerimaan Siswa',
                    iconCls: 'disk',
                    handler: this.recordReceiveSiswa
                },{
                    text: 'Simpan dan Cetak Penerimaan Siswa',
                    iconCls: 'drive_disk-icon',
                    handler: Ext.bind(this.recordReceiveSiswa, this, 'print', true)
                }]
            }, {
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->', {
                    xtype: 'textfield',
                    align: 'right',
                    readOnly: true,
                    labelWidth: 120,
                    id: 'totalReceiveSiswa',
                    fieldLabel: 'Total Penerimaan',
                    fieldStyle: 'text-align: right;'
                }]
            }],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        //                        disableEntryReceiveSiswaMoneySiswa();
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
                updateGridReceiveSiswa();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordReceiveSiswa: function(button, event, mode) {
        if (validasiReceiveSiswa()) {
            var json = Ext.encode(Ext.pluck(ReceiveSiswaGridStore.data.items, 'data'));
            //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryReceiveSiswaMoneySiswa').getValue());

            //validasi
            var status = true;
            Ext.each(ReceiveSiswaGridStore.data.items, function(obj, i) {
                if(obj.data.status==0)
                {
                    status = false;
                }
            });

            if(status)
            {
                Ext.Ajax.request({
                    url: SITE_URL + 'money/recordReceive/siswa',
                    method: 'POST',
                    params: {
                        idaccountReceive: Ext.getCmp('idaccountReceiveFormSiswa').getValue(),
                        notransReceive: Ext.getCmp('notransReceiveSiswa').getValue(),
                        receiveFrom: Ext.getCmp('receiveFromSiswa').getValue(),
                        tanggalReceive: Ext.getCmp('tanggalReceiveSiswa').getValue(),
                        totalReceive: Ext.getCmp('totalReceiveSiswa').getValue(),
                        idunitReceive: Ext.getCmp('idunitReceiveSiswa').getValue(),
                        memoReceive: Ext.getCmp('memoReceiveSiswa').getValue(),
                        dataGrid: json
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if (!d.success) {
                            Ext.Msg.alert('Peringatan', d.message);
                        } else {
                            Ext.Msg.alert('Success', d.message);
                            //                        
                            //Ext.getCmp('idunitReceiveSiswa').setValue(null);
                            Ext.getCmp('idaccountReceiveFormSiswa').setValue(null);
                            Ext.getCmp('notransReceiveSiswa').setValue(null);
                            Ext.getCmp('tanggalReceiveSiswa').setValue(null);
                            Ext.getCmp('memoReceiveSiswa').setValue(null);
                            Ext.getCmp('receiveFromSiswa').setValue(null);
                            ReceiveSiswaGridStore.removeAll();
                            ReceiveSiswaGridStore.sync();
                            updateGridReceiveSiswa();

                            if(mode=='print')
                            {
                                cetak('Bukti Pembayaran','receivemoney',d.id);
                            }
                        }
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            } else {
                Ext.Msg.alert('Failed', 'Tidak dapat memproses data, karena terdapat kesalahan data');
            }
            
        }
    },
    saveRecurr: function() {
        if (validasiPayment()) {
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
        var idunitReceiveSiswa = Ext.getCmp('idunitReceiveSiswa').getValue();
        if (idunitReceiveSiswa == null) {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            Ext.getCmp('formAddRowReceiveSiswa').getForm().reset();
            wAddRowReceiveSiswa.show();
            Ext.getCmp('AddRowReceiveSiswaIdunit').setValue(idunitReceiveSiswa);
        }
    },
    onImportClick: function() {
        var idunitReceiveSiswa = Ext.getCmp('idunitReceiveSiswa').getValue();
        if (idunitReceiveSiswa == null) {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            // Ext.getCmp('formAddRowReceiveSiswa').getForm().reset();
            // wImportReceiveSiswa.show();
            winImportRecSiswa.show();
            
        }
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridReceiveSiswa();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridReceiveSiswa() {
    //    var subtotalReceiveSiswa = 0 * 1;
    //    var totalPajak = 0 * 1;
    var totalReceiveSiswa = 0 * 1;
    Ext.each(ReceiveSiswaGridStore.data.items, function(obj, i) {
        //        var pajak = (obj.data.amount*1 / 100) * obj.data.ratetax;
        //        totalPajak += pajak;
        totalReceiveSiswa += obj.data.amount * 1 + obj.data.denda * 1;
    });
    //    totalReceiveSiswa = totalReceiveSiswa*1;
    //    Ext.getCmp('subtotalReceiveSiswa').setValue(subtotalReceiveSiswa.toLocaleString('null', {minimumFractionDigits: 2}));
    //    Ext.getCmp('taxReceiveSiswa').setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalReceiveSiswa').setValue(totalReceiveSiswa.toLocaleString('null', {
        minimumFractionDigits: 2
    }));
}

function validasiReceiveSiswa() {
    //    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('idaccountReceiveFormSiswa').getValue() == '') {
        Ext.Msg.alert('Failed', 'Akun penerimaan belum diinput');
    } else if (Ext.getCmp('notransReceiveSiswa').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan no ref');
    } else if (Ext.getCmp('tanggalReceiveSiswa').getValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan tanggal penerimaan');
    } else if (Ext.getCmp('totalReceiveSiswa').getValue() == '') {
        Ext.Msg.alert('Failed', 'Masukkan item penerimaan');
    } else {
        return true;
    }
}



var wEntryReceiveSiswaMoneySiswa = Ext.create('widget.window', {
    id: 'wEntryReceiveSiswaMoneySiswa',
    title: 'Input Pembayaran Siswa',
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
        xtype: 'EntryReceiveSiswaMoneySiswa'
    }]
});

