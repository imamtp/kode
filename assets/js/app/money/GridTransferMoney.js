Ext.define('GridTransferMoneyModel', {
    extend: 'Ext.data.Model',
    fields: ['idtransferkas','idunit','memo','tanggal','nominal','datein','accsumber','acctujuan'],
    idProperty: 'id'
});

var storeGridTransferMoney = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridTransferMoneyModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/TransferMoney/money',
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

Ext.define('MY.searchGridTransferMoney', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridTransferMoney',
    store: storeGridTransferMoney,
    width: 180
});

var smGridTransferMoney = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridTransferMoney.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteTransferMoney').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteTransferMoney').enable();
        }
    }
});

Ext.define(dir_sys + 'money.GridTransferMoney', {
    title: 'Daftar Riwayat Transfer Kas',
    itemId: 'GridTransferMoneyID',
    id: 'GridTransferMoneyID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridTransferMoney',
    store: storeGridTransferMoney,
    loadMask: true,
    columns: [
        {header: 'idtransferkas', dataIndex: 'idtransferkas', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'Tanggal', dataIndex: 'tanggal', minWidth: 100},
        {header: 'Memo', dataIndex: 'memo', minWidth: 300},
        {header: 'Nominal', dataIndex: 'nominal', minWidth: 160, xtype: 'numbercolumn', align: 'right'},
        {header: 'Akun Sumber', dataIndex: 'accsumber', minWidth: 150},
        {header: 'Akun Tujuan', dataIndex: 'acctujuan', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                       text: 'Batalkan Transfer',
                       iconCls: 'delete-icon',
                       handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTransferMoney')[0];
                           var selectedRecord = grid.getSelectionModel().getSelection()[0];
                           var data = grid.getSelectionModel().getSelection();
                           if (data.length == 0)
                           {
                               Ext.Msg.alert('Failure', 'Pilih salah satu data terlebih dahulu!');
                           } else {
                              Ext.Msg.show({
                                 title: 'Konfirmasi',
                                 msg: 'Apakah anda yakin untuk membatalkan transfer ?',
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
                                            url: SITE_URL + 'money/cancelTransfer',
                                            method: 'POST',
                                            params: {postdata: Ext.encode(selected)},
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                if (!d.success) {
                                                    Ext.Msg.alert('Informasi', d.message);
                                                } else {
                                                    storeGridTransferMoney.load();
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
                ,'->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridTransferMoney',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridTransferMoney, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridTransferMoney.load();

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
        }
    }
});