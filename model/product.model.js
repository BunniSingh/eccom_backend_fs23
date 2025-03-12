const mongoose = require("mongoose");

// Define the Product schema
const schemaObject = {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  dimensions: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
  warrantyInformation: {
    type: String,
  },
  shippingInformation: {
    type: String,
  },
  availabilityStatus: {
    type: String,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: new Date()
      },
      reviewerName: {
        type: String,
        required: true,
      },
      reviewerEmail: {
        type: String,
        required: true,
      },
    },
  ],
  returnPolicy: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
    required: true,
  },
  meta: {
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    barcode: {
      type: String,
    },
    qrCode: {
      type: String,
    },
  },
  images: [
    {
      type: String,
    },
  ],
  thumbnail: {
    type: String,
  },
};

const productSchema = new mongoose.Schema(schemaObject, {timestamps: true});

const Product = mongoose.model("products", productSchema);

module.exports = Product;

// let obj = {
//   title: "Essence Mascara Lash Princess",
//   description:
//     "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//   category: "beauty",
//   price: 9.99,
//   discountPercentage: 7.17,
//   rating: 4.94,
//   stock: 5,
//   tags: ["beauty", "mascara"],
//   brand: "Essence",
//   sku: "RCH45Q1A",
//   weight: 2,
//   dimensions: {
//     width: 23.17,
//     height: 14.43,
//     depth: 28.01,
//   },
//   warrantyInformation: "1 month warranty",
//   shippingInformation: "Ships in 1 month",
//   availabilityStatus: "Low Stock",
//   reviews: [
//     {
//       rating: 2,
//       comment: "Very unhappy with my purchase!",
//       date: "2024-05-23T08:56:21.618Z",
//       reviewerName: "John Doe",
//       reviewerEmail: "john.doe@x.dummyjson.com",
//     },
//     {
//       rating: 2,
//       comment: "Not as described!",
//       date: "2024-05-23T08:56:21.618Z",
//       reviewerName: "Nolan Gonzalez",
//       reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
//     },
//     {
//       rating: 5,
//       comment: "Very satisfied!",
//       date: "2024-05-23T08:56:21.618Z",
//       reviewerName: "Scarlett Wright",
//       reviewerEmail: "scarlett.wright@x.dummyjson.com",
//     },
//   ],
//   returnPolicy: "30 days return policy",
//   minimumOrderQuantity: 24,
//   meta: {
//     createdAt: "2024-05-23T08:56:21.618Z",
//     updatedAt: "2024-05-23T08:56:21.618Z",
//     barcode: "9164035109868",
//     qrCode: "https://assets.dummyjson.com/public/qr-code.png",
//   },
//   images: [
//     "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
//   ],
//   thumbnail:
//     "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
// };
