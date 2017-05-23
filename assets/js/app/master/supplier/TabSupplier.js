Ext.define('TabSupplier', {
    extend: 'Ext.tab.Panel',
    id: 'TabSupplier',
    alias: 'widget.TabSupplier',
    activeTab: 0,
    plain:true,
    autoWidth: '100%',
    autoScroll: true,
    defaults: {
        autoScroll: true
    },
    items: [
        {
            xtype: 'GridSupplier'
        },
        {
            xtype:'GridSupplierType'
        }
    ],
});