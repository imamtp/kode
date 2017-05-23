var wItemSelectMasterBomPopup = Ext.create(dir_sys + 'production.wItemSelectMasterBomPopup');

Ext.define('GridItemListPackageModel', {
    extend: 'Ext.data.Model',
     fields: ['bom_id','bom_detail_id','idunit','idinventorycat','idinventory','invno','nameinventory','description','qtystock','cost','minstock','namesupplier','namecat','short_desc','brand_id','qty_out','measurement_id','brand_name','measurement_name'],
    idProperty: 'id'
});

var storeGridItemListPackage = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridItemListPackageModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/gridItemBomList/production',
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



Ext.define('MY.searchGridItemListPackage', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridItemListPackage',
    store: storeGridItemListPackage,
    width: 180
});

var smGridItemListPackage = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'MULTI',
    listeners: {
        deselect: function (model, record, index) {
            var selectedLen = smGridItemListPackage.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('prosesGridItemListPackage').disable();
            }
        },
        select: function (model, record, index) {
            // console.log(selectedLen);
            Ext.getCmp('prosesGridItemListPackage').enable();
        }
    }
});

Ext.define('GridItemListPackage', {
    // renderTo:'mytabpanel',
    // layout:'fit',
//    selModel: smGridItemListPackage,
    title: 'Item Composition',
    multiSelect: true,
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridItemListPackageID',
    id: 'GridItemListPackageID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridItemListPackage',
    store: storeGridItemListPackage,
    loadMask: true,
    columns: [
        {
            header: 'No',
            xtype: 'rownumberer',
            width: 30,
            sortable: false
        },
         {header: 'bom_detail_id', dataIndex: 'bom_detail_id', hidden: true},        
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'No Inventory', dataIndex: 'invno', minWidth: 100},
        // {header: 'Unit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'Inventory Name', dataIndex: 'nameinventory', minWidth: 200,flex:1},
        {header: 'Qty Usage', dataIndex: 'qty_out', minWidth: 100},
        {header: 'Measurement', dataIndex: 'measurement_name', minWidth: 150},
        // {header: 'Stock in Hand', dataIndex: 'qtystock', minWidth: 150, align: 'right'},
        // {header: 'Measurement', dataIndex: 'unitmeasure', minWidth: 100},
        // {header: 'Buying Cost', dataIndex: 'cost', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        // {header: 'Selling Price', dataIndex: 'sellingprice', minWidth: 100, xtype: 'numbercolumn', align: 'right'},
        // {header: 'Minimum Stok', dataIndex: 'minstock', minWidth: 110},
    ]
    , dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype:'numericfield',
                    readOnly:true,
                    width: 170,
                    id:'qty_out_master',
                    fieldLabel:'Built for Qty'
                },
                {
                    xtype: 'textfield',
                    readOnly:true,
                    id: 'bom_code_master',
                    fieldLabel:'BoM Code'
                },
                {
                    xtype: 'textfield',
                    labelWidth:120,
                    readOnly:true,
                    id: 'price_master',
                    bodyStyle:'text-align:right;',
                    // width: 120,
                    // inputWidth: 60,
                    fieldLabel:'Price',
                    // afterSubTpl: ' Price',
                    // maskRe: /[0-9]/,
                    // hidden: true,
                    // disabled: true,
                    listeners: {
                        'render': function(c) {
                            c.getEl().on('keyup', function() {
                                 this.setValue(renderNomor(this.getValue()));
                            }, c)

                        }
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [                
                {
                    xtype: 'comboxmeasurement',
                    readOnly:true,
                    name: 'measurement_id',
                    id: 'measurement_id_master',
                    fieldLabel:'Measurement'
                }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                
                {
                    xtype: 'textfield',
                    width: 420,
                    readOnly:true,
                    name: 'bom_desc',
                    id: 'bom_desc_master',
                    fieldLabel:'Description'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'bom_id',
                    id:'bom_id_master'
                }]
        }
        , 
        {
            xtype: 'pagingtoolbar',
            store: storeGridItemListPackage, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }, 
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    id: 'addPackageComposition',
                    text: 'Add New Composition',
                    iconCls: 'print-icon',
                    handler: function () {
                        wItemSelectMasterBomPopup.show();

                        Ext.getCmp('GridItemSelectMasterBomID').getStore().load();
                    }
                },
                {
                    id: 'deletePackageComposition',
                    text: 'Delete',
                    iconCls: 'delete-icon',
                    //                    disabled: true,
                    handler: function(btn) {
                        var grid = Ext.ComponentQuery.query('PackageNamePanel')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0) {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk menghapus gaji terpilih', hapusGajiBtn);
                        }
                    }
                },
               '->',
                'Searching: ', ' ',
                {
                    xtype: 'searchGridItemListPackage',
                    text: 'Left Button'
                }
            ]
        }
    ]
    , listeners: {
        render: {
            scope: this,
            fn: function (grid) {
                // storeGridItemListPackage.load();
            }
        }
        ,itemdblclick: function(dv, record, item, index, e) {
             console.log('itemdblclick'+record.data.idinventory)

                inventoryCategoryStore.load();
                brandStore.load();
                productMeasurementStore.load();

                showEditInv(record.data.idinventory);
                Ext.getCmp('datebuy').show();
                if (record.data.qtystock == null) {
                    // Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').hide();
                    // Ext.getCmp('fieldsetInvPersediaan').hide();
                    Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(false);
                    Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(false);
                } else {
                    Ext.getCmp('formInventoryV2').getForm().findField('cbpersediaan').show();
                    // Ext.getCmp('fieldsetInvPersediaan').show();
                    Ext.getCmp('TabItemInventory').items.getAt(1).setDisabled(false);
                    Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(false);
                }



                // Ext.getCmp('statusformInventory').setValue('edit');
                // storeGridAccInv.load({
                //     params: {
                //       'extraparams': 'idinventory:'+selectedRecord.data.idinventory
                //     }
                // });

                Ext.getCmp('TabItemInventory').setActiveTab(0);

                Ext.getCmp('statusformInventory2').setValue('edit');
                Ext.getCmp('TabItemInventory').items.getAt(3).setDisabled(false);

                brandStore.load();
            }
            
             // WindowKaryawan(record.data.firstname,record.data.idemployee);
         // }   
        //  ,select: function(model, record, index) {
        //          console.log('selected'+record.data.idemployee);
        //          Ext.getCmp('prosesGridItemListPackage').enable();
        //  }
        // ,rowclick: function(grid, idx){
        //     Ext.getCmp('prosesGridItemListPackage').enable();
        // }
    }
});

///END RIGHT PANEL


///START LEFT PANEL

var formMasterBom = Ext.create('Ext.form.Panel', {
    id: 'formMasterBom',
    // width: 740,
    autoWidth:true,
    // height: 370,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/MasterBom/master',
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
            id: 'bom_id_master'
        }, {
            xtype: 'hiddenfield',
            name: 'statusformMasterBom',
            id: 'statusformMasterBom'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Material Name',
            allowBlank: false,
            name: 'bom_name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'BoM Code',
            allowBlank: false,
            name: 'bom_code'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Built for Qty',
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
            xtype: 'textfield',
            fieldLabel: 'Price',
            allowBlank: false,
            name: 'price',
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
        }, {
            xtype: 'textarea',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'bom_desc'
        }
    ],
    buttons: [{
        text: 'Batal',
        handler: function() {
            var win = Ext.getCmp('windowPopupMasterBom');
            Ext.getCmp('formMasterBom').getForm().reset();
            win.hide();
        }
    }, {
        id: 'BtnMasterBomSimpan',
        text: 'Simpan',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        Ext.getCmp('formMasterBom').getForm().reset();
                        Ext.getCmp('windowPopupMasterBom').hide();
                        storeGridMasterBom.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                        //                            storeGridMasterBom.load();
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var wMasterBom = Ext.create('widget.window', {
    id: 'windowPopupMasterBom',
    title: 'Bill of Material',
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
    items: [formMasterBom]
});

Ext.define('storePackageNamePanelModel', {
    extend: 'Ext.data.Model',
    fields: ['bom_id','idunit','qty_out','measurement_id','bom_name','bom_desc','bom_code','measurement_name','price'],
    idProperty: 'id'
});
var storePackageNamePanel = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storePackageNamePanelModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/masterbom/master',
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
storePackageNamePanel.on('beforeload', function(store, operation, eOpts) {
    operation.params = {
        // 'bulantahunpenggajian': Ext.getCmp('periodepenggajianDataGaji').getValue(),
        // 'extraparams': 'a.idunit:' + Ext.getCmp('idunitDataGaji').getValue()+',a.year:'+Ext.getCmp('periodepenggajianDataGaji').getValue()
    }
});
Ext.define('MY.searchPackageNamePanel', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchPackageNamePanel',
    store: storePackageNamePanel,
    width: 180
});
Ext.define('PackageNamePanel', {
    // itemId: 'PackageNamePanelID',
    // multiSelect:true,
    title:'Bill of Material List',
    id: 'PackageNamePanelID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.PackageNamePanel',
    store: storePackageNamePanel,
    loadMask: true,
    columns: [
       {
            header: 'bom_id',
            dataIndex: 'bom_id',
            hidden: true
        },
        {
            header: 'Material Name',
            dataIndex: 'bom_name',
            flex:1,
            minWidth: 100
        }, {
            header: 'Capital Price',
            hidden:true,
            xtype:'numbercolumn',
            align:'right',
            dataIndex: 'price',
            minWidth: 120
        }
    ],
   
    dockedItems: [

    // {
    //     xtype: 'toolbar',
    //     dock: 'top',
    //     items: [
    //             {
    //                 xtype:'comboxinventorycat'
    //             }
    //     ]
    // },
    // {
    //     xtype: 'toolbar',
    //     dock: 'top',
    //     items: [
    //             {
    //                 xtype:'comboxbrand'
    //             }
    //     ]
    // },
    {
        xtype: 'toolbar',
        dock: 'top',
        items: [
                'Searching: ', '->',
                {
                    xtype: 'searchPackageNamePanel',
                    text: 'Left Button'
                }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [
        {
            text: 'Add New Material',
            iconCls: 'add-icon',
            handler: function() {
                    wMasterBom.show();
                    Ext.getCmp('statusformMasterBom').setValue('input');
            }
        },
        {
            text: 'Edit',
            hidden:true,
            iconCls: 'edit-icon',
            handler: function() {
            }
        },
        {
            id: 'deletePackageName',
            hidden:true,
            text: 'Delete',
            iconCls: 'delete-icon',
            //                    disabled: true,
            handler: function(btn) {
                var grid = Ext.ComponentQuery.query('PackageNamePanel')[0];
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                var data = grid.getSelectionModel().getSelection();
                if (data.length == 0) {
                    Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                } else {
                    Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk menghapus gaji terpilih', hapusGajiBtn);
                }
            }
        }]
    }, {
        xtype: 'pagingtoolbar',
        store: storePackageNamePanel, // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
        // pageSize:20
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storePackageNamePanel.load();
                tahunPayrollStore.load();
                productMeasurementStore.load();
            }
        },
        itemclick: function(dv, record, item, index, e) {

            Ext.getCmp('GridItemListPackageID').setTitle('Item Composition for: '+record.data.bom_name);
            Ext.getCmp('qty_out_master').setValue(record.data.qty_out);
            Ext.getCmp('price_master').setValue(renderNomor(record.data.price));
            Ext.getCmp('bom_desc_master').setValue(record.data.bom_desc);
            Ext.getCmp('bom_id_master').setValue(record.data.bom_id);
            Ext.getCmp('bom_code_master').setValue(record.data.bom_code);
            Ext.getCmp('measurement_id_master').setValue(record.data.measurement_id);
            // Ext.getCmp('qty_out_master').setValue(record.data.qty_out);
            // Ext.getCmp('qty_out_master').setValue(record.data.qty_out);
storeGridItemListPackage
            storeGridItemListPackage.on('beforeload', function (store, operation, eOpts) {
                operation.params = {
                    // 'bulantahunpenggajian': Ext.getCmp('periodepenggajianDataGaji').getValue(),
                    'extraparams': 'c.bom_id:' + record.data.bom_id
                }
            });
            storeGridItemListPackage.load();
            // Ext.getCmp('GridDataGajiID').setTitle('Daftar Penggajian Periode: '+record.data.month+' '+record.data.year);
        },
        itemdblclick: function(dv, record, item, index, e) {}
    }
});

/////END LEFT PANEL


/////// MAIN PANEL /////////

Ext.define('InventoryPackagePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.InventoryPackagePanel',
    layout: 'border',
    defaults: {},
    items: [{
        region: 'east',
        flex: 2,
        // bodyStyle:'padding:1px 1px 1px 5px;',
        // bodyStyle:'pad',
        // border:1,
        split: true,
        xtype: 'GridItemListPackage'
    },
    {
        region: 'center',
        // minWidth:400,
        flex: 0.8,
        // split: true,
        xtype: 'PackageNamePanel'
    }]
});





