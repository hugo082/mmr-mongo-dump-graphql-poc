import { inputObjectType, enumType } from "nexus"

import { DynamicIdArgType } from "./types"

export const defaultValues: DynamicIdArgType = {
    field: "_id",
    type: "ObjectId",
}

export const DynamicIdArg = inputObjectType({
    name: "DynamicIdArg",
    definition(t) {
        t.string("field", { description: "Id field name", default: defaultValues.field })
        t.field("type", { type: DynamicIdType, default: defaultValues.type })
    },
})

export const DynamicIdType = enumType({
    name: "DynamicIdType",
    description: "Type of the dynamic id",
    members: [ "ObjectId", "String" ],
});
