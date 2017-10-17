Ext.define('SpendGridStoreModel', {
    extend: 'Ext.data.Model',
    fields: ['idaccount','accnumber','accname','amount','ratetax'],
    idProperty: 'id'
});

var SpendGridStore = Ext.create('Ext.data.Store', {
    model: 'SpendGridStoreModel'
});

var wAddRowSpend = Ext.create(dir_sys + 'money.windowPopupAddRowSpend');
var wAccSpendPopup = Ext.create(dir_sys + 'money.wAccSpendPopup');

Ext.define(dir_sys + 'money.EntrySpendMoney', {
    extend: 'Ext.grid.Panel',
    id: 'EntrySpendMoney',
    alias: 'widget.EntrySpendMoney',
    xtype: 'cell-editing',
    title: 'Input Pengeluaran Kas',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 840,
            height: 500,
            forceFit: true,
            plugins: [this.cellEditing],
            store: SpendGridStore,
            columns: [
                {
                    header: 'idaccount',
                    hidden: true,
                    dataIndex: 'idaccount'
                },
                {
                    header: 'No Akun',
                    dataIndex: 'accnumber',
                    width: 100
                },
                {
                    header: 'Nama Akun',
                    dataIndex: 'accname',
                    width: 150
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Jumlah',
                    width: 100,
                    dataIndex: 'amount',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
                {
                    header: 'Pajak (%)',
//                    width:50,
                    dataIndex: 'ratetax',
                    editor: {
                        xtype: 'comboxtax',
                        valueField: 'rate',
                        labelWidth: 40
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            icon: BASE_URL + 'assets/icons/fam/cross.gif',
                            tooltip: 'Hapus',
                            scope: this,
                            handler: this.onRemoveClick
                        }]
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype:'comboxunit',
                            id:'idunitSpend',
                            labelWidth: 150,
                            name:'idunit',
                            valueField:'idunit'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Ref',
                            name: 'notrans',
                            id:'notransSpend',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoRef(7, Ext.getCmp('idunitSpend').getValue(), 'notransSpend','SPE');
                                    });
                                }
                            }
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Akun Kas',
                            labelWidth: 150,
                            name: 'accname',
                            id: 'accnameSpend',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        // Ext.getCmp('textSearchAccListSpend').setValue(null);
                                        
                                        if(Ext.getCmp('idunitSpend').getValue()==null)
                                        {
                                            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                        } else {
                                            wAccSpendPopup.show();
                                            storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                        operation.params={
                                                                    'idunit': Ext.getCmp('idunitSpend').getValue(),
                                                                    'idaccounttype': '1,19',
                                                                    // 'query':null
                                                        };
                                                    });
                                                    storeGridAccount.load();
                                            // storeAccountAktive.load({
                                            //     params: {
                                            //         'idunit': Ext.getCmp('idunitSpend').getValue(),
                                            //         'idaccounttype':'17,1,19'
                                            //     }
                                            // });
                                        }
                                        

                                    });
                                }
                            }
                        }, {
                            xtype: 'hiddenfield',
                            id: 'idaccountSpend',
                            name: 'idaccount',
                            readOnly: true
                        },  {
                            xtype: 'displayfield',
                            name: 'accnumber',
                            id: 'accnumberSpend',
                            readOnly: true
                        },  '->',
                          {
                            xtype: 'datefield',
                            id: 'tanggalSpend',
                            format: 'd/m/Y',
                            fieldLabel: 'Tanggal'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                       {
                            xtype: 'textfield',
                            width: 500,
                            labelWidth: 150,
                            id: 'memoSpend',
                            fieldLabel: 'Memo'
                        },'->',
                        {
                            xtype: 'textfield',
                            id: 'receiveFromSpend',
                            fieldLabel: 'Penerima'
                        }
                    ]
                },
                 {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Tambah Item',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClick
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Rekam Pengeluaran Kas',
                            iconCls: 'disk',
                            handler: this.recordSpend
                        },'->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalSpend',
                            fieldLabel: 'Total Penerimaan',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'taxSpend',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype:'comboxConfirmMoneyStatus',
                            name:'status',
                            id:'comboxConfirmMoneyStatusSpend',
                            value:1,
                            allowBlank:false
                        },
                        '->',
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalSpend',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        Ext.getCmp('comboxConfirmMoneyStatusSpend').setReadOnly(true);
//                        disableEntrySpendMoney();
                    }
                }
            }
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                updateGridSpend();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSpend: function()
    {
        if (validasiSpend())
        {
            var json = Ext.encode(Ext.pluck(SpendGridStore.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySpendMoney').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'money/recordSpend',
                method: 'POST',
                params: {
                    idaccountSpend: Ext.getCmp('idaccountSpend').getValue(),
                    notransSpend: Ext.getCmp('notransSpend').getValue(),
                    receiveFromSpend: Ext.getCmp('receiveFromSpend').getValue(),
                    tanggalSpend: Ext.getCmp('tanggalSpend').getValue(),
                    memoSpend: Ext.getCmp('memoSpend').getValue(),
                    totalSpend: Ext.getCmp('totalSpend').getValue(),
                    taxSpend: Ext.getCmp('taxSpend').getValue(),
                    subtotalSpend: Ext.getCmp('subtotalSpend').getValue(),
                    idunitSpend : Ext.getCmp('idunitSpend').getValue(),
                    status : Ext.getCmp('comboxConfirmMoneyStatusSpend').getValue(),
                    dataGrid:json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);
//                        
                        Ext.getCmp('accnameSpend').setValue(null);
                        Ext.getCmp('idaccountSpend').setValue(null);
                        Ext.getCmp('accnumberSpend').setValue(null);
                        Ext.getCmp('notransSpend').setValue(null);
                        Ext.getCmp('receiveFromSpend').setValue(null);
                        Ext.getCmp('tanggalSpend').setValue(null);
                        Ext.getCmp('memoSpend').setValue(null);
                        Ext.getCmp('totalSpend').setValue(null);
                        Ext.getCmp('taxSpend').setValue(null);
                        Ext.getCmp('subtotalSpend').setValue(null);
//                        Ext.getCmp('idunitSpend').setValue(null);

                        SpendGridStore.removeAll();
                        SpendGridStore.sync();
                        updateGridSpend();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiPayment())
        {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {


//        this.getStore().load({
//            // store loading is asynchronous, use a load listener or callback to handle results
//            callback: this.onStoreLoad
//        });
    },
    onStoreLoad: function() {
//        Ext.Msg.show({
//            title: 'Store Load Callback',
//            msg: 'store was loaded, data available for processing',
//            icon: Ext.Msg.INFO,
//            buttons: Ext.Msg.OK
//        });
    },
    onAddClick: function() {
        
        if(Ext.getCmp('idunitSpend').getValue()==null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            Ext.getCmp('formAddRowSpend').getForm().reset();
        
            wAddRowSpend.show();

//            var rec = new SpendGridStoreModel({
//                idaccount: null,
//                accname: null,
//                accnumber: null,
//                amount: null,
//                ratetax: null
//            });
//
//            this.getStore().insert(0, rec);
//            this.cellEditing.startEditByPosition({
//                row: 0,
//                column: 0
//            });
        }
        
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridSpend();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridSpend()
{    
    var subtotalSpend = 0 * 1;
    var totalPajak = 0 * 1;
    var totalSpend = 0 * 1;

    Ext.each(SpendGridStore.data.items, function(obj, i) {
        var pajak = (obj.data.amount*1 / 100) * obj.data.ratetax;
        totalPajak += pajak;
        subtotalSpend += obj.data.amount*1;
    });

    totalSpend = subtotalSpend*1-totalPajak*1;

    Ext.getCmp('subtotalSpend').setValue(subtotalSpend.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('taxSpend').setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalSpend').setValue(totalSpend.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiSpend()
{
//    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('accnameSpend').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Akun kas belum diinput');

    } else if (Ext.getCmp('notransSpend').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan no transaksi');
    } else if (Ext.getCmp('tanggalSpend').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal pengeluaran');
    } else if (Ext.getCmp('memoSpend').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan memo pengeluaran');
    }  else if (Ext.getCmp('subtotalSpend').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan item pengeluaran');
    } else {
        return true;
    }
}

var wEntrySpendMoney = Ext.create('widget.window', {
    id: 'wEntrySpendMoney',
    title: 'Entri Pengeluaran',
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
    items: [{
            xtype: 'EntrySpendMoney'
        }]
});

