Ext.define('GridTreeAccListPurchase', {
//    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAccListPurchase',
    id: 'GridTreeAccListPurchase',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccListPurchase',
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
            minWidth: 300,
            flex:1,
            sortable: true,
            dataIndex: 'text'
        },  {
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'numbercolumn',
            align:'right',
            text: 'balance',
            sortable: true,
            minWidth: 100,
            dataIndex: 'balance'
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
                        var grid = Ext.ComponentQuery.query('GridTreeAccListPurchase')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            console.log(selectedRecord);
                            
                            Ext.getCmp('accnamePurchase').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccountPurchase').setValue(selectedRecord.get('id'));
                            Ext.getCmp('accnumberPurchase').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupAccListPurchase').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchAccListPurchase',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccListPurchase').getValue(),
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
                        storeAccountAktive.load({
                            params: {
                                'accname': Ext.getCmp('searchAccListPurchase').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccListPurchase',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccListPurchase');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccListPurchase').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccListPurchase').expandAll();
            }
        }
    }
});

var windowPopupAccListPurchase = Ext.create('widget.window', {
    id: 'windowPopupAccListPurchase',
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
    title: 'Daftar Akun',
    items: [
        Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,  // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout:'fit',
//            id: 'tabAccTreeLinked',
            items: [{
                xtype: 'GridTreeAccListPurchase'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccListPurchase = Ext.getCmp('windowPopupAccListPurchase');
                windowPopupAccListPurchase.hide();
            }
        }]
});