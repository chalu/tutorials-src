import type { RequestHandler, ParamsDictionary, Request, Response } from "express-serve-static-core";

// define a simpler "API" for handler functions so that
// code authors can pass in just what they need. 
// E.g A handler that expects query params and returns
// a response body would use ONLY requestQuery and responseBody 
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

// export type APIHandler<T extends HandlerConfig> = HandlerNormalizer<
//     T['requestParams'] extends ParamsDictionary ? T['requestParams'] : ParamsDictionary,
//     T['responseBody'],
//     T['requestBody'],
//     T['requestQuery']
// >;

export type SearchFlightsHandler = APIHandler<{
    requestQuery: FlightQueryParams,
    responseBody: FlightSearchResponse | { error: string }}>;

export type FlightQueryParams = {
    from: string;
	to: string;
	page?: string;
	sortdir?: "ASC" | "DESC";
	sortby?: "price" | "departure";
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
};

export type FlightSearchResponse = {
	total: number;
	data: Flight[];
};

// // ===============================

// const optCasting1: RequestHandler = async (
//     request,
//     response
// ): Promise<void> => {
//     const queryParams = request.query as FlightQueryParams;
//     //      ^? 
//     response.status(200).json({message: 'ok'});
// }

// const optCasting2 = async (
//     request: Request,
//     response: Response
// ): Promise<void> => {
//     const queryParams = request.query as FlightQueryParams;
//     //      ^? 
//     response.status(200).json({message: 'ok'});
// }

// const optAdhocGeneric1: RequestHandler = async (
//     request,
//     response
// ): Promise<void> => {
//     const queryParams = <FlightQueryParams>request.query;
//     //      ^? 
//     response.status(200).json({message: 'ok'});
// }

// const optAdhocGeneric2 = async (
//     request: Request,
//     response: Response
// ): Promise<void> => {
//     const queryParams = <FlightQueryParams>request.query;
//     //      ^? 
//     response.status(200).json({message: 'ok'});
// }

// const optExpressRequestType = async (
//     //               👇        👇              👇       👇
//     request: Request<{}, FlightSearchResponse, {}, FlightQueryParams>,
//     response: Response
// ): Promise<void> => {
//     const queryParams = request.query;
//     //      ^? 
//     response.status(200).json({message: 'ok'});
// }

// const optExpressRequestResponsType = async (
//     //                      👇
//     request: Request<{}, FlightSearchResponse, {}, FlightQueryParams>,
//     response: Response<FlightSearchResponse>
//     //                       👆
// ): Promise<void> => {
//     const queryParams = request.query;
//     //      ^? 
//     response.status(200).json({message: 'ok'});
// }

// type SearchFlightsHandler 
//     = RequestHandler<{}, FlightSearchResponse, {}, FlightQueryParams>;

// const myHandler:SearchFlightsHandler  = async (
//     request, response
// ): Promise<void> => {
//     const queryParams = request.query;
//     //      ^? 

//     response.status(200).json({message: 'ok'});
// }
