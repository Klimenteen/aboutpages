if (window.matchMedia("(max-width: 600px)").matches) {
    const cards = document.getElementsByClassName("team-card");
    const hideBtn = document.querySelector(".hide-btn");
    for (let i = 3; i < cards.length; i++) {
        cards[i].style.display = "none";
    }
    if (hideBtn) {
        hideBtn.addEventListener("click", function() {
            hideBtn.style.display = "none";
            for (let i = 3; i < cards.length; i++) {
                cards[i].style.display = "flex";
            }


            console.log(1);
        });
    }
}