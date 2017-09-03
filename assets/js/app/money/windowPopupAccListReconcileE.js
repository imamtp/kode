Ext.define('GridTreeAccListReconcileE', {
    itemId: 'GridTreeAccListReconcileE',
    id: 'GridTreeAccListReconcileE',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeAccListReconcileE',
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
                    text: 'Pilih Akun',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridTreeAccListReconcileE')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            console.log(selectedRecord);
                            
                            Ext.getCmp('accnameReconcileE').setValue(selectedRecord.get('accnumber')+'   '+selectedRecord.get('text'));
                            Ext.getCmp('idaccountReconcileE').setValue(selectedRecord.get('id'));

                            Ext.getCmp('memoE').setValue('Beban '+selectedRecord.get('text'));

                            Ext.getCmp('windowPopupAccListReconcileE').hide();
                            
                            updateSelisih();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchAccListReconcileE',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchAccListReconcileE').getValue(),
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
                                'accname': Ext.getCmp('searchAccListReconcileE').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataAccListReconcileE',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeAccListReconcileE');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchAccListReconcileE').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeAccListReconcileE').expandAll();
            }
        }
    }
});

Ext.define(dir_sys + 'money.windowPopupAccListReconcileE',{
    extend: 'Ext.window.Window',
    alias: 'widget.windowPopupAccListReconcileE',
// var windowPopupAccListReconcileE = Ext.create('widget.window', {
    id: 'windowPopupAccListReconcileE',
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
                xtype: 'GridTreeAccListReconcileE'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupAccListReconcileE = Ext.getCmp('windowPopupAccListReconcileE');
                windowPopupAccListReconcileE.hide();
            }
        }]
});


