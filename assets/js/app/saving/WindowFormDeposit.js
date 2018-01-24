var WindowMemberListDepositForm = Ext.create(dir_sys + 'saving.WindowMemberListDepositForm');
var WinSavingTypeListDepositForm = Ext.create(dir_sys + 'saving.WinSavingTypeListDepositForm');

var formWindowFormDeposit = Ext.create('Ext.form.Panel', {
    id: 'formWindowFormDeposit',
    // width: panelW,
    autoHeight: true,
    autoWidth:true,
    // height: sizeH,
    url: SITE_URL + 'backend/saveform/SavingTransaction/saving',
    baseParams: {
        idmenu: 24
    },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150,
        // anchor:'100%'
        width: 350
    },
    items: [{
        items: [{
                xtype: 'hiddenfield',
                name: 'id_saving_type',
                id: 'id_saving_type_FormDepositForm'
            }, {
                xtype: 'hiddenfield',
                name: 'id_member',
                id: 'id_member_FormDepositForm'
            }, {
                xtype: 'hiddenfield',
                name: 'statusformSavingTransaction',
                id: 'statusformSavingTransaction'
            }, {
                xtype: 'hiddenfield',
                name: 'trx_type',
                value: 1
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nama Anggota',
                allowBlank: false,
                name: 'member_name',
                id: 'member_name_FormDepositForm',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            WindowMemberListDepositForm.show();
                            Ext.getCmp('GridMemberListDepositForm').getStore().load();
                        });
                    }
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'No Anggota',
                allowBlank: false,
                name: 'no_member',
                id: 'no_member_FormDepositForm'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Produk Simpanan',
                allowBlank: false,
                name: 'saving_name',
                id: 'saving_name_FormDepositForm',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            WinSavingTypeListDepositForm.show();
                            Ext.getCmp('GridSavingTypeListDepositForm').getStore().load();
                        });
                    }
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'No Rekening',
                readOnly: true,
                // allowBlank: false,
                name: 'no_account',
                id: 'no_account_FormDepositForm',
            },
            {
                xtype: 'datefield',
                format: 'd-m-Y',
                fieldLabel: 'Tgl Transaksi',
                name: 'trx_date',
                id: 'startdate_FormDepositForm',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        
                    }
                }
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                name: 'amount',
                fieldLabel: 'Nominal Transaksi',
                fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            // updateSelisih();
                        }, c);
                    }
                }
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                name: 'fee_adm',
                fieldLabel: 'Biaya Lainnya',
                fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            // updateSelisih();
                        }, c);
                    }
                }
            }
        ]
    }, {
        items: [{
                xtype: 'textarea',
                fieldLabel: 'Berita Transaksi',
                name: 'remarks'
            },
            {
                xtype: 'comboxDepositStatus',
                name: 'status',
                id: 'statusWindowFormDeposit'
            }
        ]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupWindowFormDeposit');
            Ext.getCmp('formWindowFormDeposit').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnWindowFormDepositSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formWindowFormDeposit').getForm().reset();
                        Ext.getCmp('windowPopupWindowFormDeposit').hide();
                        Ext.getCmp('DepositFormGrid').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridWindowFormDeposit.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

Ext.define(dir_sys + 'saving.WindowFormDeposit', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowFormDeposit',
    id: 'windowPopupWindowFormDeposit',
    title: 'Form Setor Tunai',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formWindowFormDeposit]
});