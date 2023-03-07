import mapboxgl from 'mapbox-gl';
import axios from 'axios/dist/axios';

// import { MarkerData } from "./Globe.types";
import { tsvJSON } from "../modules/Utils";
// import { Loader } from "../modules/Loader";

interface IMapSettings {
    lat: number;
    lng: number;
    zoom?: number;
    projection?: mapboxgl.Projection;
    style?: mapboxgl.Style | string;
    scroll?: boolean;
    token?: string;
    renderWorldCopies?: boolean;
    interactive?: boolean;
    touchZoomRotate?: boolean;
    minZoom?: number;
    maxZoom?: number;
    dragRotate?: boolean;
}

export const url = 'https://climatetrace.sunship.dev/api/assets?globe=1&callback=updateMap';
export const token = 'pk.eyJ1IjoibWlrb2xhai1odW5jd290IiwiYSI6ImNram1wNWZodDZlOHcyc2xnYmF0ODlpeXcifQ.svOUXdAo7D73Wloj7laAUA';
export let globe: mapboxgl.Map;

export class Globe {
    private settings: IMapSettings;
    private wrap: HTMLElement;
    private dataItems: [];

    constructor(wrap: HTMLElement) {
        this.wrap = wrap;

        this.settings = {
            lng: -20,
            lat: 35,
            zoom: 2.2,
            projection: 'globe' as any,
            interactive: true,
            renderWorldCopies: true,
            touchZoomRotate: true,
            style: 'mapbox://styles/mikolaj-huncwot/clems2gum00a801nt6gkck9b3',
            maxZoom: 6,
            dragRotate: false,
            // @ts-ignore
            // maxBounds: [[-169, -69], [250, 82]],
            token
        };

        this.init();
        // this.loader = new Loader(document.querySelector('.js-loader'));
        // this.loader.animateItems();
    }

  

    private init = async () => {
        await this.getData();
        
        this.initGlobe();
        this.addCircles();
    }

    public getData = async () => {
        try {
            const { data } = await axios.get(url);
            this.dataItems = data.assets;
        } catch (error) {
            throw new Error(error);
        }
    }

    private initGlobe(): void {
        mapboxgl.accessToken = token;

        globe = new mapboxgl.Map({
            container: this.wrap,
            projection: this.settings.projection,
            style: this.settings.style,
            center: [this.settings.lng, this.settings.lat],
            zoom: this.settings.zoom,
            renderWorldCopies: this.settings.renderWorldCopies,
            interactive: this.settings.interactive,
            dragRotate: false,
            touchZoomRotate: this.settings.touchZoomRotate,
            // @ts-ignore
            maxBounds: this.settings.maxBounds,
        });
    }

    private addCircles(): void {

        console.log(this.dataItems);
        

        globe.on('load', () => {
            [...this.dataItems].map((el, key) => {
                globe.addSource("emissions", {
                    "type": "geojson",
                    "data": el
                });

                globe.addLayer({
                    "id": `circle-${key}`,
                    "type": "circle",
                    "source": "emissions",
                    'paint': {
                        'circle-radius': {
                            'base': 1.75,
                            'stops': [
                                [12, 2],
                                [22, 180]
                            ]
                        },
                        'circle-color': '#000'
                    }
                })
            })
            
            

            // this.loader.animateFinish()
        });
  
    }


}