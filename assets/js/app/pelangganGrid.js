var formpelangganGrid = Ext.create('Ext.form.Panel', {
    id: 'formpelangganGrid',
    width: 660,
    title: 'Profil',
    height: 410,
    url: SITE_URL + 'backend/saveform/pelangganGrid',
    bodyStyle: 'padding:5px',
    baseParams: {idmenu:95},
    //    autoWidth:true,
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 120,
        width: 300
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    items: [{
        items: [{
            xtype: 'hiddenfield',
            name: 'idpelanggan',
            id: 'idpelanggan'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformpelangganGrid',
            id: 'statusformpelangganGrid'
        },{
            xtype:'comboxunit',
            allowBlank: false,
            name:'namaunit'
        },{
            xtype:'comboxpelanggantype',
            allowBlank: false
        },{
            xtype: 'textfield',
            fieldLabel: 'Nama pelanggan',
            allowBlank: false,
            name: 'nama'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama perusahaan',
            allowBlank: false,
            name: 'namaperusahaan'
        },{
            xtype: 'textfield',
            fieldLabel: 'Jabatan',
            allowBlank: false,
            name: 'jabatan'
        },{
            xtype: 'textfield',
            fieldLabel: 'NPWP',
            name: 'npwp'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat',
            allowBlank: false,
            name: 'alamat'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat Pengiriman',
            name: 'pengiriman'
        }]
    }, {
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Kota',
            allowBlank: false,
            name: 'kota'
        },{
            xtype: 'textfield',
            fieldLabel: 'Kode Pos',
            name: 'kodepos'
        },{
            xtype: 'textfield',
            fieldLabel: 'Negara',
            name: 'negara'
        },{
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'No Telepon',
            name: 'telpon1'
        },{
            xtype: 'textfield',
            fieldLabel: 'No Telepon 2',
            allowBlank: false,
            name: 'telpon2'
        }, {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'Fax',
            name: 'fax'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Handphone',
            name: 'hp'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Catatan',
            name: 'Catatan'
        }]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopuppelangganGrid');
            Ext.getCmp('formpelangganGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnpelangganGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formpelangganGrid').getForm().reset();
                        Ext.getCmp('windowPopuppelangganGrid').hide();
                        storeGridpelangganGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridpelangganGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
Ext.define('Tabpelanggan', {
    extend: 'Ext.tab.Panel',
    id: 'Tabpelanggan',
    alias: 'widget.Tabpelanggan',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
     defaults: {
        // autoScroll: true,
        // bodyPadding: '1 0 15 0'
    },
    items: [
        formpelangganGrid
        // , {
        //     xtype: 'GridInventorypelanggan',
        //     listeners: {
        //         activate: function() {
        //             storeGridInventorypelanggan.load();
        //         }
        //     }
        // }
    ]
});
var wpelangganGrid = Ext.create('widget.window', {
    id: 'windowPopuppelangganGrid',
    title: 'Data pelanggan',
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
        xtype: 'Tabpelanggan'
    }]
});
Ext.define('GridpelangganGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idpelanggan','nama','namaperusahaan','pelanggantype','jabatan','npwp','telpon1','telpon2','fax','hp','email','website','alamat','kota','kodepos','pengiriman','negara','foto','catatan','namaunit'],
    idProperty: 'id'
});
var storeGridpelangganGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridpelangganGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/pelangganGrid',
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

//storeGridInventoryAll.on('beforeload',function(store, operation,eOpts){
//        operation.params={
//                    'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitPelanggan').getValue()
//                  };
//              });

Ext.define('MY.searchGridpelangganGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridpelangganGrid',
    store: storeGridpelangganGrid,
    width: 180
});
var smGridpelangganGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridpelangganGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletepelangganGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletepelangganGrid').enable();
        }
    }
});
Ext.define('gridPelanggan', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridpelangganGrid,
    title: 'Daftar Pelanggan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridpelangganGridID',
    id: 'GridpelangganGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridPelanggan',
    store: storeGridpelangganGrid,
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
    dockedItems: [
     {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'comboxunit',
                    valueField:'idunit',
                    id:'cbUnitPelanggan',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridpelangganGrid.load({
                                params: {
                                  'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitPelanggan').getValue()+','+'a.idpelanggantype:'+Ext.getCmp('cbUnitPelangganType').getValue()

                                }
                            });
                        }
                    }
                },
                {
                    xtype:'comboxpelanggantype',
                    valueField:'idpelanggantype',
                    id:'cbUnitPelangganType',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridpelangganGrid.load({
                                params: {
                                  'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitPelanggan').getValue()+','+'a.idpelanggantype:'+Ext.getCmp('cbUnitPelanggan').getValue()

                                }
                            });
                        }
                    }
                }
            ]
        },{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addpelangganGrid',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wpelangganGrid.show();
                Ext.getCmp('statusformpelangganGrid').setValue('input');
                // pelangganTypeStore.load();
            }
        }, {
            itemId: 'editpelangganGrid',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('gridPelanggan')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data pelanggan terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formpelangganGrid = Ext.getCmp('formpelangganGrid');
                    formpelangganGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/pelangganGrid/1',
                        params: {
                            extraparams: 'a.idpelanggan:' + selectedRecord.data.idpelanggan
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wpelangganGrid.show();
                    Ext.getCmp('statusformpelangganGrid').setValue('edit');
                    Ext.getCmp('Tabpelanggan').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeletepelangganGrid',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('gridPelanggan')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/pelangganGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:95
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            storeGridpelangganGrid.load();
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridpelangganGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridpelangganGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridpelangganGrid.load();
                pelangganTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formpelangganGrid = Ext.getCmp('formpelangganGrid');
            wpelangganGrid.show();
            formpelangganGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/pelangganGrid/1',
                params: {
                    extraparams: 'a.idpelanggan:' + record.data.idpelanggan
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
            Ext.getCmp('statusformpelangganGrid').setValue('edit');

            Ext.getCmp('Tabpelanggan').setActiveTab(0);
        }
    }
});