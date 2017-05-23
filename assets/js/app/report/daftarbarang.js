Ext.define('reportDaftarBarang', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportDaftarBarang',
    id: 'reportDaftarBarang',
    title: 'Laporan Daftar Barang',
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
//                             var report1 = Ext.getCmp('tanggalReportDaftarBarang1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportDaftarBarang2').getSubmitValue();
                            var unitReportDaftarBarang = Ext.getCmp('unitReportDaftarBarang').getValue();
                            Ext.getCmp('reportDaftarBarang').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportDaftarBarang' src='"+SITE_URL+"laporan/daftarbarang/" + unitReportDaftarBarang + "/print'>");
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
//                             var report1 = Ext.getCmp('tanggalReportDaftarBarang1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportDaftarBarang2').getSubmitValue();
                            var unitReportDaftarBarang = Ext.getCmp('unitReportDaftarBarang').getValue();
                            Ext.getCmp('reportDaftarBarang').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportDaftarBarang' src='"+SITE_URL+"laporan/daftarbarang/" + unitReportDaftarBarang + "/excel'>");
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
                    multiSelect:true,
                    valueField:'idunit',
                    id: 'unitReportDaftarBarang'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
//                            var report1 = Ext.getCmp('tanggalReportDaftarBarang1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportDaftarBarang2').getSubmitValue();
                            var unitReportDaftarBarang = Ext.getCmp('unitReportDaftarBarang').getValue();
                            Ext.getCmp('reportDaftarBarang').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportDaftarBarang' src='"+SITE_URL+"laporan/daftarbarang/" + unitReportDaftarBarang+ "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportDaftarBarang' src='"+SITE_URL+"aktiva'/>"
});
