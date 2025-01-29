export type DataGenerator<T, O> = {
    generate: (options?: O) => T
}

export type OptionsOrAll<T> = 'all' | T[]