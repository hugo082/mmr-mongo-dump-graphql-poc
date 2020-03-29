import { objectType } from "nexus"

import { DynamicId } from "./dynamic-id-object"

export const EntityMeta = objectType({
    name: "EntityMeta",
    description: "Entity metadata to process action on extracted datas",
    definition(t) {
        t.string("database")
        t.string("collection")
        t.field("id", { type: DynamicId })
    },
})
