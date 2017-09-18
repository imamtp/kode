
//////////////////////// NO PO ////////////////////////////////////////////////////
Ext.define('GridNOPOModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchase','idjournal','jumlahbeli','nopurchase','shipaddress','date','freigthcost','tax','totalamount','paidtoday','totalowed','memo','year','month','userin','datein','notes','paiddate','noinvoice','nameshipping', 'status', 'namepayment','namaunit','namecurr'],
    idProperty: 'id'
});
var storeGridNOPOReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridNOPOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseAll/purchase',
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

Ext.define('MY.searchGridPOReturn', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPOReturn',
    store: storeGridNOPOReturn,
    width: 180
});

Ext.define('GridPOReturn', {
    itemId: 'GridPOReturn',
    id: 'GridPOReturn',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPOReturn',
    store: storeGridNOPOReturn,
    loadMask: true,
    columns: [
        {header: 'idpurchase', dataIndex: 'idpurchase', hidden: true},
        {header: 'No Order', dataIndex: 'nopurchase', minWidth: 100},
        {header: 'No Invoice', dataIndex: 'noinvoice', minWidth: 100},
        {header: 'Tanggal', dataIndex: 'date', minWidth: 100},
        {header: 'Alamat Pengiriman', dataIndex: 'shipaddress', minWidth: 150},
        {header: 'Jumlah Beli', dataIndex: 'jumlahbeli', minWidth: 100},
        {header: 'Biaya Angkut', dataIndex: 'freigthcost', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Pajak', dataIndex: 'tax', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Jumlah Pembayaran', dataIndex: 'totalamount', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Uang Muka', dataIndex: 'paidtoday', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Saldo Terhutang', dataIndex: 'totalowed', minWidth: 150,xtype:'numbercolumn',align:'right'},
        {header: 'Memo', dataIndex: 'memo', minWidth: 100},
        {header: 'Catatan', dataIndex: 'notes', minWidth: 150},
        // {header: 'paid date', dataIndex: 'paiddate', minWidth: 100},
        {header: 'Pengiriman', dataIndex: 'nameshipping', minWidth: 100},
        {header: 'Jenis Pembayaran', dataIndex: 'namepayment', minWidth: 150},
        {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'Mata Uang', dataIndex: 'namecurr', minWidth: 100},
        {header: 'Status', dataIndex: 'status', minWidth: 100},
        {header: 'Operator', dataIndex: 'userin', minWidth: 100},
        {header: 'Tgl Input', dataIndex: 'datein', minWidth: 100}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    text: 'Pilih PO',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridPOReturn')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                           Ext.getCmp('nopoReturn').setValue(selectedRecord.get('nopurchase'));
//                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));
                    
                           Ext.getCmp('wItemNOPOReturnPopup').hide();
                        }


                    }
                },
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridPOReturn',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridNOPOReturn, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemReturn.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

var wItemNOPOReturnPopup = Ext.create('widget.window', {
    id: 'wItemNOPOReturnPopup',
    title: 'Pilih Purchase Order dari Supplier',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 580,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridPOReturn'
    }]
});
//////////////////////// END NO PO ////////////////////////////////////////////////////


Ext.define('KitchenSink.view.grid.EntryReturn', {
    extend: 'Ext.grid.Panel',
    id: 'EntryReturn',
    alias: 'widget.EntryReturn',
    xtype: 'cell-editing',
    title: 'Input Retur Pembelian',
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
            store: storeGridItemReturn,
            columns: [
                {
                    header: 'idaccount',
                    hidden: true,
                    dataIndex: 'idaccount'
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
                    width: 150
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    width: 150
                },
                {
                    header: 'Harga Beli',
                    xtype:'numbercolumn',
                    align:'right',
                    dataIndex: 'cost',
                    width: 150
                },
                {
                    header: 'Stok',
                    dataIndex: 'qtystock',
                    width: 150
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Retur',
                    width: 100,
                    dataIndex: 'qtyretur',
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
                    header: 'Total',
                    xtype:'numbercolumn',
                    align:'right',
                    dataIndex: 'returnamount',
                    width: 150
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
                            id:'idunitReturn',
                            labelWidth: 150,
                            name:'idunit',
                            valueField:'idunit'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'No Ref',
                            name: 'notrans',
                            id:'notransReturn',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoRef(5, Ext.getCmp('idunitReturn').getValue(), 'notransReturn','RET');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idaccountReturn',
                            name: 'idaccount',
                            readOnly: true
                        },   '->',
                        {
                            xtype:'comboxsupplier',
                            valueField:'idsupplier',
                            id:'idsupplierReturn'
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Akun Pengurang Hutang',
                            labelWidth: 150,
                            name: 'accname',
                            id: 'accnameReturn',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        
                                        if(Ext.getCmp('idunitReturn').getValue()==null)
                                        {
                                            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                        } else {
                                            windowPopupAccListReturn.show();
                                            storeAccountAktive.load({
                                                params: {
                                                    'idunit': Ext.getCmp('idunitReturn').getValue()
                                                }
                                            });
                                        }
                                        

                                    });
                                }
                            }
                        }, {
                            xtype: 'hiddenfield',
                            name: 'accnumber',
                            id: 'accnumberReturn',
                            readOnly: true
                        },{
                            xtype: 'datefield',
                            id: 'tanggalReturn',
                            format: 'd/m/Y',
                            fieldLabel: 'Tanggal'
                        }, '->',
                        {
                                xtype: 'textfield',
                                id:'nopoReturn',
                                fieldLabel: 'No PO/Order',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            
                                            if(Ext.getCmp('idsupplierReturn').getValue()==null)
                                            {
                                                Ext.Msg.alert('Perhatian', 'Supplier belum dipilih');
                                            } else {
                                                wItemNOPOReturnPopup.show();
                                                storeGridNOPOReturn.load({
                                                    params:  {
                                                        'extraparams': 'a.idunit:'+Ext.getCmp('idunitReturn').getValue()
                                                      }
                                                });
                                            }
                                            

                                        });
                                }
                            }
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
                            value:'Retur Pembelian',
                            labelWidth: 150,
                            id: 'memoReturn',
                            fieldLabel: 'Memo'
                        },'->',
                        {
                            xtype: 'datefield',
                            // labelWidth: 150,
                            id: 'tanggalKirimReturn',
                            format: 'd/m/Y',
                            fieldLabel: 'Tanggal Kirim'
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
                        },'->',
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            itemId: 'recordPayment',
                            text: 'Rekam Retur',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordReturn, this, 'noprint', true)
                        },{
                            text: 'Rekam dan Cetak Retur',
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordReturn, this, 'print', true)
                        },'->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 100,
                            id: 'totalReturn',
                            fieldLabel: 'Total Retur',
                            fieldStyle: 'text-align: right;'
                        },
                        {
                            xtype: 'textfield',
                            align: 'right',
                            // readOnly: true,
                            labelWidth: 140,
                            id: 'pengembaliandana',
                            fieldLabel: 'Pengembalian Dana',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        var sudahdibayar = str_replace('.','',Ext.getCmp('pembayaranberjalan').getValue());
                                        var sudahdibayar = sudahdibayar*1;
                                        var dibalikin = str_replace('.','',this.getValue());
                                        var dibalikin = dibalikin*1;
                                        
                                        if(dibalikin<=sudahdibayar)
                                        {
                                            console.log(dibalikin+"<="+sudahdibayar)
                                            this.setRawValue(renderNomor(dibalikin));
                                        } else {
                                            Ext.Msg.alert('Peringatan', 'Pengembalian Dana Tidak Boleh Melebihi Dana Yang Sudah Dibayar.');
                                        }
                                        // updateSelisih();
                                    }, c);
                                }
                            }
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
                            labelWidth: 100,
                            id: 'taxReturn',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        },
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 140,
                            id: 'pembayaranberjalan',
                            fieldLabel: 'Sudah Dibayar',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                         {
                            xtype: 'textfield',
                            width: 330,
                            labelWidth: 100,
                            id: 'catatanReturn',
                            fieldLabel: 'Catatan Retur'
                        },'->',
                         {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 100,
                            id: 'subtotalReturn',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        },
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 140,
                            id: 'saldoterhutang',
                            fieldLabel: 'Saldo Terhutang',
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
//                        disableEntryReturn();
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
                updateGridReturn();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordReturnPrint: function(button, event, mode)
    {
        console.log(mode)
    },
    recordReturn: function(button, event, mode)
    {
        if (validasiReturn())
        {
            var json = Ext.encode(Ext.pluck(storeGridItemReturn.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryReturn').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/recordReturn',
                method: 'POST',
                params: {
                    idaccountReturn: Ext.getCmp('idaccountReturn').getValue(),
                    notransReturn: Ext.getCmp('notransReturn').getValue(),
                    tanggalKirimReturn: Ext.getCmp('tanggalKirimReturn').getValue(),
                    tanggalReturn: Ext.getCmp('tanggalReturn').getValue(),
                    memoReturn: Ext.getCmp('memoReturn').getValue(),
                    totalReturn: Ext.getCmp('totalReturn').getValue(),
                    taxReturn: Ext.getCmp('taxReturn').getValue(),
                    subtotalReturn: Ext.getCmp('subtotalReturn').getValue(),
                    idunitReturn : Ext.getCmp('idunitReturn').getValue(),
                    idsupplierReturn : Ext.getCmp('idsupplierReturn').getValue(),
                    nopoReturn : Ext.getCmp('nopoReturn').getValue(),
                    catatanReturn: Ext.getCmp('catatanReturn').getValue(),
                    saldoterhutang: Ext.getCmp('saldoterhutang').getValue(),
                    pembayaranberjalan: Ext.getCmp('pembayaranberjalan').getValue(),
                    pengembaliandana: Ext.getCmp('pengembaliandana').getValue(),
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
                        Ext.getCmp('accnameReturn').setValue(null);
                        Ext.getCmp('idaccountReturn').setValue(null);
                        Ext.getCmp('accnumberReturn').setValue(null);
                        Ext.getCmp('notransReturn').setValue(null);
                        Ext.getCmp('tanggalKirimReturn').setValue(null);
                        Ext.getCmp('tanggalReturn').setValue(null);
                        Ext.getCmp('memoReturn').setValue(null);
                        Ext.getCmp('totalReturn').setValue(null);
                        Ext.getCmp('taxReturn').setValue(null);
                        Ext.getCmp('subtotalReturn').setValue(null);
//                        Ext.getCmp('idunitReturn').setValue(null);

                        // storeGridItemReturn.removeAll();
                        // storeGridItemReturn.sync();
                        updateGridReturn();

                        if(mode=='print')
                        {
                            cetak('Faktur Retur','Return',d.id);
                        }
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
        
        if(Ext.getCmp('idunitReturn').getValue()==null)
        {
            Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
        } else {
            // Ext.getCmp('formAddRowReturn').getForm().reset();
        
            
            var nopo = Ext.getCmp('nopoReturn').getValue();
            if(nopo!='')
            {
                //tampilkan semua inventory by no po
                wItemPOReturnPopup.show();
                storeGridInvPOReturn.load({
                                params:  {
                                    'extraparams': 'a.nopurchase:'+Ext.getCmp('nopoReturn').getValue()
                                  }
                            });
            } else {
                //tampilkan semua inventory by unit
                wItemReturnPopup.show();
                storeGridInvReturn.load({
                                params:  {
                                    'extraparams': 'd.idunit:'+Ext.getCmp('idunitReturn').getValue()
                                  }
                            });
                }
            
        }
        
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridReturn();
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridReturn()
{    
    var subtotalReturn = 0 * 1;
    var totalPajak = 0 * 1;
    var totalReturn = 0 * 1;
    var total = 0*1;
    var saldoterhutang = 0*1;
    var pembayaranberjalan = 0*1;

    Ext.each(storeGridItemReturn.data.items, function(obj, i) {
        var pajak = (obj.data.cost*1*obj.data.qtyretur*1) * (obj.data.ratetax/100*1);
        total+= (obj.data.cost*1*obj.data.qtyretur*1);
        totalPajak += pajak;
        subtotalReturn += total*1;
    });

    totalReturn = subtotalReturn*1-totalPajak*1;

    Ext.Ajax.request({
        url: SITE_URL + 'purchase/getPurchaseBalance',
        method: 'POST',
        params: {
            nopo:Ext.getCmp('nopoReturn').getValue()
        },
        success: function(form, action) {

            var d = Ext.decode(form.responseText);
            if (!d.success)
            {
                Ext.Msg.alert('Peringatan', d.message);
            } else {
                Ext.getCmp('saldoterhutang').setValue(renderNomor(d.totalowed));
                Ext.getCmp('pembayaranberjalan').setValue(renderNomor(d.paid));
            }

        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

    Ext.getCmp('subtotalReturn').setValue(renderNomor(subtotalReturn));
    Ext.getCmp('taxReturn').setValue(renderNomor(totalPajak));
    Ext.getCmp('totalReturn').setValue(renderNomor(totalReturn));
    
    // Ext.getCmp('totalReturn').setValue(renderNomor(totalReturn));

}

function validasiReturn()
{
//    alert(Ext.getCmp('comboxcurrencyPayment').getValue());
    if (Ext.getCmp('accnameReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Akun Pengurang Hutang');

    } else if (Ext.getCmp('notransReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan no transaksi');
    } else if (Ext.getCmp('tanggalReturn').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal penerimaan');
    } else if (Ext.getCmp('memoReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan memo penerimaan');
    }  else if (Ext.getCmp('subtotalReturn').getValue() == '')
    {
        Ext.Msg.alert('Failed', 'Masukkan item penerimaan');
    } else {
        return true;
    }
}

var wEntryReturn = Ext.create('widget.window', {
    id: 'wEntryReturn',
    // title: 'Entri Return Pembelian',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    width:1000,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [{
            xtype: 'EntryReturn'
        }]
});
