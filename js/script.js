const Display = function() {
    "use strict";

    const reference = document.querySelector("#reference-item");
    const carousel = document.querySelector("#recomendation-carousel");
    const next = document.querySelector("#recomendation-carousel-next");
    const prev = document.querySelector("#recomendation-carousel-prev");

    /**
     * Transitions to the next element of the carousel
     *
     * @param {Event} event - The click event
     */
    function nextSlideHandler(event) {
        event.preventDefault();
        if (carousel.classList.contains("is-set") || carousel.classList.contains("is-reversing")) {
            return;
        }

        function nextElement() {
            carousel.classList.remove("is-set");
            carousel.appendChild(carousel.firstElementChild);
            carousel.removeEventListener("transitionend", nextElement);
        }
        carousel.addEventListener("transitionend", nextElement);
        carousel.classList.add("is-set");
    }

    /**
     * Transitions to the previous element of the carousel
     *
     * @param {Event} event - The click event
     */
    function prevSlideHandler(event) {
        event.preventDefault();

        // Prevents multiple animations running simultaneously
        if (carousel.classList.contains("is-set") || carousel.classList.contains("is-reversing")) {
            return;
        }

        carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);

        function prevElement() {
            carousel.classList.remove("is-reversing");
            carousel.removeEventListener("transitionend", prevElement);
        }
        carousel.addEventListener("transitionend", prevElement);
        carousel.classList.add("is-reversing");
    }

    /**
    * Returns a product as a string of valid html
    *
    * @param {Object} reference - The product object
    * @param {String} styleClass - The root node html class
    */
    function populateProduct(product, styleClass) {
        return `<a href="${product.detailUrl}" class="${styleClass}">
                    <article>
                        <figure>
                            <img src="http:${product.imageName}" alt='${product.name}'>
                        </figure>
                        <h3>${product.name}</h3>
                        <p>${product.oldPrice?"De "+product.oldPrice:""}</p>
                        <p>Por: <strong>${product.price}</strong></p>
                        <p>${product.productInfo.paymentConditions}</p>
                    </article>
                </a>`;
    }

    next.addEventListener("click", nextSlideHandler);
    prev.addEventListener("click", prevSlideHandler);

    let script = document.createElement("script");
    script.src = "http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X";
    document.querySelector("body").appendChild(script);

    return {
        populateProduct: populateProduct
    }
}();

/**
 * Handles the data from the remote service
 *
 * @param {Object} response - The responce with the reference and recomendation data
 */
function X(response) {
    const recommendation = response && response.data && response.data.recommendation;

    document.querySelector("#recomendation-carousel").innerHTML = recommendation.reduce((acc, product) => {
        return acc += Display.populateProduct(product, "display-recomendations__item");
    }, "");

    document.querySelector("#reference-item").innerHTML = Display.populateProduct(response.data.reference.item, "display-reference__item");
}