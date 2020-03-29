import { makeSchema, objectType } from "nexus"
import { graphql } from "graphql"
import { loadQuery } from "./query-loader"
import { EntityQuery } from "./queries/entity"
import { EntityLink, getRequiredFields, OBJECT_NAME as ENTITY_LINK_NAME } from "./queries/entity-link"
import { EntityReference } from "./queries/entity-reference"

import requiredFields from "./plugins/required-fields"
import metaField from "./plugins/meta-field"

const schema = makeSchema({
  types: [EntityQuery, EntityLink, EntityReference],
  outputs: {
    schema: process.cwd() + "/generated/schema.graphql",
    typegen: process.cwd() + "/generated/typings.ts",
  },
  plugins: [
    metaField({
        fields: [ "Entity" ]
    }),
    requiredFields({
        resolvers: {
            [ENTITY_LINK_NAME]: getRequiredFields,
        },
    }),
  ],
})

const query = loadQuery(`query {
    ad: Entity(collection: "ad", ids: ["ad_1"], id: { field: "id" }) {
        _meta {
            id {
                field
                type
            }
        }
        id
    }
    adV2: Entity(collection: "ad", ids: ["ad_1"], id: { field: "cId" }) {
        _meta {
            id {
                field
                type
            }
        }
        id
        name
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

