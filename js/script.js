const reference = document.querySelector('#reference-item'); 
const carousel = document.querySelector('#recomendation-carousel');
const next = document.querySelector('#recomendation-carousel-next');
const prev = document.querySelector('#recomendation-carousel-prev');

(function() {
    let script = document.createElement('script');
    script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    document.querySelector('body').appendChild(script);
})();

/**
 * Handles the data from the remote service
 * 
 * @param {Object} response - The responce with the reference and recomendation data 
 */
function X(response) {
    const recommendation = response && response.data && response.data.recommendation;
    
    carousel.innerHTML = populateRecomendations(response.data.recommendation);
    reference.innerHTML = populateReference(response.data.reference.item);
}

/**
 * Transitions to the next element of the carousel
 *
 * @param {Event} event - The click event 
 */
function nextSlideHandler(event) {
    event.preventDefault();

    // Prevents multiple animations running simultaneously    
    if(carousel.classList.contains('is-set') || carousel.classList.contains('is-reversing')) {
        return;
    }

    function nextElement() {
        carousel.classList.remove('is-set');
        carousel.appendChild(carousel.firstElementChild);
        carousel.removeEventListener('transitionend', nextElement);
    }

    carousel.addEventListener('transitionend', nextElement);
    carousel.classList.add('is-set');
}

/**
 * Transitions to the previous element of the carousel
 *
 * @param {Event} event - The click event 
 */
function prevSlideHandler(event) {
    event.preventDefault();

    // Prevents multiple animations running simultaneously
    if(carousel.classList.contains('is-set') || carousel.classList.contains('is-reversing')) {
        return;
    }

    carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);

    function prevElement() {
        carousel.classList.remove('is-reversing');
        carousel.removeEventListener('transitionend', prevElement);  
    }

    carousel.addEventListener('transitionend', prevElement);
    carousel.classList.add('is-reversing'); 
}

/**
* Returns the reference product as a string of valid html
*
* @param {Object} reference - The reference product object
*/
function populateReference(reference) {
    return(`
        <a href="${reference.detailUrl}" class="display-reference__item">
            <article>
                <figure>
                    <img src="http:${reference.imageName}" alt="">
                </figure>
                <h3>${reference.name}</h3>
                <p>${reference.oldPrice ? 'De ' + reference.oldPrice : ''}</p>
                <p>Por: <strong>${reference.price}</strong></p>
                <p>${reference.productInfo.paymentConditions}</p>
            </article>
        </a>`);
}

/**
* Returns a list of product recomendation items as a string of valid html
*
* @param {Object} recomendations - The list of product recomendations
*/
function populateRecomendations(recommendations) {
    return recommendations.reduce((recommendationHtml, recommendation) => {
        return recommendationHtml += `
        <a href="${recommendation.detailUrl}" class="display-recomendations__item">
            <article>
                <figure>
                    <img src="http:${recommendation.imageName}" alt="">
                </figure>
                <h3>${recommendation.name}</h3>
                <p>${recommendation.oldPrice ? 'De ' + recommendation.oldPrice : ''}</p>
                <p>Por: <strong>${recommendation.price}</strong></p>
                <p>${recommendation.productInfo.paymentConditions}</p>
            </article>
        </a>`;
    }, '');
}

next.addEventListener('click', nextSlideHandler);
prev.addEventListener('click', prevSlideHandler);