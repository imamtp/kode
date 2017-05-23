var storeGridGoodsReceipt = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.GoodsReceipt',
    sorters: [{
        property: 'idgoodsreceipt',
        direction: 'DESC'
    }],
    listeners: {
        'beforeload': function(store, operation, eOpts){
            operation.params = {
                extraparams: 'a.deleted: 0',
            }
        }
    },
});

var smGridGoodsReceipt = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridGoodsReceipt.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridGoodsReceiptID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridGoodsReceiptID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridGoodsReceiptID').queryById('btnEdit').setDisabled(false);
            Ext.getCmp('GridGoodsReceiptID').queryById('btnDelete').setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridGoodsReceipt', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridGoodsReceipt',
    store: storeGridGoodsReceipt,
    width: 180
});

Ext.define('GridGoodsReceipt', {
    itemId: 'GridGoodsReceiptID',
    id: 'GridGoodsReceiptID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridGoodsReceipt',
    store: storeGridGoodsReceipt,
    selModel: smGridGoodsReceipt,
    loadMask: true,
    columns: [
        {header:'idgoodsreceipt', dataIndex:'idgoodsreceipt', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 50},
        {header:'No PO', dataIndex:'nopurchase', sortable:false, width: 150},
        {header:'Request Date', dataIndex:'requestdate', minWidth: 150},
        {header:'Delivered Date', dataIndex:'delivereddate', minWidth: 150},
        // {header:'Total Qty', dataIndex:'qty', minWidth: 100, xtype: 'numbercolumn'},
        {header:'Total Price', dataIndex:'totalamount', minWidth: 200, xtype: 'numbercolumn'},
        {header:'Total Tax', dataIndex:'tax', minWidth: 200, xtype: 'numbercolumn'},
        {header:'Total Discount', dataIndex:'discount', minWidth: 200, xtype: 'numbercolumn'},
        {header:'Total Paid', dataIndex:'totalpaid', minWidth: 200, xtype: 'numbercolumn'},
        {header:'Balance Overdue', dataIndex:'', minWidth: 200, xtype: 'numbercolumn'},
        {header:'Received By', dataIndex:'', minWidth: 150,},
        {header:'Remarks', dataIndex:'remarks', minWidth: 250, flex:1},
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
                labelWidth: 60,
                width: 200,
            },
            items:[
                {
                    xtype:'comboxunit'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Project',
                },
                // {
                //     xtype: 'comboxgoodsreceiptstatus',
                // },
                '->',

            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
                labelWidth: 60,
                width: 200,
            },
            items:[
                {
                    xtype:'comboxsupplier',
                    itemId: 'idsupplier',
                },
                {
                    xtype:'datefield',
                    itemId: 'fromdate',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    itemId: 'todate',
                    fieldLabel: 'To',
                },
                {
                    text: 'Go',
                    itemId:'btnGo',
                    width: 50,
                }
                ,
                {
                    text: 'Clear',
                    itemId: 'btnClear',
                    width: 50,
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'btnAdd',
                    text: 'New Goods Receipt',
                    iconCls: 'add-icon',
                    handler: function() {
                        FormGoodsReceipt.statusform = 'input';
                        FormGoodsReceipt.show();
                    }
                }, 
                {
                    itemId: 'btnEdit',
                    text: 'Edit',
                    iconCls: 'edit-icon',
                    disabled: true,
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridGoodsReceipt')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var rows = grid.getSelectionModel().getSelection();
                        if (rows.length == 0) {
                            Ext.Msg.alert('Failure', 'Please select the record in the grid!');
                        } else {
                            FormGoodsReceipt.statusform = 'edit';
                            var data = storeGridGoodsReceipt.getRange()[storeGridGoodsReceipt.indexOfId(selectedRecord.data['idgoodsreceipt'])]
                            FormGoodsReceipt.goodsreceipt = data;
                            FormGoodsReceipt.show();
                        }
                    }
                }, 
                {
                    itemId: 'btnDelete',
                    text: 'Delete',
                    iconCls: 'delete-icon',
                    disabled: true,
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridGoodsReceipt')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    console.log(selected);
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/GoodsReceipt/purchase',
                                        method: 'POST',
                                        params: {
                                            postdata: Ext.encode(selected),
                                            idmenu:24
                                        },
                                        success: function(form, action) {
                                            var d = Ext.decode(form.responseText);
                                            if (!d.success) {
                                                Ext.Msg.alert('Informasi', d.message);
                                            } else {
                                                storeGridGoodsReceipt.load();
                                            }
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        }
                                    });
                                    
                                }
                            }
                        });
                    },
                }, 
                '->', 
                'Pencarian: ', 
                ' ', 
                {
                    xtype: 'searchGridGoodsReceipt',
                    text: 'Left Button',
                }
            ],
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridGoodsReceipt, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: function(){
            storeGridGoodsReceipt.load();
        },
        afterrender: function(grid){
            // if(group_id == 61){
            //     FormGoodsReceipt.mode = 'requisition';
            //     grid.queryById('btnAdd').setText('Create Requisition');
            //     grid.queryById('btnEdit').setText('Edit');
                
            //     //filter goodsreceiptrequisition only show users' requisition
            //     storeGridGoodsReceipt.clearFilter(true);
            //     storeGridGoodsReceipt.filter([
            //         {filterFn: function(item){return item.get('userin')  == userid}}
            //     ]);
            // }
            // else{
            //     //filter goodsreceiptrequisition all requisition with status is not draft except users' requisition
            //     storeGridGoodsReceipt.clearFilter(true);
            //     storeGridGoodsReceipt.filter([
            //         {filterFn: function(item){return (item.get('idgoodsreceiptstatus') == 1 && item.get('userin') == userid) || (item.get('idgoodsreceiptstatus') != 1)}}
            //     ]);
            // }
        },
        itemdblclick: function(dv, record, item, index, e) {
            FormGoodsReceipt.statusform = 'edit';
            var data = storeGridGoodsReceipt.getById(record.data.idgoodsreceipt);
            FormGoodsReceipt.goodsreceipt = data;
            FormGoodsReceipt.show();
        }
    }
});