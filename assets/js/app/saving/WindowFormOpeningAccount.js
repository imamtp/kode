var WindowMemberListOpeningAccount = Ext.create(dir_sys + 'saving.WindowMemberListOpeningAccount');
var WinSavingTypeListOpeningAccount = Ext.create(dir_sys + 'saving.WinSavingTypeListOpeningAccount');

var formWindowFormOpeningAccount = Ext.create('Ext.form.Panel', {
    id: 'formWindowFormOpeningAccount',
    // width: panelW,
    autoHeight: true,
    autoWidth:true,
    // height: sizeH,
    url: SITE_URL + 'saving/post_member_saving',
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
                id: 'id_saving_type_FormOpeningAccount'
            }, {
                xtype: 'hiddenfield',
                name: 'id_member',
                id: 'id_member_FormOpeningAccount'
            }, {
                xtype: 'hiddenfield',
                name: 'statusformsavingopen',
                id: 'statusformsavingopen'
            }, 
            {
                xtype:'hiddenfield',
                name:'approval',
                id:'approval_openingAccount'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nama Anggota',
                allowBlank: false,
                name: 'member_name',
                id: 'member_name_FormOpeningAccount',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            WindowMemberListOpeningAccount.show();
                            Ext.getCmp('GridMemberListOpeningAccount').getStore().load();
                        });
                    }
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'No Anggota',
                allowBlank: false,
                name: 'no_member',
                id: 'no_member_FormOpeningAccount'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Jenis Tabungan',
                allowBlank: false,
                name: 'saving_name',
                id: 'saving_name_FormOpeningAccount',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            WinSavingTypeListOpeningAccount.show();
                            Ext.getCmp('GridSavingTypeListOpeningAccount').getStore().load();
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
                id: 'no_account_FormOpeningAccount',
            },
            {
                xtype: 'numericfield',
                fieldLabel: 'Jangka Waktu (bulan)',
                allowBlank: false,
                name: 'period',
                id: 'period_FormOpeningAccount'
            },
            {
                xtype: 'datefield',
                format: 'd-m-Y',
                fieldLabel: 'Tgl Mulai',
                name: 'startdate',
                id: 'startdate_FormOpeningAccount',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        console.log(new Date(newValue));
                        Ext.getCmp('enddate_FormOpeningAccount').setValue(addMonths(new Date(newValue), Ext.getCmp('period_FormOpeningAccount').getValue() * 1));
                    }
                }
            },
            {
                xtype: 'datefield',
                format: 'd-m-Y',
                readOnly: true,
                fieldLabel: 'Tgl Akhir',
                name: 'enddate',
                id: 'enddate_FormOpeningAccount'
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                name: 'reg_admin_fee',
                fieldLabel: 'Biaya Admin',
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
                fieldLabel: 'Catatan',
                name: 'opening_notes'
            },
            {
                xtype: 'comboxSavingStatus',
                name: 'status',
                id: 'statusWindowFormOpeningAccount'
            }
        ]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupWindowFormOpeningAccount');
            Ext.getCmp('formWindowFormOpeningAccount').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnWindowFormOpeningAccountSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formWindowFormOpeningAccount').getForm().reset();
                        Ext.getCmp('windowPopupWindowFormOpeningAccount').hide();
                        Ext.getCmp('OpeningAccountGrid').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridWindowFormOpeningAccount.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

Ext.define(dir_sys + 'saving.WindowFormOpeningAccount', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowFormOpeningAccount',
    id: 'windowPopupWindowFormOpeningAccount',
    title: 'Form Pembukaan Rekening Baru',
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
    items: [formWindowFormOpeningAccount]
});