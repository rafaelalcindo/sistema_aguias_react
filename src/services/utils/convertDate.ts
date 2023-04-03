function transformDate(date: string | any): string {
    const _date: Date = new Date(date);
    return _date.toLocaleString("pt-BR");
}

export { transformDate };
