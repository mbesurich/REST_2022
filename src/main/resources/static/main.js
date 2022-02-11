$(document).ready(printUsers());

let allUsersForm = document.getElementById('listOfUsers');
let createNewUserForm = document.getElementById('createNewUserFormId');
let UpdateUserForm = document.getElementById('editForm');
let userId;

let url = 'http://localhost:8080/api/users';

function printUsers() {
    let url = 'http://localhost:8080/api/users';
    let allUsersForm = document.getElementById('listOfUsers');
    let outputForAllUsers = '<table  class="table table-striped bg-white text-dark">' +
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
        '<tbody id="usersTable">';
    const renderAllUsers = (data) => {
        data.forEach(element => {
            let elementRoles = '';
            element.roleSet.forEach(role => {
                    elementRoles += role.name + ' ';
                }
            );
            outputForAllUsers += `
            <tr id=${element.id}>
                <td> ${element.id} </td>
                <td> ${element.name} </td>
                <td> ${element.surName} </td>
                <td> ${element.age} </td>
                <td> ${element.email} </td>
                <td> ${elementRoles} </td>
                <td >
                    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#editModalCenter" onclick="editUser(this)">
                        Edit
                    </button>
                    <div id="updateForm"></div>
                </td>
                <td data-id = ${element.id}>
                    <button type="button"  class="btnDelete btn btn-danger" data-toggle="modal" data-target="#deleteModalCenter" onclick="deleteRow(this)">
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
}

// Create new user START--------------------------------------------------------------
createNewUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newRoles2 = '?checkRoles=';
    let optionList = $('#checkRoles').val();
    optionList.forEach(function (item) {
        newRoles2 += item + ',';
    })
    let roles1 = newRoles2.substr(0, newRoles2.length - 1);

    console.log(roles1)

    bodyJson = JSON.stringify({
        name: document.getElementById('newName').value,
        surName: document.getElementById('newSurName').value,
        age: document.getElementById('newAge').value,
        email: document.getElementById('newEmail').value,
        password: document.getElementById('newPassword').value
    })
    console.log(bodyJson)
    fetch(url + roles1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyJson
    })

        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const dataArray = [];
            dataArray.push(data);

            document.getElementById('addForm').reset();
            // document.getElementById('usersTable').reset();
            document.getElementById('home-tab').click();
            $("#usersTable > tbody").empty();
            printUsers();
            // renderAllUsers(dataArray);
        });
});

function editUser(o) {
    document.getElementById('editForm').reset();
    var id = $(o).closest('tr').find('td').eq(0).text();
    // console.log("id: " + id)
    // var url = url + id;
    fetch(url + '/' + id)
        .then((response) => {
            response.json().then((data) => {
                // console.log('data:')
                // console.log(data)
                $('#idEdit').val(data.id);
                // console.log('data.id: ' + data.id)
                $('#firstNameEdit').val(data.name);
                // console.log('data.name: ' + data.name)
                $('#lastNameEdit').val(data.surName);
                $('#ageEdit').val(data.age);
                $('#emailEdit').val(data.email);
                $('#passwordEdit').val(data.password);
            });
        });
}

function updateUser() {

    let newRoles2 = '?checkRoles=';
    let optionList = $('#EditCheckRoles').val();
    optionList.forEach(function (item) {
        newRoles2 += item + ',';
    })
    let roles1 = newRoles2.substr(0, newRoles2.length - 1);

    console.log('roles1: ' + roles1)

    var jsonVar = {
        id: document.getElementById("idEdit").value,
        name: document.getElementById("firstNameEdit").value,
        surName: document.getElementById("lastNameEdit").value,
        age: document.getElementById("ageEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("passwordEdit").value
    };
    console.log('jsonVar')
    console.log(jsonVar)
    let response = fetch(url + roles1, {
        method: 'PUT',
        body: JSON.stringify(jsonVar),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    alert("Data successfully updated");
    $("#usersTable > tbody").empty();
    printUsers();
}

function deleteRow(o) {
    let id = $(o).closest('tr').find('td').eq(0).text();
    userId = parseInt(id.substr(1, id.length - 1), 10)
    document.getElementById('deleteForm').reset();
    fetch(url + '/' + + userId)
        .then((response) => {
            response.json().then((data) => {
                $('#idDelete').val(data.id);
                $('#firstNameDelete').val(data.name);
                $('#lastNameDelete').val(data.surName);
                $('#ageDelete').val(data.age);
                $('#emailDelete').val(data.email);
                let roles = data.roleSet;
                console.log(roles);
                let newRoles = [];
                $('#newRoles option').each(function () {
                    newRoles[$(this).val()] = $(this).val();
                });
                console.log(newRoles)
                roles.forEach(function (item) {
                    if (newRoles.includes(String(item.id))) {
                        $('#deleteRoles option[id=' + String(Number(item.id + 2)) + ']').prop('selected', true);
                    }
                })
            });
        });
};

function deleteUser() {
    fetch(url + '/' + userId, {
        method: 'DELETE',
    })
        .then(res => res.text())
        .then(res => console.log(res))
    let table = document.getElementById("usersTable");
    let selector = "tr[id='"+userId+"']";
    console.log("selector = ")
    console.log(selector)
    let row = table.querySelector(selector);
    console.log("row = ")
    console.log(row)
    row.parentElement.removeChild(row);
    alert("Data removed");
    $("#usersTable > tbody").empty();
    printUsers();
}






