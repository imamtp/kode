// Ext.require([ 
//     dir_sys+'purchase2.EntryPurchaseOrder',
// ]);
// var EntryPurchaseOrder = Ext.create(dir_sys + 'purchase2.EntryPurchaseOrder');
if (!Ext.isDefined(Ext.getCmp('EntryPurchaseOrder'))) {
  Ext.create(dir_sys + 'purchase2.EntryPurchaseOrder');
}

Ext.define('PurchaseOrderGridModel', {
  extend: 'Ext.data.Model',
  fields: [
    'idpurchase', 'idshipping', 'idpurchasetype', 'idpurchasestatus', 'status', 'idtax', 'idpayment', 'date', 'requestdate', 'tax', 'totalamount', 'memo', 'datein', 'idunit', 'idcurrency', 'subtotal', 'nopurchase', 'idsupplier', 'nametax', 'rate', 'namesupplier', 'disc', 'idpurchase_req', 'nopurchase_req', 'date_req', 'idpurchasestatusname', 'include_tax', 'total_dpp', 'total_diskon', 'shipaddress', 'req_delivery_date'
  ],
  idProperty: 'id'
});
var storePurchaseOrderGrid = Ext.create('Ext.data.Store', {
  pageSize: 100,
  model: 'PurchaseOrderGridModel',
  //remoteSort: true,
  // autoload:true,
  proxy: {
    type: 'ajax',
    url: SITE_URL + 'backend/ext_get_all/PurchaseOrder/purchase',
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

// storePurchaseOrderGrid.on('beforeload',function(store, operation,eOpts){
//    operation.params={
//                // 'extraparams': 'a.idunit:'+Ext.getCmp('cbUnitWOScheduleGrid').getValue()
//                'option':'delivered_po'
//                // 'wherenotinschedule':'true'
//              };
//          });


storePurchaseOrderGrid.on('beforeload', function(store, operation, eOpts) {
  operation.params = {
    extraparams: ' a.idpurchasestatus:' + Ext.getCmp('idpurchasestatus_grdpo').getValue() + ', ' +
      'a.idunit: ' + Ext.getCmp('idunit_grdpo').getValue() + ', ' +
      'a.idsupplier: ' + Ext.getCmp('idsupplier_grdpo').getValue() + ', ' +
      'a.idpayment: ' + Ext.getCmp('idpayment_grdpo').getValue(),
    startdate: Ext.getCmp('startdate_grdpo').getValue(),
    enddate: Ext.getCmp('enddate_grdpo').getValue(),
  }

})

Ext.define('MY.searchPurchaseOrderGrid', {
  extend: 'Ext.ux.form.SearchField',
  alias: 'widget.searchPurchaseOrderGrid',
  store: storePurchaseOrderGrid,
  width: 180
});
var smPurchaseOrderGrid = Ext.create('Ext.selection.CheckboxModel', {
  allowDeselect: true,
  mode: 'SINGLE',
  listeners: {
    deselect: function(model, record, index) {
      var selectedLen = smPurchaseOrderGrid.getSelection().length;
      if (selectedLen == 0) {
        console.log(selectedLen);
        Ext.getCmp('btnDeletePurchaseOrderGrid').disable();
      }
    },
    select: function(model, record, index) {
      Ext.getCmp('btnDeletePurchaseOrderGrid').enable();
    }
  }
});

Ext.define(dir_sys + 'purchase2.PurchaseOrderGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.PurchaseOrderGrid',
  // Ext.define('PurchaseOrderGrid', {
  title: 'Purchase Order',
  // sm: new Ext.grid.RowSelectionModel({ singleSelect: true }),
  itemId: 'PurchaseOrderGridID',
  id: 'PurchaseOrderGridID',
  store: storePurchaseOrderGrid,
  loadMask: true,
  columns: [{
    dataIndex: 'idpurchase',
    hidden: true,
    header: 'idpurchase'
  }, {
    dataIndex: 'idunit',
    hidden: true,
    header: 'idunit'
  }, {
    dataIndex: 'comments',
    hidden: true,
    header: 'comments'
  }, {
    header: 'No Purchase',
    dataIndex: 'nopurchase',
    minWidth: 150
  }, {
    header: 'Status',
    dataIndex: 'idpurchasestatus',
    minWidth: 150,
    renderer: function(value) {
      return customColumnStatus(ArrPurchaseOrderStatus, value);
    }
  }, {
    header: 'Supplier Name',
    flex: 1,
    dataIndex: 'namesupplier',
    minWidth: 150
  }, {
    xtype: 'datecolumn',
    header: 'Date Purchase',
    dataIndex: 'date',
    minWidth: 150,
    align: 'center',
    format: 'd-m-Y'
  }, {
    header: 'Total Item',
    hidden: true,
    dataIndex: 'totalitem',
    minWidth: 80,
    xtype: 'numbercolumn',
    align: 'right'
  }, {
    header: 'Subtotal',
    dataIndex: 'subtotal',
    hidden: true,
    minWidth: 150,
    xtype: 'numbercolumn',
    align: 'right'
  }, {
    header: 'Shipping Cost',
    dataIndex: 'freight',
    hidden: true,
    minWidth: 150,
    xtype: 'numbercolumn',
    align: 'right'
  }, {
    header: 'Total Tax',
    dataIndex: 'tax',
    minWidth: 150,
    xtype: 'numbercolumn',
    align: 'right'
  }, {
    header: 'Total Discount',
    dataIndex: 'disc',
    minWidth: 150,
    xtype: 'numbercolumn',
    align: 'right'
  }, {
    header: 'Total Amount',
    dataIndex: 'totalamount',
    minWidth: 150,
    xtype: 'numbercolumn',
    align: 'right'
  }],
  dockedItems: [{
      xtype: 'toolbar',
      dock: 'top',
      items: [{
          id: 'startdate_grdpo',
          xtype: 'datefield',
          format: 'd/m/Y',
          // value: datenow(),
          fieldLabel: 'Date Order',
          listeners: {
            'change': function(dp, newVal) {
              Ext.getCmp('enddate_grdpo').setMinValue(newVal);
            }
          }
        },
        ' to ',
        {
          id: 'enddate_grdpo',
          xtype: 'datefield',
          format: 'd/m/Y',
          // value: datenow(),
          hideLabel: true,
          listeners: {
            'change': function(dp, newVal) {
              Ext.getCmp('startdate_grdpo').setMaxValue(newVal);
            }
          }
          // fieldLabel: 'Date Order',
        },
        {
          xtype: 'comboxpurchasestatus',
          id: 'idpurchasestatus_grdpo',
        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [{
          xtype: 'comboxunit',
          id: 'idunit_grdpo',
        },
        {
          xtype: 'comboxidsupplier',
          id: 'idsupplier_grdpo',
        },
        {
          xtype: 'comboxpayment',
          id: 'idpayment_grdpo',
        },
        {
          text: 'Search',
          handler: function() {
            storePurchaseOrderGrid.load();
          }
        },
        {
          text: 'Clear Filter',
          handler: function() {
            Ext.getCmp('startdate_grdpo').setValue();
            Ext.getCmp('enddate_grdpo').setValue();
            Ext.getCmp('idpurchasestatus_grdpo').setValue();
            Ext.getCmp('idpayment_grdpo').setValue();
            Ext.getCmp('idsupplier_grdpo').setValue();
          }
        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [{
        itemId: 'addPurchaseOrderGrid',
        text: 'Add New Order',
        iconCls: 'add-icon',
        handler: function() {
          Ext.getCmp('windowPopupPurchaseOrderGrid').show();
          clearFormPO();

          productMeasurementStore.load();
          StorePayment.load();
          comboxWarehouseStore.load();
          supplierStore.load();

          Ext.getCmp('statusformPurchaseOrderGrid').setValue('input');
          var cb_purchase_order_status = Ext.getCmp('cb_purchase_order_status');
          cb_purchase_order_status.setValue(1);
          cb_purchase_order_status.setReadOnly(true);
          Ext.getCmp('shipaddressPurchaseOrder').setValue('Pergudangan Pantai Indah Dadap Blok CK no. 22-27 Jl. Raya Perancis, Dadap, Tangerang');
          //enabling btn record
          Ext.getCmp('btnRecordPurchaseOrder').enable(true);

        }
      }, {
        text: 'Print',
        iconCls: 'print-icon',
        handler: function() {
          // var grid = Ext.ComponentQuery.query('PurchaseRequisitionGridID')[0];
          var grid = Ext.getCmp('PurchaseOrderGridID');
          var selectedRecord = grid.getSelectionModel().getSelection()[0];
          var data = grid.getSelectionModel().getSelection();
          if (data.length == 0) {
            Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
          } else {

            Ext.create('Ext.window.Window', {
              title: 'Preview Purchase Order',
              modal: true,
              width: panelW - 100,
              height: panelH - 200,
              items: [{
                xtype: 'component',
                html: '<iframe src="' + SITE_URL + 'purchase/print_order/' + selectedRecord.data.idpurchase + '"  style="position: absolute; border: 0; top:0; left:0; right:0; bottom:0; width:100%; height:100%;"></iframe>',
              }],
              buttons: [{
                text: 'Print',
                iconCls: 'print-icon',
                handler: function() {
                  window.open(SITE_URL + 'purchase/print_order/' + selectedRecord.data.idpurchase + '/print', '_blank');
                }
              }]
            }).show();
          }
        }
      }, {
        itemId: 'editPurchaseOrderGrid',
        hidden: true,
        text: 'Edit',
        iconCls: 'edit-icon',
        handler: function() {
          supplierTypeStore.load();

          var grid = Ext.ComponentQuery.query('PurchaseOrderGrid')[0];
          var selectedRecord = grid.getSelectionModel().getSelection()[0];
          var data = grid.getSelectionModel().getSelection();
          if (data.length == 0) {
            Ext.Msg.alert('Failure', 'Pilih data supplier terlebih dahulu!');
          } else {
            //Ext.getCmp('kodejenjangmaster').setReadOnly(false);
            var formPurchaseOrderGrid = Ext.getCmp('formPurchaseOrderGrid');
            formPurchaseOrderGrid.getForm().load({
              url: SITE_URL + 'backend/loadFormData/PurchaseOrderGrid/1',
              params: {
                extraparams: 'a.idsupplier:' + selectedRecord.data.idsupplier
              },
              success: function(form, action) {
                // Ext.Msg.alert("Load failed", action.result.errorMessage);
              },
              failure: function(form, action) {
                Ext.Msg.alert("Load failed", action.result.errorMessage);
              }
            })
            wPurchaseOrderGrid.show();
            Ext.getCmp('statusformPurchaseOrderGrid').setValue('edit');
            Ext.getCmp('TabSupplier').setActiveTab(0);
          }
        }
      }, {
        text: 'Set Status',
        iconCls: 'edit-icon',
        menu: [
          {
                text: 'Open',
                disabled: btnDisableOpenPO,
                handler: function() {
                    // var grid = Ext.ComponentQuery.query('GriddeliveryOrderGridID')[0];
                    var grid = Ext.getCmp('PurchaseOrderGridID');
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    var data = grid.getSelectionModel().getSelection();
                    if (data.length == 0) {
                        Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
                    } else {
                      console.log(selectedRecord);
                        if (selectedRecord.data.idpurchasestatus * 1 == 2) {
                            Ext.Ajax.request({
                                url: SITE_URL + 'purchase/set_status',
                                method: 'POST',
                                params: {
                                    status: 1,
                                    idunit: idunit,
                                    idpurchase: selectedRecord.data.idpurchase,
                                    opt: 'PO'
                                },
                                success: function(form, action) {
                                    var d = Ext.decode(form.responseText);
                                    Ext.Msg.alert('Informasi', d.message);
                                    storePurchaseOrderGrid.load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                }
                            });
                        } else {
                            Ext.Msg.alert('Failure', 'Data yang bisa diubah ke status Open hanya data yang dengan status Confirmed');
                        }

                    }
                }
            },
          {
          text: 'Close',
          handler: function() {
            var grid = Ext.getCmp('PurchaseOrderGridID');
            var selectedItem = grid.getSelectionModel().getSelection();
            if (selectedItem.length == 0) {
              Ext.Msg.alert('Failure', 'Pilih data terlebih dahulu!');
            } else {
              // [1, 'Open'],
              // [2, 'Confirmed'],
              // [3, 'Ordered'],
              // [4, 'Received'],
              // [5, 'Partial Received'],
              // [6, 'Canceled'],
              // [7, 'Closed'],

              // //if status is received or partialy received
              if (selectedItem[0].data.idpurchasestatus == 5) {
                Ext.Ajax.request({
                  url: SITE_URL + 'purchase/setStatusPurchase',
                  method: 'POST',
                  params: {
                    status: 4,
                    idunit: Ext.getCmp('idunit_grdpo').getValue(),
                    idpurchase: selectedItem[0].data.idpurchase
                  },
                  success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    Ext.Msg.alert('Informasi', d.message);
                    grid.getStore().load();
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                  }
                });
              } else {
                Ext.Msg.alert('Failure', 'Tidak bisa close pembelian, pembelian ' + selectedItem[0].data.nopurchase + ' tidak dalam status Partialy Received');
              }
            }
          }
        }]
      }, {
        id: 'btnDeletePurchaseOrderGrid',
        text: 'Delete',
        hidden: true,
        iconCls: 'delete-icon',
        handler: function() {
          Ext.Msg.show({
            title: 'Confirm',
            msg: 'Delete Selected ?',
            buttons: Ext.Msg.YESNO,
            fn: function(btn) {
              if (btn == 'yes') {
                var grid = Ext.ComponentQuery.query('PurchaseOrderGrid')[0];
                var sm = grid.getSelectionModel();
                selected = [];
                Ext.each(sm.getSelection(), function(item) {
                  selected.push(item.data[Object.keys(item.data)[0]]);
                });
                Ext.Ajax.request({
                  url: SITE_URL + 'backend/ext_delete/PurchaseOrderGrid',
                  method: 'POST',
                  params: {
                    postdata: Ext.encode(selected),
                    idmenu: 24
                  },
                  success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    if (!d.success) {
                      Ext.Msg.alert('Informasi', d.message);
                    } else {
                      storePurchaseOrderGrid.load();
                    }
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                  }
                });

              }
            }
          });
        },
        //                    disabled: true
      }, '->', 'Searching: ', ' ', {
        xtype: 'searchPurchaseOrderGrid',
        text: 'Left Button'
      }]
    }, {
      xtype: 'pagingtoolbar',
      store: storePurchaseOrderGrid, // same store GridPanel is using
      dock: 'bottom',
      displayInfo: true
        // pageSize:20
    }
  ],
  listeners: {
    render: {
      scope: this,
      fn: function(grid) {
        storePurchaseOrderGrid.load();
      }
    },
    itemdblclick: function(dv, record, item, index, e) {
      showPurchaseOrderData(record);
    }
  }
});