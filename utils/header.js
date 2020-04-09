import { config } from "../config/config";

export const getTitle = title => `${title} - ${config.PUBLIC_DOMAIN}`;

export const capitalize = str => str[0].toUpperCase() + str.substr(1);
