Ext.define('GridDebtModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchase', 'idjournal', 'nopurchase', 'shipaddress', 'date', 'freigthcost', 'tax', 'totalamount', 'paidtoday', 'totalowed', 'memo', 'year', 'month', 'userin', 'datein', 'notes', 'paiddate', 'noinvoice', 'nameshipping', 'status', 'namepayment', 'namaunit', 'namecurr'],
    idProperty: 'id'
});

var storeGridDebt = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDebtModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Debt/purchase',
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

Ext.define('MY.searchGridDebt', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDebt',
    store: storeGridDebt,
    width: 180
});

var smGridDebt = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridDebt.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteDebt').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteDebt').enable();
        }
    }
});

Ext.define('GridDebt', {
    title: 'Daftar Hutang',
    itemId: 'GridDebtID',
    id: 'GridDebtID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDebt',
    store: storeGridDebt,
    loadMask: true,
    columns: [
        {header: 'idpurchase', dataIndex: 'idpurchase', hidden: true},
        {header: 'nopurchase', dataIndex: 'nopurchase', minWidth: 100},
        {header: 'noinvoice', dataIndex: 'noinvoice', minWidth: 100},
        {header: 'date', dataIndex: 'date', minWidth: 100},
//        {header: 'shipaddress', dataIndex: 'shipaddress', minWidth: 100},
        {header: 'freigthcost', dataIndex: 'freigthcost', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'tax', dataIndex: 'tax', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'totalamount', dataIndex: 'totalamount', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'paidtoday', dataIndex: 'paidtoday', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'totalowed', dataIndex: 'totalowed', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'memo', dataIndex: 'memo', minWidth: 100},
        {header: 'notes', dataIndex: 'notes', minWidth: 100},
//        {header: 'paiddate', dataIndex: 'paiddate', minWidth: 100},
//        {header: 'nameshipping', dataIndex: 'nameshipping', minWidth: 100},
//        {header: 'namepayment', dataIndex: 'namepayment', minWidth: 100},
        {header: 'namepayment', dataIndex: 'namepayment', minWidth: 100},
        {header: 'namaunit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'namecurr', dataIndex: 'namecurr', minWidth: 100},
        {header: 'status', dataIndex: 'status', minWidth: 100},
        {header: 'userin', dataIndex: 'userin', minWidth: 100},
        {header: 'datein', dataIndex: 'datein', minWidth: 100}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                {
//                    itemId: 'addDebt',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wDebt.show();
//                         Ext.getCmp('statusformDebt').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editDebt',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridDebt')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formDebt = Ext.getCmp('formDebt');
//
//                            formDebt.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/Debt/1/setup',
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
//                            wDebt.show();
//                            Ext.getCmp('statusformDebt').setValue('edit');
//                        }
//
//                    }
//                },
//                {
//                    id: 'btnDeleteDebt',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridDebt')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/Debt/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridDebt.remove(sm.getSelection());
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
                    xtype: 'searchGridDebt',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridDebt, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridDebt.load();

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
                        Ext.getCmp('subtotalPayment').setValue(d.data.subtotal);  
                        Ext.getCmp('supplierPayment').setValue(d.data.namesupplier);  
//                        Ext.getCmp('totalPaid').setValue(d.data.paid); 
                        

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
//            var formDebt = Ext.getCmp('formDebt');
//            wDebt.show();
//
//            formDebt.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/Debt/1/setup',
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
//            Ext.getCmp('statusformDebt').setValue('edit');
        }
    }
});