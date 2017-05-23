//acc list
Ext.define('GridAccReturnSaveCOA', {
    itemId: 'GridAccReturnSaveCOA',
    id: 'GridAccReturnSaveCOA',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccReturnSaveCOA',
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
               setValueAcc(selectedRecord,'wAccReturnSalesCOAPopup','_coa_sales_return');
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

Ext.define(dir_sys + 'sales.wAccReturnSalesCOAPopup', {
    extend: 'Ext.window.Window',
    id: 'wAccReturnSalesCOAPopup',
    alias: 'widget.wAccReturnSalesCOAPopup',
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
            xtype:'GridAccReturnSaveCOA'
    }]
});

// var wAccReturnSalesCOAPopup = Ext.create('widget.window', {
//     id: 'wAccReturnSalesCOAPopup',
//     title: 'Pilih Akun',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
// //    autoWidth: true,
//     width: 660,
//     height: panelHeight,
//     layout: 'fit',
//     border: false,
//     items: [{
//             xtype:'GridAccReturnSaveCOA'
//     }]
// });
//END LIST ACC TUJUAN