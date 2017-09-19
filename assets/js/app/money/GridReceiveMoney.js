Ext.define('GridReceiveMoneyModel', {
    extend: 'Ext.data.Model',
    fields: ['idreceivemoney','idjournal','notrans','datetrans','total','memo','userin','datein','idunit','subtotal','accname','namaunit'],
    idProperty: 'id'
});

var storeGridReceiveMoney = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReceiveMoneyModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ReceiveMoney/money',
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

Ext.define('MY.searchGridReceiveMoney', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReceiveMoney',
    store: storeGridReceiveMoney,
    width: 180
});

var smGridReceiveMoney = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridReceiveMoney.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteReceiveMoney').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteReceiveMoney').enable();
        }
    }
});

Ext.define(dir_sys + 'money.GridReceiveMoney', {
    title: 'Daftar Riwayat Penerimaan Kas',
    itemId: 'GridReceiveMoneyID',
    id: 'GridReceiveMoneyID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReceiveMoney',
    store: storeGridReceiveMoney,
    loadMask: true,
    columns: [
        {header: 'idreceivemoney', dataIndex: 'idreceivemoney', hidden: true},
        {header: 'idjournal', dataIndex: 'idjournal', hidden: true},
        {header: 'no trans', dataIndex: 'notrans', minWidth: 100},
        {header: 'date trans', dataIndex: 'datetrans', minWidth: 100},
        {header: 'memo', dataIndex: 'memo', minWidth: 200,flex:1},
        {header: 'total', dataIndex: 'total', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Akun Penerimaan Kas', dataIndex: 'accname', minWidth: 150},
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
//                    itemId: 'addReceiveMoney',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wReceiveMoney.show();
//                         Ext.getCmp('statusformReceiveMoney').setValue('input');
//                    }
//                },
                {
                   itemId: 'cetakRiwayatGridReceiveMoney',
                   text: 'Cetak',
                   iconCls: 'print-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridReceiveMoney')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
                       } else {
                        var src = SITE_URL+"backend/cetak/receivemoney/" + selectedRecord.data.idreceivemoney;
                           
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
               },{
                   text: 'Batalkan Penerimaan',
                   iconCls: 'delete-icon',
                   handler: function() {
                    var grid = Ext.ComponentQuery.query('GridReceiveMoney')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                       } else {
                          Ext.Msg.show({
                             title: 'Konfirmasi',
                             msg: 'Apakah anda yakin untuk membatalkan penerimaan ?',
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
                                        url: SITE_URL + 'money/cancelReceive',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)},
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if (!d.success) {
                                                Ext.Msg.alert('Informasi', d.message);
                                            }
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                      });
                                     storeGridReceiveMoney.remove(sm.getSelection());
                                     sm.select(0);
                                 }
                             }
                         });
                      }
                       
                   },
//                    disabled: true
               },
//                {
//                    id: 'btnDeleteReceiveMoney',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridReceiveMoney')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/ReceiveMoney/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridReceiveMoney.remove(sm.getSelection());
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
                    xtype: 'searchGridReceiveMoney',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridReceiveMoney, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReceiveMoney.load();

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
//            var formReceiveMoney = Ext.getCmp('formReceiveMoney');
//            wReceiveMoney.show();
//
//            formReceiveMoney.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ReceiveMoney/1/setup',
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
//            Ext.getCmp('statusformReceiveMoney').setValue('edit');
        }
    }
});