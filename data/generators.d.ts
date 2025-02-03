export type DataGenerator<T, O> = {
    generate: (options?: O) => T
}

export type OptionsNoneOrAll<T> = 'all' | 'none' | T[]