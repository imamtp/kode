Ext.define('reportKasMasuk', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportKasMasuk',
    id: 'reportKasMasuk',
    title: 'Laporan Kas Masuk',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
            '->',
            {
                xtype: 'button',
                text: 'Email',
                iconCls: 'email-icon',
                hidden: true,
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
                            Ext.getCmp('reportKasMasuk').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportKasMasuk' src='" + SITE_URL + "laporan/kasmasuk/" + unitReportKasMasuk + "/" + report1 + "/" + report2 + "/print'>");
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
                iconCls: 'page_excel',
                listeners: {
                    click: function (component) {
                        var report1 = Ext.getCmp('tanggalReportKasMasuk1').getSubmitValue();
                        var report2 = Ext.getCmp('tanggalReportKasMasuk2').getSubmitValue();
                        var unitReportKasMasuk = Ext.getCmp('unitReportKasMasuk').getValue();
                        Ext.getCmp('reportKasMasuk').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportKasMasuk' src='" + SITE_URL + "laporan/kasmasuk/" + unitReportKasMasuk + "/" + report1 + "/" + report2 + "/excel'>");
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
                valueField: 'idunit',
                multiSelect: true,
                id: 'unitReportKasMasuk'
            }, {
                xtype: 'datefield',
                id: 'tanggalReportKasMasuk1',
                format: 'Y-m-d',
                labelWidth: 90,
                fieldLabel: 'Bulan'
            }, {
                xtype: 'datefield',
                id: 'tanggalReportKasMasuk2',
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
                        var report1 = Ext.getCmp('tanggalReportKasMasuk1').getSubmitValue();
                        var report2 = Ext.getCmp('tanggalReportKasMasuk2').getSubmitValue();
                        var unitReportKasMasuk = Ext.getCmp('unitReportKasMasuk').getValue();

                        if (report1 == '') {
                            Ext.Msg.alert("Info", 'Tanggal awal belum ditentukan');
                        } else if (report2 == '') {
                            Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                        } else {
                            Ext.getCmp('reportKasMasuk').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportKasMasuk' src='" + SITE_URL + "laporan/kasmasuk/" + unitReportKasMasuk + "/" + report1 + "/" + report2 + "'>");
                        }

                    }
                }
            }
        ]
    }],
    //    html: "<iframe id='iframeReportKasMasuk' src='"+SITE_URL+"aktiva'/>"
});