Ext.define('reportARSales', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportARSales',
    id: 'reportARSales',
    title: 'Laporan Piutang Penjualan',
    listeners: {
        'selectCustomer': function(data) {
            Ext.getCmp('namecustomerReportARSales').setValue(data.namecustomer);
            Ext.getCmp('customerReportARSales').setValue(data.idcustomer);
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
                        var report1 = Ext.getCmp('tanggalReportARSales1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportARSales2').getSubmitValue();
                        var unitReportARSales = Ext.getCmp('unitReportARSales').getValue();
                        Ext.getCmp('reportARSales').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportARSales' src='" + SITE_URL + "laporan/ARSales/" + unitReportARSales + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportARSales1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportARSales2').getSubmitValue();
                        var unitReportARSales = Ext.getCmp('unitReportARSales').getValue();
                        Ext.getCmp('reportARSales').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportARSales' src='" + SITE_URL + "laporan/ARSales/" + unitReportARSales + "/" + report1 + "/excel'>");
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
            id: 'unitReportARSales'
        }, {
            xtype: 'datefield',
            id: 'startdateReportARSales',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportARSales',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'button',
            text: 'Tampilkan Laporan',
            iconCls: 'report_key',
            listeners: {
                click: function(component) {
                    var unit = Ext.getCmp('unitReportARSales').getValue();
                    var sd = Ext.getCmp('startdateReportARSales').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportARSales').getSubmitValue();
                    var idcust = Ext.getCmp('customerReportARSales').getValue();
                    Ext.getCmp('reportARSales').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportARSales' src='" + SITE_URL + "laporan/ARSales?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idcustomer=" + idcust + "'>");
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'hiddenfield',
            id: 'customerReportARSales',
        }, {
            xtype: 'textfield',
            id: 'namecustomerReportARSales',
            labelWidth: 100,
            fieldLabel: 'Customer',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListCustomer.target = Ext.getCmp('reportARSales');
                        ChooserListCustomer.show();
                    });
                }
            }
        }]
    }],
    //    html: "<iframe id='iframeReportARSales' src='"+SITE_URL+"aktiva'/>"
});