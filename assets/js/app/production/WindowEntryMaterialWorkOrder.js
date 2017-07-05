// var WindowSaleOrderWoList = Ext.create(dir_sys + 'production.WindowSaleOrderWoList');
// var WindowGridPicWOPopup = Ext.create(dir_sys + 'production.WindowGridPicWOPopup');
var MaterialWorkOrderJobTab = Ext.create(dir_sys + 'production.MaterialWorkOrderJobTab');
// var MaterialWorkOrderMaterialTab = Ext.create(dir_sys + 'production.MaterialWorkOrderMaterialTab');
// var MaterialWorkOrderCostTab = Ext.create(dir_sys + 'production.MaterialWorkOrderCostTab');

Ext.define('MaterialWorkOrderHeaderForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.MaterialWorkOrderHeaderForm',
    id: 'MaterialWorkOrderHeaderForm',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    url: SITE_URL + 'production/save_wo_materialusage',
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
            id: 'idsales_materialwoform'
        },
        {
            xtype: 'hiddenfield',
            name: 'job_order_id',
            id: 'job_order_id_materialwoform'
        },
        {
            xtype: 'hiddenfield',
            name: 'token_tmp',
            id: 'token_tmp_materialwoform'
        },
        {
            xtype: 'hiddenfield',
            name: 'statusform',
            id: 'statusform_materialwoform'
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
                    xtype: 'radiogroup',
                    labelWidth: 140,
                    id: 'RGWoMaterialEntry',
                    readOnly: true,
                    // labelWidth:220,
                    fieldLabel: 'Load from SO?',
                    // columns: 2,
                    vertical: true,
                    items: [
                        { boxLabel: 'Yes', name: 'is_from_so', inputValue: 1, width: 50 },
                        { boxLabel: 'No', name: 'is_from_so', inputValue: 2, checked: true, width: 50 }
                    ],
                    listeners: {
                        change: function(radiogroup, radio) {
                            if (radio.is_from_so == 2) {
                                Ext.getCmp('no_sales_order_materialwoform').hide();
                                Ext.getCmp('customer_materialwoform').hide();
                            } else {
                                Ext.getCmp('no_sales_order_materialwoform').show();
                                Ext.getCmp('customer_materialwoform').show();
                            }
                        }
                    }
                }, {
                    fieldLabel: 'No. Work Order #',
                    labelWidth: 140,
                    name: 'job_no',
                    readOnly: true,
                    id: 'job_no_materialwo_form',
                    anchor: '95%'
                }, {
                    xtype: 'datefield',
                    labelWidth: 140,
                    anchor: '95%',
                    readOnly: true,
                    name: 'req_ship_date',
                    format: 'd/m/Y',
                    fieldLabel: 'Req. Finish Date'
                }]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                        fieldLabel: 'Sales Order',
                        readOnly: true,
                        name: 'no_sales_order',
                        hidden: true,
                        id: 'no_sales_order_materialwoform'
                    }, {
                        xtype: 'comboxunit',
                        name: 'idunit',
                        readOnly: true,
                        id: 'cbUnitMaterialWOForm'
                    },
                    {
                        xtype: 'textfield',
                        readOnly: true,
                        fieldLabel: 'Remarks',
                        name: 'remarks'
                    },
                    {
                        xtype: 'textfield',
                        readOnly: true,
                        fieldLabel: 'Customer',
                        id: 'customer_materialwoform',
                    }
                ]
            }, {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [
                    // {
                    //         xtype: 'comboxWorkOrderStatus',
                    //         name:'status',
                    //         id:'comboxMaterialWorkOrderStatus'
                    //     }
                ]
            }]
        },
        {
            xtype: 'container',
            id: 'containerScheduleWo',
            flex: 1,
            layout: 'anchor',
            defaultType: 'datefield',
            items: [{
                    // xtype: 'datefield',
                    name: 'startdate_job',
                    hidden: true,
                    id: 'start_date_materialwoform',
                    labelWidth: 140,
                    anchor: '32%',
                    format: 'd/m/Y H:m:s',
                    fieldLabel: 'Start Date'
                }, {
                    name: 'enddate_job',
                    hidden: true,
                    id: 'end_date_materialwoform',
                    labelWidth: 140,
                    anchor: '32%',
                    format: 'd/m/Y H:m:s',
                    fieldLabel: 'Estimate Finish Time'
                },
                // {
                //     xtype: 'textfield',
                //     fieldLabel: 'Person in Charge',
                //     labelWidth: 140,
                //     name: 'pic_name',
                //     id: 'pic_name_materialwoform'
                // },
                {
                    xtype: 'hiddenfield',
                    name: 'pic_id',
                    id: 'pic_id_materialwoform',
                }
            ]
        }, {
            xtype: 'tabpanel',
            plain: true,
            activeTab: 0,
            defaults: {
                // bodyPadding: 10
            },
            items: [{
                    xtype: 'containerMaterialFinishedGoods'
                },
                // MaterialWorkOrderJobTab,
                // MaterialWorkOrderMaterialTab,
                // MaterialWorkOrderCostTab
                // Ext.create(dir_sys + 'production.MaterialWorkOrderJobTab', {
                //     listeners: {
                //         activate: function() {
                //             // storeGridMemberSavingGrid.load();
                //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                //         }
                //     }
                // }),
                // Ext.create(dir_sys + 'production.MaterialWorkOrderMaterialTab', {
                //     listeners: {
                //         activate: function() {
                //             // storeGridMemberSavingGrid.load();
                //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
                //         }
                //     }
                // }),
                // Ext.create(dir_sys + 'production.MaterialWorkOrderCostTab', {
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



Ext.define(dir_sys + 'production.WindowEntryMaterialWorkOrder', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryMaterialWorkOrder',
    id: 'WindowEntryMaterialWorkOrder',
    title: 'Material Usage Work Order',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW - 200,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'MaterialWorkOrderHeaderForm'
    }],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('WindowEntryMaterialWorkOrder').hide();
        }
    }, {
        text: 'Save Material Usage',
        id: 'btnSaveMaterialUsageWo',
        handler: function() {

            var WorkOrderMaterialUsageTabStore = Ext.getCmp('WorkOrderMaterialUsageTab').getStore();
            var ItemWOMaterialjson = Ext.encode(Ext.pluck(WorkOrderMaterialUsageTabStore.data.items, 'data'));

            var formWO = Ext.getCmp('MaterialWorkOrderHeaderForm').getForm();
            if (formWO.isValid()) {
                formWO.submit({
                    params: {
                        gridmaterial: ItemWOMaterialjson
                    },
                    success: function(form, action) {

                        Ext.getCmp('MaterialWorkOrderHeaderForm').getForm().reset();

                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('WindowEntryMaterialWorkOrder').hide();

                        Ext.getCmp('WOMaterialUsageGrid').getStore().load();

                        Ext.getCmp('WindowMaterialUsageWOList').hide();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            } else {
                console.log(formWO.query("field{isValid()==false}"));
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }, ]
});