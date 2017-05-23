Ext.define('ItemSelectorSalesReturnModel', {
    extend: 'Ext.data.Model',
    fields: ['idsalesitem','idinventory','invno','nameinventory','cost','sellingprice','qtystock','idunit','assetaccount','brand_name','sku_no','price','qty','total','ratetax','disc','short_desc','warehouse_code','qty_retur','notes'],
    idProperty: 'id'
});

var storeGridItemSelectorSalesReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ItemSelectorSalesReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/ItemSalesReturn/sales',
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

var smItemSelectorSalesReturn = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridPurchase.getSelection().length;
            // if (selectedLen == 0) {
            //     Ext.getCmp('GridPurchaseID').queryById('btnEdit').setDisabled(true);
            //     Ext.getCmp('GridPurchaseID').queryById('btnDelete').setDisabled(true);
            // }
        },
        select: function(model, record, index) {
            // Ext.getCmp('GridPurchaseID').queryById('btnEdit').setDisabled(false);
            // Ext.getCmp('GridPurchaseID').queryById('btnDelete').setDisabled(false);
        }
    }
});

Ext.define(dir_sys + 'sales.ItemSelectorSalesReturn', {
    extend: 'Ext.grid.Panel',
    id: 'ItemSelectorSalesReturn',
    alias: 'widget.ItemSelectorSalesReturn',
    xtype: 'cell-editing',
    title: 'Choose Item for Return',
//    frame: true,    
    initComponent: function() {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            forceFit: true,
            plugins: [this.cellEditing],
            store: storeGridItemSelectorSalesReturn,
            selModel: smItemSelectorSalesReturn,
            loadMask: true,
            columns: [
                {
                    header: 'idsalesitem',
                    hidden: true,
                    dataIndex: 'idsalesitem',
//                    id: 'idinventory'
                },
                {
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
                    header: 'Kode Barang',
                    dataIndex: 'invno',
//                    id: 'invno',
                    minWidth:150
                },
                {
                    header: 'Nama Barang',
                    dataIndex: 'nameinventory',
                    minWidth:150,
//                    id: 'nameinventory'
                },                
                {
                    header: 'Warehouse',
                    minWidth:150,
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
                    xtype: 'numbercolumn',
                    header: 'Qty Order',
                    minWidth:70,
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
                    minWidth:70,
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
                    header: 'Qty Retur',
                    minWidth:70,
                    dataIndex: 'qty_retur',
                    align: 'right',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 1
                    }
                },
                {
                    // xtype: 'numbercolumn',
                    header: 'Catatan',
                    minWidth:170,
                    dataIndex: 'notes',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }
            ],
            // selModel: {
            //     selType: 'cellmodel'
            // },
            dockedItems: [ 
            {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Choose Item',
                            iconCls: 'add-icon',
                            id:'btnAddItemSalesReturn',
                            scope: this,
                            handler: this.onAddClick
                        },
                        {
                            text: 'Done and Back to Sales Return Form',
                            iconCls: 'edit-icon',
                            scope: this,
                            handler: this.onTurnBackClick
                        },
                        {
                            xtype:'hiddenfield',
                            id:'idsales_tmp_sr',
                            name:'idsales_tmp_sr'
                        }
                        // ,'->',
                        // {
                        //     text:'Total Items For Return: '
                        // }
                    ]
                }
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disableItemSelectorSalesReturn();
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
                // updateGridSalesReturn('general');
            }
        });
    },
    onAfterEdit: function(o) {
        // handle after edit
        console.log('after edit');
    },
    recordSalesReturn: function(button, event, mode)
    {


    },
    saveRecurr: function() {
        if (validasiSalesReturn())
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
    onTurnBackClick: function(){
        Ext.getCmp('WindowSelectorSalesReturn').hide();
    },
    onAddClick: function() {

          // var grid = Ext.ComponentQuery.query('SalesReturnGrid')[0];
                 // var grid = Ext.getCmp('GridSalesReturnGridID');
        // var selectedRecord = grid.getSelectionModel().getSelection()[0];
        // var data = grid.getSelectionModel().getSelection();

        // var selectedRowIndexes = [];
        // // var grid = Ext.getCmp('ItemSelectorSalesReturn');
        // var grid = Ext.ComponentQuery.query('ItemSelectorSalesReturn')[0];

        // // returns an array of selected records
        // var selectedBanners = grid.getSelectionModel().getSelections(); 

        // Ext.iterate(selectedBanners, function(banner, index) {
        //     // push the row indexes into your array
        //     // selectedRowIndexes.push(grid.getStore().indexOf(banner)); 
        //     selectedRowIndexes.push(item.data);
        // });  

        // console.log(selectedRowIndexes);

    var arrayList=[],
    selected=Ext.getCmp('ItemSelectorSalesReturn').getView().getSelectionModel().getSelection();

    // var data = selected.getSelectionModel().getSelection();
    if (selected.length == 0) {
        Ext.Msg.alert('Failure', 'Pilih barang yang akan diretur terlebih dahulu!');
    } else {

            Ext.each(selected, function (item,idx) {

                    if(item.data.qty_retur===0){
                        Ext.Msg.alert('Failed', 'Masukkan jumlah yang diretur untuk barang <b>'+item.data.nameinventory);
                        return false;
                    }

                    if(item.data.qty_retur>item.data.qty){
                        Ext.Msg.alert('Failed', 'Jumlah yang diretur melebihi jumlah order untuk barang <b>'+item.data.nameinventory);
                        return false;
                    }

                    // arrayList.push(item.data);  

                     storeGridItemSelectorSalesReturn.removeAt(idx);  

                     Ext.Ajax.request({
                            url: SITE_URL + 'sales/save_item_sales_return_tmp',
                            method: 'POST',
                            params: {
                                idsalesitem: item.data.idsalesitem,
                                qty_retur: item.data.qty_retur,
                                qty: item.data.qty,
                                idsales: Ext.getCmp('idsales_tmp_sr').getValue(),
                                token:Ext.getCmp('tokenSalesReturnGrid_sr').getValue(),
                                notes: item.data.notes
                            },
                            success: function(form, action) {
                                // var d = Ext.decode(form.responseText);
                                // if (!d.success) {
                                //     Ext.Msg.alert('Informasi', d.message);
                                // }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                    });      
            });
    }



                        // console.log(arrayList);


//        console.log(Ext.getCmp('customerSalesReturn').getValue())
//        Ext.getCmp('idaccount').setValue('sad');
//        // Create a model instance
//        Ext.getCmp('formAddRowJurnal').getForm().reset();
            // wItemSalesPopupOrderPopup.show();
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
        // updateGridSalesReturn('general')
    },
    onEdit: function(editor, e) {
        e.record.commit();
    }
});


Ext.define(dir_sys+'sales.WindowItemSelectorSalesReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowItemSelectorSalesReturn',
    id:'WindowItemSelectorSalesReturn',
    title: 'Entry Sales Return ',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    modal:true,
    closeAction: 'hide',
//    autoWidth: true,
    width: panelW,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'ItemSelectorSalesReturn'
    }]
});

// function updateGridSalesReturn(tipe)
// {

// }

// function validasiSalesReturn()
// {
// }