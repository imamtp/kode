Ext.define('storeClossingInvGridModel', {
    extend: 'Ext.data.Model',
    fields: ['cost','residu','umur','bebanperbulan','nameinventory','invno'],
    idProperty: 'id'
});

var storeClossingInvGrid = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'storeClossingInvGridModel',
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/clossinginvgrid/inventory',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});


Ext.define('clossingFormMonth', {
    title: 'Penutupan Buku Bulanan',
    itemId: 'clossingFormMonth',
    id: 'clossingFormMonth',
    extend: 'Ext.form.Panel',
    alias: 'widget.clossingFormMonth',
    url: SITE_URL + 'clossing/closebook/bulan',
    bodyStyle: 'padding:5px',
    labelAlign: 'top',
    autoScroll: true,
    fieldDefaults: {
        msgTarget: 'side',
        blankText: 'Tidak Boleh Kosong',
        labelWidth: 160,
        width: 400
    },
    items: [
        {
            xtype: 'comboxunit',
            valueField: 'idunit',
            allowBlank: false,
            id: 'cbUnitClossingM',
            listeners: {
                'change': function(field, newValue, oldValue) {
                    fillClossingForm();
                }
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'periode',
            id: 'date'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Tutup Buku Untuk Periode',
            readOnly: true,
            id: 'fulldate'
        },
        
        {
            xtype: 'gridpanel',
            title: 'Daftar persediaan yang akan disusutkan nilainya',
            store: storeClossingInvGrid,
            minHeight: 250,
            width:'100%',
            dockedItems: [
            {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                                xtype:'button',
                                text: 'Refresh',
                                iconCls: 'refresh',
                                handler: function() {
                                    fillClossingForm();
                                }
                            }]
            }],
            columns: [
            // a.nameinventory,a.invno,
                {header: 'No Inv', dataIndex: 'invno', minWidth: 90},
                {header: 'Nama persediaan', dataIndex: 'nameinventory', minWidth: 150},
                {header: 'Harga Perolehan', dataIndex: 'cost', minWidth: 150, xtype:'numbercolumn',align:'right'},
                {header: 'Residu', dataIndex: 'residu', minWidth: 110, xtype:'numbercolumn',align:'right'},
                {header: 'U. Ekonomis', dataIndex: 'umur', minWidth: 100,align:'center'},
                {header: 'Beban Perbulan', dataIndex: 'bebanperbulan', minWidth: 150, xtype:'numbercolumn',align:'right'},
                {header: 'Status', dataIndex: 'status', minWidth: 240, 
                  renderer: function(value, metaData, record, row, col, store, gridView){
                    if(record.raw.status=='akunundefined')
                    {
                        return '<font color=red>Akun Persediaan Belum Terdefinisi</font>';
                    } else if(record.raw.status=='bebanundefined')
                    {
                        return '<font color=red>Nominal Beban Perbulan Belum Terdefinisi</font>';
                    } else {
                        return '<font color=green>OK</font>';
                    }
                    // return this.renderMarca(value, record);
                }}
            ], 
            // listeners: {            
            //     itemdblclick: function(dv, record, item, index, e) {
            //         console.log('te')
            //         // var formAgama = Ext.create('formAgama');
            //         var formlinkedaccInventory = Ext.getCmp('formlinkedaccInventory');
            //         wlinkedaccInventory.show();
            //         Ext.getCmp('namaunitAccInventory').setValue(record.data.namaunit)
            //         Ext.getCmp('idunitAccInventory').setValue(record.data.idunit)
            //         Ext.getCmp('idinventoryAccInventory').setValue(Ext.getCmp('idinventoryInv').getValue());
            //         // storeGridSetupUnit.load();
                    
            //         formlinkedaccInventory.getForm().load({
            //             url: SITE_URL + 'backend/loadFormData/acclinkinventory/1/inventory',
            //             params: {
            //                 extraparams: 'idunit:' + record.data.idunit+','+'idinventory:'+Ext.getCmp('idinventoryInv').getValue()
            //             },
            //             success: function(form, action) {
            //                 var obj = Ext.decode(action.response.responseText);
            //                 console.log(obj)
            //                 // accasset: "Perlengkapan Kantor"akumpenyusut: "Akum. Penyusutan Peralatan"
            //                 // depresiasi: "Operasional Kantor"idinventory: "16"idunit: "2"namaunit: "SMIP"
            //                 Ext.getCmp('idinventoryAccInventory').setValue(obj.data.idinventory);
            //                 Ext.getCmp('idunitAccInventory').setValue(obj.data.idunit);
            //                 Ext.getCmp('namaunitAccInventory').setValue(obj.data.namaunit);
            //                 Ext.getCmp('assetaccount').setValue(obj.data.assetaccount);
            //                 Ext.getCmp('accnameAsset').setValue(obj.data.accasset);
            //                 Ext.getCmp('akumpenyusutaccount').setValue(obj.data.akumpenyusutaccount);
            //                 Ext.getCmp('accnamePenyusutan').setValue(obj.data.akumpenyusut);
            //                 Ext.getCmp('depresiasiaccount').setValue(obj.data.depresiasiaccount);
            //                 Ext.getCmp('accnameDepresiasi').setValue(obj.data.depresiasi);
            //                 // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //             },
            //             failure: function(form, action) {
            //                 // Ext.Msg.alert("Load failed", action.result.errorMessage);
            //             }
            //         })

            //         // Ext.getCmp('statusformlinkedacc').setValue('edit');
            //     }
            // }
        },
         Ext.panel.Panel({
            title:'Informasi',
            html: 'Berikut beberapa hal yang terjadi pada proses tutup buku bulanan:<br>\n\
            1. Merubah periode akuntansi ke periode selanjutnya.<br>\n\
            2. Menghitung nilai depresiasi dari setiap inventory/persediaan dengan metode garis lurus.<br>\n\
            3. Nilai saldo akhir setiap akun-akun Laba-Rugi ditutup dan dipindahkan ke akun Laba Tahun Berjalan (Current Year Earnings).<br></p>\n\
                <p>&nbsp;<p>Anda tetap dapat melakukan transaksi pada bulan dimana telah dilakukan proses tutup buku.</p>'
        })
//         Ext.panel.Panel({
//             title:'Informasi',
//             html: 'Proses tutup buku bulanan merubah periode akuntansi dan memindahkan nilai saldo akhir setiap akun-akun Neraca menjadi saldo awal untuk bulan atau tahun selanjutnya sedangkan nilai saldo akhir setiap akun-akun Laba-Rugi ditutup dan dipindahkan ke akun Laba Tahun Berjalan (Current Year Earnings).</p>\n\
// <p>&nbsp;<p>Anda tetap dapat melakukan transaksi pada bulan dimana telah dilakukan proses tutup buku.</p><p>&nbsp;<p>Perhatian: Sangat disarankan untuk membackup data sebelum melanjutkan clossing.</p>'
//         })
        ],
    buttons: [{
            text: 'Batalkan Closing Bulan Sebelumnya',
            id:'monthBeforeBtn',
            handler: function() {

                Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk membatalkan tutup buku periode sebelumnya?', function(btn) {
                        if (btn == 'yes')
                        {
                             Ext.Ajax.request({
                                url: SITE_URL + 'clossing/cancelClossing',
                                method: 'POST',
                                params: {
                                    idunit: Ext.getCmp('cbUnitClossingM').getValue(),
                                    date: Ext.getCmp('date').getValue()
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    // if(d.disable===true)
                                    // {
                                    //     Ext.getCmp('BtnSetupClossingSimpan').setDisabled(true);
                                    //     Ext.Msg.alert('Message', d.message);
                                    // } else {
                                    //     Ext.getCmp('BtnSetupClossingSimpan').setDisabled(false);
                                    // }
                                    Ext.Msg.alert('Message', d.message);
                                    Ext.getCmp('monthBeforeBtn').setDisabled(true);
                                    Ext.getCmp('date').setValue('');
                                    Ext.getCmp('fulldate').setValue('');
                                    Ext.getCmp('cbUnitClossingM').setValue('');
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                        }
                    });

               
            }
        },'->',{
            id: 'BtnSetupClossingSimpan',
            text: 'Simpan',
            handler: function() {

                var form = this.up('form').getForm();
                if (form.isValid()) {

                    Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk melakukan tutup buku?', function(btn) {
                        if (btn == 'yes')
                        {
                            var MessageBox = Ext.MessageBox.wait('Sedang memproses...');
                            //cek akun link laba ditahan/laba berjalan
                            Ext.Ajax.request({
                                url: SITE_URL + 'clossing/ceklinkakun',
                                method: 'POST',
                                params: {
                                    idlinked: 4, //laba berjalan
                                    idunit: Ext.getCmp('cbUnitClossingM').getValue()
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    if(!d.success)
                                    {
                                        MessageBox.hide();
                                       Ext.Msg.alert('Info', d.message);                                        
                                    } else {
                                        //cek akun persediaan semua sudah terdefinisi apa belum
                                        Ext.Ajax.request({
                                            url: SITE_URL + 'clossing/ceklinkakunpersediaan',
                                            method: 'POST',
                                            params: {
                                                idunit: Ext.getCmp('cbUnitClossingM').getValue()
                                            },
                                            success: function(form, action) {
                                                var d = Ext.decode(form.responseText);
                                                if(!d.success)
                                                {
                                                    MessageBox.hide();
                                                    Ext.Msg.alert('Info', d.message); 
                                                    
                                                } else {
                                                    var form = Ext.getCmp('clossingFormMonth').getForm();
                                                    
                                                    form.submit({
                                                        success: function(form, action) {
                                                            MessageBox.hide();
                                                            Ext.Msg.alert('Success', action.result.message);
                                                            Ext.getCmp('cbUnitClossingM').setValue(null);
                                                            Ext.getCmp('fulldate').setValue(null);
                                                            storeClossingInvGrid.removeAll();
                                                            Ext.getCmp('periodeBtn').setText('Periode: '+action.result.periode);
                                                        },
                                                        failure: function(form, action) {
                                                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                                            MessageBox.hide();
                                                            //                            storeGridSetupTax.load();
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                        
                                    }
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });

                            
                        }
                    });

                } else {
                    Ext.Msg.alert("Error!", "Your form is invalid!");
                }


            }
        }]
});

function fillClossingForm()
{
    var idunit = Ext.getCmp('cbUnitClossingM').getValue();
        if(idunit!='' && idunit!=null)
        {
            Ext.Ajax.request({
                url: SITE_URL + 'clossing/getPeriode',
                method: 'POST',
                params: {
                    idunit: idunit
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if(d.disable===true)
                    {
                        Ext.getCmp('BtnSetupClossingSimpan').setDisabled(true);
                        Ext.Msg.alert('Message', d.message);
                    } else {
                        Ext.getCmp('BtnSetupClossingSimpan').setDisabled(false);
                    }
                    Ext.getCmp('monthBeforeBtn').setDisabled(d.monthBeforeBtn);
                    Ext.getCmp('monthBeforeBtn').setText('Batalkan Closing Bulan '+d.monthBefore);
                    Ext.getCmp('fulldate').setValue(d.fulldate);
                    Ext.getCmp('date').setValue(d.date);

                    storeClossingInvGrid.load({
                        params: {
                          'extraparams': 'b.idunit:'+idunit
                        }
                    });
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }
}