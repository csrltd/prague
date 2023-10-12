// const cardWrapper = document.querySelector('.job-listing');
// const closeModalBtn = document.querySelector('#close-modal');
// const modal = document.querySelector('.modal');
// const modalOverlay = document.querySelector('.modal-overlay');
// const modalJobTitle = modal.querySelector("#job_title");
// const modalJobCode = modal.querySelector('#job_code');
// const modalCompName = modal.querySelector('#company_name');
// const modalLocation = modal.querySelector('#location');
// const modalDescription = modal.querySelector('#job_description');
// const modalJobType = modal.querySelector('#job_type');
// const modalJobRequirement = modal.querySelector('#job_requirements');
// const closeModal = () => {
//     modal.style.display = 'none';
//     modalOverlay.style.display = 'none';
// }
// cardWrapper.addEventListener('click', (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains('jobs-overlay')) {
//         modal.style.display = 'block';
//         modalOverlay.style.display = 'block';

//         modalJobTitle.textContent = e.target.nextElementSibling.querySelector(".first h1").textContent;
//         modalCompName.textContent = e.target.nextElementSibling.querySelector(".first h2").textContent;
//         modalDescription.textContent = e.target.nextElementSibling.querySelector(".first p").textContent;
//     }
// })
// closeModalBtn.addEventListener('click', closeModal);
// modalOverlay.addEventListener('click', closeModal);

// const cardWrapper = document.querySelector('.job-listing');
// const closeModalBtn = document.querySelector('#close-modal');
// const modal = document.querySelector('.modal');
// const modalOverlay = document.querySelector('.modal-overlay');
// const modalJobTitle = modal.querySelector("#job_title");
// const modalJobCode = modal.querySelector('#job_code');
// const modalCompName = modal.querySelector('#company_name');
// const modalLocation = modal.querySelector('#location');
// const modalDescription = modal.querySelector('#job_description');
// const modalJobType = modal.querySelector('#job_type');
// const modalJobRequirement = modal.querySelector('#job_requirements');
// const closeModal = () => {
//     modal.style.display = 'none';
//     modalOverlay.style.display = 'none';
// }
// cardWrapper.addEventListener('click', (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains('jobs-overlay')) {
//         modal.style.display = 'block';
//         modalOverlay.style.display = 'block';

//         modalJobTitle.textContent = e.target.nextElementSibling.querySelector(".first h1").textContent;
//         modalCompName.textContent = e.target.nextElementSibling.querySelector(".first h2").textContent;
//         modalDescription.textContent = e.target.nextElementSibling.querySelector(".first p").textContent;
//     }
// })
// closeModalBtn.addEventListener('click', closeModal);
// modalOverlay.addEventListener('click', closeModal);

$(document).ready(function () {
    const modelOverlay = $('#modal-overlay')
    // Click event for job listings
    $('.jobs').on('click', function (e) {
        e.preventDefault();

        // Extract the job ID from the clicked job listing
        // let jobId = $(this).attr('data-job-id');

        // Use AJAX to fetch job details based on the job ID
        $.ajax({
            url: `/job/1996739/`,
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
