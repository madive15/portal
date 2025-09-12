export const formatDate = (value: string): string => {
    if (!value || value.length < 8) return value;

    const date = value.substring(0, 8);
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    return `${year}-${month}-${day}`
};
