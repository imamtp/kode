Ext.define('TabImportSpendMoney', {
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