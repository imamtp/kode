Ext.define('reportArusKas', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportArusKas',
    id: 'reportArusKas',
    title: 'Laporan Arus Kas',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                   '->',
                 {
                    xtype: 'button',
                    hidden:true,
                    text: 'Email',
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
//                             var report1 = Ext.getCmp('tanggalReportArusKas1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportArusKas2').getSubmitValue();
                            var unitReportArusKas = Ext.getCmp('unitReportArusKas').getValue();
                            Ext.getCmp('reportArusKas').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportArusKas' src='"+SITE_URL+"laporan/aruskas2/" + unitReportArusKas + "/" + report2 + "/print'>");
                        }
                    }
                },
                {
                    xtype: 'button',
                    hidden:true,
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
                            // var report1 = Ext.getCmp('tanggalReportArusKas1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportArusKas2').getSubmitValue();
                            var unitReportArusKas = Ext.getCmp('unitReportArusKas').getValue();
                            Ext.getCmp('reportArusKas').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportArusKas' src='"+SITE_URL+"laporan/aruskas2/" + unitReportArusKas + "/" + report2 + "/excel'>");
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
                    multiSelect:true,
                    id: 'unitReportArusKas'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportArusKas2',
                    format: 'F Y',
                    labelWidth: 70,
                    fieldLabel: 'Periode'
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                           // var report1 = Ext.getCmp('tanggalReportArusKas1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportArusKas2').getSubmitValue();
                            var unitReportArusKas = Ext.getCmp('unitReportArusKas').getValue();
                            if(report2==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('reportArusKas').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportArusKas' src='"+SITE_URL+"laporan/aruskas2/" + unitReportArusKas + "/" + report2 + "'>");
                            }
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportArusKas' src='"+SITE_URL+"aktiva'/>"
});
