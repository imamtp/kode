
Ext.define('GridAccInventoryTab', {
    title: 'Akun Persediaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridAccInventoryTab',
    id: 'GridAccInventoryTab',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridAccInventoryTab',
    store: storeGridAccInv,
    loadMask: true,
    columns: [{
        text: 'Edit',
        width: 45,
        // menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: 'Ubah Data',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/pencil.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            var idinventoryInv = Ext.getCmp('idinventoryInv').getValue();
            if (idinventoryInv == '') {
                Ext.Msg.alert("Info", 'Data inventory belum di ada atau belum disimpan ke database');
            } else {
                var formlinkedaccInventory = Ext.getCmp('formlinkedaccInventory');
                wlinkedaccInventory.show();
                Ext.getCmp('namaunitAccInventory').setValue(record.get('amaunit'))
                Ext.getCmp('idunitAccInventory').setValue(record.get('idunit'))
                Ext.getCmp('idinventoryAccInventory').setValue(idinventoryInv);
                // storeGridSetupUnit.load();
                formlinkedaccInventory.getForm().load({
                    url: SITE_URL + 'backend/loadFormData/acclinkinventory/1/inventory',
                    params: {
                        extraparams: 'idunit:' + record.get('idunit') + ',' + 'idinventory:' + idinventoryInv
                    },
                    success: function(form, action) {
                        var obj = Ext.decode(action.response.responseText);
                        console.log(obj)
                        // accasset: "Perlengkapan Kantor"akumpenyusut: "Akum. Penyusutan Peralatan"
                        // depresiasi: "Operasional Kantor"idinventory: "16"idunit: "2"namaunit: "SMIP"
                        Ext.getCmp('idinventoryAccInventory').setValue(obj.data.idinventory);
                        Ext.getCmp('idunitAccInventory').setValue(obj.data.idunit);
                        Ext.getCmp('namaunitAccInventory').setValue(obj.data.namaunit);
                        Ext.getCmp('assetaccount').setValue(obj.data.assetaccount);
                        Ext.getCmp('accnameAsset').setValue(obj.data.accasset);
                        Ext.getCmp('akumpenyusutaccount').setValue(obj.data.akumpenyusutaccount);
                        Ext.getCmp('accnamePenyusutan').setValue(obj.data.akumpenyusut);
                        Ext.getCmp('depresiasiaccount').setValue(obj.data.depresiasiaccount);
                        Ext.getCmp('accnameDepresiasi').setValue(obj.data.depresiasi);
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    },
                    failure: function(form, action) {
                        // Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                });
            }
        }
    }, {
        header: 'idunit',
        dataIndex: 'idunit',
        hidden: true
    }, {
        header: 'idinventory',
        dataIndex: 'idinventory',
        hidden: true
    }, {
        header: 'Nama Unit',
        dataIndex: 'namaunit',
        minWidth: 150
    }, {
        header: 'Asset(Harta)',
        dataIndex: 'accasset',
        minWidth: 200,
        renderer: renderInv
    }, {
        header: 'Akumulasi Depresiasi',
        dataIndex: 'akumpenyusut',
        minWidth: 200,
        renderer: renderInv
    }, {
        header: 'Depresiasi',
        dataIndex: 'depresiasi',
        minWidth: 200,
        renderer: renderInv
    }],
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