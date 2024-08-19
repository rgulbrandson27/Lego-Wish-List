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

//GET
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
                                  <p class="detail lead scrollable-input">Learn more at: <a href=${LegoSet.link} target="_blank">LEGO.com</a></p>
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
                          <button type="button" class="btn btn-outline-primary" data-bs-target="#update-botanical-modal" data-bs-toggle="modal"  onclick="openUpdateModal(${LegoSet.id}, event)" data-id="${LegoSet.id}" id="update-button">Edit</button>
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
        console.log("Form submitted successfully!", id);

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


let updateModalId;
let currentData = {};
let newData = {};
let updatedData = {};

  async function openUpdateModal(id, e) {
    try {
    currentData = await populateCurrentData(id);
    // let updateButton = $(e.currentTarget);
      updateModalId = id;
      // $('#update-modal-id').val(updateModalId);
      console.log(updateModalId);
      console.log("Current Data:", currentData);
      console.log(id);
    } catch (error) {
      console.error("Error opening update modal:", error);
    }
  };

function populateCurrentData(id) {
  return new Promise((resolve, reject) => {
  $.ajax({
      url: `${url}/${id}`,
      dataType: "json",
      contentType: "application/json",
      method: "GET",
      success: function(data) {
        if (!data) {
          console.error("Error: No data received from the server.");
          return reject(new Error("No data received"));
        }

    
      $("#updateSetName").val(data.setName || '');
      $("#updatePrice").val(data.price || '');
      $("#updateYear").val(data.year || '');
      $("#updateAvailability").val(data.availability || '');
      $("#updatePieces").val(data.pieces || '');
      $("#updateLegoLink").val(data.link || '');
      $("#updateCoverImage").val(data.coverImage || '');
      $("#current-cover-image").attr("src", data.coverImage || '');
      $("#updateImageOne").val(data.image1 || '');
      $("#current-image-1").attr("src", data.image1 || '');
      $("#updateImageTwo").val(data.image2 || '');
      $("#current-image-2").attr("src", data.image2 || '');
      $("#updateImageThree").val(data.image3 || '');
      $("#current-image-3").attr("src", data.image3 || '');
      $("#updateImageFour").val(data.image4 || '');
      $("#current-image-4").attr("src", data.image4 || '');
      $("#updateLegoSetId").val(data.legoSetId || '');

        currentData = data;

      resolve(data);
      }, 
      error: function(error) {
        console.log("Error fetching data:", error);
        reject(error); 
      }
    });
  })
};



function collectNewUserData() {
  newData = 
  {
  setName: $("#updateSetName").val(),
  categoryId: "2",
  categoryName: "Botanical",
  price: $("#updatePrice").val(),
  year: $("#updateYear").val(),
  pieces: $("#updatePieces").val(),
  availability: $("#updateAvailability").val(),
  link: $("#updateLegoLink").val(),
  coverImage: $("#updateCoverImage").val(),
  image1: $("#updateImageOne").val(),
  image2: $("#updateImageTwo").val(),
  image3: $("#updateImageThree").val(),
  image4: $("#updateImageFour").val(),
  legoSetId: $("#updateLegoSetId").val(),
  };
  console.log("newData:", newData)
}

function extractUpdatedData() {
  updatedData = {};

    console.log("c", currentData)
    console.log("n", newData);
  // Compare properties of currentData and newData
  // function normalize(value) {
  //   if (value === undefined || value === null) return '';
  //   return value.toString().trim();
  // }


  Object.keys(newData).forEach(key => {
    if (currentData[key] !== newData[key]) {
      updatedData[key] = newData[key];
    }
  });

  console.log("Updated Data:", updatedData);

}

//   collectNewUserData();
//   console.log(newData);
// }
// async function extractUpdatedData() {
//   try {
//     if (!updateModalId) 
//       throw new Error("UpdateModalId is not set");
    
//     if (!currentData) {
//       console.warn("currentData is not defined or populated.");
//       currentData = await populateCurrentData(updateModalId);
//     }
//     newData = collectNewUserData();
    
// function printData() {
//     console.log("c", currentData)
//     console.log("n", newData);
// }
    
// async function applyUpdates() {
//   // Ensure currentData is populated before proceeding
//   if (!currentData) {
//     console.warn("currentData is not populated yet. Calling openUpdateModal.");
//     await openUpdateModal(updateModalId); // Ensure modal is opened and data is populated
//   }
//   collectNewUserData();
//   printData();
// }


// function applyUpdates() {
//   printData();
// }

    // const keys = Object.keys(currentData);

    // Object.keys(currentData).forEach(key => {
    // if (currentData[key] !== newData[key]) {
    //   updatedData[key] = newData[key];
    // }
    // });

    // console.log("UpdatedData:", updatedData);
    // return updatedData;
//   } catch (error) {
//     console.error("Error extracting updated data:", error);
//     throw error;
//   }
// }

//     $("#updateSetName").val(data.setName);
//     $("#updatePrice").val(data.price);
//     $("#updateYear").val(data.year);
//     $("#updateAvailability").val(data.availability);
//     $("#updatePieces").val(data.pieces);
//     $("#updateLegoLink").val(data.link);
//     $("#updateCoverImage").val(data.coverImage);
//     $("#current-cover-image").attr("src", data.coverImage);
//     $("#updateImageOne").val(data.image1);
//     $("#current-image-1").attr("src", data.image1);
//     $("#updateImageTwo").val(data.image2);
//     $("#current-image-2").attr("src", data.image2);
//     $("#updateImageThree").val(data.image3);
//     $("#current-image-3").attr("src", data.image3);
//     $("#updateImageFour").val(data.image4);
//     $("#current-image-4").attr("src", data.image4);
//     $("#updateLegoSetId").val(data.legoSetId);

//       resolve();
//     },
//           error: function(xhr, status, error) {
//           console.error("Error fetching data:", error);
//           reject(error);
//           }
//       });
//   });
// }

//     try {
//       await populatePlaceholders(updateModalId);
//       console.log("Form Field IDs:", $('.update-field').map(function() { return $(this).attr('id'); }).get());
//       $('.update-field').each(function() {
//         const field = $(this);
//         const fieldId = field.attr('id');
//         const key = fieldId.replace('update', ''); // Convert "updateFieldName" to "FieldName"
//         const keyWithFirstLetterLowercase = key.charAt(0).toLowerCase() + key.slice(1); // Convert first letter to lowercase
//         const newValue = field.val();
//         const originalValue = originalData[keyWithFirstLetterLowercase];
      // $('.update-field').each(function() {
      //     const field = $(this);
      //     const fieldId = field.attr('id');

      //     const key = field.attr('id').replace('update', ''); 
      //     const keyWithFirstLetterLowercase = key.charAt(0).toLowerCase() + key.slice(1); // Converts only the first letter to lowercase
      //     const newValue = field.val();
      //     const originalValue = originalData[keyWithFirstLetterLowercase];

      // console.log('Field ID:', fieldId);
      // console.log('Key With First Letter Lowercase:', keyWithFirstLetterLowercase);
      // console.log('New Value:', newValue);
      // console.log('Original Value:', originalValue);

    
  //         const formattedNewValue = newValue === null ? '' : newValue.toString().trim();
  //         const formattedOriginalValue = (originalValue === null || originalValue === undefined) ? '' : originalValue.toString().trim();
          
  //         if (formattedNewValue !== formattedOriginalValue) {
  //           updatedData[keyWithFirstLetterLowercase] = newValue;
  //         }
  //       });
  //       console.log("Final updated data:", updatedData); // Log final updated data for debugging

  //     return updatedData;

  
//    $.ajax({
//       url: `${url}/${updateModalId}`,
//       method: "PATCH",
//       contentType: "application/json",
//       dataType: "json",
//       data: JSON.stringify(updatedData),
//       success: function(response) {
//           console.log("Successfully Updated", response);
//           // $('#update-botanical-modal').modal('hide');
//           //   location.reload(); 
//       },
//       error: function(xhr, status, error) {
//           console.error("Error Updating", error);

//   try {
//   await populateCurrentData(id);
//   // let updateButton = $(e.currentTarget);
//     updateModalId = id;
//     // $('#update-modal-id').val(updateModalId);
//     console.log(updateModalId);
//     console.log("CurrentData", currentData);
//   } catch (error) {
//     console.error("Error opening update modal:", error);
//   }
// };
//PATCH
async function applyUpdates() {
  // try {
  // extractUpdatedData();
  // console.log("More Updated Data:", updatedData);

  try {
    // Ensure currentData is populated before proceeding
    if (!Object.keys(currentData).length) {
      console.warn("currentData is not populated yet. Calling openUpdateModal.");
      await openUpdateModal(updateModalId); // Ensure modal is opened and data is populated
    }

    collectNewUserData(); // Collect new user data from form
    extractUpdatedData(); // Extract updated data based on currentData and newData



    await $.ajax({
      url: `${url}/${updateModalId}`,
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
} catch (error) {
console.error("Error applying updates:", error);
}
}
  //         // $('#update-botanical-modal').modal('hide');
  //         //   location.reload(); 
  //     },
  //     error: function(xhr, status, error) {
  //         console.error("Error Updating", error);
  //     }
  //       });
 

// DELETE
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

  // updatedData = extractUpdatedData();
  // if (Object.keys(updatedData).length === 0) {
  //   alert("No changes detected.");
  //   return;

    // if ($.isEmptyObject(updatedData)) {
    //   alert("No changes detected.");
    //   return;
    // }

// function resetToOriginalValues() {
//   if (!originalData) {
//     console.warn("No original data to reset to.");
//     return;
//   }

// $(document).ready(function() {
//   $("#resetButton").on("click", function() {
//     resetToOriginalValues();
// });
// });




