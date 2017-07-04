function loadWoData(job_order_id) {
    // Ext.create(dir_sys + 'production.WindowEntryWorkOrder')

    // if (typeof(Ext.getCmp('WindowEntryWorkOrder').show()) == "undefined"){
    //     ;

    //     Ext.getCmp('WindowEntryWorkOrder').show();
    // } else {
    //     Ext.getCmp('WindowEntryWorkOrder').show()
    // }
    if (!Ext.isDefined(Ext.getCmp('WindowEntryWorkOrder'))) {
        Ext.create(dir_sys + 'production.WindowEntryWorkOrder')
    } else {

    }
    Ext.getCmp('WindowEntryWorkOrder').show()

    storeUnit.load();

    var workOrderHeaderForm = Ext.getCmp('workOrderHeaderForm').getForm();
    workOrderHeaderForm.load({
        url: SITE_URL + 'backend/loadFormData/WorkOrder/1/production',
        params: {
            extraparams: 'a.job_order_id:' + job_order_id
        },
        success: function(form, action) {
            var obj = Ext.decode(action.response.responseText);
            workOrderHeaderForm.findField("status").setValue(obj.data.status * 1);
            workOrderHeaderForm.findField("status").setReadOnly(false);

            var WorkOrderJobTabStore = Ext.getCmp('WorkOrderJobTab').getStore();
            WorkOrderJobTabStore.on('beforeload', function(store, operation, eOpts) {
                operation.params = {
                    'extraparams': 'a.job_order_id:' + job_order_id
                };
            });
            WorkOrderJobTabStore.load();

            if (obj.data.startdate_job === '') {
                Ext.getCmp('btnSaveWo').enable();
            } else {
                Ext.getCmp('btnSaveWo').disable(); // kalau sudah diijadwalkan tidak boleh edit
            }

            if (obj.data.idsales !== '') {
                var val = { is_from_so: 1 };
                Ext.getCmp('rg_is_from_so_wo_form').setValue(val);
            } else {
                var val = { is_from_so: 2 };
                Ext.getCmp('rg_is_from_so_wo_form').setValue(val);
            }

        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })



    // var comboxWorkOrderStatus_woform = Ext.getCmp('comboxWorkOrderStatus_woform');
    // comboxWorkOrderStatus_woform.setValue(1);
    // comboxWorkOrderStatus_woform.setReadOnly(false);

    Ext.getCmp('statusform_woform').setValue('edit');
    workOrderHeaderForm.findField("job_no").setReadOnly(true);

    Ext.getCmp('WorkOrderMaterialTab').setTitle('Pilih Raw Material');
}

function loadWoReceiptData(data) {
    Ext.getCmp('WindowEntryReceiptWO').show();

    Ext.getCmp('ReceiptWorkOrderMaterialTab').setTitle('Pilih finished goods');

    //apus dulu data gridnya
    // var GridReceiptWorkOrderJobTab = Ext.getCmp('ReceiptWorkOrderJobTab').getStore();
    //     GridReceiptWorkOrderJobTab.removeAll();
    //     GridReceiptWorkOrderJobTab.sync();

    // var GridReceiptWorkOrderMaterialTab = Ext.getCmp('ReceiptWorkOrderMaterialTab').getStore();
    //     GridReceiptWorkOrderMaterialTab.removeAll();
    //     GridReceiptWorkOrderMaterialTab.sync();

    // var GridReceiptWorkOrderCostTab = Ext.getCmp('ReceiptWorkOrderCostTab').getStore();
    //     GridReceiptWorkOrderCostTab.removeAll();
    //     GridReceiptWorkOrderCostTab.sync();



    Ext.getCmp('idsales_receiptwoform').setValue(data.idsales);
    Ext.getCmp('job_order_id_receiptwoform').setValue(data.job_order_id);

    if (data.no_sales_order === null) {
        Ext.getCmp('no_sales_order_receiptwoform').hide();
    } else {
        Ext.getCmp('no_sales_order_receiptwoform').setValue(data.no_sales_order);
    }
    console.log('req_ship_date' + data.req_ship_date);
    Ext.getCmp('job_no_receiptwoform').setValue(data.job_no);
    Ext.getCmp('cbUnit_receiptwoform').setValue(data.idunit);
    Ext.getCmp('req_ship_date_receiptwoform').setValue(convertDate2(data.req_ship_date));
    Ext.getCmp('start_date_receiptwoform').setValue(data.startdate_job);
    Ext.getCmp('end_date_receiptwoform').setValue(data.enddate_job);
    Ext.getCmp('comboxWorkOrderStatus_receiptwoform').setValue(data.status * 1);
    Ext.getCmp('remarks_receiptwoform').setValue(data.remarks);
    Ext.getCmp('pic_name_receiptwoform').setValue(data.pic_name);
    Ext.getCmp('approve_name_receiptwoform').setValue(data.approveby_name);
    Ext.getCmp('approvedby_id_receiptwoform').setValue(data.approvedby_id * 1);
    Ext.getCmp('finished_date_receiptwoform').setValue(convertDate2(data.finished_date));
    // console.log(data.finished_date)

    //load finished goods
    var ReceiptWorkOrderJobTabStore = Ext.getCmp('ReceiptWorkOrderJobTab').getStore();
    ReceiptWorkOrderJobTabStore.on('beforeload', function(store, operation, eOpts) {
        operation.params = {
            'extraparams': 'a.job_order_id:' + data.job_order_id
        };
    });

    ReceiptWorkOrderJobTabStore.load();

    if (data.status * 1 === 5) {
        //sudah finished tidak boleh updet data
        Ext.getCmp('btnRecordReceiptWo').disable();
    } else {
        Ext.getCmp('btnRecordReceiptWo').enable();
    }
}