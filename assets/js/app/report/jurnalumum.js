Ext.define('reportJurnalUmum', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportJurnalUmum',
    id: 'reportJurnalUmum',
    title: 'Laporan JurnalUmum',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
            '->',
            {
                xtype: 'button',
                hidden: true,
                text: 'Email',
                iconCls: 'email-icon',
                listeners: {
                    click: function (component) {

                    }
                }
            }, {
                xtype: 'button',
                text: 'Print',
                iconCls: 'print-icon',
                listeners: {
                    click: function (component) {
                        if (report1 == '') {
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if (report2 == '') {
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportJurnalUmum').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportJurnalUmum' src='" + SITE_URL + "laporan/jurnalumum/" + unitReportJurnalUmum + "/" + report1 + "/" + report2 + "/print'>");
                        }
                    }
                }
            },
            {
                xtype: 'button',
                text: 'Export PDF',
                hidden: true,
                iconCls: 'acrobat',
                listeners: {
                    click: function (component) {

                    }
                }
            },
            {
                xtype: 'button',
                text: 'Export Excel',
                iconCls: 'page_excel',
                listeners: {
                    click: function (component) {
                        var report1 = Ext.getCmp('tanggalReportJurnalUmum1').getSubmitValue();
                        var report2 = Ext.getCmp('tanggalReportJurnalUmum2').getSubmitValue();
                        var unitReportJurnalUmum = Ext.getCmp('unitReportJurnalUmum').getValue();
                        Ext.getCmp('reportJurnalUmum').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportJurnalUmum' src='" + SITE_URL + "laporan/jurnalumum/" + unitReportJurnalUmum + "/" + report1 + "/" + report2 + "/excel'>");
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
                multiSelect: true,
                valueField: 'idunit',
                id: 'unitReportJurnalUmum'
            }, {
                xtype: 'datefield',
                id: 'tanggalReportJurnalUmum1',
                format: 'Y-m-d',
                labelWidth: 90,
                fieldLabel: 'Bulan'
            }, {
                xtype: 'datefield',
                id: 'tanggalReportJurnalUmum2',
                format: 'Y-m-d',
                labelWidth: 40,
                fieldLabel: 's/d'
            },
            {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function (component) {
                        var report1 = Ext.getCmp('tanggalReportJurnalUmum1').getSubmitValue();
                        var report2 = Ext.getCmp('tanggalReportJurnalUmum2').getSubmitValue();
                        var unitReportJurnalUmum = Ext.getCmp('unitReportJurnalUmum').getValue();

                        if (report1 == '') {
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if (report2 == '') {
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportJurnalUmum').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportJurnalUmum' src='" + SITE_URL + "laporan/jurnalumum/" + unitReportJurnalUmum + "/" + report1 + "/" + report2 + "'>");
                        }
                    }
                }
            }
        ]
    }],
    //    html: "<iframe id='iframeReportJurnalUmum' src='"+SITE_URL+"aktiva'/>"
});