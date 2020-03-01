
export const db = {
    user: [
        { id: "user_1", name: "Hugo", compagnyId: "compagny_1", adAccountIds: ["adaccount_1"] },
        { id: "user_2", name: "Thomas", compagnyId: "compagny_1", adAccountIds: ["adaccount_1", "adaccount_2"] },
        { id: "user_3", name: "Hugo", compagnyId: "compagny_3", adAccountIds: ["adaccount_3"] }
    ],
    compagny: [
        { id: "compagny_1", name: "Compagny 1" },
        { id: "compagny_2", name: "Compagny 2" },
        { id: "compagny_3", name: "Compagny 3" }
    ],
    brand: [
        { id: "brand_1", name: "Hugo's brand", adAccountId: "adaccount_1" },
        { id: "brand_2", name: "Arthur's brand", adAccountId: "adaccount_2" },
        { id: "brand_3", name: "Joe's brand", adAccountId: "adaccount_3" }
    ],
    adaccount: [
        { id: "adaccount_1", name: "Ad account 1" },
        { id: "adaccount_2", name: "Ad account 2" },
        { id: "adaccount_3", name: "Ad account 3" },
    ],
    ad: [
        { id: "ad_1", name: "Ad 1", adAccountId: "adaccount_1", network: "facebook" },
        { id: "ad_2", name: "Ad 2", adAccountId: "adaccount_1", network: "snapchat" },
        { id: "ad_3", name: "Ad 3", adAccountId: "adaccount_1", network: "twitter" },
        { id: "ad_4", name: "Ad 4", adAccountId: "adaccount_2", network: "facebook" },
    ]
}
