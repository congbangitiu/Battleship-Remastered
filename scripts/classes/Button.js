var button = function (str, x, y, w = 170, h = 40) {
    this.txt = str;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
};

// drawing the button on the canvas
button.prototype.draw = function () {
    fill(54, 53, 109, 200);
    rect(this.x, this.y, this.width + 20, this.height + 20, 10);
    fill(230, 230, 237);
    textSize(30);
    text(this.txt, this.x + 11, this.y + 40);
};

//checks if the mouse pointer is inside the button area
button.prototype.insideButton = function () {
    if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
        this.lightUpButton();
        return 1;
    }
    return 0;
};

//change the button's color when the mouse pointer is over the button
button.prototype.lightUpButton = function () {
    fill(240, 218, 240, 50);
    rect(this.x, this.y, this.width + 20, this.height + 20, 10);
};