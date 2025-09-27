import { AppService } from './app.service';
import { Connection } from 'mongoose';
export declare class AppController {
    private readonly appService;
    private readonly connection;
    constructor(appService: AppService, connection: Connection);
    getRoot(): {
        message: string;
        version: string;
        timestamp: string;
        status: string;
        availableEndpoints: {
            tickets: {
                list: string;
                create: string;
                findById: string;
                update: string;
                softDelete: string;
            };
        };
    };
    getHealth(): {
        status: string;
        service: string;
        timestamp: string;
        uptime: string;
        environment: string;
        database: string;
        ticketsEndpoint: string;
    };
    private getDatabaseStatus;
}
