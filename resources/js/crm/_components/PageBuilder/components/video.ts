export const video = {
    category: 'Basic',
    changing: true,
    content: {
        tagName: 'div',
        attributes: { class: 'pb-video-container' },
        components: [{
            type: 'video',
            attributes: { class: 'pb-video' },
            provider: 'yt',
            rel: 0,
            videoId: '',
            src: '',
        }],
    }
}