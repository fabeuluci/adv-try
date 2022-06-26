export type Maybe<T> = {success: false, error: unknown}|{success: true, value: T};
export type MaybeSimple<T> = {success: false}|{success: true, value: T};

export class Try {
    
    static try<T>(func: () => T): Maybe<T> {
        try {
            return {success: true, value: func()};
        }
        catch (e) {
            return {success: false, error: e};
        }
    }
    
    static async tryPromise<T>(func: () => Promise<T>|T): Promise<Maybe<T>> {
        try {
            return {success: true, value: await func()};
        }
        catch (e) {
            return {success: false, error: e};
        }
    }
    
    static tryJsonParse<T = unknown>(json: string): Maybe<T> {
        return Try.try(() => <T>JSON.parse(json));
    }
}
