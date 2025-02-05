export const includeSlug = (urlToUpdate: string, slug: string, slugKey: string = 'rootUrl') =>
  urlToUpdate.replace(`{${slugKey}}`, slug)

export default {
    includeSlug
}