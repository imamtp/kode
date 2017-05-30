var deliveryOrderGrid = Ext.create(dir_sys + 'sales.deliveryOrderGrid');
var deliveryOrderReturnGrid = Ext.create(dir_sys + 'sales.deliveryOrderReturnGrid');

Ext.define(dir_sys +'sales.TabDeliveryOrder', {
    extend: 'Ext.tab.Panel',
    id: 'TabDeliveryOrder',
    alias: 'widget.TabDeliveryOrder',
    activeTab: 0,
    autoWidth: '100%',
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'deliveryOrderGrid'
        },
        {
            xtype:'deliveryOrderReturnGrid'
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitInventory();
            }
        }
    }
});