var SalesInvoicePaidGrid = Ext.create(dir_sys + 'sales.SalesInvoicePaidGrid');
var SalesInvoiceUnpaidGrid = Ext.create(dir_sys + 'sales.SalesInvoiceUnpaidGrid');
var SalesInvoiceOverdueGrid = Ext.create(dir_sys + 'sales.SalesInvoiceOverdueGrid');
var SalesInvoiceCanceledGrid = Ext.create(dir_sys + 'sales.SalesInvoiceCanceledGrid');

Ext.define(dir_sys + 'sales.TabSalesInvoice', {
    extend: 'Ext.tab.Panel',
    id: 'TabSalesInvoice',
    alias: 'widget.TabSalesInvoice',
    activeTab: 0,
    // autoWidth: true,
    // autoHeight:true,
    autoScroll: true,
    plain: true,
    defaults: {
        autoScroll: true
    },
    // requires: [
    //     dir_sys + 'sales.SalesInvoicePaidGrid',
    //     dir_sys + 'sales.SalesInvoiceUnpaidGrid',
    //     dir_sys + 'sales.SalesInvoiceOverdueGrid'
    // ],
    items: [{
            xtype: 'SalesInvoiceUnpaidGrid'
        },
        {
            xtype: 'SalesInvoicePaidGrid'
        },
        {
            xtype: 'SalesInvoiceOverdueGrid'
        },
        {
            xtype:'SalesInvoiceCanceledGrid'
        }
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                setHeaderInvoice();
            }
        }
    }
});

Ext.define(dir_sys + 'sales.TabSalesInvoicePanel', {
    // extend: 'Ext.panel.Panel',
    alias: 'widget.TabSalesInvoicePanel',
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    // width: 660,
    anchor: '100%',
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 5px;' }
    },
    defaults: {
        xtype: 'panel',
        width: (panelW - 235) / 3,
        height: 80,
        bodyPadding: 1
    },

    initComponent: function() {
            this.items = [
                // {
                //     xtype: 'textfield',
                //     width:(panelW-235),
                //     height: 20,
                //     colspan: 3
                //     // inputWidth: 300 // resize the input width
                // },
                {
                    title: '<center>Total Unpaid</center>',
                    id: 'sumSalesInvUnpaid',
                    border: true,
                    // html: '<center><h2><span style=color:#FF6D00>100.000</span></h2>'
                },
                {
                    title: '<center>Total Paid</center>',
                    border: true,
                    id: 'sumSalesInvPaid',
                    // html: '<center><h2><span style=color:#64DD17>200.000</span></h2>'
                },
                {
                    title: '<center>Overdue Payment</center>',
                    border: true,
                    id: 'sumSalesInvDue',
                    // html: '<center><h2><span style=color:#d50000>300.000</span></h2>'
                },
                {
                    // title: 'Collapsed Panel',
                    // collapsed: true,
                    // collapsible: true,
                    width: panelW - 215,
                    height: panelH - 110,
                    // html: 'dasdas',
                    xtype: 'TabSalesInvoice',
                    colspan: 3
                }
            ];

            this.callParent();
        }
        // dockedItems: [
        //     {
        //         xtype:'toolbar',
        //         dock:'top',
        //         items:[
        //             {
        //                 xtype: 'button',
        //                 text: 'Total Paid',
        //             }
        //         ]
        //     }
        // ]
});