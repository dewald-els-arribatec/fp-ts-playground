import axios, {AxiosResponse} from 'axios';
import {taskEither} from 'fp-ts';
import {pipe} from 'fp-ts/function';
import {findFirst} from 'fp-ts/Array';
import {getLeft, getRight, isNone, isSome} from 'fp-ts/Option';
import {isLeft} from 'fp-ts/Either';
import {TaskEither} from 'fp-ts/TaskEither';

(async () => {
  type Product = {
    id: number;
    name: string;
  };

  const superSecretThing = 'S3cr3t!Z!';
  console.log(superSecretThing);
  /**
   * Fetch products
   * @param {string} path Endpoint of API
   */
  const fetchProductsTE = (path: string): TaskEither<Error, AxiosResponse> =>
    taskEither.tryCatch(
      () => axios.get<Product[]>('http://localhost:8080/' + path),
      () => new Error('Could not fetch products')
    );

  /**
   * Find a specific product
   * @param {number} productId Id of product being searched
   */
  const findProduct = (productId: number) =>
    findFirst((product: Product) => product.id === productId);

  const firstProductE = await pipe(
    'products',
    fetchProductsTE,
    taskEither.chainOptionK(() => new Error('Product not found'))(response =>
      findProduct(9)(response.data)
    )
  )();

  if (isLeft(firstProductE)) {
    const left = getLeft(firstProductE);
    console.log('LEFT: ', left);
  } else if (isNone(getRight(firstProductE))) {
    console.log('Could not find product');
  } else if (isSome(getRight(firstProductE))) {
    const right = getRight(firstProductE);
    console.log('RIGHT: ', right);
  }
})();
