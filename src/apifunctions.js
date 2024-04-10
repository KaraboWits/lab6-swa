// Replace 'https://your-function-app.azurewebsites.net/api/your-function' with your actual Azure Function URL
const functionUrl = 'https://black-field-03c1a4810.5.azurestaticapps.net/';

// Example GET request
fetch(functionUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Data from Azure Function:', data);
        // Process data as needed
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Example POST request
fetch(functionUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ /* Your request body */ })
})
    .then(response => response.json())
    .then(data => {
        console.log('Response from Azure Function:', data);
        // Process response as needed
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Set the response headers
    context.res = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Initialize the cars data (you can load this from a JSON file as you did in Express.js)
    const cars = [];

    // Handle HTTP GET request to retrieve all cars
    if (req.method === 'GET') {
        context.res.body = cars;
    }

    // Handle HTTP GET request to retrieve a car by ID
    if (req.method === 'GET' && req.params.id) {
        const id = req.params.id;
        const car = cars.find(car => car.id === id);
        if (car) {
            context.res.body = car;
        } else {
            context.res = {
                status: 404,
                body: 'Car not found'
            };
        }
    }

    // Handle HTTP POST request to add a new car
    if (req.method === 'POST') {
        const newCar = req.body;
        cars.push(newCar);
        context.res.body = newCar;
    }

    // Handle HTTP PUT request to update a car by ID
    if (req.method === 'PUT' && req.params.id) {
        const id = req.params.id;
        const updatedCar = req.body;
        const index = cars.findIndex(car => car.id === id);
        if (index !== -1) {
            cars[index] = updatedCar;
            context.res.body = updatedCar;
        } else {
            context.res = {
                status: 404,
                body: 'Car not found'
            };
        }
    }

    // Handle HTTP DELETE request to delete a car by ID
    if (req.method === 'DELETE' && req.params.id) {
        const id = req.params.id;
        const index = cars.findIndex(car => car.id === id);
        if (index !== -1) {
            cars.splice(index, 1);
            context.res.body = { message: `Car with id ${id} deleted` };
        } else {
            context.res = {
                status: 404,
                body: 'Car not found'
            };
        }
    }
};
