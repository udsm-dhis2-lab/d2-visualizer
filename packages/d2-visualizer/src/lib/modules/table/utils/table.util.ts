import { LegendSet } from '../models/legend-set.model';
import { TableAnalytics } from '../models/table-analytics.model';
import { TableConfiguration } from '../models/table-config.model';
import { TableDashboardItem } from '../models/table-dashboard-item.model';
import { D2TableEngine } from './table-engine.util';

export class TableUtil {
    /**
     *
     */
    private tableAnalytics: TableAnalytics | any;
    private tableConfiguration: TableConfiguration | any;
    private tableDashboardItem: TableDashboardItem | any;
    private legendSets: LegendSet[] | any;

    /**
     *
     */
    constructor() {
        this.tableAnalytics = {};
        this.tableConfiguration = {};
        this.legendSets = [];
    }

    /**
     *
     * @param tableDashboardItem
     * @returns
     */
    public setTableDashboardItem(tableDashboardItem: TableDashboardItem) {
        this.tableDashboardItem = tableDashboardItem;
        return this;
    }

    /**
     *
     * @returns
     */
    public getTableDashboardItem() {
        return this.tableDashboardItem;
    }

    /**
     *
     * @param tableAnalytics
     * @returns
     */
    public setTableAnalytics(tableAnalytics: TableAnalytics): TableUtil {
        this.tableAnalytics = tableAnalytics;
        return this;
    }

    /**
     *
     * @returns
     */
    public getTableAnalytics() {
        return this.tableAnalytics;
    }

    /**
     *
     * @param tableConfiguration
     * @returns
     */
    public setTableConfiguration(
        tableConfiguration: TableConfiguration
    ): TableUtil {
        this.tableConfiguration = tableConfiguration;
        return this;
    }

    /**
     *
     * @returns
     */
    public getTableConfiguration() {
        return this.tableConfiguration;
    }

    /**
     *
     * @param legendSets
     * @returns
     */
    setLegendSet(legendSets: LegendSet[]): TableUtil {
        this.legendSets = legendSets;
        return this;
    }

    /**
     *
     * @returns
     */
    getLegendSet() {
        return this.legendSets;
    }

    /**
     *
     */
    public draw() {
        const d2TableEngine = new D2TableEngine();

        if (
            this.tableAnalytics &&
            this.tableConfiguration &&
            this.tableDashboardItem
        ) {
            return d2TableEngine.drawTable(
                this.tableAnalytics,
                this.tableConfiguration,
                this.legendSets,
                this.tableDashboardItem
            );
        }
    }
}
