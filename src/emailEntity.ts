/*
 Individual email state
 */

export class EmailEntity {
    valid = false
    value = ''
    completed = false

    constructor(value?: string) {
        if (typeof value !== 'undefined') {
           this.complete()
            this.update(value)
        }
    }

    public complete(): void {
        this.completed = true
    }

    public update(value: string): void {
        this.valid = EmailEntity.validate(value)
        this.value = value
    }

    public static validate(value: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }
}