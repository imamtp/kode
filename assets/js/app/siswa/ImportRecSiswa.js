var formImportRowDataSiswa = Ext.create('Ext.form.Panel', {
                id: 'formImportRowDataSiswa',
                width: 450,
                height: 120,
                url: SITE_URL + 'siswa/import',
                bodyStyle: 'padding:5px',
                labelAlign: 'top',
                autoScroll: true,
                fieldDefaults: {
                    msgTarget: 'side',
                    blankText: 'Tidak Boleh Kosong',
                    labelWidth: 150,
                    width: 400
                },
                items: [
                {
                    xtype: 'filefield',
                    fieldLabel: 'File xlsx',
                    name: 'filexlsx',
                    // id: 'filexlsxImportSiswaXlsx',
                    anchor: '100%'
                }],
                buttons: [
                {
                    text: 'Download file template xlsx',
                    handler: function() {
                       window.location = BASE_URL+"assets/xlsx/tempate_import_siswa.xlsx";
                    }
                },'->',
                {
                    text: 'Batal',
                    handler: function() {
                        var win = Ext.getCmp('windowPopupImportRowDataSiswa');
                        Ext.getCmp('formImportRowDataSiswa').getForm().reset();
                        win.hide();
                    }
                }, {
                    text: 'Import',
                    handler: function() {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                                form.submit({
                                    params: {idunit:Ext.getCmp('idunitDataSiswa').getValue()},
                                    success: function(form, action) {

                                        Ext.each(action.result.data, function(obj, i) {

                                            var Import = new DataSiswaGridStoreModel({
                                                idaccount: obj.idaccount,
                                                accname: obj.accname,
                                                accnumber: obj.accnumber,
                                                tglbayar: obj.tglbayar,
                                                amount: obj.amount,
                                                idsiswa: obj.idsiswa,
                                                namasiswa: obj.namasiswa,
                                                denda: obj.denda,
                                                memo: obj.memo,
                                                noinduk: obj.noinduk,
                                                status: obj.status
                                            });

                                            var gridImport = Ext.getCmp('EntryDataSiswaMoneySiswa');
                                            gridImport.getStore().insert(i, Import);
                                        });

                                        Ext.getCmp('totalDataSiswa').setValue(action.result.total);

                                        var win = Ext.getCmp('windowPopupImportRowDataSiswa');
                                        Ext.getCmp('formImportRowDataSiswa').getForm().reset();
                                        win.hide();
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                        msg.hide();
                        //                            storeGridSetupTax.load();
                                    }

                                });
                            } else {
                                Ext.Msg.alert("Error!", "Your form is invalid!");
                            }
                    }
                }]
            });

var winImportSiswa = Ext.create('widget.window', {
    id: 'windowPopupImportRowDataSiswa',
    title: 'Import Data Siswa',
    header: {
        titlePosition: 2,
        titleAlign: 'center'
    },
    closable: true,
    closeAction: 'hide',
    autoWidth: true,
    autoHeight: true,
    layout: 'fit',
    border: false,
    items: [formImportRowDataSiswa]
})