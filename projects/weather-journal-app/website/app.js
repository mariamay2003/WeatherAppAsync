/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '5462142649c3f1a42f5bab4df030dae4&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Event listener for the Generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zipCode !== '') {
        getWeatherData(zipCode)
            .then((data) => {
                if (data) {
                    postData('/add', {
                        date: newDate,
                        temp: data.main.temp,
                        content: feelings
                    });
                    updateUI();
                }
            });
    } else {
        alert('Please enter a valid ZIP code.');
    }
}

// GET weather data from OpenWeatherMap API
const getWeatherData = async (zip) => {
    const response = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
};

// POST data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error:', error);
    }
};

// Update UI with the latest entry
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `📅 Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `🌡️ Temp: ${allData.temp} °C`;
        document.getElementById('content').innerHTML = `📝 Feelings: ${allData.content}`;
    } catch (error) {
        console.log('Error:', error);
    }
};

// Function to clear the input fields
function clearFields() {
    // Log to console to indicate the function is being triggered
    console.log("Clearing fields...");

    // Clear the value of the ZIP code input field
    document.getElementById('zip').value = '';

    // Clear the value of the feelings input field
    document.getElementById('feelings').value = '';
}

// Add an event listener to the 'generate' button
document.getElementById('generate').addEventListener('click', () => {
    // Call the clearFields function when the 'generate' button is clicked
    clearFields();
});




