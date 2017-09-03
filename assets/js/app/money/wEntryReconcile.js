// load_js_file('money/formaddrowReconcile.js');
var wAddRowReconcile = Ext.create(dir_sys + 'money.windowPopupAddRowReconcile');
var windowPopupAddRowReconcileOther = Ext.create(dir_sys + 'money.windowPopupAddRowReconcileOther');

var wAccReconcilePopup = Ext.create(dir_sys + 'money.wAccReconcilePopup');

// load_js_file('money/formaddrowReconcileOther.js');

Ext.define('reconcileGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['noref', 'date', 'expenseaccount', 'incomeaccount', 'accnameE', 'accnameI', 'amount', 'memo', 'deposit', 'withdraw'],
    idProperty: 'id'
});

var reconcileGridStore = Ext.create('Ext.data.Store', {
    model: 'reconcileGridStoreModel'
});


Ext.define('KitchenSink.view.grid.EntryReconcile', {
    extend: 'Ext.grid.Panel',
    id: 'EntryReconcile',
    alias: 'widget.EntryReconcile',
//    xtype: 'cell-editing',
    title: 'Rekonsiliasi Bank',
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
            store: reconcileGridStore,
            columns: [
                 {
                    dataIndex: 'expenseaccount',
                    hidden:true
                },
                 {
                     dataIndex: 'incomeaccount',
                    hidden:true
                },
                {
                    header: 'Tanggal',
                    dataIndex: 'date',
                    width: 100
                },
                {
                    header: 'No Ref',
                    dataIndex: 'noref',
                    width: 70
                },
                {
                    header: 'Memo',
                    dataIndex: 'memo',
                    width: 150
                },
                {
                    header: 'Pendapatan',
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'deposit',
                    width: 100,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
                {
                    header: 'Biaya',
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'withdraw',
                    width: 100,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
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
                            xtype: 'comboxunit',
                            id: 'idunitReconcile',
                            labelWidth: 150,
                            name: 'idunit',
                            valueField: 'idunit'
                        },
                         '->',
                        {
                            xtype: 'textfield',
                            id: 'newbalanceReconcile',
                            labelWidth: 150,
                            fieldLabel: 'Saldo Menurut Bank',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        this.setRawValue(renderNomor(this.getValue()));
                                        updateSelisih();
                                    }, c);
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
                            id: 'idaccountReconcile',
                            name: 'idaccount',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Akun Bank',
                            labelWidth: 150,
                            name: 'accname',
                            id: 'accnameReconcile',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        if (Ext.getCmp('idunitReconcile').getValue() == null)
                                        {
                                            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                        } else {
                                            wAccReconcilePopup.show();
                                            storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                        operation.params={
                                                                    'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                                                    'idaccounttype': '19,17,1'
                                                        };
                                                    });
                                                    storeGridAccount.load();
                                            //  storeAccountAktive.load({
                                            //     params: {
                                            //         'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                            //         'idaccounttype': '19,17,1'
                                            //     }
                                            // });
                                        }


                                    });
                                }
                            }
                        }, {
                            xtype: 'displayfield',
                            name: 'accnumber',
                            id: 'accnumberReconcile',
                            readOnly: true
                        }, '->',
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            id: 'accbalanceReconcile',
                            labelWidth: 150,
                            fieldLabel: 'Saldo Buku Besar',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'datefield',
                            format: 'd-m-Y',
                            fieldLabel: 'Tgl Rekening Koran',
                            labelWidth: 150,
                            id: 'datestatementReconcile',
                            listeners: {
                                change: function(component) {
//                                    console.log(Ext.getCmp('datestatementReconcile').getSubmitValue())
//                                    OngoingGridStore.load({
//                                        params: {
//                                            'idunit': Ext.getCmp('idunitReconcile').getValue(),
//                                            'datestate': Ext.getCmp('datestatementReconcile').getSubmitValue(),
//                                            'idaccount': Ext.getCmp('idaccountReconcile').getValue()
//                                        }
//                                    });
//                                    getOngoing();
                                    updateSelisih();
                                }
                            }
                        }, '->',
                         {
                            xtype: 'textfield',
                            readOnly: true,
                            fieldLabel: 'Selisih',
                            labelWidth: 150,
                            id: 'outbalanceReconcile',
                            fieldStyle: 'text-align: right;'
                        }
//                        {
//                            xtype: 'textfield',
//                            readOnly: true,
//                            fieldLabel: 'Saldo Dalam Perjalanan',
//                            labelWidth: 150,
//                            id: 'calcbalanceReconcile',
//                            fieldStyle: 'text-align: right;'
//                        }

                    ]
                },
              
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Bank Entry',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClick
                        },
                        {
                            text: 'Entry Lain',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClickOther
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
                            handler: this.recordReconcile
                        }, '->',
                        {
                            xtype: 'textfield',
//                            fieldLabel: 'Total Penerimaan',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalDReconcile',
                            fieldStyle: 'text-align: right;'
                        },
                        {
                            xtype: 'displayfield',
                            width: 25,
                            readOnly: true,
                            fieldStyle: 'text-align: right;'
                        },
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalCReconcile',
                            fieldStyle: 'text-align: right;'
                        }, {
                            xtype: 'displayfield',
                            width: 15,
                            readOnly: true,
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
//                        disableEntryReconcile();
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
                updateSelisih();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordReconcile: function()
    {
        if (validasiReconcile())
        {
            var json = Ext.encode(Ext.pluck(reconcileGridStore.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryReconcile').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'money/recordReconcile',
                method: 'POST',
                params: {
                    idunitReconcile: Ext.getCmp('idunitReconcile').getValue(),
                    idaccountReconcile: Ext.getCmp('idaccountReconcile').getValue(),
                    datestatementReconcile: Ext.getCmp('datestatementReconcile').getValue(),
                    newbalanceReconcile: Ext.getCmp('newbalanceReconcile').getValue(),
                    accbalanceReconcile: Ext.getCmp('accbalanceReconcile').getValue(),
                    datestatementReconcile: Ext.getCmp('datestatementReconcile').getValue(),
//                    calcbalanceReconcile: Ext.getCmp('calcbalanceReconcile').getValue(),
                    outbalanceReconcile: Ext.getCmp('outbalanceReconcile').getValue(),
                    totalDReconcile: Ext.getCmp('totalDReconcile').getValue(),
                    totalCReconcile: Ext.getCmp('totalCReconcile').getValue(),
                    dataGrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);
//                        
//                        Ext.getCmp('accnameReconcile').setValue(null);
//                        Ext.getCmp('idaccountReconcile').setValue(null);
//                        Ext.getCmp('accnumberReconcile').setValue(null);
//                        Ext.getCmp('notransReconcile').setValue(null);
//                        Ext.getCmp('receiveFrom').setValue(null);
//                        Ext.getCmp('tanggalReconcile').setValue(null);
//                        Ext.getCmp('memoReconcile').setValue(null);
//                        Ext.getCmp('totalReconcile').setValue(null);
//                        Ext.getCmp('taxReconcile').setValue(null);
//                        Ext.getCmp('subtotalReconcile').setValue(null);
////                        Ext.getCmp('idunitReconcile').setValue(null);
//
                        Ext.getCmp('newbalanceReconcile').setValue(null);
                        reconcileGridStore.removeAll();
                        reconcileGridStore.sync();
                        updateSelisih();
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

        if (Ext.getCmp('idunitReconcile').getValue() == null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else if (Ext.getCmp('newbalanceReconcile').getValue() == '')
        {
            Ext.Msg.alert('Perhatian', 'Saldo menurut bank belum diinput');
        }  else if (Ext.getCmp('accbalanceReconcile').getValue() == '')
        {
            Ext.Msg.alert('Perhatian', 'Akun belum diinput');
        } else {
            Ext.getCmp('formAddRowReconcile').getForm().reset();

            wAddRowReconcile.show();
            Ext.getCmp('formAddRowReconcile').getForm().reset();

            // storeAccountAktive.load({
            //                             params: {
            //                                 'idunit': Ext.getCmp('idunitReconcile').getValue(),
            //                                 'idaccounttype': '14,15'
            //                             }
            //                         });

//            var rec = new ReconcileGridStoreModel({
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
    onAddClickOther: function() {

        if (Ext.getCmp('idunitReconcile').getValue() == null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else if (Ext.getCmp('newbalanceReconcile').getValue() == '')
        {
            Ext.Msg.alert('Perhatian', 'Saldo menurut bank belum diinput');
        }  else if (Ext.getCmp('accbalanceReconcile').getValue() == '')
        {
            Ext.Msg.alert('Perhatian', 'Akun belum diinput');
        } else {
            Ext.getCmp('formAddRowReconcile').getForm().reset();

            windowPopupAddRowReconcileOther.show();
            Ext.getCmp('formAddRowReconcileOther').getForm().reset();
        }

    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateSelisih();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateBalance()
{
    var calcbalanceReconcile = 0; //on going
    var accbalanceReconcile = 0; //akun
    var newbalanceReconcile = Ext.getCmp('newbalanceReconcile').getValue(); //bank
    
    if(Ext.getCmp('calcbalanceReconcile').getValue()!='')
    {
        calcbalanceReconcile = Ext.getCmp('calcbalanceReconcile').getValue();
    }
    
    if(Ext.getCmp('accbalanceReconcile').getValue()!='')
    {
        accbalanceReconcile = Ext.getCmp('accbalanceReconcile').getValue();
    }
    
    var gabung = calcbalanceReconcile*1+accbalanceReconcile*1;
    var selisih = newbalanceReconcile*1-gabung*1;
    // console.log(selisih)
//    console.log('newbalanceReconcile:'+newbalanceReconcile+' - gabung:'+gabung)

    
    Ext.getCmp('outbalanceReconcile').setValue(selisih);
}

function updateSelisih()
{
    var totalDReconcile = 0;
    var totalCReconcile = 0;
    var outbalanceReconcile = 0;
    var accbalanceReconcile = 0; //akun
    var newbalanceReconcile = 0; //bank
    
    Ext.each(reconcileGridStore.data.items, function(obj, i) {
        totalDReconcile+=obj.data.deposit;
        totalCReconcile+=obj.data.withdraw;
    });
    
     if(Ext.getCmp('newbalanceReconcile').getValue()!='')
    {
        newbalanceReconcile = str_replace('.','',Ext.getCmp('newbalanceReconcile').getValue());
    }
    
    if(Ext.getCmp('accbalanceReconcile').getValue()!='')
    {
        accbalanceReconcile = str_replace('.','',Ext.getCmp('accbalanceReconcile').getValue());
    }
    
    if(accbalanceReconcile>newbalanceReconcile)
    {
        var selisih = accbalanceReconcile*1-newbalanceReconcile*1;
    }
    if(newbalanceReconcile>accbalanceReconcile)
    {
        var selisih = newbalanceReconcile*1-accbalanceReconcile*1;
    }
    
    var totalDReconcile = 0;
    var totalCReconcile = 0;
    
    Ext.each(reconcileGridStore.data.items, function(obj, i) {
        totalDReconcile += obj.data.deposit*1;
        totalCReconcile += obj.data.withdraw*1;
    });
    // selisih = selisih*1+totalDReconcile;    
    // selisih = selisih*1-totalCReconcile;
    // console.log(totalDReconcile)
    var sumDC = totalDReconcile*1-totalCReconcile*1;
    var selisihBaru = selisih*1-sumDC*1;
//    Ext.getCmp('outbalanceReconcile').setValue(selisih.toLocaleString('null', {minimumFractionDigits: 2}));
    if(selisih<0)
    {
        var numselisih = renderNomorNegative(selisihBaru);
    } else {
        var numselisih = renderNomor(selisihBaru);
    }

    if(numselisih<=0)
    {
        numselisih=0;
    }

    // if(numselisih=='')
    // {
    //     numselisih=0;
    // }

    // console.log('numselisih:'+numselisih)
    Ext.getCmp('outbalanceReconcile').setValue(numselisih);
    
    Ext.getCmp('totalDReconcile').setValue(totalDReconcile.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalCReconcile').setValue(totalCReconcile.toLocaleString('null', {minimumFractionDigits: 2}));
}

function updateGridReconcile()
{
   // var subtotalReconcile = 0 * 1;
   // var totalPajak = 0 * 1;
   // var totalReconcile = 0 * 1;

   Ext.each(reconcileGridStore.data.items, function(obj, i) {
    console.log(obj.data)
       // var pajak = (obj.data.amount * 1 / 100) * obj.data.ratetax;
       // totalPajak += pajak;
       // subtotalReconcile += obj.data.amount * 1;
   });

   // totalReconcile = subtotalReconcile * 1 - totalPajak * 1;

   // Ext.getCmp('subtotalReconcile').setValue(subtotalReconcile.toLocaleString('null', {minimumFractionDigits: 2}));
   // Ext.getCmp('taxReconcile').setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
   // Ext.getCmp('totalReconcile').setValue(totalReconcile.toLocaleString('null', {minimumFractionDigits: 2}));

}
//
//function getOngoing()
//{
//    Ext.Ajax.request({
//        url: SITE_URL + 'money/ongoingBalance',
//        method: 'POST',
//        params: {
//            'idunit': Ext.getCmp('idunitReconcile').getValue(),
//            'datestate': Ext.getCmp('datestatementReconcile').getSubmitValue(),
//            'idaccount': Ext.getCmp('idaccountReconcile').getValue()
//        },
//        success: function(form, action) {
//            var d = Ext.decode(form.responseText);
//            Ext.getCmp('calcbalanceReconcile').setValue(d.ongoing);
//        }
//    });
//}

function validasiReconcile()
{
//    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('idunitReconcile').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Unit belum diinput');

    } else if (Ext.getCmp('idaccountReconcile').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Akun belum diipunt');
    } else if (Ext.getCmp('datestatementReconcile').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal rekening koran');
    } else if (Ext.getCmp('newbalanceReconcile').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan saldo menurut bank');
    } else if (Ext.getCmp('outbalanceReconcile').getValue() !=0)
    {
        Ext.Msg.alert('Failed', 'Selisih belum bernilai nol (0)');
    } else {
        return true;
    }
}

Ext.define(dir_sys + 'money.wEntryReconcile',{
    extend: 'Ext.window.Window',
    alias: 'widget.wEntryReconcile',
// var wEntryReconcile = Ext.create('widget.window', {
    id: 'wEntryReconcile',
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
            xtype: 'EntryReconcile'
        }]
});
