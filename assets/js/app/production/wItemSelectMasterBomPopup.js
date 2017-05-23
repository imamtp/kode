

// storeGridItemMasterBom.on('beforeload',function(store, operation,eOpts){
//         operation.params={
//                     'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
//                   };
//               });
Ext.define('GridItemSelectMasterBomModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','short_desc'],
    idProperty: 'id'
});

var storeGridItemSelectMasterBom = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemSelectMasterBomModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventoryall/inventory',
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

//form
var formCompositionBom = Ext.create('Ext.form.Panel', {
    id: 'formCompositionBom',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'production/CompositionBom',
     bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 130,
        width: 400
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'bom_id',
            // value:Ext.getCmp('bom_id_master').getValue(),
            id: 'bom_id_CompositionBom'
        },
        {
            xtype: 'hiddenfield',
            name: 'idinventory',
            id: 'idinventory_CompositionBom'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Qty Usage',
            allowBlank: false,
            name: 'qty_out',
            fieldStyle: 'text-align: right;',
            listeners: {
                'render': function(c) {
                    c.getEl().on('keyup', function() {
                        this.setRawValue(renderNomor(this.getValue()));
                    }, c);
                }
            }
        },{
            xtype:'comboxmeasurement',
            fieldLabel:'Measurement',
            name:'measurement_id',
            allowBlank:false
        }
    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            var win = Ext.getCmp('windowPopupCompositionBom');
            Ext.getCmp('formCompositionBom').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnCompositionBomSimpan',
        text: 'Save',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                         Ext.getCmp('windowPopupCompositionBom').hide();
                         Ext.getCmp('GridItemListPackageID').getStore().load();

                        // Ext.Msg.alert('Success', action.result.message);
                        // Ext.getCmp('formCompositionBom').getForm().reset();
                        // Ext.getCmp('windowPopupCompositionBom').hide();
                        // storeGridCompositionBom.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridCompositionBom.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wCompositionBom = Ext.create('widget.window', {
    id: 'windowPopupCompositionBom',
    title: 'Add Composisiton',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    modal:true,
    layout: 'fit',
    border: false,
    items: [formCompositionBom]
});
//end form

storeGridItemSelectMasterBom.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    'extraparams': 'a.inventory_type:'+2
                  };
              });
              
Ext.define('MY.searchGridItemSelectMasterBom', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemSelectMasterBom',
    store: storeGridItemSelectMasterBom,
    width: 180
});

var smGridItemSelectMasterBom = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemSelectMasterBom.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemSelectMasterBom').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSelectMasterBom').enable();
        }
    }
});

Ext.define('GridItemSelectMasterBom', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridItemSelectMasterBom,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemSelectMasterBomID',
    id: 'GridItemSelectMasterBomID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemSelectMasterBom',
    store: storeGridItemSelectMasterBom,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'assetaccount', dataIndex: 'assetaccount', hidden: true},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},
        {header: 'No SKU', dataIndex: 'sku_no', minWidth: 150},
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex:1},
        // {header: 'Merk', dataIndex: 'brand_name', minWidth: 150},
        {header: 'Beli', dataIndex: 'cost', minWidth: 130,xtype:'numbercolumn',align:'right'},
        {header: 'Jual', dataIndex: 'sellingprice', minWidth: 130,xtype:'numbercolumn',align:'right'},
        {header: 'Stok Sekarang', dataIndex: 'qtystock', minWidth: 130,align:'right'},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemSelectMasterBom',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemSelectMasterBom')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
//                            Ext.getCmp('accnamejurnal').setValue(selectedRecord.get('text'));
//                            Ext.getCmp('idaccountjurnal').setValue(selectedRecord.get('id'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));
// console.log(selectedRecord)
                               wCompositionBom.show();
                               Ext.getCmp('bom_id_CompositionBom').setValue(Ext.getCmp('bom_id_master').getValue());
                               Ext.getCmp('idinventory_CompositionBom').setValue(selectedRecord.get('idinventory'));
                               Ext.getCmp('wItemSelectMasterBomPopup').hide();
                               // 

                              
                        }


                    }
                },'-',
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemSelectMasterBom',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemSelectMasterBom, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemSelectMasterBom.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formItemSelectMasterBom = Ext.getCmp('formItemSelectMasterBom');
//            wItemSelectMasterBom.show();
//
//            formItemSelectMasterBom.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/ItemSelectMasterBom/1/setup',
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
//            Ext.getCmp('statusformItemSelectMasterBom').setValue('edit');
        }
    }
});

Ext.define(dir_sys+'production.wItemSelectMasterBomPopup', {
    extend: 'Ext.window.Window',
    alias: 'widget.wItemSelectMasterBomPopup',
    id:'wItemSelectMasterBomPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    closeAction: 'hide',
     modal:true,
    width: panelW-100,
    height: sizeH-100,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemSelectMasterBom'
    }],
    listeners:{
         'close':function(win){
                 // load_tmp_sales_return()
          },
         'hide':function(win){
                 // load_tmp_sales_return()
          }
    }
});

// var wItemSelectMasterBomPopup = Ext.create('widget.window', {
//     id: 'wItemSelectMasterBomPopup',
//     title: 'Choose Item',
//     header: {
//         titlePosition: 2,
//         titleAlign: 'center'
//     },
//     closable: true,
//     closeAction: 'hide',
// //    autoWidth: true,
//     modal:true,
//     width: panelW-100,
//     height: sizeH-100,
//     layout: 'fit',
//     border: false,
//     items: [{
//             xtype:'GridItemSelectMasterBom'
//     }]
// });