Ext.define(dir_sys + 'clossing.clossingFormYear', {
    title: 'Penutupan Buku Tahunan',
    itemId: 'clossingFormYear',
    id: 'clossingFormYear',
    extend: 'Ext.form.Panel',
    alias: 'widget.clossingFormYear',
    url: SITE_URL + 'clossing/closebook/tahun',
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
            id: 'cbUnitClossingYear',
            listeners: {
                'change': function(field, newValue, oldValue) {
                    var idunit = Ext.getCmp('cbUnitClossingYear').getValue();
                    if(idunit!='' && idunit!=null)
                    {
                        Ext.Ajax.request({
                            url: SITE_URL + 'clossing/getPeriodeYear',
                            method: 'POST',
                            params: {
                                idunit: idunit
                            },
                            success: function(form, action) {
                                var d = Ext.decode(form.responseText);
                                if(d.success===true)
                                {
                                    Ext.getCmp('BtnSetupClossingYearSimpan').setDisabled(false);
                                    Ext.getCmp('fulldateClossingYear').setValue(d.message);

                                    storeClossingInvGrid.load({
                                                    params: {
                                                        'extraparams': 'b.idunit:' + Ext.getCmp('cbUnitClossingYear').getValue()
                                                    }
                                                });
                                    // Ext.Msg.alert('Message', d.message);
                                } else {
                                    Ext.getCmp('BtnSetupClossingYearSimpan').setDisabled(true);
                                    Ext.Msg.alert('Message', d.message);
                                }
                            },
                            failure: function(form, action) {
                                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                            }
                        });
                    }
                    
                }
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'periode',
            id: 'dateClossingYear'
        },
        {
            xtype: 'textfield',
            name:'yearclossing',
            fieldLabel: 'Tutup Buku Untuk Tahun',
            readOnly: true,
            id: 'fulldateClossingYear'
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
                                    fillClossingFormYear();
                                }
                            }]
            }],
            columns: [
             {header: 'No Inv', dataIndex: 'invno', minWidth: 90},
                {header: 'Nama persediaan', dataIndex: 'nameinventory', minWidth: 150},
                {header: 'Harga Perolehan', dataIndex: 'cost', minWidth: 150, xtype:'numbercolumn',align:'right'},
                {header: 'Residu', dataIndex: 'residu', minWidth: 110, xtype:'numbercolumn',align:'right'},
                {header: 'U. Ekonomis', dataIndex: 'umur', minWidth: 100,align:'center'},
                {header: 'Beban Perbulan', dataIndex: 'bebanperbulan', minWidth: 150, xtype:'numbercolumn',align:'right'},
                {header: 'Status', dataIndex: 'status', minWidth: 240,flex:1, 
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
            ]
        },
        Ext.panel.Panel({
            title:'Informasi',
            html: '<p>&nbsp;</p><p>Proses tutup buku bulanan akan membuat saldo awal tiap perkiraan neraca untuk tahun selanjutnya dan Laba Tahun Berjalan akan ditutup dan dipindahkan ke Laba Ditahan.</p>\n\
<p>&nbsp;<p>Anda tetap dapat melakukan transaksi pada bulan dimana telah dilakukan proses tutup buku.</p>'
        })],
    buttons: [{
            id: 'BtnSetupClossingYearSimpan',
            text: 'Simpan',
            handler: function() {

                var form = this.up('form').getForm();
                if (form.isValid()) {

                    Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk melakukan tutup buku?', function(btn) {
                        if (btn == 'yes')
                        {
                            var MessageBox = Ext.MessageBox.wait('Sedang memproses...');
                            form.submit({
                                success: function(form, action) {
                                    MessageBox.hide();
                                    Ext.Msg.alert('Success', action.result.message);

                                    Ext.getCmp('cbUnitClossingYear').setValue(null);
                                    Ext.getCmp('dateClossingYear').setValue(null);
                                    Ext.getCmp('fulldateClossingYear').setValue(null);
                                    
                                    storeClossingInvGrid.removeAll();


                                    //                            Ext.getCmp('formSetupTax').getForm().reset();
                                    //                            Ext.getCmp('windowPopupSetupTax').hide();
                                    //
                                    //                            storeGridSetupTax.load();
                                    Ext.getCmp('periodeBtn').setText('Periode: '+action.result.periode);
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    // MessageBox.hide();
                                    //                            storeGridSetupTax.load();
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

function fillClossingFormYear()
{
    var idunit = Ext.getCmp('cbUnitClossingYear').getValue();
        if(idunit!='' && idunit!=null)
        {
            Ext.Ajax.request({
                url: SITE_URL + 'clossing/getPeriodeYear',
                method: 'POST',
                params: {
                    idunit: idunit
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if(d.success===true)
                    {
                        Ext.getCmp('BtnSetupClossingYearSimpan').setDisabled(false);
                        Ext.getCmp('fulldateClossingYear').setValue(d.message);

                        storeClossingInvGrid.load({
                                        params: {
                                            'extraparams': 'b.idunit:' + Ext.getCmp('cbUnitClossingYear').getValue()
                                        }
                                    });
                        // Ext.Msg.alert('Message', d.message);
                    } else {
                        Ext.getCmp('BtnSetupClossingYearSimpan').setDisabled(true);
                        Ext.Msg.alert('Message', d.message);
                    }
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }
}