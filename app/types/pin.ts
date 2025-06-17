export interface Pin {
    id: string
    title: string
    description?: string
    imageUrl: string
    author: {
        name: string
        avatar: string
    }
    tags: string[]
    likes: number
    saves: number
    createdAt: string
    width: number
    height: number
}


export interface Board {
    id: string
    name: string
    description?: string
    pins: Pin[]
    isPrivate: boolean
    createdAt: string
}