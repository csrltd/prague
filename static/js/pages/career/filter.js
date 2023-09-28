document.addEventListener("DOMContentLoaded", function () {
    // Access the filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    // Access the job listing container
    const jobListingContainer = document.querySelector('.job-listing');

    const jobList = jobListData;

    // Function to filter jobs based on selected checkboxes
    function filterJobs() {
        // Get selected checkboxes
        const selectedFilters = Array.from(filterCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.name);



        // If no filters are selected, display all jobs
        if (selectedFilters.length === 0) {
            return jobList;
        }

        // Filter jobs based on selected filters
        const filteredJobs = jobList.filter((job) => {
            // Check if the "jobTypes" property exists and contains any selected filter
            console.log('Selected Filters:', selectedFilters);
            console.log('Job jobTypes:', job.jobTypes);
            return (
                job.jobTypes &&
                selectedFilters.includes(job.jobTypes)
            );
        });

        return filteredJobs;
    }

    // Function to render filtered jobs
    function renderFilteredJobs(filteredJobs) {
        // Clear the job listing container
        jobListingContainer.innerHTML = '';

        // Render the filtered jobs
        filteredJobs.forEach((job) => {
            const jobDiv = document.createElement('div');
            jobDiv.classList.add('jobs');
            jobDiv.innerHTML = `
                <!-- Customize the job card layout here based on your needs -->
                <div class="first">
                    <h1>${job.title}</h1>
                    <h2>${job.companyName} - ${job.city}, ${job.state}, ${job.zip}</h2>
                    <p>${job.description}</p>
                </div>
                <i class="fa-regular fa-bookmark"></i>
            `;

            jobListingContainer.appendChild(jobDiv);
        });
    }

    // Add event listeners to checkboxes to trigger filtering
    filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const filteredJobs = filterJobs();
            renderFilteredJobs(filteredJobs);
        });
    });

    // Initial rendering of all jobs
    renderFilteredJobs(jobList);
});