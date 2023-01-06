window.addEventListener("load", () => {
  const Container = document.getElementById("container");
  const textInput = document.getElementById("input-text");
  const colorInput = document.getElementById("color-picker");
  const FORM = document.getElementById("input-box");
  const TEXT = document.getElementById("text");

  function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));

    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();

    return initialValue;
  }

  function saveValue(value) {
    localStorage.setItem("coroseList", JSON.stringify(value));
  }

  var screen = 0;

  var coroselList = getSavedValue("coroseList", [
    {
      color: "#00000",
      text: "satyam",
      testDes: "Name",
    },
    {
      color: "#ffffff",
      text: "RNSIT",
      testDes: "College",
    },
    {
      color: "#000000",
      text: "ISE",
      testDes: "DEP",
    },
    {
      color: "red",
      text: "Bengaluru",
      testDes: "City",
    },
  ]);

  function handleChangeSlide(left) {
    if (left) screen = screen - 1;
    else screen += 1;
    if (screen < 0) screen = 3;
    if (screen > 3) screen = 0;
    console.log("screen", screen);
    renderDisplay(screen);
  }

  function handleSubmit(e) {
    e.preventDefault();
    coroselList[screen]["text"] =
      textInput.value == "" ? coroselList[screen]["text"] : textInput.value;
    coroselList[screen]["color"] =
      colorInput.value == "#000000"
        ? coroselList[screen]["color"]
        : colorInput.value;

    colorInput.value = "#000000";
    renderDisplay(screen);
    textInput.value = "";
    console.log(coroselList);
  }

  FORM.addEventListener("submit", handleSubmit);

  document
    .getElementById("arrow-right")
    .addEventListener("click", () => handleChangeSlide(false));
  document
    .getElementById("arrow-left")
    .addEventListener("click", () => handleChangeSlide(true));

  function renderDisplay(ind) {
    console.log("screen Render");
    console.log(coroselList[ind]);
    TEXT.innerText = `${coroselList[ind]["testDes"]} : ${coroselList[ind].text}`;

    Container.style.backgroundColor = coroselList[ind]["color"];

    saveValue(coroselList);
  }

  renderDisplay(screen);
});
