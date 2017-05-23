Ext.define('GridsupplierGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes','status'],
    idProperty: 'id'
});
var storeGridsupplierGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridsupplierGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/supplierGrid',
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

var formSupplierGrid = Ext.create('Ext.form.Panel', {
    id: 'formSupplierGrid',
    width: 740,
    // autoWidth:true,
    height: 370,
    url: SITE_URL + 'backend/saveform/SupplierGrid',
    baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        anchor:'100%'
        // width: 380
    },
    items: [
    {
        items: [{
            xtype: 'hiddenfield',
            name: 'idsupplier',
            id: 'idsupplier'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformSupplierGrid',
            id: 'statusformSupplierGrid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Supplier',
            allowBlank: false,
            name: 'code'
        }, {
            xtype:'comboxsupplier_type'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Nama Supplier',
            allowBlank: false,
            name: 'namesupplier'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat',
            allowBlank: false,
            name: 'companyaddress'
        }, {
            xtype: 'textarea',
            fieldLabel: 'Alamat Pengiriman',
            name: 'shipaddress'
        },{
            xtype: 'textfield',
            fieldLabel: 'No Telepon',
            allowBlank: false,
            name: 'telephone'
        },{
            xtype: 'textfield',
            fieldLabel: 'No Handphone',
            name: 'handphone'
        }]
    }, {
        items: [{
            xtype: 'textfield',
            fieldLabel: 'No Fax',
            name: 'fax'
        },{
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kota',
            name: 'city'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Provinsi',
            name: 'state'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode POS',
            name: 'postcode'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Negara',
            name: 'country'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            name: 'status',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: 'Catatan',
            name: 'notes'
        }]
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupSupplierGrid');
            Ext.getCmp('formSupplierGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnSupplierGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formSupplierGrid').getForm().reset();
                        Ext.getCmp('windowPopupSupplierGrid').hide();
                        storeGridsupplierGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridSupplierGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wSupplierGrid = Ext.create('widget.window', {
    id: 'windowPopupSupplierGrid',
    title: 'Data Supplier',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSupplierGrid],
    modal: true,
    listeners: {
        'show': function(){
            storeGridsupplierGrid.load();
        }
    }
});


// var formsupplierGrid = Ext.create('Ext.form.Panel', {
//     id: 'formsupplierGrid',
//     width: 660,
//     title: 'Profil',
//     height: 390,
//     url: SITE_URL + 'backend/saveform/supplierGrid',
//     bodyStyle: 'padding:5px',
//     //    autoWidth:true,
//     forceFit: true,
//     autoScroll: true,
//     fieldDefaults: {
//         msgTarget: 'side',
//         blankText: 'Tidak Boleh Kosong',
//         //        padding: '5 40 5 5',
//         labelWidth: 120,
//         width: 300
//     },
//     layout: 'hbox',
//     defaults: {
//         padding: '5 10 5 5',
//     },
//     items: [{
//         items: [{
//             xtype: 'hiddenfield',
//             name: 'idsupplier',
//             id: 'idsupplier'
//         }, {
//             xtype: 'hiddenfield',
//             name: 'statusformsupplierGrid',
//             id: 'statusformsupplierGrid'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kode Supplier',
//             allowBlank: false,
//             name: 'code'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Nama Supplier',
//             allowBlank: false,
//             name: 'namesupplier'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Alamat',
//             allowBlank: false,
//             name: 'companyaddress'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Alamat Pengiriman',
//             name: 'shipaddress'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'No Telepon',
//             allowBlank: false,
//             name: 'telephone'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'No Handphone',
//             name: 'handphone'
//         }]
//     }, {
//         items: [{
//             xtype: 'textfield',
//             fieldLabel: 'No Fax',
//             name: 'fax'
//         },{
//             xtype: 'textfield',
//             fieldLabel: 'Email',
//             name: 'email'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Website',
//             name: 'website'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kota',
//             name: 'city'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Provinsi',
//             name: 'state'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kode POS',
//             name: 'postcode'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Negara',
//             name: 'country'
//         }, {
//             xtype: 'textarea',
//             fieldLabel: 'Catatan',
//             name: 'notes'
//         }]
//     }]
// });
// Ext.define('TabSupplier', {
//     extend: 'Ext.tab.Panel',
//     id: 'TabSupplier',
//     alias: 'widget.TabSupplier',
//     activeTab: 0,
//     autoWidth: '100%',
//     autoScroll: true,
//      defaults: {
//         // autoScroll: true,
//         // bodyPadding: '1 0 15 0'
//     },
//     items: [
//         formsupplierGrid
//         // , {
//         //     xtype: 'GridInventorySupplier',
//         //     listeners: {
//         //         activate: function() {
//         //             storeGridInventorySupplier.load();
//         //         }
//         //     }
//         // }
//     ]
// });
// var wsupplierGrid = Ext.create('widget.window', {
//     id: 'windowPopupsupplierGrid',
//     title: 'Data Supplier',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
//     //    autoWidth: true,
//     width: 670,
//     minHeight:440,
//     // autoHeight: true,
//     layout: 'fit',
//     border: false,
//     items: [{
//         xtype: 'TabSupplier'
//     }],
//     buttons: [{
//         text: 'Batal',
//         handler: function() {
//             var win = Ext.getCmp('windowPopupsupplierGrid');
//             Ext.getCmp('formsupplierGrid').getForm().reset();
//             win.hide();
//         }
//     }, {
//         id: 'BtnsupplierGridSimpan',
//         text: 'Simpan',
//         handler: function() {
//             var form =Ext.getCmp('formsupplierGrid').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         Ext.getCmp('formsupplierGrid').getForm().reset();
//                         Ext.getCmp('windowPopupsupplierGrid').hide();
//                         storeGridsupplierGrid.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         //                            storeGridsupplierGrid.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });


Ext.define('MY.searchGridsupplierGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridsupplierGrid',
    store: storeGridsupplierGrid,
    width: 180
});
var smGridsupplierGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridsupplierGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletesupplierGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletesupplierGrid').enable();
        }
    }
});
Ext.define('GridsupplierGrid', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridsupplierGrid,
    title: 'Supplier Data',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridsupplierGridID',
    id: 'GridsupplierGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridsupplierGrid',
    store: storeGridsupplierGrid,
    loadMask: true,
    columns: [{
        header: 'idsupplier',
        dataIndex: 'idsupplier',
        hidden: true
    }, {
        header: 'code',
        dataIndex: 'code',
        minWidth: 150
    }, {
        header: 'Supplier Name',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'Telephone',
        dataIndex: 'namaayah',
        minWidth: 150
    }, {
        header: 'Handphone',
        dataIndex: 'handphone',
        minWidth: 150
    }, {
        header: 'Fax',
        dataIndex: 'fax',
        minWidth: 150
    }, {
        header: 'Email',
        dataIndex: 'email',
        minWidth: 150
    }, {
        header: 'Website',
        dataIndex: 'website',
        minWidth: 150
    }, {
        header: 'City',
        dataIndex: 'city',
        minWidth: 150
    }, {
        header: 'State',
        dataIndex: 'state',
        minWidth: 150
    }, {
        header: 'Postcode',
        dataIndex: 'postcode',
        minWidth: 150
    }, {
        header: 'Country',
        dataIndex: 'country',
        minWidth: 150
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Notes',
        dataIndex: 'notes',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addsupplierGrid',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wSupplierGrid.show();
                supplierTypeStore.load();
                Ext.getCmp('statusformSupplierGrid').setValue('input');
            }
        }, {
            itemId: 'editsupplierGrid',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                supplierTypeStore.load();
                
                var grid = Ext.ComponentQuery.query('GridsupplierGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formsupplierGrid = Ext.getCmp('formSupplierGrid');
                    formsupplierGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/supplierGrid/1',
                        params: {
                            extraparams: 'a.idsupplier:' + selectedRecord.data.idsupplier
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wSupplierGrid.show();
                    Ext.getCmp('statusformSupplierGrid').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeletesupplierGrid',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridsupplierGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/supplierGrid',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu:24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridsupplierGrid.load();
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                            
                        }
                    }
                });
            },
            //                    disabled: true
        }, '->', 'Pencarian: ', ' ', {
            xtype: 'searchGridsupplierGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridsupplierGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridsupplierGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formsupplierGrid = Ext.getCmp('formSupplierGrid');
            wSupplierGrid.show();
            formsupplierGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/supplierGrid/1',
                params: {
                    extraparams: 'a.idsupplier:' + record.data.idsupplier
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })
            //            
            //            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformSupplierGrid').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});