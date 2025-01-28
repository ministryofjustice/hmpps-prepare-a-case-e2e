import fs from 'fs'
import TestConfig from "./testConfig.d";

const GLOBAL_CONFIG_STORAGE: string = "bin/.state/config.json"

export const setTestConfig = (config: TestConfig) => fs.writeFileSync(GLOBAL_CONFIG_STORAGE, JSON.stringify(config));

export const getTestConfig = () => JSON.parse(fs.readFileSync(GLOBAL_CONFIG_STORAGE, 'utf-8')) as TestConfig

export default {
    setTestConfig,
    getTestConfig
}