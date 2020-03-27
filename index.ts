import { makeSchema, objectType } from "nexus"
import { graphql } from "graphql"
import { loadQuery } from "./query-loader"
import { EntityQuery } from "./queries/entity"
import { EntityLink } from "./queries/entity-link"
import { EntityReference } from "./queries/entity-reference"

const EntityMeta = objectType({
    name: "EntityMeta",
    description: "Entity metadata to process action on extracted datas",
    definition(t) {
        t.string("database")
        t.string("collection")
    },
});

const schema = makeSchema({
  types: [EntityQuery, EntityLink, EntityReference, EntityMeta],
  outputs: {
    schema: process.cwd() + "/generated/schema.graphql",
    typegen: process.cwd() + "/generated/typings.ts",
  },
})

const query = loadQuery(`query {
    ad: Entity(name: "ad", ids: ["ad_3"]) {
        _meta {
            database
            collection
        }
        adAccount: EntityLink(name: "adaccount", link: { field: "adAccountId" }) {
            id,
            users: EntityReference(name: "user", ids: ["user_1"], ref: { field: "adAccountIds", list: true }) {
                __typename
                _meta {
                    database
                    collection
                }
                id
            }
            brand: EntityReference(name: "brand", ref: { field: "adAccountId" }) {
                __typename
                _meta {
                    database
                    collection
                }
                id
            }
        }
    }
}`)

graphql({
    schema,
    source: query
}).then(
    result => console.log(
        JSON.stringify(result, null, '\t')
    )
)

