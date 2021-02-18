let userId = null;
let userfname = null;
let userlname = null;
let useremail = null;
let userimage = null;
let firsttime = true;
let listid = null;
let ListName = null;


const introDiv = $("#intro");
const signupDiv = $("#signup");
const loginDiv = $("#login");
const loggedDiv = $("#logged");
const dashboardDiv = $("#dashboard");
const listDiv = $("#list");
const todoListUL = $("#dashboard-todo-lists");
const settingsDiv = $("#settings");

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



function checkCookie() {
  var userid = getCookie("userId");
  console.log(userid);
  if (userid != "" && userid !=="undefined") {
    $.ajax({  
      url:"getUserById.php",  
      method:"GET",
      data:{Userid:userid}, 
      dataType: "json", 
      beforeSend:() => {  
           $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:(data) => {
        let myuser = data;
        userId = userid;
        console.log(myuser[0]);
        userfname = myuser[0]["firstname"];
        userlname = myuser[0]["lastname"];
        useremail = myuser[0]["email"];
        console.log(myuser[0]["ProfileImage"]);
        userimage = myuser[0]['ProfileImage'];
        console.log(userfname);
        loginUser();
      },
      onerror: () => {
        console.log("connection failed");  
      }
  });
  } 
}


$("#signup-button").click((e) => 
{
  e.preventDefault();
  hideAllSections();
  displayIntro();
  displaySignup();
});

$("#login-button").click((e) => {
  e.preventDefault();
  hideAllSections();
  displayIntro();
  displayLogin();
});

$("#dashboard-button").click((e) => {
  e.preventDefault();
  hideAllSections();
  displayLoggedinButtons();
  displayDashboard();
});

$("#logout-button").click((e) => {
  e.preventDefault();
  removeDashBoard()
  logoutUser();
});
$("#settings-button").click((e) => {
  e.preventDefault();
  hideAllSections();
  displayLoggedinButtons();
  displaySettings();
});

function displayIntro() {
  introDiv.removeClass("hide");
}

function displaySignup() {
  $("#signup-form").trigger("reset");
  signupDiv.removeClass("hide");
}

function displayLogin() {
  $("#login-form").trigger("reset");
  loginDiv.removeClass("hide");
}

function hideAllSections() {
  introDiv.addClass("hide");
  loggedDiv.addClass("hide");
  signupDiv.addClass("hide");
  loginDiv.addClass("hide");
  dashboardDiv.addClass("hide");
  listDiv.addClass("hide");
  settingsDiv.addClass("hide");
}

function removeDashBoard(){
  todoListUL.empty();
}

function displayIntro() {
  introDiv.removeClass("hide");
}

$("#login_button").click((e) => {
  e.preventDefault();

  $.ajax({  
    url:"checkIfUserExists.php",  
    method:"GET",
    data:$('#login-form').serialize(), 
    dataType: "json", 
    beforeSend:() => {  
         $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
    },  
    success:(data) => {
      if(data == "didnt find match"){
        window.alert(data);
      } else {
        console.log(data);
        let myuser = data;
        userId = myuser["Id"];
        userfname = myuser["firstname"];
        userlname = myuser["lastname"];
        useremail = myuser["email"];
        setCookie("userId", userId, 365);
        loginUser();
      }
      
    },
    onerror: () => {
      console.log("connection failed");  
    }
});
});


$("#register-button").click((e) => {
    e.preventDefault();
    const signupEmail = $("#signup-email").val();
    isEmailExists(signupEmail);
  });

  function checkErrors(data,email){
    const signupFirst = $("#signup-first").val();
    const signupLast = $("#signup-last").val();
    const signupPassword = $("#signup-password").val();
    const signupTerms = $("#signup-terms").prop("checked");
    let signupError = "There are some errors:";
    let errors = false;
  
    if (signupFirst === "") {
      signupError += " First name is empty.";
      errors = true;
    }
  
    if (signupLast === "") {
      signupError += " Last name is empty.";
      errors = true;
    }
  
    if (email === "") {
      signupError += " Email is empty.";
      errors = true;
    }
    else if(data === "false"){
      signupError += " email already used.";
      errors = true;
    }
  
    if (signupPassword === "") {
      signupError += " Password is empty.";
      errors = true;
    }
    
    
    if (signupTerms === false) {
      signupError += " You must agree with our terms of use.";
      errors = true;
    }


    signupError += checkValidation(signupFirst, signupLast, email, signupPassword);
    if (errors) {
      showError("signup-errors", signupError);
      return;
    } 
    console.log("hello");
    hideAllErrors();
    addNewUser2DB();
  }

  function isEmailExists(email){
    $.ajax({  
      url:"isEmailExists.php",  
      method:"GET",  
      data:{Email:email},  
      beforeSend:() => {  
          $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:(data) => {
        console.log(data);
        checkErrors(data, email);
      },
      onerror: () => {
        console.log("connection failed");  
      }
  });
  }

  function showError(errorId, message) {
    const loginErrors = $("#"+errorId);
    loginErrors.text(message);
    loginErrors.removeClass("hide");
  }

  function hideAllErrors() {
    $("#signup-errors").addClass("hide");
    $("#login-errors").addClass("hide");
    $("#list-title-errors").addClass("hide");
    $("#new-item-errors").addClass("hide");
    $("#settings-errors").addClass("hide");
    console.log("hello");
  }

  function loginUser() {
    hideAllSections();
    displayDashboard();
    displayLoggedinButtons();
  }

  function displayDashboard() {
    dashboardDiv.removeClass("hide");
    $("#todo-list-items").empty();
    console.log(firsttime);
    
    
      firsttime = false;
      
      todoListUL.empty();
      console.log(userId);

      $.ajax({  
        url:"getAllUsersLists.php",  
        method:"GET",  
        data:{action:userId},  
        beforeSend:() => {  
            $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
        },  
        success:(data) => {
          console.log("here1");
          todoListUL.append(data);
            
        },
        onerror: () => {
          console.log("connection failed");  
        }
    });
  
    
  }
  function createNewList(name, userid){
    $.ajax({  
      url:"addList.php",  
      method:"GET",  
      data:{userId:userid, Name:name, type:1},  
      beforeSend:() => {  
           $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:(data) => {
        displayDashboard();
                
      },
      onerror: () => {
        console.log("connection failed"); 
      }
  });
  }

  function showSelectedList(title) {
    if (title === undefined) {
      title = prompt("Please enter your new to do list name", "new list");
      if(title != null){
        createNewList(title, userId)
      }

    } else {
      ListName = title;
      hideAllSections();
      displayLoggedinButtons();
      $("#todo-list-items").empty();
      displayList(title);
      $("#list").find("h3").text(title);
      $("#list-title").text(title);
    }
  }

  function displayList(title) {
    listDiv.removeClass("hide");
    getListByName(title);
    
  }

   function getListByName(title){
    $.ajax({  
      url:"getListByName.php",  
      method:"GET",  
      data:{action:title},  
      dataType: "json", 
      beforeSend:() => {  
           $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:(data) => {
        listid = data[0]["ListId"];
        displayListItemsByListId(listid);
      },
      onerror: () => {
        console.log("connection failed");  
      }
  });
  }

  

  function changeItemDone(content, listid, done){
    $.ajax({  
      url:"changeItemDone.php",  
      method:"GET",  
      data:{ListId:listid, Content:check_input(content), Done:done},  
      beforeSend:() => {  
           $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:(data) => {
          
      },
      onerror: () => {
        console.log("connection failed");  
      }
  });
  }
  function displayListItemsByListId(listId) {
    console.log(listId);
    $.ajax({  
      url:"getAllItemsByListId.php",  
      method:"GET",  
      data:{listId:listId},  
      beforeSend:() => {  
           $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:(data) => {
          listid = listId;
          const todoItemsUL = $("#todo-list-items");
          todoItemsUL.empty();
          todoItemsUL.html(data);
          /*
          let items = JSON.parse(data);
          for (const listItem of items) {
            const newItem = document.createElement("li");
            newItem.innerText = listItem['content'];
            if (listItem['done'] == "1") {
              $(newItem).addClass("done");
            }
            todoItemsUL.append(newItem);
          }
          */
          
      },
      onerror: () => {
        console.log("connection failed");  
      }
  });
  }

  $("#create-new-list").click((e) => {
    e.preventDefault();
    showSelectedList();
  });
  function displayLoggedinButtons() {
    loggedDiv.removeClass("hide");
    displayLoggedInName();
  }

  // add new item to list
  $("#new-item-form").submit((e) => {
  e.preventDefault();
  
  const newValue = check_input($("#list-new-item").val());
  if (newValue === "") {
    return;
  }
  console.log(newValue);
  $.ajax({  
    url:"addItemList.php",  
    method:"GET",  
    data:{ListId:listid, Content:newValue},  
    beforeSend:() => {  
         $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
    },  
    success:() => {
      displayListItemsByListId(listid);
    },
    onerror: () => {
      console.log("connection failed");  
    }
});
$("#list-new-item").val("");
}); 
  

  function displayLoggedInName() {
    // display user name
    const firstName = $("#loggedin-user-firstname");
    const lastName = $("#loggedin-user-lastname");
    console.log(userfname);
    firstName.text(userfname);
    lastName.text(userlname);
    setImage(userimage);
  }

  

  const dashboardListUL = dashboardDiv.find("div");
  dashboardListUL.click((e) => {

  if (e.target.nodeName !== "A") {
    return;
  }
  if(e.target.getAttribute('href') === "#")
    showSelectedList(e.target.innerText);
});

  function addNewUser2DB() {
    $.ajax({  
        url:"addNewUser.php",  
        method:"POST",  
        data:$('#signup-form').serialize(), 
        dataType: "json", 
        beforeSend:() => {  
             $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
        },  
        success:(data) => {
          console.log(data);
          userId = data["id"]["Id"];
          userfname = data["fname"];
          userlname = data["lname"];
          useremail = data["email"];
          userimage = data["ProfileImage"];
          setCookie("userId", userId, 365);
          loginUser();
        },
        onerror: () => {
          console.log("connection failed");  
        }
    });
}

function displaySettings() {
  settingsDiv.removeClass("hide");


  // complete user info
  $("#settings-first").val(userfname);
  $("#settings-last").val(userlname);
  $("#settings-email").val(useremail);
}


const listItemsUL = $("#todo-list-items");
listItemsUL.click((e) => {
if($(e.target).hasClass("done")){
    $(e.target).removeClass("done");
    console.log($(e.target).text()+", "+ listid)
    changeItemDone($(e.target).text(), listid, 0);
} else {
  $(e.target).addClass("done");
  console.log($(e.target).text()+", "+ listid)
  changeItemDone($(e.target).text(), listid, 1);
}
    
});

function checkValidation(fname, lname, email, password){
  let errors = "";
  console.log(hasNumbers(fname));
  if(!hasNumbers(fname)){
    fname = check_input(fname);
  }
  else if(fname != ""){
    errors += " first name can not have numbers"
  }
  if(!hasNumbers(lname)){
    lname = check_input(lname);
  }
  else if(lname != ""){
    errors += " last name can not have numbers"
  }
    email = check_input(email);
    password = check_input(password);
    return errors;
}

  function hasNumbers(t){
    var regex = /\d/;
    return regex.test(t);
}     


function check_input(data){
    data = data.replace(/^\s+|\s+$/g,'');
    data = data.replace(/\\'/g,'\'').replace(/\"/g,'"').replace(/\\\\/g,'\\').replace(/\\0/g,'\0');

    data = data.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
    return data;
}

function logoutUser() {
  userId = null;
  userfname = null;
  userlname = null;
  useremail = null;
  firsttime = true;
  listid = null;
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";//removes cookie
  hideAllSections();
  displayIntro();
}

function updateUser(){

  let first = $("#settings-first").val();
  let last = $("#settings-last").val();
  let email = $("#settings-email").val();
  let password = $("#settings-password").val();
  console.log(last);
  if(first != "" && last != "" && email != ""){
    first = check_input(first);
    last = check_input(last);
    email = check_input(email);

    $.ajax({  
      url:"UpdateUser.php",  
      method:"POST",
      dataType:"text",  
      data:{Fname:first, Lname:last, Email:email, Password:password, Id:userId}, 
      beforeSend:() => {  
          $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:() => {
        userfname = first;
        userlname = last;
        useremail = email;
        hideAllSections();
        displayLoggedInName();
        displayDashboard();
        displayLoggedinButtons()
      },
      onerror: () => {
        console.log("connection failed");  
      }
  });
  }
}



function uploadImage(){
  let formdata = new FormData(document.getElementById("myform"));
  formdata.append('id',userId);
  $.ajax({  
      url:"uploadImageUser.php",  
      method:"POST",  
      dataType: 'text',
      processData: false,
      contentType: false,
      cache: false,
      data:formdata,  
      success:(data) => {
        userimage = data;
        setImage(data);
      },
      onerror: () => {
        console.log("connection failed");  
      }
      
  });
}

function setImage(imageRoot){
  console.log(imageRoot);
  $("#loggedin-user-image").attr("src",imageRoot);
}

function uploadImageToList(){
  let formdata = new FormData(document.getElementById("itemform"));
  formdata.append('listId',listid);
  $.ajax({  
    url:"uploadImageItem.php",  
    method:"POST",  
    dataType: 'text',
    processData: false,
    contentType: false,
    cache: false,
    data:formdata,  
    success:(data) => {
      displayListItemsByListId(listid);
    },
    onerror: () => {
      console.log("connection failed");  
    }
});
}

function uploadImageToDashBoard(){
  if(document.getElementById("textfile").value != null){
    title = prompt("Please enter your new to do list name", "new list");
    if(title != ""){
      createNewListFromText(title, userId);
    }
  }
}
function createNewListFromText(name, userid){
  if(document.getElementById("textfile").files.length > 0){
    $.ajax({  
      url:"addList.php",  
      method:"GET",  
      data:{userId:userid, Name:name, type:1},  
      beforeSend:() => {  
           $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
      },  
      success:(listid) => {
        let formdata = new FormData(document.getElementById("textform"));
        $.ajax({  
          url:"uploadTextFileToList.php",  
          method:"POST",  
          dataType: 'json',
          processData: false,
          contentType: false,
          cache: false,
          data:formdata,  
          success:(data) => {
            for(let i=0; i<data.length; i++){
              data[i] = check_input(data[i]);
            }
            $.ajax({  
              url:"addItemsList.php",  
              method:"GET",  
              data:{ListId:listid, ItemsList:data},  
              beforeSend:() => {  
                  $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
              },  
              success:() => {
              },
              onerror: () => {
                console.log("connection failed");  
              }
            });
                
            displayDashboard();
          },
          onerror: () => {
            console.log("connection failed");  
          }
        });
                
      },
      onerror: () => {
        console.log("connection failed"); 
      }
  });

  } else {
    window.alert("you must choose a file");
  }
  
}

function convertListToTextFile(){
  $.ajax({  
    url:"convertListToTextFile.php",  
    method:"POST",  
    data:{ListId:listid, ListName:ListName, UserId:userId},  
    beforeSend:() => {  
        $('#txtSuccess').html('<span class="text-info">Loading response...</span>');  
    },  
    success:() => {
      hideAllSections();
      displayDashboard();
      displayLoggedInName();
      displayLoggedinButtons();
    },
    onerror: () => {
      console.log("connection failed");  
    }
  });

}

