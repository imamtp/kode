//LIST ACC SUMBER
// Ext.define('GridTreeAccTransferKasSumber', {
//     itemId: 'GridTreeAccTransferKasSumber',
//     id: 'GridTreeAccTransferKasSumber',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccTransferKasSumber',
//     xtype: 'tree-grid',
//     store: storeAccountAktive,
//     loadMask: true,
//     // height: 300,
//     useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     singleExpand: false,
//     expanded: false,
//     columns: [{
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
//             flex: 1,
//             sortable: true,
//             dataIndex: 'text'
//         }
//     ]
//     , dockedItems: [{
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccTransferKasSumber')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);

//                             Ext.getCmp('accnameTransferKasSumber').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccountTransferKasSumber').setValue(selectedRecord.get('id'));
//                             Ext.getCmp('accnumberTransferKasAsal').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccTransferKasSumber').hide();
//                         }


//                     }
//                 }, '-', {
//                     xtype: 'button',
// //                            width:100,
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccTransferKasSumber').expandAll();
//                     },
//                     flex: 1,
//                     text: 'Expand'
//                 }, {
//                     xtype: 'button',
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccTransferKasSumber').collapseAll();
//                     },
//                     flex: 1,
//                     text: 'Collapse'
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccTransferKasSumber',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccTransferKasSumber').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccTransferKasSumber').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccTransferKasSumber',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccTransferKasSumber');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccTransferKasSumber').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccTransferKasSumber').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccTransferKasSumber = Ext.create('widget.window', {
//     id: 'windowPopupAccTransferKasSumber',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     minWidth: 750,
//     height: 550,
//     x: 300,
//     y: 50,
//     layout: 'fit',
//     border: false,
//     title: 'Pilih Akun Kas/Bank Sumber',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                     xtype: 'GridTreeAccTransferKasSumber'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccTransferKasSumber = Ext.getCmp('windowPopupAccTransferKasSumber');
//                 windowPopupAccTransferKasSumber.hide();
//             }
//         }]
// });
Ext.define('GridAccTransferKasSumber', {
    itemId: 'GridAccTransferKasSumber',
    id: 'GridAccTransferKasSumber',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccTransferKasSumber',
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
               setValueAcc(selectedRecord,'wAccTransferKasSumberPopup','TransferKasSumber');
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
                        var grid = Ext.ComponentQuery.query('GridAccTransferKasSumber')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccTransferKasSumberPopup','TransferKasSumber');
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

var wAccTransferKasSumberPopup = Ext.create('widget.window', {
    id: 'wAccTransferKasSumberPopup',
     title: 'Pilih Akun Kas/Bank Sumber',
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
            xtype:'GridAccTransferKasSumber'
    }]
});
//END LIST ACC SUMBER

//LIST ACC TUJUAN
// Ext.define('GridTreeAccTransferKasTujuan', {
//     itemId: 'GridTreeAccTransferKasTujuan',
//     id: 'GridTreeAccTransferKasTujuan',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccTransferKasTujuan',
//     xtype: 'tree-grid',
//     store: storeAccountAktive,
//     loadMask: true,
//     // height: 300,
//     useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     singleExpand: false,
//     expanded: false,
//     columns: [{
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
//             flex: 1,
//             sortable: true,
//             dataIndex: 'text'
//         }
//     ]
//     , dockedItems: [{
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccTransferKasTujuan')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);

//                             Ext.getCmp('accnameTransferKasTujuan').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccountTransferKasTujuan').setValue(selectedRecord.get('id'));
//                             Ext.getCmp('accnumberTransferKasAsal').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccTransferKasTujuan').hide();
//                         }


//                     }
//                 }, '-', {
//                     xtype: 'button',
// //                            width:100,
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccTransferKasTujuan').expandAll();
//                     },
//                     flex: 1,
//                     text: 'Expand'
//                 }, {
//                     xtype: 'button',
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccTransferKasTujuan').collapseAll();
//                     },
//                     flex: 1,
//                     text: 'Collapse'
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccTransferKasTujuan',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccTransferKasTujuan').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccTransferKasTujuan').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccTransferKasTujuan',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccTransferKasTujuan');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccTransferKasTujuan').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccTransferKasTujuan').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccTransferKasTujuan = Ext.create('widget.window', {
//     id: 'windowPopupAccTransferKasTujuan',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//     minWidth: 750,
//     height: 550,
//     x: 300,
//     y: 50,
//     layout: 'fit',
//     border: false,
//     title: 'Pilih Akun Kas/Bank Tujuan',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                     xtype: 'GridTreeAccTransferKasTujuan'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccTransferKasTujuan = Ext.getCmp('windowPopupAccTransferKasTujuan');
//                 windowPopupAccTransferKasTujuan.hide();
//             }
//         }]
// });
Ext.define('GridAccTransferKasTujuan', {
    itemId: 'GridAccTransferKasTujuan',
    id: 'GridAccTransferKasTujuan',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccTransferKasTujuan',
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
               setValueAcc(selectedRecord,'wAccTransferKasTujuanPopup','TransferKasTujuan');
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
                        var grid = Ext.ComponentQuery.query('GridAccTransferKasTujuan')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccTransferKasTujuanPopup','TransferKasTujuan');
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

var wAccTransferKasTujuanPopup = Ext.create('widget.window', {
    id: 'wAccTransferKasTujuanPopup',
    title: 'Pilih Akun',
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
            xtype:'GridAccTransferKasTujuan'
    }]
});
//END LIST ACC TUJUAN

Ext.define(dir_sys + 'money.transferKasForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.transferKasForm',
    id: 'transferKasForm',
    autoScroll: true,
    url: SITE_URL + 'backend/saveform/transferkas/money',
    baseParams: {idmenu:90},
    autoHeight: true,
    autoWidth: true,
    layoutFit: true,
    //    height: 492,
    //    width: '90%',
    bodyPadding: 10,
    title: 'Transfer Kas/Bank',
    defaults: {
        anchor: '50%',
        labelWidth: 160
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'statusformtransferkas',
            value:'input',
            id: 'statusformtransferkas'
        },{
            xtype: 'comboxunit',
            allowBlank: false,
            name:'namaunit',
            valueField:'idunit',
            id: 'idunitTransferKas'
        }, {
            xtype: 'hiddenfield',
            id: 'idaccountTransferKasSumber',
            name: 'idaccountsumber',
            readOnly: true
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Akun Kas/Bank Sumber',
            combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            defaults: {
                flex: 1,
                hideLabel: true
            },
            items: [{
                margin: '0 5 0 0',
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Akun Kas/Bank Sumber',
                // labelWidth: 150,
                name: 'accnamesumber',
                id: 'accnameTransferKasSumber',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            if (Ext.getCmp('idunitTransferKas').getValue() == null) {
                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                            } else {
                                wAccTransferKasSumberPopup.show();
                                // storeAccountAktive.load({
                                //     params: {
                                //         'idunit': Ext.getCmp('idunitTransferKas').getValue(),
                                //         'idaccounttype': '19,17,1'
                                //     }
                                // });
                                storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'idunit': Ext.getCmp('idunitTransferKas').getValue(),
                                                'idaccounttype': '19,17,1'
                                    };
                                });
                                storeGridAccount.load();
                            }
                        });
                    }
                }
            }, {
                xtype: 'displayfield',
                id: 'accnumberTransferKasSumber',
            }]
        }, {
            xtype: 'hiddenfield',
            id: 'idaccountTransferKasTujuan',
            name: 'idaccounttujuan',
            readOnly: true
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Akun Kas/Bank Tujuan',
            combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            defaults: {
                flex: 1,
                hideLabel: true
            },
            items: [{
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: 'Akun Kas/Bank Tujuan',
                // labelWidth: 150,
                name: 'accnametujuan',
                id: 'accnameTransferKasTujuan',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            if (Ext.getCmp('idunitTransferKas').getValue() == null) {
                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                            } else {
                                wAccTransferKasTujuanPopup.show();
                                storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'idunit': Ext.getCmp('idunitTransferKas').getValue(),
                                                'idaccounttype': '19,17,1'
                                    };
                                });
                                storeGridAccount.load();
                            }
                        });
                    }
                }
            }, {
                xtype: 'displayfield',
                id: 'accnumberTransferKasTujuan',
            }]
        }, {
            xtype: 'textfield',
            allowBlank: false,
            name:'nominal',
            fieldLabel: 'Nominal',
            fieldStyle: 'text-align: right;',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                        // updateSelisih();
                    }, c);
                }
            }
        }, {
            xtype: 'textarea',
            // anchor: '100%',
            fieldLabel: 'Memo',
            name: 'memo'
        }, {
            xtype: 'datefield',
            format: 'd-m-Y',
            allowBlank: false,
            name: 'tanggal',
            fieldLabel: 'Tanggal',
        }
    ],
    buttons: [{
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        //                                    console.log(action)
                        Ext.Msg.alert('Success', action.result.message);
                        //                                    storeGridPengaturan.load();
                                                           Ext.getCmp('transferKasForm').getForm().reset();
                        //                                    Ext.getCmp('windowPopupPengaturan').hide();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                                     storeGridPengaturan.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }],
    listeners: {
        afterrender: {
            fn: function() {
                // Ext.getCmp('formLembur').getForm().reset();
                // var form = Ext.getCmp('formSetupCompany').getForm();
                // form.load({
                //     url: SITE_URL + 'backend/loadFormData/company/1/setup',
                //     failure: function(form, action) {
                //         Ext.Msg.alert("Load failed", action.result.errorMessage);
                //     }
                // })
            }
        }
    }
});