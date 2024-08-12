import * as service from "./flights.service";
import type { SearchFlightsHandler } from "./types";

export const searchFlightsHandler: SearchFlightsHandler = async (
    request,
    response
): Promise<void> => {
    const queryParams = request.query;
    
    try {
        const {
            flights, totalFound
        } = await service.searchFlights(queryParams);

        response.status(200).json({
            total: totalFound,
            data: flights
        });
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: 'Aww snap!' });
    }
};

