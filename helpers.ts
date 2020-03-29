import { ArgsRecord, objectType } from "nexus/dist/core";

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
