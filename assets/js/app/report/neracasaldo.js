Ext.define('reportNeracaSaldo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportNeracaSaldo',
    id: 'reportNeracaSaldo',
    title: 'Laporan Neraca Saldo',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                   '->',
                 {
                    xtype: 'button',hidden:true,
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
                            var report1 = Ext.getCmp('tanggalReportNeracaSaldo1').getSubmitValue();
                            var unitReportNeracaSaldo = Ext.getCmp('unitReportNeracaSaldo').getValue();

                            if(report1==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('reportNeracaSaldo').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/neracasaldo/" + unitReportNeracaSaldo + "/" + report1 + "/print'>");
                            }
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
                             var report1 = Ext.getCmp('tanggalReportNeracaSaldo1').getSubmitValue();
                            var report2 = null;
                            var unitReportNeracaSaldo = Ext.getCmp('unitReportNeracaSaldo').getValue();
                            Ext.getCmp('reportNeracaSaldo').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"index.php/laporan/neracasaldo/" + unitReportNeracaSaldo + "/" + report1 + "/excel'>");
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
                    id: 'unitReportNeracaSaldo'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportNeracaSaldo1',
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
                            var report1 = Ext.getCmp('tanggalReportNeracaSaldo1').getSubmitValue();
                            var unitReportNeracaSaldo = Ext.getCmp('unitReportNeracaSaldo').getValue();

                            if(report1==''){
                                Ext.Msg.alert("Info", 'Periode belum ditentukan');
                            } else {
                                Ext.getCmp('reportNeracaSaldo').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportNeracaSaldo' src='"+SITE_URL+"laporan/neracasaldo/" + unitReportNeracaSaldo + "/" + report1 + "'>");
                            }
                           
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportNeracaSaldo' src='"+SITE_URL+"aktiva'/>"
});
