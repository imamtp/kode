Ext.define('WorkOrderCostTabModel', {
    extend: 'Ext.data.Model',
    fields: ['prod_cost_id','cost_code','cost_name','standard_hour','standard_cost','total'],
    idProperty: 'id'
});
var storeWorkOrderCostTab = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'WorkOrderCostTabModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/WorkOrderCostTab/master',
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

// start item list
Ext.define('GridItemProdCostPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['prod_cost_id','cost_code','cost_name','standard_hour','standard_cost'],
    idProperty: 'id'
});

var storeGridItemProdCostPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemProdCostPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/productioncost/production/',
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

// storeGridItemProdCostPopup.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'a.inventory_type:'+1
//                   };
//               });
              
Ext.define('MY.searchGridItemProdCostPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemProdCostPopup',
    store: storeGridItemProdCostPopup,
    width: 180
});

var smGridItemProdCostPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemProdCostPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemProdCostPopup').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemProdCostPopup').enable();
        }
    }
});

Ext.define('GridItemProdCostPopup', {
    itemId: 'GridItemProdCostPopup',
    id: 'GridItemProdCostPopup',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemProdCostPopup',
    store: storeGridItemProdCostPopup,
    loadMask: true,
    columns: [
        {header: 'prod_cost_id', dataIndex: 'prod_cost_id', hidden: true},
        {header: 'Cost Code', dataIndex: 'cost_code', minWidth: 150},
        {header: 'Cost Name', dataIndex: 'cost_name', minWidth: 150},
        {header: 'Standard Hour', dataIndex: 'standard_hour', minWidth: 150, flex:1},
        {header: 'Standard Cost', dataIndex: 'standard_cost', minWidth: 150,xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemProdCostPopup',
                    text: 'Pilih Item',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemProdCostPopup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {

                             var recWO = new WorkOrderCostTabModel({
                                prod_cost_id: selectedRecord.get('prod_cost_id'),
                                cost_code: selectedRecord.get('cost_code'),
                                cost_name: selectedRecord.get('cost_name'),
                                standard_hour: selectedRecord.get('standard_hour'),
                                standard_cost: selectedRecord.get('standard_cost'),
                                total: (selectedRecord.get('standard_hour')*1) * (selectedRecord.get('standard_cost'))
                            });

                            var gridWO = Ext.getCmp('WorkOrderCostTab');
                            gridWO.getStore().insert(0, recWO);
                            // updateGridProdCost();
                    
                           Ext.getCmp('windowPopupWorkOrderCostTab').hide();

                            
                        }


                    }
                },'-',
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemProdCostPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemProdCostPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemProdCostPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemProdCostPopup = Ext.getCmp('formItemProdCostPopup');
//            wItemProdCostPopup.show();
//
//            formItemProdCostPopup.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemProdCostPopup/1/setup',
//                params: {
//                    extraparams: 'a.idtax:' + record.data.idtax
//                },
//                success: function(form, action) {
//                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
//                },
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            })
//
////            
////            Ext.getCmp('kddaerahS').setReadOnly(true);
//            Ext.getCmp('statusformItemProdCostPopup').setValue('edit');
        }
    }
});

// end item list

var wWorkOrderCostTab = Ext.create('widget.window', {
    id: 'windowPopupWorkOrderCostTab',
    title: 'Production Cost',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
     width: 830,
    modal:true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        xtype:'GridItemProdCostPopup'
    }],
    listeners: {
        'Show': function(){
            // Ext.getCmp('combox_namecustomer_formproject').setValue(formWorkOrderCostTab.getForm().getValues().namecustomer);
        },
        'Hide': function(){
            // formWorkOrderCostTab.getForm().reset();
        }
    }
});


Ext.define('MY.searchWorkOrderCostTab', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchWorkOrderCostTab',
    store: storeWorkOrderCostTab,
    width: 180
});
var smWorkOrderCostTab = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smWorkOrderCostTab.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteWorkOrderCostTab').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteWorkOrderCostTab').enable();
        }
    }
});


Ext.define(dir_sys+'production.WorkOrderCostTab', {
    extend: 'Ext.grid.Panel',
    id: 'WorkOrderCostTab',
    alias: 'widget.WorkOrderCostTab',
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
            store: storeWorkOrderCostTab,
            viewConfig:{
                markDirty:false
            },
            columns: [
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
                },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [{
                            icon: BASE_URL + 'assets/icons/fam/cross.gif',
                            tooltip: 'Hapus',
                            scope: this,
                            handler: this.onRemoveClick
                        }]
                }
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
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add Item',
                            id:'addItemProdCostWo',
                            iconCls: 'add-icon',
                            scope: this,
                            handler: this.onAddClick
                        }
                    ]
                }
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
                updateGridJobWO();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
        updateGridCostWO();
    },
    recordSalesOrder: function(button, event, mode)
    {

    },
    saveRecurr: function() {
        if (validasiSalesOrder())
        {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
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
            wWorkOrderCostTab.show();
            storeGridItemProdCostPopup.load();
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridCostWO()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});

function updateGridCostWO()
{
     Ext.each(storeGridItemProdCostPopup.data.items, function(obj, i) {
      
        obj.set('total', obj.data.standard_hour*obj.data.standard_cost);
    });
}

function setValueProject(selectedRecord,winCmp,prefixCmp)
{
    // console.log(prefixCmp);
    Ext.getCmp('projectid'+prefixCmp).setValue(selectedRecord.get('project_id'));
    Ext.getCmp('projectname'+prefixCmp).setValue(selectedRecord.get('project_name'));
    
    Ext.getCmp(winCmp).hide();
}