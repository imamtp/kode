var WindowBatchReceiveMaterialItemList =  Ext.create(dir_sys + 'production.WindowBatchReceiveMaterialItemList');

Ext.define('GridItemMaterialReceiptWOModel', {
    extend: 'Ext.data.Model',
    fields: ['prod_material_id','bom_id','slice','idinventory','invno','tipe','nameinventory','cost','size','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','price','qty','total','ratetax','disc','short_desc','measurement_name','qty_tambahan','qty_real','qty_sisa','warehouse_code_sisa','catatan'],
    idProperty: 'id'
});

var storeGridItemMaterialReceiptWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemMaterialReceiptWOModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/itemmaterialwo/production',
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

Ext.define(dir_sys+'production.ReceiptWorkOrderMaterialTab', {
    extend: 'Ext.grid.Panel',
    id: 'ReceiptWorkOrderMaterialTab',
    alias: 'widget.ReceiptWorkOrderMaterialTab',
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
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemMaterialReceiptWO,
            viewConfig:{
                markDirty:false
            },
            columns: [
                {
                    text: 'Terima Barang',
                    width: 110,
                    // menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: 'Form Terima Barang',
                    align: 'center',
                    icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {

                        if(selectedRecord.data.qty_sisa*1===0){
                            Ext.Msg.alert('Receipt Goods', 'Selisih raw meterial sudah nol (0)');
                        } else {
                            WindowBatchReceiveMaterialItemList.show();

                            Ext.getCmp('totalqty_itembatchmaterial_wo').setValue(selectedRecord.data.qty_sisa)
                            Ext.getCmp('prod_material_id_itembatchmaterial_wo').setValue(selectedRecord.data.prod_material_id)

                            //load data yang sudah ada
                            var GridBatchMaterialWoReceiptStore = Ext.getCmp('GridBatchMaterialWoReceipt').getStore();
                            GridBatchMaterialWoReceiptStore.on('beforeload',function(store, operation,eOpts){
                                           operation.params={
                                                       'prod_material_id': selectedRecord.data.prod_material_id,
                                                       'is_tmp':1
                                                     };
                                                 });
                            GridBatchMaterialWoReceiptStore.load();
                        }
                        
                    }

                },
                {
                    header: 'prod_material_id',
                    hidden: true,
                    dataIndex: 'prod_material_id',
//                    id: 'idinventory'
                },
                {
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
                    width: 120
                },
                {
                    header: 'Nama Material',
                    dataIndex: 'nameinventory',
                    flex:1,
                    width: 150,
//                    id: 'nameinventory'
                },
//                 {
//                     header: 'Deskripsi',
//                     dataIndex: 'description',
// //                    id: 'invno',
//                     width: 200
//                 },
//                 {
//                     header: 'Tipe',
//                     dataIndex: 'tipe',
//                     width: 110,
// //                    id: 'nameinventory'
//                 },
                {
                    xtype: 'numbercolumn',
                    header: 'Potongan',
                    width: 100,
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
                    width: 100,
                    dataIndex: 'qty',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                
                // {
                //     xtype: 'numbercolumn',
                //     header: 'Qty Tambahan',
                //     width: 120,
                //     dataIndex: 'qty_tambahan',
                //     align: 'right',
                //     editor: {
                //         xtype: 'numberfield',
                //         allowBlank: false,
                //         minValue: 1
                //     }
                // },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Realisasi',
                    width: 100,
                    dataIndex: 'qty_real',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 0
                    // }
                },{
                    xtype: 'numbercolumn',
                    header: 'Qty Selisih',
                    width: 100,
                    dataIndex: 'qty_sisa',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },{
                    header: 'Satuan Qty',
                    dataIndex: 'measurement_name',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
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
                // {
                //     xtype: 'numbercolumn',
                //     header: 'Ukuran',
                //     width: 100,
                //     dataIndex: 'size',
                //     align: 'right',
                //     editor: {
                //         xtype: 'numberfield',
                //         allowBlank: false,
                //         minValue: 1
                //     }
                // },
                // {
                //     header: 'Satuan Ukuran',
                //     dataIndex: 'size_measurement',
                //     editor: {
                //         xtype: 'comboxmeasurement',
                //         hideLabel:true,
                //         valueField: 'short_desc',
                //         displayField: 'short_desc',
                //         labelWidth: 100
                //     }
                // },
                // {
                //     xtype: 'numbercolumn',
                //     header: 'Total',
                //     dataIndex: 'total',
                //     width: 150,
                //     align: 'right'
                // },
               
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
                //             text: 'Add Raw Material',
                //             id:'addRawMaterialBtnWo',
                //             iconCls: 'add-icon',
                //             scope: this,
                //             handler: this.onAddRawClick
                //         },
                //         {
                //             text: 'Add Bill of Material',
                //             id:'addBOMBtnWo',
                //             iconCls: 'add-icon',
                //             scope: this,
                //             handler: this.onAddBoMClick
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
                updateGridReceiptMaterialWO();
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
            wItemRawMaterialWOPopup.show();
            storeGridItemRawMaterialWO.load();
    },
    onAddBoMClick: function(){
        wItemBoMMaterialWOPopup.show();
        storeGridItemBoMMaterialWO.load();
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        updateGridReceiptMaterialWO()
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


function updateGridReceiptMaterialWO()
{
     Ext.each(storeGridItemMaterialReceiptWO.data.items, function(obj, i) {
        // var total = obj.data.qty * obj.data.price;
        // var diskon = (total / 100) * obj.data.disc;

        // var net = total - diskon;
        // subtotalSalesQuotation += net;
        // totalPajak += (net / 100) * obj.data.ratetax * 1;
        obj.set('qty_sisa', obj.data.qty-obj.data.qty_real);
    });
}