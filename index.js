/* 
   lit-html snippet - Begin
   Add to the top of your code. Works with html or jsx!
   Formats html in a template literal  using the lit-html library 
   Syntax: html`<div> html or jsx here! variable </div>`
*/
//lit-html snippet - Begin
// let html = (strings, ...values) => {
//   let str = "";
//   strings.forEach((string, i) => {
//     str += string + (values[i] || "");
//   });
//   return str;
// };
//lit-html snippet - End

class LegoSet {
  constructor(
    setName,
    setId,
    categoryName,
    categoryId,
    coverImage,
    price,
    year,
    pieces,
    availability,
    link,
    notes,
    image2,
    image3,
    image4,
    image5
  ) {
    this.setName = setName;
    this.setId = setId;
    this.categoryName = categoryName;
    this.categoryId = categoryId;
    this.coverImage = coverImage;
    this.price = price;
    this.year = year;
    this.pieces = pieces;
    this.availability = availability;
    this.link = link;
    this.notes = notes;
    this.image2 = image2;
    this.image3 = image3;
    this.image4 = image4;
    this.image5 = image5;
  }
}

const url = "https://644435db914c816083b638ce.mockapi.io/LegoSets";

$.get(url).then((data) => {
  data.forEach((LegoSet) => {
    $("#botanical-accordion").append(`
            
            <div class="accordion-item botanical-item">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button"  data-bs-toggle="collapse" data-bs-target="#${LegoSet.setId}" aria-expanded="false" aria-controls="${LegoSet.setId}">
                        <div class="header-row hstack gap-5 ms-3 me-2" id="botanical-header" >
                            <img src="${LegoSet.coverImage}" class="main-image object-fit-contain" style="height:100px; width:100px;"></img>
                            <h3 class="set-name">${LegoSet.setName}</h3>
                        </div>
                    </button>
                </h2>
            

         

            <div id="${LegoSet.setId}" class="accordion-collapse" data-bs-parent="#botanical-accordion">
                <div class="accordion-body">
                    <div class="row row-main">
                        <div class="col-sm-6  align-items-center">
                            <img src="${LegoSet.coverImage}" class="img-fluid cover-image"/>
                        </div>   
                        <div class="col-sm-6 pb-sm-4">
                          <div class="container-fluid pt-3">
                              <p class="detail price lead">Price:  $${LegoSet.price} </p>
                              <p class="detail year lead">Year: ${LegoSet.year}</p>
                              <p class="detail pieces lead">Pieces: ${LegoSet.pieces}</p>
                              <p class="detail availability lead">Availability: ${LegoSet.availability}</p>
                              <p class="detail lead">Learn more at: <a class="lego-link" href=${LegoSet.link}>LEGO.com</a></p>
                          </div>
                        </div>  
                    </div>   
                     
                   
                      <div class="row photos container row-cols-2 row-cols-md-4 align-items-center">
                          <div class="col">
                              <img id="add-image-1" src="${LegoSet.image2}" class="object-fit-contain m-1 add-image"/>
                          </div> 
                          <div class="col"> 
                              <img id="add-image-2" src="${LegoSet.image3}" class="object-fit-contain m-1 add-image"/>
                          </div>  
                          <div class="col">   
                              <img id="add-image-3" src="${LegoSet.image4}" class="object-fit-contain m-1 add-image" />
                          </div> 
                          <div class="col"> 
                              <img id="add-image-4" src="${LegoSet.image5}" class="object-fit-contain m-1 add-image" />
                          </div> 
                      </div>  

                </div>   
            </div>
          </div>
            <hr id="item-hr">  

          `);
  });
});

//             `
//         )
//    })} );

// Get the reference to the output container
// const outputContainer = document.getElementById('output-container');

// Iterate over each object in the array
// data.forEach((item) => {
// Create a div element for each object
//   const divElement = document.createElement('div');

// Set the inner HTML of the div to display the properties
//   divElement.innerHTML = `<p>ID: ${item.id}</p><p>Name: ${item.name}</p><p>Age: ${item.age}</p>`;

// Append the div to the output container
//   outputContainer.appendChild(divElement);
// });

// console.log(LegoSet);

// const paragraph = document.getElementById('test');
// console.log({test});

//         data.forEach((LegoSet) => {
//           $(`h1`).append(
//             $(`
//             <p>${LegoSet.year}</p>
//             <p>${LegoSet.setName}</p>

//             `)
//           )

//     })
// });
