
var br = new betareader();

var oldVal = "";

updatetest($("#beta_entry").val(), "#unicode_result"); 


$("#beta_entry").on("change keyup paste", function() {
    var currentVal = $(this).val();
    if(currentVal == oldVal) {
        return; //check to prevent multiple simultaneous triggers
    }

    oldVal = currentVal;
    //action to be performed on textarea changed
    updatetest(currentVal, "#unicode_result"); 
});

function updatetest(t, pId) {
    let ucgreek = br.transcodeGreek(t);
    $(pId).html(ucgreek);
}