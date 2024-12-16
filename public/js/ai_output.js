
// AJAX request to submit form data and update output without refreshing the page
$(document).ready(function() {
    $('#queryForm').on('submit', function(e) {
        e.preventDefault(); // Prevent page refresh
        let inputText = $('#text_input').val(); // Get the user input
        if(inputText=="") {
        $('#output p').text("Please ask something. Go and drink coffee!!")
        }
        else{
            $('#loader').show();
            $('#output').hide(); // Hide the output section while loading
    
            // Send AJAX request
            $.ajax({
                url: '/saltify_ai',
                method: 'POST',
                data: { text_input: inputText },
                
                success: function(response) {
                    $('#loader').hide(); // Hide loader when response is received
                    $('#output p').text(response.output); // Update output box
                    $('#output').show(); // Show output
                },
                error: function() {
                    $('#loader').hide(); // Hide loader in case of error
                    $('#output p').text('An error occurred. Please try again.');
                    $('#output').show(); // Show error message
                }
            });
        }
        // Show loader

    });
});
