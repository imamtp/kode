Ext.define('reportPengeluaranTahun', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportPengeluaranTahun',
    id: 'reportPengeluaranTahun',
    title: 'Laporan Pengeluaran Tahunan',
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
                             var report1 = Ext.getCmp('tanggalReportPengeluaranTahun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportPengeluaranTahun2').getSubmitValue();
                            var unitReportPengeluaranTahun = Ext.getCmp('unitReportPengeluaranTahun').getValue();
                            Ext.getCmp('reportPengeluaranTahun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPengeluaranTahun' src='"+SITE_URL+"laporan/PengeluaranTahun/" + unitReportPengeluaranTahun + "/" + report1 + "/print'>");
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
                    hidden:true,
                    text: 'Export Excel',
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                             var report1 = Ext.getCmp('tanggalReportPengeluaranTahun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportPengeluaranTahun2').getSubmitValue();
                            var unitReportPengeluaranTahun = Ext.getCmp('unitReportPengeluaranTahun').getValue();
                            Ext.getCmp('reportPengeluaranTahun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPengeluaranTahun' src='"+SITE_URL+"laporan/PengeluaranTahun/" + unitReportPengeluaranTahun + "/" + report1+ "/excel'>");
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
                    id: 'unitReportPengeluaranTahun'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportPengeluaranTahun1',
                    format: 'Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var report1 = Ext.getCmp('tanggalReportPengeluaranTahun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportPengeluaranTahun2').getSubmitValue();
                            var unitReportPengeluaranTahun = Ext.getCmp('unitReportPengeluaranTahun').getValue();
                            Ext.getCmp('reportPengeluaranTahun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPengeluaranTahun' src='"+SITE_URL+"laporan/PengeluaranTahun/" + unitReportPengeluaranTahun + "/" + report1+"'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportPengeluaranTahun' src='"+SITE_URL+"aktiva'/>"
});
