let allUsersForm = document.getElementById('listOfUsers');
let createNewUserForm = document.getElementById('createNewUserFormId');
const url = 'http://localhost:8080/api/users';
let newRoles = [];
let outputForAllUsers = '<table class="table table-striped bg-white text-dark">' +
    '<tr class="bg-white text-dark">' +
    '<th>ID</th>' +
    '<th>First Name</th>' +
    '<th>Last Name</th>' +
    '<th>Age</th>' +
    '<th>Email</th>' +
    '<th>Role</th>' +
    '<th>Edit</th>' +
    '<th>Delete</th>' +
    '</tr>' +
    '<tbody>';
let outputForCreateNewUserForm = '';


const renderAllUsers = (data) => {
    data.forEach(element => {
        let elementRoles = '';
        element.roleSet.forEach(role => {
                elementRoles += role.name + ' ';
            }
        );
        outputForAllUsers += `
            <tr>
                <td> ${element.id} </td>
                <td> ${element.name} </td>
                <td> ${element.surName} </td>
                <td> ${element.age} </td>
                <td> ${element.email} </td>
                <td> ${elementRoles} </td>
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" attr="data-target='#editModal'+ onclick="editUser(this)">
                        Edit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-toggle="modal" attr="data-target='#deleteModal'+${element.id}">
                        Delete
                    </button>
                </td>
            </tr>`
    });
    outputForAllUsers += '</tbody>\n' +
        '    </table>';
    allUsersForm.innerHTML = outputForAllUsers;
};

fetch(url)
    .then(res => res.json())
    .then(data => renderAllUsers(data));

createNewUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(newRoles)
    document.getElementById(newRoles).forEach(role => {
        newRoles.push(role);
    })
    newRoles.push()
    bodyJson = JSON.stringify({
        name: document.getElementById(newName).value,
        surName: document.getElementById(newSurName).value,
        age: document.getElementById(newAge).value,
        email: document.getElementById(newEmail).value,
        password: document.getElementById(newPassword).value,
        roleSet: newRoles})
    console.log(bodyJson)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyJson
    })

        // .then(res => res.json())
        // .then(data => {
        //     const dataArray = [];
        //     dataArray.push(data);
        //     createNewUser(dataArray);
        // });
    alert("New User added");
    document.getElementById('addForm').reset();
    document.getElementById('table').click();
    $("#usersTable > tbody").empty();
    renderAllUsers();
})



