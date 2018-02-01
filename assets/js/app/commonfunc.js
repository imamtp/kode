function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


function setSequenceID(fieldID, seqField, seqName) {
    Ext.Ajax.request({
        url: SITE_URL + 'backend/getSequence',
        method: 'POST',
        params: {
            seqName: seqName,
            seqField: seqField
        },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            Ext.getCmp(fieldID).setValue(d.message);
        },
        failure: function(form, action) {
            Ext.getCmp(fieldID).setValue('Get sequence failure!');
        }
    });
}



function disableUnitInventory() {
    //buat disable combo box unit untuk user selain superuser/administrator
    if (group_id != 99) {
        //grid all inventory
        //        Ext.getCmp('cbUnitInvAll').setDisabled(true);
        //        Ext.getCmp('cbUnitInv').setDisabled(true);
        //        Ext.getCmp('cbUnitInvBuy').setDisabled(true);
        //        Ext.getCmp('cbUnitInvSell').setDisabled(true);
        //        //form inventory
        //         var form = Ext.ComponentQuery.query('FormProfile')[0];
        //        form.getForm().findField("namaunitFormInv").setReadOnly(true);


    }
}

function disableUnitJournal() {
    if (group_id != 99) {
        //        Ext.getCmp('idunitJGeneral').setDisabled(true);
    }
}

function disableUnitTreeAcc() {
    if (group_id != 99) {
        //        Ext.getCmp('cbUnitTreeAccount').setDisabled(true);   
    }
}

function disableEntryJournal() {
    if (group_id != 99) {
        //        storeUnit.load();
        //       Ext.getCmp('cbUnitEntryJournal').setReadOnly(true);   
        //       Ext.getCmp('cbUnitEntryJournal').setValue(namaunit);      

    }
}

function disableEntryPurchase() {
    if (group_id != 99) {
        //        storeUnit.load();
        //       Ext.getCmp('cbUnitEntryPurchase').setReadOnly(true);   
        //       Ext.getCmp('cbUnitEntryPurchase').setValue(namaunit);      

    }
}

function datenow() {
    var today = new Date();
    settimezone(today);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function setNoRecord(idunit, parent, model, dir, digit, params) {
    Ext.Ajax.request({
        url: SITE_URL + 'setup/getNoRecord/' + model + '/' + dir + '/' + digit,
        method: 'GET',
        params: params,
        // params:{
        //     idunit: idunit
        // },
        success: function(form, action) {
            var d = Ext.decode(form.responseText);
            parent.fireEvent('setNoRecord', model, d.norec);
        },
        failure: function(form, action) {
            Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
        }
    });
}

function insertNoRef(type, idunit, el, prefix) {
    if (prefix == null) {
        prefix = 'NO';
    }

    if (idunit == null) {
        Ext.Msg.alert('Failed', 'UNit is not set');
    } else {
        Ext.Ajax.request({
            url: SITE_URL + 'setup/getseq',
            method: 'GET',
            params: {
                type: type,
                idunit: idunit
            },
            success: function(form, action) {
                var d = Ext.decode(form.responseText);
                Ext.getCmp(el).setValue(prefix + d.noref);
            },
            failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
            }
        });
    }

}

function insertNoID(type, idunit, fieldpk, table, el, prefix) {
    if (prefix == null) {
        prefix = 'NO';
    }

    if (idunit == null) {
        Ext.Msg.alert('Failed', 'UNit is not set');
    } else {
        if (Ext.getCmp(el).getValue() === '') {
            Ext.Ajax.request({
                url: SITE_URL + 'setup/getseqpk',
                method: 'GET',
                params: {
                    type: type,
                    idunit: idunit,
                    fieldpk: fieldpk,
                    table: table
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    Ext.getCmp(el).setValue(prefix + d.noref);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }

    }

}

function cekAkses(btn) {
    Ext.Ajax.request({
        url: SITE_URL + 'sistem/cekAkses',
        params: {
            id: btn,
        },
        success: function(response) {
            if (response.responseText == 'TIDAK') {
                Ext.Msg.alert('Hak Akses', 'Maaf, anda tidak mempunyai hak akses untuk melanjutkan proses ini.');
            } else {

            }
        },
        failure: function(form, action) {
            Ext.Msg.alert('Hak Akses', 'Cek Hak Akses Gagal, Silahkan coba lagi.');
        }
    });
}

function romanize(num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function customColumnStatus(arrStatus, value) {
    for (var i = 0; i < arrStatus.length; i++) {
        if (arrStatus[i][0] == value) return arrStatus[i][1];
    }

    return 'undefined';
}

function getTaxRate(idtax) {
    //mengambil rate pajak berdasarkan idtax
    // Ext.Ajax.request({
    //     url: SITE_URL + 'backend/getSequence',
    //     method: 'POST',
    //     params: {
    //         seqName: seqName,
    //         seqField: seqField
    //     },
    //     success: function(form, action) {
    //         var d = Ext.decode(form.responseText);
    //         Ext.getCmp(fieldID).setValue(d.message);
    //     },
    //     failure: function(form, action) {
    //         Ext.getCmp(fieldID).setValue('Get sequence failure!');
    //     }
    // });
}

function setNoArticle(idunit, fieldpk, fieldname, table, el, prefix, extraparams) {
    if (prefix == null) {
        prefix = 'NO';
    }

    if (idunit == null) {
        Ext.Msg.alert('Failed', 'UNit is not set');
    } else {
        if (Ext.getCmp(el).getValue() === '') {
            Ext.Ajax.request({
                url: SITE_URL + 'setup/getNextNoArticle',
                method: 'GET',
                params: {
                    idunit: idunit,
                    fieldpk: fieldpk,
                    fieldname: fieldname,
                    table: table,
                    prefix: prefix,
                    extraparams: extraparams,
                },
                success: function(form, action) {
                    var d = Ext.decode(form.responseText);
                    Ext.getCmp(el).setValue(d.nextval);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }

    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

 function addMonths(date, count) {
     if (date && count) {
         var m, d = (date = new Date(+date)).getDate()

         date.setMonth(date.getMonth() + count, 1)
         m = date.getMonth()
         date.setDate(d)
         if (date.getMonth() !== m) date.setDate(0)
     }
     return date
 }