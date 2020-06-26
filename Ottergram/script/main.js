const DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
const DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
const DETAIL_FRAME_SELECTOR = "[data-image-role=\"frame\"]";
const THUMB_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
const HIDDEN_DETAIL_CLASS = "hidden-detail";
const TINY_EFFECT_CLASS = "is-tiny";
const ESC_KEY = 27;

function setDetail(imageUrl, titleText) {
    "use strict";
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.src = imageUrl;

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb){
    "use strict";
    return thumb.getAttribute("data-image-url");
}

function titleFromThumb(thumb){
    "use strict";
    return thumb.getAttribute("data-image-title");
}

function setDetailFromThumb(thumb){
    "use strict";
    setDetail(imageFromThumb(thumb), titleFromThumb(thumb));
}

function addThumbClickHandler(thumb){
    "use strict";
    thumb.addEventListener("click", function(event){
        event.preventDefault();
        setDetailFromThumb(thumb);
        showDetail();
    });
}

function getThumbArray(){
    "use strict";
    var thumbList = document.querySelectorAll(THUMB_LINK_SELECTOR);
    var thumbArr = [].slice.call(thumbList);
    return thumbArr;
}

function hideDetail(){
    "use strict";
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetail(){
    "use strict";
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(
        function () {
            frame.classList.remove(TINY_EFFECT_CLASS);
        }, 50);
}

function addKeyPressHandler(){
    "use strict";
    document.body.addEventListener("keyup",
        function(event) {
            event.preventDefault();
            console.log(event.keyCode);
            if(event.keyCode === ESC_KEY){
                hideDetail();
            }
        }
    );
}

function initializeEvents(){
    "use strict";
    var thumbArr = getThumbArray();
    thumbArr.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

initializeEvents();

function eventInitMe(){
    "use strict";
    let thumbArr = [].slice.call(document.querySelectorAll(THUMB_LINK_SELECTOR));
    thumbArr.forEach(thumb => thumb.addEventListener("click",
        function(event){
            event.preventDefault();

            document.querySelector(DETAIL_IMAGE_SELECTOR).src =
                thumb.getAttribute("data-image-url");

            document.querySelector(DETAIL_TITLE_SELECTOR).textContent =
                thumb.getAttribute("data-image-title");
        }
    ));
}

//eventInitMe();
