// document.addEventListener("DOMContentLoaded", function () {
//     // Access the filter checkboxes
//     const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
//     // Access the job listing container
//     const jobListingContainer = document.querySelector('.job-listing');

//     const jobList = jobListData;


//     // Function to filter jobs based on selected checkboxes
//     function filterJobs() {
//         // Get selected checkboxes
//         const selectedFilters = Array.from(filterCheckboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.name);


//         // If no filters are selected, display all jobs
//         if (selectedFilters.length === 0) {
//             return jobList;
//         }

//         // Filter jobs based on selected filters
//         const filteredJobs = jobList.filter((job) => {
//             console.log('Selected Filters:', selectedFilters);
//             console.log('Job jobTypes:', job.jobTypes);
//             return (
//                 job.jobTypes &&
//                 selectedFilters.includes(job.jobTypes)
//             );
//         });

//         return filteredJobs;
//     }

//     // Function to render filtered jobs
//     function renderFilteredJobs(filteredJobs) {
//         // Clear the job listing container
//         jobListingContainer.innerHTML = '';

//         // Render the filtered jobs
//         filteredJobs.forEach((job) => {
//             const jobDiv = document.createElement('div');
//             jobDiv.classList.add('jobs');
//             jobDiv.innerHTML = `
//                 <div class="first">
//                     <h1>${job.title}</h1>
//                     <h2>${job.companyName} - ${job.city}, ${job.state}, ${job.zip}</h2>
//                     <p>${job.description}</p>
//                 </div>
//                 <i class="fa-regular fa-bookmark"></i>
//             `;

//             jobListingContainer.appendChild(jobDiv);
//         });
//     }

//     // Add event listeners to checkboxes to trigger filtering
//     filterCheckboxes.forEach((checkbox) => {
//         checkbox.addEventListener('change', () => {
//             const filteredJobs = filterJobs();
//             renderFilteredJobs(filteredJobs);
//         });
//     });

//     // Initial rendering of all jobs
//     renderFilteredJobs(jobList);
// });


// Handle checkbox change event
$('.filter-checkbox').on('change', function () {
    // Get selected filters
    const selectedFilters = $('.filter-checkbox:checked').map(function () {
        return this.name;
    }).get();
    console.log(selectedFilters)

    $.ajax({
        url: '/filter-jobs/',
        method: 'GET',
        data: { filters: selectedFilters },
        success: function (data) {
            const jobListingContainer = $('.job-listing');
            jobListingContainer.empty();


            // Check if the 'jobs' property exists in data
            if (data.hasOwnProperty('jobs') && Array.isArray(data.jobs)) {
                // `data.jobs` is an array, so you can use `forEach` on it
                data.jobs.forEach(function (job) {
                    const jobDiv = $('<div>').addClass('jobs');
                    jobDiv.html(`
                    <div class="first">
                        <h1>${job.title}</h1>
                        <h2>${job.companyName} - ${job.city}, ${job.state}, ${job.zip}</h2>
                        <p>${job.description}</p>
                    </div>
                    <i class="fa-regular fa-bookmark"></i>
                `);
                    jobListingContainer.append(jobDiv);
                });
            } else {
                // Handle the case where 'jobs' property is not an array
                console.error('Data does not contain an array of jobs:', data);
                // You might want to display an error message or handle this case differently
            }


        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
});

