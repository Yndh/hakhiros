export function getQuerryParameters(url: string): { [key: string]: string } {
    const queryParamsArray: string[] = url.split("?").slice(1).toString().split("&")
    const querryParams: { [key: string]: string } = {}
    queryParamsArray.forEach((querryParam: string) => {
        const [key, value] = querryParam.split("=")
        querryParams[key] = value
    })
    return querryParams
}