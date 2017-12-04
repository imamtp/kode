function showInputInv() {
    // Ext.getCmp('idFormBuy').setDisabled(true);
    // Ext.getCmp('idFormSell').setDisabled(true);
    // Ext.getCmp('idFormInventoried').setDisabled(true);

    // FormProfileID.getForm().reset();
    // FormBuy.getForm().reset();
    // FormSell.getForm().reset();
    WindowInventory.show();

    tabInventory.setActiveTab(0);

    // Ext.getCmp('qtystockInv').setDisabled(false);
}

function showEditInv(idinventory) {
    WindowInventory.show();

    // storeUnit.load();
    // Ext.getCmp('nameinventory').setValue(1);
    var formInventory = Ext.getCmp('formInventoryV2').getForm();
    Ext.Ajax.request({
        url: SITE_URL + 'inventory/getUnit',
        method: 'POST',
        params: { idinventory: idinventory },
        success: function(form, action) {
            // console.log(form.responseText)
            var str = form.responseText;
            var valUnit = str.split(',');
            // console.log(Ext.getCmp('namaunitFormInvX'));

            // var valUnit = ['Unit 1','SMIP'];
            // console.log(valUnit);

            formInventory.findField('namaunitFormInvX').setValue(valUnit);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    });

    Ext.Ajax.request({
        url: SITE_URL + 'inventory/getSupplier',
        method: 'POST',
        params: { idinventory: idinventory },
        success: function(form, action) {
            // console.log(form.responseText)
            var str = form.responseText;
            var val = str.split(',');
            // console.log(Ext.getCmp('namaunitFormInvX'));

            // var valUnit = ['Unit 1','SMIP'];
            // console.log(valUnit);

            formInventory.findField('idsupplier_forminv').setValue(val);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    });

    formInventory.findField('idinventoryInv').setValue(idinventory);

    var fotothumb = Ext.ComponentQuery.query('fotothumb')[0];

    FormProfileID.getForm().load({
        url: SITE_URL + 'backend/loadFormData/InventoryAll/1/inventory',
        params: {
            extraparams: 'a.idinventory:' + idinventory
        },
        success: function(form, action) {
            console.log(action.result.data);
            Ext.getCmp('measurement_id_one').setValue(action.result.data.measurement_id_one);
            Ext.getCmp('measurement_id_two').setValue(action.result.data.measurement_id_two);
            Ext.getCmp('measurement_id_tre').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('ratio_two').setValue(action.result.data.ratio_two);
            Ext.getCmp('ratio_tre').setValue(action.result.data.ratio_tre);
            Ext.getCmp('comboxInventoryType_inv_form').setValue(action.result.data.inventory_type);
            Ext.getCmp('qtystockminInv').setValue(action.result.data.minstock);
            Ext.getCmp('qtystockInv').setValue((action.result.data.totalstock * 1).toLocaleString({ maximumFractionDigits: 2 }));
            Ext.getCmp('hpp_inv_form').setValue((action.result.data.hpp * 1).toLocaleString({ maximumFractionDigits: 2 }));

            //tab specs
            Ext.getCmp('panjang_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('panjang_satuan_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('tinggi_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('tinggi_satuan_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('lebar_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('lebar_satuan_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('berat_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('berat_satuan_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('ketebalan_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('ketebalan_satuan_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('diameter_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('diameter_satuan_inv_specs').setValue(action.result.data.measurement_id_tre);
            Ext.getCmp('konversi_coil').setValue(action.result.data.konversi_coil_name);
            Ext.getCmp('bahan_coil_id').setValue(action.result.data.bahan_coil_id);
            Ext.getCmp('brand_id_invenform').setValue(action.result.data.brand_id);

            Ext.getCmp('sku_no_invenform').setValue(action.result.data.sku_no);
            //end tab specs

            // formInventory.findField('comboxInventoryType_inv_form').setValue(action.result.data.inventory_type*1);

            if (action.result.data.isbuy == 't') {
                formInventory.findField('cbdibeli').setValue(true);
                Ext.getCmp('fieldsetInvBuy').setDisabled(false);
            } else {
                formInventory.findField('cbdibeli').setValue(false);
                Ext.getCmp('fieldsetInvBuy').setDisabled(true);
            }

            if (action.result.data.issell == 't') {
                formInventory.findField('cbdijual').setValue(true);
                Ext.getCmp('fieldsetInvSell').setDisabled(false);
            } else {
                formInventory.findField('cbdijual').setValue(false);
                Ext.getCmp('fieldsetInvSell').setDisabled(true);
            }

            if (action.result.data.isinventory == 't') {
                formInventory.findField('cbpersediaan').setValue(true);
                // Ext.getCmp('fieldsetInvPersediaan').setDisabled(false);
                setPenyusutan(false)
                Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(false);
            } else {
                formInventory.findField('cbpersediaan').setValue(false);
                // Ext.getCmp('fieldsetInvPersediaan').setDisabled(true);
                setPenyusutan(true)
                Ext.getCmp('TabItemInventory').items.getAt(2).setDisabled(true);
            }

            // console.log(Ext.getCmp('imginventory'));
            //                                    FormProfileID.getForm().findField('fotothumb').el.dom.src = BASE_URL + "/upload/" + action.result.data.images;
            //                                    fotothumb.autoEl.src = BASE_URL + "upload/" + action.result.data.images;

            // FormProfileID.query('.field').forEach(function(field) {
            //                                         console.log(field)
            //                                        field.setReadOnly(false);
            //                                        if (field.inputEl.id == 'pegawainid-inputEl') {
            //                                            field.inputEl.dom.setAttribute('setReadOnly', false);
            //                                        }
            //                                        else if (field.id == 'pegawainid-inputEl') {
            //                                            field.readOnly = false;
            //                                        }
            // });

            //disable field stok
            // Ext.getCmp('qtystockInv').setDisabled(true);
            // Ext.getCmp('qtystockInv').setReadOnly(true);

        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.message);
        }
    })

    Ext.getCmp('formInventoryV2').getForm().load({
        url: SITE_URL + 'backend/loadFormData/InventoryBuy/1/inventory',
        params: {
            extraparams: 'a.idinventory:' + idinventory
        },
        success: function(form, action) {},
        failure: function(form, action) {
            // Ext.Msg.alert("Load failed", action.result.message);
        }
    });

    Ext.getCmp('formInventoryV2').getForm().load({
        url: SITE_URL + 'backend/loadFormData/InventorySell/1/inventory',
        params: {
            extraparams: 'a.idinventory:' + idinventory
        },
        success: function(form, action) {},
        failure: function(form, action) {
            // Ext.Msg.alert("Load failed", action.result.message);
        }
    });

    // Ext.getCmp('formInventoryV2').getForm().load({
    //     url: SITE_URL + 'backend/loadFormData/InventoryInv/1/inventory',
    //     params: {
    //         extraparams: 'a.idinventory:' + idinventory
    //     },
    //     success: function(form, action) {
    //         console.log(action.result.data)
    //         Ext.getCmp('akumulasibeban').setValue(renderNomor(action.result.data.akumulasibeban));
    //         Ext.getCmp('bebanberjalan').setValue(renderNomor(action.result.data.bebanberjalan));
    //         Ext.getCmp('nilaibuku').setValue(renderNomor(action.result.data.nilaibuku));
    //         Ext.getCmp('bebanperbulan').setValue(renderNomor(action.result.data.bebanperbulan));
    //         Ext.getCmp('akumulasiAkhir').setValue(renderNomor(action.result.data.akumulasiakhir));
    //     },
    //     failure: function(form, action) {
    //         Ext.Msg.alert("Load failed", action.result.message);
    //     }
    // });

    //load unit
    // namaunitFormInv




    // Ext.Ajax.request({
    //     url: SITE_URL + 'karyawan/getfoto',
    //     method: 'POST',
    //     params: {
    //         pegawainid: pegawainid
    //     },
    //     success: function(form, action) {
    //         var d = Ext.decode(form.responseText);
    //         Ext.getCmp('fotothumb').el.dom.src = BASE_URL + "/upload/" + d.foto;
    //     },
    //     failure: function(form, action) {
    //         // Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
    //     }
    // });

    // Ext.getCmp('nameinventory').setValue(1);

    // Ext.getCmp('WindowInventory').setTitle('Data Inventory');

    Ext.getCmp('GridStockInventoryTab').getStore().load();
}