const PaintBucket = document.getElementById('paint-bucket');
const ColorPicker = document.getElementById('color-picker');
const Move = document.getElementById('move-button');
const Transform = document.getElementById('transform-button');
const FigureContainer = document.getElementById('container');
const CurrentColorEl = document.getElementById('current-color');
let currentColor = window.getComputedStyle(CurrentColorEl).backgroundColor;
const PrevColEl = document.getElementById('prev-color');
let prevCol = window.getComputedStyle(PrevColEl).backgroundColor;


class currentState {
    constructor(currentTool) {
        this.currentTool = currentTool;
    }
}

const tools = {
    bucket: 'paint-bucket-tool',
    picker: 'color-picker-tool',
    move: 'move-button-tool',
    transform: 'transform-button-tool',
}

Transform.addEventListener('click', function(event) {
    currentState.currentTool = tools.transform;
    console.log(currentState.currentTool);
});
PaintBucket.addEventListener('click', function(event) {
    currentState.currentTool = tools.bucket;
    console.log(currentState.currentTool);
});
ColorPicker.addEventListener('click', function(event) {
    currentState.currentTool = tools.picker;
    console.log(currentState.currentTool);
});
Move.addEventListener('click', function(event) {
    currentState.currentTool = tools.move;
    console.log(currentState.currentTool);
});

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 80:
            currentState.currentTool = tools.bucket;
            break;
        case 67:
            currentState.currentTool = tools.picker;
            break;
        case 77:
            currentState.currentTool = tools.move;
            break;
        case 84:
            currentState.currentTool = tools.transform;
            break;
    }
});

FigureContainer.addEventListener('click', function(event) {
    if (currentState.currentTool === tools.transform) {
        if (event.target.style.borderRadius === '50%') {
            event.target.style.borderRadius = '0%'
        } else {
            event.target.style.borderRadius = '50%';
        }
    } else if (currentState.currentTool === tools.bucket) {
        event.target.style.backgroundColor = currentColor;
    }
});



FigureContainer.addEventListener('mousedown', function(event) {

    if (currentState.currentTool === tools.move) {

        let coords = getCoords(event.target);
        let shiftX = event.pageX - coords.left;
        let shiftY = event.pageY - coords.top;

        event.target.style.position = 'absolute';
        document.body.appendChild(event.target);
        moveAt(event);

        event.target.zIndex = 1000;

        function moveAt(event) {
            event.target.style.left = event.pageX - shiftX + 'px';
            event.target.style.top = event.pageY - shiftY + 'px';
        }
        document.onmousemove = function(event) {
            moveAt(event);
        };
        event.target.onmouseup = function() {
            document.onmousemove = null;
            event.target.onmouseup = null;
        };

        event.target.addEventListener('dragstart', function() {
            return false;
        });

        function getCoords(element) {
            let box = element.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset,
            };
        }
    }
});



document.addEventListener('click', function(event) {
    if (currentState.currentTool === tools.picker) {
        let temp = window.getComputedStyle(event.target).backgroundColor;
        PrevColEl.style.backgroundColor = currentColor;
        currentColor = temp;
        CurrentColorEl.style.backgroundColor = temp;
    }
});