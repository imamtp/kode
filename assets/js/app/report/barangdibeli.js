Ext.define('reportBarangDibeli', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportBarangDibeli',
    id: 'reportBarangDibeli',
    title: 'Laporan Barang Dibeli',
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
                             var report1 = Ext.getCmp('tanggalReportBarangDibeli1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportBarangDibeli2').getSubmitValue();
                            var unitReportBarangDibeli = Ext.getCmp('unitReportBarangDibeli').getValue();
                            Ext.getCmp('reportBarangDibeli').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportBarangDibeli' src='"+SITE_URL+"laporan/barangdibeli/" + unitReportBarangDibeli + "/" + report1 + "/" + report2 + "/print'>");
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
                             var report1 = Ext.getCmp('tanggalReportBarangDibeli1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportBarangDibeli2').getSubmitValue();
                            var unitReportBarangDibeli = Ext.getCmp('unitReportBarangDibeli').getValue();
                            Ext.getCmp('reportBarangDibeli').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportBarangDibeli' src='"+SITE_URL+"laporan/barangdibeli/" + unitReportBarangDibeli + "/" + report1 + "/" + report2 + "/excel'>");
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
                    id: 'unitReportBarangDibeli'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportBarangDibeli1',
                    format: 'Y-m-d',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                }, {
                    xtype: 'datefield',
                    id: 'tanggalReportBarangDibeli2',
                    format: 'Y-m-d',
                    labelWidth: 40,
                    fieldLabel: 's/d'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var report1 = Ext.getCmp('tanggalReportBarangDibeli1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportBarangDibeli2').getSubmitValue();
                            var unitReportBarangDibeli = Ext.getCmp('unitReportBarangDibeli').getValue();
                            Ext.getCmp('reportBarangDibeli').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportBarangDibeli' src='"+SITE_URL+"laporan/barangdibeli/" + unitReportBarangDibeli + "/" + report1 + "/" + report2 + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportBarangDibeli' src='"+SITE_URL+"aktiva'/>"
});
