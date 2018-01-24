var WindowAnggota = Ext.create(dir_sys + 'member.WindowAnggota');


Ext.define('Grifrm_memberGridModel', {
    extend: 'Ext.data.Model',
    fields: ['id_member', 'idunit', 'no_member', 'namaunit', 'id_type', 'no_id', 'member_name', 'address', 'telephone', 'handphone', 'email', 'website', 'postcode', 'birth_location', 'birth_date', 'pin', 'photo_image', 'sign_image', 'notes', 'marital_status', 'nama_ibu_kandung', 'nama_ahli_waris', 'no_id_ahli_waris', 'lahir_ahli_waris', 'hubungan_ahli_waris', 'notlp_ahli_waris', 'no_rekening', 'nama_rekening', 'nama_bank', 'approved_by', 'activated_date', 'status', 'is_staff', 'datein'],
    idProperty: 'id'
});
var storeGrifrm_memberGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'Grifrm_memberGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/AnggotaGrid/member',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'menu_name',
        direction: 'DESC'
    }]
});

//storeGridInventoryAll.on('beforeload',function(store, operation,eOpts){
//        operation.params={
//                    'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitAnggota').getValue()
//                  };
//              });

Ext.define('MY.searchGrifrm_memberGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGrifrm_memberGrid',
    store: storeGrifrm_memberGrid,
    width: 180
});
var smGrifrm_memberGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGrifrm_memberGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteAnggotaGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteAnggotaGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'member.anggotaGrid', {
    // title: 'Daftar Anggota',
    itemId: 'Grifrm_memberGridID',
    id: 'Grifrm_memberGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.anggotaGrid',
    store: storeGrifrm_memberGrid,
    loadMask: true,
    columns: [{
        header: 'id_member',
        dataIndex: 'id_member',
        hidden: true
    }, {
        header: 'No Anggota',
        dataIndex: 'no_member',
        minWidth: 150
    }, {
        header: 'Nama',
        flex: 1,
        dataIndex: 'member_name',
        minWidth: 150
    }, {
        header: 'No Identitas',
        dataIndex: 'no_id',
        minWidth: 150
    }, {
        header: 'Alamat',
        dataIndex: 'address',
        minWidth: 150
    }, {
        header: 'Tgl Lahir',
        dataIndex: 'birth_date',
        minWidth: 150
    }, {
        header: 'Tempat Lahir',
        dataIndex: 'birth_location',
        minWidth: 150
    }, {
        header: 'No Handphone',
        dataIndex: 'handphone',
        minWidth: 150
    }, {
        header: 'Email',
        dataIndex: 'email',
        minWidth: 150
    }, {
        header: 'Tgl Aktifasi',
        dataIndex: 'activated_date',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
        minWidth: 150,
        renderer: function(value) {
          return customColumnStatus(StatusMemberArr, value);
        }
    }, {
        header: 'datein',
        dataIndex: 'datein',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                xtype: 'comboxunit',
                valueField: 'idunit',
                id: 'cbUnitAnggota',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGrifrm_memberGrid.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitAnggota').getValue() + ',' + 'a.ifrm_membertype:' + Ext.getCmp('cbUnitPelangganType').getValue()

                            }
                        });
                    }
                }
            },
            {
                xtype: 'comboxanggotatype',
                valueField: 'ifrm_membertype',
                id: 'cbUnitAnggotaType',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGrifrm_memberGrid.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitAnggota').getValue() + ',' + 'a.ifrm_membertype:' + Ext.getCmp('cbUnitPelanggan').getValue()

                            }
                        });
                    }
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'adfrm_memberGrid',
            text: 'Tambah Anggota',
            iconCls: 'add-icon',
            handler: function() {
                WindowAnggota.show();
                Ext.getCmp('statusformAnggotaGrid').setValue('input');
                anggotaTypeStore.load();
                Ext.getCmp('BtnAnggotaGridSimpan').setDisabled(false);
                Ext.getCmp('comboxStatusMember_frm_member').setValue(1);
                Ext.getCmp('comboxStatusMember_frm_member').setReadOnly(1);
            }
        }, {
            itemId: 'editAnggotaGrid',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                // var grid = Ext.ComponentQuery.query('Grifrm_memberGridID')[0];
                var grid = Ext.getCmp('Grifrm_memberGridID');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                } else {
                    loadMemberForm(selectedRecord.data.id_member)
                }
            }
        }, {
            id: 'btnDeleteAnggotaGrid',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.getCmp('Grifrm_memberGridID');
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/AnggotaGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu: 95
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            storeGrifrm_memberGrid.load();
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGrifrm_memberGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGrifrm_memberGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGrifrm_memberGrid.load();
                anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            loadMemberForm(record.data.id_member)
        }
    }
});


