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


