# CV Information Form

This is a simple, responsive HTML form for collecting CV (Curriculum Vitae) information. It is built using HTML, Bootstrap 5 for styling, and JavaScript for form validation and navigation. When the form is successfully filled, the user is redirected to a new page (`newPage.html`).

## ✨ Features

- Collects personal details, education, work experience, and skills
- Dynamically adds more fields for education, experience, and skills
- Validates required fields before proceeding
- Prevents submission until all required inputs are filled
- Uses Bootstrap 5 for modern UI styling
- Automatically navigates to `newPage.html` upon successful validation

## 🛠️ Technologies Used

- HTML5  
- CSS3  
- JavaScript (Vanilla)  
- Bootstrap 5

## 🚀 Getting Started

### 1. Clone or Download the Project
```bash
git clone https://github.com/your-username/cv-information-form.git
Or just download the ZIP and extract it.

2. Open the Form
Open the index.html file in your browser.

3. Fill Out the Form
Enter your details. Use the "Add More" buttons to include additional education, experience, or skills.

4. Submit
Click the "Generate CV" button. If all required fields are filled, you’ll be redirected to newPage.html.

📁 Project Structure
bash
Copy
Edit
cv-information-form/
│
├── index.html         # Main form page
├── newPage.html       # Redirect target after successful submission
├── script.js          # JavaScript for validation and dynamic fields
├── style.css          # Optional custom styles
└── README.md          # Project documentation

✅ Validation Rules
. All required fields must be filled.
. Invalid or empty inputs are highlighted using Bootstrap classes.\
. The form won’t redirect unless validation passes.

🧪 To Do / Future Improvements
. Store data in localStorage or send to backend
. Display submitted data in newPage.html
. Add form reset or edit option

📄 License
This project is for educational purposes and free to use or modify.
