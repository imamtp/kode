Ext.define('reportSalesOrderByCustomer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportSalesOrderByCustomer',
    id: 'reportSalesOrderByCustomer',
    title: 'Laporan Sales By Customer',
    listeners: {
        // 'selectCustomer': function(data) {
        //     Ext.getCmp('namecustomerReportSalesOrderByCustomer').setValue(data.namecustomer);
        //     Ext.getCmp('customerReportSalesOrderByCustomer').setValue(data.idcustomer);
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
                            var report1 = Ext.getCmp('tanggalReportSalesOrderByCustomer1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportSalesOrderByCustomer2').getSubmitValue();
                            var unitReportSalesOrderByCustomer = Ext.getCmp('unitReportSalesOrderByCustomer').getValue();
                            Ext.getCmp('reportSalesOrderByCustomer').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderByCustomer' src='" + SITE_URL + "laporan/SalesOrderByCustomer/" + unitReportSalesOrderByCustomer + "/" + report1 + "/print'>");
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
                            var report1 = Ext.getCmp('tanggalReportSalesOrderByCustomer1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportSalesOrderByCustomer2').getSubmitValue();
                            var unitReportSalesOrderByCustomer = Ext.getCmp('unitReportSalesOrderByCustomer').getValue();
                            Ext.getCmp('reportSalesOrderByCustomer').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderByCustomer' src='" + SITE_URL + "laporan/SalesOrderByCustomer/" + unitReportSalesOrderByCustomer + "/" + report1 + "/excel'>");
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
                id: 'unitReportSalesOrderByCustomer'
            }, {
                xtype: 'datefield',
                id: 'startdateReportSalesOrderByCustomer',
                format: 'Y-m-d',
                labelWidth: 40,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportSalesOrderByCustomer',
                format: 'Y-m-d',
                labelWidth: 40,
                fieldLabel: 's/d'
            }, {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportSalesOrderByCustomer').getValue();
                        var sd = Ext.getCmp('startdateReportSalesOrderByCustomer').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportSalesOrderByCustomer').getSubmitValue();
                        Ext.getCmp('reportSalesOrderByCustomer').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesByItem' src='" + SITE_URL + "laporan/SalesByCustomer?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "'>");
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
                id: 'customerReportSalesOrderByCustomer',
            }, {
                xtype: 'textfield',
                id: 'namecustomerReportSalesOrderByCustomer',
                labelWidth: 100,
                fieldLabel: 'Customer',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            ChooserListCustomer.target = Ext.getCmp('reportSalesOrderByCustomer');
                            ChooserListCustomer.show();
                        });
                    }
                }
            }, {
                xtype: 'hiddenfield',
                id: 'skunoReportSalesOrderByCustomer',
            }, {
                xtype: 'textfield',
                id: 'nameinventoryReportSalesOrderByCustomer',
                labelWidth: 40,
                fieldLabel: 'Item',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            ChooserListInventory.target = Ext.getCmp('reportSalesOrderByCustomer');
                            ChooserListInventory.show();
                        });
                    }
                }
            }]
        }
    ],
    //    html: "<iframe id='iframeReportSalesOrderByCustomer' src='"+SITE_URL+"aktiva'/>"
});