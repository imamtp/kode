var storeChooserListSalesman = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Salesman',
    sorters: [{
        property: 'firstname',
        direction: 'ASC'
    }],
    listeners: {
        'beforeload': function(store, operation, eOpts) {
            operation.params = {
                extraparams: 'a.deleted: 0, a.idunit:' + idunit,
            }
        }
    },
});

var smChooserListSalesman = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smChooserListSalesman.getSelection().length;
            if (selectedLen == 0) {
                GridSalesmanList.queryById('btnOk').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            GridSalesmanList.queryById('btnOk').setDisabled(false);
        }
    }
});

Ext.define('MY.searchChooserListSalesman', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchChooserListSalesman',
    store: storeChooserListSalesman,
    width: 180
});

var GridSalesmanList = Ext.create('Ext.grid.Panel', {
    itemId: 'GridSalesmanListID',
    id: 'GridSalesmanListID',
    store: storeChooserListSalesman,
    width: 800,
    height: 350,
    selModel: smChooserListSalesman,
    autoScroll: true,
    columns: [
        { header: 'idemployee', dataIndex: 'idemployee', hidden: true },
        { header: 'No', xtype: 'rownumberer', sortable: false, width: 30 },
        // { header: 'Personal Code', dataIndex: 'code', minWidth: 150 },
        // { header: 'Firstname', dataIndex: 'firstname', minWidth: 150 },
        // { header: 'Lastname', dataIndex: 'lastname', minWidth: 120 },
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
                        var cb1 = GridSalesmanList.queryById('idSalesmantype');
                        if (checked) {
                            cb1.setDisabled(true);
                            storeChooserListSalesman.clearFilter(true);
                            storeChooserListSalesman.load();
                        } else {
                            cb1.setDisabled(false);
                            if (cb1.getValue() !== false)
                                storeChooserListSalesman.filter(function(item) { return item.get('idSalesmantype') == cb1.getValue() })
                        }
                    }
                },
                ' ',
                {
                    xtype: 'comboxSalesmantype',
                    itemId: 'idSalesmantype',
                    fieldLabel: null,
                    labelWidth: 10,
                    listeners: {
                        'select': function(combo, record, eOpts) {
                            storeChooserListSalesman.clearFilter(true);
                            storeChooserListSalesman.filter(function(item) { return item.get('idSalesmantype') == record[0].data.idSalesmantype })
                        }
                    },
                },
                '->',
                'Pencarian',
                ' ',
                {
                    xtype: 'searchChooserListSalesman',
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
                        GridSalesmanList.fireEvent('selectItem', ChooserListSalesman.target);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function() {
                        ChooserListSalesman.hide();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeChooserListSalesman, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        },
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeChooserListSalesman.load();
            }
        },
        itemdblclick: function() {},
        selectItem: function(form) {
            var selectedRecord = GridSalesmanList.getSelectionModel().getSelection()[0];
            form.fireEvent('selectSalesman', selectedRecord.data);
            ChooserListSalesman.hide();
        }

    }
});

var ChooserListSalesman = Ext.create('widget.window', {
    title: 'Salesman List',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    padding: '5',
    items: [GridSalesmanList],
});