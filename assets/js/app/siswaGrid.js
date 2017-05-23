
var formSiswaGrid = Ext.create('Ext.form.Panel', {
    id: 'formSiswaGrid',
    width: 450,
    height: 370,
    url: SITE_URL + 'backend/saveform/SiswaGrid',
    baseParams: {idmenu:26},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'statusformSiswaGrid',
        id: 'statusformSiswaGrid'
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idsiswa',
        name: 'idsiswa'
    }, {
        xtype: 'textfield',
        fieldLabel: 'No Induk',
        allowBlank: false,
        name: 'noinduk'
    }, {
        xtype: 'comboxunit',
        allowBlank: false,
        name: 'namaunit'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nama Siswa',
        allowBlank: false,
        name: 'namasiswa'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nama Ibu',
        //            allowBlank: false,
        name: 'namaibu'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nama Ayah',
        //            allowBlank: false,
        name: 'namaayah'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Alamat',
        //            allowBlank: false,
        name: 'alamat'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Kota',
        //            allowBlank: false,
        name: 'kota'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Telepon',
        //            allowBlank: false,
        name: 'phone'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Kelas',
        //            allowBlank: false,
        name: 'kelas'
    }, {
        xtype: 'datefield',
        fieldLabel: 'Tgl Masuk',
        format: 'd/m/Y',
        name: 'tglmasuk'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Tahun Ajaran Masuk',
        //            allowBlank: false,
        name: 'tahunajaranmasuk'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupSiswaGrid');
            Ext.getCmp('formSiswaGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnSiswaGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formSiswaGrid').getForm().reset();
                        Ext.getCmp('windowPopupSiswaGrid').hide();
                        storeGridSiswaGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridSiswaGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wSiswaGrid = Ext.create('widget.window', {
    id: 'windowPopupSiswaGrid',
    title: 'Data Siswa',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSiswaGrid]
});
Ext.define('GridSiswaGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idsiswa', 'noinduk', 'namasiswa', 'namaayah', 'namaibu', 'alamat', 'kota', 'phone', 'tglmasuk', 'tahunajaranmasuk', 'foto', 'namaunit'],
    idProperty: 'id'
});
var storeGridSiswaGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSiswaGridModel',
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
Ext.define('MY.searchGridSiswaGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSiswaGrid',
    store: storeGridSiswaGrid,
    width: 180
});
var smGridSiswaGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSiswaGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSiswaGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSiswaGrid').enable();
        }
    }
});
Ext.define('GridSiswaGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridSiswaGrid,
    // title: 'Daftar Siswa',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridSiswaGridID',
    id: 'GridSiswaGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSiswaGrid',
    store: storeGridSiswaGrid,
    loadMask: true,
    columns: [{
        header: 'idsiswa',
        dataIndex: 'idsiswa',
        hidden: true
    }, {
        header: 'no induk',
        dataIndex: 'noinduk',
        minWidth: 150
    }, {
        header: 'nama siswa',
        dataIndex: 'namasiswa',
        minWidth: 150
    }, {
        header: 'nama ayah',
        dataIndex: 'namaayah',
        minWidth: 150
    }, {
        header: 'nama ibu',
        dataIndex: 'namaibu',
        minWidth: 150
    }, {
        header: 'alamat',
        dataIndex: 'alamat',
        minWidth: 150
    }, {
        header: 'kota',
        dataIndex: 'kota',
        minWidth: 150
    }, {
        header: 'phone',
        dataIndex: 'phone',
        minWidth: 150
    }, {
        header: 'tgl masuk',
        dataIndex: 'tglmasuk',
        minWidth: 150
    }, {
        header: 'nama unit',
        dataIndex: 'namaunit',
        minWidth: 150
    }, {
        header: 'tahun ajaran masuk',
        dataIndex: 'tahunajaranmasuk',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addSiswaGrid',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wSiswaGrid.show();
                Ext.getCmp('statusformSiswaGrid').setValue('input');
            }
        }, {
            itemId: 'editSiswaGrid',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridSiswaGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formSiswaGrid = Ext.getCmp('formSiswaGrid');
                    formSiswaGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/SiswaGrid/1',
                        params: {
                            extraparams: 'a.idtax:' + selectedRecord.data.idtax
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wSiswaGrid.show();
                    Ext.getCmp('statusformSiswaGrid').setValue('edit');
                }
            }
        }, {
            id: 'btnDeleteSiswaGrid',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridSiswaGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/SiswaGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:26
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                         storeGridSiswaGrid.load();
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                           
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->',{
            text: 'Import Data Siswa',
            iconCls: 'page_excel',
            handler: function() {
                winImportSiswa.show();
            }
        }, 'Pencarian: ', ' ', {
            xtype: 'searchGridSiswaGrid',
            text: 'Left Button',
            listeners: {
            specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        // Ext.getCmp('GridSiswaGridID').getStore().resetStartParam();
                        Ext.getCmp('GridSiswaGridID').getStore().getProxy().pageParam =1;
                        Ext.getCmp('GridSiswaGridID').getStore().getProxy().startParam =0;
                    }
                }
            } 
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSiswaGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSiswaGrid.load();
            }
        },
        itemclick: function(dv, record, item, index, e) {
//            console.log(record.data.idsiswa)
            storeGridHistoryPembayaranSiswa.load({
                            params: {
                                'extraparams': 'a.idsiswa:'+record.data.idsiswa
                            }
                        });
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formSiswaGrid = Ext.getCmp('formSiswaGrid');
            wSiswaGrid.show();
            formSiswaGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/SiswaGrid/1',
                params: {
                    extraparams: 'a.idsiswa:' + record.data.idsiswa
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
            Ext.getCmp('statusformSiswaGrid').setValue('edit');
        }
    }
});

Ext.define('TabPortDetailSiswa', {
    extend: 'Ext.tab.Panel',
    id: 'TabPortDetailSiswa',
    alias: 'widget.TabPortDetailSiswa',
    activeTab: 0,
    autoWidth: '100%',
//    autoScroll: true,
//    defaults: {
//        autoScroll: true
//    },
    items: [
        {
            xtype: 'GridHistoryPembayaranSiswa'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {

            }
        }
    }
});



Ext.define('PortSiswa', {
    extend: 'Ext.Panel',
    alias: 'widget.PortSiswa',
    layout: 'border',
    bodyBorder: false,
    defaults: {
        // collapsible: true,
        split: true
    },
    items: [
    {
        region: 'south',
        flex: 1,
//        minHeight: heightPort,
        xtype:'TabPortDetailSiswa'
//        html: 'Footer content'
    }, {
        id:'panelDaftarSiswa',
        title: 'Daftar Siswa',
        // flex: 2,
        listeners: {
            collapse: function() {
                // console.log('colapse')
                Ext.getCmp('panelDaftarSiswa').setTitle('Data ');
            },
            expand: function() {
                Ext.getCmp('panelDaftarSiswa').setTitle('Daftar Siswa');
            }
        },
        collapsible: true,
        region: 'center',
        items: [{
            height: tinggiPort-180,
            xtype: 'GridSiswaGrid'
        }]
    }]
});
