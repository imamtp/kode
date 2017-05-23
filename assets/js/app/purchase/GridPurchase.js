var storeGridPurchase = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Purchase',
    sorters: [{
        property: 'idpurchase',
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

var smGridPurchase = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPurchase.getSelection().length;
            if (selectedLen == 0) {
                Ext.getCmp('GridPurchaseID').queryById('btnEdit').setDisabled(true);
                Ext.getCmp('GridPurchaseID').queryById('btnDelete').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('GridPurchaseID').queryById('btnEdit').setDisabled(false);
            Ext.getCmp('GridPurchaseID').queryById('btnDelete').setDisabled(false);
        }
    }
});

Ext.define('MY.searchGridPurchase', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridPurchase',
    store: storeGridPurchase,
    width: 180
});

Ext.define('GridPurchase', {
    itemId: 'GridPurchaseID',
    id: 'GridPurchaseID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridPurchase',
    store: storeGridPurchase,
    selModel: smGridPurchase,
    loadMask: true,
    columns: [
        {header:'idpurchase', dataIndex:'idpurchase', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 50},
        {header:'No PO', dataIndex:'nopurchase', sortable:false, width: 150},
        {header:'Request Date', dataIndex:'requestdate', minWidth: 150},
        {header:'Delivered Date', dataIndex:'delivereddate', minWidth: 150},
        // {header:'Total Qty', dataIndex:'qty', minWidth: 100, xtype: 'numbercolumn'},
        {header:'Total Price', dataIndex:'totalamount', minWidth: 200, xtype: 'numbercolumn'},
        {header:'Status', dataIndex:'purchasestatus', minWidth: 150},
        {header:'Approved By', dataIndex:'approver', minWidth: 200},
        {header:'Notes', dataIndex:'notes', minWidth: 250},
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
                {
                    xtype: 'comboxpurchasestatus',
                },
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
                    xtype:'textfield',
                    fieldLabel: 'No Order',
                },
                {
                    xtype:'datefield',
                    fieldLabel: 'From',
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'To',
                },
                {
                    text: 'Go',
                    width: 50,
                }
                ,
                {
                    text: 'Clear',
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
                    text: 'Order',
                    iconCls: 'add-icon',
                    handler: function() {
                        FormPurchase.statusform = 'input';
                        FormPurchase.show();
                    }
                }, 
                {
                    itemId: 'btnEdit',
                    text: 'Edit/Review',
                    iconCls: 'edit-icon',
                    disabled: true,
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridPurchase')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var rows = grid.getSelectionModel().getSelection();
                        if (rows.length == 0) {
                            Ext.Msg.alert('Failure', 'Please select the record in the grid!');
                        } else {
                            FormPurchase.statusform = 'edit';
                            var data = storeGridPurchase.getRange()[storeGridPurchase.indexOfId(selectedRecord.data['idpurchase'])]
                            FormPurchase.purchase = data;
                            FormPurchase.show();
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
                                    var grid = Ext.ComponentQuery.query('GridPurchase')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    console.log(selected);
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/Purchase/master',
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
                                                storeGridPurchase.load();
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
                    xtype: 'searchGridPurchase',
                    text: 'Left Button',
                }
            ],
        },
        {
            xtype: 'pagingtoolbar',
            store: storeGridPurchase, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ],
    listeners: {
        render: function(){
            storeGridPurchase.load();
        },
        afterrender: function(grid){
            if(group_id == 61){
                FormPurchase.mode = 'requisition';
                grid.queryById('btnAdd').setText('Create Requisition');
                grid.queryById('btnEdit').setText('Edit');
                
                //filter purchaserequisition only show users' requisition
                storeGridPurchase.clearFilter(true);
                storeGridPurchase.filter([
                    {filterFn: function(item){return item.get('userin')  == userid}}
                ]);
            }
            else{
                //filter purchaserequisition all requisition with status is not draft except users' requisition
                storeGridPurchase.clearFilter(true);
                storeGridPurchase.filter([
                    {filterFn: function(item){return (item.get('idpurchasestatus') == 1 && item.get('userin') == userid) || (item.get('idpurchasestatus') != 1)}}
                ]);
            }
        },
        itemdblclick: function(dv, record, item, index, e) {
            FormPurchase.statusform = 'edit';
            var data = storeGridPurchase.getById(record.data.idpurchase);
            FormPurchase.purchase = data;
            FormPurchase.show();
        }
    }
});