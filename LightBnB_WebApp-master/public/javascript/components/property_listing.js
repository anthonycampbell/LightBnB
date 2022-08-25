$(() => {
  window.propertyListing = {};
  
  function createListing(property, isReservation) {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ? 
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` 
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
            <form id="make-reservation" >
              <div class="new-reservation_form__field-wrapper">
                <input type="hidden" name="property_id" value="${property.id}">
              </div>
              <div class="new-reservation_form__field-wrapper">
                <label>Start Date: </label>
                <input type="date" name="start_date"/>
              </div>
              <div class="new-reservation_form__field-wrapper">
                <label>End Date: </label>
                <input type="date" name="end_date"/>
              </div>
              <button>Reserve</button>
          </form>
          </footer>
        </section>
      </article>
    `
  }

  window.propertyListing.createListing = createListing;

  // $('body').on('click', '.make-reserve', function() {
  //   views_manager.show('newReservation');
  // });

  $('body').on('submit', '#make-reservation', function(event) {
    event.preventDefault();
    views_manager.show('none');
    const data = $(this).serialize();
    submitRevervation(data)
    .then(() => {
      views_manager.show('listings');
    })
    .catch((error) => {
      console.error(error);
      views_manager.show('listings');
    });
  });
});