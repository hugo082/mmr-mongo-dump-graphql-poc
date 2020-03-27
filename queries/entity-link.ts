import { queryType, stringArg, makeSchema, objectType, queryField, arg, inputObjectType } from "nexus"

import { EntityArgs, EntityArgsType } from "./args/entity-args"
import { db } from "../db"
import { EntityLinkArgs, EntityLinkArgsType } from "./args/entity-link-args"
import { entityResolver } from "./entity"
import { EntityReferenceArgs } from "./args/entity-reference"
import { entityReferenceUniqueResolver, entityReferenceResolver } from "./entity-reference"

export const entityLinkResolver = (parent: any, args: EntityLinkArgsType) => {
    let value = entityResolver(args)
        
    if (args.link.list === false) {
        value = value.filter(entity => entity.id === parent[args.link.field])
    } else {
        value = value.filter(entity => parent[args.link.field].includes(entity.id))
    }

    return value
}

export const entityLinkUniqueResolver = (parent: any, args: EntityLinkArgsType) => {
    const value = entityLinkResolver(parent, args)
    if (value.length === 1) {
        return value[0]
    }

    return null
}

export const EntityLink = objectType({
    name: "EntityLink",
    definition(t) {
        t.string("id", { description: "Id of the entity" })
        t.field("_meta", { type: "EntityMeta" })
        t.field("EntityLink", {
            type: "EntityLink",
            args: EntityLinkArgs,
            resolve: entityLinkUniqueResolver
        })
        t.field("EntityReference", {
            type: "EntityReference",
            args: EntityReferenceArgs,
            resolve: entityReferenceUniqueResolver,
        }),
        t.list.field("EntityReference", {
            type: "EntityReference",
            args: EntityReferenceArgs,
            resolve: entityReferenceResolver,
        })
    },
});
