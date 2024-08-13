import type { FlightQueryParams, SearchResult } from "./types";

import allFlights from "./flights.json";

const FLIGHTS_SIZE_PER_PAGE = 2;

export const searchFlights = async (params: FlightQueryParams): Promise<SearchResult> => {
    const flights = allFlights.filter((flight) => {
        return flight.from === params.from && flight.to === params.to;
    });

    const totalFound = flights.length;
    const page = Number.parseInt(params.page || '1', 10);
    const startIndex = (page - 1) * FLIGHTS_SIZE_PER_PAGE;
    const endIndex = startIndex + FLIGHTS_SIZE_PER_PAGE;

    const flightsResult = flights.slice(startIndex, endIndex);
    const hasMore = totalFound > endIndex;

    return {
        hasMore,
        totalFound,
        flights: flightsResult
    };
}