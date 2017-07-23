Ext.define('reportAROutstanding', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportAROutstanding',
    id: 'reportAROutstanding',
    title: 'Laporan AR Outstanding',
    listeners: {
        'selectCustomer': function(data) {
            Ext.getCmp('namecustomerReportAROutstanding').setValue(data.namecustomer);
            Ext.getCmp('customerReportAROutstanding').setValue(data.idcustomer);
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
                        var report1 = Ext.getCmp('tanggalReportAROutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAROutstanding2').getSubmitValue();
                        var unitReportAROutstanding = Ext.getCmp('unitReportAROutstanding').getValue();
                        Ext.getCmp('reportAROutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAROutstanding' src='" + SITE_URL + "laporan/AROutstanding/" + unitReportAROutstanding + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportAROutstanding1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportAROutstanding2').getSubmitValue();
                        var unitReportAROutstanding = Ext.getCmp('unitReportAROutstanding').getValue();
                        Ext.getCmp('reportAROutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAROutstanding' src='" + SITE_URL + "laporan/AROutstanding/" + unitReportAROutstanding + "/" + report1 + "/excel'>");
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
            id: 'unitReportAROutstanding'
        }, {
            xtype: 'datefield',
            id: 'startdateReportAROutstanding',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportAROutstanding',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'button',
            text: 'Tampilkan Laporan',
            iconCls: 'report_key',
            listeners: {
                click: function(component) {
                    var unit = Ext.getCmp('unitReportAROutstanding').getValue();
                    var sd = Ext.getCmp('startdateReportAROutstanding').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportAROutstanding').getSubmitValue();
                    var idcust = Ext.getCmp('customerReportAROutstanding').getValue();
                    Ext.getCmp('reportAROutstanding').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportAROutstanding' src='" + SITE_URL + "laporan/AROutstanding?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idcustomer=" + idcust + "'>");
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'hiddenfield',
            id: 'customerReportAROutstanding',
        }, {
            xtype: 'textfield',
            id: 'namecustomerReportAROutstanding',
            labelWidth: 100,
            fieldLabel: 'Customer',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListCustomer.target = Ext.getCmp('reportAROutstanding');
                        ChooserListCustomer.show();
                    });
                }
            }
        }]
    }],
    //    html: "<iframe id='iframeReportAROutstanding' src='"+SITE_URL+"aktiva'/>"
});