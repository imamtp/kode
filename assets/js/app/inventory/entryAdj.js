

Ext.define('EntryAdj', {
    extend: 'Ext.grid.Panel',
    id: 'EntryAdj',
    alias: 'widget.EntryAdj',
    xtype: 'cell-editing',
    title: 'Input Penyesuaian Persediaan',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: 280,
            height: 100,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeInventoryAdj,
            columns: [
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory'
                },
                {
                    header: 'No Item',
                    dataIndex: 'invno',
                    width: 50
                },
                {
                    header: 'Nama Item',
                    dataIndex: 'nameinventory',
                    width: 150
                },
                {
//                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },
//                {
//                    xtype: 'numbercolumn',
//                    header: 'Harga',
//                    width: 100,
//                    dataIndex: 'unitcost',
//                    align: 'right',
//                    editor: {
//                        xtype: 'numberfield',
//                        allowBlank: false,
//                        minValue: 0
//                    }
//                },
//                {
//                    xtype: 'numbercolumn',
//                    header: 'Total Harga',
//                    width: 100,
//                    dataIndex: 'amount',
//                    align: 'right'
//                },
                {
                    header: 'No Akun',
                    dataIndex: 'accnumber',
                    width: 50
                },
                {
                    header: 'Memo',
                    width: 100,
                    dataIndex: 'memo',
                    align: 'right',
                    editor: {
                        xtype: 'textfield'
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
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'nojurnalAdj',
                            fieldLabel: 'No Jurnal #'
                        }, {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            id: 'cbUnitEntryAdj'
                        }, {
                            xtype: 'datefield',
                            id: 'tanggalAdj',
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
                            width: 500,
                            id: 'memoAdj',
                            fieldLabel: 'Memo'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Tambah Barang',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClick
                        },'->',
                        Ext.panel.Panel({
                            html: '<p align=right><i>Catatan: Gunakan tanda minus (-) untuk pengurangan persediaan barang</i></p>'
                        })
                    ]
                },
                
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            itemId: 'recordAdj',
                            text: 'Rekam Penyesuaian',
                            iconCls: 'disk',
                            handler: this.recordJurnal
                        }
                    ]
                }
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
//                {
//                    xtype: 'toolbar',
//                    dock: 'bottom',
//                    items: ['->',
//                        {
//                            xtype: 'textfield',
//                            id: 'totaldebit',
//                            align: 'right',
//                            readOnly: true,
//                            fieldLabel: 'Total Debit',
//                            fieldStyle: 'text-align: right;'
//                        }]
//                },
//                {
//                    xtype: 'toolbar',
//                    dock: 'bottom',
//                    items: ['->',
//                        {
//                            xtype: 'textfield',
//                            id: 'totalcredit',
//                            align: 'right',
//                            readOnly: true,
//                            fieldLabel: 'Total Kredit',
//                            fieldStyle: 'text-align: right;'
//                        }
//                    ]
//                }

            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
//                        disableEntryJournal();
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
                updateGridAdj();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordJurnal: function()
    {
        if (validasiAdj())
        {
            var json = Ext.encode(Ext.pluck(storeInventoryAdj.data.items, 'data'));
//            var cbUnit = Ext.encode(Ext.getCmp('cbUnitEntryJournal').getValue());
//            var outofbalance = Ext.getCmp('outofbalance').getValue();
            Ext.Ajax.request({
                url: SITE_URL + 'inventory/recordAdjusment',
                method: 'POST',
                params: {
                    nojurnalAdj: Ext.getCmp('nojurnalAdj').getValue(),
                    cbUnitEntryAdj: Ext.getCmp('cbUnitEntryAdj').getValue(),
                    tanggalAdj: Ext.getCmp('tanggalAdj').getValue(),
                    memoAdj: Ext.getCmp('memoAdj').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    Ext.Msg.alert('Success', d.message);

                    Ext.getCmp('nojurnalAdj').setValue(null),
                            Ext.getCmp('cbUnitEntryAdj').setValue(null),
                            Ext.getCmp('tanggalAdj').setValue(null),
                            Ext.getCmp('memoAdj').setValue(null),
                            storeInventoryAdj.removeAll();
                    storeInventoryAdj.sync();
                    updateGridAdj();
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
//        console.log(Ext.getCmp('cbUnitEntryAdj').setValue())
        if (Ext.getCmp('cbUnitEntryAdj').getValue() == null)
        {
            Ext.Msg.alert('Penyesuaian', 'Unit belum dipilih!');
        } else {
            Ext.getCmp('formAddRowAdj').getForm().reset();
            wAddRowAdj.show();
        }

    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridAdj()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
})

function updateGridAdj()
{
//    console.log(tipe);
//    if (tipe == 'general')
//    {
//        //jurnal umu store storeJ        
////        var storeJ = storeJ;    
//        var addprefix = '';
//    } else if (tipe == 'recurring')
//    {
//        storeJ = storeJrec;
//        var addprefix = 'RecDetail';
//    }
////    console.log('outofbalance'+addprefix);
//    var totalcredit = 0 * 1;
//    var totaldebit = 0 * 1;
////    var totalpajak = 0*1;
//    var total = 0 * 1;
    console.log('update')
    Ext.each(storeInventoryAdj.data.items, function(obj, i) {
        total = obj.data.qty * 1 * obj.data.unitcost * 1;
        obj.set('amount', total);
    });
//
//    var selisih = totaldebit - totalcredit;
//    var d = totaldebit;
//    var c = totalcredit;
//    Ext.getCmp('outofbalance' + addprefix).setValue(selisih.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totaldebit' + addprefix).setValue(d.toLocaleString('null', {minimumFractionDigits: 2}));
//    Ext.getCmp('totalcredit' + addprefix).setValue(c.toLocaleString('null', {minimumFractionDigits: 2}));
//                Ext.getCmp('totalpajak').setValue(totalpajak.toLocaleString('null',{minimumFractionDigits: 2}));

}

function validasiAdj()
{
    if (Ext.getCmp('nojurnalAdj').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'No Jurnal belum diinput!');

    } else if (Ext.getCmp('cbUnitEntryAdj').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Unit belum dipilih');
    } else if (Ext.getCmp('tanggalAdj').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal jurnal');
    } else if (Ext.getCmp('memoAdj').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan memo');
    } else if (storeInventoryAdj.getCount() == 0)
    {
        Ext.Msg.alert('Failed', 'Barang belum diinput');
    } else {
        return true;
    }
}



