let buttonClass = (name, x, y, w = 170, h = 40) => {
	this.txt = name;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
};

// drawing the button on the canvas
buttonClass.prototype.draw = () => {
	fill(0, 210, 0, 200);
	rect(this.x, this.y, this.width, this.height, 10);
	fill(0, 0, 0);
	textSize(30);
	text(this.txt, this.x + 11, this.y + 30);
};

//checks if the mouse pointer is inside the button area
buttonClass.prototype.mouseIsInsideButton = () => {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			this.lightUpButton();
			return 1;
		}
		return 0;
};

//checks if the mouse button is pressed inside the button area
buttonClass.prototype.isPressed = () => {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			if (mouseIsPressed()) {
				return 1;
			}
			else {
				return 0;
			}
		}
		return 0;
};

//change the button's color when the mouse pointer is over the button
buttonClass.prototype.lightUpButton = () => {
	fill(240, 218, 240, 100);
	rect(this.x, this.y, this.width, this.height, 10);
};