Ext.define('GridAnggotaGridCommonModel', {
    extend: 'Ext.data.Model',
    fields: ['id_saving_type', 'idunit', 'saving_name', 'saving_desc', 'saving_type', 'saving_code', 'prefix_account', 'setoran_tetap', 'konversi_persaham', 'saving_limit', 'debit_coa', 'credit_coa', 'debit_interest_coa', 'credit_interest_coa', 'interest_rate', 'interest_period', 'period_length', 'stock_saving_addition', 'status', 'saving_category', 'status_name'],
    idProperty: 'id'
});

var storeGridSavingTypeDepositForm = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridAnggotaGridCommonModel',
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

storeGridSavingTypeDepositForm.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.status:' + 1
    };
});

Ext.define('GridSavingTypeListDepositForm', {
    extend: 'Ext.grid.Panel',
    id: 'GridSavingTypeListDepositForm',
    alias: 'widget.GridSavingTypeListDepositForm',
    store: storeGridSavingTypeDepositForm,
    loadMask: true,
    columns: [{
            text: 'Pilih Data',
            width: 85,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Data Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                // setValueAcc(selectedRecord, 'WindowCoaListSavingTypeGrid', '_savingTypeGrid');
                Ext.getCmp('id_saving_type_FormDepositForm').setValue(selectedRecord.data.id_saving_type);
                Ext.getCmp('saving_name_FormDepositForm').setValue(selectedRecord.data.saving_name);
                Ext.getCmp('no_account_FormDepositForm').setValue(getRandomInt(11111111111, 99999999999));

                Ext.getCmp('WinSavingTypeListDepositForm').hide();

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
        },
        {
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
        },
        {
            header: 'Saldo Simpanan',
            dataIndex: 'status_name',
            align: 'right',
            minWidth: 200,
            // renderer: function(value) {
            //     return customColumnStatus(StatusArr, value);
            // }
        }
    ],
    dockedItems: [{
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
        store: storeGridSavingTypeDepositForm, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }]
});

Ext.define(dir_sys + 'saving.WinSavingTypeListDepositForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.WinSavingTypeListDepositForm',
    id: 'WinSavingTypeListDepositForm',
    title: 'Pilih Simpanan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,
    autoDestroy: false,
    closeAction: 'hide',
    width: panelW,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridSavingTypeListDepositForm'
    }]
});