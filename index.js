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
    image1,
    image2,
    image3,
    image4
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
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.image4 = image4;
  }
}

const url = "https://644435db914c816083b638ce.mockapi.io/LegoSets";

$.get(url).then((data) => {
  data.forEach((LegoSet) => {
    $("#botanical-accordion").append(`
            
            <div class="accordion-item botanical-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button"  data-bs-toggle="collapse" data-bs-target="#${LegoSet.setId}" aria-expanded="false" aria-controls="${LegoSet.setId}">
                        <div class="header-row hstack gap-5 ms-3 me-2" id="botanical-header" >
                            <img src="${LegoSet.coverImage}" class="main-image object-fit-contain" style="height:100px; width:100px;"></img>
                            <h3 class="set-name">${LegoSet.setName}</h3>
                        </div>
                    </button>
                </h2>

            <div id="${LegoSet.setId}" class="accordion-collapse collapse justify-content-center">
                <div class="accordion-body">
                    <div class="row row-main">
                        <div class="col-sm-6  align-items-center">
                            <img src="${LegoSet.coverImage}" class="img-fluid cover-image"/>
                        </div>   
                        <div class="col-sm-6 align-content-center pb-sm-4">
                          <div class="container-fluid pt-3">
                              <p class="detail price lead">Price:  $${LegoSet.price} </p>
                              <p class="detail year lead">Year: ${LegoSet.year}</p>
                              <p class="detail pieces lead">Pieces: ${LegoSet.pieces}</p>
                              <p class="detail availability lead">Availability: ${LegoSet.availability}</p>
                              <p class="detail lead">Learn more at: <a class="lego-link" href=${LegoSet.link} target="_blank">LEGO.com</a></p>
                          </div>
                        </div>  
                    </div>   
                     
                   
                      <div class="row photos container row-cols-2 row-cols-md-4">
                          <div class="col">
                              <img id="add-image-1" src="${LegoSet.image1}" class="object-fit-contain m-1 add-image"/>
                          </div> 
                          <div class="col"> 
                              <img id="add-image-2" src="${LegoSet.image2}" class="object-fit-contain m-1 add-image"/>
                          </div>  
                          <div class="col">   
                              <img id="add-image-3" src="${LegoSet.image3}" class="object-fit-contain m-1 add-image" />
                          </div> 
                          <div class="col"> 
                              <img id="add-image-4" src="${LegoSet.image4}" class="object-fit-contain m-1 add-image" />
                          </div> 
                      </div> 
                      <button type="button" class="btn btn-outline-success" onclick="updateLegoSet(${LegoSet.setId})"} id="update-button">Edit</button>

                      <button type="button" onclick="deleteLegoSet('${LegoSet.setId}')" class="btn btn-outline-danger" id="delete-button">Delete</button>

                </div>   
            </div>
          </div>
            <hr id="item-hr">  

          `);
  });
});

$(function () {
  $("#add-button").on("click", function (e) {
    e.preventDefault();
    let setNameValue = $("#setName").val();
    let legoSetIdValue = $("#setId").val();

    if (setNameValue === "" || legoSetIdValue === "") {
      alert("Set Name and Set Id are required fields.");
      return false;
    } else {
      $.post(url, {
        setName: $("#setName").val(),
        categoryId: "2",
        categoryName: "Botanical",
        price: $("#price").val(),
        year: $("#year").val(),
        pieces: $("#pieces").val(),
        availability: $("#availability").val(),
        link: $("#botanical-link").val(),
        coverImage: $("#coverImage").val(),
        image2: $("#image-2").val(),
        image3: $("#image-3").val(),
        image4: $("#image-4").val(),
        image5: $("#image-5").val(),
        legoSetId: $("#legoSetId").val(),
      }).done(function () {
        console.log("Form submitted successfully!");
        $("#botanical-modal").modal("hide");
        location.reload();
      });
    }
  });
});

function clearFields() {
  $("#setName").val("");
  $("#legoSetId").val("");
  $("#price").val("");
  $("#year").val("");
  $("#pieces").val("");
  $("#availability").val("default");
  $("#botanical-link").val("");
  $("#coverImage").val("");
  $("#image-2").val("");
  $("#image-3").val("");
  $("#image-4").val("");
  $("#image-5").val("");
}

// function updateLegoSet(setId) {
//   return $.ajax({
//     url: this.url + `/${legoSet._setId}`,
//     datatype: "json",
//     data: JSON.stringify(legoSet),
//     contentType: "application.json",
//     method: "PUT",
//   });
// }

function deleteLegoSet(setId) {
  console.log("Deleting:", setId);
  $.ajax({
    url: `${url}/${setId}`,
    method: "DELETE",
  }).done(function () {
    console.log("Lego Set has been deleted");
    location.reload();
  });
}

// function deleteLegoSet(setId) {
//   let setId = LegoSet.setId;
//   return $.ajax({
//     url: this.url + `/${setId}`,
//     method: "DELETE",
//   });
// }
