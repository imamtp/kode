var storeChooserListPurchase = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'App.model.Purchase',
    sorters: [{
        property: 'idpurchase',
        direction: 'DESC'
    }],
});

var smChooserListPurchase = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smChooserListPurchase.getSelection().length;
            if (selectedLen == 0) {
                GridPurchaseList.queryById('btnOk').setDisabled(true);
            }
        },
        select: function(model, record, index) {
            GridPurchaseList.queryById('btnOk').setDisabled(false);
        }
    }
});

Ext.define('MY.searchChooserListPurchase', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchChooserListPurchase',
    store: storeChooserListPurchase,
    width: 180
});

var GridPurchaseList = Ext.create('Ext.grid.Panel', {
    itemId: 'GridPurchaseListID',
    id: 'GridPurchaseListID',
    store: storeChooserListPurchase,
    width: 840,
    height: 350,
    selModel: smChooserListPurchase,
    autoScroll:true,
    columns: [
        {header:'idpurchase', dataIndex:'idpurchase', hidden:true},
        {header:'No', xtype:'rownumberer', sortable:false, width: 40},
        {header:'No Order', dataIndex:'nopurchase', minWidth: 150},
        {header:'Request Date', dataIndex:'requestdate', minWidth: 150,},
        {header:'Supplier', dataIndex:'namesupplier', minWidth: 150},
        {header:'Project', dataIndex:'projectname', minWidth: 150},
        {header:'Notes', dataIndex:'notes', minWidth: 150, flex:1},
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'top',
            items:[
                'Unit :',
                {
                    boxLabel: 'All',
                    xtype: 'checkboxfield',
                    handler: function(checkbox, checked){
                        var cb1 = GridPurchaseList.queryById('idunit');
                        if(checked){
                            cb1.setDisabled(true);
                            storeChooserListPurchase.clearFilter(true);
                            storeChooserListPurchase.load();
                        }else{
                            cb1.setDisabled(false);
                            if(cb1.getValue() !== false)
                                storeChooserListPurchase.filter(function(item){return item.get('idunit') == cb1.getValue()})
                        }
                    }
                },
                ' ',
                {
                    xtype: 'comboxunit',
                    itemId: 'idunit',
                    fieldLabel: null,
                    labelWidth: 10,
                    listeners: {
                        'select': function(combo,record,eOpts){
                            storeChooserListPurchase.clearFilter(true);
                            storeChooserListPurchase.filter(function(item){return item.get('idunit') == record[0].data.idunit})
                        }
                    },
                },
                '->',
                'Supplier :',
                {
                    boxLabel: 'All',
                    xtype: 'checkboxfield',
                    handler: function(checkbox, checked){
                        var cb1 = GridPurchaseList.queryById('idsupplier');
                        if(checked){
                            cb1.setDisabled(true);
                            storeChooserListPurchase.clearFilter(true);
                            storeChooserListPurchase.load();
                        }else{
                            cb1.setDisabled(false);
                            if(cb1.getValue() !== false)
                                storeChooserListPurchase.filter(function(item){return item.get('idsupplier') == cb1.getValue()})
                        }
                    }
                },
                ' ',
                {
                    xtype: 'comboxsupplier',
                    itemId: 'idsupplier',
                    fieldLabel: null,
                    labelWidth: 10,
                    listeners: {
                        'select': function(combo,record,eOpts){
                            storeChooserListPurchase.clearFilter(true);
                            storeChooserListPurchase.filter(function(item){return item.get('idsupplier') == record[0].data.idsupplier})
                        }
                    },
                },
                '->',
                'Project :',
                {
                    boxLabel: 'All',
                    xtype: 'checkboxfield',
                    handler: function(checkbox, checked){
                        var cb1 = GridPurchaseList.queryById('idproject');
                        if(checked){
                            cb1.setDisabled(true);
                            storeChooserListPurchase.clearFilter(true);
                            storeChooserListPurchase.load();
                        }else{
                            cb1.setDisabled(false);
                            if(cb1.getValue() !== false)
                                storeChooserListPurchase.filter(function(item){return item.get('idproject') == cb1.getValue()})
                        }
                    }
                },
                ' ',
                {
                    xtype: 'comboxproject',
                    itemId: 'idproject',
                    fieldLabel: null,
                    labelWidth: 10,
                    listeners: {
                        'select': function(combo,record,eOpts){
                            storeChooserListPurchase.clearFilter(true);
                            storeChooserListPurchase.filter(function(item){return item.get('idproject') == record[0].data.idproject})
                        }
                    },
                },
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                 '->',
                'Pencarian',
                ' ',
                {
                    xtype: 'searchChooserListPurchase',
                    text: 'Left Button',
                }
            ],
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
                        GridPurchaseList.fireEvent('selectItem', ChooserListPurchase.target);
                    }
                },
                {
                    text: 'Cancel',
                    handler: function(){
                        ChooserListPurchase.hide();
                    }
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            store: storeChooserListPurchase, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        },
    ],
    listeners: {
        itemdblclick: function() {
        },
        selectItem: function(form){
            var selectedRecord = GridPurchaseList.getSelectionModel().getSelection()[0];
            form.fireEvent('selectPurchase', selectedRecord.data);
            ChooserListPurchase.hide();
        }

    }
});

var ChooserListPurchase = Ext.create('widget.window', {
    title: 'Purchase List',
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
    items: [GridPurchaseList],
    listeners: {
        show: function(){
            storeChooserListPurchase.load();
        }
    }
});