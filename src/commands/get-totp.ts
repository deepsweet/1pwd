import op from './op'

const getTotp = (item: string) => op(['get', 'totp', item])

export default getTotp
