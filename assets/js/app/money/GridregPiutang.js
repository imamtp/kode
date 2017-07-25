var wCoaPenerimaanPiutang = Ext.create(dir_sys + 'money.wCoaPenerimaanPiutang');

Ext.define('GridregPiutangModel', {
    extend: 'Ext.data.Model',
    fields: ['idregistrasipiutang', 'idaccount', 'idcustomer', 'nocustomer', 'namecustomer', 'accnamepiutang', 'nama', 'tglpiutang', 'accname', 'bulan', 'tahun', 'description', 'jumlah', 'sisapiutang', 'accnumberlink', 'accnamelink', 'namaunit'],
    idProperty: 'id'
});
var storeGridregPiutang = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridregPiutangModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/regPiutang/account',
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
Ext.define('MY.searchGridregPiutang', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridregPiutang',
    store: storeGridregPiutang,
    width: 180
});
///////////////////////////////////////////////////////////////////////////////////////
//PENERIMAAN PIUTANG
Ext.define('GridTreeAccKasTerimaPiutang', {
    // title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccKasTerimaPiutang',
    id: 'GridTreeAccKasTerimaPiutang',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccKasTerimaPiutang',
    xtype: 'tree-grid',
    store: storeAccountAktive,
    loadMask: true,
    // height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    // singleExpand: true,
    expanded: true,
    columns: [{
        //we must use the templateheader component so we can use a custom tpl
        xtype: 'treecolumn',
        text: 'accnumber',
        minWidth: 200,
        sortable: true,
        dataIndex: 'accnumber'
    }, {
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Nama Akun',
        // flex: 2,
        minWidth: 400,
        sortable: true,
        dataIndex: 'text'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Pilih Akun',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridTreeAccKasTerimaPiutang')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                } else {
                    console.log(selectedRecord);
                    Ext.getCmp('accnameTerimaPiutang').setValue(selectedRecord.get('text'));
                    Ext.getCmp('idaccTerimaPiutang').setValue(selectedRecord.get('id'));
                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));
                    Ext.getCmp('windowPopupAccKasTerimaPiutang').hide();
                }
            }
        }, '->', {
            xtype: 'textfield',
            id: 'searchAccKasTerimaPiutang',
            blankText: 'Cari akun disini',
            listeners: {
                specialkey: function(f, e) {
                    if (e.getKey() == e.ENTER) {
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccKasTerimaPiutang').getValue(),
                            }
                        });
                    }
                }
            }
        }, {
            //                        itemId: 'reloadDataAcc',
            text: 'Cari',
            iconCls: 'add-icon',
            handler: function() {
                storeAccount.load({
                    params: {
                        'accname': Ext.getCmp('searchAccKasTerimaPiutang').getValue(),
                    }
                });
            }
        }, '-', {
            itemId: 'reloadDataAccKasTerimaPiutang',
            text: 'Refresh',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.getCmp('GridTreeAccKasTerimaPiutang');
                grid.getView().refresh();
                storeAccountAktive.load();
                Ext.getCmp('searchAccKasTerimaPiutang').setValue(null)
            }
        }]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // Ext.getCmp('GridTreeAccKasTerimaPiutang').expandAll();
            }
        }
    }
});
var windowPopupAccKasTerimaPiutang = Ext.create('widget.window', {
    title: 'Pilih Akun Kas Penerimaan Piutang',
    id: 'windowPopupAccKasTerimaPiutang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    minWidth: 750,
    height: 650,
    x: 300,
    y: 50,
    layout: 'fit',
    border: false,
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
            items: [{
                xtype: 'GridTreeAccKasTerimaPiutang'
            }]
        })
    ],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var windowPopupAccKasTerimaPiutang = Ext.getCmp('windowPopupAccKasTerimaPiutang');
            windowPopupAccKasTerimaPiutang.hide();
        }
    }]
});
var formPenerimaanPiutang = Ext.create('Ext.form.Panel', {
    id: 'formPenerimaanPiutang',
    width: 450,
    height: 370,
    url: SITE_URL + 'hutangpiutang/terimapiutang',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        width: 400
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'idunit',
        id: 'idunitPenerimaanPiutang',
    }, {
        xtype: 'hiddenfield',
        name: 'idregistrasipiutang'
    }, {
        xtype: 'hiddenfield',
        name: 'idcustomer',
        id: 'idcustomerPenerimaanPiutang'
    }, {
        xtype: 'textfield',
        readOnly: true,
        fieldLabel: 'Pelanggan',
        name: 'namecustomer',
        id: 'namecustomerPenerimaanPiutang'
    }, {
        xtype: 'textfield',
        readOnly: true,
        fieldLabel: 'Akun Piutang',
        name: 'accnamepiutang'
    }, {
        xtype: 'textfield',
        readOnly: true,
        fieldLabel: 'Akun Pendapatan',
        name: 'accname'
    }, {
        xtype: 'datefield',
        name: 'tglpiutang',
        format: 'Y-m-d',
        readOnly: true,
        fieldLabel: 'Tanggal Mulai Piutang'
    }, {
        xtype: 'textarea',
        readOnly: true,
        fieldLabel: 'Keterangan',
        name: 'description'
    }, {
        xtype: 'textfield',
        allowBlank: false,
        readOnly: true,
        fieldLabel: 'Jumlah Piutang',
        id: 'jumlahPenerimaanPiutang',
        name: 'jumlah',
        listeners: {
            blur: function(txt, The, eOpts) {
                this.setRawValue(renderNomor(this.getValue()));
            }
        }
    }, {
        xtype: 'textfield',
        allowBlank: false,
        readOnly: true,
        fieldLabel: 'Sisa Piutang',
        id: 'sisaPenerimaanPiutang',
        name: 'sisapiutang',
        listeners: {
            blur: function(txt, The, eOpts) {
                this.setRawValue(renderNomor(this.getValue()));
            }
        }
    }, {
        xtype: 'textfield',
        allowBlank: false,
        fieldLabel: 'Jumlah Penerimaan Piutang',
        id: 'penerimaanPiutang',
        name: 'penerimaanpiutang',
        listeners: {
            'render': function(c) {
                c.getEl().on('keyup', function() {
                    this.setRawValue(renderNomor(this.getValue()));
                    updatePenerimaanPiutang();
                }, c);
            }
        }
        // listeners: {
        //         blur: function(txt, The, eOpts) {
        //             this.setRawValue(renderNomor(this.getValue()));
        //         }
        //     }
    }, {
        xtype: 'datefield',
        name: 'tglpenerimaan',
        format: 'Y-m-d',
        fieldLabel: 'Tanggal Penerimaan'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Akun Kas Penerimaan Piutang',
        name: 'accnamekas',
        id: 'accnameTerimaPiutang',
        allowBlank: false,
        listeners: {
            render: function(component) {
                component.getEl().on('click', function(event, el) {
                    wCoaPenerimaanPiutang.show();
                    storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                        operation.params = {
                            'idunit': idunit,
                            'idaccounttype': '1,19,6,17'
                        };
                    });
                    storeGridAccount.load();
                });
            }
        }
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'idaccTerimaPiutang',
        name: 'idaccountkas',
        id: 'idaccountTerimaPiutang'
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupPenerimaanPiutang');
            Ext.getCmp('formPenerimaanPiutang').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnPenerimaanPiutangSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            var penerimaanPiutang = str_replace(".", "", Ext.getCmp('penerimaanPiutang').getValue()) * 1;
            var jumlahPenerimaanPiutang = str_replace(".", "", Ext.getCmp('jumlahPenerimaanPiutang').getValue()) * 1;
            if (penerimaanPiutang > jumlahPenerimaanPiutang) {
                Ext.Msg.alert("Error!", "Penerimaan Piutang lebih besar dari jumlah piutang...");
            } else {
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('formPenerimaanPiutang').getForm().reset();
                            Ext.getCmp('windowPopupPenerimaanPiutang').hide();
                            storeGridregPiutang.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            storeGridregPiutang.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }
    }]
});
var wPenerimaanPiutang = Ext.create('widget.window', {
    id: 'windowPopupPenerimaanPiutang',
    title: 'Penerimaan Piutang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formPenerimaanPiutang]
});
///////////////////////////////////////////////////////////////////////////////////////

Ext.define('GridAccRegPiutang', {
    itemId: 'GridAccRegPiutang',
    id: 'GridAccRegPiutang',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccRegPiutang',
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
                setValueAcc(selectedRecord, 'wAccRegPiutang', 'RegPiutang');
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
        items: [{
                text: 'Pilih Akun',
                iconCls: 'add-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridAccRegPiutang')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                    } else {

                        setValueAcc(selectedRecord, 'wAccRegPiutang', 'RegPiutang');
                    }
                }
            },
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

var wAccRegPiutang = Ext.create('widget.window', {
    id: 'wAccRegPiutang',
    title: 'Pilih Akun Piutang',
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
        xtype: 'GridAccRegPiutang'
    }]
});

//////////////GRID LIST ACC RECEIVE PIUTANG

Ext.define('GridAccRegReceivePiutang', {
    itemId: 'GridAccRegReceivePiutang',
    id: 'GridAccRegReceivePiutang',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccRegReceivePiutang',
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
                setValueAcc(selectedRecord, 'wAccRegReceivePiutang', 'RegReceivePiutang');
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
        items: [{
                text: 'Pilih Akun',
                iconCls: 'add-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridAccRegReceivePiutang')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                    } else {

                        setValueAcc(selectedRecord, 'wAccRegReceivePiutang', 'RegReceivePiutang');
                    }
                }
            },
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

var wAccRegReceivePiutang = Ext.create('widget.window', {
    id: 'wAccRegReceivePiutang',
    title: 'Pilih Akun Pendapatan',
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
        xtype: 'GridAccRegReceivePiutang'
    }]
});

var formregPiutang = Ext.create('Ext.form.Panel', {
    id: 'formregPiutang',
    width: 480,
    height: 340,
    url: SITE_URL + 'backend/saveform/regPiutang/account',
    baseParams: { idmenu: 74 },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 180,
        anchor: '100%',
        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformregPiutang',
            id: 'statusformregPiutang'
        }, {
            xtype: 'hiddenfield',
            name: 'idunit',
            id: 'idunitRegPiutang',
        }, {
            xtype: 'hiddenfield',
            name: 'idregistrasipiutang',
            id: 'idregistrasipiutang'
        }, {
            xtype: 'hiddenfield',
            name: 'idcustomer',
            id: 'idcustomerPiutangReg'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Pelanggan',
            name: 'namecustomer',
            id: 'namecustomerPiutangReg',
            allowBlank: false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wpopupPelangganPiutang.show();

                        storeGridpopupPelangganPiutang.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitAccPiutang').getValue()
                            }
                        });
                    });
                }
            }
            // listeners: {
            //     render: function(txt, The, eOpts) {
            //         component.getEl().on('click', function(event, el) {
            //             wpopupPelangganPiutang.show();
            //         });
            //     }
            // }
        },
        // {
        //     xtype:'textfield',
        //     fieldLabel:'Unit',
        //     id:'namaunitinkpiutang',
        //     name:'namaunit',
        // },
        {
            xtype: 'textfield',
            fieldLabel: 'Akun Piutang',
            name: 'accnamepiutang',
            id: 'accnameRegPiutang',
            allowBlank: false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wAccRegPiutang.show();
                        storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'idunit': Ext.getCmp('cbUnitAccPiutang').getValue(),
                                'idaccounttype': '2'
                            };
                        });
                        storeGridAccount.load();
                        // storeAccountAktive.reload({
                        //     params: {
                        //         'idunit': Ext.getCmp('cbUnitAccPiutang').getValue()
                        //     }
                        // });
                    });
                }
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Pendapatan',
            name: 'accname',
            id: 'accnameRegReceivePiutang',
            allowBlank: false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wAccRegReceivePiutang.show();
                        storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'idunit': Ext.getCmp('cbUnitAccPiutang').getValue(),
                                'idaccounttype': '12,16'
                            };
                        });
                        storeGridAccount.load();
                        // storeAccountAktive.reload({
                        //     params: {
                        //         'idunit': Ext.getCmp('cbUnitAccPiutang').getValue(),
                        //         'idaccounttype': '12,16'
                        //     }
                        // });
                    });
                }
            }
        }, {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'Jumlah Piutang',
            id: 'jumlahregpiutang',
            name: 'jumlah',
            listeners: {
                blur: function(txt, The, eOpts) {
                        this.setRawValue(renderNomor(this.getValue()));
                    }
                    // ,
                    // change: function(txt, The, eOpts){
                    //   this.setRawValue(renderNomor(this.getValue()));
                    // }
            }
        }, {
            xtype: 'datefield',
            id: 'tglpiutang',
            name: 'tglpiutang',
            format: 'Y-m-d',
            fieldLabel: 'Tanggal Mulai Piutang'
        },
        // {tglpiutang
        //     xtype:'comboxbulan'
        // },
        // {
        //     xtype:'numberfield',
        //     fieldLabel:'Tahun',
        //     id:'tahunregpiutang',
        //     name:'tahun'
        // },
        {
            xtype: 'hiddenfield',
            fieldLabel: 'idaccPiutang',
            name: 'idaccount',
            id: 'idaccountRegPiutang'
        }, {
            xtype: 'hiddenfield',
            fieldLabel: 'idaccountlink',
            name: 'idaccountlink',
            id: 'idaccountRegReceivePiutang'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Keterangan',
            name: 'description'
        },
        {
            xtype: 'radiogroup',
            hidden: true,
            fieldLabel: 'Kurangi jumlah piutang ini secara otomatis pada menu Penerimaan Kas dan Penerimaan Siswa',
            labelWidth: 350,
            // Arrange radio buttons into two columns, distributed vertically
            columns: 1,
            width: 100,
            vertical: true,
            items: [{
                boxLabel: 'Ya',
                name: 'autodecrease',
                inputValue: '1'
            }, {
                boxLabel: 'Tidak',
                name: 'autodecrease',
                inputValue: '2'
            }]
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupregPiutang');
            Ext.getCmp('formregPiutang').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnregPiutangSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formregPiutang').getForm().reset();
                        Ext.getCmp('windowPopupregPiutang').hide();
                        storeGridregPiutang.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeGridregPiutang.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});
var wregPiutang = Ext.create('widget.window', {
    id: 'windowPopupregPiutang',
    title: 'Registrasi Piutang',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    // minWidth: 450,
    // height: 450,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formregPiutang]
});
var smGridregPiutang = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridregPiutang.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteregPiutang').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteregPiutang').enable();
        }
    }
});

Ext.define(dir_sys + 'money.GridregPiutang', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridregPiutang',
    // Ext.define('GridregPiutang', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridregPiutang,
    title: 'Daftar Piutang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridregPiutangID',
    id: 'GridregPiutangID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridregPiutang',
    store: storeGridregPiutang,
    loadMask: true,
    columns: [{
            header: 'idregistrasipiutang',
            dataIndex: 'idregistrasipiutang',
            hidden: true
        }, {
            header: 'idaccount',
            dataIndex: 'idaccount',
            hidden: true
        }, {
            header: 'Unit',
            dataIndex: 'namaunit',
            minWidth: 150
        }, {
            header: 'namecustomer',
            dataIndex: 'namecustomer',
            minWidth: 150
        }, {
            header: 'Akun Piutang',
            dataIndex: 'accnamepiutang',
            minWidth: 150
        }, {
            header: 'Akun Pendapatan',
            dataIndex: 'accname',
            minWidth: 190
        }, {
            header: 'Tgl piutang',
            dataIndex: 'tglpiutang',
            minWidth: 150
        },
        // {header: 'tahun', dataIndex: 'tahun', minWidth: 150},
        {
            header: 'Jumlah Piutang',
            dataIndex: 'jumlah',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Sisa Piutang',
            dataIndex: 'sisapiutang',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        }, {
            header: 'Keterangan',
            dataIndex: 'description',
            minWidth: 550
        }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'comboxunit',
                valueField: 'idunit',
                id: 'cbUnitAccPiutang',
                listeners: {
                    'change': function(field, newValue, oldValue) {
                        storeGridregPiutang.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitAccPiutang').getValue()
                            }
                        });
                    }
                }
            }]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                itemId: 'addregPiutang',
                text: 'Registrasi Piutang',
                iconCls: 'add-icon',
                handler: function() {
                    // var grid = Ext.ComponentQuery.query('GridregPiutang')[0];
                    // var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    // var data = grid.getSelectionModel().getSelection();
                    var idunit = Ext.getCmp('cbUnitAccPiutang').getValue();
                    if (idunit == null) {
                        Ext.Msg.alert('Failure', 'Pilih Unit terlebih dahulu!');
                    } else {
                        wregPiutang.show();
                        Ext.getCmp('statusformregPiutang').setValue('input');
                        // Ext.getCmp('idRegPiutang').setValue(selectedRecord.data.idRegPiutang);
                        Ext.getCmp('idunitRegPiutang').setValue(idunit);
                        pelangganTypeStore.load();
                    }
                }
            }, {
                itemId: 'PenerimaanPiutang',
                text: 'Penerimaan Piutang',
                iconCls: 'edit-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridregPiutang')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data piutang terlebih dahulu!');
                    } else {

                        var formPenerimaanPiutang = Ext.getCmp('formPenerimaanPiutang');
                        wPenerimaanPiutang.show();
                        formPenerimaanPiutang.getForm().load({
                            url: SITE_URL + 'backend/loadFormData/regPiutang/1/account',
                            params: {
                                extraparams: 'a.idregistrasipiutang:' + selectedRecord.data.idregistrasipiutang
                            },
                            success: function(form, action) {
                                var d = Ext.decode(action.response.responseText);
                                Ext.getCmp('jumlahPenerimaanPiutang').setValue(renderNomor(d.data.jumlah));
                                Ext.getCmp('sisaPenerimaanPiutang').setValue(renderNomor(d.data.sisapiutang));
                                // Ext.Msg.alert("Load failed", action.result.errorMessage);
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                            }
                        })
                    }
                }
            }, {
                id: 'btnDeleteregPiutang',
                text: 'Hapus',
                iconCls: 'delete-icon',
                handler: function() {
                    Ext.Msg.show({
                        title: 'Confirm',
                        msg: 'Delete Selected ?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn) {
                            if (btn == 'yes') {
                                var grid = Ext.ComponentQuery.query('GridregPiutang')[0];
                                var sm = grid.getSelectionModel();
                                selected = [];
                                Ext.each(sm.getSelection(), function(item) {
                                    selected.push(item.data[Object.keys(item.data)[0]]);
                                });
                                Ext.Ajax.request({
                                    url: SITE_URL + 'hutangpiutang/deletePiutang',
                                    method: 'POST',
                                    params: {
                                        postdata: Ext.encode(selected)
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        if (!d.success) {
                                            Ext.Msg.alert('Informasi', d.message);
                                        } else {
                                            storeGridregPiutang.load();
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
            }, '->', 'Search: ', ' ', {
                xtype: 'searchGridregPiutang',
                text: 'Left Button'
            }]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridregPiutang, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
        // , {
        //     xtype: 'toolbar',
        //     dock: 'top',
        //     items: [{
        //         itemId: 'addregPiutang',
        //         text: 'Tambah Data',
        //         iconCls: 'add-icon',
        //         handler: function () {
        //             // WindowKaryawan('Input Karyawan Baru','input');
        //             wregPiutang.show();
        //         }
        //     }]
        // }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridregPiutang.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formregPiutang = Ext.getCmp('formregPiutang');
            wregPiutang.show();
            storeGridSetupUnit.load();
            formregPiutang.getForm().load({
                    url: SITE_URL + 'backend/loadFormData/regPiutang/1/account',
                    params: {
                        extraparams: 'a.idregistrasipiutang:' + record.data.idregistrasipiutang
                    },
                    success: function(form, action) {
                        var d = Ext.decode(action.response.responseText);
                        Ext.getCmp('jumlahregpiutang').setValue(renderNomor(d.data.jumlah));
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                })
                //            
                //            Ext.getCmp('kddaerahS').setReadOnly(true);
                //            Ext.getCmp('kdtgktunitS').setReadOnly(true);
                //            Ext.getCmp('kodesubunitS').setReadOnly(true);
                //            Ext.getCmp('kodejenjangmaster').setReadOnly(true);
            Ext.getCmp('statusformregPiutang').setValue('edit');
        }
    }
});

function updatePenerimaanPiutang() {
    // var sisapiutang = str_replace(".","",Ext.getCmp('sisaPenerimaanPiutang').getValue())*1;
    // var jumlahPenerimaanPiutang = str_replace(".","",Ext.getCmp('jumlahPenerimaanPiutang').getValue())*1;
    // var penerimaan = str_replace(".","",Ext.getCmp('penerimaanPiutang').getValue())*1;
    // var sisa = jumlahPenerimaanPiutang - penerimaan;
    // Ext.getCmp('sisaPenerimaanPiutang').setValue(renderNomor(sisa));
}