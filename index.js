const track = document.getElementById("image_track")

// Set initial values for dataset properties as numbers
track.dataset.percentage = 0;
track.dataset.prevPercentage = 0;

const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = parseFloat(track.dataset.percentage);
};

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = e.clientX - parseFloat(track.dataset.mouseDownAt);
    const percentage = (mouseDelta / window.innerWidth) * 100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextPercentage = clamp(nextPercentage, -100, 0);

    console.log("mouseDelta:", mouseDelta, "percentage:", percentage, "nextPercentage:", nextPercentage);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
      
    for(const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
};



function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);