Ext.define(dir_sys + 'report.ReportInventoryStockCard', {
    // Ext.define('reportInventoryStockCard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ReportInventoryStockCard',
    id: 'ReportInventoryStockCard',
    title: 'Kartu Stok',
    listeners: {
        'selectInventory': function(data) {
            Ext.getCmp('nameinventoryReportInventoryStockCard').setValue(data.nameinventory);
            Ext.getCmp('idinventoryReportInventoryStockCard').setValue(data.idinventory);
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
                            Ext.getCmp('ReportInventoryStockCard').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventoryStockCard' src='" + SITE_URL + "laporan/InventoryStockCard/" + unitReportInventoryStockCard + "/" + report1 + "/print'>");
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
                            Ext.getCmp('ReportInventoryStockCard').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventoryStockCard' src='" + SITE_URL + "laporan/InventoryStockCard/" + unitReportInventoryStockCard + "/" + report1 + "/excel'>");
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
                    id: 'idinventoryReportInventoryStockCard',
                }, {
                    xtype: 'textfield',
                    id: 'nameinventoryReportInventoryStockCard',
                    labelWidth: 50,
                    fieldLabel: 'Barang',
                    listeners: {
                        render: function(component) {
                            component.getEl().on('click', function(event, el) {
                                ChooserListInventory.target = Ext.getCmp('ReportInventoryStockCard');
                                ChooserListInventory.show();
                            });
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Tampilkan Laporan',
                    iconCls: 'report_key',
                    listeners: {
                        click: function(component) {
                            var unit = Ext.getCmp('unitReportInventoryStockCard').getValue();
                            var sd = Ext.getCmp('startdateReportInventoryStockCard').getSubmitValue();
                            var nd = Ext.getCmp('enddateReportInventoryStockCard').getSubmitValue();
                            var idinventory = Ext.getCmp('idinventoryReportInventoryStockCard').getValue();

                            if(sd==''){
                                Ext.Msg.alert("Info", 'Tanggal mulai belum ditentukan');
                            } else if(nd==''){
                                Ext.Msg.alert("Info", 'Tanggal akhir belum ditentukan');
                            } else if(idinventory==''){
                                Ext.Msg.alert("Info", 'Barang belum ditentukan');
                            } else {
                                Ext.getCmp('ReportInventoryStockCard').body.update("<iframe style='border:0;' width='100%' height='100%' id='iframeReportInventoryStockCard' src='" + SITE_URL + "laporan/inventory_kartu_stok?idunit=" + unit + "&startdate=" + sd + "&enddate=" + nd + "&idinventory=" + idinventory + "'>");
                            }                            
                        }
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                // {
                //     xtype: 'comboxbrand',
                //     id: 'brandReportInventoryStockCard',
                //     labelWidth: 40,
                //     fieldLabel: 'Brand'
                // }, {
                //     xtype: 'comboxinventorycat',
                //     id: 'invcatReportInventoryStockCard',
                //     valueField: 'idinventorycat',
                //     labelWidth: 100,
                //     fieldLabel: 'Category'
                // }, {
                //     xtype: 'comboxInventoryType',
                //     id: 'invtypeReportInventoryStockCard',
                //     labelWidth: 100,
                //     fieldLabel: 'Product Type'
                // }, 

                // , {
                //     xtype: 'button',
                //     text: 'Clear Filter',
                //     listeners: {
                //         click: function(component) {
                //             Ext.getCmp('startdateReportInventoryStockCard').setValue(null);
                //             Ext.getCmp('enddateReportInventoryStockCard').setValue(null);
                //             // Ext.getCmp('brandReportInventoryStockCard').setValue(null);
                //             // Ext.getCmp('invcatReportInventoryStockCard').setValue(null);
                //             // Ext.getCmp('invtypeReportInventoryStockCard').setValue(null);
                //             Ext.getCmp('idinventoryReportInventoryStockCard').setValue(null);
                //             Ext.getCmp('nameinventoryReportInventoryStockCard').setValue(null);
                //         }
                //     }
                // }
            ]
        }
    ],
    //    html: "<iframe id='iframeReportInventoryStockCard' src='"+SITE_URL+"aktiva'/>"
});