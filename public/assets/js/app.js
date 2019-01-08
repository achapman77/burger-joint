$(function () {
    // function pulseEatMeBtns() {
    //     var listArray = parseInt($(`#burger-list:last-child`).data(`id`));
    //     for (var i = 1; i < listArray.length;i++){
    //         $
    //     }
    // }
    function changeBtnColor() {
        var devouredState = $(this).data("devouredstate")
        if (devouredState == false) {
            $("change-devoured").find("a").removeClass("orange.darken-4").addClass("indigo.darken-4");
        }
    }

    $(".change-devoured").on("click", function (event) {
        var id = $(this).data("id");
        var devouredState = $(this).data("devouredstate");
        console.log(devouredState);
        if (devouredState == false) {
            $(this).find("a").attr("class","indigo");
            $(this).data("devouredstate", "true");
            devouredState = true;
        } else {
            $(this).data("devouredstate", "false");
            devouredState = false;
        }

        // var devouredState = function () {
        //     if ($(this).data(`devouredState`) === false) { 
        //             $(this).data(`devouredState`, `true`);
        //             return true;
        //         } else {
        //             $(this).data(`devouredState`, `false`);
        //             return false
        //         }
        // }
        console.log(devouredState);

        var devouredStateObj = {
            devoured: devouredState
        }


        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: devouredStateObj
        }).then(
            function () {
                console.log(`Changed Devoured State to: `, devouredState);
                
                location.reload();
            }
        );
    });

    // changeBtnColor();
    

    

    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        
        if ($(`#burger-name`).val().trim() == "") {
            $("#burger-name").attr("placeholder", "Cannot be Blank");
            $("#burger-name").css("border-bottom", "solid 1px red");
            $("#burger-name").addClass("red-placeholder");
        } else {
            var newBurger = {
                burger_name: $(`#burger-name`).val().trim(),
                // img: burgerImgArray.pop()
            };
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                function () {
                    console.log(`Created New Burger`);
                    location.reload();
                }
            );
        }

        
    });



})