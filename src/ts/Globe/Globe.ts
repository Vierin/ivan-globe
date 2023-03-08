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
    private obj: {};
    private maxData: number;

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
            token
        };

        this.init();
    }

  

    private init = async () => {
        await this.getData();
        
        this.initGlobe();

        this.obj = {
            "type": "FeatureCollection",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": this.dataItems
        }

        globe.on('load', () => { this.addCircles() });
    }

    public getData = async () => {
        try {
            const { data } = await axios.get(url);
            this.dataItems = data.assets;
        } catch (error) {
            throw new Error(error);
        }

        this.checkMinMaxEmissions();
    }

    private checkMinMaxEmissions(): void {
        const emissions = [];
        this.dataItems.forEach(el => {
            emissions.push((el as any).properties.emissions)
        });

        this.maxData = Math.max(...emissions);
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
        globe.addSource('emissions', {
            type: 'geojson',
            data: this.obj as any,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
        });

        globe.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'emissions',
            filter: ['has', 'point_count'],
            paint: {
            'circle-color': [
                "interpolate",
                ['linear'],
                ['get', 'point_count'],
                0,
                '#00A6FF',
                200,
                '#1B0FFF'
            ],
            'circle-radius': [
                "interpolate",
                ['linear'],
                ['get', 'point_count'],
                    10,
                    10,
                    100,
                    40
                ]
            }
        });

        globe.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'emissions',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        globe.addLayer({
            "id": `unclustered-point`,
            "type": "circle",
            "source": "emissions",
            'filter': ['!', ['has', 'point_count']],
            'paint': { 
                'circle-color': [
                    "interpolate",
                    ['linear'],
                    ['get', 'emissions'],
                    0,
                    '#00A6FF',
                    this.maxData,
                    '#FF0F23'
                ],
            }
        })
  
    }


}