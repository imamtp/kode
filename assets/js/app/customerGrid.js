
var formcustomerGrid = Ext.create('Ext.form.Panel', {
    id: 'formcustomerGrid',
    width: 660,
    // height: 330,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/customerGrid',
    bodyStyle: 'padding:5px',
//    autoWidth:true,
    forceFit:true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
//        padding: '5 40 5 5',
        labelWidth: 120,
        width: 300
    },
    layout: 'hbox',
    defaults:{
        padding: '5 10 5 5',
    },
        items: [{
            items: [{
            xtype: 'hiddenfield',
            name: 'idcustomer',
            id: 'idcustomer'
        },{
            xtype: 'hiddenfield',
            name: 'statusformcustomerGrid',
            id: 'statusformcustomerGrid'
        },{
                xtype:'textfield',
                fieldLabel: 'Kode Konsumen',
                allowBlank:false,
                name: 'nocustomer'
            }, {
                xtype:'textfield',
                fieldLabel: 'Nama Konsumen',
                allowBlank:false,
                name: 'namecustomer'
            },{
                xtype:'comboxcustomertype',
                allowBlank:false,
                name: 'namecustype'
            },{
                xtype:'textarea',
                fieldLabel: 'Alamat',
                allowBlank:false,
                name: 'address'
            }, {
                xtype:'textarea',
                fieldLabel: 'ship address',
                name: 'shipaddress'
            }, {
                xtype:'textarea',
                fieldLabel: 'bill address',
                name: 'billaddress'
            }]
        }, {
            items: [{
                xtype:'textfield',
                fieldLabel: 'telephone',
                allowBlank:false,
                name: 'telephone'
            },{
                xtype:'textfield',
                fieldLabel: 'handphone',
                name: 'handphone'
            },{
                xtype:'textfield',
                fieldLabel: 'fax',
                name: 'fax'
            },{
                xtype:'textfield',
                fieldLabel: 'email',
                name: 'email'
            },{
                xtype:'textfield',
                fieldLabel: 'website',
                name: 'website'
            },{
                xtype:'textfield',
                fieldLabel: 'city',
                name: 'city'
            },{
                xtype:'textfield',
                fieldLabel: 'state',
                name: 'state'
            },{
                xtype:'textfield',
                fieldLabel: 'postcode',
                name: 'postcode'
            },{
                xtype:'textfield',
                fieldLabel: 'country',
                name: 'country'
            },{
                xtype: 'comboxswitch',
                fieldLabel: 'Status',
                name: 'status',
                allowBlank: false,
            },{
                xtype:'textarea',
                fieldLabel: 'notes',
                name: 'notes'
            }]
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('windowPopupcustomerGrid');
                Ext.getCmp('formcustomerGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtncustomerGridSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            
                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formcustomerGrid').getForm().reset();
                            Ext.getCmp('windowPopupcustomerGrid').hide();

                            storeGridcustomerGrid.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridcustomerGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wcustomerGrid = Ext.create('widget.window', {
    id: 'windowPopupcustomerGrid',
    title: 'Konsumen',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width:670,  
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formcustomerGrid]
});

Ext.define('GridcustomerGridModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer','nocustomer','namecustomer','address','shipaddress','billaddress','telephone','handphone','fax','email','website','city','state','postcode','country','notes','namecustype', 'status'],
    idProperty: 'id'
});

var storeGridcustomerGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridcustomerGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/customerGrid',
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

Ext.define('MY.searchGridcustomerGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridcustomerGrid',
    store: storeGridcustomerGrid,
    width: 180
});

var smGridcustomerGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridcustomerGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeletecustomerGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeletecustomerGrid').enable();
        }
    }
});

Ext.define('GridcustomerGrid', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridcustomerGrid,
    title: 'Customer Data',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridcustomerGridID',
    id: 'GridcustomerGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridcustomerGrid',
    store: storeGridcustomerGrid,
    loadMask: true,
    columns: [
        {header: 'idcustomer', dataIndex: 'idcustomer', hidden: true},
        {header: 'no customer', dataIndex: 'nocustomer', minWidth: 150},
        {header: 'name customer', dataIndex: 'namecustomer', minWidth: 150},
        {header: 'Tipe Konsumen', dataIndex: 'namecustype', minWidth: 150},
        {header: 'address', dataIndex: 'address', minWidth: 150},
        {header: 'ship address', dataIndex: 'shipaddress', minWidth: 150},
        {header: 'bill address', dataIndex: 'billaddress', minWidth: 150},
        {header: 'telephone', dataIndex: 'telephone', minWidth: 150},
        {header: 'handphone', dataIndex: 'handphone', minWidth: 150},
        {header: 'fax', dataIndex: 'fax', minWidth: 150},
        {header: 'email', dataIndex: 'email', minWidth: 150},
        {header: 'website', dataIndex: 'website', minWidth: 150},
        {header: 'city', dataIndex: 'city', minWidth: 150},
        {header: 'state', dataIndex: 'state', minWidth: 150},
        {header: 'post code', dataIndex: 'postcode', minWidth: 150},
        {header: 'country', dataIndex: 'country', minWidth: 150},
        {header: 'Status', dataIndex: 'status',},
        {header: 'notes', dataIndex: 'notes', minWidth: 150, flex:1}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addcustomerGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                         wcustomerGrid.show();
                         storeGridCustomerType.load();
                         Ext.getCmp('statusformcustomerGrid').setValue('input');
                    }
                },
                {
                    itemId: 'editcustomerGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridcustomerGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data pajak terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
                            var formcustomerGrid = Ext.getCmp('formcustomerGrid');

                            formcustomerGrid.getForm().load({
                                url: SITE_URL + 'backend/loadFormData/customerGrid/1',
                                params: {
                                    extraparams: 'a.idcustomer:' + selectedRecord.data.idcustomer
                                },
                                success: function(form, action) {
                                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                                }
                            })

                            wcustomerGrid.show();
                            Ext.getCmp('statusformcustomerGrid').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeletecustomerGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridcustomerGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/customerGrid',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridcustomerGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridcustomerGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridcustomerGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridcustomerGrid.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formcustomerGrid = Ext.getCmp('formcustomerGrid');
            wcustomerGrid.show();

            formcustomerGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/customerGrid/1',
                params: {
                    extraparams: 'a.idcustomer:' + record.data.idcustomer
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
            Ext.getCmp('statusformcustomerGrid').setValue('edit');
        }
    }
});