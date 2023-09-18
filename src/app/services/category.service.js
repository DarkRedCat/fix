import httpService from "./http.service";

const categoryEndpoint = "category/";

const categoryService = {
    get: async () => {
        const req = await httpService.get(categoryEndpoint);
        return req.data;
    }
};

export default categoryService;
