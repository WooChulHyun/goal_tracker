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
        var form_content = $("#form_sub1").serialize();
        form_content = decodeURIComponent(form_content);
        localStorage.setItem(storage_key, form_content);
    });
});
