/// <reference path="../definitions/gsap.d.ts" />

export class Loader {
    private view: HTMLElement;
    private text: HTMLElement;
    private imgs: NodeListOf<HTMLElement>;
    private tlImgs: GSAPStatic.Timeline;

    constructor(view: HTMLElement) {
        this.view = view;

        this.text = this.view.querySelector('.loader__text');
        this.imgs = this.view.querySelectorAll('.loader__markers img');
        
        // this.animateItems();
    }

    public animateItems(): void {
        this.tlImgs = gsap.timeline({repeat: -1})
            .fromTo(this.imgs, {opacity: 0, y: 0}, {opacity: 1, duration: 0.5, y: -20, stagger: 0.3, onComplete: () => {
                gsap.to(this.imgs, {opacity: 0, duration: 0.2})
            }});

        gsap.timeline({repeat: -1})
            .to(this.text.querySelector('p:last-of-type'), {yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.2})
            .to(this.text.querySelector('p:last-of-type'), {yPercent: -200, duration: 0.9, ease: "power4.inOut", delay: 0.2})
            .to(this.text.querySelector('p:last-of-type'), {yPercent: -300, duration: 0.9, ease: "power4.inOut", delay: 0.2})
            .then(() => {
                // this.animateFinish();
            })
    }

    public animateFinish(): void {
        this.tlImgs.kill();
        gsap.to(this.imgs, {opacity: 0, duration: 0.2});

        //hide loader
        gsap.to(this.view, {xPercent: 100, duration: 0.8});
    }
}