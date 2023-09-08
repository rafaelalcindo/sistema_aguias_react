function removeCep(CepValue: string) {
    return CepValue.replace('-', "");
}

function removePhone(PhoneValue: string) {
    return PhoneValue
        .replace(/[^\d]/g, '')
        .replace(/\s/g, '');
}

function removeMask(
    text: string,
    mask:
        | "cep"
        | "phone"
) {
    let removedMask = text;

    if (mask === 'cep') removedMask = removeCep(text);
    if (mask === 'phone') removedMask = removePhone(text);

    return removedMask;
}

export { removeMask };