const keyboard = document.getElementById("keyboard");
const stats = document.getElementById("stats");
const palabra = document.getElementById("palabra");
const qwe = "qwertyuiop";
const asd = "asdfghjklñ";
const zxc = "zxcvbnm";
let palabraArray;
let letrasIngresadas = [];
let position = [0, 0];

inciar();

function inciar() {
  palabra.textContent = "CARGANDO PALABRA...";
  palabraRandom();
  generarTeclado();
}

function palabraRandom() {
  let url = `https://palabras-aleatorias-public-api.herokuapp.com/random`;
  return fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      palabraArray = [...data.body.Word];
      if (palabraArray.length != 5) {
        cambiarPalabra();
      } else {
        palabra.textContent = "";
        generarCuadro();
      }

      for (i = 0; i <= palabraArray.length; i++) {
        switch (palabraArray[i]) {
          case "á":
            palabraArray[i] = "a";
            break;
          case "é":
            palabraArray[i] = "e";
            break;
          case "í":
            palabraArray[i] = "i";
            break;
          case "ó":
            palabraArray[i] = "o";
            break;
          case "ú":
            palabraArray[i] = "u";
            break;
        }
      }
    });
}

function cambiarPalabra() {
  palabraRandom();
}

function generarCuadro() {
  for (i = 0; i < 6; i++) {
    const fila = document.createElement("div");
    fila.setAttribute("class", " flex gap-2");
    palabra.appendChild(fila);
    for (a = 0; a < 5; a++) {
      const columna = document.createElement("div");
      columna.setAttribute("class", `cuadroLetra`);
      const p = document.createElement("p");
      p.setAttribute(
        "class",
        `text-white text-center uppercase text-5xl ubicacion${i}${a}`
      );
      columna.appendChild(p);
      fila.appendChild(columna);
    }
  }
}

function generarTeclado() {
  qweArray = [...qwe];
  asdArray = [...asd];
  zxcArray = [...zxc];

  const primerLinea = document.createElement("div");
  primerLinea.setAttribute("class", "w-full m-2 gap-2 flex justify-center");

  const segundaLinea = document.createElement("div");
  segundaLinea.setAttribute("class", "w-full m-2 gap-2 flex justify-center");

  const terceraLinea = document.createElement("div");
  terceraLinea.setAttribute("class", "w-full m-2 gap-2 flex justify-center");

  keyboard.appendChild(primerLinea);
  keyboard.appendChild(segundaLinea);
  keyboard.appendChild(terceraLinea);

  qweArray.forEach((element) => {
    const button = document.createElement("button");
    button.setAttribute(
      "class",
      `
      btnLetra btnLetra${element} uppercase text-white rounded-md p-4
      `
    );
    button.setAttribute("onClick", `pushLetra("${element}")`);
    button.innerHTML = `${element}`;
    primerLinea.appendChild(button);
  });

  asdArray.forEach((element) => {
    const button = document.createElement("button");
    button.setAttribute(
      "class",
      `
      btnLetra btnLetra${element} uppercase text-white rounded-md p-4
      `
    );
    button.setAttribute("onClick", `pushLetra("${element}")`);
    button.innerHTML = `${element}`;
    segundaLinea.appendChild(button);
  });

  const enter = document.createElement("button");
  enter.setAttribute(
    "class",
    `
  btnLetra text-white uppercase rounded-md p-4

  `
  );
  enter.setAttribute("onClick", `chequearPalabra()`);
  enter.textContent = "enviar";
  terceraLinea.appendChild(enter);

  zxcArray.forEach((element) => {
    const button = document.createElement("button");
    button.setAttribute(
      "class",
      `
      btnLetra btnLetra${element} uppercase text-white rounded-md p-4
      `
    );
    button.setAttribute("onClick", `pushLetra("${element}")`);
    button.innerHTML = `${element}`;
    terceraLinea.appendChild(button);
  });

  const borrar = document.createElement("button");
  borrar.setAttribute(
    "class",
    `
  btnLetra text-white uppercase rounded-md p-4

  `
  );
  borrar.setAttribute("onClick", `borrarLetra()`);
  borrar.innerHTML = `<img id="borrar" src="./img/borrar1.png">`;
  terceraLinea.appendChild(borrar);
}

function pushLetra(letra) {
  if (letrasIngresadas.length < 5) {
    let print = document.querySelector(`.ubicacion${position.join("")}`);
    print.textContent = `${letra}`;
    position[1]++;
    letrasIngresadas.push(letra);
  }
}

function borrarLetra() {
  if (letrasIngresadas.length != 0) {
    position[1]--;
    let print = document.querySelector(`.ubicacion${position.join("")}`);
    print.textContent = ``;
    letrasIngresadas.pop();
  }
}

function chequearPalabra() {
  if (letrasIngresadas.length != 5) {
  } else if (
    JSON.stringify(letrasIngresadas) === JSON.stringify(palabraArray)
  ) {
    swal.fire("GANASTE!");
    for (i = 0; i < letrasIngresadas.length; i++) {
      position[1] = i;
      cambiarColor(position.join(""), "Correcta");
    }
  } else {
    for (i = 0; i < letrasIngresadas.length; i++) {
      if (palabraArray.includes(letrasIngresadas[i])) {
        if (palabraArray[i] === letrasIngresadas[i]) {
          position[1] = i;
          cambiarBtnLetra(`${letrasIngresadas[i]}`, "Correcta");
          cambiarColor(position.join(""), "Correcta");
        } else {
          position[1] = i;
          cambiarColor(position.join(""), "Posicion");
        }
      } else {
        position[1] = i;
        cambiarColor(position.join(""), "Incorrecta");
        cambiarBtnLetra(`${letrasIngresadas[i]}`, "Incorrecta");
      }
    }
    letrasIngresadas = [];
    position[0]++;
    position[1] = 0;
  }
  if (position[0] === 6) {
    swal.fire(
      `PERDISTE\nLA PALABRA ERA "${palabraArray.join("").toUpperCase()}"`
    );
  }
}

function cambiarColor(ubicacion, opcion) {
  const cuadro = document.querySelector(`.ubicacion${ubicacion}`);
  cuadro.setAttribute(
    "class",
    `text-white text-center uppercase text-5xl ubicacion${ubicacion} cuadroLetra${opcion}`
  );
}

function cambiarBtnLetra(letra, opcion) {
  if (opcion != "Incorrecta") {
    const btn = document.querySelector(`.btnLetra${letra}`);
    btn.setAttribute(
      "class",
      `btnLetra btnLetra${letra} btnLetra${opcion} uppercase text-white rounded-md p-4`
    );
  } else {
    const btn = document.querySelector(`.btnLetra${letra}`);
    btn.setAttribute(
      "class",
      `btnLetra btnLetra${letra} btnLetra${opcion} uppercase text-white rounded-md p-4`
    );
  }
}
