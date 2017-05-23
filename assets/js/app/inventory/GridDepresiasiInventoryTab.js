Ext.define('GridDepresiasiInventoryModel', {
    extend: 'Ext.data.Model',
    fields: ['idinventory','month','year','penyusutan','idunit'],
    idProperty: 'id'
});

var storeGridDepresiasiInventory = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridDepresiasiInventoryModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/depresiasiinventory/inventory/',
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


Ext.define('MY.searchGridDepresiasiInventoryAll', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridDepresiasiInventory',
    store: storeGridDepresiasiInventory,
    width: 180
});

var smGridDepresiasiInventory = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryAll.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                // Ext.getCmp('btnDeleteInventoryAll').disable();
            }
        },
        select: function(model, record, index) {
            // Ext.getCmp('btnDeleteInventoryAll').enable();
        }
    }
});

Ext.define('GridDepresiasiInventoryTab', {
    title: 'Riwayat Penyusutan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridDepresiasiInventoryTab',
    id: 'GridDepresiasiInventoryTab',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridDepresiasiInventoryTab',
    store: storeGridDepresiasiInventory,
    loadMask: true,
    columns: [
    {
        header: 'idunit',
        dataIndex: 'idunit',
        hidden: true
    }, {
        header: 'idinventory',
        dataIndex: 'idinventory',
        hidden: true
    }, {
        header: 'Bulan',
        dataIndex: 'month',
        minWidth: 150
    }, {
        header: 'Tahun',
        dataIndex: 'year',
        minWidth: 200
    }, {
        header: 'Depresiasi',
        align:'right',
        xtype:'numbercolumn',
        dataIndex: 'penyusutan',
        minWidth: 200
    }],
    dockedItems: [
        {
                xtype: 'pagingtoolbar',
                store: storeGridDepresiasiInventory, // same store GridPanel is using
                dock: 'bottom',
                displayInfo: true
                        // pageSize:20
        }
        // ,
        // {
        //     xtype:'toolbar',
        //     dock:'bottom',
        //     items:[]
        // }
    ]
    // listeners: {
    //     itemdblclick: function(dv, record, item, index, e) {
    //         // var formAgama = Ext.create('formAgama');
    //         var formlinkedDepresiasiInventory = Ext.getCmp('formlinkedDepresiasiInventory');
    //         wlinkedDepresiasiInventory.show();
    //         Ext.getCmp('namaunitDepresiasiInventory').setValue(record.data.namaunit)
    //         Ext.getCmp('idunitDepresiasiInventory').setValue(record.data.idunit)
    //         Ext.getCmp('idinventoryDepresiasiInventory').setValue(Ext.getCmp('idinventoryInv').getValue());
    //         // storeGridSetupUnit.load();
    //         formlinkedDepresiasiInventory.getForm().load({
    //             url: SITE_URL + 'backend/loadFormData/acclinkinventory/1/inventory',
    //             params: {
    //                 extraparams: 'idunit:' + record.data.idunit + ',' + 'idinventory:' + Ext.getCmp('idinventoryInv').getValue()
    //             },
    //             success: function(form, action) {
    //                 var obj = Ext.decode(action.response.responseText);
    //                 console.log(obj)
    //                 // accasset: "Perlengkapan Kantor"akumpenyusut: "Akum. Penyusutan Peralatan"
    //                 // depresiasi: "Operasional Kantor"idinventory: "16"idunit: "2"namaunit: "SMIP"
    //                 Ext.getCmp('idinventoryDepresiasiInventory').setValue(obj.data.idinventory);
    //                 Ext.getCmp('idunitDepresiasiInventory').setValue(obj.data.idunit);
    //                 Ext.getCmp('namaunitDepresiasiInventory').setValue(obj.data.namaunit);
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