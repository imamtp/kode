//PEMBAYARAN HUTANG
Ext.define('GridTreeAccKasBayarHutang', {
    // title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccKasBayarHutang',
    id: 'GridTreeAccKasBayarHutang',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccKasBayarHutang',
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
        }
    ]
    , dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccKasBayarHutang')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            console.log(selectedRecord);
                            Ext.getCmp('accnameBayarHutang').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccBayarHutang').setValue(selectedRecord.get('id'));
                            // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupAccKasBayarHutang').hide();
                        }


                    }
                }, '->',
                {
                    xtype: 'textfield',
                    id: 'searchAccKasBayarHutang',
                    blankText: 'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccKasBayarHutang').getValue(),
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
                                'accname': Ext.getCmp('searchAccKasBayarHutang').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccKasBayarHutang',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccKasBayarHutang');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccKasBayarHutang').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // Ext.getCmp('GridTreeAccKasBayarHutang').expandAll();
            }
        }
    }
});

var windowPopupAccKasBayarHutang = Ext.create('widget.window', {
    title: 'Pilih Akun Kas Pembayaran Hutang',
    id: 'windowPopupAccKasBayarHutang',
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
                    xtype: 'GridTreeAccKasBayarHutang'
                }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccKasBayarHutang = Ext.getCmp('windowPopupAccKasBayarHutang');
                windowPopupAccKasBayarHutang.hide();
            }
        }]
});
////////////////////////////////////////////////////////////////////

var formPembayaranHutang = Ext.create('Ext.form.Panel', {
    id: 'formPembayaranHutang',
    width: 450,
    height: 370,
    url: SITE_URL + 'hutangpiutang/bayarHutang',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        width: 400
    },
      items: [
        {
            xtype:'hiddenfield',
            name:'idunit',
            id:'idunitPembayaranHutang',
        }, {
            xtype:'hiddenfield',
            name:'idregistrasihutang'
        },
        {
            xtype: 'textfield',
            readOnly:true,
            fieldLabel: 'Akun Beban Hutang',
            name: 'acckenahutang'
        },
        {
            xtype: 'textfield',
            readOnly:true,
            fieldLabel: 'Akun Hutang',
            name: 'acchutang'
        },
        {
            xtype: 'datefield',
            name:'mulaihutang',
            format: 'Y-m-d',
            readOnly:true,
            fieldLabel: 'Tanggal Mulai Hutang'
        },
		{
            xtype: 'datefield',
            name:'jatuhtempo',
            format: 'Y-m-d',
            readOnly:true,
            fieldLabel: 'Tanggal Jatuh Tempo Hutang'
        },{
            xtype: 'textarea',
            readOnly:true,
            fieldLabel: 'Keterangan',
            name: 'memo'
        },
        {
            xtype:'textfield',
            allowBlank:false,
            readOnly:true,
            fieldLabel:'Jumlah Hutang',
            id:'jumlahPembayaranHutang',
            name:'jumlah',
            listeners: {
                    blur: function(txt, The, eOpts) {
                        this.setRawValue(renderNomor(this.getValue()));
                    }
                }
        },{
            xtype:'textfield',
            allowBlank:false,
            readOnly:true,
            fieldLabel:'Sisa Hutang',
            id:'sisaPembayaranHutang',
            name:'sisahutang',
            listeners: {
                    blur: function(txt, The, eOpts) {
                        this.setRawValue(renderNomor(this.getValue()));
                    }
                }
        },{
            xtype:'textfield',
            allowBlank:false,
            fieldLabel:'Jumlah Pembayaran Hutang',
            id:'pembayaranhutang',
            name:'pembayaranhutang',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                         this.setRawValue(renderNomor(this.getValue()));
                         // updatePembayaranHutang();
                    }, c);
                }
            }
            // listeners: {
            //         blur: function(txt, The, eOpts) {
            //             this.setRawValue(renderNomor(this.getValue()));
            //         }
            //     }
        },
        {
            xtype: 'datefield',
            name:'tglpembayaran',
            format: 'Y-m-d',
            fieldLabel: 'Tanggal Pembayaran'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Akun Pembayaran Hutang',
            name: 'accnamekas',
            id: 'accnameBayarHutang',
            allowBlank:false,
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupAccKasBayarHutang.show();

                         storeAccountAktive.reload({
                                    params: {
                                        'idunit': Ext.getCmp('idunitPembayaranHutang').getValue()
                                    }
                                });
                    });
                }
            }
        },{
            xtype: 'hiddenfield',
            fieldLabel: 'idaccTerimaHutang',
            name: 'idaccountkas',
            id: 'idaccBayarHutang'
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupPembayaranHutang');
                Ext.getCmp('formPembayaranHutang').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnPembayaranHutangSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                var sisaPembayaranHutang = str_replace(".","",Ext.getCmp('sisaPembayaranHutang').getValue())*1;
                var pembayaranhutang = str_replace(".","",Ext.getCmp('pembayaranhutang').getValue())*1;
                if(pembayaranhutang>sisaPembayaranHutang)
                {
                    Ext.Msg.alert("Error!", "Pembayaran Hutang lebih besar dari jumlah Hutang...");
                } else {
                    if (form.isValid()) {
                        form.submit({
                            success: function(form, action) {
                                Ext.Msg.alert('Success', action.result.message);

                                Ext.getCmp('formPembayaranHutang').getForm().reset();
                                Ext.getCmp('windowPopupPembayaranHutang').hide();

                                storeGridregHutang.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                storeGridregHutang.load();
                            }
                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
                }
                
            }
        }]
});

var wPembayaranHutang = Ext.create('widget.window', {
    id: 'windowPopupPembayaranHutang',
    title: 'Pembayaran Hutang',
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
    items: [formPembayaranHutang]
});