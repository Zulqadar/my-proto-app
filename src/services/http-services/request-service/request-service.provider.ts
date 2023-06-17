import { envConfig } from "../../../config";
import RequestService from "./request-service";

export const requestService = new RequestService(envConfig.BASE_URL);