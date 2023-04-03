function maskPhone(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
        .replace(/(-\d{4})\d+?$/, "$1");
}

function maskCpf(value: string) {
    return (value = value
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"));
}
function maskLetters(value: string) {
    return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
}

function maskCnpj(value: string) {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
}

function maskDocument(value: string) {
    if (value.length < 16) {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        return value
            .replace(/\D+/g, "")
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    }
}

function maskCep(value: string) {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
}

function maskCurrency(value: string) {
    return (
        "R$ " +
        value
            .replace(/\D/g, "")
            .replace(/(\d)(\d{2})$/, "$1,$2")
            .replace(/(?=(\d{3})+(\D))\B/g, ".")
    );
}

function maskValidity(value: string) {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
}

function maskCvv(value: string) {
    return value.replace(/\D/g, "");
}

function maskNumber(value: string) {
    return value.replace(/\D/g, "");
}
function decimalNumber(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{2})$/, "$1.$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".");
}

function handleChangeMask(
    text: string,
    mask:
        | "cnpj"
        | "cpf"
        | "phone"
        | "document"
        | "cep"
        | "currency"
        | "validity"
        | "number"
        | "letters"
        | "decimalNumber"
) {
    let formatedValue = text;

    if (mask === "phone") formatedValue = maskPhone(text);
    if (mask === "cpf") formatedValue = maskCpf(text);
    if (mask === "cnpj") formatedValue = maskCnpj(text);
    if (mask === "document") formatedValue = maskDocument(text);
    if (mask === "cep") formatedValue = maskCep(text);
    if (mask === "currency") formatedValue = maskCurrency(text);

    if (mask === "validity") formatedValue = maskValidity(text);

    if (mask === "number") formatedValue = maskNumber(text);
    if (mask === "letters") formatedValue = maskLetters(text);
    if (mask === "decimalNumber") formatedValue = decimalNumber(text);
    return formatedValue;
}

export { handleChangeMask };
