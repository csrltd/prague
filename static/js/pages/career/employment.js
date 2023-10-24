$(document).ready(function () {
    const modelOverlay = $('#modal-overlay')
    // Click event for job listings
    $('.jobs').on('click', function (e) {
        e.preventDefault();

        // Extract the job ID from the clicked job listing
        let jobId = $(this).attr('data-job-id');

        // Use AJAX to fetch job details based on the job ID
        $.ajax({
            url: `/job/${jobId}/`,
            method: 'GET',
            success: function (data) {
                if (data.error) {
                    console.error('Error:', data.error);
                } else {
                    // Populate the modal with job details
                    $('#job_title').text(data.title);
                    $('#job_code').text(data.jobCode);
                    $('#company_name').text(`${data.companyName} - ${data.jobLocation.city}, ${data.jobLocation.state}, ${data.jobLocation.zip}`);
                    $('#job_type').text(data.jobType);
                    $('#job_description').html(data.description);
                    $('#job_requirements').html(data.requirements);
                    $('#apply').attr('href', data.applyUrl);

                    // Display the modal
                    modelOverlay.show()
                    $('.modal').show();
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });

    // Close modal
    $('#close-modal').on('click', function () {
        modelOverlay.hide()
        $('.modal').hide();
    });
});
