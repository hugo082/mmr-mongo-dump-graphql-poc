import { queryType, stringArg, makeSchema, objectType, queryField, arg, inputObjectType } from "nexus"

import { EntityArgs, EntityArgsType } from "./args/entity-args"
import { db } from "../db"
import { EntityLinkArgs } from "./args/entity-link-args"
import { entityLinkUniqueResolver } from "./entity-link"
import { EntityReferenceArgs } from "./args/entity-reference"
import { entityReferenceUniqueResolver } from "./entity-reference"

export const entityResolver = (args: EntityArgsType) => {
    let value =  db[args.name]

    if (args.ids) {
        value = value.filter(entity => args.ids.includes(entity.id))
    }

    return value
}

const Entity = objectType({
    name: "Entity",
    description: "Query your root entity",
    definition(t) {
        t.string("id", { description: "Id of the entity" })
        t.field("EntityLink", {
            type: "EntityLink",
            args: EntityLinkArgs,
            nullable: true,
            resolve: entityLinkUniqueResolver,
        }),
        t.field("EntityReference", {
            type: "EntityReference",
            args: EntityReferenceArgs,
            nullable: true,
            resolve: entityReferenceUniqueResolver,
        })
    },
});


export const EntityQuery = queryType({
  definition(t) {
    t.list.field("Entity", {
        type: Entity,
        args: EntityArgs,
        resolve(parent, args, ctx, info) {
            return entityResolver(args)
        }
    })
  },
});