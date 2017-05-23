Ext.define('TabImportReceiveMoney', {
    extend: 'Ext.tab.Panel',
    id: 'TabImportReceiveMoney',
    alias: 'widget.TabImportReceiveMoney',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
       {
            xtype: 'EntryImportReceiveMoney'
        },
        {
            xtype: 'GridImportReceiveMoney'
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