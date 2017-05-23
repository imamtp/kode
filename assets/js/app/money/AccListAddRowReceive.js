// Ext.define('GridTreeAccReceive', {
//     title: 'Daftar Akun',
//     // selModel : smGridIP,   
//     itemId: 'GridTreeAccReceive',
//     id: 'GridTreeAccReceive',
//     extend: 'Ext.tree.Panel',
//     alias: 'widget.GridTreeAccReceive',
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
//                     itemId: 'PilihAccReceive',
//                     text: 'Pilih Akun',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.ComponentQuery.query('GridTreeAccReceive')[0];
//                         var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                         var data = grid.getSelectionModel().getSelection();
//                         if (data.length == 0)
//                         {
//                             Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
//                         } else {
// //                            console.log(selectedRecord);
//                             Ext.getCmp('accnameReceiveAdd').setValue(selectedRecord.get('text'));
//                             Ext.getCmp('idaccountReceiveAdd').setValue(selectedRecord.get('id'));
//                             Ext.getCmp('accnumberReceiveAdd').setValue(selectedRecord.get('accnumber'));

//                             Ext.getCmp('windowPopupAccReceive').hide();
//                         }


//                     }
//                 },'->',
//                 {
//                     xtype: 'textfield',
//                     id: 'searchAccReceive',
//                     blankText:'Cari akun disini',
//                     listeners: {
//                         specialkey: function(f, e) {
//                             if (e.getKey() == e.ENTER) {
//                                 storeAccountAktive.load({
//                                     params: {
//                                         'accname': Ext.getCmp('searchAccReceive').getValue(),
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
//                                 'accname': Ext.getCmp('searchAccReceive').getValue(),
//                             }
//                         });
//                     }
//                 }, '-', {
//                     itemId: 'reloadDataAccReceive',
//                     text: 'Refresh',
//                     iconCls: 'add-icon',
//                     handler: function() {
//                         var grid = Ext.getCmp('GridTreeAccReceive');
//                         grid.getView().refresh();
//                         storeAccountAktive.load();
//                         Ext.getCmp('searchAccReceive').setValue(null)
//                     }
//                 }]
//         }
//     ]
//     , listeners: {
//         render: {
//             scope: this,
//             fn: function(grid) {
//                 Ext.getCmp('GridTreeAccReceive').expandAll();
//             }
//         }
//     }
// });

// var windowPopupAccReceive = Ext.create('widget.window', {
//     id: 'windowPopupAccReceive',
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
//             id: 'tabAccTreeReceive',
//             items: [{
//                 xtype: 'GridTreeAccReceive'
//             }]
//         })
//     ],
//     buttons: [{
//             text: 'Tutup',
//             handler: function() {
//                 var windowPopupAccReceive = Ext.getCmp('windowPopupAccReceive');
//                 windowPopupAccReceive.hide();
//             }
//         }]
// });


////////////

Ext.define('GridAccReceiveAddRow', {
    itemId: 'GridAccReceiveAddRow',
    id: 'GridAccReceiveAddRow',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccReceiveAddRow',
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
                    Ext.getCmp('accnameReceiveAdd').setValue(selectedRecord.get('accname'));
                    Ext.getCmp('idaccountReceiveAdd').setValue(selectedRecord.get('idaccount'));
                    Ext.getCmp('accnumberReceiveAdd').setValue(selectedRecord.get('accnumber'));

                    Ext.getCmp('wAccReceiveAddRowPopup').hide();
            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 150},
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
                        var grid = Ext.ComponentQuery.query('GridAccReceiveAddRow')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                        } else {

                             Ext.getCmp('accnameReceiveAdd').setValue(selectedRecord.get('accname'));
                            Ext.getCmp('idaccountReceiveAdd').setValue(selectedRecord.get('idaccount'));
                            Ext.getCmp('accnumberReceiveAdd').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('wAccReceiveAddRowPopup').hide();
                            
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

var wAccReceiveAddRowPopup = Ext.create('widget.window', {
    id: 'wAccReceiveAddRowPopup',
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
            xtype:'GridAccReceiveAddRow'
    }]
});