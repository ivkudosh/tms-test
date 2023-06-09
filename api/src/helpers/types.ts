type Post = {
    title: string;
    body: string;
    userId: number;
}

type Params = {
    min: number;
    max: number;
    integer: boolean;
}

export { Post, Params };
