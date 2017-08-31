Ext.define(dir_sys + 'report.reportAPOtherOutstanding', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportAPOtherOutstanding',
    id: 'reportAPOtherOutstanding',
    title: 'Laporan Hutang Lainnya Jatuh Tempo',
    listeners: {
        'selectSupplier': function(data) {
            Ext.getCmp('namesupplierReportAPOtherOutstanding').setValue(data.namesupplier);
            Ext.getCmp('supplierReportAPOtherOutstanding').setValue(data.idsupplier);
        }
    },
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
                    click: function(component) {

                    }
                }
            }, {
                xtype: 'button',
                text: 'Print',
                iconCls: 'print-icon',
                listeners: {
                    click: function(component) {
                        var report1 = Ext.getCmp('tanggalReportAPOtherOutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAPOtherOutstanding2').getSubmitValue();
                        var unitReportAPOtherOutstanding = Ext.getCmp('unitReportAPOtherOutstanding').getValue();
                        Ext.getCmp('reportAPOtherOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPOtherOutstanding' src='" + SITE_URL + "laporan/APOtherOutstanding/" + unitReportAPOtherOutstanding + "/" + report1 + "/print'>");
                    }
                }
            },
            {
                xtype: 'button',
                hidden: true,
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
                hidden: true,
                iconCls: 'page_excel',
                listeners: {
                    click: function(component) {
                        var report1 = Ext.getCmp('tanggalReportAPOtherOutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAPOtherOutstanding2').getSubmitValue();
                        var unitReportAPOtherOutstanding = Ext.getCmp('unitReportAPOtherOutstanding').getValue();
                        Ext.getCmp('reportAPOtherOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPOther' src='" + SITE_URL + "laporan/APOther/" + unitReportAPOtherOutstanding + "/" + report1 + "/excel'>");
                    }
                }
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'comboxunit',
            labelWidth: 100,
            multiSelect: true,
            valueField: 'idunit',
            id: 'unitReportAPOtherOutstanding'
        }, {
            xtype: 'datefield',
            id: 'startdateReportAPOtherOutstanding',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportAPOtherOutstanding',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'hiddenfield',
            id: 'supplierReportAPOtherOutstanding',
        }, {
            xtype: 'textfield',
            id: 'namesupplierReportAPOtherOutstanding',
            labelWidth: 100,
            fieldLabel: 'Supplier',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListSupplier.target = Ext.getCmp('reportAPOtherOutstanding');
                        ChooserListSupplier.show();
                    });
                }
            }
        }, ]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'button',
            text: 'Tampilkan Laporan',
            iconCls: 'report_key',
            listeners: {
                click: function(component) {
                    var unit = Ext.getCmp('unitReportAPOtherOutstanding').getValue();
                    var sd = Ext.getCmp('startdateReportAPOtherOutstanding').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportAPOtherOutstanding').getSubmitValue();
                    var idsupp = Ext.getCmp('supplierReportAPOtherOutstanding').getValue();
                    Ext.getCmp('reportAPOtherOutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPOtherOutstanding' src='" + SITE_URL + "laporan/APOther?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idsupplier=" + idsupp + "&jatuh_tempo=ya'>");
                }
            }
        }, {
            xtype: 'button',
            text: 'Clear Filter',
            listeners: {
                click: function(component) {
                    Ext.getCmp('startdateReportAPOtherOutstanding').setValue(null);
                    Ext.getCmp('enddateReportAPOtherOutstanding').setValue(null);
                    Ext.getCmp('supplierReportAPOtherOutstanding').setValue(null);
                    Ext.getCmp('namesupplierReportAPOtherOutstanding').setValue(null);
                }
            }
        }]
    }],
    //    html: "<iframe id='iframeReportAPOtherOutstanding' src='"+SITE_URL+"aktiva'/>"
});