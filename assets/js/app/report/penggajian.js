Ext.define('reportPenggajian', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportPenggajian',
    id: 'reportPenggajian',
    title: 'Laporan Penggajian',
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
                             var report1 = Ext.getCmp('tanggalReportPenggajian1').getSubmitValue();
                            var unitReportPenggajian = Ext.getCmp('unitReportPenggajian').getValue();
                            Ext.getCmp('reportPenggajian').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenggajian' src='"+SITE_URL+"laporan/penggajian/" + unitReportPenggajian + "/" + report1 + "/print'>");
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Export PDF',
                    iconCls: 'acrobat',hidden:true,
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
                             var report1 = Ext.getCmp('tanggalReportPenggajian1').getSubmitValue();
                            var unitReportPenggajian = Ext.getCmp('unitReportPenggajian').getValue();
                            Ext.getCmp('reportPenggajian').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenggajian' src='"+SITE_URL+"laporan/penggajian/" + unitReportPenggajian + "/" + report1 + "/excel'>");
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
                    id: 'unitReportPenggajian'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportPenggajian1',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var report1 = Ext.getCmp('tanggalReportPenggajian1').getSubmitValue();
                            var unitReportPenggajian = Ext.getCmp('unitReportPenggajian').getValue();
                            Ext.getCmp('reportPenggajian').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportPenggajian' src='"+SITE_URL+"laporan/penggajian/" + unitReportPenggajian + "/" + report1 + "'>");
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportPenggajian' src='"+SITE_URL+"aktiva'/>"
});
