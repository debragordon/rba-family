"use strict";

console.log("testing ... this is now connected");

// display old family members

// on click grab the following:
//// grab first name

//// grab last name

//// grab gender

//// grab age

//// grab 4 skills

let apiKeys = {};

function addFamilyMemberToList (){
  FbAPI.getOldFamily(apiKeys).then(function(items){
    console.log("items from FB", items);
    let $familyDiv = $('#family-list');
    $familyDiv.html("");
    items.forEach(function(item){
      let newFamilyMember = `<div data-fbid='${item.id}'>`;
      newFamilyMember += "<div class='col-sm-6'>";
      newFamilyMember += `<h3 class='line'>${item.firstName} ${item.lastName}</h3>`;
      // newFamilyMember += "<h1 class='line'></h1>";
      newFamilyMember += `<h5>${item.gender}</h5>`;
      newFamilyMember += `<h5>${item.age}</h5>`;
      newFamilyMember += "<h3>Interests</h3>";
      for (var i = 0; i < item.interests.length; i++) {
        newFamilyMember += `<h5>${item.interests[i]}</h5>`;
      }
      newFamilyMember += `<button type='submit' class='btn btn-danger delete' id='family-member-delete' data-fbid='${item.id}'>Delete</button>`;
      newFamilyMember += "</div>";
      // newFamilyMember += "<div class='col-sm-6'>";
      // newFamilyMember += "</div>";
      newFamilyMember += "</div>";
      $familyDiv.append(newFamilyMember);
    });
  });
}

$(document).ready(function(){

  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys = keys;
    firebase.initializeApp(keys);
    addFamilyMemberToList();
  });

//   $('#add-todo-button').on('click', function(){
//     console.log("clicked new todo button");
//     let newItem = {
//       "task": $('#add-todo-text').val(),
//       "isCompleted" : false
//     };
//     FbAPI.addTodo(apiKeys, newItem).then(function(){
//       addFamilyMemberToList();
//     });
//   });

  $('#family-list').on("click", ".delete", function(){
    let itemId = $(this).data("fbid");
    FbAPI.deleteFamilyMember(apiKeys, itemId).then(function(){
      addFamilyMemberToList();
    });
  });

});

//how to write family member to the DOM
/////

