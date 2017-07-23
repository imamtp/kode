Ext.define('reportSalesOrderByItem', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportSalesOrderByItem',
    id: 'reportSalesOrderByItem',
    title: 'Laporan Sales By Item',
    listeners: {
        'selectCustomer': function(data) {
            Ext.getCmp('namecustomerReportSalesOrderByItem').setValue(data.namecustomer);
            Ext.getCmp('customerReportSalesOrderByItem').setValue(data.idcustomer);
        },
        'selectInventory': function(data) {
            Ext.getCmp('nameinventoryReportSalesOrderByItem').setValue(data.nameinventory);
            Ext.getCmp('skunoReportSalesOrderByItem').setValue(data.sku_no);
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
                            var report1 = Ext.getCmp('tanggalReportSalesOrderByItem1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportSalesOrderByItem2').getSubmitValue();
                            var unitReportSalesOrderByItem = Ext.getCmp('unitReportSalesOrderByItem').getValue();
                            Ext.getCmp('reportSalesOrderByItem').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderByItem' src='" + SITE_URL + "laporan/SalesOrderByItem/" + unitReportSalesOrderByItem + "/" + report1 + "/print'>");
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
                            var report1 = Ext.getCmp('tanggalReportSalesOrderByItem1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportSalesOrderByItem2').getSubmitValue();
                            var unitReportSalesOrderByItem = Ext.getCmp('unitReportSalesOrderByItem').getValue();
                            Ext.getCmp('reportSalesOrderByItem').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesOrderByItem' src='" + SITE_URL + "laporan/SalesOrderByItem/" + unitReportSalesOrderByItem + "/" + report1 + "/excel'>");
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
                id: 'unitReportSalesOrderByItem'
            }, {
                xtype: 'datefield',
                id: 'startdateReportSalesOrderByItem',
                format: 'Y-m-d',
                labelWidth: 40,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportSalesOrderByItem',
                format: 'Y-m-d',
                labelWidth: 40,
                fieldLabel: 's/d'
            }, {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportSalesOrderByItem').getValue();
                        var sd = Ext.getCmp('startdateReportSalesOrderByItem').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportSalesOrderByItem').getSubmitValue();
                        var idcust = Ext.getCmp('customerReportSalesOrderByItem').getValue();
                        var sku_no = Ext.getCmp('skunoReportSalesOrderByItem').getValue();
                        Ext.getCmp('reportSalesOrderByItem').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesByItem' src='" + SITE_URL + "laporan/SalesByItem?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idcustomer=" + idcust + "&skuno=" + sku_no + "'>");
                    }
                }
            }]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'hiddenfield',
                id: 'customerReportSalesOrderByItem',
            }, {
                xtype: 'textfield',
                id: 'namecustomerReportSalesOrderByItem',
                labelWidth: 100,
                fieldLabel: 'Customer',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            ChooserListCustomer.target = Ext.getCmp('reportSalesOrderByItem');
                            ChooserListCustomer.show();
                        });
                    }
                }
            }, {
                xtype: 'hiddenfield',
                id: 'skunoReportSalesOrderByItem',
            }, {
                xtype: 'textfield',
                id: 'nameinventoryReportSalesOrderByItem',
                labelWidth: 40,
                fieldLabel: 'Item',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            ChooserListInventory.target = Ext.getCmp('reportSalesOrderByItem');
                            ChooserListInventory.show();
                        });
                    }
                }
            }]
        }
    ],
    //    html: "<iframe id='iframeReportSalesOrderByItem' src='"+SITE_URL+"aktiva'/>"
});