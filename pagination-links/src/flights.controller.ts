import * as service from "./flights.service";

import type { Request, Response } from "express-serve-static-core";
import type {
    SearchFlightsHandler,
    FlightQueryParams, PaginationNav, FlightSearchUrlParams
} from "./types";

export const searchFlightsHandler: SearchFlightsHandler = async (
    request,
    response
): Promise<void> => {
    const queryParams = request.query;
    try {
        const {
            flights, totalFound, hasMore
        } = await service.searchFlights(queryParams);

        const paginationLinks = buildPaginationLinks(
            request, response, hasMore, queryParams
        );

        response.status(200).json({
            total: totalFound,
            data: flights,
            ...paginationLinks
        });
    } catch (err) {
        console.error(err);
        response.status(500).json({ message: 'Aww snap!' });
    }
};

const buildPaginationLinks = (
    request: Request,
    response: Response,
    hasMore: boolean,
    queryParams: FlightQueryParams
): PaginationNav => {
    const {
        page = '1', sortdir = 'ASC', sortby = 'departure', pagenav = 'body'
    } = queryParams;

    const setQueryParams = getQueryParamSetter(request);

    const nav: PaginationNav = {};
    const pageNumber = Number.parseInt(`${page}`, 10);
    if (pageNumber >= 2) {
        nav.previous = setQueryParams({
            'page': `${pageNumber - 1}`, 'sortby': sortby, 'sortdir': sortdir
        });
    }
    if (hasMore === true) {
        nav.next = setQueryParams({
            'page': `${pageNumber + 1}`, 'sortby': sortby, 'sortdir': sortdir
        });
    }

    if (pagenav === 'head') {
        if (nav.previous) response.setHeader('x-appname-prev-page', nav.previous);
        if (nav.next) response.setHeader('x-appname-next-page', nav.next);
        return {};
    }

    return nav;
};

const getQueryParamSetter = (request: Request) => {
    const url = request.originalUrl;
    const scheme = request.protocol;
    const host = request.headers.host;

    const paramSetter = (params: FlightSearchUrlParams): string => {
        const parsedUrl = new URL(url, `${scheme}://${host}`);
        for (const [key, value] of Object.entries(params)) {
            parsedUrl.searchParams.set(key, `${value}`);
        }
        return parsedUrl.pathname + parsedUrl.search;
    }
    return paramSetter;
};