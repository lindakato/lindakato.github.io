function TextHighlighter() {
  this.list = [];
  this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

TextHighlighter.prototype.highlight = function() {
}

TextHighlighter.prototype.add = function(text) {
  if (text == null || text.trim().length === 0) return;

  text = text.toLowerCase();

  if (this.list.indexOf(text) < 0) {
    this.list.push(text);
  }
}

TextHighlighter.prototype.remove = function() {
}
