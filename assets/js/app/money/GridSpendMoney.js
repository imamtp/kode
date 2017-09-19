Ext.define('GridSpendMoneyModel', {
    extend: 'Ext.data.Model',
    fields: ['idspendmoney','idaccount','idjournal','totalpaid','userin','datein','subtotal','notrans','memo','datetrans','spendfrom','month','year','accname','namaunit'],
    idProperty: 'id'
});

var storeGridSpendMoney = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSpendMoneyModel',
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

Ext.define('MY.searchGridSpendMoney', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSpendMoney',
    store: storeGridSpendMoney,
    width: 180
});

var smGridSpendMoney = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSpendMoney.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSpendMoney').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSpendMoney').enable();
        }
    }
});

Ext.define(dir_sys + 'money.GridSpendMoney', {
    title: 'Daftar Riwayat Pengeluaran Kas',
    itemId: 'GridSpendMoneyID',
    id: 'GridSpendMoneyID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSpendMoney',
    store: storeGridSpendMoney,
    loadMask: true,
    columns: [
        {header: 'idspendmoney', dataIndex: 'idspendmoney', hidden: true},
        {header: 'idjournal', dataIndex: 'idjournal', hidden: true},
        {header: 'no trans', dataIndex: 'notrans', minWidth: 100},
        {header: 'date trans', dataIndex: 'datetrans', minWidth: 100},
        {header: 'memo', dataIndex: 'memo', minWidth: 200,flex:1},
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
                {
                    itemId: 'cetakRiwayatGridSpendMoney',
                    text: 'Cetak',
                    iconCls: 'print-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSpendMoney')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
                        } else {
                         var src = SITE_URL+"backend/cetak/spendmoney/" + selectedRecord.data.idspendmoney;
                            
                          var myWin = Ext.create("Ext.window.Window", {
                                 title: 'Cetak Kwitansi',
                                 modal: true,
                                 html: '<iframe src="'+src+'" width="100%" height="100%" ></iframe>',
                                 width: 700,
                                 height: 500
                             });
                             myWin.show();
                            // Ext.getCmp('GridHistoryPembayaranSiswa').body.update("<iframe style='border:0;' width='100%' height='100%' id='GridHistoryPembayaranSiswa' src='"+SITE_URL+"backend/cetak/penerimaansiswa/" + selectedRecord.data.idsiswapembayaran + "'>");
                            // Ext.Ajax.request({
                            //     url: SITE_URL + 'backend/cetak',
                            //     method: 'GET',
                            //     params: {
                            //          id: selectedRecord.data.idsiswapembayaran,
                            //          modul:'penerimaansiswa'
                            //      }
                            // });
                        }
 
                    }
                },
                {
                       text: 'Batalkan Pengeluaran',
                       iconCls: 'delete-icon',
                       handler: function() {
                        var grid = Ext.ComponentQuery.query('GridSpendMoney')[0];
                           var selectedRecord = grid.getSelectionModel().getSelection()[0];
                           var data = grid.getSelectionModel().getSelection();
                           if (data.length == 0)
                           {
                               Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                           } else {
                              Ext.Msg.show({
                                 title: 'Konfirmasi',
                                 msg: 'Apakah anda yakin untuk membatalkan pengeluaran ?',
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
                                            url: SITE_URL + 'money/cancelSpend',
                                            method: 'POST',
                                            params: {postdata: Ext.encode(selected)},
                                              success: function(form, action) {
                                                  var d = Ext.decode(form.responseText);
                                                  if (!d.success) {
                                                      Ext.Msg.alert('Informasi', d.message);
                                                  } else {
                                                     storeGridSpendMoney.load();
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
                   }
//                {
//                    itemId: 'addSpendMoney',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wSpendMoney.show();
//                         Ext.getCmp('statusformSpendMoney').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editSpendMoney',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridSpendMoney')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formSpendMoney = Ext.getCmp('formSpendMoney');
//
//                            formSpendMoney.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/SpendMoney/1/setup',
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
//                            wSpendMoney.show();
//                            Ext.getCmp('statusformSpendMoney').setValue('edit');
//                        }
//
//                    }
//                },
//                {
//                    id: 'btnDeleteSpendMoney',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridSpendMoney')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/SpendMoney/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridSpendMoney.remove(sm.getSelection());
//                                    sm.select(0);
//                                }
//                            }
//                        });
//                    },
////                    disabled: true
//                },
                ,'->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridSpendMoney',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridSpendMoney, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSpendMoney.load();

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
//            var formSpendMoney = Ext.getCmp('formSpendMoney');
//            wSpendMoney.show();
//
//            formSpendMoney.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/SpendMoney/1/setup',
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
//            Ext.getCmp('statusformSpendMoney').setValue('edit');
        }
    }
});