Ext.define('reportDaftarAkun', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportDaftarAkun',
    id: 'reportDaftarAkun',
    title: 'Daftar Akun',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                   '->',
                 {
                    xtype: 'button',
                    text: 'Email',hidden:true,
                    iconCls: 'email-icon',
                    listeners: {
                        click: function(component) {

                        }
                    }
                },{
                    xtype: 'button',
                    text: 'Print',
                    iconCls: 'print-icon',
                    listeners: {
                        click: function(component) {
//                             var report1 = Ext.getCmp('tanggalReportDaftarAkun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportDaftarAkun2').getSubmitValue();
                            var unitReportDaftarAkun = Ext.getCmp('unitReportDaftarAkun').getValue();
                            Ext.getCmp('reportDaftarAkun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportDaftarAkun' src='"+SITE_URL+"laporan/daftarakun/" + unitReportDaftarAkun + "/print'>");
                        }
                    }
                },
                {
                    xtype: 'button',hidden:true,
                    text: 'Export PDF',
                    iconCls: 'acrobat',
                    listeners: {
                        click: function(component) {

                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
//                             var report1 = Ext.getCmp('tanggalReportDaftarAkun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportDaftarAkun2').getSubmitValue();
                            var unitReportDaftarAkun = Ext.getCmp('unitReportDaftarAkun').getValue();
                            Ext.getCmp('reportDaftarAkun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportDaftarAkun' src='"+SITE_URL+"laporan/daftarakun/" + unitReportDaftarAkun + "/excel'>");
                        }
                    }
                } 
            ]
    }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                    xtype: 'comboxunit',
                    labelWidth: 90,
                    valueField:'idunit',
                    id: 'unitReportDaftarAkun'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
//                            var report1 = Ext.getCmp('tanggalReportDaftarAkun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportDaftarAkun2').getSubmitValue();
                            var unitReportDaftarAkun = Ext.getCmp('unitReportDaftarAkun').getValue();
                            Ext.getCmp('reportDaftarAkun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportDaftarAkun' src='"+SITE_URL+"laporan/daftarakun/" + unitReportDaftarAkun+ "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportDaftarAkun' src='"+SITE_URL+"aktiva'/>"
});

//Ext.define('reportDaftarAkun', {
//    title: 'Laporan DaftarAkun',
//    itemId: 'reportDaftarAkun',
//    id: 'reportDaftarAkun',
//    extend: 'Ext.Component',
//    alias: 'widget.reportDaftarAkun',
//    dockedItems: [{
//            xtype: 'toolbar',
//            dock: 'top',
//            items: [{
//                    xtype: 'datefield',
//                    id: 'tanggalReportDaftarAkun',
//                    format: 'd/m/Y',
//                    fieldLabel: 'Tanggal'
//                }]
//        }],
//    autoEl: {
//        tag: "iframe",
//        style: 'border:0px',
//        src: "dashboard/page"
//    }, listeners: {
//        maximize: function(window, opts) {
//            console.log('maximize')
////            var the_iframe = DashboardPage.getEl().dom;
////            the_iframe.contentWindow.location.reload();
//        },
//        restore: function(window, opts) {
//            console.log('restore')
////            var the_iframe = DashboardPage.getEl().dom;
////            the_iframe.contentWindow.location.reload();
//        }
//    }
//});

//Ext.create('Ext.Component', {
//    border: false,
//    xtype: "component",
//    title: "Dashboard",
//    autoEl: {
//        tag: "iframe",
//        src: "dashboard/page"
//    }, listeners: {
//        maximize: function(window, opts) {
//            console.log('maximize')
////            var the_iframe = DashboardPage.getEl().dom;
////            the_iframe.contentWindow.location.reload();
//        },
//        restore: function(window, opts) {
//            console.log('restore')
////            var the_iframe = DashboardPage.getEl().dom;
////            the_iframe.contentWindow.location.reload();
//        }
//    }
//
//});
//
//Ext.define('reportDaftarAkun', {
//    title: 'Laporan DaftarAkun',
//    itemId: 'reportDaftarAkun',
//    id: 'reportDaftarAkun',
//    extend: 'Ext.form.Panel',
//    alias: 'widget.reportDaftarAkun',
//    url: SITE_URL + 'clossing/closemonth',
//    bodyStyle: 'padding:5px',
//    labelAlign: 'top',
//    autoScroll: true,
//    fieldDefaults: {
//        msgTarget: 'side',
//        blankText: 'Tidak Boleh Kosong',
//        labelWidth: 160,
//        width: 400
//    },
//    items: [
//        {
//            xtype: 'comboxunit',
//            valueField: 'idunit',
//            allowBlank: false,
//            id: 'cbUnitClossingM',
//            listeners: {
//                'change': function(field, newValue, oldValue) {
//                    Ext.Ajax.request({
//                        url: SITE_URL + 'clossing/getPeriode',
//                        method: 'POST',
//                        params: {
//                            idunit: Ext.getCmp('cbUnitClossingM').getValue()
//                        },
//                        success: function(form, action) {
//                            var d = Ext.decode(form.responseText);
//                            Ext.getCmp('fulldate').setValue(d.fulldate);
//                            Ext.getCmp('date').setValue(d.date);
//                        },
//                        failure: function(form, action) {
//                            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                        }
//                    });
//                }
//            }
//        },
//        {
//            xtype: 'hiddenfield',
//            name: 'periode',
//            id: 'date'
//        },
//        {
//            xtype: 'textfield',
//            fieldLabel: 'Tutup Buku Untuk Periode',
//            readOnly: true,
//            id: 'fulldate'
//        },
//        Ext.panel.Panel({
//            html: '<p>&nbsp;</p><p>Proses tutup buku bulanan hanya merubah periode akuntansi dan membuat saldo awal tiap perkiraan daftarakun untuk periode selanjutnya.</p>\n\
//<p>&nbsp;<p>Anda tetap dapat melakukan transaksi pada bulan dimana telah dilakukan proses tutup buku.</p><p>&nbsp;<p>Perhatian: Sangat disarankan untuk membackup data sebelum melanjutkan clossing.</p>'
//        })],
//    buttons: [{
//            text: 'Batal',
//            handler: function() {
//                var win = Ext.getCmp('windowPopupSetupTax');
//                Ext.getCmp('formSetupTax').getForm().reset();
//                win.hide();
//            }
//        }, {
//            id: 'BtnSetupTaxSimpan',
//            text: 'Simpan',
//            handler: function() {
//
//                var form = this.up('form').getForm();
//                if (form.isValid()) {
//
//                    Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda yakin untuk melakukan tutup buku?', function(btn) {
//                        if (btn == 'yes')
//                        {
//                            form.submit({
//                                success: function(form, action) {
//
//                                    Ext.Msg.alert('Success', action.result.message);
//
//                                    //                            Ext.getCmp('formSetupTax').getForm().reset();
//                                    //                            Ext.getCmp('windowPopupSetupTax').hide();
//                                    //
//                                    //                            storeGridSetupTax.load();
//                                },
//                                failure: function(form, action) {
//                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
//                                    //                            storeGridSetupTax.load();
//                                }
//                            });
//                        }
//                    });
//
//                } else {
//                    Ext.Msg.alert("Error!", "Your form is invalid!");
//                }
//
//
//            }
//        }]
//});