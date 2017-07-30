var EntryReturnPO = Ext.create(dir_sys + 'purchase2.EntryReturnPO');
var WindowBatchItemListPoReturn = Ext.create(dir_sys + 'purchase2.WindowBatchItemListPoReturn');

// var rTabPanel = Ext.create('Ext.panel.Panel', {
//                     // hidden: true,
//                     // id: 'rTabPanel',
//                     // xtype: 'tabpanel',
//                     region: 'east',
//                     title: 'East Side',
//                     // dockedItems: [{
//                     //         dock: 'top',
//                     //         xtype: 'toolbar',
//                     //         items: ['->', {
//                     //                 xtype: 'button',
//                     //                 text: 'test',
//                     //                 tooltip: 'Test Button'
//                     //             }]
//                     //     }],
//                     animCollapse: true,
//                     // collapsible: true,
//                     split: true,
//                     width: 225, // give east and west regions a width
//                     minSize: 175,
//                     maxSize: 400,
//                     margins: '0 5 0 0',
//                     // activeTab: 0,
//                     // tabPosition: 'bottom',
//                     items: [Ext.create('Ext.grid.PropertyGrid', {
//                             // title: 'Property Grid',
//                             // closable: true,
//                             source: {
//                                 "(name)": "Properties Grid",
//                                 "grouping": false,
//                                 "autoFitColumns": true,
//                                 "productionQuality": false,
//                                 "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
//                                 "tested": false,
//                                 "version": 0.01,
//                                 "borderWidth": 1
//                             }
//                         })]
//                 });

Ext.define(dir_sys + 'purchase2.WindowEntryPOReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowEntryPOReturn',
    id: 'WindowEntryPOReturn',
    title: 'Entry Purchase Return',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    // closable: true,
    // autoDestroy: false,
    // modal: true,
    // closeAction: 'hide',
    // //    autoWidth: true,
    // width: panelW - 50,
    // autoHeight:true,
    // // height: sizeH,
    // layout: 'fit',
    // border: false,
    // items: [EntryReturnPO],

    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    // autoWidth: true,
    width: panelW - 50,
    // width:'100%',
    // autoHeight:true,
    height: sizeH,
    // layout: 'fit',
    // border: true,
    // items: [viewportporeturn],
    layout: 'border',
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: true,
        // bodyPadding: 15
    },
    items: [{
            title: 'Batch Item',
            // collapsed:true,
            region: 'south',
            // collapsible: false,
            // hidden:true,
            id: 'batch_item_panel',
            height: 250,
            minHeight: 175,
            maxHeight: 350,
            items: [{
                    xtype: 'GridBatchPoReturn'
                }]
                // html: 'Footer content'
                // items: [EntryReturnPO]
        },
        {
            title: 'Qty Return',
            collapsed: true,
            region: 'south',
            bodyPadding: 10,
            // collapsible: false,
            hidden: true,
            id: 'qtyreturn_item_panel',
            height: 80,
            // minHeight: 55,
            // maxHeight: 50,
            // items:[
            //     {
            //         xtype:'GridBatchGoodsReceipt'
            //     }
            // ]
            // html: 'Footer content'
            items: [{
                xtype: 'fieldcontainer',
                margins: '5 0 0 5',
                width: 800,
                layout: 'hbox',
                defaultType: 'textfield',

                fieldDefaults: {
                    labelAlign: 'left'
                },
                items: [{
                        // flex: 1,
                        xtype: 'numberfield',
                        width: 200,
                        id: 'qty_retur',
                        fieldLabel: 'Qty Retur',
                        allowBlank: false,
                        minValue: 1
                    },
                    //  {
                    //     width: 230,
                    //     id:'warehouse_id_qtyretur',
                    //     xtype: 'comboxWarehouse',
                    //     valueField: 'warehouse_id',
                    //     displayField: 'warehouse_code',
                    //     fieldLabel:'Warehouse',
                    //     margins: '0 0 0 5'
                    // }, 
                    {
                        // flex: 2,
                        width: 230,
                        xtype: 'textfield',
                        fieldLabel: 'Notes',
                        id: 'notes_qty_retur',
                        margins: '0 0 0 5'
                    },
                    {
                        text: 'Save',
                        margins: '0 0 0 5',
                        xtype: 'button',
                        handler: function() {
                            var qty_retur = Ext.getCmp('qty_retur').getValue();
                            var griditems = Ext.getCmp('EntryReturnPO');
                            var selectedRecord = griditems.getSelectionModel().getSelection()[0];

                            if (qty_retur * 1 > selectedRecord.data.qty * 1) {
                                Ext.Msg.alert('Failed', 'Kuantitas retur tidak boleh melebihi kuantitas order');
                            } else {
                                var item = Ext.encode(selectedRecord.data);

                                Ext.Ajax.request({
                                    url: SITE_URL + 'purchase/post_poreturn_item',
                                    method: 'POST',
                                    params: {
                                        purchase_return_id: Ext.getCmp('purchase_return_id_poreturn').getValue(),
                                        qty_retur: qty_retur,
                                        item: item,
                                        opsi: 'insert',
                                        notes: Ext.getCmp('notes_qty_retur').getValue(),
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);
                                        Ext.Msg.alert('Info', d.message);
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });
                            }
                            console.log(selectedRecord);

                            // this.up('form').getForm().isValid();
                        }
                    }
                ]
            }]
        },
        {
            // title: 'Main Content',
            collapsible: false,
            region: 'center',
            // margins: '5 0 0 0',
            items: [EntryReturnPO]
                // html: 'Main Page This is where the main content would go'
        },
        // rTabPanel
    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {

            // this.up('form').getForm().reset();
            Ext.getCmp('WindowEntryPOReturn').hide();

        }
    }, {
        text: 'Record Purchase Return',
        handler: function() {
            var storeEntryReturnPO = Ext.getCmp('EntryReturnPO').getStore();
            var storeGridBatchPoReturn = Ext.getCmp('GridBatchPoReturn').getStore();
            var ItemGRjson = Ext.encode(Ext.pluck(storeEntryReturnPO.data.items, 'data'));
            var itemBatchPoReturn = Ext.encode(Ext.pluck(storeGridBatchPoReturn.data.items, 'data'));


            Ext.Ajax.request({
                url: SITE_URL + 'purchase/save_return',
                method: 'POST',
                params: {
                    itemgrid: ItemGRjson,
                    itembatch: itemBatchPoReturn,
                    idunit: Ext.getCmp('cbUnit_poreturn').getValue(),
                    // idaccount_return: Ext.getCmp('idaccount_coa_retur_po').getValue(),
                    idpurchase: Ext.getCmp('idpurchase_poreturn').getValue(),
                    purchase_return_id: Ext.getCmp('purchase_return_id_poreturn').getValue(),
                    noreturn: Ext.getCmp('noreturn_poreturn').getValue(),
                    status: Ext.getCmp('cb_status_poreturn').getValue(),
                    ret_date: Ext.getCmp('return_date_poreturn').getSubmitValue()
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if (d.success) {
                        Ext.getCmp('WindowEntryPOReturn').hide();
                    } else {

                    }
                    Ext.Msg.alert('Info', d.message);
                    Ext.getCmp('PurchaseReturnGridID').getStore().load();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }
    }, ]
});