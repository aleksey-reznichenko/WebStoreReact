const getGQL = url =>
    async (query, variables = {}) => {
        let obj = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.authToken ? 'Bearer ' + localStorage.authToken : {},
            },
            body: JSON.stringify({ query, variables })
        })
        let a = await obj.json()
        if (!a.data && a.errors)
            throw new Error(JSON.stringify(a.errors))
        return a.data[Object.keys(a.data)[0]]
    }

export const backURL = 'http://shop-roles.asmer.fs.a-level.com.ua'
export const gql = getGQL(backURL + '/graphql');
