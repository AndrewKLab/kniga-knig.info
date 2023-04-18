export const pluralRoleName = (name: string) => {
    switch (name) {
        case 'Учитель':
            return `${name.slice(0, -1)}я`;
        case 'Ученик':
            return `${name}и`;
        case 'Искатель':
            return `${name.slice(0, -1)}и`;
        default:
            return `${name}ы`;
    }
}

export const copyToClipboard = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
}