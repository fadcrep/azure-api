import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'fadcrepin',
    password: 'jsldfdmp',
    database: 'azure',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    // logging: ["query", "error"],
    synchronize: true,

};