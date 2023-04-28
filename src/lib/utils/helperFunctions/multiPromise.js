export const waitForAll = async (...ps) => {
    return Promise.all(ps)
}