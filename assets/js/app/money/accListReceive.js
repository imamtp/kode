// Ext.define('GridTreeAccListReceive', {
//     itemId: 'GridTreeAccListReceive',
//     id: 'GridTreeAccListReceive',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccListReceive',
//     xtype: 'tree-grid',
//     store: storeAccountAktive,
//     loadMask: true,
//     // height: 300,
//     useArrows: true,
//     rootVisible: false,
//     multiSelect: true,
//     // singleExpand: false,
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
//         }, {
//             //we must use the templateheader component so we can use a custom tpl
//             xtype: 'numbercolumn',
//             align: 'right',
//             text: 'balance',
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
//                     itemId: 'PilihAccLink',
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccListReceive')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);

//                             Ext.getCmp('accnameReceive').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccountReceive').setValue(selectedRecord.get('id'));
//                             Ext.getCmp('accnumberReceive').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccListReceive').hide();
//                         }


//                     }
//                 }, '-', {
//                     xtype: 'button',
// //                            width:100,
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListReceive').expandAll();
//                     },
//                     flex: 1,
//                     text: 'Expand'
//                 }, {
//                     xtype: 'button',
//                     handler: function(button, event) {
//                         Ext.getCmp('GridTreeAccListReceive').collapseAll();
//                     },
//                     flex: 1,
//                     text: 'Collapse'
//                 }, '->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccListReceive',
//                     blankText: 'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccListReceive').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccListReceive').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccListReceive',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccListReceive');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccListReceive').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 Ext.getCmp('GridTreeAccListReceive').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccListReceive = Ext.create('widget.window', {
//     id: 'windowPopupAccListReceive',
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
//     title: 'Daftar Akun',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5, // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout: 'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                     xtype: 'GridTreeAccListReceive'
//                 }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccListReceive = Ext.getCmp('windowPopupAccListReceive');
//                 windowPopupAccListReceive.hide();
//             }
//         }]
// });


/////////////////////////////////////////////////////////////////////

Ext.define('GridAccReceive', {
    itemId: 'GridAccReceive',
    id: 'GridAccReceive',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccReceive',
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
               setValueAcc(selectedRecord,'wAccReceivePopup','Receive');
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
                        var grid = Ext.ComponentQuery.query('GridAccReceive')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccReceivePopup','Receive');
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

var wAccReceivePopup = Ext.create('widget.window', {
    id: 'wAccReceivePopup',
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
            xtype:'GridAccReceive'
    }]
});