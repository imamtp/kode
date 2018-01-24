Ext.define('ActiveMemberOpenAccountListGridModel', {
    extend: 'Ext.data.Model',
    fields: ['id_member', 'idunit', 'no_member', 'namaunit', 'id_type', 'no_id', 'member_name', 'address', 'telephone', 'handphone', 'email', 'website', 'postcode', 'birth_location', 'birth_date', 'pin', 'photo_image', 'sign_image', 'notes', 'marital_status', 'nama_ibu_kandung', 'nama_ahli_waris', 'no_id_ahli_waris', 'lahir_ahli_waris', 'hubungan_ahli_waris', 'notlp_ahli_waris', 'no_rekening', 'nama_rekening', 'nama_bank', 'approved_by', 'activated_date', 'status', 'is_staff', 'datein'],
    idProperty: 'id'
});
var storeActiveMemberOpenAccountListGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ActiveMemberOpenAccountListGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/AnggotaGrid/member',
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

Ext.define('GridMemberListOpeningAccount', {
    extend: 'Ext.grid.Panel',
    id:'GridMemberListOpeningAccount',
    alias: 'widget.GridMemberListOpeningAccount',
    store: storeActiveMemberOpenAccountListGrid,
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
                Ext.getCmp('id_member_FormOpeningAccount').setValue(selectedRecord.data.id_member);
                Ext.getCmp('member_name_FormOpeningAccount').setValue(selectedRecord.data.member_name);
                Ext.getCmp('no_member_FormOpeningAccount').setValue(selectedRecord.data.no_member);

                Ext.getCmp('WindowMemberListOpeningAccount').hide();

            }
        },
        {
            header: 'id_member',
            dataIndex: 'id_member',
            hidden: true
        }, {
            header: 'No Anggota',
            dataIndex: 'no_member',
            minWidth: 150
        }, {
            header: 'Nama',
            flex: 1,
            dataIndex: 'member_name',
            minWidth: 150
        }, {
            header: 'No Identitas',
            dataIndex: 'no_id',
            minWidth: 150
        }, {
            header: 'Alamat',
            dataIndex: 'address',
            minWidth: 150
        }, {
            header: 'Tgl Lahir',
            dataIndex: 'birth_date',
            minWidth: 150
        }, {
            header: 'Tempat Lahir',
            dataIndex: 'birth_location',
            minWidth: 150
        }, {
            header: 'No Handphone',
            dataIndex: 'handphone',
            minWidth: 150
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
        store: storeActiveMemberOpenAccountListGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }]
});

Ext.define(dir_sys + 'saving.WindowMemberListOpeningAccount', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowMemberListOpeningAccount',
    id: 'WindowMemberListOpeningAccount',
    title: 'Pilih Anggota',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,
    autoDestroy: false,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridMemberListOpeningAccount'
    }]
});