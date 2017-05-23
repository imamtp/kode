Ext.define('GridSalesmanListModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes'],
    idProperty: 'id'
});
var storeGridSalesmanList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSalesmanListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/supplierGrid',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'product_name',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridSalesmanList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSalesmanList',
    store: storeGridSalesmanList,
    width: 180
});
// var smGridSalesmanList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSalesmanList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterSalesmanData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSalesmanData').enable();
//         }
//     }
// });

Ext.define('GridSalesmanList', {
    itemId: 'GridSalesmanListID',
    id: 'GridSalesmanListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSalesmanList',
    store: storeGridSalesmanList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            Ext.getCmp(Ext.getCmp('targetIdFilterSalesmanCode').getValue()).setValue(selectedRecord.get('code'));
            Ext.getCmp('wGridSalesmanListPopup').hide();
        }
    }, {
        header: 'code',
        dataIndex: 'code',
        hidden: true
    }, {
        header: 'Salesman Name',
        dataIndex: 'namesupplier',
    }, {
        header: 'Address',
        dataIndex: 'companyaddress'
    }, {
        header: 'City',
        dataIndex: 'city'
    }, {
        header: 'State',
        dataIndex: 'state'
    }, {
        header: 'Country',
        dataIndex: 'country'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridSalesmanList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridSalesmanList.load();
            }
        }
    }
});

var wGridSalesmanListPopup = Ext.create('widget.window', {
    id: 'wGridSalesmanListPopup',
    title: 'Pilih Salesman',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    // autoWidth: true,
    width: 450,
    height: 450,
    layout: 'fit',
    border: false,
    items: [{
        // xtype:'GridSalesmanList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterSalesmanCode',
        id: 'targetIdFilterSalesmanCode'
    }]
});