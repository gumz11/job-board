export default function onLoad() {
    window.addEventListener('scroll', () => {
        let header = document.querySelector('.jb-fixed');

        if (header) {
            if (window.scrollY < 1000) {
                header.classList.add('jb-expand');
            } else {
                header.classList.remove('jb-expand');
            }
        }
    });
}