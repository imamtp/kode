Ext.define('InventoryAdj', {
    extend: 'Ext.data.Model',
    fields: [
        'idinventory', 'idaccount', 'qty', 'unitcost', 'amount', 'memo', 'invno', 'nameinventory', 'accnumber'
    ]
});

var storeInventoryAdj = Ext.create('Ext.data.Store', {
    model: 'InventoryAdj'
});


var formAddRowAdj = Ext.create('Ext.form.Panel', {
    id: 'formAddRowAdj',
    width: 450,
    height: 290,
//    url: SITE_URL + 'account/saveLink',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [
        {
          xtype:'hiddenfield',
          name:'idinventory',
          id:'idinventoryAddRowAdj'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pilih Item',
            allowBlank:false,
            name: 'nameinventory',
            id: 'nameinventoryAddRowAdj',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        storegridAddRowAdj.on('beforeload',function(store, operation,eOpts){
                                operation.params={
                                            'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitEntryAdj').getValue()
                                          };
                                      });
                        wGridAddRowAdj.show();
                        storegridAddRowAdj.load();
                    });
                }
            }
        }, 
         {
            xtype: 'displayfield',
            fieldLabel: 'No Item',
            id: 'invnoAddRowAdj',
            name: 'invno'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Qty',
            allowBlank:false,
            id: 'qtyAddRowAdj',
            name: 'qty'
        },
//        {
//            xtype: 'textfield',
//            fieldLabel: 'Harga Barang',
//            allowBlank:false,
//            id: 'unitcostAddRowAdj',
//            name: 'unitcost',
//            fieldStyle: 'text-align: right;',
//            listeners: {
//                'render': function(c) {
//                    c.getEl().on('keyup', function() {
//                        var amount = Ext.getCmp('qtyAddRowAdj').getValue()*1*Ext.getCmp('unitcostAddRowAdj').getValue();
//                        Ext.getCmp('amountAddRowAdj').setValue(amount);
//                    }, c);
//                }
//            }
//        },
//        {
//            xtype: 'textfield',
//            fieldLabel: 'Jumlah',
//            id: 'amountAddRowAdj',
//            name: 'amount',
//            readOnly: true,
//            fieldStyle: 'text-align: right;'
//        }, 
        ,{
            xtype: 'hiddenfield',
            fieldLabel: 'idaccount',
            name: 'idaccount',
            id: 'idaccountAddRowAdj'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Pilih Akun Persediaan',
            allowBlank:false,
            name: 'accname',
            id: 'accnameAddRowAdj',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        windowPopupTreeAddRowAdj.show();
                        storeAccountAktive.load({
                            params: {
                                'idunit': Ext.getCmp('cbUnitEntryAdj').getValue()
                            }
                        });
                    });
                }
            }
        },{
            xtype: 'displayfield',
            fieldLabel: 'No Akun',
            name: 'accnumber',
            id: 'accnumberAddRowAdj'
        },{
            xtype: 'textfield',
            fieldLabel: 'Memo',
            name: 'memo',
            id: 'memoAddRowAdj'
        }
    ],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('wAddRowAdj');
                Ext.getCmp('formAddRowAdj').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnAddRowJurnalSimpan',
            text: 'Tambahkan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {

                    var rec = new InventoryAdj({
                        idinventory: Ext.getCmp('idinventoryAddRowAdj').getValue(),
                        idaccount: Ext.getCmp('idaccountAddRowAdj').getValue(),
                        qty: Ext.getCmp('qtyAddRowAdj').getValue(),
//                        unitcost: Ext.getCmp('unitcostAddRowAdj').getValue(),
//                        amount: Ext.getCmp('amountAddRowAdj').getValue(),
                        memo: Ext.getCmp('memoAddRowAdj').getValue(),
                        invno: Ext.getCmp('invnoAddRowAdj').getValue(),
                        nameinventory: Ext.getCmp('nameinventoryAddRowAdj').getValue(),
                        accnumber: Ext.getCmp('accnumberAddRowAdj').getValue()
                    });

                    var grid = Ext.getCmp('EntryAdj');
                    grid.getStore().insert(0, rec);

//                    updateGridJurnal('general');
                    Ext.getCmp('wAddRowAdj').hide();
                    
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});

var wAddRowAdj = Ext.create('widget.window', {
    id: 'wAddRowAdj',
    title: 'Tambah Item Penyesuaian',
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
    items: [formAddRowAdj]
});

