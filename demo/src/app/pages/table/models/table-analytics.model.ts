export interface TableAnalytics {
    headers:     Header[];
    metaData:    MetaData;
    rows:        Array<string[]>;
    width?:       number;
    height?:      number;
    headerWidth?: number;
}

export interface Header {
    name:      string;
    column:    string;
    valueType: string;
    type:      string;
    hidden:    boolean;
    meta:      boolean;
}

export interface MetaData {
    items?:      { [key: string]: Item };
    dimensions?: Dimensions;
    dx?: string[]
    pe?: string[]
    ou?: string[]
    co?: string[]
    names?: {
        [key: string]: string;
    }
}

export interface Dimensions {
    dx: string[];
    pe: string[];
    ou: string[];
    co: any[];
}

export interface Item {
    uid?: string;
    name: string;
    code?: string;
    dimensionItemType?: string;
    valueType?: string;
    totalAggregationType?: string;
    startDate?: string;
    endDate?: string;
    dimensionType?: string;
}
