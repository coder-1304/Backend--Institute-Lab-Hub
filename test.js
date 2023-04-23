// const url = 'http://localhost:4000/api/learner/seeBookedLabs'
// const headers = {
//     'Content-Type': 'application/json',
// };

// const body = {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNhNGUxYTkzYmEwNDk5MmFkNDBlNDkiLCJpYXQiOjE2ODIxNjgxNTB9.lV5taHrs3R0j8CpnKeDEjnbtr2wkCDVkxAbAJ1G_06U",
// }
// fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(body)
//     // body: encRequests.toString()
// })
//     .then(res => res.json())
//     .then(async (data) => {
//         // convertItToJson(data);
//         //   handle(data);
//         console.log(data);
//     })
//     .catch(err => console.error(err));

const a = [
    {
        "bookings": [],
        "_id": "643a8f836592a47d2a0a8016",
        "labName": "Chemistry",
        "description": "chemistry laboratory description",
        "instituteName": "AITR",
        "location": "Indore",
        "available": "12-12",
        "fees": "2938",
        "country": "India",
        "instituteId": "643a4e1a93ba04992ad40e49",
        "__v": 0
    },
    {
        "bookings": [],
        "_id": "643a8ff76592a47d2a0a803e",
        "labName": "Manufacuring practice",
        "description": "this is desc",
        "instituteName": "AITR",
        "location": "Indore",
        "available": "12-12",
        "fees": "132",
        "country": "India",
        "instituteId": "643a4e1a93ba04992ad40e49",
        "__v": 0
    },
    {
        "bookings": [],
        "_id": "643a90486592a47d2a0a8068",
        "labName": "AWS",
        "description": "amazon web services",
        "instituteName": "AITR",
        "location": "Indore",
        "available": "12-43",
        "fees": "12390",
        "country": "India",
        "instituteId": "643a4e1a93ba04992ad40e49",
        "__v": 0
    },
    {
        "bookings": [],
        "_id": "643be0b18d53dbcde8be7f82",
        "labName": "ADA",
        "description": "Analysis and design of algorithm",
        "instituteName": "AITR",
        "location": "Indore",
        "available": "12-43",
        "fees": "100100",
        "country": "India",
        "instituteId": "643a4e1a93ba04992ad40e49",
        "__v": 0
    },
    {
        "_id": "64438500b5ffd98a7205e062",
        "labName": "Martial Arts",
        "description": "Martial Arts",
        "instituteName": "AITR",
        "location": "Indore",
        "available": "13.23",
        "availableSeats": 4,
        "fees": "20000",
        "country": "India",
        "instituteId": "643a4e1a93ba04992ad40e49",
        "__v": 0,
        "bookings": [
            {
                "name": "Shannee Ahirwar",
                "email": "john@wick.com",
                "phone": "9009342733",
                "gender": "male",
                "bookingId": "UM8RO24TJ2"
            },
            {
                "name": "Shannee Ahirwar",
                "email": "john@wick.com",
                "phone": "9009342733",
                "gender": "male",
                "bookingId": "8HUE9SRFRE"
            }
        ]
    },
    {
        "_id": "6443ad7e91f783a3f19b668c",
        "labName": "Data Analytics",
        "description": "da laboratory to learn",
        "instituteName": "AITR",
        "location": "Indore",
        "available": "12:PM-4PM",
        "date": "2023-04-30",
        "availableSeats": 11,
        "fees": "1200",
        "country": "India",
        "bookings": [],
        "instituteId": "643a4e1a93ba04992ad40e49",
        "__v": 0
    },
    {
        "_id": "6443bfe8011b3fce8ddba5f1",
        "labName": "DSA",
        "description": "data structures and algorithms",
        "instituteName": "AITR",
        "location": "Indore",
        "available": "12-4 PM",
        "date": "2023-04-12",
        "availableSeats": 11,
        "fees": "1200",
        "country": "India",
        "bookings": [],
        "instituteId": "643a4e1a93ba04992ad40e49",
        "__v": 0
    }
];
console.log(a.length);