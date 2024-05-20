const filePath = "data.json";

async function getData() {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error("Error al cargar el archivo JSON");
  }
  const data = await response.json();
  return data;
}

async function renderList() {
  const data = await getData();

  for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    let div = document.createElement("div");
    let divScore = document.createElement("div");
    let img = document.createElement("img");
    let text = document.createElement("p");
    let spanScore = document.createElement("p");
    let ofScore = document.createElement("span");

    ofScore.textContent = "/100";
    img.src = data[i].icon;
    text.textContent = data[i].category;
    spanScore.textContent = data[i].score;
    spanScore.className = "spanScore";
    divScore.className = "divScore"

    div.appendChild(img);
    div.appendChild(text);
    li.appendChild(div);
    divScore.appendChild(spanScore);
    divScore.appendChild(ofScore);
    li.appendChild(divScore);
    li.className = data[i].category;
    document.getElementById("summary").appendChild(li);
  }
}

async function renderResult() {
  const data = await getData();
  let textResult = document.createElement("p");
  textResult.className = "p-result";
  let resultTest = 0;

  for (let i = 0; i < data.length; i++) {
    resultTest += data[i].score;
  }
  resultTest = resultTest / data.length;
  textResult.innerText = Math.round(resultTest);

  let firstElement = document.getElementById("result").firstChild;

  document.getElementById("result").insertBefore(textResult, firstElement);
}

renderResult();
renderList();
