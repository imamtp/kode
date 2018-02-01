var WindowFormDeposit = Ext.create(dir_sys + 'saving.WindowFormDeposit');
Ext.define('TransactionGridModel', {
    extend: 'Ext.data.Model',
    fields: ['id_saving_history', 'no_account','remarks', 'id_saving_type', 'id_member', 'idunit', 'idjournal', 'datein', 'tellerid', 'approvedby', 'amount', 'fee_adm', 'status', 'trx_type', 'id_saving_type_dest', 'id_member_dest', 'remarks', 'trx_time_type', 'trx_date', 'member_name', 'no_member', 'username', 'saving_name'],
    idProperty: 'id'
});
var storeTransactionGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'TransactionGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SavingTransaction/saving',
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

storeTransactionGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.trx_type:' + Ext.getCmp('comboxTrxType_TransactionGrid').getValue(),
        'startdate': Ext.getCmp('startdate_TransactionGrid').getValue(),
        'enddate': Ext.getCmp('enddate_TransactionGrid').getValue()
    };
});

Ext.define('MY.searchTransactionGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchTransactionGrid',
    store: storeTransactionGrid,
    width: 180
});
var smTransactionGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smTransactionGrid.getSelection().length;
            if(selectedLen == 0) {
                // Ext.getCmp('btnDeleteTransactionGrid').disable();
            }
        },
        select: function(model, record, index) {
            if(record.data.status == '2') {
                //inaktif
                Ext.getCmp('addApprovalAccountGrid').enable();
            } else if(record.data.status == '1') {
                //aktif
                Ext.getCmp('addApprovalAccountGrid').disable();
            }
        }
    }
});
Ext.define(dir_sys + 'saving.TransactionGrid', {
    // title: 'Pembukaan Rekening',
    itemId: 'TransactionGrid',
    id: 'TransactionGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.TransactionGrid',
    store: storeTransactionGrid,
    selModel: smTransactionGrid,
    loadMask: true,
    columns: [{
        header: 'id_saving_history',
        dataIndex: 'id_saving_history',
        hidden: true
    }, {
        header: 'id_member',
        dataIndex: 'id_member',
        hidden: true
    }, {
        header: 'Nama Nasabah',
        flex: 1,
        dataIndex: 'member_name',
        minWidth: 150
    }, {
        header: 'No Rekening',
        dataIndex: 'no_account',
        minWidth: 150
    }, {
        header: 'Tipe Transaksi',
        dataIndex: 'trx_type',
        minWidth: 150,
        renderer: function(value) {
            var str = customColumnStatus(TrxTypeArr, value);
            if(str == 'Cash In') {
                return '<font color=green>' + str + '</font>'
            } else {
                return '<font color=red>' + str + '</font>'
            }
        }
    }, {
        header: 'Status',
        dataIndex: 'status',
        minWidth: 100,
        renderer: function(value) {
            return customColumnStatus(StatusSavingTransactionArr, value);
        }
    }, {
        header: 'No Anggota',
        hidden:true,
        dataIndex: 'no_member',
        minWidth: 150
    }, {
        header: 'Produk',
        hidden:true,
        dataIndex: 'saving_name',
        minWidth: 150
    }, {
        header: 'Tgl Transaksi',
        dataIndex: 'trx_date',
        minWidth: 150
    }, {
        header: 'Nominal Transaksi',
        dataIndex: 'amount',
        align: 'right',
        xtype: 'numbercolumn',
        minWidth: 150
        }, {
            header: 'Biaya Lain',
            dataIndex: 'fee_adm',
            align: 'right',
            xtype: 'numbercolumn',
            minWidth: 150
        },
        {
            header: 'Keterangan',
            flex:1,
            dataIndex: 'remarks',
            minWidth: 250
        }, {
        header: 'Operator',
        hidden:true,
        dataIndex: 'username',
        minWidth: 150
    }, {
        header: 'Tgl Transaksi',
        dataIndex: 'datein',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'datefield',
            id: 'startdate_TransactionGrid',
            format: 'd/m/Y',
            // value: datenow(),
            fieldLabel: 'Tgl Transaksi',
        }, ' to ', {
            xtype: 'datefield',
            id: 'enddate_TransactionGrid',
            format: 'd/m/Y',
            // value: datenow(),
            hideLabel: true
                // fieldLabel: 'Date Order',
        }, {
            xtype: 'comboxTrxType',
            id:'comboxTrxType_TransactionGrid',
            listeners: {
                'change': function(field, newValue, oldValue) {
                    storeTransactionGrid.load();
                }
            }
            }, {
                text: 'Search',
                handler: function () {
                    storeTransactionGrid.load();
                }
            },
            {
                text: 'Clear Filter',
                handler: function () {
                    Ext.getCmp('startdate_TransactionGrid').setValue();
                    Ext.getCmp('enddate_TransactionGrid').setValue();
                    Ext.getCmp('comboxTrxType_TransactionGrid').setValue();
                    storeTransactionGrid.load();
                }
            }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            id: 'depositTransactionGridBtn',
            text: 'Setor Tunai Baru',
            iconCls: 'add-icon',
            handler: function() {
                WindowFormDeposit.show();
                Ext.getCmp('formWindowFormDeposit').getForm().reset();
                Ext.getCmp('statusformSavingTransaction').setValue('input');
                Ext.getCmp('statusWindowFormDeposit').setValue(1);
                Ext.getCmp('statusWindowFormDeposit').setReadOnly(true);
            }
        }, {
            id: 'withdrawTransactionGridBtn',
            text: 'Tarik Tunai Baru',
            iconCls: 'add-icon',
            handler: function() {
                WindowFormDeposit.show();
                Ext.getCmp('formWindowFormDeposit').getForm().reset();
                Ext.getCmp('statusformSavingTransaction').setValue('input');
                Ext.getCmp('statusWindowFormDeposit').setValue(1);
                Ext.getCmp('statusWindowFormDeposit').setReadOnly(true);
            }
        }, {
            text: 'Persetujuan',
            hidden: true,
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('TransactionGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if(data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    WindowFormDeposit.show();
                    var formWindowFormDeposit = Ext.getCmp('formWindowFormDeposit').getForm();
                    formWindowFormDeposit.reset();
                    Ext.getCmp('statusformsavingopen').setValue('edit');
                    formWindowFormDeposit.load({
                        url: SITE_URL + 'backend/loadFormData/member_saving/1/saving',
                        params: {
                            extraparams: 'a.id_saving_type:' + selectedRecord.data.id_saving_type + ',' + 'a.id_member:' + selectedRecord.data.id_member
                        },
                        success: function(form, action) {
                            var obj = Ext.decode(action.response.responseText);
                            // console.log(obj);
                            formWindowFormDeposit.findField("status").setValue(obj.data.status * 1);
                            // formTransactionGrid.getForm().findField("status_name").setValue(obj.data.status_name * 1);
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            formWindowFormDeposit.findField("approval_openingAccount").setValue('approval');
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    });
                    Ext.getCmp('BtnWindowFormDepositSimpan').enable();
                }
            }
        }, {
            id: 'editTransactionGrid',
            hidden: true,
            text: 'Lihat',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.getCmp('TransactionGrid');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if(data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    // loadSavingTypeForm(selectedRecord.data.id_saving_type)
                }
            }
        }, {
            id: 'btnDeleteTransactionGrid',
            hidden: true,
            text: 'Batalkan Transaksi',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if(btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('TransactionGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/TransactionGrid/saving',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu: 24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if(!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeTransactionGrid.load();
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
            xtype: 'searchTransactionGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeTransactionGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeTransactionGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            loadTransactionGrid(record.data.id_saving_type, record.data.id_member)
        }
    }
});

function loadTransactionGrid(id_saving_type, id_member) {
    WindowFormDeposit.show();
    var formWindowFormDeposit = Ext.getCmp('formWindowFormDeposit').getForm();
    formWindowFormDeposit.reset();
    Ext.getCmp('statusformsavingopen').setValue('edit');
    formWindowFormDeposit.load({
        url: SITE_URL + 'backend/loadFormData/member_saving/1/saving',
        params: {
            extraparams: 'a.id_saving_type:' + id_saving_type + ',' + 'a.id_member:' + id_member
        },
        success: function(form, action) {
            var obj = Ext.decode(action.response.responseText);
            // console.log(obj);
            formWindowFormDeposit.findField("status").setValue(obj.data.status * 1);
            // formTransactionGrid.getForm().findField("status_name").setValue(obj.data.status_name * 1);
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
            if(obj.data.status == '1') {
                Ext.getCmp('BtnWindowFormDepositSimpan').disable();
            } else {
                Ext.getCmp('BtnWindowFormDepositSimpan').enable();
            }
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    });
}