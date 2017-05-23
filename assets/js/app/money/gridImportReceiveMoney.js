Ext.define('GridImportReceiveMoneyModel', {
    extend: 'Ext.data.Model',
    fields: ['idreceivemoneyimport','filename','userin','datein'],
    idProperty: 'id'
});

var storeGridImportReceiveMoney = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridImportReceiveMoneyModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ImportReceiveMoney/money',
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

Ext.define('MY.searchGridImportReceiveMoney', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridImportReceiveMoney',
    store: storeGridImportReceiveMoney,
    width: 180
});

var smGridImportReceiveMoney = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridImportReceiveMoney.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteImportReceiveMoney').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteImportReceiveMoney').enable();
        }
    }
});

Ext.define('GridImportReceiveMoney', {
    title: 'Riwayat Import Penerimaan Kas',
    itemId: 'GridImportReceiveMoneyID',
    id: 'GridImportReceiveMoneyID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridImportReceiveMoney',
    store: storeGridImportReceiveMoney,
    loadMask: true,
    columns: [
        {header: 'ID', dataIndex: 'idreceivemoneyimport', minWidth: 100},
        {header: 'Nama File xlsx', dataIndex: 'filename', minWidth: 300},
        {header: 'User Input', dataIndex: 'userin', minWidth: 100},
        {header: 'Tgl Input', dataIndex: 'datein', minWidth: 150}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
//                {
//                    itemId: 'addImportReceiveMoney',
//                    text: 'Tambah',
//                    iconCls: 'add-icon',
//                    handler: function() {
//                         wImportReceiveMoney.show();
//                         Ext.getCmp('statusformImportReceiveMoney').setValue('input');
//                    }
//                },
//                {
//                    itemId: 'editImportReceiveMoney',
//                    text: 'Ubah',
//                    iconCls: 'edit-icon',
//                    handler: function() {
//                        var grid = Ext.ComponentQuery.query('GridImportReceiveMoney')[0];
//                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                        var data = grid.getSelectionModel().getSelection();
//                        if (data.length == 0)
//                        {
//                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
//                        } else {
//                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
//                            var formImportReceiveMoney = Ext.getCmp('formImportReceiveMoney');
//
//                            formImportReceiveMoney.getForm().load({
//                                url: SITE_URL + 'backend/loadFormData/ImportReceiveMoney/1/setup',
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
//                            wImportReceiveMoney.show();
//                            Ext.getCmp('statusformImportReceiveMoney').setValue('edit');
//                        }
//
//                    }
//                },
//                {
//                    id: 'btnDeleteImportReceiveMoney',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Confirm',
//                            msg: 'Delete Selected ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//                                    var grid = Ext.ComponentQuery.query('GridImportReceiveMoney')[0];
//                                    var sm = grid.getSelectionModel();
//                                    selected = [];
//                                    Ext.each(sm.getSelection(), function(item) {
//                                        selected.push(item.data[Object.keys(item.data)[0]]);
//                                    });
//                                    Ext.Ajax.request({
//                                        url: SITE_URL + 'backend/ext_delete/ImportReceiveMoney/setup',
//                                        method: 'POST',
//                                        params: {postdata: Ext.encode(selected)}
//                                    });
//                                    storeGridImportReceiveMoney.remove(sm.getSelection());
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
                    xtype: 'searchGridImportReceiveMoney',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridImportReceiveMoney, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridImportReceiveMoney.load();

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
//            var formImportReceiveMoney = Ext.getCmp('formImportReceiveMoney');
//            wImportReceiveMoney.show();
//
//            formImportReceiveMoney.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ImportReceiveMoney/1/setup',
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
//            Ext.getCmp('statusformImportReceiveMoney').setValue('edit');
        }
    }
});