Ext.define('GridPurchaseAllModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchase','idjournal','nopurchase','shipaddress','date','freigthcost','tax','totalamount','paidtoday','totalowed','memo','year','month','userin','datein','notes','paiddate','noinvoice','nameshipping', 'status', 'namepayment','namaunit','namecurr'],
    idProperty: 'id'
});

var storeGridPurchaseAll = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridPurchaseAllModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseAll/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        }
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

Ext.define('MY.searchGridPurchaseAll', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchaseAll',
    store: storeGridPurchaseAll,
    width: 180
});

var smGridPurchaseAll = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPurchaseAll.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletePurchaseAll').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletePurchaseAll').enable();
        }
    }
});

Ext.define('GridPurchaseAll', {
    title: 'Daftar Pembelian',
    itemId: 'GridPurchaseAllID',
    id: 'GridPurchaseAllID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchaseAll',
    store: storeGridPurchaseAll,
    loadMask: true,
    columns: [
        {header: 'idpurchase', dataIndex: 'idpurchase', hidden: true},
        {header: 'No Order', dataIndex: 'nopurchase', minWidth: 100},
        {header: 'No Invoice', dataIndex: 'noinvoice', minWidth: 100},
        {header: 'Tanggal', dataIndex: 'date', minWidth: 100},
        {header: 'Alamat Pengiriman', dataIndex: 'shipaddress', minWidth: 150},
        {header: 'Biaya Angkut', dataIndex: 'freigthcost', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Pajak', dataIndex: 'tax', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Jumlah Pembayaran', dataIndex: 'totalamount', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Uang Muka', dataIndex: 'paidtoday', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Saldo Terhutang', dataIndex: 'totalowed', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Memo', dataIndex: 'memo', minWidth: 100},
        {header: 'Catatan', dataIndex: 'notes', minWidth: 150},
        // {header: 'paid date', dataIndex: 'paiddate', minWidth: 100},
        {header: 'Pengiriman', dataIndex: 'nameshipping', minWidth: 100},
        {header: 'Jenis Pembayaran', dataIndex: 'namepayment', minWidth: 150},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'Mata Uang', dataIndex: 'namecurr', minWidth: 100},
        {header: 'Status', dataIndex: 'status', minWidth: 100},
        {header: 'Operator', dataIndex: 'userin', minWidth: 100},
        {header: 'Tgl Input', dataIndex: 'datein', minWidth: 100}
        
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                   itemId: 'cetakGridPurchaseAll',
                   text: 'Cetak',
                   iconCls: 'print-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridPurchaseAll')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
                       } else {
                        var src = SITE_URL+"backend/cetak/purchase/" + selectedRecord.data.idpurchase;
                           
                         var myWin = Ext.create("Ext.window.Window", {
                                title: 'Cetak Pembelian',
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
               // {
               //     // itemId: 'cetakGridPurchaseAll',
               //     text: 'Retur',
               //     iconCls: 'return-icon',
               //     handler: function() {
               //         var grid = Ext.ComponentQuery.query('GridPurchaseAll')[0];
               //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
               //         var data = grid.getSelectionModel().getSelection();
               //         if (data.length == 0)
               //         {
               //             Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
               //         } else {
               //          var src = SITE_URL+"backend/cetak/purchase/" + selectedRecord.data.idpurchase;
                           
               //           var myWin = Ext.create("Ext.window.Window", {
               //                  title: 'Cetak Pembelian',
               //                  modal: true,
               //                  html: '<iframe src="'+src+'" width="100%" height="100%" ></iframe>',
               //                  width: 700,
               //                  height: 500
               //              });
               //              myWin.show();
               //             // Ext.getCmp('GridHistoryPembayaranSiswa').body.update("<iframe style='border:0;' width='100%' height='100%' id='GridHistoryPembayaranSiswa' src='"+SITE_URL+"backend/cetak/penerimaansiswa/" + selectedRecord.data.idsiswapembayaran + "'>");
               //             // Ext.Ajax.request({
               //             //     url: SITE_URL + 'backend/cetak',
               //             //     method: 'GET',
               //             //     params: {
               //             //          id: selectedRecord.data.idsiswapembayaran,
               //             //          modul:'penerimaansiswa'
               //             //      }
               //             // });
               //         }

               //     }
               // },
//                {
//                    itemId: 'addPurchaseAll',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wPurchaseAll.show();
//                         Ext.getCmp('statusformPurchaseAll').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editPurchaseAll',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridPurchaseAll')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formPurchaseAll = Ext.getCmp('formPurchaseAll');
//
//                            formPurchaseAll.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/PurchaseAll/1/setup',
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
//                            wPurchaseAll.show();
//                            Ext.getCmp('statusformPurchaseAll').setValue('edit');
//                        }
//
//                    }
//                }
                , {
                   text: 'Batalkan Pembelian',
                   iconCls: 'delete-icon',
                   handler: function() {
                    var grid = Ext.ComponentQuery.query('GridPurchaseAll')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                       } else {
                          Ext.Msg.show({
                             title: 'Konfirmasi',
                             msg: 'Batalkan Pembelian akan menghapus data transaksi yang berkaitan dengan pembelian seperti kas, persediaan, pajak, biaya angkut dan hutang. Apakah anda yakin untuk melanjutkan proses pembatalan pembelian ?',
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
                                        url: SITE_URL + 'purchase/cancelPurchase',
                                        method: 'POST',
                                        params: {
                                            postdata: Ext.encode(selected),
                                            idmenu:18
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            // if (!d.success) {
                                                Ext.Msg.alert('Informasi', d.message);
                                                storeGridPurchaseAll.load();
                                            // }
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
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPurchaseAll',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridPurchaseAll, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridPurchaseAll.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formPurchaseAll = Ext.getCmp('formPurchaseAll');
            wPurchaseAll.show();

            formPurchaseAll.getForm().load({
                url: SITE_URL + 'backend/loadFormData/PurchaseAll/1/setup',
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
            Ext.getCmp('statusformPurchaseAll').setValue('edit');
        }
    }
});