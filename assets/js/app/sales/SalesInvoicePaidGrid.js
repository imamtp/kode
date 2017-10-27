Ext.define('SalesInvoicePaidGridModel', {
  extend: 'Ext.data.Model',
  fields: [
    'idsales', 'no_sales_order', 'subtotal', 'freight', 'date_sales', 'tax', 'disc', 'totalamount', 'paidtoday', 'balance', 'comments', 'noinvoice', 'ddays', 'eomddays', 'percentagedisc', 'daydisc', 'notes_si', 'nocustomer', 'namecustomer', 'idpayment', 'invoice_status', 'invoice_date', 'term', 'duedate', 'no_faktur'
  ],
  idProperty: 'id'
});
var storeGridSalesInvoicePaidGrid = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'SalesInvoicePaidGridModel',
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

storeGridSalesInvoicePaidGrid.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    'extraparams': 'a.idunit:' + Ext.getCmp('idunit_grdsi_paid').getValue(),
    'option': 'paid',
    'startdate': Ext.getCmp('startdate_grdsi_paid').getValue(),
    'enddate': Ext.getCmp('enddate_grdsi_paid').getValue(),
  };
});

Ext.define('MY.searchGridSalesInvoicePaidGrid', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchGridSalesInvoicePaidGrid',
  store: storeGridSalesInvoicePaidGrid,
  width: 180
});
var smGridSalesInvoicePaidGrid = Ext.create('Ext.selection.CheckboxModel', {
  allowDeselect: true,
  mode: 'SINGLE',
  listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smGridSalesInvoicePaidGrid.getSelection().length;
      if (selectedLen == 0) {
        console.log(selectedLen);
        Ext.getCmp('btnDeleteSalesInvoicePaidGrid').disable();
      }
    },
    select: function(model, record, index) {
      Ext.getCmp('btnDeleteSalesInvoicePaidGrid').enable();
    }
  }
});
Ext.define(dir_sys + 'sales.SalesInvoicePaidGrid', {
  title: 'Paid',
  itemId: 'SalesInvoicePaidGrid',
  id: 'SalesInvoicePaidGrid',
  extend: 'Ext.grid.Panel',
  alias: 'widget.SalesInvoicePaidGrid',
  store: storeGridSalesInvoicePaidGrid,
  loadMask: true,
  columns: [{
      header: 'idsales',
      dataIndex: 'idsales',
      hidden: true
    }, {
      header: 'No Sales',
      dataIndex: 'no_sales_order',
      // hidden: true
    }, {
      header: 'No Invoice',
      dataIndex: 'noinvoice',
      // hidden: true
    }, {
      header: 'No Faktur',
      dataIndex: 'no_faktur',
      minWidth: 130,
      // hidden: true
    }, {
      header: 'Customer',
      dataIndex: 'namecustomer',
      minWidth: 200
    },
    {
      header: 'Invoice Date',
      dataIndex: 'invoice_date',
      minWidth: 150,
      xtype: 'datecolumn',
      format: 'd-m-Y'
    },
    {
      header: 'Sales Date',
      dataIndex: 'date_sales',
      minWidth: 150,
      xtype: 'datecolumn',
      format: 'd-m-Y'
    },
    {
      header: 'Term Payment',
      dataIndex: 'idpayment',
      minWidth: 150,
      renderer: function(value) {
        return customColumnStatus(paymenttermarr, value);
      }
    },
    {
      header: 'Term',
      dataIndex: 'term',
      minWidth: 150,
    },
    {
      header: 'Total Tax',
      dataIndex: 'tax',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Total Discount',
      dataIndex: 'disc',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Shipping Cost',
      dataIndex: 'freight',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Total Amount',
      dataIndex: 'totalamount',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Total Paid',
      dataIndex: 'paidtoday',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Outstanding Payment',
      dataIndex: 'balance',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right'
    },
    {
      header: 'Due Date',
      xtype: 'datecolumn',
      format: 'd-m-Y',
      dataIndex: 'duedate',
      minWidth: 150,
    },
    {
      header: 'Status',
      dataIndex: 'invoice_status',
      minWidth: 150,
      xtype: 'numbercolumn',
      align: 'right',
      renderer: function(value) {
        return customColumnStatus(ArrInvoiceStatus, value);
      }
    },
  ],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
        xtype: 'datefield',
        id: 'startdate_grdsi_paid',
        format: 'd/m/Y',
        // value: datenow(),
        fieldLabel: 'Invoice Period',
      },
      ' to ',
      {
        xtype: 'datefield',
        id: 'enddate_grdsi_paid',
        format: 'd/m/Y',
        // value: datenow(),
        hideLabel: true
          // fieldLabel: 'Date Order',
      }, '-',
      {
        xtype: 'comboxunit',
        valueField: 'idunit',
        id: 'idunit_grdsi_paid',
      }
    ]
  }, {
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      itemId: 'createInvoicePaidGrid',
      text: 'Print',
      iconCls: 'print-icon',
      handler: function() {
        var grid = Ext.ComponentQuery.query('SalesInvoicePaidGrid')[0];
        // var grid = Ext.getCmp('GridSalesInvoicePaidGridID');
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();
        if (data.length == 0) {
          Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
        } else {

          Ext.create('Ext.window.Window', {
            title: 'Preview Invoice',
            modal: true,
            width: panelW - 100,
            height: panelH - 200,
            items: [{
              xtype: 'component',
              html: '<iframe src="' + SITE_URL + 'sales/print_invoice/' + selectedRecord.data.idsales + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
            }],
            buttons: [{
              text: 'Print',
              iconCls: 'print-icon',
              handler: function() {
                window.open(SITE_URL + 'sales/print_invoice/' + selectedRecord.data.idsales + '/print', '_blank');
              }
            }]
          }).show();
        }
      }
    }, {
      text: 'Search',
      handler: function() {
        storeGridSalesInvoicePaidGrid.load();
      }
    }, {
      text: 'Clear Filter',
      handler: function() {
        Ext.getCmp('startdate_grdsi_paid').setValue();
        Ext.getCmp('enddate_grdsi_paid').setValue();
        storeGridSalesInvoicePaidGrid.load();
      }
    }, {
      itemId: 'editSalesInvoicePaidGrid',
      text: 'Ubah',
      hidden: true,
      iconCls: 'edit-icon',
      handler: function() {
        // var grid = Ext.ComponentQuery.query('GridSalesInvoicePaidGridID')[0];
        var grid = Ext.getCmp('GridSalesInvoicePaidGridID');
        var selectedRecord = grid.getSelectionModel().getSelection()[0];
        var data = grid.getSelectionModel().getSelection();
        if (data.length == 0) {
          Ext.Msg.alert('Failure', 'Pilih data anggota terlebih dahulu!');
        } else {
          loadMemberForm(selectedRecord.data.id_member)
        }
      }
    }, {
      id: 'btnDeleteSalesInvoicePaidGrid',
      text: 'Hapus',
      hidden: true,
      iconCls: 'delete-icon',
      handler: function() {
        Ext.Msg.show({
          title: 'Confirm',
          msg: 'Delete Selected ?',
          buttons: Ext.Msg.YESNO,
          fn: function(btn) {
            if (btn == 'yes') {
              var grid = Ext.getCmp('GridSalesInvoicePaidGridID');
              var sm = grid.getSelectionModel();
              selected = [];
              Ext.each(sm.getSelection(), function(item) {
                selected.push(item.data[Object.keys(item.data)[0]]);
              });
              Ext.Ajax.request({
                url: SITE_URL + 'backend/ext_delete/SalesInvoicePaidGrid',
                method: 'POST',
                params: {
                  postdata: Ext.encode(selected),
                  idmenu: 95
                },
                success: function(form, action) {
                  var d = Ext.decode(form.responseText);
                  if (!d.success) {
                    Ext.Msg.alert('Informasi', d.message);
                  }
                },
                failure: function(form, action) {
                  Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
              });
              storeGridSalesInvoicePaidGrid.load();
            }
          }
        });
      },
      //                    disabled: true
    }, '->', 'Search: ', ' ', {
      xtype: 'searchGridSalesInvoicePaidGrid',
      text: 'Left Button'
    }]
  }, {
    xtype: 'pagingtoolbar',
    store: storeGridSalesInvoicePaidGrid, // same store GridPanel is using
    dock: 'bottom',
    displayInfo: true
      // pageSize:20
  }],
  listeners: {
    render: {
      scope: this,
      fn: function(grid) {
        storeGridSalesInvoicePaidGrid.load();
        // anggotaTypeStore.load();
      }
    },
    itemdblclick: function(dv, record, item, index, e) {
      // showDataSales(record.data.idsales)
    }
  }
});


function loadMemberForm(id) {
  // anggotaTypeStore.load();

  // var formSalesInvoicePaidGrid = Ext.getCmp('formSalesInvoicePaidGrid');
  // wSalesInvoicePaidGrid.show();
  // formSalesInvoicePaidGrid.getForm().load({
  //     url: SITE_URL + 'backend/loadFormData/SalesInvoicePaidGrid/1/member',
  //     params: {
  //         extraparams: 'a.id_member:' + id
  //     },
  //     success: function(form, action) {
  //         var obj = Ext.decode(action.response.responseText); 
  //         // console.log(obj);
  //         Ext.getCmp('comboxStatusMember').setValue(obj.data.status*1);
  //         formSalesInvoicePaidGrid.getForm().findField("id_member_type").setValue(obj.data.id_member_type);
  //         formSalesInvoicePaidGrid.getForm().findField("marital_status").setValue(obj.data.marital_status*1);
  //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
  //     },
  //     failure: function(form, action) {
  //         Ext.Msg.alert("Load failed", action.result.errorMessage);
  //     }
  // })

  // Ext.getCmp('memberFormDetailID').getForm().load({
  //     url: SITE_URL + 'backend/loadFormData/SalesInvoicePaidGrid/1/member',
  //     params: {
  //         extraparams: 'a.id_member:' + id
  //     },
  //     success: function(form, action) {
  //         // Ext.Msg.alert("Load failed", action.result.errorMessage);
  //     },
  //     failure: function(form, action) {
  //         Ext.Msg.alert("Load failed", action.result.errorMessage);
  //     }
  // })

  // Ext.getCmp('statusformSalesInvoicePaidGrid').setValue('edit');
  // Ext.getCmp('Tabanggota').setActiveTab(0);
}