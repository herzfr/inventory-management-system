
const db = {
  "users": [
    {
      "username": "adriana",
      "password": "123456",
      "roles": ["admin", "staff"],
      "name": "Adriana Romana"
    },
    {
      "username": "john",
      "password": "654321",
      "roles": ["admin"],
      "name": "John Doe"
    },
    {
      "username": "evan",
      "password": "123123",
      "roles": ["staff"],
      "name": "Evan Smith"
    }
  ],
  "data": [],
  "inventories": [
    {
    "id": "08c65c2f-317d-48a8-aace-7a1c59a3c9eb",
    "name": "Amazon",
    "description": "phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla",
    "price": 17.82,
    "quantity": 2,
    "supplierId": 1,
    "image": "http://dummyimage.com/100x100.png/cc0000/ffffff"
  }, {
    "id": "06d80c38-a7f9-4214-af14-3076b14c34e8",
    "name": "Samsung",
    "description": "bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh",
    "price": 81.46,
    "quantity": 82,
    "supplierId": 2,
    "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff"
  }, {
    "id": "e3235ac1-820f-4120-a17c-ed3a8e54c1c8",
    "name": "Samsung",
    "description": "lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet",
    "price": 14.53,
    "quantity": 4,
    "supplierId": 3,
    "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff"
  }, {
    "id": "f50c75d9-a50f-4c78-b852-67c9ba04668b",
    "name": "Samsung",
    "description": "aliquam sit amet diam in magna bibendum imperdiet nullam orci pede",
    "price": 46.37,
    "quantity": 11,
    "supplierId": 4,
    "image": "http://dummyimage.com/100x100.png/ff4444/ffffff"
  }, {
    "id": "744d5e17-762c-4049-9609-dfdde3b648ac",
    "name": "Siemens",
    "description": "convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut",
    "price": 38.77,
    "quantity": 6,
    "supplierId": 5,
    "image": "http://dummyimage.com/100x100.png/ff4444/ffffff"
  }, {
    "id": "f2a1fa93-0fe0-4437-b236-c6a470e123df",
    "name": "Motorola",
    "description": "convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus",
    "price": 5.38,
    "quantity": 10,
    "supplierId": 6,
    "image": "http://dummyimage.com/100x100.png/cc0000/ffffff"
  }, {
    "id": "6669a7d6-342b-4878-a196-53da89e8f018",
    "name": "Energizer",
    "description": "vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque",
    "price": 73.21,
    "quantity": 43,
    "supplierId": 7,
    "image": "http://dummyimage.com/100x100.png/cc0000/ffffff"
  }, {
    "id": "d19433d8-495c-45ed-8e97-25855c61cbb7",
    "name": "Lenovo",
    "description": "interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue",
    "price": 63.07,
    "quantity": 47,
    "supplierId": 8,
    "image": "http://dummyimage.com/100x100.png/dddddd/000000"
  }, {
    "id": "253fe3d7-56bb-496f-8220-6743810b118a",
    "name": "Vodafone",
    "description": "posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec",
    "price": 19.73,
    "quantity": 87,
    "supplierId": 9,
    "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff"
  }, {
    "id": "5d9e4823-0168-4436-85b9-b43c406e1aed",
    "name": "Celkon",
    "description": "ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante",
    "price": 27.2,
    "quantity": 53,
    "supplierId": 10,
    "image": "http://dummyimage.com/100x100.png/dddddd/000000"
  }],
  "supplier":[{
    "id": 1,
    "name": "Mudo",
    "contact": "557-975-6720"
  }, {
    "id": 2,
    "name": "Wordtune",
    "contact": "870-266-8820"
  }, {
    "id": 3,
    "name": "Yadel",
    "contact": "168-483-7004"
  }, {
    "id": 4,
    "name": "Oyonder",
    "contact": "668-676-7495"
  }, {
    "id": 5,
    "name": "Ainyx",
    "contact": "145-410-1070"
  }, {
    "id": 6,
    "name": "Divavu",
    "contact": "573-804-5567"
  }, {
    "id": 7,
    "name": "Kanoodle",
    "contact": "898-323-3952"
  }, {
    "id": 8,
    "name": "Wordpedia",
    "contact": "948-128-1687"
  }, {
    "id": 9,
    "name": "Meevee",
    "contact": "789-967-7110"
  }, {
    "id": 10,
    "name": "Meedoo",
    "contact": "635-470-7684"
  }],
  "sales": [
    {
    "itemId": "08c65c2f-317d-48a8-aace-7a1c59a3c9eb",
    "date": "2024-05-31T16:15:57Z",
    "quantity": 29,
    "total": 747.61
  }, {
    "itemId": "06d80c38-a7f9-4214-af14-3076b14c34e8",
    "date": "2024-05-03T18:57:11Z",
    "quantity": 30,
    "total": 280.79
  }, {
    "itemId": "e3235ac1-820f-4120-a17c-ed3a8e54c1c8",
    "date": "2024-05-22T00:37:15Z",
    "quantity": 33,
    "total": 486.41
  }, {
    "itemId": "f50c75d9-a50f-4c78-b852-67c9ba04668b",
    "date": "2024-05-26T17:31:21Z",
    "quantity": 35,
    "total": 494.76
  }, {
    "itemId": "744d5e17-762c-4049-9609-dfdde3b648ac",
    "date": "2024-06-01T09:46:08Z",
    "quantity": 82,
    "total": 775.69
  }, {
    "itemId": "f2a1fa93-0fe0-4437-b236-c6a470e123df",
    "date": "2024-05-30T02:01:12Z",
    "quantity": 94,
    "total": 851.33
  }, {
    "itemId": "6669a7d6-342b-4878-a196-53da89e8f018",
    "date": "2024-05-05T20:42:55Z",
    "quantity": 91,
    "total": 982.83
  }, {
    "itemId": "d19433d8-495c-45ed-8e97-25855c61cbb7",
    "date": "2024-05-28T09:44:27Z",
    "quantity": 89,
    "total": 193.88
  }, {
    "itemId": "253fe3d7-56bb-496f-8220-6743810b118a",
    "date": "2024-05-12T06:15:57Z",
    "quantity": 74,
    "total": 757.59
  }, {
    "itemId": "5d9e4823-0168-4436-85b9-b43c406e1aed",
    "date": "2024-05-05T16:47:08Z",
    "quantity": 24,
    "total": 453.62
  }]
}

module.exports = db;
