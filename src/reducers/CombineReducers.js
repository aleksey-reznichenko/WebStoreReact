import {combineReducers} from "redux";
import {AuthReducer} from "./AuthReducer";
import {PromiseReducer} from "./PromiseReducer";
import {CartReducer} from "./CartReducer";
import {UserReducer} from "./UserReducer";
import {CategoryReducer} from "./CategoryReducer";
import {WishListReducer} from "./WishListReducer";
import {localStoredReducer} from "./LocalStoredReducer";
import {SearchReducer} from "./SearchReducer";
import {MyOrdersReducer} from "./MyOrdersReducer";
import {RouteReducer} from "./RouteReducer";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    promise: PromiseReducer,
    cart: localStoredReducer(CartReducer, 'cart'),
    user: UserReducer,
    category: CategoryReducer,
    wishlist: localStoredReducer(WishListReducer, 'wishlist'),
    search: SearchReducer,
    myorders: MyOrdersReducer,
    route: RouteReducer,
})
