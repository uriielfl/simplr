# Welcome to Simplr!

![Simplr Logo](https://simplrjs.tech/logo.png)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

[![Coverage Status](https://coveralls.io/repos/github/uriielfl/simplr/badge.svg?branch=main)](https://coveralls.io/github/uriielfl/simplr?branch=main)

Simplr is a streamlined browser HTTP client library for JavaScript, designed to simplify the use of HTTP methods such as GET, POST, PATCH, PUT, and DELETE. It offers advanced features like request and response interceptors, and cache manipulation, making web development tasks more manageable.

## Key Features:

- **HTTP Methods:** Support for GET, POST, PATCH, PUT, DELETE.
- **Interceptors:** Easily add request and response interceptors.
- **Cache Manipulation:** Sophisticated cache manipulation capabilities.

## Quick Start Example

```ts
import { simplr } from 'simplr-js';

// Initialize Simplr with your API's base URL
const api = simplr.init('https://my-awesome-api.com');

// Function to get users with caching
export const getUsers = async () => {
    // Listens to the request, automatically stores it in the browser's cache, and delivers a cached response if available. Otherwise, it performs the request.
    'users', // Cache index key
  return await api.cache.listenAndCache(
    () => api.get('users'), // Request to be cached
    { minutes: 5 }, // Cache expiration time
  );
};
```
