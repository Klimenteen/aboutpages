const cards = document.getElementsByClassName("team-card");
const teamInfo = document.querySelectorAll(".team-info");
const card_container = document.querySelector('.term-card-container')

if (window.matchMedia("(max-width: 600px)").matches) {
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

            // console.log(1);
        });
    }
}


let openedInfo = 0;
[...cards].forEach((card) => {
    card.addEventListener('click', function() {
        if (card_container && cards.length > 0 && card.dataset.open == '0') {
            // console.log(card.children);
            card.children[3].style.display = 'block'
            card.children[0].classList.add('active')
            card.children[2].classList.add('active')


            card.dataset.open = '1'
        } else {
            card.children[3].style.display = 'none'
            card.children[0].classList.remove('active')
            card.children[2].classList.remove('active')


            card.dataset.open = '0'
        }
    })
})