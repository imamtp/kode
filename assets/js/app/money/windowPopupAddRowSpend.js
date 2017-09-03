var wAccAddRowSpendPopup = Ext.create(dir_sys + 'money.wAccAddRowSpendPopup');

var formAddRowSpend = Ext.create('Ext.form.Panel', {
    id: 'formAddRowSpend',
    width: 450,
    height: 230,
//    url: SITE_URL + 'account/saveLink',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
            xtype: 'textfield',
            fieldLabel: 'Pilih Akun Pengeluaran',
            name: 'accname',
            allowBlank:false,
            id: 'accnameSpendAdd',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wAccAddRowSpendPopup.show();
                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                        operation.params={
                                                                    'idunit': Ext.getCmp('idunitSpend').getValue(),
                                                                    'idaccounttype': '10,14,15'
                                                        };
                                                    });
                                                    storeGridAccount.load();
                        // storeAccountAktive.load({
                        //     params: {
                        //         'idunit': Ext.getCmp('idunitSpend').getValue(),
                        //         'idaccounttype': '9,10,14,15,18,9'
                        //     }
                        // });
                    });
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nomor Akun',
            id:'accnumberSpendAdd',
            name: 'accnumber',
            readOnly:true
        },
        {
            xtype: 'hiddenfield',
            id:'idaccountSpendAdd',
            name: 'idaccount',
            readOnly:true
        },{
            xtype:'textfield',
            fieldLabel:'Jumlah',
            allowBlank:false,
            name:'amount',
            id:'amountSpendAdd'
        },
        {
            xtype:'comboxtax',
            allowBlank:false,
            id:'ratetaxSpendAdd',
            valueField:'rate'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAddRowSpend');
                Ext.getCmp('formAddRowSpend').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAddRowSpendSimpan',
            text: 'Tambahkan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    
                    var rec = new SpendGridStoreModel({
                        idaccount: Ext.getCmp('idaccountSpendAdd').getValue(),
                        accname: Ext.getCmp('accnameSpendAdd').getValue(),
                        accnumber: Ext.getCmp('accnumberSpendAdd').getValue(),
                        amount: Ext.getCmp('amountSpendAdd').getValue(),
                        ratetax: Ext.getCmp('ratetaxSpendAdd').getValue()
                    });
                    
                    var grid = Ext.getCmp('EntrySpendMoney');
                    grid.getStore().insert(0, rec);
                    
                    updateGridSpend();
                    
                    Ext.getCmp('windowPopupAddRowSpend').hide();
                    
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

Ext.define(dir_sys + 'money.windowPopupAddRowSpend',{
    extend: 'Ext.window.Window',
    alias: 'widget.windowPopupAddRowSpend',
// var wAddRowSpend = Ext.create('widget.window', {
    id: 'windowPopupAddRowSpend',
    title: 'Tambah Item Pengeluaran Kas',
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
    items: [formAddRowSpend]
});

