import { makeSchema } from "nexus"
import { graphql } from "graphql"
import { loadQuery } from "./query-loader"
import { EntityQuery } from "./queries/entity"
import { EntityLink } from "./queries/entity-link"
import { EntityReference } from "./queries/entity-reference"

const schema = makeSchema({
  types: [EntityQuery, EntityLink, EntityReference],
  outputs: {
    schema: process.cwd() + "/generated/schema.graphql",
    typegen: process.cwd() + "/generated/typings.ts",
  },
})

const query = loadQuery(`query {
    ad: Entity(name: "ad", ids: ["ad_3"]) {
        adAccount: EntityLink(name: "adaccount", link: { field: "adAccountId" }) {
            id,
            users: EntityReference(name: "user", ids: ["user_1"], ref: { field: "adAccountIds", list: true }) {
                __typename,
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

