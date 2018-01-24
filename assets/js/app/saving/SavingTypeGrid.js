var WindowCoaListDebitSavingTypeGrid = Ext.create(dir_sys + 'saving.WindowCoaListDebitSavingTypeGrid');
var WindowCoaListKreditSavingTypeGrid = Ext.create(dir_sys + 'saving.WindowCoaListKreditSavingTypeGrid');

var WindowCoaListInterestDebitSavingTypeGrid = Ext.create(dir_sys + 'saving.WindowCoaListInterestDebitSavingTypeGrid');
var WindowCoaListInterestKreditSavingTypeGrid = Ext.create(dir_sys + 'saving.WindowCoaListInterestKreditSavingTypeGrid');

Ext.define('GridSavingTypeGridModel', {
    extend: 'Ext.data.Model',
    fields: ['id_saving_type', 'idunit', 'saving_name', 'saving_desc', 'saving_type', 'saving_code', 'prefix_account', 'setoran_tetap', 'konversi_persaham', 'saving_limit', 'debit_coa', 'credit_coa', 'debit_interest_coa', 'credit_interest_coa', 'interest_rate', 'interest_period', 'period_length', 'stock_saving_addition', 'status_name', 'saving_category','status'],
    idProperty: 'id'
});
var storeGridSavingTypeGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSavingTypeGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/SavingTypeGrid/saving',
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

var formSavingTypeGrid = Ext.create('Ext.form.Panel', {
    id: 'formSavingTypeGrid',
    width: 740,
    autoHeight: true,
    // autoWidth:true,
    // height: sizeH,
    url: SITE_URL + 'backend/saveform/SavingTypeGrid/saving',
    baseParams: {
        idmenu: 24
    },
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
        labelWidth: 150,
        // anchor:'100%'
        width: 350
    },
    items: [{
        items: [{
                xtype: 'hiddenfield',
                name: 'id_saving_type'
            }, {
                xtype: 'hiddenfield',
                name: 'statusformSavingTypeGrid',
                id: 'statusformSavingTypeGrid'
            }, {
                xtype: 'radiogroup',
                columns: 1,
                fieldLabel: 'Kategori Simpanan',
                items: [{
                        boxLabel: 'Simpanan Modal',
                        name: 'saving_category',
                        inputValue: 1
                    },
                    {
                        boxLabel: 'Simpanan Berjangka',
                        name: 'saving_category',
                        inputValue: 2
                    },
                    {
                        boxLabel: 'Simpanan Deposito',
                        name: 'saving_category',
                        inputValue: 3
                    }
                ],
                listeners: {
                    change: function(field, newValue, oldValue) {

                        console.log(newValue['saving_category']);

                        switch (parseInt(newValue['saving_category'])) {
                            case 1:
                                //simpanan modal
                                formSavingTypeGrid.getForm().findField("saving_type_rg").show();
                                formSavingTypeGrid.getForm().findField("konversi_persaham").show();
                                formSavingTypeGrid.getForm().findField("setoran_tetap").show();
                                formSavingTypeGrid.getForm().findField("saving_limit").show();
                                Ext.getCmp("period_length_fc").hide();

                                break;
                            case 2:
                                //simpanan berjangka
                                formSavingTypeGrid.getForm().findField("saving_type_rg").hide();
                                formSavingTypeGrid.getForm().findField("konversi_persaham").hide();
                                formSavingTypeGrid.getForm().findField("setoran_tetap").show();
                                formSavingTypeGrid.getForm().findField("saving_limit").show();
                                Ext.getCmp("period_length_fc").show();
                                break;
                            case 3:
                                //simpanan deposito
                                formSavingTypeGrid.getForm().findField("saving_type_rg").hide();
                                formSavingTypeGrid.getForm().findField("konversi_persaham").hide();
                                formSavingTypeGrid.getForm().findField("setoran_tetap").hide();
                                formSavingTypeGrid.getForm().findField("saving_limit").hide();
                                Ext.getCmp("period_length_fc").hide();
                                break;
                        }
                    }
                }
            }, {
                xtype: 'radiogroup',
                columns: 1,
                name: 'saving_type_rg',
                fieldLabel: 'Jenis Simpanan',
                items: [{
                        boxLabel: 'Pokok',
                        name: 'saving_type',
                        inputValue: 1
                    },
                    {
                        boxLabel: 'Wajib',
                        name: 'saving_type',
                        inputValue: 2
                    },
                    {
                        boxLabel: 'Sukarela',
                        name: 'saving_type',
                        inputValue: 3
                    },
                    {
                        boxLabel: 'Setara Modal',
                        name: 'saving_type',
                        inputValue: 4
                    }
                ]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Kode Simpanan',
                allowBlank: false,
                name: 'saving_code'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nama Simpanan',
                allowBlank: false,
                name: 'saving_name'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Deskripsi',
                name: 'saving_desc'
            }, {
                xtype: 'textfield',
                allowBlank: false,
                name: 'setoran_tetap',
                fieldLabel: 'Setoran Tetap',
                fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            // updateSelisih();
                        }, c);
                    }
                }
            },
            {
                xtype: 'fieldcontainer',
                // width:300,
                fieldLabel: 'Bunga Tetap',
                combineErrors: true,
                msgTarget: 'side',
                layout: 'hbox',
                defaults: {
                    // flex: 1,
                    hideLabel: true
                },
                items: [{
                        margin: '0 5 0 0',
                        width: 50,
                        xtype: 'textfield',
                        // allowBlank: false,                       
                        name: 'interest_rate',
                        id: 'interest_rate'
                    },
                    {
                        xtype: 'displayfield',
                        margin: '0 5 0 0',
                        value: '% / ',
                        width: 20
                    },
                    Ext.define('comboxinterest_period_name', {
                        extend: 'Ext.form.ComboBox',
                        editable: false,
                        labelWidth: 30,
                        width: 90,
                        hideLabel: true,
                        alias: 'widget.comboxinterest_period_name',
                        fieldLabel: '% / ',
                        displayField: 'interest_period_name',
                        valueField: 'interest_period',
                        name: 'interest_period',
                        store: new Ext.data.ArrayStore({
                            fields: ['interest_period', 'interest_period_name'],
                            data: [
                                [1, 'Bulan'],
                                [2, 'Tahun']
                            ]
                        })
                    })
                ]
            },
            {
                xtype: 'fieldcontainer',
                id: 'period_length_fc',
                // width:300,
                fieldLabel: 'Jangka Waktu',
                combineErrors: true,
                msgTarget: 'side',
                layout: 'hbox',
                defaults: {
                    // flex: 1,
                    hideLabel: true
                },
                items: [{
                        margin: '0 5 0 0',
                        width: 50,
                        xtype: 'numericfield',
                        fieldLabel: 'Jangka Waktu',
                        name: 'period_length'
                    },
                    {
                        xtype: 'displayfield',
                        margin: '0 5 0 0',
                        value: ' Bulan',
                        width: 30
                    }
                ]
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                name: 'konversi_persaham',
                fieldLabel: 'Konversi Per Saham',
                fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            // updateSelisih();
                        }, c);
                    }
                }
            }, {
                xtype: 'textfield',
                allowBlank: false,
                name: 'saving_limit',
                fieldLabel: 'Limit Simpanan',
                fieldStyle: 'text-align: right;',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            this.setRawValue(renderNomor(this.getValue()));
                            // updateSelisih();
                        }, c);
                    }
                }
            },
        ]
    }, {
        items: [{
                xtype: 'fieldset',
                title: 'Akun Perkiraan Simpanan',
                items: [{
                        xtype: 'fieldcontainer',
                        labelAlign: 'top',
                        width: 300,
                        fieldLabel: 'Debet',
                        combineErrors: true,
                        msgTarget: 'side',
                        layout: 'hbox',
                        defaults: {
                            // flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            margin: '0 5 0 0',
                            width: 200,
                            xtype: 'textfield',
                            allowBlank: false,
                            name: 'accname_debit_saving_type_grid',
                            id: 'accname_debitSavingTypeGrid',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        WindowCoaListDebitSavingTypeGrid.show();
                                        storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                            operation.params = {
                                                'idunit': idunit,
                                                'idaccounttype': '19,17,1'
                                            };
                                        });
                                        storeGridAccount.load();
                                    });
                                }
                            }
                        }, {
                            xtype: 'displayfield',
                            name: 'accnumber_debit_saving_type_grid',
                            width: 90,
                            id: 'accnumber_debitSavingTypeGrid',
                        }, {
                            xtype: 'hiddenfield',
                            name: 'idaccount_debet',
                            id: 'idaccount_debitSavingTypeGrid',
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        labelAlign: 'top',
                        width: 300,
                        fieldLabel: 'Kredit',
                        combineErrors: true,
                        msgTarget: 'side',
                        layout: 'hbox',
                        defaults: {
                            // flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            margin: '0 5 0 0',
                            width: 200,
                            xtype: 'textfield',
                            allowBlank: false,
                            name: 'accname_kredit_saving_type_grid',
                            id: 'accname_kreditSavingTypeGrid',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        WindowCoaListKreditSavingTypeGrid.show();
                                        storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                            operation.params = {
                                                'idunit': idunit,
                                                'idaccounttype': '19,17,1'
                                            };
                                        });
                                        storeGridAccount.load();
                                    });
                                }
                            }
                        }, {
                            xtype: 'displayfield',
                            name: 'accnumber_kredit_saving_type_grid',
                            width: 90,
                            id: 'accnumber_kreditSavingTypeGrid',
                        }, {
                            xtype: 'hiddenfield',
                            name: 'idaccount_kredit',
                            id: 'idaccount_kreditSavingTypeGrid',
                        }]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Akun Perkiraan Bunga Simpanan',
                items: [{
                        xtype: 'fieldcontainer',
                        labelAlign: 'top',
                        width: 300,
                        fieldLabel: 'Debet',
                        combineErrors: true,
                        msgTarget: 'side',
                        layout: 'hbox',
                        defaults: {
                            // flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            margin: '0 5 0 0',
                            width: 200,
                            xtype: 'textfield',
                            allowBlank: false,
                            name: 'accname_debit_interest_saving_type_grid',
                            id: 'accname_interestDebitSavingTypeGrid',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        WindowCoaListInterestDebitSavingTypeGrid.show();
                                        storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                            operation.params = {
                                                'idunit': idunit,
                                                'idaccounttype': '19,17,1'
                                            };
                                        });
                                        storeGridAccount.load();
                                    });
                                }
                            }
                        }, {
                            xtype: 'displayfield',
                            name: 'accnumber_debit_interest_saving_type_grid',
                            width: 90,
                            id: 'accnumber_interestDebitSavingTypeGrid',
                        }, {
                            xtype: 'hiddenfield',
                            name: 'idaccount_interestdebit',
                            id: 'idaccount_interestDebitSavingTypeGrid',
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        labelAlign: 'top',
                        width: 300,
                        fieldLabel: 'Kredit',
                        combineErrors: true,
                        msgTarget: 'side',
                        layout: 'hbox',
                        defaults: {
                            // flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            margin: '0 5 0 0',
                            width: 200,
                            xtype: 'textfield',
                            allowBlank: false,
                            name: 'accname_kredit_interest_saving_type_grid',
                            id: 'accname_interestKreditSavingTypeGrid',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        WindowCoaListInterestKreditSavingTypeGrid.show();
                                        storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                            operation.params = {
                                                'idunit': idunit,
                                                'idaccounttype': '19,17,1'
                                            };
                                        });
                                        storeGridAccount.load();
                                    });
                                }
                            }
                        }, {
                            xtype: 'displayfield',
                            name: 'accnumber_kredit_interest_saving_type_grid',
                            width: 90,
                            id: 'accnumber_interestKreditSavingTypeGrid',
                        }, {
                            xtype: 'hiddenfield',
                            name: 'idaccount_interestkredit',
                            id: 'idaccount_interestKreditSavingTypeGrid',
                        }]
                    }
                ]
            },
            Ext.define('comboxStatusSavingType', {
                extend: 'Ext.form.ComboBox',
                editable: false,
                allowBlank: false,
                alias: 'widget.StatusSavingType',
                fieldLabel: 'Status Simpanan',
                displayField: 'status_name',
                valueField: 'status',
                name: 'status_name',
                store: new Ext.data.ArrayStore({
                    fields: ['status', 'status_name'],
                    data: [
                        [1, 'Active'],
                        [2, 'Inactive']
                    ]
                })
            })
        ]
    }],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupSavingTypeGrid');
            Ext.getCmp('formSavingTypeGrid').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnSavingTypeGridSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formSavingTypeGrid').getForm().reset();
                        Ext.getCmp('windowPopupSavingTypeGrid').hide();
                        storeGridSavingTypeGrid.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridSavingTypeGrid.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wSavingTypeGrid = Ext.create('widget.window', {
    id: 'windowPopupSavingTypeGrid',
    title: 'Jenis Simpanan',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    modal: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formSavingTypeGrid]
});




Ext.define('MY.searchGridSavingTypeGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSavingTypeGrid',
    store: storeGridSavingTypeGrid,
    width: 180
});
var smGridSavingTypeGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridSavingTypeGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteSavingTypeGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteSavingTypeGrid').enable();
        }
    }
});
Ext.define(dir_sys + 'saving.SavingTypeGrid', {
    // title: 'Jenis Simpanan',
    itemId: 'SavingTypeGrid',
    id: 'SavingTypeGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.SavingTypeGrid',
    store: storeGridSavingTypeGrid,
    loadMask: true,
    columns: [{
            header: 'id_saving_type',
            dataIndex: 'id_saving_type',
            hidden: true
        },
        {
            header: 'Kode Simpanan',
            dataIndex: 'saving_code',
            minWidth: 130
        },
        {
            header: 'Nama Simpanan',
            flex: 1,
            dataIndex: 'saving_name',
            minWidth: 100
        },
        {
            header: 'Deskripsi',
            dataIndex: 'saving_desc',
            minWidth: 150
        }, {
            header: 'Kategori Simpanan',
            dataIndex: 'saving_category',
            minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(SavingCategoryArr, value);
            }
        },
        {
            header: 'Tipe Simpanan',
            dataIndex: 'saving_type',
            minWidth: 130,
            renderer: function(value) {
                return customColumnStatus(SavingTypeArr, value);
            }
        },
        {
            header: 'Setoran Tetap',
            align: 'right',
            xtype: 'numbercolumn',
            dataIndex: 'setoran_tetap',
            minWidth: 130
        },
        {
            header: 'Status',
            dataIndex: 'status',
            minWidth: 100,
            renderer: function(value) {
                console.log(value)
                return customColumnStatus(StatusColumnArr, value);
            }
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            itemId: 'addSavingTypeGrid',
            text: 'Tambah',
            iconCls: 'add-icon',
            handler: function() {
                wSavingTypeGrid.show();
                formSavingTypeGrid.getForm().reset();
                Ext.getCmp('statusformSavingTypeGrid').setValue('input');
            }
        }, {
            itemId: 'editSavingTypeGrid',
            text: 'Ubah',
            iconCls: 'edit-icon',
            handler: function() {
                var grid = Ext.getCmp('SavingTypeGrid');
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
                } else {
                    loadSavingTypeForm(selectedRecord.data.id_saving_type)
                }
            }
        }, {
            id: 'btnDeleteSavingTypeGrid',
            text: 'Hapus',
            iconCls: 'delete-icon',
            handler: function() {
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Delete Selected ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn) {
                        if (btn == 'yes') {
                            var grid = Ext.ComponentQuery.query('GridSavingTypeGrid')[0];
                            var sm = grid.getSelectionModel();
                            selected = [];
                            Ext.each(sm.getSelection(), function(item) {
                                selected.push(item.data[Object.keys(item.data)[0]]);
                            });
                            Ext.Ajax.request({
                                url: SITE_URL + 'backend/ext_delete/SavingTypeGrid/saving',
                                method: 'POST',
                                params: {
                                    postdata: Ext.encode(selected),
                                    idmenu: 24
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if (!d.success) {
                                        Ext.Msg.alert('Informasi', d.message);
                                    } else {
                                        storeGridSavingTypeGrid.load();
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
            xtype: 'searchGridSavingTypeGrid',
            text: 'Left Button'
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storeGridSavingTypeGrid, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
            // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridSavingTypeGrid.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            loadSavingTypeForm(record.data.id_saving_type)
        }
    }
});


function loadSavingTypeForm(id) {
    var formSavingTypeGrid = Ext.getCmp('formSavingTypeGrid');
    wSavingTypeGrid.show();
    formSavingTypeGrid.getForm().load({
        url: SITE_URL + 'backend/loadFormData/SavingTypeGrid/1/saving',
        params: {
            extraparams: 'a.id_saving_type:' + id
        },
        success: function(form, action) {
            var obj = Ext.decode(action.response.responseText);
            // console.log(obj);
            formSavingTypeGrid.getForm().findField("interest_period").setValue(obj.data.interest_period * 1);
            formSavingTypeGrid.getForm().findField("status_name").setValue(obj.data.status_name * 1);
            formSavingTypeGrid.getForm().findField("setoran_tetap").setValue(renderNomor(obj.data.setoran_tetap));
            formSavingTypeGrid.getForm().findField("konversi_persaham").setValue(renderNomor(obj.data.konversi_persaham));
            formSavingTypeGrid.getForm().findField("saving_limit").setValue(renderNomor(obj.data.saving_limit));
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    });

    Ext.getCmp('statusformSavingTypeGrid').setValue('edit');
}