Ext.define('GridHistoryPembayaranSiswaModel', {
    extend: 'Ext.data.Model',
    fields: ['idsiswapembayaran','idsiswa','tglbayar','bulanpembayaran','denda','tahunpembayaran','bulantahunpembayaran','bulanbayar','tahunbayar','jumlah','userin','datein','debit','credit','accnumber','accname'],
    idProperty: 'id'
});

var storeGridHistoryPembayaranSiswa = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridHistoryPembayaranSiswaModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/historypembayaransiswa/money',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

Ext.define('MY.searchGridHistoryPembayaranSiswa', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridHistoryPembayaranSiswa',
    store: storeGridHistoryPembayaranSiswa,
    width: 180
});

var smGridHistoryPembayaranSiswa = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridHistoryPembayaranSiswa.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteHistoryPembayaranSiswa').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteHistoryPembayaranSiswa').enable();
        }
    }
});

Ext.define('GridHistoryPembayaranSiswa', {
    title: 'Riwayat Pembayaran Siswa',
    itemId: 'GridHistoryPembayaranSiswaID',
    id: 'GridHistoryPembayaranSiswaID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridHistoryPembayaranSiswa',
    store: storeGridHistoryPembayaranSiswa,
    loadMask: true,
    columns: [
       {header: 'idsiswapembayaran', dataIndex: 'idsiswapembayaran', hidden: true},
        {header: 'Pembayaran', dataIndex: 'accname', minWidth: 200},
        {header: 'Bulan & Tahun', dataIndex: 'bulantahunpembayaran', minWidth: 200},
        {header: 'Tglbayar', dataIndex: 'tglbayar', minWidth: 100},
        {header: 'Denda', dataIndex: 'denda', minWidth: 200, xtype: 'numbercolumn', align: 'right'},
        {header: 'Jumlah', dataIndex: 'jumlah', minWidth: 200, xtype: 'numbercolumn', align: 'right'},
        {header: 'User Input', dataIndex: 'userin', minWidth: 100},
        {header: 'Date input', dataIndex: 'datein', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                {
//                    itemId: 'addHistoryPembayaranSiswa',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wHistoryPembayaranSiswa.show();
//                         Ext.getCmp('statusformHistoryPembayaranSiswa').setValue('input');
//                    }
//                },
               {
                   itemId: 'cetakPembayaranSiswa',
                   text: 'Cetak',
                   iconCls: 'print-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridHistoryPembayaranSiswa')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
                       } else {
                        var src = SITE_URL+"backend/cetak/penerimaansiswa/" + selectedRecord.data.idsiswapembayaran;
                           
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
//                {
//                    id: 'btnDeleteHistoryPembayaranSiswa',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridHistoryPembayaranSiswa')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/HistoryPembayaranSiswa/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridHistoryPembayaranSiswa.remove(sm.getSelection());
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
                    xtype: 'searchGridHistoryPembayaranSiswa',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridHistoryPembayaranSiswa, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridHistoryPembayaranSiswa.load();

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
//            var formHistoryPembayaranSiswa = Ext.getCmp('formHistoryPembayaranSiswa');
//            wHistoryPembayaranSiswa.show();
//
//            formHistoryPembayaranSiswa.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/HistoryPembayaranSiswa/1/setup',
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
//            Ext.getCmp('statusformHistoryPembayaranSiswa').setValue('edit');
        }
    }
});