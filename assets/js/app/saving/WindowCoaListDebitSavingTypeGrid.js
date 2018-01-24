Ext.define('GridCoaListDebitSavingTypeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCoaListDebitSavingTypeGrid',
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
               Ext.getCmp('accname_debitSavingTypeGrid').setValue(selectedRecord.data.accname);
               Ext.getCmp('accnumber_debitSavingTypeGrid').setValue(selectedRecord.data.accnumber);
               Ext.getCmp('idaccount_debitSavingTypeGrid').setValue(selectedRecord.data.idaccount);

               Ext.getCmp('WindowCoaListDebitSavingTypeGrid').hide();
            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ],
    listeners: {
        itemdblclick: function(dv, record, item, index, e) {
            setValueAcc2(record.data.accname,record.data.accnumber,record.data.idaccount,'WindowCoaListDebitSavingTypeGrid','_debitSavingTypeGrid')
           // 
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
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

Ext.define(dir_sys+'saving.WindowCoaListDebitSavingTypeGrid', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowCoaListDebitSavingTypeGrid',
    id:'WindowCoaListDebitSavingTypeGrid',
    title: 'Pilih Akun Debet',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    closeAction: 'hide',
//    autoWidth: true,
    width: 660,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridCoaListDebitSavingTypeGrid'
    }]
});