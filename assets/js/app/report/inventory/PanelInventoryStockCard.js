Ext.define('reportInventoryStockCard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportInventoryStockCard',
    id: 'reportInventoryStockCard',
    title: 'Laporan InventoryStockCard',
    listeners: {
        'selectInventory': function(data) {
            Ext.getCmp('nameinventoryReportInventoryStockCard').setValue(data.nameinventory);
            Ext.getCmp('skunoReportInventoryStockCard').setValue(data.sku_no);
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
                            var report1 = Ext.getCmp('tanggalReportInventoryStockCard1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportInventoryStockCard2').getSubmitValue();
                            var unitReportInventoryStockCard = Ext.getCmp('unitReportInventoryStockCard').getValue();
                            Ext.getCmp('reportInventoryStockCard').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventoryStockCard' src='" + SITE_URL + "laporan/InventoryStockCard/" + unitReportInventoryStockCard + "/" + report1 + "/print'>");
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
                            var report1 = Ext.getCmp('tanggalReportInventoryStockCard1').getSubmitValue();
                            //                            var report2 = Ext.getCmp('tanggalReportInventoryStockCard2').getSubmitValue();
                            var unitReportInventoryStockCard = Ext.getCmp('unitReportInventoryStockCard').getValue();
                            Ext.getCmp('reportInventoryStockCard').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventoryStockCard' src='" + SITE_URL + "laporan/InventoryStockCard/" + unitReportInventoryStockCard + "/" + report1 + "/excel'>");
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
                id: 'unitReportInventoryStockCard'
            }, {
                xtype: 'datefield',
                id: 'startdateReportInventoryStockCard',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 'Dari'
            }, {
                xtype: 'datefield',
                id: 'enddateReportInventoryStockCard',
                format: 'Y-m-d',
                labelWidth: 100,
                fieldLabel: 's/d'
            }, {
                xtype: 'hiddenfield',
                id: 'skunoReportInventoryStockCard',
            }, {
                xtype: 'textfield',
                id: 'nameinventoryReportInventoryStockCard',
                labelWidth: 40,
                fieldLabel: 'Item',
                listeners: {
                    render: function(component) {
                        component.getEl().on('click', function(event, el) {
                            ChooserListInventory.target = Ext.getCmp('reportInventoryStockCard');
                            ChooserListInventory.show();
                        });
                    }
                }
            }, ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'comboxbrand',
                id: 'brandReportInventoryStockCard',
                labelWidth: 40,
                fieldLabel: 'Brand'
            }, {
                xtype: 'comboxinventorycat',
                id: 'invcatReportInventoryStockCard',
                valueField: 'idinventorycat',
                labelWidth: 100,
                fieldLabel: 'Category'
            }, {
                xtype: 'comboxInventoryType',
                id: 'invtypeReportInventoryStockCard',
                labelWidth: 100,
                fieldLabel: 'Product Type'
            }, {
                xtype: 'button',
                text: 'Tampilkan Laporan',
                iconCls: 'report_key',
                listeners: {
                    click: function(component) {
                        var unit = Ext.getCmp('unitReportInventoryStockCard').getValue();
                        var sd = Ext.getCmp('startdateReportInventoryStockCard').getSubmitValue();
                        var nd = Ext.getCmp('enddateReportInventoryStockCard').getSubmitValue();
                        var brand = Ext.getCmp('brandReportInventoryStockCard').getValue();
                        var invcat = Ext.getCmp('invcatReportInventoryStockCard').getValue();
                        var invtype = Ext.getCmp('invtypeReportInventoryStockCard').getValue();
                        var skuno = Ext.getCmp('skunoReportInventoryStockCard').getValue();
                        Ext.getCmp('reportInventoryStockCard').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventoryStockCard' src='" + SITE_URL + "laporan/InventoryStockCard?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&brand=" + brand + "&invcat=" + invcat + "&invtype=" + invtype + "&skuno=" + skuno + "'>");
                    }
                }
            }, {
                xtype: 'button',
                text: 'Clear Filter',
                listeners: {
                    click: function(component) {
                        Ext.getCmp('startdateReportInventoryStockCard').setValue(null);
                        Ext.getCmp('enddateReportInventoryStockCard').setValue(null);
                        Ext.getCmp('brandReportInventoryStockCard').setValue(null);
                        Ext.getCmp('invcatReportInventoryStockCard').setValue(null);
                        Ext.getCmp('invtypeReportInventoryStockCard').setValue(null);
                        Ext.getCmp('skunoReportInventoryStockCard').setValue(null);
                        Ext.getCmp('nameinventoryReportInventoryStockCard').setValue(null);
                    }
                }
            }]
        }
    ],
    //    html: "<iframe id='iframeReportInventoryStockCard' src='"+SITE_URL+"aktiva'/>"
});