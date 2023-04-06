const url = 'http://localhost:4000/api/register'
const headers = {
    'Content-Type': 'application/json',
};

const body = {
    "name": "Shannee Ahirwar",
}
fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
    // body: encRequests.toString()
})
    .then(res => res.json())
    .then(async (data) => {
        // convertItToJson(data);
        //   handle(data);
        console.log(data);
    })
    .catch(err => console.error(err));