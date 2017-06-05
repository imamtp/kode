var WorkOrderMaterialUsageTab = Ext.create(dir_sys + 'production.WorkOrderMaterialUsageTab');

Ext.define('GridItemMaterialJobWOModel', {
    extend: 'Ext.data.Model',
    fields: ['job_item_id','job_order_id','idinventory','idunit','measurement_id','cost','qty','subtotal','total','remarks','userin','datein','idunit','size','measurement_id_size','qty_accept','whs_accept_id','qty_reject','whs_reject_id','qty_sisa','whs_sisa_id','notes','token_tmp','nameinventory','invno','sku_no','short_desc','size_measurement','warehouse_code_accept','warehouse_code_reject','warehouse_code_sisa'],
    idProperty: 'id'
});

var storeGridItemMaterialJobWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemMaterialJobWOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemJobWO/production',
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
var WorkOrderMaterialUsageTabStore = Ext.getCmp('WorkOrderMaterialUsageTab').getStore();

Ext.define(dir_sys+'production.MaterialWorkOrderJobTab', {
    extend: 'Ext.grid.Panel',
    id: 'MaterialWorkOrderJobTab',
    alias: 'widget.MaterialWorkOrderJobTab',
    xtype: 'cell-editing',
    // title: 'Finished Goods',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            // height: 300,
            // height:sizeH-300,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemMaterialJobWO,
            viewConfig:{
                markDirty:false
            },
            columns: [
                {
                    header: 'job_item_id',
                    hidden: true,
                    dataIndex: 'job_item_id',
//                    id: 'idinventory'
                },{
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
//                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'assetaccount',
                    hidden: true,
                    dataIndex: 'assetaccount'
                },
                {
                    header: 'No SKU',
                    dataIndex: 'sku_no',
//                    id: 'invno',
                    width: 100
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    width: 150,
//                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right'
                },
                {
                    header: 'Satuan Qty',
                    dataIndex: 'short_desc'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Ukuran',
                    width: 100,
                    dataIndex: 'size',
                    align: 'right'
                },
                {
                    header: 'Satuan Ukuran',
                    dataIndex: 'size_measurement'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Total',
                    dataIndex: 'total',
                    width: 150,
                    align: 'right'
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
             listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                    console.log(dataRecord.data.job_item_id)
                    var job_item_id = dataRecord.data.job_item_id;
                    Ext.getCmp('job_item_id_tmpmaterialwo').setValue(job_item_id); //job_item_id key flag

                    Ext.getCmp('WorkOrderMaterialUsageTab').setTitle('Input Pemakaian Material Untuk '+ dataRecord.data.nameinventory);

                    // WorkOrderMaterialUsageTabStore
                    var WorkOrderMaterialUsageTabStore = Ext.getCmp('WorkOrderMaterialUsageTab').getStore();
                      WorkOrderMaterialUsageTabStore.on('beforeload',function(store, operation,eOpts){
                               operation.params={
                                          'extraparams': 'a.job_order_id:'+dataRecord.data.job_order_id+','+'a.job_item_id:'+job_item_id
                                         };
                                     });
                      WorkOrderMaterialUsageTabStore.load();
                    // .load({
                    //     params:{
                    //         'extraparams': 'a.job_order_id:'+dataRecord.data.job_order_id+','+'a.job_item_id:'+job_item_id
                    //     }
                    // });

                    // Ext.getCmp('addRawMaterialBtnWo').enable();

                    
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableEntrySalesOrder();
                    }
                }
            },
            dockedItems: [ 
                
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
                // updateGridMaterialJobWO();
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
    onAddClick: function() {
    },
    onRemoveClick: function(grid, rowIndex) {
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});



Ext.define('containerMaterialFinishedGoods', {
    extend: 'Ext.container.Container',
    alias: 'widget.containerMaterialFinishedGoods',
    id: 'containerMaterialFinishedGoods',
    title: 'Finished Goods',
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start',
    },
    items: [
        // {html:'panel 2', height:150},
        {
            xtype:'MaterialWorkOrderJobTab',
            minHeight:250
        },
        WorkOrderMaterialUsageTab
    ]
   
    // style: { borderColor: 'Red', borderStyle: 'solid', borderWidth: '1px' },
    // width: '50%',
    // padding: '5 5 5 5',
    // items: [{
    //     xtype:'textfield',
    //     fieldLabel:'hahahaha'
    // }]
});