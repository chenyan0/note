$(function () {
    var add=$(".add");
    var form=$("form");
    var formclose=$("#close");
    var flag=true;
    add.click(function () {
        if(flag){
            form.attr({"data-a":"animate-slidedown"}).css({display:"block"});
            $(".list:gt(0)").css({display:"none"});
            flag=false;
        }else{
            form.attr({"data-a":"animate-slideup"});

            flag=true;
        }
    });
    formclose.click(function(){
        form.attr({"data-a":"animate-slideup"});
        flag=true;
    });
    var str;

    $(".submitbtn").click(function(){
         var textv=$(":text").val();
         var conv=$("textarea").val();
         var timev=$("#time").val();
        //    表单的验证
        if(textv==""){
            alert("标题不能为空");
            return;
        }
        if(conv==""){
            alert("内容不能为空");
            return;
        }
        if(timev==""){
            alert("时间不能为空");
            return;
        }
        //存储数据
        var obj={title:textv,content:conv,time:timev,id:new Date().getTime()};
        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);
        oldv.push(obj);
        str=JSON.stringify(oldv);
        localStorage.message=str;

        $(":text").val("");
        $("textarea").val("");
        $("#time").val("");

        //显示数据

        var copy=$(".news").eq(0).clone().appendTo("body").fadeIn(100).css(
            {left:($(window).width()-$(".news").outerWidth())*Math.random(),
            top:($(window).height()-$(".news").outerHeight())*Math.random()}).attr("id",obj.id).attr("data-a","animate-sd");
        copy.find(".title-text").html(textv);
        copy.find(".con-text").html(conv);
        copy.find(".time-text").html(timev);

        //var listcopy=$(".list").eq(0).clone().appendTo("body").fadeIn(100).css({display:"none"}).attr("id",obj.id);
        //listcopy.find(".panel-title").html("标题:"+textv);
        //listcopy.find(".glyphicon").html("内容:"+conv);
    });
    ////切换便签显示
    // console.log(localStorage.message);
    var showLabel=function(){
        var dataArr=localStorage.message==null?[]:JSON.parse(localStorage.message);
        for(var i=0;i<dataArr.length;i++){
            var copy=$(".news").eq(0).clone().appendTo("body").fadeIn(100).css({display:"block",left:($(window).width()-$(".news").outerWidth())*Math.random(),top:($(window).height()-$(".news").outerHeight())*Math.random()}).attr("id",dataArr[i].id);
            copy.find(".title-text").html(dataArr[i].title);
            copy.find(".con-text").html(dataArr[i].content);
            copy.find(".time-text").html(dataArr[i].time);

        }
    }
    showLabel();
    //$(".btn-label").click(function(e){
    //    $(".news:gt(0)").css({display:"block"});
    //    $(".list").css({display:"none"});
    //    e.stopPropagation();
    //});
    ////切换列表显示
    //var showList=function(){
    //    var dataArr=localStorage.message==null?[]:JSON.parse(localStorage.message);
    //    for(var i=0;i<dataArr.length;i++){
    //    var listcopy=$(".list").eq(0).clone().appendTo("body").fadeIn(100).css({display:"block"}).attr("id",dataArr[i].id);
    //        listcopy.find(".panel-title").html("标题:"+dataArr[i].title);
    //        listcopy.find(".glyphicon").html("内容:"+dataArr[i].content);
    //    }
    //}
    //showList();
    //$(".btn-list").click(function(e){
    //    var dataArr=JSON.parse(localStorage.message);
    //    $(".list:gt(0)").css("display","block");
    //    $(".news").css({display:"none"});
    //    e.stopPropagation();
    //});

//    标签列表拖拽
    $(document).on("mousedown",function(e){
        var clientX=$(window).width();
        var clientY=$(window).height();
        var ox= e.offsetX;
        var oy= e.offsetY;
        var maxX= clientX-$(e.target).width();
        var maxY=clientY-$(e.target).height();
        console.log(ox,oy);
        e.stopPropagation();
        $(document).on("mousemove",function(e){

            var cx= e.clientX;
            var cy= e.clientY;
            console.log(e.clientX, e.clientY);
            if(cx-ox<=-20||cy-oy<0||cx-ox>maxX-110||cy-oy>maxY-110){
                return;
            }
            var target= e.target;
            $(target).trigger("drag",{ox:ox,oy:oy,cx:cx,cy:cy});
        });
        $(document).on("mouseup",function(){
            $(document).off("mousemove");
            $(document).off("mouseup");

        });
    });

    $(document).delegate(".news","drag",function(e,data){
        $(this).css({
            left:data.cx-data.ox,
            top:data.cy-data.oy
        });
    });
    $(document).delegate(".news","mousedown", function (e) {
        $(".news").css({zIndex:0});
        $(this).css({zIndex:1});
        e.preventDefault();
    });
    //删除标签--------------
    $(document).delegate(".del","click", function () {
        var id=$(this).parent().attr("id");
        var arr=JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(id=arr[i].id){
                $(this).parent().remove();
                console.log(localStorage.message);
                arr.splice(i,1);
                localStorage.message=JSON.stringify(arr);
                break;
            }
        }
    })


});