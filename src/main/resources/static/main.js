$(document).ready(printUsers());

let createNewUserForm = document.getElementById('createNewUserFormId');
let userId;
let url = 'http://localhost:8080/api/users';

async function printUsers() {
    let url = 'http://localhost:8080/api/users';
    let allUsersForm = document.getElementById('usersTable');
    let outputForAllUsers = "";
    const renderAllUsers = (data) => {
        data.forEach(element => {
            let elementRoles = '';
            element.roleSet.forEach(role => {
                elementRoles += role.name + ' ';
            });
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
        allUsersForm.innerHTML = outputForAllUsers;
    };
    await fetch(url)
        .then(res => res.json())
        .then(data => renderAllUsers(data));
}

createNewUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let roles = [];
    if ($('#checkRoles').val().includes("ROLE_USER")) {
            roles.push({"id":1,"name":"ROLE_USER"})
    }
    if ($('#checkRoles').val().includes("ROLE_ADMIN")) {
        roles.push({"id":2,"name":"ROLE_ADMIN"})
    }
    if ($('#checkRoles').val().length == 0) {
        alert("You should choose the role");
        return;
    }
    bodyJson = JSON.stringify({
        name: document.getElementById('newName').value,
        surName: document.getElementById('newSurName').value,
        age: document.getElementById('newAge').value,
        email: document.getElementById('newEmail').value,
        password: document.getElementById('newPassword').value,
        roleSet: roles
    })
    // try{
        const creatUserWithCatch = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyJson,
        });
        creatUserWithCatch
            .then(res => {
                console.log(res.status)
                if (res.status == 400) {
                    alert("User was not created, email should be unique");
                    return;
                }
                res.json()
            })
            .then(data => {
                const dataArray = [];
                dataArray.push(data);
                document.getElementById('addForm').reset();
                document.getElementById('home-tab').click();
                printUsers();
            });
    /*} catch (e) {
        alert("User was not created, email should be unique ")
    }*/

})

function editUser(o) {
    document.getElementById('editForm').reset();
    let id = $(o).closest('tr').find('td').eq(0).text();
    fetch(url + '/' + id)
        .then((response) => {
            response.json().then((data) => {
                $('#idEdit').val(data.id);
                $('#firstNameEdit').val(data.name);
                $('#lastNameEdit').val(data.surName);
                $('#ageEdit').val(data.age);
                $('#emailEdit').val(data.email);
                $('#passwordEdit').val(data.password);
            });
        });
}

async function updateUser() {
    let roles = [];
    if ($('#EditCheckRoles').val().includes("ROLE_USER")) {
        roles.push({"id":1,"name":"ROLE_USER"})
    }
    if ($('#EditCheckRoles').val().includes("ROLE_ADMIN")) {
        roles.push({"id":2,"name":"ROLE_ADMIN"})
    }
    if ($('#EditCheckRoles').val().length == 0) {
        alert("You should choose the role");
        return;
    }
    let jsonVar = JSON.stringify({
        id: document.getElementById("idEdit").value,
        name: document.getElementById("firstNameEdit").value,
        surName: document.getElementById("lastNameEdit").value,
        age: document.getElementById("ageEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("passwordEdit").value,
        roleSet: roles
    })
    await fetch(url, {
        method: 'PUT',
        body: jsonVar,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res.status)
        if (res.status == 400) {
            alert("User was not saved, email should be unique");
            return;
        }
        res.json()
    });
    printUsers();
}

function deleteRow(o) {
    let id = $(o).closest('tr').find('td').eq(0).text();
    userId = parseInt(id.substr(1, id.length - 1), 10)
    document.getElementById('deleteForm').reset();
    fetch(url + '/' + +userId)
        .then((response) => {
            response.json().then((data) => {
                $('#idDelete').val(data.id);
                $('#firstNameDelete').val(data.name);
                $('#lastNameDelete').val(data.surName);
                $('#ageDelete').val(data.age);
                $('#emailDelete').val(data.email);
                let roles = data.roleSet;
                let newRoles = [];
                $('#newRoles option').each(function () {
                    newRoles[$(this).val()] = $(this).val();
                });
                roles.forEach(function (item) {
                    if (newRoles.includes(String(item.id))) {
                        $('#deleteRoles option[id=' + String(Number(item.id + 2)) + ']').prop('selected', true);
                    }
                })
            });
        });
};

async function deleteUser() {
    await fetch(url + '/' + userId, {
        method: 'DELETE',
    })
        .then(res => res.text())
        .then(res => console.log(res))
    let table = document.getElementById("usersTable");
    let selector = "tr[id='" + userId + "']";
    let row = table.querySelector(selector);
    row.parentElement.removeChild(row);
    printUsers();
}






