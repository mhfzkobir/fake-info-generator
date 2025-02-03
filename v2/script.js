document.getElementById('generateDataBtn').addEventListener('click', generateData);

async function generateData() {
    const selectedAPI = document.getElementById('apiSelect').value;
    const selectedLang = document.getElementById('langSelect').value;

    let data = {};

    showLoader();

    try {
        if (selectedAPI === 'randomUser') {
            data = await fetchRandomUser();
        } else if (selectedAPI === 'uiNames') {
            data = await fetchUINames();
        } else if (selectedAPI === 'jsonPlaceholder') {
            data = await fetchJSONPlaceholder();
        } else if (selectedAPI === 'randomDataAPI') {
            data = await fetchRandomDataAPI();
        }

        displayData(data, selectedLang);
    } catch (error) {
        console.error('Error generating data:', error);
        alert('Failed to generate data. Please try again.');
    } finally {
        hideLoader();
    }
}

async function fetchRandomUser() {
    const response = await fetch('https://randomuser.me/api/?nat=us');
    const { results } = await response.json();
    return results[0];
}

async function fetchUINames() {
    const response = await fetch('https://uinames.com/api/?region=United%20States');
    return await response.json();
}

async function fetchJSONPlaceholder() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    return await response.json();
}

async function fetchRandomDataAPI() {
    const response = await fetch('https://random-data-api.com/api/users/random_user');
    return await response.json();
}

function displayData(data, lang) {
    const resultDiv = document.getElementById('resultContent');
    resultDiv.innerHTML = '';

    let name = data.name?.first || data.name || `${data.firstname} ${data.lastname}` || 'N/A';
    let email = data.email || 'N/A';
    let address = data.location?.street?.name || data.address || 'N/A';

    if (lang === 'bn') {
        name = translateToBangla(name);
        email = translateToBangla(email);
        address = translateToBangla(address);
    }

    resultDiv.innerHTML = `
        <div class="info-item">
            <span class="text-muted">${lang === 'bn' ? 'নাম' : 'Name'}:</span> <span>${name}</span>
        </div>
        <div class="info-item">
            <span class="text-muted">${lang === 'bn' ? 'ইমেল' : 'Email'}:</span> <span>${email}</span>
        </div>
        <div class="info-item">
            <span class="text-muted">${lang === 'bn' ? 'ঠিকানা' : 'Address'}:</span> <span>${address}</span>
        </div>
    `;
}

function translateToBangla(text) {
    const translations = {
        'N/A': 'তথ্য পাওয়া যায়নি',
        'Name': 'নাম',
        'Email': 'ইমেল',
        'Address': 'ঠিকানা',
    };
    return translations[text] || text;
}

function showLoader() {
    document.getElementById('loader').classList.remove('d-none');
}

function hideLoader() {
    document.getElementById('loader').classList.add('d-none');
}
