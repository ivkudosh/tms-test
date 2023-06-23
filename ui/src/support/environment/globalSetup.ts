import { FullConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

async function globalSetup(config: FullConfig) {
    dotenv.config({
        path: path.resolve(__dirname, `.env.${process.env.test_env || 'test'}`),
        override: true
    });
}

export default globalSetup;
