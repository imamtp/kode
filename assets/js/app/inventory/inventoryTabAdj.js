Ext.define('TabInventoryAdj', {
    extend: 'Ext.tab.Panel',
    id: 'TabInventoryAdj',
    alias: 'widget.TabInventoryAdj',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'EntryAdj'
        },
        {
            xtype:'gridHistoryAdj'
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                disableUnitInventory();
            }
        }
    }
});