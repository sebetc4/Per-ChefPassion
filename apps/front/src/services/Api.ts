export class Api {
    constructor() {}

    protected async get<T>(url: string): Promise<T> {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }

    protected async post<T>(url: string, data: T) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }

    protected async patch<T>(url: string, data: T) {
        const res = await fetch(`${url}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }

    protected async delete(url: string) {
        const res = await fetch(`${url}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }
}
