class TabView {
    constructor(element) {
        this.element = element;
        this.tabFrontContainer = this.element.querySelector('.TabView__tabFrontContainer');
        this.tabs = Array.from(this.element.querySelectorAll('.TabView__tabBackContainer > .TabView__tab'));
        this.cards = Array.from(this.element.querySelectorAll('.TabView__card'));

        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                this.element.style.setProperty('--tabIndex', index);
                this.updateClipPath();
                this.updateCards();
            });
        });

        this.updateCards();
        
        setTimeout(() => {
            this.tabs[0].classList.remove('TabView__tab--active');
            this.tabFrontContainer.classList.remove('TabView__tabFrontContainer--hidden');
            this.updateClipPath();
            this.element.querySelector('.TabView__container').classList.remove('TabView__container--no-transition');
        }, 300);
    }

    updateCards() {
        const index = this.cards.length - 1 - (parseInt(this.element.style.getPropertyValue('--tabIndex')) || 0);
        this.cards.forEach((card) => {
            card.classList.remove('TabView__card--active');
        });
        this.cards[index].classList.add('TabView__card--active');
    }

    updateClipPath() {
        const index = parseInt(this.element.style.getPropertyValue('--tabIndex')) || 0;
        const width = this.tabFrontContainer.offsetWidth;
        const tab = this.tabs[index];
        const clipPath = `inset(0.5px ${width - tab.offsetLeft - tab.offsetWidth}px 0.5px ${tab.offsetLeft}px round 20px)`;
        this.tabFrontContainer.style.clipPath = clipPath;
    }
}