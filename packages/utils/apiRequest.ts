/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, {
  AxiosBasicCredentials,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  CancelTokenStatic,
  Method,
} from "axios";

// Defines a type for the data that can be sent in a request. It is currently any for maximum flexibility.
export type RequestDataType = any;

// Enum to define the types of request bodies that can be handled.
export enum RequestBodyType {
  QueryString = "QUERY-STRING",
  FormData = "FORM-DATA",
  JSON = "JSON",
  FILE = "FILE",
  SKIP_INTERCEPTOR = "SKIP_INTERCEPTOR",
}

// Interface detailing the structure of API endpoint details.
export interface APIDetailType {
  controllerName: string; // URL path for the API endpoint
  requestBodyType: RequestBodyType; // Type of the request body
}

// Type for request parameters, allowing any property.
export interface RequestParam {
  [key: string]: any | undefined;
}

// Interface for transformed request data, including optional authorization and data fields.
interface TransformedRequestData {
  auth?: AxiosBasicCredentials;
  data: unknown;
}

// Generates request headers based on the API details provided.
const generateHeaders = (apiDetails: APIDetailType) => {
  const bearerToken = localStorage.getItem("access_token");
  // this will add the token to the request header

  let headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // CORS
    Authorization: `Bearer ${bearerToken}`,
  };

  if (bearerToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${bearerToken}`,
    };
  }
  // Adjusts headers based on the request body type.
  switch (apiDetails.requestBodyType) {
    case "QUERY-STRING":
      headers = {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
      break;
    case "FORM-DATA":
      headers = {
        ...headers,
        "Content-Type": "multipart/form-data",
      };
      break;
    case "SKIP_INTERCEPTOR":
      headers = {
        ...headers,
        skipInterceptor: "true",
      };
      break;
    default:
      headers = { ...headers };
  }
  return headers;
};

// Transforms JavaScript objects into FormData, handling various types of nested data.
function generateFormData(requestData: { [key: string]: RequestDataType }) {
  const formData = new FormData();
  for (const data in requestData) {
    // Appends each data item to the FormData object appropriately.
    if (requestData[data] instanceof Array) {
      requestData[data]?.forEach(
        (dataStore: RequestDataType, index: number) => {
          if (dataStore instanceof Object && !(dataStore instanceof File)) {
            Object.keys(dataStore).forEach((key) =>
              formData.append(`${data}[${index}].${key}`, dataStore[key])
            );
          } else if (dataStore instanceof File) {
            formData.append(`${data}[${index}]`, dataStore);
          } else if (
            typeof dataStore === "number" ||
            typeof dataStore === "string"
          ) {
            formData.append(`${data}[${index}]`, dataStore.toString());
          }
        }
      );
    } else if (
      requestData[data] instanceof Object &&
      !(requestData[data] instanceof File)
    ) {
      Object.entries(requestData[data]).forEach(
        ([key, value]: [string, RequestDataType]) =>
          formData.append(`${data}.${key}`, value)
      );
    } else {
      formData.append(data, requestData[data]);
    }
  }
  return formData;
}

// Converts a simple object into URL search parameters.
function getQueryString(data: { [key: string]: string }) {
  return new URLSearchParams(data);
}

// Handles and standardizes the structure of Axios error responses.
const handleErrorResponse = (error: AxiosError) => {
  const errorResponse = {
    message: "Error",
    data: null,
    status: false,
    response: undefined as AxiosResponse | undefined,
    noConnection: false,
    isAxiosError: false,
    config: undefined as AxiosRequestConfig | undefined,
  };
  errorResponse.message = error.message;
  if (error.response) {
    errorResponse.response = error.response;
  } else if (error.request) {
    errorResponse.message = "Server could not be reached.";
    errorResponse.noConnection = true;
  }
  errorResponse.config = error.config;
  errorResponse.isAxiosError = error.isAxiosError;
  return errorResponse;
};

// Transforms the request data based on the specified request body type.
const transformRequestData = (
  apiDetails: APIDetailType,
  requestData: RequestDataType
) => {
  let configData: RequestDataType = requestData;
  const transformedRequestData: TransformedRequestData = { data: configData };
  switch (apiDetails.requestBodyType) {
    case "FORM-DATA":
      transformedRequestData.data = generateFormData(configData);
      break;
    case "QUERY-STRING":
      transformedRequestData.data = getQueryString(configData);
      break;
    default:
      transformedRequestData.data = configData;
      break;
  }

  return transformedRequestData;
};

// Cancel a request using a cancel token.
const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();

// Initializes and configures an Axios request with the given parameters.
export default function initApiRequest<TData>(
  apiDetails: APIDetailType,
  requestData: RequestDataType,
  requestMethod: Method,
  params?: RequestParam,
  cancelSource?: CancelTokenSource,
  timeout?: number
): Promise<AxiosResponse<TData>> {
  const baseURL = "";
  const headers = generateHeaders(apiDetails);
  const transformedRequestData = transformRequestData(apiDetails, requestData);

  let axiosReqParams: AxiosRequestConfig = {
    baseURL: baseURL,
    url: apiDetails.controllerName,
    method: requestMethod,
    responseType: "json",
    timeout: timeout || 5 * 60 * 1000, // 5 Minutes or custom timeout
    cancelToken: cancelSource ? cancelSource.token : source.token,
    headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    ...transformedRequestData,
  };

  if (params) {
    axiosReqParams = {
      ...axiosReqParams,
      params,
    };
  }

  // Axios interceptors for response and request to handle tokens, errors, and redirects.
  Axios.interceptors.response.use(
    async (response) => {
      let responseData = response;
      return responseData;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  Axios.interceptors.request.use(
    async (config) => {
      let configData = config;
      if (configData.headers.skipInterceptor) return configData;
      // logic to change request data
      return configData;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  // Executes the request and handles the response or error.
  return Axios.request(axiosReqParams)
    .then((response: AxiosResponse) => response)
    .catch((error: AxiosError) => {
      const errorResponse = handleErrorResponse(error);
      throw errorResponse;
    });
}
