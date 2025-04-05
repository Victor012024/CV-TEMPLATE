// Handle form submission from index.html
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[data-information]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        personal: {
          fullName: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          address: document.querySelector('textarea[name="address"]').value
        },
        education: [],
        workExperience: [],
        skills: []
      };

      // Get all education entries
      const degreeInputs = document.querySelectorAll('input[name="degree[]"]');
      const institutionInputs = document.querySelectorAll('input[name="institution[]"]');
      const yearInputs = document.querySelectorAll('input[name="year[]"]');

      for (let i = 0; i < degreeInputs.length; i++) {
        formData.education.push({
          degree: degreeInputs[i].value,
          institution: institutionInputs[i].value,
          year: yearInputs[i].value
        });
      }

      // Get all work experience entries
      const jobTitleInputs = document.querySelectorAll('input[name="jobTitle[]"]');
      const companyInputs = document.querySelectorAll('input[name="company[]"]');
      const yearsWorkedInputs = document.querySelectorAll('input[name="yearsWorked[]"]');

      for (let i = 0; i < jobTitleInputs.length; i++) {
        formData.workExperience.push({
          jobTitle: jobTitleInputs[i].value,
          company: companyInputs[i].value,
          yearsWorked: yearsWorkedInputs[i].value
        });
      }

      // Get all skills
      const skillInputs = document.querySelectorAll('input[name="skills[]"]');
      skillInputs.forEach(input => {
        formData.skills.push(input.value);
      });

      // Store data in localStorage
      localStorage.setItem('cvData', JSON.stringify(formData));
      console.log('Data stored:', formData);

      // Navigate to new page
      window.location.href = 'newPage.html';
    });
  }
});

// Function to display data in newPage.html
function displayCVData() {
  const cvData = JSON.parse(localStorage.getItem('cvData'));
  console.log('Retrieved data:', cvData);
  if (!cvData) {
    console.error('No CV data found');
    return;
  }

  // Display personal information
  const personalDetails = document.querySelector('.personal-details');
  personalDetails.innerHTML = `
    <h1><strong>Personal Information:</strong></h1>
    <p><strong>Name: </strong>${cvData.personal.fullName}</p>
    <p><strong>Email: </strong>${cvData.personal.email}</p>
    <p><strong>Phone: </strong>${cvData.personal.phone}</p>
    <p><strong>Address: </strong>${cvData.personal.address}</p>
    <hr>
  `;

  // Display education
  const educationSection = document.querySelector('.Education');
  let educationHTML = '<h1><strong>Education:</strong></h1>';
  cvData.education.forEach(edu => {
    educationHTML += `
      <p><strong>Degree: </strong>${edu.degree}</p>
      <p><strong>Institution: </strong>${edu.institution}</p>
      <p><strong>Year: </strong>${edu.year}</p>
      <hr>
    `;
  });
  educationSection.innerHTML = educationHTML;

  // Display work experience
  const workSection = document.querySelector('.Work-Experience');
  let workHTML = '<h1><strong>Work Experience:</strong></h1>';
  cvData.workExperience.forEach(work => {
    workHTML += `
      <p><strong>Job Title: </strong>${work.jobTitle}</p>
      <p><strong>Company: </strong>${work.company}</p>
      <p><strong>Years Worked: </strong>${work.yearsWorked}</p>
      <hr>
    `;
  });
  workSection.innerHTML = workHTML;

  // Display skills
  const skillsSection = document.querySelector('.skills');
  let skillsHTML = '<h1><strong>Skills:</strong></h1><div class="skills-container">';
  cvData.skills.forEach(skill => {
    skillsHTML += `
      <div class="skill-item">
        <span class="skill-bullet">•</span>
        <span class="skill-name">${skill}</span>
      </div>
    `;
  });
  skillsHTML += '</div>';
  skillsSection.innerHTML = skillsHTML;
}

// Call display function when newPage.html loads
if (document.querySelector('.show-result')) {
  displayCVData();

  // Add back button functionality
  const backButton = document.getElementById('backButton');
  if (backButton) {
    backButton.addEventListener('click', function () {
      // Clear localStorage
      localStorage.removeItem('cvData');
      // Clear form inputs by navigating with a timestamp
      window.location.href = 'index.html?clear=' + Date.now();
    });
  }
}

// Clear form inputs when returning to index.html
if (window.location.search.includes('clear')) {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form[data-information]');
    if (form) {
      form.reset();

      // Clear any dynamically added fields
      document.querySelectorAll('.dynamic-field').forEach(field => {
        field.remove();
      });
    }
  });
}


function addEducation() {
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="mb-3">
          <label class="form-label">Degree</label>
          <input type="text" class="form-control" name="degree[]" required>
      </div>
      <div class="mb-3">
          <label class="form-label">Institution</label>
          <input type="text" class="form-control" name="institution[]" required>
      </div>
      <div class="mb-3">
          <label class="form-label">Year of Completion</label>
          <input type="number" class="form-control" name="year[]" required>
      </div>
  `;
  document.getElementById("educationFields").appendChild(div);
}

function addWorkExperience() {
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="mb-3">
          <label class="form-label">Job Title</label>
          <input type="text" class="form-control" name="jobTitle[]" required>
      </div>
      <div class="mb-3">
          <label class="form-label">Company</label>
          <input type="text" class="form-control" name="company[]" required>
      </div>
      <div class="mb-3">
          <label class="form-label">Years Worked</label>
          <input type="text" class="form-control" name="yearsWorked[]" required>
      </div>
  `;
  document.getElementById("workExperienceFields").appendChild(div);
}

function addSkill() {
  const div = document.createElement("div");
  div.className = "mb-3";
  div.innerHTML = `<input type="text" class="form-control" name="skills[]" placeholder="Skill" required>`;
  document.getElementById("skillsFields").appendChild(div);
}

function downloadCV() {
  const cvData = JSON.parse(localStorage.getItem('cvData'));
  if (!cvData) {
    alert('No CV data found. Please fill out the form first.');
    return;
  }

  // Store original styles and hide buttons
  const element = document.querySelector('.show-result');
  const buttonsContainer = document.querySelector('.back-button-container');
  const originalStyles = {
    padding: element.style.padding,
    margin: element.style.margin,
    buttonsDisplay: buttonsContainer.style.display
  };

  // Temporarily reduce spacing and hide buttons for PDF
  element.style.padding = '10px';
  element.style.margin = '0';
  buttonsContainer.style.display = 'none';

  const options = {
    margin: [5, 5, 5, 5], // top, left, bottom, right
    filename: `${cvData.personal.fullName || 'My'}_CV.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 1.5,
      letterRendering: true,
      useCORS: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'] 
    }
  };

  // Generate PDF
  html2pdf()
    .set(options)
    .from(element)
    .save()
    .then(() => {
      // Restore original styles and show buttons
      element.style.padding = originalStyles.padding;
      element.style.margin = originalStyles.margin;
      buttonsContainer.style.display = originalStyles.buttonsDisplay;
    });
}
