
class LegoSet {
    constructor (setName, setId, categoryName, categoryId, coverImage, price, year, pieces, availability, link, notes, image2, image3, image4, image5) {
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
}}



    const url = "https://644435db914c816083b638ce.mockapi.io/LegoSets";


    $.get(url).then(data => 
        console.log(data));

    $.get(url).then(data => {
    data.map(LegoSet => {
        $('body').append(
            `
            <div class="accordion col-sm-12 col-md-10 col-xl-8 mx-auto my-5" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button"  data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        <div class="header-row hstack gap-5 ms-3 me-2" >
                            <img src="${coverImage}" class="main-image object-fit-contain" style="height:100px; width:100px;"></img>
                            <h3 class="set-name">${setName}</h3>
                        </div>
                    </button>
                </h2>
    
    
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse">
                    <div class="accordion-body">
    
                        <div class="row row-main">
                            <div class="col-sm-6  align-items-center">
                                <img src="${coverImage}" class="img-fluid"></img>
                            </div>    <!--end column 1-->
                            <div class="col-sm-6 pb-sm-4">
                                <div class="container-fluid pt-3">
                                    <p class="detail price lead">${price} </p>
                                    <p class="detail year lead">${year}</p>
                                    <p class="detail pieces lead">${pieces}</p>
                                    <p class="detail availability lead">${availability}</p>
                                    <p class="link availability lead">${link}</p>
                                    <div class="notes-section mt-4">
                                        <form>
                                            <div class="mb-2" >
                                                <label for="notes" class="form-label lead">Notes</label>
                                                <textarea class="form-control w-75" id="notes-section" rows="2"></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-primary btn-sm">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>  
                        </div>      
    
    
    
                        <div class="photos container">         
                                     
            
                            <div class="row row-cols-2 row-cols-md-4 align-items-center">
                                <div class="col">
                                    <img id="add-image-1" src="${image2}" class="object-fit-contain m-1 add-image"></img>
                                </div> 
                                 <div class="col"> 
                                    <img id="add-image-2" src="${image3}" class="object-fit-contain m-1 add-image"></img>
                                </div>  
                                 <div class="col">   
                                    <img id="add-image-3" src="${image4}" class="object-fit-contain m-1 add-image" ></img>
                                </div> 
                                <div class="col"> 
                                    <img id="add-image-4" src="${image5}" class="object-fit-contain m-1 add-image" ></img>
                                </div> 
                                
                            </div>       
                        </div>    
    
    
                        
                    </div>  
                </div>
    
            </div>   
        </div> 
            `
        )
   })} );
            
