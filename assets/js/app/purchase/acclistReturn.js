Ext.define('GridTreeAccListReturn', {
    itemId: 'GridTreeAccListReturn',
    id: 'GridTreeAccListReturn',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccListReturn',
    xtype: 'tree-grid',
    store: storeAccountAktive,
    loadMask: true,
    // height: 300,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    // singleExpand: false,
    expanded: false,
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
            flex: 1,
            sortable: true,
            dataIndex: 'text'
        }, {
            //we must use the templateheader component so we can use a custom tpl
            xtype: 'numbercolumn',
            align: 'right',
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
                        var grid = Ext.ComponentQuery.query('GridTreeAccListReturn')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            console.log(selectedRecord);

                            Ext.getCmp('accnameReturn').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccountReturn').setValue(selectedRecord.get('id'));
                            Ext.getCmp('accnumberReturn').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupAccListReturn').hide();
                        }


                    }
                }, '-', {
                    xtype: 'button',
//                            width:100,
                    handler: function(button, event) {
                        Ext.getCmp('GridTreeAccListReturn').expandAll();
                    },
                    flex: 1,
                    text: 'Expand'
                }, {
                    xtype: 'button',
                    handler: function(button, event) {
                        Ext.getCmp('GridTreeAccListReturn').collapseAll();
                    },
                    flex: 1,
                    text: 'Collapse'
                }, '->',
                {
                    xtype: 'textfield',
                    id: 'searchAccListReturn',
                    blankText: 'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccListReturn').getValue(),
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
                                'accname': Ext.getCmp('searchAccListReturn').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccListReturn',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccListReturn');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccListReturn').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccListReturn').expandAll();
            }
        }
    }
});

var windowPopupAccListReturn = Ext.create('widget.window', {
    id: 'windowPopupAccListReturn',
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
            bodyPadding: 5, // Don't want content to crunch against the borders
            width: 500,
            height: 300,
            layout: 'fit',
//            id: 'tabAccTreeLinked',
            items: [{
                    xtype: 'GridTreeAccListReturn'
                }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccListReturn = Ext.getCmp('windowPopupAccListReturn');
                windowPopupAccListReturn.hide();
            }
        }]
});