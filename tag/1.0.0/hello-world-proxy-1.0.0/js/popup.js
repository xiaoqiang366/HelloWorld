function handleConnect(e){e?($("#lineInfo").val().trim()?(setStorage("lineInfo",$("#lineInfo").val()),proxy.set(getStorage("lineInfo"))):getStorage("lineInfo")?($("#lineInfo").val(getStorage("lineInfo")),proxy.set(getStorage("lineInfo"))):log("error"),setStorage("state",e),$("[name='my-checkbox']").bootstrapSwitch("state",e),$("#lineInfo").prop("disabled",!0),$("#editLine").removeClass("btn-danger").addClass("btn-primary").text("Edit the Line Info")):(proxy.close(),setStorage("state",!1),$("[name='my-checkbox']").bootstrapSwitch("state",!1))}function parseLineInfo(e){var t={};try{var o=e.split(" ");return t.protocal=o[0],t.ip=o[1].split(":")[0],t.port=o[1].split(":")[1],t.state=getStorage("state")||!1,t}catch(e){return"error"}}function initURLstatus(){function e(e){t.text(e);var o="";$.get("../js/rules.json",function(n){for(var a=JSON.parse(n),l=0;l<a.length;l++)if(a[l]==e){o="sys";break}if(log("----"+o),"sys"==o)t.text("System proxy URL"),$(".icon-box .glyphicon-ban-circle").parent().show();else if(getStorage("customRules")&&getStorage("customRules").length>0){for(var i=getStorage("customRules"),r=0,l=0;l<i.length;l++)if(r=l,i[l]==e){o="cus";break}"cus"==o?($(".icon-box .glyphicon-minus-sign").parent().show(),$("#btnHandleURL").click(function(e){e.preventDefault(),i.splice(r,1),setStorage("customRules",i),handleConnect(!0),location.reload()})):($(".icon-box .glyphicon-plus-sign").parent().show(),$("#btnHandleURL").click(function(t){t.preventDefault(),i.push(e),setStorage("customRules",i),handleConnect(!0),location.reload()}))}else $(".icon-box .glyphicon-plus-sign").parent().show(),$("#btnHandleURL").click(function(t){t.preventDefault();var o=[];o.push(e),log(o),setStorage("customRules",o),handleConnect(!0),location.reload()})})}var t=$("#btnHandleURL");chrome.tabs.query({active:!0},function(o){var n=getDomain(o[0].url);0==n?(t.text("Not support operations."),$(".icon-box .glyphicon-ban-circle").parent().show(),t.button("reset")):e(n)})}var extensionId=chrome.runtime.id,proxy=new ChromeProxy,customRules=getStorage("customRules")||[];$("#lineInfo").val(getStorage("lineInfo")||""),$("[name='my-checkbox']").bootstrapSwitch("state",getStorage("state")||!1),getStorage("state")?activeIcon():grayIcon(),getStorage("debug")&&1==getStorage("debug")&&$(".debug-line").show(),$("#lineInfo").change(function(){setStorage("lineInfo",$(this).val())}),$('input[name="my-checkbox"]').on("switchChange.bootstrapSwitch",function(e,t){setStorage("state",t),log(t),handleConnect(t)}),$("#editLine").click(function(){var e=$("#lineInfo").prop("disabled");log(e),e?($("#lineInfo").prop("disabled",!1).focus(),$(this).removeClass("btn-primary").addClass("btn-danger").text("Save the Line Info"),handleConnect(!1)):($("#lineInfo").prop("disabled",!0),$(this).removeClass("btn-danger").addClass("btn-primary").text("Edit the Line Info"),handleConnect(!0))}),initURLstatus(),$("#getInfo").click(function(e){if(e.preventDefault(),getStorage("lineInfo")){var t=parseLineInfo(getStorage("lineInfo"));if("error"!=t){var o="";o+='<p class="field"><span>Status: </span>'+(1==t.state?"Connected":"Disconnected")+"</p>",o+='<p class="field"><span>Protocal: </span>'+t.protocal+"</p>",o+='<p class="field"><span>URL: </span>'+t.ip+"</p>",o+='<p class="field"><span>Port: </span>'+t.port+"</p>",$("#myModal .modal-body").html(o)}else $("#myModal .modal-body").html("Line analytical failure information, please check the line format is correct.The correct line format: <b>HTTP 127.0.0.1:80</b>, pay attention to check whether contains does not conform to the requirements of space.")}else $("#myModal .modal-body").html("No agent line information!");$("#myModal").modal()}),$("#newTab").click(function(){getStorage("debug")?openTab(location.href,!0):($("#myModal .modal-body").html("Please open the debug mode, then use this function!Open the debug mode method: about -> debug mode."),$("#myModal").modal())}),$("#getMoreLine").click(function(e){e.preventDefault();try{log(proQiong.get());for(var t=proQiong.get(),o="",n=0;n<t.length;n++)o+='<div class="line-box">',o+="<p><span>"+t[n].name+": </span><br/>"+t[n].position+"</p>",o+="</div>";$("#myModal .modal-body").html(o)}catch(e){$("#myModal .modal-body").html("Failed to get the information!")}$("#myModal").modal()}),$("#btnResetPlugin").click(function(e){e.preventDefault(),window.localStorage.clear(),proxy.close(function(){$("#myModal .modal-body").html("Reset data success!"),$("#myModal").modal(),$("#myModal").on("hidden.bs.modal",function(e){location.reload()})})}),$("#btnDisabledPlugin").click(function(e){e.preventDefault(),chrome.management.setEnabled(extensionId,!1,function(){})}),$("#btnAbout").click(function(e){e.preventDefault(),$("#myModal .modal-body").html('The program for the exchange of learning how to use only, not for commercial use!<br/><br/>Contact:<br/>QQ: <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2310005831&site=qq&menu=yes">2310005831</a><br/>Email: <a href="mailto:aoxiaoqiang@163.com?subject=The%20extension%20of%20the%20feedback&body=The%20body%20of%20the%20email" id="openEmail">aoxiaoqiang@163.com</a><br/><br/><div class="debugger"><label><input type="checkbox" '+(getStorage("debug")?'checked="checked"':"")+'id="debugMode"> Debug mode</label></div>'),$("#openEmail").click(function(e){e.preventDefault(),openTab($(this).attr("href"),!0)}),$("#debugMode").change(function(e){setStorage("debug",$(this).prop("checked")),$(this).prop("checked")?$(".debug-line").show():$(".debug-line").hide()}),$("#myModal").modal()});