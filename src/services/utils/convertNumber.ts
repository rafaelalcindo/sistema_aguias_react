function ajustarValor(valor: any) {
    if (valor != undefined) {
        if (valor.indexOf("R$ ") !== -1) {
            valor = valor.split("R$ ").join("");
        }
        if (valor.indexOf("%") !== -1) {
            valor = valor.split("%").join("");
        }
        if (valor.match(".")) {
            valor = valor.split(".").join("");
        }
        if (valor.match(",")) {
            valor = valor.replace(",", ".");
        }
    } else {
        valor = 0;
    }

    return valor;
}

export { ajustarValor };
