
var wAccReceiveAddRowPopup = Ext.create(dir_sys + 'money.wAccReceiveAddRowPopup');

var formAddRowReceive = Ext.create('Ext.form.Panel', {
    id: 'formAddRowReceive',
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
            allowBlank:false,
            id: 'accnameReceiveAdd',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wAccReceiveAddRowPopup.show();
                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'idunit': Ext.getCmp('idunitReceive').getValue(),
                                                'idaccounttype': '12,16,11'
                                    };
                                });
                                storeGridAccount.load();
                    });
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nomor Akun',
            id:'accnumberReceiveAdd',
            name: 'accnumber',
            readOnly:true
        },
        {
            xtype: 'hiddenfield',
            id:'idaccountReceiveAdd',
            name: 'idaccount',
            readOnly:true
        },{
            xtype:'textfield',
            fieldLabel:'Jumlah',
            allowBlank:false,
            name:'amount',
            id:'amountReceiveAdd'
        },
        {
            xtype:'comboxtax',
            allowBlank:false,
            id:'ratetaxReceiveAdd',
            valueField:'rate'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupAddRowReceive');
                Ext.getCmp('formAddRowReceive').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAddRowReceiveSimpan',
            text: 'Tambahkan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    
                    var rec = new ReceiveGridStoreModel({
                        idaccount: Ext.getCmp('idaccountReceiveAdd').getValue(),
                        accname: Ext.getCmp('accnameReceiveAdd').getValue(),
                        accnumber: Ext.getCmp('accnumberReceiveAdd').getValue(),
                        amount: Ext.getCmp('amountReceiveAdd').getValue(),
                        ratetax: Ext.getCmp('ratetaxReceiveAdd').getValue()
                    });
                    
                    var grid = Ext.getCmp('EntryReceiveMoney');
                    grid.getStore().insert(0, rec);
                    
                    updateGridReceive();
                    
                    Ext.getCmp('windowPopupAddRowReceive').hide();
                    
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

Ext.define(dir_sys + 'money.windowPopupAddRowReceive',{
    extend: 'Ext.window.Window',
    alias: 'widget.windowPopupAddRowReceive',
// var wAddRowReceive = Ext.create('widget.window', {
    id: 'windowPopupAddRowReceive',
    title: 'Tambah Item (kredit)',
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
    items: [formAddRowReceive]
});

