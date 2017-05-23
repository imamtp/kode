Ext.define('JournalStoreRec', {
    extend: 'Ext.data.Model',
    fields: [
        'idaccount', 'accnumber', 'accname', 'credit', 'debit', 'ratetax'
    ]
});

var storeJrec = Ext.create('Ext.data.Store', {
    model: 'JournalStoreRec'
});

Ext.define('gridRecurringDetail', {
    extend: 'Ext.grid.Panel',
    id: 'gridRecurringDetail',
    alias: 'widget.gridRecurringDetail',
    xtype: 'cell-editing',
    title: 'Daftar Jurnal',
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
            store: storeJrec,
            columns: [
                {
                    header: 'idaccount',
                    hidden: true,
                    dataIndex: 'idaccount',
                    id: 'idaccountRecDetail',
//                    editor: {
//                        allowBlank: false
//                    }
                },
                {
                    header: 'No Akun',
                    dataIndex: 'accnumber',
                    id: 'accnumberRecDetail',
                    width: 50
                },
                {
                    header: 'Nama Akun',
                    dataIndex: 'accname',
                    width: 150,
                    id: 'accnameRecDetail',
//                    editor: {
//                        allowBlank: false
//                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Kredit',
                    width: 100,
                    dataIndex: 'credit',
                    id: 'creditRecDetail',
                    editor: {
                        allowBlank: false
                    },
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Debit',
                    width: 100,
                    dataIndex: 'debit',
                    id: 'debitRecDetail',
                    editor: {
                        allowBlank: false
                    },
                    align: 'right',
//                    renderer: 'usMoney',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
//                {
//                    header: 'Pajak',
////                    width:50,
//                    dataIndex: 'ratetax',
//                    editor: {
//                        xtype:'comboxtax',
//                        valueField:'rate',
//                        labelWidth:40
//                    }
//                },
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
//                {
//                    xtype: 'toolbar',
//                    dock: 'top',
//                    items: [
//                        {
//                            xtype: 'textfield',
//                            id: 'nojurnal',
//                            fieldLabel: 'No Jurnal #'
//                        }
//                    ]
//                }, {
//                    xtype: 'toolbar',
//                    dock: 'top',
//                    items: [
//                        {
//                            xtype: 'datefield',
//                            id: 'tanggaljurnal',
//                            format: 'd/m/Y',
//                            fieldLabel: 'Tanggal'
//                        }
//                    ]
//                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 500,
                            id: 'memojurnalRecDetail',
                            fieldLabel: 'Memo'
                        }
                    ]
                },
//                {
//                    xtype: 'toolbar',
//                    dock: 'top',
//                    items: [
//                        {
//                            text: 'Tambah Jurnal',
//                            iconCls: 'add-icon',
//                            scope: this,
//                            handler: this.onAddClick
//                        }
//                    ]
//                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
//                        {
//                            itemId: 'useRecuringJurnal',
//                            text: 'Gunakan Recurring Jurnal',
//                            iconCls: 'add-icon',
//                            handler: function() {
//                                wGridRecurringPopup.show();
//                                storeGridRecurringPopup.load();
//                            }
//                        }, {
//                            itemId: 'recordandsavejurnal',
//                            text: 'Simpan Sebagai Recurring Jurnal',
//                            iconCls: 'add-icon',
//                            handler: this.saveRecurr
//                        }, {
//                            itemId: 'recordjurnal',
//                            text: 'Rekam Jurnal',
//                            iconCls: 'add-icon',
//                            handler: this.recordJurnal
//                        }, 
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            id: 'outofbalanceRecDetail',
                            fieldLabel: 'Out of Balance',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                        {
                            xtype: 'textfield',
                            id: 'totaldebitRecDetail',
                            align: 'right',
                            readOnly: true,
                            fieldLabel: 'Total Debit',
                            fieldStyle: 'text-align: right;'
                        }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                        {
                            xtype: 'textfield',
                            id: 'totalcreditRecDetail',
                            align: 'right',
                            readOnly: true,
                            fieldLabel: 'Total Kredit',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                }

            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
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
                updateGridJurnal('recurring');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
//        console.log('after edit');
    },
    recordJurnal: function()
    {
//        if (validasiJurnal())
//        {
//            var json = Ext.encode(Ext.pluck(storeJ.data.items, 'data'));
////            var outofbalance = Ext.getCmp('outofbalance').getValue();
//            Ext.Ajax.request({
//                url: SITE_URL + 'journal/recordJournal',
//                method: 'POST',
//                params: {
//                    totalcredit: Ext.getCmp('totalcredit').getValue(),
//                    totaldebit: Ext.getCmp('totaldebit').getValue(),
//                    //totalpajak: Ext.getCmp('totalpajak').getValue(),
//                    memojurnal: Ext.getCmp('memojurnal').getValue(),
//                    nojurnal: Ext.getCmp('nojurnal').getValue(),
//                    tanggaljurnal: Ext.getCmp('tanggaljurnal').getValue(),
//                    datagrid: json
//                },
//                success: function(form, action) {
//
//                    var d = Ext.decode(form.responseText);
////                    console.log(d)
//                    Ext.Msg.alert('Success', d.message);
//
//
//                    Ext.getCmp('totalcredit').setValue(null),
//                            Ext.getCmp('totaldebit').setValue(null),
//                            Ext.getCmp('memojurnal').setValue(null),
//                            Ext.getCmp('nojurnal').setValue(null),
//                            Ext.getCmp('tanggaljurnal').setValue(null),
//                            storeJ.removeAll();
//                    storeJ.sync();
//                    updateGridJurnal();
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                }
//            });
//        }


    },
    saveRecurr: function() {
//        if (validasiJurnal())
//        {
//            Ext.getCmp('formformRecc').getForm().reset();
//            wformRecc.show();
//        }
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
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
//        wAddRowJurnal.show();

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
        updateGridJurnal('recurring')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
})
//
//function updateGridJurnal()
//{
//    var totalcredit = 0 * 1;
//    var totaldebit = 0 * 1;
////    var totalpajak = 0*1;
//    var total = 0 * 1;
//
//    Ext.each(storeJ.data.items, function(obj, i) {
////                       console.info(obj.data.credit);
//        totalcredit += obj.data.credit * 1;
//        totaldebit += obj.data.debit * 1;
//
//        total = totalcredit + totaldebit;
//
////           if(obj.data.ratetax==0 || obj.data.ratetax==null)
////           {
////               totalpajak += 0;
////           } else {
////               totalpajak += (obj.data.ratetax*1)*(total*1)/100*1;
////           }
//    });
////                console.log(totalcredit);
//    var selisih = totaldebit - totalcredit;
////    console.log(selisih);
//    var d = totaldebit;
//    var c = totalcredit;
//    Ext.getCmp('outofbalance').setValue(selisih.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totaldebit').setValue(d.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totalcredit').setValue(c.toLocaleString('null', {minimumFractionDigits: 2}));
////                Ext.getCmp('totalpajak').setValue(totalpajak.toLocaleString('null',{minimumFractionDigits: 2}));
//
//}
//
//function validasiJurnal()
//{
////        var json = Ext.encode(Ext.pluck(storeJ.data.items, 'data'));
//    var outofbalance = Ext.getCmp('outofbalance').getValue();
//    if (outofbalance != 0)
//    {
//        Ext.Msg.alert('Failed', 'Jurnal Tidak Seimbang<br><br>out of balance: ' + outofbalance);
//
//    } else if (Ext.getCmp('nojurnal').getValue() == '')
//    {
//        Ext.Msg.alert('Failed', 'Masukkan nomor jurnal');
//    } else if (Ext.getCmp('tanggaljurnal').getValue() == null)
//    {
//        Ext.Msg.alert('Failed', 'Masukkan tanggal jurnal');
//    } else if (Ext.getCmp('totalcredit').getValue() == '' || Ext.getCmp('totaldebit').getValue() == '')
//    {
//        Ext.Msg.alert('Failed', 'Transaksi jurnal tidak boleh kosong');
//    } else {
//        return true;
//    }
//}

Ext.define('TabDetailJournalRecc', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.TabDetailJournalRecc',
    height: 250,
    width: 602,
    items: [
        {
            xtype: 'gridRecurringDetail'
        },
        {
            title: 'Penjadwalan',
            xtype: 'formRecurringDetail',
            listeners: {
                activate: function() {
                }
            }
        }
    ],
    buttons: [{
            id: 'BtnformReccSimpanRecDetailBtn',
            text: 'Simpan Perubahan',
            handler: function() {

                if (Ext.getCmp('penjadwalanRecDetail').getValue() == false && Ext.getCmp('penjadwalan2RecDetail').getValue() == false)
                {
                    Ext.Msg.alert('Warning', 'Pilih jenis penjadwalan terlebih dahulu');
                } else if (Ext.getCmp('pemberitahuanRecDetail').getValue() == false && Ext.getCmp('pemberitahuan2RecDetail').getValue() == false)
                {
                    Ext.Msg.alert('Warning', 'Pilih jenis pemberitahuan terlebih dahulu');
                } else {

                    var json = Ext.encode(Ext.pluck(storeJrec.data.items, 'data'));

                    Ext.Ajax.request({
                        url: SITE_URL + 'journal/saveJournalRec',
                        method: 'POST',
                        params: {
                            totalcredit: Ext.getCmp('totalcreditRecDetail').getValue(),
                            totaldebit: Ext.getCmp('totaldebitRecDetail').getValue(),
                            //                                totalpajak: Ext.getCmp('totalpajak').getValue(),
                            memojurnal: Ext.getCmp('memojurnalRecDetail').getValue(),
//                                        nojurnal: Ext.getCmp('nojurnalRecDetail').getValue(),
//                                        tanggaljurnal: Ext.getCmp('tanggaljurnalRecDetail').getValue(),
                            penjadwalan: Ext.getCmp('penjadwalanRecDetail').getValue(),
                            namefreq: Ext.getCmp('namefreqRecDetail').getValue(),
                            startdate: Ext.getCmp('startdateRecDetail').getValue(),
                            recuntildate: Ext.getCmp('recuntildateRecDetail').getValue(),
                            penjadwalan2: Ext.getCmp('penjadwalan2RecDetail').getValue(),
                            recnumtimes: Ext.getCmp('recnumtimesRecDetail').getValue(),
                            pemberitahuan: Ext.getCmp('pemberitahuanRecDetail').getValue(),
                            //                                penjadwalan2: Ext.getCmp('penjadwalan2').getValue(),
                            notifto: Ext.getCmp('notiftoRecDetail').getValue(),
                            pemberitahuan2: Ext.getCmp('pemberitahuan2RecDetail').getValue(),
                            alertto: Ext.getCmp('alerttoRecDetail').getValue(),
                            idjournaltype: Ext.getCmp('idjournaltypeRecDetail').getValue(),
                            idjournalrec: Ext.getCmp('idjournalrecRecDetail').getValue(),
                            datagrid: json
                        },
                        success: function(form, action) {

                            var d = Ext.decode(form.responseText);

                            Ext.Msg.alert('Success', d.message);

                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                }
            }
        }]

});


