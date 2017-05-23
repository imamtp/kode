

Ext.define(dir_sys+'purchase2.TabPurchaseInvoice', {
    extend: 'Ext.tab.Panel',
    id: 'TabPurchaseInvoice',
    alias: 'widget.TabPurchaseInvoice',
    activeTab: 0,
    // autoWidth: true,
    // autoHeight:true,
    autoScroll: true,
    plain:true,
    defaults: {
        autoScroll: true
    },
    requires: [
       dir_sys+'purchase2.PurchaseInvoicePaidGrid',
       dir_sys+'purchase2.PurchaseInvoiceUnpaidGrid',
       dir_sys+'purchase2.PurchaseInvoiceOverdueGrid'       
    ],
    items: [
        {
            xtype: 'PurchaseInvoiceUnpaidGrid'
        },
        {
            xtype: 'PurchaseInvoicePaidGrid'
        },
        {
            xtype: 'PurchaseInvoiceOverdueGrid'
        }         
    ],
    listeners: {
        render: {
            scope: this,
            fn: function(grid) {
                 setHeaderPurchaseInvoice();
            }
        }
    }
});

Ext.define(dir_sys+'purchase2.TabPurchaseInvoicePanel', {
    // extend: 'Ext.panel.Panel',
    alias : 'widget.TabPurchaseInvoicePanel',
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    // width: 660,
    anchor:'100%',
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
        width: (panelW-235)/3,
        height: 80,
        bodyPadding: 1
    },

    initComponent: function () {
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
                id:'sumPurchaseInvUnpaid',
                border:true,
                // html: '<center><h2><span style=color:#FF6D00>100.000</span></h2>'
            },
            {
                title: '<center>Total Paid</center>',
                border:true,
                id:'sumPurchaseInvPaid',
                // html: '<center><h2><span style=color:#64DD17>200.000</span></h2>'
            },
            {
                title: '<center>Overdue Payment</center>', 
                border:true,
                id:'sumPurchaseInvDue',
                // html: '<center><h2><span style=color:#d50000>300.000</span></h2>'
            },
            {
                // title: 'Collapsed Panel',
                // collapsed: true,
                // collapsible: true,
                width: panelW-215,
                height: panelH-110,
                // html: 'dasdas',
                xtype:'TabPurchaseInvoice',
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