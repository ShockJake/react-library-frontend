import { Book } from "../data/book";
import { Purchase } from "../data/purchase";
import axios, { AxiosResponse } from "axios";

export const base_url = "http://127.0.0.1:8080";

export const fetchGenres = async (): Promise<string[]> => {
  const url = `${base_url}/categories`;
  return await doRequest<string[]>(url, "fetching categories", null, "get");
};

export const fetchBooksByGenre = async (genre: string): Promise<Book[]> => {
  const url = `${base_url}/books/${genre}`;
  return await doRequest<Book[]>(
    url,
    `retrieving books by category: ${genre}`,
    null,
    "get",
  );
};

export const fetchPurchases = async (): Promise<Purchase[]> => {
  const url = `${base_url}/purchase`;
  return await doRequest<Purchase[]>(url, "retrieving purchases", null, "get");
};

export const getCart = async (): Promise<Book[]> => {
  const url = `${base_url}/cart`;
  return await doRequest<Book[]>(url, "retrieving cart data", null, "get");
};

export const addBookToCart = async (book: Book): Promise<void> => {
  const url = `${base_url}/cart`;
  const data = { action: "add", book: book };
  const body = JSON.stringify(data);
  await doRequest<void>(url, "adding book to cart", body, "put");
};

export const removeBookFromCart = async (book: Book): Promise<void> => {
  const url = `${base_url}/cart`;
  const data = { action: "remove", book: book };
  const body = JSON.stringify(data);
  await doRequest<void>(url, "removing book from cart", body, "put");
};

export const checkoutCart = async (): Promise<void> => {
  const url = `${base_url}/cart/checkout`;
  await doRequest<void>(url, "cart checkout", null, "get");
};

export const clearCart = async (): Promise<void> => {
  const url = `${base_url}/cart`;
  await doRequest<void>(url, "clearing cart", null, "delete");
};

export const buyBooks = async (books: Book[]): Promise<void> => {
  const url = `${base_url}/purchase`;
  const body = JSON.stringify(books);
  await doRequest<void>(url, "buying books", body, "post");
};

async function doRequest<T>(
  url: string,
  purpose: string,
  body: string | null,
  method: string,
): Promise<T> {
  const request_data = createRequestData(url, body, method);
  const response: AxiosResponse<T> = await axios(url, request_data);
  if (response.status !== 200) {
    throw new Error(`Bad response for ${purpose}`);
  }
  return response.data;
}

function createRequestData(
  url: string,
  body: string | null,
  method: string,
): any {
  if (body === null) {
    return {
      method: method,
      timeout: 20000,
      with_credentials: true,
      url: url,
    };
  }
  return {
    data: body,
    method: method,
    timeout: 20000,
    with_credentials: true,
    url: url,
  };
}
