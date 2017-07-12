function clearFormSQ() {

}

function loadReturnSOData(record) {
    console.log(record);

    if (!Ext.isDefined(Ext.getCmp('WindowEntrySalesReturn'))) {
        Ext.create(dir_sys + 'sales.WindowEntrySalesReturn');
    }
    Ext.getCmp('WindowEntrySalesReturn').show();

    Ext.getCmp('status_sr').setReadOnly(false);
    Ext.getCmp('status_sr').setValue(record.data.status * 1);

    if (record.data.status * 1 == 1) {
        Ext.getCmp('btnRecordSalesReturn').enable();
    } else {
        Ext.getCmp('btnRecordSalesReturn').disable();
    }

    Ext.getCmp('nojurnalSalesReturn_sr').setValue(record.data.noreturn);
    Ext.getCmp('tanggalSalesReturn_sr').setValue(record.data.return_date);
    Ext.getCmp('cbUnitEntrySalesReturn').setValue(record.data.idunit);
    Ext.getCmp('nominal_sales_return').setValue(record.data.return_amount);

    Ext.getCmp('customerSalesReturn_sr').getStore().load();
    Ext.getCmp('customerSalesReturn_sr').setValue(record.data.idcustomer);

    Ext.getCmp('memoSalesReturn_sr').setValue(record.data.memo);
    Ext.getCmp('sales_return_id_sr').setValue(record.data.sales_return_id);

    Ext.getCmp('accnumber_coa_sales_return').setValue(record.data.accnumber);
    Ext.getCmp('idaccount_coa_sales_return').setValue(record.data.idaccount_return);
    Ext.getCmp('accname_coa_sales_return').setValue(record.data.accname);

    Ext.getCmp('accnumber_sales_return').setValue(record.data.accnumberbank);
    Ext.getCmp('idaccount_sales_return').setValue(record.data.idaccount_bank);
    Ext.getCmp('accname_sales_return').setValue(record.data.accnamebank);

    // Ext.getCmp('statusformSalesReturnGrid_sr').setValue(record.data.noreturn);
    Ext.getCmp('subtotalSalesReturn_sr').setValue(record.data.subtotal);
    Ext.getCmp('totalDiskonSalesReturn_sr').setValue(record.data.totaldisc);
    Ext.getCmp('totalPajakSalesReturn_sr').setValue(record.data.totaltax);
    Ext.getCmp('totalSalesReturn_sr').setValue(record.data.aftertax);

    var EntrySalesReturnStore = Ext.getCmp('EntrySalesReturn').getStore();
    EntrySalesReturnStore.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'extraparams': 'a.sales_return_id:' + record.data.sales_return_id
        };
    });
    EntrySalesReturnStore.load();

    Ext.getCmp('WindowEntrySalesReturn').setTitle('Edit Sales Return');
    Ext.getCmp('statusformSalesReturnGrid_sr').setValue('edit');
}

function showSalesOrderData(record) {
    console.log(record);

    wSalesOrderGrid.show();

    storeCustomer.load();
    storeUnit.load();
    productMeasurementStore.load();
    StorePayment.load();
    comboxWarehouseStore.load();
    taxStore.load();

    clearFormSO();

    var cbUnitEntrySalesOrder = Ext.getCmp('cbUnitEntrySalesOrder');
    cbUnitEntrySalesOrder.setValue(record.data.idunit);
    cbUnitEntrySalesOrder.setReadOnly(true);

    Ext.getCmp('statusformSalesOrderGrid').setValue('edit');
    Ext.getCmp('idsales_order').setValue(record.data.idsales);

    Ext.getCmp('memoSalesOrder').setValue(record.data.comments);
    Ext.getCmp('cb_tax_id_so').setValue(record.data.rate);

    var checktax = record.data.include_tax * 1 == 1 ? true : false;
    Ext.getCmp('include_tax_so').setValue(checktax);

    var cb_sales_order_status = Ext.getCmp('cb_sales_order_status');
    // cb_sales_order_status.getStore().load();
    cb_sales_order_status.setValue(record.data.status * 1);
    cb_sales_order_status.setReadOnly(true);

    if (record.data.status * 1 == 1) {
        //status open masih bisa dieedit
        Ext.getCmp('btnRecordSalesOrder').enable();
    } else {
        Ext.getCmp('btnRecordSalesOrder').disable();
    }

    if (record.data.idsales_quote === null) {
        Ext.getCmp('is_from_sq_soform').setValue({ is_from_sq: 2 });
    } else {
        Ext.getCmp('is_from_sq_soform').setValue({ is_from_sq: 1 });

        Ext.getCmp('no_sales_quote').setValue(record.data.no_sales_order_quote);
        Ext.getCmp('sales_quotation_date').setValue(record.data.date_sales_quote);
        Ext.getCmp('id_sales_quote_SalesOrder').setValue(record.data.idsales_quote);
    }

    Ext.getCmp('nojurnalSalesOrder').setValue(record.data.no_sales_order);
    Ext.getCmp('delivery_date_SalesOrder').setValue(record.data.delivery_date);

    var customerSalesOrder = Ext.getCmp('customerSalesOrder');
    customerSalesOrder.setValue(record.data.idcustomer);
    Ext.getCmp('namecustomerSalesOrder').setValue(record.data.namecustomer);

    Ext.getCmp('salesman_name_so').setValue(record.data.firstname);
    Ext.getCmp('salesman_id_so').setValue(record.data.salesman_id);

    //insert item to grid
    Ext.Ajax.request({
        url: SITE_URL + 'sales/get_item_sales',
        method: 'GET',
        params: {
            idsales: record.data.idsales
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            var gridDO = Ext.getCmp('EntrySalesOrder');

            Ext.each(d.data, function(obj, i) {
                console.log(obj);

                var recDO = new GridItemSalesOrderModel({
                    idsalesitem: obj.idsalesitem,
                    idinventory: obj.idinventory,
                    invno: obj.invno,
                    nameinventory: obj.nameinventory,
                    warehouse_code: obj.warehouse_code,
                    price: obj.price * 1,
                    short_desc: obj.short_desc,
                    size: obj.size,
                    size_measurement: obj.size_measurement,
                    // assetaccount:obj.idsalesitem,
                    deleted: obj.deleted,
                    sku_no: obj.sku_no,
                    qty: obj.qty * 1,
                    disc: obj.disc * 1,
                    total: obj.total * 1,
                    ratetax: obj.ratetax * 1
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });

                gridDO.getStore().insert(0, recDO);
            });



        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

    var subtotal = record.data.subtotal * 1;
    var tax = record.data.tax * 1;
    var totalamount = record.data.totalamount * 1;
    var dpp = (subtotal + record.data.disc * 1) / 1.1;
    Ext.getCmp('dppSalesOrder').setValue(dpp.toLocaleString('null', { maximumFractionDigits: 2 }));
    Ext.getCmp('subtotalSalesOrder').setValue(subtotal.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('totalPajakSalesOrder').setValue(tax.toLocaleString('null', { minimumFractionDigits: 2 }));
    Ext.getCmp('totalSalesOrder').setValue(totalamount.toLocaleString('null', { minimumFractionDigits: 2 }));




    // Ext.getCmp('cb_tax_id_so').setValue(record.data.idsales);





    // no_sales_quote
    // sales_quotation_date
    // id_sales_quote_SalesOrder
    // idsales_order
    // nojurnalSalesOrder
    // delivery_date_SalesOrder
    // cbUnitEntrySalesOrder
    // cb_tax_id_so
    // customerSalesOrder
    // salesman_name_so
    // salesman_id_so
    // memoSalesOrder

    // cb_sales_order_status

    // subtotalSalesOrder
    // totalPajakSalesOrder
    // totalSalesOrder
}

function showSalesQuotationData(record) {
    // console.log(record);

    Ext.getCmp('windowPopupSalesQuotationGrid').show();

    storeCustomer.load();
    storeUnit.load();

    Ext.getCmp('cbUnitEntrySalesQuotation').setValue(idunit);
    Ext.getCmp('statusformSalesQuotationGrid').setValue('edit');

    productMeasurementStore.load();
    // Ext.getCmp('cbSalesQuotation').setValue(1);
    // Ext.getCmp('cbSalesQuotation').setReadOnly(true);

    Ext.getCmp('nojurnalSalesQuotation').setValue(record.data.no_sales_quote);
    Ext.getCmp('tanggalSalesQuotation').setValue(record.data.date_quote);
    Ext.getCmp('idsales_quotation').setValue(record.data.idsales);

    var cbSalesQuotation = Ext.getCmp('cbSalesQuotation');
    // cbSalesQuotation.getStore().load();
    cbSalesQuotation.setValue(record.data.status * 1);


    if (record.data.status * 1 === 1) {
        //masih open
        Ext.getCmp('btnRecordSalesQuote').enable();
        cbSalesQuotation.setReadOnly(false);
    } else {
        Ext.getCmp('btnRecordSalesQuote').disable();
        cbSalesQuotation.setReadOnly(true);
    }

    if (record.data.idsales_quote !== null) {
        //udah jadi sales order gaboleh edit
        Ext.getCmp('btnRecordSalesQuote').disable();
    }

    var sales_quotation_date = Ext.getCmp('sales_quotation_date');
    sales_quotation_date.setValue(record.data.date_quote);

    var cbUnitEntrySalesOrder = Ext.getCmp('cbUnitEntrySalesQuotation');
    cbUnitEntrySalesOrder.setValue(record.data.idunit);
    // cbUnitEntrySalesOrder.setReadOnly(true);

    var customerSalesQuotation = Ext.getCmp('customerSalesQuotation');
    customerSalesQuotation.getStore().load();
    customerSalesQuotation.setValue(record.data.idcustomer);
    // customerSalesOrder.setReadOnly(true);

    StorePayment.load();
    var paymentSalesQuotation = Ext.getCmp('paymentSalesQuotation');
    paymentSalesQuotation.setValue(record.data.idpayment);
    // paymentSalesOrder.setReadOnly(true);

    var memoSalesOrder = Ext.getCmp('memoSalesOrder');
    memoSalesOrder.setValue(record.data.comments);

    taxStore.load();
    var cb_tax_id_sq = Ext.getCmp('cb_tax_id_sq');
    // cb_tax_id_sq.getStore().load();
    cb_tax_id_sq.setValue(record.data.rate);

    // Ext.getCmp('shipaddressSalesOrder').setValue(record.data.shipto);
    // Ext.getCmp('comboxcurrencySalesOrder').setValue(record.data.idcurrency);

    // Ext.getCmp('subtotalSalesQuotation').setValue(renderNomor(record.data.subtotal));
    // // Ext.getCmp('angkutSalesOrder').setValue(record.data.freight);
    // Ext.getCmp('totalPajakSalesQuotation').setValue(renderNomor(record.data.tax));
    // Ext.getCmp('totalSalesQuotation').setValue(renderNomor(record.data.totalamount));

    var EntrySalesQuotationRM = Ext.getCmp('EntrySalesQuotation').getStore();
    EntrySalesQuotationRM.removeAll();
    EntrySalesQuotationRM.sync();

    Ext.Ajax.request({
        url: SITE_URL + 'sales/get_item_sales',
        method: 'GET',
        params: {
            idsales: record.data.idsales
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            var gridSO = Ext.getCmp('EntrySalesQuotation');

            Ext.each(d.data, function(obj, i) {

                var recSO = new GridItemSalesQuotationModel({
                    idsalesitem: obj.idsalesitem,
                    idinventory: obj.idinventory,
                    invno: obj.invno,
                    nameinventory: obj.nameinventory,
                    short_desc: obj.short_desc,
                    price: obj.price * 1,
                    // idunit:obj.idsalesitem,
                    // assetaccount:obj.idsalesitem,
                    qty: obj.qty * 1,
                    sku_no: obj.sku_no,
                    size: 1,
                    size_measurement: obj.short_desc,
                    disc: obj.disc * 1,
                    total: obj.total * 1,
                    ratetax: obj.ratetax * 1
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });


                gridSO.getStore().insert(0, recSO);
            });

            updateGridSalesQuotation();

        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function loadDataFormInvoice(idsales) {
    Ext.Ajax.request({
        url: SITE_URL + 'sales/get_sales_data',
        method: 'GET',
        params: {
            idsales: idsales
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            // console.log(d)

            var disc = d.data.disc * 1;
            var subtotal = d.data.subtotal * 1;
            var tax = d.data.tax * 1;
            var totalamount = d.data.totalamount * 1;
            var dpp = (subtotal + disc) / 1.1;
            var freightcost = d.data.freight * 1;

            setNoArticle(d.data.idunit, 'idsales', 'noinvoice', 'sales', 'nojurnalSalesInvoice_si', 'INV');
            setNoArticle(d.data.idunit, 'idsales', 'noinvoice', 'sales', 'memoSalesInvoice_si', 'Sales Invoice : ' + d.data.namecustomer + ' -  INV');

            Ext.getCmp('discountSalesInvoice_si').setValue(disc.toLocaleString('null', { maximumFractionDigits: 2 }));
            Ext.getCmp('dppSalesInvoice_si').setValue(dpp.toLocaleString('null', { maximumFractionDigits: 2 }));
            Ext.getCmp('noSalesSalesInvoice_si').setValue(d.data.no_sales_order);
            Ext.getCmp('noDeliverySalesInvoice_si').setValue(d.data.no_do);
            Ext.getCmp('noFakturSalesInvoice_si').setValue(d.data.no_faktur);

            Ext.getCmp('id_sales_order_si').setValue(d.data.idsales);
            Ext.getCmp('idunit_si').setValue(d.data.idunit);
            Ext.getCmp('tanggalSalesInvoice_si').setValue(d.data.date_sales);
            // Ext.getCmp('cbUnitEntrySalesInvoice').setValue(d.data.idsales);
            // Ext.getCmp('id_sales_order_si').setValue(d.data.idunit);
            Ext.getCmp('cbUnitEntrySalesInvoice').setValue(d.data.idunit);
            Ext.getCmp('customerSalesInvoice_si').setValue(d.data.namecustomer);

            Ext.getCmp('shippingSalesInvoice_si').setValue(d.data.nameshipping);
            Ext.getCmp('driver_name_si').setValue(d.data.driver_name);
            Ext.getCmp('vehicle_number_si').setValue(d.data.vehicle_number);

            Ext.getCmp('shipaddressSalesInvoice_si').setValue(d.data.ship_address);
            Ext.getCmp('tanggalDeliverySalesInvoice_si').setValue(d.data.delivery_date);
            Ext.getCmp('comboxcurrencySalesInvoice_si').setValue(d.data.namecurr);
            Ext.getCmp('notes_si').setValue(d.data.note_shipping);

            Ext.getCmp('cb_tax_id_inv').setValue(d.data.nametax);

            Ext.getCmp('subtotalSalesInvoice_si').setValue(subtotal.toLocaleString('null', { maximumFractionDigits: 2 }));
            Ext.getCmp('angkutSalesInvoice_si').setValue(freightcost.toLocaleString('null', { maximumFractionDigits: 2 }));
            Ext.getCmp('totalSalesInvoice_si').setValue(totalamount.toLocaleString('null', { maximumFractionDigits: 2 }));
            Ext.getCmp('totalPajakSalesInvoice_si').setValue(tax.toLocaleString('null', { maximumFractionDigits: 2 }));

            var grid = Ext.getCmp('EntrySalesInvoice');

            Ext.each(d.items, function(obj, i) {
                console.info(obj)
                var rec = new GridItemSalesInvoiceModel({
                    idinventory: obj.idinventory,
                    invno: obj.invno,
                    sku_no: obj.sku_no,
                    warehouse_desc: obj.warehouse_desc,
                    warehouse_code: obj.warehouse_code,
                    short_desc: obj.short_desc,
                    size_measurement: obj.size_measurement,
                    nameinventory: obj.nameinventory,
                    price: obj.price,
                    qty: obj.qty,
                    size: obj.size,
                    disc: obj.disc,
                    total: obj.total,
                    ratetax: obj.ratetax
                });

                grid.getStore().insert(0, rec);
            });
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

//end loadDataFormInvoice function
var wCoaSalesPaymentPopup = Ext.create(dir_sys + 'sales.wCoaSalesPaymentPopup');
var windowPopupWindowSalesPayment = Ext.create('widget.window', {
    id: 'windowPopupWindowSalesPayment',
    title: 'Receive Payment',
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
            xtype: 'form',
            id: 'form_salesPayment',
            autoWidth: true,
            url: SITE_URL + 'sales/save_payment',
            autoHeight: true,
            bodyPadding: 5,
            // width:400,
            defaults: {
                anchor: '100%',
                labelWidth: 160
            },
            fieldDefaults: {
                msgTarget: 'side',
                blankText: 'Tidak Boleh Kosong'
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'idsales',
                    id: 'idsales_paymentsales'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'noinvoice_paymentsales',
                    fieldLabel: 'No Invoice'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'no_sales_order_paymentsales',
                    fieldLabel: 'No Sales Order'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'namecustomer_paymentsales',
                    fieldLabel: 'Customer Name'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'date_sales_paymentsales',
                    fieldLabel: 'Date Sales'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'invoice_date_paymentsales',
                    fieldLabel: 'Date Invoice'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'paidtoday_paymentsales',
                    fieldLabel: 'Total Paid',
                    fieldStyle: 'text-align: right;',
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    name: 'balance_sales',
                    fieldLabel: 'Billed Amount',
                    id: 'balance_sales_paymentsales',
                    fieldStyle: 'text-align: right;'
                },
                {
                    xtype: 'textfield',
                    cls: 'my-mandatory-field',
                    allowBlank: false,
                    name: 'amount',
                    // maxValue:data.balance*1,
                    // minValue: 0,
                    id: 'amount_salesPayment',
                    fieldLabel: 'Amount',
                    fieldStyle: 'text-align: right;',
                    listeners: {
                        'render': function(c) {
                            c.getEl().on('keyup', function() {
                                this.setRawValue(renderNomor(this.getValue()));
                                updateSelisihSalesPayment();
                            }, c);
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    id: 'balance_paymentsales',
                    fieldLabel: 'Outstanding Balance',
                    fieldStyle: 'text-align: right;',
                }, {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    allowBlank: false,
                    name: 'date_payment',
                    fieldLabel: 'Date Payment',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Akun Kas/Bank',
                    allowBlank: false,
                    name: 'accnametujuan',
                    id: 'accname_coa_paymentsales',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                wCoaSalesPaymentPopup.show();
                                storeGridAccount.on('beforeload', function(store, operation, eOpts) {
                                    operation.params = {
                                        'idunit': idunit,
                                        'idaccounttype': '1,19'
                                    };
                                });
                                storeGridAccount.load();
                            });
                        }
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'idaccount',
                    id: 'idaccount_coa_paymentsales',
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Notes',
                    name: 'notes'
                }
            ]
        }

    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('windowPopupWindowSalesPayment').hide();
        }
    }, {
        text: 'Save',
        handler: function() {
            var selisih = str_replace('.', '', Ext.getCmp('balance_sales_paymentsales').getValue()) * 1 - str_replace('.', '', Ext.getCmp('amount_salesPayment').getValue()) * 1
            if (selisih * 1 < 0) {
                Ext.Msg.alert("Error!", "Payment exceeds the outstanding balance");
            } else {
                var form = Ext.getCmp('form_salesPayment').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('form_salesPayment').getForm().reset();
                            Ext.getCmp('windowPopupWindowSalesPayment').hide();

                            setHeaderInvoice();

                            if (Ext.isDefined(Ext.getCmp('SalesInvoicePaidGrid'))) {
                                Ext.getCmp('SalesInvoicePaidGrid').getStore().load();
                            }
                            if (Ext.isDefined(Ext.getCmp('SalesInvoiceUnpaidGrid'))) {
                                Ext.getCmp('SalesInvoiceUnpaidGrid').getStore().load();
                            }
                            if (Ext.isDefined(Ext.getCmp('SalesInvoiceOverdueGrid'))) {
                                Ext.getCmp('SalesInvoiceOverdueGrid').getStore().load();
                            }
                            // storeGridSalesInvoicePaidGrid.load();
                            // storeGridSalesInvoiceOverdueGrid.load();
                            // storeGridSalesInvoiceUnpaidGrid.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            //                                     storeGridPengaturan.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }

        }
    }],
    modal: true,
    listeners: {
        'show': function() {


        }
    }
});

function windowSalesPayment(data) {

    windowPopupWindowSalesPayment.show();

    Ext.getCmp('idsales_paymentsales').setValue(data.idsales);
    Ext.getCmp('noinvoice_paymentsales').setValue(data.noinvoice);
    Ext.getCmp('no_sales_order_paymentsales').setValue(data.no_sales_order);
    Ext.getCmp('namecustomer_paymentsales').setValue(data.namecustomer);
    Ext.getCmp('date_sales_paymentsales').setValue(data.date_sales);
    Ext.getCmp('paidtoday_paymentsales').setValue(renderNomor(data.paidtoday));
    Ext.getCmp('balance_sales_paymentsales').setValue(renderNomor(data.balance));
    Ext.getCmp('invoice_date_paymentsales').setValue(data.invoice_date);
}


function updateSelisihSalesPayment() {
    var selisih = str_replace('.', '', Ext.getCmp('balance_sales_paymentsales').getValue()) * 1 - str_replace('.', '', Ext.getCmp('amount_salesPayment').getValue()) * 1
    Ext.getCmp('balance_paymentsales').setValue(renderNomor(selisih));

}

function setHeaderInvoice() {
    Ext.Ajax.request({
        url: SITE_URL + 'sales/get_sum_invoice',
        method: 'GET',
        // params: {
        //     idsales: data.idsales
        // },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp('sumSalesInvUnpaid').update('<center><h2><span style=color:#FF6D00>' + d.totalUnpaid + '</span></h2>');
            Ext.getCmp('sumSalesInvPaid').update('<center><h2><span style=color:#64DD17>' + d.totalPaid + '</span></h2>');
            Ext.getCmp('sumSalesInvDue').update('<center><h2><span style=color:#d50000>' + d.totalDue + '</span></h2>');
            // storeGridWindowSalesPayment.load();
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function showDataSales(idsales) {
    WindowEntrySalesInvoice.show();

    var EntrySalesInvoice = Ext.getCmp('EntrySalesInvoice').getStore();
    EntrySalesInvoice.removeAll();
    EntrySalesInvoice.sync();

    loadDataFormSales(idsales); //masukin data-data sales ke form create invoice
}

function loadDataFormSales(idsales) {
    Ext.Ajax.request({
        url: SITE_URL + 'sales/get_sales_data',
        method: 'GET',
        params: {
            idsales: idsales
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            Ext.getCmp('nojurnalSalesInvoice_si').setValue(d.data.no_sales_order);

            Ext.getCmp('id_sales_order_si').setValue(d.data.idsales);
            Ext.getCmp('idunit_si').setValue(d.data.idunit);
            Ext.getCmp('tanggalSalesInvoice_si').setValue(d.data.date_sales);
            Ext.getCmp('cbUnitEntrySalesInvoice').setValue(d.data.idsales);
            // Ext.getCmp('id_sales_order_si').setValue(d.data.idunit);
            Ext.getCmp('cbUnitEntrySalesInvoice').setValue(d.data.namaunit);
            Ext.getCmp('customerSalesInvoice_si').setValue(d.data.namecustomer);
            Ext.getCmp('comboxpaymentterm_si').setValue(d.data.idpayment);

            Ext.getCmp('shippingSalesInvoice_si').setValue(d.data.idshipping * 1);
            Ext.getCmp('driver_name_si').setValue(d.data.driver_name);
            Ext.getCmp('vehicle_number_si').setValue(d.data.vehicle_number);

            Ext.getCmp('shipaddressSalesInvoice_si').setValue(d.data.ship_address);
            Ext.getCmp('tanggalDeliverySalesInvoice_si').setValue(d.data.delivery_date);
            Ext.getCmp('comboxcurrencySalesInvoice_si').setValue(d.data.namecurr);
            Ext.getCmp('notes_si').setValue(d.data.note_shipping);
            Ext.getCmp('memoSalesInvoice_si').setValue(d.data.comments);

            Ext.getCmp('angkutSalesInvoice_si').setValue(renderNomor(d.data.freight));
            Ext.getCmp('totalSalesInvoice_si').setValue(renderNomor(d.data.totalamount));
            Ext.getCmp('totalPajakSalesInvoice_si').setValue(renderNomor(d.data.tax));
            Ext.getCmp('subtotalSalesInvoice_si').setValue(renderNomor(d.data.subtotal));
            Ext.getCmp('pembayaranSalesInvoice_si').setValue(renderNomor(d.data.paidtoday));
            Ext.getCmp('sisaBayarSalesInvoice_si').setValue(renderNomor(d.data.balance));

            Ext.each(d.items, function(obj, i) {
                console.info(obj)
                var rec = new GridItemSalesInvoiceModel({
                    idinventory: obj.idinventory,
                    invno: obj.invno,
                    sku_no: obj.sku_no,
                    warehouse_desc: obj.warehouse_desc,
                    warehouse_code: obj.warehouse_code,
                    short_desc: obj.short_desc,
                    size_measurement: obj.size_measurement,
                    nameinventory: obj.nameinventory,
                    price: obj.price,
                    qty: obj.qty,
                    size: obj.size,
                    disc: obj.disc,
                    total: obj.total,
                    ratetax: obj.ratetax
                });
                var grid = Ext.getCmp('EntrySalesInvoice');
                grid.getStore().insert(0, rec);
            });

            Ext.getCmp('btnRecordSalesOrderInvoice').hide();

            Ext.getCmp('WindowEntrySalesInvoice').setTitle('Data Sales Order: ' + d.data.no_sales_order);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}


function load_tmp_sales_return() {
    // - dipanggil saat window item selector untuk pemilihan barang sales yang akan diretur melalui button atau window(x) button
    // - load data ke item list di grid 'Entry Sales Order'


    var EntrySalesReturn = Ext.getCmp('EntrySalesReturn').getStore();
    EntrySalesReturn.removeAll();
    EntrySalesReturn.sync();

    console.info('get tmp item');

    Ext.Ajax.request({
        url: SITE_URL + 'sales/get_item_sales_return_tmp',
        method: 'GET',
        params: {
            token: Ext.getCmp('tokenSalesReturnGrid_sr').getValue()
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            Ext.getCmp('subtotalSalesReturn_sr').setValue(renderNomor(d.subtotal));
            Ext.getCmp('totalDiskonSalesReturn_sr').setValue(renderNomor(d.disc));
            Ext.getCmp('totalPajakSalesReturn_sr').setValue(renderNomor(d.tax));
            Ext.getCmp('totalSalesReturn_sr').setValue(renderNomor(d.total));

            Ext.each(d.data, function(obj, i) {

                var rec = new ItemSalesReturnModel({
                    idsalesitem: obj.idsalesitem,
                    idinventory: obj.idinventory,
                    sku_no: obj.sku_no,
                    invno: obj.invno,
                    nameinventory: obj.nameinventory,
                    // warehouse_code:obj.warehouse_code,
                    price: obj.price * 1,
                    short_desc: obj.short_desc,
                    // assetaccount:obj.idsalesitem,
                    qty: obj.qty * 1,
                    size: obj.size,
                    size_measurement: obj.size_measurement,
                    disc: obj.disc * 1,
                    total: obj.total * 1,
                    // ratetax: obj.ratetax*1,
                    qty_return: obj.qty_return,
                    notes: obj.notes
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });

                // var grid = Ext.getCmp('EntrySalesReturn');
                EntrySalesReturn.insert(0, rec);
                // updateGridSalesOrder('general');
                // store.insert(0, rec);
            });
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
    //     Ext.Ajax.request({
    //             url: SITE_URL + 'sales/get_item_sales_return_tmp',
    //             method: 'GET',
    //             params: {
    //                 idsales: Ext.getCmp('idsales_order_sr').getValue(),
    //                 item_selector_sr:'true',
    //                 token:Ext.getCmp('tokenSalesReturnGrid_sr').getValue()
    //             },
    //             success: function(form, action) {
    //                 var d = Ext.decode(form.responseText);

    //                 Ext.getCmp('subtotalSalesReturn_sr').setValue(renderNomor(d.subtotal));
    //                 Ext.getCmp('totalDiskonSalesReturn_sr').setValue(renderNomor(d.disc));
    //                 Ext.getCmp('totalPajakSalesReturn_sr').setValue(renderNomor(d.pajak));
    //                 Ext.getCmp('totalSalesReturn_sr').setValue(renderNomor(d.total));

    //                 Ext.each(d.data, function(obj, i) {

    //                      var rec = new ItemSalesReturnModel({
    //                             idsalesitem: obj.idsalesitem,
    //                             idinventory: obj.idinventory,
    //                             invno: obj.invno,
    //                             nameinventory: obj.nameinventory,
    //                             // warehouse_code:obj.warehouse_code,
    //                             price: obj.price*1,
    //                             short_desc:obj.short_desc,
    //                             // assetaccount:obj.idsalesitem,
    //                             qty: obj.qty*1,
    //                             size:obj.size,
    //                             size_measurement:obj.size_measurement,
    //                             disc: obj.disc*1,
    //                             total: obj.total*1,
    //                             // ratetax: obj.ratetax*1,
    //                             qty_return:obj.qty_return,
    //                             notes:obj.notes
    // //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
    //                     });

    //                      // var grid = Ext.getCmp('EntrySalesReturn');
    //                     EntrySalesReturn.insert(0, rec);
    //                     // updateGridSalesOrder('general');
    //                     // store.insert(0, rec);
    //                 });

    //             },
    //             failure: function(form, action) {
    //                 Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //             }
    //         });
}

function clearFormSQ() {
    Ext.getCmp('EntrySalesQuotation').getStore().removeAll();
    Ext.getCmp('noinvoiceSalesQuotation').setValue();
    Ext.getCmp('statusformSalesQuotationGrid').setValue();
    Ext.getCmp('idsales_quotation').setValue();
    Ext.getCmp('nojurnalSalesQuotation').setValue();
    Ext.getCmp('tanggalSalesQuotation').setValue();
    Ext.getCmp('cb_tax_id_sq').setValue();
    Ext.getCmp('tglPelunasanSalesQuotation').setValue();
    Ext.getCmp('cbSalesQuotation').setValue();
    Ext.getCmp('cbUnitEntrySalesQuotation').setValue();
    Ext.getCmp('tglExpiredDateSalesQuotation').setValue();
    Ext.getCmp('customerSalesQuotation').setValue();
    Ext.getCmp('paymentSalesQuotation').setValue();
    Ext.getCmp('memoSalesQuotation').setValue();
    Ext.getCmp('totalSalesQuotation').setValue();
    Ext.getCmp('totalPajakSalesQuotation').setValue();
    Ext.getCmp('subtotalSalesQuotation').setValue();
}

function clearFormSO() {
    var EntrySalesOrder = Ext.getCmp('EntrySalesOrder').getStore();
    EntrySalesOrder.removeAll();
    EntrySalesOrder.sync();

    Ext.getCmp('no_sales_quote').setValue(null);
    Ext.getCmp('sales_quotation_date').setValue(null);
    Ext.getCmp('id_sales_quote_SalesOrder').setValue(null);
    Ext.getCmp('idsales_order').setValue(null);
    Ext.getCmp('nojurnalSalesOrder').setValue(null);
    Ext.getCmp('delivery_date_SalesOrder').setValue(null);
    // Ext.getCmp('tglPelunasanSalesOrder').setValue(null);
    Ext.getCmp('customerSalesOrder').setValue(null);
    // Ext.getCmp('paymentSalesOrder').setValue(null);
    Ext.getCmp('salesman_name_so').setValue(null);
    Ext.getCmp('memoSalesOrder').setValue(null);
    // Ext.getCmp('shipaddressSalesOrder').setValue(null);
    Ext.getCmp('totalSalesOrder').setValue(null);
    // Ext.getCmp('shippingSalesOrder').setValue(null);
    Ext.getCmp('totalPajakSalesOrder').setValue(null);
    // Ext.getCmp('comboxcurrencySalesOrder').setValue(null);
    Ext.getCmp('subtotalSalesOrder').setValue(null);
    // Ext.getCmp('pembayaranSalesOrder').setValue(null);
    Ext.getCmp('cb_tax_id_so').setValue(null);

}

function clearFormSR() {
    //clear form sales return entry
    var EntrySalesReturn = Ext.getCmp('EntrySalesReturn').getStore();
    EntrySalesReturn.removeAll();
    EntrySalesReturn.sync();

    Ext.getCmp('nojurnalSalesReturn_sr').setValue(null);
    Ext.getCmp('tanggalSalesReturn_sr').setValue(null);
    Ext.getCmp('customerSalesReturn_sr').setValue(null);
    // Ext.getCmp('memoSalesReturn_sr').setValue(null);
    Ext.getCmp('nominal_sales_return').setValue(null);
    Ext.getCmp('accname_sales_return').setValue(null);
    Ext.getCmp('accnumber_sales_return').setValue(null);

    // updateGridSalesReturn();
}

function paymentTermSO(idterm) {
    console.log('idterm:' + idterm);
    var pembayaranSalesInvoice_si = Ext.getCmp('pembayaranSalesInvoice_si');
    var sisaBayarSalesInvoice_si = Ext.getCmp('sisaBayarSalesInvoice_si');

    var aftertax = str_replace('.', '', Ext.getCmp('totalSalesInvoice_si').getValue()) * 1;
    var shipcost = str_replace('.', '', Ext.getCmp('angkutSalesInvoice_si').getValue()) * 1;

    // var paymenttermarr = [['1', 'Cash in Advance'], ['2', 'Cash in Delivery'], ['3','NET d days'], ['4','NET EOM d days'],['5','Discount']];

    if (idterm * 1 === 1) {
        pembayaranSalesInvoice_si.setValue(renderNomor(aftertax + shipcost));
        pembayaranSalesInvoice_si.setReadOnly(true);

        sisaBayarSalesInvoice_si.setValue(0);
    } else if (idterm * 1 === 2) {
        pembayaranSalesInvoice_si.setValue(0);
        pembayaranSalesInvoice_si.setReadOnly(true);

        sisaBayarSalesInvoice_si.setValue(renderNomor(aftertax + shipcost));
    } else {
        pembayaranSalesInvoice_si.setValue(0);
        pembayaranSalesInvoice_si.setReadOnly(false);

        sisaBayarSalesInvoice_si.setValue(renderNomor(aftertax + shipcost));
    }
}