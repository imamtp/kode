Ext.define('KitchenSink.view.grid.CellEditing', {
    extend: 'Ext.grid.Panel',
    id: 'CellEditing',
    alias: 'widget.CellEditing',
    xtype: 'cell-editing',
    // title: 'Input Jurnal',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            // autoHeight:true,
            // autoWidth:true,
            width: 750,
            height: 100,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeJ,
            columns: [
                {
                    header: 'idaccount',
                    hidden: true,
                    dataIndex: 'idaccount',
                    id: 'idaccount',
//                    editor: {
//                        allowBlank: false
//                    }
                },
                {
                    header: 'No Akun',
                    dataIndex: 'accnumber',
                    id: 'accnumber',
                    width: 50
                },
                {
                    header: 'Nama Akun',
                    dataIndex: 'accname',
                    width: 150,
                    id: 'accname',
//                    editor: {
//                        allowBlank: false
//                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Kredit',
                    width: 100,
                    dataIndex: 'credit',
                    id: 'credit',
                    editor: {
                        allowBlank: false
                    },
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Debit',
                    width: 100,
                    dataIndex: 'debit',
                    id: 'debit',
                    editor: {
                        allowBlank: false
                    },
                    align: 'right',
//                    renderer: 'usMoney',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
//                {
//                    header: 'Pajak',
////                    width:50,
//                    dataIndex: 'ratetax',
//                    editor: {
//                        xtype:'comboxtax',
//                        valueField:'rate',
//                        labelWidth:40
//                    }
//                },
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
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                     {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            id: 'cbUnitEntryJournal'
                        }
                       , '->', 
                        {
                            xtype: 'datefield',
                            id: 'tanggaljurnal',
                            format: 'd/m/Y',
                            fieldLabel: 'Tanggal'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
 {
                            xtype: 'textfield',
                            id: 'nojurnal',
                            fieldLabel: 'No Jurnal #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoRef(1, Ext.getCmp('cbUnitEntryJournal').getValue(), 'nojurnal');
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
                            width: 500,
                            id: 'memojurnal',
                            fieldLabel: 'Memo'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Tambah Jurnal',
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
                    // {
                    //         itemId: 'useRecuringJurnal',
                    //         text: 'Gunakan Recurring Jurnal',
                    //         iconCls: 'add-icon',
                    //         handler: function() {
                    //             wGridRecurringPopup.show();
                    //             storeGridRecurringPopup.load();
                    //         }
                    //     }, {
                    //         itemId: 'recordandsavejurnal',
                    //         text: 'Simpan Sebagai Recurring Jurnal',
                    //         iconCls: 'add-icon',
                    //         handler: this.saveRecurr
                    //     }, 
                        {
                            itemId: 'recordjurnal',
                            text: 'Rekam Jurnal',
                            iconCls: 'add-icon',
                            handler: this.recordJurnal
                        }, '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            id: 'outofbalance',
                            fieldLabel: 'Out of Balance',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
//                {
//                    xtype: 'toolbar',
//                    dock: 'bottom',
//                    items: ['->',
//                        {
//                            xtype: 'textfield',
//                            align:'right',
//                            id:'totalpajak',
//                            readOnly:true,
//                            fieldLabel: 'Pajak',
//                            fieldStyle: 'text-align: right;'
//                        }
//                    ]
//                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                        {
                            xtype: 'textfield',
                            id: 'totaldebit',
                            align: 'right',
                            readOnly: true,
                            fieldLabel: 'Total Debit',
                            fieldStyle: 'text-align: right;'
                        }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                        {
                            xtype: 'textfield',
                            id: 'totalcredit',
                            align: 'right',
                            readOnly: true,
                            fieldLabel: 'Total Kredit',
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
                        disableEntryJournal();
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
                updateGridJurnal('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordJurnal: function()
    {
//        console.log(Ext.getCmp('cbUnitEntryJournal').getValue())
//        var cbUnit = Ext.encode(Ext.getCmp('cbUnitEntryJournal').getValue());
//        Ext.Ajax.request({
//            url: SITE_URL + 'journal/tesunit',
//            method: 'POST',
//            params: {
//                unit: cbUnit
//            },
//            success: function(form, action) {
//
//            }
//        });

        if (validasiJurnal())
        {
            var json = Ext.encode(Ext.pluck(storeJ.data.items, 'data'));
//            var cbUnit = Ext.encode(Ext.getCmp('cbUnitEntryJournal').getValue());
            var cbUnit = Ext.getCmp('cbUnitEntryJournal').getValue(); 
//            var outofbalance = Ext.getCmp('outofbalance').getValue();
            Ext.Ajax.request({
                url: SITE_URL + 'journal/recordJournal',
                method: 'POST',
                params: {
                    totalcredit: Ext.getCmp('totalcredit').getValue(),
                    totaldebit: Ext.getCmp('totaldebit').getValue(),
                    //                totalpajak: Ext.getCmp('totalpajak').getValue(),
                    memojurnal: Ext.getCmp('memojurnal').getValue(),
                    nojurnal: Ext.getCmp('nojurnal').getValue(),
                    tanggaljurnal: Ext.getCmp('tanggaljurnal').getValue(),
                    datagrid: json,
                    unit: cbUnit
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
//                    console.log(d)
                    Ext.Msg.alert('Success', d.message);


                    Ext.getCmp('totalcredit').setValue(null),
                            Ext.getCmp('totaldebit').setValue(null),
                            Ext.getCmp('memojurnal').setValue(null),
                            Ext.getCmp('nojurnal').setValue(null),
                            Ext.getCmp('tanggaljurnal').setValue(null),
                            storeJ.removeAll();
                    storeJ.sync();
                    updateGridJurnal('general');
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        if (validasiJurnal())
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
        console.log(Ext.getCmp('cbUnitEntryJournal').getValue());
        if (Ext.getCmp('cbUnitEntryJournal').getValue() == null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            Ext.getCmp('formAddRowJurnal').getForm().reset();
            wAddRowJurnal.show();
            
        }
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridJurnal('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
})

var wEntryJurnal = Ext.create('widget.window', {
    id: 'wEntryJurnal',
    title: 'Entry Jurnal',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    minWidth: 750,
    height: 450,
    // autoHeight: true,
    layout: 'fit',
    border: false,
    items: [
    {
        xtype:'CellEditing'
    }]
});


function updateGridJurnal(tipe)
{
//    console.log(tipe);
    if (tipe == 'general')
    {
        //jurnal umu store storeJ        
//        var storeJ = storeJ;    
        var addprefix = '';
    } else if (tipe == 'recurring')
    {
        storeJ = storeJrec;
        var addprefix = 'RecDetail';
    }
//    console.log('outofbalance'+addprefix);
    var totalcredit = 0 * 1;
    var totaldebit = 0 * 1;
//    var totalpajak = 0*1;
    var total = 0 * 1;

    Ext.each(storeJ.data.items, function(obj, i) {
        totalcredit += obj.data.credit * 1;
        totaldebit += obj.data.debit * 1;

        total = totalcredit + totaldebit;
    });

    var selisih = totaldebit - totalcredit;
    var d = totaldebit;
    var c = totalcredit;
    Ext.getCmp('outofbalance' + addprefix).setValue(selisih.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totaldebit' + addprefix).setValue(d.toLocaleString('null', {minimumFractionDigits: 2}));
    Ext.getCmp('totalcredit' + addprefix).setValue(c.toLocaleString('null', {minimumFractionDigits: 2}));
//                Ext.getCmp('totalpajak').setValue(totalpajak.toLocaleString('null',{minimumFractionDigits: 2}));

}

function validasiJurnal()
{
//        var json = Ext.encode(Ext.pluck(storeJ.data.items, 'data'));
    var outofbalance = Ext.getCmp('outofbalance').getValue();
    if (Ext.getCmp('cbUnitEntryJournal').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Unit belum dipilih!');

    } else if (outofbalance != 0)
    {
        Ext.Msg.alert('Failed', 'Jurnal Tidak Seimbang<br><br>out of balance: ' + outofbalance);

    } else if (Ext.getCmp('nojurnal').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan nomor jurnal');
    } else if (Ext.getCmp('tanggaljurnal').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal jurnal');
    } else if (Ext.getCmp('totalcredit').getValue() == '' || Ext.getCmp('totaldebit').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Transaksi jurnal tidak boleh kosong');
    } else {
        return true;
    }
}



