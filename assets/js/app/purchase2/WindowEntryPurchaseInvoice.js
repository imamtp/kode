var wCoaPurchaseInvoicePersediaanPopup = Ext.create(dir_sys + 'purchase2.wCoaPurchaseInvoicePersediaanPopup');
var wCoaPurchaseInvoiceHutangPopup = Ext.create(dir_sys + 'purchase2.wCoaPurchaseInvoiceHutangPopup');
var wCoaPurchaseInvoicePajakMasukPopup = Ext.create(dir_sys + 'purchase2.wCoaPurchaseInvoicePajakMasukPopup');

Ext.define('GridItemPurchaseInvoiceModel', {
    extend: 'Ext.data.Model',
    fields: ['idpurchaseitem', 'idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'sku_no', 'size', 'warehouse_code', 'size_measurement'],
    idProperty: 'id'
});

var storeGridItemPurchaseInvoice = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemPurchaseInvoiceModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/PurchaseOrder/purchase',
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

Ext.define(dir_sys + 'purchase2.EntryPurchaseInvoice', {
    extend: 'Ext.grid.Panel',
    id: 'EntryPurchaseInvoice',
    alias: 'widget.EntryPurchaseInvoice',
    xtype: 'cell-editing',
    // title: 'Input Purchase Order',
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
            store: storeGridItemPurchaseInvoice,
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
                    text: 'Detil Barang',
                    width: 65,
                    // menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: 'Detil Terima Barang',
                    align: 'center',
                    icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
                        console.log(selectedRecord)
                        if (!Ext.isDefined(Ext.getCmp('WindowBatchItemList'))) {
                            Ext.create(dir_sys + 'purchase2.WindowBatchItemList');
                        }
                        Ext.getCmp('WindowBatchItemList').show();

                        var idpurchase = Ext.getCmp('idpurchase_poreceipt').getValue();
                        var idunit = Ext.getCmp('cbUnit_poreceipt').getValue();

                        Ext.getCmp('idpurchase_batchitemporeceipt').setValue(idpurchase);
                        Ext.getCmp('idpurchaseitem_batchitemporeceipt').setValue(selectedRecord.data.idpurchaseitem);
                        Ext.getCmp('idinventory_batchitemporeceipt').setValue(selectedRecord.data.idinventory);
                        Ext.getCmp('idunit_batchitemporeceipt').setValue(idunit);
                        Ext.getCmp('qty_batchitemporeceipt').setValue(selectedRecord.data.qty);
                        Ext.getCmp('short_desc_batchitemporeceipt').setValue(selectedRecord.data.short_desc);
                        Ext.getCmp('warehouse_code_batchitemporeceipt').setValue(selectedRecord.data.warehouse_code);
                        Ext.getCmp('nameinventory_batchitemporeceipt').setValue(selectedRecord.data.nameinventory);

                        var idpurchasestatus = Ext.getCmp('cb_status_poreceipt').getValue() * 1;

                        //cek udah bikin batch apa belum, kalo udah, tampilkan

                        // gridinsertReceiveBatchPOStore.removeAll();
                        // gridinsertReceiveBatchPOStore.sync();
                        var btnSimpanGRBatchWindow = Ext.getCmp('btnSimpanGRBatchWindow'); //tombol simpan di window penerimaan batch GR
                        if (idpurchasestatus != 4) {
                            //bukan received masih bisa update
                            btnSimpanGRBatchWindow.enable();
                        } else {
                            btnSimpanGRBatchWindow.disable();
                        }

                        if (Ext.getCmp('statusform_poreceipt').getValue() === 'input') {
                            var is_temp = 1;
                            Ext.getCmp('numbatch_itempo').setReadOnly(false);
                            Ext.getCmp('buatbatchbtn_itempo').show();
                        } else {
                            if (idpurchasestatus === 1) {
                                //kalo statusnya masih open. aktifkan tombol buat batch
                                var is_temp = 1;
                                Ext.getCmp('numbatch_itempo').setReadOnly(false);
                                Ext.getCmp('buatbatchbtn_itempo').show();
                            } else {
                                var is_temp = 0;
                                Ext.getCmp('numbatch_itempo').setReadOnly(true);
                                Ext.getCmp('buatbatchbtn_itempo').hide();

                                btnSimpanGRBatchWindow.disable(); //disable karna bukan open
                            }

                        }

                        Ext.getCmp('GridBatchGoodsReceipt').getStore().load({
                            params: {
                                idpurchase: idpurchase,
                                idpurchaseitem: selectedRecord.data.idpurchaseitem,
                                idinventory: selectedRecord.data.idinventory,
                                idunit: idunit,
                                is_tmp: is_temp
                            }
                        });

                        Ext.Ajax.request({
                            url: SITE_URL + 'purchase/check_batch_item',
                            method: 'GET',
                            params: {
                                idpurchase: idpurchase,
                                idpurchaseitem: selectedRecord.data.idpurchaseitem,
                                idinventory: selectedRecord.data.idinventory,
                                idunit: idunit,
                                is_temp: is_temp
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                // console.log(d);
                                Ext.getCmp('numbatch_itempo').setValue(d.numbatch);
                                Ext.getCmp('qtytotal_batchitemporeceipt').setValue(d.totalqtyterima);

                                if (d.numbatch === 0) {
                                    //kalo masih kosong enable tombol create batch. (edit form)
                                    Ext.getCmp('numbatch_itempo').setReadOnly(false);
                                    Ext.getCmp('buatbatchbtn_itempo').show();
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                        // setValueAcc(selectedRecord,'wCoaPurchaseInvoiceBeliPopup','_coa_beli_pi');
                    }
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
                    hidden: true,
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
                    hidden: true,
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
                },
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'hiddenfield',
                            id: 'idpurchase_poinvoice',
                            name: 'idpurchase'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'idunit_pi',
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
                            id: 'nojurnal_poinvoice',
                            fieldLabel: 'NO Invoice #',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoID(4, Ext.getCmp('cbUnit_poinvoice').getValue(), 'idpurchase', 'purchase', 'nojurnal_poinvoice', 'INVPO');
                                        // insertNoRef(4, Ext.getCmp('cbUnit_poinvoice').getValue(), 'nojurnal_poinvoice', 'INVPO');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'po_date_poinvoice',
                            format: 'd/m/Y',
                            fieldLabel: 'Order Date'
                        },
                        {
                            xtype: 'comboxunit',
                            readOnly: true,
                            valueField: 'idunit',
                            labelWidth: 120,
                            valueField: 'idunit',
                            id: 'cbUnit_poinvoice'
                                //                            ,multiSelect:true
                        },
                        {
                            xtype: 'comboxtaxtype',
                            labelWidth: 100,
                            readOnly: true,
                            valueField: 'rate',
                            id: 'cb_tax_id_poinvoice',
                            listeners: {
                                select: function(combo, record, index) {
                                    // alert(combo.getValue()); // Return Unitad States and no USA
                                    // updateGridPurchaseOrder();
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
                            labelWidth: 120,
                            id: 'nopo_poinvoice',
                            fieldLabel: 'NO PO'
                        },
                        {
                            xtype: 'comboxidsupplier',
                            readOnly: true,
                            id: 'supplier_poinvoice',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            // cls:'my-mandatory-field',
                            readOnly: true,
                            width: 620,
                            labelWidth: 120,
                            id: 'memo_poinvoice',
                            fieldLabel: 'Memo'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            name: 'nofpsup',
                            id: 'nofpsup_poinvoice',
                            labelWidth: 120,
                            fieldLabel: 'No FP (Supp)'
                        }, {
                            xtype: 'comboxpaymentterm',
                            id: 'comboxpaymentterm_pi',
                            // cls:'my-mandatory-field',
                            name: 'idpayment',
                            margin: {
                                right: 10
                            },
                            labelWidth: 120,
                            valueField: 'value',
                            listeners: {
                                select: function() {
                                    Ext.getCmp('ddaysPurchaseInvoice').setDisabled(true);
                                    Ext.getCmp('eomddaysPurchaseInvoice').setDisabled(true);
                                    Ext.getCmp('percentagediscPurchaseInvoice').setDisabled(true);
                                    Ext.getCmp('daysdiscPurchaseInvoice').setDisabled(true);

                                    Ext.getCmp('ddaysPurchaseInvoice').setVisible(false);
                                    Ext.getCmp('eomddaysPurchaseInvoice').setVisible(false);
                                    Ext.getCmp('percentagediscPurchaseInvoice').setVisible(false);
                                    Ext.getCmp('daysdiscPurchaseInvoice').setVisible(false);

                                    paymentTermSO(this.getValue());

                                    switch (this.getValue()) {
                                        case '3':
                                            Ext.getCmp('ddaysPurchaseInvoice').setDisabled(false);
                                            Ext.getCmp('ddaysPurchaseInvoice').setVisible(true);
                                            break;
                                        case '4':
                                            Ext.getCmp('eomddaysPurchaseInvoice').setDisabled(false);
                                            Ext.getCmp('eomddaysPurchaseInvoice').setVisible(true);
                                            break;
                                        case '5':
                                            Ext.getCmp('percentagediscPurchaseInvoice').setDisabled(false);
                                            Ext.getCmp('daysdiscPurchaseInvoice').setDisabled(false);
                                            Ext.getCmp('percentagediscPurchaseInvoice').setVisible(true);
                                            Ext.getCmp('daysdiscPurchaseInvoice').setVisible(true);

                                            break;
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'ddaysPurchaseInvoice',
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
                            id: 'eomddaysPurchaseInvoice',
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
                            id: 'percentagediscPurchaseInvoice',
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
                            id: 'daysdiscPurchaseInvoice',
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
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            id: 'btnRecordPurchaseOrderInvoice',
                            text: 'Record Purchase Invoice',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordPurchaseInvoice, this, 'noprint', true)
                        }, {
                            text: 'Print and Record Purchase Order',
                            hidden: true,
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordPurchaseInvoice, this, 'print', true)
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            // cls:'my-mandatory-field',\
                            hidden: true,
                            name: 'pembayaran_pi',
                            id: 'pembayaran_poinvoice',
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
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'comboxshipping',
                            hidden: true,
                            // readOnly:true,
                            fieldLabel: 'Metode Pengiriman',
                            labelWidth: 120,
                            name: 'idshipping',
                            id: 'shipping_poinvoice'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            // readOnly:true,
                            id: 'angkut_poinvoice',
                            align: 'right',
                            //                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                // 'render': function(c) {
                                //     c.getEl().on('keyup', function() {
                                //         // updateGridPurchaseInvoice('general');
                                //     }, c);
                                // }
                                'blur': function() {
                                    this.setRawValue(renderNomor2(this.getValue()));
                                    updateSelisih();
                                }
                            }
                        }


                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'textfield',
                            hidden: true,
                            // readOnly:true,
                            name: 'ship_address',
                            id: 'shipaddress_poinvoice',
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        if (group_id == 99) {
                                            var extraparams = null;
                                        } else {
                                            var extraparams = 'a.idunit:' + Ext.getCmp('cbUnit_poinvoice').getValue();
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
                                        wAddPurchaseInvoicePopup.show();

                                    });
                                }
                            }
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Pajak Masukan',
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
                                name: 'accnametujuan',
                                id: 'accname_coa_pajakmasuk_pi',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnit_poinvoice').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wCoaPurchaseInvoicePajakMasukPopup.show();
                                                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                                    operation.params = {
                                                        'idunit': idunit,
                                                        'idaccounttype': '17,18'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_coa_pajakmasuk_pi',
                            }, {
                                xtype: 'hiddenfield',
                                name: 'idaccount',
                                id: 'idaccount_coa_pajakmasuk_pi',
                            }]
                        }, '->',
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'total_poinvoice',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Hutang Pembelian',
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
                                name: 'accnametujuan',
                                id: 'accname_coa_hutang_pi',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnit_poinvoice').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wCoaPurchaseInvoiceHutangPopup.show();
                                                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                                    operation.params = {
                                                        'idunit': Ext.getCmp('cbUnit_poinvoice').getValue(),
                                                        'idaccounttype': '17,18'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_coa_hutang_pi',
                            }, {
                                xtype: 'hiddenfield',
                                name: 'idaccount',
                                id: 'idaccount_coa_hutang_pi',
                            }]
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajak_poinvoice',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Persediaan',
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
                                name: 'accnametujuan',
                                id: 'accname_coa_persediaan_pi',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnit_poinvoice').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wCoaPurchaseInvoicePersediaanPopup.show();
                                                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                                    operation.params = {
                                                        'idunit': idunit,
                                                        'idaccounttype': '3,4,5,20'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_coa_persediaan_pi',
                            }, {
                                xtype: 'hiddenfield',
                                name: 'idaccount',
                                id: 'idaccount_coa_persediaan_pi',
                            }]
                        },
                        {
                            xtype: 'comboxcurrency',
                            hidden: true,
                            readOnly: true,
                            id: 'comboxcurrency_poinvoice',
                            labelWidth: 120
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotal_poinvoice',
                            fieldLabel: 'Subtotal',
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
                            name: 'notes_pi',
                            id: 'notes_pi',
                            width: 500,
                            fieldLabel: 'Catatan'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            id: 'sisaBayar_poinvoice',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Saldo Terhutang ',
                            fieldStyle: 'text-align: right;'
                        }

                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {},
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntryPurchaseInvoice();
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
                updateGridPurchaseInvoice('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPurchaseInvoice: function(button, event, mode) {

        if (validasiPurchaseInvoice()) {
            var aftertax = str_replace('.', '', Ext.getCmp('total_poinvoice').getValue()) * 1;
            var biayaangkut = str_replace('.', '', Ext.getCmp('angkut_poinvoice').getValue()) * 1;

            Ext.Ajax.request({
                url: SITE_URL + 'purchase/save_purchase_invoice',
                method: 'POST',
                params: {
                    idpurchase: Ext.getCmp('idpurchase_poinvoice').getValue(),
                    idaccount_coa_hutang: Ext.getCmp('idaccount_coa_hutang_pi').getValue(),
                    idaccount_coa_persediaan: Ext.getCmp('idaccount_coa_persediaan_pi').getValue(),
                    idaccount_coa_pajakmasuk: Ext.getCmp('idaccount_coa_pajakmasuk_pi').getValue(),
                    nopo: Ext.getCmp('nopo_poinvoice').getValue(),
                    noinvoice: Ext.getCmp('nojurnal_poinvoice').getValue(),
                    idpayment: Ext.getCmp('comboxpaymentterm_pi').getValue(),
                    ddays: Ext.getCmp('ddaysPurchaseInvoice').getValue(),
                    eomddays: Ext.getCmp('eomddaysPurchaseInvoice').getValue(),
                    percentagedisc: Ext.getCmp('percentagediscPurchaseInvoice').getValue(),
                    daydisc: Ext.getCmp('daysdiscPurchaseInvoice').getValue(),
                    notes_pi: Ext.getCmp('notes_pi').getValue(),
                    total_pajak: Ext.getCmp('totalPajak_poinvoice').getValue(),
                    pembayaran: Ext.getCmp('pembayaran_poinvoice').getValue(),
                    sisa_bayar: Ext.getCmp('sisaBayar_poinvoice').getValue(),
                    total_amount: aftertax + biayaangkut,
                    idunit: Ext.getCmp('cbUnit_poinvoice').getValue(),
                    biayaangkut: biayaangkut,
                    nofpsup: Ext.getCmp('nofpsup_poinvoice').getValue(),
                    // datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('WindowEntryPurchaseInvoice').hide();
                    }

                    setHeaderInvoice();

                    Ext.getCmp('GoodsReceiptGridID').getStore().load();

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


        // }


    },
    saveRecurr: function() {
        if (validasiPurchaseInvoice()) {
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
        //        console.log(Ext.getCmp('customerPurchaseInvoice').getValue())
        //        Ext.getCmp('idaccount').setValue('sad');
        //        // Create a model instance
        //        Ext.getCmp('formAddRowJurnal').getForm().reset();
        wItemPurchasePopupOrderPopup.show();
        storeGridItemPurchasePopupOrder.load();

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
        updateGridPurchaseInvoice('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


Ext.define(dir_sys + 'purchase2.WindowEntryPurchaseInvoice', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryPurchaseInvoice',
    id: 'WindowEntryPurchaseInvoice',
    title: 'Purchase Invoice',
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
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'EntryPurchaseInvoice'
    }]
});

function updateGridPurchaseInvoice(tipe) {
    console.log('update run');
    if (tipe == 'general') {
        //jurnal umu store storeJ        
        //        var storeJ = storeJ;    
        var addprefix = '';
    } else if (tipe == 'recurring') {
        //        storeJ = storeJrec;
        var addprefix = 'RecPurchaseInvoice';
    }

    // var subtotalPurchaseInvoice = 0 * 1;
    // var totalPurchaseInvoice = 0 * 1;
    // var totalPajak = 0 * 1;
    // var angkutPurchaseInvoice = Ext.getCmp('angkutPurchaseInvoice').getValue();
    // var pembayaranPurchaseInvoice = Ext.getCmp('pembayaranPurchaseInvoice').getValue();
    // var sisaBayarPurchaseInvoice = 0 * 1;

    // Ext.each(storeGridItemPurchaseInvoice.data.items, function(obj, i) {
    //     var total = obj.data.qty * obj.data.price;
    //     var diskon = (total / 100) * obj.data.disc;

    //     var net = total - diskon;
    //     subtotalPurchaseInvoice += net;
    //     totalPajak += (net / 100) * obj.data.ratetax * 1;
    //     obj.set('total', net);
    // });

    // //     console.log(subtotalPurchaseInvoice);
    // totalPurchaseInvoice = subtotalPurchaseInvoice + angkutPurchaseInvoice * 1;
    // //     console.log(totalPurchaseInvoice+' '+totalPajak);
    // totalPurchaseInvoice = totalPurchaseInvoice + totalPajak;
    // //     console.log(totalPurchaseInvoice);
    // sisaBayarPurchaseInvoice = totalPurchaseInvoice - pembayaranPurchaseInvoice;

    // Ext.getCmp('subtotalPurchaseInvoice' + addprefix).setValue(subtotalPurchaseInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('totalPurchaseInvoice' + addprefix).setValue(totalPurchaseInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('angkutPurchaseInvoice').setValue(angkutPurchaseInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('pembayaranPurchaseInvoice').setValue(pembayaranPurchaseInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));
    // Ext.getCmp('sisaBayarPurchaseInvoice').setValue(sisaBayarPurchaseInvoice.toLocaleString('null', {
    //     minimumFractionDigits: 2
    // }));

}

function updateSelisih() {
    var totalPayment = str_replace(',', '', Ext.getCmp('total_poinvoice').getValue()) * 1 + str_replace(',', '', Ext.getCmp('angkut_poinvoice').getValue()) * 1;
    // console.log('totalPayment:'+totalPayment);

    var sisa = totalPayment - str_replace('.', '', Ext.getCmp('pembayaran_poinvoice').getValue()) * 1;
    console.log(sisa);
    // Ext.getCmp('sisaBayar_poinvoice').setValue(sisa.toLocaleString('null', {
    //     minimumFractionDigits: 0
    // }));

    Ext.getCmp('sisaBayar_poinvoice').setValue(renderNomor(sisa));
}

function validasiPurchaseInvoice() {
    //    alert(Ext.getCmp('comboxcurrencyPurchaseInvoice').getValue());   
    // var pembayaran = str_replace('.','',Ext.getCmp('pembayaran_poinvoice').getValue());
    var sisa = str_replace('.', '', Ext.getCmp('sisaBayar_poinvoice').getValue()) * 1;

    if (Ext.getCmp('comboxpaymentterm_pi').getValue() == null) {
        Ext.Msg.alert('Failed', 'Metode Pembayaran belum dipilih');
    } else if (Ext.getCmp('nojurnal_poinvoice').getValue() === '') {
        Ext.Msg.alert('Failed', 'No Invoice belum diisi');
    } else if (Ext.getCmp('idaccount_coa_persediaan_pi').getValue() === '') {
        Ext.Msg.alert('Failed', 'Tentukan Akun Persediaan');
    } else if (Ext.getCmp('idaccount_coa_hutang_pi').getValue() === '') {
        Ext.Msg.alert('Failed', 'Tentukan Akun Hutang Pembelian');
    } else if (Ext.getCmp('idaccount_coa_pajakmasuk_pi').getValue() === '') {
        Ext.Msg.alert('Failed', 'Tentukan Akun Pajak Masukkan');
    } else if (sisa < 0) {
        Ext.Msg.alert('Failed', 'Kelebihan bayar');
    } else {
        return true;
    }


}