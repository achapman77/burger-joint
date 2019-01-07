$(function () {
    // function pulseEatMeBtns() {
    //     var listArray = parseInt($(`#burger-list:last-child`).data(`id`));
    //     for (var i = 1; i < listArray.length;i++){
    //         $
    //     }
    // }
    
    $(".change-devoured").on("click", function (event) {
        var id = $(this).data("id");
        var devouredState = function () {
            if ($(this).data(`devouredState`) === false) { 
                    $(this).data(`devouredState`, `true`);
                    return true;
                } else {
                    $(this).data(`devouredState`, `false`);
                    return false
                }
        }
        
        var devouredStateObj = {
            devoured: devouredState
        }
        console.log(devouredState);

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

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $(`#burger-name`).val().trim(),
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
    });



})