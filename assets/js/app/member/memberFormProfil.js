Ext.define(dir_sys + 'member.memberFormProfil', {
    extend: 'Ext.form.Panel',
    alias: 'widget.memberFormProfil',
    id: 'formAnggotaGrid',
    width: 760,
    title: 'Profil',
    height: 410,
    // url: SITE_URL + 'backend/saveform/member',
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
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    items: [{
        items: [{
                xtype: 'hiddenfield',
                name: 'id_member',
                id: 'id_member'
            }, {
                xtype: 'hiddenfield',
                name: 'statusformAnggotaGrid',
                id: 'statusformAnggotaGrid'
            },  {
                xtype: 'textfield',
                fieldLabel: 'No Identitas',
                allowBlank: false,
                name: 'no_id'
            },
            {
                xtype: 'comboxStatusKawin',
                id: 'comboxStatusKawin_frm_member',
                allowBlank: false
            }, {
                xtype: 'datefield',
                fieldLabel: 'Tgl Lahir',
                format: 'd-m-Y',
                name: 'birth_date'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Tempat Lahir',
                allowBlank: false,
                name: 'birth_location'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Alamat',
                allowBlank: false,
                name: 'alamat'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kota',
                allowBlank: false,
                name: 'kota'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kode Pos',
                name: 'kodepos'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Negara',
                name: 'negara'
            }, {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'No Telepon',
                name: 'telpon1'
            }
        ]
    }, {
        items: [{
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Handphone',
                name: 'handphone'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Email',
                name: 'email'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Website',
                name: 'website'
            },
            {
                xtype: 'radiogroup',
                allowBlank: false,
                fieldLabel: 'Staff Koperasi',
                columns: 1,
                items: [
                    { boxLabel: 'Ya', name: 'status', inputValue: 1 },
                    { boxLabel: 'Tidak', name: 'status', inputValue: 0 }
                ]
            },
            
            {
                xtype: 'datefield',
                fieldLabel: 'Tgl Aktif',
                format: 'd-m-Y',
                name: 'activated_date'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Catatan',
                name: 'Catatan'
            }
        ]
    }]
});