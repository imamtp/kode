Ext.define('GridReconcileModel', {
    extend: 'Ext.data.Model',
    fields: ['idreconcile','accname','datestatement','newbalance','lastdate','userin','datein','namaunit','idunit'],
    idProperty: 'id'
});

var storeGridReconcile = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReconcileModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Reconcile/money',
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

Ext.define('MY.searchGridReconcile', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReconcile',
    store: storeGridReconcile,
    width: 180
});

var smGridReconcile = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridReconcile.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteReconcile').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteReconcile').enable();
        }
    }
});

Ext.define(dir_sys + 'money.GridReconcile', {
    title: 'Daftar Riwayat Rekonsiliasi',
    itemId: 'GridReconcileID',
    id: 'GridReconcileID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReconcile',
    store: storeGridReconcile,
    loadMask: true,
    columns: [
        {header: 'idreconcile', dataIndex: 'idreconcile', hidden: true},
        {header: 'Akun Bank', dataIndex: 'accname', minWidth: 150},
        {header: 'Tgl Rekening Koran', dataIndex: 'datestatement', minWidth: 150},
        {header: 'Saldo menurut bank', dataIndex: 'newbalance', minWidth: 200, xtype: 'numbercolumn', align: 'right'},
        {header: 'user in', dataIndex: 'userin', minWidth: 100},
        {header: 'date in', dataIndex: 'datein', minWidth: 100},
        {header: 'nama unit', dataIndex: 'namaunit', minWidth: 100}
        
//        {header: 'no trans', dataIndex: 'notrans', minWidth: 100},
//        {header: 'date trans', dataIndex: 'datetrans', minWidth: 100},
//        {header: 'memo', dataIndex: 'memo', minWidth: 200},
//        {header: 'total', dataIndex: 'total', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
//        {header: 'Akun Penerimaan Kas', dataIndex: 'accname', minWidth: 150},
//        {header: 'nama unit', dataIndex: 'namaunit', minWidth: 100},
//        {header: 'user in', dataIndex: 'userin', minWidth: 100},
//        {header: 'date in', dataIndex: 'datein', minWidth: 130}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                       text: 'Batalkan Rekonsiliasi',
                       iconCls: 'delete-icon',
                       handler: function() {
                        var grid = Ext.ComponentQuery.query('GridReconcile')[0];
                           var selectedRecord = grid.getSelectionModel().getSelection()[0];
                           var data = grid.getSelectionModel().getSelection();
                           if (data.length == 0)
                           {
                               Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                           } else {
                              Ext.Msg.show({
                                 title: 'Konfirmasi',
                                 msg: 'Apakah anda yakin untuk membatalkan Rekonsiliasi ?',
                                 buttons: Ext.Msg.YESNO,
                                 fn: function(btn) {
                                     if (btn == 'yes') {
                                         // var grid = Ext.ComponentQuery.query('GridPurchaseAll')[0];
                                         var sm = grid.getSelectionModel();
                                         selected = [];
                                         Ext.each(sm.getSelection(), function(item) {
                                             selected.push(item.data[Object.keys(item.data)[0]]);
                                         });
                                          Ext.Ajax.request({
                                            url: SITE_URL + 'money/cancelReconcile',
                                            method: 'POST',
                                            params: {postdata: Ext.encode(selected)},
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                if (!d.success) {
                                                    Ext.Msg.alert('Informasi', d.message);
                                                } else {
                                                   storeGridReconcile.load();
                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                            }
                                          });
                                     }
                                 }
                             });
                          }
                           
                       },
    //                    disabled: true
                   },
//                {
//                    itemId: 'addReconcile',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wReconcile.show();
//                         Ext.getCmp('statusformReconcile').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editReconcile',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridReconcile')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formReconcile = Ext.getCmp('formReconcile');
//
//                            formReconcile.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/Reconcile/1/setup',
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
//                            wReconcile.show();
//                            Ext.getCmp('statusformReconcile').setValue('edit');
//                        }
//
//                    }
//                },
//                {
//                    id: 'btnDeleteReconcile',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridReconcile')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/Reconcile/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridReconcile.remove(sm.getSelection());
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
                    xtype: 'searchGridReconcile',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridReconcile, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReconcile.load();

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
//            var formReconcile = Ext.getCmp('formReconcile');
//            wReconcile.show();
//
//            formReconcile.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/Reconcile/1/setup',
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
//            Ext.getCmp('statusformReconcile').setValue('edit');
        }
    }
});