var WindowFormDeposit = Ext.create(dir_sys + 'saving.WindowFormDeposit');

Ext.define('GridSavingDepositGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'id_saving_type', 'id_member', 'date_registered', 'date_activated', 'status', 'approvedby_id', 'amount', 'interest', 'reg_admin_fee', 'startdate', 'enddate', 'opening_notes', 'no_account', 'period',
        'saving_name', 'saving_type', 'saving_category', 'no_member', 'member_name', 'userin', 'user_approved'
    ],
    idProperty: 'id'
});
var storeGridSavingDepositGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSavingDepositGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/member_saving/saving',
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

// storeGridSavingDepositGrid.on('beforeload', function(store, operation, eOpts) {
//     operation.params = {
//         'extraparams': 'b.namesupplier:' + Ext.getCmp('supplierPurchase').getValue()
//     };
// });

Ext.define('MY.searchGridSavingDepositGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSavingDepositGrid',
    store: storeGridSavingDepositGrid,
    width: 180
});
var smGridSavingDepositGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSavingDepositGrid.getSelection().length;
            if (selectedLen == 0) {
                // Ext.getCmp('btnDeleteSavingDepositGrid').disable();
            }
        },
        select: function(model, record, index) {
            if (record.data.status == '2') {
                //inaktif
                Ext.getCmp('addApprovalSavingDeposit').enable();
            } else if (record.data.status == '1') {
                //aktif
                Ext.getCmp('addApprovalSavingDeposit').disable();
            }
        }
    }
});
Ext.define(dir_sys + 'saving.SavingDepositGrid', {
    title: 'Transaksi Setoran',
    itemId: 'SavingDepositGrid',
    id: 'SavingDepositGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.SavingDepositGrid',
    store: storeGridSavingDepositGrid,
    selModel: smGridSavingDepositGrid,
    loadMask: true,
    columns: [{
            header: 'id_saving_type',
            dataIndex: 'id_saving_type',
            hidden: true
        }, {
            header: 'id_member',
            dataIndex: 'id_member',
            hidden: true
        },
        {
            header: 'Nama Nasabah',
            flex: 1,
            dataIndex: 'member_name',
            minWidth: 130
        },
        {
            header: 'No Anggota',
            dataIndex: 'no_member',
            minWidth: 150
        },
        {
            header: 'Jumlah Transaksi',
            dataIndex: 'amount',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Biaya Lain',
            dataIndex: 'fee_adm',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Dientri Oleh',
            dataIndex: 'userin',
            minWidth: 150
        },
        {
            header: 'Tgl Transaksi',
            dataIndex: 'date_trans',
            minWidth: 130
        }, {
            header: 'Disetujui Oleh',
            dataIndex: 'user_approved',
            minWidth: 150
        },
        {
            header: 'Tgl Dikonfirmasi',
            dataIndex: 'date_confirmed',
            minWidth: 130
        },
        {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 100,
            renderer: function(value) {
                return customColumnStatus(SavingStatusArr, value);
            }
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                id: 'addSavingDepositGrid',
                text: 'Setoran Baru',
                iconCls: 'add-icon',
                handler: function() {
                    WindowFormDeposit.show();
                    // formSavingDepositGrid.getForm().reset();
                    Ext.getCmp('statusformsavingopen').setValue('input');
                    Ext.getCmp('statusWindowFormDeposit').setValue(1);
                    Ext.getCmp('statusWindowFormDeposit').setReadOnly(true);
                }
            },
            // {
            //     text: 'Ubah Status',
            //     iconCls: 'add-icon',
            //     handler: function() {}
            // }
            // {
            //     id: 'addApprovalSavingDeposit',
            //     text: 'Konfirmasi',
            //     iconCls: 'add-icon',
            //     handler: function() {
            //         var grid = Ext.ComponentQuery.query('SavingDepositGrid')[0];
            //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
            //         var data = grid.getSelectionModel().getSelection();
            //         if (data.length == 0) {
            //             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            //         } else {
            //             WindowFormOpeningAccount.show();
            //             var formWindowFormOpeningAccount = Ext.getCmp('formWindowFormOpeningAccount').getForm();

            //             formWindowFormOpeningAccount.reset();
            //             Ext.getCmp('statusformsavingopen').setValue('edit');

            //             formWindowFormOpeningAccount.load({
            //                 url: SITE_URL + 'backend/loadFormData/member_saving/1/saving',
            //                 params: {
            //                     extraparams: 'a.id_saving_type:' + selectedRecord.data.id_saving_type + ',' + 'a.id_member:' + selectedRecord.data.id_member
            //                 },
            //                 success: function(form, action) {
            //                     var obj = Ext.decode(action.response.responseText);
            //                     // console.log(obj);
            //                     formWindowFormOpeningAccount.findField("status").setValue(obj.data.status * 1);
            //                     // formSavingDepositGrid.getForm().findField("status_name").setValue(obj.data.status_name * 1);
            //                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //                 },
            //                 failure: function(form, action) {
            //                     Ext.Msg.alert("Load failed", action.result.errorMessage);
            //                 }
            //             });

            //             Ext.getCmp('BtnWindowFormOpeningAccountSimpan').enable();
            //         }
            //     }
            // },
            {
                id: 'btnDeleteSavingDepositGrid',
                text: 'Batalkan Transaksi',
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridSavingDepositGrid')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/SavingDepositGrid/saving',
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
                                            storeGridSavingDepositGrid.load();
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
                xtype: 'searchGridSavingDepositGrid',
                text: 'Left Button'
            }
        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSavingDepositGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSavingDepositGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            showDepositData(record.data.id_saving_type, record.data.id_member)
        }
    }
});


function showDepositData(id_saving_type, id_member) {
    WindowFormOpeningAccount.show();
    var formWindowFormOpeningAccount = Ext.getCmp('formWindowFormOpeningAccount').getForm();

    formWindowFormOpeningAccount.reset();
    Ext.getCmp('statusformsavingopen').setValue('edit');

    formWindowFormOpeningAccount.load({
        url: SITE_URL + 'backend/loadFormData/member_saving/1/saving',
        params: {
            extraparams: 'a.id_saving_type:' + id_saving_type + ',' + 'a.id_member:' + id_member
        },
        success: function(form, action) {
            var obj = Ext.decode(action.response.responseText);
            // console.log(obj);
            formWindowFormOpeningAccount.findField("status").setValue(obj.data.status * 1);
            // formSavingDepositGrid.getForm().findField("status_name").setValue(obj.data.status_name * 1);
            // Ext.Msg.alert("Load failed", action.result.errorMessage);

            if (obj.data.status == '1') {
                Ext.getCmp('BtnWindowFormOpeningAccountSimpan').disable();
            } else {
                Ext.getCmp('BtnWindowFormOpeningAccountSimpan').enable();
            }
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    });
}