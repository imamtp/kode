var COAReturnPO = Ext.create(dir_sys + 'purchase2.COAReturnPO');

Ext.define('GridReturnItemPurchaseOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['purchase_batch_id', 'idpurchaseitem', 'idinventory', 'invno', 'sku_no', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'sku_no', 'size', 'warehouse_code', 'size_measurement', 'batch'],
    idProperty: 'id'
});

var storeGridItemPurchaseOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridReturnItemPurchaseOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemPurchase/purchase',
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

//end store head

// var smEntryReturnPOGrid = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     // mode: 'SINGLE',
//     multipleSelect:true,
//     listeners: {
//         deselect: function(model, record, index) {
//             // var selectedLen = smGridBatchItemPOReturnList.getSelection().length;
//             // if (selectedLen == 0) {
//             //     console.log(selectedLen);
//             //     Ext.getCmp('btnDeleteMasterSupplierData').disable();
//             // }
//         },
//         select: function(model, record, index) {
//             // Ext.getCmp('btnDeleteMasterSupplierData').enable();
//         }
//     }
// });

Ext.define(dir_sys + 'purchase2.EntryReturnPO', {
    extend: 'Ext.grid.Panel',
    id: 'EntryReturnPO',
    alias: 'widget.EntryReturnPO',
    // selModel:smEntryReturnPOGrid,
    // xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,    
    initComponent: function() {

        // this.cellEditing = new Ext.grid.plugin.CellEditing({
        //     clicksToEdit: 1
        // });

        Ext.apply(this, {
            width: panelW - 60,
            height: sizeH - 120,
            // forceFit: true,
            // plugins: [this.cellEditing],
            store: storeGridItemPurchaseOrder,
            columns: [{
                    header: 'purchase_batch_id',
                    hidden: true,
                    dataIndex: 'purchase_batch_id'
                },
                {
                    header: 'idpurchaseitem',
                    hidden: true,
                    dataIndex: 'idpurchaseitem',
                    //                    id: 'idinventory'
                }, {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
                    //                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'assetaccount',
                    hidden: true,
                    dataIndex: 'assetaccount'
                },
                {
                    header: 'SKU No',
                    dataIndex: 'sku_no',
                    //                    id: 'invno',
                    width: 130
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
                    //                    id: 'invno',
                    width: 130
                },
                {
                    header: 'Nama Barang',
                    flex: 1,
                    dataIndex: 'nameinventory',
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Harga',
                    dataIndex: 'price',
                    width: 150,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan',
                    dataIndex: 'short_desc',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    hidden: true,
                    header: 'Ukuran',
                    width: 70,
                    dataIndex: 'size',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan Ukuran',
                    hidden: true,
                    minWidth: 120,
                    dataIndex: 'size_measurement',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Disc (%)',
                    hidden: true,
                    minWidth: 90,
                    dataIndex: 'disc',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 0
                    // }
                }, {
                    xtype: 'numbercolumn',
                    hidden: true,
                    header: 'Total',
                    dataIndex: 'total',
                    width: 150,
                    align: 'right'
                },
                {
                    header: 'Pajak',
                    hidden: true,
                    //                    width:50,
                    dataIndex: 'ratetax',
                    // editor: {
                    //     xtype: 'comboxtax',
                    //     hideLabel:true,
                    //     valueField: 'rate',
                    //     labelWidth: 40
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Terima',
                    hidden: true,
                    minWidth: 90,
                    dataIndex: 'qty_terima',
                    // hidden:true,
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Warehouse',
                    minWidth: 150,
                    hidden: true,
                    dataIndex: 'warehouse_code',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel: true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                },
                {
                    header: 'Catatan',
                    minWidth: 150,
                    hidden: true,
                    dataIndex: 'notes',
                    editor: {
                        xtype: 'textfield',
                        hideLabel: true,
                        labelWidth: 100
                    }
                }
            ],
            // selModel: {
            //     selType: 'cellmodel'
            // },
            dockedItems: [{
                    xtype: 'hiddenfield',
                    id: 'idpurchase_poreturn',
                    name: 'idpurchase'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'purchase_return_id_poreturn',
                    name: 'purchase_return_id'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'statusform_poreturn',
                    name: 'statusFormPurchaseOrder'
                },

                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'noreturn_poreturn',
                            fieldLabel: 'NO Return #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoID(4, Ext.getCmp('cbUnit_poreturn').getValue(), 'idpurchase', 'purchase', 'noreturn_poreturn', 'RETPO');
                                        // insertNoRef(4, Ext.getCmp('cbUnit_poreturn').getValue(), 'noreturn_poreturn','RET');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'nopo_poreturn',
                            fieldLabel: 'NO PO #'
                        },
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            labelWidth: 120,
                            name: 'po_date',
                            id: 'po_date_poreturn',
                            format: 'd/m/Y',
                            fieldLabel: 'PO Date'
                        },
                        {
                            xtype: 'comboxunit',
                            readOnly: true,
                            valueField: 'idunit',
                            labelWidth: 120,
                            valueField: 'idunit',
                            id: 'cbUnit_poreturn'
                                //                            ,multiSelect:true
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        {
                            xtype: 'comboxidsupplier',
                            readOnly: true,
                            id: 'supplier_poreturn',
                            labelWidth: 120
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            name: 'return_date',
                            id: 'return_date_poreturn',
                            format: 'd/m/Y',
                            maxValue: new Date(),
                            fieldLabel: 'Return Date'
                        },
                        {
                            xtype: 'comboxtaxtype',
                            readOnly: true,
                            labelWidth: 120,
                            name: 'idtax',
                            valueField: 'idtax',
                            id: 'cb_tax_id_poreturn',
                            listeners: {
                                select: function(combo, record, index) {
                                    // alert(combo.getValue()); // Return Unitad States and no USA
                                    // updateGridPurchaseOrder();
                                }
                            }
                        },
                        {
                            xtype: 'comboxPOReturnStatus',
                            name: 'po_return_status',
                            // readOnly:true,
                            labelWidth: 120,
                            id: 'cb_status_poreturn'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            id: 'shipaddress_poreturn',
                            hidden: true,
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {}
                            }
                        }, ,
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'total_poreturn',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }

                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 150,
                            id: 'notes_poreturn',
                            fieldLabel: 'Catatan'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            name: 'totalPajak',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajak_poreturn',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                        //                         {
                        //                             xtype: 'textfield',
                        //                             id: 'angkutPurchaseOrder',
                        //                             align: 'right',
                        // //                            readOnly: true,
                        //                             labelWidth: 120,
                        //                             fieldLabel: 'Biaya Angkut',
                        //                             fieldStyle: 'text-align: right;',
                        //                             listeners: {
                        //                                 'render': function(c) {
                        //                                     c.getEl().on('keyup', function() {
                        //                                         updateGridPurchaseOrder('general');
                        //                                     }, c);
                        //                                 }
                        //                             }
                        //                         }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Retur Pembelian',
                            combineErrors: true,
                            msgTarget: 'side',
                            layout: 'hbox',
                            labelWidth: 150,
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            items: [{
                                xtype: 'textfield',
                                allowBlank: false,
                                name: 'accnamereturpo',
                                id: 'accname_coa_retur_po',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnit_poreturn').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                COAReturnPO.show();
                                                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                                    operation.params = {
                                                        'idunit': Ext.getCmp('cbUnit_poreturn').getValue(),
                                                        'idaccounttype': '12,16'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_coa_retur_po',
                            }, {
                                xtype: 'hiddenfield',
                                name: 'idaccount_return',
                                id: 'idaccount_coa_retur_po',
                            }]
                        },
                        //     {
                        //     xtype:'textfield',

                        //     labelWidth: 150,
                        //     readOnly: true,
                        //     fieldLabel:'Total Barang Retur',
                        // },
                        {
                            xtype: 'comboxcurrency',
                            hidden: true,
                            id: 'comboxcurrency_poreturn',
                            labelWidth: 120
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotal_poreturn',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                        {
                            xtype: 'textfield',
                            id: 'pembayaran_poreturn',
                            align: 'right',
                            hidden: true,
                            //                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPurchaseOrder('general');
                                    }, c);
                                }
                            }
                        }


                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                    console.log(dataRecord);
                    var bottombatch = Ext.getCmp('batch_item_panel');
                    var bottomqty = Ext.getCmp('qtyreturn_item_panel');

                    if (dataRecord.data.batch) {
                        //menampilan footer batch grid
                        // var bottomqty = Ext.getCmp('qtyreturn_item_panel');
                        bottomqty.hide();

                        // bottombatch.show();
                        // bottombatch.toggleCollapse(true);

                        bottombatch.setTitle('Batch Item :' + dataRecord.data.sku_no + ' - ' + dataRecord.data.invno + ' - ' + dataRecord.data.nameinventory)

                        // Ext.getCmp('numbatch_itempo').setReadOnly(true);
                        // Ext.getCmp('buatbatchbtn_itempo').hide();

                        //ambil data inventory yang di-batchkan
                        var GridBatchPoReturn = Ext.getCmp('GridBatchPoReturn');
                        var GridBatchPoReturnStore = GridBatchPoReturn.getStore();
                        // GridBatchPoReturn.removeAll();
                        // GridBatchPoReturn.sync();

                        //load batch item to grid
                        GridBatchPoReturnStore.on('beforeload', function(store, operation, eOpts) {
                            operation.params = {
                                'extraparams': 'a.idpurchaseitem:' + dataRecord.data.idpurchaseitem
                                    // 'option':'notyetdelivered'
                                    // 'wherenotinschedule':'true'
                            };
                        });
                        GridBatchPoReturnStore.load();

                        //add checked item to grid
                        Ext.Ajax.request({
                            url: SITE_URL + 'purchase/get_po_batchitems',
                            method: 'GET',
                            params: {
                                idpurchaseitem: dataRecord.data.idpurchaseitem
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);

                                Ext.getCmp('numbatch_itemporeturn').setValue(d.num_rows);

                                if (d.data.length) {
                                    // var grid = Ext.getCmp('GridBatchPoReturn');
                                    for (var i = 0; i < d.data.length; i++) {
                                        console.log(i);
                                        // var rec = grid.store.getById(d.data[i].idpurchaseitem); // json.data[i].getId()
                                        // console.log(d.data[i].idpurchaseitem);
                                        if (d.data[i].checked) {
                                            GridBatchPoReturn.getSelectionModel().select(i, true);
                                        }
                                        // i++;
                                    }
                                }

                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });

                        bottombatch.show();
                    } else {
                        //menampilkan footer qty retur form
                        bottombatch.hide();

                        bottomqty.setTitle('Qty Retur :' + dataRecord.data.sku_no + ' - ' + dataRecord.data.invno + ' - ' + dataRecord.data.nameinventory)

                        bottomqty.show();
                        bottomqty.toggleCollapse(true);

                        Ext.Ajax.request({
                            url: SITE_URL + 'purchase/cek_poreturn_item',
                            method: 'POST',
                            params: {
                                // purchase_return_id:Ext.getCmp('purchase_return_id_poreturn').getValue(),
                                idpurchaseitem: dataRecord.data.idpurchaseitem
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if (d.success) {
                                    Ext.getCmp('qty_retur').setValue(d.data.qty_retur);
                                    Ext.getCmp('notes_qty_retur').setValue(d.data.notes);
                                } else {
                                    Ext.getCmp('qty_retur').setValue(null);
                                    Ext.getCmp('notes_qty_retur').setValue(null);
                                }

                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    }


                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntryReturnPO();
                    }
                }
            }
        });

        this.callParent();

        // this.on('afterlayout', this.loadStore, this, {
        //     delay: 1,
        //     single: true
        // });

        // this.on('afteredit', this.onAfterEdit, this);

        // this.on({
        //     scope: this,
        //     edit: function() {
        //         // updateGridPurchaseOrder('general');
        //     }
        // });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPurchaseOrder: function(button, event, mode) {

    },
    saveRecurr: function() {
        if (validasiPurchaseOrder()) {
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
        //        console.log(Ext.getCmp('supplierPurchaseOrder').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        // wItemPurchaseOrderPopup.show();
        // storeGridItemSalesPopupOrder.load();

        //        var rec = new JournalStore({
        //            idaccount: null,
        //            accname: null,
        //            accnumber: null,
        //            debit: null,
        //            credit: null
        //        });
        //
        //        this.getStore().insert(0, rec);
        //        this.cellEditing.startEditByPosition({
        //            row: 0,
        //            column: 0
        //        });
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        // updateGridPurchaseOrder('general')
    },
    // onEdit: function(editor, e) {
    //     e.record.commit();
    // }
});

function updateGridPurchaseOrder(tipe) {
    console.log('update run');
    var addprefix = '_poreturn';

    var subtotalPurchaseOrder = 0 * 1;
    var totalPurchaseOrder = 0 * 1;
    var totalPajak = 0 * 1;
    // var angkutPurchaseOrder = Ext.getCmp('angkutPurchaseOrder').getValue();
    var angkutPurchaseOrder = 0;
    var pembayaranPurchaseOrder = Ext.getCmp('pembayaranPurchaseOrder').getValue();
    var sisaBayarPurchaseOrder = 0 * 1;
    var taxrate = Ext.getCmp('cb_tax_id_po').getValue();

    Ext.each(storeGridItemPurchaseOrder.data.items, function(obj, i) {
        var total = obj.data.qty * (obj.data.price * obj.data.size);
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        console.log(total + ' - ' + diskon);

        subtotalPurchaseOrder += net;
        totalPajak += (net / 100) * (taxrate * 1);
        obj.set('ratetax', taxrate);
        obj.set('total', net);
    });

    //     console.log(subtotalPurchaseOrder);
    totalPurchaseOrder = subtotalPurchaseOrder + angkutPurchaseOrder * 1;
    //     console.log(totalPurchaseOrder+' '+totalPajak);
    totalPurchaseOrder = totalPurchaseOrder + totalPajak;
    //     console.log(totalPurchaseOrder);
    sisaBayarPurchaseOrder = totalPurchaseOrder - pembayaranPurchaseOrder;
    // alert(totalPajak);
    Ext.getCmp('subtotal' + addprefix).setValue(subtotalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('total' + addprefix).setValue(totalPurchaseOrder.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', { minimumFractionDigits: 2 }));
    // Ext.getCmp('angkutPurchaseOrder').setValue(angkutPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaran').setValue(pembayaranPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarPurchaseOrder').setValue(sisaBayarPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiPurchaseOrder() {
    //    alert(Ext.getCmp('comboxcurrencyPurchaseOrder').getValue());   

    if (Ext.getCmp('supplierPurchaseOrder').getValue() == null) {
        Ext.Msg.alert('Failed', 'Supplier belum dipilih');

    } else if (Ext.getCmp('delivery_date_PurchaseOrder').getValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan tanggal Purchase Order');
    }
    // else if (Ext.getCmp('shipaddressPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan alamat pengiriman');
    // } 
    // else if (Ext.getCmp('nojurnalPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan NO SO');
    // } else if (Ext.getCmp('memoPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan Memo Sales Order');
    // } else if (Ext.getCmp('totalPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan barang');
    // } else if (Ext.getCmp('paymentPurchaseOrder').getValue() == null)
    // {
    //     Ext.Msg.alert('Failed', 'Tentukan pembayaran');
    // } else if (Ext.getCmp('paymentPurchaseOrder').getValue() == 3 && Ext.getCmp('tglPelunasanPurchaseOrder').getValue() == null)
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan tanggal pelunasan');
    // } else if(Ext.getCmp('paymentPurchaseOrder').getValue()==1 && Ext.getCmp('pembayaranPurchaseOrder').getValue()==0)
    // {
    //      Ext.Msg.alert('Failed', 'Jumlah Pembayaran Tunai Belum Diinput');
    // }
    // else if (Ext.getCmp('paymentPurchaseOrder').getValue() == 1 && Ext.getCmp('idaccountPurchaseOrder').getValue() == '')
    // {
    //     //kalo tunai harus menggunakan akun persediaan / barang datang
    //     Ext.Msg.alert('Failed', 'Tentukan akun persediaan/barang dagang');
    // } 
    else {
        return true;
    }
}