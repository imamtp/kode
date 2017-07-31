Ext.define('reportAPOther', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportAPOther',
    id: 'reportAPOther',
    title: 'Laporan Hutang Lainnya',
    listeners: {
        'selectSupplier': function(data) {
            Ext.getCmp('namesupplierReportAPOther').setValue(data.namesupplier);
            Ext.getCmp('supplierReportAPOther').setValue(data.idsupplier);
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
                        var report1 = Ext.getCmp('tanggalReportAPOther1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAPOther2').getSubmitValue();
                        var unitReportAPOther = Ext.getCmp('unitReportAPOther').getValue();
                        Ext.getCmp('reportAPOther').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPOther' src='" + SITE_URL + "laporan/APOther/" + unitReportAPOther + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportAPOther1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAPOther2').getSubmitValue();
                        var unitReportAPOther = Ext.getCmp('unitReportAPOther').getValue();
                        Ext.getCmp('reportAPOther').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPOther' src='" + SITE_URL + "laporan/APOther/" + unitReportAPOther + "/" + report1 + "/excel'>");
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
            id: 'unitReportAPOther'
        }, {
            xtype: 'datefield',
            id: 'startdateReportAPOther',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportAPOther',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'hiddenfield',
            id: 'supplierReportAPOther',
        }, {
            xtype: 'textfield',
            id: 'namesupplierReportAPOther',
            labelWidth: 100,
            fieldLabel: 'Supplier',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListSupplier.target = Ext.getCmp('reportAPOther');
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
                    var unit = Ext.getCmp('unitReportAPOther').getValue();
                    var sd = Ext.getCmp('startdateReportAPOther').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportAPOther').getSubmitValue();
                    var idsupp = Ext.getCmp('supplierReportAPOther').getValue();
                    Ext.getCmp('reportAPOther').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAPOther' src='" + SITE_URL + "laporan/APOther?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idsupplier=" + idsupp + "'>");
                }
            }
        }, {
            xtype: 'button',
            text: 'Clear Filter',
            listeners: {
                click: function(component) {
                    Ext.getCmp('startdateReportAPOther').setValue(null);
                    Ext.getCmp('enddateReportAPOther').setValue(null);
                    Ext.getCmp('supplierReportAPOther').setValue(null);
                    Ext.getCmp('namesupplierReportAPOther').setValue(null);
                }
            }
        }]
    }],
    //    html: "<iframe id='iframeReportAPOther' src='"+SITE_URL+"aktiva'/>"
});