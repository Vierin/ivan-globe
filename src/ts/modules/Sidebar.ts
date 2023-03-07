import { MarkerData } from "../Globe/Globe.types";
import { map, token } from "../Globe/Map";

// type SidebarInfo = {
//     img: HTMLElement;
//     title: HTMLElement;
//     category: HTMLElement;
//     desc: HTMLElement;
//     link: HTMLElement;
// }
 
export class Sidebar {
    private current: HTMLElement;
    private amount: HTMLElement;
    private arrPrev: HTMLElement;
    private arrNext: HTMLElement;
    private close: HTMLElement;
    private view: HTMLElement;
    private wrap: HTMLElement;
    private currentId: number;
    private markers: NodeListOf<HTMLElement>;
    private markersData: Array<MarkerData>;
    private wasShown: boolean = false;

    constructor(view: HTMLElement, markersData: Array<MarkerData>) {
        this.view = view;
        this.markersData = markersData;

        this.wrap = this.view.querySelector('.js-wrap');
        this.arrPrev = this.view.querySelector('.js-prev');
        this.arrNext = this.view.querySelector('.js-next');
        this.close = this.view.querySelector('.js-close');
        this.markers = document.querySelectorAll('.mapboxgl-marker');
        this.amount = this.view.querySelector('.js-amount');
        this.current = this.view.querySelector('.js-curr');

        this.amount.innerHTML = `/${this.markers.length}`;

        this.bind();
    }

    private bind(): void {

        this.markers.forEach((marker, id) => {
            marker.addEventListener('click', () => {
                this.setSidebar(id);
            });
        });
 
        this.sidebarHandler();
    }

    private setSidebar = async (id: number) => {

        // check id
        if(id > this.markers.length - 1) {
            this.currentId = 0;
        } else if (id < 0) {
            this.currentId = this.markers.length - 1
        } else {
            this.currentId = id;
        }
        
        this.view.classList.add('is-shown');
        
        map.flyTo({
            center: [+this.markersData[this.currentId].lon  + 22, +this.markersData[this.currentId].lat],
            speed: 0.5,
            zoom: 3
        });

        this.current.innerHTML = `${this.currentId + 1}`;
        this.toggleActive(this.markers[this.currentId]);

        if(!this.wasShown) {
            this.addHTMLSidebar();

            this.wasShown = true
        } else {
            await this.animateSidebarItem(true);
            this.addHTMLSidebar();

            this.animateSidebarItem(false);
        }
    }

    private addHTMLSidebar(): void {
        const el = this.markersData[this.currentId]; 

        this.wrap.innerHTML = `
            <div class="sidebar-item__head">
                <div class="sidebar-item__img">
                    <img src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${el.lon},${el.lat},14/605x285?access_token=${token}" alt="" />
                    <span class="sidebar-item__marker"><img class="pin" src="./media/pin.png" alt="pin" /></span>
                </div>
                <h6 class="sidebar-item__title">${el.name}</h6>
                <p class="sidebar-item__category">${el.category}</p>
                <span class="sidebar-item__line"></span>
            </div>
            <p class="sidebar-item__desc">${el.description}</p>
            <a href="${el.url}" class="sidebar-item__url" target="_blank">
                <span><img src="./media/ext-link.png" alt="link"/></span>    
                <p>${el.url}</p>
            </a>
        `;
    }


    private animateSidebarItem = (out: boolean) => {
        return new Promise(resolve => {
            const sidebarInfo = {
                img: this.wrap.querySelector('.sidebar-item__img'),
                title: this.wrap.querySelector('.sidebar-item__title'),
                category: this.wrap.querySelector('.sidebar-item__category'),
                desc: this.wrap.querySelector('.sidebar-item__desc'),
                link: this.wrap.querySelector('.sidebar-item__url'),
                line: this.wrap.querySelector('.sidebar-item__line')
            }

            gsap.fromTo([
                sidebarInfo.title,
                sidebarInfo.category,
                sidebarInfo.img,
                sidebarInfo.desc,
                sidebarInfo.link],
                {
                    opacity: out ? 1 : 0,
                    x: out ? 0 : 10,
                },
                {
                    opacity: out ? 0 : 1,
                    x: 0,
                    duration: out ? 0.5 : 0.75,
                    delay: out ? 0 : 0.05,
                    stagger: out ? 0 : 0.2,
                    onComplete: () => resolve(true)
                });
            
            gsap.fromTo(
                sidebarInfo.line, {
                    scaleX: out ? 1 : 0
                },
                {
                    scaleX: out ? 0 : 1,
                    duration: out ? 0.5 : 0.75,
                    transformOrigin: out ? 'left' : 'right'
                }
            )

            
        })
    }

    private toggleActive(marker: HTMLElement): void {
        this.markers.forEach(el => {
            el.classList.remove('is-active');
        });

        marker.classList.add('is-active');
    }

    private sidebarHandler(): void {

        this.close.addEventListener('click', () => {
            this.view.classList.remove('is-shown');
        });

        this.arrNext.addEventListener('click', () => this.setSidebar(this.currentId + 1));
        this.arrPrev.addEventListener('click', () => this.setSidebar(this.currentId - 1));
    }
}