Ext.define('GridInventoryInvGridModel', {
    extend: 'Ext.data.Model',
    fields: ['accname','accnumber','idinventory','invno','nameinventory','description','isinventory','issell','isbuy','cosaccount',
        'incomeaccount','assetaccount','qtystock','images','cost','unitmeasure','numperunit','minstock','idprimarysupplier',
        'sellingprice','idselingtax','unitmeasuresell','numperunitsell','notes','display','namesupplier','yearbuy','monthbuy','datebuy'],
    idProperty: 'id'
});

var storeGridInventoryInvGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridInventoryInvGridModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventoryinv/inventory/'+idunit,
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

Ext.define('MY.searchGridInventoryInvGrid', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridInventoryInvGrid',
    store: storeGridInventoryInvGrid,
    width: 180
});

var smGridInventoryInvGrid = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smGridInventoryInvGrid.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryInvGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryInvGrid').enable();
        }
    }
});

Ext.define('GridInventoryInvGrid', {
    title: 'Persediaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'GridInventoryInvGridID',
    id: 'GridInventoryInvGridID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridInventoryInvGrid',
    store: storeGridInventoryInvGrid,
    loadMask: true,
    columns: [
        {header: 'idinventory', dataIndex: 'idinventory', hidden: true},
        {header: 'No Inventory', dataIndex: 'invno', minWidth: 100},
        {header: 'Nama', dataIndex: 'nameinventory', minWidth: 200},
        {header: 'Jumlah Persediaan', dataIndex: 'qtystock', minWidth: 150,align:'right'},
        {header: 'Akun', dataIndex: 'accname', minWidth: 150},
        {header: 'No Akun', dataIndex: 'accnumber', minWidth: 100},
        {header: 'Harga Beli', dataIndex: 'cost', minWidth: 100,xtype:'numbercolumn',align:'right'},
//        {header: 'Harga Jual', dataIndex: 'sellingprice', minWidth: 100,xtype:'numbercolumn',align:'right'},
        {header: 'Stok Minimum', dataIndex: 'minstock', minWidth: 110},
        {header: 'Tgl Pembelian', dataIndex: 'datebuy', minWidth: 130}
//        {header: 'invno', dataIndex: 'invno', minWidth: 100}
    ],
    plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl : new Ext.XTemplate(
                '<p><b>Supplier:</b> {namesupplier}</p>',
                '<p><b>Deskripsi:</b> {description}</p>',
                '<p><b>Foto:</b><br/> <img src='+BASE_URL+'upload/{images} width=120/></p><br>'
            )
    }],
    dockedItems: [
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'comboxunit',
                    valueField:'idunit',
                    id:'cbUnitInv',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storeGridInventoryInvGrid.load({
                                params: {
                                  'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitInv').getValue()
                                }
                            });
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
                    itemId: 'addInventoryInvGrid',
                    text: 'Tambah',
                    iconCls: 'add-icon',
                    handler: function() {
                    showInputInv();
                    }
                },
                {
                    itemId: 'editInventoryInvGrid',
                    text: 'Ubah',
                    iconCls: 'edit-icon',
                    handler: function() {
                        var grid = Ext.ComponentQuery.query('GridInventoryInvGrid')[0];
                        var selectedRecord = grid.getSelectionModel().getSelection()[0];
                        var data = grid.getSelectionModel().getSelection();
                        if (data.length == 0)
                        {
                            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                        } else {
                            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);

                            showEditInv(selectedRecord.data.idinventory);
                            
                            Ext.getCmp('statusformInventory').setValue('edit');
                        }

                    }
                }, {
                    id: 'btnDeleteInventoryInvGrid',
                    text: 'Hapus',
                    iconCls: 'delete-icon',
                    handler: function() {
                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'Delete Selected ?',
                            buttons: Ext.Msg.YESNO,
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    var grid = Ext.ComponentQuery.query('GridInventoryInvGrid')[0];
                                    var sm = grid.getSelectionModel();
                                    selected = [];
                                    Ext.each(sm.getSelection(), function(item) {
                                        selected.push(item.data[Object.keys(item.data)[0]]);
                                    });
                                    Ext.Ajax.request({
                                        url: SITE_URL + 'backend/ext_delete/InventoryInvGrid/inventory',
                                        method: 'POST',
                                        params: {postdata: Ext.encode(selected)}
                                    });
                                    storeGridInventoryInvGrid.remove(sm.getSelection());
                                    sm.select(0);
                                }
                            }
                        });
                    },
//                    disabled: true
                }, '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchGridInventoryInvGrid',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storeGridInventoryInvGrid, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeGridInventoryInvGrid.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formInventoryInvGrid = Ext.getCmp('formInventoryInvGrid');
            wInventoryInvGrid.show();

            formInventoryInvGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/InventoryInvGrid/1/inventory',
                params: {
                    extraparams: 'a.idinventory:' + record.data.idinventory
                },
                success: function(form, action) {
                    // Ext.Msg.alert("Load failed", action.result.errorMessage);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            })

//            
//            Ext.getCmp('kddaerahS').setReadOnly(true);
            Ext.getCmp('statusformInventoryInvGrid').setValue('edit');
        }
    }
});