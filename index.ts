import { makeSchema, objectType } from "nexus"
import { graphql } from "graphql"
import { loadQuery } from "./query-loader"
import { EntityQuery } from "./queries/entity"
import { EntityLink, getRequiredFields, OBJECT_NAME as ENTITY_LINK_NAME } from "./queries/entity-link"
import { EntityReference } from "./queries/entity-reference"

import requiredFields from "./plugins/required-fields"

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
  plugins: [
    requiredFields({
        resolvers: {
            [ENTITY_LINK_NAME]: getRequiredFields,
        },
    }),
  ],
})

const query = loadQuery(`query {
    ad: Entity(name: "ad", ids: ["ad_2", "ad_3"]) {
        adAccount: EntityLink(name: "adaccount", link: { field: "adAccountId" }) {
            id,
        }
    }
    adV2: Entity(name: "ad", ids: ["ad_1"]) {
        id
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

