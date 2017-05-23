var gridPurchaseItems = Ext.create('Ext.grid.Panel', {
    title: 'Purchase Item',
    border: true,
    itemId: 'gridPurchaseItems',
    store: Ext.create('Ext.data.Store', {
        fields: ['idpurchaseitem','idinventory','invno','nameinventory','unit','cost','qty','ratetax','total', 'remarks', 'assetaccount'],
        listeners: {
            datachanged: function(store, eOpts){
                formPurchase.fireEvent('afterEdit');
            }
        }
    }),
    loadMask: true,
    width: 480,
    height: 200,
    columns:[
        {header: 'No', xtype: 'rownumberer', width: 40, sortable: false}, 
        {header: 'idinventory', hidden: true, dataIndex: 'idinventory'}, 
        {header: 'Item Code', dataIndex: 'invno', width: 100}, 
        {header: 'Item Name', dataIndex: 'nameinventory', width: 150}, 
        {header: 'Ordered Qty', width: 100, dataIndex: 'qty', align: 'right',xtype: 'numbercolumn',}, 
        {header: 'Unit', dataIndex: 'unitmeasure', width: 80}, 
    ]
});

var gridGoodsRecieved = Ext.create('Ext.grid.Panel', {
    title: 'Goods Received',
    border: true,
    id: 'gridGoodsRecievedID',
    itemId: 'gridGoodsRecievedID',
    alias: 'widget.GridGoodsReceipt',
    store: Ext.create('Ext.data.Store', {
        fields: ['idgoodsreceived','idgoodsreceipt','idinventory','invno', 'label', 'qty', 'remarks', 'batchcode'],
        listeners: {
            datachanged: function(store, eOpts){
                // gridGoodsRecieved.fireEvent('afterEdit');
            }
        }
    }),
    selType: 'cellmodel',
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            edit: function(editor, e, eOpts){
                // gridGoodsRecieved.fireEvent('afterEdit');
            }
        }
    },
    // autoScroll: true,
    loadMask: true,
    width: 480,
    height: 200,
    columns: [
        {header: 'No', xtype: 'rownumberer', width: 40, sortable: false}, 
        {header: 'idgoodsreceipt', hidden: true, dataIndex: 'idgoodsreceipt'}, 
        {header: 'idgoodsreceived', hidden: true, dataIndex: 'idgoodsreceived'}, 
        {header: 'idinventory', hidden: true, dataIndex: 'idinventory'}, 
        {header: 'Item Code', dataIndex: 'invno', width: 100},
        {header: 'Label', dataIndex: 'label', width: 150},
        {header: 'Received Qty', dataIndex: 'qty', width: 100, xtype: 'numbercolumn', editor:{
            xtype: 'numberfield', minValue:1, allowBlank:false
        }},
        {header: 'Remarks', dataIndex: 'remarks', width: 200, flex:1, edit:{
            xtype: 'textfield'
        }},
    ],
});

var formGoodsReceipt = Ext.create('Ext.panel.Panel', {
    width: 1000,
    height: 500,
    layout: {
        type: 'hbox',
        align: 'top',
    },
    items: [
        gridPurchaseItems,
        {
            xtype: 'tbspacer',
            flex:1
        },
        gridGoodsRecieved,
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            fieldDefaults: {
                labelWidth: 55,
                width: 200,
            },
            items:[
                {
                    xtype: 'textfield',
                    itemId: 'noorder',
                    fieldLabel: 'No Order',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                //no action if disabled
                                if(formGoodsReceipt.queryById('noorder').isDisabled()) return false;
                                
                                storeChooserListPurchase.on('beforeload',function(store,operation,eOpts){
                                    // operation.params={extraparams: 'a.status: 1, a.deleted: 0, a.idpurchasestatus:5'};
                                     operation.params={extraparams: 'a.status: 1, a.deleted: 0, a.idpurchasetype:2'};
                                });
                                ChooserListPurchase.target = formGoodsReceipt;
                                ChooserListPurchase.show();
                            });
                        },
                    },
                },
                {
                    xtype: 'textfield',
                    itemId: 'requestdate',
                    fieldLabel: 'Request Date',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'supplier',
                    fieldLabel: 'Supplier',
                    format: 'd/m/Y',
                    readOnly: true,
                },
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            fieldDefaults: {
                labelWidth: 55,
                width: 200,
            },
            items:[
                {
                    xtype: 'textfield',
                    itemId: 'noreciept',
                    fieldLabel: 'No Receipt',
                    readOnly: true,
                },
                {
                    xtype: 'datefield',
                    itemId: 'delivereddate',
                    fieldLabel: 'Delivered Date',
                },
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items:['->'],
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items:[
                '->',
                {
                    text: 'Save',
                    itemId: 'btnSave',
                    width: 80,
                },
                {
                    text: 'Cancel',
                    itemId: 'btnCancel',
                    width: 80,
                },
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            iconCls: 'disk',
            fieldDefaults: {
                labelWidth: 55,
                width: 200,
            },
            items:[
                {
                    xtype: 'textarea',
                    itemId: 'remarks',
                    fieldLabel: 'Remarks',
                    width: 400,
                },
            ]
        },
    ],
    listeners: {
        'selectPurchase': function(data){
            formGoodsReceipt.idpurchase = data['idpurchase'];
            formGoodsReceipt.idsupplier = data['idsupplier'];
            formGoodsReceipt.queryById('noorder').setValue(data['nopurchase']);
            formGoodsReceipt.queryById('requestdate').setValue(data['requestdate']);
            formGoodsReceipt.queryById('supplier').setValue(data['namesupplier']);
        },
    }
});

var FormGoodsReceipt = Ext.create('widget.window', {
    title: 'Form Goods Receipt',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    padding: '5',
    items: [formGoodsReceipt],
    listeners:{
        'show': function(win){
            // var form = formGoodsReceipt;
            // if(win.mode == 'requisition' && win.statusform == 'input'){
            //     win.setTitle('GoodsReceipt Requisition');
            //     //filter combox purchase status
            //     form.queryById('idpurchasestatus').getStore().filter([
            //         {filterFn: function(item){return item.get('idpurchasestatus') < 3}}
            //     ]);
            //     form.queryById('idpurchasestatus').setValue('2');
            // }
            // else if(win.mode == 'requisition' && win.statusform == 'edit'){
            //     win.setTitle('GoodsReceipt Requisition');
            //     form.fireEvent('load', win.purchase);
            //     if(win.purchase.data.idpurchasestatus >= 3){
            //         form.queryById('idunit').setDisabled(true);
            //         form.queryById('supplier').setDisabled(true);
            //         form.queryById('project').setDisabled(true);
            //         form.queryById('noorder').setDisabled(true);
            //         form.queryById('requestdate').setDisabled(true);
            //         form.queryById('idpurchasetype').setDisabled(true);
            //         form.queryById('netddays').setDisabled(true);
            //         form.queryById('neteomddays').setDisabled(true);
            //         form.queryById('discount').setDisabled(true);
            //         form.queryById('netdmax').setDisabled(true);
            //         form.queryById('idcurrency').setDisabled(true);
            //         form.queryById('idshipping').setDisabled(true);
            //         form.queryById('shipaddress').setDisabled(true);
            //         form.queryById('notes').setDisabled(true);
            //         form.queryById('idpurchasestatus').setDisabled(true);
            //         form.queryById('btnAdd').setDisabled(true);
            //         form.queryById('btnSave').setDisabled(true);
            //         form.queryById('colAct').hide();
            //     }
            // }
            // else if(win.mode != 'requisition' && win.statusform == 'input'){
            //     //filter combox purchase status
            //     form.queryById('idpurchasestatus').getStore().filter([
            //         {filterFn: function(item){return [1,5].includes(parseInt(item.get('idpurchasestatus')))}}
            //     ]);
            //     form.queryById('idpurchasestatus').setValue('5');
            // }
            // else if(win.mode != 'requisition' && win.statusform == 'edit'){
                
            //     form.fireEvent('load', win.purchase);
            //     if(win.purchase.data.idpurchasestatus >= 4){
            //         form.queryById('idunit').setDisabled(true);
            //         form.queryById('supplier').setDisabled(true);
            //         form.queryById('project').setDisabled(true);
            //         form.queryById('noorder').setDisabled(true);
            //         form.queryById('requestdate').setDisabled(true);
            //         form.queryById('idpurchasestatus').setDisabled(true);
            //         form.queryById('idpurchasetype').setDisabled(true);
            //         form.queryById('netddays').setDisabled(true);
            //         form.queryById('neteomddays').setDisabled(true);
            //         form.queryById('discount').setDisabled(true);
            //         form.queryById('netdmax').setDisabled(true);
            //         form.queryById('idcurrency').setDisabled(true);
            //         form.queryById('idshipping').setDisabled(true);
            //         form.queryById('shipaddress').setDisabled(true);
            //         form.queryById('notes').setDisabled(true);
            //         form.queryById('btnAdd').setDisabled(true);
            //         form.queryById('btnSave').setDisabled(true);
            //         form.queryById('colAct').hide();
            //     }
            //     else if(win.purchase.data.idpurchasestatus >= 2){
            //         form.queryById('idunit').setDisabled(true);
            //         form.queryById('supplier').setDisabled(true);
            //         form.queryById('project').setDisabled(true);
            //         form.queryById('requestdate').setDisabled(true);
                    
            //         //filter combox purchase status
            //         form.queryById('idpurchasestatus').getStore().filter([
            //             {filterFn: function(item){return [3,4,5].includes(parseInt(item.get('idpurchasestatus')))}}
            //         ]);
            //         form.queryById('idpurchasestatus').setValue('3');
            //     }
            //     else if(win.purchase.data.idpurchasestatus == 1){
            //         //filter combox purchase status
            //         form.queryById('idpurchasestatus').getStore().filter([
            //             {filterFn: function(item){return [1,5].includes(parseInt(item.get('idpurchasestatus')))}}
            //         ]);
            //         form.queryById('idpurchasestatus').setValue('5');
            //     }    
            //     // if(win.purchase.data.idpurchasestatus > 2) //if status isnot draft 
            // }

            // form.queryById('requestdate').setValue(new Date());
        },
        'hide': function(){
            // var form = formGoodsReceipt;

            // //clear form
            // form.fireEvent('clearForm');
            // form.queryById('idunit').setDisabled(false);
            // form.queryById('supplier').setDisabled(false);
            // form.queryById('project').setDisabled(false);
            // form.queryById('noorder').setDisabled(false);
            // form.queryById('requestdate').setDisabled(false);
            // form.queryById('idpurchasestatus').setDisabled(false);
            // form.queryById('idpurchasetype').setDisabled(false);
            // form.queryById('netddays').setDisabled(false);
            // form.queryById('neteomddays').setDisabled(false);
            // form.queryById('discount').setDisabled(false);
            // form.queryById('netdmax').setDisabled(false);
            // form.queryById('idcurrency').setDisabled(false);
            // form.queryById('idshipping').setDisabled(false);
            // form.queryById('shipaddress').setDisabled(false);
            // form.queryById('notes').setDisabled(false);
            // form.queryById('btnAdd').setDisabled(false);
            // form.queryById('btnSave').setDisabled(false);
            // form.queryById('colAct').show();

            // //clear filter comboxpurchasestatus
            // var storecb1 = form.queryById('idpurchasestatus').getStore();
            // storecb1.clearFilter();
            // storecb1.load();
        }

    }
});