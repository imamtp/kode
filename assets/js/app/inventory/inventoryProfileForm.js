var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

Ext.define('fotothumb', {
    extend: 'Ext.Component',
//    id:'fotothumb',
    alias: 'widget.fotothumb',
    fieldLabel: 'Photo',
    autoEl: {tag: 'img', width: 10, height: 50, src: BASE_URL + "/assets/images/inventory.png"}
});

Ext.define('FormProfile', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FormProfile',
    id:'FormProfileID',
    autoDestroy: false,
    initComponent: function() {
        var peg = this;
        peg.title = 'Profil';
        peg.url = SITE_URL + 'inventory/saveProfile/';
        peg.bodyStyle = 'padding:5px';
        peg.labelAlign = 'top';
        peg.fieldDefaults = {
            msgTarget: 'side',
            blankText: 'Tidak Boleh Kosong',
            labelWidth: 100
        };
        peg.bodyPadding = 10;
//        peg.html ='<img src="http://localhost/aktiva//assets/images/inventory.png"/>';
        peg.defaults = {
            labelWidth: 100,
            labelAlign: 'left'
            ,width: '100%'
        };
        peg.items = [
            {
                xtype: 'hiddenfield',
                name: 'idinventory',
                id: 'idinventory'
            },
//            {
//                xtype: 'image',
//                id:'fotothumb',
//                height: 201,
//                width: 201,
//                src: 'http://localhost/aktiva//assets/images/inventory.png'
//            }
//            {
//                xtype: 'fotothumb',
//                id: 'fotothumb',
//                width: 87,
//                height: 100,
//            }
            , {
                xtype: 'filefield',
                emptyText: 'Upload Foto',
                fieldLabel: 'Photo',
                name: 'images',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'imgupload-icon'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'No Inventory',
                allowBlank:false,
                name: 'invno'
            },
            {
                xtype: 'comboxunit',
                allowBlank: false,
                // labelWidth:230,
                // width:500,
                multiSelect:true,
                id:'namaunitFormInvX',
                name: 'namaunit2[]'
                // ,value: 'Unit 1, SMIP'
                // ,value: ["Unit 1","SMIP"]
                // value: 'Unit 1,SMIP'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nama Inventory',
                allowBlank:false,
                name: 'nameinventory',
                id: 'nameinventory'
            },
            {
                xtype: 'comboxinventorycat',
                allowBlank:false,
                name: 'namecat'
            },
            {
                xtype: 'textareafield',
                fieldLabel: 'Deskripsi',
                name: 'description'
            },
            {
                xtype: 'checkboxgroup',
                width: '100%',
                fieldLabel: 'Status Inventory',
                allowBlank:false,
                items: [
                    {
                        xtype: 'checkboxfield',
                        name:'cbdijual',
                        id:'cbdijual',
                        boxLabel: 'Dijual',
                        listeners: {
                            change: function(){
                                if(this.getValue())
                                {
                                    Ext.getCmp('idFormSell').setDisabled(false);
                                } else {
                                    Ext.getCmp('idFormSell').setDisabled(true);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'checkboxfield',
                        name:'cbdibeli',
                        id:'cbdibeli',
                        boxLabel: 'Dibeli',
                        listeners: {
                            change: function(){
                                var val = Ext.getCmp('cbdibeli').getValue();
                                if(this.getValue())
                                {
                                    Ext.getCmp('idFormBuy').setDisabled(false);
                                } else {
                                    Ext.getCmp('idFormBuy').setDisabled(true);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'cbpersediaan',
                        id: 'cbpersediaan',
                        boxLabel: 'Persediaan',
                        listeners: {
                            change: function(){
                                var val = Ext.getCmp('cbpersediaan').getValue();
                                if(this.getValue())
                                {
                                    Ext.getCmp('idFormInventoried').setDisabled(false);
                                } else {
                                    Ext.getCmp('idFormInventoried').setDisabled(true);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'checkboxfield',
                        name:'nonaktif',
                        id:'nonaktif',
                        boxLabel: 'Tidak Aktif',
                        listeners: {
                            change: function(){
//                                var val = Ext.getCmp('nonaktif').getValue();
                                var formProfile = Ext.ComponentQuery.query('FormProfile')[0];
                                if(this.getValue())
                                {
                                        formProfile.getForm().findField('cbdibeli').setValue(false);
                                        formProfile.getForm().findField('cbdijual').setValue(false);
                                        formProfile.getForm().findField('cbpersediaan').setValue(false);
                                        
                                        Ext.getCmp('idFormBuy').setDisabled(true);
                                        Ext.getCmp('idFormSell').setDisabled(true);
                                        Ext.getCmp('idFormInventoried').setDisabled(true);
//                                        Ext.getCmp('idTabItemInventoryHistory').setDisabled(true);
                                } else {
                                    Ext.getCmp('idFormBuy').setDisabled(false);
                                    Ext.getCmp('idFormSell').setDisabled(false);
                                    Ext.getCmp('idFormInventoried').setDisabled(false);
                                    Ext.getCmp('idTabItemInventoryHistory').setDisabled(false);
                                }
                            }
                        }
                    }
                ]
            }
        ];

        peg.buttons = ['->', {
                text: 'Simpan Perubahan Data',
                id: 'simpanProfileID',
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {

                        form.submit({
                            success: function(form, action) {
                               Ext.Msg.alert('Success', action.result.message);
                               Ext.getCmp('WindowInventory').hide();
                               
                               storeGridInventoryAll.load();
                               storeGridInventoryInvGrid.load();
                               storeGridInventoryBuyGrid.load();
                               storeGridInventorySellGrid.load();
                               
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    } else {
                        Ext.Msg.alert("Error!", "Your form is invalid!");
                    }
                }
            }];

        peg.callParent();
    },
    afterRender: function()
    {
        this.superclass.afterRender.apply(this);
        this.doLayout();
    }
});

