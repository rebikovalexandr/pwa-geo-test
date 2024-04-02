import { Feature, Map, View } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle, Fill, Stroke, Style } from "ol/style";

const markerStyle = new Style({
    image: new Circle({
        radius: 6,
        fill: new Fill({
            color: 'red'
        }),
        stroke: new Stroke({
            color: 'black',
            width: 2
        })
    })
})

let marker: Feature<Point> | null = null;
let map: Map | null = null;

export const getMap = (longitude: number, latitude: number) => {
    const centerCoordinate = fromLonLat([longitude, latitude]);

    const markerSource = new VectorSource();

    marker = new Feature({
        geometry: new Point(centerCoordinate)
    });

    marker.setStyle(markerStyle);

    markerSource.addFeature(marker);

    const markerLayer = new VectorLayer({
        source: markerSource
    });

    const osmLayer = new TileLayer({
        source: new OSM()
    });

    map = new Map({
        layers: [osmLayer, markerLayer],
        target: 'map',
        view: new View({
            center: centerCoordinate,
            zoom: 15
        })
    });

    return map;
};

export const updateMap = (longitude: number, latitude: number) => {
    const coordinates = fromLonLat([longitude, latitude]);

    if (marker) {
        marker.setGeometry(new Point(coordinates));
    }

    if (map) {
        map.getView().setCenter(coordinates);
    }
};
