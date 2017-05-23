Ext.define('GridItemJobReceiptWOModel', {
    extend: 'Ext.data.Model',
    fields: ['job_item_id','job_order_id','idinventory','idunit','measurement_id','cost','qty','subtotal','total','remarks','userin','datein','idunit','size','measurement_id_size','qty_accept','whs_accept_id','qty_reject','whs_reject_id','qty_sisa','whs_sisa_id','notes','token_tmp','nameinventory','invno','sku_no','short_desc','size_measurement','warehouse_code_accept','warehouse_code_reject','warehouse_code_sisa'],
    idProperty: 'id'
});

var storeGridItemJobReceiptWO = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemJobReceiptWOModel',
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

Ext.define(dir_sys+'production.ReceiptWorkOrderJobTab', {
    extend: 'Ext.grid.Panel',
    id: 'ReceiptWorkOrderJobTab',
    alias: 'widget.ReceiptWorkOrderJobTab',
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
            // forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemJobReceiptWO,
            viewConfig:{
                markDirty:false
            },
            columns: [
                {
                    header: 'job_order_id',
                    hidden: true,
                    dataIndex: 'job_order_id',
//                    id: 'idinventory'
                },
                {
                    header: 'job_item_id',
                    hidden: true,
                    dataIndex: 'job_item_id',
//                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
//                    id: 'idinventory'
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
//                    id: 'invno',
                    minWidth: 100
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    minWidth: 150,
//                    id: 'nameinventory'
                },

                {
                    header: 'Satuan Qty',
                    dataIndex: 'short_desc',
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
                    header: 'Qty Order',
                    minWidth: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Ukuran',
                    minWidth: 100,
                    dataIndex: 'size',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan Ukuran',
                    minWidth:140,
                    dataIndex: 'size_measurement',
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
                    hidden:true,
                    header: 'Total',
                    dataIndex: 'total',
                    minWidth: 100,
                    align: 'right'
                },                
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Accept',
                    minWidth: 100,
                    dataIndex: 'qty_accept',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },                                    
                {
                    header: 'Warehouse Accept',
                    minWidth: 150,
                    dataIndex: 'warehouse_code_accept',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel:true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                },            
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Reject',
                    minWidth: 100,
                    minValue:0.00,
                    dataIndex: 'qty_reject',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0
                    }
                },                                  
                {
                    header: 'Warehouse Reject',
                    minWidth: 150,
                    dataIndex: 'warehouse_code_reject',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel:true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                },            
                {
                    xtype: 'numbercolumn',
                    header: 'Qty Sisa',
                    minWidth: 100,
                    defaultValue:0.00,
                    dataIndex: 'qty_sisa',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },                                  
                // {
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
                     console.log(dataRecord.data.job_item_id)
                    var job_item_id = dataRecord.data.job_item_id;
                    // Ext.getCmp('job_item_id_tmpwo').setValue(job_item_id); //job_item_id key flag

                    Ext.getCmp('ReceiptWorkOrderMaterialTab').setTitle('Raw Material :'+ dataRecord.data.nameinventory);

                    // WorkOrderMaterialTabStore
                      var ReceiptWorkOrderMaterialTabStore = Ext.getCmp('ReceiptWorkOrderMaterialTab').getStore();
                      ReceiptWorkOrderMaterialTabStore.on('beforeload',function(store, operation,eOpts){
                               operation.params={
                                          'extraparams': 'a.job_order_id:'+dataRecord.data.job_order_id+','+'a.job_item_id:'+job_item_id
                                         };
                                     });
                      ReceiptWorkOrderMaterialTabStore.load();
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
                // {
                //     xtype: 'toolbar',
                //     dock: 'top',
                //     items: [
                //         {
                //             text: 'Add Item',
                //             id:'addItemJobReceiptWOBtn',
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
                updateGridReceiptJobWO();
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
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

                        storeGridItemSalesOrder.removeAll();
                        storeGridItemSalesOrder.sync();
                        updateGridSalesOrder('general');

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
//        console.log(Ext.getCmp('customerSalesOrder').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
            // wItemJobReceiptWOPopupPopup.show();
            // storeGridItemJobReceiptWOPopup.load();

//        var rec = new JournalStore({
//            idaccount: null,
//            accname: null,
//            accnumber: null,
//            debit: null,
//            credit: null
//        });
//
//        this.getStore().insert(0, rec);
//        this.cellEditing.startEditByPosition({
//            row: 0,
//            column: 0
//        });
    },
    onRemoveClick: function(grid, rowIndex) {
        // this.getStore().removeAt(rowIndex);
        // updateGridSalesOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


function updateGridReceiptJobWO()
{
     Ext.each(storeGridItemJobReceiptWO.data.items, function(obj, i) {
        // var total = obj.data.qty * obj.data.price;
        // var diskon = (total / 100) * obj.data.disc;

        // var net = total - diskon;
        // subtotalSalesQuotation += net;
        // totalPajak += (net / 100) * obj.data.ratetax * 1;
        // obj.set('qty_sisa', obj.data.subtotal-(obj.data.qty_accept+obj.data.qty_reject));
        obj.set('qty_sisa', obj.data.qty-(obj.data.qty_accept+obj.data.qty_reject));
    });
}