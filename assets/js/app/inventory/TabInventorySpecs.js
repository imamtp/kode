var WindowInventoryBahanCoil = Ext.create(dir_sys + 'inventory.WindowInventoryBahanCoil');

Ext.define(dir_sys+'inventory.TabInventorySpecs', {
    width: 700,
    extend: 'Ext.form.Panel',
    alias: 'widget.TabInventorySpecs',
    title:'Spesifikasi',
    id:'TabInventorySpecs',
    autoWidth:true,
    autoHeight:true,
    url: SITE_URL + 'backend/saveform/inventory_spec/inventory',
    // baseParams: {idmenu:24},
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    // layout: 'hbox',
    // defaults: {
    //     padding: '5 10 5 5',
    // },
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'is required',
        labelWidth: 140,
        anchor:'100%',
        width: 380
    },
    items: [
        {
            items: [
            	{
		            xtype: 'fieldcontainer',
		            fieldLabel: 'Panjang',
		            combineErrors: true,
		            msgTarget: 'side',
		            layout: 'hbox',
		            defaults: {
		                flex: 1,		               
		            },
		            items: [
		            	{ margin: '0 5 0 0',xtype: 'textfield', name: 'panjang', hideLabel: true, id:'panjang_inv_specs'}, 
		            	{ xtype: 'comboxmeasurement', hideLabel: true , name: 'panjang_satuan_id', id:'panjang_satuan_inv_specs'}
		            ]
		        },
		        {
		            xtype: 'fieldcontainer',
		            fieldLabel: 'Tinggi',
		            combineErrors: true,
		            msgTarget: 'side',
		            layout: 'hbox',
		            defaults: {
		                flex: 1,		               
		            },
		            items: [
		            	{ margin: '0 5 0 0',xtype: 'textfield', name: 'tinggi', hideLabel: true, id:'tinggi_inv_specs'}, 
		            	{ xtype: 'comboxmeasurement', hideLabel: true , name: 'tinggi_satuan_id', id:'tinggi_satuan_inv_specs'}
		            ]
		        },
		        {
		            xtype: 'fieldcontainer',
		            fieldLabel: 'Lebar',
		            combineErrors: true,
		            msgTarget: 'side',
		            layout: 'hbox',
		            defaults: {
		                flex: 1,		               
		            },
		            items: [
		            	{ margin: '0 5 0 0',xtype: 'textfield', name: 'lebar', hideLabel: true, id:'lebar_inv_specs'}, 
		            	{ xtype: 'comboxmeasurement', hideLabel: true , name: 'lebar_satuan_id', id:'lebar_satuan_inv_specs'}
		            ]
		        }
            ],
        },
        {
            items:[
            	{
		            xtype: 'fieldcontainer',
		            fieldLabel: 'Berat',
		            combineErrors: true,
		            msgTarget: 'side',
		            layout: 'hbox',
		            defaults: {
		                flex: 1,		               
		            },
		            items: [
		            	{ margin: '0 5 0 0',xtype: 'textfield', name: 'berat', hideLabel: true, id:'berat_inv_specs'}, 
		            	{ xtype: 'comboxmeasurement', hideLabel: true, name: 'berat_satuan_id', id:'berat_satuan_inv_specs' }
		            ]
		        },
		        {
		            xtype: 'fieldcontainer',
		            fieldLabel: 'Ketebalan',
		            combineErrors: true,
		            msgTarget: 'side',
		            layout: 'hbox',
		            defaults: {
		                flex: 1,		               
		            },
		            items: [
		            	{ margin: '0 5 0 0',xtype: 'textfield', name: 'ketebalan', hideLabel: true, id:'ketebalan_inv_specs'}, 
		            	{ xtype: 'comboxmeasurement', hideLabel: true, name: 'ketebalan_satuan_id' , id:'ketebalan_satuan_inv_specs'}
		            ]
		        },
		        {
		            xtype: 'fieldcontainer',
		            fieldLabel: 'Diameter',
		            combineErrors: true,
		            msgTarget: 'side',
		            layout: 'hbox',
		            defaults: {
		                flex: 1,		               
		            },
		            items: [
		            	{ margin: '0 5 0 0',xtype: 'textfield', name: 'diameter', hideLabel: true, id:'diameter_inv_specs'}, 
		            	{ xtype: 'comboxmeasurement', hideLabel: true, name: 'diameter_satuan_id', id:'diameter_satuan_inv_specs' }
		            ]
		        }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Konversi',
            // labelWidth: 120,
            anchor:'80%',
            name: 'konversi_coil_name',
            id: 'konversi_coil',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                            WindowInventoryBahanCoil.show();
                            
                            // storeGridSalesQuoteList.on('beforeload',function(store, operation,eOpts){
                            //     operation.params={
                            //                 'idunit': Ext.getCmp('idunitRequisition').getValue(),
                            //                 'status': '1'
                            //     };
                            // });

                    		var GridKonversiStore = Ext.getCmp('GridKonversi').getStore();
                            GridKonversiStore.load();

                    });
                }
            }
        },
        {
        	xtype:'hiddenfield',
        	name:'bahan_coil_id',
        	id:'bahan_coil_id'
        }
        
    ]
});