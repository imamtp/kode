Ext.define('gridHistoryAdjModel', {
    extend: 'Ext.data.Model',
    fields: ['idinvadjusment','nojournal','memo','userin','datein','month','year','dateadj','namaunit'],
    idProperty: 'id'
});

var storegridHistoryAdj = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'gridHistoryAdjModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/inventoryadj/inventory/',
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

Ext.define('MY.searchgridHistoryAdj', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchgridHistoryAdj',
    store: storegridHistoryAdj,
    width: 180
});

var smgridHistoryAdj = Ext.create('Ext.selection.CheckboxModel', {
    allowDeselect: true,
    mode: 'SINGLE',
    listeners: {
        deselect: function(model, record, index) {
            var selectedLen = smgridHistoryAdj.getSelection().length;
            if (selectedLen == 0) {
                console.log(selectedLen);
                Ext.getCmp('btnDeleteInventoryBuyGrid').disable();
            }
        },
        select: function(model, record, index) {
            Ext.getCmp('btnDeleteInventoryBuyGrid').enable();
        }
    }
});

Ext.define('gridHistoryAdj', {
    title: 'Riwayat Penyesuaian Persediaan',
    // sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    itemId: 'gridHistoryAdjID',
    id: 'gridHistoryAdjID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridHistoryAdj',
    store: storegridHistoryAdj,
    loadMask: true,
    columns: [
        {header: 'idinvadjusment', dataIndex: 'idinvadjusment', hidden: true},
        {header: 'no ref', dataIndex: 'nojournal', minWidth: 100},
        {header: 'memo', dataIndex: 'memo', minWidth: 100},
        {header: 'namaunit', dataIndex: 'namaunit', minWidth: 100},
        {header: 'dateadj', dataIndex: 'dateadj', minWidth: 100},
        {header: 'userin', dataIndex: 'userin', minWidth: 100},
        {header: 'datein', dataIndex: 'datein', minWidth: 100}
    ],
    dockedItems: [
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'comboxunit',
                    valueField:'idunit',
                    id:'cbUnitInvBuy',
                    listeners: {
                        'change': function(field, newValue, oldValue) {
                            storegridHistoryAdj.load({
                                params: {
                                  'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitInvBuy').getValue()
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
               '->',
                'Pencarian: ', ' ',
                {
                    xtype: 'searchgridHistoryAdj',
                    text: 'Left Button'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            store: storegridHistoryAdj, // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
                    // pageSize:20
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                storegridHistoryAdj.load();

            }
        },
        itemdblclick: function(dv, record, item, index, e) {

            // var formAgama = Ext.create('formAgama');
            var formInventoryBuyGrid = Ext.getCmp('formInventoryBuyGrid');
            wInventoryBuyGrid.show();

            formInventoryBuyGrid.getForm().load({
                url: SITE_URL + 'backend/loadFormData/InventoryBuyGrid/1/inventory',
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
            Ext.getCmp('statusformInventoryBuyGrid').setValue('edit');
        }
    }
});