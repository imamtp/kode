Ext.define('reportSalesOrderDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportSalesOrderDetail',
    id: 'reportSalesOrderDetail',
    title: 'Laporan Sales Order Detail',
    listeners: {
        'selectCustomer': function(data) {
            Ext.getCmp('namecustomerReportSalesOrderDetail').setValue(data.namecustomer);
            Ext.getCmp('customerReportSalesOrderDetail').setValue(data.idcustomer);
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
                        var report1 = Ext.getCmp('tanggalReportSalesOrderDetail1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportSalesOrderDetail2').getSubmitValue();
                        var unitReportSalesOrderDetail = Ext.getCmp('unitReportSalesOrderDetail').getValue();
                        Ext.getCmp('reportSalesOrderDetail').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderDetail' src='" + SITE_URL + "laporan/SalesOrderDetail/" + unitReportSalesOrderDetail + "/" + report1 + "/print'>");
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
                        var report1 = Ext.getCmp('tanggalReportSalesOrderDetail1').getSubmitValue();
                        //                            var report2 = Ext.getCmp('tanggalReportSalesOrderDetail2').getSubmitValue();
                        var unitReportSalesOrderDetail = Ext.getCmp('unitReportSalesOrderDetail').getValue();
                        Ext.getCmp('reportSalesOrderDetail').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderDetail' src='" + SITE_URL + "laporan/SalesOrderDetail/" + unitReportSalesOrderDetail + "/" + report1 + "/excel'>");
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
            id: 'unitReportSalesOrderDetail'
        }, {
            xtype: 'datefield',
            id: 'startdateReportSalesOrderDetail',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 'Dari'
        }, {
            xtype: 'datefield',
            id: 'enddateReportSalesOrderDetail',
            format: 'Y-m-d',
            labelWidth: 40,
            fieldLabel: 's/d'
        }, {
            xtype: 'button',
            text: 'Tampilkan Laporan',
            iconCls: 'report_key',
            listeners: {
                click: function(component) {
                    var unit = Ext.getCmp('unitReportSalesOrderDetail').getValue();
                    var sd = Ext.getCmp('startdateReportSalesOrderDetail').getSubmitValue();
                    var nd = Ext.getCmp('enddateReportSalesOrderDetail').getSubmitValue();
                    var idcust = Ext.getCmp('customerReportSalesOrderDetail').getValue();
                    Ext.getCmp('reportSalesOrderDetail').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderDetail' src='" + SITE_URL + "laporan/SalesOrderDetail?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idcustomer=" + idcust + "'>");
                }
            }
        }]
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'hiddenfield',
            id: 'customerReportSalesOrderDetail',
        }, {
            xtype: 'textfield',
            id: 'namecustomerReportSalesOrderDetail',
            labelWidth: 100,
            fieldLabel: 'Customer',
            listeners: {
                render: function(component) {
                    component.getEl().on('click', function(event, el) {
                        ChooserListCustomer.target = Ext.getCmp('reportSalesOrderDetail');
                        ChooserListCustomer.show();
                    });
                }
            }
        }]
    }],
    //    html: "<iframe id='iframeReportSalesOrderDetail' src='"+SITE_URL+"aktiva'/>"
});