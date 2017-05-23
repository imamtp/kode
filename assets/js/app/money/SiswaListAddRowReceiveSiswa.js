Ext.define('MoneyReceiveSiswaGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idMoneyReceiveSiswa','idsiswa', 'noinduk', 'namasiswa', 'namaayah', 'namaibu', 'alamat', 'kota', 'phone', 'tglmasuk', 'tahunajaranmasuk', 'foto', 'namaunit'],
    idProperty: 'id'
});

var storeMoneyReceiveSiswaGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'MoneyReceiveSiswaGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SiswaGrid',
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

Ext.define('MY.searchMoneyReceiveSiswaGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchMoneyReceiveSiswaGrid',
    store: storeMoneyReceiveSiswaGrid,
    width: 180
});
var smMoneyReceiveSiswaGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smMoneyReceiveSiswaGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMoneyReceiveSiswaGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMoneyReceiveSiswaGrid').enable();
        }
    }
});
Ext.define('MoneyReceiveSiswaGrid', {
//    title: 'Daftar Siswa',
    itemId: 'MoneyReceiveSiswaGridID',
    id: 'MoneyReceiveSiswaGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.MoneyReceiveSiswaGrid',
    store: storeMoneyReceiveSiswaGrid,
    loadMask: true,
    columns: [
        {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Siswa',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                Ext.getCmp('namasiswaReceiveSiswaAdd').setValue(selectedRecord.get('namasiswa'));
                Ext.getCmp('noindukReceiveSiswaAdd').setValue(selectedRecord.get('noinduk'));
                Ext.getCmp('idsiswaReceiveSiswaAdd').setValue(selectedRecord.get('idsiswa'));
                
                Ext.getCmp('windowPopupSiswaReceive').hide();
            }
        },
        {header: 'idsiswa', dataIndex: 'idsiswa', hidden: true},
        {header: 'no induk', dataIndex: 'noinduk', minWidth: 150},
        {header: 'nama siswa', dataIndex: 'namasiswa', minWidth: 150},
        {header: 'nama ayah', dataIndex: 'namaayah', minWidth: 150},
        {header: 'nama ibu', dataIndex: 'namaibu', minWidth: 150},
        {header: 'alamat', dataIndex: 'alamat', minWidth: 150},
        {header: 'kota', dataIndex: 'kota', minWidth: 150},
        {header: 'phone', dataIndex: 'phone', minWidth: 150},
        {header: 'tgl masuk', dataIndex: 'tglmasuk', minWidth: 150},
        {header: 'nama unit', dataIndex: 'namaunit', minWidth: 150},
        {header: 'tahun ajaran masuk', dataIndex: 'tahunajaranmasuk', minWidth: 150}
    ], 
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'PilihMoneyReceiveSiswaReceive',
                    text: 'Pilih Siswa',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('MoneyReceiveSiswaGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
//                            console.log(selectedRecord);
                            Ext.getCmp('namasiswaReceiveSiswaAdd').setValue(selectedRecord.get('namasiswa'));
                            Ext.getCmp('noindukReceiveSiswaAdd').setValue(selectedRecord.get('noinduk'));
                            Ext.getCmp('idsiswaReceiveSiswaAdd').setValue(selectedRecord.get('idsiswa'));

                            Ext.getCmp('windowPopupSiswaReceive').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchMoneyReceiveSiswaReceive',
                    blankText:'Cari siswa disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeMoneyReceiveSiswaAktive.load({
                                    params: {
                                        'namasiswa': Ext.getCmp('searchMoneyReceiveSiswaReceive').getValue(),
                                    }
                                });
                            }
                        }
                    }
                }, {
//                        itemId: 'reloadDataMoneyReceiveSiswa',
                    text: 'Cari',
                    iconCls: 'add-icon'
                    , handler: function() {
                        storeMoneyReceiveSiswaAktive.load({
                            params: {
                                'namasiswa': Ext.getCmp('searchMoneyReceiveSiswaReceive').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataMoneyReceiveSiswaReceive',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeMoneyReceiveSiswaReceive');
                        grid.getView().refresh();
                        storeMoneyReceiveSiswaAktive.load();
                        Ext.getCmp('searchMoneyReceiveSiswaReceive').setValue(null)
                    }
                }]
        }
    ]
});


var windowPopupSiswaReceive = Ext.create('widget.window', {
    id: 'windowPopupSiswaReceive',
    title: 'Daftar Siswa',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    minWidth: 650,
    height: 450,
    x: 300,
    y: 50,
    layout: 'fit',
    border: false,
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,  // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout:'fit',
            id: 'MoneyReceiveSiswaGrid',
            items: [{
                xtype: 'MoneyReceiveSiswaGrid'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupSiswaReceive = Ext.getCmp('windowPopupSiswaReceive');
                windowPopupSiswaReceive.hide();
            }
        }]
});