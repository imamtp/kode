// Ext.require([ 
//     dir_sys+'purchase2.GridItemPurchaseOrderPopup'
// ]);

var wItemPurchaseOrderPopup = Ext.create(dir_sys + 'purchase2.wItemPurchaseOrderPopup');
var wGridPurchaseRequestListPopup = Ext.create(dir_sys + 'purchase2.wGridPurchaseRequestListPopup');

Ext.define('GridItemPurchaseOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchaseitem', 'idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'sku_no', 'size', 'warehouse_code', 'size_measurement'],
    idProperty: 'id'
});

var storeGridItemPurchaseOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemPurchaseOrder/sales',
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

Ext.define(dir_sys + 'purchase2.EntryPurchaseOrder', {
    extend: 'Ext.grid.Panel',
    id: 'EntryPurchaseOrder',
    alias: 'widget.EntryPurchaseOrder',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
    //    frame: true,

    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemPurchaseOrder,
            columns: [{
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
                    header: 'No SKU',
                    dataIndex: 'sku_no',
                    //                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    width: 150,
                    //                    id: 'nameinventory'
                },
                {
                    header: 'Warehouse',
                    dataIndex: 'warehouse_code',
                    hidden: true,
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel: true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Harga',
                    dataIndex: 'price',
                    width: 150,
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan',
                    dataIndex: 'short_desc',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel: true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Ukuran',
                    hidden: true,
                    width: 70,
                    dataIndex: 'size',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    header: 'Satuan Ukuran',
                    hidden: true,
                    dataIndex: 'size_measurement',
                    editor: {
                        xtype: 'comboxmeasurement',
                        hideLabel: true,
                        valueField: 'short_desc',
                        displayField: 'short_desc',
                        labelWidth: 100
                    }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Disc (%)',
                    width: 70,
                    dataIndex: 'disc',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                }, {
                    xtype: 'numbercolumn',
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
                    editor: {
                        xtype: 'comboxtax',
                        hideLabel: true,
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
                    items: [{
                        text: 'Tambah Barang',
                        iconCls: 'add-icon',
                        id: 'btnAddItemPurchaseOrder',
                        scope: this,
                        handler: this.onAddClick
                    }, '->', {
                        xtype: 'textfield',
                        hidden: true,
                        fieldLabel: 'No Invoice',
                        name: 'noinvoice',
                        id: 'noinvoicePurchaseOrder'
                    }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'radiogroup',
                            id: 'rg_is_from_pr_poform',
                            labelWidth: 220,
                            fieldLabel: 'Load from Purchase Requesition?',
                            columns: 2,
                            vertical: true,
                            items: [
                                { boxLabel: 'Yes', name: 'is_from_pr', inputValue: 1, width: 50 },
                                { boxLabel: 'No', name: 'is_from_pr', inputValue: 2, checked: true, width: 50 }
                            ],
                            listeners: {
                                change: function(radiogroup, radio) {
                                    if (radio.is_from_pr == 2) {
                                        Ext.getCmp('no_purchase_req').hide();
                                        Ext.getCmp('purchase_req_date').hide();
                                        Ext.getCmp('no_purchase_req').setValue();
                                        Ext.getCmp('purchase_req_date').setValue();
                                    } else {
                                        Ext.getCmp('no_purchase_req').show();
                                        Ext.getCmp('purchase_req_date').show();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            margin: '0 0 0 215',
                            fieldLabel: 'Purchase Requesition',
                            labelWidth: 170,
                            name: 'no_purchase_req',
                            id: 'no_purchase_req',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        wGridPurchaseRequestListPopup.show();

                                        // storeGridpurchaseQuoteList.on('beforeload',function(store, operation,eOpts){
                                        //     operation.params={
                                        //                 'idunit': Ext.getCmp('idunitRequisition').getValue(),
                                        //                 'status': '1'
                                        //     };
                                        // });

                                        Ext.getCmp('GridPurchaseRequestListID').getStore().load();

                                    });
                                }
                            }
                        },
                        {
                            xtype: 'displayfield',
                            hidden: true,
                            margin: '0 0 0 7',
                            fieldLabel: 'Request Date',
                            id: 'purchase_req_date',
                            listeners: {
                                change: function(grid, newVal, oldVal, eOpts) {
                                    var picker = Ext.getCmp('po_date_PurchaseOrder');
                                    if (new Date(new Date(picker.getValue()), new Date(newVal)))
                                        picker.setValue(newVal);

                                    picker.setMinValue(new Date(newVal));
                                }
                            }
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idpurchase_req_PurchaseOrder',
                            name: 'idpurchase_req'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idpurchase_order',
                            name: 'idpurchase'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'statusformPurchaseOrderGrid',
                            name: 'statusFormPurchaseOrder'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalPurchaseOrder',
                            fieldLabel: 'NO PO #',
                            readOnly: true,
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoID(4, Ext.getCmp('cbUnitEntryPurchaseOrder').getValue(), 'idpurchase', 'purchase', 'nojurnalPurchaseOrder', 'PO');
                                        // insertNoRef(4, Ext.getCmp('cbUnitEntryPurchaseOrder').getValue(), 'nojurnalPurchaseOrder','PO');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            name: 'po_date',
                            id: 'po_date_PurchaseOrder',
                            format: 'd/m/Y',
                            fieldLabel: 'PO Date',
                            maxValue: new Date(),
                        },
                        {
                            xtype: 'datefield',
                            hidden: true,
                            id: 'tglPelunasanPurchaseOrder',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        },
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 100,
                            valueField: 'idunit',
                            id: 'cbUnitEntryPurchaseOrder'
                                //                            ,multiSelect:true
                        },
                        {
                            xtype: 'comboxtaxtype',
                            labelWidth: 100,
                            name: 'rate',
                            valueField: 'rate',
                            id: 'cb_tax_id_po',
                            listeners: {
                                select: function(combo, record, index) {
                                    // alert(combo.getValue()); // Return Unitad States and no USA
                                    updateGridPurchaseOrder();
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Supplier',
                            id: 'supplierNamePurchaseOrder',
                            labelWidth: 120,
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        ChooserListSupplier.target = Ext.getCmp('EntryPurchaseOrder');
                                        ChooserListSupplier.show();
                                    });
                                }
                            },
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'supplierPurchaseOrder',
                        },
                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Customer',
                        //     name: 'namecustomer',
                        //     id: 'supplierPurchaseOrder',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {

                        //                     wGridSupplierListPopup.show();

                        //                     storeGridSupplierList.on('beforeload',function(store, operation,eOpts){
                        //                         operation.params={
                        //                                     'idunit': Ext.getCmp('idunitRequisition').getValue(),
                        //                                     'status': '1'
                        //                         };
                        //                     });
                        //                     storeGridSupplierList.load();
                        //             });
                        //         }
                        //     }
                        // },
                        {
                            xtype: 'comboxpayment',
                            hidden: true,
                            labelWidth: 120,
                            id: 'paymentPurchaseOrder',
                            valueField: 'idpayment',
                            listeners: {
                                select: {
                                    fn: function(combo, value) {
                                        if (combo.getValue() == 3) {
                                            //kredit
                                            Ext.getCmp('tglPelunasanPurchaseOrder').setDisabled(false);
                                            Ext.getCmp('pembayaranPurchaseOrder').setValue(0);
                                            //                                                Ext.getCmp('pembayaranPurchaseOrder').setReadOnly(true);
                                        } else if (combo.getValue() == 4) {
                                            //cod
                                            Ext.getCmp('tglPelunasanPurchaseOrder').setDisabled(true);
                                            Ext.getCmp('tglPelunasanPurchaseOrder').setValue(null);
                                            Ext.getCmp('pembayaranPurchaseOrder').setValue(0);
                                            Ext.getCmp('pembayaranPurchaseOrder').setReadOnly(false);
                                        } else if (combo.getValue() == 1) {
                                            //tunai
                                            Ext.getCmp('tglPelunasanPurchaseOrder').setDisabled(true);
                                            Ext.getCmp('tglPelunasanPurchaseOrder').setValue(null);
                                            Ext.getCmp('pembayaranPurchaseOrder').setValue(0);
                                            Ext.getCmp('pembayaranPurchaseOrder').setReadOnly(false);
                                        }
                                    }
                                }
                            }
                        },
                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Sales Person',
                        //     labelWidth: 120,
                        //     name: 'salesman_name',
                        //     id: 'salesman_name_so',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                     wSalesmanSOPopupPopup.show();

                        //                     storeGridpurchasemanSOPopup.on('beforeload',function(store, operation,eOpts){
                        //                         operation.params={
                        //                                     'extraparams': 'a.status:'+1
                        //                         };
                        //                     });
                        //                     storeGridpurchasemanSOPopup.load();

                        //             });
                        //         }
                        //     }
                        // },
                        {
                            xtype: 'hiddenfield',
                            name: 'salesman_id',
                            id: 'salesman_id_so',
                        },
                        {
                            xtype: 'comboxpurchasestatus',
                            labelWidth: 120,
                            id: 'cb_purchase_order_status'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->', {
                            itemId: 'recordPayment',
                            id: 'btnRecordPurchaseOrder',
                            text: 'Record Purchase Order',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordPurchaseOrder, this, 'noprint', true)
                        }, {
                            text: 'Print and Record Sales Order',
                            hidden: true,
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordPurchaseOrder, this, 'print', true)
                        },
                        // '->',
                        //  {
                        //     xtype: 'textfield',
                        //     hidden:true,
                        //     id: 'sisaBayarPurchaseOrder',
                        //     align: 'right',
                        //     readOnly: true,
                        //     labelWidth: 120,
                        //     fieldLabel: 'Saldo Terhutang ',
                        //     fieldStyle: 'text-align: right;'
                        // }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'hiddenfield',
                            id: 'idaccountPurchaseOrder',
                            name: 'idaccount',
                            readOnly: true
                        }
                        // , {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Akun Persediaan',
                        //     labelWidth: 120,
                        //     name: 'accname',
                        //     id: 'accnamePurchaseOrder',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                 if (Ext.getCmp('cbUnitEntryPurchaseOrder').getValue() == null)
                        //                 {
                        //                     Ext.Msg.alert('Akun Persediaan', 'Harap pilih unit terlebih dahulu');
                        //                 } else {
                        //                     windowPopupAccListPurchaseOrder.show();
                        //                     storeAccountAktive.load({
                        //                         params: {
                        //                             'idunit': Ext.getCmp('cbUnitEntryPurchaseOrder').getValue()
                        //                         }
                        //                     });
                        //                 }

                        //             });
                        //         }
                        //     }
                        // }
                        , {
                            xtype: 'displayfield',
                            name: 'accnumber',
                            id: 'accnumberPurchaseOrder',
                            readOnly: true
                        }, '->'
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            id: 'shipaddressPurchaseOrder',
                            hidden: true,
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        if (group_id == 99) {
                                            var extraparams = null;
                                        } else {
                                            var extraparams = 'a.idunit:' + Ext.getCmp('cbUnitEntryPurchaseOrder').getValue();
                                        }

                                        var FormChooseAddress = Ext.getCmp('FormChooseAddress');
                                        FormChooseAddress.getForm().load({
                                            url: SITE_URL + 'backend/loadFormData/unitcompany/1/setup',
                                            params: {
                                                extraparams: extraparams
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                console.log(d.alamat)
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert("Load failed", action.result.errorMessage);
                                            }
                                        });
                                        wAddPurchaseOrderPopup.show();

                                    });
                                }
                            }
                        }, ,
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPurchaseOrder',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }

                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'comboxshipping',
                            hidden: true,
                            labelWidth: 120,
                            id: 'shippingPurchaseOrder'
                        }, '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            name: 'totalPajak',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajakPurchaseOrder',
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
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 100,
                            value: 'Purchase Order',
                            id: 'memoPurchaseOrder',
                            fieldLabel: 'Memo'
                        },
                        {
                            xtype: 'comboxcurrency',
                            hidden: true,
                            id: 'comboxcurrencyPurchaseOrder',
                            labelWidth: 120
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalPurchaseOrder',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        //                        {
                        //                            itemId: 'useRecuringPurchaseOrder',
                        //                            text: 'Gunakan Sales Order Tersimpan',
                        //                            iconCls: 'add-icon',
                        //                            handler: function() {
                        //                                wGridRecurringPopup.show();
                        //                                storeGridRecurringPopup.load();
                        //                            }
                        //                        }, {
                        //                            itemId: 'recordandsavePurchaseOrder',
                        //                            text: 'Simpan Sebagai Sales Order Berulang',
                        //                            iconCls: 'add-icon',
                        //                            handler: this.saveRecurr
                        //                        },

                        // {
                        //     itemId: 'recordPurchaseOrder',
                        //     text: 'Rekam Sales Order',
                        //     iconCls: 'disk',
                        //     handler: this.recordPurchaseOrder
                        // }
                        , '->',
                        {
                            xtype: 'textfield',
                            id: 'pembayaranPurchaseOrder',
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
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntryPurchaseOrder();
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

        this.on('selectSupplier', this.selectSupplier, this);

        this.on({
            scope: this,
            edit: function() {
                updateGridPurchaseOrder('general');
            }
        });
    },
    selectSupplier(data) {
        Ext.getCmp('supplierPurchaseOrder').setValue(data.idsupplier);
        Ext.getCmp('supplierNamePurchaseOrder').setValue(data.namesupplier);
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPurchaseOrder: function(button, event, mode) {
        console.log(Ext.getCmp('idaccountPurchaseOrder').getValue())
        if (validasiPurchaseOrder()) {
            var json = Ext.encode(Ext.pluck(storeGridItemPurchaseOrder.data.items, 'data'));
            //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryPurchaseOrder').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/savePurchaseOrder',
                method: 'POST',
                params: {
                    statusform: Ext.getCmp('statusformPurchaseOrderGrid').getValue(),
                    idpurchase: Ext.getCmp('idpurchase_order').getValue(),
                    idpurchase_req: Ext.getCmp('idpurchase_req_PurchaseOrder').getValue(),
                    ratetax: Ext.getCmp('cb_tax_id_po').getValue(),
                    // supplierPurchaseOrder: Ext.getCmp('supplierPurchaseOrder').getValue(),
                    po_date: Ext.getCmp('po_date_PurchaseOrder').getValue(),
                    // shipaddressPurchaseOrder: Ext.getCmp('shipaddressPurchaseOrder').getValue(),
                    no_po: Ext.getCmp('nojurnalPurchaseOrder').getValue(),
                    memo: Ext.getCmp('memoPurchaseOrder').getValue(),
                    subtotal: Ext.getCmp('subtotalPurchaseOrder').getValue(),
                    total_amount: Ext.getCmp('totalPurchaseOrder').getValue(),
                    total_tax: Ext.getCmp('totalPajakPurchaseOrder').getValue(),
                    // shippingPurchaseOrder: Ext.getCmp('shippingPurchaseOrder').getValue(),
                    // angkutPurchaseOrder: Ext.getCmp('angkutPurchaseOrder').getValue(),
                    // pembayaranPurchaseOrder: Ext.getCmp('pembayaranPurchaseOrder').getValue(),
                    // sisaBayarPurchaseOrder: Ext.getCmp('sisaBayarPurchaseOrder').getValue(),
                    // paymentPurchaseOrder: Ext.getCmp('paymentPurchaseOrder').getValue(),
                    // tglPelunasanPurchaseOrder: Ext.getCmp('tglPelunasanPurchaseOrder').getValue(),
                    // idcurrency: Ext.getCmp('comboxcurrencyPurchaseOrder').getValue(),
                    // idaccountPurchaseOrder: Ext.getCmp('idaccountPurchaseOrder').getValue(),
                    // noinvoice: Ext.getCmp('noinvoicePurchaseOrder').getValue(),
                    unit: Ext.getCmp('cbUnitEntryPurchaseOrder').getValue(),
                    idsupplier: Ext.getCmp('supplierPurchaseOrder').getValue(),
                    idtax: Ext.getCmp('cb_tax_id_po').getValue(),
                    po_status: Ext.getCmp('cb_purchase_order_status').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        // Ext.getCmp('supplierPurchaseOrder').setValue(null);
                        // Ext.getCmp('delivery_date_PurchaseOrder').setValue(null);
                        // Ext.getCmp('shipaddressPurchaseOrder').setValue(null);
                        // Ext.getCmp('nojurnalPurchaseOrder').setValue(null);
                        // Ext.getCmp('memoPurchaseOrder').setValue(null);
                        // Ext.getCmp('subtotalPurchaseOrder').setValue(null);
                        // Ext.getCmp('totalPurchaseOrder').setValue(null);
                        // Ext.getCmp('totalPajakPurchaseOrder').setValue(null);
                        // Ext.getCmp('shippingPurchaseOrder').setValue(null);
                        // Ext.getCmp('cb_tax_id_po').setValue(null);
                        // // Ext.getCmp('pembayaranPurchaseOrder').setValue(null);
                        // // Ext.getCmp('sisaBayarPurchaseOrder').setValue(null);
                        // // Ext.getCmp('paymentPurchaseOrder').setValue(null);
                        // // Ext.getCmp('tglPelunasanPurchaseOrder').setValue(null);
                        // Ext.getCmp('comboxcurrencyPurchaseOrder').setValue(null);

                        // storeGridItemPurchaseOrder.removeAll();
                        // storeGridItemPurchaseOrder.sync();
                        updateGridPurchaseOrder('general');

                        // clearFormPO();

                        // if(mode=='print')
                        // {
                        //     cetak('FAKTUR Sales Order','PurchaseOrder',d.id);
                        // }

                        Ext.getCmp('windowPopupPurchaseOrderGrid').hide();
                        Ext.getCmp('PurchaseOrderGridID').getStore().load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


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
        wItemPurchaseOrderPopup.show();
        Ext.getCmp('GridItemPurchaseOrderPopupID').getStore().load();
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
        updateGridPurchaseOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridPurchaseOrder(tipe) {
    console.log('update run');
    var addprefix = 'PurchaseOrder';

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

    if (Ext.getCmp('nojurnalPurchaseOrder').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan No PO');

    } else if (Ext.getCmp('po_date_PurchaseOrder').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan tanggal PO');
    } else if (Ext.getCmp('cb_tax_id_po').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan jenis pajak');
    } else if (Ext.getCmp('supplierPurchaseOrder').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan supplier');
    } else if (Ext.getCmp('subtotalPurchaseOrder').getValue() == '' || Ext.getCmp('subtotalPurchaseOrder').getValue() == '0.00') {
        Ext.Msg.alert('Failed', 'Masukan minimal satu barang');
    } else {
        return true;
    }
}