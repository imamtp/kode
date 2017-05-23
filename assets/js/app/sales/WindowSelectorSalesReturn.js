Ext.define('ItemSelectorSOSalesReturnModel', {
    extend: 'Ext.data.Model',
    fields: [
       'idsales','no_sales_order','subtotal','freight','date_sales','tax','disc','totalamount','paidtoday','balance','comments','noinvoice','ddays','eomddays','percentagedisc','daydisc','notes_si','nocustomer','namecustomer','idpayment','invoice_status'
    ],
    idProperty: 'id'
});

var storeGridSOSelectorSalesReturn = Ext.create('Ext.data.Store', {
    pageSize: 100,
    model: 'ItemSelectorSOSalesReturnModel',
    //remoteSort: true,
    // autoload:true,
    proxy: {
        type: 'ajax',
        url: SITE_URL + 'backend/ext_get_all/salesinvoice/sales',
        actionMethods: 'POST',
        reader: {
            root: 'rows',
            totalProperty: 'results'
        },
        //simpleSortMode: true
    },
    sorters: [{
            property: 'menu_name',
            direction: 'DESC'
        }]
});



var gridAtas = Ext.create('Ext.grid.Panel', {
    title: 'Sales Order',
    id:'GridSOSelectorSalesReturn',
    store: storeGridSOSelectorSalesReturn,
    columns: [
           {
            header: 'idsales',
            dataIndex: 'idsales',
            hidden: true
        }, { header: 'No Sales Order',  dataIndex: 'no_sales_order' , minWidth:150,flex:1},
        { header: 'Date Sales', dataIndex: 'date_sales' , minWidth:150},
        { header: 'No Invoice', dataIndex: 'noinvoice' , minWidth:150},
        // { header: 'Total Item', dataIndex: 'phone' ,xtype:'numbercolumn',align:'right' , minWidth:150},
        { header: 'Total Disc', dataIndex: 'disc' ,xtype:'numbercolumn',align:'right' , minWidth:150},
        { header: 'Total Tax', dataIndex: 'tax' ,xtype:'numbercolumn',align:'right' , minWidth:150},
        { header: 'Total Amount', dataIndex: 'totalamount',xtype:'numbercolumn',align:'right' , minWidth:150 }
    ],
         flex:1,
         border:true,
        listeners: {
        deselect: function(grid, record) {
            // var name = record.get('name');
            // save new name
        },
        select: function(grid, record) {
            console.log(record)

             var grid = Ext.getCmp('ItemSelectorSalesReturn');
             var store = grid.getStore();

             store.removeAll();
             store.sync();

             Ext.getCmp('idsales_tmp_sr').setValue(record.get('idsales'));
             

             //insert item to grid
              Ext.Ajax.request({
                    url: SITE_URL + 'sales/get_item_sales',
                    method: 'GET',
                    params: {
                        idsales: record.get('idsales'),
                        item_selector_sr:'true',
                        token:Ext.getCmp('tokenSalesReturnGrid_sr').getValue()
                    },
                    success: function(form, action) {
                        var d = Ext.decode(form.responseText);

                        Ext.each(d.data, function(obj, i) {
                            console.log(obj);

                             var recDO = new ItemSelectorSalesReturnModel({
                                    idsalesitem: obj.idsalesitem,
                                    idinventory: obj.idinventory,
                                    invno: obj.invno,
                                    nameinventory: obj.nameinventory,
                                    warehouse_code:obj.warehouse_code,
                                    price: obj.price*1,
                                    short_desc:obj.short_desc,
                                    // assetaccount:obj.idsalesitem,
                                    qty: obj.qty*1,
                                    disc: obj.disc*1,
                                    total: obj.total*1,
                                    ratetax: obj.ratetax*1,
                                    qty_retur:0
        //                        ratetax: Ext.getCmp('ratetaxjurnal').getValue()
                            });

                           
                            store.insert(0, recDO);
                        });

                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                    }
                });
            // var name = record.get('name');
            // load name to form
        }
    }
});

//end grid atas

//grid bawah
var gridBawah = Ext.create(dir_sys+'sales.ItemSelectorSalesReturn');
//end grid bawah

Ext.define(dir_sys + 'sales.PanelItemSelectorContainer', {
    extend: 'Ext.form.Panel',
    id: 'PanelItemSelectorContainer',
    alias: 'widget.PanelItemSelectorContainer',
    initComponent: function() {

        Ext.apply(this, {
            width: panelW,
            height: sizeH,
            layout: {
                type: 'vbox',
                align : 'stretch',
                pack  : 'start',
            },
            bodyStyle: 'padding:5px',
            items: [
               
                gridAtas,
                {
                    xtype:'ItemSelectorSalesReturn',
                    flex:2, border:true,  margins: '15 0 0 0'
                }
                // {html:'panel 3', flex:2, border:true,  margins: '15 0 0 0'}
            ],
            listeners: {
                cellclick: function(gridView, htmlElement, columnIndex, dataRecord) {
                },
                render: {
                    scope: this,
                    fn: function(grid) {
                        // disablePanelItemSelectorContainer();
                    }
                }
            }
        });

        this.callParent();
    }
});


Ext.define(dir_sys+'sales.WindowSelectorSalesReturn', {
    extend: 'Ext.window.Window',
    alias: 'widget.WindowSelectorSalesReturn',
    id:'WindowSelectorSalesReturn',
    title: 'Item Selector',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    autoDestroy:false,
    modal:true,
    closeAction: 'hide',
//    autoWidth: true,
    width: panelW,
    height: sizeH,
    layout: 'fit',
    border: false,
    items: [{
            xtype:'PanelItemSelectorContainer'
    }],
    listeners:{
         'close':function(win){
                 // load_tmp_sales_return()
          },
         'hide':function(win){
                 load_tmp_sales_return()
          }
    }
});