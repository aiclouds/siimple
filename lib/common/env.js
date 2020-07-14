//Check if we are running in a dev environment
export function isDevEnv () {
    return process && process.env && (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development");
}

//Check if we are running in a production environment
export function isProductionEnv () {
    return process && process.env && process.env.NODE_ENV === "production";
}

