export declare const timeout: <T>(millis: number, f: (done: () => boolean) => Promise<T>) => Promise<T>;
