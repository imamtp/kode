Ext.define('reportSalesOrderByItem', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportSalesOrderByItem',
    id: 'reportSalesOrderByItem',
    title: 'Laporan Sales By Item',
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
                labelWidth: 100,
                fieldLabel: 's/d'
            }, ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'comboxInventoryType',
                id: 'inventorytypeReportSalesOrderByItem',
                fieldLabel: 'Product Type',
                labelWidth: 100,
            }, {
                xtype: 'comboxbrand',
                id: 'brandReportSalesOrderByItem',
                fieldLabel: 'Brand',
                labelWidth: 40,
            }, {
                xtype: 'comboxWarehouse',
                id: 'warehouseReportSalesOrderByItem',
                fieldLabel: 'Warehouse',
                displayField: 'warehouse_code',
                valueField: 'warehouse_code',
                labelWidth: 100,
            }, {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportSalesOrderByItem').getValue();
                        var sd = Ext.getCmp('startdateReportSalesOrderByItem').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportSalesOrderByItem').getSubmitValue();
                        var invtype = Ext.getCmp('inventorytypeReportSalesOrderByItem').getValue();
                        var brand = Ext.getCmp('brandReportSalesOrderByItem').getValue();
                        var whcode = Ext.getCmp('warehouseReportSalesOrderByItem').getValue();
                        Ext.getCmp('reportSalesOrderByItem').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportSalesByItem' src='" + SITE_URL + "laporan/SalesByItem?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&invtype=" + invtype + "&brand=" + brand + "&whcode=" + whcode + "'>");
                    }
                }
            }, {
                xtype: 'button',
                text: 'Clear Filter',
                listeners: {
                    click: function(component) {
                        Ext.getCmp('startdateReportSalesOrderByItem').setValue(null);
                        Ext.getCmp('enddateReportSalesOrderByItem').setValue(null);
                        Ext.getCmp('inventorytypeReportSalesOrderByItem').setValue(null);
                        Ext.getCmp('brandReportSalesOrderByItem').setValue(null);
                        Ext.getCmp('warehouseReportSalesOrderByItem').setValue(null);
                    }
                }
            }]
        }
    ],
    //    html: "<iframe id='iframeReportSalesOrderByItem' src='"+SITE_URL+"aktiva'/>"
});