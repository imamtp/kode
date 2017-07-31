Ext.define('reportAROther', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportAROther',
    id: 'reportAROther',
    title: 'Laporan Piutang Lainnya',
    listeners: {
        'selectCustomer': function(data) {
            Ext.getCmp('namecustomerReportAROther').setValue(data.namecustomer);
            Ext.getCmp('customerReportAROther').setValue(data.idcustomer);
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
                        var report1 = Ext.getCmp('tanggalReportAROther1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAROther2').getSubmitValue();
                        var unitReportAROther = Ext.getCmp('unitReportAROther').getValue();
                        Ext.getCmp('reportAROther').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAROther' src='" + SITE_URL + "laporan/AROther/" + unitReportAROther + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportAROther1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAROther2').getSubmitValue();
                        var unitReportAROther = Ext.getCmp('unitReportAROther').getValue();
                        Ext.getCmp('reportAROther').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAROther' src='" + SITE_URL + "laporan/AROther/" + unitReportAROther + "/" + report1 + "/excel'>");
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
            id: 'unitReportAROther'
        }, {
            xtype: 'datefield',
            id: 'startdateReportAROther',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportAROther',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'button',
            text: 'Tampilkan Laporan',
            iconCls: 'report_key',
            listeners: {
                click: function(component) {
                    var unit = Ext.getCmp('unitReportAROther').getValue();
                    var sd = Ext.getCmp('startdateReportAROther').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportAROther').getSubmitValue();
                    var idcust = Ext.getCmp('customerReportAROther').getValue();
                    Ext.getCmp('reportAROther').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAROther' src='" + SITE_URL + "laporan/AROther?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idcustomer=" + idcust + "'>");
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'hiddenfield',
            id: 'customerReportAROther',
        }, {
            xtype: 'textfield',
            id: 'namecustomerReportAROther',
            labelWidth: 100,
            fieldLabel: 'Customer',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListCustomer.target = Ext.getCmp('reportAROther');
                        ChooserListCustomer.show();
                    });
                }
            }
        }]
    }],
    //    html: "<iframe id='iframeReportAROther' src='"+SITE_URL+"aktiva'/>"
});