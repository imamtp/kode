Ext.define('fotothumbInvSupplier', {
    extend: 'Ext.Component',
    //    id:'fotothumb',
    alias: 'widget.fotothumbInvSupplier',
    fieldLabel: 'Photo',
    autoEl: {
        tag: 'img',
        width: 10,
        height: 50,
        src: BASE_URL + "/assets/images/inventory.png"
    }
});

var formInventorySupplierGrid = Ext.create('Ext.form.Panel', {
    id: 'formInventorySupplierGrid',
    width: 750,
    // title:'Profil',
    height: 330,
    url: SITE_URL + 'backend/saveform/InventorySupplierGrid/supplier',
    bodyStyle: 'padding:5px',
//    autoWidth:true,
    forceFit:true,
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
//        padding: '5 40 5 5',
        labelWidth: 190,
        width: 350
    },
    layout: 'hbox',
    defaults:{
        padding: '5 10 5 5',
    },
        items: [{
            items: [ {
                xtype: 'hiddenfield',
                name: 'idinventory',
                id: 'idinventoryInvSupplier'
            },
            {
                xtype: 'hiddenfield',
                name: 'idprimarysupplier',
                id: 'idprimarysupplierInvSupplier'
            }
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
                xtype: 'textfield',
                fieldLabel: 'Nama Inventory',
                allowBlank:false,
                name: 'nameinventory',
                id: 'nameinventoryInvSupplier'
            },
            {
                xtype: 'comboxinventorycat',
                allowBlank:false,
                name: 'namecat'
            },
            {
                xtype:'textfield',
                fieldLabel: 'Satuan',
                name: 'unitmeasure'
            },
            {
                xtype:'textfield',
                fieldLabel: 'Harga Beli',
                name: 'cost'
            },{
                xtype:'textarea',
                fieldLabel: 'Deskripsi Barang',
                name: 'description'
            }]
        }, {
            items: [
             {
                xtype: 'numberfield',
                // disabled:true,
                anchor: '98%',
                fieldLabel: 'Nilai Residu',
                listeners: {
                     change: function(txt, The, eOpts){
                      // this.setRawValue(renderNomor(this.getValue()));
                       // CalcPenyusutan('Supplier');
                    }
                    // 'render': function(c) {
                    //     c.getEl().on('keyup', function() {
                    //         CalcPenyusutan();
                    //     }, c);
                    // }
                },
                id: 'residuSupplier',
                name: 'residu'
            },
            {
                xtype: 'numberfield',
                anchor: '98%',
                fieldLabel: 'Umur Ekonomis',
                allowBlank:false,
                id: 'umurEkonomisSupplier',
                name: 'umur',
                listeners: {
                    'render': function(c) {
                        c.getEl().on('keyup', function() {
                            // CalcPenyusutan('Supplier');
                        }, c);
                    }
                },
            }
            // ,
            // {
            //     xtype: 'textfield',disabled:true,
            //     style: 'text-align: right',
            //     anchor: '98%',
            //     labelStyle : 'text-align:left',
            //     // anchor: '9',
            //     fieldLabel: 'Akumulasi Beban Berjalan',
            //     id: 'akumulasibebanSupplier',
            //     allowBlank:false,
            //     name: 'akumulasibeban',
            //     // listeners: {
            //     //     change: function(txt, The, eOpts){
            //     //       this.setRawValue(renderNomor(this.getValue()));
            //     //     }
            //     // }
            // },
            // {
            //     xtype: 'textfield',disabled:true,
            //     anchor: '98%',
            //      style: 'text-align: right',
            //     labelStyle : 'text-align:left',
            //     fieldLabel: 'Beban Tahun Berjalan',
            //     id: 'bebanberjalanSupplier',
            //     allowBlank:false,
            //     name: 'bebanberjalan'
            // },
            // {
            //     xtype: 'textfield',disabled:true,
            //     anchor: '98%',
            //      style: 'text-align: right',
            //     labelStyle : 'text-align:left',
            //     fieldLabel: 'Nilai Buku Berjalan',
            //     id: 'nilaibukuSupplier',
            //     readOnly:true,
            //     allowBlank:false,
            //     name: 'nilaibuku'
            // },
            // {
            //     xtype: 'textfield',disabled:true,
            //     anchor: '98%',
            //      style: 'text-align: right',
            //     labelStyle : 'text-align:left',
            //     fieldLabel: 'Beban Perbulan',
            //     id: 'bebanperbulanSupplier',
            //     allowBlank:false,
            //     readOnly:true,
            //     name: 'bebanperbulan'
            // },
            //  {
            //     xtype: 'textfield',disabled:true,
            //     anchor: '98%',
            //      style: 'text-align: right',
            //     labelStyle : 'text-align:left',
            //     fieldLabel: 'Penyusutan Setelah Habis Usia',
            //     id: 'akumulasiAkhirSupplier',
            //     allowBlank:false,
            //     readOnly:true,
            //     name: 'akumulasiakhir'
            // }
            ]
        }],
    buttons: [{
            text: 'Batal',
            handler: function() {
                var win = Ext.getCmp('wInventorySupplier');
                Ext.getCmp('formInventorySupplierGrid').getForm().reset();
                win.hide();
            }
        }, {
            id: 'BtnInventorySupplierGridSimpan',
            text: 'Simpan',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            
                            Ext.Msg.alert('Success', action.result.message);

                            Ext.getCmp('formInventorySupplierGrid').getForm().reset();
                            Ext.getCmp('wInventorySupplier').hide();

                            // storeGridInventorySupplierGrid.load();
                            Ext.getCmp('GridInventorySupplier').getStore().load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                            storeGridInventorySupplierGrid.load();
                        }
                    });
                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }
            }
        }]
});
    var wInventorySupplier = Ext.create('widget.window', {
        id: 'wInventorySupplier',
        title: 'Input Barang',
        header: {
            titlePosition: 2,
            titleAlign: 'center'
        },
        closable: true,
        closeAction: 'hide',
        autoWidth: true,
        //    autoHeight: true,
        layout: 'fit',
        border: false,
        //    items: [formInventoryAll]
        items: [
            formInventorySupplierGrid
        ]
    });