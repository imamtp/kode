Ext.define(dir_sys + 'member.memberFormOccupation', {
    extend: 'Ext.form.Panel',
    alias: 'widget.memberFormOccupation',
    id: 'memberFormOccupationID',
    // width: 760,
    // height: 410,
    url: SITE_URL + 'backend/saveform/member_occupation/member',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 150,
        // anchor:'100%'
        width: 380
    },
    // layout: 'hbox',
    // defaults: {
    //     padding: '5 10 5 5',
    // },
    items: [{
            xtype: 'hiddenfield',
            name: 'id_occupation',
            id: 'id_occupation_form'
        },
        {
            xtype: 'hiddenfield',
            name: 'id_member',
            id: 'id_member_occupation_form'
        },
        {
            xtype: 'hiddenfield',
            name: 'statusform_member_occupation',
            id: 'statusformMemberJobGrid'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jabatan',
            name: 'job_role'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Nama Perusahaan',
            name: 'company_name'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jenis Usaha',
            name: 'company_type'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Alamat Perusahaan',
            name: 'company_address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'No Tlp Perusahaan',
            name: 'company_phone'
        },
        {
            xtype: 'numericfield',
            fieldLabel: 'Gaji',
            name: 'sallary'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Mulai Masuk',
            format: 'd-m-Y',
            name: 'startdate'
        }, {
            xtype: 'datefield',
            fieldLabel: 'Tanggal Keluar',
            format: 'd-m-Y',
            name: 'enddate'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('memberWindowFormOccupation');
            Ext.getCmp('memberFormOccupationID').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMemberJobGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('memberFormOccupationID').getForm().reset();
                        Ext.getCmp('memberWindowFormOccupation').hide();
                        Ext.getCmp('GridMemberJobGridID').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMemberJobGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

Ext.define(dir_sys + 'member.memberWindowFormOccupation', {
    extend: 'Ext.window.Window',
    alias: 'widget.memberWindowFormOccupation',
    id: 'memberWindowFormOccupation',
    title: 'Data Pekerjaan',
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
        xtype: 'memberFormOccupation'
    }]
});