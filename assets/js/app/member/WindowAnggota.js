var memberFormProfil = Ext.create(dir_sys + 'member.memberFormProfil');
var memberFormDetail = Ext.create(dir_sys + 'member.memberFormDetail');
var memberGridJob = Ext.create(dir_sys + 'member.memberGridJob');
var memberGridSaving = Ext.create(dir_sys + 'member.memberGridSaving');
var memberGridLoan = Ext.create(dir_sys + 'member.memberGridLoan');
// var formAnggotaGrid = Ext.create('Ext.form.Panel', {
//     id: 'formAnggotaGrid',
//     width: 760,
//     title: 'Profil',
//     height: 410,
//     url: SITE_URL + 'backend/saveform/AnggotaGrid/member',
//     bodyStyle: 'padding:5px',
//     baseParams: {idmenu:95},
//     //    autoWidth:true,
//     forceFit: true,
//     autoScroll: true,
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         //        padding: '5 40 5 5',
//         labelWidth: 120,
//         width: 400
//     },
//     layout: 'hbox',
//     defaults: {
//         padding: '5 10 5 5',
//     },
//     items: [{
//         items: [{
//             xtype: 'hiddenfield',
//             name: 'ifrm_member',
//             id: 'ifrm_member'
//         }, {
//             xtype: 'hiddenfield',
//             name: 'statusformAnggotaGrid',
//             id: 'statusformAnggotaGrid'
//         },{
//             xtype:'comboxunit',
//             allowBlank: false,
//             valueField:'idunit',
//             name:'idunit'
//         },{
//             xtype:'comboxanggotatype',
//             allowBlank: false
//         },
//         {
//             xtype: 'textfield',
//             fieldLabel: 'Nomor anggota',
//             allowBlank: false,
//             name: 'no_member'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Nama anggota',
//             allowBlank: false,
//             name: 'member_name'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'No Identitas',
//             allowBlank: false,
//             name: 'no_id'
//         },
//         {
//             xtype:'comboxStatusKawin',
//             allowBlank:false
//         }, {
//             xtype: 'datefield',
//             fieldLabel: 'Tgl Lahir',
//             format: 'd-m-Y',
//             name: 'birth_date'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Tempat Lahir',
//             allowBlank: false,
//             name: 'birth_location'
//         },{
//             xtype: 'textarea',
//             fieldLabel: 'Alamat',
//             allowBlank: false,
//             name: 'alamat'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Kota',
//             allowBlank: false,
//             name: 'kota'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Kode Pos',
//             name: 'kodepos'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Negara',
//             name: 'negara'
//         },{
//             xtype: 'textfield',
//             allowBlank: false,
//             fieldLabel: 'No Telepon',
//             name: 'telpon1'
//         }]
//     }, {
//         items: [{
//             xtype: 'textfield',
//              allowBlank: false,
//             fieldLabel: 'Handphone',
//             name: 'handphone'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Email',
//             name: 'email'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Website',
//             name: 'website'
//         }, 
//         {
//             xtype: 'radiogroup',
//             allowBlank:false,
//             fieldLabel: 'Staff Koperasi',
//             columns: 1,
//             items: [
//                 {boxLabel: 'Ya', name: 'status', inputValue: 1},
//                 {boxLabel: 'Tidak', name: 'status', inputValue: 0}
//             ]
//         },
//         {
//             xtype:'comboxStatusMember',
//             id:'comboxStatusMember',
//             allowBlank:false
//         },
//         {
//             xtype: 'datefield',
//             fieldLabel: 'Tgl Aktif',
//             format: 'd-m-Y',
//             name: 'activated_date'
//         },{
//             xtype: 'textarea',
//             fieldLabel: 'Catatan',
//             name: 'Catatan'
//         }]
//     }]
// });
Ext.define('Tabanggota', {
    extend: 'Ext.tab.Panel',
    plain: true,
    id: 'Tabanggota',
    alias: 'widget.Tabanggota',
    activeTab: 0,
    autoWidth: '100%',
    bodyPadding: 5,
    autoScroll: true,
    defaults: {
        // autoScroll: true,
        // bodyPadding: '1 0 15 0'
    },
    items: [{
            xtype: 'memberFormProfil',
            listeners: {
                activate: function() {
                    Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
                    // storeGridMemberSavingGrid.load();
                    // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                }
            }
        }, {
            xtype: 'memberFormDetail',
            listeners: {
                activate: function() {
                    Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
                    // storeGridMemberSavingGrid.load();
                    // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                }
            }
        }, {
            xtype: 'GridMemberJobGrid',
            listeners: {
                activate: function() {
                    Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
                    // storeGridMemberSavingGrid.load();
                    // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                }
            }
        }, {
            xtype: 'GridMemberSavingGrid',
            listeners: {
                activate: function() {
                    Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
                    // storeGridMemberSavingGrid.load();
                    Ext.getCmp('GridMemberSavingGridID').getStore().load();
                    Ext.Ajax.request({
                        url: SITE_URL + 'saving/get_total_saving_member',
                        method: 'GET',
                        params: {
                            id_member: Ext.getCmp('id_member_frm_member').getValue()
                        },
                        success: function(form, action) {
                            var d = Ext.decode(form.responseText);
                            console.log(d)
                            Ext.getCmp('totalSavingMemberTab').setValue(d.total);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                }
            }
        }, {
            xtype: 'GridMemberLoanGrid',
            listeners: {
                activate: function() {
                    Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
                    // storeGridMemberSavingGrid.load();
                    // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                }
            }
        }
        // formAnggotaGrid, 
        // Ext.create(dir_sys + 'member.memberFormProfil', {
        //     listeners: {
        //         activate: function() {
        //             Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
        //             // storeGridMemberSavingGrid.load();
        //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
        //         }
        //     }
        // }),
        // Ext.create(dir_sys + 'member.memberFormDetail', {
        //     listeners: {
        //         activate: function() {
        //             Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
        //             // storeGridMemberSavingGrid.load();
        //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
        //         }
        //     }
        // }),
        // Ext.create(dir_sys + 'member.memberGridJob', {
        //     listeners: {
        //         activate: function() {
        //             // storeGridMemberSavingGrid.load();
        //             Ext.getCmp('GridMemberJobGridID').getStore().load();
        //             Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(true);
        //         }
        //     }
        // }),
        // Ext.create(dir_sys + 'member.memberGridSaving', {
        //     listeners: {
        //         activate: function() {
        //             // storeGridMemberSavingGrid.load();
        //             Ext.getCmp('GridMemberSavingGridID').getStore().load();
        //             Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(true);
        //         }
        //     }
        // }),
        // Ext.create(dir_sys + 'member.memberGridLoan', {
        //     listeners: {
        //         activate: function() {
        //             // storeGridMemberSavingGrid.load();
        //             Ext.getCmp('GridMemberLoanGridID').getStore().load();
        //             Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(true);
        //         }
        //     }
        // })
    ]
});
var wAnggotaGrid = Ext.create('widget.window', {
    id: 'windowPopupAnggotaGrid',
    title: 'Data anggota',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 850,
    height: sizeH,
    modal: true,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'Tabanggota'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('windowPopupAnggotaGrid');
            Ext.getCmp('formAnggotaGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnAnggotaGridSimpan',
        text: 'Simpan',
        handler: function() {
            // console.log(Ext.ComponentQuery.query('[name=statusform]').textField[0].setValue('newVal'));
            // console.log(formAnggotaGrid.getForm().findField("statusform").setValue('newVal'));
            // return true;
            // var form = this.up('form').getForm();Ext.getCmp('login-form').getValues();
            var formDetail = Ext.getCmp('memberFormDetailID').getValues();
            var form = Ext.getCmp('formAnggotaGrid').getForm();
            if(form.isValid()) {
                form.submit({
                    url: SITE_URL + 'backend/saveform/AnggotaGrid/member',
                    params: formDetail,
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        Ext.getCmp('memberFormDetailID').getForm().reset();
                        Ext.getCmp('windowPopupAnggotaGrid').hide();
                        storeGrifrm_memberGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGrifrm_memberGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
Ext.define('fotoAnggotathumb', {
    extend: 'Ext.Component',
    // id:'formpegdata',
    alias: 'widget.fotoAnggotathumb',
    fieldLabel: 'Foto',
    autoEl: {
        tag: 'img',
        width: 80,
        height: 50
    }
});
Ext.define(dir_sys + 'member.WindowAnggota', {
    width: 850,
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Data Anggota',
    id: 'WindowAnggota',
    alias: 'widget.WindowAnggota',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    listeners: {
        'close': function(win) {
            // Ext.getCmp('btnUbahNilaiUT').hide();
        },
        'hide': function(win) {
            // Ext.getCmp('btnUbahNilaiUT').hide();
        }
    },
    // width: 750,
    // minWidth: 650,
    // height: 580,
    //    maximizable: true,
    border: false,
    autoScroll: true,
    bodyStyle: 'padding-right: 0px',
    items: [{
        xtype: 'container',
        layout: 'hbox',
        defaults: {
            padding: '5 10 5 5',
        },
        items: [{
            xtype: 'container',
            // flex: 1,
            border: false,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [{
                xtype: 'fotoAnggotathumb',
                id: 'fotoAnggotathumb',
                fieldLabel: 'Foto',
                anchor: '40%',
                width: 87,
                height: 100,
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            defaults: {
                // padding: '5 10 5 5',
                labelWidth: 120,
                width: 450
            },
            items: [{
                fieldLabel: 'Nama Lengkap',
                // afterLabelTextTpl: required,
                allowBlank: false,
                id: 'member_name_frm_member',
                name: 'member_name',
                anchor: '100%'
            }, {
                xtype: 'comboxStatusMember',
                id: 'comboxStatusMember_frm_member',
                allowBlank: false,
                width: 355
            }, {
                xtype: 'comboxunit',
                allowBlank: false,
                valueField: 'idunit',
                name: 'idunit',
                width: 355
            }, {
                xtype: 'hiddenfield',
                name: 'id_member',
                id: 'id_member_frm_member'
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'No Anggota',
                allowBlank: false,
                id: 'no_member_frm_member',
                name: 'no_member',
                anchor: '100%'
            }, {
                xtype: 'comboxanggotatype',
                id: 'comboxanggotatype_frm_member',
                allowBlank: false,
                anchor: '100%'
            }]
        }]
    }, {
        xtype: 'Tabanggota'
    }],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var win = Ext.getCmp('WindowAnggota');
            Ext.getCmp('formAnggotaGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnAnggotaGridSimpan',
        text: 'Simpan',
        handler: function() {
            // console.log(Ext.ComponentQuery.query('[name=statusform]').textField[0].setValue('newVal'));
            // console.log(formAnggotaGrid.getForm().findField("statusform").setValue('newVal'));
            // return true;
            // var form = this.up('form').getForm();Ext.getCmp('login-form').getValues();
            var formDetail = Ext.getCmp('memberFormDetailID').getValues();
            var form = Ext.getCmp('formAnggotaGrid').getForm();
            if(form.isValid()) {
                form.submit({
                    url: SITE_URL + 'backend/saveform/AnggotaGrid/member',
                    params: formDetail,
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        form.reset();
                        Ext.getCmp('memberFormDetailID').getForm().reset();
                        Ext.getCmp('WindowAnggota').hide();
                        storeGrifrm_memberGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGrifrm_memberGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});