Ext.define(dir_sys+'member.memberFormDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.memberFormDetail',
    id: 'memberFormDetailID',
    width: 760,
    title: 'Detail',
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
    items: [
        {
        items: [
            {
                xtype: 'fieldset',
                title: 'Data Lainnya',
                items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'id_member',
                            id: 'id_member'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Rekening',
                            name: 'no_rekening'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Rekening',
                            name: 'nama_rekening'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Bank',
                            name: 'nama_bank'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nama Ibu Kandung',
                            name: 'nama_ibu_kandung'
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Alamat Ibu Kandung',
                            name: 'alamat_ibu_kandung'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Tgl Lahir Ibu Kandung',
                            format: 'd-m-Y',
                            name: 'tgl_lahir_ibukandung'
                        }
                ]
            }
        ]
    }, {
        items: [
            {
                xtype: 'fieldset',
                title: 'Ahli Waris',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nama Ahli Waris',
                        name: 'nama_ahli_waris'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'No Identitas',
                        name: 'no_id_ahli_waris'
                    },{
                        format: 'd-m-Y',
                        fieldLabel: 'Tgl Lahir',
                        name: 'lahir_ahli_waris'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Hubungan Ahli Waris',
                        name: 'hubungan_ahli_waris'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'No Telepon',
                        name: 'notlp_ahli_waris'
                    }
                ]
            }
        ]
    }
    ]
});