$(document).ready(function(){

    var song = document.getElementById("song");
    song.volume = 0.5;

    var loops = 0;
    var complete = false;

    function pad(numbers) {
        if (numbers < 10) //Pad 0
            return "0" + numbers;
        else return numbers;
    }

    $("input").change(function() {
        var vol = $("input").val();
        song.volume = vol / 100;
        $("#level").text(pad(vol));
    });

    $(song).on("ended", function(){

        loops++;
        $("#loops").text(function() {
            if (loops == 1)
                return "1 time!";
            else return loops + " times!";
        });

        if(!complete) {

            var number = $("#number")
            number.text(number.text()+pad($("input").val()));

            curr = number.text();
            if (curr.length >= 10) {

                complete = true;

                var fst = curr.slice(0,3);
                var snd = curr.slice(3,6);
                var trd = curr.slice(6);
                var out = "(" + fst + ")-" + snd + "-" + trd;
                number.text(out);

                $("#enter").hide();
                $("#end").show();
                $("p:last").append("<p>Thank you for your cooperation!</p>");
            }
        }
        
        if(!complete) {
            $("#msg").remove();
            $("#enter").show();
            $("input").attr("disabled",false);
        }

        song.play();
    });

    $("#enter").click(function(){
        $(this).after("<span id='msg'>\tThank you! \
            Please wait while processing your selection...</span>");
        $("input").attr("disabled",true);
        $(this).hide();
    });

    $("#end").click(function(){
        $(this).text("You can't stop it.");
    });
});