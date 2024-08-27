interface MenuListItem {
    name: string;
    value: string;
    disabled?: boolean;
}

interface MenuNumListItem {
    name: string;
    value: number;
}

export const menuList: MenuListItem[] = [
    { name: 'time', value: 'time', disabled: true },
    { name: 'word', value: 'word' },
    { name: 'quote', value: 'quote' },
    { name: 'zen', value: 'zen' },
    { name: 'custom', value: 'custom' },
];

export const timeList: MenuNumListItem[] = [
    { name: '15', value: 15 },
    { name: '30', value: 30 },
    { name: '60', value: 60 },
    { name: '120', value: 120 },
    { name: 'custom', value: 150 },
];

export const textLengthList: MenuNumListItem[] = [
    { name: '50', value: 50 },
    { name: '100', value: 100 },
    { name: '250', value: 250 },
    { name: '500', value: 500 },
    { name: 'custom', value: 600 },
];

export const quoteList: MenuListItem[] = [
    { name: 'all', value: 'all' },
    { name: 'short', value: 'short' },
    { name: 'medium', value: 'medium' },
    { name: 'long', value: 'long' },
    { name: 'thicc', value: 'thicc' },
];
