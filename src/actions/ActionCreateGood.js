import {actionPromise} from "../reducers/PromiseReducer";
import {gql} from "./PathDB";

//GoodUpsert
export const actionGoodUpsert = (good) => {
    return actionPromise('goodUpsert', gql(`mutation goodUpsert($good: GoodInput){
            GoodUpsert(good: $good){
                 _id
            }
        }`,
        {
            "good": {...good}
        })
    )
}
