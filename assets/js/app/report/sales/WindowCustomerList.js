Ext.define('GridCustomerListModel', {
    extend: 'Ext.data.Model',
    fields: ['idcustomer','nocustomer','namecustomer','address','shipaddress','billaddress','telephone','handphone','fax','email','website','city','state','postcode','country','notes','namecustype'],
    idProperty: 'id'
});
var storeGridCustomerList = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'GridCustomerListModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/customerGrid',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
        property: 'namacustomer',
        direction: 'ASC'
    }]
});

Ext.define('MY.searchGridCustomerList', {
    extend: 'Ext.ux.form.SearchField',
    alias: 'widget.searchGridCustomerList',
    store: storeGridCustomerList,
    width: 180
});
// var smGridCustomerList = Ext.create('Ext.selection.CheckboxModel', {
//     allowDeselect: true,
//     mode: 'SINGLE',
//     listeners: {
//         deselect: function(model, record, index) {
//             var selectedLen = smGridCustomerList.getSelection().length;
//             if (selectedLen == 0) {
//                 console.log(selectedLen);
//                 Ext.getCmp('btnDeleteMasterCustomerData').disable();
//             }
//         },
//         select: function(model, record, index) {
//             Ext.getCmp('btnDeleteMasterCustomerData').enable();
//         }
//     }
// });

Ext.define('GridCustomerList', {
    itemId: 'GridCustomerListID',
    id: 'GridCustomerListID',
    extend: 'Ext.grid.Panel',
    alias: 'widget.GridCustomerList',
    store: storeGridCustomerList,    
    loadMask: true,
    columns:[{
        text: 'Pilih',
        width: 45,
        xtype: 'actioncolumn',
        tooltip: 'Pilih ini',
        align: 'center',
        icon: BASE_URL + 'assets/icons/fam/arrow_right.png',
        handler: function(grid, rowIndex, colIndex, actionItem, event, selectedRecord, row) {
            var target_id = Ext.getCmp('idCustomerFieldId').getValue();
            var target_no = Ext.getCmp('noCustomerFieldId').getValue();
            var target_name = Ext.getCmp('nameCustomerFieldId').getValue();
            var target_filter = Ext.getCmp('targetIdFilterCustomerCode').getValue();

            if(target_id != "")
                Ext.getCmp(target_id).setValue(selectedRecord.get('idcustomer'));
            
            if(target_no != "")
                Ext.getCmp(target_no).setValue(selectedRecord.get('nocustomer'));

            if(target_name != "")
                Ext.getCmp(target_name).setValue(selectedRecord.get('namecustomer'));
            
            if(target_filter != "")
                Ext.getCmp(target_filter).setValue(selectedRecord.get('nocustomer'));

            Ext.getCmp('wGridCustomerListPopup').hide();
        }
    }, {
        header: 'idcustomer',
        dataIndex: 'idcustomer',
        hidden: true,
    }, {
        header: 'nocustomer',
        dataIndex: 'nocustomer',
        hidden: true
    }, {
        header: 'Customer Name',
        dataIndex: 'namecustomer',
    }, {
        header: 'City',
        dataIndex: 'city'
    }, {
        header: 'State',
        flex:1,
        dataIndex: 'state'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            'Pencarian: ', ' ',
            {
                xtype: 'searchGridCustomerList',
                text: 'Left Button'
            }
        ]
    }],
    listeners: {
        render: {
            scope: this,
            fn: function(grid){
                storeGridCustomerList.load();
            }
        }
    }
});

var wGridCustomerListPopup = Ext.create('widget.window', {
    id: 'wGridCustomerListPopup',
    title: 'Pilih Customer',
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
        xtype:'GridCustomerList'
    }, {
        xtype: 'textfield',
        // name: 'targetIdFilterCustomerCode',
        id: 'targetIdFilterCustomerCode'
    }, {
        xtype: 'textfield',
        id: 'idCustomerFieldId',
    }, {
        xtype: 'textfield',
        id: 'noCustomerFieldId',
    }, {
        xtype: 'textfield',
        id: 'nameCustomerFieldId',
    }]
});