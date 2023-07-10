const carrousel = document.querySelector(".carrousel"); 
firstImg = carrousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff; 
let firstImgWidht = firstImg.clientWidth + 14; 
let scrollWidth = carrousel.scrollWidth - carrousel.clientWidth;

const showHideIcons = () =>{
    let scrollWidth = carrousel.scrollWidth - carrousel.clientWidth;
    arrowIcons[0].style.display = carrousel.scrollLeft == 0 ? "none" : "block"; 
    arrowIcons[1].style.display = carrousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", ()=>{
        carrousel.scrollLeft += icon.id == "left" ? -firstImgWidht : firstImgWidht; 
        setTimeout(() => showHideIcons(), 60);
    })
});

const autoSlide = () =>{

    if(carrousel.scrollLeft == (carrousel.scrollWidth - carrousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff); 
    let firstImgWidht = firstImg.clientWidth + 14;
    let valDifference = firstImgWidht - positionDiff;

    if(carrousel.scrollLeft > prevScrollLeft){
        return carrousel.scrollLeft += positionDiff > firstImgWidht / 3 ? valDifference : -positionDiff;    
    }
    carrousel.scrollLeft -= positionDiff > firstImgWidht / 3 ? valDifference : -positionDiff;
    
}


const dragStart = () =>{
    isDragStart = true;
    prevPageX = e.pageX || e.touchend[0].pageX;
    prevScrollLeft = carrousel.scrollLeft;
}

const dragging = (e) =>{
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true; 
    carrousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touched[0].pageX)- prevPageX; 
    carrousel.scrollLeft = prevScrollLeft - positionDiff; 
    showHideIcons();
}

const dragStop = () =>{
    isDragStart = false;
    carrousel.classList.remove("dragging");

    if(!isDragging) return; 
    isDragging = false;
    autoSlide();
}

carrousel.addEventListener("mousedown", dragStart);
carrousel.addEventListener("touchstart", dragStart);

carrousel.addEventListener("mousemove", dragging);
carrousel.addEventListener("touchmove", dragging);

carrousel.addEventListener("mouseup", dragStop);
carrousel.addEventListener("mouseleave", dragStop);
carrousel.addEventListener("touchend", dragStop);