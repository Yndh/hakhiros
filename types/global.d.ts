interface Houses { [key: string]: string }

interface Note {
    id: number
    title: string
    description: string,
    color: string,
    createdAt: Date
    isPinned: boolean
}

interface NoteFetch {
    id: number
    title: string
    description: string,
    color: string,
    createdAt: string
    isPinned: boolean
}