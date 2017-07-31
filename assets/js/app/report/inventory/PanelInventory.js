Ext.define('reportInventory', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportInventory',
    id: 'reportInventory',
    title: 'Laporan Inventory',
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
                            var report1 = Ext.getCmp('tanggalReportInventory1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportInventory2').getSubmitValue();
                            var unitReportInventory = Ext.getCmp('unitReportInventory').getValue();
                            Ext.getCmp('reportInventory').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventory' src='" + SITE_URL + "laporan/Inventory/" + unitReportInventory + "/" + report1 + "/print'>");
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
                            var report1 = Ext.getCmp('tanggalReportInventory1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportInventory2').getSubmitValue();
                            var unitReportInventory = Ext.getCmp('unitReportInventory').getValue();
                            Ext.getCmp('reportInventory').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventory' src='" + SITE_URL + "laporan/Inventory/" + unitReportInventory + "/" + report1 + "/excel'>");
                        }
                    }
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'comboxunit',
                labelWidth: 40,
                multiSelect: true,
                valueField: 'idunit',
                id: 'unitReportInventory'
            }, {
                xtype: 'datefield',
                id: 'startdateReportInventory',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportInventory',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 's/d'
            }, ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'comboxbrand',
                id: 'brandReportInventory',
                labelWidth: 40,
                fieldLabel: 'Brand'
            }, {
                xtype: 'comboxinventorycat',
                id: 'invcatReportInventory',
                valueField: 'idinventorycat',
                labelWidth: 100,
                fieldLabel: 'Category'
            }, {
                xtype: 'comboxInventoryType',
                id: 'invtypeReportInventory',
                labelWidth: 100,
                fieldLabel: 'Product Type'
            }, {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportInventory').getValue();
                        var sd = Ext.getCmp('startdateReportInventory').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportInventory').getSubmitValue();
                        var brand = Ext.getCmp('brandReportInventory').getValue();
                        var invcat = Ext.getCmp('invcatReportInventory').getValue();
                        var invtype = Ext.getCmp('invtypeReportInventory').getValue();

                        Ext.getCmp('reportInventory').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventory' src='" + SITE_URL + "laporan/Inventory?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&brand=" + brand + "&invcat=" + invcat + "&invtype=" + invtype + "'>");
                    }
                }
            }, {
                xtype: 'button',
                text: 'Clear Filter',
                listeners: {
                    click: function(component) {
                        Ext.getCmp('unitReportInventory').getValue(null);
                        Ext.getCmp('startdateReportInventory').getValue(null);
                        Ext.getCmp('enddateReportInventory').getValue(null);
                        Ext.getCmp('brandReportInventory').getValue(null);
                        Ext.getCmp('invcatReportInventory').getValue(null);
                        Ext.getCmp('invtypeReportInventory').getValue(null);
                    }
                }
            }]
        }
    ],
    //    html: "<iframe id='iframeReportInventory' src='"+SITE_URL+"aktiva'/>"
});