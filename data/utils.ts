import { OptionsNoneOrAll } from "./generators"

function resolveIncludeAll<T>(include: OptionsNoneOrAll<T>, allIncludes: T[], defaultIncludes: T[] = []): T[] {
    switch(include) {
        case 'all':
            return allIncludes;
        case 'none':
            return [];
        default:
            return include ?? defaultIncludes;
    }
}

export {
    resolveIncludeAll
}