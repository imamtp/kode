Ext.define('TabSpendMoney', {
    extend: 'Ext.tab.Panel',
    id: 'TabSpendMoney',
    alias: 'widget.TabSpendMoney',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'EntrySpendMoney'
        },
        {
            xtype: 'GridSpendMoney'
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