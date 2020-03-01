import { queryType, stringArg, makeSchema, objectType } from "nexus";
import { graphql } from "graphql"
import { db } from "./db"
import { loadQuery } from "./query-loader";

const User = objectType({
    name: "User",
    definition(t) {
        t.string("id", { description: "Id of the ad" });
        t.string("name", { description: "Id of the ad" });
    },
});

const AdAccount = objectType({
    name: "AdAccount",
    definition(t) {
        t.string("id", { description: "Id of the ad" })
        t.string("name", { description: "Id of the ad" })
        t.list.field("Users", {
            type: User,
            resolve(parent, args, ctx) {
                return db.user.filter(user => user.adAccountIds.includes(parent.id))
            },
        });
    },
});

const Ad = objectType({
    name: "Ad",
    definition(t) {
        t.string("id", { description: "Id of the ad" })
        t.field("AdAccount", {
            type: AdAccount,
            resolve(parent, args, ctx, info) {
                return db.adaccount.find(v => v.id === parent.adAccountId)
            }
        })
    },
});

const Query = queryType({
  definition(t) {
    t.list.field("Ad", {
        type: Ad,
        resolve(parent, args, ctx, info) {
            return db.ad
        }
    })
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: process.cwd() + "/generated/schema.graphql",
    typegen: process.cwd() + "/generated/typings.ts",
  },
})

const query = loadQuery('query { Ad { AdAccount { name, Users { name } } } }')

graphql({
    schema,
    source: query
}).then(
    result => console.log(
        JSON.stringify(result, null, '\t')
    )
)

