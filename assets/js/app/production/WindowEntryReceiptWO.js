var WindowGridApprovedByWOPopup = Ext.create(dir_sys + 'production.WindowGridApprovedByWOPopup');
var ReceiptWorkOrderJobTab = Ext.create(dir_sys + 'production.ReceiptWorkOrderJobTab');
var ReceiptWorkOrderMaterialTab = Ext.create(dir_sys + 'production.ReceiptWorkOrderMaterialTab');
// var ReceiptWorkOrderCostTab = Ext.create(dir_sys+'production.ReceiptWorkOrderCostTab');

Ext.define('receiptWoHeaderForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.receiptWoHeaderForm',
    id: 'receiptWoHeaderForm',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    url: SITE_URL + 'production/saveworeceipt',
    bodyStyle: 'padding:5px',
    forceFit: true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 120,
        width: 340
    },
    bodyPadding: 5,
    width: 600,
    defaults: {
        anchor: '100%'
    },

    items: [{
            xtype: 'hiddenfield',
            name: 'idsales',
            id: 'idsales_receiptwoform'
        },
        {
            xtype: 'hiddenfield',
            name: 'job_order_id',
            id: 'job_order_id_receiptwoform'
        },
        {
            xtype: 'hiddenfield',
            name: 'statusform',
            id: 'statusform_receiptwoform'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                border: false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Sales Order',
                    readOnly: true,
                    labelWidth: 140,
                    // allowBlank: false,
                    name: 'no_sales_order',
                    id: 'no_sales_order_receiptwoform',
                    anchor: '95%',
                    // listeners: {
                    //     render: function(component) {
                    //         component.getEl().on('click', function(event, el) {
                    //                 WindowSaleOrderWoList.show();

                    //                 // storeGridSalesQuoteList.on('beforeload',function(store, operation,eOpts){
                    //                 //     operation.params={
                    //                 //                 'idunit': Ext.getCmp('idunitRequisition').getValue(),
                    //                 //                 'status': '1'
                    //                 //     };
                    //                 // });
                    //                 storeGridSalesOrderWOList.load();

                    //         });
                    //     }
                    // }
                }, {
                    fieldLabel: 'No. Work Order #',
                    name: 'job_no',
                    labelWidth: 140,
                    readOnly: true,
                    id: 'job_no_receiptwoform',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                insertNoRef(4, Ext.getCmp('cbUnitWOForm').getValue(), 'job_no_wo_form', 'WO');
                            });
                        }
                    },
                    anchor: '95%'
                }, {
                    // xtype: 'datefield',
                    name: 'start_date',
                    id: 'start_date_receiptwoform',
                    labelWidth: 140,
                    format: 'd/m/Y H:m:s',
                    fieldLabel: 'Start Date'
                }, {
                    name: 'end_date',
                    id: 'end_date_receiptwoform',
                    labelWidth: 140,
                    format: 'd/m/Y H:m:s',
                    fieldLabel: 'Estimate Finish Time'
                }]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                        xtype: 'comboxunit',
                        name: 'idunit',
                        readOnly: true,
                        id: 'cbUnit_receiptwoform'
                    }, {
                        xtype: 'datefield',
                        readOnly: true,
                        id: 'req_ship_date_receiptwoform',
                        format: 'd/m/Y',
                        fieldLabel: 'Req. Finish Date'
                    },
                    {
                        xtype: 'datefield',
                        name: 'finished_date',
                        id: 'finished_date_receiptwoform',
                        // labelWidth:140,
                        format: 'd/m/Y',
                        fieldLabel: 'Finished Date'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Person in Charge',
                        readOnly: true,
                        // labelWidth: 140,
                        name: 'pic_name',
                        id: 'pic_name_receiptwoform',
                        // listeners: {
                        //     render: function(component) {
                        //         component.getEl().on('click', function(event, el) {
                        //                 WindowGridPicWOPopup.show();

                        //                 var GridPicWOPopupIDStore = Ext.getCmp('GridPicWOPopupID').getStore();

                        //                 GridPicWOPopupIDStore.on('beforeload',function(store, operation,eOpts){
                        //                     operation.params={
                        //                                 'extraparams': 'a.status:'+1
                        //                     };
                        //                 });
                        //                 GridPicWOPopupIDStore.load();

                        //         });
                        //     }
                        // }
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                        xtype: 'comboxWorkOrderStatus',
                        // readOnly:true,
                        name: 'status',
                        id: 'comboxWorkOrderStatus_receiptwoform'
                    },
                    {
                        xtype: 'textfield',
                        readOnly: true,
                        fieldLabel: 'Remarks',
                        id: 'remarks_receiptwoform'
                    },
                    {
                        xtype: 'datefield',
                        name: 'receiptdate',
                        id: 'receiptdate_receiptwoform',
                        format: 'd/m/Y',
                        fieldLabel: 'Receipt Date'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Approved By',
                        // readOnly:true,
                        // labelWidth: 140,
                        name: 'approve_name',
                        id: 'approve_name_receiptwoform',
                        listeners: {
                            render: function(component) {
                                component.getEl().on('click', function(event, el) {
                                    WindowGridApprovedByWOPopup.show();

                                    var GridApprovedByWOPopupIDStore = Ext.getCmp('GridApprovedByWOPopupID').getStore();

                                    GridApprovedByWOPopupIDStore.on('beforeload', function(store, operation, eOpts) {
                                        operation.params = {
                                            'extraparams': 'a.status:' + 1
                                        };
                                    });
                                    GridApprovedByWOPopupIDStore.load();

                                });
                            }
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'approvedby_id',
                        id: 'approvedby_id_receiptwoform',
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Customer',
                        id: 'customer_receiptwoform',
                        readOnly: true
                    },
                ]
            }]
        }, {
            xtype: 'tabpanel',
            plain: true,
            activeTab: 0,
            defaults: {
                // bodyPadding: 10
            },
            items: [
                Ext.define('ReceiptWOContainer', {
                    extend: 'Ext.container.Container',
                    alias: 'widget.ReceiptWOContainer',
                    id: 'ReceiptWOContainer',
                    title: 'Finished Goods',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'start',
                    },
                    items: [{
                            xtype: 'ReceiptWorkOrderJobTab',
                            minHeight: 250
                        },
                        ReceiptWorkOrderMaterialTab
                    ]
                }),
                // ReceiptWorkOrderJobTab,
                // ReceiptWorkOrderMaterialTab,
                // ReceiptWorkOrderCostTab
                // Ext.create(dir_sys + 'production.ReceiptWorkOrderJobTab', {
                //     listeners: {
                //         activate: function() {
                //             // storeGridMemberSavingGrid.load();
                //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                //         }
                //     }
                // }),
                // Ext.create(dir_sys + 'production.ReceiptWorkOrderMaterialTab', {
                //     listeners: {
                //         activate: function() {
                //             // storeGridMemberSavingGrid.load();
                //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                //         }
                //     }
                // }),
                // Ext.create(dir_sys + 'production.ReceiptWorkOrderCostTab', {
                //     listeners: {
                //         activate: function() {
                //             // storeGridMemberSavingGrid.load();
                //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                //         }
                //     }
                // })
            ]
        }
    ]
});



Ext.define(dir_sys + 'production.WindowEntryReceiptWO', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryReceiptWO',
    id: 'WindowEntryReceiptWO',
    title: 'Entry Receipt Production',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW - 50,
    height: sizeH,
    // height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'receiptWoHeaderForm'
    }],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('WindowEntryReceiptWO').hide();
        }
    }, {
        text: 'Record Receipt Production',
        id: 'btnRecordReceiptWo',
        handler: function() {

            if (validasiReceiptWO()) {
                var ReceiptWorkOrderJobTabStore = Ext.getCmp('ReceiptWorkOrderJobTab').getStore();
                var ReceiptWorkOrderJobTabData = Ext.encode(Ext.pluck(ReceiptWorkOrderJobTabStore.data.items, 'data'));

                var ReceiptWorkOrderMaterialTabStore = Ext.getCmp('ReceiptWorkOrderMaterialTab').getStore();
                var ReceiptWorkOrderMaterialTabData = Ext.encode(Ext.pluck(ReceiptWorkOrderMaterialTabStore.data.items, 'data'));

                // var ReceiptWorkOrderCostTabStore = Ext.getCmp('ReceiptWorkOrderCostTab').getStore();
                // var ReceiptWorkOrderCostTabData = Ext.encode(Ext.pluck(ReceiptWorkOrderCostTabStore.data.items, 'data'));

                // var GridBatchMaterialWoReceiptStore = Ext.getCmp('GridBatchMaterialWoReceipt').getStore();
                // var GridBatchMaterialWoReceiptStoreData = Ext.encode(Ext.pluck(GridBatchMaterialWoReceiptStore.data.items, 'data'));

                var formWO = Ext.getCmp('receiptWoHeaderForm').getForm();
                if (formWO.isValid()) {
                    formWO.submit({
                        params: {
                            gridjob: ReceiptWorkOrderJobTabData,
                            gridmaterial: ReceiptWorkOrderMaterialTabData,
                            // gridcost:ReceiptWorkOrderCostTabData,
                            // gridbatch:GridBatchMaterialWoReceiptStoreData
                        },
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.message);
                            Ext.getCmp('WindowEntryReceiptWO').hide();
                            Ext.getCmp('ReceiptWOGrid').getStore().load();
                            // storeGridCustomer.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }

        }
    }, ]
});


function validasiReceiptWO() {
    // alert(Ext.getCmp('receiptdate_receiptwoform').getValue());
    var receiptdate = Ext.getCmp('receiptdate_receiptwoform').getValue();

    if (Ext.getCmp('finished_date_receiptwoform').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan Tangal Selesai');

    } else if (Ext.getCmp('approvedby_id_receiptwoform').getValue() == '') {
        Ext.Msg.alert('Failed', 'Tentukan petugas yang menyetujui');
    } else if (receiptdate == '' || receiptdate == null) {
        Ext.Msg.alert('Failed', 'Tentukan tanggal penerimaan');
    } else {
        var ReceiptWorkOrderJobTabStore = Ext.getCmp('ReceiptWorkOrderJobTab').getStore();

        var is_whcode_acc_null = false;
        var is_whcode_reject_null = false;
        var is_whcode_sisa_null = false;

        var total_qtysisa_fg = 0;
        var total_qtyaccept_fg = 0;
        var total_qtyreject_fg = 0;
        var total_qtyorder_fg = 0;
        Ext.each(ReceiptWorkOrderJobTabStore.data.items, function(obj, i) {
            total_qtysisa_fg += obj.data.qty_sisa * 1;
            total_qtyaccept_fg += obj.data.qty_accept * 1;
            total_qtyreject_fg += obj.data.qty_reject * 1;
            total_qtyorder_fg += obj.data.qty * 1;
            if (obj.data.warehouse_code_accept == null) is_whcode_acc_null = true;
            if (obj.data.warehouse_code_reject == null && (obj.data.qty_reject * 1) > 0) is_whcode_reject_null = true;
            if (obj.data.warehouse_code_sisa == null && (obj.data.qty_sisa * 1) > 0) is_whcode_sisa_null = true;
        });
        var total = total_qtyreject_fg + total_qtyaccept_fg;
        if (total_qtyorder_fg !== total) {
            //sisa penerimaan finished goodsnya belum kosong
            Ext.Msg.alert('Failed', 'Kuantitas sisa penerimaan finished goods harus bernilai kosong / 0');
        } else if (is_whcode_acc_null || is_whcode_reject_null || is_whcode_sisa_null) {
            Ext.Msg.alert('Failed', 'Data gagal disimpan. Tentukan kode gudang terlebih dahulu!');
        } else {
            return true;
        }

    }
}