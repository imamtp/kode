// Ext.define('GridTreeAccReceiveSiswa', {
// //    title: 'Daftar Pembayaran',
//     // selModel : smGridIP,   
//     itemId: 'GridTreeAccReceiveSiswa',
//     id: 'GridTreeAccReceiveSiswa',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccReceiveSiswa',
//     xtype: 'tree-grid',
//     store: storeAccountAktive,
//     loadMask: true,
//     // height: 300,
//     useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     singleExpand: true,
//     expanded: true,
//     columns: [{
//             //we must use the templateheader component so we can use a custom tpl
//             xtype: 'treecolumn',
//             text: 'id',
//             hidden:true,
//             minWidth: 200,
//             sortable: true,
//             dataIndex: 'idaccount'
//         },{
//             //we must use the templateheader component so we can use a custom tpl
//             xtype: 'treecolumn',
//             text: 'accnumber',
//             minWidth: 200,
//             sortable: true,
//             dataIndex: 'accnumber'
//         }, {
//             xtype: 'treecolumn', //this is so we know which column will show the tree
//             text: 'Nama Akun',
//             // flex: 2,
//             minWidth: 300,
//             sortable: true,
//             dataIndex: 'text'
//         }
//     ]
//     , dockedItems: [{
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     itemId: 'PilihAccReceiveSiswa',
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccReceiveSiswa')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {

//                             //cek apakah akun pembayaran terpilih terhubung ke dalam akun piutang di linkpiutang
//                             Ext.Ajax.request({
//                                 url: SITE_URL + 'money/cekLinkAccReceiveSiswa',
//                                 method: 'GET',
//                                 params: {
//                                     idunit: Ext.getCmp('AddRowReceiveSiswaIdunit').getValue(),
//                                     idaccount: selectedRecord.get('idaccount'),
//                                     accname:selectedRecord.get('text')
//                                 },
//                                 success: function(form, action) {
//                                     var d = Ext.decode(form.responseText);
//                                     if (d.success) {
//                                         Ext.Msg.alert('Info', d.message);
//                                     }
//                                 },
//                                 failure: function(form, action) {
//                                     Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                                 }
//                             });
                            


// //                            console.log(selectedRecord);
//                             Ext.getCmp('accnameReceiveSiswaAdd').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccountReceiveSiswaAdd').setValue(selectedRecord.get('idaccount'));
//                             Ext.getCmp('accnumberReceiveSiswaAdd').setValue(selectedRecord.get('accnumber'));
                            
//                             Ext.getCmp('memoReceiveSiswaAdd').setValue(selectedRecord.get('text')+' '+Ext.getCmp('noindukReceiveSiswaAdd').getValue());

//                             Ext.getCmp('windowPopupAccReceiveSiswa').hide();
//                         }


//                     }
//                 },'->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccReceiveSiswa',
//                     blankText:'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccReceiveSiswa').getValue(),
//                                     }
//                                 });
//                             }
//                         }
//                     }
//                 }, {
// //                        itemId: 'reloadDataAcc',
//                     text: 'Cari',
//                     iconCls: 'add-icon'
//                     , handler: function() {
//                         storeAccountAktive.load({
//                             params: {
//                                 'accname': Ext.getCmp('searchAccReceiveSiswa').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccReceiveSiswa',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccReceiveSiswa');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccReceiveSiswa').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 Ext.getCmp('GridTreeAccReceiveSiswa').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccReceiveSiswa = Ext.create('widget.window', {
//     id: 'windowPopupAccReceiveSiswa',
//     title: 'Daftar Pembayaran',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     minWidth: 650,
//     height: 450,
//     x: 300,
//     y: 50,
//     layout: 'fit',
//     border: false,
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5,  // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout:'fit',
//             id: 'tabAccTreeReceiveSiswa',
//             items: [{
//                 xtype: 'GridTreeAccReceiveSiswa'
//             }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccReceiveSiswa = Ext.getCmp('windowPopupAccReceiveSiswa');
//                 windowPopupAccReceiveSiswa.hide();
//             }
//         }]
// });

Ext.define('GridAccAddRowReceiveSiswa', {
    itemId: 'GridAccAddRowReceiveSiswa',
    id: 'GridAccAddRowReceiveSiswa',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccAddRowReceiveSiswa',
    store: storeGridAccount,
    loadMask: true,
    columns: [
    {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                insertAccAddRowReceiveSiswa(selectedRecord);
            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridAccAddRowReceiveSiswa')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {

                            insertAccAddRowReceiveSiswa(selectedRecord);
                            
                        }
                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAcc',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridAccount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wAccAddRowReceiveSiswaPopup = Ext.create('widget.window', {
    id: 'wAccAddRowReceiveSiswaPopup',
    title: 'Pilih Pembayaran',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 660,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridAccAddRowReceiveSiswa'
    }]
});

function insertAccAddRowReceiveSiswa(selectedRecord)
{
    //cek apakah akun pembayaran terpilih terhubung ke dalam akun piutang di linkpiutang
    Ext.Ajax.request({
        url: SITE_URL + 'money/cekLinkAccReceiveSiswa',
        method: 'GET',
        params: {
            idunit: Ext.getCmp('AddRowReceiveSiswaIdunit').getValue(),
            idaccount: selectedRecord.get('idaccount'),
            accname:selectedRecord.get('accname')
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            if (d.success) {
                Ext.Msg.alert('Info', d.message);
            }
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

    Ext.getCmp('accnameReceiveSiswaAdd').setValue(selectedRecord.get('accname'));
    Ext.getCmp('idaccountReceiveSiswaAdd').setValue(selectedRecord.get('idaccount'));
    Ext.getCmp('accnumberReceiveSiswaAdd').setValue(selectedRecord.get('accnumber'));

    Ext.getCmp('memoReceiveSiswaAdd').setValue(selectedRecord.get('accname')+' '+Ext.getCmp('noindukReceiveSiswaAdd').getValue());

    Ext.getCmp('wAccAddRowReceiveSiswaPopup').hide();
}

////////////////////////////////////////////////////////////////////////////////
Ext.define('GridTreeAccReceiveFormSiswa', {
//    title: 'Daftar Pembayaran',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccReceiveFormSiswa',
    id: 'GridTreeAccReceiveFormSiswa',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccReceiveFormSiswa',
    xtype: 'tree-grid',
    store: storeAccountAktive,
    loadMask: true,
    // height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    expanded: true,
    columns: [{
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'treecolumn',
            text: 'id',
            hidden:true,
            minWidth: 200,
            sortable: true,
            dataIndex: 'idaccount'
        },{
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'treecolumn',
            text: 'accnumber',
            minWidth: 200,
            sortable: true,
            dataIndex: 'accnumber'
        }, {
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Nama Akun',
            // flex: 2,
            minWidth: 300,
            sortable: true,
            dataIndex: 'text'
        }
    ]
    , dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'PilihAccReceiveSiswa',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccReceiveFormSiswa')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
//                            console.log(selectedRecord);
                            Ext.getCmp('accnameReceiveSiswaAdd').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccountReceiveSiswaAdd').setValue(selectedRecord.get('idaccount'));
                            Ext.getCmp('accnumberReceiveSiswaAdd').setValue(selectedRecord.get('accnumber'));
                            
                            Ext.getCmp('memoReceiveSiswaAdd').setValue(selectedRecord.get('text')+' '+Ext.getCmp('noindukReceiveSiswaAdd').getValue());

                            Ext.getCmp('windowPopupAccReceiveFormSiswa').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchAccReceiveSiswa',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccReceiveSiswa').getValue(),
                                    }
                                });
                            }
                        }
                    }
                }, {
//                        itemId: 'reloadDataAcc',
                    text: 'Cari',
                    iconCls: 'add-icon'
                    , handler: function() {
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccReceiveSiswa').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccReceiveSiswa',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccReceiveFormSiswa');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccReceiveSiswa').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccReceiveFormSiswa').expandAll();
            }
        }
    }
});

var windowPopupAccReceiveFormSiswa = Ext.create('widget.window', {
    id: 'windowPopupAccReceiveFormSiswa',
    title: 'Akun Penerimaan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    minWidth: 650,
    height: 450,
    x: 300,
    y: 50,
    layout: 'fit',
    border: false,
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,  // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout:'fit',
            id: 'tabAccTreeReceiveFormSiswa',
            items: [{
                xtype: 'GridTreeAccReceiveFormSiswa'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccReceiveFormSiswa = Ext.getCmp('windowPopupAccReceiveFormSiswa');
                windowPopupAccReceiveFormSiswa.hide();
            }
        }]
});