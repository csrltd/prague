$(document).ready(function () {
    const recentJobsCheckbox = document.querySelector('#recent');
    const savedJobsCheckbox = document.querySelector('#saved');
    const jobListingContainer = $('.job-listing');

    const filterJobsByRecentOrSaved = () => {
        const recentJobsChecked = recentJobsCheckbox.checked;
        const savedJobsChecked = savedJobsCheckbox.checked;

        // Only make the AJAX request if either checkbox is checked
        if (recentJobsChecked || savedJobsChecked) {
            $.ajax({
                url: '/filter-recent-and-saved-jobs/',
                method: 'GET',
                data: {
                    recent_jobs: recentJobsChecked,
                    saved_jobs: savedJobsChecked
                },
                success: function (data) {
                    jobListingContainer.empty();

                    if (data.hasOwnProperty('jobs') && Array.isArray(data.jobs)) {
                        data.jobs.forEach(function (job) {
                            const jobDiv = $('<div>').addClass('jobs');
                            jobDiv.html(`
                                <div class="first">
                                    <h1>${job.title}</h1>
                                    <h2>${job.companyName} - ${job.city}, ${job.state}, ${job.zip}</h2>
                                    <p>${job.description.replace(/<[^>]*>?/gm, '').substring(0, 250)}</p>
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
        } else {
            // Load all jobs when both checkboxes are unchecked
            jobListingContainer.empty();

            jobListData.forEach(function (job) {
                const jobDiv = $('<div>').addClass('jobs');
                jobDiv.html(`
                    <div class="first">
                        <h1>${job.title}</h1>
                        <h2>${job.companyName} - ${job.city}, ${job.state}, ${job.zip}</h2>
                        <p>${job.description.replace(/<[^>]*>?/gm, '').substring(0, 250)}</p>
                    </div>
                    <i class="fa-regular fa-bookmark"></i>
                `);
                jobListingContainer.append(jobDiv);
            });
        }
    };

    // Add event listeners to the checkboxes
    recentJobsCheckbox.addEventListener('change', filterJobsByRecentOrSaved);
    savedJobsCheckbox.addEventListener('change', filterJobsByRecentOrSaved);

});
