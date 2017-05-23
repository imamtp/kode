var GridMasterProductionCost = Ext.create(dir_sys + 'master.GridMasterProductionCost');

Ext.define('TabMasterProduction', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterProduction',
    alias: 'widget.TabMasterProduction',
    activeTab: 0,
    plain:true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridMasterMachine'
        },
        {
            xtype:'GridMasterMachineType'
        },
        GridMasterProductionCost
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});