export interface ResponseApi<T> {
    success: boolean,
    message: string,
    data: T,
    errors: []
}

export interface ResponsePaginate<T> {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[]
}
