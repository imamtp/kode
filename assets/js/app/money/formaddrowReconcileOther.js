var formAddRowReconcileOther = Ext.create('Ext.form.Panel', {
    id: 'formAddRowReconcileOther',
    width: 450,
    height: 230,
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
                    xtype: 'hiddenfield',
                    id: 'idaccountRecOther',
                    name: 'idaccount',
                    readOnly: true
                },
                Ext.create('Ext.form.field.ComboBox', {
                    fieldLabel: 'Jenis Penyesuaian',
                    displayField: 'jenispenyesuaian',
                    queryMode: 'local',
                    id: 'jenispenyesuaian',
                    name: 'jenispenyesuaian',
                    editable:false,
                    triggerAction: 'all',
                    valueField: 'value',
                    allowBlank: false,
                    listeners: {
                        'change': function() {
                            if(this.value==1)
                            {
                                // Ext.getCmp('accnameRecOther').setTitle('Akun Pendapatan');
                            } else {
                                // Ext.getCmp('accnameRecOther').setTitle('Akun Biaya');
                            }
                        }
                    },
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'jenispenyesuaian'],
                        data: [
                            {"jenispenyesuaian": "Pendapatan","value": 1},
                            {"jenispenyesuaian": "Biaya","value": 2},
                            //...
                        ]
                    })
                }),
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: 'Akun',
//                    labelWidth: 150,
                    name: 'accname',
                    id: 'accnameRecOther',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {

                               wAccReconcileOtherPopup.show();
                               var jp = Ext.getCmp('jenispenyesuaian').getValue();

                                if(jp==1)
                                {
                                    //pendapatan
                                     storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                        operation.params={
                                                                    'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                                                    'idaccounttype': '12,16'
                                                        };
                                                    });
                                    // storeAccountAktive.load({
                                    //                 params: {
                                    //                     'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                    //                     'idaccounttype': '12,16'
                                    //                 }
                                    //             });
                                } else {
                                    storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                        operation.params={
                                                                    'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                                                    'idaccounttype': '14,15'
                                                        };
                                                    });
                                    // storeAccountAktive.load({
                                    //                     params: {
                                    //                         'idunit': Ext.getCmp('idunitReconcile').getValue(),
                                    //                         'idaccounttype': '14,15'
                                    //                     }
                                    //                 });
                                }

                                storeGridAccount.load();

                            });
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Ref',
                    allowBlank: false,
                    id: 'norefRecOther',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                insertNoRef(1, Ext.getCmp('idunitReconcile').getValue(), 'norefRecOther');
                            });
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    fieldLabel: 'Tanggal',
                    allowBlank: false,
                    id: 'dateRecOther'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jumlah',
                    allowBlank: false,
                    id: 'amountRecOther'
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: 'Memo',
                    id: 'memoRecOther'
                }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAddRowReconcileOther');
                Ext.getCmp('formAddRowReconcileOther').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAddRowReconcileOtherSimpan',
            text: 'Tambahkan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    var i = 0;
                    var jp = Ext.getCmp('jenispenyesuaian').getValue();
                    console.log(jp);

                    if(jp==1)
                    {
                        //pendapatan
                        var rec = new reconcileGridStoreModel({
                            noref: Ext.getCmp('norefRecOther').getValue(),
                            date: Ext.getCmp('dateRecOther').getSubmitValue(),
                            memo: Ext.getCmp('memoRecOther').getValue(),
                            // expenseaccount: Ext.getCmp('idaccountRecOther').getValue(),
                           incomeaccount: Ext.getCmp('idaccountRecOther').getValue(),
                           deposit: Ext.getCmp('amountRecOther').getValue()
                            // withdraw: Ext.getCmp('amountRecOther').getValue()
                        });
                    } else {
                        //pengeluaran
                        var rec = new reconcileGridStoreModel({
                            noref: Ext.getCmp('norefRecOther').getValue(),
                            date: Ext.getCmp('dateRecOther').getSubmitValue(),
                            memo: Ext.getCmp('memoRecOther').getValue(),
                            expenseaccount: Ext.getCmp('idaccountRecOther').getValue(),
    //                        incomeaccount: Ext.getCmp('idaccountReconcileOtherI').getValue(),
                           // deposit: Ext.getCmp('amountRecOther').getValue()
                            withdraw: Ext.getCmp('amountRecOther').getValue()
                        });
                    }
                    

                    var grid = Ext.getCmp('EntryReconcile');
                    if (Ext.getCmp('amountRecOther').getValue() != '')
                    {
                        grid.getStore().insert(0, rec);
                        i++;
                    }

                    Ext.getCmp('windowPopupAddRowReconcileOther').hide();

                    updateSelisih();

                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wAddRowReconcileOther = Ext.create('widget.window', {
    id: 'windowPopupAddRowReconcileOther',
    title: 'Entry Penyesuaian',
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
    items: [formAddRowReconcileOther]
});