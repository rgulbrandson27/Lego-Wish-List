

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
    image4,
    legoSetId
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
    this.legoSetId = legoSetId;
  }
}

const url = "https://644435db914c816083b638ce.mockapi.io/LegoSets";



// $(function() {
//   fetchAndRender();
// });

// function fetchAndRender() {
$.get(url).then((data) => {
  data.forEach((LegoSet) => {
    $("#botanical-accordion").append(`
            
      <div class="accordion-item botanical-item">
        <input type="hidden" id="hidden-lego-set-id" value="${LegoSet.setId}">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button"  data-bs-toggle="collapse" data-bs-target="#${LegoSet.legoSetId}" aria-expanded="false" aria-controls="${LegoSet.setId}">
                        <div class="header-row hstack gap-5 ms-3 me-2" id="botanical-header" >
                            <img src="${LegoSet.coverImage}" class="main-image object-fit-contain" style="height:100px; width:100px;"></img>
                            <h3 class="set-name">${LegoSet.setName}</h3>
                        </div>
                    </button>
                </h2>

            
                <div id="${LegoSet.legoSetId}" class="accordion-collapse collapse justify-content-center">

                  <div class="accordion-body">
                      <div class="row row-main">
                            <div class="col-sm-6  align-items-center">
                                <img src="${LegoSet.coverImage}" class="img-fluid cover-image scrollable-input"/>
                            </div>   
                            <div class="col-sm-6 align-content-center pb-sm-4">
                              <div class="container-fluid pt-3">
                                  <p class="detail price lead">Price:  $${LegoSet.price} </p>
                                  <p class="detail year lead">Year: ${LegoSet.year}</p>
                                  <p class="detail pieces lead">Pieces: ${LegoSet.pieces}</p>
                                  <p class="detail availability lead">Availability: ${LegoSet.availability}</p>
                                  <p class="detail lead scrollable-input">Learn more at: <a class="legoLink" href=${LegoSet.link} target="_blank">LEGO.com</a></p>
                              </div>
                            </div>  
                      </div>  

                      <div class="row photos container row-cols-2 row-cols-md-4 px-auto">
                            <div class="col">
                                <img id="add-image-1 scrollable-input" src="${LegoSet.image1}" class="object-fit-contain m-1 add-image"/>
                            </div> 
                            <div class="col"> 
                                <img id="add-image-2 scrollable-input" src="${LegoSet.image2}" class="object-fit-contain m-1 add-image"/>
                            </div>  
                            <div class="col">   
                                <img id="add-image-3 scrollable-input" src="${LegoSet.image3}" class="object-fit-contain m-1 add-image" />
                            </div> 
                            <div class="col"> 
                                <img id="add-image-4 scrollable-input" src="${LegoSet.image4}" class="object-fit-contain m-1 add-image" />
                            </div> 
                      </div> 

                      <button type="button" class="btn btn-outline-primary" data-bs-target="#update-botanical-modal" data-bs-toggle="modal"  onclick="displayUpdateModal(${LegoSet.setId}, event)" data-id="${LegoSet.setId}" id="update-button">Edit</button>

                      <button type="button" class="btn btn-outline-danger" data-bs-target="#delete-botanical-modal" data-bs-toggle="modal" onclick="openDeleteModal(${LegoSet.setId}, event)" data-id="${LegoSet.setId}" id="delete-button">Delete</button>
                   
                     
                  </div>    
                </div>
          </div>

            <hr id="item-hr">  

          `);
  });
});



let setId;

// GET ALL
$(function () {

  $("#add-button").on("click", function (e) {
    e.preventDefault();
    let setNameValue = $("#setName").val();
    let legoSetIdValue = $("#legoSetId").val();

    if (setNameValue === "" || legoSetIdValue === "") {
      alert("Set Name and Lego Set Id are required fields.");
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
        link: $("#lego-link").val(),
        coverImage: $("#coverImage").val(),
        image2: $("#image-1").val(),
        image3: $("#image-2").val(),
        image4: $("#image-3").val(),
        image5: $("#image-4").val(),
        legoSetId: $("#legoSetId").val(),
      }).done(function (response) {
        setId = response.setId;
        console.log("Form submitted successfully!", setId);
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
  $("#lego-link").val("");
  $("#coverImage").val("");
  $("#image-1").val("");
  $("#image-2").val("");
  $("#image-3").val("");
  $("#image-4").val("");
}

function clearUpdateFields() {
  $("#updateSetName").val("");
  $("#updateLegoSetId").val("");
  $("#updatePrice").val("");
  $("#updateYear").val("");
  $("#updatePieces").val("");
  $("#updateAvailability").val("default");
  $("#updateLegoLink").val("");
  $("#updateCoverImage").val("");
  $("#updateImageOne").val("");
  $("#updateImageTwo").val("");
  $("#updateImageThree").val("");
  $("#updateImageFour").val("");
}


let updateModalId;

function displayUpdateModal(setId, e) {
  populatePlaceholders(setId);
  let updateButton = $(e.currentTarget);
    updateModalId = updateButton.data('id');
    console.log(updateModalId);
    $('#update-modal-id').val(updateModalId);
    console.log(updateModalId);
  }

  function confirmUpdates() {
    let setId = updateModalId;

    // const dataToSend = {};

  //   const updateFields = [
  //     { field: "setName", value: updateSetName.val() },
  //     { field: "price", value: updatePrice.val() },
  //     { field: "year", value: updateYear.val() },
  //     { field: "availability", value: updateAvailability.val() },
  //     { field: "pieces", value: updatePieces.val() },
  //     { field: "legoLink", value: updateLegoLink.val() },
  //     { field: "coverImage", value: updateCoverImage.val() },
  //     { field: "image1", value: updateImageOne.val() },
  //     { field: "image2", value: updateImageTwo.val() },
  //     { field: "image3", value: updateImageThree.val() },
  //     { field: "image4", value: updateImageFour.val() },
  //     { field: "legoSetId", value: updateLegoSetId.val() }
  // ];
    
    const updateFields = [updateSetName, updatePrice, updateYear, updateAvailability, updatePieces, updateLegoLink, updateCoverImage, updateImageOne, updateImageTwo, updateImageThree, updateImageFour, updateLegoSetId];

    const updatedData = [];
    // const dataToSend = [];

    // for (let i = 0; i < updateFields.length; i++) {
    //   const fieldId = updateFields[i];
    //   const field = $(`#${fieldId}`).attr("id");
    //   const value = $(`#${fieldId}`).val();
    //   dataToSend.push({ field, value });
    // }


// Loop through each update field and add its corresponding value to dataToSend
// for (let i = 0; i < updateFields.length; i++) {
    // const fieldId = updateFields[i];

    // const fieldValue = $(`#${fieldId}`).val();
    // for (let i = 0; i < updateFields.length; i++) {
    //   const field = $(`#${updateFields[i].id}`).attr("id");
    //   const value = $(`#${updateFields[i].id}`).val();
    //   dataToSend.push({ field, value });
    // }
    // for (let i = 0; i < updateFields.length; i++) {
    //   const fieldId = updateFields[i].id;
    //   const value = $(`#${fieldId}`).val();
    //   dataToSend.push({ field: fieldId, value });
    // }

    // for (let i = 0; i < updateFields.length; i++) {
    //   const fieldId = $(updateFields[i]).attr("id");
    //   const value = $(updateFields[i]).val();
    //   dataToSend.push({ field: fieldId, value });
    // }

    // Check if the field value has changed from its placeholder value
    // const placeholderValue = $(`#${fieldId}`).attr("placeholder");
    // if (fieldValue !== placeholderValue) {
    //     dataToSend[fieldId] = fieldValue;
    // }

  

// console.log(dataToSend);
//   }
//   updateFields.forEach(({ field, value }) => {
//     // Only add to dataToSend if the value is different from the placeholder
//     if (value !== $("#" + field).attr("placeholder")) {
//         dataToSend[field] = value;
//     }
// });
    
    // const updateFields = [$('#updateSetName').attr("placeholder"), $('#updatePrice').val(), $('#updateYear').val(), $('#updateAvailability').val(), $('#updatePieces').val(), $('#updateLegoLink').val(), $('#updateCoverImage').val(), $('#updateImageOne').val(), $('#updateImageTwo').val(), $('#updateImageThree').val(), $('#updateFour').val()];
    // const updateFields = [updateSetName, updatePrice, updateYear, updateAvailability, updatePieces, updateLegoLink, updateCoverImage, updateImageOne, updateImageTwo, updateImageThree, updateImageFour, updateLegoSetId];
//     // console.log($('#updateSetName').val() !== (""));
//     // console.log($('#updateSetName').val() !== ($('#updateSetName').attr("placeholder")));
//     // console.log($('#updateSetName').attr("placeholder"));
  
    // for (let i = 0; i < updateFields.length; i++) {
    //     if (
    //       ($(updateFields[i]).attr("placeholder") == $(updateFields[i]).val())
    //       || 
    //       ($(updateFields[i]).val() == "")  
    //     )  {
    //       console.log("items match"); 
    //     } else {
    //       console.log("items do not match");

    //       dataToSend[i] = $(updateFields[i]).val()


    //       };
    //     }
  //     $.ajax({
  //     url: `${url}/${setId}`,
  //     dataType: "json",
  //     contentType: "application/json",
  //     method: "PUT",
  //     data: JSON.stringify(dataToSend),
  //     success: function(response)  {
  //       console.log("Successfully Updated", response);
  //       Object.keys(response).forEach(key => {
  //         const element = $("#" + key);
  //         // const element = $(`#${key}`);
  //         if (element.length) { 
  //           element.val(response[key]);
  //         }
  //     });
  //   },
  //     error: function(xhr, status, error) {
  //       console.error("Error Updating", error);
  //     }
  
  //   }).done(function() {
  //     location.reload();
  // });


  for (let i = 0; i < updateFields.length; i++) {
    const fieldId = $(updateFields[i]).attr("id");
    const value = $(updateFields[i]).val();
    updatedData.push({ field: fieldId, value });
  }

  updateFields.forEach((field) => {
    const fieldValue = $(field).val();
    const placeholderValue = $(field).attr("placeholder");
    if (fieldValue !== placeholderValue) {
      const fieldId = $(field).attr("id");
      dataToSend.push({ field: fieldId, value: fieldValue });
    }
  });

  console.log(dataToSend);


  $.ajax({
    url: `${url}/${setId}`,
    dataType: "json",
    contentType: "application/json",
    method: "PUT",
    data: JSON.stringify(dataToSend),
    success: function(response) {
        console.log("Successfully Updated", response);
        // Update DOM elements based on the response data if needed
    },
    error: function(xhr, status, error) {
        console.error("Error Updating", error);
    }
}).done(function() {
    // location.reload();
});

  }
    // }).done(function (response) {
    //   setId = response.setId;
    //   console.log("Form updated successfully!", setId);
    //   $("#update-botanical-modal").modal("hide");
      // location.reload();
    
  //   });
  // }


function populatePlaceholders(setId) {
  $.ajax({
  url: `${url}/${setId}`,
  dataType: "json",
  contentType: "application/json",
  method: "GET",
  success: function(data) {
    console.log("data received:", data);
      $("#updateSetName").attr("placeholder", data.setName);
      $("#updatePrice").attr("placeholder", data.price);
      $("#updateYear").attr("placeholder", data.year);
      $("#updateAvailability").val(data.availability);
              // WILL NOT POPULATE - "SELECT" ELEMENTS CANNOT HAVE PLACEHOLDERS SO NEED TO CREATE A WORK-AROUND
              //$("#updateAvailability option[value='" + data.availability + "']").attr("selected", true);
      $("#updatePieces").attr("placeholder", data.pieces);
      $("#updateLegoLink").attr("placeholder", data.link);
      $("#updateCoverImage").attr("placeholder", data.coverImage);
      $("#current-cover-image").attr("src", data.coverImage);

      $("#updateImageOne").attr("placeholder", data.image1);
      $("#current-image-1").attr("src", data.image1);
      $("#updateImageTwo").attr("placeholder", data.image2);
      $("#current-image-2").attr("src", data.image2);
      $("#updateImageThree").attr("placeholder", data.image3);
      $("#current-image-3").attr("src", data.image3);
      $("#updateImageFour").attr("placeholder", data.image4);
      $("#current-image-4").attr("src", data.image4);

      $("#updateLegoSetId").attr("placeholder", data.legoSetId);
    },
    error: function(xhr, status, error) {
      console.error("Error fetching data:", error);
    }
  });
}


// DELETE
let modalId;

function openDeleteModal(setId, e) {
  console.log(setId);
  let deleteButton = $(e.currentTarget);
  modalId = deleteButton.data('id');
  $('#delete-modal-id').val(modalId);
  console.log(modalId);
}

function logModalId() {
    console.log("cancel:", modalId);
}

function deleteLegoSet() {
console.log(modalId);
let setId = modalId;
  $.ajax({
    url: `${url}/${setId}`,
    method: "DELETE",
  }).done(function () {
    location.reload();
  })
  console.log("Lego Set has been deleted", setId);
};


