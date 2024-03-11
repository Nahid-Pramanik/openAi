const loadAi = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAi(data.data.tools, dataLimit);
}

const displayAi = (ais, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

    const showMore = document.getElementById('show-more-btn');
    if (dataLimit && ais.length > 6) {
        ais = ais.slice(0, 6);
        showMore.classList.remove('hidden');
    }
    else {
        showMore.classList.add('hidden');
    }

    ais.forEach(ai => {
        // console.log(ai.id);
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl p-4 border rounded-lg">
            <figure><img src="${ai.image ? ai.image : 'No Image Found'}" alt="Image" /></figure>
            <div class="card-body">
                <h2 class="card-title text-xl font-medium">Features</h2>
                <p>1. ${ai.features[0]}</p>
                <p>2. ${ai.features[1]}</p>
                <p>3. ${ai.features[2]}</p>
                <div class="card-actions flex justify-between">
                    <div>
                        <h4 class="card-title text-xl font-medium">${ai.name}</h4>
                        <p>${ai.published_in}</p>
                    </div>
                    <button onclick="my_modal_3.showModal(); loadAiDetails('${ai.id}');" class="btn text-red-600 text-2xl rounded-3xl bg-red-50 p-3"><i class="fa-solid fa-arrow-right "></i></button>
                </div>
            </div>
        </div> 
        `;
        phoneContainer.appendChild(createDiv);
    })
}

document.getElementById('show-more-btn').addEventListener('click', function () {
    loadAi()
})

const loadAiDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiDetails(data.data);
}

const displayAiDetails = (aiDetais) => {
    console.log(aiDetais);

    const modalBody = document.getElementById('ai-modal-body');
    modalBody.innerHTML = `
    <div class="border border-red-500 p-5 rounded-lg bg-red-50">
        <h3 class="text-xl font-medium text-center lg:text-left mb-3">${aiDetais.description}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-between gap-3 mb-4 text-center items-center">
            <h3 class="bg-white p-4 rounded-lg text-green-700 font-medium">${aiDetais.pricing ? aiDetais.pricing[0].price : 'No need Price'}</h3>
            <h3 class="bg-white p-4 rounded-lg font-medium text-orange-600">${aiDetais.pricing ? aiDetais.pricing[1].price : 'No need Price'}</h3>
            <h3 class="bg-white p-4 rounded-lg font-medium text-red-600">${aiDetais.pricing ? aiDetais.pricing[2].price : 'No need Price'}</h3>
        </div>
        <div class="flex justify-between">
            <div>
                <h2 class="text-xl font-medium mb-2">Features</h2>
                <p  class="text-base mb-1">${aiDetais.features ? aiDetais.features[1].feature_name : "No Feature Available"}</p>
                <p  class="text-base mb-1">${aiDetais.features ? aiDetais.features[2].feature_name : "No Feature Available"}</p>
                <p  class="text-base mb-1">${aiDetais.features ? aiDetais.features[3].feature_name : "No Feature Available"}</p>
            </div>
            <div>
                <h2 class="text-xl font-medium mb-2">Integrations</h2>
                <p class="text-base mb-1">${aiDetais.integrations ? aiDetais.integrations[0] : 'Information Not Found'}</p>
                <p class="text-base mb-1">${aiDetais.integrations ? aiDetais.integrations[1] : 'Information Not Found'}</p>
                <p class="text-base mb-1">${aiDetais.integrations ? aiDetais.integrations[2] : 'Information Not Found'}</p>
            </div>
        </div>
    </div>
    
    <div class="border rounded-lg p-5 text-center">
        <div class="relative">
            <img src="${aiDetais.image_link ? aiDetais.image_link[0] : aiDetais.image_link[1]}" alt="">
            <div class="absolute top-4 right-3 bg-red-500 py-1 px-3 rounded-lg">
                <p class="text-white">94% accuracy</p>
            </div>
        </div>
        <h3 class="text-xl font-medium my-4">${aiDetais.input_output_examples ? aiDetais.input_output_examples[0].input : 'Information Not Found'}</h3>
        <p class="text-base mb-2">${aiDetais.input_output_examples ? aiDetais.input_output_examples[0].output : 'Information Not Found'}</p>
    </div>
    `;
}

loadAi(6);