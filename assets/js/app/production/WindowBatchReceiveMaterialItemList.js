var wItemReceiptMaterialWOPopup =  Ext.create(dir_sys + 'production.wItemReceiptMaterialWOPopup');

Ext.define('storeGridBatchItemMaterialWOListModel', {
    extend: 'Ext.data.Model',
     fields: [
        'prod_material_id','idinventory','sku_no','invno','nameinventory','qty','short_desc','warehouse_code','notes'
    ],
    idProperty: 'id'
});

var storeGridBatchItemMaterialWOList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storeGridBatchItemMaterialWOListModel',
    //remoteSort: true,

    // autoload:true,
    proxy: {
        type: 'ajax',
         url: SITE_URL + 'production/get_material_batch',
        actionMethods: 'GET',
        method: 'GET',
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

/////

var formInputBatchMaterialWo = Ext.create('Ext.form.Panel', {
    id: 'formInputBatchMaterialWo',
    width: 540,
    // autoWidth:true,
    autoHeight:true,
    bodyStyle: 'padding:5px',
    // height: 370,
    // url: SITE_URL + 'backend/saveform/InputQtyItemStockTransfer/master',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        anchor:'100%'
        // width: 400
    },
    items: [
        {
            xtype:'hiddenfield',
            name:'idinventory',
            id:'idinventory_transfer_stock'
        },
        {
            xtype: 'radiogroup',
            labelWidth:200,
            // labelWidth:220,
            fieldLabel: 'Terima sisa raw material menjadi',
            // columns: 2,
            vertical: true,
            items: [
                {boxLabel: 'Persediaan Baru', name: 'wo_receipt_material_type', inputValue: 1,  checked: true, width:150},
                {boxLabel: 'Persediaan Lama', name: 'wo_receipt_material_type', inputValue: 2, width:150}
            ],
            listeners: {
              change: function(radiogroup, radio) {
                var form = this.up('form').getForm();
               

                if(radio.wo_receipt_material_type==2)
                {
                   form.findField("sku_no").setReadOnly(true);
                   // form.findField("invno").setReadOnly(true);
                   form.findField("nameinventory").setReadOnly(true);
                   // form.findField("qty").setReadOnly(true);
                   form.findField("measurement_id").setReadOnly(true);
                   form.findField("inventory_type").setReadOnly(true);
                   form.findField("idinventorycat").setReadOnly(true);

                   form.findField("invno").show();
                   form.findField("invno_input").hide();
                } else {
                   form.findField("sku_no").setReadOnly(false);
                   // form.findField("invno").setReadOnly(false);
                   form.findField("nameinventory").setReadOnly(false);
                   // form.findField("qty").setReadOnly(false);
                   form.findField("measurement_id").setReadOnly(false);
                   form.findField("inventory_type").setReadOnly(false);
                   form.findField("idinventorycat").setReadOnly(false);

                   form.findField("invno").hide();
                   form.findField("invno_input").show();

                    form.reset();
                }
              }
            }
        },{
            xtype:'textfield',
            hidden:true,
            fieldLabel:'Pilih Kode Barang',
            name:'invno',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                            wItemReceiptMaterialWOPopup.show();

                            var GridItemReceiptMaterialWOPopupPopupID = Ext.getCmp('GridItemReceiptMaterialWOPopupPopupID').getStore();
                            
                            // GridReceivedByPOPopupID.on('beforeload',function(store, operation,eOpts){
                            //     operation.params={
                            //                 'extraparams': 'a.status:'+1
                            //     };
                            // });
                            GridItemReceiptMaterialWOPopupPopupID.load();

                    });
                }
            }
        },
        {
            xtype:'textfield',
            fieldLabel:'Kode Barang',
            name:'invno_input'
        },
        {
            xtype:'textfield',
            fieldLabel:'No SKU',
            name:'sku_no',
            allowBlank:false
        },
        {
            xtype:'textfield',
            fieldLabel:'Nama Barang',
            name:'nameinventory',
            allowBlank:false
        },
        {
            xtype: 'numericfield',
            fieldLabel: 'Qty',
            // minValue:1,
            allowBlank: false,
            name: 'qty'
        },
        {
            xtype: 'comboxmeasurement',
            name: 'measurement_id',
            valueField: 'measurement_id',
            displayField: 'short_desc'
        },
         {
            xtype:'comboxInventoryType',
            name:'inventory_type',
            allowBlank:false
        }, {
            xtype: 'comboxinventorycat',
            fieldLabel:'Product Type',
            allowBlank: false,
            valueField:'idinventorycat',
            name: 'idinventorycat'
        },
        {
            xtype: 'comboxWarehouse',
            name:'warehouse_id',
            allowBlank: false,
            valueField: 'warehouse_id',
            displayField: 'warehouse_code',
        }, {
            xtype: 'textarea',
            fieldLabel: 'Notes',
            name: 'notes'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupInputBatchMaterialWo');
            Ext.getCmp('formInputBatchMaterialWo').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnInputBatchMaterialWoSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                var max = Ext.getCmp('totalqty_itembatchmaterial_wo').getValue()*1;
                var qty = form.findField("qty").getValue()*1;
                
                if(qty>max){
                    Ext.Msg.alert("Error!", "Qty input lebih besar dari Qty maksimal penerimaan ("+max+")");
                } else {
                    var passed = true;

                    var total_qty_existed = 0;
                    Ext.each(storeGridBatchItemMaterialWOList.data.items, function(obj, i) {
                       total_qty_existed+=obj.data.qty*1;
                    });
                    total_qty_existed+=qty;
                    console.log(total_qty_existed+'>'+max)
                    if(total_qty_existed*1>max){
                        Ext.Msg.alert("Error!", "Qty input melebihi dari Qty maksimal penerimaan ("+max+")");
                    } else {

                         Ext.Ajax.request({
                                    url: SITE_URL + 'production/save_material_batch',
                                    method: 'POST',
                                    params: {
                                        prod_material_id: Ext.getCmp('prod_material_id_itembatchmaterial_wo').getValue(),
                                        idinventory:form.findField("idinventory").getValue(),
                                        sku_no: form.findField("sku_no").getValue(),
                                        invno: form.findField("invno").getValue(),
                                        invno_input: form.findField("invno_input").getValue(),
                                        nameinventory: form.findField("nameinventory").getValue(),
                                        warehouse_id: form.findField("warehouse_id").getValue(),
                                        qty: qty,
                                        measurement_id: form.findField("measurement_id").getValue(),
                                        notes: form.findField("notes").getValue(),
                                        inventory_type: form.findField("inventory_type").getValue(),
                                        idinventorycat: form.findField("idinventorycat").getValue(),
                                        is_temp:1
                                    },
                                    success: function(form, action) {
                                        var d = Ext.decode(form.responseText);

                                        storeGridBatchItemMaterialWOList.on('beforeload',function(store, operation,eOpts){
                                               operation.params={
                                                           'prod_material_id': Ext.getCmp('prod_material_id_itembatchmaterial_wo').getValue(),
                                                           'is_tmp':1
                                                         };
                                                     });
                                        storeGridBatchItemMaterialWOList.load();

                                        Ext.getCmp('formInputBatchMaterialWo').getForm().reset();
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });

                        Ext.getCmp('windowPopupInputBatchMaterialWo').hide();
                    }
                    
                }
               // console.log(form.findField("max_transfer_stock").getValue())

                        

            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wInputBatchMaterialWo = Ext.create('widget.window', {
    id: 'windowPopupInputBatchMaterialWo',
    title: 'Entry Batch Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formInputBatchMaterialWo]
});
//////////////////////

Ext.define(dir_sys+'purchase2.GridBatchMaterialWoReceipt', {
    extend: 'Ext.grid.Panel',
    id: 'GridBatchMaterialWoReceipt',
    alias: 'widget.GridBatchMaterialWoReceipt',
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
            plugins: [this.cellEditing],
            store: storeGridBatchItemMaterialWOList,
            columns: [
               {
                    header: 'prod_material_id',
                    hidden: true,
                    dataIndex: 'prod_material_id',
//                    id: 'idinventory'
                }, {
                    header: 'idinventory',
                    hidden: true,
                    dataIndex: 'idinventory',
//                    id: 'idinventory'
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
                    header: 'Warehouse',
                    minWidth: 150,
                    dataIndex: 'warehouse_code',
                    // editor: {
                    //     xtype: 'comboxWarehouse',
                    //     hideLabel:true,
                    //     valueField: 'warehouse_code',
                    //     displayField: 'warehouse_code',
                    //     labelWidth: 100
                    // }
                },
                {
                    header: 'Catatan',
                    minWidth: 150,
                    dataIndex: 'notes',
                    // editor: {
                    //     xtype: 'textfield',
                    //     hideLabel:true,
                    //     labelWidth: 100
                    // }
                }
            ],
            selModel: {
                selType: 'cellmodel'
            },
            dockedItems: [ 
                {
                    xtype:'hiddenfield',
                    id:'idpurchase_itembatchmaterial_wo',
                    name:'idpurchase'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype:'textfield',
                            readOnly:true,
                            labelWidth:250,
                            fieldLabel:'Total qty raw material yang harus diterima',
                            id:'totalqty_itembatchmaterial_wo'
                        },
                        {
                            xtype:'hiddenfield',
                            readOnly:true,
                            labelWidth:250,
                            fieldLabel:'prod_material_id',
                            id:'prod_material_id_itembatchmaterial_wo'
                        },
                        {
                         xtype:'numericfield',
                         hidden:true,
                         width:190,
                         id:'numbatch_itembatchmaterial_wo',
                         fieldLabel:'Jumlah Batch'   
                        },
                        {
                            text: 'Terima',
                            id:'buatbatchbtn_itembatchmaterial_wo',
                            handler: function() {
                                wInputBatchMaterialWo.show();

                                inventoryCategoryStore.load();
                                productMeasurementStore.load();


                            }
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
                        // disableGridBatchMaterialWoReceipt();
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
               // if(Ext.getCmp('statusform_poreceipt').getValue()==='input'){
               //      updateGRBatch()
               // }
               
               // if(Ext.getCmp('statusform_poreceipt').getValue()==='edit'){
               //      if(Ext.getCmp('numbatch_itembatchmaterial_wo').getValue()*1===0){
               //          //kalo batchnya masih kosong boleh edit
               //           updateGRBatch()
               //      }
                   
               //     if(Ext.getCmp('cb_status_poreceipt').getValue()*1===1){
               //          //kalo statusnya masih open boleh edit
               //          updateGRBatch()
               //     }
               // }
               
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


Ext.define(dir_sys+'production.WindowBatchReceiveMaterialItemList', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowBatchReceiveMaterialItemList',
    id:'WindowBatchReceiveMaterialItemList',
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
            xtype:'GridBatchMaterialWoReceipt'
    }],
    listeners: {
            show: function() {
                // this.el.setStyle('top', '');
            }
        }
});