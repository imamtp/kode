Ext.define('GridPaymentHistoryModel', {
    extend: 'Ext.data.Model',
    fields: ['iddisbursment','datepay','nocheque','memo','totalowed','totalpaid','nopurchase','userin','datein','shipaddress','date','totalamount','purchasememo','year','month','duedate','idunit'],
    idProperty: 'id'
});

var storeGridPaymentHistory = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPaymentHistoryModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PaymentHistory/purchase',
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

Ext.define('MY.searchGridPaymentHistory', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPaymentHistory',
    store: storeGridPaymentHistory,
    width: 180
});

var smGridPaymentHistory = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPaymentHistory.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePaymentHistory').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePaymentHistory').enable();
        }
    }
});

Ext.define('GridPaymentHistory', {
    title: 'Daftar Riwayat Pembayaran',
    itemId: 'GridPaymentHistoryID',
    id: 'GridPaymentHistoryID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPaymentHistory',
    store: storeGridPaymentHistory,
    loadMask: true,
    columns: [
     {header: 'iddisbursment', dataIndex: 'iddisbursment', hidden: true},
        {header: 'date pay', dataIndex: 'datepay', minWidth: 100},
        {header: 'no cheque', dataIndex: 'nocheque', minWidth: 100},
        {header: 'memo', dataIndex: 'memo', minWidth: 200},
        {header: 'total owed', dataIndex: 'totalowed', minWidth: 100,xtype:'numbercolumn',align:'right'},
        {header: 'total paid', dataIndex: 'totalpaid', minWidth: 100,xtype:'numbercolumn',align:'right'},
        {header: 'no purchase', dataIndex: 'nopurchase', minWidth: 100},
        {header: 'shi paddress', dataIndex: 'shipaddress', minWidth: 100},
        {header: 'due date', dataIndex: 'duedate', minWidth: 100}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                {
//                    itemId: 'addPaymentHistory',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wPaymentHistory.show();
//                         Ext.getCmp('statusformPaymentHistory').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editPaymentHistory',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridPaymentHistory')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formPaymentHistory = Ext.getCmp('formPaymentHistory');
//
//                            formPaymentHistory.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/PaymentHistory/1/setup',
//                                params: {
//                                    extraparams: 'a.idtax:' + selectedRecord.data.idtax
//                                },
//                                success: function(form, action) {
//                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                },
//                                failure: function(form, action) {
//                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                                }
//                            })
//
//                            wPaymentHistory.show();
//                            Ext.getCmp('statusformPaymentHistory').setValue('edit');
//                        }
//
//                    }
//                }, {
//                    id: 'btnDeletePaymentHistory',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridPaymentHistory')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/PaymentHistory/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridPaymentHistory.remove(sm.getSelection());
//                                    sm.select(0);
//                                }
//                            }
//                        });
//                    },
////                    disabled: true
//                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPaymentHistory',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPaymentHistory, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPaymentHistory.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formPaymentHistory = Ext.getCmp('formPaymentHistory');
            wPaymentHistory.show();

            formPaymentHistory.getForm().load({
                url: SITE_URL + 'backend/loadFormData/PaymentHistory/1/setup',
                params: {
                    extraparams: 'a.idtax:' + record.data.idtax
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
            Ext.getCmp('statusformPaymentHistory').setValue('edit');
        }
    }
});