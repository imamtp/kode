var storeChooserListInventory = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.InventoryBySku',
    sorters: [{
        property: 'nameinventory',
        direction: 'ASC'
    }],
    listeners: {
        'beforeload': function(store, operation, eOpts) {
            operation.params = {
                extraparams: 'deleted: 0, idunit:' + idunit,
            }
        }
    },
});

var smChooserListInventory = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smChooserListInventory.getSelection().length;
            if (selectedLen == 0) {
                GridInventoryList.queryById('btnOk').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            GridInventoryList.queryById('btnOk').setDisabled(false);
        }
    }
});

Ext.define('MY.searchChooserListInventory', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchChooserListInventory',
    store: storeChooserListInventory,
    width: 180
});

var GridInventoryList = Ext.create('Ext.grid.Panel', {
    itemId: 'GridInventoryListID',
    id: 'GridInventoryListID',
    store: storeChooserListInventory,
    width: 800,
    height: 350,
    selModel: smChooserListInventory,
    autoScroll: true,
    columns: [
        { header: 'idinventory', dataIndex: 'idinventory', hidden: true },
        // { header: 'No', xtype: 'rownumberer', sortable: false, width: 30 },
        { header: 'No SKU', dataIndex: 'sku_no', minWidth: 200 },
        { header: 'Kode Barang', dataIndex: 'invno', minWidth: 200 },
        { header: 'Name', dataIndex: 'nameinventory', minWidth: 150, flex: 1 },
        { header: 'Total Stok', dataIndex: 'totalstock', minWidth: 150 }
    ],
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                'Category :',
                {
                    boxLabel: 'All',
                    xtype: 'checkboxfield',
                    handler: function(checkbox, checked) {
                        var cb1 = GridInventoryList.queryById('idinventory');
                        if (checked) {
                            cb1.setDisabled(true);
                            storeChooserListInventory.clearFilter(true);
                            storeChooserListInventory.load();
                        } else {
                            cb1.setDisabled(false);
                            if (cb1.getValue() !== false)
                                storeChooserListInventory.filter(function(item) { return item.get('idinventorycat') == cb1.getValue() })
                        }
                    }
                },
                ' ',
                {
                    xtype: 'comboxinventorycat',
                    itemId: 'idinventory',
                    fieldLabel: null,
                    labelWidth: 10,
                    listeners: {
                        'select': function(combo, record, eOpts) {
                            storeChooserListInventory.clearFilter(true);
                            storeChooserListInventory.filter(function(item) { return item.get('idinventorycat') == record[0].data.idinventorycat })
                        }
                    },
                },
                '->',
                'Pencarian',
                ' ',
                {
                    xtype: 'searchChooserListInventory',
                    text: 'Left Button',
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            defaults: {
                width: 90,
            },
            items: [
                '->',
                {
                    text: 'OK',
                    itemId: 'btnOk',
                    disabled: true,
                    handler: function() {
                        GridInventoryList.fireEvent('selectItem', ChooserListInventory.target);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function() {
                        ChooserListInventory.hide();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeChooserListInventory, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        },
    ],
    listeners: {
        itemdblclick: function() {},
        selectItem: function(form) {
            var selectedRecord = GridInventoryList.getSelectionModel().getSelection()[0];
            form.fireEvent('selectInventory', selectedRecord.data);
            ChooserListInventory.hide();
        }

    }
});

var ChooserListInventory = Ext.create('widget.window', {
    title: 'Inventory List',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    // autoHeight: true,
    width: windowW - 50,
    height: sizeH,
    layout: 'fit',
    border: false,
    padding: '5',
    items: [GridInventoryList],
    listeners: {
        show: function() {
            storeChooserListInventory.load();
        }
    }
});