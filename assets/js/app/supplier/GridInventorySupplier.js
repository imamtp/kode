
Ext.define('GridInventorySupplierModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory', 'invno', 'nameinventory', 'description', 'isinventory', 'issell', 'isbuy', 'cosaccount',
        'incomeaccount', 'assetaccount', 'qtystock', 'images', 'cost', 'unitmeasure', 'numperunit', 'minstock', 'idprimarysupplier',
        'sellingprice', 'idselingtax', 'unitmeasuresell', 'numperunitsell', 'notes', 'display', 'namesupplier', 'yearbuy', 'monthbuy', 'datebuy','namaunit'],
    idProperty: 'id'
});

var storeGridInventorySupplier = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventorySupplierModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventorysuppliergrid/supplier',
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

storeGridInventorySupplier.on('beforeload',function(store, operation,eOpts){
       operation.params={
                   'extraparams': 'a.idprimarysupplier:'+Ext.getCmp('idsupplier').getValue()
                 };
             });

Ext.define('MY.searchGridInventorySupplier', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventorySupplier',
    store: storeGridInventorySupplier,
    width: 180
});

var smGridInventorySupplier = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventorySupplier.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventorySupplier').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventorySupplier').enable();
        }
    }
});

Ext.define('GridInventorySupplier', {
    title: 'Daftar Barang',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventorySupplierID',
    id: 'GridInventorySupplierID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventorySupplier',
    store: storeGridInventorySupplier,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'No Inventory', dataIndex: 'invno', minWidth: 100},
        {header: 'Nama', dataIndex: 'nameinventory', minWidth: 200},
        {header: 'Deskripsi', dataIndex: 'description', minWidth:300},
        {header: 'Satuan', dataIndex: 'unitmeasure', minWidth: 100},
        {header: 'Harga Beli', dataIndex: 'cost', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        {header: 'Harga Jual', dataIndex: 'sellingprice', minWidth: 100, xtype: 'numbercolumn', align: 'right'}
    ],
    plugins: [{
            ptype: 'rowexpander',
             id: 'atata',  
//            expand: true,
            rowBodyTpl: new Ext.XTemplate(
                    '<p><b>Supplier:</b> {namesupplier}</p>',
                    '<p><b>Deskripsi:</b> {description}</p>',
                    '<p><b>Foto:</b><br/> <img src=' + BASE_URL + 'upload/{images} width=120/></p><br>'
                    )
        }],
    dockedItems: [
        // {
        //     xtype:'toolbar',
        //     dock:'top',
        //     items:[
        //         {
        //             xtype:'comboxunit',
        //             valueField:'idunit',
        //             id:'cbUnitInvAll',
        //             listeners: {
        //                 'change': function(field, newValue, oldValue) {
        //                     storeGridInventorySupplier.load({
        //                         params: {
        //                           'extraparams': 'd.idunit:'+Ext.getCmp('cbUnitInvAll').getValue()
        //                         }
        //                     });
        //                 }
        //             }
        //         }
        //     ]
        // },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    itemId: 'addInventorySupplier',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                        wInventorySupplier.show();
                        // alert(Ext.getCmp('idsupplier').getValue())
                        Ext.getCmp('idprimarysupplierInvSupplier').setValue(Ext.getCmp('idsupplier').getValue());
                    }
                },
                // {
                //     itemId: 'editInventorySupplier',
                //     text: 'Detail',
                //     iconCls: 'edit-icon',
                //     handler: function() {
                //         var grid = Ext.ComponentQuery.query('GridInventorySupplier')[0];
                //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
                //         var data = grid.getSelectionModel().getSelection();
                //         if (data.length == 0)
                //         {
                //             Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                //         } else {

                //             showEditInv(selectedRecord.data.idinventory);

                //             Ext.getCmp('statusformInventory').setValue('edit');
                //             storeGridAccInv.load();
                //         }

                //     }
                // }, 
                {
                    id: 'btnDeleteInventorySupplier',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridInventorySupplier')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/inventorysuppliergrid/supplier',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridInventorySupplier.remove(sm.getSelection());
                                    sm.select(0);

                                    // storeGridInventorySupplier.load();
                                    // storeGridInventoryInvGrid.load();
                                    // storeGridInventoryBuyGrid.load();
                                    // storeGridInventorySellGrid.load();
                                }
                            }
                        });
                    }
//                    disabled: true
                },'->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventorySupplier',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventorySupplier, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventorySupplier.load();
//                var myButton = Ext.getCmp('rowExpandInv');
//                myButton.handler.call(myButton.scope, myButton, Ext.EventObject)
//var grid = Ext.ComponentQuery.query('GridInventorySupplier')[0];
//                var grid = Ext.ComponentQuery.query('GridInventorySupplier')[0],
//                    store = grid.getStore(),
//                    rowExpander = grid.plugins[0],
//                    nodes = rowExpander.view.getNodes();
//
//                for (var i = 0; i < nodes.length; i++) {
//                    var node = Ext.fly(nodes[i]);
//
//                    if (node.hasCls(rowExpander.rowCollapsedCls) === expand) {
//                        rowExpander.toggleRow(i, store.getAt(i));
//                    }
//                }
            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
//            var formInventorySupplier = Ext.getCmp('formInventorySupplier');
//            wInventorySupplier.show();
//
//            formInventorySupplier.getForm().load({
//                url: SITE_URL + 'backend/loadFormData/InventorySupplier/1/inventory',
//                params: {
//                    extraparams: 'a.idinventory:' + record.data.idinventory
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
//            Ext.getCmp('statusformInventorySupplier').setValue('edit');
        }
    }
});

function setValueSupp(selectedRecord,winCmp,prefixCmp)
{
    // console.log(prefixCmp);
    Ext.getCmp('suppname'+prefixCmp).setValue(selectedRecord.get('namesupplier'));
    Ext.getCmp('idsupplier'+prefixCmp).setValue(selectedRecord.get('idsupplier'));
    var suppcodeCmp = Ext.getCmp('suppcode'+prefixCmp);
    if(suppcodeCmp!=undefined)
    {
        Ext.getCmp('suppcode'+prefixCmp).setValue(selectedRecord.get('code'));
    }

    Ext.getCmp(winCmp).hide();
}