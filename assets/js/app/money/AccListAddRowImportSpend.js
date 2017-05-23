// Ext.define('GridTreeAccImportSpend', {
//     title: 'Daftar Akun',
//     // selModel : smGridIP,   
//     itemId: 'GridTreeAccImportSpend',
//     id: 'GridTreeAccImportSpend',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccImportSpend',
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
//             minWidth: 300,
//             sortable: true,
//             dataIndex: 'text'
//         },  {
//             //we must use the templateheader component so we can use a custom tpl
//             xtype: 'numbercolumn',
//             text: 'balance',
//             align:'right',
//             sortable: true,
//             minWidth: 100,
//             dataIndex: 'balance'
//         }
//     ]
//     , dockedItems: [{
//             xtype: 'toolbar',
//             dock: 'top',
//             items: [
//                 {
//                     itemId: 'PilihAccImportSpend',
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccImportSpend')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
// //                            console.log(selectedRecord);
//                             Ext.getCmp('accnameImportSpendAdd').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccountImportSpendAdd').setValue(selectedRecord.get('id'));
//                             // Ext.getCmp('accnumberImportSpendAdd').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccImportSpend').hide();
//                         }


//                     }
//                 },'->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccImportSpend',
//                     blankText:'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccImportSpend').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccImportSpend').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccImportSpend',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccImportSpend');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccImportSpend').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 Ext.getCmp('GridTreeAccImportSpend').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccImportSpend = Ext.create('widget.window', {
//     id: 'windowPopupAccImportSpend',
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
//             id: 'tabAccTreeImportSpend',
//             items: [{
//                 xtype: 'GridTreeAccImportSpend'
//             }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccImportSpend = Ext.getCmp('windowPopupAccImportSpend');
//                 windowPopupAccImportSpend.hide();
//             }
//         }]
// });


Ext.define('GridAccImportSpend', {
    itemId: 'GridAccImportSpend',
    id: 'GridAccImportSpend',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccImportSpend',
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
               setValueAcc(selectedRecord,'wAccImportSpendPopup','ImportSpendAdd');
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
                        var grid = Ext.ComponentQuery.query('GridAccImportSpend')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccImportSpendPopup','ImportSpendAdd');
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

var wAccImportSpendPopup = Ext.create('widget.window', {
    id: 'wAccImportSpendPopup',
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
            xtype:'GridAccImportSpend'
    }]
});