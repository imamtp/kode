Ext.define('mPurchaseGridStore', {
    extend: 'Ext.data.Model',
    fields: [
       'nameinventory','invno', 'idinventory','assetaccount','idunit','idtax', 'itemdesc','qty','received','backorder','price','disc','total','ratetax'
    ]
});

var PurchaseGridStore = Ext.create('Ext.data.Store', {
    model: 'mPurchaseGridStore'
});