import { queryType, objectType } from "nexus"

import { EntityArgs, EntityArgsType } from "./args/entity-args"
import { db } from "../db"
import { EntityLinkArgs } from "./args/entity-link-args"
import { entityLinkUniqueResolver } from "./entity-link"
import { EntityReferenceArgs } from "./args/entity-reference"
import { entityReferenceUniqueResolver } from "./entity-reference"

export const entityResolver = (args: EntityArgsType) => {
    let value =  db[args.collection]

    if (args.ids) {
        value = value.filter(entity => args.ids.includes(entity.id))
    }

    return value
}

const Entity = objectType({
    name: "Entity",
    description: "Query your root entity",
    definition(t) {
        t.field("EntityLink", {
            type: "EntityLink",
            args: EntityLinkArgs,
            nullable: true,
            resolve(parent, args, ctx, info) {
                console.log(ctx)
                return entityLinkUniqueResolver(parent, args as any)
            }
        }),
        t.field("EntityReference", {
            type: "EntityReference",
            args: EntityReferenceArgs,
            nullable: true,
            resolve: entityReferenceUniqueResolver,
        })
        t.field("_meta", { type: "EntityMeta" })
    },
});


export const EntityQuery = queryType({
  definition(t) {
    t.list.field("Entity", {
        type: Entity,
        args: EntityArgs,
        resolve(parent, args: any, ctx, info) {
            return entityResolver(args)
        }
    })
  },
});