import { ArgsRecord, objectType } from "nexus/dist/core";
import { EntityArgsType } from "./queries/args/entity-args";

export const EntityMeta = objectType({
    name: "EntityMeta",
    description: "Entity metadata to process action on extracted datas",
    definition(t) {
        t.string("database")
        t.string("collection")
    },
});

export interface EntityMetaType {
    database: string
    collection: string
}

export const buildArgs = <T extends ArgsRecord>(args: T) => args

export const addEntityMeta = <T extends object>(entities: T[], args: EntityArgsType): Array<T & { _meta: EntityMetaType }> => {
    return entities.map(entity => ({
        ...entity,
        _meta: {
            database: args.database || "default_db",
            collection: args.name,
        }
    }))
}
