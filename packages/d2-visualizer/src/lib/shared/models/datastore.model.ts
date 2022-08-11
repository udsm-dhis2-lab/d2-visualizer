export interface DataStoreConfig {
    id:         string;
    color:      string;
    xAlignment: string;
    yAlignment: string;
    zAlignment: string;
    indicator:  Indicator;
    categories: Category[];
}

export interface Category {
    id:        string;
    name:      string;
    sortOrder: string;
    target:    string;
    color:     string;
}

export interface Indicator {
    id:          string;
    name:        string;
    description: string;
}
