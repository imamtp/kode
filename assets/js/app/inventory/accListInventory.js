Ext.define('GridTreeAccLinkedInventoryAsset', {
            // title: 'Daftar Akun',
            // selModel : smGridIP,   
            itemId: 'GridTreeAccLinkedInventoryAsset',
            id: 'GridTreeAccLinkedInventoryAsset',
            extend: 'Ext.tree.Panel',
            alias: 'widget.GridTreeAccLinkedInventoryAsset',
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
                            text: 'Pilih Akun',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.ComponentQuery.query('GridTreeAccLinkedInventoryAsset')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                                } else {
                                    console.log(selectedRecord);
                                    Ext.getCmp('accnameAsset').setValue(selectedRecord.get('text')+' '+selectedRecord.get('accnumber'));
                                    Ext.getCmp('assetaccount').setValue(selectedRecord.get('id'));
                                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                                    Ext.getCmp('windowPopupAccLinkedInventoryAsset').hide();
                                }


                            }
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'searchAccLinkedInventoryAsset',
                            blankText: 'Cari akun disini',
                            listeners: {
                                specialkey: function(f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeAccountAktive.load({
                                            params: {
                                                'accname': Ext.getCmp('searchAccLinkedInventoryAsset').getValue(),
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
                                        'accname': Ext.getCmp('searchAccLinkedInventoryAsset').getValue(),
                                    }
                                });
                            }
                        }, '-', {
                            itemId: 'reloadDataAccLinkedInventoryAsset',
                            text: 'Refresh',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.getCmp('GridTreeAccLinkedInventoryAsset');
                                grid.getView().refresh();
                                storeAccountAktive.load();
                                Ext.getCmp('searchAccLinkedInventoryAsset').setValue(null)
                            }
                        }]
                }
            ]
            , listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
                        // Ext.getCmp('GridTreeAccLinkedInventoryAsset').expandAll();
                    }
                }
            }
        });

       var  AccLinkedInventoryAsset = Ext.create('widget.window', {
            id: 'windowPopupAccLinkedInventoryAsset',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            autoWidth: true,
            title: 'Daftar Akun',
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
                    items: [{
                            xtype: 'GridTreeAccLinkedInventoryAsset'
                        }]
                })
            ],
            buttons: [{
                    text: 'Tutup',
                    handler: function() {
                        var windowPopupAccLinkedInventoryAsset = Ext.getCmp('windowPopupAccLinkedInventoryAsset');
                        windowPopupAccLinkedInventoryAsset.hide();
                    }
                }]
        });

// 

Ext.define('GridTreeAccLinkedInventoryAkumulasi', {
            // title: 'Daftar Akun',
            // selModel : smGridIP,   
            itemId: 'GridTreeAccLinkedInventoryAkumulasi',
            id: 'GridTreeAccLinkedInventoryAkumulasi',
            extend: 'Ext.tree.Panel',
            alias: 'widget.GridTreeAccLinkedInventoryAkumulasi',
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
                            text: 'Pilih Akun',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.ComponentQuery.query('GridTreeAccLinkedInventoryAkumulasi')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                                } else {
                                    console.log(selectedRecord);
                                    Ext.getCmp('accnamePenyusutan').setValue(selectedRecord.get('text')+' '+selectedRecord.get('accnumber'));
                                    Ext.getCmp('akumpenyusutaccount').setValue(selectedRecord.get('id'));
                                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                                    Ext.getCmp('windowPopupAccLinkedInventoryAkumulasi').hide();
                                }


                            }
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'searchAccLinkedInventoryAkumulasi',
                            blankText: 'Cari akun disini',
                            listeners: {
                                specialkey: function(f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeAccountAktive.load({
                                            params: {
                                                'accname': Ext.getCmp('searchAccLinkedInventoryAkumulasi').getValue(),
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
                                        'accname': Ext.getCmp('searchAccLinkedInventoryAkumulasi').getValue(),
                                    }
                                });
                            }
                        }, '-', {
                            itemId: 'reloadDataAccLinkedInventoryAkumulasi',
                            text: 'Refresh',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.getCmp('GridTreeAccLinkedInventoryAkumulasi');
                                grid.getView().refresh();
                                storeAccountAktive.load();
                                Ext.getCmp('searchAccLinkedInventoryAkumulasi').setValue(null)
                            }
                        }]
                }
            ]
            , listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
                        // Ext.getCmp('GridTreeAccLinkedInventoryAkumulasi').expandAll();
                    }
                }
            }
        });

       var  AccLinkedInventoryAkumulasi = Ext.create('widget.window', {
            id: 'windowPopupAccLinkedInventoryAkumulasi',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            autoWidth: true,
            title: 'Daftar Akun',
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
                    items: [{
                            xtype: 'GridTreeAccLinkedInventoryAkumulasi'
                        }]
                })
            ],
            buttons: [{
                    text: 'Tutup',
                    handler: function() {
                        var windowPopupAccLinkedInventoryAkumulasi = Ext.getCmp('windowPopupAccLinkedInventoryAkumulasi');
                        windowPopupAccLinkedInventoryAkumulasi.hide();
                    }
                }]
        });


// 

Ext.define('GridTreeAccLinkedInventoryBeban', {
            // title: 'Daftar Akun',
            // selModel : smGridIP,   
            itemId: 'GridTreeAccLinkedInventoryBeban',
            id: 'GridTreeAccLinkedInventoryBeban',
            extend: 'Ext.tree.Panel',
            alias: 'widget.GridTreeAccLinkedInventoryBeban',
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
                            text: 'Pilih Akun',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.ComponentQuery.query('GridTreeAccLinkedInventoryBeban')[0];
                                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                                var data = grid.getSelectionModel().getSelection();
                                if (data.length == 0)
                                {
                                    Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                                } else {
                                    console.log(selectedRecord);
                                    Ext.getCmp('accnameDepresiasi').setValue(selectedRecord.get('text')+' '+selectedRecord.get('accnumber'));
                                    Ext.getCmp('depresiasiaccount').setValue(selectedRecord.get('id'));
                                    // Ext.getCmp('linkedidaccountdisplay').setValue(selectedRecord.get('accnumber'));

                                    Ext.getCmp('windowPopupAccLinkedInventoryBeban').hide();
                                }


                            }
                        }, '->',
                        {
                            xtype: 'textfield',
                            id: 'searchAccLinkedInventoryBeban',
                            blankText: 'Cari akun disini',
                            listeners: {
                                specialkey: function(f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        storeAccountAktive.load({
                                            params: {
                                                'accname': Ext.getCmp('searchAccLinkedInventoryBeban').getValue(),
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
                                        'accname': Ext.getCmp('searchAccLinkedInventoryBeban').getValue(),
                                    }
                                });
                            }
                        }, '-', {
                            itemId: 'reloadDataAccLinkedInventoryBeban',
                            text: 'Refresh',
                            iconCls: 'add-icon',
                            handler: function() {
                                var grid = Ext.getCmp('GridTreeAccLinkedInventoryBeban');
                                grid.getView().refresh();
                                storeAccountAktive.load();
                                Ext.getCmp('searchAccLinkedInventoryBeban').setValue(null)
                            }
                        }]
                }
            ]
            , listeners: {
                render: {
                    scope: this,
                    fn: function(grid) {
                        // Ext.getCmp('GridTreeAccLinkedInventoryBeban').expandAll();
                    }
                }
            }
        });

       var  AccLinkedInventoryBeban = Ext.create('widget.window', {
            id: 'windowPopupAccLinkedInventoryBeban',
            header: {
                titlePosition: 2,
                titleAlign: 'center'
            },
            closable: true,
            closeAction: 'hide',
            autoWidth: true,
            title: 'Daftar Akun',
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
                    items: [{
                            xtype: 'GridTreeAccLinkedInventoryBeban'
                        }]
                })
            ],
            buttons: [{
                    text: 'Tutup',
                    handler: function() {
                        var windowPopupAccLinkedInventoryBeban = Ext.getCmp('windowPopupAccLinkedInventoryBeban');
                        windowPopupAccLinkedInventoryBeban.hide();
                    }
                }]
        });