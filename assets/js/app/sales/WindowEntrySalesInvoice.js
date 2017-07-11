Ext.define('GridItemSalesInvoiceModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem', 'idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'warehouse_code', 'size_measurement', 'size'],
    idProperty: 'id'
});

var storeGridItemSalesInvoice = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSalesInvoiceModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemSalesInvoice/sales',
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

Ext.define(dir_sys + 'sales.EntrySalesInvoice', {
    extend: 'Ext.grid.Panel',
    id: 'EntrySalesInvoice',
    alias: 'widget.EntrySalesInvoice',
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
            store: storeGridItemSalesInvoice,
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
                    header: 'Kode Barang',
                    dataIndex: 'invno',
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
                    // editor: {
                    //     xtype: 'comboxWarehouse',
                    //     hideLabel: true,
                    //     valueField: 'warehouse_code',
                    //     displayField: 'warehouse_code',
                    //     labelWidth: 100
                    // }
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
                    width: 70,
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
                    //     hideLabel: true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                {
                    xtype: 'numbercolumn',
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
                    width: 70,
                    dataIndex: 'disc',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 0
                    // }
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
                        valueField: 'rate',
                        labelWidth: 40
                    }
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'hiddenfield',
                            id: 'id_sales_order_si',
                            name: 'idsales_order'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idunit_si',
                            name: 'idunit'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalSalesInvoice_si',
                            fieldLabel: 'NO Invoice #',
                            readOnly: true,
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'noSalesSalesInvoice_si',
                            fieldLabel: 'NO SO #',
                            readOnly: true,
                        },
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            labelWidth: 100,
                            id: 'tanggalSalesInvoice_si',
                            format: 'd/m/Y',
                            fieldLabel: 'Order Date'
                        },
                        {
                            xtype: 'comboxunit',
                            readOnly: true,
                            valueField: 'idunit',
                            labelWidth: 100,
                            valueField: 'idunit',
                            id: 'cbUnitEntrySalesInvoice'
                                //                            ,multiSelect:true
                        },

                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'NO DO #',
                            id: 'noDeliverySalesInvoice_si'
                        },
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'NO Faktur',
                            id: 'noFakturSalesInvoice_si'
                        },
                        {
                            xtype: 'comboxCustomer',
                            readOnly: true,
                            id: 'customerSalesInvoice_si',
                            labelWidth: 100
                        },
                        {
                            xtype: 'comboxtaxtype',
                            labelWidth: 100,
                            readOnly: true,
                            valueField: 'rate',
                            id: 'cb_tax_id_inv',
                            listeners: {
                                select: function(combo, record, index) {
                                    // alert(combo.getValue()); // Return Unitad States and no USA
                                    // updateGridSalesOrder();
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
                        // cls:'my-mandatory-field',
                        // readOnly:true,
                        width: 620,
                        labelWidth: 120,
                        id: 'memoSalesInvoice_si',
                        fieldLabel: 'Memo'
                    }]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: []
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        '->',
                        {
                            xtype: 'textfield',
                            // cls:'my-mandatory-field',
                            name: 'pembayaran_si',
                            id: 'pembayaranSalesInvoice_si',
                            align: 'right',
                            //                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        this.setRawValue(renderNomor(this.getValue()));
                                        updateSelisih();
                                    }, c);
                                }
                            }
                        }
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            id: 'btnRecordSalesOrderInvoice',
                            text: 'Record Sales Invoice',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordSalesInvoice, this, 'noprint', true)
                        }, {
                            text: 'Print and Record Sales Order',
                            hidden: true,
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordSalesInvoice, this, 'print', true)
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            id: 'sisaBayarSalesInvoice_si',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Saldo Terhutang ',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            readOnly: true,
                            name: 'ship_address',
                            id: 'shipaddressSalesInvoice_si',
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        // if (group_id == 99) {
                                        //     var extraparams = null;
                                        // } else {
                                        //     var extraparams = 'a.idunit:' + Ext.getCmp('cbUnitEntrySalesInvoice').getValue();
                                        // }

                                        // var FormChooseAddress = Ext.getCmp('FormChooseAddress');
                                        // FormChooseAddress.getForm().load({
                                        //     url: SITE_URL + 'backend/loadFormData/unitcompany/1/setup',
                                        //     params: {
                                        //         extraparams: extraparams
                                        //     },
                                        //     success: function(form, action) {
                                        //         var d = Ext.decode(form.responseText);
                                        //         console.log(d.alamat)
                                        //     },
                                        //     failure: function(form, action) {
                                        //         Ext.Msg.alert("Load failed", action.result.errorMessage);
                                        //     }
                                        // });
                                        // wAddSalesInvoicePopup.show();

                                    });
                                }
                            }
                        }, '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajakSalesInvoice_si',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'datefield',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'tanggalDeliverySalesInvoice_si',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pengiriman'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            id: 'angkutSalesInvoice_si',
                            align: 'right',
                            //                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        // updateGridSalesInvoice('general');
                                    }, c);
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'comboxshipping',
                            readOnly: true,
                            fieldLabel: 'Metode Pengiriman',
                            labelWidth: 120,
                            name: 'idshipping',
                            id: 'shippingSalesInvoice_si'
                        },
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            labelWidth: 120,
                            name: 'driver_name',
                            id: 'driver_name_si',
                            fieldLabel: 'Nama Supier',
                        }, {
                            xtype: 'textfield',
                            labelWidth: 120,
                            name: 'vehicle_number',
                            readOnly: true,
                            id: 'vehicle_number_si',
                            fieldLabel: 'No Mobil',
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            align: 'right',
                            labelWidth: 120,
                            id: 'dppSalesInvoice_si',
                            fieldLabel: 'Dasar Pengenaan Pajak',
                        },
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'invoice_date_si',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Invoice'
                        },
                        {
                            xtype: 'comboxpaymentterm',
                            id: 'comboxpaymentterm_si',
                            // cls:'my-mandatory-field',
                            name: 'idpayment',
                            margin: {
                                right: 10
                            },
                            labelWidth: 120,
                            valueField: 'value',
                            listeners: {
                                select: function() {
                                    Ext.getCmp('ddaysSalesInvoice').setDisabled(true);
                                    Ext.getCmp('eomddaysSalesInvoice').setDisabled(true);
                                    Ext.getCmp('percentagediscSalesInvoice').setDisabled(true);
                                    Ext.getCmp('daysdiscSalesInvoice').setDisabled(true);

                                    Ext.getCmp('ddaysSalesInvoice').setVisible(false);
                                    Ext.getCmp('eomddaysSalesInvoice').setVisible(false);
                                    Ext.getCmp('percentagediscSalesInvoice').setVisible(false);
                                    Ext.getCmp('daysdiscSalesInvoice').setVisible(false);

                                    paymentTermSO(this.getValue());

                                    switch (this.getValue()) {
                                        case '3':
                                            Ext.getCmp('ddaysSalesInvoice').setDisabled(false);
                                            Ext.getCmp('ddaysSalesInvoice').setVisible(true);
                                            break;
                                        case '4':
                                            Ext.getCmp('eomddaysSalesInvoice').setDisabled(false);
                                            Ext.getCmp('eomddaysSalesInvoice').setVisible(true);
                                            break;
                                        case '5':
                                            Ext.getCmp('percentagediscSalesInvoice').setDisabled(false);
                                            Ext.getCmp('daysdiscSalesInvoice').setDisabled(false);
                                            Ext.getCmp('percentagediscSalesInvoice').setVisible(true);
                                            Ext.getCmp('daysdiscSalesInvoice').setVisible(true);

                                            break;
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'ddaysSalesInvoice',
                            name: 'ddays',
                            width: 120,
                            inputWidth: 60,
                            afterSubTpl: ' days',
                            maskRe: /[0-9]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (!Number.isNaN(parseInt(this.getValue())))
                                            this.setValue(parseInt(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'eomddaysSalesInvoice',
                            name: 'eomddays',
                            width: 180,
                            inputWidth: 60,
                            beforeSubTpl: 'EOM ',
                            afterSubTpl: ' days',
                            maskRe: /[0-9]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (!Number.isNaN(parseInt(this.getValue())))
                                            this.setValue(parseInt(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'percentagediscSalesInvoice',
                            name: 'percentagedisc',
                            width: 90,
                            inputWidth: 60,
                            afterSubTpl: ' % /',
                            maskRe: /[0-9.]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (this.getValue().substr(-1) == ".")
                                            return true;

                                        if (!Number.isNaN(parseFloat(this.getValue())))
                                            this.setValue(parseFloat(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'daysdiscSalesInvoice',
                            name: 'daydisc',
                            width: 120,
                            inputWidth: 60,
                            afterSubTpl: ' NET',
                            maskRe: /[0-9]/,
                            hidden: true,
                            disabled: true,
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        if (!Number.isNaN(parseInt(this.getValue())))
                                            this.setValue(parseInt(this.getValue()));
                                        else
                                            this.setValue(0);
                                    }, c)

                                }
                            }
                        },
                        {
                            xtype: 'comboxcurrency',
                            hidden: true,
                            readOnly: true,
                            id: 'comboxcurrencySalesInvoice_si',
                            labelWidth: 120
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'discountSalesInvoice_si',
                            fieldLabel: 'Diskon',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            labelWidth: 120,
                            // cls:'my-mandatory-field',
                            name: 'notes_si',
                            id: 'notes_si',
                            width: 500,
                            fieldLabel: 'Catatan'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalSalesInvoice_si',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        '->',
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalSalesInvoice_si',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntrySalesInvoice();
                        updateSelisih();
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
                updateGridSalesInvoice('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesInvoice: function(button, event, mode) {
        // console.log(Ext.getCmp('idaccountSalesInvoice').getValue())
        // if (validasiSalesInvoice())
        // {
        // var dp = Ext.getCmp('angkutSalesInvoice').getValue();
        // if(dp!='')
        // {
        //     //cek link dp
        //     Ext.Ajax.request({
        //         url: SITE_URL + 'account/cekAccLink',
        //         method: 'POST',
        //         params: {
        //             idacclink: 17,
        //             idunit:Ext.getCmp('cbUnitEntrySalesInvoice').getValue()
        //         },
        //         success: function(form, action) {

        //             var d = Ext.decode(form.responseText);
        //             if (!d.success)
        //             {
        //                 Ext.Msg.alert('Peringatan', d.message);
        //             } else {
        //                 // Ext.getCmp('wEntryPayment').hide();
        //                 // PaymentGridStore.load();
        //             }

        //         },
        //         failure: function(form, action) {
        //             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        //         }
        //     });
        // } 

        // var json = Ext.encode(Ext.pluck(storeGridItemSalesInvoice.data.items, 'data'));
        //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesInvoice').getValue());

        if (validasiSalesInvoice()) {
            var aftertax = str_replace('.', '', Ext.getCmp('totalSalesInvoice_si').getValue()) * 1;
            var biayaangkut = str_replace('.', '', Ext.getCmp('angkutSalesInvoice_si').getValue()) * 1;

            Ext.Ajax.request({
                url: SITE_URL + 'sales/save_sales_invoice',
                method: 'POST',
                params: {
                    idsales: Ext.getCmp('id_sales_order_si').getValue(),
                    noinvoice: Ext.getCmp('nojurnalSalesInvoice_si').getValue(),
                    idpayment: Ext.getCmp('comboxpaymentterm_si').getValue(),
                    memo: Ext.getCmp('memoSalesInvoice_si').getValue(),
                    ddays: Ext.getCmp('ddaysSalesInvoice').getValue(),
                    eomddays: Ext.getCmp('eomddaysSalesInvoice').getValue(),
                    percentagedisc: Ext.getCmp('percentagediscSalesInvoice').getValue(),
                    daydisc: Ext.getCmp('daysdiscSalesInvoice').getValue(),
                    notes_si: Ext.getCmp('notes_si').getValue(),
                    pembayaran: Ext.getCmp('pembayaranSalesInvoice_si').getValue(),
                    sisa_bayar: Ext.getCmp('sisaBayarSalesInvoice_si').getValue(),
                    total_amount: aftertax + biayaangkut,
                    idunit: Ext.getCmp('cbUnitEntrySalesInvoice').getValue(),
                    invoice_date: Ext.getCmp('invoice_date_si').getSubmitValue(),
                    biayaangkut: biayaangkut
                        // datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('WindowEntrySalesInvoice').hide();
                    }

                    setHeaderInvoice();

                    Ext.getCmp('deliveryOrderGrid').getStore().load();

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


        // }


    },
    saveRecurr: function() {
        if (validasiSalesInvoice()) {
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
        //        console.log(Ext.getCmp('customerSalesInvoice').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        wItemSalesPopupOrderPopup.show();
        storeGridItemSalesPopupOrder.load();

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
        updateGridSalesInvoice('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


Ext.define(dir_sys + 'sales.WindowEntrySalesInvoice', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntrySalesInvoice',
    id: 'WindowEntrySalesInvoice',
    title: 'Sales Invoicing',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW,
    height: sizeH + 50,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'EntrySalesInvoice'
    }]
});

function updateGridSalesInvoice(tipe) {
    console.log('update run');
    if (tipe == 'general') {
        //jurnal umu store storeJ        
        //        var storeJ = storeJ;    
        var addprefix = '';
    } else if (tipe == 'recurring') {
        //        storeJ = storeJrec;
        var addprefix = 'RecSalesInvoice';
    }

    // var subtotalSalesInvoice = 0 * 1;
    // var totalSalesInvoice = 0 * 1;
    // var totalPajak = 0 * 1;
    // var angkutSalesInvoice = Ext.getCmp('angkutSalesInvoice').getValue();
    // var pembayaranSalesInvoice = Ext.getCmp('pembayaranSalesInvoice').getValue();
    // var sisaBayarSalesInvoice = 0 * 1;

    // Ext.each(storeGridItemSalesInvoice.data.items, function(obj, i) {
    //     var total = obj.data.qty * obj.data.price;
    //     var diskon = (total / 100) * obj.data.disc;

    //     var net = total - diskon;
    //     subtotalSalesInvoice += net;
    //     totalPajak += (net / 100) * obj.data.ratetax * 1;
    //     obj.set('total', net);
    // });

    // //     console.log(subtotalSalesInvoice);
    // totalSalesInvoice = subtotalSalesInvoice + angkutSalesInvoice * 1;
    // //     console.log(totalSalesInvoice+' '+totalPajak);
    // totalSalesInvoice = totalSalesInvoice + totalPajak;
    // //     console.log(totalSalesInvoice);
    // sisaBayarSalesInvoice = totalSalesInvoice - pembayaranSalesInvoice;

    // Ext.getCmp('subtotalSalesInvoice' + addprefix).setValue(subtotalSalesInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('totalSalesInvoice' + addprefix).setValue(totalSalesInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('angkutSalesInvoice').setValue(angkutSalesInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('pembayaranSalesInvoice').setValue(pembayaranSalesInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('sisaBayarSalesInvoice').setValue(sisaBayarSalesInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));

}

function updateSelisih() {
    var totalPayment = str_replace('.', '', Ext.getCmp('totalSalesInvoice_si').getValue()) * 1 + str_replace('.', '', Ext.getCmp('angkutSalesInvoice_si').getValue()) * 1;
    // console.log('totalPayment:' + totalPayment);

    var sisa = totalPayment - str_replace('.', '', Ext.getCmp('pembayaranSalesInvoice_si').getValue()) * 1;
    // console.log(sisa);
    // Ext.getCmp('sisaBayarSalesInvoice_si').setValue(sisa.toLocaleString('null', {
    //     minimumFractionDigits: 0
    // }));

    Ext.getCmp('sisaBayarSalesInvoice_si').setValue(renderNomor(sisa));
}

function validasiSalesInvoice() {
    //    alert(Ext.getCmp('comboxcurrencySalesInvoice').getValue());   
    // var pembayaran = str_replace('.','',Ext.getCmp('pembayaranSalesInvoice_si').getValue());
    var sisa = str_replace('.', '', Ext.getCmp('sisaBayarSalesInvoice_si').getValue()) * 1;

    if (Ext.getCmp('comboxpaymentterm_si').getValue() == null) {
        Ext.Msg.alert('Failed', 'Metode Pembayaran belum dipilih');
    } else if (sisa < 0) {
        Ext.Msg.alert('Failed', 'Kelebihan bayar');
    }
    // else if (Ext.getCmp('paymentSalesInvoice').getValue() == 1 && Ext.getCmp('idaccountSalesInvoice').getValue() == '')
    // {
    //     //kalo tunai harus menggunakan akun persediaan / barang datang
    //     Ext.Msg.alert('Failed', 'Tentukan akun persediaan/barang dagang');
    // } 
    else {
        return true;
    }
}