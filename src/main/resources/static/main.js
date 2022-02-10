$(document).ready(printUsers());

let allUsersForm = document.getElementById('listOfUsers');
let createNewUserForm = document.getElementById('createNewUserFormId');
let UpdateUserForm = document.getElementById('editForm');

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
            <tr>
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
                    <button type="button" class="btn btn-danger" data-toggle="modal" id="deleteModal" attr="data-target='#deleteModal' onclick="deleteRow(this)"">
                        Delete
                    </button>
                    <div id="deleteForm"></div>
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
// Create new user END--------------------------------------------------------------

// Update user START--------------------------------------------------------------


/*const drawEditForm = () => {
    let targetForm = document.getElementById('updateForm');
    let editId = document.getElementById('editModal')
    console.log(editId)
    // fetch(`${url}/${editId}`)
    let editFrom = `
                                                            <div class="modal fade" id="editForm"
                                                                 th:attr="id='editModal'+ ${user.id}"
                                                                 tabindex="-1"
                                                                 role="dialog"
                                                                 aria-labelledby="editModalLabel"
                                                                 aria-hidden="true">
                                                                <div class="modal-dialog" role="document">
                                                                    <div class="modal-content">
                                                                        <form th:action="@{/admin/edit}"
                                                                              modelAttribute="user"
                                                                              th:object="${user}"
                                                                              th:method="post">
                                                                            <div class="modal-header">
                                                                                <h5 class="modal-title"
                                                                                    th:attr="id='editModal'+ *{id}">Edit
                                                                                    user</h5>
                                                                                <button type="button" class="close"
                                                                                        data-dismiss="modal"
                                                                                        aria-label="Close">
                                                                                    <span aria-hidden="true">x</span>
                                                                                </button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <input type="hidden"
                                                                                       id="idEdit"
                                                                                       th:value="*{id}"
                                                                                       th:name="id"/>
                                                                                <div class="form-group text-center">
                                                                                    <label class="center-block">
                                                                                        <span class="font-weight-bold">First Name</span>
                                                                                    </label>
                                                                                    <input type="text"
                                                                                           id="firstNameEdit"
                                                                                           class="form-control collection-ville
                                                                                    text-center"
                                                                                           th:value="*{name}"
                                                                                           th:name="name"/>
                                                                                </div>
                                                                                <div class="form-group text-center">
                                                                                    <label class="center-block">
                                                                                        <span class="font-weight-bold">Last Name</span>
                                                                                    </label>
                                                                                    <input type="text"
                                                                                           id="lastNameEdit"
                                                                                           class="form-control collection-ville
                                                                                    text-center"
                                                                                           th:value="*{surName}"
                                                                                           th:name="surName"/>
                                                                                </div>
                                                                                <div class="form-group text-center">
                                                                                    <label class="center-block">
                                                                                        <span class="font-weight-bold">Age</span>
                                                                                    </label>
                                                                                    <input type="text"
                                                                                           id="AgeEdit"
                                                                                           class="form-control collection-ville
                                                                                    text-center"
                                                                                           th:value="*{age}"
                                                                                           th:name="age"/>
                                                                                </div>
                                                                                <div class="form-group text-center">
                                                                                    <label class="center-block">
                                                                                        <span class="font-weight-bold">Email</span>
                                                                                    </label>
                                                                                    <input type="email"
                                                                                           id="emailEdit"
                                                                                           class="form-control collection-ville
                                                                                    text-center"
                                                                                           th:value="*{email}"
                                                                                           th:name="email"/>
                                                                                </div>
                                                                                <div class="form-group text-center">
                                                                                    <label class="center-block">
                                                                                        <span class="font-weight-bold">Password</span>
                                                                                    </label>
                                                                                    <input type="password"
                                                                                           id="passwordEdit"
                                                                                           class="form-control collection-ville
                                                                                    text-center"
                                                                                           th:value="*{password}"
                                                                                           th:name="password"/>
                                                                                </div>
                                                                                <div class="form-group text-center">
                                                                                    <label class="center-block">
                                                                                        <span class="font-weight-bold">Role</span>
                                                                                    </label>
                                                                                    <select class="form-control"
                                                                                            id="EditCheckRoles"
                                                                                            size="2"
                                                                                            multiple="multiple"
                                                                                            th:name="checkRoles">
                                                                                        <option th:each="role : ${allRoles}"
                                                                                                th:value="${role}"
                                                                                                th:text="${role}">
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="modal-footer">
                                                                                    <button type="button"
                                                                                            class="btn btn-secondary"
                                                                                            data-dismiss="modal">
                                                                                        Close
                                                                                    </button>
                                                                                    <button class="btn btn-primary"
                                                                                            type="submit"
                                                                                            value="Update">
                                                                                        Edit
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
    `;
    targetForm.innerHTML = editFrom;
}*/

// Update user END--------------------------------------------------------------
/*
function editUser(o) {
    allUsersForm.addEventListener('click', (e) => {
        e.preventDefault();
        let delButtonIsPressed = e.target.id == 'deleteModal';
        let editButtonIsPressed = e.target.id == 'editModal';
        let id = e.target.parentElement.dataset.id;
        if (editButtonIsPressed) {
            fetch(url + '/' + id)
                .then((response) => {
                    response.json().then((data) => {
                        $('#idEdit').val(data.id);
                        $('#firstNameEdit').val(data.name);
                        $('#lastNameEdit').val(data.surName);
                        $('#AgeEdit').val(data.age);
                        $('#emailEdit').val(data.email);
                        $('#passwordEdit').val(data.password);

                        var roles = data.roles;
                        var newRoles = [];
                        $('#EditCheckRoles option').each(function () {
                            newRoles[$(this).val()] = $(this).val();
                        });
                        roles.forEach(function (item) {
                            if (newRoles.includes(String(item.id))) {
                                $('#editRoles option[id=' + item.id + ']').prop('selected', true);
                            }
                        })
                    });
                });

            // fetch(`${url}/${id}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     }
            // })
            // // .then(res => res.json())
            // // .then(() => location.reload())
            // printUsers();
        }
    })
    // document.getElementById('editForm').reset();
    // let id = $(o).closest('tr').find('td').eq(0).text();
    // fetch(url + id)
    //     .then((response) => {
    //         response.json().then((data) => {
    //             $('#idEdit').val(data.id);
    //             $('#firstNameEdit').val(data.name);
    //             $('#lastNameEdit').val(data.surName);
    //             $('#AgeEdit').val(data.age);
    //             $('#emailEdit').val(data.email);
    //             $('#passwordEdit').val(data.password);
    //
    //             var roles = data.roles;
    //             var newRoles = [];
    //             $('#EditCheckRoles option').each(function () {
    //                 newRoles[$(this).val()] = $(this).val();
    //             });
    //             roles.forEach(function (item) {
    //                 if (newRoles.includes(String(item.id))) {
    //                     $('#editRoles option[id=' + item.id + ']').prop('selected', true);
    //                 }
    //             })
    //         });
    //     });
};

function updateUser() {
    let newRoles2 = '?checkRoles=';
    let optionList = document.getElementById('EditCheckRoles').options;
    [].forEach.call(optionList, function (el) {
        newRoles2 += el.outerText + ',';
    });
    let rolesString = newRoles2.substr(0, newRoles2.length - 1);

    // let roles = '?roles=';
    // let newRoles = $('#EditCheckRoles').val();
    // newRoles.forEach(function (item) {
    //     roles += item + ',';
    // })
    // let rolesString = roles.substr(0, roles.length - 1);
    let jsonVar = {
        id: document.getElementById("idEdit").value,
        firstName: document.getElementById("firstNameEdit").value,
        lastName: document.getElementById("lastNameEdit").value,
        lastName: document.getElementById("AgeEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("passwordEdit").value
    };
    let response = fetch(url + '/' + rolesString, {
        method: 'PUT',
        body: JSON.stringify(jsonVar),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    $("#usersTable > tbody").empty();
    printUsers();
}
*/

// UpdateUserForm.addEventListener('button', (e) => {
//     e.preventDefault();
//
//     let editButtonIsPressed = e.target.id == 'editModal';
//     let id = e.target.parentElement.dataset.id;
//     if (delButtonIsPressed) {
//         fetch(`${url}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         })
//         // .then(res => res.json())
//         // .then(() => location.reload())
//         printUsers();
//     }
//
//
//     let newRoles2 = '?checkRoles=';
//     let optionList = document.getElementById('checkRoles').options;
//     [].forEach.call(optionList, function (el) {
//         newRoles2 += el.outerText + ',';
//     });
//     let roles1 = newRoles2.substr(0, newRoles2.length - 1);
//
//     console.log(roles1)
//
//     bodyJson = JSON.stringify({
//         name: document.getElementById('newName').value,
//         surName: document.getElementById('newSurName').value,
//         age: document.getElementById('newAge').value,
//         email: document.getElementById('newEmail').value,
//         password: document.getElementById('newPassword').value
//     })
//     console.log(bodyJson)
//     fetch(url + roles1, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: bodyJson
//     })
//
//         .then(res => res.json())
//         .then(data => {
//             // console.log(data)
//             const dataArray = [];
//             dataArray.push(data);
//
//             // alert("New User added");
//             document.getElementById('addForm').reset();
//             // document.getElementById('usersTable').reset();
//             document.getElementById('home-tab').click();
//             $("#usersTable > tbody").empty();
//             printUsers();
//             // renderAllUsers(dataArray);
//         });
// });
// Update user END--------------------------------------------------------------

// delete user START--------------------------------------------------------------
/*allUsersForm.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(document)
    let delButtonIsPressed = e.target.id == 'deleteModal';
    let editButtonIsPressed = e.target.id == 'editModal';
    let id = e.target.parentElement.dataset.id;
    if (delButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        // .then(res => res.json())
        // .then(() => location.reload())
        printUsers();
    } else if (editButtonIsPressed) {
        drawEditForm();
    }
})*/
// delete user FINISH--------------------------------------------------------------

function editUser(o) {
    document.getElementById('editForm').reset();
    var id = $(o).closest('tr').find('td').eq(0).text();
    console.log("id: " + id)
    // var url = url + id;
    fetch(url + '/' + id)
        .then((response) => {
            response.json().then((data) => {
                console.log('data:')
                console.log(data)
                $('#idEdit').val(data.id);
                console.log('data.id: ' + data.id)
                $('#firstNameEdit').val(data.name);
                console.log('data.name: ' + data.name)
                $('#lastNameEdit').val(data.surName);
                $('#ageEdit').val(data.age);
                $('#emailEdit').val(data.email);
                $('#passwordEdit').val(data.password);



                // var roles = data.rolSet;
                // console.log('roles: ' + roles)
                // var newRoles = [];
                // $('#EditCheckRoles option').each(function () {
                //     newRoles[$(this).val()] = $(this).val();
                // });
                // roles.forEach(function (item) {
                //     if (newRoles.includes(String(item.id))) {
                //         $('#EditCheckRoles option[id=' + item.id + ']').prop('selected', true);
                //     }
                // })
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
    var response = fetch(url + roles1, {
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








