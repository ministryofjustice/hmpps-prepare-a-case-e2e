import { OptionsOrAll } from "./generators"

function resolveIncludeAll<T>(include: OptionsOrAll<T>, allIncludes: T[], defaultIncludes: T[] = []): T[] {
    let result: T[]
    if(include === 'all') {
        result = allIncludes
    } else {
        result = include as T[]
    }
    return result ?? defaultIncludes
}

export {
    resolveIncludeAll
}