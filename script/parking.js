
$(document).ready(function(){

    $('.slider').slick({
        slidesToShow:2,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed:3000,
        dots:true,
        arrows:true,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

});

function showParking(title, location, image, details) {
    document.getElementById("popup-title").innerText = title;
    document.getElementById("popup-location").innerText = location;
    document.getElementById("popup-img").src = image;
    document.getElementById("popup-details").innerHTML = details;

    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}