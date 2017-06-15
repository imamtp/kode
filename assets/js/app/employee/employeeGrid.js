var employeeAccessTab = Ext.create(dir_sys + 'employee.employeeAccessTab');

var keaktifan = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'keaktifan'],
    data: [
        { "keaktifan": "Aktif" },
        { "keaktifan": "Non Aktif" },
        //...
    ]
});

var formemployeeGrid = Ext.create('Ext.form.Panel', {
    id: 'formemployeeGrid',
    title: 'Data Pribadi',
    url: SITE_URL + 'backend/saveform/employeeGrid',
    baseParams: { idmenu: 25 },
    bodyStyle: 'padding:5px',
    autoWidth: true,
    autoHeight: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        //        padding: '5 40 5 5',
        labelWidth: 160,
        width: 400
    },
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5'
    },
    items: [{
        items: [{
                xtype: 'hiddenfield',
                name: 'idemployee',
                id: 'idemployee'
            }, {
                xtype: 'hiddenfield',
                name: 'statusformemployeeGrid',
                id: 'statusformemployeeGrid'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kode Pegawai',
                allowBlank: false,
                name: 'code'
            },
            {
                xtype: 'comboxunit',
                name: 'idunit',
                id: 'unitformpegawai'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nama Panggilan',
                allowBlank: false,
                name: 'firstname'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nama Lengkap',
                allowBlank: false,
                name: 'lastname'
            }, {
                xtype: 'comboxemployee',
                allowBlank: false,
                fieldLabel: 'Jabatan',
                name: 'nametype'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Alamat',
                allowBlank: false,
                name: 'address'
            }, {
                xtype: 'textfield',
                fieldLabel: 'No Telpon',
                allowBlank: false,
                name: 'telephone'
            }, {
                xtype: 'textfield',
                fieldLabel: 'No Handphone',
                name: 'handphone'
            }, {
                xtype: 'textfield',
                fieldLabel: 'No Fax',
                name: 'fax'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Email',
                name: 'email'
            }
        ]
    }, {
        items: [{
                xtype: 'textfield',
                fieldLabel: 'Website',
                name: 'website'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kota',
                name: 'city'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Provinsi',
                name: 'state'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kode POS',
                name: 'postcode'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Negara',
                name: 'country'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Catatan',
                name: 'notes'
            }, {
                xtype: 'comboxjenisptkp',
                allowBlank: false
            }, Ext.create('Ext.form.field.ComboBox', {
                fieldLabel: 'Status Keaktifan',
                displayField: 'keaktifan',
                queryMode: 'local',
                id: 'keaktifan',
                name: 'keaktifan',
                editable: false,
                triggerAction: 'all',
                valueField: 'keaktifan',
                allowBlank: false,
                store: keaktifan
            }),
            {
                xtype: 'datefield',
                format: "Y-m-d",
                fieldLabel: 'Tanggal Masuk',
                allowBlank: false,
                name: 'pegawaitglmasuk'
            },
            {
                xtype: 'datefield',
                format: "Y-m-d",
                fieldLabel: 'Tanggal Resign',
                name: 'tglresign'
            }
        ]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupemployeeGrid');
            Ext.getCmp('formemployeeGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnemployeeGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {

                        Ext.Msg.alert('Success', action.result.message);

                        Ext.getCmp('formemployeeGrid').getForm().reset();
                        Ext.getCmp('windowPopupemployeeGrid').hide();

                        storeGridemployeeGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridemployeeGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});


Ext.define('TabPegawai', {
    extend: 'Ext.tab.Panel',
    id: 'TabPegawai',
    alias: 'widget.TabPegawai',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    listeners: {
        render: function() {
            // alert('a');
            this.items.each(function(i) {
                i.tab.on('click', function() {
                    // alert('as');
                    var grid = Ext.ComponentQuery.query('GridemployeeGrid')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    if (i.title == 'Tambahan Gaji') {
                        storeGridTambahanGajiGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });
                        storeGridTambahanGajiGrid.load();
                    } else if (i.title == 'Tunjangan') {
                        storeGridTunjanganGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });

                        storeGridTunjanganGrid.load();
                    } else if (i.title == 'Potongan') {
                        storeGridPotonganGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });
                        storeGridPotonganGrid.load();
                    } else if (i.title == 'Asuransi') {
                        storeAsuransiEmpGrid.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idemployee:' + selectedRecord.data.idemployee
                            };
                        });
                        storeAsuransiEmpGrid.load();
                    } else if (i.title == 'Akses Aplikasi') {
                        Ext.Ajax.request({
                            url: SITE_URL + 'pegawai/get_user_akses',
                            method: 'GET',
                            params: {
                                idemployee: Ext.getCmp('idemployee').getValue()
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                Ext.getCmp('is_login_empAccess').setValue({ is_login: d.is_login });
                                Ext.getCmp('group_id_empAccess').setValue(d.group_id);
                                Ext.getCmp('user_id_empAccess').setValue(d.user_id);
                                Ext.getCmp('username_empAccess').setValue(d.username);
                                Ext.getCmp('password_empAccess').setValue(d.password);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    }
                });
            });
        }
    },
    items: [
        formemployeeGrid,
        {
            xtype: 'GridTambahanGajiGrid',
            id: 'GridTambahanGajiGrid'
        },
        {
            xtype: 'GridTunjanganGrid',
            id: 'GridTunjanganGrid'
        },
        {
            xtype: 'GridPotonganGrid',
            id: 'GridPotonganGrid'
        },
        // {
        //     xtype:'GridSutriGrid'
        // },
        // {
        //     xtype:'GridAnakGrid'
        // },
        {
            xtype: 'AsuransiEmpGrid',
            id: 'AsuransiEmpGrid'
        },
        employeeAccessTab
    ]
});

var wemployeeGrid = Ext.create('widget.window', {
    id: 'windowPopupemployeeGrid',
    title: 'Data Pegawai',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    modal: true,
    //    autoWidth: true,
    width: 870,
    //    autoHeight: true,
    height: 490,
    layout: 'fit',
    border: false,
    //    items: [formemployeeGrid]
    items: [
        { xtype: 'TabPegawai' }
    ]
});

Ext.define('GridemployeeGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idemployee', 'code', 'firstname', 'pegawaitglmasuk', 'lastname', 'address', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'notes', 'nametype'],
    idProperty: 'id'
});

var storeGridemployeeGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridemployeeGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/employeeGrid',
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




Ext.define('MY.searchGridemployeeGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridemployeeGrid',
    store: storeGridemployeeGrid,
    width: 180
});

var smGridemployeeGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridemployeeGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteemployeeGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteemployeeGrid').enable();
        }
    }
});

Ext.define('GridemployeeGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridemployeeGrid,
    //    title: 'Daftar Pegawai',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridemployeeGridID',
    id: 'GridemployeeGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridemployeeGrid',
    store: storeGridemployeeGrid,
    loadMask: true,
    columns: [
        { header: 'idemployee', dataIndex: 'idemployee', hidden: true },
        { header: 'Kode Pegawai', dataIndex: 'code', minWidth: 150 },
        { header: 'Nama Panggilan', dataIndex: 'firstname', minWidth: 150 },
        { header: 'Nama Lengkap', dataIndex: 'lastname', minWidth: 150 },
        { header: 'Tipe Pegawai', dataIndex: 'nametype', minWidth: 150 },
        { header: 'address', dataIndex: 'address', minWidth: 150 },
        { header: 'telephone', dataIndex: 'telephone', minWidth: 150 },
        { header: 'handphone', dataIndex: 'handphone', minWidth: 150 },
        { header: 'fax', dataIndex: 'fax', minWidth: 150 },
        { header: 'email', dataIndex: 'email', minWidth: 150 },
        { header: 'website', dataIndex: 'website', minWidth: 150 },
        { header: 'city', dataIndex: 'city', minWidth: 150 },
        { header: 'state', dataIndex: 'state', minWidth: 150 },
        { header: 'post code', dataIndex: 'postcode', minWidth: 150 },
        { header: 'country', dataIndex: 'country', minWidth: 150 },
        { header: 'Tgl Masuk', dataIndex: 'pegawaitglmasuk', minWidth: 150 },
        { header: 'notes', dataIndex: 'notes', minWidth: 150 }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
                itemId: 'addemployeeGrid',
                text: 'Tambah',
                iconCls: 'add-icon',
                handler: function() {
                    wemployeeGrid.show();
                    Ext.getCmp('formemployeeGrid').getForm().reset();
                    Ext.getCmp('statusformemployeeGrid').setValue('input');
                    disabledTabEmployee(true);
                    jenisptkpStore.load();
                    comboxemployeeStore.load();
                    sys_groupStore.load();

                    Ext.getCmp('TabPegawai').setActiveTab(0);

                }
            },
            {
                itemId: 'editemployeeGrid',
                text: 'Detail',
                iconCls: 'edit-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridemployeeGrid')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {
                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                        var formemployeeGrid = Ext.getCmp('formemployeeGrid');

                        formemployeeGrid.getForm().load({
                            url: SITE_URL + 'backend/loadFormData/employeeGrid/1',
                            params: {
                                extraparams: 'a.idemployee:' + selectedRecord.data.idemployee
                            },
                            success: function(form, action) {
                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                            }
                        })

                        wemployeeGrid.show();
                        Ext.getCmp('statusformemployeeGrid').setValue('edit');

                        dataGaji(selectedRecord.data.idemployee)

                        disabledTabEmployee(false);

                        Ext.getCmp('TabPegawai').setActiveTab(0);

                        sys_groupStore.load();
                    }

                }
            }, {
                id: 'btnDeleteemployeeGrid',
                text: 'Hapus',
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridemployeeGrid')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'backend/ext_delete/employeeGrid',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected),
                                        idmenu: 25
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            storeGridemployeeGrid.load();
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
            }, '->',
            {
                text: 'Import Pegawai',
                iconCls: 'page_excel',
                handler: function() {
                    winImportPegawai.show();
                }
            },
            {
                text: 'Import Tunjangan',
                iconCls: 'page_excel',
                handler: function() {
                    winImportTunjangan.show();
                }
            },
            {
                text: 'Import Potongan',
                iconCls: 'page_excel',
                handler: function() {
                    winImportPotongan.show();
                }
            },
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridemployeeGrid',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridemployeeGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridemployeeGrid.load();

            }
        },
        itemclick: function(dv, record, item, index, e) {
            //            console.log(record.data.idsiswa)

            storePayrollHistoryGrid.on('beforeload', function(store, operation, eOpts) {
                operation.params = {
                    'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
                    'extraparams': 'a.idemployee:' + record.data.idemployee
                }
            });
            storePayrollHistoryGrid.load();
            //            storePayrollHistoryGrid.load({
            //                            params: {
            //                                'bulantahunpenggajian': Ext.getCmp('PayrollHistoryPeriod').getValue(),
            //                                'extraparams': 'a.idemployee:' + record.data.idemployee
            //                            }
            //                        });
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formemployeeGrid = Ext.getCmp('formemployeeGrid');
            wemployeeGrid.show();

            formemployeeGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/employeeGrid/1',
                params: {
                    extraparams: 'a.idemployee:' + record.data.idemployee
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

            dataGaji(record.data.idemployee)
                //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformemployeeGrid').setValue('edit');

            disabledTabEmployee(false);
        }
    }
});

function dataGaji(idemployee) {
    //tab gaji
    Ext.getCmp('formGridSalary').getForm().load({
        url: SITE_URL + 'backend/loadFormData/gridsalary/1/employee',
        params: {
            extraparams: 'a.idemployee:' + idemployee
        },
        success: function(form, action) {
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
        },
        failure: function(form, action) {
            //            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })
}


Ext.define('TabPortDetailPegawai', {
    extend: 'Ext.tab.Panel',
    id: 'TabPortDetailPegawai',
    alias: 'widget.TabPortDetailPegawai',
    activeTab: 0,
    autoWidth: '100%',
    items: [{
        xtype: 'PayrollHistoryGrid'
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {

            }
        }
    }
});


Ext.define('PortPegawai', {
    extend: 'Ext.Panel',
    alias: 'widget.PortPegawai',
    layout: 'border',
    bodyBorder: false,
    defaults: {
        // collapsible: true,
        split: true
    },
    items: [{
        region: 'south',
        flex: 1,
        //        minHeight: heightPort,
        xtype: 'TabPortDetailPegawai'
            //        html: 'Footer content'
    }, {
        id: 'panelDaftarPegawai',
        title: 'Daftar Pegawai',
        // flex: 2,
        listeners: {
            collapse: function() {
                // console.log('colapse')
                Ext.getCmp('panelDaftarPegawai').setTitle('Data ');
            },
            expand: function() {
                Ext.getCmp('panelDaftarPegawai').setTitle('Daftar Siswa');
            }
        },
        collapsible: true,
        region: 'center',
        items: [{
            // height: tinggiPort - 120,
            height: (sizeH - 30) / 2,
            xtype: 'GridemployeeGrid'
        }]
    }]
});

function disabledTabEmployee(mode) {
    // if(mode)
    // {
    Ext.getCmp('GridTambahanGajiGrid').setDisabled(mode);
    Ext.getCmp('GridTunjanganGrid').setDisabled(mode);
    Ext.getCmp('GridPotonganGrid').setDisabled(mode);
    Ext.getCmp('AsuransiEmpGrid').setDisabled(mode);
    Ext.getCmp('employeeAccessTab').setDisabled(mode);
    // } else {

    // }
}