import * as _ from 'lodash';
import {
    Category,
    DataStoreConfig,
} from '../../../shared/models/datastore.model';

export const getTargetSeriesData = (dataStoreConfig: DataStoreConfig) => {
    const categories: Category[] = _.orderBy(
        _.map(
            dataStoreConfig && dataStoreConfig.categories
                ? dataStoreConfig.categories
                : []
        )
    );

    return {
        name: 'Targets',
        stack: 1,
        zIndex: 1,
        pointPadding: 0,
        dashStyle: 'dash',
        borderColor:
            dataStoreConfig && dataStoreConfig.color
                ? dataStoreConfig.color
                : '#2b828b',
        borderWidth: 2,
        dataLabels: [
            {
                align: 'center',
                format: '{point.y}',
                verticalAlign: 'top',
                style: {
                    color: 'black',
                },
            },
        ],
        data: _.map(categories, (category: Category) => {
            return {
                y: category && category ? +category.target : '',
                color: '#ffffff',
            };
        }),
    };
};

export const getAchievementSeriesData = (
    chartObject: any,
    dataStoreConfig: DataStoreConfig
) => {
    const series: any = _.head(
        chartObject && chartObject.series ? chartObject.series : []
    );
    const seriesData = series && series.data ? _.orderBy(series.data, 'id') : [];

    const categories =
        dataStoreConfig && dataStoreConfig.categories
            ? dataStoreConfig.categories
            : [];

    const categoriesObject = _.keyBy(categories, 'id');

    return {
        name: 'Achieved',
        stack: 2,
        zIndex: 2,
        pointPadding: 0,
        borderColor:
            dataStoreConfig && dataStoreConfig.color
                ? dataStoreConfig.color
                : '#2b828b',
        dataLabels: [
            {
                align: 'center',
                format: '{point.y}',
                verticalAlign: 'top',
                style: {
                    color: 'black',
                },
            },
        ],
        data: _.map(seriesData, (data: any) => {
            return {
                color:
                    categoriesObject &&
                        data &&
                        data.id &&
                        categoriesObject[data.id] &&
                        categoriesObject[data.id].color
                        ? categoriesObject[data.id].color
                        : '#2b828b',
                y: data && data.y ? data.y : '',
            };
        }),
    };
};
