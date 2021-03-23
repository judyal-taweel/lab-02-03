'use strict';

function Horns(animals) {
  this.image = animals.image_url;
  this.title = animals.title;
  this.description = animals.description;
  this.keyword = animals.keyword;
  this.horns = animals.horns;

}

Horns.prototype.render = function () {
  let newOption = $('<option></option>').text(this.keyword);
  $('select').append(newOption);
  let dataClone = $('#photo-template').clone();
  dataClone.find('h2').text(this.title);
  dataClone.find('img').attr('src', this.image);
  dataClone.find('p').text(this.description);
  dataClone.attr('class', this.keyword);
  dataClone.attr('id', this.keyword);
  $('main').append(dataClone);
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-1.json', ajaxSettings).then((data) => {
  data.forEach(Element => {
    let newAnimal = new Horns(Element);
    newAnimal.render();
  });
});

$(document).ready(function(){
  $('select').on('change', function(){
    let selected = this.value;
    console.log(this.value);
    $('section').hide();
    $(`.${selected}`).show();
  });
});