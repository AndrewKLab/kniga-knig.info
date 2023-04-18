export const listItems = {
    category: 'Extra',
    changing: true,
    content: {
        tagName: 'div',
        attributes: { class: 'pb-list-item' },
        components: [
            {
                tagName: 'div',
                attributes: { class: 'pb-list-item-left-component' },

                components: [
                    {
                        type: 'image',
                        attributes: { class: 'pb-list-item-left-component-image' },
                    }
                ],
            },
            {
                tagName: 'div',
                attributes: { class: 'list-item-center-component' },
                components: [
                    {
                        tagName: 'h5',
                        changing: true,
                        content: 'Вставьте сюда свой заголовок',
                        type: 'text',
                        attributes: { class: 'list-item-center-component-title' },
                    },
                    {
                        tagName: 'p',
                        changing: true,
                        content: 'Вставьте сюда свой текст',
                        type: 'text',
                        attributes: { class: 'list-item-center-component-text' },
                    },
                ],
            },
        ],
    }
}