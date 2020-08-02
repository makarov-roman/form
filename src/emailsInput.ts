import {EmailEntity} from "./emailEntity";
import {ControlItemProps, EmailsInputDOM} from "./EmailsInputDOM";

export const FLAGS = {
    FONTS_INJECTED: false
}
// add font
export const OPEN_SANS_HREF = "https://fonts.googleapis.com/css?family=Open+Sans"

export function injectFonts() {
    const fonts = document.createElement('link')
    fonts.href = OPEN_SANS_HREF
    fonts.rel = 'stylesheet'
    document.body.appendChild(fonts)

    FLAGS.FONTS_INJECTED = true
}

export class EmailsInput {
    constructor(containerNode: HTMLDivElement) {
        if (!FLAGS.FONTS_INJECTED) {
            injectFonts()
        }
        this.DOM = new EmailsInputDOM(containerNode)

        this.applyListenersListeners()
    }

    public entities: EmailEntity[] = []

    public DOM: EmailsInputDOM

    public get lastEntity(): EmailEntity | undefined {
        if (this.entities.length) {
            return this.entities[this.entities.length - 1]
        }
        return undefined
    }

    public addEmail(email: string) {
        const entity = new EmailEntity(email)
        this.entities.push(entity)

        this.DOM.addEmailsItem(entity, () => this.deleteEntity(entity))
    }

    public addControlItem(control: ControlItemProps) {
        this.DOM.addControl(control)
    }

    public destroy() {
        this.DOM.destroy()
    }

    private applyListenersListeners() {
        this.DOM.inputNode?.addEventListener('keydown', this.handleCompleteKeys)
        this.DOM.inputNode?.addEventListener('input', this.handleInput)
        this.DOM.inputNode?.addEventListener('blur', this.completeEmailBlock)
        this.DOM.inputNode?.addEventListener('paste', this.handlePaste)
    }

    private completeEmailBlock = () => {
        const entity = this.lastEntity
        if (!entity || entity.completed) return
        entity.complete()
        this.DOM.addEmailsItem(entity, () => this.deleteEntity(entity))
        if (this.DOM.inputNode) {
            this.DOM.inputNode.value = ''
        }
    }

    private deleteEntity = (entity: EmailEntity) => {
        this.entities = this.entities.filter(val => val !== entity)
    }

    private handleCompleteKeys = (event: KeyboardEvent) => {
        switch (event.key) {
            case ',':
            case 'Enter': {
                // complete current block
                this.completeEmailBlock()
                event.preventDefault()
                return
            }
            default: {
                return
            }
        }
    }

    private handleInput = (event: Event) => {
        let lastEntity = this.lastEntity
        if (!lastEntity || (lastEntity && lastEntity.completed)) {
            const newEntity = new EmailEntity()
            this.entities.push(newEntity)
            lastEntity = newEntity
        }
        lastEntity.update((<HTMLInputElement>event.currentTarget).value)
    }
    private handlePaste = (event: ClipboardEvent) => {
        event.preventDefault()
        const text = event.clipboardData?.getData('text')
        if (!text) return
        text
            .split(',')
            .map(email => email.trim())
            .forEach(email => {
                this.addEmail(email)
            })
    }
}

window.EmailsInput = EmailsInput