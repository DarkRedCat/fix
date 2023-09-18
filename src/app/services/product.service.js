import httpService from "./http.service";

const productsEndpoint = "products/";

const productsService = {
    get: async () => {
        const req = await httpService.get(productsEndpoint);
        return req.data;
    },
    getProd: async (prodName) => {
        const req = await httpService.get(productsEndpoint + prodName);
        return req.data;
    }
};

export default productsService;
