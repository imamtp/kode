Ext.define('KitchenSink.model.tree.Task', {
    extend: 'Ext.data.Model',
    fields: [
        'text', 'id', 'idaccounttype', 'idparent', 'idaccount', 'accname', 'accnumber', 'balance',
        'description', 'classname', 'acctypename', 'prefixno', 'idclassificationcf', 'display','active'
    ]
});

var storeAccount = new Ext.data.TreeStore({
    model: 'KitchenSink.model.tree.Task',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'account/getTree/0/'
    },
    root: {
        text: ' ',
        id: '0',
        expanded: false
    }
    ,folderSort: true,
    autoLoad: false
});

var formAccount = Ext.create('Ext.form.Panel', {
    id: 'formAccount',
    width: 550,
//    height: 430,
    autoHeight: true,
    autoScroll: true,
    // frame: true,
    url: SITE_URL + 'account/saveAccount',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        width: 400
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Data Account/Unit',
            collapsible: true,
            defaults: {
//                   labelWidth: 200,
                layout: {
                    type: 'hbox',
//                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
            items: [
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
                    xtype: 'comboxclassificationcf',
                    fieldLabel: 'Klasifikasi Akun',
                    name: 'classname',
                    id: 'classname', 
                    listeners: {
                        select: {
                            fn: function(combo, value) {
                                Ext.Ajax.request({
                                    url: SITE_URL+'account/getprefix/'+combo.getValue()+'/',
                                    success: function(response){
                                          var result = Ext.decode(response.responseText);
                                          Ext.getCmp('idclassificationcf').setValue(result.idclassificationcf);
                                          Ext.getCmp('prefixno2').setValue(result.prefix);
                                          Ext.getCmp('prefixno').setValue(result.prefix);
//                                          if((result.a)==1){
//                                             value = result.a;
//                                          }
                                    },
                                    callback: function(opt, succes, response){
//                                        console.log(value); //value is now set
                                    }
                                });
//                                var combotbiddik = Ext.getCmp('tbiddik');
//                                combotbiddik.enable();
//                                combotbiddik.clearValue();
//                                combotbiddik.store.load({
//                                    params: {kettingdik: combo.getValue()}
//                                });
                            }
                        }
                    }
                },
                {
                    xtype: 'comboxAccountType',
                    valueField:'acctypename',
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
                            value:'-'
                        },{
                            width: 80,
                            name: 'accnumber',
                            allowBlank: false
                        }]
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Nama Akun',
                    allowBlank: false,
                    name: 'accname'
                }, Ext.create('Ext.ux.form.NumericField',
                        {
                            useThousandSeparator: true,
                            decimalPrecision: 5,
                            alwaysDisplayDecimals: false,
                            thousandSeparator: '.',
                            decimalSeparator: ',',
                            fieldLabel: 'Balance',
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
                }]
        }
    ],
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
                            if (!action.result.success)
                            {
                                Ext.Msg.alert('Failed', action.result.message);
                            } else {
                                Ext.Msg.alert('Success', action.result.message);
                                storeAccount.load();
                                var winAccount = Ext.getCmp('windowPopupAccount');
                                winAccount.hide();
                            }

                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            storeAccount.load();
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

Ext.define('GridTreeAcc', {
    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAcc',
    id: 'GridTreeAcc',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAcc',
    xtype: 'tree-grid',
    store: storeAccount,
    loadMask: true,
    enableColumnResize:true,
    rowLines:true,
    // height: 300,
//    useArrows: true,
//    rootVisible: false,
//    multiSelect: true,
    singleExpand: false,
    // expanded: true,
    viewConfig: { 
//        stripeRows: false, 
        getRowClass: function(record) { 
            
            if(record.get('active') == 't')
            {
                return 'null';
            } else  if(record.get('active')=='f')
            {
                return 'child-row'; 
            } else  if(record.get('id')==0)
            {
                return 'adult-row'; 
            }
        } 
    }, 
    columns: [{
            text: 'Edit',
            width: 55,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Edit task',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/pencil.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                // console.log(record)
                var form = Ext.getCmp('formAccount');
                wAccount.show();
                form.load({
                    url: SITE_URL + 'account/loaddata/' + record.get('id'),
//                    params: {
//                        extraparams: 'a.idinventory:' + record.data.idinventory
//                    },
                    success: function(form, action) {
                        var d = Ext.decode(action.response.responseText);
//                        console.log(d.data.id);
                        Ext.getCmp('prefixno').setValue(d.data.prefixno);
                        if(d.data.active=='t')
                        {
                            Ext.getCmp('activeAcc').setValue(true);
                        } else {
                            Ext.getCmp('activeAcc').setValue(false);
                        }
                        
//                        console.log(d.data.id);
                        
                        if(d.data.id!=0)
                        {
                            Ext.getCmp('classname').setReadOnly(true);
                        } else {
                            Ext.getCmp('classname').setReadOnly(false);
                        }
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);activeAcc
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                })
                Ext.getCmp('stateformacc').setValue('edit');
            
            }
        }, {
            xtype: 'treecolumn',
            text: 'No Akun',
            minWidth: 200,
            sortable: true,
            dataIndex: 'accnumber'
        }, {
            xtype: 'treecolumn',
            text: 'Nama Akun',
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
            hidden:true,
        }, 
        {
            xtype: 'numbercolumn',
            text: 'Saldo',
            align:'right',
            sortable: true,
            minWidth: 165,
            dataIndex: 'balance'
        },
        {xtype: 'treecolumn', text: 'idaccounttype', dataIndex: 'idaccounttype', hidden: true}
        , {xtype: 'treecolumn', text: 'idparent', dataIndex: 'idparent', hidden: true}
        , {xtype: 'treecolumn', text: 'classname', dataIndex: 'classname', hidden: true}
        , {xtype: 'treecolumn', text: 'acctypename', dataIndex: 'acctypename', hidden: true}
        , {xtype: 'treecolumn', text: 'prefixno', dataIndex: 'prefixno', hidden: true}
        , {xtype: 'treecolumn', text: 'display', dataIndex: 'display', hidden: true}
        , {xtype: 'treecolumn', text: 'idaccount', dataIndex: 'idaccount', hidden: true}
    ]
    , dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    id: 'searchAcc',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccount.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAcc').getValue(),
                                    }
                                });
                            }
                        }
                    }
                }, {
//                        itemId: 'reloadDataAcc',
                    text: 'Cari',
                    iconCls: 'add-icon'
                    , handler: function() {
                        storeAccount.load({
                            params: {
                                'accname': Ext.getCmp('searchAcc').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAcc',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAcc');
                        grid.getView().refresh();
                        storeAccount.load();
                        Ext.getCmp('searchAcc').setValue(null)
                        Ext.getCmp('GridTreeAcc').expandAll();
                    }
                },
                {
                    itemId: 'addAcc',
                    text: 'Tambah Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAcc')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Induk Account terlebih dahulu!');
                        } else {
                            var formacc = Ext.getCmp('formAccount');

                            formacc.getForm().reset();

//                            if (selectedRecord.data.display == null)
//                            {
//                                Ext.getCmp("displayacc").setValue(true);
//                            } else {
//                                Ext.getCmp("displayacc").setValue(false);
//                            }
                            if(selectedRecord.data.id==0)
                            {
                                Ext.getCmp('idparent').setValue(0);
                                Ext.getCmp('classname').setReadOnly(false);
                                
                            } else {
                                Ext.getCmp('classname').setReadOnly(true);
                                Ext.getCmp('idparent').setValue(selectedRecord.data.idaccount);
                                Ext.getCmp('classname').setValue(selectedRecord.data.classname);
                                Ext.getCmp('prefixno').setValue(selectedRecord.data.prefixno);
                                Ext.getCmp('prefixno2').setValue(selectedRecord.data.prefixno);
                                Ext.getCmp('idclassificationcf').setValue(selectedRecord.data.idclassificationcf);
                            }
                            
                            

                            Ext.getCmp('stateformacc').setValue('input');
                            
                            wAccount.show();
                        }
                    }
                }
//                , {
//                    id: 'btnDeleteAcc',
//                    text: 'Hapus',
//                    iconCls: 'delete-icon',
//                    handler: function() {
//                        Ext.Msg.show({
//                            title: 'Konfirmasi',
//                            msg: 'Akun terpilih akan dihapus beserta akun-akun dibawahnya berikut dengan saldonya. <br><br> Apakah anda yakin untuk menghapus akun terpilih ?',
//                            buttons: Ext.Msg.YESNO,
//                            fn: function(btn) {
//                                if (btn == 'yes') {
//
//                                    var grid = Ext.ComponentQuery.query('GridTreeAcc')[0];
//                                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
//                                    var data = grid.getSelectionModel().getSelection();
//                                    var sm = grid.getSelectionModel();
//                                    if (data.length == 0)
//                                    {
//                                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
//                                    } else {
//                                        // WindowGridGaji(selectedRecord.get('pegawainid'),periodepenggajian,2)
//                                        // alert(selectedRecord.get('pegawainid'))
//                                        selected = [];
//                                        Ext.each(sm.getSelection(), function(item) {
//                                            selected.push(item.data.id);
//                                        });
//                                        // console.log(selected)
//
//                                        Ext.Ajax.request({
//                                            url: SITE_URL + 'account/hapus',
//                                            method: 'POST',
//                                            params: {postdata: Ext.encode(selected)},
//                                            success: function(response, opts) {
//                                                var obj = Ext.JSON.decode(response.responseText);
//                                                if (obj.success)
//                                                {
//                                                    Ext.Msg.alert('Hapus Akun', obj.message);
//                                                } else {
//                                                    Ext.Msg.alert('Hapus Akun', obj.message);
//                                                }
//                                                // msg.hide();
//                                            },
//                                            failure: function(response, opts) {
//                                                var text = response.responseText;
//                                                Ext.Msg.alert('Proses', text.message);
//                                            }
//                                        });
//
//                                        //Ext.Msg.alert('data',Ext.encode(selected));
//                                        // storeAccount.remove(sm.getSelection());
//                                        // sm.select(0);
//                                        storeAccount.load();
//                                    }
//                                }
//                            }
//                        });
//                    }
//                }
                , '->',
                {
                    xtype: 'button',
//                            width:100,
                    handler: function(button, event) {
                        Ext.getCmp('GridTreeAcc').expandAll();
                    },
                    flex: 1,
                    text: 'Expand'
                }, {
                    xtype: 'button',
                    handler: function(button, event) {
                        Ext.getCmp('GridTreeAcc').collapseAll();
                    },
                    flex: 1,
                    text: 'Collapse'
                }
            ]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeAccount.load();
//                Ext.getCmp('GridTreeAcc').expandAll();
//                console.log('asdsad');

            }
        }
    }
});