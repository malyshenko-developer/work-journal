const BASE_URL = 'http://localhost:8080/api'

export async function apiClient<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message ?? 'Something went wrong')
    }

    return response.json()
}