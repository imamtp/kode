


Ext.define('GridItemReceiptMaterialWOPopupPopupModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','invno','sku_no','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','totalstock','stock_kedua','satuan_pertama','satuan_kedua','inventory_type','idinventorycat','measurement_id_one'],
    idProperty: 'id'
});

var storeGridItemReceiptMaterialWOPopupPopup = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemReceiptMaterialWOPopupPopupModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryAll/inventory/',
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

storeGridItemReceiptMaterialWOPopupPopup.on('beforeload',function(store, operation,eOpts){
        operation.params={
                    // 'extraparams': 'b.namesupplier:'+Ext.getCmp('supplierPurchase').getValue()
                  };
              });
              
Ext.define('MY.searchGridItemReceiptMaterialWOPopupPopup', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemReceiptMaterialWOPopupPopup',
    store: storeGridItemReceiptMaterialWOPopupPopup,
    width: 180
});

var smGridItemReceiptMaterialWOPopupPopup = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridItemReceiptMaterialWOPopupPopup.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteItemSalesPopupOrder').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteItemSalesPopupOrder').enable();
        }
    }
});

Ext.define(dir_sys+'production.GridItemReceiptMaterialWOPopupPopup', {
    // renderTo:'mytabpanel',
//    multiSelect: true,
//    selModel: smGridItemReceiptMaterialWOPopupPopup,
//    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemReceiptMaterialWOPopupPopupID',
    id: 'GridItemReceiptMaterialWOPopupPopupID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemReceiptMaterialWOPopupPopup',
    store: storeGridItemReceiptMaterialWOPopupPopup,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'idunit', dataIndex: 'idunit', hidden: true},
        {header: 'assetaccount', dataIndex: 'assetaccount', hidden: true},
        {header: 'No. SKU', dataIndex: 'sku_no', minWidth: 150},
        {header: 'Kode Barang', dataIndex: 'invno', minWidth: 150},        
        {header: 'Nama Barang', dataIndex: 'nameinventory', minWidth: 150, flex:1},
        {
            header: 'Inventory Type',
            dataIndex: 'inventory_type',
            minWidth: 150,
            renderer: function(value) {
                return customColumnStatus(arrInventoryType,value);
            }
        },
        {
            header: 'Total Stock',
            dataIndex: 'totalstock',
            minWidth: 120,
            align: 'right'
        },
        {
            header: 'Satuan',
            dataIndex: 'satuan_pertama',
            minWidth: 100
        },{
            header: 'Stock #2',
            dataIndex: 'stock_kedua',
            minWidth: 70,
            xtype: 'numbercolumn',
            align: 'right'
        },
        {
            header: 'Satuan #2',
            dataIndex: 'satuan_kedua',
            minWidth: 100
        },
        // {header: 'Beli', dataIndex: 'cost', minWidth: 130,xtype:'numbercolumn',align:'right'},
        // {header: 'Jual', dataIndex: 'sellingprice', minWidth: 130,xtype:'numbercolumn',align:'right'}
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'chooseItemSalesPopupOrder',
                    text: 'Pilih Barang',
                    iconCls: 'add-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridItemReceiptMaterialWOPopupPopup')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih Barang terlebih dahulu!');
                        } else {
                            var form = Ext.getCmp('formInputBatchMaterialWo').getForm();

                            // form.findField('idinventorycat').getStore().load();
                            // form.findField("sku_no").
                            form.findField('idinventory').setValue(selectedRecord.get('idinventory'));
                            form.findField('sku_no').setValue(selectedRecord.get('sku_no'));
                            form.findField('invno').setValue(selectedRecord.get('invno'));
                            form.findField('nameinventory').setValue(selectedRecord.get('nameinventory'));
                            form.findField('measurement_id').setValue(selectedRecord.get('measurement_id_one'));
                            form.findField('inventory_type').setValue(selectedRecord.get('inventory_type'));
                            form.findField('idinventorycat').setValue(selectedRecord.get('idinventorycat'));
                            // form.findField('invno').setValue(selectedRecord.get('invno'));
//                            Ext.getCmp('accnumberjurnal').setValue(selectedRecord.get('accnumber'));
                    
                           Ext.getCmp('wItemReceiptMaterialWOPopup').hide();

                            
                        }


                    }
                },'-',
                '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridItemReceiptMaterialWOPopupPopup',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridItemReceiptMaterialWOPopupPopup, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                storeGridItemReceiptMaterialWOPopupPopup.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {
        }
    }
});

Ext.define(dir_sys+'production.wItemReceiptMaterialWOPopup', {
    extend:'Ext.window.Window',
    alias: 'widget.wItemReceiptMaterialWOPopup',
// var wItemReceiptMaterialWOPopup = Ext.create('widget.window', {
    id: 'wItemReceiptMaterialWOPopup',
    title: 'Choose Item',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 900,
    modal:true,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'GridItemReceiptMaterialWOPopupPopup'
    }]
});