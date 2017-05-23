Ext.define('ReceiptWorkOrderCostTabModel', {
    extend: 'Ext.data.Model',
    fields: ['job_order_cost_id','prod_cost_id','cost_code','cost_name','standard_hour','standard_cost','used_hour','total'],
    idProperty: 'id'
});
var storeReceiptWorkOrderCostTab = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ReceiptWorkOrderCostTabModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ReceiptWorkOrderCostTab/master',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'project_id',
        direction: 'DESC'
    }]
});

//end header store

Ext.define('MY.searchReceiptWorkOrderCostTab', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchReceiptWorkOrderCostTab',
    store: storeReceiptWorkOrderCostTab,
    width: 180
});
var smReceiptWorkOrderCostTab = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smReceiptWorkOrderCostTab.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteReceiptWorkOrderCostTab').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteReceiptWorkOrderCostTab').enable();
        }
    }
});


Ext.define(dir_sys+'production.ReceiptWorkOrderCostTab', {
    extend: 'Ext.grid.Panel',
    id: 'ReceiptWorkOrderCostTab',
    alias: 'widget.ReceiptWorkOrderCostTab',
    xtype: 'cell-editing',
    title: 'Production Cost',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: 300,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeReceiptWorkOrderCostTab,
            viewConfig:{
                markDirty:false
            },
            columns: [
                {
                    header: 'job_order_cost_id',
                    hidden: true,
                    dataIndex: 'job_order_cost_id',
//                    id: 'idinventory'
                },
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'prod_cost_id',
//                    id: 'idinventory'
                },
                {
                    header: 'Cost Code',
                    dataIndex: 'cost_code',
                    width: 100
                },
                 {
                    header: 'Cost Name',
                    dataIndex: 'cost_name',
                    width: 100
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Standard Cost',
                    width: 100,
                    dataIndex: 'standard_cost',
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Standard Hour',
                    width: 100,
                    dataIndex: 'standard_hour',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                }, 
                {
                    xtype: 'numbercolumn',
                    header: 'Used Hour',
                    width: 100,
                    dataIndex: 'used_hour',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },               
                {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    width: 100,
                    dataIndex: 'total',
                    align: 'right'
                }
                // {
                //     xtype: 'actioncolumn',
                //     width: 30,
                //     align: 'center',
                //     sortable: false,
                //     menuDisabled: true,
                //     items: [{
                //             icon: BASE_URL + 'assets/icons/fam/cross.gif',
                //             tooltip: 'Hapus',
                //             scope: this,
                //             handler: this.onRemoveClick
                //         }]
                // }
            ],
            selModel: {
                selType: 'cellmodel'
            },
             listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntrySalesOrder();
                    }
                }
            },
            dockedItems: [ 
                // {
                //     xtype: 'toolbar',
                //     dock: 'top',
                //     items: [
                //         {
                //             text: 'Add Item',
                //             id:'addItemProdCostWo',
                //             iconCls: 'add-icon',
                //             scope: this,
                //             handler: this.onAddClick
                //         }
                //     ]
                // }
            ]
        });

        this.callParent();

        this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });

        this.on('afteredit', this.onAfterEdit, this);

        this.on({
            scope: this,
            edit: function() {
                updateGridReceiptCostWO();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
        updateGridReceiptCostWO();
    },
    recordSalesOrder: function(button, event, mode)
    {
        console.log(Ext.getCmp('idaccountSalesOrder').getValue())
        if (validasiSalesOrder())
        {
            // var dp = Ext.getCmp('angkutSalesOrder').getValue();
            // if(dp!='')
            // {
            //     //cek link dp
            //     Ext.Ajax.request({
            //         url: SITE_URL + 'account/cekAccLink',
            //         method: 'POST',
            //         params: {
            //             idacclink: 17,
            //             idunit:Ext.getCmp('cbUnitEntrySalesOrder').getValue()
            //         },
            //         success: function(form, action) {

            //             var d = Ext.decode(form.responseText);
            //             if (!d.success)
            //             {
            //                 Ext.Msg.alert('Peringatan', d.message);
            //             } else {
            //                 // Ext.getCmp('wEntryPayment').hide();
            //                 // PaymentGridStore.load();
            //             }

            //         },
            //         failure: function(form, action) {
            //             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            //         }
            //     });
            // } 
            
            var json = Ext.encode(Ext.pluck(storeGridItemSalesOrder.data.items, 'data'));
//            var cbUnitP = Ext.encode(Ext.getCmp('cbUnitEntrySalesOrder').getValue());

            Ext.Ajax.request({
                url: SITE_URL + 'sales/saveSalesOrder',
                method: 'POST',
                params: {
                    statusform: Ext.getCmp('statusformSalesOrderGrid').getValue(),
                    idsales: Ext.getCmp('idsales_order').getValue(),
                    datagrid: json
                },
                success: function(form, action) {

                    var d = Ext.decode(form.responseText);
                    if (!d.success)
                    {
                        Ext.Msg.alert('Peringatan', d.message);
                    } else {
                        Ext.Msg.alert('Success', d.message);

                        Ext.getCmp('customerSalesOrder').setValue(null);

                        // storeGridItemSalesOrder.removeAll();
                        // storeGridItemSalesOrder.sync();
                        // updateGridSalesOrder('general');

                        // if(mode=='print')
                        // {
                        //     cetak('FAKTUR Sales Order','SalesOrder',d.id);
                        // }
                    }

                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }


    },
    saveRecurr: function() {
        // if (validasiSalesOrder())
        // {
        //     Ext.getCmp('formformRecc').getForm().reset();
        //     wformRecc.show();
        // }
    },
    loadStore: function() {


//        this.getStore().load({
//            // store loading is asynchronous, use a load listener or callback to handle results
//            callback: this.onStoreLoad
//        });
    },
    onStoreLoad: function() {
//        Ext.Msg.show({
//            title: 'Store Load Callback',
//            msg: 'store was loaded, data available for processing',
//            icon: Ext.Msg.INFO,
//            buttons: Ext.Msg.OK
//        });
    },
    onAddClick: function() {
            wReceiptWorkOrderCostTab.show();
            // storeGridItemProdCostPopup.load();
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridReceiptCostWO()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridReceiptCostWO()
{
    
     Ext.each(storeReceiptWorkOrderCostTab.data.items, function(obj, i) {
      
        obj.set('total', (obj.data.used_hour*obj.data.standard_cost));
    });
}

function setValueProject(selectedRecord,winCmp,prefixCmp)
{
    // console.log(prefixCmp);
    Ext.getCmp('projectid'+prefixCmp).setValue(selectedRecord.get('project_id'));
    Ext.getCmp('projectname'+prefixCmp).setValue(selectedRecord.get('project_name'));
    
    Ext.getCmp(winCmp).hide();
}