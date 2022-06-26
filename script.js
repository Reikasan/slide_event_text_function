const slideTexts = document.querySelectorAll('.slide-text');

slideTexts.forEach(eventText => {
    const eventTextWidth = eventText.clientWidth;
    const parentElement = eventText.parentElement;
    
    /* Duplicate Event text by loading and resize window size */
    window.addEventListener('load', duplicateSlideText);

    let resizeTimer;
    window.addEventListener('resize', ()=> {
        if(resizeTimer != null) {
            clearTimeout(resizeTimer);
        }    
        resizeTimer = setTimeout(duplicateSlideText, 200); 
    });

    function duplicateSlideText() {
        const parentWidth = parentElement.clientWidth;
        const times = Math.ceil(parentWidth/eventTextWidth);

        for(var i = 1; i <= times; i++) {
            const newText = eventText.cloneNode(true);
            parentElement.appendChild(newText);
        }
    }

    /* Text slide animation */
    parentElement.addEventListener('mouseover', startAnimation);
    parentElement.addEventListener('mouseleave', stopAnimation);

    var slideAnimation = parentElement.animate(
        [
            {transform: 'translateX(0px)'},
            {transform: 'translateX(-' + eventTextWidth + 'px)'}
            
        ],
        {
            duration: 8000,
            iterations: Infinity,
            easing: 'linear'
        }
    );
    slideAnimation.pause();

    function startAnimation() {
        slideAnimation.play();
    }

    function stopAnimation() {
        slideAnimation.pause();
    }
});


