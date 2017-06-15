Ext.define('GridDaftarAkunUnitModel', {
    extend: 'Ext.data.Model',
    fields: ['idunit', 'namaunit', 'deskripsi', 'alamat', 'display', 'userin', 'usermod', 'datein', 'datemod', 'alamat2', 'alamat3', 'telp', 'fax', 'email', 'website', 'country', 'npwp', 'curfinanceyear', 'lastmonthfinanceyear', 'conversionmonth', 'numaccperiod'],
    idProperty: 'id'
});

var storeGridDaftarAkunUnit = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDaftarAkunUnitModel',
    //remoteSort: true,
    autoload: false,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/unitdaftarakun/account',
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

Ext.define('MY.searchGridDaftarAkunUnit', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDaftarAkunUnit',
    store: storeGridDaftarAkunUnit,
    width: 180
});

var smGridDaftarAkunUnit = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridDaftarAkunUnit.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteDaftarAkunUnit').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteDaftarAkunUnit').enable();
        }
    }
});

Ext.define('GridDaftarAkunUnit', {
    // title: 'Unit Perusahaan',
    itemId: 'GridDaftarAkunUnitID',
    id: 'GridDaftarAkunUnitID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDaftarAkunUnit',
    store: storeGridDaftarAkunUnit,
    loadMask: true,
    columns: [{
            header: 'No',
            xtype: 'rownumberer',
            width: 40,
            sortable: false
        },
        { header: 'idunit', dataIndex: 'idunit', hidden: true },
        { header: 'Nama Unit', dataIndex: 'namaunit', minWidth: 250, flex: 1 }
        // {header: 'deskripsi', dataIndex: 'deskripsi', minWidth: 150,flex:1}
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [

            {
                itemId: 'editDaftarAkunUnit',
                text: 'Pilih',
                iconCls: 'edit-icon',
                handler: function() {
                    var grid = Ext.ComponentQuery.query('GridDaftarAkunUnit')[0];
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data unit terlebih dahulu!');
                    } else {
                        //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                        // var formDaftarAkunUnit = Ext.getCmp('formDaftarAkunUnit');

                        // formDaftarAkunUnit.getForm().load({
                        //     url: SITE_URL + 'backend/loadFormData/unitcompany/1/setup',
                        //     params: {
                        //         extraparams: 'a.idunit:' + selectedRecord.data.idunit
                        //     },
                        //     success: function(form, action) {
                        //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        //     },
                        //     failure: function(form, action) {
                        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
                        //     }
                        // })

                        // wDaftarAkunUnit.show();
                        createDefaultAkun(Ext.getCmp('cbUnitTreeAccount').getValue(), selectedRecord.data.idunit);
                        Ext.getCmp('wDaftarAkunUnit').hide();
                        Ext.getCmp('windowAccWizard').hide();

                        storeAccountAktive.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitTreeAccount').getValue()
                            }
                        });

                    }

                }
            }, '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridDaftarAkunUnit',
                text: 'Left Button'
            }

        ]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridDaftarAkunUnit, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // storeGridDaftarAkunUnit.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});

var wDaftarAkunUnit = Ext.create('widget.window', {
    id: 'wDaftarAkunUnit',
    title: 'Pilih Unit',
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
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 300,
            height: 300,
            layout: 'fit',
            items: [{
                xtype: 'GridDaftarAkunUnit'
            }]
        })
    ]
});

//////////////////////////////////////////////////////////////////////////////////////////
var windowAccWizard = Ext.create('widget.window', {
    title: 'Daftar Akun',
    id: 'windowAccWizard',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    minWidth: 350,
    height: 180,
    // x: 300,
    // y: 50,
    layout: 'fit',
    border: false,
    items: [
        Ext.create('Ext.panel.Panel', {
            // title: 'Hello',
            width: 200,
            html: '<p>Maaf, anda belum membuat daftar akun. <br> <br> Apakah anda ingin sistem membuat rekening perkiraan secara otomatis atau menduplikasi daftar akun dari unit lain?</p>'
        })
    ],
    buttons: [{
            text: 'Ambil Dari Unit Lain',
            handler: function() {
                wDaftarAkunUnit.show();
                storeGridDaftarAkunUnit.load({
                    params: { idunit: Ext.getCmp('cbUnitTreeAccount').getValue() }
                });
            }
        },
        {
            text: 'Buat Otomatis',
            handler: function() {
                Ext.MessageBox.wait('Mohon tunggu... Sedang membuat akun');

                createDefaultAkun(Ext.getCmp('cbUnitTreeAccount').getValue(), 99);

            }
        }
    ]
});

Ext.define('KitchenSink.model.tree.Task', {
    extend: 'Ext.data.Model',
    fields: [
        'namepos', 'text', 'id', 'idaccounttype', 'lock', 'idparent', 'idaccount', 'accname', 'accnumber', 'balance',
        'description', 'classname', 'acctypename', 'prefixno', 'idclassificationcf', 'display', 'active'
    ]
});

var storeAccount = new Ext.data.TreeStore({
    model: 'KitchenSink.model.tree.Task',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'account/tesJsonTree/0'
    },
    root: {
        text: ' ',
        id: '0'
    },
    autoload: false,
    folderSort: true,
    sorters: [{
        property: 'accnumber',
        direction: 'ASC'
    }]
});

var storeAccountAktive = new Ext.data.TreeStore({
    model: 'KitchenSink.model.tree.Task',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'account/tesJsonTree/0'
    },
    root: {
        text: ' ',
        id: '0',
        expanded: false
    },
    autoload: false,
    folderSort: true,
    sorters: [{
        property: 'accnumber',
        direction: 'ASC'
    }]
});


var storeAccountByType = new Ext.data.TreeStore({
    model: 'KitchenSink.model.tree.Task',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'account/tesJsonTree/0/ByType'
    },
    root: {
        text: ' ',
        id: '0'
    },
    folderSort: true,
    autoLoad: false,
    sorters: [{
        property: 'accnumber',
        direction: 'ASC'
    }]
});

var formAccount = Ext.create('Ext.form.Panel', {
    id: 'formAccount',
    width: 550,
    //    height: 430,
    autoHeight: true,
    autoScroll: true,
    // frame: true,
    url: SITE_URL + 'account/saveAccount',
    baseParams: { idmenu: 8 },
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        width: 400
    },
    items: [{
        xtype: 'fieldset',
        title: 'Data Account/Unit',
        collapsible: true,
        defaults: {
            //                   labelWidth: 200,
            layout: {
                type: 'hbox'
                    //                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
            }
        },
        items: [{
                xtype: 'comboxheaderAkun',
                fieldLabel: 'Fungsi Akun',
                valueField: 'namepos',
                name: 'namepos',
                id: 'idposAcc',
                allowBlank: false,
                listeners: {
                    change: function(component) {
                        var idheader = Ext.getCmp('idposAcc').getValue();
                        console.log(idheader)
                        if (idheader == 1) {
                            Ext.getCmp('balanceAcc').setDisabled(true);
                        } else {
                            Ext.getCmp('balanceAcc').setDisabled(false);
                        }

                    }
                }
            },
            {
                xtype: 'hiddenfield',
                name: 'idunit',
                id: 'idunitAddAcc',
                listeners: {
                    change: function(component) {
                        var idheader = Ext.getCmp('idposAcc').getValue();
                        console.log(idheader)
                        if (idheader == 1) {
                            Ext.getCmp('balanceAcc').setDisabled(true);
                        } else {
                            Ext.getCmp('balanceAcc').setDisabled(false);
                        }

                    }
                }
            },
            {
                xtype: 'hiddenfield',
                fieldLabel: 'idaccount',
                name: 'idaccount'
            },
            {
                xtype: 'hiddenfield',
                id: 'stateformacc',
                fieldLabel: 'stateformacc',
                name: 'stateformacc'
            },
            {
                xtype: 'hiddenfield',
                id: 'idclassificationcf',
                fieldLabel: 'idclassificationcf',
                name: 'idclassificationcf'
            },
            {
                xtype: 'hiddenfield',
                id: 'prefixno2',
                fieldLabel: 'prefixno',
                name: 'prefixno'
            },
            {
                xtype: 'hiddenfield',
                id: 'idparent',
                fieldLabel: 'idparent',
                name: 'idparent'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Akun Induk',
                allowBlank: false,
                id: 'accnameinduk',
                name: 'accnameinduk',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            windowPopupAccListAkunInduk.show();
                            storeAccountAktive.load({
                                params: {
                                    'idunit': Ext.getCmp('idunitAddAcc').getValue()
                                }
                            });

                        });
                    }
                }
            },
            //                {
            //                    xtype: 'comboxclassificationcf',
            //                    fieldLabel: 'Klasifikasi Akun',
            //                    name: 'classname',
            //                    id: 'classname',
            //                    listeners: {
            //                        select: {
            //                            fn: function(combo, value) {
            //                                Ext.Ajax.request({
            //                                    url: SITE_URL + 'account/getprefix/' + combo.getValue() + '/',
            //                                    success: function(response) {
            //                                        var result = Ext.decode(response.responseText);
            //                                        Ext.getCmp('idclassificationcf').setValue(result.idclassificationcf);
            //                                        Ext.getCmp('prefixno2').setValue(result.prefix);
            //                                        Ext.getCmp('prefixno').setValue(result.prefix);
            ////                                          if((result.a)==1){
            ////                                             value = result.a;
            ////                                          }
            //                                    },
            //                                    callback: function(opt, succes, response) {
            ////                                        console.log(value); //value is now set
            //                                    }
            //                                });
            ////                                var combotbiddik = Ext.getCmp('tbiddik');
            ////                                combotbiddik.enable();
            ////                                combotbiddik.clearValue();
            ////                                combotbiddik.store.load({
            ////                                    params: {kettingdik: combo.getValue()}
            ////                                });
            //                            }
            //                        }
            //                    }
            //                },
            {
                xtype: 'comboxAccountType',
                valueField: 'acctypename',
                allowBlank: false
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Nomor Akun',
                defaultType: 'textfield',
                items: [{
                    width: 10,
                    xtype: 'displayfield',
                    name: 'prefixno',
                    id: 'prefixno'
                }, {
                    width: 10,
                    xtype: 'displayfield',
                    value: '-'
                }, {
                    width: 80,
                    name: 'accnumber',
                    allowBlank: false
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nama Akun',
                allowBlank: false,
                name: 'accname'
            },
            Ext.create('Ext.ux.form.NumericField', {
                useThousandSeparator: true,
                decimalPrecision: 5,
                readOnly: true,
                alwaysDisplayDecimals: false,
                thousandSeparator: '.',
                decimalSeparator: ',',
                fieldLabel: 'Balance',
                id: 'balanceAcc',
                name: 'balance'
            }),
            {
                xtype: 'textarea',
                fieldLabel: 'Deskripsi',
                name: 'description',
            }, {
                xtype: 'checkboxfield',
                name: 'active',
                id: 'activeAcc',
                fieldLabel: 'Status',
                boxLabel: 'Aktif'
            }
        ]
    }],
    // listeners : {
    //    afterrender: {
    //        fn : function(){
    //           agama.load();
    //        }
    //    }
    // },
    buttons: [{
        text: 'Batal',
        handler: function() {
            var winAccount = Ext.getCmp('windowPopupAccount');
            winAccount.hide();
        }
    }, {
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        if (!action.result.success) {
                            Ext.Msg.alert('Failed', action.result.message);
                        } else {
                            Ext.Msg.alert('Success', action.result.message);
                            storeAccountAktive.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitTreeAccount').getValue()
                                }
                            });
                            var winAccount = Ext.getCmp('windowPopupAccount');
                            winAccount.hide();

                            refreshSaldo(Ext.getCmp('cbUnitTreeAccount').getValue());
                        }

                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        storeAccountAktive.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wAccount = Ext.create('widget.window', {
    id: 'windowPopupAccount',
    title: 'Account',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    // minWidth: 450,
    //    height: 350,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formAccount]
});




Ext.define('GridTreeAcc2', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAcc2',
    id: 'GridTreeAcc2',
    xtype: 'tree-grid',
    title: 'Chart of Account',
    height: 300,
    useArrows: true,
    rootVisible: false,
    // multiSelect: true,
    // singleExpand: false,
    loadMask: true,
    enableColumnResize: true,
    rowLines: true,
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                //                 disableUnitTreeAcc();
                // storeUnit.load();
                // Ext.getCmp('cbUnitTreeAccount').setValue(idunit); 

                // alert()               
                //                 Ext.Ajax.request({
                //                     url: SITE_URL + 'account/cekAccount',
                //                     success: function(response) {
                //                         var result = Ext.decode(response.responseText);
                //                         if (!result.success)
                //                         {
                //                             windowAccWizard.show();
                //                             // Ext.MessageBox.confirm('Daftar', 'Anda belum membuat daftar akun. Apakah anda ingin sistem membuat rekening perkiraan secara otomatis?', confirmAkunWizard);
                //                         }
                //                     },
                //                     failure: function(opt, succes, response) {
                //                         Ext.MessageBox.confirm(response);
                // //                        Ext.MessageBox.confirm('Saldo Awal', 'Anda belum membuat daftar akun. Apakah anda ingin sistem membuat rekening perkiraan secara otomatis?', confirmAkunWizard);
                //                     }
                //                 });

            }
        }
    },
    viewConfig: {
        //        stripeRows: false, 
        getRowClass: function(record) {

            if (record.get('active') == 't') {
                return 'null';
            } else if (record.get('active') == 'f') {
                return 'child-row';
            } else if (record.get('id') == 0) {
                return 'adult-row';
            }
        }
    },
    initComponent: function() {
        this.width = 600;

        Ext.apply(this, {
            store: storeAccountAktive,
            columns: [{
                    xtype: 'actioncolumn',
                    width: 20,
                    renderer: function(value, metadata, record) {
                        //                        console.log(record.data.idparent)
                        if (record.data.idparent !== '0' && record.data.text !== ' ') {
                            console.log(record.data.lock)
                            if (record.data.lock == 't') {
                                //lock
                                this.items[0].icon = BASE_URL + 'assets/icons/fam/lock.png';
                                this.items[0].tooltip = 'Terkunci';
                            } else {
                                this.items[0].icon = BASE_URL + 'assets/icons/fam/pencil.png';
                                this.items[0].tooltip = 'Ubah Data';
                            }

                        } else {
                            this.items[0].icon = '';
                            this.items[0].tooltip = '';
                        }
                    },
                    items: [{
                        text: 'Edit',
                        width: 55,
                        // menuDisabled: true,
                        id: 'actioncolumnAccount',
                        xtype: 'actioncolumn',
                        tooltip: 'Edit task',
                        align: 'center',
                        icon: BASE_URL + 'assets/icons/fam/pencil.png',
                        handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {

                            if (record.data.lock !== 't') {
                                // console.log(record)
                                var form = Ext.getCmp('formAccount');
                                wAccount.show();
                                form.load({
                                    url: SITE_URL + 'account/loaddata/' + record.get('id') + '/' + Ext.getCmp('cbUnitTreeAccount').getValue(),
                                    //                    params: {
                                    //                        extraparams: 'a.idinventory:' + record.data.idinventory
                                    //                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(action.response.responseText);
                                        //                        console.log(d.data.id);
                                        if (d.data.idpos == 1) {
                                            //akun utama
                                            //disable balance
                                            Ext.getCmp('balanceAcc').disable();
                                        } else {
                                            Ext.getCmp('balanceAcc').enable();
                                        }
                                        //

                                        Ext.getCmp('prefixno').setValue(d.data.prefixno);
                                        if (d.data.active == 't') {
                                            Ext.getCmp('activeAcc').setValue(true);
                                        } else {
                                            Ext.getCmp('activeAcc').setValue(false);
                                        }

                                        //                        console.log(d.data.id);

                                        // if (d.data.id != 0)
                                        // {
                                        //     Ext.getCmp('classname').setReadOnly(true);
                                        // } else {
                                        //     Ext.getCmp('classname').setReadOnly(false);
                                        // }
                                        // Ext.Msg.alert("Load failed", action.result.errorMessage);activeAcc
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                                    }
                                })

                                Ext.getCmp('stateformacc').setValue('edit');
                            }

                        }
                    }]
                }, {
                    xtype: 'treecolumn',
                    text: 'No Akun',
                    minWidth: 200,
                    sortable: true,
                    dataIndex: 'accnumber'
                }, {
                    xtype: 'treecolumn',
                    text: 'Nama Akun',
                    // renderer: renderTip,
                    minWidth: 400,
                    sortable: true,
                    dataIndex: 'text'
                },
                {
                    //            xtype: 'numbercolumn',
                    text: 'Tipe Akun',
                    sortable: true,
                    minWidth: 170,
                    dataIndex: 'acctypename'
                },
                {
                    //            xtype: 'treecolumn',
                    text: 'Deskripsi',
                    minWidth: 200,
                    sortable: true,
                    dataIndex: 'description',
                    hidden: true,
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Saldo',
                    align: 'right',
                    sortable: true,
                    hidden: true,
                    minWidth: 165,
                    dataIndex: 'balance'
                },
                // {
                // //                    xtype: 'numbercolumn',
                //                     text: 'Posisi Akun',
                //                     sortable: true,
                //                     minWidth: 165,
                //                     dataIndex: 'namepos'
                //                 },
                {
                    //                    xtype: 'numbercolumn',
                    text: 'Keterangan',
                    sortable: true,
                    minWidth: 565,
                    dataIndex: 'description'
                },
                { xtype: 'treecolumn', text: 'idaccounttype', dataIndex: 'idaccounttype', hidden: true }, { xtype: 'treecolumn', text: 'idparent', dataIndex: 'idparent', hidden: true }, { xtype: 'treecolumn', text: 'classname', dataIndex: 'classname', hidden: true }, { xtype: 'treecolumn', text: 'acctypename', dataIndex: 'acctypename', hidden: true }, { xtype: 'treecolumn', text: 'prefixno', dataIndex: 'prefixno', hidden: true }, { xtype: 'treecolumn', text: 'display', dataIndex: 'display', hidden: true }, { xtype: 'treecolumn', text: 'idaccount', dataIndex: 'idaccount', hidden: true }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                        xtype: 'comboxunit',
                        width: 300,
                        valueField: 'idunit',
                        id: 'cbUnitTreeAccount',
                        listeners: {
                            'change': function(field, newValue, oldValue) {
                                storeAccountAktive.load({
                                    params: {
                                        'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitTreeAccount').getValue()
                                    }
                                });

                                Ext.Ajax.request({
                                    url: SITE_URL + 'account/cekAccount',
                                    method: 'POST',
                                    params: {
                                        'idunit': Ext.getCmp('cbUnitTreeAccount').getValue()
                                    },
                                    success: function(response) {
                                        var result = Ext.decode(response.responseText);
                                        if (!result.success) {
                                            windowAccWizard.show();
                                            // Ext.MessageBox.confirm('Daftar', 'Anda belum membuat daftar akun. Apakah anda ingin sistem membuat rekening perkiraan secara otomatis?', confirmAkunWizard);
                                        }
                                    },
                                    failure: function(opt, succes, response) {
                                        Ext.MessageBox.confirm(response);
                                        //                        Ext.MessageBox.confirm('Saldo Awal', 'Anda belum membuat daftar akun. Apakah anda ingin sistem membuat rekening perkiraan secara otomatis?', confirmAkunWizard);
                                    }
                                });
                            }
                        }
                    }, '->'
                    //                         {
                    //                             xtype: 'button',
                    // //                            width:100,
                    //                             handler: function(button, event) {
                    //                                 Ext.getCmp('GridTreeAcc2').expandAll();
                    //                             },
                    //                             // flex: 1,
                    //                             text: 'Expand'
                    //                         }, {
                    //                             // xtype: 'button',
                    //                             handler: function(button, event) {
                    //                                 Ext.getCmp('GridTreeAcc2').collapseAll();
                    //                             },
                    //                             // flex: 1,
                    //                             text: 'Collapse'
                    //                         }
                ]
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                        xtype: 'textfield',
                        id: 'searchAcc',
                        fieldLabel: 'Pencarian',
                        listeners: {
                            specialkey: function(f, e) {
                                if (e.getKey() == e.ENTER) {
                                    storeAccountAktive.load({
                                        params: {
                                            'accname': Ext.getCmp('searchAcc').getValue(),
                                            'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeAccount').getValue()
                                        }
                                    });
                                }
                            }
                        }
                    }, {
                        //                        itemId: 'reloadDataAcc',
                        text: 'Cari',
                        iconCls: 'search',
                        handler: function() {
                            storeAccountAktive.load({
                                params: {
                                    'accname': Ext.getCmp('searchAcc').getValue(),
                                }
                            });
                        }
                    }, {
                        // itemId: 'reloadDataAcc',
                        text: 'Refresh',
                        iconCls: 'refresh',
                        handler: function() {
                            // var grid = Ext.getCmp('GridTreeAcc2');
                            // grid.getView().refresh();
                            // storeAccountAktive.load({
                            //             params: {
                            //                 'extraparams': 'idunit:' + Ext.getCmp('cbUnitTreeAccount').getValue()
                            //             }
                            //         });
                            // Ext.getCmp('searchAcc').setValue(null)
                            // Ext.getCmp('GridTreeAcc2').expandAll();
                            storeAccountAktive.load({
                                params: {
                                    'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitTreeAccount').getValue()
                                }
                            });
                        }
                    }, '-',
                    {
                        // itemId: 'addAcc',
                        text: 'Tambah Akun',
                        iconCls: 'add-icon',
                        handler: function() {
                            var grid = Ext.ComponentQuery.query('GridTreeAcc2')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length === 0) {
                                Ext.Msg.alert('Failure', 'Pilih Induk Account terlebih dahulu!');
                            } else if (Ext.getCmp('cbUnitTreeAccount').getValue() === null) {
                                Ext.Msg.alert('Failure', 'Pilih unit terlebih dahulu!');
                            } else {
                                var formacc = Ext.getCmp('formAccount');

                                formacc.getForm().reset();

                                //                            if (selectedRecord.data.display == null)
                                //                            {
                                //                                Ext.getCmp("displayacc").setValue(true);
                                //                            } else {
                                //                                Ext.getCmp("displayacc").setValue(false);
                                //                            }
                                if (selectedRecord.data.id == 0) {
                                    Ext.getCmp('idparent').setValue(0);
                                    Ext.getCmp('classname').setReadOnly(false);

                                } else {
                                    console.log(selectedRecord)
                                        // Ext.getCmp('classname').setReadOnly(true);
                                    Ext.getCmp('idparent').setValue(selectedRecord.data.idaccount);
                                    Ext.getCmp('accnameinduk').setValue(selectedRecord.data.text);
                                    // Ext.getCmp('classname').setValue(selectedRecord.data.classname);
                                    Ext.getCmp('prefixno').setValue(selectedRecord.data.prefixno);
                                    Ext.getCmp('prefixno2').setValue(selectedRecord.data.prefixno);
                                    Ext.getCmp('idclassificationcf').setValue(selectedRecord.data.idclassificationcf);
                                }


                                Ext.getCmp('idunitAddAcc').setValue(Ext.getCmp('cbUnitTreeAccount').getValue());
                                Ext.getCmp('stateformacc').setValue('input');

                                wAccount.show();
                                headerAkunStore.load();
                            }
                        }
                    },
                    {
                        // itemId: 'addAcc',
                        text: 'Hapus Akun',
                        // hidden:true,
                        iconCls: 'delete-icon',
                        handler: function() {
                            var grid = Ext.ComponentQuery.query('GridTreeAcc2')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length === 0) {
                                Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                            } else if (Ext.getCmp('cbUnitTreeAccount').getValue() == null) {
                                Ext.Msg.alert('Failure', 'Pilih Unit terlebih dahulu!');
                            } else {
                                // Ext.getCmp('idparent').setValue(selectedRecord.data.idaccount);

                                Ext.MessageBox.confirm('Menghapus Akun', 'Apakah anda yakin untuk menghapus akun ini? <br><br> <b>Jika akun terhapus makan akun tersebut tidak akan muncul di daftar akun perkiraan dan proses transaksi.</b>', confirmHapusAkun);

                            }
                        }
                    }

                ]
            }]
        });
        this.callParent();
    }
});

function confirmHapusAkun(btn) {
    if (btn == 'yes') {
        var grid = Ext.ComponentQuery.query('GridTreeAcc2')[0];
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();

        Ext.Ajax.request({
            url: SITE_URL + 'account/hapusakun2',
            params: {
                'idaccount': selectedRecord.data.idaccount,
                'idunit': Ext.getCmp('cbUnitTreeAccount').getValue()
            },
            success: function(response) {
                    var result = Ext.decode(response.responseText);
                    if (!result.success) {
                        Ext.Msg.alert('Informasi', result.message);
                    } else {
                        Ext.Msg.alert("Hapus Akun", result.message);
                        storeAccountAktive.load({
                            params: {
                                'extraparams': 'a.idunit:' + Ext.getCmp('cbUnitTreeAccount').getValue()
                            }
                        });
                    }

                }
                // callback: function(opt, succes, response) {
                //     Ext.Msg.alert("Kesalahan", 'Coba lagi nanti');
                //     // Ext.MessageBox.hide()
                // }
        });
    }
}

function confirmAkunWizard(btn) {
    if (btn == 'yes') {
        //bikin default akun
        Ext.MessageBox.wait('Mohon tunggu... Sedang membuat akun');
        Ext.Ajax.request({
            url: SITE_URL + 'account/createDefaultAkun',
            success: function(response) {
                var result = Ext.decode(response.responseText);
                if (!result.success) {

                }
                storeAccount.load();
                storeAccountAktive.load();
                Ext.Msg.alert("Account Wizzard", result.message);
                Ext.MessageBox.hide()
            },
            callback: function(opt, succes, response) {
                Ext.Msg.alert("Kesalahan", 'Coba lagi nanti');
                Ext.MessageBox.hide()
            }
        });
    }
}

function createDefaultAkun(idunit, idunittemplate) {
    Ext.Ajax.request({
        url: SITE_URL + 'account/createDefaultAkun',
        params: {
            'idunit': idunit,
            'idunittemplate': idunittemplate
        },
        success: function(response) {
            var result = Ext.decode(response.responseText);
            if (!result.success) {

            }
            // storeAccount.load();
            storeAccountAktive.load({
                params: {
                    'idunit': idunit
                }
            });
            Ext.Msg.alert("Account Wizzard", result.message);
            Ext.MessageBox.hide()
            Ext.getCmp('windowAccWizard').hide();
        },
        callback: function(opt, succes, response) {
            Ext.Msg.alert("Kesalahan", 'Coba lagi nanti');
            Ext.MessageBox.hide()
        }
    });
}

function refreshSaldo(idunit) {
    //  Ext.Ajax.request({
    //     url: SITE_URL + 'account/refreshSaldo',
    //     params: {
    //         'idunit': idunit
    //     },
    //     success: function(response) {
    //         console.log('refreshSaldo');

    //         storeAccountAktive.load({
    //             params: {
    //                 'extraparams': 'idunit:' + idunit
    //             }
    //         });
    //     },
    //     callback: function(opt, succes, response) {
    //         Ext.Msg.alert("Kesalahan", 'Coba lagi nanti');
    //         Ext.MessageBox.hide()
    //     }
    // });
}

function renderTip(val, meta, rec, rowIndex, colIndex, store) {
    console.log('s' + rec)
        // meta.tdCls = 'cell-icon'; // icon
    meta.tdAttr = 'data-qtip="' + val + '"';
    return val;
};