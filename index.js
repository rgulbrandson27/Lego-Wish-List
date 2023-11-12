
class LegoSet {
    constructor (setName, setId, category, categoryId, coverImage, price, year, pieces, availability, link, notes, image2, image3, image4, image5) {
    this.setName = setName;
    this.setId = setId;
    this.category = category;
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


class LegoSetService {
    static url = "https://644435db914c816083b638ce.mockapi.io/LegoSets";

    static getAllLegoSets() {
        return $.get(this.url);
    }

    static getLegoSet(id) {
        return $.get(this.url + `/${id}`);
        console.log(LegoSet)
    }

    // static createLegoSet(legoSet) {
    //     return $.ajax({
    // this.url, legoSet);
    // }
}

