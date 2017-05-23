Ext.define('GridHutangLainModel', {
    extend: 'Ext.data.Model',
    fields: ['idjournal','idunit','credit','nojournal','memo','year','month','namaunit','accname','accnumber','balance','idaccount'],
    idProperty: 'id'
});

var storeGridHutangLain = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridHutangLainModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/DebtOther/account',
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

Ext.define('MY.searchGridHutangLain', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridHutangLain',
    store: storeGridHutangLain,
    width: 180
});

var smGridHutangLain = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridHutangLain.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteHutangLain').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteHutangLain').enable();
        }
    }
});

Ext.define('GridHutangLain', {
    title: 'Hutang Lain-lain',
    itemId: 'GridHutangLainID',
    id: 'GridHutangLainID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridHutangLain',
    store: storeGridHutangLain,
    loadMask: true,
    columns: [
    // 'idjournal','idunit','credit','nojournal','memo','year','month','accname','accnumber','balance','idaccount'
        {header: 'idregistrasihutang', dataIndex: 'idregistrasihutang', hidden: true},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 150},
        // {header: 'Memo', dataIndex: 'memo', minWidth: 150},
        {header: 'Akun Hutang', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Nomor Akun', dataIndex: 'accnumber', minWidth: 150},
        {header: 'Jumlah Hutang', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right'}
        // {header: 'Sisa Hutang', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                {
//                    itemId: 'addHutangLain',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wHutangLain.show();
//                         Ext.getCmp('statusformHutangLain').setValue('input');
//                    }
//                },
               {
                   itemId: 'editHutangLain',
                   text: 'Pembayaran',
                   iconCls: 'edit-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridHutangLain')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                       } else {
                           //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                           // var formHutangLain = Ext.getCmp('formHutangLain');

                           // formHutangLain.getForm().load({
                           //     url: SITE_URL + 'backend/loadFormData/HutangLain/1/setup',
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

                           // wHutangLain.show();
                           // Ext.getCmp('statusformHutangLain').setValue('edit');

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
//                    id: 'btnDeleteHutangLain',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridHutangLain')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/HutangLain/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridHutangLain.remove(sm.getSelection());
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
                    xtype: 'searchGridHutangLain',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridHutangLain, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridHutangLain.load();

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
//            var formHutangLain = Ext.getCmp('formHutangLain');
//            wHutangLain.show();
//
//            formHutangLain.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/HutangLain/1/setup',
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
//            Ext.getCmp('statusformHutangLain').setValue('edit');
        }
    }
});