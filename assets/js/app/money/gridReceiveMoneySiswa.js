Ext.define('GridReceiveMoneySiswaModel', {
    extend: 'Ext.data.Model',
    fields: ['idreceivemoney','idjournal','notrans','datetrans','total','memo','userin','datein','idunit','subtotal','accname','namaunit','totaldenda'],
    idProperty: 'id'
});

var storeGridReceiveMoneySiswa = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReceiveMoneySiswaModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ReceiveMoneySiswa/money',
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

Ext.define('MY.searchGridReceiveMoneySiswa', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReceiveMoneySiswa',
    store: storeGridReceiveMoneySiswa,
    width: 180
});

var smGridReceiveMoneySiswa = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridReceiveMoneySiswa.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteReceiveMoneySiswa').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteReceiveMoneySiswa').enable();
        }
    }
});

Ext.define('GridReceiveMoneySiswa', {
    title: 'Daftar Riwayat Penerimaan Siswa',
    itemId: 'GridReceiveMoneySiswaID',
    id: 'GridReceiveMoneySiswaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReceiveMoneySiswa',
    store: storeGridReceiveMoneySiswa,
    loadMask: true,
    columns: [
        {header: 'idreceivemoney', dataIndex: 'idreceivemoney', hidden: true},
        {header: 'idjournal', dataIndex: 'idjournal', hidden: true},
        {header: 'no trans', dataIndex: 'notrans', minWidth: 100},
        {header: 'date trans', dataIndex: 'datetrans', minWidth: 100},
        {header: 'Akun Penerimaan Kas', dataIndex: 'accname', minWidth: 150},
        {header: 'memo', dataIndex: 'memo', minWidth: 200},
        {header: 'Denda', dataIndex: 'totaldenda', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Total', dataIndex: 'total', minWidth: 100, xtype: 'numbercolumn', align: 'right'},        
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
//                    itemId: 'addReceiveMoneySiswa',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wReceiveMoneySiswa.show();
//                         Ext.getCmp('statusformReceiveMoneySiswa').setValue('input');
//                    }
//                },
{
                   itemId: 'cetakRiwayatGridReceiveMoneySiswa',
                   text: 'Cetak',
                   iconCls: 'print-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridReceiveMoneySiswa')[0];
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
               },
               {
                   text: 'Batalkan Penerimaan',
                   iconCls: 'delete-icon',
                   handler: function() {
                    var grid = Ext.ComponentQuery.query('GridReceiveMoneySiswa')[0];
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
                                        url: SITE_URL + 'money/cancelReceive/siswa',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)},
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if (!d.success) {
                                                Ext.Msg.alert('Informasi', d.message);
                                            } else {
                                               storeGridReceiveMoneySiswa.load();
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
//                    id: 'btnDeleteReceiveMoneySiswa',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridReceiveMoneySiswa')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/ReceiveMoneySiswa/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridReceiveMoneySiswa.remove(sm.getSelection());
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
                    xtype: 'searchGridReceiveMoneySiswa',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridReceiveMoneySiswa, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReceiveMoneySiswa.load();

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
//            var formReceiveMoneySiswa = Ext.getCmp('formReceiveMoneySiswa');
//            wReceiveMoneySiswa.show();
//
//            formReceiveMoneySiswa.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ReceiveMoneySiswa/1/setup',
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
//            Ext.getCmp('statusformReceiveMoneySiswa').setValue('edit');
        }
    }
});