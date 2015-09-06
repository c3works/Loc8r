
$('#addReview').submit(function (e) {
    $('.alert.alert-warning').hide();
    if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
        if ($('.alert.alert-warning').length) {
            $('.alert.alert-warning').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-warning">All fields required, please try again</div>');
        }
        return false;
    }
});