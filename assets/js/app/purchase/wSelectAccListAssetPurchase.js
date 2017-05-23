Ext.define('GridTreeSelectAccListAsset', {
//    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeSelectAccListAsset',
    id: 'GridTreeSelectAccListAsset',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeSelectAccListAsset',
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
                        // console.log('GridTreeSelectAccListAsset');
                        var gridAsset = Ext.ComponentQuery.query('GridTreeSelectAccListAsset')[0];
                        var selectedRecordAsset = gridAsset.getSelectionModel().getSelection()[0];
                        var dataAsset = gridAsset.getSelectionModel().getSelection();
                        if (dataAsset.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            
                            
                            var grid = Ext.ComponentQuery.query('GridItemPurchase')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
// console.log('assetaccount:'+selectedRecord.get('id'));
                            var recPO = new mPurchaseGridStore({
                                idinventory: selectedRecord.get('idinventory'),
                                invno: selectedRecord.get('invno'),
                                nameinventory: selectedRecord.get('nameinventory'),
                                price: selectedRecord.get('cost'),
                                idunit:Ext.getCmp('cbUnitEntryPurchase').getValue(),
                                assetaccount:selectedRecordAsset.get('id'),
                                qty: 1,
                                disc: 0,
                                total: selectedRecord.get('cost'),
                                ratetax: 0
        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            });

                            var gridPO = Ext.getCmp('EntryPurchase');
                            gridPO.getStore().insert(0, recPO);
                            updateGridPurchase('general');
                    
                            Ext.getCmp('wItemPurchasePopup').hide();
                            Ext.getCmp('wFormSelectAssetPurchase').hide();
                            // Ext.getCmp('accnameFormSelectAssetPurchase').setValue(selectedRecord.get('text'));
                            // Ext.getCmp('idaccountFormSelectAssetPurchase').setValue(selectedRecord.get('id'));
                            // Ext.getCmp('accnumberFormSelectAssetPurchase').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('windowPopupSelectAccListAsset').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchSelectAccListAsset',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccountAktive.load({
                                    params: {
                                        'accname': Ext.getCmp('searchSelectAccListAsset').getValue(),
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
                                'accname': Ext.getCmp('searchSelectAccListAsset').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataSelectAccListAsset',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeSelectAccListAsset');
                        grid.getView().refresh();
                        storeAccountAktive.load();
                        Ext.getCmp('searchSelectAccListAsset').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeSelectAccListAsset').expandAll();
            }
        }
    }
});

var windowPopupSelectAccListAsset = Ext.create('widget.window', {
    id: 'windowPopupSelectAccListAsset',
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
                xtype: 'GridTreeSelectAccListAsset'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupSelectAccListAsset = Ext.getCmp('windowPopupSelectAccListAsset');
                windowPopupSelectAccListAsset.hide();
            }
        }]
});



Ext.define('GridSelectAccListAsset', {
    itemId: 'GridSelectAccListAsset',
    id: 'GridSelectAccListAsset',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSelectAccListAsset',
    store: storeGridAccount,
    loadMask: true,
    columns: [
    {
            text: 'Edit',
            width: 45,
            // menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: 'Pilih Akun Ini',
            align: 'center',
            icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
            handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecordAsset, row) {
               // setValueAcc(selectedRecord,'wSelectAccListAssetPopup','Receive');

                        // var gridAsset = Ext.ComponentQuery.query('GridTreeSelectAccListAsset')[0];
                        // var selectedRecordAsset = gridAsset.getSelectionModel().getSelection()[0];
                        // var dataAsset = gridAsset.getSelectionModel().getSelection();
                        // if (dataAsset.length == 0)
                        // {
                        //     Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        // } else {
                            
                            
                            var grid = Ext.ComponentQuery.query('GridItemPurchase')[0];
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
// console.log('assetaccount:'+selectedRecord.get('id'));
                            var recPO = new mPurchaseGridStore({
                                idinventory: selectedRecord.get('idinventory'),
                                invno: selectedRecord.get('invno'),
                                nameinventory: selectedRecord.get('nameinventory'),
                                price: selectedRecord.get('cost'),
                                idunit:Ext.getCmp('cbUnitEntryPurchase').getValue(),
                                assetaccount:selectedRecordAsset.get('idaccount'),
                                qty: 1,
                                disc: 0,
                                total: selectedRecord.get('cost'),
                                ratetax: 0
        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            });

                            var gridPO = Ext.getCmp('EntryPurchase');
                            gridPO.getStore().insert(0, recPO);
                            updateGridPurchase('general');
                    
                            Ext.getCmp('wItemPurchasePopup').hide();
                            Ext.getCmp('wFormSelectAssetPurchase').hide();
                            // Ext.getCmp('accnameFormSelectAssetPurchase').setValue(selectedRecord.get('text'));
                            // Ext.getCmp('idaccountFormSelectAssetPurchase').setValue(selectedRecord.get('id'));
                            // Ext.getCmp('accnumberFormSelectAssetPurchase').setValue(selectedRecord.get('accnumber'));

                            Ext.getCmp('wSelectAccListAssetPopup').hide();
                            
                        // }

            }
        },
        {header: 'idaccount', dataIndex: 'idaccount', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'No Akun', dataIndex: 'accnumber',},
        {header: 'Nama Akun', dataIndex: 'accname', minWidth: 150,flex:1},
        {header: 'Saldo', dataIndex: 'balance', minWidth: 150,xtype:'numbercolumn',align:'right',hidden:true},
        {header: 'Tipe Akun', dataIndex: 'acctypename', minWidth: 170},
        // {header: 'Deskripsi', dataIndex: 'description', minWidth: 250},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     text: 'Pilih Akun',
                //     iconCls: 'add-icon',
                //     handler: function() {
                //         var grid = Ext.ComponentQuery.query('GridSelectAccListAsset')[0];
                //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
                //         var data = grid.getSelectionModel().getSelection();
                //         if (data.length == 0)
                //         {
                //             Ext.Msg.alert('Failure', 'Pilih akun terlebih dahulu!');
                //         } else {
                            
                //             setValueAcc(selectedRecord,'wSelectAccListAssetPopup','Receive');
                //         }
                //     }
                // },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridAcc',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridAccount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ]
});

var wSelectAccListAssetPopup = Ext.create('widget.window', {
    id: 'wSelectAccListAssetPopup',
    title: 'Pilih Akun Asset',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 660,
    height: panelHeight,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridSelectAccListAsset'
    }]
});

///////////////////////////FORM///////////////////////////////////
var FormSelectAssetPurchase = Ext.create('Ext.form.Panel', {
    id: 'FormSelectAssetPurchase',
    width: 450,
    height: 140,
//    url: SITE_URL + 'account/saveLink',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 150,
        width: 400
    },
    items: [{
            xtype: 'textfield',
            fieldLabel: 'Pilih Akun',
            name: 'accname',
            id: 'accnameFormSelectAssetPurchase',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        wSelectAccListAssetPopup.show();
                        storeGridAccount.on('beforeload',function(store, operation,eOpts){
                            operation.params={
                                        'idunit': Ext.getCmp('cbUnitEntryPurchase').getValue(),
                                        'idaccounttype':'17,3,4,5,20'
                            };
                        });
                        storeGridAccount.load();
                        // windowPopupSelectAccListAsset.show();
                        // storeAccountAktive.load({
                        //     params: {
                        //         'idunit': Ext.getCmp('cbUnitEntryPurchase').getValue(),
                        //         'idaccounttype':'17,3,4,5,20'
                        //     }
                        // });
                    });
                }
            }
        },
        {
            xtype: 'displayfield',
            fieldLabel: 'Nomor Akun',
            id: 'accnumberFormSelectAssetPurchase',
            name: 'accnumber',
            readOnly: true
        },
        {
            xtype: 'hiddenfield',
            id: 'idaccountFormSelectAssetPurchase',
            name: 'idaccount',
            readOnly: true
        },
       Ext.panel.Panel({
            // title:'Informasi',
            html: 'Info: Akun Asset (harta) digunakan untuk menyimpan saldo persediaan dari barang tersebut'
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var win = Ext.getCmp('wFormSelectAssetPurchase');
                Ext.getCmp('FormSelectAssetPurchase').getForm().reset();
                win.hide();
            }
        }]
});

var wFormSelectAssetPurchase = Ext.create('widget.window', {
    id: 'wFormSelectAssetPurchase',
    title: 'Pilih Akun Asset (harta)',
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
    items: [FormSelectAssetPurchase]
});

