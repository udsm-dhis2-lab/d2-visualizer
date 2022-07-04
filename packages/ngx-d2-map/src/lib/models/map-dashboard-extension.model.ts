export interface MapDashboardExtensionItem {
    id: string;
    type: string;
    height: number;
    width: number;
    x: number;
    y: number;
    favorite: boolean;
    map: Map;
}

export interface Map {
    id: string;
    name: string;
    displayName: string;
    basemap: string;
    displayFormName: string;
    favorite: boolean;
    mapViews: MapView[];
}

export interface MapView {
    id: string;
    name: string;
    sortOrder: number;
    favorite: boolean;
    displayName: string;
    layer: string;
    hideTitle: boolean;
    opacity: number;
    displayFormName: string;
    thematicMapType: string;
    hideSubtitle: boolean;
    legendSet: LegendSet;
    dataDimensionItems: DataDimensionItem[];
}

export interface DataDimensionItem {
    dataDimensionItemType: string;
    indicator: LegendSet;
}

export interface LegendSet {
    id: string;
}
