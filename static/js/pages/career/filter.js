// Handle checkbox change event
$('.filter-checkbox').on('change', function () {
    // Get selected filters
    const selectedFilters = $('.filter-checkbox:checked').map(function () {
        return $(this).val();
    }).get();
    // console.log(selectedFilters)

    $.ajax({
        url: '/filter-jobs/',
        method: 'GET',
        data: { jobTypes: selectedFilters },
        success: function (data) {
            const jobListingContainer = $('.job-listing');
            jobListingContainer.empty();

            // Check if the 'jobs' property exists in data
            if (data.hasOwnProperty('jobs') && Array.isArray(data.jobs)) {
                data.jobs.forEach(function (job) {
                    // console.log(job)
                    const jobDiv = $('<div>').addClass('jobs');
                    jobDiv.html(`
                    <div class="first">
                        <h1>${job.title}</h1>
                        <h2>${job.companyName} - ${job.city}, ${job.state}, ${job.zip}</h2>
                        <p>${job.description.replace(/<[^>]*>?/gm, '').substring(0, 250)}${job.description.length > 250 ? '...' : ''}</p>
                    </div>
                    <i class="fa-regular fa-bookmark"></i>
                `);
                    jobListingContainer.append(jobDiv);
                });
            } else {
                console.error('Data does not contain an array of jobs:', data);
            }
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
});






