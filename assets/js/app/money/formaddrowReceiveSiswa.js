Ext.define('ReceiveSiswaGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['idaccount', 'accnumber', 'accname', 'tglbayar','amount', 'idsiswa', 'namasiswa', 'memo', 'noinduk','status','denda'],
    idProperty: 'id'
});
var ReceiveSiswaGridStore = Ext.create('Ext.data.Store', {
    model: 'ReceiveSiswaGridStoreModel'
});
var formAddRowReceiveSiswa = Ext.create('Ext.form.Panel', {
    id: 'formAddRowReceiveSiswa',
    width: 450,
    height: 270,
    //    url: SITE_URL + 'account/saveLink',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150,
        width: 400
    },
    items: [{
        id:'AddRowReceiveSiswaIdunit',
        xtype:'hiddenfield'
    },{
        xtype: 'datefield',
        id: 'tanggalPembayaranSiswa',
        name:'tglbayar',
        allowBlank:false,
        format: 'F Y',
        fieldLabel: 'Bulan Pembayaran'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Pilih Siswa',
        name: 'namasiswa',
        allowBlank: false,
        id: 'namasiswaReceiveSiswaAdd',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    windowPopupSiswaReceive.show();
                    storeMoneyReceiveSiswaGrid.load({
                        params: {
                            'idunit': Ext.getCmp('idunitReceiveSiswa').getValue()
                        }
                    });
                });
            }
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'No Induk Siswa',
        id: 'noindukReceiveSiswaAdd',
        name: 'noinduk',
        readOnly: true
    }, {
        xtype: 'hiddenfield',
        id: 'idsiswaReceiveSiswaAdd',
        name: 'idsiswa',
        readOnly: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Pilih Pembayaran',
        name: 'accname',
        allowBlank: false,
        id: 'accnameReceiveSiswaAdd',
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    // windowPopupAccReceiveSiswa.show();
                    // storeAccountAktive.load({
                    //     params: {
                    //         'idunit': Ext.getCmp('idunitReceiveSiswa').getValue(),
                    //         'idaccounttype':'12,16'
                    //     }
                    // });
                            wAccAddRowReceiveSiswaPopup.show();
                            storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                operation.params={
                                            'idunit': Ext.getCmp('idunitReceiveSiswa').getValue(),
                                            'idaccounttype': '12,16'
                                };
                            });
                            storeGridAccount.load();
                });
            }
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'No Akun Pembayaran',
        id: 'accnumberReceiveSiswaAdd',
        name: 'accnumber',
        readOnly: true
    }, {
        xtype: 'hiddenfield',
        id: 'idaccountReceiveSiswaAdd',
        name: 'idaccount',
        readOnly: true
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Jumlah',
        allowBlank: false,
        name: 'amount',
        id: 'amountReceiveSiswaAdd'
    },{
        xtype: 'numberfield',
        fieldLabel: 'Denda',
        allowBlank: false,
        id: 'dendaReceiveSiswaAdd',
        name: 'denda'
    }, {
        xtype: 'textarea',
        hidden:true,
        fieldLabel: 'Memo',
        name: 'memo',
        id: 'memoReceiveSiswaAdd'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupAddRowReceiveSiswa');
            Ext.getCmp('formAddRowReceiveSiswa').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnAddRowReceiveSiswaSimpan',
        text: 'Tambahkan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                var rec = new ReceiveSiswaGridStoreModel({
                    idaccount: Ext.getCmp('idaccountReceiveSiswaAdd').getValue(),
                    accname: Ext.getCmp('accnameReceiveSiswaAdd').getValue(),
                    memo: Ext.getCmp('memoReceiveSiswaAdd').getValue(),
                    idsiswa: Ext.getCmp('idsiswaReceiveSiswaAdd').getValue(),
                    namasiswa: Ext.getCmp('namasiswaReceiveSiswaAdd').getValue(),
                    amount: Ext.getCmp('amountReceiveSiswaAdd').getValue(),
                    accnumber: Ext.getCmp('accnumberReceiveSiswaAdd').getValue(),
                    tglbayar: Ext.getCmp('tanggalPembayaranSiswa').getSubmitValue(),
                    noinduk: Ext.getCmp('noindukReceiveSiswaAdd').getValue(),
                    denda: Ext.getCmp('dendaReceiveSiswaAdd').getValue(),
                    status:1
                });
                var grid = Ext.getCmp('EntryReceiveSiswaMoneySiswa');
                grid.getStore().insert(0, rec);
                updateGridReceiveSiswa();
                Ext.getCmp('windowPopupAddRowReceiveSiswa').hide();
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wAddRowReceiveSiswa = Ext.create('widget.window', {
    id: 'windowPopupAddRowReceiveSiswa',
    title: 'Tambah Item Pembayaran Siswa',
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
    items: [formAddRowReceiveSiswa]
});