document.getElementById('generateBtn').addEventListener('click', generateData);

async function generateData() {
    const country = document.getElementById('countrySelect').value;
    const gender = document.getElementById('genderSelect').value;
    
    showLoader();
    
    try {
        const [addressData, personData] = await Promise.all([
            fetch(`https://fakerapi.it/api/v1/addresses?_locale=${country}`).then(res => res.json()),
            fetch(`https://fakerapi.it/api/v1/persons?_locale=${country}&_gender=${gender}`).then(res => res.json())
        ]);

        displayResults(addressData.data[0], personData.data[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        hideLoader();
    }
}

function displayResults(address, person) {
    const resultDiv = document.getElementById('resultContent');
    resultDiv.innerHTML = `
        <div class="info-item">
            <span class="text-muted">Name:</span>
            <span>${person.firstname} ${person.lastname}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${person.firstname} ${person.lastname}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">Email:</span>
            <span>${person.email}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${person.email}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">Address:</span>
            <span>${address.street}, ${address.city}, ${address.country}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${address.street}, ${address.city}, ${address.country}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">Phone:</span>
            <span>${person.phone}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${person.phone}')"></i>
        </div>
        <div class="info-item">
            <span class="text-muted">ZIP Code:</span>
            <span>${address.zipcode}</span>
            <i class="fas fa-copy copy-icon" onclick="copyText('${address.zipcode}')"></i>
        </div>
    `;
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

function showLoader() {
    document.getElementById('loader').classList.remove('d-none');
}

function hideLoader() {
    document.getElementById('loader').classList.add('d-none');
}
