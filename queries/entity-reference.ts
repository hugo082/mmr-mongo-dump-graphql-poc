import { objectType } from "nexus"

import { entityResolver } from "./entity"
import { EntityReferenceArgsType, EntityReferenceArgs } from "./args/entity-reference"

export const entityReferenceResolver = (parent: any, args: EntityReferenceArgsType) => {
    let value = entityResolver(args)
    
    if (args.ref.list === false) {
        value = value.filter(entity => entity[args.ref.field] === parent.id)
    } else {
        value = value.filter(entity => entity[args.ref.field].includes(parent.id))
    }

    return value
}

export const entityReferenceUniqueResolver = (parent: any, args: EntityReferenceArgsType) => {
    const value = entityReferenceResolver(parent, args)
    if (value.length === 1) {
        return value[0]
    }

    return null
}

export const EntityReference = objectType({
    name: "EntityReference",
    definition(t) {
        t.string("id", { description: "Id of the entity" })
        t.field("_meta", { type: "EntityMeta" })
        t.field("EntityReference", {
            type: "EntityReference",
            args: EntityReferenceArgs,
            resolve: entityReferenceUniqueResolver
        })
    },
});
