'use strict';

var FbAPI = (function(oldFirebase){

  oldFirebase.getOldFamily = function(apiKeys){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'GET',
        url:`${apiKeys.databaseURL}/family.json`
      }).then((response) => {
        let items = [];
        Object.keys(response).filter(key => response[key] !== null).forEach(function(key){
          response[key].id = key;
          items.push(response[key]);
        });
        resolve(items);
      }, (error) => {
        reject(error);
      });
    });
  };

 oldFirebase.addFamilyMember = function(apiKeys, newItem){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        url:`${apiKeys.databaseURL}/family.json`,
        data: JSON.stringify(newItem),
        dataType: 'json'
      }).then((response) => {
        console.log("response from POST", response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  };

oldFirebase.deleteFamilyMember = function(apiKeys, itemId){
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'DELETE',
        url:`${apiKeys.databaseURL}/family/${itemId}.json`
      }).then((response) => {
        console.log("response from Delete", response);
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  };

  return oldFirebase;
})(FbAPI || {});