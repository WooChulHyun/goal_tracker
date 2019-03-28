//새로고침 시 자동으로 로드 할 정보
// $(document).ready(function() {
//     color_load();
// });

var find_image = function(localStorage_key) {
    var image = [];
    for (var i = 1; i <= content_dict.numbs; i++) {
        // 스탬프 찍혀있는 네모 개수 세기 - 이미지 찾음
        if (
            $("." + i)
                .children("img")
                .hasClass("stamp_click")
        ) {
            image.push(i);
        }
        // 찾은 이미지의 번호들을 로컬에 저장
    }

    var content_string_load = localStorage.getItem(localStorage_key);
    content_dict = JSON.parse(content_string_load);
    content_dict["image"] = image;
    content_dict["imageName"] = $(".stamp").attr("src");
    var content_string = JSON.stringify(content_dict);
    localStorage.setItem(localStorage_key, content_string);
};

// 이미지 경로 저장 완료
var ab = function() {
    var stamp_save = $(".stamp").attr("src");
    console.log(stamp_save);
    var localStorage_key = $("#mygoal").text();
    var content_string_load = localStorage.getItem(localStorage_key);
    content_dict = JSON.parse(content_string_load);
    content_dict["imageName"] = stamp_save;
    var content_string = JSON.stringify(content_dict);
    localStorage.setItem(localStorage_key, content_string);
};

//form 구현
// listBtnClick 시작
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
                find_image(localStorage_key);
            } else {
                $(this)
                    .find(".stamp")
                    .addClass("stamp_click");
                find_image(localStorage_key);
            }
        });
        // stamp 저장, 리스트 클릭시 로드
        // console.log(content_dict.image);
        for (i = 0; i < content_dict.image.length; i++) {
            // console.log(i);
            c = content_dict.image[i];
            $("." + c)
                .children("img")
                .addClass("stamp_click");
        }

        $(".stamp").attr("src", content_dict.imageName);

        $("#mygoal").html(content_dict.goals);
        $("#myreward").html(content_dict.rewards);

        // 성취도 그래프
        var a = $(".stamp_container").length;
        $("progress").replaceWith(
            '<progress value="0" max="' + a + '"></progress>'
        );
        //$(document).on("click", ".stamp_container", function() {
        var b = $(".stamp_click").length;
        $("progress").replaceWith(
            '<progress value="' + b + '"max="' + a + '"></progress>'
        );
        //});
        $(document).on("click", ".stamp_container", function() {
            var b = $(".stamp_click").length;
            $("progress").replaceWith(
                '<progress value="' + b + '"max="' + a + '"></progress>'
            );
        });
    });
}
// listBtnClick 끝

function closebtn() {
    self.close();
}

$(".form").submit(function(e) {
    e.preventDefault();
});
// pop 제출 시 알림
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

        // $(document).on("click",".btn-size",function(){

        var x = document.getElementsByClassName("grid_sections2")[0].id;
        console.log(x);
        var content = {};
        content["goals"] = $("#goals").val();
        content["rewards"] = $("#rewards").val();
        content["numbs"] = $("#numbs").val();
        content["color"] = x;
        content["image"] = [];
        content["imageName"] = "";

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

        $list.append($elem);
        listBtnClick();

        // 스탬프 container 추가
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
            console.log("asd");
            if (
                $(this)
                    .find(".stamp")
                    .hasClass("stamp_click")
            ) {
                $(this)
                    .find(".stamp")
                    .removeClass("stamp_click");
                find_image(content_dict.goals);
            } else {
                $(this)
                    .find(".stamp")
                    .addClass("stamp_click");
                find_image(content_dict.goals);
            }
            // console.log(
            //     $(".1")
            //         .children("img")
            //         .hasClass("stamp_click")
            //);
            // 이미지 찾는 변수 저장
        });
    }
    location.reload();
});

$(".btn-danger").click(function() {
    var localStorage_key = $("#mygoal").text();
    if (confirm("정말 삭제합니까?")) {
        localStorage.removeItem(localStorage_key);
        location.reload();
        alert("삭제했습니다");
    } else {
        // 취소 버튼 클릭 시 동작
        alert("동작을 취소했습니다.");
    }
});

$(".btn-danger").click(function() {
    var localStorage_key = $("#mygoal").text();
    if (confirm("정말 삭제합니까?")) {
        localStorage.removeItem(localStorage_key);
        location.reload();
        alert("삭제했습니다");
    } else {
        // 취소 버튼 클릭 시 동작
        alert("동작을 취소했습니다.");
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

// $(".stamp").attr("src", content_dict.imageName);

// 이미지 url 가져오기

//변수 a에 이미지의 경로 담기
// var ab = function (){
// var a = $('.stamp').attr('src');
// console.log(a);
// }
//로컬에 a 값을 담기

// 넣었던 수에 클래스 넣기
//b = [1, 2, 3, 7];
//console.log(b);
//for (i = 0; i < b.length; i++) {
//    console.log(i);
//    c = b[i];
//    console.log(b[i]);
//    console.log(c);
//    console.log($(".1"));
//    $("." + c)
//        .children("img")
//        .addClass("stamp_click");
//}
