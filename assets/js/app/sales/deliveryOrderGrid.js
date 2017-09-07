// var WindowSaleOrderList = Ext.create(dir_sys + 'sales.WindowSaleOrderList');
var WindowEntrySalesInvoice = Ext.create(dir_sys + 'sales.WindowEntrySalesInvoice');

var WindowEntryDeliveryOrder = Ext.create(dir_sys + 'sales.WindowEntryDeliveryOrder');

Ext.define('GriddeliveryOrderGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        'delivery_order_id', 'no_do', 'idunit', 'date_created', 'delivery_date', 'idsales', 'idtax', 'idcustomer', 'remarks', 'userin', 'status', 'totalamount', 'tax', 'disc', 'freight', 'paidtoday', 'balance', 'date_sales', 'no_sales_order', 'namecustomer', 'noinvoice', 'qtykirim', 'qtyorder', 'subtotal', 'totalitem', 'totalitemkirim', 'sisakirim', 'job_order_id', 'statuswo', 'total_dpp', 'freight', 'shipaddress'
    ],
    idProperty: 'id'
});
var storeGriddeliveryOrderGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GriddeliveryOrderGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesorder/sales',
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

storeGriddeliveryOrderGrid.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        'extraparams': 'a.idunit:' + Ext.getCmp('idunit_grddo').getValue() + ', ' +
            'a.status:' + Ext.getCmp('status_grddo').getValue(),
        'option': 'delivery_order',
        'startdate': Ext.getCmp('startdate_grddo').getValue(),
        'enddate': Ext.getCmp('enddate_grddo').getValue(),
    };
});

Ext.define('MY.searchGriddeliveryOrderGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGriddeliveryOrderGrid',
    store: storeGriddeliveryOrderGrid,
    width: 180
});
var smGriddeliveryOrderGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGriddeliveryOrderGrid.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('createDOformGrid').disable();
                Ext.getCmp('createInvoiceDOGrid').disable();
            }
        },
        select: function(model, record, index) {
            // console.log(record.data.noinvoice)
            if (record.data.job_order_id !== null) {
                //sales order lewat work order
                if (record.data.statuswo * 1 === 5) {
                    //status wo 5/ready for delivery
                    Ext.getCmp('btnPickingNote').enable();
                } else {
                    Ext.getCmp('btnPickingNote').disable();
                }
            } else {
                //sales ga pake work order langsung bisa delivery
                Ext.getCmp('btnPickingNote').enable();
            }



            if (record.data.noinvoice === null || record.data.noinvoice === '') {
                Ext.getCmp('createInvoiceDOGrid').enable();
            } else {
                Ext.getCmp('createInvoiceDOGrid').disable();
            }

            // if (record.data.status * 1 === 5 || record.data.status * 1 === 6) {
            Ext.getCmp('createDOformGrid').enable();
            // } else {
            //     Ext.getCmp('createDOformGrid').disable();
            // }

            if (record.data.delivery_order_id === null || record.data.delivery_order_id === '') {
                Ext.getCmp('btnPrintDO').disable();
            } else {
                Ext.getCmp('btnPrintDO').enable();
            }
        }
    }
});
Ext.define(dir_sys + 'sales.deliveryOrderGrid', {
    title: 'Delivery Order',
    itemId: 'deliveryOrderGrid',
    id: 'deliveryOrderGrid',
    extend: 'Ext.grid.Panel',
    alias: 'widget.deliveryOrderGrid',
    store: storeGriddeliveryOrderGrid,
    selModel: smGriddeliveryOrderGrid,
    loadMask: true,
    columns: [{
            header: 'delivery_order_id',
            dataIndex: 'delivery_order_id',
            hidden: true
        }, {
            header: 'idtax',
            dataIndex: 'idtax',
            hidden: true
        }, {
            header: 'idcustomer',
            dataIndex: 'idcustomer',
            hidden: true
        }, {
            header: 'noinvoice',
            dataIndex: 'noinvoice',
            hidden: true
        }, {
            header: 'idsales',
            dataIndex: 'idsales',
            hidden: true
        },
        {
            header: 'job_order_id',
            dataIndex: 'job_order_id',
            hidden: true
        }, {
            header: 'No Sales Order',
            dataIndex: 'no_sales_order',
            minWidth: 150
        },
        {
            header: 'Status Sales',
            dataIndex: 'status',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(ArrSalesStatus, value);
            }
        },
        {
            header: 'Status Production',
            dataIndex: 'statuswo',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right',
            renderer: function(value) {
                return customColumnStatus(arrWorkOrderStatus, value);
            }
        },
        {
            header: 'No Delivery',
            dataIndex: 'no_do',
            minWidth: 150
        },
        {
            header: 'Delivery Order Date',
            dataIndex: 'delivery_date',
            minWidth: 150
        },
        {
            header: 'Date Sales',
            dataIndex: 'date_sales',
            minWidth: 150
        },
        {
            header: 'Customer Name',
            dataIndex: 'namecustomer',
            minWidth: 150
        },
        {
            header: 'Subtotal',
            dataIndex: 'subtotal',
            minWidth: 150,
            hidden: true,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Tax',
            dataIndex: 'tax',
            hidden: true,
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Discount',
            dataIndex: 'disc',
            hidden: true,
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Shipping Cost',
            dataIndex: 'freight',
            hidden: true,
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Paid',
            dataIndex: 'paidtoday',
            hidden: true,
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Total Amount',
            dataIndex: 'totalamount',
            hidden: true,
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },

        {
            header: 'Total Ordered Qty',
            dataIndex: 'totalitem',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },

        {
            header: 'Total Shipped Qty',
            dataIndex: 'totalitemkirim',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },

        {
            header: 'Total Rest Qty',
            dataIndex: 'sisakirim',
            minWidth: 150,
            xtype: 'numbercolumn',
            align: 'right'
        },
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'datefield',
                    id: 'startdate_grddo',
                    format: 'd/m/Y',
                    // value: datenow(),
                    fieldLabel: 'Date',
                },
                ' to ',
                {
                    xtype: 'datefield',
                    id: 'enddate_grddo',
                    format: 'd/m/Y',
                    // value: datenow(),
                    hideLabel: true
                        // fieldLabel: 'Date Order',
                }, '-',
                {
                    xtype: 'comboxunit',
                    valueField: 'idunit',
                    id: 'idunit_grddo',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxSalesStatus',
                    id: 'status_grddo',
                },
                {
                    text: 'Search',
                    handler: function() {
                        storeGriddeliveryOrderGrid.load();
                    }
                },
                {
                    text: 'Clear Filter',
                    handler: function() {
                        Ext.getCmp('startdate_grddo').setValue();
                        Ext.getCmp('enddate_grddo').setValue();
                        Ext.getCmp('status_grddo').setValue();
                        storeGriddeliveryOrderGrid.load();
                    }
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    id: 'btnPickingNote',
                    text: 'Print Picking Note',
                    iconCls: 'print-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('PurchaseRequisitionGridID')[0];
                        var grid = Ext.getCmp('deliveryOrderGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {

                            Ext.create('Ext.window.Window', {
                                title: 'Preview Picking Note',
                                modal: true,
                                width: panelW - 100,
                                height: panelH - 200,
                                items: [{
                                    xtype: 'component',
                                    html: '<iframe src="' + SITE_URL + 'sales/print_picking_note/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                        text: 'Print Picking Note',
                                        iconCls: 'print-icon',
                                        handler: function() {
                                            window.open(SITE_URL + 'sales/print_picking_note/' + selectedRecord.data.idsales + '/print', '_blank');
                                            this.hide();
                                        }
                                    },
                                    {
                                        text: 'Print Picking Note and Set Picking Status',
                                        iconCls: 'print-icon',
                                        handler: function() {
                                            window.open(SITE_URL + 'sales/print_picking_note/' + selectedRecord.data.idsales + '/print', '_blank');

                                            Ext.Ajax.request({
                                                url: SITE_URL + 'sales/set_picking',
                                                method: 'POST',
                                                params: {
                                                    idsales: selectedRecord.data.idsales
                                                },
                                                success: function(form, action) {
                                                    var d = Ext.decode(form.responseText);
                                                    storeGriddeliveryOrderGrid.load();

                                                    this.hide();
                                                    // if (!d.success) {
                                                    //     Ext.Msg.alert('Informasi', d.message);
                                                    // }
                                                },
                                                failure: function(form, action) {
                                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                }
                                            });
                                        }
                                    }
                                ]
                            }).show();
                        }
                    }
                }, {
                    itemId: 'adddeliveryOrderGrid',
                    hidden: true,
                    text: 'Create New Delivery Order',
                    iconCls: 'add-icon',
                    handler: function() {
                        WindowSaleOrderList.show();
                        Ext.getCmp('GridSalesOrderList').getStore().load();

                        storeCustomer.load();
                        storeUnit.load();
                        productMeasurementStore.load();
                        StorePayment.load();
                        // storeGridSalesOrderList.load();

                        //apus dulu data di grid entry delivery order
                        Ext.getCmp('EntryDeliveryOrder').getStore().removeAll();
                        Ext.getCmp('EntryDeliveryOrder').getStore().sync();
                    }
                }, {
                    id: 'createDOformGrid',
                    disabled: true,
                    text: 'Set Delivery Order',
                    iconCls: 'edit-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('deliveryOrderGrid')[0];
                        var grid = Ext.getCmp('deliveryOrderGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];

                        formDO(selectedRecord);
                    }
                },
                {
                    id: 'btnPrintDO',
                    disabled: true,
                    text: 'Print Delivery Order',
                    iconCls: 'print-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('PurchaseRequisitionGridID')[0];
                        var grid = Ext.getCmp('deliveryOrderGrid');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            console.log(selectedRecord.data.job_order_id);
                            Ext.create('Ext.window.Window', {
                                title: 'Preview Delivery Order',
                                modal: true,
                                width: panelW - 100,
                                height: panelH - 200,
                                items: [{
                                    xtype: 'component',
                                    html: '<iframe src="' + SITE_URL + 'sales/print_delivery_order/' + selectedRecord.data.delivery_order_id + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
                                }],
                                buttons: [{
                                    text: 'Print Delivery Order',
                                    iconCls: 'print-icon',
                                    handler: function() {
                                        window.open(SITE_URL + 'sales/print_delivery_order/' + selectedRecord.data.delivery_order_id + '/print', '_blank');
                                        this.hide();
                                    }
                                }]
                            }).show();
                        }
                    }
                }, {
                    id: 'createInvoiceDOGrid',
                    disabled: true,
                    text: 'Create Invoice',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('deliveryOrderGrid')[0];
                        // var grid = Ext.getCmp('GriddeliveryOrderGridID');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {

                            if (selectedRecord.data.noinvoice !== null) {
                                Ext.Msg.alert('Failure', 'Invoice untuk data Delivery Order terpilih sudah terbentuk. Silahkan pilih data Delivery Order yang lain');
                            } else {
                                WindowEntrySalesInvoice.show();

                                var EntrySalesInvoice = Ext.getCmp('EntrySalesInvoice').getStore();
                                EntrySalesInvoice.removeAll();
                                EntrySalesInvoice.sync();

                                loadDataFormInvoice(selectedRecord.data.idsales);

                                Ext.getCmp('btnRecordSalesOrderInvoice').show();

                                Ext.getCmp('WindowEntrySalesInvoice').setTitle('Create Sales Invoice');

                                // console.log(Ext.getCmp('totalSalesInvoice_si').getValue());

                                // Ext.getCmp('pembayaranSalesInvoice_si').setValue(renderNomor(0));
                                // Ext.getCmp('angkutSalesInvoice_si').setValue(0);
                                // Ext.getCmp('sisaBayarSalesInvoice_si').setValue(renderNomor(213213));



                            }
                        }
                    }
                }, {
                    text: 'Set Status',
                    iconCls: 'edit-icon',
                    menu: [{
                        text: 'Closed',
                        handler: function() {
                            // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
                            var grid = Ext.getCmp('deliveryOrderGrid');
                            var selectedRecord = grid.getSelectionModel().getSelection()[0];
                            var data = grid.getSelectionModel().getSelection();
                            if (data.length == 0) {
                                Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                            } else {
                                if (selectedRecord.data.status * 1 == 4) {
                                    Ext.Msg.alert('Failure', 'Data sales sudah berstatus closed');
                                } else if (selectedRecord.data.noinvoice === null || selectedRecord.data.noinvoice === '') {
                                    Ext.Msg.alert('Failure', 'Mohon buat invoice terlebih dahulu');
                                } else if (selectedRecord.data.status * 1 == 8) {
                                    Ext.Msg.alert('Failure', 'Data sales sudah berstatus closed');
                                } else {
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'sales/set_status',
                                        method: 'POST',
                                        params: {
                                            status: 4,
                                            idunit: Ext.getCmp('idunit_grddo').getValue(),
                                            idsales: selectedRecord.data.idsales
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            Ext.Msg.alert('Informasi', d.message);
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                }

                            }
                        }
                    }],


                }, {
                    itemId: 'editdeliveryOrderGrid',
                    text: 'Ubah',
                    hidden: true,
                    iconCls: 'edit-icon',
                    handler: function() {
                        // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
                        var grid = Ext.getCmp('GriddeliveryOrderGridID');
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
                        } else {
                            loadMemberForm(selectedRecord.data.id_member)
                        }
                    }
                }, {
                    id: 'btnDeletedeliveryOrderGrid',
                    text: 'Hapus',
                    hidden: true,
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.getCmp('GriddeliveryOrderGridID');
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/deliveryOrderGrid',
                                        method: 'POST',
                                        params: {
                                            postdata: Ext.encode(selected),
                                            idmenu: 95
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if (!d.success) {
                                                Ext.Msg.alert('Informasi', d.message);
                                            }
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                    storeGriddeliveryOrderGrid.load();
                                }
                            }
                        });
                    },
                    //                    disabled: true
                }, '->', 'Pencarian: ', ' ', {
                    xtype: 'searchGriddeliveryOrderGrid',
                    text: 'Left Button'
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGriddeliveryOrderGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                // pageSize:20
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGriddeliveryOrderGrid.load();
                // anggotaTypeStore.load();
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            // loadMemberForm(record.data.id_member)
        }
    }
});


function loadMemberForm(id) {
    // anggotaTypeStore.load();

    // var formdeliveryOrderGrid = Ext.getCmp('formdeliveryOrderGrid');
    // wdeliveryOrderGrid.show();
    // formdeliveryOrderGrid.getForm().load({
    //     url: SITE_URL + 'backend/loadFormData/deliveryOrderGrid/1/member',
    //     params: {
    //         extraparams: 'a.id_member:' + id
    //     },
    //     success: function(form, action) {
    //         var obj = Ext.decode(action.response.responseText); 
    //         // console.log(obj);
    //         Ext.getCmp('comboxStatusMember').setValue(obj.data.status*1);
    //         formdeliveryOrderGrid.getForm().findField("id_member_type").setValue(obj.data.id_member_type);
    //         formdeliveryOrderGrid.getForm().findField("marital_status").setValue(obj.data.marital_status*1);
    //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     },
    //     failure: function(form, action) {
    //         Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     }
    // })

    // Ext.getCmp('memberFormDetailID').getForm().load({
    //     url: SITE_URL + 'backend/loadFormData/deliveryOrderGrid/1/member',
    //     params: {
    //         extraparams: 'a.id_member:' + id
    //     },
    //     success: function(form, action) {
    //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     },
    //     failure: function(form, action) {
    //         Ext.Msg.alert("Load failed", action.result.errorMessage);
    //     }
    // })

    // Ext.getCmp('statusformdeliveryOrderGrid').setValue('edit');
    // Ext.getCmp('Tabanggota').setActiveTab(0);
}

function formDO(selectedRecord) {
    WindowEntryDeliveryOrder.show();

    console.log(selectedRecord);

    storeCustomer.load();
    // var grid = Ext.getCmp('EntryDeliveryOrder');
    // grid.columnManager.headerCt.items.get(12).setVisible(false);
    var colSisaKirim = Ext.getCmp('EntryDeliveryOrder').columnManager.headerCt.items.get(12);

    if (selectedRecord.get('no_do') !== null) {
        //tampilkan kolom sisa kirim
        // if(colSisaKirim.isVisible()){
        colSisaKirim.setVisible(true);
        // }

        // grid.columnManager.headerCt.items.get(12).setVisible(false)
    } else {
        //hilangkan sisa kirim
        colSisaKirim.setVisible(false);
    }

    Ext.getCmp('nojurnalDO_do').setValue(selectedRecord.get('no_do'));
    Ext.getCmp('delivery_order_id').setValue(selectedRecord.get('delivery_order_id'));

    var EntryDeliveryOrderStore = Ext.getCmp('EntryDeliveryOrder').getStore();
    EntryDeliveryOrderStore.removeAll();
    EntryDeliveryOrderStore.sync();

    Ext.getCmp('statusformSalesOrderGrid_do').setValue('input');

    Ext.getCmp('nojurnalSalesOrder_do').setValue(selectedRecord.get('no_sales_order'));
    Ext.getCmp('id_sales_order_do').setValue(selectedRecord.get('idsales'));

    var tanggalSalesOrder_do = Ext.getCmp('tanggalSalesOrder_do');
    tanggalSalesOrder_do.setValue(selectedRecord.get('date_sales'));
    tanggalSalesOrder_do.setReadOnly(true);

    var cbUnitEntryDeliveryOrder = Ext.getCmp('cbUnitEntryDeliveryOrder');
    cbUnitEntryDeliveryOrder.setValue(selectedRecord.get('idunit'));
    cbUnitEntryDeliveryOrder.setReadOnly(true);

    // console.log(selectedRecord.get('idcustomer'));
    var customerSalesOrder_do = Ext.getCmp('customerSalesOrder_do');
    customerSalesOrder_do.setValue(selectedRecord.get('idcustomer'));
    customerSalesOrder_do.setReadOnly(true);

    var paymentSalesOrder_do = Ext.getCmp('paymentSalesOrder_do');
    paymentSalesOrder_do.setValue(selectedRecord.get('idpayment'));
    paymentSalesOrder_do.setReadOnly(true);

    var memoSalesOrder_do = Ext.getCmp('memoSalesOrder_do');
    memoSalesOrder_do.setValue('Delivery Order: ' + selectedRecord.get('no_sales_order'));

    Ext.getCmp('shipaddressSalesOrder_do').setValue(selectedRecord.get('shipaddress'));
    Ext.getCmp('comboxcurrencySalesOrder_do').setValue(selectedRecord.get('idcurrency'));

    var cb_tax_id_do = Ext.getCmp('cb_tax_id_do');
    cb_tax_id_do.getStore().load(function() {
        //  console.log('rate:'+selectedRecord.get('idtax'));
        // cb_tax_id_do.setValue(selectedRecord.get('idtax')*1);
        cb_tax_id_do.setValue(selectedRecord.get('idtax'));
        // cb_tax_id_do.setValue(1);
    });

    // cb_tax_id_do.setValue('12313');

    Ext.getCmp('subtotalSalesOrder_do').setValue(renderNomor(selectedRecord.get('subtotal')));
    Ext.getCmp('angkutSalesOrder_do').setValue(renderNomor(selectedRecord.get('freight')));
    Ext.getCmp('totalPajakSalesOrder_do').setValue(renderNomor(selectedRecord.get('tax')));
    Ext.getCmp('totalSalesOrder_do').setValue(renderNomor(selectedRecord.get('totalamount')));
    Ext.getCmp('pembayaranSalesOrder_do').setValue(renderNomor(selectedRecord.get('paidtoday')));
    Ext.getCmp('sisaBayarSalesOrder_do').setValue(renderNomor(selectedRecord.get('balance')));
    Ext.getCmp('angkutSalesOrder_do').setValue(renderNomor(selectedRecord.get('freight')));

    var cb_sales_order_status_do = Ext.getCmp('cb_sales_order_status_do');
    // alert(selectedRecord.get('status'))
    if (selectedRecord.get('status') * 1 == 6 || selectedRecord.get('status') * 1 == 7) {
        //status picking up dan partial
        Ext.getCmp('nojurnalDO_do').setReadOnly(true);
    } else {
        Ext.getCmp('nojurnalDO_do').setReadOnly(false);
        cb_sales_order_status_do.setValue(1);
        cb_sales_order_status_do.setReadOnly(true);
    }


    //insert item to grid
    Ext.Ajax.request({
        url: SITE_URL + 'sales/get_item_sales',
        method: 'GET',
        params: {
            idsales: selectedRecord.get('idsales')
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);

            var gridDO = Ext.getCmp('EntryDeliveryOrder');

            Ext.each(d.data, function(obj, i) {
                console.log(obj);

                var recDO = new GridItemDeliveryOrderModel({
                    idsalesitem: obj.idsalesitem,
                    idinventory: obj.idinventory,
                    invno: obj.invno,
                    nameinventory: obj.nameinventory,
                    warehouse_code: obj.warehouse_code,
                    price: obj.price * 1,
                    short_desc: obj.short_desc,
                    // assetaccount:obj.idsalesitem,
                    qty: obj.qty * 1,
                    disc: obj.disc * 1,
                    total: obj.total * 1,
                    ratetax: obj.ratetax * 1,
                    qtysisakirim: obj.qtysisakirim * 1,
                    qty_kirim: 1
                        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                });


                gridDO.getStore().insert(0, recDO);
            });
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });

}