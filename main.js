//새로고침 시 자동으로 로드 할 정보
$(document).ready(function() {
    color_load();
});

//form 구현
function listBtnClick() {
    $(".itemList").click(function() {
        var class_names = $(this).attr("class");
        var target_class = class_names.substr(
            class_names.indexOf("num_of_items")
        );
        var localStorage_key = $("." + target_class)
            .find(".item-name")
            .text();

        var content_string_load = localStorage.getItem(localStorage_key);
        content_dict = JSON.parse(content_string_load);
        for (var key in content_dict) {
            if (content_dict[key] === "") {
                delete content_dict[key];
            }
        }
        document.getElementsByClassName("grid_sections2")[0].id =
            content_dict["color"];
        console.log(content_dict);
        console.log(typeof content_dict);
        var $list1 = $(".total_stamp").empty();
        for (i = 1; i <= content_dict.numbs; i++) {
            $(".total_stamp").append(
                '<div class="stamp_container ' +
                    i +
                    '">' +
                    '<p class="number">' +
                    i +
                    "</p>" +
                    '<img class="stamp" src="/sun.png" alt="">' +
                    "</div>"
            );
        }
        $(".stamp_container").click(function() {
            if (
                $(this)
                    .find(".stamp")
                    .hasClass("stamp_click")
            ) {
                $(this)
                    .find(".stamp")
                    .removeClass("stamp_click");
            } else {
                $(this)
                    .find(".stamp")
                    .addClass("stamp_click");
            }
        });
        $("#mygoal").html(content_dict.goals);
        $("#myreward").html(content_dict.rewards);
        var a = $(".stamp_container").length;
        $("progress").replaceWith(
            '<progress value="0" max="' + a + '"></progress>'
        );
        console.log(a);
        $(document).on("click", ".stamp_container", function() {
            var b = $(".stamp_click").length;
            $("progress").replaceWith(
                '<progress value="' + b + '"max="' + a + '"></progress>'
            );
            console.log(b);
        });
    });
}

function closebtn() {
    self.close();
}

$(".form").submit(function(e) {
    e.preventDefault();
});

$(".submitbtn").click(function(e) {
    if (
        document.getElementsByTagName("input").goals.value === "" &&
        document.getElementsByTagName("input").rewards.value === ""
    ) {
        alert("목표와 리워드를 입력해주세요");
        e.preventDefault();
    } else if (document.getElementsByTagName("input").goals.value === "") {
        alert("목표를 입력해주세요");
        e.preventDefault();
    } else if (document.getElementsByTagName("input").rewards.value === "") {
        alert("리워드를 입력해주세요");
        e.preventDefault();
    } else {
        var storage_key = $("#goals").val();
        for (var i = 0; i <= localStorage.length; i++) {
            if (localStorage.key(i) === storage_key) {
                alert("같은 이름의 목표가 있습니다.");
                return false;
            }
        }

        //     //배경 색 저장
        // function color_save(){
        //     var x = document.getElementsByClassName('grid_sections2')[0].id;
        //     console.log(x);
        //     var cc_cont = {0 : x};
        //     var color_content = JSON.stringify(cc_cont)
        //     localStorage.setItem("colorinfo",color_content);
        //     return false;
        //     }

        // //배경 색 로드
        // function color_load(){

        //     var y = localStorage.getItem("colorinfo");
        //     console.log(y);
        //     var loadcolor=JSON.parse(y);
        //     console.log(loadcolor[0]);
        //     document.getElementsByClassName('grid_sections2')[0].id = loadcolor[0];

        //     }

        // $(document).on("click",".btn-size",function(){

        var x = document.getElementsByClassName("grid_sections2")[0].id;
        console.log(x);
        var content = {};
        content["goals"] = $("#goals").val();
        content["rewards"] = $("#rewards").val();
        content["numbs"] = $("#numbs").val();
        content["color"] = x;

        console.log(content);
        var content_string = JSON.stringify(content);

        form_content = decodeURIComponent(content_string);
        localStorage.setItem(storage_key, form_content);

        var content_string_load = localStorage.getItem(
            localStorage.key(localStorage.length - 1)
        );

        content_dict = JSON.parse(content_string_load);
        for (var key in content_dict) {
            if (content_dict[key] === "") {
                delete content_dict[key];
            }
        }

        console.log(content_dict);
        var $list = $(".goal_list");
        var $list1 = $(".total_stamp").empty();
        var $elem = $("#item-template")
            .clone()
            .removeAttr("id");

        $elem.find(".item-no").html("목표" + $(".itemList").length);
        $elem.find(".item-name").html(content_dict.goals);
        $elem.addClass("num_of_items" + $(".itemList").length);
        //$elem
        //    .find(".item-detail")
        //    .html(content_dict.numbs, content_dict.months);

        $list.append($elem);
        listBtnClick();

        for (i = 1; i <= content_dict.numbs; i++) {
            $(".total_stamp").append(
                '<div class="stamp_container ' +
                    i +
                    '">' +
                    '<p class="number">' +
                    i +
                    "</p>" +
                    '<img class="stamp" src="/sun.png" alt="">' +
                    "</div>"
            );
        }

        $(".stamp_container").click(function() {
            if (
                $(this)
                    .find(".stamp")
                    .hasClass("stamp_click")
            ) {
                $(this)
                    .find(".stamp")
                    .removeClass("stamp_click");
            } else {
                $(this)
                    .find(".stamp")
                    .addClass("stamp_click");
            }
            console.log(
                $(".1")
                    .children("img")
                    .hasClass("stamp_click")
            );
            // 이미지 찾는 변수 저장
            var b = [];
            for (var i = 1; i <= content_dict.numbs; i++) {
                // 이미지 찾음
                if (
                    $("." + i)
                        .children("img")
                        .hasClass("stamp_click")
                ) {
                    b.push(i);
                }
                // 찾은 이미지의 번호들을 로컬에 저장
            }
            console.log(b);
        });
    }
});

$("#goalbtn").click(function() {
    $("#modalbtn").click();
});

$(document).ready(function() {
    $(".mdbt").hide();
});

$(document).ready(function() {
    $(".mdbt").hide();
});

// 목표 저장

var content_dict;

// 스탬프 변수 저장

$(function() {
    for (var i = 1; i <= localStorage.length; i++) {
        var content_string_load = localStorage.getItem(localStorage.key(i - 1));
        content_dict = JSON.parse(content_string_load);
        for (var key in content_dict) {
            if (content_dict[key] === "") {
                delete content_dict[key];
            }
        }
        console.log(content_dict);
        var $list = $(".goal_list");
        var $elem = $("#item-template")
            .clone()
            .removeAttr("id");

        $elem.find(".item-no").html("목표" + $(".itemList").length);
        $elem.find(".item-name").html(content_dict.goals);
        $elem.addClass("num_of_items" + $(".itemList").length);
        //$elem
        //    .find(".item-detail")
        //    .html(content_dict.numbs, content_dict.months);

        $list.append($elem);
    }

    listBtnClick();
});

// 배경화면 색 바꾸기
$(".pink").click(function() {
    $(".grid_sections2").attr("id", "pink");
    var goalName = $(".grid_sections2")
        .find("#mygoal")
        .text();
    var title = JSON.parse(localStorage.getItem(goalName));
    console.log(title);

    localStorage.setItem(
        goalName,
        JSON.stringify({
            ...title,
            color: "pink"
        })
    );
    localStorage.removeItem("");
});

$(".green").click(function() {
    $(".grid_sections2").attr("id", "green");
    var goalName = $(".grid_sections2")
        .find("#mygoal")
        .text();
    var title = JSON.parse(localStorage.getItem(goalName));
    console.log(title);

    localStorage.setItem(
        goalName,
        JSON.stringify({
            ...title,
            color: "green"
        })
    );
    localStorage.removeItem("");
});

$(".yellow").click(function() {
    $(".grid_sections2").attr("id", "yellow");
    var goalName = $(".grid_sections2")
        .find("#mygoal")
        .text();
    var title = JSON.parse(localStorage.getItem(goalName));
    console.log(title);

    localStorage.setItem(
        goalName,
        JSON.stringify({
            ...title,
            color: "yellow"
        })
    );
    localStorage.removeItem("");
});

$(".blue").click(function() {
    $(".grid_sections2").attr("id", "blue");
    var goalName = $(".grid_sections2")
        .find("#mygoal")
        .text();
    var title = JSON.parse(localStorage.getItem(goalName));
    console.log(title);

    localStorage.setItem(
        goalName,
        JSON.stringify({
            ...title,
            color: "blue"
        })
    );
    localStorage.removeItem("");
});

// 이미지 경로 저장 test
var ab = function() {
    var stamp_save = $(".stamp").attr("src");
    console.log(stamp_save);
};

//  스탬프 바꾸기
$(".stamp_sun").click(function() {
    $(".stamp").attr("src", "/sun.png");
    ab();
});

$(".stamp_monkey").click(function() {
    $(".stamp").attr("src", "/monkey.png");
    ab();
});

$(".stamp_bear").click(function() {
    $(".stamp").attr("src", "/bear.png");
    ab();
});

$(".stamp_ducky").click(function() {
    $(".stamp").attr("src", "/ducky.png");
    ab();
});

$(".stamp_fox").click(function() {
    $(".stamp").attr("src", "/fox.png");
    ab();
});

$(".stamp_hedgehog").click(function() {
    $(".stamp").attr("src", "/hedgehog.png");
    ab();
});

// 이미지 찾음
// var b = [];
// for (var i = 1; i <= content_dict.numbs; i++) {    
    // if (
    //     $("." + i)
    //         .children("img")
    //         .hasClass("stamp_click")
    // ) {
    //     b.push(i);
    // }

    // ("." + i).hasClass('.stamp_click')
// }

//  로컬 스토리지에 이미지 저장
localStorage.setItem("img_url", a);

// 이미지 url 가져오기

//변수 a에 이미지의 경로 담기
// var ab = function (){
// var a = $('.stamp').attr('src');
// console.log(a);
// }
//로컬에 a 값을 담기


// 넣었던 수에 클래스 넣기
b = [1, 2, 3, 7];
    console.log(b);
        for(i=0; i < b.length; i++){
            console.log(i);
            c = b[i];
            console.log(b[i]);
            console.log(c);
            console.log($('.1'))
            $("." + c).children("img").addClass("stamp_click");
        };
