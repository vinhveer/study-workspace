var __SEP_VAL = '~^~';
var sys_load_form = true;
var sys_close_form = 0;
var sys_lookup_desc = '';
var sys_lookup_key = '';
var sys_lookup_nhhkThaoTac = '';
var sys_forms = new Array();
var root_url = window.location.protocol + "//" + window.location.host;

$(document).ready(function() {
    
//    $('#multiple_sr_ma_don_vi option').prop('selected', true);
//    $('#multiple_sr_index_ma_don_vi option').prop('selected', true);
////    $('#multiple_sr_khoa_hoc option').prop('selected', true);
//    $('#multiple_sr_index_khoa_hoc option').prop('selected', true);
//    $('#multiple_sr_dssinhvien_ma_don_vi option').prop('selected', true);
    
    if($('#h_app_action').val()){
        var app_action = $('#h_app_action').val();
        if($('#h_first_'+app_action).val() == 1){
            $(".multiple_mutiselect ").each(function(k,v){
                var id = $(this).attr('id');
                if($(this).parent().parent().parent().css('display') != 'none'){
                    //chỉ set all trường hợp hiển thị (bỏ Ẩn mục lọc)
                    $('#'+id + " option ").prop('selected', true);
                }                
            });
        }
    }
    
    
    var host = window.location.protocol + "//" + window.location.host;
    //var hostvgu = window.location.protocol + "//" + window.location.host+"/tuyensinh/dangnhap";
    var hostvgu = window.location.protocol + "//" + window.location.host+"/candidate/login";
    //$('.password').pstrength();
    $(".date, .date_normal").each(function(){
        $(this).datepicker().attr('readOnly', true);
    });
    $(".datetime, .datetime_normal").each(function(){
        $(this).datetimepicker({
            showOptions: {
                direction: 'down'
            },
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ['CN','T2','T3','T4','T5','T6','T7']
        }).attr('readOnly', true);
    });
    $(".date_notime ").each(function(){
        $(this).datetimepicker({
            showOptions: {
                direction: 'down'
            },
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ['CN','T2','T3','T4','T5','T6','T7'],
            showTime: false,
            showHour: false,
            showMinute: false,
            alwaysSetTime: false
        }).attr('readOnly', true);
    });
    //set gio phut
    $(".timeuni").each(function(){
        $(this).timepicker({
                currentText:'Hiện tại',
                timeOnly: true,
                timeFormat: 'hh:mm',
                stepMinute:1
                }).attr('readOnly', true);
    });

    var date    = new Date();
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    var options = {
        path: '/',
        expires: date
    };

    $('#body').find('*[gr]').each(function() {
        if($(this).val() != '') {
            if ($(this).attr('gr') == 'c') {
                $(this).change();//ntthuan 20131106 sử dụng sự kiện change thì combobox group mới hoạt động
            } else {
                $(this).blur();
            }
        }
    });

    $("span.close").click(function(){
        $(".msg").slideUp();
    });
    /*$('.msg_info, .msg_success, .msg_warning, .msg_error').delay(10000).fadeOut('slow');*/

    $('#body').find('*[tabname]').keydown(function(event){
        if($(this)[0].tagName.toUpperCase() == "TEXTAREA") {
            return;
        }
        if(event.keyCode == '13' || event.keyCode == '38' || event.keyCode == '40') {
            event.preventDefault();
            return false;
        }
    });
    //trigger Enter keyup and KeyDown, KeyUp
    $('#body').find('*[tabname]').keyup(function(event){
        if($(this)[0].tagName.toUpperCase() == "TEXTAREA") {
            return;
        }
        //trigger Enter keyup
        if(event.keyCode == '13') {
            event.preventDefault();
            var i		= 0;
            var	id		= $(this).attr("id");
            var	tabname		= $(this).attr("tabname");
            var tabfield	= $('#body').find('*[tabname='+tabname+']:enabled:visible');

            tabfield.each(function(){
                i++;
                if($(this).attr("id") == id) {
                    $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").focus();
                    $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").select();
                    return false;
                }
            });
            // neu vuot so input tren form
            if (i == tabfield.size()) {
                if ($("input[tabsubmit="+tabname+"]").size() > 0) {
                    $("input[tabsubmit="+tabname+"]:first").click();
                } else {
                    $("td[tabsubmit="+tabname+"]:first").find('input[type=button]:first').click();
                }
            }
            return false;

        }else if(event.keyCode == '38') {// KeyUp
            event.preventDefault();
            i		= 0;
            id		= $(this).attr("id");
            tabname	= $(this).attr("tabname");
            tabfield	= $('#body').find('*[tabname='+tabname+']:enabled:visible');
            var arr = id.split("_");
            i = arr[arr.length - 1];
            tabfield.each(function(){
                if($(this).attr("id") == id) {
                    i -= 1;
                    $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").focus();
                    $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").select();
                    return false;
                }
            });
            // neu tro ve input dau tien
            if (i < 0  ) {
                i = tabfield.size() - 1;
                $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").focus();
                $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").select();
                return false;
            }
            return false;
        }
        if(event.keyCode == '40') { //KeyDown
            event.preventDefault();
            i		= 0;
            id		= $(this).attr("id");
            tabname		= $(this).attr("tabname");
            tabfield	= $('#body').find('*[tabname='+tabname+']:enabled:visible');

            tabfield.each(function(){
                i++;
                if($(this).attr("id") == id) {
                    $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").focus();
                    $("[tabname="+tabname+"]:enabled:visible:eq("+i+")").select();
                    return false;
                }
            });
            // neu vuot so input tren form
            if (i == tabfield.size()) {
                $("[tabname="+tabname+"]:enabled:visible:eq("+0+")").focus();
                $("[tabname="+tabname+"]:enabled:visible:eq("+0+")").select();
                return false;
            }
            return false;
        }
    });
    
    if(checkIfIncluded("jquery.maskedinput-1.3.min.js"))
    {
        
        $(".date").mask("99-99-9999");
        $(document).ajaxComplete(function() {        
            $(".date").mask("99-99-9999");
            $(".date").blur(function(){          
               if ($(this).val() == "__-__-____") {
                   $(this).val('');
               } 
            });
        });

    }

    $('#body').find('*[tabsearch]').keydown(function(event){
        if(event.keyCode == '13') {
            var	tab = $(this).attr("tabsearch");
            $("#cmb_s_"+tab).click();
        }
    });

    //delete
    $('#frmMain table.table-list input[type=checkbox]').keydown(function(event){
        if(event.keyCode == 46) {
            $("#btnDelete").click();
        }

    });

    $("form :input[type='textbox']:not(.date_normal, .date, .datetime, .date_notime, .datetime_normal, .timeuni):enabled:visible:first").select();

    // set dong chan/le
    $('.table-list tr:odd').addClass('alt');
    /****************************************************************************/
    // get cookie về trạng thái panel top
    panel_cookie    = $.cookie("panel_cookie");
    $.cookie("panel_cookie", panel_cookie, {
        path: '/',
        expires: date
    });
    if(panel_cookie == "none") {
        $("#divheader").hide();
        $(".trigger").removeClass("active");
    } else {
        $("#divheader").show();
        $(".trigger").addClass("active");
    }
    // thực hiện Up/Down panel top và set cookie
    $(".trigger").click(function(){
        if(panel_cookie == "none") {
            $("#divheader").slideToggle();
            $(".trigger").addClass("active");
            panel_cookie    = "block";
        } else {
            $("#divheader").slideToggle();
            $(".trigger").removeClass("active");
            panel_cookie    = "none";
        }
        $.cookie("panel_cookie", panel_cookie, options);
        return false;
    });
    // get cookie về trạng thái toggle search
    search_cookie    = $.cookie("search_cookie");
    $.cookie("search_cookie", search_cookie, {
        path: '/',
        expires: date
    });
    if(search_cookie == "none") {
        $(".trigger_sr").removeClass("active");
    } else {
        $(".trigger_sr").addClass("active_sr");
    }
    // thực hiện Up/Down search top và set cookie
    $(".trigger_sr").click(function(){
        if(search_cookie == "none") {
            $("#" + $(this).attr("srn")).slideToggle();
            $(this).removeClass("active_sr");
            search_cookie    = "block";
        } else {
            $("#" + $(this).attr("srn")).slideToggle();
            $(this).addClass("active_sr");
            search_cookie    = "none";
        }
        $.cookie("search_cookie", search_cookie, options);
        return false;
    });

    $(".trigger_sr").each(function() {
        if(search_cookie != "none") {
            $(this).removeClass("active_sr");
        }
    });

    /*****/
    /*-------------*/
    tb_cookie = $.cookie("tb_cookie");
    $.cookie("tb_cookie", tb_cookie, options);
    if(tb_cookie == "min") {
        $("#popupcontent").hide();
    } else {
        $("#popupcontent").show();
    }
    /*-------------*/
    tb_closecookie = $.cookie("tb_closecookie");
    $.cookie("tb_closecookie", tb_closecookie, options);
    if(tb_closecookie == "hide") {
        $("#popup").hide();
    } else {
        $("#popup").show();
    }
    /*-------------*/
    $(".popupmin").click(function(){
        if(tb_cookie == "min") {
            $("#popupcontent").slideDown();
            tb_cookie    = "max";
        } else {
            $("#popupcontent").slideUp();
            tb_cookie    = "min";
        }
        $.cookie("tb_cookie", tb_cookie, options);
        return false;
    });
    $(".popupclose").click(function(){
        $("#popup").hide();
        tb_closecookie = "hide";
        $.cookie("tb_closecookie", tb_closecookie, options);
        return false;
    });
    /****************************************************************************/
    // show/hide error
    $("div.error").click(function(){
        var id	= $(this).attr("sub");
        $("ul#"+id).slideToggle();
    });
    $("div.success").click(function(){
        var id	= $(this).attr("sub");
        $("ul#"+id+"_success").slideToggle();
    });

    // close modal when Esc keydown
    $("#body").keydown(function(event){
        if(event.keyCode == "27") {
            $("table[id^=tb_msg]").hide();
            $("#overlay").slideUp();
            $(".modal").hide("puff");
        }
    });
    $("td.percent").each(function(){
        var percent = $(this).text();
        $(this).html("<h6 class='percent'><div style='width:"+percent+"'>"+percent+"</div></h6>");
    });
    //	overwriteCombobox();
    $(".table-list input[type=checkbox], .soft input[type=checkbox]").each(function(){
        if($(this).is(":checked")) {
            $(this).parent().addClass("selected");
        }
    });
    $(".table-list input[type=checkbox]").click(function(){
        var idinput = $(this).attr("id");
        if($(this).is(":checked")) {
            $(this).parent().addClass("selected");
        } else {
            $(this).parent().removeClass("selected");
        }
    });
    //    $('td.check').click(function(event) {
    //        if (event.target.type !== 'checkbox') {
    //            $(':checkbox', this).trigger('click');
    //        }
    //    });

    $("input").blur(function(){
        var id = $(this).attr("id");
        if(($("#"+id+"[class^=date]").val() == "") || ($(this).val() == "" && $(this).attr("class") =="notered")) {
            $(this).addClass("red");
        }
    });
    $("input").focus(function(){
        $(this).removeClass("red");
    });

    $(".changepass").click(function(){
        $("table#changepass").toggle();
    });

    $("#bt_editprofile_submit").click(function(){
        var url = host + $("#urlupdate").val();
        var params = $("#changepassword").serialize();
        //var params = "pw_user_password="+ $("#pw_user_password").val() + "&pw_user_pass_again="+ $("#pw_user_pass_again").val();
        $.post(url, params, function(response){
            if(response == "null") {
                alert("Vui lòng nhập mật khẩu");
            } else if(response == "min5") {
                alert("Số ký tự tối thiểu của mật khẩu là 5");
            } else if(response == "does not match") {
                alert("Mật khẩu và Mật khẩu nhắc lại không khớp nhau");
            } else if (response == "OK"){
                alert("Đổi mật khẩu thành công.");
                hideModal("dlg_profile");
                window.location = host;
            } else {
                alert("Vui lòng đăng nhập lại để thực hiện chức năng đổi mật khẩu!");
                window.location = host;
            }
        });
    });
    $("#bt_editprofile_submit_vgu").click(function(){
        var url = host + $("#urlupdate").val();
        var params = $("#changepassword").serialize();
        //var params = "pw_user_password="+ $("#pw_user_password").val() + "&pw_user_pass_again="+ $("#pw_user_pass_again").val();
        $.post(url, params, function(response){
            if(response == "null") {
                alert(enterPassword);
            }else if(response == "min5") {
                alert(minimumChar5);
            }else if(response == "min8") {
                alert(minimumChar);
            } else if(response == "does not match") {
                alert(notMatchPass);
            } else if (response == "OK"){
                alert(changePassSuccess);
                hideModal("dlg_profile");
                window.location = host;
            }else if(response == "OKTUYENSINH"){
                 alert(changePassSuccess);
                hideModal("dlg_profile");
                window.location = hostvgu;
            } else {
                alert(reLoginpass);
                window.location = hostvgu;
            }
        });
    });
    
    $("#bt_editinfo_submit_ntu").click(function () {
        var url = host + $("#urlupdate").val();
        var params = $("#changeprofile").serialize();
        $.post(url, params, function (response){
            if (response == "sdtNullErr") {
               alert('Vui lòng nhập số điên thoại');
            } else if (response == 'min10') {
                alert('Số điện thoại tối thiểu là 10 chữ số');
            } else if (response == 'numErr'){
                alert('Vui lòng nhập đúng định dạng số điện thoại');
            } else if (response == "noictNullErr") {
                alert('Vui lòng nhập nơi công tác');
            } else if (response == 'OK') {
                alert('Cập nhật thành công');
                hideModal("dlg_profile");
                window.location.reload();
            } else {
                alert('Lỗi! Vui lòng đăng nhập lại để thực hiện chức năng cập nhật thông tin!');
                window.location = host;
            }
        });

    });
    
    $("#help").click(function(){
        var url = $(this).attr("rel");
        param = "fullscreen=0,location=0,menubar=0,resizable=0,scrollbars=1,titlebar=0,toolbar=0,status=0,";
        param += "copyhistory=0,width=980,height=620";
        var fileWindow = window.open(url,'Preview_Window',param);
        fileWindow.moveTo(150,50);
        fileWindow.focus();
    });
    $("#help_video").click(function(){
        var url = $(this).attr("rel");
        param = "fullscreen=0,location=0,menubar=0,resizable=0,scrollbars=1,titlebar=0,toolbar=0,status=0,";
        param += "copyhistory=0,width=980,height=620";
        var fileWindow = window.open(url,'Preview_Window',param);
        fileWindow.moveTo(150,50);
        fileWindow.focus();
    });
    $(".lookup").each(function(){
        if ($('#txt_' + $(this).attr('parent')).is(':disabled') || $('#txt_' + $(this).attr('parent')).attr('readonly')) {
            $(this).remove();
        }
    });

    $(".overflow").each(function() {
        if ($(this).width() > $("#body").width()) {
            $(this).width($("#body").width());
        }
    });
    if($('div.control').html() != null && $('.paginator').html() != null) {
        $('.paginator:first').prepend('<tr><td colspan="2" align="right" class="copy_control"></td></tr>');
        $('.paginator:last').append('<tr><td colspan="2" align="right" class="copy_control"></td></tr>');
        $('td.copy_control').html($('div.control').html().replace('&nbsp;', ''));
        $('td.copy_control input[type="hidden"]').remove();
        $('div.control input[type="button"]').remove();
        $('div.control').hide();
    }
    if($('div.control').html() != null && $('div.copy_control').html() != null) {
        $('div.copy_control').append($('div.control').html().replace('&nbsp;', ''));
        $('div.copy_control input[type="hidden"]').remove();
    }
    //fix header
    $(".fixheader").each(function(){
        $(this).fixedtableheader();
    });
    /***/
    $(".selecttext").click(function(){
        $("#selectdropdown").slideDown('puff');
    });
    $("#cmb__hoat_dong_dao_tao, #cmb__nam_hoc, #cmb__hoc_ky").change(function(){
        var url = host + "/ajax/changeSession";
        var params = $(this).serialize();
        $.post(url, params, function(response){
            if (response != ""){
                if(response == 'loi'){
                    $("form[name=frm_frmLookup]").each(function() {
                        $('#frm_frmLookup').append("<input type='hidden' name='error' value='"+textErrInitialSem+"'/>");
                        this.submit();
                        return;
                    });
                }else{
                    var selector = response.split(__SEP_VAL);
                    $("#"+selector[0]).html(selector[1]);

                    var ok = false;
                    $("input.btnsearch").each(function() {
                        this.onclick();
                        ok = true;
                        return;
                    });
                    if (!ok && $("form[name=frm_frmLookup]")) {
                        $("form[name=frm_frmLookup]").each(function() {
                            this.submit();
                            return;
                        });
                    }
                }
            }
        });
    });
    
    if (window != top) {       
        $("#divheader").remove();
        $("#panel").remove();
        $("#footer").remove();
        $("#sp_frmMain_Title").remove();
        
    }        
    
    $(".lang-vn, .lang-en").click(function(){
        var url = host + "/ajax/changeLanguage";
        var params = 'h_lang_sel='+$(this).attr("data");
		
		var lang = $(this).attr("data");
		
        $.post(url, params, function(response){
            var ok = false;
            $("input.btnsearch").each(function() {
				
                this.onclick();
                ok = true;
                return;
            });
            if (!ok && $("form[name=frm_frmLookup]")) {
                $("form[name=frm_frmLookup]").each(function() {
					
					var url = location;
					url = url + "";
					
					if (lang == 'vn') {
						url = url.replace("-en.html", ".html");
					}
					else {
						
						if (url.indexOf("-en.html") == -1) {							
							url = url.replace(".html", "-en.html");
						}
						
					}
					
										
					$(this).attr('action', url);
                    this.submit();
                    return;
                });
            }
        });
    });
    
    $("#closedropdown").click(function(){
        $("#selectdropdown").slideUp('puff');
    });

    if ($("#sskey")) {
        $("form").each(function() {
            if (this.name != "frmKey" && this.name != '') {
                $(this).append("<input type='hidden' name='sskey' value='" + $("#sskey").val() + "'/>");
            }
        });
    }

    $('a').live("click",function(){
        if ($(this).attr("href") && ($(this).attr("href").toString().substr(0, 7) == 'http://' || $(this).attr("href").toString().substr(0, 8) == 'https://') && $(this).attr("href").toString().indexOf('?', 0) >= 0 &&
            $(this).attr("href").toString().indexOf('&sskey=', 0) < 0) {
            $(this).attr("href", $(this).attr("href") + '&sskey=' + $("#sskey").val());
        }
    });
    
    
    url = document.URL;
    if(url.indexOf('hoptacquocte', 0)>0){
        /*
        $("select[id^='cmb']:not([multiple]):not([id^='cmb_sr']):not([id^='cmb_order']):not([id^='cmb_num_break']):not([onchange^='changeSearch'])").chosen({width: "171px"});
        $("select[id^='cbo']").chosen({width: "171px"}); */
    }
    
    /*
    $('html').click(function() {
        
        $("select[id^='cmb']:not([multiple]):not([id^='cmb_sr']):not([id^='cmb_order']):not([id^='cmb_num_break']):not([onchange^='changeSearch'])").trigger("chosen:updated");
        $("select[id^='cbo']").trigger("chosen:updated");

    }); */
        
    $(".multiple_mutiselect, select[multiple]").each(function(){
         $(this).multiselect({
            selectedText: textSel+" #/#",
            header: true,
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:120
        });
    });

});

$.ajaxPrefilter( function( options, originalOptions ) {

    if (!$("#sskey")) {
        return;
    }
    if( $.type(options.data) != 'object'){
        if (options.data && options.data.indexOf("sskey") >= 0) {
            return;
        }
    } else{
        return;
    }
    options.data += '&' + $.param($.extend(originalOptions.data, {
        sskey: $("#sskey").val()
    }));
});

/*****/

$(window).resize(function() {
    $(".divp-list-overflow").each(function() {
        if ($(this).width() > $("#divheader").width()) {
            $(this).width($("#divheader").width());
        }
    });
});
function goToLogout(url) {
    if(confirm(textConfLogout)) {
        location = url;
        return true;
    } else {
        return false;
    }
}

/**--Function---->--*********************************************************/
var originalShowMethod = jQuery.fn.show;

jQuery.fn.extend({
    show : function(arguments) {
        var arg = new Array();
        arg[0] = arguments;
        originalShowMethod.apply(this, arg);

        if ($(this).get(0) && $(this).get(0).tagName == 'DIV' && $(this).attr('id') != undefined && $(this).attr('id').toString().substring(0, 3) == 'dlg') {
            if (sys_load_form && sys_forms.length == 0) {
                $(this).find('*[gr]:visible').each(function() {
                    if($(this).val() != '') {
                        if ($(this).attr('gr') == 'c') {
                            $(this).change();//ntthuan 20131106 sử dụng sự kiện change thì combobox group mới hoạt động
                        } else {
                            $(this).blur();
                        }
                    }
                });

                if (sys_forms.length > 0 && sys_forms[sys_forms.length - 1] != $(this).attr('id')) {
                    sys_close_form = false;
                    $('#' + sys_forms[sys_forms.length - 1]).hide();
                }
                sys_load_form = false;

                if (sys_forms[sys_forms.length - 1] != $(this).attr('id')) {
                    sys_forms[sys_forms.length] = $(this).attr('id');
                }
            }
            $("#"+($(this).attr('id'))+" :input[type='textbox']:not(.date_normal, .date, .datetime, .date_notime, .datetime_normal, .timeuni):enabled:visible:first").focus();
        }
        return;
    }
});

var originalHideMethod = jQuery.fn.hide;
jQuery.fn.extend({
    hide : function(arguments) {
        var arg = new Array();
        arg[0] = arguments;

        if (!sys_close_form) {
            return originalHideMethod.apply(this, arg);
        }
        sys_close_form = false;

        if ($(this).get(0) != null && $(this).get(0).tagName == 'DIV' && $(this).attr('id').toString().substring(0, 3) == 'dlg') {
            sys_load_form = true;

            if (sys_forms.length > 0 && sys_forms[sys_forms.length - 1] != $(this).attr('id')) return originalHideMethod.apply(this, arg);

            sys_forms.pop();
            if (sys_forms.length > 0) {
                $('#' + sys_forms[sys_forms.length - 1]).show();
            } else {
                $('#overlay').hide('puff');
            }
        }
        return originalHideMethod.apply(this, arg);

    }
});

var originalSlideDownMethod = jQuery.fn.slideDown;
jQuery.fn.extend({
    slideDown : function(arguments) {
        var arg = new Array();
        arg[0] = arguments;
        originalSlideDownMethod.apply(this, arg);

        if ($(this).get(0) && $(this).get(0).tagName == 'DIV' && $(this).attr('id').toString().substring(0, 3) == 'dlg') {
            if (sys_load_form) {
                $(this).find('*[gr]:visible').each(function() {
                    if ($(this).attr('gr') == 'c') {
                        $(this).change();//ntthuan 20131106 sử dụng sự kiện change thì combobox group mới hoạt động
                    } else {
                        $(this).blur();
                    }
                });

                if (sys_forms.length > 0 && sys_forms[sys_forms.length - 1] != $(this).attr('id')) {
                    sys_close_form = false;
                    $('#' + sys_forms[sys_forms.length - 1]).hide();
                }
                sys_load_form = false;

                if (sys_forms[sys_forms.length - 1] != $(this).attr('id')) {
                    sys_forms[sys_forms.length] = $(this).attr('id');
                }
            }
            $("#"+($(this).attr('id'))+" :input[type='textbox']:not(.date_normal, .date, .datetime, .date_notime, .datetime_normal, .timeuni):enabled:visible:first").focus();
        }
        return;
    }
});

//decode html to string
String.prototype.htmlEntitiesDecode = function(){
    var strText = this;
    strText  = strText.replace(/&quot;/g, '"');
    strText  = strText.replace(/&QUOT;/g, '"');
    strText  = strText.replace(/&apos;/g, '\'');
    strText  = strText.replace(/&APOS;/g, '\'');
    strText  = strText.replace(/&amp;/g, '&');
    strText  = strText.replace(/&AMP;/g, '&');
    strText  = strText.replace(/&lt;/g, '<');
    strText  = strText.replace(/&LT;/g, '<');
    strText  = strText.replace(/&gt;/g,'>');
    strText  = strText.replace(/&GT;/g,'>');
    //strText  = strText.replace(/&#34;/g, '"');
    strText  = strText.replace(/&#39;/g, '\'');
    //strText  = strText.replace(/&#38;/g, '&');
    //strText  = strText.replace(/&#60;/g, '<');
    //strText  = strText.replace(/&#62;/g,'>');
    return( strText );
}
//convert money to number
String.prototype.convertMoneytoNumber = function(){
    var strText = this;
    strText  = strText.replace(/,/g, '');
    return( strText );
}
var originalSlideUpMethod = jQuery.fn.slideUp;
jQuery.fn.extend({
    slideUp : function(arguments) {
        var arg = new Array();
        arg[0] = arguments;
        originalSlideUpMethod.apply(this, arg);

        if ($(this).get(0) != null && $(this).get(0).tagName == 'DIV' && $(this).attr('id').toString().substring(0, 3) == 'dlg') {

            sys_load_form = true;

            if (sys_forms.length > 0 && sys_forms[sys_forms.length - 1] != $(this).attr('id')) return originalHideMethod.apply(this, arg);

            sys_forms.pop();
            if (sys_forms.length > 0) {
                $('#' + sys_forms[sys_forms.length - 1]).show();
            } else {
                $('#overlay').hide('puff');
            }
        }
    }
});

function goToLink(url) {
    document.location.href = url;
}
function overwriteCombobox() {
    $("body select.notered").each(function(){
        var id	= $(this).attr("id");
        var v	= $("#" + id + " :selected").text();
        var cl	= "selectnotered";
        var cls	= ($(this).attr("class") == "notered")	? $(this).attr("class")	: "arrow";
        var html= "<span id='"+ id +"_span' class='select'>"
        + "<span id='"+ id +"_span_title' class='title'>"+ v +"</span>"
        + "<span class='"+ cls +"'></span>"
        + "</span>";
        $(this).before(html);
        // if($("#" + id).is(':hidden')) {
        // $("#"+ id +"_span").hide();
        // } else {
        // $("#"+ id +"_span").show();
        // }
        $(this).addClass("selecthidden");
    });
    $("body select").click(function(){
        var id = $(this).attr("id");
        var v  = $("#" + id + " :selected").text();
        $("#" + id + "_span_title").html(v);
    });
}

function showLoading() {
    $('#overlay').show();
    $('#loading').show();
    sys_load_form = true;
}

function hideLoading() {
    $('#overlay').hide();
    $('#loading').hide();
    sys_load_form = false;
}

function showModal(id) {
    sys_load_form = true;
    $('#overlay').slideDown();
    $('#loading').hide();
    $('#'+id).show('puff');
//add id to array
}
function showModalNotice(id, url) {
    $('#overlay').slideDown();
    $('#'+id).show('puff');
    /***/
    showLoading();
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: function(xml){
            if (!xml) {
                alert("Failed to connect.");
            }
            $(xml).find('Result').each(function(){
                var msg = $(this).find('msg').text();
                if(msg == "OK") {
                    var title = $(this).find('title').text();
                    var content = $(this).find('content').text();

                    $("#poptitle").html(title);
                    //$("#popcontent").html(content);
                    $("#popcontent").html($('<div/>').html(content).text());
                    $('#loading').hide();
                } else {
                    $("#poptitle").html("Không thể lấy thông tin theo yêu cầu.");
                    $('#loading').hide();
                    $('#overlay').slideUp();
                }
            });
        }
    });
}
function showModalProfile(id, url, owner, link, appname = '', lang = 'vn') {
    $('#overlay').slideDown();
    $('#'+id).show('puff');
    //    showLoading();
    $.post(url, function(response){
        $("#profile").html(response);
        $('#loading').hide();
    });
    if (owner == 'ntu') {
        if(appname == 'CBXUATBAN') {
            $("#fs_infocb").show();
        } else {
            $("#fs_infocb").hide();
        }
        $("#changepassword").html('');
        if (lang = 'en'){
            $("#changepassword").html('<div align="center"><a href="'+link+'" target="blank"><b>Please click here to change your password.</b></a></div>');
        }else {
            $("#changepassword").html('<div align="center"><a href="'+link+'" target="blank"><b>Vui lòng nhấp vào đây để thực hiện đổi mật khẩu.</b></a></div>');
        }
    }
}

function showModalNotification(id, url) {
//    $('#overlay').slideDown();
    $('#'+id).show('puff');
    //    showLoading();
    $.post(url, function(response){
        $("#notification").html(response);
        $('#loading').hide();
    });
}

function hideModal(id) {
    //hide message
    var id_msg = "tb_msg_" + id.substring(4, id.length);
    if (document.getElementById(id_msg)) document.getElementById(id_msg).style.display = 'none';

    sys_close_form = true;
    $('#'+id).hide('puff');
}

function hideModalNotOverlay(id) {
    //hide message
    var id_msg = "tb_msg_" + id.substring(4, id.length);
    if (document.getElementById(id_msg)) document.getElementById(id_msg).style.display = 'none';

    //  $('#overlay').slideUp();
    sys_close_form = true;
    $('#'+id).hide('puff');
}

function goTo(form, list_name, page) {
    $(".divp-list").remove();
    document.getElementById('h_' + list_name + '_cur_page').value = page;
    document.getElementsByName(form)[0].submit();
}

function changeInput(obj) {
    var order = new Array('txt_','cmb_','cmbc_','cmbn_','cmba_','chk_','rd_');
    //ThemCVHTNG_nganh_hoc_ma
    var name = obj.name.substring(4, obj.name.length);
    var old = -1;
    var old_value = '';
    for (var i = 0; i < order.length; i++) {
        if (document.getElementById(order[i] + name) && document.getElementById(order[i] + name).style.display != "none") {
            document.getElementById(order[i] + name).style.display = "none";
            old_value = jQuery.trim(document.getElementById(order[i] + name).value);
            //---pqbao, bo sung khi nhap text la chu thuong, van lay gia tri dung.
            old_value = old_value.toString().toUpperCase();
            old = i;
            break;
        }
    }
    if (old >= 0) {
        for (var i = old + 1; i < old + order.length; i++) {
            var j = i % order.length;
            if (document.getElementById(order[j] + name) && document.getElementById(order[j] + name).style.display == "none") {
                document.getElementById(order[j] + name).style.display = "inline";
                //if (order[j] == "txt_") document.getElementById(order[j] + name).value = "";
                document.getElementById(order[j] + name).value = old_value;
                if (order[j] == 'cmb_' || order[j] == 'cmba_') {
                    if (old_value == '' || document.getElementById(order[j] + name).value == null || document.getElementById(order[j] + name).value == '') {
                        document.getElementById(order[j] + name).selectedIndex  = 0;
                    }
                }
                document.getElementById('h_' + name).value = order[j].substring(0, order[j].length - 1);
                break;
            }
        }
    }
}

function loadSearch(obj, parent) {
    var div = "div_" + obj.id.substring(4, obj.id.length);
    $.ajax({
        type: "GET",
//        url: "index.php",
        url: root_url + "/index.php",
        data: "rt=ajax/public_change_search&name=" + obj.value + "&parent=" + parent,
        success: function(rXML){
            if (!rXML) {
                alert("Failed to load control.");
            }
            var html = rXML.getElementsByTagName("html")[0];
            html = html.firstChild.nodeValue;

            document.getElementById(div).innerHTML = html;
        }
    });
}

function changeSearch(obj, parent){
    $("#div_" + obj.id.substring(4, obj.id.length) + " input[type='hidden']:first").val($("#div_" + obj.id.substring(4, obj.id.length)).children("input:visible,select:visible").val());

    var src_html = $('#div_' + obj.id.substring(4, obj.id.length)).html();
    var s = "";
    var lastValue = "";
    var list = document.getElementsByName("cmb_" + parent);
    for (var i = 0; i < list.length; i++) {
        s += "," + list[i].value + ",";
    }

    for (var i = 0; i < obj.options.length; i++) {
        if (s.indexOf("," + obj.options[i].value + ",") < 0) {
            lastValue = obj.options[i].value;
            break;
        }
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i].id != obj.id && list[i].value == obj.value) {
            //document.getElementById("div_" + obj.id.substring(4, obj.id.length)).innerHTML = document.getElementById("div_" + list[i].id.substring(4, list[i].id.length)).innerHTML;
            $("#div_" + obj.id.substring(4, obj.id.length)).html($("#div_" + list[i].id.substring(4, list[i].id.length)).html());
            if (document.getElementById("div_" + obj.id.substring(4, obj.id.length)).innerHTML == "") {
                loadSearch(obj, parent);
            }
            if (document.getElementById("tr_" + list[i].id.substring(4, list[i].id.length)).style.display != "none") {
                $('#div_' + list[i].id.substring(4, list[i].id.length)).html(src_html);
            } else {
                document.getElementById("div_" + list[i].id.substring(4, list[i].id.length)).innerHTML = src_html;
                $("#div_" + list[i].id.substring(4, list[i].id.length) + " input[type='textbox']:first").val('');
            }
            list[i].value = lastValue;
            break;
        }
    }
    $('#body').find('*[tabsearch]').keydown(function(event){
        if(event.keyCode == '13') {
            var	tab			= $(this).attr("tabsearch");
            $("#cmb_s_"+tab).click();
        }
    });
    $(".date, .date_normal").each(function() {
        $(this).removeClass('hasDatepicker');
        $(this).datepicker();
    });
    $(".datetime, .datetime_normal").each(function(){
        $(this).removeClass('hasDatepicker');
        $(this).datetimepicker({
            showOptions: {
                direction: 'down'
            },
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ['CN','T2','T3','T4','T5','T6','T7']
        }).attr('readOnly', true);
    });
    $(".date_notime").each(function(){
        $(this).removeClass('hasDatepicker');
        $(this).datetimepicker({
            showOptions: {
                direction: 'down'
            },
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ['CN','T2','T3','T4','T5','T6','T7'],
            showTime: false,
            showHour: false,
            showMinute: false,
            alwaysSetTime: false
        }).attr('readOnly', true);
    });
    //set gio phut
    $(".timeuni").each(function(){
        $(this).removeClass('hasDatepicker');
        $(this).timepicker({
                currentText:'Hiện tại',
                timeOnly: true,
                timeFormat: 'hh:mm',
                stepMinute:1
                }).attr('readOnly', true);
    });
    
    $(".multiple_mutiselect ").each(function(k,v){
        var id = $(this).attr('id');
        if($(this).parent().parent().parent().css('display') != 'none' && $(this).val() == null){
            //chỉ set all trường hợp hiển thị (bỏ Ẩn mục lọc)
            $('#'+id + " option ").prop('selected', true);
        }                
    });
    
    $(".multiple_mutiselect, select[multiple]").each(function(){
         $(this).multiselect('refresh');
    });
    
    $(".multiple_mutiselect, select[multiple]").each(function(){	
			$(this).multiselect({
				selectedText: textSel+" #/#",
				header: true,
				classes: 'mutiselect-css',
				noneSelectedText:'- '+textPleSel+' -',
				checkAllText: textAll,
				uncheckAllText: textDeDel,
				minWidth:120
			});
    });
    
    $(".multiple_mutiselect, select[multiple]").each(function(){		

            if($(this).parent().find('button').length > 1) {

                    $(this).parent().find('button:gt(0)').remove();
            }

    });
}
function hideSearch(index, parent) {
    if (document.getElementById("tr_" + parent + "_" + index)) {
        document.getElementById("tr_" + parent + "_" + index).style.display = "none";
        if (document.getElementById("cmb_a_" + parent))
            document.getElementById("cmb_a_" + parent).style.display = "";

        $.each($("#div_" + parent + "_" + index + " input[type='textbox']"), function (k, v) {
            v.value = '';
        });
        $.each($("#div_" + parent + "_" + index + " select"), function (k, v) {
            v.selectedIndex = 0;
            
            if( $(v).attr('class') == 'multiple_mutiselect'){
                $(v).children('option').removeAttr('selected');
            }
            
        });
        //document.getElementById("div_" + parent + "_" + index).innerHTML = "";

        //--NTTrung 21/01/2014
        updateFixTableHeader();
    }
}

function addSearch(parent) {
    var count = $("tr[name='tr_" + parent + "']").length;
    var f = false;
    var h = true;
    for (var i = 1; i <= count; i++) {
        if (document.getElementById("tr_" + parent + "_" + i).style.display == "none") {
            if (f) h = false;
            if (!f) {
                if (document.getElementById("div_" + parent + "_" + i).innerHTML == "") {
                    loadSearch(document.getElementById("cmb_" + parent + "_" + i), parent);
                }
                document.getElementById("tr_" + parent + "_" + i).style.display = "";
                f = true;

                //--NTTrung 21/01/2014
                updateFixTableHeader();
            }
        }
    }
    if (h && document.getElementById("cmb_a_" + parent))
        document.getElementById("cmb_a_" + parent).style.display = "none";
    
    
}

//--NTTrung 21/01/2014
//--Xử lý trường hợp dòng tiêu đề của bảng bị lệch khi thêm bộ search
function updateFixTableHeader() {
    $('.fixheader').each(function() {
        var id = $(this).attr('id');
        if(id.indexOf('fixedtableheader') != -1) {
            var parent = $(this).parent();
            var parent_top = $(parent).offset().top;

            var $clonedTable = $(this);
            $(window).scroll(function() {
                $clonedTable.css({
                    "position": "absolute",
                    "top": $(window).scrollTop() - parent_top,
                    "left": "0px"
                });
            });
        }
    });
}

function changeGroupValue(params) {
    var des = new Array();
    params = params.split(',');
    child = params[2];
    var group = '';
    var index = 0;

    for (var i = 0; i < params.length; i += 3) {
        if (group == '') group = params[i] + ',';
        else group += ',' + params[i] + ',';

        var pa = params[i + 1].split('-');
        for (var j = 0; j < pa.length; j++) {
            var v = '';
            var op = '';
            if ($('#lb_' + params[i + 2]) || $('#txt_' + params[i + 2])) {
                op = 'eq';
            }

            //---pqbao , cap nhat nhom bo mon don vi cua tai san,  19-06-2013
            if (document.getElementById('h_' + pa[j]) && document.getElementById(document.getElementById('h_' + pa[j]).value + '_' + pa[j])) {
                v = document.getElementById(document.getElementById('h_' + pa[j]).value + '_' + pa[j]).value;
                if (document.getElementById('h_' + pa[j]).value == 'txt') op = 'like';
            } else {
                var order = new Array('txt_','cmb_','cmbc_','cmbn_','cmba_','chk_','rd_', 'multiple_');
                for (k = 0; k < order.length; k++) {
                    if (document.getElementById(order[k] + pa[j]) && document.getElementById(order[k] + pa[j]).style.display != 'none') {
                        v = document.getElementById(order[k] + pa[j]).value;
                        if (op == '' && order[k] == 'txt_') {
                            op = 'like';
                        }
                        break;
                    }else if(order[k] == 'multiple_'){ // Han - 04/07/2023 Bổ sung thêm multiple (nếu là multiple thì display = none)
                        v = $('#'+order[k] + pa[j]).val(); 
                        v = v.join('~^~'+ op + '~^~');    
                        break;
                    }
                }
            }
            if (j == 0) group += v + __SEP_VAL + op;
            else group += __SEP_VAL + v + __SEP_VAL + op;
        }

        des[index] = params[i] + ',' + params[i + 2];
        index++;
    }

    $.ajax({
        type: "GET",
//        url: "index.php",
        url: root_url + "/index.php",
        data: "rt=ajax/public_change_input_data&groups=" + group,
        async: false,
        success: function(rXML){
            if (!rXML) {
                alert("Failed to load data.");
            }
            
            for (i = 0; i < des.length; i++) {
                var d = des[i].split(',');
                var err = '';
                //alert(rXML.getElementsByTagName(d[0]).length);
                if(rXML.getElementsByTagName(d[0]).item(0) == null){
                    err = notfound;
                }
                var b = false;
                if (!document.getElementById('cmb_' + d[1]) && !document.getElementById('cmbc_' + d[1]) && !document.getElementById('cmbn_' + d[1]) && !document.getElementById('cmba_' + d[1]) && !document.getElementById('multiple_' + d[1])) b = true;

                if (document.getElementById('lb_' + d[1]) && b) {
                    if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0))) {
                        document.getElementById('lb_' + d[1]).innerHTML = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].text: err;
                    } else {
                        document.getElementById('lb_' + d[1]).innerHTML = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].textContent: err;
                    }
                    continue;
                }
                if (document.getElementById('txt_' + d[1]) && b) {
                    if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0))) {
                        document.getElementById('txt_' + d[1]).value = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].textContent:err;
                    } else {
                        document.getElementById('txt_' + d[1]).value = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].textContent:err;
                    }
                    continue;
                }
                if (document.getElementById('h_' + d[1]) && b) {
                    document.getElementById('h_' + d[1]).innerHTML = err!= ''? err:rXML.getElementsByTagName(d[0]).firstChild.nodeValue;
                    continue;
                }
                if (b) continue;
                var chkA = false;
                var chkC = false;
                var chkN = false;
                var multi = false;
                var d_name = d[1];
                if (document.getElementById('cmb_' + d_name)) {
                    d[1] = 'cmb_' + d_name;
                } else if (document.getElementById('cmbc_' + d_name)) {
                    d[1] = 'cmbc_' + d_name;
                    chkC = true;
                }else if (document.getElementById('cmbn_' + d_name)) {
                    d[1] = 'cmbn_' + d_name;
                    chkN = true;
                }else if (document.getElementById('multiple_' + d_name)) {
                    d[1] = 'multiple_' + d_name;
                    multi = true;
                }else{
                    d[1] = 'cmba_' + d_name;
                    chkA = true;
                }
                var oldval = document.getElementById(d[1]).value;

                document.getElementById(d[1]).options.length = 0;

                var iitem;
                if (chkC) {
                    $('#' + d[1]).append(new Option(textCmbc, ''));
                }
                if (chkN) {
                    $('#' + d[1]).append(new Option(" ", ''));
                }
                if (chkA) {
                    $('#' + d[1]).append(new Option(textCmba, ''));
                }

                var ds = rXML.getElementsByTagName(d[0]);
                var c = ds.length;
                var is_iebrowser = Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0);
                for (var j = 0; j < c; j++) {
                    if (ds[j].firstChild === null) continue;
                    var val = ds[j].firstChild.nodeValue;

                    iitem = document.createElement("OPTION");
                    iitem.value = val;

                    if (is_iebrowser) {
                        iitem.text = ds.item(j).attributes[0].text;
//                        console.dir(ds.item(j).attributes[0]);
//                        console.log(ds.item(j).attributes[0].value);
//                        console.dir(iitem);
                        if (iitem.text === 'undefined') { //IE11
                            iitem.text = ds.item(j).attributes[0].textContent;
                            document.getElementById(d[1]).add(iitem, null);
                        } else {
                            document.getElementById(d[1]).add(iitem);
                        }
                    } else {
                        iitem.text = ds.item(j).attributes[0].textContent;
                        document.getElementById(d[1]).add(iitem, null);
                    }
                }
                //document.getElementById(d[1]).value = oldval;
                $('#' + d[1]).val(oldval);
                if (oldval == '' && $(document.getElementById(d[1])).attr('tagName') == 'SELECT') {
                    document.getElementById(d[1]).selectedIndex = 0;
                }
                if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0)) && $('#' + d[1]).val() == null && document.getElementById(d[1]).options.length > 0) { // using IE
                    document.getElementById(d[1]).selectedIndex = 0;
                }

                if (multi){
                    $('#' + d[1]).multiselect('refresh');
                }
                //document.getElementById(d[1]).onclick();
                $('#' + d[1]).change();
                /*
                setTimeOut(function() {
                    $('#' + d[1]).change();
                }, 500);*/
            // var id = "cmb_"+d[1];
            // var v  = $("#" + id + " :selected").text();
            // $("#" + id + "_span_title").html(v);
            }
        }
    });
    
    $('#cmb_' + child).change();
    $('#btn_' + child).click();
    $('#txt_' + child).blur();
    /*
    $("#cmba_" + child).val('');
    $("#cmba_" + child + ":not([multiple]):not([id^='cmb_sr']):not([id^='cmb_order']):not([id^='cmb_num_break']):not([onchange^='changeSearch'])").trigger("chosen:updated");
   
    $("#cmbc_" + child).val('');
    $("#cmbc_" + child + ":not([multiple]):not([id^='cmb_sr']):not([id^='cmb_order']):not([id^='cmb_num_break']):not([onchange^='changeSearch'])").trigger("chosen:updated");
    */
        
}

//---pqbao,ham lay du lieu combox tuan tu.
function changeGroupValueTuanTu(params) {
    var des = new Array();
    params = params.split(',');
    var group = '';
    var index = 0;

    for (var i = 0; i < params.length; i += 3) {
        if (group == '') group = params[i] + ',';
        else group += ',' + params[i] + ',';

        var pa = params[i + 1].split('-');
        for (var j = 0; j < pa.length; j++) {
            var v = '';
            var op = '';
            if ($('#lb_' + params[i + 2]) || $('#txt_' + params[i + 2])) {
                op = 'eq';
            }

            //---pqbao , cap nhat nhom bo mon don vi cua tai san,  19-06-2013
            if (document.getElementById('h_' + pa[j]) && document.getElementById(document.getElementById('h_' + pa[j]).value + '_' + pa[j])) {
                v = document.getElementById(document.getElementById('h_' + pa[j]).value + '_' + pa[j]).value;
                if (document.getElementById('h_' + pa[j]).value == 'txt') op = 'like';
            } else {
                var order = new Array('txt_','cmb_','cmbc_','cmbn_','cmba_','chk_','rd_');
                for (k = 0; k < order.length; k++) {
                    if (document.getElementById(order[k] + pa[j]) && document.getElementById(order[k] + pa[j]).style.display != 'none') {
                        v = document.getElementById(order[k] + pa[j]).value;
                        if (op == '' && order[k] == 'txt_') {
                            op = 'like';
                        }
                        break;
                    }
                }
            }
            if (j == 0) group += v + __SEP_VAL + op;
            else group += __SEP_VAL + v + __SEP_VAL + op;
        }

        des[index] = params[i] + ',' + params[i + 2];
        index++;
    }

    $.ajax({
        type: "GET",
//        url: "index.php",
        url: root_url + "/index.php",
        data: "rt=ajax/public_change_input_data&groups=" + group,
        async: false,
        success: function(rXML){
            if (!rXML) {
                alert("Failed to load data.");
            }

            for (i = 0; i < des.length; i++) {
                var d = des[i].split(',');
                var err = '';
                //alert(rXML.getElementsByTagName(d[0]).length);
                if(rXML.getElementsByTagName(d[0]).item(0) == null){
                    err = 'Không tìm thấy thông tin';
                }
                var b = false;
                if (!document.getElementById('cmb_' + d[1]) && !document.getElementById('cmbc_' + d[1]) && !document.getElementById('cmbn_' + d[1]) && !document.getElementById('cmba_' + d[1])) {
                    b = true;
                }

                if (document.getElementById('lb_' + d[1]) && b) {
                    if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0))) {
                        document.getElementById('lb_' + d[1]).innerHTML = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].text: err;
                    } else {
                        document.getElementById('lb_' + d[1]).innerHTML = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].textContent: err;
                    }
                    continue;
                }
                if (document.getElementById('txt_' + d[1]) && b) {
                    if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0))) {
                        document.getElementById('txt_' + d[1]).value = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].text:err;
                    } else {
                        document.getElementById('txt_' + d[1]).value = err == ''?rXML.getElementsByTagName(d[0]).item(0).attributes[0].textContent:err;
                    }
                    continue;
                }
                if (document.getElementById('h_' + d[1]) && b) {
                    document.getElementById('h_' + d[1]).innerHTML = err!= ''? err:rXML.getElementsByTagName(d[0]).firstChild.nodeValue;
                    continue;
                }
                if (b) continue;
                var chkA = false;
                var chkC = false;
                var chkN = false;
                var d_name = d[1];
                if (document.getElementById('cmb_' + d_name)) {
                    d[1] = 'cmb_' + d_name;
                } else if (document.getElementById('cmbc_' + d_name)) {
                    d[1] = 'cmbc_' + d_name;
                    chkC = true;
                }else if (document.getElementById('cmbn_' + d_name)) {
                    d[1] = 'cmbn_' + d_name;
                    chkN = true;
                }else{
                    d[1] = 'cmba_' + d_name;
                    chkA = true;
                }
                var oldval = document.getElementById(d[1]).value;

                document.getElementById(d[1]).options.length = 0;

                var iitem;
                if (chkC) {
                    iitem = document.createElement("OPTION");
                    iitem.value = '';

                    iitem.text = textCmbc;
                    if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0))) {
                        document.getElementById(d[1]).add(iitem);
                    } else {
                        document.getElementById(d[1]).add(iitem, null);
                    }
                }
                if (chkN) {
                    iitem = document.createElement("OPTION");
                    iitem.value = '';

                    iitem.text = " ";
                    if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0))) {
                        document.getElementById(d[1]).add(iitem);
                    } else {
                        document.getElementById(d[1]).add(iitem, null);
                    }
                }
                if (chkA) {
                    iitem = document.createElement("OPTION");
                    iitem.value = '';

                    iitem.text = "---- Tất cả ----";
                    if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0))) {
                        document.getElementById(d[1]).add(iitem);
                    } else {
                        document.getElementById(d[1]).add(iitem, null);
                    }
                }

                var ds = rXML.getElementsByTagName(d[0]);
                var c = ds.length;
                var is_iebrowser = Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0);
                for (var j = 0; j < c; j++) {
                    if (ds[j].firstChild == null) continue;
                    var val = ds[j].firstChild.nodeValue;

                    iitem = document.createElement("OPTION");
                    iitem.value = val;

                    if (is_iebrowser) {
                        iitem.text = ds.item(j).attributes[0].text;
                        if (iitem.text === 'undefined') { //IE11
                            iitem.text = ds.item(j).attributes[0].textContent;
                            document.getElementById(d[1]).add(iitem, null);
                        } else {
                            document.getElementById(d[1]).add(iitem);
                        }
                    } else {
                        iitem.text = ds.item(j).attributes[0].textContent;
                        document.getElementById(d[1]).add(iitem, null);
                    }
                }
                //document.getElementById(d[1]).value = oldval;
                $('#' + d[1]).val(oldval);
                if (oldval == '' && $(document.getElementById(d[1])).attr('tagName') == 'SELECT') {
                    document.getElementById(d[1]).selectedIndex = 0;
                }
                if ((Math.max(navigator.userAgent.toLowerCase().indexOf("msie"), 0)) && $('#' + d[1]).val() == null && document.getElementById(d[1]).options.length > 0) { // using IE
                    document.getElementById(d[1]).selectedIndex = 0;
                }
                //document.getElementById(d[1]).onclick();
//                $('#' + d[1]).click();
                setTimeout(function() {
                    $('#' + d[1]).change();
                }, 500);
            // var id = "cmb_"+d[1];
            // var v  = $("#" + id + " :selected").text();
            // $("#" + id + "_span_title").html(v);
            }
        }
    });
}
function changeOrderValue(obj, name) {
    if ($(obj).val() == '-') {
        $('#cmb_order_type_' + name).hide();
        $('#bt_order_adv_' + name).show();
    } else {
        $('#cmb_order_type_' + name).show();
        $('#bt_order_adv_' + name).hide();
    }
}

function showDetailOrderAdv(name, image_path) {
    $('#tb_order_adv_list_' + name).html('<thead></thead><tbody></tbody>');
    $('#tb_order_adv_list_' + name + ' > thead').append('<tr><th align="center">' + textSTT + '</th><th align="center" width="60%">' + textThanhPhan + '</th><th align="center">' + textSapXep + '</th><th align="center" width="10%">' + textDelete + '</th></tr>');

    $c_sort_type = $('#cmb_order_adv_type_' + name).clone();
    $c_sort_type.attr('name', 'cmb_tmp_adv_order_type');
    $c_sort_type.attr('style', 'width:135px');
    var now = jQuery.now();    
    var data = $('#h_order_adv_' + name).val();
    /***
     * NTAI - 29/09/2016
     * Sửa lỗi khi chuyển sang song ngữ vẫn dùng dòng "ten" trong CSDL nên mất giá trị lấy ra là "ten_en"
     * vd: tìm kiếm nâng cao tên đối tượng, hệ thống sẽ lấy ts_td_doi_tuong_ten - khi ở tiếng việt
     * chuyển sang tiếng anh thì hệ thống vẫn lấy cột "ts_td_doi_tuong_ten" --> code dưới chuyển "ts_td_doi_tuong_ten" -> "ts_td_doi_tuong_ten_en"
     ***/
     
    if(session_en != null){
        if (data.toLowerCase().indexOf("ts_td_khu_vuc_ten") >= 0){
            data = data.replace("ts_td_khu_vuc_ten", "ten_khu_vuc_en");
        }else{
            data = data.replace("_ten", "_ten_en");
        }
    }else{
        if (data.toLowerCase().indexOf("ten_khu_vuc_en") >= 0){
            data = data.replace("ten_khu_vuc_en", "ts_td_khu_vuc_ten");
        }        
    }    
    if (data != '') {
        rData = data.split(',');
        var stt = 1;
        for (var i = 0; i < rData.length; i++) {
            var cData = rData[i].split(' ');
            $c_sort_type.attr('id', 'cmb_tmp_adv_order_type_' + now);
            $c_sort_type.attr('onclick', 'changeItemSortType(' + now + ')');

            $('#tb_order_adv_list_' + name + ' > tbody:last').append('<tr><th align="center" class="cls_row"> ' + stt + '</th>\n\
                            <td>' + $('#cmb_order_adv_com_' + name).find("option[value='" + cData[0] + "']").text() + '</td>\n\
                            <td align="center"> ' + $c_sort_type.prop('outerHTML') + '</td>\n\
                            <td align="center">' + '<img src="' + image_path + 'images/delete.png' + '" title="' + textDelete + '" class="center pointer" onclick="deleteItemAdvOrder(this,\'' + name + '\')"/>' + '</td>\n\
                            <input type="hidden" name="h_tmp_adv_order_' + name + '[]" id="h_tmp_adv_order_' + now + '" value="' + cData[0] + ' ' + cData[1] + '"/></tr>');
            $('#cmb_tmp_adv_order_type_' + now).val(cData[1]);
            stt++;
            now--;
        }
    }
    showModal('dlg_order_adv_' + name);

}

function addItemAdvOrder(name, image_path) {
    var f = false;
    $('#tb_order_adv_list_' + name + ' input[name="h_tmp_adv_order_' + name + '[]"]').each(function() {
        var v = $(this).val();
        v = v.split(' ');
        if ($('#cmb_order_adv_com_' + name).val() == v[0]) {
            alert(textExists);
            f = true;
            return;
        }
    });
    if (f) return;

    var stt = $('#tb_order_adv_list_' + name).find('.cls_row').length + 1;
    var now = jQuery.now();

    $c_sort_type = $('#cmb_order_adv_type_' + name).clone();
    $c_sort_type.attr('name', 'cmb_tmp_adv_order_type');
    var new_id = 'cmb_tmp_adv_order_type_' + now;
    $c_sort_type.attr('id',new_id );
    $c_sort_type.attr('onclick', 'changeItemSortType(' + now + ')');
    $c_sort_type.attr('style', 'width:135px');

    $('#tb_order_adv_list_' + name + ' > tbody:last').append('<tr><th align="center" class="cls_row"> ' + stt + '</th>\n\
                    <td>' + $('#cmb_order_adv_com_' + name + ' option:selected').text() + '</td>\n\
                    <td align="center"> ' + $c_sort_type.prop('outerHTML') + '</td>\n\
                    <td align="center">' + '<img src="' + image_path + 'images/delete.png' + '" title="' + textDelete + '" class="center pointer" onclick="deleteItemAdvOrder(this,\'' + name + '\')"/>' + '</td>\n\
                    <input type="hidden" name="h_tmp_adv_order_' + name + '[]" id="h_tmp_adv_order_' + now + '" value="' + $('#cmb_order_adv_com_' + name).val() + ' ' + $('#cmb_order_adv_type_' + name).val() + '"/></tr>');
    $('#'+new_id).val(document.getElementsByName('cmb_order_adv_type_'+name)[0].value);
}

function deleteItemAdvOrder(obj, name) {
    $(obj).parent().parent().remove();
    var stt = 1;
    $('#tb_order_adv_list_' + name).find('.cls_row').each(function() {
        $(this).html(stt);
        stt++;
    });
}

function searchAdvOrder(parent, form) {
    $('#h_order_adv_' + parent).val('');
    
    var adv_search = '';
    
    if ($('#tb_order_adv_list_' + parent).find('.cls_row').length > 0) {
        $('#tb_order_adv_list_' + parent + ' input[name="h_tmp_adv_order_' + parent + '[]"]').each(function() {
            adv_search += adv_search == '' ? $(this).val() : (',' + $(this).val());
        });
    }
    if (adv_search == '') {
        alert('Vui lòng chọn ít nhất một điều kiện sắp xếp');
    }
    else {
        $('#h_order_adv_' + parent).val(adv_search);
        search(parent, form);        
    }
    
}

function changeItemSortType(id) {
    var oldValue = $('#h_tmp_adv_order_' + id).val();
    $('#h_tmp_adv_order_' + id).val(oldValue.split(' ')[0] + ' ' + $('#cmb_tmp_adv_order_type_' + id).val());
}

function removeElement(parentDiv, childDiv){
    if (childDiv == parentDiv) {
        //alert("The parent div cannot be removed.");
        return true;
    } else if (document.getElementById(childDiv)) {
        var child = document.getElementById(childDiv);
        var parent = document.getElementById(parentDiv);
        parent.removeChild(child);
        return true;
    } else {
        //alert("Child div has already been removed or does not exist.");
        return false;
    }
}

function search(parent, form) {
    /*var count = document.getElementsByName("cmb_" + parent).length;
    var del_list = "";
    for (var i = 0; i < count; i++) {
        var id = document.getElementsByName("cmb_" + parent)[i].id.split("_");
        id = id[id.length - 1];
        if (document.getElementById("tr_" + parent + "_" + id) && document.getElementById("tr_" + parent + "_" + id).style.display == "none") {
            //document.getElementById("tr_" + parent + "_" + id).innerHTML = "&nbsp;";
            del_list += (del_list==""?"":",") + "tr_" + parent + "_" + id;
        } else {
            var name = document.getElementById("cmb_" + parent + "_" + id).value;
            var s = new Array("txt_","cmb_","chk_","rd_");
            for (var j = 0; j < s.length; s++) {
                var input_name = s[j] + parent + "_" + name;
                if (document.getElementById(input_name) && document.getElementById(input_name).style.display == "none") {
                    removeElement("div_" + parent + "_" + id, input_name);
                }
            }
        }
    }

    if (del_list.length > 0) {
        del_list = del_list.split(',');
        for (var i = 0; i < del_list.length; i++) {
            $('#' + del_list[i]).remove();
        }
    }*/

    document.getElementsByName(form)[0].id = 'frmMain';
    $('#frmMain').append("<input type='hidden' name='no_cache' value='true'/>");

    $.each($("input[rel='h_cur_page']"), function (k, v) {
        v.value = 1;
    });
    $(".multiple_mutiselect ").each(function(k,v){
        var id = $(this).attr('id');
        if($(this).val() == null){
            if($(this).parent().parent().parent().css('display') != 'none'){
                select = document.getElementById(id);
                option = document.createElement( 'option' );
                option.value = option.text = 'nul';
                select.add(option);
                $("#"+id).val("nul");
            }else{
                select = document.getElementById(id);
                option = document.createElement( 'option' );
                option.value = option.text = 'null_multiple_search';
                select.add(option);
                $("#"+id).val("null_multiple_search");
            }
            
        }
    });
    document.getElementsByName(form)[0].submit();
}

function processCheckList(form, action, name, no_confirm, custom_msg, new_tab, no_submit) {
    var f = false;
    if ($("input[name='chk_" + name + "_all[]']").length > 0) {
        $.each($("input[name='chk_" + name + "_all[]']"), function (k, v) {
            if (v.checked) {
                f = true;
                return true;
            }
        });
    } else {
        var chk = document.getElementsByName('chk_' + name + '_all');
        for (var i = 0; i < chk.length; i++) {
            if (chk[i].checked) {
                f = true;
                break;
            }
        }
    }
    if (!f) {
        alert(textSubmitNotSel);
        return false;
    }

    if (!no_confirm && !confirm(custom_msg==null? textConfirmDel : custom_msg)) return false;

    if ($("input[name='h_" + name + "[]']").length > 0) {
        $.each($("input[name='h_" + name + "[]']"), function (k, v) {
            var id = v.id.split('_');
            id = id[id.length - 1];
            var chk = document.getElementById('chk_' + name + '_all_' + id);

            if (!chk || (chk && !chk.checked)) {
                v.value = '';
            }
        });
    } else if ($("input[name='h_" + name).length > 0) {
        $.each($("input[name='h_" + name), function (k, v) {
            var id = v.id.split('_');
            id = id[id.length - 1];
            var chk = document.getElementById('chk_' + name + '_all_' + id);

            if (!chk || (chk && !chk.checked)) {
                v.value = '';
            }
        });
    }
    var oldAction = document.getElementsByName(form)[0].action;
    document.getElementsByName(form)[0].action = action;
    var oldTarget = document.getElementsByName(form)[0].target;
    if (new_tab) {
        document.getElementsByName(form)[0].target = '_blank';
    }
    //    
    if(new_tab && !no_submit){
        // day la doan code can chay ben KLCT (Loi chrome khong xuat duoc bang thanh toan)
        // se khong co truong hop {vua new_tab vua no_submit} => no_submit la NVDo bo sung cho chuc nang dang ky muon phong, da kiem tra va OK
        document.getElementsByName(form)[0].submit();
        setTimeout(function() {
            document.getElementsByName(form)[0].action = oldAction;
            document.getElementsByName(form)[0].target = oldTarget;
            document.getElementsByName(form)[0].submit();
        }, 5);
    } else {
        if (!no_submit) {
            showLoading(); //hien thi khi xac nhan thuc hien tac vu....
            document.getElementsByName(form)[0].submit();
        }
        document.getElementsByName(form)[0].action = oldAction;
        document.getElementsByName(form)[0].target = oldTarget;
        return true;
    }
    // => doan duoi cung da ok, nhung su dung doan duoi thi phai do cac chuc nang can chinh de them tham so thu 8 la reSubmit = true
    /*
//    document.getElementsByName(form)[0].submit();
    //nvdo - thêm tham số no_submit để danh cho các buttom cần chọn ít nhất 1 dòng mới ok => không cần phải viết hàm mới để xem nó có chọn hay chưa
    if(!no_submit){
       showLoading(); //hien thi khi xac nhan thuc hien tac vu....
       document.getElementsByName(form)[0].submit();
    }
    if (reSubmit) {
        document.getElementsByName(form)[0].submit();
        setTimeout(function() {
            document.getElementsByName(form)[0].action = oldAction;
            document.getElementsByName(form)[0].target = oldTarget;
            document.getElementsByName(form)[0].submit();
        }, 3);
    } else {
        document.getElementsByName(form)[0].action = oldAction
        document.getElementsByName(form)[0].target = oldTarget;
        return true;
    }
    */
}

function processCheckAll(name) {
    var chk = document.getElementsByName('chk_' + name + '_all');
    var b = document.getElementById('chk_' + name + '_check_all').checked;
    for (var i = 0; i < chk.length; i++) {
        chk[i].checked = b;
        if($(chk[i]).is(":checked")) {
            $(chk[i]).parent().addClass("selected");
        } else {
            $(chk[i]).parent().removeClass("selected");
        }
    }
}

function checkAllCol(obj, name) {
    if ($("input[name='" + name + "[]']") != null) {
        $.each($("input[name='" + name + "[]']"), function (k, v) {
            if (!v.disabled) {
                $(v).click();
                v.checked = obj.checked;
                if($(v).is(":checked")) {
                    $(v).parent().addClass("selected");
                } else {
                    $(v).parent().removeClass("selected");
                }
            }
        });
    }
    if ($("input[name='" + name + "']") != null) {
        $.each($("input[name='" + name + "']"), function (k, v) {
            if (!v.disabled) {
                $(v).click();
                v.checked = obj.checked;
                if($(v).is(":checked")) {
                    $(v).parent().addClass("selected");
                } else {
                    $(v).parent().removeClass("selected");
                }
            }
        });
    }
}

function newTab(form, action) {
    var old_action = document.getElementsByName(form)[0].action;
    document.getElementsByName(form)[0].action = action;
    document.getElementsByName(form)[0].target = '_blank';
    document.getElementsByName(form)[0].submit();
    document.getElementsByName(form)[0].target = '';
    document.getElementsByName(form)[0].action = old_action;
}

function goToAction(form, action) {
    $('#loading, #overlay').show();
    //   $(".divp-list").remove();
    document.getElementsByName(form)[0].action = action;
    setTimeout(function() {
        document.getElementsByName(form)[0].submit();
    }, 20);
}

function exportSelected(form, action, name) {
    var chk = document.getElementsByName('chk_' + name + '_all');
    var f = false;
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            f = true;
            break;
        }
    }
    if (!f) {
        alert(textSubmitNotSel);
        return;
    }

    for (var i = 0; i < chk.length; i++) {
        if (!chk[i].checked) {
            var id = chk[i].id.split('_');
            id = id[id.length - 1];
            if (document.getElementById('h_' + name + '_' + id)) {
                document.getElementById('h_' + name + '_' + id).value = '';
            }
        }
    }
    var old_action = document.getElementsByName(form)[0].action;
    document.getElementsByName(form)[0].action = action;
    document.getElementsByName(form)[0].target = '_blank';
    document.getElementsByName(form)[0].submit();
    document.getElementsByName(form)[0].target = '';
    document.getElementsByName(form)[0].action = old_action;
}

function exportSelected_in(form, action, name,total) {
    var chk = document.getElementsByName('chk_' + name + '_all');
    var f = false;
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            f = true;
            break;
        }
    }
    if (!f && total>0) {
        alert(textSubmitNotSel);
        return;
    }

    for (var i = 0; i < chk.length; i++) {
        if (!chk[i].checked) {
            var id = chk[i].id.split('_');
            id = id[id.length - 1];
            if (document.getElementById('h_' + name + '_' + id)) {
                document.getElementById('h_' + name + '_' + id).value = '';
            }
        }
    }
    var old_action = document.getElementsByName(form)[0].action;
    document.getElementsByName(form)[0].action = action;
    document.getElementsByName(form)[0].target = '_blank';
    document.getElementsByName(form)[0].submit();
    document.getElementsByName(form)[0].target = '';
    document.getElementsByName(form)[0].action = old_action;
}

function checkFileSize(obj) {
    var max_size = $(obj).attr('max_file_size');
    if (obj.files[0].size > max_size) {
        alert('Kích thước tập tin quá lớn.');
        obj.value = '';
        $(obj).click();
    }
    else {
        //alert(obj.files[0].name);
        // ththanh - 28/06/2016
        // Ket hop check file name        
        if (obj.files[0].name.match(/^[A-Z]:(\\[^\\*?:\/]+)*\\[^\\*?:\/.]+\.[^\\*?:\/.]+$/)) {
            alert('Tên tập tin không hợp lệ.');
            obj.value = '';
            $(obj).click();
        }
        else if (obj.files[0].name.indexOf("'") != -1) {
            alert('Tên tập tin không được chứa dấu \'');
            obj.value = '';
            $(obj).click();
        }
    }
    
}

function checkDate(str) {
    var str = str.split('-');
    if (str.length != 3) {
        return false;
    }
    if (isNaN(str[0]) || isNaN(str[1]) || isNaN(str[2])) {
        return false;
    }
    var dt = new Date(str[1] + "/" + str[0] + "/" + str[2]);

    if (dt.getDate() != str[0]){
        return false;
    } else if (dt.getMonth() != str[1] - 1){
        //this is for the purpose JavaScript starts the month from 0
        return false;
    } else if (dt.getFullYear() != str[2]){
        return false;
    }

    return true;
}

function chuyenNHHK(obj,name){
    // var name = ($(obj).attr("name"));
    var val = ($(obj).val());
    if(name =='dsnamhoc' &&val!='' ){
        $.ajax({
//            url: "index.php",
            url: root_url + "/index.php",
            data: "rt=ajax/chuyennamhochocky&namhoc=" +val+"&hocky=''" ,
            success: function(rXML){
                if (!rXML) {
                    alert("Failed to connect.");
                }
            }
        });
    }
    if(name =='dshocky' &&val!=''){
        $.ajax({
//            url: "index.php",
            url: root_url + "/index.php",
            data: "rt=ajax/chuyennamhochocky&namhoc=" +''+"&hocky="+val ,
            success: function(rXML){
                if (!rXML) {
                    alert("Failed to connect.");
                }
            }
        });
    }
}

function showLookup(obj, key, where, offset, nhhkThaoTac = null) {
    sys_lookup_desc = obj;
    sys_lookup_key = key;
    sys_lookup_where = where;
    sys_lookup_nhhkThaoTac = nhhkThaoTac;
    if ($('#txt_' + sys_lookup_desc).is(':disabled') || $('#txt_' + sys_lookup_desc).attr('readonly') 
            || $('#cmbc_' + sys_lookup_desc).attr('readonly') || $('#cmbc_' + sys_lookup_desc).attr('disabled') ) {
        alert(textNotSearch);
        return;
    }
    $('#txt_' + sys_lookup_desc).focus();
    document.getElementById('txt_lookup_value').value = "";
//    var wheres = '';
    strwhere = '';
    if(where != null && where != ''){
        if(where.toString().indexOf("||") <= 0) {
            var arr = where.toString().split("/");
            strwhere = '';
            var arr_id = new Array();
            for(var i=0;i<arr.length;i++){
                if (i === (arr.length - 1)) {
                    strwhere = arr[i]+ "=" + arr_id.join("and"+__SEP_VAL+"and");
                } else {
                    var wheres = arr[i];
                    var types = wheres.toString().substr(wheres.toString().indexOf("_"), wheres.toString().length - wheres.toString().indexOf("_"));
                    var object_tam = document.getElementById('h'+types);
                    if (object_tam) {
                        var wheres = (object_tam.value) + types;
                        arr_id[i] = $("#"+wheres).val();
                    } else {
                        arr_id[i] = $("#"+arr[i]).val();
                    }
                }
            }
        } else {
            strwhere = '';
            var options = where.toString().split("||");
            for(var j=0; j<options.length; j++){
                var arr = options[j].toString().split("/");
                var str = arr[0];
                var input = str.toString().substr(str.toString().indexOf("_"), str.toString().length - str.toString().indexOf("_"));
                var obj_tmp = document.getElementById('h'+input);
                if (obj_tmp) {
                    var obj = (obj_tmp.value) + input;
                    var val = $("#"+obj).val();
                } else {
                    var val = $("#"+str).val();
                }

                if(val !== "") {
                    strwhere = arr[1] + '=' + val;
                    break;
                }
            }
        }// end if(where.toString().indexOf("||") == 0)

//        alert(strwhere);
//        wheres = where.toString().substr(0, where.toString().indexOf("/"));
//        types = wheres.toString().substr(wheres.toString().indexOf("_"), wheres.toString().length - wheres.toString().indexOf("_"));
//        var object_tam = document.getElementById('h'+types);
//        if(object_tam){
//
//            wheres = (object_tam.value) + types;
//            var wheres_val = document.getElementById(wheres).value;
//            wheres = where.toString().substr(where.toString().indexOf("/") + 1,where.toString().length - where.toString().indexOf("/"));
//            strwhere = wheres + '=' +wheres_val;
//
//        }else{
//            var wheres_val = document.getElementById(wheres).value;
//            wheres = where.toString().substr(where.toString().indexOf("/") + 1,where.toString().length - where.toString().indexOf("/"));
//            strwhere = wheres + '=' +wheres_val;
//        }

    }
    $.ajax({
        type: "GET",
        url: root_url + "/index.php",
        data: "rt=ajax/public_lookup&key=" + key + "&value="+"&where="+ strwhere +"&obj="+obj+"&offsets="+offset+"&where_string="+sys_lookup_where+"&nhhkThaoTac="+nhhkThaoTac,
        success: function(rXML){
            if (!rXML) {
                alert("Failed to connect.");
            }
            document.getElementById('tb_additional').innerHTML = $(rXML).find('addsearch').text();
            document.getElementById('lb_lookup_title').innerHTML = $(rXML).find('title').text();
            document.getElementById('div_lookup').innerHTML = $(rXML).find('data').text();

            showModal('dlg_frmLookup');

            // thêm xử lý khi chọn dòng trong lookup (hiện tại phải kéo qua kéo lại bảng dữ liệu mới thấy giá trị và nút chọn), nếu không thích thay đổi, có thể xóa                                    
            $("#div_lookup tr").each(function(){                        
                $(this).click(function(){

                    if($(this).find("input[type=radio]").length > 0) {                        
                        var str = $(this).find("input[type=radio]").attr("id").split("_");
                        selectLookup(str.pop());
                    }
                });

            });                                                 
            
        }
    });
}

//--pqbao 09-07-2013, xem tiep danh sach.
function showNextLookup(obj, key, where, offset,nhhkThaoTac = null) {
    sys_lookup_desc = obj;
    sys_lookup_key = key;
    sys_lookup_where = where;
    sys_lookup_nhhkThaoTac = nhhkThaoTac;
    if ($('#txt_' + sys_lookup_desc).is(':disabled') || $('#txt_' + sys_lookup_desc).attr('readonly')) {
        alert(textNotSearch);
        return;
    }
    $('#txt_' + sys_lookup_desc).focus();
    var valuesearch = document.getElementById('txt_lookup_value').value;
    var wheres = '';
    strwhere = '';
    if(where != null && where != ''){

        wheres = where.toString().substr(0, where.toString().indexOf("/"));
        types = wheres.toString().substr(wheres.toString().indexOf("_"), wheres.toString().length - wheres.toString().indexOf("_"));
        var object_tam = document.getElementById('h'+types);
        if(object_tam){

            wheres = (object_tam.value) + types;
            var wheres_val = document.getElementById(wheres).value;
            wheres = where.toString().substr(where.toString().indexOf("/") + 1,where.toString().length - where.toString().indexOf("/"));
            strwhere = wheres + '=' +wheres_val;

        }else{
            var wheres_val = document.getElementById(wheres).value;
            wheres = where.toString().substr(where.toString().indexOf("/") + 1,where.toString().length - where.toString().indexOf("/"));
            strwhere = wheres + '=' +wheres_val;
        }

    }
    $.ajax({
        type: "GET",
//        url: "index.php",
        url: root_url + "/index.php",
        data: "rt=ajax/public_lookup&key=" + key + "&value="+valuesearch+"&where="+ strwhere +"&obj="+obj+"&offsets="+offset+"&where_string="+sys_lookup_where+"&nhhkThaoTac="+nhhkThaoTac,
        success: function(rXML){
            if (!rXML) {
                alert("Failed to connect.");
            }
            document.getElementById('lb_lookup_title').innerHTML = $(rXML).find('title').text();
            document.getElementById('div_lookup').innerHTML = $(rXML).find('data').text();

            showModal('dlg_frmLookup');
            
            $("#div_lookup tr").each(function(){                        
                $(this).click(function(){

                    if($(this).find("input[type=radio]").length > 0) {                        
                        var str = $(this).find("input[type=radio]").attr("id").split("_");
                        selectLookup(str.pop());
                    }
                });

            });    
        }
    });
}

function getLookup() {
    $('#dlg_frmLookup').hide();
    showLoading();
    //---pqbao cap nhat khi tim thi tim trong pham vi all.

    //---strwhere = ''; tim trong pham vi da dinh truoc.

    //--end, neu tim trong pham vi theo strwhere thi bo doan nay.
    //lay danh sach cac cot add them trong lookup
    var stringAddLookup = "";
    var dsInputName = "";
    if (typeof($("#h_frmAddSrLookup").val()) != "undefined") {
        var dsSrBosung = $("#h_frmAddSrLookup").val().split("||~||");    
        for (var i = 0; i < dsSrBosung.length; i++) {
            // duyet qua moi phan them dieu kien loc
            var ctrlSearch = dsSrBosung[i].split(__SEP_VAL);
            var type = $("#h_" + ctrlSearch[0]).val();
            if (type == undefined) {
                type = ctrlSearch[1];
            } else {
                type = $("#h_" + ctrlSearch[0]).val();
            }
            stringAddLookup += "&" + ctrlSearch[0] + "=" + $("#" + type + "_" + ctrlSearch[0]).val();
            if (dsInputName == "") {
                dsInputName = ctrlSearch[0];
            } else {
                dsInputName += __SEP_VAL + ctrlSearch[0];
            }
        }
    }
    stringAddLookup += "&listinputadd=" + dsInputName;
    //
    $.ajax({
        type: "GET",
//        url: "index.php",
        url: root_url + "/index.php",
        data: "rt=ajax/public_lookup&key=" + sys_lookup_key + "&value=" + encodeURIComponent(document.getElementById('txt_lookup_value').value)+"&where="+strwhere+"&obj="+sys_lookup_desc+"&offsets=0&where_string="+sys_lookup_where+stringAddLookup+"&nhhkThaoTac="+sys_lookup_nhhkThaoTac,
        success: function(rXML){
            if (!rXML) {
                alert("Failed to connect.");
            }
            $('#loading').hide();
            document.getElementById('div_lookup').innerHTML = $(rXML).find('data').text();

            showModal('dlg_frmLookup');
        }
    });
}

function selectLookup(ind) {
    
    hideModal('dlg_frmLookup');
    
    $('#txt_' + sys_lookup_desc).val($('#h_lst_lookup_' + ind).val());
    $('#cmb_' + sys_lookup_desc).val($('#h_lst_lookup_' + ind).val());
    $('#cmbc_' + sys_lookup_desc).val($('#h_lst_lookup_' + ind).val());
    $('#cmba_' + sys_lookup_desc).val($('#h_lst_lookup_' + ind).val());


    $('#cmb_' + sys_lookup_desc).change();
    $('#cmbc_' + sys_lookup_desc).change();
    $('#cmba_' + sys_lookup_desc).change();

    $('#txt_' + sys_lookup_desc).focus();
}

function prepareExcSort(form, name) {
    var value = $("input[name=rd_'"+name+"']:checked").val();
    $("form[name='" + form + "']").append("<input type='hidden' name='sys_exc_sorting_col' value='" + value + "'/>");
    $("form[name='" + form + "']").append("<input type='hidden' name='sys_exc_sorting_type' value='" + $('#cmb_' + name).val() + "'/>");

    var opt = $('#h_' + name).val();
    opt = opt.split(__SEP_VAL);

    if (opt[1] > 0) {
        newTab(form, opt[0]);
    } else {
        goToAction(form, opt[0]);
    }
}
function clear_form_elements(ele) {
    $(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
}

function getNamKeKhai(namhoc, hocky) {
    if(hocky == 2 || hocky == 3)
        return namhoc + 1;
    return namhoc;

}

/**
     * kiem tra la so
     */
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
     * kiem tra so nguyen >= 0
     */
function isPInt(n) {
    if (!isNumber(n)) return false;
    if (n <= 0 || n % 1 != 0) return false;
    return true;
}
//ham chi cho nhap so tu nhien
//alow number >= 0
function allow_numeric(obj,allowFloat){
    if (typeof(allowFloat) !== 'undefined') {
        if (!/^\d+(\.\d*)?$/.test(obj.value)){
            obj.value= theVal = obj.value.replace(/[^0-9.]/g,'');
            if(theVal>""){
                obj.value=parseFloat("0"+theVal);
                obj.focus()
            }
        }
    }else{
        if (!/^\d+(\d*)?$/.test(obj.value)){
            obj.value= theVal = obj.value.replace(/[^0-9]/g,'');
            if(theVal>""){
                obj.value=parseFloat("0"+theVal);
                obj.focus()
            }
        }

    }
}
function format_money(id){
    $('#'+ id).formatCurrency({
        colorize: false,
        negativeFormat: '-%s%n',
        roundToDecimalPlace: 0
    });
    $('#'+ id).blur(function() {
        $('#'+ id).formatCurrency({
            colorize: false,
            negativeFormat: '-%s%n',
            roundToDecimalPlace: 0
        });
    }).keyup(function(e) {
        var e = window.event || e;
        var keyUnicode = e.charCode || e.keyCode;
        if (e !== undefined) {
            switch (keyUnicode) {
                case 16:
                    break; // Shift
                case 17:
                    break; // Ctrl
                case 18:
                    break; // Alt
                case 27:
                    this.value = '';
                    break; // Esc: clear entry
                case 35:
                    break; // End
                case 36:
                    break; // Home
                case 37:
                    break; // cursor left
                case 38:
                    break; // cursor up
                case 39:
                    break; // cursor right
                case 40:
                    break; // cursor down
                case 78:
                    break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
                case 110:
                    break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
                case 190:
                    break; // .
                default:
                    $(this).formatCurrency({
                    colorize: false,
                    negativeFormat: '-%s%n',
                    roundToDecimalPlace: -1,
                    eventOnDecimalsEntered: true
                });
            }
        }
    });
}
//kiem tra chuoi la email
function checkEmail(text) {
    if(text==""){
        return true;//cho phep khong kiem tra ky tu rong
    }
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(text);
}
//thong bao
function show_message(message){
    alert(message);
}
function show_multiselect(selector){
    url = document.URL;
    if(url.indexOf('xuatban', 0)>0){
        //$(selector).parent().append("<span class='notes-input-search'>Nhấn Ctrl để chọn nhiều dòng </span>");
         $(selector).multiselect({
            selectedText: textSel+" #/#",
            header: true,
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:400
        });
    }else if(url.indexOf('doanvien', 0)>0){
        $("#"+ selector).multiselect({
            selectedText: textSel+" #/#",
            header:false,
            classes: 'mutiselect-css',
            noneSelectedText:'--- '+textAll+' ---',
            minWidth:120
        });
    } else if(url.indexOf('hocphisinhvien', 0)>0){
        $("#"+ selector).multiselect({
            selectedText: textSel+" #/#",
            header:false,
            classes: 'mutiselect-css',
            noneSelectedText:'--- '+textAll+' ---',
            minWidth:120
        });
    } else if(url.indexOf('tochucthi', 0)>0){
        $("#"+ selector).multiselect({
            selectedText: textSel+" #/#",
            header: true,
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:120
        });
    } else if(url.indexOf('thuhocphi', 0)>0){
        $("#"+ selector).multiselect({
            selectedText: textSel+" #/#",
            header: true,
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:120
        });
    }else if(url.indexOf('tuyensinh', 0)>0){
        $("#"+ selector).multiselect({
            selectedText: textSel+" #/#",
            header: true,
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:120
        });
    }else if(url.indexOf('khoiluongcongtac', 0)>0){
        //$(selector).parent().append("<span class='notes-input-search'>Nhấn Ctrl để chọn nhiều dòng </span>");
         $(selector).multiselect({
            selectedText: textSel+" #/#",
            header: true,
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:200
        });
    }
    else if(url.indexOf('hoptacquocte', 0)>0){
        
        //$(selector).parent().append("<span class='notes-input-search'>Nhấn Ctrl để chọn nhiều dòng </span>");
         $(selector).multiselect({            
            selectedText: textSel+" #/#",
            header: "<input style='width:157%' id='id_search_" + selector.replace('#', '') + "' type='text' class='search-input' autocomplete='off' placeholder='Tìm kiếm...'>",
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:172
        });
        
        selector = selector.replace('#', '');                
        $('input#id_search_' + selector).quicksearch('ul.' + selector + ' li');
    }
    else{
         $(selector).multiselect({
            selectedText: textSel+" #/#",
            header: true,
            classes: 'mutiselect-css',
            noneSelectedText:'- '+textPleSel+' -',
            checkAllText: textAll,
            uncheckAllText: textDeDel,
            minWidth:120
        });
    }



}

/**
 * Gỡ bỏ 1 phần tử ra khỏi mảng
 *
 * @param {type} value
 * @returns {Boolean|Array.prototype@call;splice}
 */
Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
}

function checkIfIncluded(file) {
    var links = document.getElementsByTagName("link");
    for(var i = 0; i < links.length; i++) {
        if (links[i].href.substr(-file.length) == file)
            return true;
    }

    var scripts = document.getElementsByTagName("script");
    for(var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.substr(-file.length) == file)
            return true;
    }

    return false;
}

function checkFile(fieldObj)
    {
        var FileName  = fieldObj.value;
        FileName = FileName.substr(FileName.lastIndexOf('\\')+1);
        var FileExt = FileName.substr(FileName.lastIndexOf('.')+1);
        var FileSize = fieldObj.files[0].size;

        var listNameFileExit = 'f';
        arrFileName = listNameFileExit.split(',');

        var allowExtensions = 'f';
        arrExt = allowExtensions.split(',');
        var maxSize = 10*1024*1024;
        //---check exit file
        if(arrFileName.indexOf(FileName) > 0){

            return false;
        }

        //---check allowExtensions
        if( arrExt.indexOf(FileExt) <= 0 ){

            return false;
        }

        //---check maxSize
        if( FileSize > maxSize){

            return false;
        }

        return true;
    }
    /**
     * nvdo - hàm trả về chuỗi ngày tháng năm hiện tại
     * ex: 02-02-1990
     */
    function getCurrentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        today = dd+'-'+mm+'-'+yyyy;
        return today;
    }