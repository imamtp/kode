Ext.define('GridImportSpendMoneyModel', {
    extend: 'Ext.data.Model',
    fields: ['idspendmoney','idaccount','idjournal','totalpaid','userin','datein','subtotal','notrans','memo','datetrans','spendfrom','month','year','accname','namaunit'],
    idProperty: 'id'
});

var storeGridImportSpendMoney = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridImportSpendMoneyModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SpendMoney/money',
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

Ext.define('MY.searchGridImportSpendMoney', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridImportSpendMoney',
    store: storeGridImportSpendMoney,
    width: 180
});

var smGridImportSpendMoney = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridImportSpendMoney.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteImportSpendMoney').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteImportSpendMoney').enable();
        }
    }
});

Ext.define('GridImportSpendMoney', {
    title: 'Riwayat Import Pengeluaran',
    itemId: 'GridImportSpendMoneyID',
    id: 'GridImportSpendMoneyID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridImportSpendMoney',
    store: storeGridImportSpendMoney,
    loadMask: true,
    columns: [
         {header: 'idspendmoney', dataIndex: 'idspendmoney', hidden: true},
        {header: 'idjournal', dataIndex: 'idjournal', hidden: true},
        {header: 'no trans', dataIndex: 'notrans', minWidth: 100},
        {header: 'date trans', dataIndex: 'datetrans', minWidth: 100},
        {header: 'memo', dataIndex: 'memo', minWidth: 200},
        {header: 'Total Pengeluaran', dataIndex: 'totalpaid', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Akun Pengeluaran Kas', dataIndex: 'accname', minWidth: 150},
        {header: 'nama unit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'user in', dataIndex: 'userin', minWidth: 100},
        {header: 'date in', dataIndex: 'datein', minWidth: 130}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                {
//                    itemId: 'addImportSpendMoney',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wImportSpendMoney.show();
//                         Ext.getCmp('statusformImportSpendMoney').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editImportSpendMoney',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridImportSpendMoney')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formImportSpendMoney = Ext.getCmp('formImportSpendMoney');
//
//                            formImportSpendMoney.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/ImportSpendMoney/1/setup',
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
//                            wImportSpendMoney.show();
//                            Ext.getCmp('statusformImportSpendMoney').setValue('edit');
//                        }
//
//                    }
//                },
//                {
//                    id: 'btnDeleteImportSpendMoney',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridImportSpendMoney')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/ImportSpendMoney/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridImportSpendMoney.remove(sm.getSelection());
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
                    xtype: 'searchGridImportSpendMoney',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridImportSpendMoney, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridImportSpendMoney.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/getPurchase',
                method: 'POST',
                params: {
                    idpurchase: record.data.idpurchase
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
//                        Ext.Msg.alert('Success', d.message);
//                        console.log(d.data.namepayment)
                        wEntryPayment.show();
                        Ext.getCmp('idpurchasePayment').setValue(d.data.idpurchase);
                        Ext.getCmp('shipaddressPayment').setValue(d.data.shipaddress);
                        Ext.getCmp('nojurnalPayment').setValue(d.data.nopurchase);
//                        Ext.getCmp('memoPayment').setValue(d.data.memo);
                        Ext.getCmp('totalPajakPayment').setValue(d.data.tax);
                        Ext.getCmp('angkutPayment').setValue(d.data.freigthcost);
                        Ext.getCmp('sisaBayarPayment').setValue(d.data.totalowed);
                        Ext.getCmp('paymentPayment').setValue(d.data.namepayment);
                        Ext.getCmp('tglPelunasanPayment').setValue(d.data.duedate);
                        Ext.getCmp('totalPayment').setValue(d.data.totalamount);
                        Ext.getCmp('idunitPayment').setValue(d.data.idunit);

                        PaymentGridStore.load({
                            params: {
                                'extraparams': 'a.idpurchase:'+d.data.idpurchase
                            }
                        });

                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });



            // var formAgama = Ext.create('formAgama');
//            var formImportSpendMoney = Ext.getCmp('formImportSpendMoney');
//            wImportSpendMoney.show();
//
//            formImportSpendMoney.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ImportSpendMoney/1/setup',
//                params: {
//                    extraparams: 'a.idtax:' + record.data.idtax
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformImportSpendMoney').setValue('edit');
        }
    }
});