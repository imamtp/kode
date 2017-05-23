// Ext.define('GridTreeAccListReconcileOther', {
//     // itemId: 'GridTreeAccListReconcileOther',
//     id: 'GridTreeAccListReconcileOther',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccListReconcileOther',
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
//             flex:1,
//             sortable: true,
//             dataIndex: 'text'
//         },  {
//             //we must use the templateheader component so we can use a custom tpl
//             xtype: 'numbercolumn',
//             align:'right',
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
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccListReconcileOther')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
//                             console.log(selectedRecord);
                            
//                             Ext.getCmp('accnameRecOther').setValue(selectedRecord.get('accnumber')+'   '+selectedRecord.get('text'));
//                             Ext.getCmp('idaccountRecOther').setValue(selectedRecord.get('id'));

//                             Ext.getCmp('memoRecOther').setValue(selectedRecord.get('text'));

//                             Ext.getCmp('windowPopupAccListReconcileOther').hide();
                            
//                             updateSelisih();
//                         }


//                     }
//                 },'->',
//                 {
//                     xtype: 'textfield',
//                     blankText:'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccListReconcileOther').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccListReconcileOther').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccListReconcileOther');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccListReconcileOther').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 Ext.getCmp('GridTreeAccListReconcileOther').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccListReconcileOther = Ext.create('widget.window', {
//     id: 'windowPopupAccListReconcileOther',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     autoWidth: true,
//      minWidth: 750,
//             height: 550,
//     x: 300,
//     y: 50,
//     layout: 'fit',
//     border: false,
//     title: 'Daftar Akun',
//     items: [
//         Ext.create('Ext.panel.Panel', {
//             bodyPadding: 5,  // Don't want content to crunch against the borders
//             width: 500,
//             height: 300,
//             layout:'fit',
// //            id: 'tabAccTreeLinked',
//             items: [{
//                 xtype: 'GridTreeAccListReconcileOther'
//             }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccListReconcileOther = Ext.getCmp('windowPopupAccListReconcileOther');
//                 windowPopupAccListReconcileOther.hide();
//             }
//         }]
// });

Ext.define('GridAccReconcileOther', {
    itemId: 'GridAccReconcileOther',
    id: 'GridAccReconcileOther',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccReconcileOther',
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
               setValueAcc(selectedRecord,'wAccReconcileOtherPopup','RecOther');
               updateSelisih();
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
                        var grid = Ext.ComponentQuery.query('GridAccReconcileOther')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {
                            
                            setValueAcc(selectedRecord,'wAccReconcileOtherPopup','RecOther');
                            updateSelisih();
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

var wAccReconcileOtherPopup = Ext.create('widget.window', {
    id: 'wAccReconcileOtherPopup',
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
            xtype:'GridAccReconcileOther'
    }]
});

