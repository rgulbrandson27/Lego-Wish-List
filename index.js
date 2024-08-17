class LegoSet {
  constructor (
    setName,
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
    ) 

    {
    this.setName = setName;
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

const url = "https://6656189c9f970b3b36c44b10.mockapi.io/legosets";

$.get(url).then((data) => {
  data.forEach((LegoSet) => {
    $("#botanical-accordion").append(`
      <div class="accordion-item botanical-item">
        <input type="hidden" id="hidden-lego-set-id" value="${LegoSet.id}">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button"  data-bs-toggle="collapse" data-bs-target="#${LegoSet.legoSetId}" aria-expanded="false" aria-controls="${LegoSet.id}">
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
                              <div class="container-fluid pt-3" id="info-box">
                                  <p class="detail price lead">Price:  $${LegoSet.price} </p>
                                  <p class="detail year lead">Year: ${LegoSet.year}</p>
                                  <p class="detail pieces lead">Pieces: ${LegoSet.pieces}</p>
                                  <p class="detail availability lead">Availability: ${LegoSet.availability}</p>
                                  <p class="detail lead scrollable-input">Learn more at: <a class="legoLink" href=${LegoSet.link} target="_blank">LEGO.com</a></p>
                              </div>
                            </div>  
                      </div>  
                      <div class="row photos container row-cols-2 row-cols-md-4" id="photo-container">
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
                      <div id="button-box">
                          <button type="button" class="btn btn-outline-primary" data-bs-target="#update-botanical-modal" data-bs-toggle="modal"  onclick="displayUpdateModal(${LegoSet.id}, event)" data-id="${LegoSet.id}" id="update-button">Edit</button>
                          <button type="button" class="btn btn-outline-danger" data-bs-target="#delete-botanical-modal" data-bs-toggle="modal" onclick="openDeleteModal(${LegoSet.id}, event)" data-id="${LegoSet.id}" id="delete-button">Delete</button>
                     </div>
                  </div>    
                </div>
          </div>
            <hr id="item-hr">  
        `);
  });
});


// POST
let id;
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
        image1: $("#image-1").val(),
        image2: $("#image-2").val(),
        image3: $("#image-3").val(),
        image4: $("#image-4").val(),
        legoSetId: $("#legoSetId").val(),
      }).done(function (response) {
        id = response.id;
        $("#botanical-modal").modal("hide");
        location.reload();
      });
    }
  });
  // id below will log as undefined because it does not first await the id assignment
  console.log("Form submitted successfully!", id);
});

function clearFields() {
  $("#setName").val("");
  $("#legoSetId").val("");
  $("#price").val("");
  $("#year").val("");
  $("#pieces").val("");
  $("#availability").val("");
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
  $("#updateAvailability").val("");
  $("#updateLegoLink").val("");
  $("#updateCoverImage").val("");
  $("#updateImageOne").val("");
  $("#updateImageTwo").val("");
  $("#updateImageThree").val("");
  $("#updateImageFour").val("");
}

let originalData = {};

function populatePlaceholders(id) {
  $.ajax({
  url: `${url}/${id}`,
  dataType: "json",
  contentType: "application/json",
  method: "GET",
  success: function(data) {
    originalData = data;

    $("#updateSetName").val(data.setName).data("original", data.setName);
      $("#updatePrice").val(data.price).data("original", data.price);
      $("#updateYear").val(data.year).data("original", data.year);
      $("#updateAvailability").val(data.availability).data("original", data.availability);
      $("#updatePieces").val(data.pieces).data("original", data.pieces);
      $("#updateLegoLink").val(data.link).data("original", data.link);
      $("#updateCoverImage").val(data.coverImage).data("original", data.coverImage);
      $("#current-cover-image").attr("src", data.coverImage);
      
      $("#updateImageOne").val(data.image1).data("original", data.image1);
      $("#current-image-1").attr("src", data.image1);
      $("#updateImageTwo").val(data.image2).data("original", data.image2);
      $("#current-image-2").attr("src", data.image2);
      $("#updateImageThree").val(data.image3).data("original", data.image3);
      $("#current-image-3").attr("src", data.image3);
      $("#updateImageFour").val(data.image4).data("original", data.image4);
      $("#current-image-4").attr("src", data.image4);

      $("#updateLegoSetId").val(data.legoSetId).data("original", data.legoSetId);
  },
          error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
          }
        });
      }
      
function resetToOriginalValues() {
        if (!originalData) {
          console.warn("No original data to reset to.");
          return;
        }
      
        $("#updateSetName").val(originalData.setName);
        $("#updatePrice").val(originalData.price);
        $("#updateYear").val(originalData.year);
        $("#updateAvailability").val(originalData.availability);
        $("#updatePieces").val(originalData.pieces);
        $("#updateLegoLink").val(originalData.link);
        $("#updateCoverImage").val(originalData.coverImage);
        $("#current-cover-image").attr("src", originalData.coverImage);
        $("#updateImageOne").val(originalData.image1);
        $("#current-image-1").attr("src", originalData.image1);
        $("#updateImageTwo").val(originalData.image2);
        $("#current-image-2").attr("src", originalData.image2);
        $("#updateImageThree").val(originalData.image3);
        $("#current-image-3").attr("src", originalData.image3);
        $("#updateImageFour").val(originalData.image4);
        $("#current-image-4").attr("src", originalData.image4);
        $("#updateLegoSetId").val(originalData.legoSetId);
      }
      
      $(document).ready(function() {
        $("#resetButton").on("click", function() {
          resetToOriginalValues();
        });
      });
      

let updateModalId;

function displayUpdateModal(id, e) {
  populatePlaceholders(id);
  let updateButton = $(e.currentTarget);
    updateModalId = updateButton.data('id');
    $('#update-modal-id').val(updateModalId);
    console.log(updateModalId);
  }

function getUpdatedData() {
    const updatedData = {};
  
      $('.update-field').each(function() {
          const field = $(this);
          const key = field.attr('id');
          const newValue = field.val();
          const placeholderValue = field.attr("original");
  
          if (newValue && newValue !== placeholderValue) {
              updatedData[key] = newValue;
          }
      });
  
      return updatedData;
  }


function applyUpdates() {
    let id = updateModalId;

    const updatedData = getUpdatedData();

    if ($.isEmptyObject(updatedData)) {
      alert("No changes detected.");
      return;
    }

    $.ajax({
      url: `${url}/${id}`,
      method: "PATCH",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(updatedData),
      success: function(response) {
          console.log("Successfully Updated", response);
          
          $('#update-botanical-modal').modal('hide');
            location.reload(); 
      },
      error: function(xhr, status, error) {
          console.error("Error Updating", error);
      }
    });
  
  }


// DELETE
let modalId;

function openDeleteModal(id, e) {
  console.log(id);
  let deleteButton = $(e.currentTarget);

  modalId = deleteButton.data('id');
  $('#delete-modal-id').val(modalId);
  console.log("modalId:" + modalId);
}

function logModalId() {
    console.log("cancel:", modalId);
}

function deleteLegoSet() {
console.log(modalId);
let id = modalId;
  $.ajax({
    url: `${url}/${id}`,
    method: "DELETE",
  }).done(function () {
    location.reload();
  })
  console.log("Lego Set has been deleted", id);
};


