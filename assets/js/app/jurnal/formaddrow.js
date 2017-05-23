Ext.define('JournalStore', {
    extend: 'Ext.data.Model',
    fields: [
        'idaccount', 'accnumber', 'accname', 'credit', 'debit', 'ratetax'
    ]
});

var storeJ = Ext.create('Ext.data.Store', {
    model: 'JournalStore'
});


var formAddRowJurnal = Ext.create('Ext.form.Panel', {
    id: 'formAddRowJurnal',
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
    items: [{
            xtype: 'textfield',
            fieldLabel: 'Pilih Akun',
            name: 'accname',
            id: 'accnamejurnal',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccJurnal.show();
                        storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('cbUnitEntryJournal').getValue()
                            }
                        });
                    });
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nomor Akun',
            id: 'accnumberjurnal',
            name: 'accnumber',
            readOnly: true
        },
        {
            xtype: 'hiddenfield',
            id: 'idaccountjurnal',
            name: 'idaccount',
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kredit',
            name: 'kredit',
            id: 'kreditjurnal'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Debit',
            name: 'debit',
            id: 'debitjurnal'
        }
//        ,{
//            xtype:'comboxtax',
//            name:'ratetaxjurnalform',
//            displayField:'nametax',
//            valueField:'rate',
//            id:'ratetaxjurnal'
//        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAddRowJurnal');
                Ext.getCmp('formAddRowJurnal').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAddRowJurnalSimpan',
            text: 'Tambahkan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {

                    var rec = new JournalStore({
                        idaccount: Ext.getCmp('idaccountjurnal').getValue(),
                        accname: Ext.getCmp('accnamejurnal').getValue(),
                        accnumber: Ext.getCmp('accnumberjurnal').getValue(),
                        debit: Ext.getCmp('debitjurnal').getValue(),
                        credit: Ext.getCmp('kreditjurnal').getValue()
//                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                    });

                    var grid = Ext.getCmp('CellEditing');
                    grid.getStore().insert(0, rec);

                    updateGridJurnal('general');
                    Ext.getCmp('windowPopupAddRowJurnal').hide();
//                    JournalStore.insert(0, rec);

//                    form.submit({
//                        success: function(form, action) {
//                            Ext.Msg.alert('Success', action.result.message);
//                            
//                            Ext.getCmp('formAddRowJurnal').getForm().reset();
//                            Ext.getCmp('windowPopupAddRowJurnal').hide();
//                            
//                            storeGridAddRowJurnal.load();
//                        },
//                        failure: function(form, action) {
//                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridAddRowJurnal.load();
//                        }
//                    });

                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wAddRowJurnal = Ext.create('widget.window', {
    id: 'windowPopupAddRowJurnal',
    title: 'Tambah Jurnal',
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
    items: [formAddRowJurnal]
});

