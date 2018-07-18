import op from './op'

export type GetItemOptions = {
  vault?: string,
  includeTrash?: boolean
}

const getItem = (item: string, options?: GetItemOptions): Promise<{}> =>
  op(['get', 'item', item], options).then(JSON.parse)

export default getItem
