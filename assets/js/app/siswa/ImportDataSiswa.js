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
                                    // params: {idunit:Ext.getCmp('idunitDataSiswa').getValue()},
                                    success: function(form, action) {

                                        var win = Ext.getCmp('windowPopupImportRowDataSiswa');
                                        Ext.getCmp('formImportRowDataSiswa').getForm().reset();
                                        Ext.Msg.alert('Import Data Siswa', action.result.message);
                                        win.hide();
                                        storeGridSiswaGrid.load();
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Import Data Gagal', action.result ? action.result.message : 'No response');
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