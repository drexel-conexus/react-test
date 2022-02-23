
function colorManager(defaultColor) {
  let stack = [defaultColor, "red", "green", "blue", "pink"];
  let index = 0;

  return {
    
    get: function () {
      return stack[index];
    },

    next: function () {
      index += 1;
      if (index >= stack.length) {
        index = 0;
      }

      return this.get();
    },

    prev: function () {
      index -= 1;
      if (index < 0) {
        index = stack.length - 1;
      }

      return this.get();
    },

    reset: function () {
      index = stack.indexOf(defaultColor);
      return this.get();
    },

    setPalette: function(colours) {
      stack = [defaultColor, ...colours]
    }
  };
}