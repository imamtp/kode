Ext.define('storeGridAccInvModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','idunit','accasset','akumpenyusut','depresiasi','namaunit'],
    idProperty: 'id'
});

var storeGridAccInv = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storeGridAccInvModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/accLinkInventory/inventory',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});

var formlinkedaccInventory = Ext.create('Ext.form.Panel', {
    id: 'formlinkedaccInventory',
    width: 450,
    height: 200,
    url: SITE_URL + 'inventory/saveAccInventory',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 200,
        width: 400
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'statusformlinkedaccInventory',
            id: 'statusformlinkedaccInventory'
        },{
            xtype: 'hiddenfield',
            id: 'idinventoryAccInventory',
            name: 'idinventory',
            readOnly: true
        },{
            xtype: 'hiddenfield',
            id: 'idunitAccInventory',
            name: 'idunit',
            readOnly: true
        },{
            xtype: 'textfield',
            fieldLabel:'Unit',
            id: 'namaunitAccInventory',
            name: 'namaunitAccInventory',
            readOnly: true
        },{
            xtype: 'hiddenfield',
            id: 'assetaccount',
            name: 'assetaccount',
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Asset (Harta)',
            name: 'accname',
            id: 'accnameAsset',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        AccLinkedInventoryAsset.show();
                        storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('idunitAccInventory').getValue()
                            }
                        });
                    });
                }
            }
        }, {
            xtype: 'hiddenfield',
            id: 'akumpenyusutaccount',
            name: 'akumpenyusutaccount',
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Akumulasi Depresiasi',
            name: 'accnamePenyusutan',
            id: 'accnamePenyusutan',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        AccLinkedInventoryAkumulasi.show();
                        storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('idunitAccInventory').getValue()
                            }
                        });
                    });
                }
            }
        }, {
            xtype: 'hiddenfield',
            id: 'depresiasiaccount',
            name: 'depresiasiaccount',
            readOnly: true
        }, {
            xtype: 'textfield',
            fieldLabel: 'Akun Beban Depresiasi',
            name: 'accnameDepresiasi',
            id: 'accnameDepresiasi',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        AccLinkedInventoryBeban.show();
                        storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('idunitAccInventory').getValue()
                            }
                        });
                    });
                }
            }
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopuplinkedaccInventory');
                Ext.getCmp('formlinkedaccInventory').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnlinkedaccSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            console.log(action);
                            Ext.Msg.alert('Success', action.result.message);

                            // storeGridAccInv.load();

                            storeGridAccInv.load({
                                params: {
                                  'extraparams': 'idinventory:'+Ext.getCmp('idinventoryAccInventory').getValue()
                                }
                            });

                            Ext.getCmp('windowPopuplinkedaccInventory').hide();

                            Ext.getCmp('formlinkedaccInventory').getForm().reset();
                            Ext.getCmp('windowPopuplinkedaccInventory').hide();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            storeGridlinkedacc.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wlinkedaccInventory = Ext.create('widget.window', {
    id: 'windowPopuplinkedaccInventory',
    title: 'Kode Akun',
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
    items: [formlinkedaccInventory]
});


Ext.define('GridTreeassetAccountLink', {
    title: 'Daftar Akun',
    // selModel : smGridIP,   
    itemId: 'GridTreeassetAccountLink',
    id: 'GridTreeassetAccountLink',
    extend: 'Ext.tree.Panel',
    alias: 'widget.GridTreeassetAccountLink',
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
                        var grid = Ext.ComponentQuery.query('GridTreeassetAccountLink')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Akun terlebih dahulu!');
                        } else {
                            
                            Ext.getCmp('assetaccountInvTxt').setValue(selectedRecord.get('text'));
                            Ext.getCmp('assetaccountInvID').setValue(selectedRecord.get('id'));
                            Ext.getCmp('assetaccountInvNum').setValue(selectedRecord.get('accnumber'));
                            
                            Ext.getCmp('windowPopupassetAccountLink').hide();
                        }


                    }
                },'->',
                {
                    xtype: 'textfield',
                    id: 'searchassetAccountLink',
                    blankText:'Cari akun disini',
                    listeners: {
                        specialkey: function(f, e) {
                            if (e.getKey() == e.ENTER) {
                                storeAccount.load({
                                    params: {
                                        'accname': Ext.getCmp('searchassetAccountLink').getValue(),
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
                                'accname': Ext.getCmp('searchassetAccountLink').getValue(),
                            }
                        });
                    }
                }, '-', {
                    itemId: 'reloadDataassetAccountLink',
                    text: 'Refresh',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.getCmp('GridTreeassetAccountLink');
                        grid.getView().refresh();
                        storeAccount.load();
                        Ext.getCmp('searchassetAccountLink').setValue(null)
                    }
                }]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                Ext.getCmp('GridTreeassetAccountLink').expandAll();
            }
        }
    }
});

var windowPopupassetAccountLink = Ext.create('widget.window', {
    id: 'windowPopupassetAccountLink',
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
                xtype: 'GridTreeassetAccountLink'
            }]
        })
    ],
    buttons: [{
            text: 'Tutup',
            handler: function() {
                var windowPopupassetAccountLink = Ext.getCmp('windowPopupassetAccountLink');
                windowPopupassetAccountLink.hide();
            }
        }]
});

// Ext.define('FormInventoried', {
//     extend: 'Ext.form.Panel',
//     alias: 'widget.FormInventoried',
//     autoDestroy: false,
//     initComponent: function() {
//         var peg = this;
//         peg.title = 'Persediaan';
//         peg.url = SITE_URL + 'inventory/saveInventory/';
//         peg.bodyStyle = 'padding:5px 25px 0px 5px;';
//         peg.labelAlign = 'top';
//         peg.fieldDefaults = {
//             msgTarget: 'side',
//             blankText: 'Tidak Boleh Kosong',
//             labelWidth: 100
//         };
//         peg.bodyPadding = 7;
//         peg.defaults = {
//             labelWidth: 190,
//             labelAlign: 'left'
//             , width: '98%'
//         };
//         peg.items = [
//              {
//                 xtype: 'hiddenfield',
//                 name: 'idinventory',
//                 id: 'idinventoryInv'
//             },
//             // {
//             //     xtype: 'hiddenfield',
//             //     name: 'assetaccount',
//             //     id: 'assetaccountInvID'
//             // },
//             // {
//             //     xtype: 'fieldcontainer',
//             //     fieldLabel: 'Akun Asset Persediaan',
//             //     layout: 'hbox',
//             //     defaultType: 'textfield',
//             //     defaults: {
//             //         hideLabel: 'true'
//             //     },
//             //     items: [
//             //         {
//             //             name: 'accname',
//             //             id: 'assetaccountInvTxt',
//             //             emptyText: 'Pilih Akun',
//             //             flex: 3,
//             //             margins: '0 6 0 0',
//             //             allowBlank: false,
//             //             listeners: {
//             //                 render: function(component) {
//             //                     component.getEl().on('click', function(event, el) {
//             //                         windowPopupassetAccountLink.show();
//             //                     });
//             //                 }
//             //             }
//             //         }, {
//             //             xtype: 'displayfield',
//             //             name: 'accnumber',
//             //             id: 'assetaccountInvNum',
//             //             flex: 1
//             //         }]
//             // },
//             // {
//             //     xtype: 'numberfield',
//             //     anchor: '98%',
//             //     fieldLabel:'Jumlah Stok',
//             //     id: 'qtystockInv',
//             //     name: 'qtystock'
//             // }, 
//             // {
//             //     xtype: 'numberfield',
//             //     anchor: '98%',
//             //     fieldLabel: 'Nilai Residu',
//             //     listeners: {
//             //          change: function(txt, The, eOpts){
//             //           // this.setRawValue(renderNomor(this.getValue()));
//             //            CalcPenyusutan();
//             //         }
//             //         // 'render': function(c) {
//             //         //     c.getEl().on('keyup', function() {
//             //         //         CalcPenyusutan();
//             //         //     }, c);
//             //         // }
//             //     },
//             //     id: 'residu',
//             //     name: 'residu'
//             // },
//             // {
//             //     xtype: 'numberfield',
//             //     anchor: '98%',
//             //     fieldLabel: 'Umur Ekonomis',
//             //     allowBlank:false,
//             //     id: 'umurEkonomis',
//             //     name: 'umur',
//             //     listeners: {
//             //         'render': function(c) {
//             //             c.getEl().on('keyup', function() {
//             //                 CalcPenyusutan();
//             //             }, c);
//             //         }
//             //     },
//             // },
//             // {
//             //     xtype: 'textfield',
//             //     style: 'text-align: right',
//             //     anchor: '98%',
//             //     labelStyle : 'text-align:left',
//             //     // anchor: '9',
//             //     fieldLabel: 'Akumulasi Beban Berjalan',
//             //     id: 'akumulasibeban',
//             //     allowBlank:false,
//             //     name: 'akumulasibeban',
//             //     // listeners: {
//             //     //     change: function(txt, The, eOpts){
//             //     //       this.setRawValue(renderNomor(this.getValue()));
//             //     //     }
//             //     // }
//             // },
//             // {
//             //     xtype: 'textfield',
//             //     anchor: '98%',
//             //      style: 'text-align: right',
//             //     labelStyle : 'text-align:left',
//             //     fieldLabel: 'Beban Tahun Berjalan',
//             //     id: 'bebanberjalan',
//             //     allowBlank:false,
//             //     name: 'bebanberjalan'
//             // },
//             // {
//             //     xtype: 'textfield',
//             //     anchor: '98%',
//             //      style: 'text-align: right',
//             //     labelStyle : 'text-align:left',
//             //     fieldLabel: 'Nilai Buku Berjalan',
//             //     id: 'nilaibuku',
//             //     readOnly:true,
//             //     allowBlank:false,
//             //     name: 'nilaibuku'
//             // },
//             // {
//             //     xtype: 'textfield',
//             //     anchor: '98%',
//             //      style: 'text-align: right',
//             //     labelStyle : 'text-align:left',
//             //     fieldLabel: 'Beban Perbulan',
//             //     id: 'bebanperbulan',
//             //     allowBlank:false,
//             //     readOnly:true,
//             //     name: 'bebanperbulan'
//             // },
//             //  {
//             //     xtype: 'textfield',
//             //     anchor: '98%',
//             //      style: 'text-align: right',
//             //     labelStyle : 'text-align:left',
//             //     fieldLabel: 'Penyusutan Setelah Habis Usia',
//             //     id: 'akumulasiAkhir',
//             //     allowBlank:false,
//             //     readOnly:true,
//             //     name: 'akumulasiakhir'
//             // },
//             {
//                 xtype: 'gridpanel',
//                 title: 'Kode Akun',
//                 store: storeGridAccInv,
//                 height: 150,
//                 width:659,
//                 columns: [
//                     {header: 'idunit', dataIndex: 'idunit', hidden: true},
//                     {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
//                     {header: 'Nama Unit', dataIndex: 'namaunit', minWidth: 100,flex:1},
//                     {header: 'Asset(Harta)', dataIndex: 'accasset', minWidth: 150, renderer:renderInv},
//                     {header: 'Akumulasi Depresiasi', dataIndex: 'akumpenyusut', minWidth: 150, renderer:renderInv},
//                     {header: 'Depresiasi', dataIndex: 'depresiasi', minWidth: 150, renderer:renderInv}
//                 ], 
//                 listeners: {            
//                     itemdblclick: function(dv, record, item, index, e) {
//                         console.log('te')
//                         // var formAgama = Ext.create('formAgama');
//                         var formlinkedaccInventory = Ext.getCmp('formlinkedaccInventory');
//                         wlinkedaccInventory.show();
//                         Ext.getCmp('namaunitAccInventory').setValue(record.data.namaunit)
//                         Ext.getCmp('idunitAccInventory').setValue(record.data.idunit)
//                         Ext.getCmp('idinventoryAccInventory').setValue(Ext.getCmp('idinventoryInv').getValue());
//                         // storeGridSetupUnit.load();
                        
//                         formlinkedaccInventory.getForm().load({
//                             url: SITE_URL + 'backend/loadFormData/acclinkinventory/1/inventory',
//                             params: {
//                                 extraparams: 'idunit:' + record.data.idunit+','+'idinventory:'+Ext.getCmp('idinventoryInv').getValue()
//                             },
//                             success: function(form, action) {
//                                 var obj = Ext.decode(action.response.responseText);
//                                 console.log(obj)
//                                 // accasset: "Perlengkapan Kantor"akumpenyusut: "Akum. Penyusutan Peralatan"
//                                 // depresiasi: "Operasional Kantor"idinventory: "16"idunit: "2"namaunit: "SMIP"
//                                 Ext.getCmp('idinventoryAccInventory').setValue(obj.data.idinventory);
//                                 Ext.getCmp('idunitAccInventory').setValue(obj.data.idunit);
//                                 Ext.getCmp('namaunitAccInventory').setValue(obj.data.namaunit);
//                                 Ext.getCmp('assetaccount').setValue(obj.data.assetaccount);
//                                 Ext.getCmp('accnameAsset').setValue(obj.data.accasset);
//                                 Ext.getCmp('akumpenyusutaccount').setValue(obj.data.akumpenyusutaccount);
//                                 Ext.getCmp('accnamePenyusutan').setValue(obj.data.akumpenyusut);
//                                 Ext.getCmp('depresiasiaccount').setValue(obj.data.depresiasiaccount);
//                                 Ext.getCmp('accnameDepresiasi').setValue(obj.data.depresiasi);
//                                 // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                             },
//                             failure: function(form, action) {
//                                 // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                             }
//                         })

//                         // Ext.getCmp('statusformlinkedacc').setValue('edit');
//                     }
//                 }
//             }
//         ];

//         peg.buttons = [{
//                 text: 'Simpan Perubahan Data',
//                 id: 'simpanInventoriedID',
//                 handler: function() {
//                     var form = this.up('form').getForm();
//                     if (form.isValid()) {

//                         form.submit({
//                             success: function(form, action) {
//                                Ext.Msg.alert('Success', action.result.message);
//                                storeGridInventoryInvGrid.load();

//                             },
//                             failure: function(form, action) {
//                                 Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                             }
//                         });
//                     } else {
//                         Ext.Msg.alert("Error!", "Your form is invalid!");
//                     }
//                 }
//             },'           '];

//         peg.callParent();
//     },
//     afterRender: function()
//     {
//         this.superclass.afterRender.apply(this);
//         this.doLayout();
//     }
// });



