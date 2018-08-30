function configuration(){
	$(".serach").toggle();
}
//$(".nav>li").click(function(){
//	$(this).addClass("active").siblings().removeClass("active");
//})

var countries = [{ value: 'www' }];
$('.btnquery').autocomplete({
    lookup: countries,
    onSelect: function (suggestion) {
//      alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});

$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
var Referer,Agent;
var conHTML;

$('#editable-select').editableSelect({
	effects: 'slide',
	onSelect: function (element) {
		Referer = $(".selectval1").val();
   }
});
$('#editable-select2').editableSelect({
	onSelect: function (element) {
		Agent = $(".selectval2").val();
   }
});
$(".selectval2").click(function(){
	$('.es-list:eq(1)').css("display","block");
   	$('li').siblings().css("display","block");
});

function selectval1(){
	Referer = $(".selectval1").val();
};
function selectval2(){
	$('li.selected').siblings().css("display","block");
	Agent = $(".selectval2").val();
};
function webQuery(){
	
	var btn = $(".btnquery").val();
    countries[0].value=$(".btnquery").val();
	if(btn){
		if(btn.indexOf("http")==-1){
			btn = "http://"+btn;
		}
		$("#myframe").attr("src",btn);
    	$.ajax({
		  type: 'GET',
		  url: 'http://monitor.yunsee.vuln.cn/getHtml?url='+btn,
		  data:{'Referer':Referer,'User-Agent':Agent},
		  cache: false,
		  dataType:'json',
		  beforeSend:function (){  
                $('#myModal').modal('show');  
            }, 
		  success: function(html,xml,m){
		  	$('#myModal').modal('hide');
		  	$(".main2").show();
		  	$(".alert-info").hide();
		  var d = HTMLEncode(html.html);
			var ht = html.header;
			var str="<ol>";
			var index = 0;
		 for(var key in ht){
		 	index++;
		 	str+= `
		 		<li>${key}:<span> ${ht[key]}</span></li>
		 	`;

			}
		  str+="</ol>";
		  $("#tab3>p").html("");
		  $("#tab3>p").append(str);
		  var reg = /\n(\n)*( )*(\n)*\n/g;
		  $("#tab1 pre>code").html("");
		  $("#tab1 pre>code").append(d.replace(reg,"\n"));
			$('pre code').each(function(i, block) {
			    hljs.highlightBlock(block);
			    $(this).html("<ol><li>" + $(this).html().replace(/\n/g,"\n</li><li>") +"\n</li></ol>");
			});
		  },
		  error: function (XMLHttpRequest) {
		  	$('#myModal').modal('hide');
		  	$(".main2").hide();
		       $(".alert-warning").show();
				window.setTimeout(function(){
				    $(".alert-warning").hide();
				},2000);
		    }
		});
    }else{
    	$(".alert").show();
			window.setTimeout(function(){
			    $(".alert-warning").hide();
			},2000);
    }
	
	

//var ajax= new XMLHttpRequest();
//ajax.open("GET",'http://monitor.yunsee.vuln.cn/getHtml?url='+btn);
//ajax.setRequestHeader('Authorization','APPCODE eef1833dbc5748cc86a6419ea0f92d9a');
//ajax.setRequestHeader("Content-Type","multipart/form-data/")
//ajax.send();
//ajax.onreadystatechange = function () {
//	if(ajax.readyState==4 && ajax.status == 200){
//		var txt=ajax.responseText;
//		var header=ajax.getAllResponseHeaders();
//		$("#tab3>p").text(header);
//		var d = HTMLEncode(ajax.responseText);
//	  $("pre>code").text(HTMLDecode(d));
//	  var _hmt = _hmt || [];
//	  var hm = document.createElement("script");
//	  hm.src = 'js/prism.js?ver='+Math.random();
//	  var s = document.getElementsByTagName("script")[0]; 
//	  s.parentNode.insertBefore(hm, s);
//	}
//}
	
	function HTMLEncode(html) {
		var temp = document.createElement("div");
		(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
		}
	function HTMLDecode(text) { 
		var temp = document.createElement("div"); 
		temp.innerHTML = text; 
		var output = temp.innerText || temp.textContent; 
		temp = null; 
		return output; 
		} 
var topIndex = 0;
$("#btn").click(function() {
	
	topIndex++;
    var $keyword = $("#keyword").val();
    setHeightKeyWord($keyword,topIndex);
//  $('#some-code').animate({scrollTop: $('#abc').offset().top}, 1000)
//console.log($("#abc").offset().top);
//console.log($("html body").scrollTop());
var offsetTop = ($("#abc"+topIndex).offset().top-500);
    $("pre").animate({scrollTop:offsetTop }, {duration: 500,easing: "swing"});
//  $("#abc").scrollIntoView();
});
function setHeightKeyWord(keyword,topIndex) {
    /* 获取需要处理的关键字 */
   
    var tempHTML = $("#tab1 pre>code").html();
    /* 关键字替换文本 该文本设置有高亮颜色 */
    var replaceText = `<font id="abc${topIndex}" style='background:red;'>$1</font>`;
    /* 关键字正则匹配规则 */
    var r = new RegExp("(" + keyword + ")", "ig");
    /* 将匹配到的关键字替换成我们预设的文本 */
    tempHTML = tempHTML.replace(r, replaceText);
    /* 将文本显示到浏览器上 */
    $("#tab1 pre>code").html(tempHTML);
}
}
$(function(){
    document.onkeydown=keyDownSearch;
    function keyDownSearch(e) {
        // 兼容FF和IE和Opera
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            $('#webQuery').click();
            return false;
        }
        return true;
    }
});
