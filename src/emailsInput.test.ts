import {EmailsInput, injectFonts, OPEN_SANS_HREF} from './emailsInput'
import {dispatchKeyboardEvent, simulateTyping} from "./test-utils";

import * as styles from './style.css'

const CONTAINER_ID = 'container'
const INVALID_EMAIL = 'invalid'
const VALID_EMAIL = 'valid@email.com'

function getContainer() {
    return document.getElementById(CONTAINER_ID) as HTMLDivElement
}

describe('emails input', () => {
    let emailsInput: EmailsInput
    beforeEach(() => {
        const emailsInputContainer = document.createElement('div')
        emailsInputContainer.id = CONTAINER_ID
        document.body.appendChild(emailsInputContainer)
        emailsInput = new EmailsInput(getContainer())
    })
    afterEach(() => {
        document.body.innerHTML = ''
    })
    it('can be created', () => {
        expect(emailsInput).toBeDefined()
    })
    it('inserts emailsInput inside parent node', () => {
        const container = getContainer()
        expect(container.querySelector('inout')).toBeDefined()
        expect(emailsInput.DOM.inputNode).toBeDefined()
    })
    it('could have multiple instances', () => {
        const emailsInputContainer2 = document.createElement('div')
        const CONTAINER_2_ID = CONTAINER_ID + '2'
        emailsInputContainer2.id = CONTAINER_2_ID
        document.body.appendChild(emailsInputContainer2)
        const emailsInput2 = new EmailsInput(emailsInputContainer2)

        expect(emailsInputContainer2.querySelector('inout')).toBeDefined()
    })
    describe('creates emails block', () => {
        function isComplete() {
            const entity = emailsInput.entities.find(entity => entity.value === VALID_EMAIL)
            expect(entity).toBeDefined()
            expect(entity?.completed).toBeTruthy()
        }

        beforeEach(() => {
            (emailsInput.DOM.inputNode as HTMLInputElement).value = ''
            emailsInput.entities = []

            simulateTyping((emailsInput.DOM.inputNode as HTMLInputElement), VALID_EMAIL)
        })

        it('by pressing enter', () => {
            dispatchKeyboardEvent((emailsInput.DOM.inputNode as HTMLInputElement), {
                key: 'Enter'
            })
            isComplete()
        })
        it('by pressing comma', () => {
            dispatchKeyboardEvent((emailsInput.DOM.inputNode as HTMLInputElement), {
                key: ','
            })
            isComplete()
        })
        it('on blur', () => {
            const blurEvent = new FocusEvent('blur')
            emailsInput.DOM.inputNode?.dispatchEvent(blurEvent)

            isComplete()
        })
    })
    it('can add email via public API', () => {
        emailsInput.addEmail(VALID_EMAIL)
        // cannot use class here due to css modules
        const emailItems = emailsInput.DOM.emailsContainer?.childNodes as NodeList
        expect(emailItems).toBeDefined()
        const emailNode = Array.from(emailItems)
            .filter(node => node instanceof HTMLDivElement)
            .find((node) => {
                return (node as HTMLDivElement).innerHTML.indexOf(VALID_EMAIL) !== -1
            })

        expect(emailNode).toBeDefined()
    })
    it('can be deleted', () => {
        // by clicking on cross
        emailsInput.addEmail(VALID_EMAIL)
        // cannot use class here due to css modules
        const emailItems = emailsInput.DOM.emailsContainer?.childNodes as NodeList
        const emailNode = Array.from(emailItems)
            .filter(node => node instanceof HTMLDivElement)
            .find((node) => {
                return (node as HTMLDivElement).innerHTML.indexOf(VALID_EMAIL) !== -1
            })
        const closeButton = Array.from((emailNode as HTMLDivElement).childNodes as NodeList)
            .find(node => node instanceof HTMLDivElement)

        expect(closeButton).toBeDefined();

        (closeButton as HTMLDivElement).dispatchEvent(new MouseEvent('click'))
    })
    it('can add email with paste', () => {
        // apparently jsdom do not supports ClipboardEvent
        const event = new Event('paste', {bubbles: true, cancelable: true})
        // @ts-ignore
        event.clipboardData = {
            getData() {
                return 'asd@asd.asd, asd.dd'
            }
        }

        emailsInput.DOM.inputNode?.dispatchEvent(event)

        const emailItems = emailsInput.DOM.emailsContainer?.childNodes as NodeList
        const emailNodes = Array.from(emailItems)
            .filter(node => node instanceof HTMLDivElement)
            .filter((node) => {
                return (node as HTMLDivElement).innerHTML.includes('asd@asd.asd')
                    || (node as HTMLDivElement).innerHTML.includes('asd.dd')
            })
        expect(emailNodes.length).toBe(2)
    })
})