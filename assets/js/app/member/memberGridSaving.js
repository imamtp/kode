// var windowSavingMemberList = Ext.create(dir_sys + 'member.windowSavingMemberList');

Ext.define('GridMemberSavingGridModel', {
    extend: 'Ext.data.Model',
    fields: ['id_saving_type','id_member','approvedby_id','date_registered','date_activated','amount','status','startdate','enddate','no_account','username','saving_name','balance'],
    idProperty: 'id'
});
var storeGridMemberSavingGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMemberSavingGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/saving_grid/member',
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

storeGridMemberSavingGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.id_member:' + Ext.getCmp("id_member_frm_member").getValue()
    };
});

Ext.define('MY.searchGridMemberSavingGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMemberSavingGrid',
    store: storeGridMemberSavingGrid,
    width: 180
});
var smGridMemberSavingGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMemberSavingGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMemberSavingGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMemberSavingGrid').enable();
        }
    }
});
Ext.define(dir_sys+'member.memberGridSaving', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridMemberSavingGrid,
    title: 'Simpanan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridMemberSavingGridID',
    id: 'GridMemberSavingGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMemberSavingGrid',
    store: storeGridMemberSavingGrid,
    loadMask: true,
    columns: [{
        header: 'id_saving_type',
        dataIndex: 'id_saving_type',
        hidden: true
    },{
        header: 'id_member',
        dataIndex: 'id_member',
        hidden: true
    }, {
        header: 'Nama Produk',
        dataIndex: 'saving_name',
        minWidth: 150
    }, {
        header: 'No Rekening',
        dataIndex: 'no_account',
        minWidth: 150
    }, {
        header: 'Saldo',
        xtype:'numbercolumn',
        align:'right',
        dataIndex: 'balance',
        minWidth: 150
    }, {
        header: 'Tgl Terdaftar',
        dataIndex: 'date_registered',
        minWidth: 150
    }, {
        header: 'Tgl Aktivasi',
        dataIndex: 'date_activated',
        minWidth: 150
    }, {
        header: 'Tgl Mulai',
        dataIndex: 'startdate',
        minWidth: 150
    }, {
        header: 'Tgl Akhir',
        dataIndex: 'enddate',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype:'textfield',
            labelWidth:150,
            fieldLabel:'<font color=green>Total Saldo Simpanan</font>',
            value:'250.000'
        },{
            itemId: 'addMemberSavingGrid',
            hidden:true,
            text: 'Buka Rekening Baru',
            iconCls: 'add-icon',
            handler: function() {
                // windowSavingMemberList.show();
                // Ext.getCmp('GridSavingTypeMemberList').getStore().load();
                // Ext.getCmp('statusformMemberSavingGrid').setValue('input');
            }
        }, {
            itemId: 'editMemberSavingGrid',
            hidden:true,
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMemberSavingGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMemberSavingGrid = Ext.getCmp('formMemberSavingGrid');
                    formMemberSavingGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MemberSavingGrid/1',
                        params: {
                            extraparams: 'a.idsupplier:' + selectedRecord.data.idsupplier
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wMemberSavingGrid.show();
                    Ext.getCmp('statusformMemberSavingGrid').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMemberSavingGrid',
            text: 'Non-Aktifkan',
            hidden:true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMemberSavingGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MemberSavingGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridMemberSavingGrid.load();
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
            xtype: 'searchGridMemberSavingGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMemberSavingGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMemberSavingGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMemberSavingGrid = Ext.getCmp('formMemberSavingGrid');
            wMemberSavingGrid.show();
            formMemberSavingGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MemberSavingGrid/1',
                params: {
                    extraparams: 'a.idsupplier:' + record.data.idsupplier
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            //            
            //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformMemberSavingGrid').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});
