import { objectType } from "nexus"

import { DynamicIdType } from "./dynamic-id-arg"

export const DynamicId = objectType({
    name: "DynamicId",
    description: "Dynamic id field informations",
    definition(t) {
        t.string("field")
        t.field("type", { type: DynamicIdType })
    },
})
