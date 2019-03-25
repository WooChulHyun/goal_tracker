var num = 31;
$('.test_btn').click(function(){
    for(i=1; i<=num; i++ ){
    $('.total_stamp').append('<div class="stamp_container '+i+'">' + '<p class="number">'+ i +'</p>' +
    '<img class="stamp" src="/sun.png" alt="">' 
    + '</div>');
    }

    $('.stamp_container').click(function(){
        if($(this).find('.stamp').hasClass('stamp_click')){
            $(this).find('.stamp').removeClass('stamp_click');
        }else{
            $(this).find('.stamp').addClass('stamp_click');
        }
    });
});

var count = 0;

$(function() {
   $("#btn_sub1").click(function() {
       var storage_key = $("#goals").val();
       for (var i = 0; i <= localStorage.length; i++) {
           if (localStorage.key(i) === storage_key) {
               alert("같은 이름의 목표가 있습니다.");
               return false;
           }
       }

       var content = {};
       content["goals"] = $("#goals").val();
       content["rewards"] = $("#rewards").val();
       content["numbs"] = $("#numbs").val();
       content["months"] = $("#months").val();
       console.log(content);
       var content_string = JSON.stringify(content);

       form_content = decodeURIComponent(content_string);
       localStorage.setItem(storage_key, form_content);

       var content_string_load = localStorage.getItem(storage_key);
       var content_dict = JSON.parse(content_string_load);
       for (var key in content_dict) {
           if (content_dict[key] === "") {
               delete content_dict[key];
           }
       }
       console.log(content_dict);
   });
});
