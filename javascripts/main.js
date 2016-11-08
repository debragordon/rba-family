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
      newFamilyMember += `<h3 class='line padThis'>${item.firstName} ${item.lastName}</h3>`;
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

// writes family member database to the DOM
  FbAPI.firebaseCredentials().then(function(keys){
    console.log("keys", keys);
    apiKeys = keys;
    firebase.initializeApp(keys);
    addFamilyMemberToList();
  });

// adds family member to the database
  $('#family-member-submit').on('click', function(){
    console.log("clicked add family member button");
    let interestArray = $('#interests-text-area').val().split(',');
    console.log("interest array", interestArray);
    let newFamilyMember = {
      "firstName": $('#first-name-input').val(),
      "lastName": $('#last-name-input').val(),
      "age": $('#age-input').val(),
      "gender": $('#family-member-gender').val(),
      "interests": interestArray
    };
    // newFamilyMember.interests = interestArray;
    console.log("newFamilyMember Object", newFamilyMember);
    FbAPI.addFamilyMember(apiKeys, newFamilyMember).then(function(){
      addFamilyMemberToList();
    });
    $('#interests-text-area').val("");
    $('#first-name-input').val("");
    $('#last-name-input').val("");
    $('#age-input').val("");
    $('#family-member-gender').val("");
  });

// deletes family member from the DB and rewrites the new db to the DOM
  $('#family-list').on("click", ".delete", function(){
    let itemId = $(this).data("fbid");
    FbAPI.deleteFamilyMember(apiKeys, itemId).then(function(){
      addFamilyMemberToList();
    });
  });

});

