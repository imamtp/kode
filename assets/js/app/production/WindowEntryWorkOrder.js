var WindowSaleOrderWoList = Ext.create(dir_sys + 'production.WindowSaleOrderWoList');
var WindowGridPicWOPopup = Ext.create(dir_sys + 'production.WindowGridPicWOPopup');
var WorkOrderJobTab = Ext.create(dir_sys + 'production.WorkOrderJobTab');
// var WorkOrderMaterialTab = Ext.create(dir_sys + 'production.WorkOrderMaterialTab');
var WorkOrderCostTab = Ext.create(dir_sys + 'production.WorkOrderCostTab');

Ext.define('workOrderHeaderForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.workOrderHeaderForm',
    id: 'workOrderHeaderForm',
    // width: 760,
    // title: 'Detail',
    // height: 410,
    url: SITE_URL + 'production/savewo',
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
        id:'idsales_woform'
    },
    {
        xtype:'hiddenfield',
        name:'job_order_id',
        id:'job_order_id_woform'
    },
    {
        xtype:'hiddenfield',
        name:'token_tmp',
        id:'token_tmp_woform'
    },
    {
        xtype:'hiddenfield',
        name:'statusform',
        id:'statusform_woform'
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
            items: [
                {
                    xtype: 'radiogroup',
                    labelWidth:140,
                    // labelWidth:220,
                    fieldLabel: 'Load from SO?',
                    // columns: 2,
                    vertical: true,
                    items: [
                        {boxLabel: 'Yes', name: 'is_from_so', inputValue: 1,  width:50},
                        {boxLabel: 'No', name: 'is_from_so', inputValue: 2, checked: true, width:50}
                    ],
                    listeners: {
                      change: function(radiogroup, radio) {
                        if(radio.is_from_so==2)
                        {
                            Ext.getCmp('no_sales_order_woform').hide();
                        } else {
                            Ext.getCmp('no_sales_order_woform').show();
                        }
                      }
                    }
                },{
                fieldLabel: 'No. Work Order #',
                labelWidth:140,
                name:'job_no',
                id:'job_no_wo_form',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            insertNoID(4, Ext.getCmp('cbUnitWOForm').getValue(),'job_order_id','job_order','job_no_wo_form','WO');
                            // insertNoRef(4, Ext.getCmp('cbUnitWOForm').getValue(), 'job_no_wo_form','WO');
                        });
                    }
                },
                anchor: '95%'
            }, {
                xtype: 'datefield',
                labelWidth:140,
                anchor: '95%',
                name: 'req_ship_date',
                format: 'd/m/Y',
                fieldLabel: 'Req. Finish Date'
            }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [
            {
                fieldLabel: 'Sales Order',
                name: 'no_sales_order',
                hidden:true,
                id:'no_sales_order_woform',
                // anchor: '95%',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                                WindowSaleOrderWoList.show();
                                
                                // storeGridSalesQuoteList.on('beforeload',function(store, operation,eOpts){
                                //     operation.params={
                                //                 'idunit': Ext.getCmp('idunitRequisition').getValue(),
                                //                 'status': '1'
                                //     };
                                // });
                                storeGridSalesOrderWOList.load();

                        });
                    }
                }
            }, {
                xtype: 'comboxunit',
                name:'idunit',
                id:'cbUnitWOForm'
            },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Remarks',
                    name: 'remarks'
                }]
        }, {
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [{
                    xtype: 'comboxWorkOrderStatus',
                    name:'status',
                    id:'comboxWorkOrderStatus_woform'
                }
            ]
        }]
    },
    {
            xtype: 'container',
            id:'containerScheduleWo',
            flex: 1,
            layout: 'anchor',
            defaultType: 'datefield',
            items: [{
                // xtype: 'datefield',
                name: 'start_date',
                id: 'start_date_schedulewoform',
                labelWidth:140,
                anchor: '32%',
                format: 'd/m/Y H:m:s',
                fieldLabel: 'Start Date'
            },{
                name: 'end_date',
                id: 'end_date_schedulewoform',
                labelWidth:140,
                anchor: '32%',
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
        }, {
        xtype: 'tabpanel',
        plain: true,
        activeTab: 0,
        defaults: {
            // bodyPadding: 10
        },
        items: [
            {
                xtype:'containerFinishedGoods'
            },
            // WorkOrderJobTab,
            // WorkOrderMaterialTab,
            WorkOrderCostTab
            // Ext.create(dir_sys + 'production.WorkOrderJobTab', {
            //     listeners: {
            //         activate: function() {
            //             // storeGridMemberSavingGrid.load();
            //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
            //         }
            //     }
            // }),
            // Ext.create(dir_sys + 'production.WorkOrderMaterialTab', {
            //     listeners: {
            //         activate: function() {
            //             // storeGridMemberSavingGrid.load();
            //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
            //         }
            //     }
            // }),
            // Ext.create(dir_sys + 'production.WorkOrderCostTab', {
            //     listeners: {
            //         activate: function() {
            //             // storeGridMemberSavingGrid.load();
            //             // Ext.getCmp('GridMemberLoanGridID').getStore().load();
            //         }
            //     }
            // })
        ]
    }]
});



Ext.define(dir_sys + 'production.WindowEntryWorkOrder', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryWorkOrder',
    id: 'WindowEntryWorkOrder',
    title: 'Entry Work Order',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW - 100,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'workOrderHeaderForm'
    }],
    buttons: [
    {
        text: 'Cancel',
        handler: function() {
            // this.up('form').getForm().reset();
            Ext.getCmp('WindowEntryWorkOrder').hide();
        }
    },{
        text: 'Save Work Order',
        id:'btnSaveWo',
        handler: function() {
            // updateGridJobWO();

            var storeGridItemJobWO = Ext.getCmp('WorkOrderJobTab').getStore();
            var ItemJobWOjson = Ext.encode(Ext.pluck(storeGridItemJobWO.data.items, 'data'));

            // var WorkOrderMaterial = Ext.getCmp('WorkOrderMaterialTab').getStore();
            // var ItemWOMaterialjson = Ext.encode(Ext.pluck(WorkOrderMaterial.data.items, 'data'));

            var GridItemProdCostPopup = Ext.getCmp('GridItemProdCostPopup').getStore();
            var GridItemProdCostPopupJson = Ext.encode(Ext.pluck(GridItemProdCostPopup.data.items, 'data'));

            var formWO = Ext.getCmp('workOrderHeaderForm').getForm();
            // // console.log(formWO);
            // // console.log(formWO.query("field{isValid()==false}"));
            // if (formWO.isValid()) {
                formWO.submit({
                    params:{
                        token_tmp:Ext.getCmp('token_tmp_woform').getValue(),
                        // gridjob:ItemJobWOjson,
                        // gridmaterial:ItemWOMaterialjson,
                        // gridcost:GridItemProdCostPopupJson
                    },
                    success: function(form, action) {
                       //  if ("undefined" !== typeof  Ext.getCmp('WorkOrderGrid').getStore()) {
                       //       Ext.getCmp('WorkOrderGrid').getStore().load();
                       //  }

                       // if ("undefined" !== typeof  Ext.getCmp('WOScheduleGrid').getStore()) {
                       //       Ext.getCmp('WOScheduleGrid').getStore().load();
                       //  }
                        

                        // Ext.getCmp('workOrderHeaderForm').getForm().reset();

                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('WindowEntryWorkOrder').hide();
                       
                        Ext.getCmp('WorkOrderGrid').getStore().load();
                        // storeGridCustomer.load();
                    },
                    failure: function(form, action) {
                        console.log(form);
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
        
        // var formData = formWO.getFieldValues();
        // Ext.Ajax.request({
        //     url: SITE_URL + 'production/savewo',
        //     method: 'POST',
        //     params: {
        //         token_tmp:Ext.getCmp('token_tmp_woform').getValue(),
        //         formdata: Ext.encode(formData)
        //         // gridjob:ItemJobWOjson,
        //         // gridmaterial:ItemWOMaterialjson,
        //         // gridcost:GridItemProdCostPopupJson
        //     },
        //     success: function(form, action) {
        //         // var d = Ext.decode(form.responseText);
        //           Ext.getCmp('workOrderHeaderForm').getForm().reset();

        //             Ext.Msg.alert('Success', action.result.message);
        //             Ext.getCmp('WindowEntryWorkOrder').hide();
                   
        //             Ext.getCmp('WorkOrderGrid').getStore().load();
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        //     }
        // });
            // } else {
            //     var invalidFields = [];
            //     // Ext.suspendLayouts();
            //     formWO.getFields().filterBy(function(field) {
            //         if (field.validate()) return;
            //         invalidFields.push(field); console.log(field)
            //     });
            //     console.log(invalidFields)
            //     Ext.Msg.alert("Error!", invalidFields);
            // }
        }
    }, ]
});

