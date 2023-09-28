document.addEventListener("DOMContentLoaded", function () {
    const jobListingContainer = document.querySelector('.job-listing');

    // Access the job list data from the template
    const jobList = jobListData;

    // Function to filter jobs based on search input
    function filterJobs(searchText) {
        const filteredJobs = jobList.filter((job) => {
            const title = job.title.toLowerCase();
            const description = job.description.toLowerCase();
            const keywords = searchText.toLowerCase().split(' ');

            // Check if any keyword matches the job title or description
            return keywords.some(keyword => title.includes(keyword) || description.includes(keyword));
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

    // Handle form submission to trigger search
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        const searchText = searchInput.value.trim();
        const filteredJobs = filterJobs(searchText);
        renderFilteredJobs(filteredJobs);
    });

    // Initial rendering of all jobs
    renderFilteredJobs(jobList);

    // Define searchInput here after the initial rendering
    const searchInput = document.getElementById('search-input');

    // Handle input changes to display all jobs when search input is cleared
    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.trim();
        if (searchText === '') {
            renderFilteredJobs(jobList); // Display all jobs when input is empty
        }
    });
});















