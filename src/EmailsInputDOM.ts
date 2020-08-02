// encapsulate EmailsInput direct DOM manipulations

import * as styles from './style.css'
import {EmailEntity} from "./emailEntity";

export type ControlItemProps = {title: string, onClick: (event: MouseEvent) => void}

export class EmailsInputDOM {

    inputNode: HTMLInputElement | null
    wrapperNode: HTMLDivElement | null
    emailsContainer: HTMLDivElement | null
    inputBodyNode: HTMLDivElement | null
    titleNode: HTMLHeadingElement | null
    controlsNode: HTMLDivElement | null
    controlItems: HTMLButtonElement[] = []


    constructor(root: HTMLElement) {
        this.wrapperNode = EmailsInputDOM.mountWrapper(root)

        this.inputBodyNode = EmailsInputDOM.mountBody(this.wrapperNode)
        this.titleNode = EmailsInputDOM.mountTitle(this.inputBodyNode)
        this.emailsContainer = EmailsInputDOM.mountEmailsContainer(this.inputBodyNode)
        this.inputNode = EmailsInputDOM.mountInput(this.emailsContainer)

        this.controlsNode = EmailsInputDOM.mountControls(this.wrapperNode)
    }

    public addEmailsItem(entity: EmailEntity, onDelete: () => void) {
        if (!this.emailsContainer) throw Error('emailsContainer is not mounted')

        const item = EmailsInputDOM.mountEmailItem(this.emailsContainer)
        item.className = [styles.emailItem, entity.valid? styles.emailItemCorrect : styles.emailItemError].join(' ')
        item.innerHTML = entity.value

        const cross = document.createElement('div')
        cross.onclick = () => {
            onDelete()
            this.emailsContainer?.removeChild(item)
        }
        cross.className = styles.emailItemDelete


        item.appendChild(cross)
        return item
    }

    public addControl(props: ControlItemProps) {
        if (!this.controlsNode) throw Error('controlsNode is not mounted')
        const controlNode = document.createElement('button')
        controlNode.innerText = props.title
        controlNode.onclick = props.onClick
        controlNode.className = styles.controlItem
        EmailsInputDOM.mountControl(this.controlsNode, controlNode)
    }

    public destroy() {
        this.inputNode?.remove()
        this.inputNode = null

        this.wrapperNode?.remove()
        this.wrapperNode = null
    }

    private static mountControl(where: HTMLElement, control: HTMLButtonElement): HTMLButtonElement {
        where.appendChild(control)
        return control
    }

    private static mountWrapper(where: HTMLElement): HTMLDivElement {
        const wrapper: HTMLDivElement = document.createElement('div')
        wrapper.className = styles.wrapper

        where.appendChild(wrapper)

        return wrapper
    }

    private static mountBody(where: HTMLElement): HTMLDivElement {
        const body = document.createElement('div')
        body.className = styles.body

        where.appendChild(body)

        return body
    }

    private static mountEmailsContainer(where: HTMLElement): HTMLDivElement {
        const item: HTMLDivElement = document.createElement('div')
        item.className = styles.emailsContainer
        where.appendChild(item)

        return item
    }

    private static mountEmailItem(where: HTMLElement): HTMLDivElement {
        const item: HTMLDivElement = document.createElement('div')
        item.className = styles.emailItem
        where.prepend(item)

        return item
    }

    private static mountInput(where: HTMLElement): HTMLInputElement {

        const input: HTMLInputElement = document.createElement('input')
        input.className = styles.input
        input.placeholder = 'add more people...'

        where.appendChild(input)

        return input
    }

    private static mountTitle(body: HTMLElement): HTMLHeadingElement {
        const title = document.createElement('h5')
        title.className = styles.title
        title.innerHTML = 'Share <b>Board name</b> with others'

        body.appendChild(title)

        return title
    }

    private static mountControls(wrapper: HTMLElement) {
        const controls = document.createElement('div')
        controls.className = styles.controls

        wrapper.appendChild(controls)

        return controls
    }
}