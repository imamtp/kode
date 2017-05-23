// var WindowEntryGoodsReceipt = Ext.create(dir_sys + 'purchase2.WindowEntryGoodsReceipt');

Ext.define('GridBatchItemPOReturnListModel', {
    extend: 'Ext.data.Model',
     fields: [
       'purchase_batch_id','idpurchaseitem','idpurchase','nameinventory','qty','measurement_id','invno','sku_no','idunit','idinventory','is_tmp','no','warehouse_id','warehouse_code','short_desc','stock_kedua','satuan_kedua'
    ],
    idProperty: 'id'
});

var storeGridBatchItemPOReturnList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridBatchItemPOReturnListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
         url: SITE_URL + 'backend/ext_get_all/PurchaseOrder/purchase',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'code',
        direction: 'ASC'
    }]
});


// storeGridBatchItemPOReturnList.on('beforeload',function(store, operation,eOpts){
//    operation.params={
//                // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
//                'option':'notyetdelivered'
//                // 'wherenotinschedule':'true'
//              };
//          });

Ext.define('MY.searchGridBatchItemPOReturnList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridBatchItemPOReturnList',
    store: storeGridBatchItemPOReturnList,
    width: 180
});

function post_poreturn_item(opsi,data){
    Ext.Ajax.request({
        url: SITE_URL + 'purchase/post_poreturn_item_batch',
        method: 'POST',
        params: {
            purchase_return_id: Ext.getCmp('purchase_return_id_poreturn').getValue(),
            opsi: opsi,
            data: Ext.encode(data)
        },
        success: function(form, action) {

        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

var smGridBatchItemPOReturnList = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    // mode: 'SINGLE',
    // multipleSelect:true,
    listeners: {
        deselect: function(model, record, index) {
            // console.log('deselect');
            // var selected = smGridBatchItemPOReturnList.getSelection();
            post_poreturn_item('delete',record.data)
            // if (selectedLen.length == 0) {
            //     console.log(selectedLen);
            //     Ext.getCmp('btnDeleteMasterSupplierData').disable();
            // }
        },
        select: function(model, record, index) {
            post_poreturn_item('insert',record.data)
            // Ext.getCmp('btnDeleteMasterSupplierData').enable();
        }
    }
});

Ext.define(dir_sys+'purchase2.GridBatchPoReturn', {
    extend: 'Ext.grid.Panel',
    id: 'GridBatchPoReturn',
    alias: 'widget.GridBatchPoReturn',
    xtype: 'cell-editing',
    // title: 'Input Sales Order',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            // forceFit: true,
            selModel:smGridBatchItemPOReturnList,
            plugins: [this.cellEditing],
            store: storeGridBatchItemPOReturnList,
            columns: [
                {
                    header: 'purchase_batch_id',
                    hidden: true,
                    dataIndex: 'purchase_batch_id',
//                    id: 'idinventory'
                },
                {
                    header: 'idpurchaseitem',
                    hidden: true,
                    dataIndex: 'idpurchaseitem',
//                    id: 'idinventory'
                },
                {
                    header: 'idpurchase',
                    hidden: true,
                    dataIndex: 'idpurchase',
//                    id: 'idinventory'
                },
                {
                    header: 'idunit',
                    hidden: true,
                    dataIndex: 'idunit'
                },
                {
                    header: 'SKU No',
                    dataIndex: 'sku_no',
//                    id: 'invno',
                    width: 150
                },
                {
                    header: 'Kode Barang',
                    dataIndex: 'invno',
//                    id: 'invno',
                    width: 150
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    flex:1,
                    width: 150,
//                    id: 'nameinventory'
                },
                {
                    xtype: 'numbercolumn',
                    header: 'Qty',
                    width: 70,
                    dataIndex: 'qty',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan',
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
                    hidden:true,
                    header: 'Qty #2',
                    width: 70,
                    dataIndex: 'stock_kedua',
                    align: 'right',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     allowBlank: false,
                    //     minValue: 1
                    // }
                },
                {
                    header: 'Satuan #2',
                    hidden:true,
                    dataIndex: 'satuan_kedua',
                    // editor: {
                    //     xtype: 'comboxmeasurement',
                    //     hideLabel:true,
                    //     valueField: 'short_desc',
                    //     displayField: 'short_desc',
                    //     labelWidth: 100
                    // }
                },   
                {
                    header: 'Warehouse',
                    minWidth: 150,
                    dataIndex: 'warehouse_code',
                    editor: {
                        xtype: 'comboxWarehouse',
                        hideLabel:true,
                        valueField: 'warehouse_code',
                        displayField: 'warehouse_code',
                        labelWidth: 100
                    }
                },
                {
                    header: 'Catatan',
                    minWidth: 150,
                    dataIndex: 'notes',
                    editor: {
                        xtype: 'textfield',
                        hideLabel:true,
                        labelWidth: 100
                    }
                }
            ],
            // selModel: {
            //     selType: 'cellmodel'
            // },
            dockedItems: [ 
                {
                    xtype:'hiddenfield',
                    id:'idpurchase_batchitemporeceipt',
                    name:'idpurchase'
                },  
                {
                    xtype:'hiddenfield',
                    id:'idpurchaseitem_batchitemporeceipt',
                    name:'idpurchaseitem'
                }, 
                {
                    xtype:'hiddenfield',
                    id:'idinventory_batchitemporeceipt',
                    name:'idinventory'
                }, 
                {
                    xtype:'hiddenfield',
                    id:'idunit_batchitemporeceipt',
                    name:'idunit'
                },      
                {
                    xtype:'hiddenfield',
                    id:'qty_batchitemporeceipt',
                    name:'qty'
                }, 
                {
                    xtype:'hiddenfield',
                    id:'short_desc_batchitemporeceipt'
                },
                  {
                    xtype:'hiddenfield',
                    id:'warehouse_code_batchitemporeceipt'
                }, 
                {
                    xtype:'hiddenfield',
                    id:'nameinventory_batchitemporeceipt'
                },       
                         
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                         xtype:'textfield',
                         readOnly:true,
                         width:190,
                         id:'numbatch_itemporeturn',
                         fieldLabel:'Jumlah Batch'   
                        }
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableGridBatchPoReturn();
                    }
                }
            }
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
                // updateGridPurchaseOrder('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordPurchaseOrder: function(button, event, mode)
    {

    },
    saveRecurr: function() {
        if (validasiPurchaseOrder())
        {
            Ext.getCmp('formformRecc').getForm().reset();
            wformRecc.show();
        }
    },
    loadStore: function() {
    },
    onStoreLoad: function() {
    },
    onAddClick: function() {
    },
    onRemoveClick: function(grid, rowIndex) {
        this.getStore().removeAt(rowIndex);
        // updateGridPurchaseOrder('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});



Ext.define(dir_sys+'purchase2.WindowBatchItemListPoReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowBatchItemListPoReturn',
    id:'WindowBatchItemListPoReturn',
    title: 'Batch Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    modal:true,
    closeAction: 'hide',
//    autoWidth: true,
    width: panelW-200,
    height: sizeH-200,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridBatchPoReturn'
    }],
    listeners: {
            show: function() {
                // this.el.setStyle('top', '');
            }
        }
});