Ext.define('reconcileGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['noref', 'date', 'expenseaccount', 'incomeaccount', 'accnameE', 'accnameI', 'amount', 'memo', 'deposit', 'withdraw'],
    idProperty: 'id'
});

var reconcileGridStore = Ext.create('Ext.data.Store', {
    model: 'reconcileGridStoreModel'
});


var formAddRowReconcile = Ext.create('Ext.form.Panel', {
    id: 'formAddRowReconcile',
    width: 450,
    height: 400,
//    url: SITE_URL + 'account/saveLink',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
        {
            xtype: 'fieldset',
//            height: 100,
            title: 'Biaya Administrasi Bank',
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'idaccountReconcileE',
                    name: 'idaccount',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Akun',
//                    labelWidth: 150,
                    name: 'accname',
                    id: 'accnameReconcileE',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {

                               windowPopupAccListReconcileE.show();
                                storeAccountAktive.load({
                                                        params: {
                                                            'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                                            'idaccounttype': '14,15'
                                                        }
                                                    });



                            });
                        }
                    }
                },
//                {
//                    xtype: 'displayfield',
//                    name: 'accnumber',
//                    id: 'accnumberReconcileE',
//                    readOnly: true
//                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Ref',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                insertNoRef(1, Ext.getCmp('idunitReconcile').getValue(), 'norefE');
                            });
                        }
                    },
                    id: 'norefE'
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    fieldLabel: 'Tanggal',
                    id: 'dateE'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jumlah',
                    id: 'amountE'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Memo',
                    id: 'memoE'
                }

            ]
        },
        {
            xtype: 'fieldset',
//            height: 100,
            title: 'Pendapatan Bunga Bank',
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'idaccountReconcileI',
                    name: 'idaccount',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Akun',
//                    labelWidth: 150,
                    name: 'accname',
                    id: 'accnameReconcileI',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {

                               windowPopupAccListReconcileI.show();
                                    storeAccountAktive.load({
                                                    params: {
                                                        'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                                        'idaccounttype': '12,16'
                                                    }
                                                });


                            });
                        }
                    }
                }, 
//                {
//                    xtype: 'displayfield',
//                    name: 'accnumber',
//                    id: 'accnumberReconcileI',
//                    readOnly: true
//                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Ref',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                insertNoRef(1, Ext.getCmp('idunitReconcile').getValue(), 'norefI');
                            });
                        }
                    },
                    id: 'norefI'
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    fieldLabel: 'Tanggal',
                    id: 'dateI'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jumlah',
                    id: 'amountI'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Memo',
                    id: 'memoI'
                }

            ]
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAddRowReconcile');
                Ext.getCmp('formAddRowReconcile').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAddRowReconcileSimpan',
            text: 'Tambahkan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    var i = 0;
                    var rec = new reconcileGridStoreModel({
                        noref: Ext.getCmp('norefE').getValue(),
                        date: Ext.getCmp('dateE').getSubmitValue(),
                        memo: Ext.getCmp('memoE').getValue(),
                        expenseaccount: Ext.getCmp('idaccountReconcileE').getValue(),
//                        incomeaccount: Ext.getCmp('idaccountReconcileI').getValue(),
//                        deposit: Ext.getCmp('amountReconcileAdd').getValue(),
                        withdraw: Ext.getCmp('amountE').getValue()
                    });

                    var grid = Ext.getCmp('EntryReconcile');
                    if (Ext.getCmp('amountE').getValue() != '')
                    {
                        grid.getStore().insert(0, rec);
                        i++;
                    }

                    var rec = new reconcileGridStoreModel({
                        noref: Ext.getCmp('norefI').getValue(),
                        date: Ext.getCmp('dateI').getSubmitValue(),
                        memo: Ext.getCmp('memoI').getValue(),
//                        expenseaccount: Ext.getCmp('idaccountReconcileE').getValue(),
                        incomeaccount: Ext.getCmp('idaccountReconcileI').getValue(),
                        deposit: Ext.getCmp('amountI').getValue()
//                        withdraw: Ext.getCmp('amountI').getValue()
                    });

                    if (Ext.getCmp('amountI').getValue() != '')
                    {
                        grid.getStore().insert(i, rec);
                    }

//                    updateGridReconcile();

                    Ext.getCmp('windowPopupAddRowReconcile').hide();

                    updateSelisih();

                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wAddRowReconcile = Ext.create('widget.window', {
    id: 'windowPopupAddRowReconcile',
    title: 'Entry Penyesuaian Bank',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formAddRowReconcile]
});

