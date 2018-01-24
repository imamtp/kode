var memberWindowFormOccupation = Ext.create(dir_sys + 'member.memberWindowFormOccupation');

Ext.define('GridMemberJobGridModel', {
    extend: 'Ext.data.Model',
    fields: ['id_occupation', 'id_member', 'job_role', 'company_name', 'company_type', 'company_address', 'company_phone', 'startdate', 'enddate', 'sallary'],
    idProperty: 'id'
});
var storeGridMemberJobGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMemberJobGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/member_occupation/member',
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

Ext.define('MY.searchGridMemberJobGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMemberJobGrid',
    store: storeGridMemberJobGrid,
    width: 180
});
var smGridMemberJobGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMemberJobGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMemberJobGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMemberJobGrid').enable();
        }
    }
});

Ext.define(dir_sys + 'member.memberGridJob', {
    title: 'Pekerjaan',
    itemId: 'GridMemberJobGridID',
    id: 'GridMemberJobGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMemberJobGrid',
    store: storeGridMemberJobGrid,
    loadMask: true,
    columns: [{
        header: 'id_occupation',
        dataIndex: 'id_occupation',
        hidden: true
    }, {
        header: 'id_member',
        dataIndex: 'id_member',
        minWidth: 150,
        hidden: true
    }, {
        header: 'Jabatan',
        dataIndex: 'job_role',
        minWidth: 150
    }, {
        header: 'Nama Perusahaan',
        dataIndex: 'company_name',
        minWidth: 150
    }, {
        header: 'Jenis Usaha',
        dataIndex: 'company_type',
        minWidth: 150
    }, {
        header: 'Alamat Perusahaan',
        dataIndex: 'company_address',
        minWidth: 150
    }, {
        header: 'No Tlp Perusahaan',
        dataIndex: 'company_phone',
        minWidth: 150
    }, {
        header: 'Tgl Masuk',
        dataIndex: 'startdate',
        minWidth: 150
    }, {
        header: 'Tgl Keluar',
        dataIndex: 'enddate',
        minWidth: 150
    }, {
        header: 'Gaji',
        dataIndex: 'sallary',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMemberJobGrid',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                memberWindowFormOccupation.show();
                Ext.getCmp('statusformMemberJobGrid').setValue('input');
                Ext.getCmp('id_member_occupation_form').setValue(Ext.getCmp('id_member').getValue());
            }
        }, {
            itemId: 'editMemberJobGrid',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMemberJobGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMemberJobGrid = Ext.getCmp('memberFormOccupationID');
                    formMemberJobGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/member_occupation/1/member',
                        params: {
                            extraparams: 'a.id_occupation:' + selectedRecord.data.id_occupation
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    memberWindowFormOccupation.show();
                    Ext.getCmp('statusformMemberJobGrid').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteMemberJobGrid',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMemberJobGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/member_occupation/member',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu: 24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridMemberJobGrid.load();
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });

                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridMemberJobGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMemberJobGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMemberJobGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});