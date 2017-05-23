Ext.define('TabReturn', {
    extend: 'Ext.tab.Panel',
    id: 'TabReturn',
    alias: 'widget.TabReturn',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
         {
            xtype:'GridReturn'
        }
    ], 
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
//                disableUnitInventory();
            }
        }
    }
});