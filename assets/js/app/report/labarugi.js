Ext.define('reportLabaRugi', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportLabaRugi',
    id: 'reportLabaRugi',
    title: 'Laporan LabaRugi',
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
                             var report1 = Ext.getCmp('tanggalReportLabaRugi1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportLabaRugi2').getSubmitValue();
                            var unitReportLabaRugi = Ext.getCmp('unitReportLabaRugi').getValue();
                            Ext.getCmp('reportLabaRugi').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportLabaRugi' src='"+SITE_URL+"laporan/labarugi/" + unitReportLabaRugi + "/" + report1 + "/" + report2 + "/print'>");
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Export PDF',hidden:true,
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
                             var report1 = Ext.getCmp('tanggalReportLabaRugi1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportLabaRugi2').getSubmitValue();
                            var unitReportLabaRugi = Ext.getCmp('unitReportLabaRugi').getValue();
                            Ext.getCmp('reportLabaRugi').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportLabaRugi' src='"+SITE_URL+"laporan/labarugi/" + unitReportLabaRugi + "/" + report1 + "/" + report2 + "/excel'>");
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
                    id: 'unitReportLabaRugi'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportLabaRugi1',
                    format: 'F Y',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                }, {
                    xtype: 'datefield',
                    id: 'tanggalReportLabaRugi2',
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
                            var report1 = Ext.getCmp('tanggalReportLabaRugi1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportLabaRugi2').getSubmitValue();
                            var unitReportLabaRugi = Ext.getCmp('unitReportLabaRugi').getValue();

                            if(report1==''){
                                Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                            } else if(report2==''){
                                Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                            } else {
                                Ext.getCmp('reportLabaRugi').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportLabaRugi' src='"+SITE_URL+"laporan/labarugi/" + unitReportLabaRugi + "/" + report1 + "/" + report2 + "'>");
                            }
                            
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportLabaRugi' src='"+SITE_URL+"aktiva'/>"
});
