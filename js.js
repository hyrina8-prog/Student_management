
const showStudents = document.getElementById("show-products");
const id = document.getElementById("id");
const name = document.getElementById("name");
const code = document.getElementById("code");
const gender = document.getElementById("gender");
const className = document.getElementById("class");
const major = document.getElementById("major");
const gpa = document.getElementById("gpa");
const image = document.getElementById("image");

const previewsImage = document.getElementById("previews-image");

const form = document.getElementById("form");
const saveBtn = document.getElementById("save-btn");

const search = document.getElementById("search");

const students = [
    {
        id: 1,
        name: "Dara Sok",
        studentCode: "STU001",
        gender: "Male",
        className: "Web Development",
        major: "Frontend Development",
        gpa: 3.75,
        image: "https://i.pinimg.com/736x/1e/28/9c/1e289ce3559e51674218f142bdc08903.jpg"
    },
    {
        id: 2,
        name: "Sokha Chan",
        studentCode: "STU002",
        gender: "Female",
        className: "UI/UX Design",
        major: "UI/UX Design",
        gpa: 3.90,
        image: "https://i.pinimg.com/736x/84/08/4b/84084b60e481dde393f003b4d52ee5c2.jpg"
    },
    {
        id: 3,
        name: "Vannak Chea",
        studentCode: "STU003",
        gender: "Male",
        className: "Software Development",
        major: "Backend Development",
        gpa: 3.45,
        image: "https://i.pinimg.com/736x/8e/a3/c6/8ea3c6046eebeea35b13f20133c37e19.jpg"
    },
    {
        id: 4,
        name: "Sreymom Kim",
        studentCode: "STU004",
        gender: "Female",
        className: "Web Development",
        major: "Frontend Development",
        gpa: 3.85,
        image: "https://i.pinimg.com/736x/9e/5e/1f/9e5e1fbf031de5894fea339a872f6eff.jpg"
    },
    {
        id: 5,
        name: "Piseth Lim",
        studentCode: "STU005",
        gender: "Male",
        className: "Mobile Development",
        major: "Mobile App Development",
        gpa: 3.60,
        image: "https://i.pinimg.com/736x/62/b4/9a/62b49afec3b5e3e435c523dc69e11503.jpg"
    }
];
console.log("===================================");

function DisplayStudents(data) {

    let row = "";

    data.forEach((student) => {

        row += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.studentCode}</td>
                <td>${student.gender}</td>
                <td>${student.className}</td>
                <td>${student.major}</td>
                <td>${student.gpa}</td>
                <td>
                    <img
                        src="${student.image}"
                        alt="${student.name}"
                        style="width: 50px; height: 50px; object-fit: cover;">
                </td>

                <td class="text-center">

                    <button
                        data-bs-toggle="modal"
                        data-bs-target="#productModal"
                        onclick="openUpdateModal(${student.id})"
                        class="btn text-warning">
                        Update
                    </button>

                    <button
                        onclick="Delete(${student.id}, '${student.name}')"
                        class="btn text-danger">
                        Delete
                    </button>

                </td>
            </tr>
        `;
    });

    showStudents.innerHTML = row;
}


DisplayStudents(students);

let isUpdate = false;
let updateIndex = null;

function openAddModal() {

    isUpdate = false;

    updateIndex = null;

    form.reset();

    previewsImage.setAttribute("src", "");

    saveBtn.textContent = "Add Student";
}

function openUpdateModal(studentId) {

    isUpdate = true;

    updateIndex = students.findIndex(
        student => student.id === studentId
    );

    const student = students[updateIndex];

    id.value = student.id;
    name.value = student.name;
    code.value = student.studentCode;
    gender.value = student.gender;
    className.value = student.className;
    major.value = student.major;
    gpa.value = student.gpa;
    image.value = student.image;

    previewsImage.setAttribute("src", student.image);

    saveBtn.textContent = "Update Student";
}

form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (isUpdate) {

        students[updateIndex].id = Number(id.value);
        students[updateIndex].name = name.value;
        students[updateIndex].studentCode = code.value;
        students[updateIndex].gender = gender.value;
        students[updateIndex].className = className.value;
        students[updateIndex].major = major.value;
        students[updateIndex].gpa = Number(gpa.value);
        students[updateIndex].image = image.value;

    } else {

        const student = {
            id: Number(id.value),
            name: name.value,
            studentCode: code.value,
            gender: gender.value,
            className: className.value,
            major: major.value,
            gpa: Number(gpa.value),
            image: image.value
        };

        students.push(student);
    }

    DisplayStudents(students);

    form.reset();

    previewsImage.setAttribute("src", "");

    isUpdate = false;

    updateIndex = null;
});


function Delete(studentId, studentName) {

    if (confirm(`Are sure to delete ${studentName}`)) {

        const index = students.findIndex(
            student => student.id === studentId
        );

        students.splice(index, 1);

        DisplayStudents(students);
    }
}

search.addEventListener("input", () => {

    const result = students.filter(
        student =>
            student.name
                .toLowerCase()
                .includes(search.value.toLowerCase())
    );

    DisplayStudents(result);
});


image.addEventListener("input", () => {

    previewsImage.setAttribute("src", image.value);

});