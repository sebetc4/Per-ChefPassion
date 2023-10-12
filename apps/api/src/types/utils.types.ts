import { HydratedDocument, SchemaTimestampsConfig } from "mongoose";

export type InstanceOf<T, M> = HydratedDocument<T> & M;

export type InstanceOfWithDates<T, M> = InstanceOf<T, M> & SchemaTimestampsConfig;