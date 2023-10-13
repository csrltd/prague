document.addEventListener("DOMContentLoaded", function () {
    const jobListingContainer = document.querySelector('.job-listing');
    const searchInput = document.getElementById('search-input');

    // Function to filter jobs based on title search
    function filterJobsByTitle(searchText) {
        $.ajax({
            url: '/filter-jobs-by-title/',
            method: 'GET',
            data: {
                search_text: searchText
            },
            success: function (data) {
                jobListingContainer.innerHTML = '';

                if (data.hasOwnProperty('jobs') && Array.isArray(data.jobs)) {
                    data.jobs.forEach(function (job) {
                        const jobDiv = document.createElement('div');
                        jobDiv.classList.add('jobs');
                        jobDiv.innerHTML = `
                            <div class="first">
                                <h1>${job.title}</h1>
                                <h2>${job.companyName} - ${job.jobLocation.city}, ${job.jobLocation.state}, ${job.jobLocation.zip}</h2>
                                <p>${job.description.replace(/<[^>]*>?/gm, '').substring(0, 250)}${job.description.length > 250 ? '...' : ''}</p>
                            </div>
                            <i class="fa-regular fa-bookmark"></i>
                        `;

                        jobListingContainer.appendChild(jobDiv);
                    });
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }

    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.trim();
        if (searchText === '') {
            // If the input field is cleared, fetch and render all jobs
            filterJobsByTitle('');
        } else {
            // Otherwise, filter jobs based on the search text
            filterJobsByTitle(searchText);
        }
        // filterJobsByTitle(searchText);
    });
});

