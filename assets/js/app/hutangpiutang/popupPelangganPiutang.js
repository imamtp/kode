Ext.define('GridpopupPelangganPiutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelanggan','nama','namaperusahaan','pelanggantype','jabatan','npwp','telpon1','telpon2','fax','hp','email','website','alamat','kota','kodepos','pengiriman','negara','foto','catatan','namaunit'],
    idProperty: 'id'
});
var storeGridpopupPelangganPiutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridpopupPelangganPiutangModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PelangganGrid',
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
Ext.define('MY.searchGridpopupPelangganPiutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridpopupPelangganPiutang',
    store: storeGridpopupPelangganPiutang,
    width: 180
});
var smGridpopupPelangganPiutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridpopupPelangganPiutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletepopupPelangganPiutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletepopupPelangganPiutang').enable();
        }
    }
});

Ext.define('GridpopupPelangganPiutang', {
    itemId: 'GridpopupPelangganPiutangID',
    id: 'GridpopupPelangganPiutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridpopupPelangganPiutang',
    store: storeGridpopupPelangganPiutang,
    loadMask: true,
    columns: [{
        header: 'idpelanggan',
        dataIndex: 'idpelanggan',
        hidden: true
    }, {
        header: 'Nama',
        dataIndex: 'nama',
        minWidth: 150
    }, {
        header: 'Nama Perusahaan',
        dataIndex: 'namaperusahaan',
        minWidth: 150
    }, {
        header: 'Jenis',
        dataIndex: 'pelanggantype',
        minWidth: 150
    }, {
        header: 'Jabatan',
        dataIndex: 'jabatan',
        minWidth: 150
    }, {
        header: 'No Telp',
        dataIndex: 'telpon1',
        minWidth: 150
    },{
        header: 'Kota',
        dataIndex: 'kota',
        minWidth: 150
    }, {
        header: 'Alamat',
        dataIndex: 'alamat',
        minWidth: 150
    },  {
        header: 'Email',
        dataIndex: 'email',
        minWidth: 150
    }, {
        header: 'Website',
        dataIndex: 'website',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
        {
            itemId: 'pilihpopupPelangganPiutang',
            text: 'Pilih Pelanggan',
            iconCls: 'tick-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridpopupPelangganPiutang')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data Pelanggan terlebih dahulu!');
                } else {
                    Ext.getCmp('idpelangganPiutangReg').setValue(selectedRecord.data.idpelanggan);
                    Ext.getCmp('namapelangganPiutangReg').setValue(selectedRecord.data.nama);
                    Ext.getCmp('wpopupPelangganPiutang').hide();
                }
            }
        },'-',{
            itemId: 'addpopupPelangganPiutang',
            text: 'Tambah Pelanggan',
            iconCls: 'add-icon',
            handler: function() {
                 wpelangganGrid.show();
                Ext.getCmp('statusformpelangganGrid').setValue('input');
            }
        }
        // , {
        //     itemId: 'editpopupPelangganPiutang',
        //     text: 'Ubah',
        //     iconCls: 'edit-icon',
        //     handler: function() {
        //         var grid = Ext.ComponentQuery.query('gridPelanggan')[0];
        //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //         var data = grid.getSelectionModel().getSelection();
        //         if (data.length == 0) {
        //             Ext.Msg.alert('Failure', 'Pilih data pelanggan terlebih dahulu!');
        //         } else {
        //             //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
        //             var formpelangganGrid = Ext.getCmp('formpelangganGrid');
        //             formpelangganGrid.getForm().load({
        //                 url: SITE_URL + 'backend/loadFormData/pelangganGrid/1',
        //                 params: {
        //                     extraparams: 'a.idpelanggan:' + selectedRecord.data.idpelanggan
        //                 },
        //                 success: function(form, action) {
        //                     // Ext.Msg.alert("Load failed", action.result.errorMessage);
        //                 },
        //                 failure: function(form, action) {
        //                     Ext.Msg.alert("Load failed", action.result.errorMessage);
        //                 }
        //             })
        //             wpelangganGrid.show();
        //             Ext.getCmp('statusformpelangganGrid').setValue('edit');
        //             Ext.getCmp('Tabpelanggan').setActiveTab(0);
        //         }
        //     }
        // }, {
        //     id: 'btnDeletepopupPelangganPiutang',
        //     text: 'Hapus',
        //     iconCls: 'delete-icon',
        //     handler: function() {
        //         Ext.Msg.show({
        //             title: 'Confirm',
        //             msg: 'Delete Selected ?',
        //             buttons: Ext.Msg.YESNO,
        //             fn: function(btn) {
        //                 if (btn == 'yes') {
        //                     var grid = Ext.ComponentQuery.query('gridPelanggan')[0];
        //                      var sm = grid.getSelectionModel();
        //                     selected = [];
        //                     Ext.each(sm.getSelection(), function(item) {
        //                         selected.push(item.data[Object.keys(item.data)[0]]);
        //                     });
        //                     Ext.Ajax.request({
        //                         url: SITE_URL + 'backend/ext_delete/PelangganGrid',
        //                         method: 'POST',
        //                         params: {
        //                             postdata: Ext.encode(selected)
        //                         }
        //                     });
        //                     storeGridPelangganGrid.remove(sm.getSelection());
        //                     sm.select(0);
        //                 }
        //             }
        //         });
        //     },
        //     //                    disabled: true
        // }
        ,'->', 'Pencarian: ', ' ', {
            xtype: 'searchGridpopupPelangganPiutang',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridpopupPelangganPiutang, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridpopupPelangganPiutang.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formpopupPelangganPiutang = Ext.getCmp('formpopupPelangganPiutang');
            wpopupPelangganPiutang.show();
            formpopupPelangganPiutang.getForm().load({
                url: SITE_URL + 'backend/loadFormData/popupPelangganPiutang/1',
                params: {
                    extraparams: 'a.idPelanggan:' + record.data.idPelanggan
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            //            
            //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformpopupPelangganPiutang').setValue('edit');

            Ext.getCmp('TabPelanggan').setActiveTab(0);
        }
    }
});

var wpopupPelangganPiutang = Ext.create('widget.window', {
    id: 'wpopupPelangganPiutang',
    title: 'Pilih Pelanggan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: 670,
    minHeight:440,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'GridpopupPelangganPiutang'
    }]
});