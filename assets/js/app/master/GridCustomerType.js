Ext.define('GridCustomerTypeModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomertype','namecustype','description','idunit','status'],
    idProperty: 'id'
});
var storeGridCustomerType = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCustomerTypeModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/CustomerType/master',
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

var formCustomerTypeGrid = Ext.create('Ext.form.Panel', {
    id: 'formCustomerTypeGrid',
    // width: 740,
    autoWidth:true,
    autoHeight:true,
    bodyStyle: 'padding:5px',
    // height: 370,
    url: SITE_URL + 'backend/saveform/CustomerType/master',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'idcustomertype',
            id: 'idCustomerType'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformCustomerType',
            id: 'statusformCustomerTypeGrid'
        },{
            xtype: 'textfield',
            fieldLabel: 'Customer Type',
            allowBlank: false,
            name: 'namecustype'
        }, {
            xtype: 'comboxswitch',
            fieldLabel: 'Status',
            allowBlank: false,
            name: 'status',
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'description'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupCustomerTypeGrid');
            Ext.getCmp('formCustomerTypeGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnCustomerTypeGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formCustomerTypeGrid').getForm().reset();
                        Ext.getCmp('windowPopupCustomerTypeGrid').hide();
                        storeGridCustomerType.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridCustomerType.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wCustomerTypeGrid = Ext.create('widget.window', {
    id: 'windowPopupCustomerTypeGrid',
    title: 'Customer Type',
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
    items: [formCustomerTypeGrid]
});


// var formCustomerTypeGrid = Ext.create('Ext.form.Panel', {
//     id: 'formCustomerTypeGrid',
//     width: 660,
//     title: 'Profil',
//     height: 390,
//     url: SITE_URL + 'backend/saveform/CustomerTypeGrid',
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
//             name: 'idCustomerType',
//             id: 'idCustomerType'
//         }, {
//             xtype: 'hiddenfield',
//             name: 'statusformCustomerTypeGrid',
//             id: 'statusformCustomerTypeGrid'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Kode CustomerType',
//             allowBlank: false,
//             name: 'code'
//         }, {
//             xtype: 'textfield',
//             fieldLabel: 'Nama CustomerType',
//             allowBlank: false,
//             name: 'nameCustomerType'
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
// Ext.define('TabCustomerType', {
//     extend: 'Ext.tab.Panel',
//     id: 'TabCustomerType',
//     alias: 'widget.TabCustomerType',
//     activeTab: 0,
//     autoWidth: '100%',
//     autoScroll: true,
//      defaults: {
//         // autoScroll: true,
//         // bodyPadding: '1 0 15 0'
//     },
//     items: [
//         formCustomerTypeGrid
//         // , {
//         //     xtype: 'GridInventoryCustomerType',
//         //     listeners: {
//         //         activate: function() {
//         //             storeGridInventoryCustomerType.load();
//         //         }
//         //     }
//         // }
//     ]
// });
// var wCustomerTypeGrid = Ext.create('widget.window', {
//     id: 'windowPopupCustomerTypeGrid',
//     title: 'Data CustomerType',
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
//         xtype: 'TabCustomerType'
//     }],
//     buttons: [{
//         text: 'Batal',
//         handler: function() {
//             var win = Ext.getCmp('windowPopupCustomerTypeGrid');
//             Ext.getCmp('formCustomerTypeGrid').getForm().reset();
//             win.hide();
//         }
//     }, {
//         id: 'BtnCustomerTypeGridSimpan',
//         text: 'Simpan',
//         handler: function() {
//             var form =Ext.getCmp('formCustomerTypeGrid').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                         Ext.Msg.alert('Success', action.result.message);
//                         Ext.getCmp('formCustomerTypeGrid').getForm().reset();
//                         Ext.getCmp('windowPopupCustomerTypeGrid').hide();
//                         storeGridCustomerType.load();
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                         //                            storeGridCustomerType.load();
//                     }
//                 });
//             } else {
//                 Ext.Msg.alert("Error!", "Your form is invalid!");
//             }
//         }
//     }]
// });


Ext.define('MY.searchGridCustomerType', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCustomerType',
    store: storeGridCustomerType,
    width: 180
});
var smGridCustomerType = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridCustomerType.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteCustomerTypeGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteCustomerTypeGrid').enable();
        }
    }
});
Ext.define('GridCustomerType', {
    title: 'Customer Type',
    itemId: 'GridCustomerTypeID',
    id: 'GridCustomerTypeID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCustomerType',
    store: storeGridCustomerType,
    loadMask: true,
    columns: [{
        header: 'idcustomertype',
        dataIndex: 'idcustomertype',
        hidden: true
    }, {
        header: 'Customer Type Name',
        dataIndex: 'namecustype',
        minWidth: 250
    }, {
        header: 'Status',
        dataIndex: 'status',
    }, {
        header: 'Description',
        flex:1,
        dataIndex: 'description',
        minWidth: 150
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addCustomerTypeGrid',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wCustomerTypeGrid.show();
                Ext.getCmp('statusformCustomerTypeGrid').setValue('input');
            }
        }, {
            itemId: 'editCustomerTypeGrid',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.ComponentQuery.query('GridCustomerType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formCustomerTypeGrid = Ext.getCmp('formCustomerTypeGrid');
                    formCustomerTypeGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/CustomerType/1/master',
                        params: {
                            extraparams: 'a.idcustomertype:' + selectedRecord.data.idcustomertype
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wCustomerTypeGrid.show();
                    Ext.getCmp('statusformCustomerTypeGrid').setValue('edit');
                    Ext.getCmp('TabCustomerType').setActiveTab(0);
                }
            }
        }, {
            id: 'btnDeleteCustomerTypeGrid',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridCustomerType')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/CustomerTypeGrid',
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
                                        storeGridCustomerType.load();
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
            xtype: 'searchGridCustomerType',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridCustomerType, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridCustomerType.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // // var formAgama = Ext.create('formAgama');
            // var formCustomerTypeGrid = Ext.getCmp('formCustomerTypeGrid');
            // wCustomerTypeGrid.show();
            // formCustomerTypeGrid.getForm().load({
            //     url: SITE_URL + 'backend/loadFormData/CustomerTypeGrid/1',
            //     params: {
            //         extraparams: 'a.idCustomerType:' + record.data.idCustomerType
            //     },
            //     success: function(form, action) {
            //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     },
            //     failure: function(form, action) {
            //         Ext.Msg.alert("Load failed", action.result.errorMessage);
            //     }
            // })
            // //            
            // //            Ext.getCmp('kddaerahS').setReadOnly(true);
            // Ext.getCmp('statusformCustomerTypeGrid').setValue('edit');

            // Ext.getCmp('TabCustomerType').setActiveTab(0);

            var grid = Ext.ComponentQuery.query('GridCustomerType')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data CustomerType terlebih dahulu!');
                } else {
                    //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                    var formCustomerTypeGrid = Ext.getCmp('formCustomerTypeGrid');
                    formCustomerTypeGrid.getForm().load({
                        url: SITE_URL + 'backend/loadFormData/CustomerType/1/master',
                        params: {
                            extraparams: 'a.idcustomertype:' + selectedRecord.data.idcustomertype
                        },
                        success: function(form, action) {
                            // Ext.Msg.alert("Load failed", action.result.errorMessage);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert("Load failed", action.result.errorMessage);
                        }
                    })
                    wCustomerTypeGrid.show();
                    Ext.getCmp('statusformCustomerTypeGrid').setValue('edit');
                    Ext.getCmp('TabCustomerType').setActiveTab(0);
                }
        }
    }
});