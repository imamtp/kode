Ext.define('GridReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['idreturn','namesupplier','accname','tglkirim','namaunit','noreturn','date','memo','subtotal','taxreturn','freight','totalreturn','userin','datein','nopo'],
    idProperty: 'id'
});

var storeGridReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/Return/purchase',
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

Ext.define('MY.searchGridReturn', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridReturn',
    store: storeGridReturn,
    width: 180
});

var smGridReturn = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridReturn.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteReturn').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteReturn').enable();
        }
    }
});

Ext.define('GridReturn', {
    title: 'Daftar Retur',
    itemId: 'GridReturnID',
    id: 'GridReturnID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridReturn',
    store: storeGridReturn,
    loadMask: true,
    columns: [
        {header: 'idreturn', dataIndex: 'idreturn', hidden: true},
        {header: 'Nama Supplier', dataIndex: 'namesupplier', minWidth: 150},
        {header: 'Nama Unit', dataIndex: 'namaunit', minWidth: 150},
        {header: 'No Retur', dataIndex: 'noreturn', minWidth: 150},
        {header: 'Tgl Retur', dataIndex: 'date', minWidth: 150},
        {header: 'Tgl Kirim', dataIndex: 'tglkirim', minWidth: 150},
        {header: 'Memo', dataIndex: 'memo', minWidth: 150},
        {header: 'Pajak', dataIndex: 'taxreturn', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Biaya angkut', dataIndex: 'freight', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Subtotal', dataIndex: 'subtotal', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Total return', dataIndex: 'totalreturn', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Operator', dataIndex: 'userin', minWidth: 150},
        {header: 'Tgl input', dataIndex: 'datein', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                text: 'Retur Baru',
                iconCls: 'add-icon',
                handler: function() {
                    // var idunit = Ext.getCmp('cbUnitAcchutang').getValue();
                    // if (idunit==null)
                    // {
                    //     Ext.Msg.alert('Failure', 'Pilih Unit terlebih dahulu!');
                    // } else {
                        wEntryReturn.show();
                        // Ext.getCmp('statusformRegHutang').setValue('input');
                        // Ext.getCmp('idunitRegHutang').setValue(idunit);

                         Ext.getCmp('accnameReturn').setValue(null);
                        Ext.getCmp('idaccountReturn').setValue(null);
                        Ext.getCmp('accnumberReturn').setValue(null);
                        Ext.getCmp('notransReturn').setValue(null);
                        Ext.getCmp('tanggalKirimReturn').setValue(null);
                        Ext.getCmp('tanggalReturn').setValue(null);
                        Ext.getCmp('memoReturn').setValue(null);
                        Ext.getCmp('totalReturn').setValue(null);
                        Ext.getCmp('taxReturn').setValue(null);
                        Ext.getCmp('subtotalReturn').setValue(null);
                    // }
                   
                }
            },
            {
                   itemId: 'cetakGridReturAll',
                   text: 'Cetak',
                   iconCls: 'print-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridReturn')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih datanya terlebih dahulu!');
                       } else {
                        var src = SITE_URL+"backend/cetak/Return/" + selectedRecord.data.idreturn;
                           
                         var myWin = Ext.create("Ext.window.Window", {
                                title: 'Cetak Faktur',
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
                   text: 'Batalkan Retur',
                   iconCls: 'delete-icon',
                   handler: function() {
                    var grid = Ext.ComponentQuery.query('GridReturn')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                       } else {
                          Ext.Msg.show({
                             title: 'Konfirmasi',
                             msg: 'Anda yakin untuk membatalkan data retur?',
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
                                        url: SITE_URL + 'purchase/cancelReturn',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)},
                                        success: function(form, action) {
                                              var d = Ext.decode(form.responseText);
                                             Ext.Msg.alert('info', d.message);
                                           }
                                      });
                                     storeGridPurchaseAll.remove(sm.getSelection());
                                     sm.select(0);
                                 }
                             }
                         });
                      }
                       
                   },
//                    disabled: true
               }
//                {
//                    itemId: 'addReturn',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wReturn.show();
//                         Ext.getCmp('statusformReturn').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editReturn',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridReturn')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formReturn = Ext.getCmp('formReturn');
//
//                            formReturn.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/Return/1/setup',
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
//                            wReturn.show();
//                            Ext.getCmp('statusformReturn').setValue('edit');
//                        }
//
//                    }
//                }, {
//                    id: 'btnDeleteReturn',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridReturn')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/Return/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridReturn.remove(sm.getSelection());
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
                    xtype: 'searchGridReturn',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridReturn, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridReturn.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formReturn = Ext.getCmp('formReturn');
            wReturn.show();

            formReturn.getForm().load({
                url: SITE_URL + 'backend/loadFormData/Return/1/setup',
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
            Ext.getCmp('statusformReturn').setValue('edit');
        }
    }
});