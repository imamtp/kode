Ext.define('GridInventoryStockModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','warehouse_id','stock','idunit','warehouse_code','measurement_id_one','measurement_id_two','satuan_pertama','satuan_kedua','stock_kedua','datemod'],
    idProperty: 'id'
});
var storeGridInventoryStock = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryStockModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/InventoryStock/inventory',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'brand_name',
        direction: 'DESC'
    }]
});

Ext.define(dir_sys+'inventory.GridStockInventoryTab', {
    title: 'Stock',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridStockInventoryTab',
    id: 'GridStockInventoryTab',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridStockInventoryTab',
    store: storeGridInventoryStock,
    loadMask: true,
    columns: [{
        header: 'idunit',
        dataIndex: 'idunit',
        hidden: true
    }, {
        header: 'idinventory',
        dataIndex: 'idinventory',
        hidden: true
    }, {
        header: 'Warehouse',
        flex:1,
        dataIndex: 'warehouse_code',
        minWidth: 150
    }, {
        header: 'Stock',
        dataIndex: 'stock',
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
    {
        header: 'Last Update',
        dataIndex: 'datemod',
        minWidth: 150
    }],
    dockedItems: [
         {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryStock, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
            // pageSize:20
        }
    ]
    // listeners: {
    //     itemdblclick: function(dv, record, item, index, e) {
    //         // var formAgama = Ext.create('formAgama');
    //         var formlinkedaccInventory = Ext.getCmp('formlinkedaccInventory');
    //         wlinkedaccInventory.show();
    //         Ext.getCmp('namaunitAccInventory').setValue(record.data.namaunit)
    //         Ext.getCmp('idunitAccInventory').setValue(record.data.idunit)
    //         Ext.getCmp('idinventoryAccInventory').setValue(Ext.getCmp('idinventoryInv').getValue());
    //         // storeGridSetupUnit.load();
    //         formlinkedaccInventory.getForm().load({
    //             url: SITE_URL + 'backend/loadFormData/acclinkinventory/1/inventory',
    //             params: {
    //                 extraparams: 'idunit:' + record.data.idunit + ',' + 'idinventory:' + Ext.getCmp('idinventoryInv').getValue()
    //             },
    //             success: function(form, action) {
    //                 var obj = Ext.decode(action.response.responseText);
    //                 console.log(obj)
    //                 // accasset: "Perlengkapan Kantor"akumpenyusut: "Akum. Penyusutan Peralatan"
    //                 // depresiasi: "Operasional Kantor"idinventory: "16"idunit: "2"namaunit: "SMIP"
    //                 Ext.getCmp('idinventoryAccInventory').setValue(obj.data.idinventory);
    //                 Ext.getCmp('idunitAccInventory').setValue(obj.data.idunit);
    //                 Ext.getCmp('namaunitAccInventory').setValue(obj.data.namaunit);
    //                 Ext.getCmp('assetaccount').setValue(obj.data.assetaccount);
    //                 Ext.getCmp('accnameAsset').setValue(obj.data.accasset);
    //                 Ext.getCmp('akumpenyusutaccount').setValue(obj.data.akumpenyusutaccount);
    //                 Ext.getCmp('accnamePenyusutan').setValue(obj.data.akumpenyusut);
    //                 Ext.getCmp('depresiasiaccount').setValue(obj.data.depresiasiaccount);
    //                 Ext.getCmp('accnameDepresiasi').setValue(obj.data.depresiasi);
    //                 // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //             },
    //             failure: function(form, action) {
    //                 // Ext.Msg.alert("Load failed", action.result.errorMessage);
    //             }
    //         })
    //         // Ext.getCmp('statusformlinkedacc').setValue('edit');
    //     }
    // }
});