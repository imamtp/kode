Ext.define('GridTreecosAccountLink', {
    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreecosAccountLink',
    id: 'GridTreecosAccountLink',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreecosAccountLink',
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
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'PilihAccLink',
            text: 'Pilih Akun',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridTreecosAccountLink')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                } else {
                    Ext.getCmp('cosaccountnameBuy').setValue(selectedRecord.get('text'));
                    Ext.getCmp('cosaccountBuy').setValue(selectedRecord.get('id'));
                    Ext.getCmp('accnumberBuy').setValue(selectedRecord.get('accnumber'));
                    Ext.getCmp('windowPopupcosAccountLink').hide();
                }
            }
        }, '->', {
            xtype: 'textfield',
            id: 'searchcosAccountLink',
            blankText: 'Cari akun disini',
            listeners: {
                specialkey: function(f, e) {
                    if (e.getKey() == e.ENTER) {
                        storeAccount.load({
                            params: {
                                'accname': Ext.getCmp('searchcosAccountLink').getValue(),
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
                        'accname': Ext.getCmp('searchcosAccountLink').getValue(),
                    }
                });
            }
        }, '-', {
            itemId: 'reloadDatacosAccountLink',
            text: 'Refresh',
            iconCls: 'add-icon',
            handler: function() {
                var grid = Ext.getCmp('GridTreecosAccountLink');
                grid.getView().refresh();
                storeAccount.load();
                Ext.getCmp('searchcosAccountLink').setValue(null)
            }
        }]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreecosAccountLink').expandAll();
            }
        }
    }
});
var windowPopupcosAccountLink = Ext.create('widget.window', {
    id: 'windowPopupcosAccountLink',
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
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
            id: 'tabAccTreeLinked',
            items: [{
                xtype: 'GridTreecosAccountLink'
            }]
        })
    ],
    buttons: [{
        text: 'Tutup',
        handler: function() {
            var windowPopupcosAccountLink = Ext.getCmp('windowPopupcosAccountLink');
            windowPopupcosAccountLink.hide();
        }
    }]
});
Ext.define('FormBuy', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FormBuy',
    id: 'FormBuy',
    autoDestroy: false,
    initComponent: function() {
        var peg = this;
        peg.title = 'Pembelian';
        peg.url = SITE_URL + 'inventory/saveBuy/';
        peg.bodyStyle = 'padding:5px';
        peg.labelAlign = 'top';
        peg.fieldDefaults = {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 100
        };
        peg.bodyPadding = 10;
        peg.defaults = {
            labelWidth: 180,
            labelAlign: 'left',
            width: '100%'
        };
        peg.items = [{
                xtype: 'hiddenfield',
                name: 'idinventory',
                id: 'idinventoryBuy'
            }, {
                xtype: 'hiddenfield',
                name: 'cosaccount',
                id: 'cosaccountBuy'
            },
            //                 {
            //                     xtype: 'fieldcontainer',
            //                     fieldLabel: 'Harga Pokok Barang Dagang',
            //                     layout: 'hbox',
            // //                    combineErrors: true,
            //                     defaultType: 'textfield',
            //                     defaults: {
            //                         hideLabel: 'true'
            //                     },
            //                     items: [
            //                         {
            //                         name: 'accname',
            //                         id: 'cosaccountnameBuy',
            //                         emptyText: 'Pilih Akun',
            //                         flex: 3,
            //                         margins: '0 6 0 0',
            //                         allowBlank: false,
            //                             listeners: {
            //                                 render: function(component) {
            //                                     component.getEl().on('click', function(event, el) {
            //                                         windowPopupcosAccountLink.show();
            //                                     });
            //                                 }
            //                             }
            //                     },{
            //                             xtype:'displayfield',
            //                         name: 'accnumber',
            //                         id: 'accnumberBuy',
            //                         flex: 1
            //                     }]
            //                 },
            //            {
            //                    xtype: 'fieldcontainer',
            //                    fieldLabel: 'Nomor Akun',
            //                    defaultType: 'textfield',
            //                    items: [{
            //                            width: 30,
            //                            xtype: 'displayfield',
            //                            name: 'accnumberInvBuy',
            //                            id: 'accnumberBuy'
            //                        }, {
            //                            width: 80,
            //                            name: 'cosaccountname',
            //                            id: 'cosaccountnameBuy',
            //                            allowBlank: false,
            //                            listeners: {
            //                                render: function(component) {
            //                                    component.getEl().on('click', function(event, el) {
            //                                        windowPopupcosAccountLink.show();
            //                                    });
            //                                }
            //                            }
            //                        }]
            //            },
            //            {
            //                xtype: 'textfield',
            //                anchor: '100%',
            //                fieldLabel: 'Akun Harga Pokok',
            //                name: 'cosaccountname',
            //                id: 'cosaccountname',
            //                listeners: {
            //                    render: function(component) {
            //                        component.getEl().on('click', function(event, el) {
            //                            windowPopupcosAccountLink.show();
            //                        });
            //                    }
            //                }
            //            },
            //            Ext.create('Ext.ux.form.NumericField',
            //            {
            //                useThousandSeparator: true,
            //                decimalPrecision: 5,
            //                alwaysDisplayDecimals: false,
            //                thousandSeparator: '.',
            //                decimalSeparator: ',',
            //                fieldLabel: 'Harga Beli',
            //                margins: '0 0 0 80',
            //                anchor: '90%',
            //                name: 'cost'
            //            }),
            {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: 'Harga Beli',
                id: 'costInventory',
                name: 'cost'
            }, {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: 'Satuan',
                name: 'unitmeasure'
            }, {
                xtype: 'comboxtax',
                anchor: '100%',
                fieldLabel: 'Pajak Pembelian'
            }, {
                xtype: 'comboxsupplier',
                anchor: '100%'
            }, {
                xtype: 'datefield',
                anchor: '100%',
                format: 'd/m/Y',
                fieldLabel: 'Tgl Beli',
                id: 'datebuy',
                name: 'datebuy'
            }
        ];
        peg.buttons = ['->', {
            text: 'Simpan Perubahan Data',
            id: 'simpanBuyID',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            storeGridInventoryBuyGrid.load();
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
    afterRender: function() {
        this.superclass.afterRender.apply(this);
        this.doLayout();
    }
});