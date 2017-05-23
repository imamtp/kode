Ext.define('GridSupplierListModel', {
    extend: 'Ext.data.Model',
    fields: ['idsupplier', 'code', 'namesupplier', 'companyaddress', 'companyaddress2', 'companyaddress3', 'shipaddress', 'billaddress', 'telephone', 'handphone', 'fax', 'email', 'website', 'city', 'state', 'postcode', 'country', 'highestpo', 'avgdaypay', 'lastpayment', 'lastpurchase', 'expenseaccount', 'notes'],
    idProperty: 'id'
});
var storeGridSupplierList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridSupplierListModel',
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
        property: 'code',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridSupplierList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridSupplierList',
    store: storeGridSupplierList,
    width: 180
});
// var smGridSupplierList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridSupplierList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterSupplierData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterSupplierData').enable();
//         }
//     }
// });

Ext.define('GridSupplierList', {
    itemId: 'GridSupplierListID',
    id: 'GridSupplierListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridSupplierList',
    store: storeGridSupplierList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            var prefix = Ext.getCmp('prefixWinSupplierList').getValue();
            
            setValueSupp(selectedRecord, 'wGridSupplierListPopup', prefix);
            // var target_id = Ext.getCmp('idSupplierFieldId').getValue();
            // var target_code = Ext.getCmp('codeSupplierFieldId').getValue();
            // var target_name = Ext.getCmp('nameSupplierFieldId').getValue();
            // var target_filter = Ext.getCmp('targetIdFilterCustomerCode').getValue();

            // if(target_id != "")
            //     Ext.getCmp(target_id).setValue(selectedRecord.get('idsupplier'));
            
            // if(target_code != "")
            //     Ext.getCmp(target_code).setValue(selectedRecord.get('code'));

            // if(target_name != "")
            //     Ext.getCmp(target_name).setValue(selectedRecord.get('namesupplier'));
            
            // if(target_filter != "")
            //     Ext.getCmp(target_filter).setValue(selectedRecord.get('code'));

            // // Ext.getCmp(Ext.getCmp('targetIdFilterSupplierCode').getValue()).setValue(selectedRecord.get('code'));
            // Ext.getCmp('wGridSupplierListPopup').hide();
            
        }
    }, {
        header: 'idsupplier',
        dataIndex: 'idsupplier',
        hiddenfield: true,
    }, {
        header: 'code',
        dataIndex: 'code',
        hidden: true
    }, {
        header: 'Supplier Name',
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
                xtype: 'searchGridSupplierList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridSupplierList.load();
            }
        }
    }
});

var wGridSupplierListPopup = Ext.create('widget.window', {
    id: 'wGridSupplierListPopup',
    title: 'Pilih Supplier',
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
        xtype:'GridSupplierList'
    }, {
        xtype: 'hiddenfield',
        name: 'targetIdFilterSupplierCode',
        id: 'targetIdFilterSupplierCode'
    }, {
        xtype: 'hiddenfield',
        id: 'prefixWinSupplierList',
    },/* {
        xtype: 'hiddenfield',
        id: 'idSupplierFieldId'
    }, {
        xtype: 'hiddenfield',
        id: 'codeSupplierFieldId'
    }, {
        xtype: 'hiddenfield',
        id: 'nameSupplierFieldId'
    }*/]
});