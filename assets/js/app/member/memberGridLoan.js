Ext.define('GridMemberLoanGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes'],
    idProperty: 'id'
});
var storeGridMemberLoanGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridMemberLoanGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/MemberLoanGrid',
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

var formMemberLoanGrid = Ext.create('Ext.form.Panel', {
    id: 'formMemberLoanGrid',
    width: 740,
    // autoWidth:true,
    height: 370,
    url: SITE_URL + 'backend/saveform/MemberLoanGrid',
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
            name: 'statusformMemberLoanGrid',
            id: 'statusformMemberLoanGrid'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Kode Supplierx',
            allowBlank: false,
            name: 'code'
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
            xtype: 'textarea',
            fieldLabel: 'Catatan',
            name: 'notes'
        }]
    }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMemberLoanGrid');
            Ext.getCmp('formMemberLoanGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMemberLoanGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMemberLoanGrid').getForm().reset();
                        Ext.getCmp('windowPopupMemberLoanGrid').hide();
                        storeGridMemberLoanGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMemberLoanGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMemberLoanGrid = Ext.create('widget.window', {
    id: 'windowPopupMemberLoanGrid',
    title: 'Data Pinjaman',
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
    items: [formMemberLoanGrid]
});


// var formMemberLoanGrid = Ext.create('Ext.form.Panel', {
//     id: 'formMemberLoanGrid',
//     width: 660,
//     title: 'Profil',
//     height: 390,
//     url: SITE_URL + 'backend/saveform/MemberLoanGrid',
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
//             name: 'statusformMemberLoanGrid',
//             id: 'statusformMemberLoanGrid'
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
//         formMemberLoanGrid
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
// var wMemberLoanGrid = Ext.create('widget.window', {
//     id: 'windowPopupMemberLoanGrid',
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
//             var win = Ext.getCmp('windowPopupMemberLoanGrid');
//             Ext.getCmp('formMemberLoanGrid').getForm().reset();
//             win.hide();
//         }
//     }, {
//         id: 'BtnMemberLoanGridSimpan',
//         text: 'Simpan',
//         handler: function() {
//             var form =Ext.getCmp('formMemberLoanGrid').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         Ext.getCmp('formMemberLoanGrid').getForm().reset();
//                         Ext.getCmp('windowPopupMemberLoanGrid').hide();
//                         storeGridMemberLoanGrid.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         //                            storeGridMemberLoanGrid.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });


Ext.define('MY.searchGridMemberLoanGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridMemberLoanGrid',
    store: storeGridMemberLoanGrid,
    width: 180
});
var smGridMemberLoanGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridMemberLoanGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteMemberLoanGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteMemberLoanGrid').enable();
        }
    }
});
Ext.define(dir_sys+'member.memberGridLoan', {
    // renderTo:'mytabpanel',
    //    multiSelect: true,
    //    selModel: smGridMemberLoanGrid,
    title: 'Pinjaman',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridMemberLoanGridID',
    id: 'GridMemberLoanGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridMemberLoanGrid',
    store: storeGridMemberLoanGrid,
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
        header: 'namesupplier',
        dataIndex: 'namesupplier',
        minWidth: 150
    }, {
        header: 'telephone',
        dataIndex: 'namaayah',
        minWidth: 150
    }, {
        header: 'handphone',
        dataIndex: 'handphone',
        minWidth: 150
    }, {
        header: 'fax',
        dataIndex: 'fax',
        minWidth: 150
    }, {
        header: 'email',
        dataIndex: 'email',
        minWidth: 150
    }, {
        header: 'website',
        dataIndex: 'website',
        minWidth: 150
    }, {
        header: 'city',
        dataIndex: 'city',
        minWidth: 150
    }, {
        header: 'state',
        dataIndex: 'state',
        minWidth: 150
    }, {
        header: 'postcode',
        dataIndex: 'postcode',
        minWidth: 150
    }, {
        header: 'country',
        dataIndex: 'country',
        minWidth: 150
    }, {
        header: 'notes',
        dataIndex: 'notes',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addMemberLoanGrid',
            text: 'Pengajuan Pinjaman Baru',
            hidden:true,
            iconCls: 'add-icon',
            handler: function() {
                wMemberLoanGrid.show();
                Ext.getCmp('statusformMemberLoanGrid').setValue('input');
            }
        }, {
            itemId: 'editMemberLoanGrid',
            hidden:true,
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridMemberLoanGrid')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formMemberLoanGrid = Ext.getCmp('formMemberLoanGrid');
                    formMemberLoanGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/MemberLoanGrid/1',
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
                    wMemberLoanGrid.show();
                    Ext.getCmp('statusformMemberLoanGrid').setValue('edit');
                    Ext.getCmp('TabSupplier').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteMemberLoanGrid',
            text: 'Hapus',
            hidden:true,
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridMemberLoanGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/MemberLoanGrid',
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
                                        storeGridMemberLoanGrid.load();
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
            xtype: 'searchGridMemberLoanGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridMemberLoanGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridMemberLoanGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // var formAgama = Ext.create('formAgama');
            var formMemberLoanGrid = Ext.getCmp('formMemberLoanGrid');
            wMemberLoanGrid.show();
            formMemberLoanGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/MemberLoanGrid/1',
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
            Ext.getCmp('statusformMemberLoanGrid').setValue('edit');

            Ext.getCmp('TabSupplier').setActiveTab(0);
        }
    }
});
