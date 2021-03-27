'use strict';

let arrayOfObjects=[];

let button1=$('#page1');
let button2=$('#page2');
let arrayOfPage1=[];
let keywords1=[];
let arrayOfPage2=[];
let keywords2=[];


$('document').ready(getData);

readDataFromPage2();

function Data(image_url,title,description,keyword,horns){
    this.image_url=image_url;
    this.title=title;
    this.description=description;
    this.keyword=keyword;
    this.horns=horns;
    arrayOfObjects.push(this);
}
Data.prototype.renderFunction=function(){

    let div=$('#photo-template').html();
    let html=Mustache.render(div,this);

    return html;


};



function getData(){
    
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    $.ajax('data/page-1.json',ajaxSettings).then(data=>{
       
        data.forEach(element => {
            let getdata=new Data(element.image_url,element.title,element.description,element.keyword,element.horns);
            arrayOfPage1.push(getdata);
            if(!keywords1.includes(getdata.keyword)){keywords1.push(getdata.keyword);}
            $('#dataLlist').append(getdata.renderFunction()) ;
          

        });
        keywords1.forEach(element=>{
            $('#keys').append($('<option>', {
                text: element
            }));
        })
    })
    $('#sorting').on('change',function() {
        sortTheContent(arrayOfObjects);
        arrayOfObjects.forEach((element,index)=>{
                $('#dataLlist').append(element.renderFunction()) ;
                
            })
    })

}

    $(document).ready(function() {
    
        $('#keys').on('change',function() {
           
            let theOption= $("#keys option:selected" ).text();
            $('#dataLlist').empty();
        
            arrayOfObjects.forEach((element,index)=>{
            if (element.keyword===theOption){
                $('#dataLlist').append(element.renderFunction()) ;
                
            }else  if ('Filter by Keyword'===theOption){
                $('#dataLlist').append(element.renderFunction()) ;
                
            }
        })
    
        })
        $('#sorting').on('change',function() {
            sortTheContent(arrayOfObjects);
            $('#dataLlist').empty();
            arrayOfObjects.forEach((element,index)=>{
               
                    $('#dataLlist').append(element.renderFunction()) ;
        })
        
        })
    })

$(document).ready(function() {

   
    button1.click(function(){
        arrayOfObjects=arrayOfPage1;
        $('#dataLlist').empty();
        $('#keys').empty();
        arrayOfPage1.forEach((element,index) => {
                $('#dataLlist').append(element.renderFunction()) ;
            });
            $('#keys').append($('<option>', {
                text: 'Filter by Keyword'
            }));
            keywords1.forEach(element=>{
                $('#keys').append($('<option>', {
                    text: element
                }));
            })
            $('#sorting').on('change',function() {
                sortTheContent(arrayOfPage1);
                $('#dataLlist').empty();
                arrayOfPage1.forEach((element,index) => {
                    $('#dataLlist').append(element.renderFunction()) ;
                });
            })
           
    })

    button2.click(function(){
        arrayOfObjects=arrayOfPage2;
        $('#dataLlist').empty();
        $('#keys').empty();
        arrayOfPage2.forEach(element => {
               
                $('#dataLlist').append(element.renderFunction()) ;
            });
            $('#keys').append($('<option>', {
                text: 'Filter by Keyword'
            }));
            keywords2.forEach(element=>{
                $('#keys').append($('<option>', {
                    text: element
                }));
            })
            $('#sorting').on('change',function() {
                sortTheContent(arrayOfPage2);
                $('#dataLlist').empty();
                arrayOfPage2.forEach(element => {
               
                    $('#dataLlist').append(element.renderFunction()) ;
                });
            })
           
    })
})


    function sortTheContent(selectedObj){
        let sortingOption= $("#sorting option:selected" ).text();
        if(sortingOption==='title'){
            selectedObj.sort((a,b)=> b.title.toLowerCase() > a.title.toLowerCase() ?  -1:  1 );
        }else if(sortingOption==='horns'){
            selectedObj.sort((a,b)=>a.horns>b.horns?1:-1);
        }
    }

function readDataFromPage2(){

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    $.ajax('data/page-2.json',ajaxSettings).then(data=>{

        data.forEach(element => {
            let getdata=new Data(element.image_url,element.title,element.description,element.keyword,element.horns);
            arrayOfPage2.push(getdata);
            if(!keywords2.includes(getdata.keyword)){keywords2.push(getdata.keyword);}
        });
    })
}





























// function Horns(animals) {
//   this.image = animals.image_url;
//   this.title = animals.title;
//   this.description = animals.description;
//   this.keyword = animals.keyword;
//   this.horns = animals.horns;

// }

// Horns.prototype.render = function () {
//   let newOption = $('<option></option>').text(this.keyword);
//   $('select').append(newOption);
//   let dataClone = $('#photo-template').clone();
//   dataClone.find('h2').text(this.title);
//   dataClone.find('img').attr('src', this.image);
//   dataClone.find('p').text(this.description);
//   dataClone.attr('class', this.keyword);
//   dataClone.attr('id', this.keyword);
//   $('main').append(dataClone);
// };


// Horns.prototype.render2 = function () {
//     let newOption = $('<option></option>').text(this.keyword);
//     $('select').append(newOption);
//     let dataClone = $('#photo-template').clone();
//     dataClone.find('h2').text(this.title);
//     dataClone.find('img').attr('src', this.image);
//     dataClone.find('p').text(this.description);
//     dataClone.attr('class', this.keyword);
//     dataClone.attr('id', this.keyword);
//     $('main').append(dataClone);
//   };

// const ajaxSettings = {
//   method: 'get',
//   dataType: 'json'
// };

// $.ajax('data/page-1.json', ajaxSettings).then((data) => {
//   data.forEach(Element => {
//     let newAnimal = new Horns(Element);
//     newAnimal.render();
//   });
// });

// $.ajax('data/page-2.json', ajaxSettings).then((data) => {
//     data.forEach(Element => {
//       let newAnimal = new Horns(Element);
//       newAnimal.render2();
//     });
//   });

// $(document).ready(function(){
//   $('select').on('change', function(){
//     let selected = this.value;
//     console.log(this.value);
//     $('section').hide();
//     $(`.${selected}`).show();
//   });
// });


// Horns.prototype.toHtml = function() {

//     let template = $('#mustache-template').html();

//     console.log(template);
//     let html = Mustache.render(template, this);
//     return html;
// }
