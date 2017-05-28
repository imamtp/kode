// var COAReturnPO = Ext.create(dir_sys+'purchase2.COAReturnPO');

Ext.define('GridViewReturnItemPurchaseOrderModel', {
    extend: 'Ext.data.Model',
    fields: ['purchase_batch_id','idinventory','idpurchaseitem','qty_retur','qty_received','is_received','nameinventory','sku_no','invno','measurement_id_one','short_desc','warehouse_id','warehouse_code','notes'],
    idProperty: 'id'
});

var storeGridViewItemPurchaseOrder = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridViewReturnItemPurchaseOrderModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemReturnPO/purchase',
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

Ext.define(dir_sys+'purchase2.ViewReturnPO', {
    extend: 'Ext.grid.Panel',
    id: 'ViewReturnPO',
    alias: 'widget.ViewReturnPO',
    // selModel:smViewReturnPOGrid,
    // xtype: 'cell-editing',
    // title: 'Input Sales Order',
//    frame: true,    
    initComponent: function() {

        // this.cellEditing = new Ext.grid.plugin.CellEditing({
        //     clicksToEdit: 1
        // });

        Ext.apply(this, {
            width: panelW-60,
            height: sizeH-120,
            // forceFit: true,
            // plugins: [this.cellEditing],
            store: storeGridViewItemPurchaseOrder,
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
                    dataIndex: 'qty_retur',
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
                        // {
                        //     xtype:'hiddenfield',
                        //     id:'idpurchase_viewporeturn',
                        //     name:'idpurchase'
                        // },
                        {
                            xtype:'hiddenfield',
                            id:'purchase_return_id_viewporeturn',
                            name:'purchase_return_id'
                        },
                        {
                            xtype:'hiddenfield',
                            id:'statusform_viewporeturn',
                            name:'statusFormPurchaseOrder'
                        },
                
                 {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'textfield',
                            readOnly:true,
                            labelWidth: 120,
                            id: 'noreturn_viewporeturn',
                            fieldLabel: 'NO Return #',
                            listeners: {
                                render: function(component) {
                                    // component.getEl().on('click', function(event, el) {
                                    //     insertNoID(4, Ext.getCmp('cbUnit_viewporeturn').getValue(),'idpurchase','purchase','noreturn_viewporeturn','RETPO');
                                    //     // insertNoRef(4, Ext.getCmp('cbUnit_viewporeturn').getValue(), 'noreturn_viewporeturn','RET');
                                    // });
                                }
                            }
                        }, 
                        {
                            xtype: 'textfield',
                            readOnly:true,
                            labelWidth: 120,
                            id: 'nopo_viewporeturn',
                            fieldLabel: 'NO PO #'
                        }, 
                        {
                            xtype: 'datefield',
                            readOnly:true,
                            labelWidth: 120,
                            name:'po_date',
                            id: 'po_date_viewporeturn',
                            format: 'd/m/Y',
                            fieldLabel: 'PO Date'
                        }, 
                        {
                            xtype: 'comboxunit',
                            readOnly:true,
                            valueField: 'idunit',
                            labelWidth: 120,
                            valueField: 'idunit',
                            id: 'cbUnit_viewporeturn'
//                            ,multiSelect:true
                        }
                    ]
                }, 
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        
                        {
                            xtype: 'comboxidsupplier',
                            readOnly:true,
                            id: 'supplier_viewporeturn',
                            labelWidth: 120
                        }, 
                         {
                            xtype: 'datefield',
                            labelWidth: 120,
                            name:'return_date',
                            id: 'return_date_viewporeturn',
                            format: 'd/m/Y',
                            fieldLabel: 'Return Date'
                        },                        
                        {
                            xtype:'comboxtaxtype',
                            readOnly:true,
                            labelWidth: 120,
                            name:'idtax',
                            valueField:'idtax',
                            id:'cb_tax_id_viewporeturn',                            
                              listeners: {
                                select: function(combo, record, index) {
                                  // alert(combo.getValue()); // Return Unitad States and no USA
                                  // updateGridPurchaseOrder();
                                }
                            }
                        }, 
                        {
                            xtype:'comboxPOReturnStatus',
                            name:'po_return_status',
                            // readOnly:true,
                            labelWidth: 120,
                            id:'cb_status_viewporeturn'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                       {
                            xtype: 'textfield',
                            id: 'shipaddress_viewporeturn',
                            hidden:true,
                            labelWidth: 120,
                            width: 500,
                            fieldLabel: 'Alamat Pengiriman',
                            listeners: {
                                render: function(component) {
                                }
                            }
                        },
                        ,
                        '->',
                          {
                            xtype: 'textfield',
                            align: 'right',
                            readOnly: true,
                            labelWidth: 120,
                            hidden:true,
                            id: 'total_viewporeturn',
                            fieldLabel: 'Setelah Pajak',
                            fieldStyle: 'text-align: right;'
                        }
                        
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 620,
                            hidden:true,
                            labelWidth: 150,
                            id: 'notes_viewporeturn',
                            fieldLabel: 'Catatan'
                        },
                        '->',
                      {
                            xtype: 'textfield',
                            align: 'right',
                            hidden:true,
                            name:'totalPajak',
                            readOnly: true,
                            labelWidth: 120,
                            id: 'totalPajak_viewporeturn',
                            fieldLabel: 'Pajak',
                            fieldStyle: 'text-align: right;'
                        }
//                         {
//                             xtype: 'textfield',
//                             id: 'angkutPurchaseOrder',
//                             align: 'right',
// //                            readOnly: true,
//                             labelWidth: 120,
//                             fieldLabel: 'Biaya Angkut',
//                             fieldStyle: 'text-align: right;',
//                             listeners: {
//                                 'render': function(c) {
//                                     c.getEl().on('keyup', function() {
//                                         updateGridPurchaseOrder('general');
//                                     }, c);
//                                 }
//                             }
//                         }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Akun Retur Pembelian',
                            combineErrors: true,
                            msgTarget: 'side',
                            layout: 'hbox',
                            labelWidth: 150,
                            defaults: {
                                flex: 1,
                                hideLabel: true
                            },
                            items: [{
                                xtype: 'textfield',
                                allowBlank: false,
                                name: 'accnamereturpo',
                                id: 'accname_coa_viewretur_po',
                                listeners: {
                                    render: function(component) {
                                        component.getEl().on('click', function(event, el) {
                                            if (Ext.getCmp('cbUnit_viewporeturn').getValue() == null) {
                                                Ext.Msg.alert('Perhatian', 'Unit belum dipilih');
                                            } else {
                                                COAReturnPO.show();
                                                storeGridAccount.on('beforeload',function(store, operation,eOpts){
                                                    operation.params={
                                                                'idunit': Ext.getCmp('cbUnit_viewporeturn').getValue(),
                                                                'idaccounttype': '12,16'
                                                    };
                                                });
                                                storeGridAccount.load();
                                            }
                                        });
                                    }
                                }
                            }, {
                                xtype: 'displayfield',
                                id: 'accnumber_coa_viewretur_po',
                            }, {
                                xtype: 'hiddenfield',
                                name:'idaccount',
                                id: 'idaccount_coa_viewretur_po',
                            }]
                        }, 
                    //     {
                    //     xtype:'textfield',

                    //     labelWidth: 150,
                    //     readOnly: true,
                    //     fieldLabel:'Total Barang Retur',
                    // },
                        {
                            xtype: 'comboxcurrency',
                            hidden:true,
                            id: 'comboxcurrency_viewporeturn',
                            labelWidth: 120
                        },
                         '->',
                       {
                            xtype: 'textfield',
                            align: 'right',
                            hidden:true,
                            readOnly: true,
                            labelWidth: 120,
                            id: 'subtotal_viewporeturn',
                            fieldLabel: 'Subtotal',
                            fieldStyle: 'text-align: right;'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->',
                         {
                            xtype: 'textfield',
                            id: 'pembayaran_viewporeturn',
                            align: 'right',
                            hidden:true,
//                            readOnly: true,
                            labelWidth: 120,
                            fieldLabel: 'Pembayaran/DP',
                            fieldStyle: 'text-align: right;',
                            listeners: {
                                'render': function(c) {
                                    c.getEl().on('keyup', function() {
                                        updateGridPurchaseOrder('general');
                                    }, c);
                                }
                            }
                        }
                          
                       
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                    console.log(dataRecord);
                    
                    
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableViewReturnPO();
                    }
                }
            }
        });

        this.callParent();

        // this.on('afterlayout', this.loadStore, this, {
        //     delay: 1,
        //     single: true
        // });

        // this.on('afteredit', this.onAfterEdit, this);

        // this.on({
        //     scope: this,
        //     edit: function() {
        //         // updateGridPurchaseOrder('general');
        //     }
        // });
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
//        console.log(Ext.getCmp('supplierPurchaseOrder').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
            // wItemPurchaseOrderPopup.show();
            // storeGridItemSalesPopupOrder.load();

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
        this.getStore().removeAt(rowIndex);
        // updateGridPurchaseOrder('general')
    },
    // onEdit: function(editor, e) {
    //     e.record.commit();
    // }
});

function updateGridPurchaseOrder(tipe)
{
    console.log('update run');
//     var addprefix = '_viewporeturn';

//     var subtotalPurchaseOrder = 0 * 1;
//     var totalPurchaseOrder = 0 * 1;
//     var totalPajak = 0 * 1;
//     // var angkutPurchaseOrder = Ext.getCmp('angkutPurchaseOrder').getValue();
//      var angkutPurchaseOrder = 0;
//     var pembayaranPurchaseOrder = Ext.getCmp('pembayaranPurchaseOrder').getValue();
//     var sisaBayarPurchaseOrder = 0 * 1;
//     var taxrate = Ext.getCmp('cb_tax_id_po').getValue();

//     Ext.each(storeGridViewItemPurchaseOrder.data.items, function(obj, i) {
//         var total = obj.data.qty * (obj.data.price * obj.data.size);
//         var diskon = (total / 100) * obj.data.disc;

//         var net = total - diskon;
//         console.log(total+' - '+diskon);

//         subtotalPurchaseOrder += net;
//         totalPajak += (net / 100) * (taxrate * 1);
//         obj.set('ratetax', taxrate);
//         obj.set('total', net);
//     });

// //     console.log(subtotalPurchaseOrder);
//     totalPurchaseOrder = subtotalPurchaseOrder + angkutPurchaseOrder * 1;
// //     console.log(totalPurchaseOrder+' '+totalPajak);
//     totalPurchaseOrder = totalPurchaseOrder + totalPajak;
// //     console.log(totalPurchaseOrder);
//     sisaBayarPurchaseOrder = totalPurchaseOrder - pembayaranPurchaseOrder;
//     // alert(totalPajak);
//     Ext.getCmp('subtotal' + addprefix).setValue(subtotalPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
//     Ext.getCmp('total' + addprefix).setValue(totalPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
//     Ext.getCmp('totalPajak' + addprefix).setValue(totalPajak.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('angkutPurchaseOrder').setValue(angkutPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('pembayaran').setValue(pembayaranPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));
    // Ext.getCmp('sisaBayarPurchaseOrder').setValue(sisaBayarPurchaseOrder.toLocaleString('null', {minimumFractionDigits: 2}));

}

function validasiPurchaseOrder()
{
//    alert(Ext.getCmp('comboxcurrencyPurchaseOrder').getValue());   

    if (Ext.getCmp('supplierPurchaseOrder').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Supplier belum dipilih');

    } else if (Ext.getCmp('delivery_date_PurchaseOrder').getValue() == null)
    {
        Ext.Msg.alert('Failed', 'Masukkan tanggal Purchase Order');
    } 
    // else if (Ext.getCmp('shipaddressPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan alamat pengiriman');
    // } 
    // else if (Ext.getCmp('nojurnalPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan NO SO');
    // } else if (Ext.getCmp('memoPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan Memo Sales Order');
    // } else if (Ext.getCmp('totalPurchaseOrder').getValue() == '')
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan barang');
    // } else if (Ext.getCmp('paymentPurchaseOrder').getValue() == null)
    // {
    //     Ext.Msg.alert('Failed', 'Tentukan pembayaran');
    // } else if (Ext.getCmp('paymentPurchaseOrder').getValue() == 3 && Ext.getCmp('tglPelunasanPurchaseOrder').getValue() == null)
    // {
    //     Ext.Msg.alert('Failed', 'Masukkan tanggal pelunasan');
    // } else if(Ext.getCmp('paymentPurchaseOrder').getValue()==1 && Ext.getCmp('pembayaranPurchaseOrder').getValue()==0)
    // {
    //      Ext.Msg.alert('Failed', 'Jumlah Pembayaran Tunai Belum Diinput');
    // }
    // else if (Ext.getCmp('paymentPurchaseOrder').getValue() == 1 && Ext.getCmp('idaccountPurchaseOrder').getValue() == '')
    // {
    //     //kalo tunai harus menggunakan akun persediaan / barang datang
    //     Ext.Msg.alert('Failed', 'Tentukan akun persediaan/barang dagang');
    // } 
    else {
        return true;
    }
}


Ext.define(dir_sys + 'purchase2.WindowViewReturnPO', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowViewReturnPO',
    id: 'WindowViewReturnPO',
    title: 'Purchase Order Return Data',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy: false,
    modal: true,
    closeAction: 'hide',
    //    autoWidth: true,
    width: panelW,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'ViewReturnPO'
    }],
    buttons: [
    {
        text: 'Cancel',
        handler: function() {
            Ext.getCmp('WindowViewReturnPO').hide();
           
        }
    },{
        text: 'Update Purchase Return',
        handler: function() {
            var storeEntryReturnPO = Ext.getCmp('EntryReturnPO').getStore();
            // var storeGridBatchPoReturn = Ext.getCmp('GridBatchPoReturn').getStore();
            // var ItemGRjson = Ext.encode(Ext.pluck(storeEntryReturnPO.data.items, 'data'));
            // var itemBatchPoReturn = Ext.encode(Ext.pluck(storeGridBatchPoReturn.data.items, 'data'));
            

              Ext.Ajax.request({
                    url: SITE_URL + 'purchase/update_return',
                    method: 'POST',
                    params: {
                        // itemgrid:ItemGRjson,                        
                        // itembatch:itemBatchPoReturn,
                        // idunit : Ext.getCmp('cbUnit_poreturn').getValue(),
                        idaccount_return : Ext.getCmp('idaccount_coa_viewretur_po').getValue(),
                        // idpurchase:Ext.getCmp('idpurchase_poreturn').getValue(),
                        purchase_return_id:Ext.getCmp('purchase_return_id_viewporeturn').getValue(),
                        // noreturn: Ext.getCmp('noreturn_poreturn').getValue(),
                        status: Ext.getCmp('cb_status_viewporeturn').getValue(),
                        ret_date: Ext.getCmp('return_date_viewporeturn').getSubmitValue()
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);
                        if(d.status){
                            Ext.getCmp('WindowViewReturnPO').hide();
                        } else {

                        }
                        Ext.Msg.alert('Info', d.message);
                        Ext.getCmp('PurchaseReturnGridID').getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
        }
    }, ]
});