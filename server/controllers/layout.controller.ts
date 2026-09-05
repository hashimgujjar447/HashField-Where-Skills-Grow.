import type { Request, Response, NextFunction } from "express";
import { asyncErrorHandler } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { Layout } from "../models/layout.model.js";

export const createLayout = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (!type) {
        return next(new ErrorHandler("Please provide layout type", 400));
      }

      const isLayoutExist = await Layout.findOne({ type });

      if (isLayoutExist) {
        return next(
          new ErrorHandler(`Layout of type ${type} already exists`, 400),
        );
      }

      if (type === "banner") {
        const { image, title, subtitle } = req.body;

        if (!image || !title || !subtitle) {
          return next(
            new ErrorHandler(
              "Please provide all required fields for banner layout",
              400,
            ),
          );
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        await Layout.create({
          type,
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subtitle,
          },
        });
      } else if (type === "faqs") {
        const { faqs } = req.body;

        if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
          return next(
            new ErrorHandler(
              "Please provide all required fields for FAQs layout",
              400,
            ),
          );
        }

        const faqItems = faqs.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        await Layout.create({
          type,
          faqs: faqItems,
        });
      } else if (type === "categories") {
        const { categories } = req.body;

        if (
          !categories ||
          !Array.isArray(categories) ||
          categories.length === 0
        ) {
          return next(
            new ErrorHandler(
              "Please provide all required fields for Categories layout",
              400,
            ),
          );
        }

        const categoriesItems = categories.map((item: any) => ({
          title: item.title,
        }));

        await Layout.create({
          type,
          categories: categoriesItems,
        });
      } else {
        return next(new ErrorHandler("Invalid layout type", 400));
      }

      return res.status(201).json({
        success: true,
        message: `${type} layout created successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const editLayout = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (!type) {
        return next(new ErrorHandler("Please provide layout type", 400));
      }

      if (type === "banner") {
        const { image, title, subtitle } = req.body;

        if (!image || !title || !subtitle) {
          return next(
            new ErrorHandler(
              "Please provide all required fields for banner layout",
              400,
            ),
          );
        }

        const bannerData = await Layout.findOne({ type: "banner" });

        if (!bannerData) {
          return next(new ErrorHandler("Banner layout not found", 404));
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const oldPublicId = bannerData.banner?.image?.public_id;

        await Layout.findByIdAndUpdate(
          bannerData._id,
          {
            type: "banner",
            banner: {
              image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              },
              title,
              subtitle,
            },
          },
          { new: true },
        );

        if (oldPublicId) {
          await cloudinary.v2.uploader.destroy(oldPublicId);
        }
      } else if (type === "faqs") {
        const { faqs } = req.body;

        if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
          return next(
            new ErrorHandler(
              "Please provide all required fields for FAQs layout",
              400,
            ),
          );
        }

        const faqItems = faqs.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        const faqsData = await Layout.findOne({ type: "faqs" });

        if (!faqsData) {
          return next(new ErrorHandler("FAQs layout not found", 404));
        }

        await Layout.findByIdAndUpdate(
          faqsData._id,
          {
            faqs: faqItems,
          },
          { new: true },
        );
      } else if (type === "categories") {
        const { categories } = req.body;

        if (
          !categories ||
          !Array.isArray(categories) ||
          categories.length === 0
        ) {
          return next(
            new ErrorHandler(
              "Please provide all required fields for Categories layout",
              400,
            ),
          );
        }

        const categoriesItems = categories.map((item: any) => ({
          title: item.title,
        }));

        const categoriesData = await Layout.findOne({
          type: "categories",
        });

        if (!categoriesData) {
          return next(new ErrorHandler("Categories layout not found", 404));
        }

        await Layout.findByIdAndUpdate(
          categoriesData._id,
          {
            categories: categoriesItems,
          },
          { new: true },
        );
      } else {
        return next(new ErrorHandler("Invalid layout type", 400));
      }

      return res.status(200).json({
        success: true,
        message: `${type} layout updated successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const getLayoutByType = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const layout = await Layout.findOne({ type: req.body.type });

      if (!layout) {
        return next(new ErrorHandler("Layout not found", 404));
      }

      return res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
