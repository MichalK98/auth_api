import { number, object, string, TypeOf } from 'zod';

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required'
    }),
    description: string({
      required_error: 'Description is required'
    }).min(50, 'Description should be at least 50 characters long'),
    price: number({ required_error: 'Price is required' }),
    image: string({ required_error: 'Image is required' })
  })
};

const params = {
  params: object({
    productId: string({
      required_error: 'productId is required'
    })
  })
};

export const createProductScheme = object({
  ...payload
});

export const updateProductScheme = object({
  ...payload,
  ...params
});

export const getProductScheme = object({
  ...params
});

export const deleteProductScheme = object({
  ...params
});

export type CreateProductInput = TypeOf<typeof createProductScheme>;
export type UpdateProductInput = TypeOf<typeof updateProductScheme>;
export type ReadProductInput = TypeOf<typeof getProductScheme>;
export type DeleteProductInput = TypeOf<typeof deleteProductScheme>;
