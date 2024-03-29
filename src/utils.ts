import { Feature, Map, View } from "ol";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle, Fill, Stroke, Style } from "ol/style";

export const getMap = (longitude: number, latitude: number) => {
    const centerCoordinate = fromLonLat([longitude, latitude]);

    const markerSource = new VectorSource();

    const marker = new Feature({
        geometry: new Point(centerCoordinate)
    });

    marker.setStyle(new Style({
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
    }));

    markerSource.addFeature(marker);

    const markerLayer = new VectorLayer({
        source: markerSource
    });

    const osmLayer = new TileLayer({
        source: new OSM()
    });

    const map = new Map({
        layers: [osmLayer, markerLayer],
        target: 'map',
        view: new View({
            center: centerCoordinate,
            zoom: 10
        })
    });

    return map;
};
