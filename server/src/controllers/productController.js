import { validationResult } from "express-validator";
import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function parseNumber(value) {
  return Number.isFinite(Number(value)) ? Number(value) : undefined;
}

export const listProducts = asyncHandler(async (req, res) => {
  const { category, audience, material, featured, newlyLaunched, search, sort = "createdAt" } = req.query;
  const query = { active: true };

  if (category) query.category = category;
  if (audience) query.audience = audience;
  if (material) query.material = material;
  if (featured) query.featured = featured === "true";
  if (newlyLaunched) query.newlyLaunched = newlyLaunched === "true";
  if (search) query.$text = { $search: search };

  const minPrice = parseNumber(req.query.minPrice);
  const maxPrice = parseNumber(req.query.maxPrice);
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  const sortMap = {
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    newest: { createdAt: -1 },
    createdAt: { createdAt: -1 }
  };

  const products = await Product.find(query).sort(sortMap[sort] || sortMap.createdAt);
  res.json({ products });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, active: true });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    throw new Error(errors.array()[0].msg);
  }

  const product = await Product.create(req.body);
  res.status(201).json({ product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({ product });
});
