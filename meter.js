$(document).ready(function() {

    var interval = 100;
    var timer = setInterval(incrementMeter,interval);

    function incrementMeter() {
        var currentVal = $("progress").attr("value");
        $("progress").attr("value", getNext(currentVal));
        $("#current").text(function() {
            if (currentVal.length < 2) //Pad 0
                return " 0" + currentVal;
            else return " " + currentVal;
        });
    }

    function getNext(curr) {
        var num = Number(curr);
        if (num >= 99)
            return 0;
        else return num + 1;
    }

    $("#enter").click(function() {

        var nums = $("progress").attr("value");
        if (nums.length < 2) //Pad 0
            nums = "0" + nums;

        var disp = $("#display");
        var existing = disp.text();
        disp.text(existing + nums);

        var allnumbers = disp.text();

        if (allnumbers.length >= 10) {

            clearInterval(timer);
            $("#enter").attr("disabled",true);

            var fst = allnumbers.slice(0,3);
            var snd = allnumbers.slice(3,6);
            var trd = allnumbers.slice(6);
            var out = "(" + fst + ")-" + snd + "-" + trd;
            disp.text(out);

            $("#end").text("For your security, your number has been reported to the FBI");
            $("#current").text("");
        }
        else {
            clearInterval(timer);
            interval /= 2;
            $("#test").text(interval + "runnin");
            timer = setInterval(incrementMeter,interval);
        }

    });

    $("#reset").click(function() {
        clearInterval(timer);
        $("#display").text("");
        $("progress").attr("value",0);
        interval = 100;
        timer = setInterval(incrementMeter,interval);
        $("#enter").attr("disabled",false);
        $("#end").text("");
    });

});