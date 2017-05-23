Ext.define('TabTransferMoney', {
    extend: 'Ext.tab.Panel',
    id: 'TabTransferMoney',
    alias: 'widget.TabTransferMoney',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'transferKasForm'
        },
        {
            xtype: 'GridTransferMoney'
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