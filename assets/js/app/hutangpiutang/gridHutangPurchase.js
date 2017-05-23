Ext.define('GridHutangPurchaseModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchase', 'idjournal', 'nopurchase', 'shipaddress', 'date', 'freigthcost', 'tax', 'totalamount', 'paidtoday', 'totalowed', 'memo', 'year', 'month', 'userin', 'datein', 'notes', 'paiddate', 'noinvoice', 'nameshipping', 'status', 'namepayment', 'namaunit', 'namecurr'],
    idProperty: 'id'
});

var storeGridHutangPurchase = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridHutangPurchaseModel',
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

Ext.define('MY.searchGridHutangPurchase', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridHutangPurchase',
    store: storeGridHutangPurchase,
    width: 180
});

var smGridHutangPurchase = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridHutangPurchase.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteHutangPurchase').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteHutangPurchase').enable();
        }
    }
});

Ext.define('GridHutangPurchase', {
    title: 'Hutang Pembelian',
    itemId: 'GridHutangPurchaseID',
    id: 'GridHutangPurchaseID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridHutangPurchase',
    store: storeGridHutangPurchase,
    loadMask: true,
    columns: [
        {header: 'idpurchase', dataIndex: 'idpurchase', hidden: true},
        {header: 'No Purchase', dataIndex: 'nopurchase', minWidth: 100},
        // {header: 'noinvoice', dataIndex: 'noinvoice', minWidth: 100},
        {header: 'Tanggal', dataIndex: 'date', minWidth: 100},
//        {header: 'shipaddress', dataIndex: 'shipaddress', minWidth: 100},
        {header: 'Biaya Angkut', dataIndex: 'freigthcost', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Pajak', dataIndex: 'tax', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Total Transaksi', dataIndex: 'totalamount', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Uang Muka', dataIndex: 'paidtoday', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Total Hutang', dataIndex: 'totalowed', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Memo', dataIndex: 'memo', minWidth: 100},
        {header: 'Catatan', dataIndex: 'notes', minWidth: 100},
//        {header: 'paiddate', dataIndex: 'paiddate', minWidth: 100},
//        {header: 'nameshipping', dataIndex: 'nameshipping', minWidth: 100},
//        {header: 'namepayment', dataIndex: 'namepayment', minWidth: 100},
        {header: 'Jenis Pembayaran', dataIndex: 'namepayment', minWidth: 100},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'Mata Uang', dataIndex: 'namecurr', minWidth: 100},
        {header: 'Status', dataIndex: 'status', minWidth: 100},
        {header: 'User in', dataIndex: 'userin', minWidth: 100},
        {header: 'Date in', dataIndex: 'datein', minWidth: 100}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                {
//                    itemId: 'addHutangPurchase',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wHutangPurchase.show();
//                         Ext.getCmp('statusformHutangPurchase').setValue('input');
//                    }
//                },
               {
                   itemId: 'editHutangPurchase',
                   text: 'Pembayaran',
                   iconCls: 'edit-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridHutangPurchase')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                       } else {
                           //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                           // var formHutangPurchase = Ext.getCmp('formHutangPurchase');

                           // formHutangPurchase.getForm().load({
                           //     url: SITE_URL + 'backend/loadFormData/HutangPurchase/1/setup',
                           //     params: {
                           //         extraparams: 'a.idtax:' + selectedRecord.data.idtax
                           //     },
                           //     success: function(form, action) {
                           //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
                           //     },
                           //     failure: function(form, action) {
                           //         Ext.Msg.alert("Load failed", action.result.errorMessage);
                           //     }
                           // })

                           // wHutangPurchase.show();
                           // Ext.getCmp('statusformHutangPurchase').setValue('edit');

                           Ext.Ajax.request({
                                url: SITE_URL + 'purchase/getPurchase',
                                method: 'POST',
                                params: {
                                    idpurchase: selectedRecord.data.idpurchase
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
                                        Ext.getCmp('memoPayment').setValue('Pembayaran Hutang '+d.data.namesupplier)
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
                       }

                   }
               },
//                {
//                    id: 'btnDeleteHutangPurchase',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridHutangPurchase')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/HutangPurchase/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridHutangPurchase.remove(sm.getSelection());
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
                    xtype: 'searchGridHutangPurchase',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridHutangPurchase, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridHutangPurchase.load();

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

                        Ext.getCmp('memoPayment').setValue('Pembayaran Hutang '+d.data.namesupplier)
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
//            var formHutangPurchase = Ext.getCmp('formHutangPurchase');
//            wHutangPurchase.show();
//
//            formHutangPurchase.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/HutangPurchase/1/setup',
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
//            Ext.getCmp('statusformHutangPurchase').setValue('edit');
        }
    }
});