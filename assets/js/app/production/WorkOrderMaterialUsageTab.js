Ext.define('GridItemMaterialUsageWOModel', {
    extend: 'Ext.data.Model',
    fields: ['prod_material_id','job_order_id','idinventory','bom_id','measurement_id','qty','slice','idunit','material_type','qty_real','qty_sisa','whs_sisa_id','warehouse_code_sisa','notes','nameinventory','invno','sku_no','measurement_name','catatan'],
    idProperty: 'id'
});

var storeGridItemMaterialUsageWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemMaterialUsageWOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemMaterialWO/production',
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

//end store head

///////////////////////////

Ext.define(dir_sys+'production.WorkOrderMaterialUsageTab', {
    extend: 'Ext.grid.Panel',
    id: 'WorkOrderMaterialUsageTab',
    alias: 'widget.WorkOrderMaterialUsageTab',
    xtype: 'cell-editing',
    title: 'Raw Material',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: 300,
            // forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemMaterialUsageWO,
            viewConfig:{
                markDirty:false
            },
            columns: [
                {
                    header: 'prod_material_id',
                    hidden: true,
                    dataIndex: 'prod_material_id',
//                    id: 'idinventory'
                },{
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
//                    id: 'idinventory'
                },
                {
                    header: 'bom_id',
                    hidden: true,
                    dataIndex: 'bom_id',
//                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'Kode Material',
                    dataIndex: 'invno',
//                    id: 'invno',
                    minWidth: 120
                },
                {
                    header: 'Nama Material',
                    dataIndex: 'nameinventory',
                    flex:1,
                    minWidth: 250,
//                    id: 'nameinventory'
                },
                {
                    header: 'Deskripsi',
                    hidden:true,
                    dataIndex: 'description',
//                    id: 'invno',
                    minWidth: 200
                },
                {
                    header: 'Tipe',
                    dataIndex: 'material_type',
                    minWidth: 110,
                    renderer: function(value) {
                       if(value*1===1){
                        return 'Raw Material';
                       } else {
                        return 'BoM Material';
                       }
                    }
//                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Potongan',
                    minWidth: 100,
                    dataIndex: 'slice',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Pakai',
                    minWidth: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan Qty',
                    dataIndex: 'measurement_name',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },
                 {
                    xtype: 'numbercolumn',
                    header: 'Qty Realisasi',
                    minWidth: 100,
                    dataIndex: 'qty_real',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },{
                    xtype: 'numbercolumn',
                    header: 'Qty Selisih',
                    minWidth: 100,
                    dataIndex: 'qty_sisa',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                }
                // ,{
                //     header: 'Warehouse Sisa',
                //     minWidth: 150,
                //     dataIndex: 'warehouse_code_sisa',
                //     editor: {
                //         xtype: 'comboxWarehouse',
                //         hideLabel:true,
                //         valueField: 'warehouse_code',
                //         displayField: 'warehouse_code',
                //         labelWidth: 100
                //     }
                // },
                // {
                //     header: 'Catatan',
                //     minWidth: 250,
                //     dataIndex: 'catatan',
                //     editor: {
                //         xtype: 'textfield',
                //         name: 'catatan'
                //     }
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
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        // {
                        //     text: 'Add Raw Material',
                        //     id:'addRawMaterialBtnWo',
                        //     iconCls: 'add-icon',
                        //     scope: this,
                        //     handler: this.onAddRawClick
                        // },
                        // {
                        //     text: 'Add Bill of Material',
                        //     hidden:true,
                        //     id:'addBOMBtnWo',
                        //     iconCls: 'add-icon',
                        //     scope: this,
                        //     handler: this.onAddBoMClick
                        // },
                        {
                            xtype:'hiddenfield',
                            name:'job_item_id_tmpmaterialwo',
                            id:'job_item_id_tmpmaterialwo'
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
                updateGridMaterialUsageWO();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
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
    onAddRawClick: function() {
    },
    onAddBoMClick: function(){
      
    },
    onRemoveClick: function(grid, rowIndex) {
       
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


function updateGridMaterialUsageWO()
{
     Ext.each(storeGridItemMaterialUsageWO.data.items, function(obj, i) {
        var job_order_id = Ext.getCmp('job_order_id_woform').getValue();
        var job_item_id = Ext.getCmp('job_item_id_tmpmaterialwo').getValue()*1;

        obj.set('qty_sisa', obj.data.qty_real-obj.data.qty);

        // Ext.Ajax.request({
        //     url: SITE_URL + 'production/save_rm',
        //     method: 'POST',
        //     params: {
        //         idunit:Ext.getCmp('cbUnitWorkOrderGrid').getValue()*1,
        //         job_order_id: job_order_id,
        //         job_item_id:job_item_id,
        //         prod_material_id:obj.data.prod_material_id,
        //         measurement_name: obj.data.measurement_name,
        //         slice:obj.data.slice,
        //         qty: obj.data.qty,
        //         update:'true'
        //     },
        //     success: function(form, action) {
        //         var d = Ext.decode(form.responseText);

        //         storeGridItemMaterialUsageWO.on('beforeload',function(store, operation,eOpts){
        //                operation.params={
        //                            'extraparams': 'a.job_order_id:'+job_order_id+','+'a.job_item_id:'+job_item_id
        //                          };
        //                      });

        //         storeGridItemMaterialUsageWO.load();
        //     },
        //     failure: function(form, action) {
        //         Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        //     }
        // });
        // obj.set('total', obj.data.qty*obj.data.size);

    });
}