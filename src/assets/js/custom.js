 
 /*counter*/

 $(document).ready(function() {
     //called when key is pressed in textbox
     $(".quantity").keypress(function(e) {
         if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
             //display error message
             $("#errmsg").html("Digits Only").show().fadeOut("slow");
             return false;
         }
     });
 });

 /*counter*/
 /*nav*/


jQuery(function($) {
    var path = window.location.href;
    $('.ul_set.desk_on li a').each(function() {
        if (this.href === path) {
            $(this).parent('li').addClass('active');
        }
    });
});
                                  
 /*nav*/