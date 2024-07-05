document.addEventListener("DOMContentLoaded", () => {
    const formSubmitButton = document.getElementById("formSubmitButton");
    formSubmitButton.innerText = "Submit";
    const fullName = document.getElementById("fullName");
    const userEmail = document.getElementById("userEmail");
    const userMessage = document.getElementById("userMessage");

    formSubmitButton.addEventListener("click", (event) => {
        event.preventDefault();
        formSubmitButton.innerText = "Sending...";
        if (fullName.value === "" || userEmail.value === "" || userMessage.value === "") {
            alert("All fields are required");
            formSubmitButton.innerText = "Submit";
        } else {
            const formData = {
                "full_name": fullName.value,
                "email_address": userEmail.value,
                "message": userMessage.value,
                "hospital_name": "Pawhuska Inc",
                "recipient_email": "info@pawhuskahospital.com",
                "subject": "Email from pawhuska"
            };
            console.log(formData);

            fetch("https://emails-dp0z.onrender.com/api/contact/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(async response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Error sending message");
                    }
                })
                .then(data => {
                    console.log(data);
                    alert("Message submitted successfully!");
                    formSubmitButton.innerText = "Submit";
                    fullName.value = "";
                    userEmail.value = "";
                    userMessage.value = "";
                })
                .catch(error => {
                    console.log(error);
                    alert(error.message || "Error sending message");
                    formSubmitButton.innerText = "Submit";
                });
        }
    });
});
