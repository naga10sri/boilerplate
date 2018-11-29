export function storeUserData(data) {
    return {
        type: "USER",
        payload: data
    };
}