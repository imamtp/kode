Ext.define('reportPenerimaanTahun', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportPenerimaanTahun',
    id: 'reportPenerimaanTahun',
    title: 'Laporan Penerimaan Tahunan',
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
                             var report1 = Ext.getCmp('tanggalReportPenerimaanTahun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportPenerimaanTahun2').getSubmitValue();
                            var unitReportPenerimaanTahun = Ext.getCmp('unitReportPenerimaanTahun').getValue();
                            Ext.getCmp('reportPenerimaanTahun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenerimaanTahun' src='"+SITE_URL+"laporan/PenerimaanTahun/" + unitReportPenerimaanTahun + "/" + report1 + "/print'>");
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
                    hidden:true,
                    iconCls: 'page_excel',
                    listeners: {
                        click: function(component) {
                             var report1 = Ext.getCmp('tanggalReportPenerimaanTahun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportPenerimaanTahun2').getSubmitValue();
                            var unitReportPenerimaanTahun = Ext.getCmp('unitReportPenerimaanTahun').getValue();
                            Ext.getCmp('reportPenerimaanTahun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenerimaanTahun' src='"+SITE_URL+"laporan/PenerimaanTahun/" + unitReportPenerimaanTahun + "/" + report1+ "/excel'>");
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
                    id: 'unitReportPenerimaanTahun'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportPenerimaanTahun1',
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
                            var report1 = Ext.getCmp('tanggalReportPenerimaanTahun1').getSubmitValue();
//                            var report2 = Ext.getCmp('tanggalReportPenerimaanTahun2').getSubmitValue();
                            var unitReportPenerimaanTahun = Ext.getCmp('unitReportPenerimaanTahun').getValue();
                            Ext.getCmp('reportPenerimaanTahun').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenerimaanTahun' src='"+SITE_URL+"laporan/PenerimaanTahun/" + unitReportPenerimaanTahun + "/" + report1+"'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportPenerimaanTahun' src='"+SITE_URL+"aktiva'/>"
});
