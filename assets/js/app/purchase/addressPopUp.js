Ext.define('FormChooseAddress', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FormChooseAddress',
    id: 'FormChooseAddress',
//    height: 320,
//    width: 598,
    bodyPadding: 10,
//    title: 'My Form',
    items: [
        
        {
            xtype: 'button',
            align:'right',
            text: 'Pilih Alamat 1',
            handler: function(){
                Ext.getCmp('shipaddressPurchase').setValue(Ext.getCmp('companyaddress').getValue());
                Ext.getCmp('wAddPurchasePopup').hide();
            }
        },
        {
            xtype: 'textareafield',
            anchor: '100%',
//            fieldLabel: 'Alamat 1',
            name: 'alamat',
            id: 'companyaddress'
        },
         {
            xtype: 'button',
            text: 'Pilih Alamat 2',
            handler: function(){
                Ext.getCmp('shipaddressPurchase').setValue(Ext.getCmp('companyaddress2').getValue());
                Ext.getCmp('wAddPurchasePopup').hide();
            }
        },  
        {
            xtype: 'textareafield',
            anchor: '100%',
            id: 'companyaddress2',
            name: 'alamat2'
        },
        {
            xtype: 'button',
            text: 'Pilih Alamat 3',
            handler: function(){
                Ext.getCmp('shipaddressPurchase').setValue(Ext.getCmp('companyaddress3').getValue());
                Ext.getCmp('wAddPurchasePopup').hide();
            }
        },             
        {
            xtype: 'textareafield',
            anchor: '100%',
            id: 'companyaddress3',
            name: 'alamat3'
        }
    ]

});


var wAddPurchasePopup = Ext.create('widget.window', {
    id: 'wAddPurchasePopup',
    title: 'Pilih Alamat Pengiriman',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
//    autoWidth: true,
    width: 480,
    height: 400,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'FormChooseAddress'
    }]
});