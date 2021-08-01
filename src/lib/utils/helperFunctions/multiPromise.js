const handleRejection = (p) => {
    return p.catch((error)=>({
        error
    }))
}

export const waitForAll = async (...ps) => {
    return Promise.all(ps.map(handleRejection))
}