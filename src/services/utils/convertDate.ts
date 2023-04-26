function transformDate(date: string | any): string {
    const _date: Date = new Date(date);
    return _date.toLocaleString("pt-BR");
}

function transformDateWithoutTime(date: string | any): string {
    const _date: Date = new Date(date);
    return _date.toLocaleString("pt-BR").substring(0, 10);
}

export { transformDate, transformDateWithoutTime };
