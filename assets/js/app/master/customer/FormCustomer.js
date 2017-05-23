var formCustomer = Ext.create('Ext.form.Panel', {
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/Customer/master',
    baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    layout: 'hbox',
    defaults: {
        padding: '5 10 5 5',
    },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'is required',
        labelWidth: 160,
        anchor:'100%',
        width: 380
    },
    items: [
        {
            items: [
                {xtype: 'hiddenfield', name: 'idcustomer', allowBlank: false},
                {xtype: 'hiddenfield', name: 'statusformCustomer', allowBlank: false},
                {xtype: 'textfield', name: 'nocustomer', fieldLabel:'No Customer', allowBlank: false},
                {xtype: 'textfield', name: 'namecustomer', fieldLabel:'Name', allowBlank: false},
                {xtype: 'comboxcustomertype', name: 'idcustomertype', fieldLabel: 'Type', allowBlank: false, emptyText: 'Choose Type...'},
                {xtype: 'textarea', name: 'address', fieldLabel:'Address', allowBlank: false},
                {xtype: 'textarea', name: 'shipadddress', fieldLabel:'Shipping Address'},
                {xtype: 'textarea', name: 'billadddress', fieldLabel:'Bill Address'},
                {xtype: 'comboxswitch', name: 'status', fieldLabel:'Status', allowBlank: false},
            ],
        },
        {
            items:[
                {xtype: 'textfield', name: 'telephone', fieldLabel:'Telp', allowBlank: false},
                {xtype: 'textfield', name: 'handphone', fieldLabel:'HP', allowBlank: false},
                {xtype: 'textfield', name: 'fax', fieldLabel:'Fax',},
                {xtype: 'textfield', name: 'email', fieldLabel:'Email', allowBlank: false},
                {xtype: 'textfield', name: 'website', fieldLabel:'Website'},
                {xtype: 'textfield', name: 'city', fieldLabel:'City', allowBlank: false},
                {xtype: 'textfield', name: 'state', fieldLabel:'State', allowBlank: false},
                {xtype: 'textfield', name: 'postcode', fieldLabel:'Post Code', allowBlank: false},
                {xtype: 'textfield', name: 'country', fieldLabel:'Country', allowBlank: false},
                {xtype: 'textarea', name: 'notes', fieldLabel:'Notes'},
            ],
        }
    ],
    buttons: [{
        text: 'Cancel',
        handler: function() {
            FormCustomer.hide();
        }
    }, {
        text: 'Save',
        handler: function() {
            if (formCustomer.isValid()) {
                formCustomer.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                        FormCustomer.hide();
                        storeGridCustomer.load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            } else {
                Ext.Msg.alert("Error!", "Your form is invalid!");
            }
        }
    }]
});

var FormCustomer = Ext.create('widget.window', {
    title: 'Form Customer',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    modal: true,
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formCustomer],
    listeners:{
        'show': function(FormCustomer){
            formCustomer.getForm().findField('statusformCustomer').setValue(FormCustomer.statusform);
        },
        'hide': function(){
            formCustomer.getForm().reset();
        }

    }
});