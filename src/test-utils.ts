// Most of testing libraries are created around a framework with specific way to render things thus I wasn't able to
// use Enzyme or something similar.

export function dispatchKeyboardEvent(target: HTMLElement, eventInitDict?: KeyboardEventInit) {
    const kbEvent = new KeyboardEvent('keydown', eventInitDict)
    const inputEvent = new Event('input', eventInitDict)
    target.dispatchEvent(kbEvent)
    target.dispatchEvent(inputEvent)
}

export function simulateTyping(target: HTMLInputElement, input: string = '') {
    Array.from(input)
        .forEach((char, index) => {
            target.value = input.slice(0, index + 1)
            dispatchKeyboardEvent(target, {key: char})
        })
}