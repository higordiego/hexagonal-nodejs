
export type Route = {
    path: string;
    middleware: Function[];
    handler: Function;
    auth: boolean;
    permission: string[];
}

export type RouteClass = {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch'
    url: string
    handler: any
}

export type Handler = Function[]