Ext.define('reportPenerimaanSiswaBulan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportPenerimaanSiswaBulan',
    id: 'reportPenerimaanSiswaBulan',
    title: 'Laporan Penerimaan Siswa Bulanan',
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
                             var report1 = Ext.getCmp('tanggalReportPenerimaanSiswaBulan1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportPenerimaanSiswaBulan2').getSubmitValue();
                            var unitReportPenerimaanSiswaBulan = Ext.getCmp('unitReportPenerimaanSiswaBulan').getValue();
                            Ext.getCmp('reportPenerimaanSiswaBulan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenerimaanSiswaBulan' src='"+SITE_URL+"laporan/PenerimaanSiswaBulan/" + unitReportPenerimaanSiswaBulan + "/" + report1 + "/" + report2 + "/print'>");
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
                             var report1 = Ext.getCmp('tanggalReportPenerimaanSiswaBulan1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportPenerimaanSiswaBulan2').getSubmitValue();
                            var unitReportPenerimaanSiswaBulan = Ext.getCmp('unitReportPenerimaanSiswaBulan').getValue();
                            Ext.getCmp('reportPenerimaanSiswaBulan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenerimaanSiswaBulan' src='"+SITE_URL+"laporan/PenerimaanSiswaBulan/" + unitReportPenerimaanSiswaBulan + "/" + report1 + "/" + report2 + "/excel'>");
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
                    id: 'unitReportPenerimaanSiswaBulan'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportPenerimaanSiswaBulan1',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                 {
                    xtype: 'datefield',
                    id: 'tanggalReportPenerimaanSiswaBulan2',
                    format: 'F Y',
                    labelWidth: 40,
                    fieldLabel: 's/d'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var report1 = Ext.getCmp('tanggalReportPenerimaanSiswaBulan1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportPenerimaanSiswaBulan2').getSubmitValue();
                            var unitReportPenerimaanSiswaBulan = Ext.getCmp('unitReportPenerimaanSiswaBulan').getValue();
                            Ext.getCmp('reportPenerimaanSiswaBulan').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenerimaanSiswaBulan' src='"+SITE_URL+"laporan/PenerimaanSiswaBulan/" + unitReportPenerimaanSiswaBulan + "/" + report1+ "/" + report2+"'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportPenerimaanSiswaBulan' src='"+SITE_URL+"aktiva'/>"
});
