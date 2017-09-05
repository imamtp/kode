Ext.define('reportKasKeluar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportKasKeluar',
    id: 'reportKasKeluar',
    title: 'Laporan KasKeluar',
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
                            if(report1==''){
                                Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                            } else if(report2==''){
                                Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                            } else {
                                Ext.getCmp('reportKasKeluar').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportKasKeluar' src='"+SITE_URL+"laporan/kaskeluar/" + unitReportKasKeluar + "/" + report1 + "/" + report2 + "/print'>");
                            }
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
                             var report1 = Ext.getCmp('tanggalReportKasKeluar1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportKasKeluar2').getSubmitValue();
                            var unitReportKasKeluar = Ext.getCmp('unitReportKasKeluar').getValue();
                            Ext.getCmp('reportKasKeluar').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportKasKeluar' src='"+SITE_URL+"laporan/kaskeluar/" + unitReportKasKeluar + "/" + report1 + "/" + report2 + "/excel'>");
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
                    id: 'unitReportKasKeluar'
                },{
                    xtype: 'datefield',
                    id: 'tanggalReportKasKeluar1',
                    format: 'Y-m-d',
                    labelWidth: 90,
                    fieldLabel: 'Bulan'
                }, {
                    xtype: 'datefield',
                    id: 'tanggalReportKasKeluar2',
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
                            var report1 = Ext.getCmp('tanggalReportKasKeluar1').getSubmitValue();
                            var report2 = Ext.getCmp('tanggalReportKasKeluar2').getSubmitValue();
                            var unitReportKasKeluar = Ext.getCmp('unitReportKasKeluar').getValue();

                            if(report1==''){
                                Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                            } else if(report2==''){
                                Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                            } else {
                                Ext.getCmp('reportKasKeluar').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportKasKeluar' src='"+SITE_URL+"laporan/kaskeluar/" + unitReportKasKeluar + "/" + report1 + "/" + report2 + "'>");
                            }
                            
                        }
                    }
                }]
        }],
//    html: "<iframe id='iframeReportKasKeluar' src='"+SITE_URL+"aktiva'/>"
});
