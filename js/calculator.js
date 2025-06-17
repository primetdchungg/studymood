let result = document.getElementById("result");
let math = document.getElementById("math");

function addValue(value) {
  if (math.textContent === "") {
    math.textContent = value;
  } else {
    math.textContent += value;
  }
}

function clearAll() {
  math.textContent = "";
  result.textContent = "0";
}

function del() {
  math.textContent = math.textContent.slice(0, -1);
}

function equal() {
  try {
    let screen_math = math.textContent;
    let output = eval(screen_math);
    result.textContent = output;
  } catch (e) {
    result.textContent = "ERROR";
  }
}
