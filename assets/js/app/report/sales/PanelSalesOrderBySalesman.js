Ext.define('reportSalesOrderBySalesman', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportSalesOrderBySalesman',
    id: 'reportSalesOrderBySalesman',
    title: 'Laporan Sales By Salesman',
    listeners: {
        // 'selectCustomer': function(data) {
        //     Ext.getCmp('namecustomerReportSalesOrderBySalesman').setValue(data.namecustomer);
        //     Ext.getCmp('customerReportSalesOrderBySalesman').setValue(data.idcustomer);
        // },
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
                            var report1 = Ext.getCmp('tanggalReportSalesOrderBySalesman1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportSalesOrderBySalesman2').getSubmitValue();
                            var unitReportSalesOrderBySalesman = Ext.getCmp('unitReportSalesOrderBySalesman').getValue();
                            Ext.getCmp('reportSalesOrderBySalesman').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderBySalesman' src='" + SITE_URL + "laporan/SalesOrderBySalesman/" + unitReportSalesOrderBySalesman + "/" + report1 + "/print'>");
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
                            var report1 = Ext.getCmp('tanggalReportSalesOrderBySalesman1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportSalesOrderBySalesman2').getSubmitValue();
                            var unitReportSalesOrderBySalesman = Ext.getCmp('unitReportSalesOrderBySalesman').getValue();
                            Ext.getCmp('reportSalesOrderBySalesman').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderBySalesman' src='" + SITE_URL + "laporan/SalesOrderBySalesman/" + unitReportSalesOrderBySalesman + "/" + report1 + "/excel'>");
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
                id: 'unitReportSalesOrderBySalesman'
            }, {
                xtype: 'datefield',
                id: 'startdateReportSalesOrderBySalesman',
                format: 'Y-m-d',
                labelWidth: 40,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportSalesOrderBySalesman',
                format: 'Y-m-d',
                labelWidth: 40,
                fieldLabel: 's/d'
            }, {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportSalesOrderBySalesman').getValue();
                        var sd = Ext.getCmp('startdateReportSalesOrderBySalesman').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportSalesOrderBySalesman').getSubmitValue();
                        Ext.getCmp('reportSalesOrderBySalesman').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesBySalesman' src='" + SITE_URL + "laporan/SalesBySalesman?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "'>");
                    }
                }
            }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            hidden: true,
            items: [{
                xtype: 'hiddenfield',
                id: 'customerReportSalesOrderBySalesman',
            }, {
                xtype: 'textfield',
                id: 'namecustomerReportSalesOrderBySalesman',
                labelWidth: 100,
                fieldLabel: 'Customer',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            ChooserListCustomer.target = Ext.getCmp('reportSalesOrderBySalesman');
                            ChooserListCustomer.show();
                        });
                    }
                }
            }, {
                xtype: 'hiddenfield',
                id: 'skunoReportSalesOrderBySalesman',
            }, {
                xtype: 'textfield',
                id: 'nameinventoryReportSalesOrderBySalesman',
                labelWidth: 40,
                fieldLabel: 'Item',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            ChooserListInventory.target = Ext.getCmp('reportSalesOrderBySalesman');
                            ChooserListInventory.show();
                        });
                    }
                }
            }]
        }
    ],
    //    html: "<iframe id='iframeReportSalesOrderBySalesman' src='"+SITE_URL+"aktiva'/>"
});