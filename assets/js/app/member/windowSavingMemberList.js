Ext.define('GridSavingTypeMemberModel', {
    extend: 'Ext.data.Model',
    fields: ['id_saving_type', 'idunit', 'saving_name', 'saving_desc', 'saving_type', 'saving_code', 'prefix_account', 'setoran_tetap', 'konversi_persaham', 'saving_limit', 'debit_coa', 'credit_coa', 'debit_interest_coa', 'credit_interest_coa', 'interest_rate', 'interest_period', 'period_length', 'stock_saving_addition', 'status_name', 'saving_category','status'],
    idProperty: 'id'
});
var storeGridSavingTypeGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSavingTypeMemberModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SavingTypeGrid/saving',
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

Ext.define('GridSavingTypeMemberList', {
    id:'GridSavingTypeMemberList',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSavingTypeMemberList',
    store: storeGridSavingTypeGrid,
    loadMask: true,
    columns: [
    {
            text: 'Pilih',
            width: 55,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Tabungan Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                Ext.getCmp('accname_kreditSavingTypeGrid').setValue(selectedRecord.data.accname);
                Ext.getCmp('accnumber_kreditSavingTypeGrid').setValue(selectedRecord.data.accnumber);
                Ext.getCmp('idaccount_kreditSavingTypeGrid').setValue(selectedRecord.data.idaccount);

                Ext.getCmp('WindowCoaListKreditSavingTypeGrid').hide();
            }
        },
       {
            header: 'id_saving_type',
            dataIndex: 'id_saving_type',
            hidden: true
        },
        {
            header: 'Kode Simpanan',
            dataIndex: 'saving_code',
            minWidth: 130
        },
        {
            header: 'Nama Simpanan',
            flex: 1,
            dataIndex: 'saving_name',
            minWidth: 100
        },
        {
            header: 'Deskripsi',
            dataIndex: 'saving_desc',
            minWidth: 150
        }, {
            header: 'Kategori Simpanan',
            dataIndex: 'saving_category',
            minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(SavingCategoryArr, value);
            }
        },
        {
            header: 'Tipe Simpanan',
            dataIndex: 'saving_type',
            minWidth: 130,
            renderer: function(value) {
                return customColumnStatus(SavingTypeArr, value);
            }
        },
        {
            header: 'Setoran Tetap',
            align: 'right',
            xtype: 'numbercolumn',
            dataIndex: 'setoran_tetap',
            minWidth: 130
        }
    ],
    listeners: {
        itemdblclick: function(dv, record, item, index, e) {
            setValueAcc2(record.data.accname,record.data.accnumber,record.data.idaccount,'WindowCoaListKreditSavingTypeGrid','_kreditSavingTypeGrid')
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

Ext.define(dir_sys+'member.windowSavingMemberList', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowSavingMemberList',
    id:'windowSavingMemberList',
    title: 'Pilih Tabungan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    closeAction: 'hide',
//    autoWidth: true,
    width: panelW,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridSavingTypeMemberList'
    }]
});