document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Projects from Local JSON File
    const projectsContainer = document.getElementById("projects-container");

    fetch("data/projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load local projects.");
            }
            return response.json();
        })
        .then(projects => {
            projectsContainer.innerHTML = "";
            projects.forEach(project => {
                const card = document.createElement("div");
                card.classList.add("project-card");
                card.innerHTML = `
                    <div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <p><strong>Tech:</strong> ${project.technologies}</p>
                        <p><strong>Role:</strong> ${project.role}</p>
                    </div>
                    <a href="${project.link}" target="_blank">View Project &rarr;</a>
                `;
                projectsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
            projectsContainer.innerHTML = `<p style="color: red; text-align: center;">Sorry, the projects could not be loaded at this time.</p>`;
        });

    // 2. Fetch Latest GitHub Repositories using GitHub REST API
    const githubContainer = document.getElementById("github-container");
    // Change 'octocat' to your actual GitHub username if you want your own repos to show up
    const githubUsername = "octocat"; 
    const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`;

    fetch(githubApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("GitHub data unavailable");
            }
            return response.json();
        })
        .then(repos => {
            githubContainer.innerHTML = "";
            repos.forEach(repo => {
                const repoCard = document.createElement("div");
                repoCard.classList.add("project-card");
                repoCard.innerHTML = `
                    <div>
                        <h3>${repo.name}</h3>
                        <p>${repo.description ? repo.description : "No description provided."}</p>
                        <p><strong>Main Language:</strong> ${repo.language ? repo.language : "Mixed/Other"}</p>
                    </div>
                    <a href="${repo.html_url}" target="_blank">View on GitHub &rarr;</a>
                `;
                githubContainer.appendChild(repoCard);
            });
        })
        .catch(error => {
            console.error(error);
            githubContainer.innerHTML = `<p style="color: #666; text-align: center;">GitHub data is currently unavailable.</p>`;
        });

    // 3. Contact Form Submission Handling
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            formFeedback.style.color = "red";
            formFeedback.textContent = "Please fill out all fields before submitting.";
            return;
        }

        formFeedback.style.color = "green";
        formFeedback.textContent = "Thank you! Your message has been sent successfully.";
        contactForm.reset();

        setTimeout(() => {
            formFeedback.textContent = "";
        }, 4000);
    });

    // 4. Custom Feature: "Back to Top" Button Behavior
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
