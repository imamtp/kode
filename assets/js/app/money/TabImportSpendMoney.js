Ext.create(dir_sys + 'money.EntryImportSpendMoney');
Ext.create(dir_sys + 'money.GridImportSpendMoney');

Ext.define(dir_sys + 'money.TabImportSpendMoney', {
    extend: 'Ext.tab.Panel',
    id: 'TabImportSpendMoney',
    alias: 'widget.TabImportSpendMoney',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
       {
            xtype: 'EntryImportSpendMoney'
        },
        {
            xtype: 'GridImportSpendMoney'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {

            }
        }
    }
});