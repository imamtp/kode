//acc list
Ext.define('GridwCoaInventoryAdjustmentPopup', {
    itemId: 'GridwCoaInventoryAdjustmentPopup',
    id: 'GridwCoaInventoryAdjustmentPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridwCoaInventoryAdjustmentPopup',
    store: storeGridAccount,
    loadMask: true,
    columns: [{
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                setValueAcc(selectedRecord, 'wCoaInventoryAdjustment', '_coa_inv_adjs');
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

Ext.define(dir_sys + 'inventory.wCoaInventoryAdjustment', {
    extend: 'Ext.window.Window',
    id: 'wCoaInventoryAdjustment',
    alias: 'widget.wCoaInventoryAdjustment',
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
        xtype: 'GridwCoaInventoryAdjustmentPopup'
    }]
});