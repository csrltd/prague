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

const cardWrapper = document.querySelector('.job-listing');
const closeModalBtn = document.querySelector('#close-modal');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalJobTitle = modal.querySelector("#job_title");
const modalJobCode = modal.querySelector('#job_code');
const modalCompName = modal.querySelector('#company_name');
const modalLocation = modal.querySelector('#location');
const modalDescription = modal.querySelector('#job_description');
const modalJobType = modal.querySelector('#job_type');
const modalJobRequirement = modal.querySelector('#job_requirements');
const closeModal = () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
}

cardWrapper.addEventListener('click', (e) => {
    const card = e.target.closest('.jobs');
    if (card) {
        const jobId = card.getAttribute('data-job-id');
        const job = findJobById(jobId); // Replace with your logic to find the job by ID

        if (job) {
            modal.style.display = 'block';
            modalOverlay.style.display = 'block';

            modalJobTitle.textContent = job.title;
            modalCompName.textContent = `${job.companyName} - ${job.jobLocation.city}, ${job.jobLocation.state}, ${job.jobLocation.zip}`;
            modalDescription.textContent = job.description;
        }
    }
});

closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Replace this function with your logic to find the job by ID
function findJobById(jobId) {
    // Implement logic to find the job by ID in your job_list
    return jobListData.find(job => job.jobId === jobId);
}
