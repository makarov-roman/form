import {EmailsInput} from "./emailsInput";

declare global {
    interface Window {
        EmailsInput: typeof EmailsInput
    }
}
