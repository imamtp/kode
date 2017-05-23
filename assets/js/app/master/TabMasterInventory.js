Ext.create(dir_sys + 'master.GridMasterCoil');

Ext.define('TabMasterInventory', {
    extend: 'Ext.tab.Panel',
    id: 'TabMasterInventory',
    alias: 'widget.TabMasterInventory',
    activeTab: 0,
    plain:true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridMasterBrand'
        },
        // {
        //     xtype:'GridMasterThickness'
        // },
        // {
        //     xtype:'GridMasterProductType'
        // },
        {
            xtype:'GridMasterProductMeasurements'
        },
        // {
        //     xtype:'GridMasterProductData'
        // },
        {
            xtype:'GridMasterWarehouse'
        },
        {
            xtype:'GridMasterRack'
        },
        {
            xtype: 'GridInventoryCat'
        },
        {
            xtype: 'GridMasterCoil'
        }
    ], listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                // disableUnitMasterCustomer();
            }
        }
    }
});