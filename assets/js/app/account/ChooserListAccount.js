var storeChooserListAccount = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Account',
    sorters: [{
        property: 'accnumber',
        direction: 'ASC'
    }],
});

var smChooserListAccount = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smChooserListAccount.getSelection().length;
            if (selectedLen == 0) {
                GridAccountList.queryById('btnOk').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            GridAccountList.queryById('btnOk').setDisabled(false);
        }
    }
});

Ext.define('MY.searchChooserListAccount', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchChooserListAccount',
    store: storeChooserListAccount,
    width: 180
});

var GridAccountList = Ext.create('Ext.grid.Panel', {
    itemId: 'GridAccountListID',
    id: 'GridAccountListID',
    store: storeChooserListAccount,
    width: 800,
    height: 350,
    selModel: smChooserListAccount,
    autoScroll:true,
    columns: [
        {header:'idaccount', dataIndex:'idaccount', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 30},
        {header:'No Account', dataIndex:'accnumber', minWidth: 150},
        {header:'Name', dataIndex:'accname', minWidth: 150},
        {header:'Type', dataIndex:'acctypename', minWidth: 200, flex:1},
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'top',
            items:[
                '->',
                'Pencarian',
                ' ',
                {
                    xtype: 'searchChooserListAccount',
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
            items:[
                '->',
                {
                    text: 'OK',
                    itemId: 'btnOk',
                    disabled: true,
                    handler: function(){
                        GridAccountList.fireEvent('selectItem', ChooserListAccount.target);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function(){
                        ChooserListAccount.hide();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeChooserListAccount, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        },
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storeChooserListAccount.load();
            }
        },
        itemdblclick: function() {
        },
        selectItem: function(form){
            var selectedRecord = GridAccountList.getSelectionModel().getSelection()[0];
            form.fireEvent('selectAccount', selectedRecord.data);
            ChooserListAccount.hide();
        }

    }
});

var ChooserListAccount = Ext.create('widget.window', {
    title: 'Account List',
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
    items: [GridAccountList],
});