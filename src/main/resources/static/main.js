$(document).ready(printUsers());


let createNewUserForm = document.getElementById('createNewUserFormId');
let url = 'http://localhost:8080/api/users';
// let outputForAllUsers = '<table  class="table table-striped bg-white text-dark">' +
//     '<tr class="bg-white text-dark">' +
//     '<th>ID</th>' +
//     '<th>First Name</th>' +
//     '<th>Last Name</th>' +
//     '<th>Age</th>' +
//     '<th>Email</th>' +
//     '<th>Role</th>' +
//     '<th>Edit</th>' +
//     '<th>Delete</th>' +
//     '</tr>' +
//     '<tbody id="usersTable">';


// const renderAllUsers = (data) => {
//     data.forEach(element => {
//         let elementRoles = '';
//         element.roleSet.forEach(role => {
//                 elementRoles += role.name + ' ';
//             }
//         );
//         outputForAllUsers += `
//             <tr>
//                 <td> ${element.id} </td>
//                 <td> ${element.name} </td>
//                 <td> ${element.surName} </td>
//                 <td> ${element.age} </td>
//                 <td> ${element.email} </td>
//                 <td> ${elementRoles} </td>
//                 <td>
//                     <button type="button" class="btn btn-info" data-toggle="modal" id="editModal" attr="data-target='#editModal' onclick="editUser(this)">
//                         Edit
//                     </button>
//                 </td>
//                 <td>
//                     <button type="button" class="btn btn-danger" data-toggle="modal" id="deleteModal" attr="data-target='#deleteModal' onclick="deleteRow(this)"">
//                         Delete
//                     </button>
//                 </td>
//             </tr>`
//     });
//     outputForAllUsers += '</tbody>\n' +
//         '    </table>';
//     allUsersForm.innerHTML = outputForAllUsers;
// };

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
                <td>
                    <button type="button" class="btn btn-info" data-toggle="modal" id="editModal" attr="data-target='#editModal' onclick="editUser(this)">
                        Edit
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" data-toggle="modal" id="deleteModal" attr="data-target='#deleteModal' onclick="deleteRow(this)"">
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

createNewUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newRoles2 = '?checkRoles=';
    let optionList = document.getElementById('checkRoles').options;
    [].forEach.call(optionList, function (el) {
        newRoles2 += el.outerText + ',';
    });
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

            // alert("New User added");
            document.getElementById('addForm').reset();
            // document.getElementById('usersTable').reset();
            document.getElementById('home-tab').click();
            $("#usersTable > tbody").empty();
            printUsers();
            // renderAllUsers(dataArray);
        });
});


allUsersForm.addEventListener('click', (e) => {
    console.log(e.target.id);
})

// function editUser(o) {
//     document.getElementById('editForm').reset();
//     let id = $(o).closest('tr').find('td').eq(0).text();
//     fetch(url + id)
//         .then((response) => {
//             response.json().then((data) => {
//                 $('#idEdit').val(data.id);
//                 $('#firstNameEdit').val(data.name);
//                 $('#lastNameEdit').val(data.surName);
//                 $('#AgeEdit').val(data.age);
//                 $('#emailEdit').val(data.email);
//                 $('#passwordEdit').val(data.password);
//
//                 var roles = data.roles;
//                 var newRoles = [];
//                 $('#EditCheckRoles option').each(function () {
//                     newRoles[$(this).val()] = $(this).val();
//                 });
//                 roles.forEach(function (item) {
//                     if (newRoles.includes(String(item.id))) {
//                         $('#editRoles option[id=' + item.id + ']').prop('selected', true);
//                     }
//                 })
//             });
//         });
// };








