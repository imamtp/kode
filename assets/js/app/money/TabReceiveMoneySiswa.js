



Ext.define('TabReceiveMoneySiswa', {
    extend: 'Ext.tab.Panel',
    id: 'TabReceiveMoneySiswa',
    alias: 'widget.TabReceiveMoneySiswa',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'EntryReceiveSiswaMoneySiswa'
        },
        {
            xtype: 'GridReceiveMoneySiswa'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // console.load('TabReceiveMoneySiswa')
            }
        }
    }
});
