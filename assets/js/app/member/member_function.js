function loadMemberForm(id) {
    anggotaTypeStore.load();

    var formAnggotaGrid = Ext.getCmp('formAnggotaGrid');
    WindowAnggota.show();
    formAnggotaGrid.getForm().load({
        url: SITE_URL + 'backend/loadFormData/AnggotaGrid/1/member',
        params: {
            extraparams: 'a.id_member:' + id
        },
        success: function(form, action) {
            var obj = Ext.decode(action.response.responseText);
            console.log(obj);
            Ext.getCmp('comboxStatusMember_frm_member').setValue(obj.data.status * 1);
            
            Ext.getCmp("id_member_frm_member").setValue(obj.data.id_member);
            Ext.getCmp("member_name_frm_member").setValue(obj.data.member_name);
            Ext.getCmp("no_member_frm_member").setValue(obj.data.no_member);
            Ext.getCmp("comboxanggotatype_frm_member").setValue(obj.data.id_member_type);
            Ext.getCmp("comboxStatusKawin_frm_member").setValue(obj.data.marital_status * 1);

            // formAnggotaGrid.getForm().findField("member_name_frm_member").setValue(obj.data.member_name);
            // formAnggotaGrid.getForm().findField("no_member_frm_member").setValue(obj.data.no_member);
            // formAnggotaGrid.getForm().findField("comboxanggotatype_frm_member").setValue(obj.data.id_member_type);
            // formAnggotaGrid.getForm().findField("comboxStatusKawin_frm_member").setValue(obj.data.marital_status * 1);
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })

    Ext.getCmp('memberFormDetailID').getForm().load({
        url: SITE_URL + 'backend/loadFormData/AnggotaGrid/1/member',
        params: {
            extraparams: 'a.id_member:' + id
        },
        success: function(form, action) {
            // Ext.Msg.alert("Load failed", action.result.errorMessage);
        },
        failure: function(form, action) {
            Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
    })

    Ext.getCmp('statusformAnggotaGrid').setValue('edit');
    Ext.getCmp('Tabanggota').setActiveTab(0);
}