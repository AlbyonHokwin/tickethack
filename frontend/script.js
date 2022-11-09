
//affichage des voyages trouvés (dans index.html)
document.querySelector("#search").addEventListener('click', 
function(){
    console.log('Click detected');
    for(let i=0; i < trips.length; i++)
{
    const tripSelected = fetch(`./index.html/departure+${[i]}+arrival+${[i]}`)
 .then(response => response.json())
 .then(trips => {
   document.querySelector("#container").innerHTML += `<div id="container">
   <div class="trip">
       <p><input type="text" id="departure" name="name" size="10">${trips.type.departure}</p>
   
       <p><input type="text" id="arrival" name="name" size="10">${trips.type.arrival}</p>
   
       <p><input type="date" id="start" name="trip-start"
          value="2022-11-07"
          min="2022-01-01" max="2022-12-31">${trips.type.date}</p>

          <p>${trips.type.price}</p>
   
          <p><button>Search</button></p>
   
   </div>
   
   <div class="result">
   
   
   </div>
   </div>`;
 });
}
})

//ajout des voyages (dans cart.html)
if (newTrip) {
    $('#cart-dropdown').prepend('<li id="'+ id +'"><a href="'+ url +'">'+ departure +'<br><small>Quantité : <span class="qt">'+ qt +'</span></small></a></li>');

    cartTrips.push({
        id: id,
        departure: departure,
        arrival: arrival,
        date: date,
        price: price,
    });
}


//suppression des voyages (dans cart.html)
$('.delete-item').click(function() {
    var $this = $(this);
    var qt = parseInt($this.prevAll('.qt').html());
    var id = $this.parent().parent().attr('data-id');
    var artWeight = parseInt($this.parent().parent().attr('data-weight'));
    var arrayId = 0;
    var price;

    // maj qt
    inCartItemsNum -= qt;
    $('#in-cart-items-num').html(inCartItemsNum);

    // supprime l'item du DOM
    $this.parent().parent().hide(600);
    $('#'+ id).remove();

    cartArticles.forEach(function(v) {
        // on récupère l'id de l'article dans l'array
        if (v.id == id) {
            // on met à jour le sous total et retire l'article de l'array
            // as usual, calcul sur des entiers
            var itemPrice = v.price.replace(',', '.') * 1000;
            subTotal -= (itemPrice * qt) / 1000;
            weight -= artWeight * qt;
            cartArticles.splice(arrayId, 1);

            return false;
        }

        arrayId++;
    })});

//affichage des voyages réservés (dans bookings.html)
document.querySelector("#purchase").addEventListener('click', 
function(){
    console.log('Click detected');
    for(let i=0; i < trips.length; i++)
{
    const tripPurchased = fetch(`./index.html/departure+${[i]}+arrival+${[i]}`)
 .then(response => response.json())
 .then(trips => {
   document.querySelector("#container").innerHTML += `<div id="container">
   <div class="trip">
       <p><input type="text" id="departure" name="name" size="10">${trips.type.departure}</p>
   
       <p><input type="text" id="arrival" name="name" size="10">${trips.type.arrival}</p>
   
       <p><input type="date" id="start" name="trip-start"
          value="2022-11-07"
          min="2022-01-01" max="2022-12-31">${trips.type.date}</p>

          <p>Departure in ${trips.type.time}hours</p>
   
          <p><button>Search</button></p>
   
   </div>
   
   <div class="result">
   
   
   </div>
   </div>`;
 });
}
});
