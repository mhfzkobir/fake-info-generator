const translations = {
    en: {
        "title": "Global Fake Data Generator",
        "header": "🌍 Global Fake Data Generator",
        "generate": "Generate Data",
        "male": "Male",
        "female": "Female",
        "random": "Random",
        "name": "Name",
        "email": "Email",
        "address": "Address",
        "phone": "Phone",
        "zip": "ZIP Code",
        "city": "City",
        "country": "Country"
    },
    bn: {
        "title": "গ্লোবাল ফেইক তথ্য জেনারেটর",
        "header": "🌍 গ্লোবাল ফেইক তথ্য জেনারেটর",
        "generate": "তথ্য তৈরি করুন",
        "male": "পুরুষ",
        "female": "মহিলা",
        "random": "এলোমেলো",
        "name": "নাম",
        "email": "ইমেইল",
        "address": "ঠিকানা",
        "phone": "ফোন",
        "zip": "জিপ কোড",
        "city": "শহর",
        "country": "দেশ"
    }
};

// Language handling
document.getElementById('languageSelect').addEventListener('change', updateLanguage);

function updateLanguage() {
    const lang = document.getElementById('languageSelect').value;
    document.body.classList.toggle('bangla-font', lang === 'bn');
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[lang][key];
    });
}

// API configuration
const apiEndpoints = {
    randomuser: {
        url: 'https://randomuser.me/api/',
        parser: (data) => ({
            name: `${data.results[0].name.first} ${data.results[0].name.last}`,
            email: data.results[0].email,
            address: `${data.results[0].location.street.number} ${data.results[0].location.street.name}`,
            city: data.results[0].location.city,
            country: data.results[0].location.country,
            phone: data.results[0].phone,
            zip: data.results[0].location.postcode
        })
    },
    uinames: {
        url: 'https://uinames.com/api/',
        parser: (data) => ({
            name: `${data.name} ${data.surname}`,
            email: `${data.name.toLowerCase()}.${data.surname.toLowerCase()}@example.com`,
            address: `${data.region}, ${data.country}`,
            city: data.region,
            country: data.country,
            phone: `+${Math.floor(1000000000 + Math.random() * 9000000000)}`
        })
    },
    jsonplaceholder: {
        url: 'https://jsonplaceholder.typicode.com/users/1',
        parser: (data) => ({
            name: data.name,
            email: data.email,
            address: data.address.street,
            city: data.address.city,
            country: data.address.city, // Placeholder limitation
            phone: data.phone,
            zip: data.address.zipcode
        })
    },
    randomdata: {
        url: 'https://random-data-api.com/api/v2/users',
        parser: (data) => ({
            name: `${data.first_name} ${data.last_name}`,
            email: data.email,
            address: data.address.street_address,
            city: data.address.city,
            country: data.address.state,
            phone: data.phone_number,
            zip: data.address.zip_code
        })
    }
};

document.getElementById('generateBtn').addEventListener('click', generateData);

async function generateData() {
    const api = document.getElementById('apiSelect').value;
    const country = document.getElementById('countrySelect').value;
    const gender = document.getElementById('genderSelect').value;
    
    showLoader();
    
    try {
        const apiConfig = apiEndpoints[api];
        let url = apiConfig.url;
        
        // Add parameters based on API
        if(api === 'randomuser') {
            url += `?nat=${country.toLowerCase()}&gender=${gender}`;
        }
        if(api === 'uinames') {
            url += `?region=${country}&gender=${gender}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        const parsedData = apiConfig.parser(data);
        
        displayResults(parsedData);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
    } finally {
        hideLoader();
    }
}

function displayResults(data) {
    const lang = document.getElementById('languageSelect').value;
    const resultDiv = document.getElementById('resultContent');
    
    resultDiv.innerHTML = `
        <div class="info-item">
            <span class="text-muted">${translations[lang].name}:</span>
            <span>${data.name}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${data.name}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">${translations[lang].email}:</span>
            <span>${data.email}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${data.email}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">${translations[lang].address}:</span>
            <span>${data.address}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${data.address}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">${translations[lang].city}:</span>
            <span>${data.city}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${data.city}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">${translations[lang].country}:</span>
            <span>${data.country}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${data.country}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">${translations[lang].phone}:</span>
            <span>${data.phone}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${data.phone}')"></i>
        </div>
        ${data.zip ? `
        <div class="info-item">
            <span class="text-muted">${translations[lang].zip}:</span>
            <span>${data.zip}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${data.zip}')"></i>
        </div>` : ''}
    `;
}

// Keep existing copyText, showLoader, hideLoader functions
