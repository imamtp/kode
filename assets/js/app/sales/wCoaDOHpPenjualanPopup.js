//acc list
Ext.define('GridCOAHpPenjualanDOSalesPopup', {
    itemId: 'GridCOAHpPenjualanDOSalesPopup',
    id: 'GridCOAHpPenjualanDOSalesPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCOAHpPenjualanDOSalesPopup',
    store: storeGridAccount,
    loadMask: true,
    columns: [{
            text: 'Edit',
            width: 55,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                setValueAcc(selectedRecord, 'wCoaDOHpPenjualanPopup', '_coa_hppenjualan_do');
            }
        },
        { header: 'idaccount', dataIndex: 'idaccount', hidden: true },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'No Akun', dataIndex: 'accnumber', },
        { header: 'Nama Akun', dataIndex: 'accname', minWidth: 150, flex: 1 },
        { header: 'Saldo', dataIndex: 'balance', minWidth: 150, xtype: 'numbercolumn', align: 'right', hidden: true },
        { header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170 },
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ],
    dockedItems: [{
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
    }]
});

Ext.define(dir_sys + 'sales.wCoaDOHpPenjualanPopup', {
    extend: 'Ext.window.Window',
    id: 'wCoaDOHpPenjualanPopup',
    alias: 'widget.wCoaDOHpPenjualanPopup',
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
        xtype: 'GridCOAHpPenjualanDOSalesPopup'
    }]
});