var wCoaDOPersediaanPopup = Ext.create(dir_sys + 'sales.wCoaDOPersediaanPopup');
var wCoaDOHpPenjualanPopup = Ext.create(dir_sys + 'sales.wCoaDOHpPenjualanPopup');


Ext.define('GridItemDeliveryOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem', 'idinventory', 'invno', 'nameinventory', 'cost', 'sellingprice', 'qtystock', 'idunit', 'assetaccount', 'brand_name', 'sku_no', 'price', 'qty', 'total', 'ratetax', 'disc', 'short_desc', 'warehouse_code', 'qty_kirim', 'qtysisakirim'],
    idProperty: 'id'
});

var storeGridItemDeliveryOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemDeliveryOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/GridItemDeliveryOrderModeleryOrder/sales',
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

Ext.define(dir_sys + 'sales.EntryDeliveryOrder', {
    extend: 'Ext.grid.Panel',
    id: 'EntryDeliveryOrder',
    alias: 'widget.EntryDeliveryOrder',
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
            // forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemDeliveryOrder,
            columns: [{
                    header: 'idsalesitem',
                    hidden: true,
                    dataIndex: 'idsalesitem',
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
                    header: 'Kode Barang',
                    dataIndex: 'invno',
                    //                    id: 'invno',
                    minWidth: 100
                },
                {
                    header: 'Nama Barang',
                    flex: 1,
                    dataIndex: 'nameinventory',
                    minWidth: 250,
                    //                    id: 'nameinventory'
                },

                {
                    xtype: 'numbercolumn',
                    header: 'Harga',
                    dataIndex: 'price',
                    hidden: true,
                    minWidth: 150,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    minWidth: 70,
                    dataIndex: 'qty',
                    decimalPrecision: 0,
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
                    header: 'Disc (%)',
                    minWidth: 70,
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
                    minWidth: 150,
                    align: 'right'
                },
                {
                    header: 'Warehouse',
                    minWidth: 150,
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
                    xtype: 'numbercolumn',
                    header: 'Sisa Kirim',
                    dataIndex: 'qtysisakirim',
                    minWidth: 70,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Kirim',
                    minWidth: 70,
                    decimalPrecision: 0,
                    dataIndex: 'qty_kirim',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        decimalPrecision: 0,
                        minValue: 0
                    },
                    renderer: function(value) {
                        return '<div style="background-color:yellow; font-color:black">&nbsp;' + value + '</div>';
                    }

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
                // {
                //     xtype: 'actioncolumn',
                //     width: 30,
                //     align: 'center',
                //     sortable: false,
                //     menuDisabled: true,
                //     items: [{
                //             icon: BASE_URL + 'assets/icons/fam/cross.gif',
                //             tooltip: 'Hapus',
                //             scope: this,
                //             handler: this.onRemoveClick
                //         }]
                // }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'hiddenfield',
                            id: 'id_sales_order_do',
                            name: 'idsales_order'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'delivery_order_id',
                            name: 'delivery_order_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'statusformSalesOrderGrid_do',
                            name: 'statusFormSalesOrder'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalDO_do',
                            fieldLabel: 'NO DO #',
                            readOnly: true,
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {
                                        insertNoID(4, Ext.getCmp('cbUnitEntryDeliveryOrder').getValue(), 'idsales', 'sales', 'nojurnalDO_do', 'DO');
                                        // insertNoRef(4, Ext.getCmp('cbUnitEntryDeliveryOrder').getValue(), 'nojurnalDO_do','DO');
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            id: 'nojurnalSalesOrder_do',
                            fieldLabel: 'NO SO #',
                            // listeners: {
                            //     render: function(component) {
                            //         component.getEl().on('click', function(event, el) {
                            //             insertNoRef(4, Ext.getCmp('cbUnitEntryDeliveryOrder').getValue(), 'nojurnalSalesOrder_do','DO');
                            //         });
                            //     }
                            // }
                        },
                        {
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'tanggalSalesOrder_do',
                            format: 'd/m/Y',
                            fieldLabel: 'Order Date'
                        },
                        {
                            xtype: 'datefield',
                            hidden: true,
                            id: 'tglPelunasanSalesOrder_do',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pelunasan'
                        },
                        {
                            xtype: 'comboxunit',
                            valueField: 'idunit',
                            labelWidth: 100,
                            valueField: 'idunit',
                            id: 'cbUnitEntryDeliveryOrder'
                                //                            ,multiSelect:true
                        },
                        {
                            xtype: 'comboxDeliveryOrderStatus',
                            hidden: true,
                            id: 'cb_sales_order_status_do'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        {
                            xtype: 'comboxCustomer',
                            id: 'customerSalesOrder_do',
                            labelWidth: 120
                        },
                        {
                            xtype: 'comboxpayment',
                            labelWidth: 120,
                            hidden: true,
                            id: 'paymentSalesOrder_do',
                            valueField: 'idpayment',
                            listeners: {
                                select: {
                                    fn: function(combo, value) {
                                        if (combo.getValue() == 3) {
                                            //kredit
                                            Ext.getCmp('tglPelunasanSalesOrder').setDisabled(false);
                                            Ext.getCmp('pembayaranSalesOrder').setValue(0);
                                            //                                                Ext.getCmp('pembayaranSalesOrder').setReadOnly(true);
                                        } else if (combo.getValue() == 4) {
                                            //cod
                                            Ext.getCmp('tglPelunasanSalesOrder').setDisabled(true);
                                            Ext.getCmp('tglPelunasanSalesOrder').setValue(null);
                                            Ext.getCmp('pembayaranSalesOrder').setValue(0);
                                            Ext.getCmp('pembayaranSalesOrder').setReadOnly(false);
                                        } else if (combo.getValue() == 1) {
                                            //tunai
                                            Ext.getCmp('tglPelunasanSalesOrder').setDisabled(true);
                                            Ext.getCmp('tglPelunasanSalesOrder').setValue(null);
                                            Ext.getCmp('pembayaranSalesOrder').setValue(0);
                                            Ext.getCmp('pembayaranSalesOrder').setReadOnly(false);
                                        }
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            width: 620,
                            labelWidth: 120,
                            value: 'Sales Order',
                            id: 'memoSalesOrder_do',
                            fieldLabel: 'Memo'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->', {
                            itemId: 'recordPayment',
                            text: 'Record Delivery Order',
                            iconCls: 'disk',
                            handler: Ext.bind(this.recordDeliveryOrder, this, 'noprint', true)
                        }, {
                            text: 'Print and Record Sales Order',
                            hidden: true,
                            iconCls: 'drive_disk-icon',
                            handler: Ext.bind(this.recordDeliveryOrder, this, 'print', true)
                        },

                        {
                            xtype: 'textfield',
                            id: 'sisaBayarSalesOrder_do',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            hidden: true,
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
                            labelWidth: 120,
                            name: 'notes',
                            id: 'notes_do',
                            width: 600,
                            fieldLabel: 'Catatan'
                        },
                        '->',
                        {
                            xtype: 'textfield',
                            hidden: true,
                            id: 'pembayaranSalesOrder_do',
                            align: 'right',
                            //                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridSalesOrder('general');
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
                            xtype: 'textfield',
                            name: 'ship_address',
                            id: 'shipaddressSalesOrder_do',
                            labelWidth: 120,
                            width: 600,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(event, el) {

                                        // if (group_id == 99)
                                        // {
                                        //     var extraparams = null;
                                        // } else {
                                        //     var extraparams = 'a.idunit:'+Ext.getCmp('cbUnitEntryDeliveryOrder').getValue();
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
                                        // wAddSalesOrderPopup.show();

                                    });
                                }
                            }
                        }, '->',
                        {
                            xtype: 'hiddenfield',
                            id: 'angkutSalesOrder_do',
                            align: 'right',
                            //                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Biaya Angkut',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        // updateGridSalesOrder('general');
                                        this.setRawValue(renderNomor(this.getValue()));
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
                            xtype: 'datefield',
                            labelWidth: 120,
                            id: 'tanggalDeliveryOrder_do',
                            format: 'd/m/Y',
                            fieldLabel: 'Tgl Pengiriman'
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 180,
                            name: 'vehicle_number',
                            id: 'vehicle_number_do',
                            fieldLabel: 'No Mobil',
                        },
                        '->',
                        {
                            xtype: 'hiddenfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalSalesOrder_do',
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
                            fieldLabel: 'Metode Pengiriman',
                            labelWidth: 120,
                            name: 'idshipping',
                            id: 'shippingSalesOrder_do'
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 120,
                            name: 'driver_name',
                            id: 'driver_name_do',
                            fieldLabel: 'Nama Supir',
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Harga Pokok Penjualan',
                            combineErrors: true,
                            msgTarget: 'side',
                            layout: 'hbox',
                            labelWidth: 180,
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            items: [{
                                xtype: 'textfield',
                                allowBlank: false,
                                name: 'accnametujuan',
                                id: 'accname_coa_hppenjualan_do',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnitEntryDeliveryOrder').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wCoaDOHpPenjualanPopup.show();
                                                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                                    operation.params = {
                                                        'idunit': idunit,
                                                        'idaccounttype': '13'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_coa_hppenjualan_do',
                            }, {
                                xtype: 'hiddenfield',
                                name: 'idaccount',
                                id: 'idaccount_coa_hppenjualan_do',
                            }]
                        },
                        '->',
                        {
                            xtype: 'hiddenfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajakSalesOrder_do',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Prepared By',
                        //     labelWidth: 120,
                        //     name: 'preparedby_name',
                        //     id: 'preparedby_name_do',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                     wSalesmanSOPopupPopup.show();

                        //                     storeGridSalesmanSOPopup.on('beforeload',function(store, operation,eOpts){
                        //                         operation.params={
                        //                                     'extraparams': 'a.status:'+1
                        //                         };
                        //                     });
                        //                     storeGridSalesmanSOPopup.load();

                        //             });
                        //         }
                        //     }
                        // },
                        // {
                        //     xtype:'hiddenfield',
                        //     name: 'preparedby_id',
                        //     id: 'preparedby_id_do',
                        // },
                        // {
                        //     xtype: 'textfield',
                        //     fieldLabel: 'Approved By',
                        //     labelWidth: 120,
                        //     name: 'aprovedby_name',
                        //     id: 'aprovedby_name_do',
                        //     listeners: {
                        //         render: function(component) {
                        //             component.getEl().on('click', function(event, el) {
                        //                     wSalesmanSOPopupPopup.show();

                        //                     storeGridSalesmanSOPopup.on('beforeload',function(store, operation,eOpts){
                        //                         operation.params={
                        //                                     'extraparams': 'a.status:'+1
                        //                         };
                        //                     });
                        //                     storeGridSalesmanSOPopup.load();

                        //             });
                        //         }
                        //     }
                        // },
                        // {
                        //     xtype:'hiddenfield',
                        //     name: 'aprovedby_id',
                        //     id: 'aprovedby_id_do',
                        // },
                        {
                            xtype: 'comboxtaxtype',
                            // name:'idtax',
                            readOnly: true,
                            labelWidth: 120,
                            // valueField:'idtax',
                            id: 'cb_tax_id_do',
                            listeners: {
                                select: function(combo, record, index) {
                                    // alert(combo.getValue()); // Return Unitad States and no USA
                                    // updateGridSalesOrder();
                                }
                            }
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Persediaan',
                            combineErrors: true,
                            msgTarget: 'side',
                            layout: 'hbox',
                            labelWidth: 180,
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            items: [{
                                xtype: 'textfield',
                                allowBlank: false,
                                name: 'accnametujuan',
                                id: 'accname_coa_persediaan_do',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnitEntryDeliveryOrder').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                wCoaDOPersediaanPopup.show();
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
                                id: 'accnumber_coa_persediaan_do',
                            }, {
                                xtype: 'hiddenfield',
                                name: 'idaccount',
                                id: 'idaccount_coa_persediaan_do',
                            }]
                        },
                        {
                            xtype: 'comboxcurrency',
                            hidden: true,
                            id: 'comboxcurrencySalesOrder_do',
                            labelWidth: 120
                        },
                        '->',
                        {
                            xtype: 'hiddenfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotalSalesOrder_do',
                            fieldLabel: 'Subtotal',
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
                        // disableEntryDeliveryOrder();
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
                updateGridSalesOrder('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordDeliveryOrder: function(button, event, mode) {
        if (validasiQtyKirim()) {

            if (validasiStockKirim()) {

                if (validasiFormDO()) {
                    var json = Ext.encode(Ext.pluck(storeGridItemDeliveryOrder.data.items, 'data'));

                    Ext.Ajax.request({
                        url: SITE_URL + 'sales/saveDeliveryOrder',
                        method: 'POST',
                        params: {
                            no_do: Ext.getCmp('nojurnalDO_do').getValue(),
                            delivery_order_id: Ext.getCmp('delivery_order_id').getValue(),
                            statusform: Ext.getCmp('statusformSalesOrderGrid_do').getValue(),
                            idsales: Ext.getCmp('id_sales_order_do').getValue(),
                            // shipaddress: Ext.getCmp('shipaddressSalesOrder_do').getValue(),
                            idshipping: Ext.getCmp('shippingSalesOrder_do').getValue(),
                            driver_name: Ext.getCmp('driver_name_do').getValue(),
                            vehicle_number: Ext.getCmp('vehicle_number_do').getValue(),
                            ship_address: Ext.getCmp('shipaddressSalesOrder_do').getValue(),
                            memo: Ext.getCmp('memoSalesOrder_do').getValue(),
                            notes: Ext.getCmp('notes_do').getValue(),
                            tanggal: Ext.getCmp('tanggalDeliveryOrder_do').getSubmitValue(),
                            unit: Ext.getCmp('cbUnitEntryDeliveryOrder').getValue(),
                            biaya_angkut: Ext.getCmp('angkutSalesOrder_do').getValue(),
                            subtotal: Ext.getCmp('subtotalSalesOrder_do').getValue(),
                            status: Ext.getCmp('cb_sales_order_status_do').getValue(),
                            ratetax: Ext.getCmp('cb_tax_id_do').getValue(),
                            idaccount_hppenjualan: Ext.getCmp('idaccount_coa_hppenjualan_do').getValue(),
                            idaccount_persediaan: Ext.getCmp('idaccount_coa_persediaan_do').getValue(),
                            datagrid: json
                        },
                        success: function(form, action) {

                            var d = Ext.decode(form.responseText);
                            if (!d.success) {
                                Ext.Msg.alert('Peringatan', d.message);
                            } else {
                                Ext.Msg.alert('Success', d.message);

                                // Ext.getCmp('customerSalesOrder').setValue(null);

                                // storeGridItemDeliveryOrder.removeAll();
                                // storeGridItemDeliveryOrder.sync();
                                // updateGridSalesOrder('general');

                                Ext.getCmp('WindowEntryDeliveryOrder').hide();
                                // Ext.getCmp('WindowSaleOrderList').hide();

                                Ext.getCmp('deliveryOrderGrid').getStore.load();
                            }

                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                }

            }

        }
        // console.log(Ext.getCmp('idaccountSalesOrder').getValue())
        // if (validasiSalesOrder())
        // {
        // var dp = Ext.getCmp('angkutSalesOrder').getValue();
        // if(dp!='')
        // {
        //     //cek link dp
        //     Ext.Ajax.request({
        //         url: SITE_URL + 'account/cekAccLink',
        //         method: 'POST',
        //         params: {
        //             idacclink: 17,
        //             idunit:Ext.getCmp('cbUnitEntryDeliveryOrder').getValue()
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

        // var json = Ext.encode(Ext.pluck(storeGridItemDeliveryOrder.data.items, 'data'));
        //            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntryDeliveryOrder').getValue());


        // }


    },
    saveRecurr: function() {
        if (validasiSalesOrder()) {
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
        //        console.log(Ext.getCmp('customerSalesOrder').getValue())
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
        updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


Ext.define(dir_sys + 'sales.WindowEntryDeliveryOrder', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryDeliveryOrder',
    id: 'WindowEntryDeliveryOrder',
    title: 'Entry Delivery Order',
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
        xtype: 'EntryDeliveryOrder'
    }]
});

function updateGridSalesOrder(tipe) {
    console.log('update run');
    if (tipe == 'general') {
        //jurnal umu store storeJ        
        //        var storeJ = storeJ;    
        var addprefix = '';
    } else if (tipe == 'recurring') {
        //        storeJ = storeJrec;
        var addprefix = 'RecSalesOrder';
    }

    var subtotalSalesOrder = 0 * 1;
    var totalSalesOrder = 0 * 1;
    var totalPajak = 0 * 1;
    var angkutSalesOrder = Ext.getCmp('angkutSalesOrder_do').getValue();
    // var pembayaranSalesOrder = Ext.getCmp('pembayaranSalesOrder').getValue();
    var pembayaranSalesOrder = 0;
    var sisaBayarSalesOrder = 0 * 1;

    Ext.each(storeGridItemDeliveryOrder.data.items, function(obj, i) {
        var total = obj.data.qty * obj.data.price;
        var diskon = (total / 100) * obj.data.disc;

        var net = total - diskon;
        subtotalSalesOrder += net;
        totalPajak += (net / 100) * obj.data.ratetax * 1;
        obj.set('total', net);
    });

    //     console.log(subtotalSalesOrder);
    totalSalesOrder = subtotalSalesOrder + angkutSalesOrder * 1;
    //     console.log(totalSalesOrder+' '+totalPajak);
    totalSalesOrder = totalSalesOrder + totalPajak;
    //     console.log(totalSalesOrder);
    sisaBayarSalesOrder = totalSalesOrder - pembayaranSalesOrder;

    // Ext.getCmp('subtotalSalesOrder' + addprefix).setValue(subtotalSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('totalSalesOrder' + addprefix).setValue(totalSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('angkutSalesOrder').setValue(angkutSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaranSalesOrder').setValue(pembayaranSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarSalesOrder').setValue(sisaBayarSalesOrder.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiQtyKirim() {
    var qsent = true;
    Ext.each(storeGridItemDeliveryOrder.data.items, function(obj, i) {
        console.log('obj.data.qtysisakirim:' + obj.data.qtysisakirim);

        if (obj.data.qtysisakirim * 1 !== 0) {
            if (obj.data.qty_kirim > obj.data.qtysisakirim) {
                Ext.Msg.alert('Failed', 'kuantitas kirim untuk produk <b>' + obj.data.nameinventory + '</b> melebihi kuantitas sisa kirim');
                qsent = false;
            }
        } else if (obj.data.qty_kirim > obj.data.qty) {
            Ext.Msg.alert('Failed', 'kuantitas kirim untuk produk <b>' + obj.data.nameinventory + '</b> melebihi kuantitas order');
            qsent = false;
        }
    });

    return qsent;
}

function validasiStockKirim() {
    var qsent = true;
    var idunit = Ext.getCmp('cbUnitEntryDeliveryOrder').getValue();

    Ext.each(storeGridItemDeliveryOrder.data.items, function(obj, i) {

        if (obj.data.warehouse_code == null) {
            Ext.Msg.alert('Failed', 'Warehouse untuk kode produk <b>' + obj.data.invno + '</b> belum ditentukan');
            qsent = false;
        } else {
            Ext.Ajax.request({
                url: SITE_URL + 'sales/check_stock_kirim',
                async: false,
                method: 'GET',
                params: {
                    idunit: idunit,
                    idinventory: obj.data.idinventory,
                    invno: obj.data.invno,
                    nameinventory: obj.data.nameinventory,
                    idsalesitem: obj.data.idsalesitem,
                    qty_kirim: obj.data.qty_kirim,
                    warehouse_code: obj.data.warehouse_code
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                        Ext.Msg.alert('Peringatan', d.message);
                        qsent = false;
                    } else {
                        // Ext.getCmp('wEntryPayment').hide();
                        // PaymentGridStore.load();
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }

    });

    return qsent;
}

function validasiFormDO() {
    //    alert(Ext.getCmp('comboxcurrencySalesOrder').getValue());   

    if (Ext.getCmp('nojurnalDO_do').getValue() == null) {
        Ext.Msg.alert('Failed', 'Tentukan nomor DO');
    } else if (Ext.getCmp('idaccount_coa_persediaan_do').getValue() == null) {
        Ext.Msg.alert('Failed', 'Tentukan akun persediaan');
    } else if (Ext.getCmp('idaccount_coa_hppenjualan_do').getValue() == null) {
        Ext.Msg.alert('Failed', 'Tentukan akun harga pokok penjualan');
    } else if (Ext.getCmp('tanggalDeliveryOrder_do').getValue() == null) {
        Ext.Msg.alert('Failed', 'Masukkan tanggal pengiriman');
    } else if (Ext.getCmp('shipaddressSalesOrder_do').getValue() == null) {
        Ext.Msg.alert('Failed', 'Tentukan alamat pengiriman');
    } else {
        return true;
    }
}