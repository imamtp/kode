Ext.define('GridTreeAddRowAdj', {
    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeAddRowAdj',
    id: 'GridTreeAddRowAdj',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAddRowAdj',
    xtype: 'tree-grid',
    store: storeAccountAktive,
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
                    itemId: 'PilihAccLinkAdj',
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAddRowAdj')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            
                            Ext.getCmp('accnameAddRowAdj').setValue(selectedRecord.get('text'));
                            Ext.getCmp('idaccountAddRowAdj').setValue(selectedRecord.get('id'));
                            Ext.getCmp('accnumberAddRowAdj').setValue(selectedRecord.get('accnumber'));
                            
                            Ext.getCmp('windowPopupTreeAddRowAdj').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchcosAccountLink',
                    blankText:'Cari akun disini',
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
                    iconCls: 'add-icon'
                    , handler: function() {
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
                        var grid = Ext.getCmp('GridTreeAddRowAdj');
                        grid.getView().refresh();
                        storeAccount.load();
                        Ext.getCmp('searchcosAccountLink').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAddRowAdj').expandAll();
            }
        }
    }
});

var windowPopupTreeAddRowAdj = Ext.create('widget.window', {
    id: 'windowPopupTreeAddRowAdj',
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
            id: 'tabAccTreeLinked',
            items: [{
                xtype: 'GridTreeAddRowAdj'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupTreeAddRowAdj = Ext.getCmp('windowPopupTreeAddRowAdj');
                windowPopupTreeAddRowAdj.hide();
            }
        }]
});