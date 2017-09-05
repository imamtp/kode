Ext.define('reportGeneralLedger', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportGeneralLedger',
    id: 'reportGeneralLedger',
    title: 'Laporan Buku Besar',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
            '->',
            {
                xtype: 'button',
                text: 'Email',
                hidden: true,
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
                        var report1 = Ext.getCmp('tanggalReportGeneralLedger1').getSubmitValue();
                        var unitReportGeneralLedger = Ext.getCmp('unitReportGeneralLedger').getValue();

                        if (report1 == '') {
                            Ext.Msg.alert("Info", 'Periode belum ditentukan');
                        } else {
                            Ext.getCmp('reportGeneralLedger').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportGeneralLedger' src='" + SITE_URL + "laporan/generalledger/" + unitReportGeneralLedger + "/" + report1 + "/" + report2 + "/print'>");
                        }
                    }
                }
            },
            {
                xtype: 'button',
                hidden: true,
                text: 'Export PDF',
                iconCls: 'acrobat',
                listeners: {
                    click: function (component) {

                    }
                }
            },
            {
                xtype: 'button',
                text: 'Export Excel',
                hidden: true,
                iconCls: 'page_excel',
                listeners: {
                    click: function (component) {
                        var report1 = Ext.getCmp('tanggalReportGeneralLedger1').getSubmitValue();
                        var report2 = null;
                        var unitReportGeneralLedger = Ext.getCmp('unitReportGeneralLedger').getValue();
                        Ext.getCmp('reportGeneralLedger').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportGeneralLedger' src='" + SITE_URL + "laporan/generalledger/" + unitReportGeneralLedger + "/" + report1 + "/" + report2 + "/excel'>");
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
                id: 'unitReportGeneralLedger'
            }, {
                xtype: 'datefield',
                id: 'tanggalReportGeneralLedger1',
                format: 'F Y',
                labelWidth: 90,
                fieldLabel: 'Bulan'
            },
            {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function (component) {
                        var report1 = Ext.getCmp('tanggalReportGeneralLedger1').getSubmitValue();
                        var unitReportGeneralLedger = Ext.getCmp('unitReportGeneralLedger').getValue();

                        if (report1 == '') {
                            Ext.Msg.alert("Info", 'Periode belum ditentukan');
                        } else {
                            Ext.getCmp('reportGeneralLedger').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportGeneralLedger' src='" + SITE_URL + "laporan/generalledger/" + unitReportGeneralLedger + "/" + report1 + "'>");
                        }

                    }
                }
            }
        ]
    }],
    //    html: "<iframe id='iframeReportGeneralLedger' src='"+SITE_URL+"aktiva'/>"
});