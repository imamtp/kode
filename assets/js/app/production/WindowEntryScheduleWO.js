var WindowGridPicWOPopup = Ext.create(dir_sys + 'production.WindowGridPicWOPopup');

Ext.define('productionScheduleHeaderForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.productionScheduleHeaderForm',
    id: 'productionScheduleHeaderForm',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    url: SITE_URL + 'production/savewoschedule',
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

    items: [
    {
        xtype:'hiddenfield',
        name:'idsales',
        id:'idsales_schedulewoform'
    },
    {
        xtype:'hiddenfield',
        name:'job_order_id',
        id:'job_order_id_schedulewoform'
    },
    {
        xtype:'hiddenfield',
        name:'statusform',
        id:'statusform_schedulewoform'
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
                readOnly:true,
                labelWidth:140,
                allowBlank: false,
                name: 'no_sales_order',
                id:'no_sales_order_schedulewoform',
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
                name:'job_no',
                labelWidth:140,
                readOnly:true,
                id:'job_no_schedulewoform',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            insertNoRef(4, Ext.getCmp('cbUnitWOForm').getValue(), 'job_no_wo_form','WO');
                        });
                    }
                },
                anchor: '95%'
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [{
                xtype: 'comboxunit',
                name:'idunit',
                readOnly:true,
                id:'cbUnitWOForm'
            }, {
                xtype: 'datefield',
                readOnly:true,
                id: 'req_ship_date_schedulewoform',
                format: 'd/m/Y',
                fieldLabel: 'Req. Finish Date'
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [{
                    xtype: 'comboxWorkOrderStatus',
                    hidden:true,
                    readOnly:true,
                    id:'comboxWorkOrderStatus_schedulewoform'
                },
                {
                    xtype: 'textfield',
                    readOnly:true,
                    fieldLabel: 'Remarks',
                    id: 'remarks_schedulewoform'
                }
            ]
        }]
    },
         {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'datefield',
            items: [{
                // xtype: 'datefield',
                name: 'start_date',
                id: 'start_date_schedulewoform',
                labelWidth:140,
                format: 'd/m/Y H:m:s',
                fieldLabel: 'Start Date'
            },{
                name: 'end_date',
                id: 'end_date_schedulewoform',
                labelWidth:140,
                format: 'd/m/Y H:m:s',
                fieldLabel: 'Estimate Finish Time'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Person in Charge',
                labelWidth: 140,
                name: 'pic_name',
                id: 'pic_name_schedulewoform',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                                WindowGridPicWOPopup.show();

                                var GridPicWOPopupIDStore = Ext.getCmp('GridPicWOPopupID').getStore();
                                
                                GridPicWOPopupIDStore.on('beforeload',function(store, operation,eOpts){
                                    operation.params={
                                                'extraparams': 'a.status:'+1
                                    };
                                });
                                GridPicWOPopupIDStore.load();

                        });
                    }
                }
            },
            {
                xtype:'hiddenfield',
                name: 'pic_id',
                id: 'pic_id_schedulewoform',
            }]
        }
    // , {
    //     xtype: 'tabpanel',
    //     plain: true,
    //     activeTab: 0,
    //     defaults: {
    //         // bodyPadding: 10
    //     },
    //     items: [
    //         Ext.create(dir_sys + 'production.WorkOrderJobTab', {
    //             listeners: {
    //                 activate: function() {
    //                     // storeGridMemberSavingGrid.load();
    //                     // Ext.getCmp('GridMemberLoanGridID').getStore().load();
    //                 }
    //             }
    //         }),
    //         Ext.create(dir_sys + 'production.WorkOrderMaterialTab', {
    //             listeners: {
    //                 activate: function() {
    //                     // storeGridMemberSavingGrid.load();
    //                     // Ext.getCmp('GridMemberLoanGridID').getStore().load();
    //                 }
    //             }
    //         }),
    //         Ext.create(dir_sys + 'production.WorkOrderCostTab', {
    //             listeners: {
    //                 activate: function() {
    //                     // storeGridMemberSavingGrid.load();
    //                     // Ext.getCmp('GridMemberLoanGridID').getStore().load();
    //                 }
    //             }
    //         })
    //     ]
    // }
    ]
});



Ext.define(dir_sys + 'production.WindowEntryScheduleWO', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryScheduleWO',
    id: 'WindowEntryScheduleWO',
    title: 'Entry Schedule Production',
    header: {
        // titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    maximizable:true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW - 200,
    autoHeight:true,
    // height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'productionScheduleHeaderForm'
    }],
    buttons: [
    {
        text: 'Cancel',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('WindowEntryScheduleWO').hide();
        }
    },{
        text: 'Save Schedule',
        handler: function() {
            var storeGridItemJobWO = Ext.getCmp('WorkOrderJobTab').getStore();
            var ItemJobWOjson = Ext.encode(Ext.pluck(storeGridItemJobWO.data.items, 'data'));

            var WorkOrderMaterial = Ext.getCmp('WorkOrderMaterialTab').getStore();
            var ItemWOMaterialjson = Ext.encode(Ext.pluck(WorkOrderMaterial.data.items, 'data'));

            var formWO = Ext.getCmp('productionScheduleHeaderForm').getForm();
            if (formWO.isValid()) {
                formWO.submit({
                    // params:{
                    //     gridjob:ItemJobWOjson,
                    //     gridmaterial:ItemWOMaterialjson
                    // },
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('WindowEntryScheduleWO').hide();
                        Ext.getCmp('WOScheduleGrid').getStore().load();
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
    }, ]
});