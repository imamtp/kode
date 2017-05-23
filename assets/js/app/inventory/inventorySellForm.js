Ext.define('GridTreeincomeAccountLink', {
    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeincomeAccountLink',
    id: 'GridTreeincomeAccountLink',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeincomeAccountLink',
    xtype: 'tree-grid',
    store: storeAccount,
    loadMask: true,
    // height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
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
        }, {
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'treecolumn',
            text: 'description',
            minWidth: 200,
            sortable: true,
            dataIndex: 'description'
        }, {
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'treecolumn',
            text: 'balance',
            sortable: true,
            minWidth: 200,
            dataIndex: 'id'
        }
    ]
    , dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'PilihAccLink',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeincomeAccountLink')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            
                            Ext.getCmp('incomeaccountSell').setValue(selectedRecord.get('text'));
                            Ext.getCmp('incomeaccountSellID').setValue(selectedRecord.get('id'));
                            Ext.getCmp('accnumberSell').setValue(selectedRecord.get('accnumber'));
                            
                            Ext.getCmp('windowPopupincomeAccountLink').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchincomeAccountLink',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccount.load({
                                    params: {
                                        'accname': Ext.getCmp('searchincomeAccountLink').getValue(),
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
                                'accname': Ext.getCmp('searchincomeAccountLink').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataincomeAccountLink',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeincomeAccountLink');
                        grid.getView().refresh();
                        storeAccount.load();
                        Ext.getCmp('searchincomeAccountLink').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeincomeAccountLink').expandAll();
            }
        }
    }
});

var windowPopupincomeAccountLink = Ext.create('widget.window', {
    id: 'windowPopupincomeAccountLink',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
     minWidth: 750,
            height: 550,
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
            items: [{
                xtype: 'GridTreeincomeAccountLink'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupincomeAccountLink = Ext.getCmp('windowPopupincomeAccountLink');
                windowPopupincomeAccountLink.hide();
            }
        }]
});

Ext.define('FormSell', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FormSell',
    autoDestroy: false,
    initComponent: function() {
        var peg = this;
        peg.title = 'Penjualan';
        peg.url = SITE_URL + 'inventory/saveSell/';
        peg.bodyStyle = 'padding:5px';
        peg.labelAlign = 'top';
        peg.fieldDefaults = {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 100
        };
        peg.bodyPadding = 10;
        peg.defaults = {
            labelWidth: 140,
            labelAlign: 'left'
            , width: '100%'
        };
        peg.items = [
            {
                xtype: 'hiddenfield',
                name: 'idinventory',
                id: 'idinventorySell'
            },
            {
                xtype: 'hiddenfield',
                name: 'incomeaccount',
                id: 'incomeaccountSellID'
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Nomor Akun Penjualan',
                layout: 'hbox',
                defaultType: 'textfield',
                defaults: {
                    hideLabel: 'true'
                },
                items: [
                    {
                        name: 'accname',
                        id: 'incomeaccountSell',
                        emptyText: 'Pilih Akun',
                        flex: 3,
                        margins: '0 6 0 0',
                        allowBlank: false,
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    windowPopupincomeAccountLink.show();
                                });
                            }
                        }
                    }, {
                        xtype: 'displayfield',
                        name: 'accnumber',
                        id: 'accnumberSell',
                        flex: 1
                    }]
            },
            {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: 'Harga Dasar Penjualan',
                name: 'sellingprice'
            },
            {
                xtype: 'comboxtax',
                anchor: '100%',
                name: 'nametax',
                fieldLabel: 'Pajak Penjualan'
            },
            {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: 'Satuan',
                name: 'unitmeasuresell'
            }
        ];

        peg.buttons = ['->', {
                text: 'Simpan Perubahan Data',
                id: 'simpanSellID',
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {

                        form.submit({
                            success: function(form, action) {
                                Ext.Msg.alert('Success', action.result.message);
                                storeGridInventorySellGrid.load();
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
                }
            }];

        peg.callParent();
    },
    afterRender: function()
    {
        this.superclass.afterRender.apply(this);
        this.doLayout();
    }
});

