import type {
    RequestHandler, ParamsDictionary
} from "express-serve-static-core";

type HandlerConfig = {
    requestParams?: ParamsDictionary;
    responseBody?: Record<string, unknown>;
    requestBody?: Record<string, unknown>;
    requestQuery?: Record<string, unknown>;
}

export type APIHandler<T extends HandlerConfig>
    = RequestHandler<
        T['requestParams'] extends ParamsDictionary
            ? T['requestParams']
            : ParamsDictionary,
        T['responseBody'],
        T['requestBody'],
        T['requestQuery']>; 

export type SearchFlightsHandler = APIHandler<{
    requestQuery: FlightQueryParams,
    responseBody: FlightSearchResponse | APIResponseError
}>;

export type FlightQueryParams = {
    from: string;
    to: string;
    page?: string;
    sortdir?: "ASC" | "DESC";
    sortby?: "price" | "departure";
    pagenav?: "head" | "body";
};

export type Flight = {
    id: string;
    from: string;
    to: string;
    departure: string;
    price: number;
};

export type SearchResult = {
    flights: Flight[];
    totalFound: number;
    hasMore: boolean;
};

export type FlightSearchResponse = {
    total: number;
    data: Flight[];
    pagination?: PaginationNav;
};

export type APIResponseError = {
    message: string;
    errors?: Record<string, string>;
};

type EditableFlightSearchUrlKeys = Omit<FlightQueryParams, "from" | "to" | "pagenav">;

export type FlightSearchUrlParams = {
    [K in keyof EditableFlightSearchUrlKeys]: FlightQueryParams[K];
};

export type PaginationNav = {
    next?: string;
    previous?: string
};
