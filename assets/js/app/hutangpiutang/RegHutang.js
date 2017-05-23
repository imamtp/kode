// Ext.define('GridTreeAccRegHutang', {
//     // title: 'Daftar Akun',
//     // selModel : smGridIP,   
//     itemId: 'GridTreeAccRegHutang',
//     id: 'GridTreeAccRegHutang',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccRegHutang',
//     xtype: 'tree-grid',
//     store: storeAccountAktive,
//     loadMask: true,
//     // height: 300,
//     useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     // singleExpand: true,
//     expanded: true,
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
//             minWidth: 400,
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
//                         var grid = Ext.ComponentQuery.query('GridTreeAccRegHutang')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);
//                             Ext.getCmp('accnameRegHutang').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccRegHutang').setValue(selectedRecord.get('id'));
//                             // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccRegHutang').hide();
//                         }


//                     }
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccRegHutang',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccRegHutang').getValue(),
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
//                         storeAccount.load({
//                             params: {
//                                 'accname': Ext.getCmp('searchAccRegHutang').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccRegHutang',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccRegHutang');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccRegHutang').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccRegHutang').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccRegHutang = Ext.create('widget.window', {
//     title: 'Pilih Akun Hutang',
//     id: 'windowPopupAccRegHutang',
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
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
//             items: [{
//                     xtype: 'GridTreeAccRegHutang'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccRegHutang = Ext.getCmp('windowPopupAccRegHutang');
//                 windowPopupAccRegHutang.hide();
//             }
//         }]
// });

Ext.define('GridAccRegHutang', {
    itemId: 'GridAccRegHutang',
    id: 'GridAccRegHutang',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccRegHutang',
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
               setValueAcc(selectedRecord,'wAccRegHutang','RegHutang');
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
                        var grid = Ext.ComponentQuery.query('GridAccRegHutang')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccRegHutang','RegHutang');
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

var wAccRegHutang = Ext.create('widget.window', {
    id: 'wAccRegHutang',
    title: 'Pilih Akun Hutang',
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
            xtype:'GridAccRegHutang'
    }]
});

////////////////////////////////////////////////

// Ext.define('GridTreeAccRegKenaHutang', {
//     // title: 'Daftar Akun',
//     // selModel : smGridIP,   
//     itemId: 'GridTreeAccRegKenaHutang',
//     id: 'GridTreeAccRegKenaHutang',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccRegKenaHutang',
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
//             text: 'accnumber',
//             minWidth: 200,
//             sortable: true,
//             dataIndex: 'accnumber'
//         }, {
//             xtype: 'treecolumn', //this is so we know which column will show the tree
//             text: 'Nama Akun',
//             // flex: 2,
//             minWidth: 400,
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
//                         var grid = Ext.ComponentQuery.query('GridTreeAccRegKenaHutang')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);
//                             Ext.getCmp('accnameRegKenaHutang').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccRegKenaHutang').setValue(selectedRecord.get('id'));
//                             // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccRegKenaHutang').hide();
//                         }


//                     }
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccRegKenaHutang',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccRegKenaHutang').getValue(),
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
//                         storeAccount.load({
//                             params: {
//                                 'accname': Ext.getCmp('searchAccRegKenaHutang').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccRegKenaHutang',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccRegKenaHutang');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccRegKenaHutang').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 // Ext.getCmp('GridTreeAccRegKenaHutang').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccRegKenaHutang = Ext.create('widget.window', {
//     title: 'Pilih Akun Kena Hutang',
//     id: 'windowPopupAccRegKenaHutang',
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
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
//             items: [{
//                     xtype: 'GridTreeAccRegKenaHutang'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccRegKenaHutang = Ext.getCmp('windowPopupAccRegKenaHutang');
//                 windowPopupAccRegKenaHutang.hide();
//             }
//         }]
// });

Ext.define('GridAccRegKenaHutang', {
    itemId: 'GridAccRegKenaHutang',
    id: 'GridAccRegKenaHutang',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccRegKenaHutang',
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
               setValueAcc(selectedRecord,'wAccRegKenaHutang','RegKenaHutang');
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
                        var grid = Ext.ComponentQuery.query('GridAccRegKenaHutang')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccRegKenaHutang','RegKenaHutang');
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

var wAccRegKenaHutang = Ext.create('widget.window', {
    id: 'wAccRegKenaHutang',
    title: 'Pilih Akun Kena Hutang',
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
            xtype:'GridAccRegKenaHutang'
    }]
});

///////////////////////////////////////////////

var formRegHutang = Ext.create('Ext.form.Panel', {
    id: 'formRegHutang',
    width: 460,
    height: 300,
    url: SITE_URL + 'backend/saveform/RegHutang/hutangpiutang',
    baseParams: {idmenu:77},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        anchor: '100%'
        // width: '90%'
    },
      items: [{
            xtype: 'hiddenfield',
            name: 'statusformRegHutang',
            id: 'statusformRegHutang'
        },
        {
            xtype:'hiddenfield',
            name:'idunit',
            id:'idunitRegHutang',
        }, {
            xtype:'hiddenfield',
            name:'idregistrasihutang',
            id:'idregistrasihutang'
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'Unit',
        //     id:'namaunitinkhutang',
        //     name:'namaunit',
        // },
        {
            xtype:'hiddenfield',
            name:'idsupplier',
            id:'idsupplierRegHutang',
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Supplier',
            name: 'namesupplier',
            id: 'namesupplierRegHutang',
            allowBlank:false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wpopupSupplierHutang.show();

                         storeGridpopupSupplierHutang.load();
                    });
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Akun Pencatatan Hutang (kredit)',
            name: 'acchutang',
            id: 'accnameRegHutang',
            allowBlank:false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                         wAccRegHutang.show();
                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                        'idunit': Ext.getCmp('cbUnitAcchutang').getValue(),
                                        'idaccounttype':'9,18'
                            };
                        });
                        storeGridAccount.load();

                         // storeAccountAktive.reload({
                         //            params: {
                         //                'idunit': Ext.getCmp('cbUnitAcchutang').getValue(),
                         //                'idaccounttype':'9,18'
                         //            }
                         //        });
                    });
                }
            }
        },{
            xtype: 'hiddenfield',
            name: 'idacchutang',
            id: 'idaccountRegHutang'
        },
         {
            xtype: 'textfield',
            fieldLabel: 'Akun Beban Hutang (debit)',
            name: 'acckenahutang',
            id: 'accnameRegKenaHutang',
            allowBlank:false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                         wAccRegKenaHutang.show();
                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                        'idunit': Ext.getCmp('cbUnitAcchutang').getValue(),
                                        'idaccounttype': '14,15'
                            };
                        });
                        storeGridAccount.load();
                        // windowPopupAccRegKenaHutang.show();

                        //  storeAccountAktive.reload({
                        //             params: {
                        //                 'idunit': Ext.getCmp('cbUnitAcchutang').getValue()
                        //             }
                        //         });
                    });
                }
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'idacckenahutang',
            id: 'idaccountRegKenaHutang'
        },
        {
            xtype:'textfield',
            fieldLabel:'Jumlah Hutang',
            allowBlank:false,
            id:'jumlahRegHutang',
            listeners: {
                // blur: function(txt, The, eOpts) {
                //     this.setRawValue(renderNomor(this.getValue()));
                // }
                // ,
                change: function(txt, The, eOpts){
                  this.setRawValue(renderNomor(this.getValue()));
                }
            },
            name:'jumlah'
        },
        // {
        //     xtype:'displayfield',
        //     fieldLabel:'Sisa Hutang',
        //     id:'sisahutangRegHutang',
        //     renderer: renderNomor,
        //     name:'sisahutang'
        // },
        // {
        //     xtype:'comboxbulan'
        // },
        // {
        //     xtype:'numberfield',
        //     fieldLabel:'Tahun',
        //     id:'tahunRegHutang',
        //     name:'tahun'
        // },
         {
                xtype: 'datefield',
                format: 'd-m-Y',
                name:'mulaihutang',
                allowBlank:false,
                fieldLabel: 'Tgl Mulai Hutang'
        }, 
        {
                xtype: 'datefield',
                name:'jatuhtempo',allowBlank:false,
                format: 'd-m-Y',
                fieldLabel: 'Tgl Jatuh Tempo'
        },       
        {
            xtype: 'textarea',allowBlank:false,
            fieldLabel: 'Memo',
            name: 'memo'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupRegHutang');
                Ext.getCmp('formRegHutang').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnRegHutangSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formRegHutang').getForm().reset();
                            Ext.getCmp('windowPopupRegHutang').hide();

                            storeGridRegHutang.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            storeGridRegHutang.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wRegHutang = Ext.create('widget.window', {
    id: 'windowPopupRegHutang',
    title: 'Registrasi hutang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formRegHutang]
});

Ext.define('GridRegHutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idregistrasihutang','idunit','jumlah','idsupplier','namesupplier','sisahutang','idjournal','memo','userin','datein','month','year','acchutang','acckenahutang','namaunit','mulaihutang','jatuhtempo'],
    idProperty: 'id'
});

var storeGridRegHutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridRegHutangModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/RegHutang/hutangpiutang',
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

Ext.define('MY.searchGridRegHutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridRegHutang',
    store: storeGridRegHutang,
    width: 180
});

var smGridRegHutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridRegHutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteRegHutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteRegHutang').enable();
        }
    }
});

Ext.define('GridRegHutang', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridRegHutang,
    title: 'Hutang Supplier',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridRegHutangID',
    id: 'GridRegHutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridRegHutang',
    store: storeGridRegHutang,
    loadMask: true,
    columns: [
        {header: 'idregistrasihutang', dataIndex: 'idregistrasihutang', hidden: true},
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 150},
        {header: 'Supplier', dataIndex: 'namesupplier', minWidth: 150},
        {header: 'Memo', dataIndex: 'memo', minWidth: 150},
        {header: 'Akun Hutang', dataIndex: 'acchutang', minWidth: 150},
        {header: 'Akun Kena Hutang', dataIndex: 'acckenahutang', minWidth: 150},
        // {header: 'month', dataIndex: 'month', minWidth: 150},
        // {header: 'tahun', dataIndex: 'tahun', minWidth: 150},
        {header: 'Jumlah Hutang', dataIndex: 'jumlah', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Sisa Hutang', dataIndex: 'sisahutang', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Mulai Hutang', dataIndex: 'mulaihutang', minWidth: 150},
        {header: 'Jatuh Tempo', dataIndex: 'jatuhtempo', minWidth: 150},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    valueField: 'idunit',
                    id: 'cbUnitAcchutang',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridRegHutang.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitAcchutang').getValue()
                                }
                            });
                        }
                    }
                }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [            
                {
                    itemId: 'addRegHutang',
                    text: 'Registrasi hutang',
                    iconCls: 'add-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GridRegHutang')[0];
                        // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        // var data = grid.getSelectionModel().getSelection();
                        var idunit = Ext.getCmp('cbUnitAcchutang').getValue();
                        if (idunit==null)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Unit terlebih dahulu!');
                        } else {
                            wRegHutang.show();
                            Ext.getCmp('statusformRegHutang').setValue('input');
                            // Ext.getCmp('idRegHutang').setValue(selectedRecord.data.idRegHutang);
                            Ext.getCmp('idunitRegHutang').setValue(idunit);

                            
                        }
                       
                    }
                },
                {
                   itemId: 'PenerimaanHutang',
                   text: 'Pembayaran Hutang',
                   iconCls: 'edit-icon',
                   handler: function() {
                       var grid = Ext.ComponentQuery.query('GridRegHutang')[0];
                       var selectedRecord = grid.getSelectionModel().getSelection()[0];
                       var data = grid.getSelectionModel().getSelection();
                       if (data.length == 0)
                       {
                           Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                       } else {

                           var formPembayaranHutang = Ext.getCmp('formPembayaranHutang');
                            wPembayaranHutang.show();
                            
                            formPembayaranHutang.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/regHutang/1/hutangpiutang',
                                params: {
                                    extraparams: 'a.idregistrasihutang:' + selectedRecord.data.idregistrasihutang
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(action.response.responseText);
                                    Ext.getCmp('jumlahPembayaranHutang').setValue(renderNomor(d.data.jumlah));
                                    Ext.getCmp('sisaPembayaranHutang').setValue(renderNomor(d.data.sisahutang));
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            });
                       }

                   }
               },
                {
                    id: 'btnDeleteRegHutang',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridRegHutang')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'hutangpiutang/deleteRegHutang',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)},
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                if (!d.success) {
                                                    Ext.Msg.alert('Informasi', d.message);
                                                } else {
                                                    storeGridRegHutang.load();
                                                }
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                            }
                                    });
                                    
                                }
                            }
                        });
                    },
//                    disabled: true
                },
                 '->',
                'Search: ', ' ',
                {
                    xtype: 'searchGridRegHutang',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridRegHutang, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
        // , {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //         itemId: 'addRegHutang',
        //         text: 'Tambah Data',
        //         iconCls: 'add-icon',
        //         handler: function () {
        //             // WindowKaryawan('Input Karyawan Baru','input');
        //             wRegHutang.show();
        //         }
        //     }]
        // }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridRegHutang.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formRegHutang = Ext.getCmp('formRegHutang');
            wRegHutang.show();
            storeGridSetupUnit.load();
            
            formRegHutang.getForm().load({
                url: SITE_URL + 'backend/loadFormData/RegHutang/1/hutangpiutang',
                params: {
                    extraparams: 'a.idregistrasihutang:' + record.data.idregistrasihutang
                },
                success: function(form, action) {
                    var d = Ext.decode(action.response.responseText);

                    Ext.getCmp('jumlahRegHutang').setValue(renderNomor(d.data.jumlah));
                    // Ext.getCmp('sisahutangRegHutang').setValue(Ext.util.Format.number(d.data.sisahutang, formatNomor));
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('kdtgktunitS').setReadOnly(true);
//            Ext.getCmp('kodesubunitS').setReadOnly(true);
//            Ext.getCmp('kodejenjangmaster').setReadOnly(true);
            Ext.getCmp('statusformRegHutang').setValue('edit');
        }
    }
});



Ext.define('TabHutang', {
    extend: 'Ext.tab.Panel',
    id: 'TabHutang',
    alias: 'widget.TabHutang',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridRegHutang'
        },
        {
            xtype:'GridHutangPurchase'
        }
        // ,
        // {
        //     xtype:'GridHutangLain'
        // }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitInventory();
            }
        }
    }
});